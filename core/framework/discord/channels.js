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
  }
};
