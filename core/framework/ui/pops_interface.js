module.exports = {
  //printDemographics() - Prints a province's demographics where possible
  printDemographics: function (arg0_user, arg1_province_id, arg2_page, arg3_do_not_display) { //[WIP] - Finish function body; deaths; migration/education stats
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var page = (arg2_page) ? parseInt(arg2_page) : 0;
    var do_not_display = arg3_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local instance variables
    var all_embeds = [];
    var all_pops = Object.keys(config.pops);
    var pops_string = [];
    var pops_to_display = [];
    var province_obj = (main.provinces[province_id]) ? main.provinces[province_id] : getProvince(province_id);
    var relevant_pops = getRelevantPops(user_id);

    //Calculate pops_to_display
    pops_to_display = JSON.parse(JSON.stringify(relevant_pops));

    for (var i = 0; i < all_pops.length; i++)
      if (!pops_to_display.includes(all_pops[i])) {
        var display_pop = false;
        var local_value = usr.pops[all_pops[i]];

        if (game_obj.display_irrelevant_pops && local_value != 0)
          display_pop = true;
        if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
          display_pop = true;

        if (display_pop) pops_to_display.push(all_pops[i]);
      }

    //Format pops_string
    if (province_obj) {
      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);
        var birth_obj = getProvinceBirths(user_id, province_id);

        //[WIP] - Push view and sort buttons to pops_string

        //Pop totals and percentage breakdown
        {
          pops_string.push(`**Population Breakdown:** - ${(game_obj.minimise_pop_breakdown) ? `**[Expand Pop Breakdown]**` : `**[Minimise Pop Breakdown]**`}`);

          if (!game_obj.minimise_pop_breakdown) {
            pops_string.push("");
            pops_string.push(`${config.localisation.divider}`);
            pops_string.push("");
            pops_string.push(`${(game_obj.hide_profession_breakdown) ? `**[Expand Profession Breakdown]**` : `**[Hide Profession Breakdown]**`}`);
            pops_string.push("");
            pops_string.push(`${config.icons.population} Population: **${parseNumber(province_obj.pops.population)}**`);

            if (!game_obj.hide_profession_breakdown)
              for (var i = 0; i < pops_to_display.length; i++) {
                var local_value = returnSafeNumber(province_obj.pops[pops_to_display[i]]);

                var pop_obj = config.pops[pops_to_display[i]];
                var local_mobility = getPopMobility(province_id, pops_to_display[i]);
                var local_percentage = local_value/returnSafeNumber(province_obj.pops.population);

                //Print to pops_string
                pops_string.push(`- ${(config.icons[pop_obj.icon]) ? config.icons[pop_obj.icon] + " " : ""}${(pop_obj.name) ? pop_obj.name : pops_to_display[i]}: ${parseNumber(local_value)} (**${printPercentage(local_percentage, { display_float: true })}**)`);

                //Get local_mobility change
                if (local_mobility.change > 0) {
                  var all_demotes = Object.keys(local_mobility.demotion);
                  var all_promotes = Object.keys(local_mobility.promotion);

                  pops_string.push(` - **${parseNumber(local_mobility.promotion.total, { display_prefix: true })}** Promoted`);
                  for (var x = 0; x < all_promotes.length; x++)
                    if (config.pops[all_promotes[x]]) {
                      var local_promoted  = local_mobility.promotion[all_promotes[x]];

                      pops_string.push(`   - ${parseNumber(local_promoted)} from ${parsePop(all_promotes[x])}`);
                    }

                  pops_string.push(` - **${parseNumber(local_mobility.demotion.total*-1, { display_prefix: true })}** Demoted`);
                  for (var x = 0; x < all_demotes.length; x++)
                    if (config.pops[all_demotes[x]]) {
                      var local_demoted = local_mobility.demotion[all_demotes[x]];

                      pops_string.push(`   - ${parseNumber(local_demoted)} to ${parsePop(all_demotes[x])}`);
                    }

                  pops_string.push(` - **${parseNumber(local_mobility.change, { display_prefix: true })}** Profession Growth`);
                }
              }

            //General pop stats (Birth rate, mortality, immigration, emigration) [WIP] - Add mortality/immigration/emigration
            pops_string.push("");
            pops_string.push(`**General Statistics:**`);
            pops_string.push("");
            pops_string.push(`${config.localisation.divider}`);
            pops_string.push("");

            if (province_obj.owner != province_obj.controller) {
              pops_string.push(`> This province is currently occupied! Population growth is paused until it is liberated or transferred.`);
              pops_string.push("");
            }
            pops_string.push(`- Births: ${parseNumber(birth_obj.total, { display_prefix: true })} (**${printPercentage(birth_obj.total/province_obj.pops.population)}**)`);
          }
        }

        //Economic pop stats (GDP per capita, Median wage per pop, median wage for province; Unemployment)
        {
          var province_gdp = getProvinceGDP(province_id);
          var province_gdp_per_capita = province_gdp/returnSafeNumber(province_obj.pops.population);
          var province_homeless = returnSafeNumber(province_obj.pops.population) - province_obj.housing;

          pops_string.push("");
          pops_string.push(`**Economic Statistics:** - ${(game_obj.minimise_economic_statistics) ? `**[Expand Economic Statistics]` : `**[Minimise Economic Statistics]**`}`);

          if (!game_obj.minimise_economic_statistics) {
            pops_string.push("");
            pops_string.push(`${config.localisation.divider}`);
            pops_string.push("");

            pops_string.push(`**Average Needs Fulfilment By Category:**`);
            pops_string.push("");
            pops_string.push(`>  - Goods Category - [Pop Icon - Fulfilment %/Variety %]`);
            pops_string.push("");

            //Average needs fulfilment/variety per category for all pops
            for (var i = 0; i < lookup.all_pop_needs_categories.length; i++) {
              var local_fulfilment_string = [];

              for (var x = 0; x < pops_to_display.length; x++) {
                var local_pop = config.pops[pops_to_display[x]];
                var pop_fulfilment = getActualPopFulfilment({
                  province_id: province_id,
                  pop_type: pops_to_display[x],

                  good_scope: lookup.all_pop_needs_categories[i]
                });

                //Push pop icon; fulfilment/variety percentages to local_fulfilment_string
                local_fulfilment_string.push(`${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""} - ${printPercentage(pop_fulfilment.fulfilment)}/${printPercentage(pop_fulfilment.variety)}`);
              }

              pops_string.push(`- **${config.localisation[lookup.all_pop_needs_categories[i]]}** - ${local_fulfilment_string.join(", ")}`);
            }

            //GDP/GDP per capita
            pops_string.push("");
            pops_string.push(`- GDP (Local): ${config.icons.money} ${parseNumber(province_gdp)}`);
            pops_string.push(` - Per capita: ${parseNumber(province_gdp_per_capita)}`);

            //Housing/Homelessness
            pops_string.push(`- ${config.icons.neighbourhoods} Housing: ${parseNumber(province_obj.housing)}`);
            pops_string.push(` - Homelessness: ${parseNumber(province_homeless)} (**${printPercentage(province_homeless/province_obj.pops.population)}**)`);

            //Median Wage per pop type
            pops_string.push("");
            pops_string.push(`**Median Wage by Profession:**`);
            pops_string.push("");

            for (var i = 0; i < pops_to_display.length; i++) {
              var median_wage = getMedianWage(province_id, { pop_type: pops_to_display[i] });

              //Push to pops_string
              pops_string.push(`- ${parsePop(pops_to_display[i])}: **${parseNumber(median_wage)}**`);
            }

            pops_string.push("");
            pops_string.push(`- ${config.icons.taxes} Median Wage (Total): **${printPercentage(getTotalMedianWage(province_id))}**`);
            pops_string.push("");

            //Unemployment Rates per pop type
            pops_string.push("");
            pops_string.push(`**Unemployment Rates by Profession:**`);
            pops_string.push("");

            var total_unemployed_pops = 0;
            for (var i = 0; i < pops_to_display.length; i++) {
              var unemployed_pops = getUnemployedPops(province_id, pops_to_display[i], true);

              pops_string.push(`- ${parsePop(pops_to_display[i])}: ${printPercentage(unemployed_pops/returnSafeNumber(province_obj.pops[pops_to_display[i]]))}`);

              total_unemployed_pops += unemployed_pops;
            }

            pops_string.push("");
            pops_string.push(`- ${config.icons.workers} Total Unemployment Rate: **${printPercentage(total_unemployed_pops/province_obj.pops.population)}`);
          }
        }

        //Wealth Pools
        {
          pops_string.push("");
          pops_string.push(`**Wealth Pools:** - ${(game_obj.minimise_wealth_pools) ? `**[Expand Wealth Pools]**` : `**[Minimise Wealth Pools]**`}`);

          //[WIP] - Special edge case handling for subsistence/RGO pops

          if (!game_obj.minimise_wealth_pools) {
            pops_string.push("");
            pops_string.push(`- ${(game_obj.hide_pop_details) ? `**[Show All Details]**` : `**[Hide All Details]**`}${(game_obj.hide_employers) ? `**[Show Employers]**` : `**[Hide Employers]**`}${(game_obj.hide_needs_categories) ? `**[Show Needs Categories]**` : `**[Hide Needs Categories]**`}`);
            pops_string.push("");

            //Display demographics key
            pops_string.push(`>  - [Pop Icon] Size | Wealth (Net) - Income (Per Capita) | [Fulfilment %/Variety %]`);
            pops_string.push(`>    - Employer: Building Name`);
            pops_string.push(`>    - Goods Category - Fulfilment %/Variety %`);
            pops_string.push("");

            //Iterate over all wealth pools first
            for (var i = 0; i < all_pop_keys.length; i++)
              if (all_pop_keys[i].startsWith("wealth-")) {
                var split_wealth_key = all_pop_keys[i].split("-");

                var local_building_id = split_wealth_key[1];
                var local_pop_type = split_wealth_key[2];
                var local_pop = config.pops[local_pop_type];
                var local_wealth_pool = province_obj.pops[all_pop_keys[i]];
                var per_capita_income = local_wealth_pool.income/local_wealth_pool.size;

                var local_building = getBuildingByID(local_building_id);

                pops_string.push(`- ${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}${parseNumber(local_wealth_pool.size)} ${(local_pop.name) ? local_pop.name : local_pop_type} | ${config.icons.money} ${parseNumber(local_wealth_pool.wealth)} - ${config.icons.coins} ${parseNumber(per_capita_income)} | [${printPercentage(local_wealth_pool.fulfilment)}/${printPercentage(local_wealth_pool.variety)}]`);

                if (!game_obj.hide_employers)
                  pops_string.push(` - Employer: ${(local_building.name) ? local_building.name : local_building_id}`);

                if (local_pop.per_100k)
                  if (local_pop.per_100k.needs) {
                    var all_needs_categories = Object.keys(local_pop.per_100k.needs);

                    if (!game_obj.hide_needs_categories)
                      for (var x = 0; x < all_needs_categories.length; x++) {
                        var category_name = config.localisation[all_needs_categories[x]];
                        var local_fulfilment = local_wealth_pool[`${all_needs_categories[x]}-fulfilment`];
                        var local_variety = local_wealth_pool[`${all_needs_categories[x]}-variety`];

                        pops_string.push(` - ${(category_name) ? category_name : all_needs_categories[x]} - ${printPercentage(local_fulfilment)}/${printPercentage(local_variety)}`);
                      }
                  }
              }
          }
        }

        //[WIP] - Process remainder pops

        //Display UI
        var all_embeds = splitEmbed(pops_string, {
          title: `[Back] | [Jump To Page] | Demographics of ${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}:`,
          title_pages: true,
          fixed_width: true
        });

        if (!do_not_display) {
          game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
            embed_pages: all_embeds,
            user: game_obj.user,
            page: page
          });
          game_obj.main_change = true;
        }

        //Return statement
        return all_embeds;
      } else {
        pops_string.push(`_This province is currently uninhabited._`);
      }
    } else {
      printError(game_obj.id, `The province you have specified, **${province_id}**, doesn't exist!`);
    }
  },

  /*
    printPops() - Displays a user's pops countrywide pops
  */
  printPops: function (arg0_user, arg1_page) { //[WIP] - Finish function body
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? parseInt(arg1_page) : 0;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_embeds = [];
    var all_fields = [];
    var all_modifiers = getAllModifiers();
    var all_pops = Object.keys(config.pops);
    var all_provinces = getProvinces(user_id);
    var pop_obj = getDemographics(user_id);
    var pops_to_display = [];
    var relevant_pops = getRelevantPops(user_id);

    //Calculate pops_to_display
    pops_to_display = JSON.parse(JSON.stringify(relevant_pops));

    for (var i = 0; i < all_pops.length; i++)
      if (!pops_to_display.includes(all_pops[i])) {
        var display_pop = false;
        var local_value = usr.pops[all_pops[i]];

        if (game_obj.display_irrelevant_pops && local_value != 0)
          display_pop = true;
        if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
          display_pop = true;

        if (display_pop) pops_to_display.push(all_pops[i]);
      }

    //Page 1 - Total Pops
    {
      //Initialise pops_string and other formatting variables
      var pops_string = [];
      var rural_pops_string = [];
      var urban_pops_string = [];

      //Format pops_string
      {
        pops_string.push(`**[${(game_obj.display_irrelevant_pops) ? `Display Relevant Pops` : `Display Irrelevant Pops`}]** | **[${(game_obj.display_no_pops) ? `Display Populated Pops` : `Display All Pops`}]**`);

        pops_string.push(`- ${config.icons.culture} **[Culture]** | ${config.icons.population} **[View Provinces]**`);
        pops_string.push("");
        pops_string.push(`__**Population Modifiers:**__`);
        pops_string.push(config.localisation.divider);
        pops_string.push("");

        //Print dynamic population modifiers
        var dynamic_modifiers = {};

        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];

          if (local_pop.per_100k) {
            var local_modifiers = Object.keys(local_pop.per_100k);

            for (var x = 0; x < local_modifiers.length; x++) {
              //Increment by modifier
              (dynamic_modifiers[local_modifiers[x]]) ?
                dynamic_modifiers[local_modifiers[x]] + getPopModifier(user_id, all_pops[i], local_modifiers[x]) :
                getPopModifier(user_id, all_pops[i], local_modifiers[x]);
            }
          }
        }

        var all_current_pop_modifiers = Object.keys(dynamic_modifiers);

        if (dynamic_modifiers.length > 0) {
          for (var i = 0; i < all_current_pop_modifiers.length; i++) {
            if (getModifier(all_current_pop_modifiers[i])) { //Is of type modifier
              var local_modifier = getModifier(all_current_pop_modifiers[i]);

              pops_string.push(`${(local_modifier.icon) ? config.icons[local_modifier.icon] + " " : ""}${(local_modifier.name) ? local_modifier.name : all_current_pop_modifiers[i]}: **${printPercentage(usr.modifiers[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
            } else if (getGood(all_current_pop_modifiers[i])) { //Is of type good
              var local_good = getGood(all_current_pop_modifiers[i]);

              pops_string.push(`${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${(local_good.name) ? local_good.name : all_current_pop_modifiers[i]}: **${parseNumber(getGoodAmount(user_id, all_current_pop_modifiers[i]), { display_prefix: true })}**`);
            } else { //Default catch handler
              pops_string.push(`${all_current_pop_modifiers[i]}: **${parseNumber(usr[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
            }
          }

          //Push end-space formatting
          pops_string.push("");
        }

        //Print static population modifiers
        pops_string.push(`${config.icons.development} Population Growth Modifier: **${printPercentage(usr.modifiers.pop_growth_modifier - 1)}**`);
        pops_string.push("");

        pops_string.push(`**__Total Population:__**`);
        pops_string.push(`---`);

        //Total pops
        //Print dynamic total pops - Total
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        //Print dynamic total pops - Availability
        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];

          //Print linebreak if at least one pop's availability is shown in the UI
          if (local_pop && i == 0)
            pops_string.push("");

          if (local_pop.stats_display)
            pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}Available ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(returnSafeNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]]))}**`);
        }

        pops_string.push("");
      }

      //Format urban_pops_string
      {
        urban_pops_string.push("");

        //Print dynamic urban pops
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            urban_pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        urban_pops_string.push("");
      }

      //Format rural_pops_string
      {
        //Rural pops
        rural_pops_string.push("");

        //Print dynamic rural pops
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            rural_pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        rural_pops_string.push("");
      }

      //Push formatted fields to all_fields
      var new_fields = [];
      var urban_pops_split_string = splitText(urban_pops_string, { maximum_characters: 1000 });
      var rural_pops_split_string = splitText(rural_pops_string, { maximum_characters: 1000 });

      for (var i = 0; i < urban_pops_split_string.length; i++)
        all_fields.push({
          name: (i == 0) ?
            `${config.icons.development} __Urban Population:__ **${printPercentage(pop_obj.urban_population/pop_obj.population)}**\n-` :
            `${config.icons.development} __Urban Population:__`,
          value: urban_pops_split_string.join("\n"),
          inline: true
        });

      for (var i = 0; i < rural_pops_split_string.length; i++)
        all_fields.push({
          name: (i == 0) ?
            `${config.icons.provinces} __Rural Population:__ **${printPercentage(pop_obj.rural_population/pop_obj.population)}**\n-` :
            `${config.icons.development} __Rural Population:__`,
          value: rural_pops_split_string.join("\n"),
          inline: true
        });

      for (var i = 0; i < all_fields.length; i++) {
        new_fields.push(all_fields[i]);

        if (i != 0 && i % 2 == 0)
          new_fields.push({ name: config.icons.blank, value: config.icons.blank });
      }

      all_fields = new_fields;

      //Remove control panel if one exists
      removeControlPanel(game_obj.id);

      //Edit main embed display
      var page_one = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**Population:**`)
        .setThumbnail(usr.flag)
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(pops_string.join("\n"))
        .addFields(all_fields);

      all_embeds.push(page_one);
    }

    //Page 2 - Pop Needs - Total Consumption/Production
    {
      var consumption_production_string = [];
      var production_string = getProductionLocalisation(user_id);

      //Format production_string to consumption_production_string
      consumption_production_string.push(`${config.icons.trade} **__Total Resource Production:__ (per turn)**`);
      consumption_production_string.push(`-`);
      consumption_production_string.push("");

      for (var i = 0; i < production_string.length; i++)
        consumption_production_string.push(production_string[i]);
      if (production_string.length == 0)
        consumption_production_string.push(`_You have no goods currently under production!_`);

      //Iterate over lookup.all_pop_needs_categories
      for (var i = 0; i < lookup.all_pop_needs_categories.length; i++) {
        consumption_production_string.push("");

        var local_consumption_obj = getTotalPopConsumption(user_id, lookup.all_pop_needs_categories[i]);
        var needs_category_name = (config.localisation[lookup.all_pop_needs_categories[i]]) ?
          config.localisation[lookup.all_pop_needs_categories[i]] :
          lookup.all_pop_needs_categories[i];

        var all_local_goods = Object.keys(local_consumption_obj);

        //Format local consumption category
        consumption_production_string.push(`**${needs_category_name} Consumption:** (All Pops)`);
        consumption_production_string.push("");
        consumption_production_string.push(`-`);
        consumption_production_string.push("");

        for (var x = 0; x < all_local_goods.length; x++) {
          var local_value = local_consumption_obj[all_local_goods[x]];

          if (lookup.all_goods[all_local_goods[x]])
            consumption_production_string.push(`- ${parseGood(all_local_goods[x], "", false, `${printRange(local_value)} `)}`);
        }
      }

      //Split consumption_production_string over multiple embeds
      var page_two = splitEmbed(consumption_production_string, {
        title: `Total Pop Consumption and Production:`,
        title_pages: true,
        fixed_width: true
      });

      for (var i = 0; i < page_two.length; i++)
        all_embeds.push(page_two[i]);
    }

    //Page 3 - Pop Needs - Pop Needs by Type
    {
      var pop_needs_string = [];

      for (var i = 0; i < pops_to_display.length; i++) {
        var local_pop = config.pops[pops_to_display[i]];
        var local_value = usr.pops[pops_to_display[i]];

        //Push pop header
        pop_needs_string.push(`**__${parsePop(pops_to_display[i])}:__**`);
        pop_needs_string.push("");

        //Iterate over lookup.all_pop_needs_categories
        for (var x = 0; x < lookup.all_pop_needs_categories.length; x++) {
          var category_singular_string = config.localisation[`${lookup.all_pop_needs_categories[x]}_singular`];
          var category_string = config.localisation[lookup.all_pop_needs_categories[x]];
          var local_consumption_obj = getPopNeeds(pops_to_display[i], local_value, lookup.all_pop_needs_categories[x]);
          var local_consumption_string = [];

          if (local_consumption_obj) {
            local_consumption_obj = flattenObject(local_consumption_obj);
            local_consumption_string = parseGoods(local_consumption_obj);
          }

          pop_needs_string.push(`- **${category_string} Consumption:**`);

          if (local_consumption_string.length > 0) {
            for (var y = 0; y < local_consumption_string.length; y++)
              pop_needs_string.push(` ${local_consumption_string[y]}`);
          } else {
            pop_needs_string.push(`_This pop currently has no ${category_singular_string} needs._`);
          }
        }

        pop_needs_string.push("");
      }

      //Split pop_needs_string over multiple embeds
      var page_three = splitEmbed(pop_needs_string, {
        title: `Pop Needs and Fulfilment:`,
        title_pages: true,
        fixed_width: true
      });

      for (var i = 0; i < page_three.length; i++)
        all_embeds.push(page_three[i]);
    }

    game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
      embed_pages: all_embeds,
      user: game_obj.user,
      page: page
    });
    game_obj.main_change = true;
  }
};
