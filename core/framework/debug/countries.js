module.exports = {
  debugControlCountry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];

    //Set main.global.user_map
    if (ot_user) {
      var current_usr = main.users[actual_id];

      main.global.user_map[user_id] = actual_ot_user_id;

      //Return statement
      return (current_usr) ?
        [true, `Switched <@${user_id}> from **${current_usr.name}** to controlling **${ot_user.name}**.`] :
        [true, `Switched <@${user_id}> to controlling **${ot_user.name}`];
    } else {
      return [false, `**${ot_user_id}** is not a valid User ID!`];
    }
  },

  debugCreateCountry: function (arg0_id, arg1_provinces, arg2_name) {
    //Convert from parameters
    var country_id = arg0_id;
    var provinces = arg1_provinces;
    var country_name = arg2_name;

    //Init country and settle starting provinces
    initCountry(country_id, country_name);
    settleStartingProvinces(user_id, provinces, true);

    //Return statement
    return [true, `Founded **${country_name}** in **${parseProvinces(provinces)}**.`];
  },

  debugDeleteCountry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    deleteCountry(user_id);

    //Return statement
    return [true, `Deleted **${usr.name}** as a country.`];
  }
};
