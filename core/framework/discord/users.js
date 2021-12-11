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
  },

  parseMention: function (arg0_string) {
    //Convert from parameters
    var user_string = arg0_string.toLowerCase();

    //User mention detected, parse to ID
    var processed_user_id = user_string.replace("<!@", "").replace("<@", "").replace(">", ""));
    var return_user_id;

    //Detected as direct user mention
    if (!isNaN(
      parseInt(processed_user_id)
    ) {
      if (main.global.user_map[processed_user_id]) {
        //Return statement
        return_user_id = main.global.user_map[processed_user_id];
      }
    } else {
      //Search for nation-name
      var all_users = Object.keys(main.users);

      //Soft search
      for (var i = 0; i < all_users.length; i++)
        if (main.users[all_users[i]].name.toLowerCase().indexOf(user_string) != -1)
          return_user_id = all_users[i];

      //Hard search
      for (var i = 0; i < all_users.length; i++)
        if (main.users[all_users[i]].name == user_string)
          return_user_id = all_users[i];
    }

    //Return statement
    return return_user_id;
  }
};
