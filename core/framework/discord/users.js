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
    var processed_user_id = user_string.replace("<!@", "").replace("<@", "").replace(">", "");
    var local_id;

    //Search for nation-name
    var all_users = Object.keys(main.users);

    //Detected as direct user mention
    if (main.global.user_map[processed_user_id]) {
      //Return statement
      local_id = main.global.user_map[processed_user_id];
    }

    //Soft search
    for (var i = 0; i < all_users.length; i++)
      if (main.users[all_users[i]].name.toLowerCase().indexOf(user_string) != -1)
        local_id = all_users[i];

    //Hard search
    for (var i = 0; i < all_users.length; i++)
      if (main.users[all_users[i]].name == user_string)
        local_id = all_users[i];

    //Cached users
    //Username - Soft match first
    var soft_username = client.users.cache.find(user => user.username.toLowerCase().indexOf(processed_user_id.toLowerCase()) != -1);

    //Username - Hard match second
    var hard_username = client.users.cache.find(user => user.username.toLowerCase() == processed_user_id.toLowerCase());

    if (soft_username)
      local_id = soft_username.id;
    if (hard_username)
      local_id = hard_username.id;

    //Mention
    if (!isNaN(processed_user_id)) {
      var mention_obj = client.users.cache.find(user => user.id == processed_user_id);

      if (mention_obj)
        local_id = mention_obj.id;
    }

    //Return statement
    return local_id;
  }
};
