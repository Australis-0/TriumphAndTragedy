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

    if (getCapital(user_id)) {
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
            var building_costs = getBuildingCost(user_id, local_buildings[x]);
            var building_maintenance = getBuildingConsumption(user_id, local_buildings[x]);
            var building_production = getBuildingProduction({
              building_type: local_buildings[x],
              province_id: getCapital(user_id).id
            });
            var local_building = getBuilding(local_buildings[x]);
            var local_options = { nesting: 0, no_formatting: true };

            //Production indicator stuff
            var construction_string = "";
            var costs_string = "";
            var maintenance_string = "";
            var manpower_string = "";
            var production_string = "";

            //Display variables
            var building_icon = (local_building.icon) ? config.icons[local_building.icon] + " " : "";
            var building_name = (local_building.name) ? local_building.name : local_buildings[x];
            var building_obj = local_building;

            if (building_obj.cost)
              costs_string = parseModifiers({ cost: building_obj.cost }, undefined, undefined, undefined, local_options);
            if (building_obj.manpower_cost)
              manpower_string = parseModifiers({ manpower_cost: building_obj.manpower_cost }, undefined, undefined, undefined, local_options);
            production_string = parseModifiers({ produces: building_production }, undefined, undefined, undefined, local_options);
            maintenance_string = parseModifiers({ maintenance: building_maintenance }, undefined, undefined, undefined, local_options);
            construction_string = parseModifiers(
              applyModifiersToObject({
                construction_turns: (local_building.construction_turns) ?
                  local_building.construction_turns : config.defines.economy.construction_turns
              }, usr.modifiers.construction_time),
            undefined, undefined, undefined, local_options);

            //Insert linebreaks to strings
            if (costs_string.length != 0)
              costs_string = `\n${costs_string}`;
            if (manpower_string.length != 0)
              manpower_string = `\n${manpower_string}`;
            if (production_string.length != 0)
              production_string = `\n${production_string}`;
            if (maintenance_string.length != 0)
              maintenance_string = `\n${maintenance_string}`;
            if (construction_string.length != 0)
              construction_string = `\n${construction_string}`;

            //Push to local fields
            local_fields.push({
              name: `${building_icon} __**${building_name}**:__`,
              value: `\`\`\`yaml\n${truncateString(`${costs_string}${manpower_string}${production_string}${maintenance_string}\n${construction_string}`, 1000)}\`\`\``,
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
          placeholder: `⭭ Select Building Category ..`
        });
      }
    } else {
      printError(game_obj.id, `You must have a capital city first before you can construct any buildings!`);
    }

    //Return statement
    return all_embeds;
  },

  /*
    printBuilding() - Displays the UI for an individual building
    options: {
      do_not_display: true/false - Whether to display the UI
    }
  */
  printBuilding: function (arg0_user, arg1_building_id, arg2_page, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_id = arg1_building_id;
    var page = (arg2_page) ? parseInt(arg2_page) : 0;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_string = [];
    var game_obj = getGameObject(user_id);
    var local_building = (typeof building_id != "object") ? getBuildingByID(building_id) : building_id;
    var usr = main.users[actual_id];

    if (local_building) {
      var building_expenditures = getBuildingLastTurnExpenditures(local_building);
      var building_input_fulfilment = getBuildingInputFulfilment(local_building);
      var building_production = getBuildingProduction({ building_object: local_building });
      var building_profit = returnSafeNumber(local_building.profit);
      var building_revenue = returnSafeNumber(getBuildingLastTurnRevenue(local_building));
      var has_production_choice = hasProductionChoice(local_building);
      var province_id = local_building.id.split("-")[0];
      var province_obj = main.provinces[province_id];

      var building_other_expenditures = (building_revenue - building_expenditures) - building_profit;

      if (province_obj) {
        var actual_id = main.global.user_map[user_id];
        var config_obj = getBuilding(local_building.building_type);
        var usr = main.users[actual_id];

        //Set local_building.name if it doesn't exist
        if (!local_building.name)
          local_building.name = generateBuildingName(province_id, local_building.building_type);

        //Push building name and display ID; current national owner
        building_string.push(`${(local_building.custom_name) ? `${config.icons.old_scroll} ` : ""}__**${local_building.name}:**__ (ID: ${local_building.id})`);
        building_string.push("");
        building_string.push(`**[Rename Building]** | **[Demolish]**`);
        building_string.push("");
        building_string.push(`- Province: **${(province_obj.name) ? province_obj.name : province_id}**`);
        building_string.push(` - Building Type: ${(config_obj.name) ? config_obj.name : local_building.building_type}`);
        building_string.push(`- Owner (Nationality): __${usr.name}__`);

        building_string.push(`- Subsidised: ${(local_building.subsidised) ? `${config.icons.checkmark} **[Turn Off Subsidies]**` : `${config.icons.cross} **[Subsidise]**`}`);

        if (!local_building.insolvent) { //[WIP] - Add additional goods in the future
          var has_profit_string = false;

          building_string.push("");
          building_string.push(`- Liquidity: ${config.icons.money} ${parseNumber(local_building.stockpile.money)}`);
          if (building_profit > 0) {
            building_string.push(` - Profit: ${config.icons.money} ${parseNumber(building_profit, { display_prefix: true })}`);
            has_profit_string = true;
          } else if (building_profit < 0) {
            building_string.push(` - :warning: Deficit: ${config.icons.money} ${parseNumber(building_profit, { display_prefix: true })}`);
            has_profit_string = true;
          }

          if (has_profit_string) {
            //Print goods revenue
            if (local_building.goods_revenue)
              building_string.push(`   - ${config.icons.money} ${parseNumber(local_building.goods_revenue, { display_prefix: true })} from selling produced goods`);

            //Print wage cost
            if (local_building.wage_cost)
              building_string.push(`   - ${config.icons.money} ${parseNumber(local_building.wage_cost*-1, { display_prefix: true })} from paying wages`);

            //Print tax cost
            if (local_building.taxes)
              building_string.push(`   - ${config.icons.money} ${parseNumber(local_building.taxes*-1, { display_prefix: true })} from taxes`);

            //Print other expenditures
            if (building_other_expenditures > 0)
              building_string.push(`   - ${config.icons.money} ${parseNumber(building_other_expenditures*-1, { display_prefix: true })} from other expenditures, such as hiring/purchasing input goods`);
          }

          if (local_building.insolvency_turns)
            building_string.push(` - This building has been insolvent for **${parseNumber(local_building.insolvency_turns)}** turn(s).`);
        } else {
          building_string.push("");
          building_string.push(`- This building is currently __Insolvent__! We must manually **[Reopen]** this building for ${config.icons.money} ${parseNumber(getReopenCost(local_building))} instead.`);
        }

        //Display building employment
        if (config_obj.manpower_cost) {
          var building_employment_level = getBuildingEmploymentLevel(local_building);
          var employment_string = getBuildingEmploymentLocalisation(local_building, config_obj.manpower_cost);

          //Push to building_string
          building_string.push("");
          building_string.push(`**Employment:** ${(building_employment_level == 0) ? `:warning: ` : ""}${printPercentage(building_employment_level)} [View Hiring]`);
          building_string.push("");

          for (var i = 0; i < employment_string.length; i++)
            building_string.push(employment_string[i]);
        }

        //Display building Production Choices; Input Fulfilment, and Base Production Choice - even if the building only has a base Production Choice, this information must be displayed to the user.
        if (config_obj.produces) {
          var all_production_keys = Object.keys(config_obj.produces);
          var effective_production = getBuildingEffectiveProduction(local_building);
          var effective_production_string = ` | Effective Production: ${(effective_production[0] == effective_production[1]) ? `${printPercentage(effective_production[0])}` : `${printPercentage(effective_production[0])} - ${printPercentage(effective_production[1])}`}`;

          building_string.push("");
          building_string.push(config.localisation.divider);
          building_string.push("");
          building_string.push(`${(!game_obj.hide_production_choices) ? `**[Hide Production Choices]**` : `**[Show Production Choices]**`} | **[Change Production Choice]**`);
          building_string.push("");

          building_string.push(`Input Fulfilment: ${(building_input_fulfilment[0] == building_input_fulfilment[1]) ? `**${printPercentage(building_input_fulfilment[0])}**` : `**${printPercentage(building_input_fulfilment[0])}** - ${printPercentage(building_input_fulfilment[1])}`}${effective_production_string}`);
            building_string.push(`- Production Choice: ${parseProductionChoice(local_building.building_type, local_building.production_choice)}`);

          //Print building_production
          if (Object.keys(building_production).length > 0) {
            var production_string = parseGoods(building_production, { nesting: 2 });

            building_string = appendArrays(building_string, production_string);
          } else {
            building_string.push(` - _Not currently producing anything._`);
          }

          //Set Production Choice information
          if (!options.hide_production_choices) {
            building_string.push("");
            building_string.push(`**Production Choices:**`);
            building_string.push(`> Production figures assume that Employment and Input Fulfilment are at 100%.`);
            building_string.push("");
          }

          if (has_production_choice)
            //Display all_production_keys and current chosen production choice
            if (!options.hide_production_choices)
              for (var i = 0; i < all_production_keys.length; i++)
                if (all_production_keys[i].startsWith("production_choice_")) {
                  var production_choice_name = all_production_keys[i].replace("production_choice_", "");
                  var production_choice_obj = getProductionChoiceOutput({
                    province_id: province_id,
                    building_object: local_building,

                    production_choice: production_choice_name
                  });

                  //Push production choices to building_string
                  building_string.push(`- ${parseProductionChoice(local_building.building_type, production_choice_name)}: **[Switch to ${parseProductionChoice(local_building.building_type, production_choice_name)}]**`);
                  building_string.push(` - ${parseProductionChoiceOutputs(production_choice_obj)}`);
                }

          //Base production chain output
          if (!options.hide_production_choices) {
            var base_production_choice_obj = getProductionChoiceOutput({
              province_id: province_id,
              building_object: local_building
            });
            var base_production_choice_string = parseProductionChoiceOutputs(base_production_choice_obj);

            if (base_production_choice_string.length > 0) {
              building_string.push(`- Base (Prod. Choice): **[Switch to Base]**`);
              building_string.push(` - ${base_production_choice_string}`);
            } else {
              building_string.push(`- Base (Prod. Choice): **[Switch to Base]**`);
              building_string.push(` - _Deactivates building._`);
            }
          }
        }

        //Create embed and edit to message
        var building_embeds = splitEmbed(building_string, {
          title: `[Back] | [Jump To Page] | Viewing Building:`,
          title_pages: true,
          fixed_width: true
        });

        if (!options.do_not_display) {
          game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
            embed_pages: building_embeds,
            user: game_obj.user,
            page: page
          });
          game_obj.main_change = true;
        }

        //Return statement
        return { id: building_id, embeds: building_embeds };
      } else {
        printError(game_obj.id, `The building was located in an invalid province. Please contact an administrator.`);
      }
    } else {
      printError(game_obj.id, `The building you have specified does not exist!`);
    }
  },

  printBuildingHiringTooltip: function (arg0_user, arg1_building_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_id = arg1_building_id;

    //Declare local instance variables
    var building_obj = getBuildingByID(building_id);
    var game_obj = getGameObject(user_id);
    var has_error = false;
    var hiring_string = [];

    //Format hiring_string
    if (building_obj) {
      var config_obj = lookup.all_buildings[building_obj.building_type];
      var manpower_obj = {};

      if (config_obj.manpower_cost)
        manpower_obj = flattenObject(config_obj.manpower_cost);
      var all_pop_types = Object.keys(manpower_obj);

      //Check if building requires manpower
      if (all_pop_types.length > 0) {
        var profit_obj = getBuildingProfit(building_obj, { return_object: true });

        //Display minimum hiring liquidity
        var full_employment_production = getBuildingFullEmploymentProduction(building_obj);
        var full_employment_profit = getBuildingRevenue(building_obj, { goods: full_employment_production });
        var minimum_hiring_liquidity = getBuildingMinHiringLiquidity(building_obj, {
          expenditure: profit_obj.expenditure
        });

        hiring_string.push(`Full Employment Profit: ${config.icons.money} **${parseNumber(full_employment_profit)}**`);
        hiring_string.push(`Hiring Liquidity: ${config.icons.money} ${parseNumber(minimum_hiring_liquidity)}`);
        hiring_string.push("");

        //Iterate over all_pop_types to fetch the hiring position for each one
        for (var i = 0; i < all_pop_types.length; i++) {
          var local_hiring_obj = getBuildingHiringPositions(building_obj, {
            pop_type: all_pop_types[i],
            profit_obj: profit_obj,
            return_object: true
          });
          var local_pop = config.pops[all_pop_types[i]];

          //First pop type; display whether building has_deficit/has_full_employment_profit/has_liquidity
          if (i == 0) {
            hiring_string.push(`${numberCheck(local_hiring_obj.hiring_positions)} Will Hire:`);

            hiring_string.push(`- ${booleanCheck((local_hiring_obj.employment_level < 1))} Is not fully staffed AND:`)

            hiring_string.push(`- Any of the following are true:`);
            hiring_string.push(` - Condition 1:`);
            hiring_string.push(`   - ${booleanCheck(building_obj.subsidised)} Building is subsidised AND ${booleanCheck((local_hiring_obj.employment_level < 1))} Employment Level is <100%`);

            hiring_string.push(` - Condition 2:`);
            hiring_string.push(`   - ${booleanCheck(local_hiring_obj.has_liquidity)} Has Liquidity AND ${booleanCheck(local_hiring_obj.has_deficit)} Has Deficit AND ${booleanCheck(local_hiring_obj.has_full_employment_profit)} Has Full Employment Profit OR:`);
            hiring_string.push(`   - ${booleanCheck(local_hiring_obj.has_liquidity)} Has Liquidity AND ${booleanCheck((local_hiring_obj.employment_level < config.defines.economy.min_hire_threshold))} ${printPercentage(local_hiring_obj.employment_level)} Employment Level is < ${printPercentage(config.defines.economy.min_hire_threshold)} Min. Hiring Threshold`);

            hiring_string.push(` - Condition 3:`);
            hiring_string.push(`   - ${booleanCheck(local_hiring_obj.has_liquidity)} Has Liquidity AND ${booleanCheck(!local_hiring_obj.has_deficit)} No Deficit`);

            hiring_string.push("");
          }

          //Push pop hiring positions
          if (local_hiring_obj.hiring_positions > 0) {
            hiring_string.push(`- Will hire ${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_hiring_obj.hiring_positions)} ${(local_pop.name) ? local_pop.name : all_pop_types[i]} (${config.icons.money} ${config.icons.money} ${parseNumber(local_hiring_obj.wage, { display_float: true })} per turn)`);
            hiring_string.push("");
          }
        }

        hiring_string.push(`> **Note:** Pops will not be hired if Full Employment Profit is £0, or if there are no available labourers in the Province to take ub open job positions. Pops will seek out the highest-paying jobs available to them on the individual level.`);
      } else {
        hiring_string.push(`__${(building_obj.name) ? building_obj.name : building_id}__ _does not require manpower to function._`);
      }
    } else {
      has_error = true;
      hiring_string.push(`The building you have specified could not be found.`);
    }

    //Print alert/error
    if (hiring_string.length > 0)
      (!has_error) ?
        printAlert(game_obj.id, hiring_string.join("\n")) :
        printError(game_obj.id, hiring_string.join("\n"));

    //Return statement
    return hiring_string;
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

          construction_string.push("");
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
  },

  /*
    printIndustry() - Prints a country's overall industry
    options: {
      do_not_display: true/false - Whether to display the UI
    }
  */
  printIndustry: function (arg0_user, arg1_page, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? arg1_page : 0;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_totals = {};
    var game_obj = getGameObject(user_id);
    var has_buildings = false;
    var provinces = sortProvinces(user_id, "population_descending");
    var usr = main.users[actual_id];

    //Initialise missing variables
    if (!game_obj.building_sort) game_obj.building_sort = "alphabetical";

    //Format buildings_string
    var buildings_string = [];

    buildings_string.push(`**[Build]** | **[Demolish]** | **[Mass Change Production Choice]** | **[Rename Building]** | **[Reopen]** - ${(usr.all_subsidies) ? `${config.icons.money}${config.icons.checkmark} **[Disable All Subsidies]**` : `${config.icons.money}${config.icons.cross} **[Subsidise All Buildings]**`}`);
    buildings_string.push(`- ${(game_obj.hide_build_list_details) ? `**[Show All Details]**` : `**[Hide All Details]**`} Sort by: **[Alphabetical]** | **[Category]** | **[Chronology]** | **[Numeric]** | **[Cash Reserves]** | **[Employment]**`);
    buildings_string.push("");
    buildings_string.push(`_Displaying all_ **Buildings** _in_ **${config.localisation[`sort_${game_obj.building_sort}`]}**:`);
    buildings_string.push("");

    //Display building totals first
    {
      for (var i = 0; i < provinces.length; i++)
        if (provinces[i].buildings)
          for (var x = 0; x < provinces[i].buildings.length; x++) {
            var local_building = provinces[i].buildings[x];

            modifyValue(building_totals, local_building.building_type, 1);
          }
      building_totals = sortObject(building_totals);

      var all_building_keys = Object.keys(building_totals);

      if (all_building_keys.length > 0) {
        var total_buildings = 0;

        buildings_string.push(`Our total domestic industries and infrastructure are comprised of the following buildings:`);
        buildings_string.push("");

        for (var i = 0; i < all_building_keys.length; i++) {
          var building_obj = lookup.all_buildings[all_building_keys[i]];
          var local_value = building_totals[all_building_keys[i]];

          total_buildings += local_value;

          buildings_string.push(`- **${parseNumber(local_value)}** ${(building_obj.name) ? building_obj.name : all_building_keys[i]}`);
        }

        buildings_string.push("");
        buildings_string.push(`For a sum total of **${parseNumber(total_buildings)}** building(s) scattered throughout our realm.`);
        buildings_string.push("");
      }
    }

    {
      //City by city view
      buildings_string.push(`> **City Name:**`);
      buildings_string.push(`> - __Building Name:__ | Cash Reserves - Employment - Prod. Choice - Subsidised (${config.icons.taxes}) - Hiring (${config.icons.population}) - Effective Production`);
      buildings_string.push("");

      //Iterate over provinces and the buildings inside them
      for (var i = 0; i < provinces.length; i++)
        if (provinces[i].buildings) {
          var new_buildings = JSON.parse(JSON.stringify(provinces[i].buildings));

          new_buildings = sortBuildings(new_buildings, game_obj.building_sort);
          if (provinces[i].buildings.length > 0) has_buildings = true;

          buildings_string.push(`**${(provinces[i].name) ? provinces[i].name : `Province ${provinces[i].id}`}:** ${config.icons.population} ${parseNumber(provinces[i].pops.population)}`);

          for (var x = 0; x < new_buildings.length; x++) {
            var local_building_string = getBuildingLocalisation(new_buildings[x], { exclude_details: game_obj.hide_build_list_details });

            if (local_building_string)
              for (var y = 0; y < local_building_string.length; y++)
                buildings_string.push(local_building_string[y]);
          }

          buildings_string.push("");
        }
    }

    if (!has_buildings)
      buildings_string.push(`_You currently have no active buildings in your country. Construct some by typing_ **[Build]**.`);

    //Create embed and edit to message
    var building_embeds = splitEmbed(buildings_string, {
      title: `[Back] | [Jump To Page] | Buildings in ${usr.name}:`,
      title_pages: true,
      fixed_width: true
    });

    if (!options.do_not_display) {
      game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
        embed_pages: building_embeds,
        user: game_obj.user,
        page: page
      });
      game_obj.main_change = true;
    }

    //Return statement
    return building_embeds;
  },

  /*
    printProvinceBuildings() - Prints a list of a player's province buildings depending on the current sorting mode
    options: {
      do_not_display: true/false - Whether to display the UI in the first place
    }
  */
  printProvinceBuildings: function (arg0_user, arg1_province_id, arg2_page, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var page = (arg2_page) ? parseInt(arg2_page) : 0;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    //Initialise missing variables
    if (!game_obj.building_sort) game_obj.building_sort = "alphabetical";

    //Format buildings_string
    var buildings_string = [];


    //Iterate over all buildings in province
    if (province_obj) {
      buildings_string.push(`**[Build]** | **[Demolish]** | **[Mass Change Production Choice]** | **[Rename Building]** | **[Reopen]** - **[Defund All Buildings]** | **[Subsidise All Buildings]**`);
      buildings_string.push(`- ${(game_obj.hide_build_list_details) ? `**[Show All Details]**` : `**[Hide All Details]**`} Sort by: **[Alphabetical]** | **[Category]** | **[Chronology]** | **[Numeric]** | **[Cash Reserves]** | **[Employment]**`);
      buildings_string.push("");
      buildings_string.push(`_Displaying local_ **Buildings** _in_ **${config.localisation[`sort_${game_obj.building_sort}`]}**:`);
      buildings_string.push("");
      buildings_string.push(`> **Key:**`);
      buildings_string.push(`> __Building Name:__ | Cash Reserves - Employment - Effective Production`);
      buildings_string.push("");

      if (province_obj.buildings) {
        var new_buildings = JSON.parse(JSON.stringify(province_obj.buildings));

        new_buildings = sortBuildings(new_buildings, game_obj.building_sort);

        for (var i = 0; i < new_buildings.length; i++) {
          var local_building_string = getBuildingLocalisation(new_buildings[i]);

          if (local_building_string)
            for (var x = 0; x < local_building_string.length; x++)
              buildings_string.push(local_building_string[x]);
        }
      } else {
        buildings_string.push(`_This province currently has no buildings. Type_ **[Build]** _to construct some buildings in this province._`);
      }
    } else {
      printError(game_obj.id, `The specified province, **${province_id}** doesn't exist!`);
    }

    //Create embed and edit to message
    var building_embeds = splitEmbed(buildings_string, {
      title: `[Back] | [Jump To Page] | Buildings in ${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}:`,
      title_pages: true,
      fixed_width: true
    });

    if (!options.do_not_display) {
      game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
        embed_pages: building_embeds,
        user: game_obj.user,
        page: page
      });
      game_obj.main_change = true;
    }

    //Return statement
    return building_embeds;
  }
};
