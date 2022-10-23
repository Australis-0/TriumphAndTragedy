module.exports = {
  printCustomisation: function (arg0_user, arg1_starting_page) {
    //Convert from parameters
    var user_id = arg0_user;
    var starting_page = returnSafeNumber(arg1_starting_page);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Format customisation_array
    var customisation_array = [];
    var vassal_customisation_array = [];

    customisation_array.push(`${config.icons.old_map} Rename Your Nation: **[Rename Country]**`);
    customisation_array.push(`_Messed up? Change your country's name._`);
    customisation_array.push("");
    customisation_array.push(`${config.icons.old_scroll} Change Your Motto: **[Set Motto]**`);
    customisation_array.push(`_A new slogan to inspire the masses._`);
    customisation_array.push("");
    customisation_array.push(`${config.icons.infamy} Import A New Flag: **[Set Flag]**`);
    customisation_array.push(`_For that flag I die!_`);
    customisation_array.push("");
    customisation_array.push(`${config.icons.government} Set Your Nation's Colour: **[Set Colour]**`);
    customisation_array.push(`_Change your nation's colour to something else using RGB colour codes._`);
    customisation_array.push("");
    customisation_array.push(`${config.icons.culture} Customise Your Culture: **[Rename Culture]**`);
    customisation_array.push(`_A truly fascinating name for ethnographers._`);
    customisation_array.push("");
    customisation_array.push(`${config.icons.culture} Set Your Culture's Adjective: **[Rename Culture Adjective]**`);
    customisation_array.push(`_A new label by which to identify your people._`);

    if (usr.options.vassal_customisation_locked && Object.keys(usr.diplomacy.vassals).length > 0)
      (usr.options.vassal_customisation_locked) ?
        customisation_array.push(`\n---\n\n${config.icons.consciousness} You have decided lock vassal customisation.** Your vassals will no longer be able to customise their nations or cities until you type **[Unlock Vassal Customisation]**.`) :
        customisation_array.push(`\n---\n\n${config.icons.checkmark} **Vassal customisation is currently unlocked!** Your vassals are free to customise their nations and cities at any time until you type **[Lock Vassal Customisation]**.`);

    //Format vassal_customisation_array
    vassal_customisation_array.push(`${config.icons.globe} Rename Vassal: **[Rename Vassal]**`);
    vassal_customisation_array.push(`_Force 'em to change their name, free of charge!_`);
    vassal_customisation_array.push("");
    vassal_customisation_array.push(`${config.icons.old_map} Rename Vassal City: **[Rename Vassal City]**`);
    vassal_customisation_array.push(`_Don't like the name of one of their cities? Change it, and assert your dominance._`);
    vassal_customisation_array.push("");
    vassal_customisation_array.push(`${config.icons.culture} Rename Vassal Culture: **[Rename Vassal Culture]**`);
    vassal_customisation_array.push(`_Not a fan of their culture? Invent some new word for it._`);
    vassal_customisation_array.push(`${config.icons.government} Change Vassal Colour: **[Set Vassal Colour]**`);
    vassal_customisation_array.push(`_Now they'll be shown on the map in a glorious shade of .. uh, something._`);
    vassal_customisation_array.push("");
    vassal_customisation_array.push(`${config.icons.infamy} Change Vassal Flag: **[Set Vassal Flag]**`);
    vassal_customisation_array.push(`_Nothing quite says you own them as much as slapping your flag on top of theirs._`);
    vassal_customisation_array.push("");
    vassal_customisation_array.push(`${config.icons.paper} Change Vassal Motto: **[Set Vassal Motto]**`);
    vassal_customisation_array.push(`_Decree that they use your motto!_`);

    const embed_customisation = new Discord.MessageEmbed()
  		.setColor(settings.bot_colour)
  		.setTitle(`[Back] | Customisation Menu:\n${config.localisation.divider}`)
  		.setThumbnail(usr.flag)
  		.setDescription(customisation_array.join("\n"))
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");
    const embed_vassal_customisation = new Discord.MessageEmbed()
  		.setColor(settings.bot_colour)
  		.setTitle(`[Back] | Vassal Customisation Menu:\n${config.localisation.divider}`)
  		.setThumbnail(usr.flag)
  		.setDescription(vassal_customisation_array.join("\n"))
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Edit main embed display
    (Object.keys(usr.diplomacy.vassals).length > 0) ?
      createPageMenu(game_obj.middle_embed, {
        embed_pages: [embed_customisation, embed_vassal_customisation],
        starting_page: starting_page,
        user: game_obj.user,

      }) :
      createPageMenu(game_obj.middle_embed, {
        embed_pages: [embed_customisation],
        starting_page: starting_page,
        user: game_obj.user
      });
  }
};
