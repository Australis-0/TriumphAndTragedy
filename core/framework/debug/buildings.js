module.exports = {
  debugConstruct: function (arg0_user, arg1_province_id, arg2_amount, arg3_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var raw_amount = parseInt(arg2_amount);
    var building_name = arg3_building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuilding(building_name);
    var province_obj = getProvince(province_id);
    var raw_building_name = getBuilding(building_name, { return_key: true });
    var usr = main.users[actual_id];

    if (usr) {
      if (province_obj) {
        var base_construction_turns = (building_obj.construction_turns) ?
          building_obj.construction_turns :
          config.defines.economy.construction_turns;
        var total_construction_time = Math.ceil(base_construction_turns*usr.modifiers.construction_time);

        usr.under_construction.push({
          building_type: raw_building_name,
          building_amount: raw_amount,
          construction_turns: total_construction_time,
          province_id: city_obj.id
        });

        return [true, `Began constructing **${parseNumber(building_amount)}** ${(building_amount == 1) ? (building_obj.singular) ? building_obj.singular : raw_building_name : (building_obj.name) ? building_obj.name : raw_building_name} in **${city_obj.name}**! Your advisors estimate that construction will complete in **${parseNumber(total_construction_time)}** turn(s).`];
      } else {
        return [false, `Could not find Province ${province_id}.`];
      }
    } else {
      return [false, `Could not find User ID ${user_id}.`];
    }
  },

  debugInstantConstruct: function (arg0_user, arg1_province_id, arg2_amount, arg3_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var amount = parseInt(arg2_amount);
    var building_name = arg3_building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuilding(building_name);
    var province_obj = getProvince(province_id);
    var raw_building_name = getBuilding(building_name, { return_key: true });
    var usr = main.users[actual_id];

    if (usr) {
      if (province_obj) {
        if (building_obj) {
          constructBuilding(amount, building_obj.name, province_obj.id);

          return [true, `Instantly constructed **${parseNumber(amount)}** ${(building_obj.name) ? building_obj.name : raw_building_name} in ${parseProvince(province_obj)}.`];
        } else {
          return [false, `No building by that name could be found.`];
        }
      } else {
        return [false, `Could not find Province ${province_id}.`];
      }
    } else {
      return [false, `Could not find User ID ${user_id}.`];
    }
  },

  debugProcessBuilding: function (arg0_user, arg1_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuildingByName(building_name);
    var usr = main.users[actual_id];

    if (usr) {
      if (building_obj) {
        var building_split_id = building_obj.split("-");
        var province_obj = main.provinces[building_split_id[0]];

        processBuilding(building_obj);

        return [true, `Processed **${building_obj.name}** in **${parseProvince(province_obj)}**.`];
      } else {
        return [false, `Could not find a building by the name of ${building_name}.`];
      }
    } else {
      return [false, `Could not find User ID ${user_id}.`];
    }
  },

  debugProcessBuildings: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = arg1_provinces.split(" ");

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    if (usr) {
      for (var i = 0; i < provinces.length; i++) {
        var local_province = main.provinces[provinces[i]];

        if (local_province)
          if (local_province.buildings)
            for (var x = 0; x < local_province.buildings.length; x++) {
              var local_building = local_province.buildings[x];

              processBuilding(local_building);
            }
      }

      return [true, `Processed buildings in **${parseNumber(provinces.length)}** province(s).`];
    } else {
      return [false, `Could not find User ID ${user_id}.`];
    }
  }
};
