module.exports = {
  printReform: function (arg0_user, arg1_reform_name) { //[WIP] - Add party support indicator in the future
    //Convert from parameters
    var user_id = arg0_user;
    var reform_name = arg1_reform_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_reform_categories = getReformCategories();
    var game_obj = getGameObject(user_id);
    var raw_reform_name = getReform(reform_name, { return_key: true });
    var reform_obj = getReform(reform_name);
    var usr = main.users[actual_id];

    //Initialise reform_string
    var reform_string = [];

    if (reform_obj) {
      var raw_reform_category_name = getReformCategoryFromReform(raw_reform_name, { return_key: true });
      var reform_is_unlocked = usr.available_reforms.includes(raw_reform_category_name);

      reform_string.push(`${(reform_obj.icon) ? config.icons[reform_obj.icon] + " " : ""}**${(reform_obj.name) ? reform_obj.name : raw_reform_name}`);

      if (!reform_is_unlocked)
        reform_string.push(`\nYou have not yet unlocked this reform.`);

      //Description handler
      if (reform_obj.description) {
        reform_string.push("");
        reform_string.push(`_${reform_obj.description}_`);
      }

      //Effects handler
      if (reform_obj.effects) {
        reform_string.push("");
        reform_string.push(`**Effects:**`);
        reform_string.push(config.localisation.divider);
        reform_string.push("");
        reform_string.push(parseModifiers(reform_obj.effects));
      }

      //Return user feedback as alert
      printAlert(game_obj.id, reform_string.join("\n"));
    }
  },

  printReforms: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_reform_categories = getReformCategories();
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise reform_embeds
    var local_reform_string = [];
    var prefix_string = [];
    var reform_embeds = [];

    //Format prefix_string
    prefix_string.push(`Reforms are governmental policies that you can choose to attempt to enact at a cost of **${parseNumber(config.defines.politics.reform_cost)}** ${config.icons.political_capital} Political Capital. Successfully enacting reforms will also lower your people's ${config.icons.consciousness} Reform Desire.`);
    prefix_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}**`);
    prefix_string.push(`${config.icons.consciousness} Reform Desire: **${printPercentage(usr.modifiers.reform_desire)}**`);
    prefix_string.push("");

    //Format reform_embeds
    for (var i = 0; i < all_reform_categories.length; i++)
      if (usr.available_reforms.includes(all_reform_categories[i])) {
        var local_reform_category = getReformCategory(all_reform_categories[i]);
        var local_reform_category_icon = (local_reform_category.icon) ? config.icons[local_reform_category.icon] + " " : "";
        var local_reform_category_name = (local_reform_category.name) ? local_reform_category.name : all_reform_categories[i];

        var local_reforms = getReformsInCategory(all_reform_categories[i]);

        local_reform_string.push(`${local_reform_category_icon}**__${local_reform_category_name}:__**`);
        local_reform_string.push(config.localisation.divider);

        //Fetch current reform_position
        var reform_position = local_reforms.indexOf(usr.laws[all_reform_categories[i]]);

        for (var x = 0; x < local_reforms.length; x++) {
          var ending_string = "";
          var local_reform = getReform(local_reforms[x]);
          var local_reform_icon = (local_reform.icon) ? config.icons[local_reform.icon] + " " : "";
          var local_reform_name = (local_reform.name) ? local_reform.name : local_reforms[x];

          //Determine ending_string
          if (x == reform_position - 1 || x == reform_position + 1) {
            ending_string = `- **[Enact ${local_reform_name}]**`;
          } else if (x == reform_position) {
            ending_string = `- We currently have this reform set to our policy on the matter.`;
          } else {
            ending_string = `- This reform is not yet available.`;
          }

          //Push to local_reform_string
          local_reform_string.push(`${local_reform_icon}[${local_reform_name}] ${ending_string}`);
        }

        //Format embed
        var embed_reform_page = new Discord.MessageEmbed()
          .setColor(settings.bot_colour)
          .setTitle(`Political Reforms: (Page ${i + 1} of ${usr.available_reforms.length})\n${config.localisation.divider}`)
          .setDescription(local_reform_string.join("\n"));

        //Push formatted embed to reform_embeds
        reform_embeds.push(embed_reform_page);
        local_reform_string = [];
      }

    //Displauy default embed if no reforms are available
    if (usr.available_reforms.length == 0) {
      local_reform_string.push(config.localisation.divider);
      local_reform_string.push("");
      local_reform_string.push(`_You currently have no available reforms that you can pursue._`);
      local_reform_string.push(`Research additional ${config.icons.technology} **Technologies** in order to unlock more reforms.`);

      //Format embed
      var embed_reform_page = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`Political Reforms: (Page ${i + 1} of ${usr.available_reforms.length})\n${config.localisation.divider}`)
        .setDescription(local_reform_string.join("\n"));

      //Push formatted embed to reform_embeds
      reform_embeds.push(embed_reform_page);
      local_reform_string = [];
    }

    //Return statement
    return reform_embeds;
  }
};
