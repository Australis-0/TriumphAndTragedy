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

    //Increment global round-count
    main.global.round_count++;
  },

  nextTurn: function (arg0_user, arg1_options) { //[WIP] - Add newspaper section later, subtract political capital by vassal maintenance each turn
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
    var all_expeditions = Object.keys(usr.expeditions);
    var all_good_names = getGoods({ return_names: true });
    var all_governments = Object.keys(config.governments);
    var all_non_aggression_pacts = Object.keys(usr.diplomacy.non_aggression_pacts);
    var all_pops = Object.keys(config.pops);
    var all_relations = Object.keys(usr.diplomacy.relations);
    var all_temporary_modifiers = Object.keys(usr.temporary_modifiers);

    //Modifier and tracker variable processing
    {
      //Generic trackers
      usr.country_age++;

      //City modifiers/trackers
      usr.city_cap = getCitiesCap(actual_id);
      usr.total_cities += getCities(actual_id, { include_hostile_occupations: true }).length;

      //Diplomatic modifiers
      {
        //Reduce infamy
        usr.modifiers.infamy += usr.modifiers.infamy_loss;

        //Set infamy caps
        usr.modifiers.infamy = Math.max(usr.modifiers.infamy, 0);
        usr.modifiers.infamy = Math.min(usr.modifiers.infamy, config.defines.diplomacy.absolute_infamy_limit);
      }

      //Population modifiers/trackers
      usr.population = getPopulation(actual_id);

      //Stability modifiers/trackers
      if (returnSafeNumber(usr.stability_boost) > 0)
        usr.stability_boost -= 0.01;

      //Temporary modifier handling
      {
        //Iterate over all temporary modifiers
        for (var i = 0; i < all_temporary_modifiers.length; i++) {
          var local_temporary_modifier = usr.temporary_modifiers[all_temporary_modifiers[i]];

          //Reduce temporary_modifier duration if it is over zero
          if (local_temporary_modifier.duration > 0)
            local_temporary_modifier.duration--;

          //If the temporary_modifier's duration is now zero, apply the inverse modifier to the user and delete the key
          if (local_temporary_modifier.duration == 0) {
            applyModifiers(actual_id, {
              [local_temporary_modifier.type]: local_temporary_modifier.value
            });

            delete usr.temporary_modifiers[all_temporary_modifiers[i]];
          }
        }
      }
    }

    //Alert processing
    {
      var alerts_to_remove = [];

      for (var i = 0; i < usr.alerts.length) {
        var ai_chance_sum = 0;
        var ai_chance_ranges = [];

        //Deduct from duration
        if (usr.alerts.duration > 0)
          usr.alerts[i].duration--;

        //Check if alert has timed out
        if (usr.alerts[i].duration == 0) {
          var alert_buttons = usr.alerts[i].buttons;

          //Resolve alert by weighted random if AI chance is a thing
          if (usr.alerts[i].has_ai_chance) {
            for (var x = 0; x < alert_buttons.length; x++) {
              var current_ai_chance =  returnSafeNumber(alert_buttons[x].ai_chance);

              ai_chance_ranges.push([ai_chance_sum, ai_chance_sum + current_ai_chance, alert_buttons[x].id]);
              ai_chance_sum += current_ai_chance;
            }

            //Roll the dice
            var dice_roll = randomNumber(0, ai_chance_sum);

            //See where the dice roll landed
            for (var x = 0; x < ai_chance_ranges.length; x++)
              if (dice_roll >= ai_chance_ranges[x][0] && dice_roll < ai_chance_ranges[x][1]) {
                //The dice roll landed here
                var button_obj = getButton(usr.alerts[i].id, ai_chance_ranges[x][2]);

                //Execute effect
                if (button_obj.effect)
                  button_obj.effect(usr.alerts[i].options);
              }
          } else {
            var dice_roll = randomNumber(0, alert_buttons.length);

            //See where the dice roll landed
            var button_obj = getButton(usr.alerts[i].id, alert_buttons[dice_roll].id);

            //Execute effect
            if (button_obj.effect)
              button_obj.effect(usr.alerts[i].options);
          }

          //Push to removal array
          alerts_to_remove.push(i);
        }
      }

      //Remove all alerts in alerts_to_remove
      for (var i = 0; i < alerts_to_remove.length; i++)
        usr.alerts.splice(alerts_to_remove[i], 1);
    }

    //Budget processing
    {
      //Add money based on calculated user income
      usr.money += getIncome(actual_id);
    }

    //Colonisation processing
    {
      if (!options.is_simulation)
        for (var i = 0; i < all_expeditions.length; i++) {
          var local_expedition = usr.expeditions[all_expeditions[i]];

          //Decrease duration
          local_expedition.duration--;

          if (local_expedition.duration < 1) {
            for (var x = 0; x < local_expedition.provinces.length; x++) {
              //Check to see if province already has an owner, if not, settle it
              var local_province = main.provinces[local_expedition.provinces[x]];

              if (!local_province.owner)
                settleProvince(local_expedition.provinces[x], actual_id);

              //Remove expedition key
              delete local_expedition;
            }
          }
        }
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

    //Diplomacy processing
    {
      if (!options.is_simulation) {
        //Improve/decrease relations
        for (var i = 0; i < all_relations.length; i++) {
          var local_relation = usr.diplomacy.relations[all_relations[i]];

          //Check if improving_to value exists
          if (local_relation.improving_to) {
            var relation_change = (local_relation.improving_to - local_relation.value)/local_relation.duration;

            //Set new relation value
            local_relation.value += relation_change;

            //Cap off at whatever relation_change was, negative/positive
            //Negative handler
            if (
              (relation_change < 0 && local_relation.value < local_relation.improving_to) ||
              (relation_change > 0 && local_relation.value > local_relation.improving_to)
            )
              local_relation.value = local_relation.improving_to;

            //Check if the current value is equal to the improved relation
            if (local_relation.value == local_relation.improving_to) {
              //Set status to stagnant
              local_relation.status = "stagnant";

              //If so, delete the keys
              delete local_relation.improving_to;
              delete local_relation.duration;
            }

            //Cap it out at -100 and +100
            local_relation.value = Math.max(local_relation.value, -100);
            local_relation.value = Math.min(local_relation.value, 100);
          }
        }

        //Non-aggression pacts
        for (var i = 0; i < all_non_aggression_pacts.length; i++) {
          var local_non_aggression_pact = usr.diplomacy.non_aggression_pacts[i];

          //Decrement duration if greater than zero
          if (local_non_aggression_pact.duration > 0)
            local_non_aggression_pact.duration--;

          //Delete non aggression pact once time runs out
          if (local_non_aggression_pact.duration == 0)
            dissolveNonAggressionPact(actual_id, local_non_aggression_pact.id);
        }

        //Prestige
        {
          usr.prestige = Math.max(0, usr.prestige + usr.modifiers.prestige_gain);
        }

        //Vassalage
        if (getVassal(actual_id))
          usr.vassal_years++;

        //Wargoal justification
        {
          var justifications_to_remove = [];

          for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
            var local_justification = usr.diplomacy.justifications[i];

            local_justification.duration--;

            //Check if justification has finished
            if (local_justification.duration <= 0) {
              //Give wargoal
              usr.diplomacy.wargoals.push({
                type: local_justification.type,
                target: local_justification.target
              });

              //Push to removal array
              justifications_to_remove.push(i);
            }
          }

          //Remove justifications_to_remove from usr.diplomacy.justifications
          for (var i = 0; i < justifications_to_remove.length; i++)
            usr.diplomacy.justifications.splice(justifications_to_remove[i], 1);
        }
      }
    }

    //Market processing
    {
      //Reduce maximum transaction amount from the Global Market to 20% of total Shipment Capacity after 10 turns, or whatever it is set to in defines
      if (usr.country_age > 10)
        usr.modifiers.maximum_transaction_amount = config.defines.economy.resource_max_percentile;
    }

    //Military processing
    {
      //Mobilisation processing
      {
        if (usr.mobilisation.is_mobilised) {
          //Update local tracker variables
          var new_manpower_mobilised = 0;

          //Mobilise more people if current_manpower_mobilised is not the same as total_manpower_mobilised
          if (current_manpower_mobilised < total_manpower_mobilised)
            new_manpower_mobilised += Math.ceil(
              (total_manpower_mobilised - current_manpower_mobilised)/
                usr.mobilisation.original_duration
            );

          //How to deal with rounding?
          new_manpower_mobilised = Math.min(new_manpower_mobilised, total_manpower_mobilised - current_manpower_mobilised);

          usr.mobilisation.total_manpower_mobilised += new_manpower_mobilised;
          usr.reserves[usr.mobilisation.unit_type] += new_manpower_mobilised;

          //Decrement duration
          if (usr.mobilisation.duration > 0)
            usr.mobilisation.duration--;
        }
      }
    }

    //Politics processing
    {
      //Political Discontent Modifiers - Keep at top, applies political modifiers
      {
        //Subtract first to level the playing field
        usr.modifiers.political_capital_gain -= usr.political_capital_gain_modifier;
        usr.modifiers.reform_desire_gain -= usr.political_reform_desire_modifier;
        usr.modifiers.stability_modifier -= usr.political_instability_modifier;

        usr.political_capital_gain_modifier = 0;
        usr.political_reform_desire_modifier = 0;
        usr.political_instability_modifier = 0;

        //Negatively impacts stability and political capital gain; only begins impacting if party discontent is over 25.

        for (var i = 0; i < all_governments.length; i++) {
          var government_obj = config.governments[all_governments[i]];
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > 0)
            if (local_government.discontent > 25) {
              usr.political_capital_gain_modifier += -5*local_government.popularity*local_government.discontent;
              usr.political_reform_desire_modifier += 0.2*local_government.popularity*local_government.discontent;
              usr.political_instability_modifier += 35*local_government.popularity*local_government.discontent;
            } else {
              usr.political_capital_gain_modifier += 5*local_government.popularity*local_government.discontent;
              usr.political_reform_desire_modifier += -0.2*local_government.popularity*local_government.discontent;
              usr.political_instability_modifier += -35*local_government.popularity*local_government.discontent;
            }
        }

        //Stability-cap, cap before re-adding
        usr.political_instability_modifier = Math.min(usr.political_instability_modifier, -35);
        usr.political_instability_modifier = Math.max(usr.political_instability_modifier, 50);

        usr.political_capital_gain_modifier = Math.min(usr.political_capital_gain_modifier, 0);

        //Reapply modifiers
        usr.modifiers.political_capital_gain += usr.political_capital_gain_modifier;
        usr.modifiers.reform_desire_gain += usr.political_reform_desire_modifier;
        usr.modifiers.stability_modifier += usr.political_instability_modifier;

        //Institute cap
        usr.modifiers.political_capital_gain = Math.min(usr.modifiers.political_capital_gain, 5);
        usr.modifiers.political_capital_gain = Math.max(usr.modifiers.political_capital_gain, 200);

        usr.modifiers.reform_desire_gain = Math.min(usr.modifiers.reform_desire_gain, -0.25);
        usr.modifiers.reform_desire_gain = Math.max(usr.modifiers.reform_desire_gain, 0.2);
      }

      //Coup
      if (usr.coup_this_turn != "") {
        usr.tax_rate = 0;
        setGovernment(actual_id, usr.coup_this_turn);

        //Reset coup_this_turn so we don't coup 24/7
        usr.actions = 0;
        usr.coup_this_turn = "";
      }

      //Party drift
      {
        var most_popular_party = [0, ""]; //[percentage, party_name];
        var total_change = 0;

        for (var i = 0; i < all_governments.length; i++) {
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > most_popular_party[0])
            most_popular_party = [local_government.popularity, all_governments[i]];

          if (usr.available_governments.includes(all_governments[i])) {
            total_change += local_government.drift;
            local_government.popularity += local_government.drift;
          }
        }

        var most_popular_party_obj = usr.politics[most_popular_party[1]];

        //Make sure all percentages equal 100%
        var total_percentage = 0;

        for (var i = 0; i < all_governments.length; i++)
          total_percentage += usr.politics[all_governments[i]].popularity;

        if (total_percentage < 100) {
          most_popular_party_obj.popularity += (1 - total_percentage);
        } else if (total_percentage > 100) {
          most_popular_party_obj.popularity += (total_percentage - 1);
        }

        most_popular_party_obj.popularity = Math.max(most_popular_party_obj.popularity, 0);

        //Reconduct check after processing
        for (var i = 0; i < all_governments.length; i++)
          if (local_government.popularity > most_popular_party[0])
            most_popular_party = [usr.politics[all_governments[i]].popularity, all_governments[i]];

        //Conduct election if more than 5 turns have passed since the last one
        if (main.global.round_count >= usr.last_election + 5) {
          var election_winner = most_popular_party[0];

          if (config.governments[usr.government].effect.has_elections)
            setGovernment(actual_id, election_winner);

          //Set last election
          usr.last_election = main.global.round_count;
        }

        //Reset political parties if anarchy
        if (config.governments[usr.government].is_anarchy)
          for (var i = 0; i < all_governments.length; i++)
            if (!config.governments[all_governments[i]].is_anarchy)
              usr.politics[all_governments[i]].popularity = 0;

        usr.politics[usr.government].popularity = 1;
      }

      //Political Capital
      {
        usr.modifiers.political_capital += usr.modifiers.political_capital_gain;

        //Accepted cultures maintenance for political capital
        usr.modifiers.political_capital -= getAcceptedCultures(actual_id)*config.defines.politics.accepted_culture_maintenance_cost;

        //Round off political_capital
        usr.modifiers.political_capital = Math.round(usr.modifiers.political_capital);
      }

      //Reform Desire
      {
        var total_reform_desire_gain = usr.modifiers.reform_desire_gain;

        for (var i = 0; i < all_governments.length; i++) {
          var government_obj = config.governments[all_governments[i]];
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > 0)
            if (government_obj.effect.reform_desire_gain)
              total_reform_desire_gain += government_obj.effect.reform_desire_gain*local_government.popularity;
        }

        total_reform_desire_gain = Math.min(total_reform_desire_gain, 0.09); //9% cap

        usr.modifiers.reform_desire += total_reform_desire_gain;

        //Cap off reform desire at 0-100%
        usr.modifiers.reform_desire = Math.max(usr.modifiers.reform_desire, 0);
        usr.modifiers.reform_desire = Math.min(usr.modifiers.reform_desire, 1);

        //If no reforms are unlocked, reset reform_desire
        if (usr.available_reforms.length == 0)
          usr.modifiers.reform_desire = 0;

        //Check if reform desire is at 100%, if so, add discontent to all parties with a popularity greater than 0%
        for (var i = 0; i < all_governments.length; i++) {
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > 0)
            local_government.discontent = Math.min(local_government.discontent + 10, 100);
        }
      }

      //Stability
      {
        var government_stability_modifier = getGovernmentStabilityModifier(actual_id);
        var low_party_popularity = false;
        var popularity_stability_modifier = usr.politics[usr.government].popularity*0.75;

        //Calculate stability
        usr.modifiers.stability = Math.ceil(
          popularity_stability_modifier +
          government_stability_modifier -
          usr.tax_rate -
          usr.modifiers.overextension +
          usr.boosted_stability +
          usr.modifiers.stability_modifier
        );

        //Cap off stability
        usr.modifiers.stability = Math.min(usr.modifiers.stability, 1);
        usr.modifiers.stability = Math.max(usr.modifiers.stability, 0);

        if (usr.country_age > 10) {
          //Check for dice roll and low party popularity
          var dice_roll = randomNumber(0, 100);

          for (var i = 0; i < all_governments.length; i++)
            if (usr.politics[all_governments[i]].popularity >= 0.30)
              low_party_popularity = true;

          if (dice_roll > usr.modifiers.stability + config.defines.politics.revolt_threshold) {
            //Fetch list of valid governments to coup to
            var coup_list = JSON.parse(JSON.stringify(usr.available_governments));
            removeElement(coup_list, usr.government);

            if (low_party_popularity)
              if (coup_list.length > 0) {
                var new_government = randomElement(coup_list);

                //Set new government
                setGovernment(actual_id, new_government);

                //Reset actions and tax rate
                usr.actions = 0;
                if (!options.is_simulation)
                  usr.tax_rate = 0;
              }
          }
        }
      }
    }

    //Pop processing
    {
      //Cultural assimilations
      {
        var assimilations_to_remove = [];
        var cultural_integrations_to_remove = [];

        //Cultural integrations
        for (var i = 0; i < usr.cultural_integrations.length; i++) {
          usr.cultural_integrations[i].duration--;

          if (usr.cultural_integrations[i].duration <= 0) {
            var local_culture = getCulture(usr.cultural_integrations[i].culture_id);

            local_culture.accepted_culture.push(actual_id);
            cultural_integrations_to_remove.push(usr.cultural_integrations[i]);
          }
        }

        //Remove cultural integrations
        for (var i = 0; i < cultural_integrations_to_remove.length; i++)
          removeElement(usr.cultural_integrations, cultural_integrations_to_remove[i]);

        //Province assimilations
        for (var i = 0; i < usr.assimilations.length; i++) {
          var local_province = getProvince(usr.assimilations[i].province_id);

          usr.assimilations[i].duration--;

          if (usr.assimilations[i].duration <= 0)
            if (local_province.controller == actual_id) {
              local_province.culture = usr.assimilations[i].culture_id;
              assimilations_to_remove.push(usr.assimilations[i]);
            }
        }

        //Remove assimilations
        for (var i = 0; i < assimilations_to_remove.length; i++)
          removeElement(usr.assimilations, assimilations_to_remove[i]);
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

        local_export.duration--;

        //Finish export if no time is left remaining
        if (local_export.duration <= 0) {
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
