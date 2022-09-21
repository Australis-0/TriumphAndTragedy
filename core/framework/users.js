module.exports = {
  /*
    getUsernames() - Returns a list of usernames/nicknames from a given ID
    options: {
      return_nicknames: true/false - Whether or not to return nicknames instead of usernames. False by default
    }
  */
  getUsernames: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_user_keys = Object.keys(main.global.user_map);
    var fetch_ids = [];
    var guild_obj = returnChannel(settings.tt_category_id).guild;
    var nicknames = [];
    var usernames = [];
    var usr = main.users[actual_id];

    //Get user ID's to fetch
    for (var i = 0; i < all_user_keys.length; i++)
      if (main.global.user_map[all_user_keys[i]] == actual_id)
        fetch_ids.push(all_user_keys[i]);

    //Cache usernames
    for (var i = 0; i < fetch_ids.length; i++)
      try {
        //Username processing
        var user_obj = client.users.cache.find(user => user.id == fetch_ids[i]);
        usernames.push(user_obj.username.trim());

        //Nickname processing
        try {
          var member_obj = guild_obj.members.cache.find(member => member.id == fetch_ids[i]);

          if (member_obj.nickname)
            nicknames.push(member_obj.nickname.trim());
        } catch {}
      } catch {}

    //Set cache
    usr.nicknames = nicknames;
    usr.usernames = usernames;

    //Return nicknames/usernames array
    return (options.return_nicknames) ? nicknames : usernames;
  },

  returnMention: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var mention_id;
    var nation_found = [false, ""];
    var user_exists = false;

    if (user_id.match(/^[<0-9>(@)!]+$/)) {
      //Replace mentions
      mention_id = mention_id.replace(/(<)(@)(!)/, "")
        .replace(/(<)(@)/g, "")
        .replace(">", "");

      if (main.global.user_map[mention_id]) mention_id = main.global.user_map;
      user_exists = true;

      //Local case return statement
      return mention_id;
    }

    if (!user_exists) {
      //Declare local ID for resolving user ID
      var local_id;

      //Country name - Soft match first
      for (var i = 0; i < all_users.length; i++)
        if (main.users[all_users[i]].name.toLowerCase().indexOf(user_id.toLowerCase()) != -1)
          nation_found = [true, all_users[i]];

      //Country name - Hard match second
      for (var i = 0; i < all_users.length; i++)
        if (main.users[all_users[i]].name.toLowerCase() == user_id.toLowerCase())
          nation_found = [true, all_users[i]];

      if (!nation_found[0]) {
        //Username - Soft match first
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          if (local_user.usernames)
            for (var x = 0; x < local_user.usernames.length; x++)
              if (local_user.usernames[x].toLowerCase().indexOf(user_id.toLowerCase()) != -1)
                local_id = all_users[i];
        }

        //Username - Hard match second
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          if (local_user.usernames)
            for (var x = 0; x < local_user.usernames.length; x++)
              if (local_user.usernames[x].toLowerCase() == user_id.toLowerCase())
                local_id = all_users[i];
        }

        //Nicknames
        if (!local_id) {
          //Nickname - Soft match first
          for (var i = 0; i < all_users.length; i++) {
            var local_user = main.users[all_users[i]];

            if (local_user.nicknames)
              for (var x = 0; x < local_user.nicknames.length; x++)
                if (local_user.nicknames[x].toLowerCase().indexOf(user_id.toLowerCase()) != -1)
                  local_id = all_users[i];
          }

          //Nickname - Hard match second
          for (var i = 0; i < all_users.length; i++) {
            var local_user = main.users[all_users[i]];

            if (local_user.nicknames)
              for (var x = 0; x < local_user.nicknames.length; x++)
                if (local_user.nicknames[x].toLowerCase() == user_id.toLowerCase())
                  local_id = all_users[i];
          }
        }

        return main.global.user_map[local_id];
      } else {
        return main.global.user_map[nation_found[1]];
      }
    }

    if (user_exists)
      if (main.global.user_map[user_id]) return main.global.user_map[user_id];
  }
};
