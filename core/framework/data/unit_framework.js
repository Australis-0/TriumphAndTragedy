module.exports = {
  generateColonisationID: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!usr.expeditions[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    getAllUnits() - Fetches an object/key list of all units.
    options: {
      return_names: true/false - Whether or not to return the keys instead.
    }
  */
  getAllUnits: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var all_units = [];

    //Iterate over all_unit_categories and push their respective objects into array
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        if (!["icon", "name", "order", "type"].includes(local_units[x]))
          all_units.push(
            (!options.return_names) ?
              local_unit_category[local_units[x]] :
              local_units[x]
          );
    }

    //Return statement
    return all_units;
  },

  /*
    getUnit() - Returns the true object/key of a unit.
    options: {
      return_key: true/false - Whether or not to return the key of the unit instead.
    }
  */
  getUnit: function (arg0_name, arg1_options) {
    //Convert from parameters
    var unit_name = arg0_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var unit_exists = [false, ""];

    //Unit key, soft search
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        if (!["icon", "name", "order", "type"].includes(local_units[x]))
          if (local_units[x].toLowerCase().indexOf(unit_name) != -1)
            unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
    }

    //Unit key, hard search
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        if (!["icon", "name", "order", "type"].includes(local_units[x]))
          if (local_units[x].toLowerCase() == unit_name)
            unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
    }

    if (!unit_exists[0]) {
      //Unit name, soft search
      for (var i = 0; i < all_unit_categories.length; i++) {
        var local_unit_category = config.units[all_unit_categories[i]];
        var local_units = Object.keys(local_unit_category);

        for (var x = 0; x < local_units.length; x++)
          if (!["icon", "name", "order", "type"].includes(local_units[x]))
            if (local_unit_category[local_units[x]].name.toLowerCase().indexOf(unit_name) != -1)
              unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
      }

      //Unit name, hard search
      for (var i = 0; i < all_unit_categories.length; i++) {
        var local_unit_category = config.units[all_unit_categories[i]];
        var local_units = Object.keys(local_unit_category);

        for (var x = 0; x < local_units.length; x++)
          if (!["icon", "name", "order", "type"].includes(local_units[x]))
            if (local_unit_category[local_units[x]].name.toLowerCase() == unit_name)
              unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
      }
    }

    //Return statement
    return (unit_exists[0]) ? unit_exists[1] : undefined;
  },

  //Returns all unit categories based on order (if it exists)
  getUnitCategories: function () {
    //Declare local instance variables
    var all_unit_categories = Object.keys(config.buildings);
    var unit_categories = [];
    var no_order_cache = [];

    //Iterate over all unit categories
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];

      //Push to either no_order_cache or unit_categories
      if (local_unit_category.order) {
        if (!unit_categories[local_unit_category.order-1]) {
          unit_categories[local_unit_category.order-1] = all_unit_categories[i];
        } else {
          log.error(`${all_unit_categories[i]} has an invalid order number! .order ${local_unit_category.order-1} is already occupied by ${unit_categories[local_unit_category.order-1]}!\n\nCheck common/units for more information on resolving this error.`);
        }
      } else {
        no_order_cache.push(all_unit_categories[i]);
      }
    }

    //Push no_order_cache onto the end
    for (var i = 0; i < no_order_cache.length; i++)
      unit_categories.push(no_order_cache[i]);

    //Return statement
    return unit_categories;
  },

  /*
    getUnitCategory() - Returns back a unit_category object/key based on options
    options: {
      return_key: true/false - Whether or not to return back the unit category key instead of object. False by default
    }
  */
  getUnitCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var unit_category_name = arg0_name.trim().toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var all_processed_unit_categories = [];
    var unit_category_exists = [false, ""]; //[unit_category_exists, unit_category_obj];

    //Initialise all_processed_unit_categories
    for (var i = 0; i < all_unit_categories.length; i++)
      (!config.units[all_unit_categories[i]].name) ?
        all_processed_unit_categories.push(parseString(all_unit_categories[i])) :
        all_processed_unit_categories.push(config.units[all_unit_categories[i]].name);

    //Fetch config object
    if (config.units[unit_category_name]) {
      return (options.return_key) ? config.units[unit_category_name] : unit_category_name;
    } else {
      //If the unit category cannot be found verbatim, start a soft-hard search by parsed strings
      //Soft match first
      for (var i = 0; i < all_processed_unit_categories.length; i++)
        if (all_processed_unit_categories[i].toLowerCase().indexOf(unit_category_name) != -1)
          unit_category_exists = [true, (!options.return_key) ? config.units[all_unit_categories[i]] : all_unit_categories[i]];

      //Hard match second
      for (var i = 0; i < all_processed_unit_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase() == unit_category_name)
          unit_category_exists = [true, (!options.return_key) ? config.units[all_unit_categories[i]] : all_unit_categories[i]];

      //Return statement after soft-hard search
      return (unit_category_name[0]) ? unit_category_name[1] : undefined;
    }
  },

  /*
    getUnitCategoryFromUnit() - Returns back the unit_category object/key based on the specified unit name. Only supports raw unit names
    options: {
      return_key: true/false - Whether or not to return back the unit category key instead of object. False by default
    }
  */
  getUnitCategoryFromUnit: function (arg0_name, arg1_options) {
    //Convert from parameters
    var unit_name = arg0_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var unit_category_exists = [false, ""]; //[unit_category_exists, category_name]

    for (var i = 0; i < all_unit_categories.length; i++)
      if (Object.keys(config.units[all_unit_categories[i]]).includes(unit_name))
        unit_category_exists = [true, (!options.return_key) ? config.units[all_unit_categories[i]] : all_unit_categories[i]];

    //Return statement
    return (unit_category_exists[0]) ? unit_category_exists[1] : undefined;
  },

  /*
    getUnitCost() - Returns the cost of a unit for the specified user as a JSON object/integer.
    options: {
      type: "all", "money", "goods", "pops" - Returns either all cost arguments, only money (as an integer), goods, or pop costs only.
      amount: - The number of units to check for.
    }
  */
  getUnitCost: function (arg0_user, arg1_unit, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var unit_name = arg1_unit;

    //Initialise options
    var options = (arg2_options) ? arg2_options : {};
      if (!options.type) options.type = "all";
      if (!options.amount) options.amount = 1;

    //Declare local instance variables
    var costs_obj = {};
    var unit_obj = module.exports.getUnit(unit_name);
    var usr = main.users[user_id];

    //Only start appending if the .costs object exists at all
    if (unit_obj.costs) {
      var all_costs = Object.keys(unit_obj.costs);

      for (var i = 0; i < all_costs.length; i++) {
        //Check to make sure that this is an actual resource and not just a pop value
        var unit_cost_modifier = (!Object.keys(config.pops).includes(all_costs[i])) ?
            (!getGood(all_costs[i]).is_cp) ?
              returnSafeNumber(usr.modifiers.unit_cost, 1) :
              returnSafeNumber(usr.modifiers.training_cost, 1)
            :
          1;
        var current_resource_demand = unit_obj.costs[all_costs[i]]*unit_cost_modifier*options.amount;

        //Fetch resource_type
        var resource_type = {
          is_money: (all_costs[i] == "money"),
          is_resource: getGoods({ return_names: true }).includes(all_costs[i])
        };
        var valid_resource = false;

        if (resource_type.is_money) {
          if (["all", "money"].includes(options.type))
            valid_resource = true;
        } else if (resource_type.is_resource) {
          if (["all", "goods"].includes(options.type))
            valid_resource = true;
        } else {
          if (["all"].includes(options.type))
            valid_resource = true;
        }

        //Add valid resource to object
        if (valid_resource)
          costs_obj[all_costs[i]] = (!costs_obj[all_costs[i]]) ?
            current_resource_demand :
            costs_obj[all_costs[i]] + current_resource_demand;
      }
    }

    //Begin appending pops if options.type is either "all" or "pops"
    if (building_obj.manpower_cost && ["all", "pops"].includes(options.type)) {
      var all_manpower_costs = Object.keys(unit_cost.manpower_cost);

      for (var i = 0; i < all_manpower_costs.length; i++) {
        var current_resource_demand = unit_obj.costs[all_manpower_costs[i]]*options.amount;

        costs_obj[all_costs[i]] = (!costs_obj[all_costs[i]]) ?
          current_resource_demand :
          costs_obj[all_costs[i]] + current_resource_demand;
      }
    }

    //Return object
    return (options.type != "money") ? costs_obj : returnSafeNumber(costs_obj.money, 0);
  }
};