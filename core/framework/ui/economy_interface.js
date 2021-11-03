module.exports = {
  printEconomy: function (arg0_user) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise economy_string
    var economy_string = [];

    //Format embed
    economy_string.push(`**Population:**`);
    economy_string.push("");

    //Push the availability of dynamically displayed non-military pops to screen
    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].stats_display && !config.pops[all_pops[i]].military_pop) {
        var local_pop = config.pops[all_pops[i]];
        var pop_icon = (local_pop.icon) ? config.icons[local_pop.icon] + " " : "";
        var pop_name = (local_pop.name) ? local_pop.name : all_pops[i];

        economy_string.push(`${pop_icon}Available ${pop_name}: **${parseNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]])}**`);
      }
    economy_string.push(`- ${config.icons.population} Population Growth Rate: **${printPercentage(usr.modifiers.pop_growth_modifier-1)}**`);
    economy_string.push(`You have **${parseNumber(getCities(actual_id, { include_hostile_occupations: true, include_occupations: true }).length)} cities in total throughout your country.`);
    economy_string.push(`**[View Cities]**`);
    economy_string.push("");
    economy_string.push(`Type **[Inventory]** to view your **current resources**.`);

    //Remove control panel if one exists
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
  },

  printInventory: function (arg0_user) { //[WIP]
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
