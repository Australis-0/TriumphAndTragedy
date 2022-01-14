module.exports = {
  calculateArmyStats: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(actual_id, army_name) :
      army_name;
    var army_stats = {
      attack: 0,
      defence: 0
    };
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (army_obj) {
        var all_units = Object.keys(army_obj.units);

        for (var i = 0; i < all_units.length; i++) {
          var unit_obj = getUnit(all_units[i]);

          army_stats.attack += army_obj.units[all_units[i]]*
            returnSafeNumber(unit_obj.attack)*
            returnSafeNumber(usr.modifiers[`${getUnitCategoryFromUnit(all_units[i], { return_key: true })}_attack`], 1);
          army_stats.defence += army_obj.units[all_units[i]]*
            returnSafeNumber(unit_obj.attack)*
            returnSafeNumber(usr.modifiers[`${getUnitCategoryFromUnit(all_units[i], { return_key: true })}_defence`], 1);
        }
      }

    //Return statement
    return army_stats;
  },

  calculateArmyType: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();

    //Declare local intsance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(actual_id, army_name);
    var usr = main.users[actual_id];

    //Check to make sure that both usr and army_obj are actually extant
    if (usr)
      if (army_obj) {
        var all_units = Object.keys(army_obj.units);
        var unit_types = {
          carrier_capacity: 0,

          has_air_unit: false,
          has_land_unit: false,
          has_naval_unit: false
        };

        for (var i = 0; i < all_units.length; i++)
          if (army_obj.units[all_units[i]] > 0) {
            var unit_obj = getUnit(all_units[i]);

            //Check for unit type
            unit_types[`has_${getUnitCategoryFromUnit(all_units[i])}_unit`] = true;

            //Check for carrier capacity
            unit_types.carrier_capacity += returnSafeNumber(unit_obj.carrier_capacity);
          }

        //Army type parsing
        if ((unit_types.has_naval_unit && unit_types.has_air_unit) || unit_types.has_naval_unit) {
          army_obj.type = "navy";
          army_obj.carrier_capacity = unit_types.carrier_capacity;
        } else if ((unit_types.has_land_unit && unit_types.has_air_unit) || unit_types.has_land_unit) {
          army_obj.type = "army";
          delete army_obj.carrier_capacity;
        } else if (unit_types.has_air_unit && !unit_types.has_land_unit && !unit_types.has_naval_unit) {
          army_obj.type = "air";
          delete army_obj.carrier_capacity;
        }

        //Return statement
        return unit_types;
      }
  },

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
          status: "stationed",
          type: "empty", //Land (air_land, land), Air, Sea (air_sea, sea), Empty
          province: province_id,
          moving_to: [],

          in_battle: false,
          stationary_turns: 0,

          units: {}
        };

        //Set new army object in usr.armies
        usr.armies[army_obj.id] = army_obj;
      }
  },

  deleteArmy: function (arg0_user, arg1_army_name) {
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
      var all_users = Object.keys(main.users);

      for (var i = 0; i < all_units.length; i++)
        usr.reserves[all_units[i]] = (usr.reserves[all_units[i]]) ?
          usr.reserves[all_units[i]] + army_obj.units[all_units[i]] :
          army_obj.units[all_units[i]];

      //Check if army is currently in a blockade, if so withdraw
      if (army_obj.is_blockading)
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          //Check for blockade
          if (local_user.blockaded.is_blockaded)
            for (var x = 0; x < local_user.blockaded.fleets.length; x++) {
              var local_fleet = local_user.blockaded.fleets[x];

              if (local_fleet.id == actual_id && local_fleet.fleet_id == army_obj.id)
                local_user.blockaded.fleets.splice(x, 1);
            }

          //Delete blockade if no fleet is left to blockade
          if (local_user.blockaded.is_blockaded)
            if (local_user.blockaded.fleets.length == 0)
              deleteBlockade(all_users[i]);
        }

      //Delete army
      delete army_obj;
    }
  },

  /*
    deployUnits() - Deploys a specific amount of a specific unit in a specified user army.
    options: {
      spawn_units: true/false - Whether or not to subtract from user reserves following deployment. False by default
    }
  */
  deployUnits: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name, arg4_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = parseInt(arg1_amount);
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name.trim().toLowerCase();
    var options = (arg4_options) ? arg4_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(actual_id, army_name);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if unit_obj and army_obj exist
    if (usr)
      if (army_obj)
        if (amount > 0)
          if (unit_obj) {
            //Declare secondary local instance variables
            var all_units = Object.keys(army_obj.units);
            var at_peace = (!atWar(actual_id));
            var capital_obj = getCapital(actual_id);
            var category_obj = getUnitCategoryFromUnit(raw_unit_name);
            var province_obj = getProvince(army_obj.province);
            var receiving_unit_type = category_obj.type;
            var unit_types = module.exports.calculateArmyType(actual_id, army_obj.name);

            var culture_obj = getCulture(province_obj.culture);

            //Guard clauses to check for errors
            if (!options.spawn_units)
              if (amount > usr.reserves[raw_unit_name])
                return [false, `You don't have that many troops in your reserves! You may only deploy up to **${parseNumber(usr.reserves[raw_unit_name])}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} in this army.`];

            if (receiving_unit_type == "reserves")
              return [false, `You can't transfer specialist units to an army! To use your colonial units instead, check out the **Colonisation** tab.`];

            if (at_peace) {
              if (army_obj.type != "navy" && !culture_obj.primary_culture.includes(actual_id))
                return [false, `You can't deploy your reserves outside non-core provinces!`];
            } else {
              if (army_obj.province != capital_obj.id)
                return [false, `You may only deploy forces in your capital city whilst at war!`];
            }

            if (unit_types.has_naval_unit) {
              if (receiving_unit_type == "land")
                return [false, `Your soldiers can't swim that far!`];
            } else if (unit_types.has_air_unit) {
              if (receiving_unit_type == "naval")
                return [false, `Research flying aircraft carriers somewhere else!`];
            } else if (unit_types.has_land_unit)
              if (receiving_unit_type == "naval")
                return [false, `That's not what I meant when I said landship ...`];

            //Deploy troops
            army_obj.units[raw_unit_name] = (army_obj.units[raw_unit_name]) ?
              army_obj.units[raw_unit_name] + amount :
              amount;

            //Modify reserves
            if (!options.spawn_units)
              usr.reserves[raw_unit_name] -= amount;

            if (usr.reserves[raw_unit_name] == 0)
              delete usr.reserves[raw_unit_name];

            return [true, `**${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} were ${(!options.spawn_units) ? "transferred to" : "deployed in"} the **${army_obj.name}**.`];

            //Recalculate army type
            module.exports.calculateArmyType(actual_id, army_obj.name);
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
  },

  //getArmiesInProvince() - Returns an object array of all armies in a province
  getArmiesInProvince: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id.trim();

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var armies_in_province = [];

    //Iterate over all users and their armies
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];
      var local_user_armies = Object.keys(local_user.armies);

      for (var x = 0; x < local_user_armies.length; x++) {
        var local_army = local_user.armies[local_user_armies[x]];

        if (local_army.type != "navy")
          armies_in_province.push(local_army);
      }
    }

    //Return statement
    return armies_in_province;
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

    //Soft match - Reversed
    for (var i = all_armies.length - 1; >= 0; i--) {
      var local_army = usr.armies[all_armies[i]];

      if (local_army.name.toLowerCase().indexOf(army_name) != -1)
        army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
    }

    //Hard match - Reversed
    for (var i = all_armies.length - 1; >= 0; i--) {
      var local_army = usr.armies[all_armies[i]];

      if (local_army.name.toLowerCase() == army_name)
        army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
    }

    //Return statement
    return (army_exists[0]) ? army_exists[1] : undefined;
  },

  getArmySize: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(army_name) :
      army_name;
    var army_size = 0;
    var usr = main.users[actual_id];

    //Check if army_obj exists
    if (army_obj) {
      var all_units = Object.keys(army_obj.units);

      for (var i = 0; i < all_units.length; i++)
        army_size += army_obj.units[all_units[i]]*getUnitSize(all_units[i]);
    }

    //Return statement
    return army_size;
  },

  getTroopsInProvince: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id.trim();

    //Declare local instance variables
    var local_armies = module.exports.getArmiesInProvince(province_id);
    var total_troop_count = 0;

    //Iterate over local armies
    for (var i = 0; i < local_armies.length; i++)
      total_troop_count += module.exports.getArmySize(local_armies[i]);

    //Return statement
    return total_troop_count;
  },

  mergeArmy: function (arg0_user, arg1_army_name, arg2_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var merged_army = arg1_army_name.trim().toLowerCase();
    var army_name = arg2_army_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(user_id, army_name);
    var merged_army_obj = module.exports.getArmy(user_id, merged_army);
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (army_obj)
        if (merged_army_obj) {
          //Declare local tracker variables
          var total_aeroplanes = 0;

          //Guard clauses for error trapping
          if (army_obj.province != merged_army_obj.province)
            return [false, `**${army_obj.name}** and **${merged_army_obj.name}** are not in the same province together! **${army_obj.name}** is in Province **${army_obj.povince}**, whilst **${merged_army_obj.name}** is in Province **${merged_army_obj.province}**.`];

          if (
            (army_obj.type == "army" && merged_army_obj.type == "navy") ||
            (army_obj.type == "navy" && merged_army_obj.type == "army")
          )
            return [false, `Your ships are not capable of going on land!`];

          //Fetch stats of both armies
          var army_obj_stats = module.exports.calculateArmyType(actual_id, army_obj.name);
          var merged_army_obj_stats = module.exports.calculateArmyType(actual_id, merged_army_obj.name);

          var total_carrier_capacity = army_obj_stats.carrier_capacity + merged_army_obj_stats.carrier_capacity;

          //Count aeroplanes
          var all_army_units = Object.keys(army_obj.units);
          var all_ot_army_units = Object.keys(merged_army_obj.units);

          for (var i = 0; i < all_army_units.length; i++)
            if (getUnitCategoryFromUnit(all_army_units[i]).type == "air")
              total_aeroplanes += army_obj.units[all_army_units[i]];

          for (var i = 0; i < all_ot_army_units.length; i++)
            if (getUnitCategoryFromUnit(all_ot_army_units[i]).type == "air")
              total_aeroplanes += merged_army_obj.units[all_ot_army_units[i]];

          //Check for aeroplane capacity if is navy
          if (
            (army_obj.type == "air" && merged_army_obj.type == "navy") ||
            (army_obj.type == "navy" && merged_army_obj.type == "air")
          )
            if (total_carrier_capacity == 0) {
              return [false, `You don't have any ships capable of carrying aircraft in the fleet you are trying to merge to!`];
            } else if (total_aeroplanes > total_carrier_capacity)
              return [false, `You don't have enough air capacity in the fleet you are trying to merge to! You are currently trying to cram **${parseNumber(total_aeroplanes)}** air units onto a fleet capable of supporting just **${parseNumber(total_carrier_capacity)}** of them! Consider assigning another aircraft to your fleet to offset this balance.`];

          //Merge the two armies if we've made it this far
          for (var i = 0; i < all_ot_army_units.length; i++)
            army_obj.units[all_ot_army_units[i]] = (army_obj.units[all_ot_army_units[i]]) ?
              army_obj.units[all_ot_army_units[i]] + merged_army_obj.units[all_ot_army_units[i]] :
              merged_army_obj.units[all_ot_army_units[i]];

          //Delete merged_army_obj now that troops have been transferred
          var merged_army_name = JSON.parse(JSON.stringify(merged_army_obj.name));

          module.exports.deleteArmy(actual_id, merged_army_obj.name);

          //Return statement
          return [true, `The **${merged_army_obj.name}** was merged into the **${army_obj.name}**.`];
        }
  },

  moveArmy: function (arg0_user, arg1_army_name, arg2_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();
    var province_id = arg2_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(actual_id, army_name);
    var usr = main.users[actual_id];

    //Try moving the army if possible
    if (usr)
      if (army_obj)
        if (!["empty", "navy"].includes(army_obj.type))
          if (main.provinces[province_id]) {
            if (province_id != army_obj.province) {
              var moving_to_array = smartMove(actual_id, army_obj.name, army_obj.province, province_id);

              if (moving_to_array) {
                army_obj.moving_to = moving_to_array;
                army_obj.status = "moving";

                var time_to_arrival = Math.ceil(army_obj.moving_to.length/(config.defines.combat.army_speed*usr.modifiers.army_travel_speed));

                return [true, `The **${army_obj.name}** is now en route to Province **${province_id}**. It will arrive in approximately **${parseNumber(time_to_arrival)}** turn(s).`];
              }
            } else {
              army_obj.moving_to = [];
              army_obj.status = "stationed";

              return [true, `You have ordered the **${army_obj.name}** to remain still.`];
            }
          }
  },

  relieveUnits: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = parseInt(arg1_amount);
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = module.exports.getArmy(actual_id, army_name);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (army_obj)
        if (unit_obj) {
          //Guard clauses for failure cases
          if (!army_obj.units[raw_unit_name])
            return [false, `You can't withdraw phantom ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from the **${army_obj.name}**!`];

          if (amount > army_obj.units[raw_unit_name])
            return [false, `You don't have that many troops in **${army_obj.name}**! You may only withdraw up to **${parseNumber(army_obj.units[raw_unit_name])}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from this force.`];

          //Begin withdrawal process
          army_obj.units[raw_unit_name] -= amount;
          usr.reserves[raw_unit_name] = (usr.reserves[raw_unit_name]) ?
            usr.reserves[raw_unit_name] + amount :
            amount;

          if (army_obj.units[raw_unit_name] == 0)
            delete army_obj.units[raw_unit_name];

          //Recalculate army type
          module.exports.calculateArmyType(actual_id, army_obj.name);

          //Print out return statement
          return [true, `You placed **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from the **${army_obj.name}** back into reserve.`];
        }
  }
};
