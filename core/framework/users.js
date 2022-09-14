module.exports = {
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

      //Local case return statement
      return mention_id;
    } else {
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
        for (var i = 0; i < all_users.length; i++)
          if (main.users[all_users[i]].username.toLowerCase().indexOf(user_id.toLowerCase()) != -1)
            local_id = all_users[i];

        //Username - Hard match second
        for (var i = 0; i < all_users.length; i++)
          if (main.users[all_users[i]].username.toLowerCase() == user_id.toLowerCase())
            local_id = all_users[i];

        return main.global.user_map[local_id];
      } else {
        return main.global.user_map[nation_found[1]];
      }
    }

    if (user_exists)
      if (main.global.user_map[user_id]) return main.global.user_map[user_id];
  }
};
