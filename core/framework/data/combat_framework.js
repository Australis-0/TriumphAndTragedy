module.exports = {
  initialiseAirRaid: function (arg0_user, arg1_city_name, arg2_army_name) { //[WIP] - Work on initialiseAirBattle() first
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name.trim();
    var army_name = arg2_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var army_obj = getArmy(actual_id, army_name);
    var city_obj = getCity(city_name);
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (city_obj)
        if (army_obj) {
          var actual_ot_user_id = city_obj.owner;
          var army_stats = calculateArmyStats(actual_id, army_obj, { mode: "air_raid" });
          var ot_user = main.users[actual_ot_user_id];

          //Ge
        }
  }
};
