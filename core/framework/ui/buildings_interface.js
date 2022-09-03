module.exports = {
  printBuildList: function (arg0_user, arg1_hide_select_menu) {
    //Convert from parameters
    var user_id = arg0_user;
    var hide_select_menu = arg1_hide_select_menu;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var total_page_count = 0;
    var usr = main.users[actual_id];

    //Initialise all_embeds as embed list
    var all_embeds = [];
    var category_map = [];
    var icon_map = [];
    var select_menu_options = [];

    //Iterate over all valid buildings
    var all_building_categories = getBuildingCategories();

    if (getCapital(actual_id)) {
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = getBuildingCategory(all_building_categories[i]);
        var local_building_category_icon = (local_building_category.icon) ? config.icons[local_building_category.icon] + " " : "";
        var local_building_category_name = (local_building_category.name) ? local_building_category.name : parseString(all_building_categories[i]);
        var local_building_category_string = [];
        var local_buildings = Object.keys(local_building_category);
        var local_fields = [];

        //Iterate over all buildings in category and push them to the list based on availability
        for (var x = 0; x < local_buildings.length; x++) {
          //Only push building to category if user has the building unlocked
          if (usr.available_buildings.includes(local_buildings[x])) {
            //Get building costs, consumption and production
            var building_costs = getBuildingCost(actual_id, local_buildings[x]);
            var building_maintenance = getBuildingConsumption(actual_id, local_buildings[x]);
            var building_production = getBuildingProduction(actual_id, local_buildings[x], getCapital(actual_id).name);
            var local_building = getBuilding(local_buildings[x]);

            //Production indicator stuff
            var costs_array = [];
            var maintenance_array = [];
            var manpower_array = [];
            var production_array = [];

            var construction_string = "";
            var costs_string = "";
            var manpower_string = "";
            var production_string = "";

            //Display variables
            var building_icon = (local_building.icon) ? config.icons[local_building.icon] + " " : "";
            var building_name = (local_building.name) ? local_building.name : local_buildings[x];
            var building_obj = local_building;

            //Run through all building costs
            var all_building_costs = Object.keys(building_costs);

            //Get costs string
            for (var y = 0; y < all_building_costs.length; y++) {
              var local_building_cost = building_costs[all_building_costs[y]];
              var resource_obj = getGood(all_building_costs[y]);

              //Fetch resource_name, pop_name
              var resource_name = (resource_obj) ?
                (resource_obj.name) ? resource_obj.name : all_building_costs[y] :
                parseString(all_building_costs[y]);
              var pop_name = (Object.keys(config.pops).includes(all_building_costs[y])) ?
                (config.pops[all_building_costs[y]].name) ?
                  config.pops[all_building_costs[y]].name :
                  all_building_costs[y] :
                parseString(all_building_costs[y]);

              //Parse debug name
              if (Object.keys(config.pops).includes(all_building_costs[y]))
                manpower_array.push(`${parseNumber(Math.ceil(local_building_cost))} ${pop_name}`);
              else
                (all_building_costs[y] != "money") ?
                  costs_array.push(`${parseNumber(Math.ceil(local_building_cost))} ${resource_name}`) :
                  costs_array.push(`£${parseNumber(Math.ceil(local_building_cost))}`);

              //Set costs_string
              if (costs_array.length > 0)
                costs_string = `Costs:\n- ${costs_array.join("\n- ")}`;

              //Set manpower_string
              if (manpower_array.length > 0)
                manpower_string = `- ${manpower_array.join("\n- ")}`;
            }

            //Get production_string
            var all_produced_goods = Object.keys(building_production);

            for (var y = 0; y < all_produced_goods.length; y++) {
              var local_building_production = building_production[all_produced_goods[y]];
              var resource_obj = getGood(all_produced_goods[y]);

              //Fetch resource_name
              var resource_name = (resource_obj) ?
                (resource_obj.name) ? resource_obj.name : all_produced_goods[y] :
                parseString(all_produced_goods[y]);

              //Parse debug name; two-fold array with random minimum to maximum production, one-fold array with the same production value all the time
              if (local_building_production[0] != local_building_production[1]) {
                (all_produced_goods[y] != "money") ?
                  production_array.push(`${parseNumber(Math.ceil(local_building_production[0]))} to ${parseNumber(Math.ceil(local_building_production[1]))} ${resource_name}`) :
                  production_array.push(`£${parseNumber(Math.ceil(local_building_production[0]))} to £${parseNumber(Math.ceil(local_building_production[1]))}`);
              } else {
                (all_produced_goods[y] != "money") ?
                  production_array.push(`${parseNumber(Math.ceil(local_building_production[0]))} ${resource_name}`) :
                  production_array.push(`£${parseNumber(Math.ceil(local_building_production[0]))}`);
              }
            }

            //Get maintenance_string
            var all_maintenance_costs = Object.keys(building_maintenance);

            for (var y = 0; y < all_maintenance_costs.length; y++) {
              var local_building_consumption = building_maintenance[all_maintenance_costs[y]];
              var resource_obj = getGood(all_maintenance_costs[y]);

              //Fetch resource_name
              var resource_name = (resource_obj) ?
                (resource_obj.name) ? resource_obj.name : all_maintenance_costs[y] :
                parseString(all_maintenance_costs[y]);

              //Parse debug name; two-fold array with random minimum to maximum production, one-fold array with the same production value all the time
              if (local_building_consumption.length > 1) {
                (all_maintenance_costs[y] != "money") ?
                  maintenance_array.push(`${parseNumber(Math.ceil(local_building_consumption[0]))} to ${parseNumber(Math.ceil(local_building_consumption[1]))} ${resource_name}`) :
                  maintenance_array.push(`£${parseNumber(Math.ceil(local_building_consumption[0]))} to £${parseNumber(Math.ceil(local_building_consumption[1]))}`);
              } else {
                (all_maintenance_costs[y] != "money") ?
                  maintenance_array.push(`${parseNumber(Math.ceil(local_building_consumption[0]))} ${resource_name}`) :
                  maintenance_array.push(`£${parseNumber(Math.ceil(local_building_consumption[0]))}`);
              }
            }

            //Get construction_string
            if (building_obj.construction_turns) {
              construction_string = (building_obj.construction_turns > 0) ?
                `\nConstruction Time: ${parseNumber(Math.ceil(building_obj.construction_turns))} Turn(s)` :
                `\nConstruction Time: Instant`;
            } else {
              construction_string = `\nConstruction Time: ${parseNumber(Math.ceil(config.defines.economy.construction_turns*usr.modifiers.construction_time))} Turn(s)`;
            }

            //Entry logic
            if (production_array.length > 0) {
              production_string = `\nProduces:\n- ${production_array.join("\n- ")}`;
            }
            if (maintenance_array.length > 0) {
              production_string += `\nMaintenance:\n- ${maintenance_array.join("\n- ")}`;
            }

            //Custom localisation
            if (building_obj.description)
              production_string += `\n- ${building_obj.description}`;
            if (building_obj.houses)
              production_string += `\n- Houses ${parseNumber(building_obj.houses)}`;
            if (building_obj.modifiers)
              production_string += `\n- ${stripMarkdown(parseModifiers(building_obj.modifiers, true))}`;

            //Manpower string
            if (manpower_array.length > 0)
              manpower_string = `${(costs_array.length > 0) ? "\n" : ""}- ${manpower_array.join("\n- ")}`;

            //Push to local fields
            local_fields.push({
              name: `${building_icon} __**${building_name}**:__`,
              value: `\`\`\`yaml\n${costs_string}${manpower_string}${production_string}\n${construction_string}\`\`\``,
              inline: true
            });
          }
        }

        //Push building category strings to global array only if building entries exist in the first place
        if (local_fields.length > 0) {
          local_building_category_string.push(config.localisation.divider);
          local_building_category_string.push("");

          //Begin formatting embeds
          var local_embed_fields = [];

          for (var x = 0; x < local_fields.length; x++) {
            local_embed_fields.push(local_fields[x]);

            if (x != 0 || local_fields.length == 1)
              if (x % 12 == 0 || x == local_fields.length - 1) {
                var building_category_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription(local_building_category_string.join("\n"));
                var total_current_fields = 0;

                for (var y = 0; y < local_embed_fields.length; y++) {
                  building_category_embed.addFields(local_embed_fields[y]);
                  total_current_fields++;
                }

                //Regularise columns
                var extra_columns = Math.ceil(total_current_fields/3)*3 - total_current_fields;

                if (total_current_fields % 3 != 0)
                  for (var y = 0; y < extra_columns; y++)
                      building_category_embed.addFields({ name: "-", value: config.localisation.break, inline: true });

                //Clear local_embed_fields, then push embed
                local_embed_fields = [];
                all_embeds.push(building_category_embed);
                category_map.push(local_building_category_name);
                icon_map.push(local_building_category_icon);
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
            value: getBuildingCategory(select_menu[i], { return_key: true }),

            options: {
              name: select_menu[i]
            },

            effect: function (value, options) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printBuildList(game_obj.user, true),
                starting_page: category_map.indexOf(options.name),
                user: game_obj.user
              });
            }
          });

        //Implement select menu
        addSelectMenu(game_obj.header, {
          id: `select_building_category`,
          options: select_menu_options,
          placeholder: `⭭ Select Building Category ..`,
        });
      }
    } else {
      printError(game_obj.id, `You must have a capital city first before you can construct any buildings!`);
    }

    //Return statement
    return all_embeds;
  },

  printConstructions: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare construction_obj; construction_string
    var construction_obj = {};
    var construction_string = [];

    if (usr) {
      construction_string.push(`**[Back]** | **[Jump To Page]**`);
      construction_string.push("");

      //Push all constructions to construction_string as a formatted array, initialise all construction_obj fields first
      for (var i = 0; i < usr.under_construction.length; i++)
        if (!construction_obj[usr.under_construction[i].province_id])
          construction_obj[usr.under_construction[i].province_id] = [];
      for (var i = 0; i < usr.under_construction.length; i++)
        construction_obj[usr.under_construction[i].province_id].push(usr.under_construction[i]);

      //Fetch cities alphabetically
      var all_cities = Object.keys(construction_obj).sort();
      var raw_city_names = [];

      for (var i = 0; i < all_cities.length; i++)
        raw_city_names.push(`${main.provinces[all_cities[i]].name},${all_cities[i]}`);
      raw_city_names.sort();
      all_cities = [];

      for (var i = 0; i < raw_city_names.length; i++)
        all_cities.push(raw_city_names[i].split(",")[1]);

      //Dynamically push city constructions to construction_string
      for (var i = 0; i < all_cities.length; i++) {
        var local_constructions = construction_obj[all_cities[i]];

        //Only display city if constructions are currently ongoing there
        if (local_constructions.length > 0) {
          construction_string.push(`**${main.provinces[all_cities[i]].name}**:`);
          construction_string.push("");

          for (var x = 0; x < local_constructions.length; x++) {
            var local_building_obj = getBuilding(local_constructions[x].building_type);

            construction_string.push(`Currently constructing **${parseNumber(local_constructions[x].building_amount)}** ${(local_building_obj.name) ? local_building_obj.name : local_constructions[x].building_type} in this city. They will finish in **${local_constructions[x].construction_turns}** turn(s).`);
          }
        }
      }

      //If no building construction is currently going on within the target country, push message to array
      if (Object.keys(construction_obj).length == 0)
        construction_string.push(`_You do not have any constructions currently ongoing within your territory._\n\nCancellation of building constructions can be caused by enemy occupations during wars. Type **[Build]** to start a new construction.`);

      //Return statement
      return splitEmbed(construction_string, {
        title: "Construction List:",
        title_pages: true,
        fixed_width: true
      });
    }
  }
};
