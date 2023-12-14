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

            return [true, `Deleted all ${(unit_obj.name) ? unit_obj.name : unit_key} from **${usr.name}**'s reserves.`];
          }

          //Return statement
          return [true, `Deleted **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : unit_key} from **${usr.name}**'s reserves.`];
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
          modifyValue(usr.reserves, unit_key, amount);

          //Return statement
          return [true, `Spawned **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : unit_key} in **${usr.name}**'s reserves.`];
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
      //Trim provinces first
      for (var i = 0; i < provinces.length; i++)
        provinces[i] = provinces[i].trim();

      if (armies.length > 0) {
        var missing_armies = 0;
        var missing_provinces = false;
        var successfully_moved_armies = 0;

        for (var i = 0; i < armies.length; i++) {
          var local_army = getArmy(user_id, armies[i]);

          if (local_army) {
            var local_province_index = i % provinces.length;
            var local_province_obj = getProvince(provinces[local_province_index]);

            if (local_province_obj) {
              local_army.distances = [];
              local_army.moving_to = [];
              local_army.status = "stationed";

              local_army.province = local_province_obj.id;

              delete local_army.progress;
            } else {
              missing_provinces = true;
            }
          } else {
            missing_armies++;
          }
        }

        //Return statement
        return [true, `You have moved **${armies.length}** from their original positions to Provinces **${provinces.join(", ")}** on behalf of **${usr.name}**. **${parseNumber(missing_armies)}** armies could not be found, and **${(missing_provinces) ? `some` : `no`}** province(s) were missing.`];
      } else {
        return [false, `You must specify at least some armies to teleport.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugTeleportArmy: function (arg0_user, arg1_armies, arg2_province) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_army;
    var province_id = arg2_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var armies = parseArmies(armies_string);
    var province_obj = getProvince(province_id);
    var usr = main.users[actual_id];

    //Make sure user and province exist
    if (usr) {
      if (province_obj) {
        if (armies.length > 0) {
          var missing_armies = 0;

          for (var i = 0; i < armies.length; i++) {
            var local_army = getArmy(user_id, armies[i]);

            if (local_army) {
              local_army.distances = [];
              local_army.moving_to = [];
              local_army.status = "stationed";

              local_army.province = province_obj.id;

              delete local_army.progress;
            } else {
              missing_armies++;
            }
          }

          return [true, `You have moved **${parseNumber(armies.length)}** armies from **${usr.name}** to **${parseProvince(province_obj)}**, minus **${parseNumber(missing_armies)}** armies that could not be found.`]
        } else {
          return [false, `You must specify some armies to teleport.`];
        }
      } else {
        return [false, `The province you have specified, **${province_id}**, could not be found!`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  }
};
