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
