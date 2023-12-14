module.exports = {
  debugRemoveUnits: function (arg0_user, arg1_amount, arg2_unit) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = parseInt(arg1_amount);
    var unit_name = arg2_unit;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var unit_obj = getUnit(unit_name);
    var unit_key = getUnit(unit_name, { return_key: true });
    var usr = main.users[actual_id];

    //Remove units from reserves
    if (usr) {
      if (!isNaN(amount)) {
        if (unit_obj) {
          if (usr.reserves[unit_key] != undefined) {
            usr.reserves[unit_key] -= amount;

            if (usr.reserves[unit_key] <= 0)
              delete usr.reserves[unit_key];
          }
        } else {
          return [false, `The unit you have specified, **${unit_name}**, does not exist.`];
        }
      } else {
        return [false, `You must specify a valid amount of units to remove.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugSpawnUnits: function (arg0_user, arg1_amount, arg2_unit) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = parseInt(arg1_amount);
    var unit_name = arg2_unit;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var unit_obj = getUnit(unit_name);
    var unit_key = getUnit(unit_name, { return_key: true });
    var usr = main.users[actual_id];

    //Spawn units from reserves
    if (usr) {
      if (!isNaN(amount)) {
        if (unit_obj) {

        } else {
          return [false, `The unit you have specified, **${unit_name}**, does not exist.`];
        }
      } else {
        return [false, `You must specify a valid amount of units to spawn.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugTeleportArmies: function (arg0_user, arg1_armies, arg2_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies;
    var provinces = getList(arg2_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var armies = parseArmies(armies_string);
    var usr = main.users[actual_id];

    //Check if user exists
    if (usr) {
      
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugTeleportArmy: function (arg0_user, arg1_army, arg2_province) {
    //Convert from parameters

  }
};
