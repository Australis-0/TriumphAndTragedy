//Initialise guild variables at start (only initialised if settings are being modified)
module.exports = {
  initGuild: function (arg0_guild_id) {
    //Convert from parameters
    var guild_id = arg0_guild_id;
    main.guilds[guild_id] = (!main.guilds[guild_id]) ? {} : main.guilds[guild_id];
    var guild_obj = main.guilds[guild_id];

    //Declare objects if undefined
    guild_obj.settings = (!guild_obj.settings) ? {} : guild_obj.settings;
  }
};
