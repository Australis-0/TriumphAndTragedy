module.exports = {
  printCities: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(user_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise city_string, fields_list
    var city_string = [];
    var fields_list = [];

    //Format string
    city_string.push(`**[Back]** | **[Jump To Page]** | **[View]**`);
    city_string.push("");
    city_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    city_string.push("");

    //Check if user can found new cities, and if so push dynamic buttons to city_string
    if (usr.city_count < usr.city_cap) {
      city_string.push(`You can found up to **${parseNumber(usr.city_cap-usr.city_count)}** new citie(s) in your territories!`);
      city_string.push("");
      city_string.push(`**[Found City]**`);
      city_string.push("");
    }

    city_string.push(config.localisation.divider);
    city_string.push("");
    city_string.push(`__**Cities:**__`);

    if (cities.length != 0) {
      for (var i = 0; i < cities.length; i++) {
        var local_field = [];

        //Display occupation status
        if (cities[i].owner != cities[i].controller)
          (cities[i].controller != actual_id) ?
            local_field.push(`- Currently occupied by **${main.users[cities[i].controller].name}**.`) :
            local_field.push(`- This city is currently occupied by us in a war! We won't be able to gain resources from it until it is legally annexed by us.`);

        local_field.push(`- ${config.icons.provinces} Province: ${cities[i].id}`);
        local_field.push(`- ${config.icons.population} Population: ${parseNumber(cities[i].pops.population)}/${parseNumber(cities[i].housing)} (**${printPercentage(getCityPopGrowthRate(cities[i]), { base_zero: true, display_prefix: true })}**)`);
        local_field.push(`- RGO: ${(getGood(cities[i].resource).icon) ? config.icons[getGood(cities[i].resource).icon] + " " : ""} ${(getGood(cities[i].resource).name) ? getGood(cities[i].resource).name : cities[i].resource}`);

        //Print culture
        fields_list.push({ name: `[View **${cities[i].name}**] ${(cities[i].city_type == "capital") ? " - Capital City" : ""}`, value: local_field.join("\n"), inline: true });
      }
    } else {
      city_string.push("");
      city_string.push(`_You currently don't have any cities in your possession!_`);
      city_string.push("");
      city_string.push(`_Consider founding a new city to start building up your country._`);
      city_string.push(`- You can found a new city by typing **[Found City]**.`);
    }

    //Return statement
    return (fields_list.length > 0) ?
      splitEmbed(city_string, {
        fields: fields_list,
        fixed_width: true,
        maximum_fields: 12,
        table_width: 2,
        title: "City List:",
        title_pages: true
      }) :
      splitEmbed(city_string, {
        title: "City List:",
        title_pages: true
      });
  },

  printCity: function (arg0_user, arg1_name) { //[WIP] - Rename to printProvince() and merge with Province UI
    //Convert from parameters
    var user_id = arg0_user;
    var province_name = arg1_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var province_obj = getCity(province_name);
    var culture_obj;
    var relevant_goods = getRelevantGoods(user_id);
    var relevant_pops = getRelevantPops(user_id);
    try {
      culture_obj = main.global.cultures[province_obj.culture];
    } catch {}

    if (province_obj) {
      recalculateInventory(user_id); //Recalculate inventory to display pop needs

      var rgo_name = (getGood(province_obj.resource).name) ? getGood(province_obj.resource).name : province_obj.resource;
      var rgo_icon = (getGood(province_obj.resource).icon) ? config.icons[getGood(province_obj.resource).icon] + " " : "";

      //Initialise province_string
      var province_string = [];

      //Format string
      province_string.push(`**[Back]** | **[Jump To Page]**`);
      province_string.push("");
      province_string.push(`${config.icons.globe} Country: **${usr.name}**`);
      province_string.push(`Type **[Cities]** to view a full list of all your cities.`);
      province_string.push("");
      province_string.push(config.localisation.divider);
      province_string.push("");
      province_string.push(`City Options: ${(province_obj.city_type != "capital") ? "**[Move Capital]** | " : ""}**[Rename City]**`);
      province_string.push(`Manage Buildings: **[Build]** | **[Demolish]**`);
      province_string.push(`Promote Urbanisation: **[Develop]** - Gain an extra building slot in this city for **${parseNumber(getDevelopmentCost(user_id, province_obj.id))}** ${config.icons.political_capital} Political Capital.`);
      province_string.push(config.localisation.divider);

      //Print city information
      province_string.push(`**${province_obj.name}:**`);
      province_string.push("");

      if (province_obj.demilitarised) {
        province_string.push(`- Currently demilitarised for **${parseNumber(getDemilitarisedTurns(province_obj.id))}** turn(s).`);
        province_string.push("");
      }

      province_string.push(`**Province:** ${config.icons.provinces} ${province_obj.id}`);
      province_string.push(`**Population:** ${config.icons.population} ${parseNumber(province_obj.pops.population)} (**${printPercentage(getCityPopGrowthRate(province_obj), { base_zero: true, display_prefix: true })}** per turn)`);
      province_string.push(`**Development:** ${config.icons.development} ${parseNumber(province_obj.development)}`);
      province_string.push(`**RGO:** ${rgo_icon}${rgo_name}`);
      province_string.push(`- **${(usr.modifiers.rgo_throughput-1 >= 0) ? "+" : ""}${printPercentage(usr.modifiers.rgo_throughput)}** modifier to ${rgo_icon}${rgo_name} production in this province.`);
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
                if (percent_fulfilled > 0 && percent_fulfilled < 1) {
                  warning_string = " - :warning:";
                } else {
                  warning_string = ` - ${config.icons.cancel}`;
                }

              province_string.push(`- ${parseGood(all_total_needs[i], "", false, `${parseNumber(local_value)} `)} - ${parseNumber(local_amount)} in Inventory (**${printPercentage(percent_fulfilled)}** fulfilled)${warning_string}`);
            }
          }

          province_string.push("");
        }
      }

      //Change game_obj.page
      game_obj.page = `view_city_${province_obj.name}`;

      //Return statement
      return splitEmbed(province_string, {
        title: `${province_obj.name}:`,
        title_pages: true,
        fixed_width: true
      });
    } else {
      printError(game_obj.id, `The Province of ${province_name} couldn't be found anywhere in your territory!`);
    }
  }
};
