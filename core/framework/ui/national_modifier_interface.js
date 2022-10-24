module.exports = {
  initialisePrintNationalModiifer: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(actual_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    (Object.keys(usr.national_modifiers).length > 0) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `View National Modifier:`,
        prompts: [`Which national modifier would you like to view? Please specify a number between **1** and **${parseNumber(Object.keys(usr.national_modifiers).length)}**.`, "number", { min: 1, max: Object.keys(usr.national_modiifers).length }]
      }) :
      printError(game_obj.id, `You don't have any **National Modifiers** to view as of yet!`);
  },

  printNationalModifiers: function (arg0_user, arg1_page) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? Math.ceil(parseInt(arg1_page)) : 0;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Format national_modifiers_string
    var all_embeds = [];
    var all_national_modifiers = Object.keys(usr.national_modifiers);
    var national_modifiers_string = [];

    if (all_national_modifiers.length > 0) {
      national_modifiers_string.push(`This is a table of contents of all current **National Modifiers** for **${usr.name}**. You can jump to a specific National Modifier by typing its ID number. The ID is printed in bold to the left of the modifier name.`);
      national_modifiers_string.push("");
      national_modifiers_string.push(config.localisation.divider);
      national_modifiers_string.push("");

      for (var i = 0; i < all_national_modifiers.length; i++) {
        var local_modifier = usr.national_modifiers[all_national_modifiers[i]];

        national_modifiers_string.push(`**${i + 1}.** ${(local_modifier.icon) ? config.icons[local_modifier.icon] + " " : ""} ${(local_modifier.name) ? local_modifier.name : all_national_modifiers[i]}`);

        const spirit_embed = new Discord.MessageEmbed()
          .setColor(settings.bot_colour)
          .setTitle(`**${(local_modifier.name) ? local_modifier.name : all_national_modifiers[i]}**`)
          .setThumbnail((local_modifier.image) ? local_modifier.image : "https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png")
          .setDescription((local_modifier.description) ? local_modifier.description : `This modifier currently has no effect. Events in the world may change this at a later date.`);

        all_embeds.push(spirit_embed);
      }
    } else {
      national_modifiers_string.push("");
      national_modifiers_string.push(config.localisation.divider);
      national_modifiers_string.push("");
      national_modifiers_string.push(`You currently have no active **National Modifiers**! National Modifiers can affect other modifiers in your country until said modifiers are removed, and can be caused by events and player actions.`);
    }

    const national_modifiers_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`[Back] | [View National Modifier] | National Modifiers - Table of Contents:`)
      .setDescription(national_modifiers_string.join("\n"));

    all_embeds.unshift(national_modifiers_embed);

    //Create page menu for user
    createPageMenu(game_obj.middle_embed, {
      embed_pages: all_embeds,
      starting_page: page,
      user: user_id
    });
  }
};
