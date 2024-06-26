module.exports = {
  /*
    getGoodsInventoryString() - Displays an inventory string recursively from a set of arguments
    options: {
      search_query: "acanth", - Used to underline relevant parts of words if available
      search_significance: {} - Passes search significance matrix
    }
  */
  getGoodsInventoryString: function (arg0_user, arg1_goods_object, arg2_nesting, arg3_display_goods, arg4_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var goods_obj = arg1_goods_object;
    var nesting = (arg2_nesting) ? parseInt(arg2_nesting) : 0;
    var display_goods = (arg3_display_goods) ? arg3_display_goods : lookup.all_good_names; //Goods to display as an array
    var options = (arg4_options) ? arg4_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_good_keys = Object.keys(goods_obj);
    var game_obj = getGameObject(user_id);
    var inventory_string = [];
    var usr = main.users[actual_id];

    //Rearrange all_good_keys to fit in with display_goods
    for (var i = all_good_keys.length - 1; i >= 0; i--)
      if (display_goods.includes(all_good_keys[i]) || reserved.goods.includes(all_good_keys[i]))
        all_good_keys.splice(i, 1);

    all_good_keys = display_goods.concat(all_good_keys);

    //Append all good categories that contain a relevant subgood
    for (var i = 0; i < all_good_keys.length; i++)
      if (!display_goods.includes(all_good_keys[i])) {
        var local_obj = goods_obj[all_good_keys[i]];

        if (local_obj.type == "category") {
          var subgood_found = hasSubgood(lookup.all_goods[all_good_keys[i]], display_goods, { return_key: true });

          if (subgood_found) {
            //Move category key before the subgood key
            display_goods.push(all_good_keys[i]);
            all_good_keys = moveElement(all_good_keys, i, all_good_keys.indexOf(subgood_found));
            display_goods = moveElement(display_goods, display_goods.length - 1, display_goods.indexOf(subgood_found));
          }
        }
      }

    //Iterate over all keys in goods_obj
    for (var i = 0; i < all_good_keys.length; i++) {
      var local_key = all_good_keys[i];
      var local_obj = goods_obj[all_good_keys[i]];

      if (!reserved.goods.includes(local_key))
        if (local_obj)
          if (local_obj.type == "category") {
            var is_primary_category = (config.goods[local_key]);

            //Recursive parsing for category
            if (hasSubgood(local_obj, display_goods)) {
              var significance_string = "";

              if (options.search_significance)
                if (options.search_significance[local_key]) {
                  var local_significance = options.search_significance[local_key];

                  significance_string = `(:star: ${parseNumber(local_significance, { display_float: true })}) `;
                }

              var category_string = `${(is_primary_category) ? `**__` : `**`}${(local_obj.name) ? `${local_obj.name}` : local_key}:${(is_primary_category) ? `__**` : `**`}`;

              //Highlight search query if applicable
              if (options.search_query)
                category_string = formatSubstring(category_string, options.search_query, "underline");

              category_string = `${bulletPoint(nesting)}${significance_string}${(local_obj.icon) ? config.icons[local_obj.icon] + " " : ""}${category_string} __${parseNumber(getGoodAmount(user_id, local_key))}__`;

              inventory_string.push(category_string);
            }
            if (is_primary_category)
              inventory_string.push(`---`);

            log.debug(`Goods inventory recursion on ${(local_obj.name) ? local_obj.name : local_key}!`);

            var recursive_inventory_string = module.exports.getGoodsInventoryString(user_id, local_obj, nesting + 1, display_goods, options);

            for (var x = 0; x < recursive_inventory_string.length; x++)
              inventory_string.push(recursive_inventory_string[x]);
          } else {
            if (display_goods.includes(all_good_keys[i])) {
              var has_production_chain = hasProductionChain(all_good_keys[i]);
              var f_1 = (has_production_chain) ? `[` : "",
                f_2 = (has_production_chain) ? `]` : "";
              var significance_string = "";

              if (options.search_significance)
                if (options.search_significance[local_key]) {
                  var local_significance = options.search_significance[local_key];

                  significance_string = `(:star: ${parseNumber(local_significance, { display_float: true })}) `;
                }

              var good_string = `${f_1}${(local_obj.name) ? local_obj.name : local_key}${f_2}: **${parseNumber(getGoodAmount(user_id, local_key))}**`;

              //Highlight search query if applicable
              if (options.search_query)
                good_string = formatSubstring(good_string, options.search_query, "underline");

              good_string = `${bulletPoint(nesting)}${significance_string}${(local_obj.icon) ? config.icons[local_obj.icon] + " " : ""}${good_string}`;

              inventory_string.push(good_string);

              //Check if user wishes to show market price
              if (game_obj)
                if (game_obj.show_market_price) {
                  var local_market_good = main.market[all_good_keys[i]];

                  if (local_market_good) {
                    inventory_string.push(`${bulletPoint(nesting + 1)}Buy Price: £${parseNumber(local_market_good.buy_price)} | Sell Price: £${parseNumber(local_market_good.sell_price)}`);
                  }
                }
            }
          }
    }

    //Return statement
    return inventory_string;
  },

  printEconomy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_good_names = lookup.all_good_names;
    var all_goods = lookup.all_goods;
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_cities = getCities(user_id);
    var local_resource_modifiers = {};
    var relevant_building_pops = getRelevantBuildingPops(user_id);

    //Initialise economy_string and other formatting variables
    var economy_string = [];
    var footer_string = [];
    var modifiers_string = [];
    var resource_production_string = [];

    //Fix tracker variables
    usr.city_cap = getCitiesCap(user_id);

    //Push the availability of dynamically displayed non-military pops to screen
    economy_string.push((game_obj.hide_building_pops) ? `**[Show Available Pops]**` : `**[Hide Available Pops]**`);
    economy_string.push("");

    if (!game_obj.hide_building_pops)
      for (var i = 0; i < relevant_building_pops.length; i++) {
        var local_pop = config.pops[relevant_building_pops[i]];

        if (local_pop) {
          var pop_icon = (local_pop.icon) ? local_pop.icon + " " : "";
          var pop_name = (local_pop.name) ? local_pop.name : relevant_building_pops[i];

          economy_string.push(`- ${pop_icon}Available ${pop_name}: **${parseNumber(usr.pops[relevant_building_pops[i]] - usr.pops["used_" + relevant_building_pops[i]])}**`);
        }
      }

    economy_string.push(`${(game_obj.hide_building_pops) ? "" : "- "}${config.icons.population} Population Growth Rate: **${printPercentage(usr.modifiers.pop_growth_modifier-1)}**`);
    economy_string.push("");
    economy_string.push(`You have **${parseNumber(getCities(user_id, { include_hostile_occupations: true, include_occupations: true }).length)}** cities in total throughout your country.`);
    economy_string.push(`- **[View Cities]**${(usr.city_cap - usr.city_count > 0) ? " | **[Found City]** (" + parseNumber(usr.city_cap - usr.city_count) + ")" : ""}`);
    economy_string.push(config.localisation.divider);
    economy_string.push("");

    //Modifiers
    modifiers_string.push("");

    ((usr.modifiers.building_cost - 1)*100 != 0) ?
      modifiers_string.push(`${config.icons.construction_time} Building Cost Modifier: **${printPercentage(usr.modifiers.building_cost - 1)}**`) :
      modifiers_string.push(`${config.icons.construction_time} No building cost modifiers active.`);

    //Production modifiers (RGO)
    for (var i = 0; i < all_good_names.length; i++)
      local_resource_modifiers[all_good_names[i]] = {
        count: 0,
        cities: []
      };

    for (var i = 0; i < all_cities.length; i++) {
      var city_obj = all_cities[i];
      var local_element = local_resource_modifiers[city_obj.resource];
      var local_throughput = getCityRGOThroughput(city_obj.name) - (usr.modifiers.rgo_throughput - 1);

      local_element.count++;
      local_element.cities.push(`${city_obj.name}` + (
        (!isNaN(city_obj.supply_limit)) ?
          ` **${printPercentage(Math.ceil(local_throughput), { display_prefix: true })}**` : ``
      ));
    }

    for (var i = 0; i < all_good_names.length; i++)
      if (!reserved.goods.includes(all_good_names[i])) {
        var local_good = getGood(all_good_names[i]);
        var processed_good_name = (local_good.name) ? local_good.name : all_good_names[i];
        var processed_good_icon = (local_good.icon) ? config.icons[local_good.icon] + " " : "";

        if (local_resource_modifiers[all_good_names[i]].count != 0) {
          modifiers_string.push(`${processed_good_icon}Base **${printPercentage(usr.modifiers.rgo_throughput, { display_prefix: true })}** ${processed_good_name} Gain in **${local_resource_modifiers[all_good_names[i]].count}** citie(s):`);
          modifiers_string.push(`- ${local_resource_modifiers[all_good_names[i]].cities.join(", ")}`);
        }
      }

    //Resource production
    resource_production_string.push("");
    resource_production_string.push(`- **[Building List]** | **[Build]**`);

    //Dynamically push resource production to resource_production_string
    var production_localisation = getProductionLocalisation(user_id);

    for (var i = 0; i < production_localisation.length; i++)
      resource_production_string.push(production_localisation[i]);

    (Object.keys(production_localisation).length == 0) ?
      footer_string.push(`:warning: _Our economy is not currently producing any goods! Consider constructing some new buildings in order to jumpstart our economy._`) :
      footer_string.push(`**Note:** Buildings that lack requisite goods, employees, or maintenance will not produce anything. Infrastructure can improve your RGO Throughput.`);

    footer_string.push(`- **[Constructions]** View a complete list of current constructions.`);
    footer_string.push(`- **[Industry]** View a roster of all domestic buildings.`);
    footer_string.push(`- **[Inventory]** View your **current resources**.`);
    footer_string.push(`- **[Production]** View domestic production and import/export balance of resources.`);

    //Remove control panel if one exists
    if (game_obj) {
      removeControlPanel(game_obj.id);

      //Create embed and edit to message
      const economy_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**Economy:**`)
        .setThumbnail(usr.flag)
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(economy_string.join("\n"))
        .addFields(
          { name: "__Production Modifiers:__\n-", value: truncateString(modifiers_string.join("\n"), 1000), inline: true },
          { name: "__[Resource Production]:__ (per turn)\n-", value: truncateString(resource_production_string.join("\n"), 1000), inline: true },
          { name: config.localisation.blank, value: footer_string.join("\n") }
        );

      game_obj.main_embed = economy_embed;
      game_obj.main_change = true;
    }

    return economy_string;
  },

  /*
    printInventory() - Prints a player's inventory depending on what they want
    options: {
      display_goods: [], - The list of goods to display, undefined by default, overridden by search_query
      display_relevant_goods: true/false, - Whether or not to display relevant goods only. True by default, overridden by display_goods
      do_not_display: true/false, - Whether to display the UI in the first place
      search_query: "acanth" - Whatever substring the player wants to search up
    }
  */
  printInventory: function (arg0_user, arg1_page, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? parseInt(arg1_page) : 0;
    var options = (arg2_options) ? arg2_options : { display_relevant_goods: true };

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var relevant_goods = getRelevantGoods(user_id);
    var searched_goods;
    var searched_goods_significance;
    var usr = main.users[actual_id];

    //Check if game_obj.inventory_show_all_goods is enabled
    if (game_obj.inventory_show_all_goods)
      options.display_relevant_goods = false;

    var goods_to_display = (options.display_goods) ? getList(options.display_goods) :
      (options.display_relevant_goods) ? relevant_goods : lookup.all_good_names;

    if (options.search_query) {
      searched_goods_significance = returnInventorySearchGoods(options.search_query, { return_object: true });
      searched_goods = Object.keys(searched_goods_significance);

      goods_to_display = searched_goods;
      log.debug(`Goods to display: `, searched_goods_significance);
    }

    //Initialise fields_list, inventory_string
    var fields_list = [];
    var inventory_string = [];

    //Fetch all goods and process them into individual fields
    var all_material_categories = Object.keys(config.goods);

    //Format embed
    inventory_string.push(`**[Back]** | **[Jump To Page]** | **[Search]** | ${(!game_obj.inventory_show_all_goods) ? `**[Show All Goods]**` : `**[Hide All Goods]**`} | ${(!game_obj.show_market_price) ? `**[Show Market Prices]**` : `**[Hide Market Prices]**`}`);

    if (options.search_query)
      inventory_string.push(`Search Query: :mag_right: __${options.search_query}__ | **[Clear]**`);

    inventory_string.push("");
    inventory_string.push(`${config.icons.money} Money: **${parseNumber(usr.money)}**`);
    inventory_string.push("");
    inventory_string.push(`${config.icons.trade} **Current Goods:**`);
    inventory_string.push(`${config.localisation.divider}`);
    inventory_string.push("");

    for (var i = 0; i < all_material_categories.length; i++)
      if (all_material_categories[i] != "hidden") {
        //Loop over all local keys in object and display them. [WIP] - Hide obsolete or unlocked resources not used in any building or crafting recipe later
        var local_category = config.goods[all_material_categories[i]];
        var local_goods = Object.keys(local_category);
        var local_name = [];
        var local_string = [];

        //Format field
        local_name.push(`${(local_category.icon) ? config.icons[local_category.icon] + " " : ""} **__${(local_category.name) ? local_category.name : all_material_categories[i]}:__**`);
        local_name.push(`---`);

        var local_string = getGoodsInventoryString(user_id, local_category, 1, goods_to_display, {
          search_query: options.search_query,
          search_significance: searched_goods_significance
        });

        //Used for processing more than one string at a time
        var local_split_string = splitText(local_string, { maximum_characters: 1000 });

        //Push formatted fields to inventory
        for (var x = 0; x < local_split_string.length; x++)
          fields_list.push({
            name: local_name.join("\n"),
            value: local_split_string[x],
            inline: true
          });
      }

    //Create embed and edit to message
    var inventory_embeds = (fields_list.length > 0) ?
      splitEmbed(inventory_string, {
        fields: fields_list,
        fixed_width: true,
        maximum_fields: 4,
        table_width: 2,
        title: "Inventory:",
        title_pages: true
      }) :
      splitEmbed(inventory_string, {
        title: "Inventory:",
        title_pages: true
      });

    if (!options.do_not_display) {
      game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
        embed_pages: inventory_embeds,
        user: game_obj.user,
        page: page
      });
      game_obj.main_change = true;
    }

    //Return statement
    return inventory_embeds;
  },

  printProduction: function (arg0_user, arg1_page, arg2_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? arg1_page : 0;
    var do_not_display = arg2_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var production_localisation = getProductionLocalisation(user_id, {
      display_icons: true,
      exclude_artisan_production: (game_obj.hide_artisan_production),
      exclude_rgo_production: (game_obj.hide_rgo_production),
      include_pop_consumption: (!game_obj.hide_pop_consumption)
    });
    var usr = main.users[actual_id];

    //Format header_string
    var header_string = [];

    header_string.push(`**[${(game_obj.hide_pop_consumption) ? `Show Pop Consumption` : `Hide Pop Consumption`}]** | **[${(game_obj.hide_artisan_production) ? `Show Artisan Production` : `Hide Artisan Production`}]** | **[${(game_obj.hide_rgo_production) ? `Show RGO Production` : `Hide RGO Production`}]**`);
    header_string.push("");
    header_string.push(`> **Note:** Pop Consumption is taken from figures tracked last turn in terms of absolute purchase quantities by Wealth Pools.`);
    header_string.push("");
    header_string.push(config.localisation.divider);
    header_string.push("");

    //Merge header_string
    production_localisation = appendArrays(header_string, production_localisation);

    //Make sure user has actual production
    if (production_localisation.length > 0) {
      //Print artisan_production
      if (!game_obj.hide_artisan_production) {
        var artisan_production = getTotalArtisanProduction(user_id);

        var all_artisan_production_keys = Object.keys(artisan_production);

        if (all_artisan_production_keys.length > 0) {
          //Print header
          production_localisation.push(`### [Artisan Production]:`);
          production_localisation.push(`> Artisan production is produced by **Artisan Pops** working in **Subsistence** industries when not formally employed.`);
          production_localisation.push("");

          //List Artisan production
          production_localisation = appendArrays(production_localisation, parseGoods(artisan_production));
        }
      }

      //Print rgo_production
      if (!game_obj.hide_rgo_production) {
        var rgo_production = getTotalRGOProduction(user_id);

        var all_rgo_production_keys = Object.keys(rgo_production);

        if (all_rgo_production_keys.length > 0) {
          //Print header
          production_localisation.push(`### [RGO Production]:`);
          production_localisation.push(`> **RGOs** are naturally-occuring raw resources in certain Province(s). Subsistence labourers not working a trade (Non-Artisan pops) harvest these resources to earn a living.`);
          production_localisation.push(`> `);
          production_localisation.push(`> Total production is modified by initial resource Scarcity and your **RGO Throughput** modifier.`);
          production_localisation.push("");

          //List rgo_production
          production_localisation = appendArrays(production_localisation, parseGoods(rgo_production));
        }
      }
    } else {
      production_localisation.push(`_Our country is currently not producing anything, nor does it have a regular import/export balance. Consider trading with other countries, building industry by typing_ **[Build]**_, or fix employment!_`);
    }

    //Create embed and edit to message
    var production_embeds = splitEmbed(production_localisation, {
      title: `[Back] | [Jump To Page] | Domestic Production:`,
      title_pages: true,
      fixed_width: true
    });

    if (!do_not_display) {
      game_obj.main_embed = createPageMenu(game_obj.middle_embed, {
        embed_pages: production_embeds,
        user: game_obj.user,
        page: page
      });
      game_obj.main_change = true;
    }

    //Return statement
    return production_embeds;
  }
};
