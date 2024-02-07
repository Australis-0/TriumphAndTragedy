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

    //Set province_id
    province_id = province_obj.id;

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
      //Fix provinces
      fixProvinces(province_obj.controller, province_obj.id);

      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);
        var birth_obj = getProvinceBirths(province_id);
        var death_obj = getProvinceDeaths(province_id);
        var demotion_obj = getProvinceDemotion(province_id);
        var emigration_obj = getProvinceEmigration(province_id);
        var immigration_obj = getProvinceImmigration(province_id);
        var promotion_obj = getProvincePromotion(province_id);
        var province_population = getProvincePopulation(province_id);

        var last_turn_population = province_population + returnSafeNumber(death_obj.total) + returnSafeNumber(emigration_obj.total);

        var pop_change_options = {
          birth_obj: birth_obj,
          death_obj: death_obj,
          demotion_obj: demotion_obj,
          emigration_obj: emigration_obj,
          immigration_obj: immigration_obj,
          promotion_obj: promotion_obj
        };

        //[WIP] - Push view and sort buttons to pops_string

        //Pop totals and percentage breakdown
        {
          pops_string.push(`**Population Breakdown:** - ${(game_obj.minimise_pop_breakdown) ? `**[Expand Pop Breakdown]**` : `**[Minimise Pop Breakdown]**`}`);

          if (!game_obj.minimise_pop_breakdown) {
            pops_string.push(`${config.localisation.divider}`);
            pops_string.push(`${(game_obj.hide_profession_breakdown) ? `**[Expand Profession Breakdown]**` : `**[Hide Profession Breakdown]**`}`);
            pops_string.push("");
            pops_string.push(`${config.icons.population} Population: **${parseNumber(province_population)}**`);

            if (!game_obj.hide_profession_breakdown)
              for (var i = 0; i < pops_to_display.length; i++) {
                var local_mobility = getPopMobility(province_id, pops_to_display[i]);
                var local_value = returnSafeNumber(province_obj.pops[pops_to_display[i]]);
                var pop_change = getPopChange(province_id, pops_to_display[i], pop_change_options);
                var pop_obj = config.pops[pops_to_display[i]];

                var local_percentage = local_value/province_population;

                //Print to pops_string
                pops_string.push(`- ${(pop_obj.icon) ? pop_obj.icon + " " : ""}${(pop_obj.name) ? pop_obj.name : pops_to_display[i]}: ${parseNumber(local_value)} (**${printPercentage(local_percentage, { display_float: true })}**)${(pop_change != 0) ? ` | ${parseNumber(pop_change, { display_prefix: true })}` : ""}`);

                //Print local_mobility change
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
            pops_string.push(`${config.localisation.divider}`);

            if (province_obj.owner != province_obj.controller) {
              pops_string.push(`> This province is currently occupied! Population growth is paused until it is liberated or transferred.`);
              pops_string.push("");
            }

            pops_string.push(`- [Births]: ${parseNumber(birth_obj.total, { display_prefix: true })} (**${printPercentage(birth_obj.total/last_turn_population)}**) | [Deaths]: ${parseNumber(death_obj.total, { display_pop: true })} (**${printPercentage(death_obj.total/last_turn_population)}**)`);
            pops_string.push(`- [Immigration]: ${parseNumber(immigration_obj.total, { display_pop: true })} (**${printPercentage(immigration_obj.total/last_turn_population)}**) | [Emigration]: ${parseNumber(emigration_obj.total, { display_pop: true })} (**${printPercentage(emigration_obj.total/last_turn_population)}**)`);
            pops_string.push(`- [Promotion]: ${parseNumber(promotion_obj.total, { display_pop: true })} (**${printPercentage(promotion_obj.total/last_turn_population)}**) | [Demotion]: ${parseNumber(demotion_obj.total, { display_pop: true })} (**${printPercentage(demotion_obj.total/last_turn_population)}**)`);

            //Population Pyramid - [REVISIT] - Only displays age for now
            pops_string.push("");
            pops_string.push(`**Age:** **[${(game_obj.show_age_composition) ? `Hide Age Composition` : `Show Age Composition`}]**`);

            if (game_obj.show_age_composition) {
              pops_string.push("");
              pops_string.push(`> - Age (b. [Birth Year]) - [Number]`)
              pops_string.push("");

              var age_strings = [];

              for (var i = 0; i < all_pop_keys.length; i++)
                if (all_pop_keys[i].startsWith("b_")) {
                  var local_birth_year = parseInt(all_pop_keys[i].replace("b_", ""));
                  var local_value = province_obj.pops[all_pop_keys[i]];

                  if (!isNaN(local_birth_year)) {
                    var local_age = main.date.year - parseInt(local_birth_year);

                    if (returnSafeNumber(local_value) > 0)
                      age_strings.push([local_age, `- ${local_age} (b. ${local_birth_year}) - ${parseNumber(local_value)}`]);
                  }
                }

              //Sort age
              age_strings.sort((a, b) => a[0] - b[0]);

              for (var i = 0; i < age_strings.length; i++)
                pops_string.push(age_strings[i][1]);
            }
          }
        }

        //Economic pop stats (GDP per capita, Median wage per pop, median wage for province; Unemployment)
        {
          var province_gdp = getProvinceGDP(province_id);
          var province_gdp_per_capita = province_gdp/returnSafeNumber(province_population);
          var province_homeless = returnSafeNumber(province_population) - returnSafeNumber(province_obj.housing);

          pops_string.push("");
          pops_string.push(`**Economic Statistics:** - ${(game_obj.minimise_economic_statistics) ? `**[Expand Economic Statistics]**` : `**[Minimise Economic Statistics]**`}`);

          if (!game_obj.minimise_economic_statistics) {
            pops_string.push("");
            pops_string.push(`${config.localisation.divider}`);
            pops_string.push("");

            pops_string.push(`**Average Needs Fulfilment By Category:**`);
            pops_string.push(`>  - Goods Category - [Pop Icon - Fulfilment %/Variety %]`);
            pops_string.push("");

            //Overall needs fulfilment
            var total_fulfilment_string = [];

            for (var i = 0; i < pops_to_display.length; i++) {
              var local_pop = config.pops[pops_to_display[i]];
              var pop_fulfilment = getActualPopFulfilment({
                province_id: province_obj.id,
                pop_type: pops_to_display[i]
              });

              //Push pop icon; fulfilment/variety percentages to total_fulfilment_string
              total_fulfilment_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""} ${printPercentage(pop_fulfilment.fulfilment)}/${printPercentage(pop_fulfilment.variety)}`);
            }

            pops_string.push(`- **Overall Goods** - ${total_fulfilment_string.join(", ")}`);

            //Average needs fulfilment/variety per category for all pops
            for (var i = 0; i < lookup.all_pop_needs_categories.length; i++) {
              var local_fulfilment_string = [];

              for (var x = 0; x < pops_to_display.length; x++) {
                var local_pop = config.pops[pops_to_display[x]];
                var pop_fulfilment = getActualPopFulfilment({
                  province_id: province_obj.id,
                  pop_type: pops_to_display[x],

                  good_scope: lookup.all_pop_needs_categories[i]
                });

                //Push pop icon; fulfilment/variety percentages to local_fulfilment_string
                local_fulfilment_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""} - ${printPercentage(pop_fulfilment.fulfilment)}/${printPercentage(pop_fulfilment.variety)}`);
              }

              pops_string.push(`- **${config.localisation[lookup.all_pop_needs_categories[i]]}** - ${local_fulfilment_string.join(", ")}`);
            }

            //GDP/GDP per capita
            pops_string.push("");
            pops_string.push(`- GDP (Local): ${config.icons.money} ${parseNumber(province_gdp)}`);
            pops_string.push(` - Per capita: ${parseNumber(province_gdp_per_capita, { display_float: true })}`);

            //Housing/Homelessness
            pops_string.push(`- ${config.icons.neighbourhoods} Housing: ${parseNumber(province_obj.housing)}`);
            pops_string.push(` - ${(province_homeless >= 0) ? `Homelessness` : `Housing Surplus`}: ${parseNumber(Math.abs(province_homeless))} (**${printPercentage(Math.abs(province_homeless)/province_population)}**)`);

            //Median Wage per pop type
            pops_string.push("");
            pops_string.push(`**Median Wage by Profession:**`);

            for (var i = 0; i < pops_to_display.length; i++) {
              var median_wage = getMedianWage(province_id, { pop_type: pops_to_display[i] });

              //Push to pops_string
              pops_string.push(`- ${parsePop(pops_to_display[i])}: ${parseNumber(median_wage, { display_float: true })}`);
            }

            pops_string.push("");
            pops_string.push(`- ${config.icons.taxes} Median Wage (Total, Unweighted Avg.): ${config.icons.money}${parseNumber(getTotalMedianWage(province_id), { display_float: true })}`);
            pops_string.push("");

            //Unemployment Rates per pop type
            pops_string.push(`**Unemployment Rates by Profession:**`);

            var total_unemployed_pops = 0;
            for (var i = 0; i < pops_to_display.length; i++) {
              var labour_shortage_string = "";
              var unemployed_pops = getUnemployedPops(province_id, pops_to_display[i], true);
              var unemployment_rate = unemployed_pops/unzero(province_obj.pops[pops_to_display[i]], 1);

              if (unemployment_rate < 0)
                labour_shortage_string = ` - :warning: Labour Shortage!`

              pops_string.push(`- ${parsePop(pops_to_display[i])}: ${printPercentage(unemployment_rate)}${labour_shortage_string}`);

              total_unemployed_pops += unemployed_pops;
            }

            pops_string.push("");
            pops_string.push(`- ${config.icons.labourers} Total Unemployment Rate: **${printPercentage(total_unemployed_pops/province_population)}**`);
          }
        }

        //Wealth Pools
        {
          pops_string.push("");
          pops_string.push(`**Wealth Pools:** - ${(game_obj.minimise_wealth_pools) ? `**[Expand Wealth Pools]**` : `**[Minimise Wealth Pools]**`} | **[View Wealth Pool]**`);

          //[WIP] - Special edge case handling for subsistence/RGO pops
          if (!game_obj.minimise_wealth_pools) {
            pops_string.push("");
            pops_string.push(`- ${(game_obj.hide_pop_details) ? `**[Show All Details]**` : `**[Hide All Details]**`} | ${(game_obj.hide_employers) ? `**[Show Employers]**` : `**[Hide Employers]**`} | ${(game_obj.hide_needs_categories) ? `**[Show Needs Categories]**` : `**[Hide Needs Categories]**`}`);
            pops_string.push("");

            //Display demographics key
            pops_string.push(`>  - [Pop Icon] Size | Wealth (Net) - Income (Per Capita) | [Fulfilment %/Variety %]`);
            pops_string.push(`>    - Employer: Building Name`);
            pops_string.push(`>    - Spending: (Net)`);
            pops_string.push(`>    - Goods Category - Fulfilment %/Variety %`);

            var all_wealth_keys = sortWealthPools(province_obj.id);
            var finished_subsistence = false;
            var subsistence_header = false;

            //Iterate over all wealth pools first
            for (var i = 0; i < all_wealth_keys.length; i++)
              if (all_wealth_keys[i].startsWith("wealth-")) {
                var split_wealth_key = all_wealth_keys[i].split("-");

                var local_building_id = `${split_wealth_key[1]}-${split_wealth_key[2]}`;
                var local_pop_type = split_wealth_key[3];
                var local_pop = config.pops[local_pop_type];
                var local_wealth_pool = province_obj.pops[all_wealth_keys[i]];

                var local_building = getBuildingByID(local_building_id);

                //Non-subsistence handler (Regular buildings)
                if (!all_wealth_keys[i].includes("_subsistence-")) {
                  if (local_building && local_pop) {
                    //Apply formatting break if finished_subsistence
                    if (!finished_subsistence) {
                      pops_string.push(`### __Formal Employers:__`);
                      finished_subsistence = true;
                    }

                    var per_capita_income = local_wealth_pool.income/local_wealth_pool.size;

                    pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_wealth_pool.size)} ${(local_pop.name) ? local_pop.name : local_pop_type} | ${config.icons.money} ${parseNumber(local_wealth_pool.wealth)} - ${config.icons.coins} ${parseNumber(per_capita_income, { display_float: true })} | [${printPercentage(local_wealth_pool.fulfilment)}/${printPercentage(local_wealth_pool.variety)}]`);

                    if (!game_obj.hide_employers) {
                      pops_string.push(` - ID: ${all_wealth_keys[i]}`);
                      pops_string.push(` - Employer: ${(local_building.name) ? local_building.name : local_building_id}`);
                    }
                    if (local_wealth_pool.spending != 0)
                      pops_string.push(` - Spending: -£${parseNumber(Math.abs(local_wealth_pool.spending))}`);

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

                  //If local_building doesn't exist, delete wealth pool
                  if (!local_building)
                    delete province_obj.pops[all_wealth_keys[i]];
                } else if (split_wealth_key.length >= 4) {
                  //Subsistence handler
                  var per_capita_income = local_wealth_pool.income/local_wealth_pool.size;
                  var subsistence_split_key = local_building_id.split("-");

                  var subsistence_building_obj = lookup.all_buildings[subsistence_split_key[1]];

                  //subsistence_header
                  if (!subsistence_header) {
                    pops_string.push(`### __Subsistence:__`);
                    subsistence_header = true;
                  }

                  pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_wealth_pool.size)} ${(local_pop.name) ? local_pop.name : local_pop_type} | ${config.icons.money}${parseNumber(local_wealth_pool.wealth)} - ${config.icons.coins} ${parseNumber(per_capita_income, { display_float: true })} | [${printPercentage(local_wealth_pool.fulfilment)}/${printPercentage(local_wealth_pool.variety)}]`);

                  if (!game_obj.hide_employers) {
                    pops_string.push(` - ID: ${all_wealth_keys[i]}`);
                    pops_string.push(` - Employer (Subsistence): ${(subsistence_building_obj.name) ? subsistence_building_obj.name : subsistence_split_key[1]}`);
                  }
                  if (local_wealth_pool.spending != 0)
                    pops_string.push(` - Spending: -£${parseNumber(Math.abs(local_wealth_pool.spending))}`);

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
    printDemographicsLimitTooltip() - Prints information tooltips for births, deaths, immigration, emigration, promotion, demotion.

    options: {
      do_not_display: true/false, - Whether to display the tooltip. False by default
      mode: "births"/"deaths"/"demotion"/"emigration"/"immigration"/"promotion", - Optional. "births" by default
      pop_scope: {}, - Optional. Optimisation parameter
      pop_types: [] - Optional. All by default
    }
  */
  printDemographicsLimitTooltip: function (arg0_user, arg1_province_id, arg2_options) { //[WIP] - Similar code. Consider optimising in the future
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (!options.mode) options.mode = "births";
    if (!options.pop_types) options.pop_types = Object.keys(config.pops);
      options.pop_types = getList(options.pop_types);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var pop_scope = (!options.pop_scope) ? selectPops({
      province_id: province_id,
      pop_types: options.pop_types
    }) : options.pop_scope;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_obj;
    var usr = main.users[actual_id];

    //Format tooltip_string
    var tooltip_string = [];

    //Sort by mode
    if (options.mode == "births") {
      for (var i = 0; i < options.pop_types.length; i++) {
        var local_pop = config.pops[options.pop_types[i]];

        if (local_pop) {
          var birth_chance = parsePopLimit(config.births, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });

          if (birth_chance.localisation_string.length > 0) {
            tooltip_string.push("");
            tooltip_string.push(`__**${parsePop(options.pop_types[i])} Birth Chance:**__`);
            tooltip_string.push("");

            //Push OEFR first
            var local_population = getProvincePopulation(province_obj.id);
            var local_pop_percentage = returnSafeNumber(province_obj.pops[options.pop_types[i]])/local_population;

            var local_fertile_women = Math.floor(returnSafeNumber(getProvinceFertileWomen(province_obj.id)/local_pop_percentage));

            var local_oefr = getPopOEFR(province_obj.id, options.pop_types[i]);

            tooltip_string.push(`- Optimal Economic Fertility Rate: ${parseNumber(local_oefr, { display_float: true })}`);
            tooltip_string.push(`- Women of Childbearing Age: ${parseNumber(local_fertile_women)}`)

            tooltip_string = appendArrays(tooltip_string, birth_chance.localisation_string);
          }
        }
      }
    } else if (options.mode == "deaths") {
      tooltip_string.push(`- Base Life Expectancy: ${parseNumber(config.defines.economy.old_age_lower_upper_bound)}`);
      tooltip_string.push(` - ${printPercentage(config.defines.economy.life_expectancy_deaths)} of people naturally die at the Life Expectancy, with the mortality function being x^2.`);
      tooltip_string.push("");

      for (var i = 0; i < options.pop_types.length; i++) {
        var local_pop = config.pops[options.pop_types[i]];

        if (local_pop) {
          var death_chance = parsePopLimit(config.deaths, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });

          if (death_chance.localisation_string.length > 0) {
            tooltip_string.push(`__**${parsePop(options.pop_types[i])} Death Chance:**__`);
            tooltip_string.push("");
            tooltip_string = appendArrays(tooltip_string, death_chance.localisation_string);
          }
        }
      }
    } else if (options.mode == "demotion") {
      for (var i = 0; i < options.pop_types.length; i++) {
        var local_pop = config.pops[options.pop_types[i]];

        if (local_pop) {
          var demotion_chance = parsePopLimit(config.pop_mobility.demotion, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });

          if (demotion_chance.localisation_string.length > 0) {
            tooltip_string.push(`__**${parsePop(options.pop_types[i])} Demotion Chance:**__`);
            tooltip_string.push("");
            tooltip_string = appendArrays(tooltip_string, demotion_chance.localisation_string);
          }
        }
      }
    } else if (options.mode == "emigration") {
      for (var i = 0; i < options.pop_types.length; i++) {
        var local_pop = config.pops[options.pop_types[i]];

        if (local_pop) {
          var external_emigration_chance = parsePopLimit(config.pop_migration.external_emigration, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });
          var internal_emigration_chance = parsePopLimit(config.pop_migration.internal_emigration, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });

          if (external_emigration_chance.localisation_string.length > 0) {
            tooltip_string.push(`__**${parsePop(options.pop_types[i])} External Emigration Push:**__`);
            tooltip_string.push("");
            tooltip_string = appendArrays(tooltip_string, external_emigration_chance.localisation_string);
          }

          if (internal_emigration_chance.localisation_string.length > 0) {
            if (external_emigration_chance.length > 0)
              tooltip_string.push(""); //Newline separator if above text block exists

            tooltip_string.push(`__**${parsePop(options.pop_types[i])} Internal Emigration Push:**__`);
            tooltip_string.push("");
            tooltip_string = appendArrays(tooltip_string, internal_emigration_chance.localisation_string);
          }
        }
      }
    } else if (options.mode == "immigration") { //[WIP] - Finish function body

    } else if (options.mode == "promotion") {
      for (var i = 0; i < options.pop_types.length; i++) {
        var local_pop = config.pops[options.pop_types[i]];

        if (local_pop) {
          var promotion_chance = parsePopLimit(config.pop_mobility.promotion, {
            province_id: province_obj.id,
            pop_type: options.pop_types[i]
          });

          if (promotion_chance.localisation_string.length > 0) {
            tooltip_string.push(`__**${parsePop(options.pop_types[i])} Promotion Chance:**__`);
            tooltip_string.push("");
            tooltip_string = appendArrays(tooltip_string, promotion_chance.localisation_string);
          }
        }
      }
    }

    //Display tooltip_string
    if (!options.do_not_display)
      if (tooltip_string.length > 0)
        printAlert(game_obj.id, tooltip_string.join("\n"));

    //Return statement
    return tooltip_string;
  },

  /*
    printJobMarket() - Prints the job market in a province.
    options: {
      do_not_display: true/false, - Optional. Whether to display the UI or not. False by defualt
      page: 0 - Optional. The starting page. 0 by default
    }
  */
  printJobMarket: function (arg0_user, arg1_province_id, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var options = (arg2_options) ? arg2_options : {};

    if (!options.sort) options.sort = "positions";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var page = (options.page) ? options.page : 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var relevant_pops = (game_obj.display_irrelevant_pops) ? Object.keys(config.pops) : getRelevantPops(user_id);
    var usr = main.users[actual_id];

    //Format job_market_string
    var job_market_string = [];

    if (province_obj) {
      if (province_obj.pops) {
        var population = getProvincePopulation(province_obj.id);

        //Initialise job_market_sort
        if (!game_obj.job_market_sort)
          game_obj.job_market_sort = "positions";

        var all_pops = Object.keys(config.pops);
        var building_job_listings = getBuildingHiringMap(province_obj.id, {
          return_job_postings: true, sort: game_obj.job_market_sort
        });
        var pop_job_listings = getBuildingHiringMap(province_obj.id, {
          sort: game_obj.job_market_sort
        });

        job_market_string.push(`Display: ${(game_obj.display_irrelevant_pops) ? `**[Display All Pops]**` : `**[Hide Irrelevant Pops]**`} | Sort by: **[Positions]** | **[Wage]**`);

        //Print job listings by pop type first
        var all_pop_job_listings = Object.keys(pop_job_listings);

        job_market_string.push(`### Job Listings by Pop Type:`);
        job_market_string.push(`> [Pop Icon] (Positions) [Pop Name] - (Median Wage per turn)`);

        if (all_pop_job_listings.length > 0) {
          for (var i = 0; i < all_pop_job_listings.length; i++)
            if (relevant_pops.includes(all_pop_job_listings[i])) {
              var local_listing = pop_job_listings[all_pop_job_listings[i]];
              var local_pop = config.pops[all_pop_job_listings[i]];

              job_market_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_listing.positions)} ${(local_pop.singular) ? local_pop.singular : all_pop_job_listings[i]} Positions - ${config.icons.money}${parseNumber(local_listing.wage, { display_float: true })}`);
            }
        } else {
          job_market_string.push(`_No current job listings apart from subsistence._`);
        }

        job_market_string.push(`### Net Total Unemployment By Profession:`);

        //Print unemployed
        var total_unemployed = 0;

        for (var i = 0; i < relevant_pops.length; i++) {
          var local_pop = config.pops[relevant_pops[i]];
          var unemployed_pops = getUnemployedPops(province_id, relevant_pops[i], true);

          job_market_string.push(`- ${parsePop(relevant_pops[i])}: ${parseNumber(unemployed_pops)}`);

          total_unemployed += unemployed_pops;
        }
        job_market_string.push(`- Total Unemployed: **${parseNumber(total_unemployed)}** (${printPercentage(total_unemployed/population)})`);

        //Print all job listings sorted by position/wage
        var all_building_job_listings = Object.keys(building_job_listings);

        job_market_string.push(`### All Job Listings:`);
        job_market_string.push(`> [Pop Icon] (Positions) [Pop Name] - Employer - Wage per turn`);

        if (all_building_job_listings.length > 0) {
          for (var i = 0; i < all_building_job_listings.length; i++) {
            var local_listing = building_job_listings[all_building_job_listings[i]];
            var split_key = all_building_job_listings[i].split("-");

            var building_id = `${split_key[0]}-${split_key[1]}`;
            var local_building = getBuildingByID(building_id);
            var local_pop = config.pops[split_key[2]];

            //Print listing
            if (relevant_pops.includes(split_key[2])) {
              job_market_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_listing.positions)} ${(local_pop.name) ? local_pop.name : split_key[2]} - ${(local_building) ? local_building.name : building_id} - £${parseNumber(local_listing.wage, { display_float: true })}`);
            }
          }
        } else {
          job_market_string.push(`_No itemised job listings._`);
        }

        //Create embed and edit to message
        var job_market_embeds = splitEmbed(job_market_string, {
          title: `[Back] | [Jump To Page] | Job Market in ${parseProvince(province_obj)}:`,
          title_pages: true,
          fixed_width: true
        });

        if (!options.do_not_display) {
          game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
            embed_pages: job_market_embeds,
            user: game_obj.user,
            page: page
          });
          game_obj.main_change = true;
        }

        //Return statement
        return job_market_embeds;
      } else {
        printError(game_obj.id, `No pops currently live in this province.`);
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
    var pops_to_display = [];
    var relevant_pops = getRelevantPops(user_id);

    //Update population
    getDemographics(user_id);

    var pop_obj = usr.pops;

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
        pops_string.push(config.localisation.divider);
        pops_string.push(`**[${(!game_obj.hide_social_mobility) ? `Hide Social Mobility` : `Display Social Mobility`}]**`);

        //Total pops
        //Print dynamic total pops - Total
        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[all_pops[i]]);

          if (pops_to_display.includes(all_pops[i])) {
            pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);

            //Print local mobility change
            if (!game_obj.hide_social_mobility) {
              var local_mobility = getTotalPopMobility(user_id, all_pops[i]);

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
          }
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
          var local_value = returnSafeNumber(pop_obj[`rural_${all_pops[i]}`]);

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
          value: urban_pops_split_string[i],
          inline: true
        });

      for (var i = 0; i < rural_pops_split_string.length; i++)
        all_fields.push({
          name: (i == 0) ?
            `${config.icons.provinces} __Rural Population:__ **${printPercentage(pop_obj.rural_population/pop_obj.population)}**\n-` :
            `${config.icons.development} __Rural Population:__`,
          value: rural_pops_split_string[i],
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
  },

  printWealthPool: function (arg0_user, arg1_province_id, arg2_wealth_pool_key, arg3_page, arg4_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var wealth_pool_key = arg2_wealth_pool_key;
    var page = (arg3_page) ? parseInt(arg3_page) : 0;
    var do_not_display = arg4_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var usr = main.users[actual_id];
    var wealth_pool_string = [];

    if (province_obj) {
      if (province_obj.pops) {
        var artisan_pops = getArtisanPops();
        var split_key = wealth_pool_key.split("-");
        var wealth_pool = province_obj.pops[wealth_pool_key];

        //Print wealth pool
        if (wealth_pool) {
          var building_id = `${split_key[1]}-${split_key[2]}`;
          var building_obj = getBuildingByID(building_id);
          var pop_type = split_key[3];

          var pop_needs = getPopNeeds(pop_type, wealth_pool.size);
          var pop_obj = config.pops[pop_type];

          //Print size, income, wealth, spending
          wealth_pool_string.push(`ID: ${wealth_pool_key}`);
          wealth_pool_string.push(`Size: ${(pop_obj.icon) ? pop_obj.icon + " " : ""}**${parseNumber(wealth_pool.size)}** ${(pop_obj.name) ? pop_obj.name : pop_type}`);
          wealth_pool_string.push("");
          wealth_pool_string.push(`Wealth: ${config.icons.money} ${parseNumber(wealth_pool.wealth)} (${config.icons.money} ${parseNumber(wealth_pool.income, { display_prefix: true })} last turn)`);
          wealth_pool_string.push(`- Spending: ${config.icons.coins} ${parseNumber(wealth_pool.spending)}`);

          //Per capita wealth
          wealth_pool_string.push(`Per Capita Assets:`);
          wealth_pool_string.push(`- Wealth: ${config.icons.money} ${parseNumber(wealth_pool.wealth/wealth_pool.size, { display_float: true })}`);
          wealth_pool_string.push(` - Income/Spending: ${config.icons.money} ${parseNumber(wealth_pool.income/wealth_pool.size, { display_float: true })}/${parseNumber(wealth_pool.spending/wealth_pool.size, { display_float: true })}`);
          wealth_pool_string.push("");

          //Employer
          if (building_obj) {
            wealth_pool_string.push(`Employer: ${(building_obj.name) ? building_obj.name : building_id}`);
          } else {
            if (artisan_pops.includes(pop_type)) {
              wealth_pool_string.push(`Employer: Subsistence Artisans`);
            } else {
              wealth_pool_string.push(`Employer: Subsistence`);
            }
          }

          //General fulfilment/variety
          wealth_pool_string.push(`Fulfilment/Variety: [${printPercentage(wealth_pool.fulfilment)}/${printPercentage(wealth_pool.variety)}]`);

          for (var i = 0; i < lookup.all_pop_needs_categories.length; i++) {
            var local_key = lookup.all_pop_needs_categories[i];

            var local_fulfilment = wealth_pool[`${local_key}-fulfilment`];
            var local_received_goods = wealth_pool.received_goods[local_key];
            var local_value = pop_needs[local_key];
            var local_variety = wealth_pool[`${local_key}-variety`];

            //Print local_fulfilment/local_variety
            if (local_fulfilment != undefined || local_variety != undefined) {
              var all_needs_groups = Object.keys(local_value);

              wealth_pool_string.push(`- **${(config.localisation[local_key]) ? config.localisation[local_key] : local_key}** - ${printPercentage(local_fulfilment)}/${printPercentage(local_variety)}`);

              //Iterate over all_needs_groups
              for (var x = 0; x < all_needs_groups.length; x++) {
                var local_group = local_value[all_needs_groups[x]];
                var local_group_key = `${lookup.all_pop_needs_categories[i]}.${all_needs_groups[x]}`;

                var local_group_fulfilment = getActualPopFulfilment({
                  province_id: province_id,
                  pop_type: pop_type,
                  wealth_pool_key: wealth_pool_key,

                  good_scope: local_group_key
                });
                var local_needs = Object.keys(local_group);

                wealth_pool_string.push(` - __${(config.localisation[all_needs_groups[x]]) ? config.localisation[all_needs_groups[x]] : parseString(all_needs_groups[x])}__ - ${printPercentage(local_group_fulfilment.fulfilment)}/${printPercentage(local_group_fulfilment.variety)}`);

                for (var y = 0; y < local_needs.length; y++) {
                  var local_amount = local_received_goods[local_needs[y]];
                  var local_need = pop_needs[local_key][all_needs_groups[x]][local_needs[y]];
                  var local_need_key = `${local_group_key}.${local_needs[y]}`;

                  var local_good = lookup.all_goods[local_needs[y]];

                  if (local_good) {
                    var local_good_fulfilment = getActualPopFulfilment({
                      province_id: province_id,
                      pop_type: pop_type,
                      wealth_pool_key: wealth_pool_key,

                      good_scope: local_need_key
                    });

                    wealth_pool_string.push(`   - ${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${(local_good.name) ? local_good.name : local_needs[y]} - ${parseNumber(local_amount, { display_float: true })}/${parseNumber(local_need, { display_float: true })} [${printPercentage(local_good_fulfilment.fulfilment)}/${printPercentage(local_good_fulfilment.variety)}]`);
                  }
                }
              }
            }
          }

          //Print inventory consumption
          if (wealth_pool.inventory_consumption) {
            var flattened_inventory_consumption = flattenObject(wealth_pool.inventory_consumption);

            var all_inventory_consumption = Object.keys(flattened_inventory_consumption);

            wealth_pool_string.push("");
            wealth_pool_string.push(`**__Inventory Consumption:__**`);

            for (var i = 0; i < all_inventory_consumption.length; i++) {
              var local_value = flattened_inventory_consumption[all_inventory_consumption[i]];

              if (local_value > 0) {
                var local_good = lookup.all_goods[all_inventory_consumption[i]];

                wealth_pool_string.push(`- ${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${parseNumber(local_value, { display_float: true })} ${(local_good.name) ? local_good.name : all_inventory_consumption[i]}`);
              }
            }
          }

          //Push to main embed
          var all_embeds = splitEmbed(wealth_pool_string, {
            title: `[Back] | [Jump To Page] | Wealth Pool:`,
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
          printError(game_obj.id, `This wealth pool no longer exists.`);
        }
      } else {
        printError(game_obj.id, `**${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}** has no inhabitants in it.`);
      }
    } else {
      printError(game_obj.id, `The province specified, **${province_id}** doesn't exist!`);
    }
  }
};
