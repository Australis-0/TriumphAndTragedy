module.exports = {
  nextGlobalTurn: function () {
    //Declare local instance variables
    var all_market_goods = Object.keys(main.market);

    //World Market Up-Logic
    {
      for (var i = 0; i < all_market_goods.length; i++) {
        var local_market_good = main.market[all_market_goods[i]];

        //Increase buy_price each turn
        if (local_market_good.buy_price < local_market_good.sell_price*1.2)
          local_market_good.buy_price = Math.ceil(local_market_good.buy_price*1.2);

        //Institute minimum good price caps
        local_market_good.buy_price =
          Math.max(local_market_good.buy_price, config.defines.economy.resource_min_buy_price);

        local_market_good.sell_price =
          Math.max(local_market_good.sell_price, config.defines.economy.resource_min_sell_price);
      }

      //World Market Down-Logic
      {
        for (var i = 0; i < all_market_goods.length; i++) {
          var local_market_good = main.market[all_market_goods[i]];

          //If no one cares about a good enough, the prices will come down
          if (
            local_market_good.amount_sold < 5 &&

            //There can't be a shortage of the existing good
            local_market_good.stock >= Math.ceil(
              config.defines.economy.resource_base_stock*0.1
            )
          ) {
            if (local_market_good.buy_price > 100 && local_market.sell_price > 100) {
              local_market_good.buy_price = Math.ceil(local_market_good.buy_price*0.8);
              local_market_good.sell_price = Math.ceil(local_market_good.sell_price*0.8);
            }
          } else {
            //Randomly increase the buy_price of the good by anywhere from 3-8%, and decrease the sell_price of the good by anywhere from 3-8%.

            local_market_good.buy_price = Math.ceil(local_market_good.buy_price*
              (randomNumber(103, 108)/100)
            );
            local_market_good.sell_price = Math.ceil(local_market_good.sell_price*
              (randomNumber(92, 97)/100)
            );
          }

          //amount_sold deteriorates each turn to simulate large market demand
          local_market_good.amount_sold = Math.ceil(local_market_good.amount_sold*0.5);
        }
      }
    }
  },

  nextTurn: function (arg0_user, arg1_options) { //[WIP] - Add newspaper section later
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables; make sure to account for user simulations
    var actual_id = main.global.user_map[user_id];
    var usr = (!options.is_simulation) ?
      main.users[actual_id] :
      JSON.parse(JSON.stringify(main.users[actual_id]));

    //Declare local tracker variables
    var all_cities = getCities(actual_id);
    var all_good_names = getGoods({ return_names: true });

    //Modifier and tracker variable processing
    {
      //Generic trackers
      usr.country_age++;

      //City modifiers/trackers
      usr.city_cap = getCitiesCap(actual_id);
      usr.total_cities += getCities(actual_id, { include_hostile_occupations: true }).length;

      //Population modifiers/trackers
      usr.population = getPopulation(actual_id);
    }

    //Budget processing
    {
      //Add money based on calculated user income
      usr.money += getIncome(actual_id);
    }

    //Construction processing
    {
      var construction_requests_to_remove = [];

      for (var i = 0; i < usr.under_construction.length; i++) {
        usr.under_construction[i].construction_turns--;

        //Check if building(s) are done being built
        if (usr.under_construction[i] <= 0) {
          var local_city_obj = getProvince(usr.under_construction[i].province_id);

          if (local_city_obj.buildings)
            for (var x = 0; x < usr.under_construction[i].building_amount; x++)

              //Individual buildings are treated as objects in an array here because this allows for further granularity in the future
              local_city_obj.buildings.push({
                building_type: usr.under_construction[i].building_type
              });

          //Remove element from array
          construction_requests_to_remove.push(i);
        }
      }

      //Remove constructed requests
      for (var i = 0; i < construction_requests_to_remove.length; i++)
        removeElement(usr.under_construction, i);
    }

    //Market processing
    {
      //Reduce maximum transaction amount from the Global Market to 20% of total Shipment Capacity after 10 turns, or whatever it is set to in defines
      if (usr.country_age > 10)
        usr.modifiers.maximum_transaction_amount = config.defines.economy.resource_max_percentile;
    }

    //Politics processing
    {
      //Check to see if a coup has been initiated
      if (usr.coup_this_turn != "") {
        usr.tax_rate = 0;
        setGovernment(actual_id, usr.coup_this_turn);

        //Reset coup_this_turn so we don't coup 24/7
        usr.actions = 0;
        usr.coup_this_turn = "";
      }

    }

    //Resources and RGO
    {
      //Reset all good modifiers first so that local RGO buffs from cities can be applied
      for (var i = 0; i < all_good_names.length; i++)
        usr.modifiers[`${all_good_names[i]}_gain`] = 1;

      for (var i = 0; i < all_cities.length; i++)
        usr.modifiers[`${all_cities[i].resource}_gain`] += getCityRGOThroughput(all_cities[i].name);
    }

    //Technology
    {
      //Research processing
      {
        //Only process techs if it is a simulation
        if (!options.is_simulation) {
          var emptied_research_slots = 0;
          var knowledge_investment = (usr.researching.length != 1) ?
            config.defines.technology.max_knowledge_investment*usr.modifiers.knowledge_investment_limit :
            1;
          var research_removal_array = [];

          for (var i = 0; i < usr.researching.length; i++) {
            var max_knowledge_investment = (max_knowledge_investment > usr.researching[i].current_investment) ?
              usr.researching[i].current_investment*knowledge_investment :
              Math.floor(usr.inventory.knowledge/usr.researching.length);

            //Check if tech has finished researching
            if (usr.researching[i].total_research_cost + max_knowledge_investment >= usr.researching[i].current_investment) {

              //Make sure that tech is not already researched
              if (!usr.researched_technologies.includes(usr.researching[i].technology)) {
                var local_tech_obj = usr.researching[i].technology;
                //Technology effect
                usr.researched_technologies.push(usr.researching[i].technology);

                //Parse technology effects
                parseTechnology(actual_id, usr.researching[i].technology);

                //Set highest_tier tracking variable if tech cost exceeds previous highest_tier
                usr.highest_tier = (returnSafeNumber(local_tech_obj.research_cost) > usr.highest_tier) ?
                  local_tech_obj.research_cost :
                  usr.highest_tier;

                //Empty research slots
                emptied_research_slots++;
                research_removal_array.push(i);
              }
            } else {
              usr.researching[i].current_investment += Math.round(max_knowledge_investment);
            }
          }

          //Actually remove techs that have finished researching
          for (var i = 0; i < research_removal_array.length; i++)
            removeElement(usr.researching, research_removal_array[i]);
        }
      }

      //Research queue processing
      {
        var research_queue_removal_array = [];

        for (var i = 0; i < emptied_research_slots; i++)
          for (var x = 0; x < usr.research_queue.length; x++) {
            //Attempt to research everything in queue
            var research_status = research(actual_id, usr.research_queue[x]);

            //If research command went through, remove it from the queue
            if (research_status)
              research_queue_removal_array.push(x);
          }

        //Remove all research_queue_removal_array indices from the queue
        for (var i = 0; i < research_queue_removal_array.length; i++)
          removeElement(usr.research_queue, research_queue_removal_array[i]);
      }
    }

    //Trade
    {
      //Autotrade processing
      var all_auto_trades = Object.keys(usr.auto_trades);

      for (var i = 0; i < all_auto_trades.length; i++) {
        var local_auto_trade = usr.auto_trades[all_auto_trades[i]];

        //Initiate local shipment to user per turn
        give(
          local_auto_trade.exporter,
          local_auto_trade.target,

          local_auto.amount,
          local_auto_trade.good_type,
          { hide_display: true }
        );
      }

      //Conventional trade processing
      var all_exports = Object.keys(usr.trades);

      for (var i = 0; i < all_exports.length; i++) {
        var local_export = usr.trades[all_exports[i]];

        local_export.time_remaining--;

        //Finish export if no time is left remaining
        if (local_export.time_remaining <= 0) {
          var target_user = main.users[local_export.target];

          //Transfer goods to target
          if (getGood(local_export.good_type))
            target_user.inventory[local_export.good_type] += local_export.amount;
          if (local_export.good_type == "money")
            target_user.money += local_export.amount;

          //Remove local_export
          delete local_export;
        }
      }
    }

    //Return statement if simulation
    return (options.is_simulation) ? usr : undefined;
  }
}
