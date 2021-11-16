module.exports = {
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
        usr.modifiers[`${all_cities[i].resource}_gain`] += usr.modifiers.rgo_throughput;
    }

    //Return statement if simulation
    return (options.is_simulation) ? usr : undefined;
  }
}
