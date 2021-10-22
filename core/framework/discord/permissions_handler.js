//Permissions framework
module.exports = {
  canCreateGames: function (arg0_user) {
    //Error trapping
    try {
      //Convert from parameters
      var usr = arg0_user;
      var guild_id = usr.guild.id;
      var guild_obj = main.guilds[guild_id];

      //Return statement
      return (usr.roles.cache.some(role => guild_obj.settings.actual_game_creator_roles.includes(role.id)));
    } catch {}
  },

  canCreateSingleplayerGames: function (arg0_user) {
    //Error trapping
    try {
      //Convert from parameters
      var usr = arg0_user;
      var guild_id = usr.guild.id;
      var guild_obj = main.guilds[guild_id];

      //Return statement
      return (usr.roles.cache.some(role => guild_obj.settings.actual_singleplayer_game_creator_roles.includes(role.id)));
    } catch {}
  },

  hasRole: function (arg0_user, arg1_role_name) {
    //Convert from parameters
    var usr = arg0_user;
    var role_name = arg1_role_name;

    //Return statement
    return (usr.roles.cache.some(role => role.name === role_name));
  },

  isAdministrator: function (arg0_user) {
    //Convert from parameters
    var usr = arg0_user;

    //Return statement
    try {
      return (usr.permissions.has([Discord.Permissions.FLAGS.ADMINISTRATOR]));
    } catch (e) {
      log.warn(`Could not check administrator perms for ${usr}: ${e}`);
    }
  },

  isGameMaster: function (arg0_user) {
    //Error trapping
    try {
      //Convert from parameters
      var usr = arg0_user;
      var guild_id = usr.guild.id;
      var guild_obj = main.guilds[guild_id];

      //Return statement
      return (usr.roles.cache.some(role => guild_obj.settings.actual_game_master_roles.includes(role.id)));
    } catch {}
  }
};
