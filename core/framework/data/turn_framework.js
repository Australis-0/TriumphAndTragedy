module.exports = {
  nextTurn: function (arg0_user, arg1_options) { //[WIP] - Add newspaper section later; add technology parser when a new tech is researched
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

                //[WIP] - Add in tech parser here

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

    //Return statement if simulation
    return (options.is_simulation) ? usr : undefined;
  }
}
