module.exports = {
  printReserves: function (arg0_user) { //[WIP] - Finish interface print-out
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise reserves_string
    var reserves_string = [];

    //Format reserves_string
    reserves_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    reserves_string.push(`**[Create Army]** ¦ **[Disband Units]**`);
    reserves_string.push(config.localisation.divider);
    reserves_string.push(`${config.icons.manpower} **Reserves:**`)

    //Iterate over all valid units
    var all_unit_categories = getUnitCategories();

    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = getUnitCategory(all_unit_categories[i]);
      var local_unit_category_icon = (local_unit_category.icon) ? config.icons[local_unit_category.icon] + " " : "";
      var local_unit_category_name = (local_unit_category.name) ? local_unit_category.name : parseString(all_unit_categories[i]);
      var local_units = Object.keys(local_unit_category);
      var units_found_in_category = false;

      //Push unit header to reserves_string
      reserves_string.push(config.localisation.divider);
      reserves_string.push(`${local_unit_category_icon}**${local_unit_category_name}:**`);
      reserves_string.push("");

      //Iterate over all units in category and push them to the list based on availability
      for (var x = 0; x < local_units.length; x++)
        if (returnSafeNumber(usr.reserves[local_units[x]]) > 0) {
          var local_unit = getUnit(local_units[x]);

          //Get unit name and icon
          var unit_icon = (local_unit.icon) ? config.icons[local_unit.icon] + " " : "";
          var unit_name = (local_unit.name) ? local_unit.name : local_units[x];

          //Push to reserves_string
          reserves_string.push(`${unit_icon}**${unit_name}** - ${parseNumber(usr.reserves[local_units[x]])}`);

          units_found_in_category = true;
        }

      if (!units_found_in_category)
        reserves_string.push(`_No units in this category could be found._`);
    }

    //Print Upkeep
    //Print total attack; total defence
    //Return embed as splitEmbed
  },

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
      var local_unit_category_icon = (local_unit_category.icon) ? config.icons[local_unit_category.icon] + " " : "";
      var local_unit_category_name = (local_unit_category.name) ? local_unit_category.name : parseString(all_unit_categories[i]);
      var local_unit_category_string = [];
      var local_units = Object.keys(local_unit_category);

      //Print unit category header
      unit_string.push(`${local_unit_category_icon}**${local_unit_category_name}**:`);
      unit_string.push(config.localisation.divider);
      unit_string.push("");

      //Iterate over all units in category and push them to the list based on availability
      for (var x = 0; x < local_units.length; x++) {
        //Only push unit to category if user has the unit unlocked
        if (usr.available_units.includes(local_units[x])) {
          var local_unit = getUnit(local_units[x]);

          //Get unit costs and quantity
          var unit_costs = getUnitCost(actual_id, local_units[x]);
          var unit_name = (local_unit.name) ? local_unit.name : local_units[x];
          var unit_quantity = (local_unit.quantity) ? local_unit.quantity : 1;

          //Production indicator stuff
          var costs_array = [];
          var manpower_array = [];
          var unit_stats_array = [];

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
              costs_string = costs_array.join(", ");

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

          //Push item to array, followed by unit_stats
          unit_string.push(`${unit_icon}**${unit_name}** - ${costs_string} ${manpower_string}`);

          for (var i = 0; i < config.defines.combat.combat_modifiers.length; i++)
            if (local_unit[config.defines.combat.combat_modifiers[i]])
              unit_stats_array.push(`${local_unit[config.defines.combat.combat_modifiers[i]]} ${parseString(config.defines.combat.combat_modifiers[i])}`);

          //Format unit_stats_string
          unit_stats_string += "`";

          for (var i = 0; i < unit_stats_array.length; i++)
            unit_stats_string += unit_stats_array[i] + (
              //Add dash only if i is not equal to unit_stats_array.length-1
              (i < unit_stats_array.length-1) ?
                " - " :
                ""
            );

          unit_stats_string += "`";

          unit_string.push(unit_stats_string);
        }
      }

      //Insert margin break between categories
      unit_string.push("");
    }

    //Return statement
    return splitEmbed(unit_string, {
      title: "Unit List",
      title_pages: true,
      fixed_width: true
    });
  }
}
