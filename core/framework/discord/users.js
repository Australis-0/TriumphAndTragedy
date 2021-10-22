//Users framework
module.exports = {
  getUser: function (arg0_user_id) {
    //Convert from parameters
    var user_id = arg0_user_id;

    //Return statement
    try {
      return client.users.cache.get(arg0_user_id);
    } catch {}
  },

  getUserObject: function (arg0_user_id, arg1_guild_id) {
    //Convert from parameters
    var user_id = arg0_user_id;
    var guild_id = arg1_guild_id;

    //Declare local instance variables
    var guild_obj = client.guilds.cache.get(guild_id);
    
    //Return statement
    try {
      return guild_obj.members.cache.get(user_id);
    } catch (e) {
      log.warn(`Could not fetch user object of ${user_id}: ${e}.`);
    }
  }
};
