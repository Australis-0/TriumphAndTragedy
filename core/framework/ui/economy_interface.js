module.exports = {
  printEconomy: function (arg0_user) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_good_names = getGoods({ return_names: true });
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_cities = getCities(actual_id);
    var local_resource_modifiers = {};

    //Initialise economy_string
    var economy_string = [];

    //Format embed
    economy_string.push(`**Population:**`);
    economy_string.push("");

    //Push the availability of dynamically displayed non-military pops to screen
    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].stats_display && !config.pops[all_pops[i]].military_pop) {
        var local_pop = config.pops[all_pops[i]];
        var pop_icon = (local_pop.icon) ? local_pop.icon + " " : "";
        var pop_name = (local_pop.name) ? local_pop.name : all_pops[i];

        economy_string.push(`${pop_icon}Available ${pop_name}: **${parseNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]])}**`);
      }
    economy_string.push(`- ${config.icons.population} Population Growth Rate: **${printPercentage(usr.modifiers.pop_growth_modifier-1)}**`);
    economy_string.push(`You have **${parseNumber(getCities(actual_id, { include_hostile_occupations: true, include_occupations: true }).length)}** cities in total throughout your country.`);
    economy_string.push("");
    economy_string.push(`**[View Cities]**${(usr.city_cap-usr.city_count > 0) ? " ¦ **[Found City]** (" + parseNumber(usr.city_cap-usr.city_count) + ")" : ""}`);
    economy_string.push("");
    economy_string.push(config.localisation.divider);
    economy_string.push("");
    economy_string.push(`**Production Modifiers:**`);
    economy_string.push("");

    ((usr.modifiers.building_cost - 1)*100 != 0) ?
      economy_string.push(`${config.icons.construction_time} Building Cost Modifier: **${printPercentage(usr.modifiers.building_cost - 1)}**`) :
      economy_string.push(`${config.icons.construction_time} No building cost modifiers active.`);

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
          `**${printPercentage(Math.ceil(local_throughput), { display_prefix: true })}**` : ``
      ));
    }

    for (var i = 0; i < all_good_names.length; i++) {
      var local_good = getGood(all_good_names[i]);
      var processed_good_name = (local_good.name) ? local_good.name : all_good_names[i];
      var processed_good_icon = (local_good.icon) ? config.icons[local_good.icon] + " " : "";

      if (local_resource_modifiers[all_good_names[i]].count != 0) {
        economy_string.push(`${processed_good_icon}Base **${printPercentage(usr.modifiers.rgo_throughput, { display_prefix: true })}** ${processed_good_name} Gain in **${local_resource_modifiers[all_good_names[i]].count}** citie(s):`);
        economy_string.push(`- ${local_resource_modifiers[all_good_names[i]].cities.join(", ")}.`);
      }
    }

    economy_string.push("");
    economy_string.push(config.localisation.divider);

    //Resource production
    economy_string.push(`**Resource Production (per turn):**`);
    economy_string.push(`**[Building List]** ¦ **[Build]**`);
    economy_string.push("");

    //Dynamically push resource production to economy_string
    var all_production = getProduction(user_id);
    var all_produced_goods = Object.keys(all_production);

    for (var i = 0; i < all_produced_goods.length; i++) {
      var local_good = getGood(all_produced_goods[i]);
      var local_value = all_production[all_produced_goods[i]];

      if (local_good) {
        //Deduct upkeep from good production
        if (Array.isArray(local_value)) {
          var upkeep_array = (all_production[`${all_produced_goods[i]}_upkeep`]) ?
            all_production[`${all_produced_goods[i]}_upkeep`] :
            [0, 0];

          upkeep_array.sort(function (a, b) { return a - b; });

          local_value = [
            local_value[0] - upkeep_array[1],
            local_value[1] - upkeep_array[0],
          ].sort(function (a, b) { return a - b; });
        }

        //Push to string
        economy_string.push(`- **${(local_value[0] == local_value[1]) ? parseNumber(local_value[0]) : parseNumber(local_value[0]) + " - " + parseNumber(local_value[1])}** ${(local_good.name) ? local_good.name : all_produced_goods[i]}.`);
      }
    }

    if (Object.keys(all_production).length == 0)
      economy_string.push(`- _Our economy is not currently producing any goods! Consider constructing some new buildings in order to jumpstart our economy._`);
    else {
      economy_string.push("");
      economy_string.push(`Note: Buildings that lack requisite goods or maintenance will not produce anything.`);
      economy_string.push("");
    }

    economy_string.push("");
    economy_string.push(`- **[Constructions]** View a complete list of current constructions.`);
    economy_string.push(`- **[Inventory]** View your **current resources**.`);

    //Remove control panel if one exists
    if (game_obj) {
      removeControlPanel(game_obj.id);

      //Create embed and edit to message
      const economy_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**Economy:**`)
        .setThumbnail(usr.flag)
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(economy_string.join("\n"));

      game_obj.main_embed = economy_embed;
      game_obj.main_change = true;
    }

    return economy_string;
  },

  printInventory: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise inventory_fields, inventory_string
    var field_categories = []; //Tracker variable to check which categories have already been pushed or not
    var inventory_fields = [];
    var inventory_string = [];

    //Fetch all goods and process them into individual fields
    var all_material_categories = Object.keys(config.goods);

    //Format embed
    inventory_string.push(`**[Back]**`);
    inventory_string.push("");
    inventory_string.push(`${config.icons.money} Money: **${parseNumber(usr.money)}**`);
    inventory_string.push("");
    inventory_string.push(`${config.icons.trade} **Current Goods:**`);
    inventory_string.push(`${config.localisation.divider}`);
    inventory_string.push("");

    for (var i = 0; i < all_material_categories.length; i++)
      if (!field_categories.includes(all_material_categories[i]) && all_material_categories[i] != "hidden") {
        //Push to tracker variable for ease of use
        field_categories.push(all_material_categories[i]);

        //Loop over all local keys in object and display them. [WIP] - Hide obsolete or unlocked resources not used in any building or crafting recipe later
        var local_category = config.goods[all_material_categories[i]];
        var local_goods = Object.keys(local_category);
        var local_name = [];
        var local_string = [];

        //Format field
        local_name.push(`${(local_category.icon) ? config.icons[local_category.icon] + " " : ""} **__${(local_category.name) ? local_category.name : all_material_categories[i]}:__**`);
        local_name.push(`---`);

        for (var x = 0; x < local_goods.length; x++) {
          var local_good = local_category[local_goods[x]];

          if (!["icon", "name"].includes(local_goods[x]))
            local_string.push(`${(local_good.icon) ? config.icons[local_good.icon] + " ": ""} **${(local_good.name) ? local_good.name : local_goods[x]}**: ${parseNumber(usr.inventory[local_goods[x]])}`);
        }

        //Push formatted field to inventory
        inventory_fields.push({
          name: local_name.join("\n"),
          value: local_string.join("\n"),
          inline: true
        });
      }

    //Create embed and edit to message
    var inventory_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Inventory:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(inventory_string.join("\n"));

    //Append fields to existing embed
    for (var i = 0; i < inventory_fields.length; i++)
      inventory_embed.addField(
        inventory_fields[i].name,
        inventory_fields[i].value,
        inventory_fields[i].inline
      );

    game_obj.main_embed = inventory_embed;
    game_obj.main_change = true;
  }
};
