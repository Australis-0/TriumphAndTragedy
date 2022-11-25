module.exports = {
  printReserves: function (arg0_user) {
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
    reserves_string.push(`**[Create Army]** | **[Disband Units]** | **[Train Units]** | **[Unit List]**`);
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

    reserves_string.push(`${army_display_stats.join(" | ")}.`);

    //Return embed as splitEmbed
    return splitEmbed(reserves_string, {
      title: "[Back] | [Jump To Page] | Reserves:",
      title_pages: true,
      fixed_width: true
    });
  },

  printUnitList: function (arg0_user, arg1_hide_select_menu) {
    //Convert from parameters
    var user_id = arg0_user;
    var hide_select_menu = arg1_hide_select_menu;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise embed list as all_embeds, unit_string
    var all_embeds = [];
    var category_map = [];
    var icon_map = [];
    var select_menu_options = [];
    var unit_string = [];

    //Iterate over all valid units
    var all_unit_categories = getUnitCategories();

    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_fields = [];
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

      //Iterate over all units in category and push them to the list based on availability
      for (var x = 0; x < local_units.length; x++) {
        //Only push unit to category if user has the unit unlocked
        if (usr.available_units.includes(local_units[x])) {
          var local_unit = getUnit(local_units[x]);

          //Get unit costs and quantity
          var unit_costs = getUnitCost(actual_id, local_units[x]);
          var unit_maintenance_costs = [];
          var unit_name = (local_unit.name) ? local_unit.name : local_units[x];
          var unit_quantity = (local_unit.quantity) ? local_unit.quantity : 1;

          if (local_unit.maintenance)
            unit_maintenance_costs = Object.keys(local_unit.maintenance);

          //Production indicator stuff
          var costs_array = [];
          var maintenance_array = [];
          var manpower_array = [];
          var unit_stats_array = [];

          var colonisation_string = "";
          var costs_string = "";
          var maintenance_string = "";
          var manpower_string = "";
          var quantity_string = "";
          var unit_stats_string = "";

          //Display variables
          var unit_icon = (local_unit.icon) ? config.icons[local_unit.icon] + " " : "";
          var unit_name = (local_unit.name) ? local_unit.name : local_units[x];

          //Run through all unit costs
          var all_unit_costs = Object.keys(unit_costs);

          //Get costs_string
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
            if (Object.keys(config.pops).includes(all_unit_costs[y]))
              manpower_array.push(`${parseNumber(Math.ceil(local_unit_cost))} ${pop_name}`);
            else
              (all_unit_costs[y] != "money") ?
                costs_array.push(`${parseNumber(Math.ceil(local_unit_cost))} ${resource_name}`) :
                costs_array.push(`£${parseNumber(Math.ceil(local_unit_cost))}`);


            //Set costs_string
            if (costs_array.length > 0)
              costs_string = `Costs:\n- ${costs_array.join("\n- ")}\n`;

            //Set manpower_string
            if (manpower_array.length > 0)
              manpower_string = `\n\nManpower Cost:\n- ${manpower_array.join("\n- ")}`;
          }

          //Get maintenance_string
          if (local_unit.maintenance) {
            for (var y = 0; y < unit_maintenance_costs.length; y++) {
              var local_amount = local_unit.maintenance[unit_maintenance_costs[y]];
              var resource_obj = getGood(unit_maintenance_costs[y]);

              var resource_name = (resource_obj) ?
                (resource_obj.name) ? resource_obj.name : unit_maintenance_costs[y] :
                parseString(unit_maintenance_costs[y]);

              (unit_maintenance_costs[y] != "money") ?
                maintenance_array.push(`${parseNumber(Math.ceil(local_amount))} ${resource_name}`) :
                maintenance_array.push(`£${parseNumber(Math.ceil(local_amount))}`);
            }

            maintenance_string = `Maintenance:\n- ${maintenance_array.join("\n- ")}`;
          }

          //Get colonisation_string
          if (local_unit.colonise_provinces)
            colonisation_string = (local_unit.colonise_provinces <= 1) ?
              `Settles ${parseNumber(local_unit.colonise_provinces)} Province` :
              `Settles ${parseNumber(local_unit.colonise_provinces)} Provinces`;

          //Get quantity_string
          quantity_string = `x${parseNumber(unit_quantity)}`;

          var has_combat_modifiers = false;

          for (var y = 0; y < config.defines.combat.combat_modifiers.length; y++)
            if (local_unit[config.defines.combat.combat_modifiers[y]])
              has_combat_modifiers = true;

          if (has_combat_modifiers)
            for (var y = 0; y < config.defines.combat.combat_modifiers.length; y++) {
              var local_combat_modifier = config.defines.combat.combat_modifiers[y];
              var local_modifier_amount = local_unit[local_combat_modifier];

              if (local_modifier_amount) {
                //Process attack/defence bonuses
                if (local_combat_modifier == "attack")
                  local_modifier_amount = getAttack(user_id, local_units[x]);
                if (local_combat_modifier == "defence")
                  local_modifier_amount = getDefence(user_id, local_units[x]);

                //Process movement bonuses
                if (local_combat_modifier == "movement")
                  local_modifier_amount = getMovement(user_id, local_units[x]);

                //Process range bonuses
                if (local_combat_modifier == "range")
                  local_modifier_amount = getRange(user_id, local_units[x]);

                unit_stats_array.push(`${parseNumber(local_modifier_amount)} ${config.localisation[local_combat_modifier]}`);
              }
            }

          if (colonisation_string.length > 0)
            unit_stats_array.push(colonisation_string);

          //Format unit_stats_string
          if (unit_stats_array.length > 0)
            unit_stats_string = `\n\nUnit Stats:\n- ${unit_stats_array.join("\n- ")}`;

          //Push item to array, followed by unit_stats
          local_fields.push({
            name: `${unit_icon}__**${unit_name}** (${quantity_string}):__`,
            value: `\`\`\`yaml\n${costs_string}${maintenance_string}${manpower_string} ${unit_stats_string}\`\`\``,
            inline: true
          });
        }
      }

      //Convert fields to embeds
      if (local_fields.length > 0) {
        local_unit_category_string.push(config.localisation.divider);
        local_unit_category_string.push("");

        //Begin formatting embeds
        var local_embed_fields = [];

        for (var x = 0; x < local_fields.length; x++) {
          local_embed_fields.push(local_fields[x]);

          if (x != 0 || local_fields.length == 1)
            if (x % 9 == 0 || x == local_fields.length - 1) {
              var unit_category_embed = new Discord.MessageEmbed()
                .setColor(settings.bot_colour)
                .setDescription(local_unit_category_string.join("\n"));
              var total_current_fields = 0;

              for (var y = 0; y < local_embed_fields.length; y++) {
                unit_category_embed.addFields(local_embed_fields[y]);
                total_current_fields++;
              }

              //Regularise columns
              var extra_columns = Math.ceil(total_current_fields/3)*3 - total_current_fields;

              if (total_current_fields % 3 != 0)
                for (var y = 0; y < extra_columns; y++)
                  unit_category_embed.addFields({ name: "-", value: config.localisation.break, inline: true });

              //Clear local_embed_fields, then push embed
              local_embed_fields = [];
              all_embeds.push(unit_category_embed);
              category_map.push(local_unit_category_name);
              icon_map.push(local_unit_category_icon);
            }
        }
      }
    }

    //Modify page counters
    for (var i = 0; i < all_embeds.length; i++)
      all_embeds[i].setTitle(`${icon_map[i]}${category_map[i]} (Page ${i + 1} of ${all_embeds.length}):`);

    //Add select menu
    if (!hide_select_menu) {
      var select_menu = unique(category_map);

      for (var i = 0; i < select_menu.length; i++)
        select_menu_options.push({
          label: select_menu[i],
          value: getUnitCategory(select_menu[i], { return_key: true }),

          options: {
            name: select_menu[i]
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printUnitList(game_obj.user, true),
              starting_page: category_map.indexOf(options.name),
              user: game_obj.user
            });
          }
        });

      //Implement select menu
      addSelectMenu(game_obj.header, {
        id: `select_unit_category`,
        options: select_menu_options,
        placeholder: `⭭ Select Unit Category ..`
      });
    }

    //Return statement
    return all_embeds;
  }
}
