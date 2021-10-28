//Selection handler framework
module.exports = {
  createRoleHandler: function (arg0_options) {
    try {
      //Convert from parameters
      var options = arg0_options;

      var guild_obj = options.guild_obj;

      var interaction = options.interaction;
      var menu_obj = options.menu_obj;
      var role_display = guild_obj.settings[options.display_key];
      
      role_display = (!role_display) ? [] : role_display;

      for (var i = 0; i < interaction.values.length; i++) {
        //Check if role already has permission
        var role_has_permission = false;
        var role_id = interaction.values[i];

        try {
          role_has_permission = (role_display.includes(role_id));
        } catch {}

        //Append to array if not defined, remove from array if defined
        if (!role_has_permission) {
          role_display.push(role_id);
        } else {
          removeElement(role_display, role_id);
        }

        //Delete to save space if nothing is left in the display key
        if (role_display.length == 0) delete role_display;
      }
    } catch (e) {
      log.error(`Selection role handler at createRoleHandler() failed. ${e}`);
    }
  },

  selectHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Make sure only actual selections are getting processed
    if (interaction.isSelectMenu()) {
      var menu_id = getHub(interaction.user.id);

      if (menu_id) {
        //Declare local instance variables
        var menu_obj = interfaces[menu_id];
        var guild_id = getChannelGuild(menu_obj.channel);
        var guild_obj = main.guilds[guild_id];

        //Settings Page
        {
          switch (interaction.customId) {
            case "toggle_game_creator_roles":
              //Create role selection handler
              createRoleHandler({
                guild_obj: guild_obj,
                interaction: interaction,
                menu_obj: menu_obj,
                display_key: "game_creator_roles"
              });

              //Update select menu
              settingsInput(menu_id, "game creator roles");
              break;
            case "toggle_game_master_roles":
              //Create role selection handler
              createRoleHandler({
                guild_obj: guild_obj,
                interaction: interaction,
                menu_obj: menu_obj,
                display_key: "game_master_roles"
              });

              //Update select menu
              settingsInput(menu_id, "game master roles");
              break;
            case "toggle_singleplayer_game_creator_roles":
              //Create role selection handler
              createRoleHandler({
                guild_obj: guild_obj,
                interaction: interaction,
                menu_obj: menu_obj,
                display_key: "singleplayer_game_creator_roles"
              });

              //Update select menu
              settingsInput(menu_id, "singleplayer game creator roles");
              break;
          }

          //Update settings menu
          setTimeout(function(){
            menu_obj.main_embed = printSettingsEmbed(menu_id);
            menu_obj.main_change = true;
          }, 500);
        }

        //Keep at bottom so that buttons never fail
        await interaction.update({});
      }
    }
  }
};
