module.exports = {
  createArmy: function (arg0_user, arg1_army_name, arg2_province) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();
    var province_id = arg2_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    //Check if province_obj and user exist
    if (usr)
      if (province_obj) {
        var army_obj = {
          id: generateArmyID(actual_id),

          name: army_name,
          type: "", //Land (air_land, land), Air, Sea (air_sea, sea)
          province: province_id,
          moving_to: province_id,

          in_battle: false,
          stationary_turns: 0,

          units: {}
        };

        //Set new army object in usr.armies
        usr.armies[army_obj.id] = army_obj;
      }
  },

  deleteArmy: function (arg0_army, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(actual_id, army_name);
    var usr = main.users[actual_id];

    //Return all units to reserves
    if (army_obj) {
      var all_units = Object.keys(army_obj.units);

      for (var i = 0; i < all_units.length; i++)
        usr.reserves[all_units[i]] = (usr.reserves[all_units[i]]) ?
          usr.reserves[all_units[i]] + army_obj.units[all_units[i]] :
          army_obj.units[all_units[i]];

      //Delete army
      delete army_obj;
    }
  },

  /*
    getArmy() - Fetches an army object from a user by name property
    options: {
      return_key: true/false - Whether or not to return a key or object. False by default.
    }
  */
  getArmy: function (arg0_user, arg1_army_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var all_armies = Object.keys(usr.armies);
    var army_exists = [false, ""]; //[army_exists, army_obj/key];

    //Soft match
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];

      if (local_army.name.toLowerCase().indexOf(army_name) != -1)
        army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
    }

    //Hard match
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];

      if (local_army.name.toLowerCase() == army_name)
        army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
    }

    //Return statement
    return (army_exists[0]) ? army_exists[1] : undefined;
  },

  generateArmyID: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!usr.armies[local_id]) {
        return local_id;
        break;
      }
    }
  }
};
