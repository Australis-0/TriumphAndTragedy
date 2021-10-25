//Channel framework
module.exports = {
  getChannelGuild: function (arg0_channel_id) {
    //Convert from parameters
    var channel_id = arg0_channel_id;

    //Return statement
    try {
      return returnChannel(channel_id).guild.id;
    } catch (e) {
      log.warn(`Could not fetch channel ${channel_id}. ${e.toString()}`);
    }
  },

  getChannelGuildObject: function (arg0_channel_id) {
    //Convert from parameters
    var channel_id = arg0_channel_id;

    //Return statement
    try {
      return returnChannel(channel_id).guild;
    } catch (e) {
      log.warn(`Could not fetch channel ${channel_id}. ${e.toString()}`);
    }
  },

  returnCacheChannel: function () {
    return module.exports.returnChannel(randomElement(settings.cache_channels));
  },

  returnChannel: function (arg0_channel_id) {
    //Convert from parameters
    var channel_id = arg0_channel_id;

    //Return statement
    try {
      return client.channels.cache.get(channel_id);
    } catch (e) {
      log.warn(`Could not fetch channel ${channel_id}. ${e.toString()}`);
    }
  },

  returnGameFromChannelID: function (arg0_channel_id) {
    //Convert from parameters
    var channel_id = arg0_channel_id;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var channel_found = [false, ""];

    //Iterate over all interfaces
    for (var i = 0; i < all_interfaces.length; i++)
      if (interfaces[all_interfaces[i]].type == "game")
        channel_found = (interfaces[all_interfaces[i]].channel) ? [true, interfaces[all_interfaces[i]].channel] : channel_found;

    //Return statement
    return (channel_found[0]) ? channel_found[1] : undefined;
  }
};
