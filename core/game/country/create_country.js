module.exports = {
  foundCountry: function (arg0_user, arg1_name, arg2_actual_id) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var country_name = arg1_name;
    var actual_id = arg2_actual_id;

    //Declare local instance variables
    var game_obj = getGame(user_id);
    var just_registered = (!main.users[user_id]);

    if (just_registered) {
      //Declare local_id. This is used for mapping users and distinguishing the actual declared ID from other processed ID's
      var local_id = (actual_id) ? actual_id : user_id;

      //Initialise user data
      initUser(local_id);
      var usr = main.users[local_id];

      //Send message affirming successful registration if in game
      if (game_obj) printAlert(game_obj.id, `Please choose a starting province on which the peoples of ${country_name} may settle:`, true, true);

      //Set valid user map (this can be used later on for co-op and AI tags):
      main.global.user_map[user_id] = local_id;
    }
  },

  initCountry: function (arg0_user, arg1_name) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var country_name = arg1_name;

    //Declare local instance variables
    var country_name_taken = false;
    var processed_country_name = formaliseString(country_name);
  }
};
