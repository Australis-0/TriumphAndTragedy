module.exports = {
  /*
    calculateArmyStats() - Returns the attack and defence value of the given army based on the available options.
    options: {
      mode: "air_raid", "default", "submarine_defence", "submarine_raid" - Which mode to calculate in; default by default.
    }
  */
  calculateArmyStats: function (arg0_user, arg1_army_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;
    var options = (arg2_options) ? arg2_options : {};
    if (!options.mode)
      options.mode = "default";

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
        var pure_submarines = true;

        for (var i = 0; i < all_units.length; i++) {
          var unit_obj = getUnit(all_units[i]);

          var default_attack = army_obj.units[all_units[i]]*getAttack(user_id, all_units[i]);
          var default_defence = army_obj.units[all_units[i]]*getDefence(user_id, all_units[i]);

          //Check to see if unit_counts according to the current mode
          var unit_counts = false;
          var unit_attack_modifier = 1;
          var unit_defence_modifier = 1;

          if (options.mode == "air_raid")
            if (unit_obj.type)
              if (unit_obj.type.includes("can_bomb"))
                unit_counts = true;

          if (options.mode == "submarine_defence")
            if (unit_obj.type)
              if (unit_obj.type.includes("destroyer") || unit_obj.type.includes("helicopter")) {
                unit_counts = true;
              } else if (unit_obj.type.includes("cruiser")) {
                unit_counts = true;
                unit_attack_modifier = 0.5;
              }

          if (options.mode == "submarine_naval_defence")
            if (unit_obj.type)
              if (unit_obj.type.includes("destroyer")) {
                unit_counts = true;
              } else if (unit_obj.type.includes("cruiser")) {
                unit_counts = true;
                unit_attack_modifier = 0.5;
              }

          if (options.mode == "submarine_raid")
            if (unit_obj.type)
              if (unit_obj.type.includes("submarine"))
                unit_counts = true;

          if (options.mode == "default")
            unit_counts = true;


          if (unit_counts) {
            army_stats.attack += default_attack*unit_attack_modifier;
            army_stats.defence += default_defence*unit_defence_modifier;
          }

          //Add army_obj flags
          if (!unit_obj.type)
            pure_submarines = false;
          if (unit_obj.type)
            if (!unit_obj.type.includes("submarine"))
              pure_submarines = false;
        }

        army_stats.pure_submarines = pure_submarines;
      }

    //Return statement
    return army_stats;
  },

  calculateArmyType: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local intsance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? module.exports.getArmy(actual_id, army_name) : army_name;
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
            var amount = army_obj.units[all_units[i]];
            var unit_obj = getUnit(all_units[i]);

            //Check for unit type
            unit_types[`has_${getUnitCategoryFromUnit(all_units[i]).type}_unit`] = true;

            //Check for carrier capacity
            unit_types.carrier_capacity += returnSafeNumber(unit_obj.carrier_capacity*amount);
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
        } else {
          army_obj.type = "empty";
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

    var all_armies = Object.keys(usr.armies);

    //Check if province_obj and user exist
    if (usr)
      //Check to make sure that the user cannot exceed their overall army limit
      if (all_armies.length + 1 <= config.defines.combat.max_army_limit)
        if (province_obj) {
          var army_obj = {
            id: generateArmyID(actual_id),
            owner: actual_id,

            name: army_name,
            status: "stationed",
            type: "empty", //Land (air_land, land), Air, Sea (air_sea, sea), Empty
            province: province_id,
            distances: [],
            moving_to: [],

            in_battle: false,
            stationary_turns: 0,

            units: {}
          };

          //Set new army object in usr.armies
          usr.armies[army_obj.id] = army_obj;
          usr.army_array.push(army_obj.id);

          //Return statement
          return true;
        }
  },

  deleteArmy: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var army_id = (usr.armies[army_name]) ?
      usr.armies[army_name].id :
      module.exports.getArmy(actual_id, army_name, { return_key: true });
    var army_obj = usr.armies[army_id];

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
                local_user.blockaded.fleets = local_user.blockaded.fleets.splice(x, 1);
            }

          //Delete blockade if no fleet is left to blockade
          if (local_user.blockaded.is_blockaded)
            if (local_user.blockaded.fleets.length == 0)
              deleteBlockade(all_users[i]);
        }

      //Delete army
      delete usr.armies[army_id];
      removeElement(usr.army_array, army_id);
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
    var amount = returnSafeNumber(parseInt(arg1_amount));
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name;
    var options = (arg4_options) ? arg4_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? module.exports.getArmy(actual_id, army_name) : army_name;
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if unit_obj and army_obj exist
    if (usr)
      if (army_obj)
        if (usr.reserves[raw_unit_name] >= amount || options.spawn_units)
          if (amount > 0)
            if (unit_obj) {
              //Declare secondary local instance variables
              var all_units = Object.keys(army_obj.units);
              var at_peace = (!atWar(actual_id));
              var capital_obj = getCapital(actual_id);
              var category_obj = getUnitCategoryFromUnit(raw_unit_name);
              var province_obj = getProvince(army_obj.province);
              var receiving_unit_type = category_obj.type;
              var unit_types = module.exports.calculateArmyType(actual_id, army_obj);

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

              if (usr.reserves[raw_unit_name] <= 0)
                delete usr.reserves[raw_unit_name];

              //Recalculate army type
              module.exports.calculateArmyType(actual_id, army_obj);

              return [true, `**${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} were ${(!options.spawn_units) ? "transferred to" : "deployed in"} the **${army_obj.name}**.`];
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

  getAirRange: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local intsance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? module.exports.getArmy(actual_id, army_name) : army_name;
    var usr = main.users[actual_id];

    if (usr)
      if (army_obj) {
        var all_army_units = Object.keys(army_obj.units);
        var largest_unit = [0, ""];

        for (var i = 0; i < all_army_units.length; i++) {
          var local_amount = army_obj.units[all_army_units[i]];

          if (local_amount > largest_unit[0])
            largest_unit = [local_amount, all_army_units[i]];
        }

        //Return range, assuming it exists
        var unit_obj = getUnit(largest_unit[1]);

        if (unit_obj)
          return getRange(user_id, unit_obj);
      }
  },

  //Gets an object array of every army in the world
  getAllArmies: function () {
    //Declare local instance variables
    var all_armies = [];
    var all_users = Object.keys(main.users);

    //Loop over all users
    try {
      for (var i = 0; i < all_users.length; i++) {
        var local_user = main.users[all_users[i]];

        var local_user_armies = Object.keys(local_user.armies);

        for (var x = 0; x < local_user_armies.length; x++)
          all_armies.push(local_user.armies[local_user_armies[x]]);
      }
    } catch {}

    //Return statement
    return all_armies;
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

          //Append owner for identification
          local_army.owner = all_users[i];

          if (local_army.province == province_id)
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
    var actual_id = main.global.user_map[user_id];
    var army_exists = [false, ""]; //[army_exists, army_obj/key];
    var usr = main.users[actual_id];

    var all_armies = usr.army_array;

    //Key match
    if (usr.armies[army_name])
      army_exists = [true, (!options.return_key) ? usr.armies[army_name] : army_name];

    if (!army_exists[0]) {
      //Soft match - Reversed
      for (var i = 0; i < usr.army_array.length; i++) {
        var local_army = usr.armies[usr.army_array[i]];

        if (local_army.name.toLowerCase().indexOf(army_name) != -1)
          army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
      }

      //Hard match - Reversed
      for (var i = 0; i < usr.army_array.length; i++) {
        var local_army = usr.armies[usr.army_array[i]];

        if (local_army.name.toLowerCase() == army_name)
          army_exists = [true, (!options.return_key) ? local_army : all_armies[i]];
      }
    }

    //Return statement
    return (army_exists[0]) ? army_exists[1] : undefined;
  },

  getArmyDeficitGoods: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var deficit_goods = {};
    var maintenance_obj = module.exports.getArmyMaintenance(user_id, army_name);
    var user_production = parseProduction(user_id);
    var usr = main.users[actual_id];

    var all_maintenance_costs = Object.keys(maintenance_obj);

    //Iterate over all_maintenance_costs, check to see if user_production is negative
    for (var i = 0; i < all_maintenance_costs.length; i++) {
      var local_production = user_production[all_maintenance_costs[i]];

      if (local_production)
        if (local_production[0] < 0 || local_production[1] < 0)
          deficit_goods[all_maintenance_costs[i]] = local_production;
    }

    //Return statement
    return deficit_goods;
  },

  getArmyMaintenance: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var maintenance_obj = {};

    if (!army_name) {
      var units_obj = module.exports.getUnits(actual_id);

      var all_units = Object.keys(units_obj);

      for (var i = 0; i < all_units.length; i++) {
        var local_amount = units_obj[all_units[i]];
        var local_unit = lookup.all_units[all_units[i]];

        //Check for local maintenance
        if (local_unit.maintenance) {
          var all_maintenance_costs = Object.keys(local_unit.maintenance);

          for (var x = 0; x < all_maintenance_costs.length; x++) {
            var local_maintenance_cost = local_unit.maintenance[all_maintenance_costs[x]];
            var local_quantity = returnSafeNumber(local_unit.quantity, 1);

            local_maintenance_cost = Math.ceil((local_maintenance_cost/local_quantity)*local_amount);

            maintenance_obj[all_maintenance_costs[x]] = (maintenance_obj[all_maintenance_costs[x]]) ?
              maintenance_obj[all_maintenance_costs[x]] + local_maintenance_cost :
              local_maintenance_cost;
          }
        }
      }
    } else {
      //Get maintenance object for a single army
      var army_obj = (typeof army_name != "object") ?
        module.exports.getArmy(actual_id, army_name) :
        army_name;
      var all_units = Object.keys(army_obj.units);

      if (all_units.length > 0)
        for (var i = 0; i < all_units.length; i++) {
          var local_amount = army_obj.units[all_units[i]];
          var local_unit = getUnit(all_units[i]);

          //Check for local maintenance
          if (local_unit.maintenance) {
            var all_maintenance_costs = Object.keys(local_unit.maintenance);

            for (var x = 0; x < all_maintenance_costs.length; x++) {
              var local_maintenance_cost = local_unit.maintenance[all_maintenance_costs[x]];
              var local_quantity = returnSafeNumber(local_unit.quantity, 1);

              local_maintenance_cost = Math.ceil((local_maintenance_cost/local_quantity)*local_amount);

              maintenance_obj[all_maintenance_costs[x]] = (maintenance_obj[all_maintenance_costs[x]]) ?
                maintenance_obj[all_maintenance_costs[x]] + local_maintenance_cost :
                local_maintenance_cost;
            }
          }
        }
    }

    //Return statement
    return maintenance_obj;
  },

  getArmySize: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(actual_id, army_name) :
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

  getArmySpeed: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local intsance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? module.exports.getArmy(actual_id, army_name) : army_name;
    var usr = main.users[actual_id];

    if (usr)
      if (army_obj) {
        var all_army_units = Object.keys(army_obj.units);
        var army_speed = 0;
        var army_size = module.exports.getArmySize(user_id, army_obj);

        for (var i = 0; i < all_army_units.length; i++) {
          var local_amount = army_obj.units[all_army_units[i]];
          var unit_obj = getUnit(all_army_units[i]);

          //Factor manpower_cost into local_amount
          if (unit_obj.manpower_cost)
            local_amount = local_amount*getManpowerPerUnit(unit_obj);

          //Add to army speed
          army_speed += local_amount*getMovement(user_id, all_army_units[i]);
        }

        //Average out army_speed
        army_speed = (army_speed/army_size)*usr.modifiers.army_travel_speed;

        //Return statement
        return returnSafeNumber(army_speed);
      }
  },

  getArrivalTime: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local intsance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? module.exports.getArmy(actual_id, army_name) : army_name;
    var usr = main.users[actual_id];

    if (usr)
      if (army_obj) {
        var time_to_arrival = 0;

        //Guard clause
        if (army_obj.moving_to.length == 0)
          return time_to_arrival;

        //Otherwise calculate based on army speed
        var army_speed = module.exports.getArmySpeed(user_id, army_obj)*getTurnHours();
        var current_index = army_obj.moving_to.indexOf(army_obj.province);
        var distance_sum = 0;

        //Fetch distance_sum
        for (var i = current_index; i < army_obj.distances.length; i++)
          if (army_obj.distances[i])
            distance_sum += army_obj.distances[i];

        return Math.ceil(distance_sum/army_speed);
      }
  },

  getCategoryUnits: function (arg0_user, arg1_category_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var category_name = arg1_category_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var unit_category_obj = getUnitCategory(category_name);
    var unit_obj = {};
    var units_obj = module.exports.getUnits(user_id);
    var usr = main.users[actual_id];

    var all_units = Object.keys(units_obj);

    //Iterate over all_units and check if it exists as a key in unit_category_obj
    for (var i = 0; i < all_units.length; i++) {
      var local_amount = units_obj[all_units[i]];

      if (unit_category_obj[all_units[i]])
        unit_obj[all_units[i]] = local_amount;
    }

    //Return statement
    return unit_obj;
  },

  /*
    getMilitaryStrength() - Gets the overall strength of a nation's military
    options: {
      include_reserves: true/false - Whether or not to include reserves in the overall calculations
    }
  */
  getMilitaryStrength: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var military_stats = {
      attack: 0,
      defence: 0
    };
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Iterate over all armies
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];
      var local_army_stats = module.exports.calculateArmyStats(actual_id, local_army);

      var all_army_stats = Object.keys(local_army_stats);

      for (var x = 0; x < all_army_stats.length; x++)
        military_stats[all_army_stats[x]] = (military_stats[all_army_stats[x]]) ?
          military_stats[all_army_stats[x]] + local_army_stats[all_army_stats[x]] :
          local_army_stats[all_army_stats[x]];
    }

    if (options.include_reserves) {
      var reserves_strength = getReserveStrength(actual_id);

      military_stats.attack += reserves_strength.attack;
      military_stats.defence += reserves_strength.defence;
    }

    //Return statement
    return military_stats;
  },

  getOverallSupply: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var average_supply = 0;
    var supply_obj = {}; //Weighted supply_obj used for calculating average_supply from
    var total_soldiers = 0;
    var usr = main.users[actual_id];

    if (!army_name) {
      
    } else {
      //Get maintenance object for a single army
      var army_obj = (typeof army_name != "object") ?
        module.exports.getArmy(actual_id, army_name) :
        army_name;
      var all_units = Object.keys(army_obj.units);
    }
  },

  //getReserveStrength() - Returns the current strength and army modifiers a user has in their reserves
  getReserveStrength: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_unit_names = getAllUnits({ return_names: true });
    var all_units = getAllUnits();
    var army_obj = {};
    var usr = main.users[actual_id];

    //Initialise army_obj
    for (var i = 0; i < config.defines.combat.combat_modifiers.length; i++)
      army_obj[config.defines.combat.combat_modifiers[i]] = 0;

    //Sum up all stats for all units the user has in reserves
    for (var i = 0; i < all_unit_names.length; i++)
      for (var x = 0; x < config.defines.combat.combat_modifiers.length; x++) {
        var local_combat_modifier = config.defines.combat.combat_modifiers[x];
        var unit_obj = getUnit(all_unit_names[i]);

        army_obj[local_combat_modifier] +=
          returnSafeNumber(
            returnSafeNumber(usr.reserves[all_unit_names[i]])*
              unit_obj[local_combat_modifier]
          );
      }

    //Return statement
    return army_obj;
  },

  getTroopsInProvince: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id.trim();

    //Declare local instance variables
    var local_armies = module.exports.getArmiesInProvince(province_id);
    var total_troop_count = 0;

    //Iterate over local armies
    for (var i = 0; i < local_armies.length; i++)
      total_troop_count += module.exports.getArmySize(local_armies[i].owner, local_armies[i]);

    //Return statement
    return total_troop_count;
  },

  getUnitCategorySupplies: function (arg0_user, arg1_category_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var category_name = arg1_category_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var percentage_supplied = 0;
    var total_soldiers = 0;
    var unit_names_in_category = getAllUnitsInCategory(category_name, { return_names: true });
    var units_in_category = getAllUnitsInCategory(category_name);
    var units_obj = module.exports.getUnits(user_id);
    var usr = main.users[actual_id];

    //Fetch total_soldiers
    for (var i = 0; i < units_in_category.length; i++) {
      var local_unit = units_in_category[i];
      var local_unit_amount = units_obj[unit_names_in_category[i]];

      //Add total_manpower_cost to total_soldiers
      if (local_unit_amount)
        total_soldiers += returnSafeNumber(getManpowerPerUnit(local_unit)*local_unit_amount);
    }

    //Iterate over units_in_category, check for their supply relative to units_obj
    for (var i = 0; i < units_in_category.length; i++) {
      var local_unit = units_in_category[i];
      var local_unit_amount = returnSafeNumber(units_obj[unit_names_in_category[i]]);
      var local_unit_manpower = getManpowerPerUnit(local_unit);

      percentage_supplied += (
        (local_unit_amount*local_unit_manpower)/total_soldiers
      )*usr.modifiers.unit_supply[unit_names_in_category[i]];
    }

    //Return percentage_supplied
    return (total_soldiers > 0) ? percentage_supplied : undefined;
  },

  //Gets an object of all units in a player's armies and reserves
  getUnits: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_units = {};
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Add units from all armies
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];
      var local_army_units = Object.keys(local_army.units);

      for (var x = 0; x < local_army_units.length; x++)
        all_units[local_army_units[x]] = (all_units[local_army_units[x]]) ?
          all_units[local_army_units[x]] + returnSafeNumber(local_army.units[local_army_units[x]]) :
          returnSafeNumber(local_army.units[local_army_units[x]]);
    }

    //Add reserves to total
    var all_reserves = Object.keys(usr.reserves);

    for (var i = 0; i < all_reserves.length; i++)
      all_units[all_reserves[i]] = (all_units[all_reserves[i]]) ?
        all_units[all_reserves[i]] + returnSafeNumber(usr.reserves[all_reserves[i]]) :
        returnSafeNumber(usr.reserves[all_reserves[i]]);

    //Filter out all null and 0 values
    var all_current_units = Object.keys(all_units);

    for (var i = 0; i < all_current_units.length; i++) {
      var local_value = all_units[all_current_units[i]];

      if (returnSafeNumber(local_value) == 0)
        delete all_units[all_current_units[i]];
    }

    //Return statement
    return all_units;
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
          var army_obj_stats = module.exports.calculateArmyType(actual_id, army_obj);
          var merged_army_obj_stats = module.exports.calculateArmyType(actual_id, merged_army_obj);

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
    var army_name = arg1_army_name;
    var province_id = arg2_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(actual_id, army_name.trim().toLowerCase()) :
      army_name;
    var usr = main.users[actual_id];

    //Try moving the army if possible
    if (usr)
      if (army_obj)
        if (!["empty", "navy"].includes(army_obj.type))
          if (main.provinces[province_id])
            if (province_id != army_obj.province) {
              //Check if target province is valid
              var local_province = main.provinces[province_id];
              var valid_province = true;

              if (local_province.demilitarised)
                valid_province = (atWar(actual_id));

              if (valid_province) {
                var moving_to_array = smartMove(actual_id, army_obj.name, army_obj.province, province_id);
                var distances_array = getProvinceDistances(moving_to_array);

                if (moving_to_array) {
                  army_obj.distances = distances_array;
                  army_obj.moving_to = moving_to_array;
                  army_obj.status = "moving";

                  var time_to_arrival = module.exports.getArrivalTime(user_id, army_obj);

                  return [true, `The **${army_obj.name}** is now en route to Province **${province_id}**. It will arrive in approximately **${parseNumber(time_to_arrival)}** turn(s).`];
                }
              }
            } else {
              army_obj.distances = [];
              army_obj.moving_to = [];
              army_obj.status = "stationed";

              return [true, `You have ordered the **${army_obj.name}** to remain still.`];
            }
  },

  parseArmies: function (arg0_string) {
    //Convert from parameters
		var ordinal_string = arg0_string;

		//Declare instance array and reference variables
		var numbers = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "I", "V", "X", "L", "C", "D", "M", "i", "v", "x", "l", "c", "m"],
			arabic_numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
			ordinals = ["st", "nd", "rd", "th"],
			roman_numerals = ["I", "V", "X", "L", "C", "D", "M", "i", "v", "x", "l", "c", "m"],
			midpoint_signifier = [".", " "];
		var ordinal_array = [];
		var global_suffix = "",
			irregular_structure = false;

		//Split up string into multiple ordinal arguments if commas are included
		ordinal_string = (ordinal_string.includes(",")) ? ordinal_string.split(",") : [ordinal_string];

		//Check for irregular structure (e.g. '23rd-24th, 86th, 88th Field Artillery')
		var single_field_count = 0;
		for (var i = 0; i < ordinal_string.length; i++) {
			if (ordinal_string[i].split(" ").length == 1) {
				single_field_count++;
			}
			//Check for ending index, if multiple args are detected, then set irregular_structure to true
			if (ordinal_string[i].split(" ").length > 1 && i == ordinal_string.length-1) {
				irregular_structure = true;
			}
		}

		if (irregular_structure) {
			var current_string = ordinal_string[ordinal_string.length-1].trim().split(" ").join(" ");
			var global_suffix_index = (current_string.indexOf("-") != -1) ? current_string.indexOf("-") : 0,
				numbers_stopped = false;

			//Expand global_suffix
			for (var i = global_suffix_index; i < current_string.length; i++) {
				if (!numbers.includes(current_string[i]) && current_string[i] != "-") {
					numbers_stopped = true;
				}
				if (numbers_stopped) {
					if (current_string[i]) {
						global_suffix += current_string[i];
					}
				}
			}
		}

		//Iterate through all arguments, taking the index of the dash in between and expanding left right (if dash is present)
		for (var i = 0; i < ordinal_string.length; i++) {
			//Error trapping for local argument just in case of invalid inputs
			try {
				ordinal_string[i] = ordinal_string[i].trim();
				ordinal_string[i] = ordinal_string[i].replace(/  /gm, "");
				ordinal_string[i] = ordinal_string[i].replace(" - ", "-");
				//Declare local variables for local argument
				var contains_ordinals = false, //Does this argument contain ordinals such as st, nd, and th? If so, these will be dynamically generated
					pure_numbers = true,
					left_number_indices = [],
					left_numbers = "",
					leftside_prefix = "",
					leftside_suffix = "",
					right_number_indices = [],
					right_numbers = "",
					rightside_prefix = "",
					rightside_suffix = "";

				var dash_index = ordinal_string[i].indexOf("-"),
					dash_indices = indexesOf("-", ordinal_string[i]),
					leftside_index,
					rightside_index;

				//Make it work with negative numbers!
				if (dash_indices.length > 1) {
					dash_index = dash_indices[1];
				}

				if (dash_index != -1) {
					//Left-side traversal and expansion
					var started_leftside_traversal = false,
						stop_leftside_traversal = false,
						stop_leftside_expansion = false;

					for (var x = dash_index; x >= 0; x--) {
						if (!stop_leftside_traversal) {
							if (numbers.includes(ordinal_string[i][x]) && x != dash_index) {
								started_leftside_traversal = (!started_leftside_traversal) ? true : started_leftside_traversal;
								leftside_index = x;
							} else {
								stop_leftside_traversal = (started_leftside_traversal) ? true : stop_leftside_traversal;
							}
						}
					}

					//Check for all left-side arabic/roman numeral arguments
					var sub_arguments = ordinal_string[i].split(" ");

					//Initialise local variables
					for (var x = 0; x < sub_arguments.length; x++) {
						for (var y = 0; y < ordinals.length; y++) {
							if (sub_arguments[x].includes(ordinals[y]) && sub_arguments[x].includes("-")) {
								contains_ordinals = true;
							}
						}
					}

					for (var x = 0; x < sub_arguments.length; x++) {
						try {
							var fulfills_conditions = false;

							if (sub_arguments[x].length > 2) {
								if ((roman_numerals.includes(sub_arguments[x][0]) && roman_numerals.includes(sub_arguments[x][1])) || (arabic_numerals.includes(sub_arguments[x][0]) && arabic_numerals.includes(sub_arguments[x][1]))) {
									fulfills_conditions = true;
								}
							} else {
								if ((roman_numerals.includes(sub_arguments[x][0]) || arabic_numerals.includes(sub_arguments[x][0])) || roman_numerals.includes(sub_arguments[x][1]) || arabic_numerals.includes(sub_arguments[x][1])) {
									fulfills_conditions = true;
								}
							}
						} catch {}
					}

					//Left-side expansion
					for (var x = leftside_index; x <= dash_index; x++) {
						if (!stop_leftside_expansion) {
							if (numbers.includes(ordinal_string[i][x]) && x != dash_index) {
								left_numbers += ordinal_string[i][x];
								left_number_indices.push(x);
							} else {
								stop_leftside_expansion = true;
							}
						}
					}

					//Begin right-side traversal
					var started_rightside_traversal = false,
						stop_rightside_traversal = false;

					//Check for all right-side arabic/roman numeral arguments, only do this if a number is not detected immediately after the dash, however
					rightside_index = dash_index;
					var numeric_post_dash_argument = false,
						post_dash_numbers = 0,
						post_dash_total = 0;

					for (var x = 0; x < sub_arguments.length; x++) {
						var local_dash_index = sub_arguments[x].indexOf("-");
						if (local_dash_index != -1) {
							//Check to see whether dash is actually valid, or just another negative number
							var valid_dash = false;
							var local_dash_indices = [];
							var total_count = 0;

							for (var y = 0; y < sub_arguments[x].length; y++) {
								if (sub_arguments[x][y] == "-") {
									total_count++;
									local_dash_indices.push(y);
								}
							}

							valid_dash = (total_count == 1) ? true : false;
							if (total_count > 1) local_dash_index = local_dash_indices[1];

							if (valid_dash) {
								for (var y = local_dash_index+1; y < sub_arguments[x].length; y++) {
									post_dash_numbers = (numbers.includes(sub_arguments[x][y])) ? post_dash_numbers + 1 : post_dash_numbers;
									post_dash_total++;
								}
								for (var y = 0; y < sub_arguments[x].length; y++) {
									if (!numbers.includes(sub_arguments[x][y]) && !contains_ordinals && sub_arguments[x][y] != "-") {
										pure_numbers = false;
									}
								}
							}
							if (!stop_rightside_traversal) {
								for (var y = local_dash_index+1; y < sub_arguments[x].length; y++) {
									if (numbers.includes(sub_arguments[x][y]) && y != local_dash_index) {
										var local_index_position = 0;
										started_rightside_traversal = (!started_rightside_traversal) ? true : started_rightside_traversal;
										right_numbers += sub_arguments[x][y];
										for (var z = 0; z < sub_arguments.length; z++) local_index_position += sub_arguments[z].length;

										right_number_indices.push(local_index_position + y);
									} else {
										stop_rightside_traversal = (started_rightside_traversal) ? true : stop_rightside_traversal;
									}
								}
							}
						}
					}
					numeric_post_dash_argument = ((post_dash_numbers/post_dash_total) < 0.5) ? false : true;

					if (!numeric_post_dash_argument) {
						for (var x = sub_arguments.length; x >= 0; x--) {
							try {
								var fulfills_conditions = false;

								//Check if local split string appears to consist mostly of numerals, of whatever type
								if (sub_arguments[x].length > 2) {
									if ((roman_numerals.includes(sub_arguments[x][0]) && roman_numerals.includes(sub_arguments[x][1])) || (arabic_numerals.includes(sub_arguments[x][0]) && arabic_numerals.includes(sub_arguments[x][1]))) {
										fulfills_conditions = true;
									}
								} else {
									if ((roman_numerals.includes(sub_arguments[x][0]) || arabic_numerals.includes(sub_arguments[x][0])) || roman_numerals.includes(sub_arguments[x][1]) || arabic_numerals.includes(sub_arguments[x][1])) {
										fulfills_conditions = true;
									}
								}

								if (fulfills_conditions) {
									var total_index = 0;
									for (var y = 0; y < x; y++) {
										total_index += sub_arguments[y].length;
									}
									rightside_index = Math.max(total_index, rightside_index);
								}
							} catch {}
						}
					}

					//Fetch leftside_prefix and leftside_suffix
					//leftside_prefix first
					if (left_number_indices[0] != 0) {
						for (var x = 0; x < left_number_indices[0]; x++) {
							leftside_prefix += ordinal_string[i][x];
						}
					}
					//leftside_suffix next
					if (left_number_indices[left_number_indices.length-1] != dash_index-1) {
						for (var x = left_number_indices[left_number_indices.length-1]+1; x < dash_index; x++) {
							if (ordinal_string[i][x]) {
								leftside_suffix += ordinal_string[i][x];
							}
						}
					}

					//Fetch rightside_prefix and rightside_suffix
					//rightside_prefix first
					var rightside_expansion_ran_into_number = false;
					var local_rightside_string = "";
					for (var x = dash_index+1; x < right_number_indices[0]; x++) if (ordinal_string[i][x]) local_rightside_string += ordinal_string[i][x];
					local_rightside_string = local_rightside_string.split(" "); //Remove 1st term
					local_rightside_string[0] = "";
					local_rightside_string = local_rightside_string.join(" ").trim();

					//rightside_suffix next
					rightside_suffix = local_rightside_string;

					//Make sure that both left_numbers and right_numbers cannot contain both arabic and roman numerals
					var leftside_has_roman = false,
						rightside_has_roman = false;

					for (var x = 0; x < left_numbers.length; x++) {
						leftside_has_roman = (roman_numerals.includes(left_numbers[x])) ? true : leftside_has_roman;
					}
					for (var x = 0; x < right_numbers.length; x++) {
						rightside_has_roman = (roman_numerals.includes(right_numbers[x])) ? true : rightside_has_roman;
					}

					//Purge all arabic numerals from left_numbers and right_numbers independently if detected as a roman argument - no arabic numerals are included
					if (leftside_has_roman && !left_numbers.match(/[0-9]/gm)) {
						left_numbers = left_numbers.split("");
						if (!left_numbers.join("").match(/[0-9]/gm)) {
							for (var x = 0; x < left_numbers.length; x++) {
								if (!roman_numerals.includes(left_numbers[x])) {
									left_numbers.splice(x, 1);
								}
							}
						} else {
							for (var x = 0; x < left_numbers.length; x++) {
								if (!arabic_numerals.includes(left_numbers[x])) {
									left_numbers.splice(x, 1);
								}
							}
							leftside_has_roman = false;
						}
						left_numbers = left_numbers.join("");
					}
					if (rightside_has_roman) {
						right_numbers = right_numbers.split("");
						if (!right_numbers.join("").match(/[0-9]/gm)) {
							for (var x = 0; x < right_numbers.length; x++) {
								if (!roman_numerals.includes(right_numbers[x])) {
									right_numbers.splice(x, 1);
								}
							}
						} else {
							for (var x = 0; x < right_numbers.length; x++) {
								if (!arabic_numerals.includes(right_numbers[x])) {
									right_numbers.splice(x, 1);
								}
							}
							rightside_has_roman = false;
						}
						right_numbers = right_numbers.join("");
					}

					//Deordinalise all pefixes and suffixes
					var new_left_numbers = [], new_right_numbers = [],
						left_uppercase = (left_numbers[0] == left_numbers[0].toUpperCase()),
						right_uppercase = (right_numbers[0] == right_numbers[0].toUpperCase());

					for (var x = 0; x < left_numbers.length; x++) if ((left_numbers[x] == left_numbers[x].toUpperCase()) == left_uppercase) new_left_numbers.push(left_numbers[x]);
					for (var x = 0; x < right_numbers.length; x++) if ((right_numbers[x] == right_numbers[x].toUpperCase()) == left_uppercase) new_right_numbers.push(right_numbers[x]);

					left_numbers = new_left_numbers.join("");
					right_numbers = new_right_numbers.join("");

					leftside_prefix = deordinalise(leftside_prefix);
					leftside_suffix = deordinalise(leftside_suffix);
					rightside_prefix = deordinalise(rightside_prefix);
					rightside_suffix = deordinalise(rightside_suffix);
					global_suffix = deordinalise(global_suffix);

					//Make sure they're compatible with each other, rightside always takes precedent
					leftside_prefix = (rightside_prefix.indexOf(leftside_prefix) != -1 && leftside_prefix.length > 0) ? rightside_prefix : leftside_prefix;
					leftside_suffix = (rightside_suffix.indexOf(leftside_suffix) != -1 && leftside_suffix.length > 0) ? rightside_suffix : leftside_suffix;

					//If rightside_prefix is nonexistent or less than leftside_prefix, assign leftside_prefix to it
					if (leftside_prefix.length > rightside_prefix.length) {
						if (leftside_prefix.indexOf(rightside_prefix) != -1) {
							rightside_prefix = leftside_prefix;
						}
					}

					//If leftside_suffix is nonexistent, assign rightside_suffix to it
					if (rightside_suffix.length > leftside_suffix.length) {
						if (rightside_suffix.indexOf(leftside_suffix) != -1) {
							leftside_suffix = rightside_suffix;
						} else if (leftside_suffix.length <= 2 || leftside_suffix[0].toUpperCase() != leftside_suffix[0]) {
							leftside_suffix = rightside_suffix;
						}
					}

					//Check for global_suffix
					if (sub_arguments.length == 1) {
						leftside_suffix = (global_suffix.length > 0) ? global_suffix : leftside_suffix;
						rightside_suffix = (global_suffix.length > 0) ? global_suffix : rightside_suffix;
					}

					var parse_type; //arabic, roman
					if (leftside_has_roman == rightside_has_roman) { //They're the same argument type
						parse_type = (!isNaN(parseInt(left_numbers))) ? ["arabic", "arabic"] : ["roman", "roman"];
					} else { //Different argument types, bruv
						parse_type = (leftside_has_roman) ? ["roman", "arabic"] : ["arabic", "roman"];
					}

					var number_break = (leftside_prefix.length == 0 && rightside_prefix.length > 0) ? " " : "";
						number_break = (pure_numbers) ? " " : number_break;

					//Do the same for leftside_prefix after assigning number_break
					leftside_prefix = (leftside_prefix.length == 0 && rightside_prefix.length > 0) ? rightside_prefix : leftside_prefix;

					var local_break = (global_suffix != "" && sub_arguments.length == 1) ? " " : "";

					if (parse_type.toString() == ["roman", "roman"]) {
						var beginning_argument = Math.min(arabicise(left_numbers), arabicise(right_numbers)),
							ending_argument = Math.max(arabicise(left_numbers), arabicise(right_numbers));

						for (var x = beginning_argument; x <= ending_argument; x++) {
							//Carry leftside format all the way up until the ending index
							var current_ordinal = (contains_ordinals) ? ordinalise(x).replace(x, "") + " " : "";
							if (x != ending_argument) {
								ordinal_array.push(processOrdinalString(`${leftside_prefix}${local_break} ${romanise(x)}${current_ordinal} ${leftside_suffix}`));
							} else {
								ordinal_array.push(processOrdinalString(`${rightside_prefix}${local_break} ${romanise(x)}${current_ordinal} ${rightside_suffix}`));
							}
						}
					} else if (parse_type.toString() == ["arabic", "arabic"]) {
						var beginning_argument = Math.min(parseInt(left_numbers), parseInt(right_numbers)),
							ending_argument = Math.max(parseInt(left_numbers), parseInt(right_numbers));

						for (var x = beginning_argument; x <= ending_argument; x++) {
							//Carry leftside format all the way up until the ending index
							var current_ordinal = (contains_ordinals) ? ordinalise(x).replace(x, "") + " " : "";
							if (x != ending_argument) {
								ordinal_array.push(processOrdinalString(`${leftside_prefix}${number_break}${x}${current_ordinal} ${leftside_suffix}`));
							} else {
								ordinal_array.push(processOrdinalString(`${rightside_prefix}${number_break}${x}${current_ordinal} ${rightside_suffix}`));
							}
						}
					} else if (parse_type.toString() == ["roman", "arabic"]) {
						var beginning_argument = Math.min(arabicise(left_numbers), parseInt(right_numbers)),
							ending_argument = Math.max(arabicise(left_numbers), parseInt(right_numbers));

						for (var x = beginning_argument; x <= ending_argument; x++) {
							//Carry leftside format all the way up until the ending index
							var current_ordinal = (contains_ordinals) ? ordinalise(x).replace(x, "") + " " : "";
							if (x != ending_argument) {
								ordinal_array.push(processOrdinalString(`${leftside_prefix}${local_break} ${romanise(x)}${current_ordinal} ${leftside_suffix}`));
							} else {
								ordinal_array.push(processOrdinalString(`${rightside_prefix}${number_break}${x}${current_ordinal} ${rightside_suffix}`));
							}
						}
					} else {
						var beginning_argument = Math.min(parseInt(left_numbers), arabicise(right_numbers)),
							ending_argument = Math.max(parseInt(left_numbers), arabicise(right_numbers));

						for (var x = beginning_argument; x <= ending_argument; x++) {
							//Carry leftside format all the way up until the ending index
							var current_ordinal = (contains_ordinals) ? ordinalise(x).replace(x, "") + " " : "";
							if (x != ending_argument) {
								ordinal_array.push(processOrdinalString(`${leftside_prefix}${number_break}${x}${current_ordinal} ${leftside_suffix}`));
							} else {
								ordinal_array.push(processOrdinalString(`${rightside_prefix}${local_break} ${romanise(x)}${current_ordinal} ${rightside_suffix}`));
							}
						}
					}
				} else {
					//Only a single army is being added here, just push it to ordinal_array
					var global_suffix_display = (ordinal_string[i].trim().split(" ").length == 1) ? deordinalise(global_suffix) : "";

					//If all arguments are of the same length, no global_suffix_display is present, and neither is a local break
					var lengths_are_same = true;
					for (var x = 0; x < ordinal_string.length; x++) {
						lengths_are_same = (ordinal_string[x].trim().split(" ").length != ordinal_string[0].trim().split(" ").length) ? false : lengths_are_same;
					}
					global_suffix_display = (lengths_are_same) ? "" : global_suffix_display;

					var local_break = (global_suffix != "") ? " " : "";
					ordinal_array.push(processOrdinalString(ordinal_string[i].trim() + local_break + global_suffix_display));
				}
			} catch (e) {
				console.log(e);
			}
		}

		//Remove all empty elements
		for (var i = 0; i < ordinal_array.length; i++) {
			if (ordinal_array[i] == "") {
				ordinal_array.splice(i, 1);
			}
		}

		//Return statement
		return ordinal_array;
  },

  processArmyMaintenance: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var deficit_goods = {};
    var maintenance_obj = module.exports.getArmyMaintenance(user_id);
    var units_obj = module.exports.getUnits(user_id);
    var usr = main.users[actual_id];

    var all_units = Object.keys(units_obj);

    //Subtract maintenance_obj from usr.inventory, check for any percent deficits (these get carried over into a weighted calculation for unit undersupply)
    var all_maintenance_costs = Object.keys(maintenance_obj);

    for (var i = 0; i < all_maintenance_costs.length; i++) {
      var local_amount = maintenance_obj[all_maintenance_costs[i]];

      if (all_maintenance_costs[i] != "money") {
        if (usr.inventory[all_maintenance_costs[i]] <= 0)
          deficit_goods[all_maintenance_costs[i]] = 1; //100% shortage of good
      } else {
        if (usr[all_maintenance_costs[i]] <= 0)
          deficit_goods[all_maintenance_costs[i]] = 1; //100% shortage of money
      }
    }

    //Iterate over all units, check for supply and adjust modifiers
    for (var i = 0; i < all_units.length; i++) {
      var unit_obj = lookup.all_units[all_units[i]];
      var percent_money_undersupplied = 0;
      var percent_undersupplied = 0;

      if (unit_obj.maintenance) {
        var fiscal_maintenance = 0;
        var local_amount = returnSafeNumber(units_obj[all_units[i]]);
        var local_maintenance_costs = Object.keys(unit_obj.maintenance);
        var total_goods = 0;

        //1st loop - Get total_goods and fiscal maintenance
        for (var x = 0; x < local_maintenance_costs.length; x++) {
          var local_maintenance_cost = unit_obj.maintenance[local_maintenance_costs[x]];

          if (local_maintenance_costs[x] != "money") {
            total_goods += local_maintenance_cost;
          } else {
            fiscal_maintenance += local_maintenance_cost;
          }
        }

        //2nd loop - Calculate proportional supply deficits
        for (var x = 0; x < local_maintenance_costs.length; x++) {
          var local_maintenance_cost = unit_obj.maintenance[local_maintenance_costs[x]];

          if (local_maintenance_costs[x] == "money") {
            percent_money_undersupplied += returnSafeNumber(deficit_goods.money);
          } else {
            percent_undersupplied += returnSafeNumber(
              returnSafeNumber(local_maintenance_cost/total_goods)*
                returnSafeNumber(deficit_goods[local_maintenance_costs[x]])
            );
          }
        }

        //Finalise percent_undersupplied
        percent_undersupplied = (percent_money_undersupplied*config.defines.combat.fiscal_supply_amount) + (percent_undersupplied*(1 - config.defines.combat.fiscal_supply_amount));

        //Set usr.modifiers.unit_supply.<unit_type>
        usr.modifiers.unit_supply[all_units[i]] = (1 - percent_undersupplied);
      }
    }
  },

  relieveUnits: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = parseInt(arg1_amount);
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(actual_id, army_name.trim().toLowerCase()) :
      army_name;
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

          if (army_obj.units[raw_unit_name] <= 0)
            delete army_obj.units[raw_unit_name];

          //Recalculate army type
          module.exports.calculateArmyType(actual_id, army_obj);

          //Print out return statement
          return [true, `You placed **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from the **${army_obj.name}** back into reserve.`];
        }
  },

  /*
    reorderUnits() - Reorders a stack of units in an army
    options: {
      direction: "up"/"down", - Whether units are reordered up or down
      amount: 3 - How many positions to try and reorganise units by
    }
  */
  reorderUnits: function (arg0_user, arg1_army_name, arg2_unit_name, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;
    var unit_name = arg2_unit_name;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ?
      module.exports.getArmy(actual_id, army_name.trim().toLowerCase()) :
      army_name;
    var unit_obj = (typeof unit_name != "object") ?
      getUnit(unit_name.trim().toLowerCase()) :
      unit_name;
    var usr = main.users[actual_id];

    var actual_unit_name = getUnit(unit_obj.name, { return_key: true });

    //Find the army if possible and duplicate an object
    if (usr)
      if (army_obj) {
        if (unit_obj) {
          if (returnSafeNumber(army_obj.units[actual_unit_name])) {
            //Duplicate army units object
            var current_units = Object.keys(army_obj.units);

            var current_index = current_units.indexOf(actual_unit_name);
            var new_units = {};

            //Move element in current_units; up is towards index 0, down is towards last index
            var new_index = (options.direction == "up") ?
              Math.max(current_index - options.amount, 0) :
              Math.min(current_index + options.amount, current_units.length - 1);

            current_units = moveElement(current_units, current_index, new_index);

            log.info(`reorderUnits() - New unit array: ${current_units.join(", ")}`);

            //Begin parsing units
            for (var i = 0; i < current_units.length; i++)
              new_units[current_units[i]] = army_obj.units[current_units[i]];

            //Set units
            army_obj.units = new_units;

            return [true, `**${parseNumber(army_obj.units[actual_unit_name])}** ${unit_obj.name} were moved to the **${ordinalise(new_index + 1)}** combat row of the **${army_obj.name}**.`];
          } else {
            return [false, `The **${army_obj.name}** has no **${unit_obj.name}** in it.`];
          }
        } else {
          return [false, `**${unit_name}** is not a valid type of unit!`];
        }
      } else {
        return [false, `The **${army_name}** could not be found as a combat force.`];
      }
  }
};
