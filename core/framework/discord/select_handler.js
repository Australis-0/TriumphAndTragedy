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
      var game_obj = getGameObject(interaction.user.id);

      if (game_obj) {
        //Declare local instance variables
        var guild_id = getChannelGuild(game_obj.channel);
        var value = interaction.values[0];

        var local_key = `${interaction.message.id}-${interaction.customId}-${value}`;
        
        //addSelectMenu() functionality
        if (selection_effect_map[`${local_key}`])
          selection_effect_map[`${local_key}`](
            value,
            selection_effect_map[`${local_key}-options`]
          );

        //Keep at bottom so interactions never fail
        await interaction.update({});
      }
    }
  }
};
