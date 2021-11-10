module.exports = {
  /*
    getBuilding() - Returns back a building object/key based on options
    options: {
      return_key: true/false
    }
  */
  getBuilding: function (arg0_name, arg1_options) {
    //Convert from parameters
    var building_name = arg0_name.toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var building_exists = [false, ""];

    //Iterate over all building categories and their respective buildings - debug key
    for (var i = 0; i < all_building_categories.length; i++) {
      var local_building_category = config.buildings[all_building_categories[i]];

      if (local_building_category[building_name])
        building_exists = [true, (!options.return_key) ? local_building_category[building_name] : building_name];
    }

    //If the building cannot be found verbatim, start a soft-hard search by parsed strings; aliases
    if (!building_exists[0]) {
      //Soft match first
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = config.buildings[all_building_categories[i]];
        var local_buildings = Object.keys(local_building_category);

        for (var x = 0; x < local_buildings.length; x++) {
          if (!["icon", "name", "order"].includes(local_buildings[x])) {
            var local_building = local_building_category[local_buildings[x]];

            if (local_building.name)
              if (local_building.name.toLowerCase().indexOf(building_name) != -1)
                building_exists = [true, (!options.return_key) ? local_building : local_buildings[x]];
          }
        }
      }

      //Hard match second
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = config.buildings[all_building_categories[i]];
        var local_buildings = Object.keys(local_building_category);

        for (var x = 0; x < local_buildings.length; x++) {
          if (!["icon", "name", "order"].includes(local_buildings[x])) {
            var local_building = local_building_category[local_buildings[x]];

            if (local_building.name)
              if (local_building.name.toLowerCase() == building_name)
                building_exists = [true, (!options.return_key) ? local_building : local_buildings[x]];
          }
        }
      }
    }

    //If building still cannot be found by names alone, search by alias
    if (!building_exists[0]) {
      //Soft match first
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = config.buildings[all_building_categories[i]];
        var local_buildings = Object.keys(local_building_category);

        for (var x = 0; x < local_buildings.length; x++) {
          if (!["icon", "name", "order"].includes(local_buildings[x])) {
            var local_building = local_building_category[local_buildings[x]];

            if (local_building.aliases)
              for (var y = 0; y < local_building.aliases.length; y++)
                if (local_building.aliases[y].toLowerCase().indexOf(building_name) != -1)
                  building_exists = [true, (!options.return_key) ? local_building : local_buildings[x]];
          }
        }
      }

      //Hard match second
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = config.buildings[all_building_categories[i]];
        var local_buildings = Object.keys(local_building_category);

        for (var x = 0; x < local_buildings.length; x++) {
          if (!["icon", "name", "order"].includes(local_buildings[x])) {
            var local_building = local_building_category[local_buildings[x]];

            if (local_building.aliases)
              for (var y = 0; y < local_building.aliases.length; y++)
                if (local_building.aliases[y].toLowerCase() == building_name)
                  building_exists = [true, (!options.return_key) ? local_building : local_buildings[x]];
          }
        }
      }
    }

    //Return statement
    return (building_exists[0]) ? building_exists[1] : undefined;
  },

  //Returns all building categories based on order (if it exists)
  getBuildingCategories: function () {
    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var building_categories = [];
    var no_order_cache = [];

    //Iterate over all building categories
    for (var i = 0; i < all_building_categories.length; i++) {
      var local_building_category = config.buildings[all_building_categories[i]];

      //Push to either no_order_cache or building_categories
      if (local_building_category.order) {
        if (!building_categories[local_building_category.order-1]) {
          building_categories[local_building_category.order-1] = all_building_categories[i];
        } else {
          log.error(`${local_building_category[i]} has an invalid order number! .order: ${local_building_category.order-1} is already occupied by ${building_categories[local_building_category.order-1]}!\n\nCheck common/buildings for more information on resolving this error.`);
        }
      } else {
        no_order_cache.push(all_building_categories[i]);
      }
    }

    //Push no_order_cache onto the end
    for (var i = 0; i < no_order_cache.length; i++)
      building_categories.push(no_order_cache[i]);

    //Return statement
    return building_categories;
  },

  /*
    getBuildingCategory() - Returns back a building_category object/key based on options
    options: {
      return_key: true/false - Whether or not to return back the building category key instead of object. False by default
    }
  */
  getBuildingCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var building_category_name = arg0_name.toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var all_processed_building_categories = [];
    var building_category_exists = [false, ""]; //[building_category_exists, building_category_obj];

    //Initialise all_processed_building_categories
    for (var i = 0; i < all_building_categories.length; i++)
      all_processed_building_categories.push(parseString(all_building_categories[i]));

    //Fetch config object
    if (config.buildings[building_category_name]) {
      return (options.return_key) ? config.buildings[building_category_name] : building_category_name;
    } else {
      //If the building category cannot be found verbatim, start a soft-hard search by parsed strings
      //Soft match first
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase().indexOf(building_category_name) != -1)
          building_category_exists = [true, (options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Hard match second
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase() == building_category_name)
          building_category_name = [true, (options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Return statement after soft-hard search
      return (building_category_name[0]) ? building_category_name[1] : undefined;
    }
  },

  getBuildingConsumption: function (arg0_user, arg1_building) { //[WIP]

  },

  /*
    getBuildingCost() - Returns the cost of a building for the specified user as a JSON object/integer.
    options: {
      type: "all", "money", "goods", "pops" - Returns either all cost arguments, only money (as an integer), goods, or pop costs only

    }
  */
  getBuildingCost: function (arg0_user, arg1_building, arg2_options) { //[WIP] - Add functionality to pop argument
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building;

    //Initialise options
    var options = (arg2_options) ? arg2_options : {};
    if (!options.type) options.type = "all";

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var costs_obj = {};
    var usr = main.users[user_id];

    //Only start appending if the .costs object exists at all
    if (building_obj.costs) {
      var all_costs = Object.keys(building_obj.costs);

      for (var i = 0; i < all_costs.length; i++) {
        //Check to make sure that this is an actual resource, and not just a pop value
        var building_cost_modifier = (!Object.keys(config.pops).includes(all_costs[i])) ? returnSafeNumber(usr.modifiers.building_cost, 1) : 1;
        var current_resource_demand = building_obj.costs[all_costs[i]]*building_cost_modifier*amount;

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

    //Return object
    return (options.type != "money") ? costs_obj : returnSafeNumber(costs_obj.money, 0);
  },

  //This method only gets building production, not maintenance. See getBuildingConsumption() for maintenance costs instead.
  getBuildingProduction: function (arg0_user, arg1_building, arg2_city_name) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building;
    var city_name = arg2_city_name;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var city_obj = getCity(city_nme, { users: user_id });
    var production_obj = {};
    var usr = main.users[user_id];

    //Declare changeProductionValue() local function for altering production_obj keys
    function changeProductionValue (arg0_key, arg1_min_max_argument, arg2_value) {
      //Convert from parameters
      var local_key = arg0_key;
      var min_max_argument = arg1_min_max_argument;
      var local_value = Math.ceil(returnSafeNumber(arg2_value));

      //Add to production_obj
      if (production_obj[local_key]) {
        switch (min_max_argument) {
          case "minimum":
            production_obj[local_key][0] += local_value;

            break;
          case "maximum":
            production_obj[local_key][1] += local_value;

            break;
          default:
            production_obj[local_key][0] += local_value;
            production_obj[local_key][1] += local_value;

            break;
        }
      } else {
        switch (min_max_argument) {
          case "minimum":
            production_obj[local_key] = [local_value, 0];

            break;
          case "maximum":
            production_obj[local_key] = [0, local_value];

            break;
          default:
            production_obj[local_key] = [local_value, local_value];

            break;
        }
      }
    }

    //Only start appending if the user and building_obj.produces is actually defined
    if (usr)
      try {
        var all_produced_goods = Object.keys(building_obj.produces);
        for (var i = 0; i < all_produced_goods.length; i++) {
          var actual_resource = getGood(all_produced_goods[i]);
          var is_knowledge = false;

          if (actual_resource)
            is_knowledge = (actual_resource.research_good);

          //Get actual production efficiency
          var actual_production_efficiency = (building_obj.maintenance) ?
            usr.modifiers.production_efficiency : 1;
          var actual_rgo_throughput = (usr.modifiers.rgo_throughput < 1) ?
            usr.modifiers.rgo_throughput : 1;

          //Apply local RGO throughput to the building's production if the resource lines up
          actual_rgo_throughput = (city_obj.resource == building_obj.produces[i][1]) ?
            getCityRGOThroughput(city_obj.name) : actual_rgo_throughput;

          //This is the only actual modifier that affects the production value of this good for this building
          {
            actual_production_efficiency = (building_obj.maintenance) ?
              actual_production_efficiency :
              actual_rgo_throughput;

            //research_efficiency modifier is used if good is of type knowledge
            if (is_knowledge)
              actual_production_efficiency = usr.modifiers.research_efficiency;
          }

          //Add production value of good to matrix
          var production_list = getList(building_obj.produces[all_produced_goods[i]]);

          if (production_list.length >= 2) {
            if (!actual_resource) {
              changeProductionValue(all_produced_goods[i], "minimum", production_list[0]*actual_production_efficiency);
              changeProductionValue(all_produced_goods[i], "maximum", production_list[0]*actual_production_efficiency);
            } else {
              if (!is_knowledge) {
                changeProductionValue(all_produced_goods[i], "minimum", production_list[0]*usr.modifiers[`${all_produced_goods[i]}_gain`]*actual_production_efficiency);
                changeProductionValue(all_produced_goods[i], "maximum", production_list[0]*usr.modifiers[`${all_produced_goods[i]}_gain`]*actual_production_efficiency);
              } else {
                changeProductionValue(all_produced_goods[i], "minimum", production_list[0]*actual_production_efficiency*usr.modifiers[`${all_produced_goods[i]}_gain`]);
                changeProductionValue(all_produced_goods[i], "maximum", production_list[0]*actual_production_efficiency*usr.modifiers[`${all_produced_goods[i]}_gain`]);
              }
            }
          } else {
            (!is_knowledge) ?
              changeProductionValue(all_produced_goods[i], "all", production_list[0]*actual_production_efficiency) :
              changeProductionValue(all_produced_goods[i], "all", production_list[0]);
          }
        }
      } catch {}

    //Return statement
    return production_obj;
  }
};
