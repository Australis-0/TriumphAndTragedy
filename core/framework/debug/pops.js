module.exports = {
  debugAddPops: function (arg0_amount, arg1_pop_types, arg2_province) {
    //Convert from parameters
    var amount = parseInt(arg0_amount);
    var pop_types = getList(arg1_pop_types);
    var province_id = arg2_province.trim().toLowerCase();

    //Declare local instance variables
    var province_obj = getProvince(province_id);

    //Add pops
    if (province_obj) {
      if (!isNaN(amount)) {
        createPops(province_obj.id, { amount: amount, type: pop_types } );

        return [true, `Added **${parseNumber(amount)}** ${getList(pop_types)} to **${parseProvince(province_obj)}**.`];
      } else {
        return [false, `You must input a valid amount of pops to add!`];
      }
    } else {
      return [false, `**${province_id}** is not a valid province.`];
    }
  },

  debugMovePops: function (arg0_amount, arg1_pop_types, arg2_from_province, arg3_to_province) {
    //Convert from parameters
    var amount = parseInt(arg0_amount);
    var pop_types = getList(arg1_pop_types);
    var from_province_id = arg2_from_province.trim().toLowerCase();
    var to_province_id = arg3_to_province.trim().toLowerCase();

    //Declare local instance variables
    var from_province_obj = getProvince(from_province_id);
    var to_province_obj = getProvince(to_province_id);

    //Move pops
    if (from_province_obj && to_province_obj) {
      if (!isNaN(amount)) {
        var pop_scope_obj = selectPops({
          province_id: from_province_obj.id,

          pop_types: pop_types
        });
        movePops(from_province_obj.id, pop_scope_obj, to_province_obj.id);

        //Return statement
        return [true, `Moved **${parseNumber(amount)}** ${pop_types.join(", ")} from **${parseProvince(from_province_obj)}** to **${parseProvince(to_province_obj)}**.`];
      } else {
        return [false, `You must specify a valid amount of pops to move.`];
      }
    } else {
      return [false, `One of the provinces you have specified did not exist.`];
    }
  },

  debugRemovePops: function (arg0_amount, arg1_pop_types, arg2_province) {
    //Convert from parameters
    var amount = parseInt(arg0_amount);
    var pop_types = getList(arg1_pop_types);
    var province_id = arg2_province.trim().toLowerCase();

    //Declare local instance variables
    var province_obj = getProvince(province_id);

    //Remove pops
    if (province_obj) {
      if (!isNaN(amount)) {
        removePops(undefined, {
          amount: amount,
          pop_types: pop_types,
          amount: amount
        });

        return [true, `Removed **${parseNumber(amount)}** ${pop_types.join(", ")} from **${parseProvince(province_obj)}**.`];
      } else {
        return [false, `You must specify a valid amount of pops to remove.`];
      }
    } else {
      return [false, `The province you have specified, **${province_id}** does not exist and could not be found.`];
    }
  },

  debugResetPops: function () {
    //Run reset pop script
    var rural_pop_range = config.defines.economy.rural_pop_cap;
    var urban_pop_range = config.defines.economy.initial_urban_pop;

    //Declare local instance variables
    var all_users = Object.keys(main.users);

    //Iterate over all users to reset them
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];
      var provinces = getProvinces(all_users[i], { include_hostile_occupations: true });

      for (var x = 0; x < provinces.length; x++) {
        var local_pop_keys = Object.keys(provinces[x].pops);

        for (var y = 0; y < local_pop_keys.length; y++) {
          var preserve = false;

          if (local_pop_keys[y].startsWith("wealth-")) preserve = true;
          if (!preserve) delete provinces[x].pops[local_pop_keys[y]];
        }

        if (provinces[x].type == "rural") {
          createPops(provinces[x].id, config.defines.economy.rural_pop_cap);
        } else {
          createPops(provinces[x].id, config.defines.economy.urban_pop_growth_cap);
        }
      }
    }

    return [true, `Reset pops for all users.`];
  },

  debugProcessPops: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Process pops for a user
    if (usr) {
      var provinces = getProvinces(user_id, { include_hostile_occupations: true });

      for (var i = 0; i < provinces.length; i++)
        processPops(provinces[i].id);

      //Return statement
      return [true, `Processed pops for **${usr.name}**.`];
    } else {
      return [false, `The user you have specified doesn't exist.`];
    }
  }
};
