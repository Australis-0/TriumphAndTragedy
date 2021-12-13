module.exports = {
  printUnitList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise unit_string
    var unit_string = [];

    //Iterate over all valid units
    var all_unit_categories = getUnitCategories();

    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = getUnitCategory(all_unit_categories[i]);
      var local_unit_category_name = (local_unit_category.name) ? local_unit_category.name : parseString(all_unit_categories[i]);
      var local_unit_category_string = [];
      var local_units = Object.keys(local_unit_category);

      //Iterate over all units in category and push them to the list based on availability
      for (var x = 0; x < local_units.length; x++) {
        //Only push unit to category if user has the unit unlocked
        if (usr.available_units.includes(local_units[x])) {
          var local_unit = getUnit(local_units[x]);

          //Get unit costs and quantity
          var unit_costs = getUnitCost(actual_id, local_units[x]);
          var unit_quantity = (local_unit.quantity) ? local_unit.quantity : 1;

          //Production indicator stuff
          var costs_array = [];
          var manpower_array = [];

          var colonisation_string = "";
          var costs_string = "";
          var manpower_string = "";
          var quantity_string = "";
          var unit_stats_string = "";

          //Display variables
          var unit_icon = (local_unit.icon) ? config.icons[local_unit.icon] + " " : "";
          var unit_name = (local_unit.name) ? local_unit.name : local_units[x];

          //Run through all unit costs
          var all_unit_costs = Object.keys(unit_costs);

          //Get costs string
          for (var y = 0; y < all_unit_costs.length; y++) {
            var local_unit_cost = unit_costs[all_unit_costs[y]];
            var resource_obj = getGood(all_unit_costs[y]);

            //Fetch resource_name, pop_name
            var resource_name = (resource_obj) ?
              (resource_obj.name) ? resource_obj.name : all_unit_costs[y] :
              parseString(all_unit_costs[y]);
            var pop_name = (Object.keys(config.pops).includes(all_unit_costs[y])) ?
              (config.pops[all_unit_costs[y]].name) ?
                config.pops[all_unit_costs[y]].name :
                all_unit_costs[y] :
              parseString(all_unit_costs[y]);

            //Parse debug name
            (all_unit_costs[y] != "money") ?
              costs_array.push(`${parseNumber(Math.ceil(local_unit_cost))} ${resource_name}`) :
              costs_array.push(`£${parseNumber(Math.ceil(local_unit_cost))}`);

            if (Object.keys(config.pops).includes(all_unit_costs[y]))
              manpower_array.push(`${parseNumber(Math.ceil(local_unit_cost))} ${pop_name}`);

            //Set costs_string
            if (costs_string.length > 0)
              costs_string = ` ¦ ${costs_array.join(", ")}`;

            //Set manpower_string
            if (manpower_array.length > 0)
              manpower_string = ` ¦ ${manpower_array.join(", ")}`;
          }

          //Get colonisation_string
          if (local_unit.colonise_provinces)
            colonisation_string = (local_unit.colonise_provinces <= 1) ?
              ` ¦ Settles ${parseInteger(local_unit.colonise_provinces)} Province` :
              ` ¦ Settles ${parseInteger(local_unit.colonise_provinces)} Provinces`;

          //Get quantity_string
          quantity_string = ` ¦ x${parseNumber(unit_quantity)} Quantity`;

          //
        }
      }
    }
  }
}
