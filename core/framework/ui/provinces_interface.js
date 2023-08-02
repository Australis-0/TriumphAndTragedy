module.exports = {
  initialisePrintProvince: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View A Province:`,
      prompts: [
        [`Which province would you like to view?`, "string"]
      ]
    },
    function (arg) {
      createPageMenu(game_obj.middle_embed, {
        embed_pages: printProvince(game_obj.user, arg[0]),
        user: game_obj.user
      });
    });
  },

  printProvince: function (arg0_user, arg1_name) { //[WIP] - Rename to printProvince() and merge with Province UI
    //Convert from parameters
    var user_id = arg0_user;
    var province_name = arg1_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var province_obj = getProvince(province_name);
    var culture_obj;
    var relevant_goods = getRelevantGoods(user_id);
    var relevant_pops = getRelevantPops(user_id);
    try {
      culture_obj = main.global.cultures[province_obj.culture];
    } catch {}

    //Initialise province_string
    var province_string = [];

    if (province_obj) {
      province_string.push(`**[Back]** | **[Jump To Page]**`);
      province_string.push("");

      if (province_obj.controller) {
        recalculateInventory(user_id); //Recalculate inventory to display pop needs

        //Format string
        province_string.push(`${config.icons.globe} Owning Country: **${main.users[province_obj.owner].name}**`);
        province_string.push(`Type **[View Provinces]** to view a full list of all your provinces.`);
        province_string.push("");
        province_string.push(config.localisation.divider);
        province_string.push("");

        if (province_obj.type == "urban") {
          province_string.push(`City Options: ${(province_obj.city_type != "capital") ? "**[Move Capital]** | " : ""}**[Rename City]**`);
          province_string.push(`Manage Buildings: **[Build]** | **[Demolish]**`);
          province_string.push(`Promote Urbanisation: **[Develop]** - Gain an extra building slot in this city for **${parseNumber(getDevelopmentCost(user_id, province_obj.id))}** ${config.icons.political_capital} Political Capital.`);
          province_string.push(config.localisation.divider);
        }

        //Print city information
        province_string.push(`**${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}:**`);
        province_string.push("");

        if (province_obj.owner != province_obj.controller)
          province_string.push(`- Currently occupied by **${main.users[province_obj.controller].name}** in a war! This province will not be able to produce anything of value until it is either liberated, or the war is over.`);
        if (province_obj.demilitarised) {
          province_string.push(`- Currently demilitarised for **${parseNumber(getDemilitarisedTurns(province_obj.id))}** turn(s).`);
          province_string.push("");
        }

        province_string.push(`**Province:** ${config.icons.provinces} ${province_obj.id}`);
        province_string.push(`**Population:** ${config.icons.population} ${parseNumber(province_obj.pops.population)} (**${printPercentage(getCityPopGrowthRate(province_obj), { base_zero: true, display_prefix: true })}** per turn)`);

        if (province_obj.development)
          province_string.push(`**Development:** ${config.icons.development} ${parseNumber(province_obj.development)}`);

        if (province_obj.resource) {
          province_string.push(`**Resource:** ${parseGood(province_obj.resource)}`);
          province_string.push(`- **${(usr.modifiers.rgo_throughput - 1 >= 0) ? "+" : ""}${printPercentage(usr.modifiers.rgo_throughput)}** modifier to ${parseGood(province_obj.resource)} production in this province.`);
        }

        province_string.push("");
        province_string.push(`**Culture:** ${config.icons.culture} ${(culture_obj) ? culture_obj.name : "None"}`);
        province_string.push(`**Supply Limit:** ${config.icons.railways} ${parseNumber((province_obj.supply_limit) ? province_obj.supply_limit : config.defines.combat.base_supply_limit)}`);

        province_string.push("");

        //Buildings
        {
          province_string.push(`**Buildings:**`);
          province_string.push(config.localisation.divider);
          province_string.push("");

          //Display buildings in building categories!
          var all_building_categories = getBuildingCategories();
          var people_housed = 0;

          //Fetch housing amount first
          for (var i = 0; i < province_obj.buildings.length; i++) {
            var local_building = getBuilding(province_obj.buildings[i].building_type);

            if (local_building.houses)
              people_housed += local_building.houses;
          }

          //Fix province housing [REMOVE IN FUTURE]
          province_obj.housing = people_housed;

          for (var i = 0; i < all_building_categories.length; i++) {
            var local_building_category = getBuildingCategory(all_building_categories[i]);
            var local_building_slots = getBuildingSlots(user_id, province_obj.id, all_building_categories[i]);
            var special_string = (local_building_category.is_housing || local_building_category.description) ?
              (local_building_category.is_housing) ?
                `\n • **Current Limit:** ${parseNumber(people_housed)}. Cities cannot grow once they surpass their housing limit. Build more **housing** to increase this limit.` :
                `\n • ${local_building_category.description}`
            : "";

            //Display category and all buildings inside only if the local building category should either always be displayed or buildings are present inside of the building category
            if (local_building_category)
              if (local_building_slots.total_buildings > 0 || local_building_slots.total_buildings_under_construction > 0 || local_building_category.always_display) {
                var all_buildings_in_category = Object.keys(local_building_category);

                //Generate and push header to page
                (!local_building_category.disable_slots) ?
                  province_string.push(`- **${parseString(all_building_categories[i])}:** (${parseNumber(local_building_slots.total_buildings + local_building_slots.total_buildings_under_construction)}/${parseNumber(local_building_slots.total_slots)}) ${special_string}`) :
                  province_string.push(` - **${parseString(all_building_categories[i])}:** ${special_string}`);

                //Iterate over all building objects in array
                for (var x = 0; x < all_buildings_in_category.length; x++)
                  if (!ignore_building_keys.includes(all_buildings_in_category[x])) {
                    var all_buildings = 0;
                    var local_building = getBuilding(all_buildings_in_category[x]);
                    var local_building_name = (local_building.name) ? local_building.name : all_buildings_in_category[x];
                    var local_slots = getBuildingSlots(user_id, province_obj.id, all_buildings_in_category[x]);

                    for (var y = 0; y < province_obj.buildings.length; y++)
                      if (province_obj.buildings[y].building_type == all_buildings_in_category[x])
                        all_buildings++;

                    if (all_buildings > 0 || local_slots.total_buildings_under_construction > 0)
                      province_string.push(` - ${(local_building.icon) ? config.icons[local_building.icon] + " " : ""}${local_building_name}: ${parseNumber(all_buildings)}${(local_building.separate_building_slots) ? " (" + parseNumber(all_buildings) + "/" + parseNumber(local_slots.total_slots) + ")" : ""} ${(local_slots.total_buildings_under_construction > 0) ? `(+${parseNumber(local_slots.total_buildings_under_construction)} under construction)` : ""}`);
                  }

                province_string.push("");
              }
          }
        }

        //Pops
        {
          province_string.push("");
          province_string.push(`**Population:**`);
          province_string.push(config.localisation.divider);
          province_string.push("");

          if (province_obj.pops) {
            province_string.push(`- ${config.icons.population} Population: ${parseNumber(returnSafeNumber(province_obj.pops.population))}`);

            for (var i = 0; i < all_pops.length; i++) {
              var display_pop = false;
              var local_pop = config.pops[all_pops[i]];
              var local_value = returnSafeNumber(province_obj.pops[all_pops[i]]);

              if (relevant_pops.includes(all_pops[i]))
                display_pop = true;
              if (game_obj.display_irrelevant_pops && local_value != 0)
                display_pop = true;
              if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
                display_pop = true;

              if (display_pop)
                province_string.push(` - ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
            }
          } else {
            province_string.push(`_This province currently has no one living in it!_`);
          }
        }

        //Total Pop needs By Category
        {
          if (province_obj.pops) {
            province_string.push("");
            province_string.push(`**Pop Needs:**`);
            province_string.push(config.localisation.divider);
            province_string.push("");

            province_string.push(`_Displaying_ **Pop Needs** _for next turn._`);
            province_string.push("");
            province_string.push(`> **Needs Category:**`);
            province_string.push(`>  - Total Good Amount - Good Name - [Pop Icon - Pop Consumption - Fulfilment %/Variety %]`);
            province_string.push("");

            var pop_needs = {};

            for (var i = 0; i < lookup.all_pop_needs_categories.length; i++) {
              var category_pop_needs = {};
              var local_category_name = config.localisation[lookup.all_pop_needs_categories[i]];
              var total_category_pop_needs = {};

              province_string.push(`- **${(local_category_name) ? local_category_name : lookup.all_pop_needs_categories[i]}:**`);

              for (var x = 0; x < all_pops.length; x++) {
                var local_pop_needs = getPopNeeds(all_pops[x], returnSafeNumber(province_obj.pops[all_pops[x]]), lookup.all_pop_needs_categories[i]);

                if (local_pop_needs) {
                  local_pop_needs = sortObject(flattenObject(local_pop_needs));

                  category_pop_needs[all_pops[x]] = local_pop_needs;

                  if (!pop_needs[all_pops[x]]) {
                    pop_needs[all_pops[x]] = local_pop_needs;
                  } else {
                    pop_needs[all_pops[x]] = mergeObjects(pop_needs[all_pops[x]], local_pop_needs);
                  }
                }
              }

              //Flatten and sort category_pop_needs
              try {
                total_category_pop_needs = sortObject(flattenObject(category_pop_needs));
              } catch (e) {
                log.warn(`Couldn't flatten and sort category_pop_needs when parsing ${lookup.all_pop_needs_categories[i]}!`);
                console.log(e);
              }

              var all_category_needs = Object.keys(flattenObject(total_category_pop_needs));

              //Iterate over all_category_needs and display
              for (var x = 0; x < all_category_needs.length; x++) {
                var display_good = false;
                var good_obj = lookup.all_goods[all_category_needs[x]];
                var local_pops_string = [];
                var local_total = total_category_pop_needs[all_category_needs[x]];

                if (good_obj) {
                  if (relevant_goods.includes(all_category_needs[x]))
                    display_good = true;
                  if (game_obj.inventory_show_all_goods)
                    display_good = true;

                  if (display_good) {
                    for (var y = 0; y < all_pops.length; y++) {
                      //Display next turn fulfilment
                      var local_good_fulfilment = getPopNeedsFulfilment(JSON.parse(JSON.stringify(usr.inventory)),
                      all_pops[y],
                      returnSafeNumber(province_obj.pops[all_pops[y]]),
                      {
                        return_object: true,
                        restrict_goods: [all_category_needs[x]]
                      });
                      var local_pop = config.pops[all_pops[y]];
                      var local_value = returnSafeNumber(category_pop_needs[all_pops[y]][all_category_needs[x]]);

                      //Push to local_pops_string
                      if (local_value != 0)
                        local_pops_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_value)} - ${printPercentage(local_good_fulfilment.fulfilment)}/${printPercentage(local_good_fulfilment.variety)}`);
                    }

                    //Push to province_string
                    province_string.push(` - ${parseGood(all_category_needs[x], "", false, `${parseNumber(local_total)} `)} - [${local_pops_string.join(", ")}]`);
                  }
                }
              }

              province_string.push("");
            }
          } else {
            province_string.push(`_This province currently has no pop needs._`);
          }
        }

        //Total Pop Needs
        {
          if (Object.keys(pop_needs).length > 0) {
            province_string.push(`**Total Pop Needs:**`);
            province_string.push("");
            province_string.push(`${(game_obj.show_pop_need_warnings) ? `**[Hide Warnings]**` : `**[Show Warnings]**`}`);
            province_string.push("");
            province_string.push(config.localisation.divider);

            var reference_needs = JSON.parse(JSON.stringify(pop_needs));
            var total_needs = {};

            for (var i = 0; i < all_pops.length; i++)
              total_needs = mergeObjects(total_needs, reference_needs[all_pops[i]]);
            total_needs = sortObject(total_needs);

            var all_total_needs = Object.keys(total_needs);

            for (var i = 0; i < all_total_needs.length; i++) {
              var local_good = lookup.all_goods[all_total_needs[i]];

              if (local_good) {
                var local_amount = getGoodAmount(user_id, all_total_needs[i]);
                var local_value = total_needs[all_total_needs[i]];
                var percent_fulfilled = Math.min(local_amount/local_value, 1);
                var warning_string = "";

                //Warning string
                if (game_obj.show_pop_need_warnings)
                  if (percent_fulfilled == 1) {
                    warning_string = ` - ${config.icons.checkmark}`;
                  } else if (percent_fulfilled > 0 && percent_fulfilled < 1) {
                    warning_string = " - :warning:";
                  } else if (percent_fulfilled == 0) {
                    warning_string = ` - ${config.icons.cancel}`;
                  }

                province_string.push(`- ${parseGood(all_total_needs[i], "", false, `${parseNumber(local_value)} `)} - ${parseNumber(local_amount)} in Inventory (**${printPercentage(percent_fulfilled)}** fulfilled)${warning_string}`);
              }
            }

            province_string.push("");
          }
        }

        //Change game_obj.page
        if (game_obj.page != "map")
          if (province_obj.type == "urban") {
            game_obj.page = `view_city_${province_obj.name}`;
          } else {
            game_obj.page = `view_province_${province_obj.id}`;
          }
      } else {
        var colonisation_string = getProvinceColonisationLocalisation(province_obj.id);

        province_string.push(`Currently uncolonised.`);

        if (colonisation_string.length > 0) {
          province_string.push("");

          for (var i = 0; i < colonisation_string.length; i++)
            province_string.push(colonisation_string[i]);
        }
      }

      //Return statement
      return splitEmbed(province_string, {
        title: `${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}:`,
        title_pages: true,
        fixed_width: true
      });
    } else {
      printError(game_obj.id, `The Province of ${province_name} couldn't be found anywhere in your territory!`);
    }
  },

  printProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var relevant_pops = getRelevantPops(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var accepted_cultures = getAcceptedCultures(user_id);
    var provinces = sortProvinces(user_id, "population_descending");

    //Initialise province_string, fields_list
    var fields_list = [];
    var province_string = [];

    //Format province_string
    province_string.push(`**[Back]** | **[Jump To Page]**`);
    province_string.push("");
    province_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    province_string.push("");

    province_string.push(config.localisation.divider);
    province_string.push(`**Provinces:**`);

    //Print rural provinces next
    province_string.push("");
    if (provinces.length != 0) {
      for (var i = 0; i < provinces.length; i++) {
        try {
          var culture_obj = getCulture(provinces[i].culture);
          var local_field = [];
          var province_type = "";
          var supply_limit = (provinces[i].supply_limit) ? provinces[i].supply_limit : config.defines.combat.base_supply_limit;
          var supply_use = Math.ceil(lookup.province_troop_strengths[provinces[i].id]/1000);

          if (provinces[i].city_type == "capital") {
            province_type = " - Capital City";
          } else if (provinces[i].type == "urban") {
            province_type = " - Urban";
          } else {
            province_type = " - Rural";
          }

          local_field.push("");
          local_field.push(`**[View ${parseProvince(provinces[i])}]**${province_type}`);

          //Print resource if possible
          if (provinces[i].resource)
            local_field.push(`- Resource: ${parseGood(provinces[i].resource)}`);

          local_field.push("");

          if (provinces[i].type == "urban") {
            local_field.push(`- ${config.icons.population} Population: ${parseNumber(provinces[i].pops.population)}/${parseNumber(provinces[i].housing)} (**${printPercentage(getCityPopGrowthRate(provinces[i]), { base_zero: true, display_prefix: true })}**)`);
          } else {
            local_field.push(`- ${config.icons.population} Population: **${parseNumber(provinces[i].pops.population)}**`);
          }

          //Print individual pop statistics again
          for (var x = 0; x < all_pops.length; x++) {
            var display_pop = false;
            var local_value = provinces[i].pops[all_pops[x]];

            if (relevant_pops.includes(all_pops[x]))
              display_pop = true;
            if (game_obj.display_irrelevant_pops && local_value != 0)
              display_pop = true;
            if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
              display_pop = true;

            if (display_pop)
              local_field.push(` - ${parsePop(all_pops[x])}: ${parseNumber(provinces[i].pops[all_pops[x]])}`);
          }

          //Print culture
          local_field.push(`- ${config.icons.culture} Culture: ${culture_obj.name}`);

          if (!accepted_cultures.includes(provinces[i].culture))
            local_field.push(`- **[Assimilate]**`);

          local_field.push(`- Supply: ${config.icons.railways} (${parseNumber(supply_use)}/${parseNumber(supply_limit)})${(supply_use > supply_limit) ? ` :warning:` : ""}`);

          //Push field to list
          fields_list.push({ name: `__**${parseProvince(provinces[i])}**:__`, value: local_field.join("\n"), inline: true });
        } catch (e) {
          log.warn(`Could not print provinces for user ${usr.name}!`);
          console.log(e);
        }
      }
    } else {
      province_string.push(`_You currently don't have any provinces in your possession!_`);
      province_string.push("");
      province_string.push(`_Consider settling or acquiring a new province to start building up your country._`);
    }

    //Return statement
    return (fields_list.length > 0) ?
      splitEmbed(province_string, {
        fields: fields_list,
        fixed_width: true,
        maximum_fields: 12,
        table_width: 2,
        title: "Province List:",
        title_pages: true
      }) :
      splitEmbed(province_string, {
        title: "Province List:",
        title_pages: true
      });
  },

  initialiseViewProvince: function (arg0_user, arg1_map) {
    //Convert from parameters
    var user_id = arg0_user;
    var map = arg1_map;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View A Province:`,
      prompts: [
        [`Which province would you like to view?`, "string"]
      ]
    },
    function (arg) {
      var province_obj = getProvince(arg[0]);

      (province_obj) ?
        createPageMenu((map) ? game_obj.alert_embed : game_obj.middle_embed, {
          embed_pages: printProvince(user_id, arg[0]),
          user: game_obj.user
        }) :
        printError(game_obj.id, `The province you have specified, **${arg[0]}** could not be found anywhere on the map!`);
    });
  }
};
