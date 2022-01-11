module.exports = {
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
          moving_to: province_id,

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

      for (var i = 0; i < all_units.length; i++)
        usr.reserves[all_units[i]] = (usr.reserves[all_units[i]]) ?
          usr.reserves[all_units[i]] + army_obj.units[all_units[i]] :
          army_obj.units[all_units[i]];

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
    var unit_obj = getUnit(unit_name);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var return_statement = [false, ""]; //[successful_deployment, err_msg];
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

            return [true, `**${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} were ${(!options.spawn_units) ? "transferred to" : "deployed in"} the **${army_obj.name}**.`];

            //Recalculate army type
            module.exports.calculateArmyType(actual_id, army_obj.name);
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
