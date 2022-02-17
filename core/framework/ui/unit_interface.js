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
    reserves_string.push(`**[Create Army]** ¦ **[Disband Units]** ¦ **[Train Units]** ¦ **[Unit List]**`);
    reserves_string.push("");
    reserves_string.push(config.localisation.divider);
    reserves_string.push(`${config.icons.manpower} **Reserves:**`);

    //Iterate over all valid units
    var all_unit_categories = getUnitCategories();

    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = getUnitCategory(all_unit_categories[i]);
      var local_unit_category_icon = (local_unit_category.icon) ? config.icons[local_unit_category.icon] + " " : "";
      var local_unit_category_name = (local_unit_category.name) ? local_unit_category.name : parseString(all_unit_categories[i]);
      var local_units = Object.keys(local_unit_category);
      var units_found_in_category = false;

      //Push unit header to reserves_string
      reserves_string.push("");
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

      reserves_string.push("");
      reserves_string.push(`---`);
    }

    //Print Upkeep
    reserves_string.push("");
    reserves_string.push(config.localisation.divider);
    reserves_string.push("");
    reserves_string.push(`${config.icons.money} **Upkeep:**`);
    reserves_string.push("");

    reserves_string.push(`**£${parseNumber(getUnitUpkeep(actual_id))}** will be spent on the military each turn.`);
    reserves_string.push("");

    //Print total attack; total defence
    var army_display_stats = [];
    var army_stats = getMilitaryStrength(actual_id);

    for (var i = 0; i < config.defines.combat.cumulative_combat_modifiers.length; i++) {
      var local_combat_modifier = config.defines.combat.cumulative_combat_modifiers[i];

      army_display_stats.push(`Total ${parseString(local_combat_modifier)}: ` + "`" + `${parseNumber(army_stats[local_combat_modifier])}` + "`");
    }

    reserves_string.push(`${army_display_stats.join(" ¦ ")}.`);

    //Return embed as splitEmbed
    return splitEmbed(reserves_string, {
      title: "[Back] ¦ [Jump To Page] ¦ Reserves:",
      title_pages: true,
      fixed_width: true
    });
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
      var unit_category_has_units_available = false;

      //Initialise local tracker variables
      for (var x = 0; x < local_units.length; x++)
        if (usr.available_units.includes(local_units[x]))
          unit_category_has_units_available = true;

      //Print unit category header
      if (unit_category_has_units_available) {
        unit_string.push(`${local_unit_category_icon}**${local_unit_category_name}**:`);
        unit_string.push(config.localisation.divider);
        unit_string.push("");
      }

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
            if (costs_array.length > 0)
              costs_string = costs_array.join(", ");

            //Set manpower_string
            if (manpower_array.length > 0)
              manpower_string = ` ¦ ${manpower_array.join(", ")}`;
          }

          //Get colonisation_string
          if (local_unit.colonise_provinces)
            colonisation_string = (local_unit.colonise_provinces <= 1) ?
              ` ¦ Settles ${parseNumber(local_unit.colonise_provinces)} Province` :
              ` ¦ Settles ${parseNumber(local_unit.colonise_provinces)} Provinces`;

          //Get quantity_string
          quantity_string = ` ¦ x${parseNumber(unit_quantity)} Quantity`;

          //Push item to array, followed by unit_stats
          unit_string.push(`${unit_icon}**${unit_name}** - ${costs_string} ${manpower_string}`);

          var has_combat_modifiers = false;

          for (var y = 0; y < config.defines.combat.combat_modifiers.length; y++)
            if (local_unit[config.defines.combat.combat_modifiers[y]])
              has_combat_modifiers = true;

          if (has_combat_modifiers)
            for (var y = 0; y < config.defines.combat.combat_modifiers.length; y++)
              unit_stats_array.push(`${returnSafeNumber(local_unit[config.defines.combat.combat_modifiers[y]])} ${parseString(config.defines.combat.combat_modifiers[y])}`);

          //Format unit_stats_string
          if (unit_stats_array.length > 0) {
            unit_stats_string += "`";

            for (var y = 0; y < unit_stats_array.length; y++)
              unit_stats_string += unit_stats_array[y] + (
                //Add dash only if y is not equal to unit_stats_array.length-1
                (y < unit_stats_array.length-1) ?
                  " - " :
                  ""
              );

            unit_stats_string += "`";

            unit_string.push(unit_stats_string);
          }
        }
      }

      //Insert margin break between categories
      unit_string.push("");
    }

    //Return statement
    return splitEmbed(unit_string, {
      title: "[Back] ¦ [Jump To Page] Unit List",
      title_pages: true,
      description: [
        "",
        `**[Craft]**`,
        "",
        config.localisation.divider,
        ""
      ],
      fixed_width: true
    });
  }
}
