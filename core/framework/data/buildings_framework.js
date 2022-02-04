module.exports = {
  ignore_building_keys: [
    "always_display",
    "description",
    "disable_slots",
    "icon",
    "is_housing",
    "name",
    "order"
  ],

  constructBuilding: function (arg0_amount, arg1_building_name, arg2_province) {
    //Convert from parameters
    var amount = Math.ceil(parseInt(arg0_amount));
    var building_name = arg1_building_name.trim();
    var province_id = arg2_province;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var province_obj = main.provinces[province_id];
    var raw_building_name = module.exports.getBuilding(building_name, { return_key: true });

    if (province_obj)
      if (province_obj.buildings)
        if (building_obj)
          if (!isNaN(amount)) {
            //Modifier handler
            if (building_obj.modifiers)
              applyModifiers(local_province.owner, building_obj.modifiers);

            //Supply limit handler
            if (building_obj.supply_limit) {
              var supplied_provinces = getProvincesInRange(province_id, config.defines.combat.infrastructure_range);

              for (var i = 0; i < supplied_provinces.length; i++) {
                var local_province = main.provinces[supplied_provinces[i]];

                local_province.supply_limit = (local_province.supply_limit) ?
                  local_province.supply_limit + building_obj.supply_limit*amount :
                  building_obj.supply_limit*amount;
              }
            }

            //Push to buildings array
            for (var i = 0; i < amount; i++)
              province_obj.buildings.push({
                building_type: raw_building_name
              });
          }
  },

  destroyBuilding: function (arg0_amount, arg1_building_name, arg2_province) {
    //Convert from parameters
    var amount = Math.ceil(parseInt(arg0_amount));
    var building_name = arg1_building_name.trim();
    var province_id = arg2_province;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var freed_manpower = {};
    var province_obj = main.provinces[province_id];
    var raw_building_name = module.exports.getBuilding(building_name, { return_key: true });
    var remaining_amount = JSON.parse(JSON.stringify(amount));

    //Remove buildings from local province
    if (province_obj)
      if (province_obj.buildings)
        if (building_obj)
          if (!isNaN(amount)) {
            var usr = main.users[province_obj.owner];

            //Supply limit handler
            if (building_obj.supply_limit) {
              var local_user = main.users[province_obj.controller];
              var supplied_provinces = getProvincesInRange(province_id, config.defines.combat.infrastructure_range);

              for (var i = 0; i < supplied_provinces.length; i++) {
                var local_province = main.provinces[supplied_provinces[i]];

                local_province.supply_limit = (local_province.supply_limit) ?
                  local_province.supply_limit - building_obj.supply_limit*amount :
                  0;
              }
            }

            //Splice from buildings array
            for (var i = province_obj.buildings.length - 1; i >= 0; i--)
              if (remaining_amount > 0)
                if (province_obj.buildings[i].building_type == raw_building_name) {
                  province_obj.buildings.splice(i, 1);
                  remaining_amount--;
                }

            //Free up manpower
            if (building_obj.manpower_cost) {
              var all_manpower_costs = Object.keys(building_obj.manpower_cost);

              for (var i = 0; i < all_manpower_costs.length; i++) {
                var local_manpower_cost = building_obj.manpower_cost[all_manpower_costs[i]];

                usr.pops[`used_${all_manpower_costs[i]}`] -= local_manpower_cost*amount;

                //Add to tracker variable
                freed_manpower[all_manpower_costs[i]] = (freed_manpower[all_manpower_costs[i]]) ?
                  freed_manpower[all_manpower_costs[i]] + local_manpower_cost*amount :
                  local_manpower_cost*amount;
              }
            }

            //Make sure user's available pops can't be less than zero
            var all_pops = Object.keys(config.pops);

            for (var i = 0; i < all_pops.length; i++)
              usr.pops[`used_${all_pops[i]}`] = Math.max(0, usr.pops[`used_${all_pops[i]}`]);

            //Return statement
            return freed_manpower;
          }
  },

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
          if (!module.exports.ignore_building_keys.includes(local_buildings[x])) {
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
          if (!module.exports.ignore_building_keys.includes(local_buildings[x])) {
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
          if (!module.exports.ignore_building_keys.includes(local_buildings[x])) {
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
          log.error(`${all_building_categories[i]} has an invalid order number! .order: ${local_building_category.order-1} is already occupied by ${building_categories[local_building_category.order-1]}!\n\nCheck common/buildings for more information on resolving this error.`);
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
    var building_category_name = arg0_name.trim().toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var all_processed_building_categories = [];
    var building_category_exists = [false, ""]; //[building_category_exists, building_category_obj];

    //Initialise all_processed_building_categories
    for (var i = 0; i < all_building_categories.length; i++)
      (!config.buildings[all_building_categories[i]].name) ?
        all_processed_building_categories.push(parseString(all_building_categories[i])) :
        all_processed_building_categories.push(config.buildings[all_building_categories[i]].name);

    //Fetch config object
    if (config.buildings[building_category_name]) {
      return (!options.return_key) ? config.buildings[building_category_name] : building_category_name;
    } else {
      //If the building category cannot be found verbatim, start a soft-hard search by parsed strings
      //Soft match first
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase().indexOf(building_category_name) != -1)
          building_category_exists = [true, (!options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Hard match second
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase() == building_category_name)
          building_category_exists = [true, (!options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Return statement after soft-hard search
      return (building_category_exists[0]) ? building_category_exists[1] : undefined;
    }
  },

  /*
    getBuildingCategoryFromBuilding() - Returns back the building_category object/key based on the specified building name. Only supports raw building names
    options: {
      return_key: true/false - Whether or not to return back the building category key instead of object. False by default
    }
  */
  getBuildingCategoryFromBuilding: function (arg0_name, arg1_options) {
    //Convert from parameters
    var building_name = arg0_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var building_category_exists = [false, ""]; //[building_category_exists, category_name]

    for (var i = 0; i < all_building_categories.length; i++)
      if (Object.keys(config.buildings[all_building_categories[i]]).includes(building_name))
        building_category_exists = [true, (!options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

    //Return statement
    return (building_category_exists[0]) ? building_category_exists[1] : undefined;
  },

  getBuildingConsumption: function (arg0_user, arg1_building) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var maintenance_obj = {};
    var usr = main.users[user_id];

    //Only start appending if the .maintenance object exists at all
    if (building_obj.maintenance) {
      var all_maintenance_costs = Object.keys(building_obj.maintenance);

      for (var i = 0; i < all_maintenance_costs.length; i++) {
        var local_consumption_value = getList(building_obj.maintenance[all_maintenance_costs[i]]);

        if (local_consumption_value.length >= 2) {
          maintenance_obj[all_maintenance_costs[i]] = (!maintenance_obj[all_maintenance_costs[i]]) ?
            [local_consumption_value[0], local_consumption_value[1]] :
            [
              maintenance_obj[all_maintenance_costs[i]][0] + local_consumption_value[0],
              maintenance_obj[all_maintenance_costs[i]][1] + local_consumption_value[1]
            ];
        } else {
          maintenance_obj[all_maintenance_costs[i]] = (!maintenance_obj[all_maintenance_costs[i]]) ?
            [local_consumption_value[0], local_consumption_value[0]] :
            [
              maintenance_obj[all_maintenance_costs[i]][0] + local_consumption_value[0],
              maintenance_obj[all_maintenance_costs[i]][1] + local_consumption_value[0]
            ];
        }

        //Sort in ascending order
        if (maintenance_obj[all_maintenance_costs[i]])
          maintenance_obj[all_maintenance_costs[i]].sort(function(a, b){
            return a - b;
          });

        if (maintenance_obj[all_maintenance_costs[i]][0] == maintenance_obj[all_maintenance_costs[i]][1])
          maintenance_obj[all_maintenance_costs[i]] = [maintenance_obj[all_maintenance_costs[i]][0]];
      }
    }

    //Return statement
    return maintenance_obj;
  },

  /*
    getBuildingCost() - Returns the cost of a building for the specified user as a JSON object/integer.
    options: {
      type: "all", "money", "goods", "pops" - Returns either all cost arguments, only money (as an integer), goods, or pop costs only.
      amount: - The number of buildings to check the cost for.
    }
  */
  getBuildingCost: function (arg0_user, arg1_building, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building;

    //Initialise options
    var options = (arg2_options) ? arg2_options : {};
      if (!options.type) options.type = "all";
      if (!options.amount) options.amount = 1;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var costs_obj = {};
    var usr = main.users[user_id];

    //Only start appending if the .cost object exists at all
    if (building_obj.cost) {
      var all_costs = Object.keys(building_obj.cost);

      for (var i = 0; i < all_costs.length; i++) {
        //Check to make sure that this is an actual resource, and not just a pop value
        var building_cost_modifier = (!Object.keys(config.pops).includes(all_costs[i])) ? returnSafeNumber(usr.modifiers.building_cost, 1) : 1;
        var current_resource_demand = Math.ceil(building_obj.cost[all_costs[i]]*building_cost_modifier*options.amount);

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
      var all_manpower_costs = Object.keys(building_obj.manpower_cost);

      for (var i = 0; i < all_manpower_costs.length; i++) {
        var current_resource_demand = building_obj.manpower_cost[all_manpower_costs[i]]*options.amount;

        costs_obj[all_manpower_costs[i]] = (!costs_obj[all_manpower_costs[i]]) ?
          current_resource_demand :
          costs_obj[all_manpower_costs[i]] + current_resource_demand;
      }
    }

    //Return object
    return (options.type != "money") ? costs_obj : returnSafeNumber(costs_obj.money, 0);
  },

  //This method only gets building production, not maintenance. See getBuildingConsumption() for maintenance costs instead.
  getBuildingProduction: function (arg0_user, arg1_building, arg2_city_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building;
    var city_name = arg2_city_name;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var city_obj = (typeof city_name != "object") ?
      (city_name) ?
        getCity(city_name, { users: user_id }) :
        { name: "No city provided." } :
      city_name;
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
        if (building_obj.produces) {
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
            actual_rgo_throughput = (city_obj.resource == all_produced_goods[i]) ?
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
        }
      } catch (e) {
        log.error(`getBuildingProduction() encountered an error whilst parsing for building type ${building_name}.`);
        console.log(e);
      }

    //Return statement
    return production_obj;
  },

  /*
    getBuildings() - Returns an array of all valid building objects/keys.
    options: {
      return_names: true/false - Whether to return back keys or not
    }
  */
  getBuildings: function (arg0_options) {
    //Convert from parameters; initialise options
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_building_category_objects = module.exports.getBuildingCategories();
    var all_building_categories = Object.keys(all_building_category_objects);
    var all_buildings = [];

    //Push all valid buildings to array
    for (var i = 0; i <  all_building_categories.length; i++) {
      var local_category = all_building_category_objects[all_building_categories[i]];
      var local_buildings = Object.keys(local_category);

      for (var x = 0; x < local_buildings.length; x++)
        if (!module.exports.ignore_building_keys.includes(local_buildings[x]))
          all_buildings.push((options.return_names) ?
            local_buildings[x] :
            local_category[local_buildings[x]]
          );
    }

    //Return statement
    return all_buildings;
  },

  //Gets building slots for a given category/building, returns -1 if unlimited
  /*
    getBuildingSlots() - Returns an object of various building slot statistics for a given category within a city.

    options: {
      type: "all", "available_slots", "total_buildings", "total_slots", "under_construction"; all returns entire object, under_construction returns only buildings under construction in that category
    }

    returns: {
      available_slots: -1, 0, -
      total_buildings: 0, -
      total_buildings_under_construction: 0, -
      total_slots: -1, 0, -
    }
  */
  getBuildingSlots: function (arg0_user, arg1_city_name, arg2_building_category, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var building_category_name = arg2_building_category;

    //Initialise options
    var options = (arg3_options) ? arg3_options : {
      type: "all"
    };

    //Declare local instance variables
    var available_building_slots = [false, {
      available_slots: 0,
      total_buildings: 0,
      total_buildings_under_construction: 0,
      total_slots: 0
    }]; //[encountered_error, { available_slots: 0, total_buildings: 0, total_buildings_under_construction: 0, total_slots: 0}]
    var building_category = module.exports.getBuildingCategory(building_category_name);
    var building_obj = module.exports.getBuilding(building_category_name);
    var city_obj = getCity(city_name, { users: user_id });
    var raw_building_category_name = module.exports.getBuildingCategory(building_category_name, { return_key: true });
    var raw_building_name = module.exports.getBuilding(building_category_name, { return_key: true });
    var usr = main.users[user_id];

    //Check to see whether building_category_name is of type building or building_category
    try {
      if (building_category) {
        var all_buildings_in_category = Object.keys(building_category);

        if (building_category.disable_slots) {
          available_building_slots[1].available_slots = -1;
          available_building_slots[1].total_slots = -1;

          available_building_slots[0] = true;
        } else {
          //Count all buildings in category in city
          for (var i = 0; i < city_obj.buildings.length; i++)
            if (Object.keys(building_category).includes(city_obj.buildings[i].building_type))
              available_building_slots[1].total_buildings++;

          //Fetch total available slots in city for building_category
          available_building_slots[1].total_slots =
            city_obj[`${raw_building_category_name}_building_slots`] +
            usr.modifiers.extra_building_slots;

          //Set .available_slots
          available_building_slots[1].available_slots =
            available_building_slots[1].total_slots -
            available_building_slots[1].total_buildings;

            available_building_slots[0] = true;
        }
      } else if (building_obj) {
        //If building_category_name is of type building, fetch available slots for that local building
        //Declare local instance variables
        var all_building_categories = Object.keys(config.buildings);
        var actual_building_category;

        for (var i = 0; i < all_building_categories.length; i++)
          if (Object.keys(config.buildings[all_building_categories[i]]).includes(building_category_name))
            actual_building_category = all_building_categories[i];

        var local_building_category = module.exports.getBuildingCategory(actual_building_category);

        //Fetch total_buildings
        for (var i = 0; i < city_obj.buildings.length; i++)
          if (Object.keys(local_building_category).includes(city_obj.buildings[i].building_type))
            available_building_slots[1].total_buildings++;

        //Fetch total available slots in city for that building type
        if (building_obj.separate_building_slots) {
          available_building_slots[1].total_slots = (usr.modifiers[building_category_name]) ?
            usr.modifiers[building_category_name] :
            0;

          //Set total number of available_slots
          available_building_slots[1].available_slots =
            available_building_slots[1].total_slots -
            available_building_slots[1].total_buildings;
        } else if (building_obj.unlimited_slots) {
          available_building_slots[1].available_slots = -1;
          available_building_slots[1].total_slots = -1;
        }

        available_building_slots[0] = true;
      }
    } catch {}

    //under_construction handler
    try {
      for (var i = 0; i < usr.under_construction.length; i++)
        if (usr.under_construction[i].province_id == city_obj.id)
          if (building_category) {
            var local_building_category = module.exports.getBuildingCategoryFromBuilding(usr.under_construction[i].building_type, { return_key: true });

            if (local_building_category == raw_building_category_name)
              available_building_slots[1].total_buildings_under_construction += usr.under_construction[i].building_amount;
          } else if (building_obj) {
            if (usr.under_construction[i].building_type == raw_building_name)
              available_building_slots[1].total_buildings_under_construction += usr.under_construction[i].building_amount;
          }

      //Update .available_slots
      available_building_slots[1].available_slots -= available_building_slots[1].total_buildings_under_construction;
    } catch {}

    //Return statement
    switch (options.type) {
      case "all":
        return (available_building_slots[0]) ? available_building_slots[1] : undefined;

        break;
      case "available_slots":
        return (available_building_slots[0]) ? available_building_slots[1].available_slots  : undefined;

        break;
      case "total_buildings":
        return (available_building_slots[0]) ? available_building_slots[1].total_buildings : undefined;

        break;
      case "total_slots":
        return (available_building_slots[0]) ? available_building_slots[1].total_slots : undefined;

        break;
      case "under_construction":
        return (available_building_slots[0]) ? available_building_slots[1].total_buildings_under_construction : undefined;

        break;
    }
  },

  /*
    getProduction() - Returns the production value of a specific good or all goods for a user. Note that "all" for arg1_good returns an object of all goods with their minimum and maximum production values being stored in a 2-element array.
  */
  getProduction: function (arg0_user, arg1_good) {
    //Convert from parameters
    var user_id = arg0_user;
    var good_type = (arg1_good) ? arg1_good : "all";

    //Declare local instance variables, corresponding functions
    var all_goods = getGoods({ return_names: true });
    var cities = getCities(user_id);
    var usr = main.users[user_id];

    //Note that deep copies are made to make sure not to effect the actual user variable and to run a valid simulation to simply fetch values instead of alter them
    var goods_production = {};
    var virtual_usr = JSON.parse(JSON.stringify(usr));

    var virtual_inventory = virtual_usr.inventory;

    function changeProductionValue (arg0_key, arg1_min_max_argument, arg2_value) {
      //Convert from parameters
      var local_key = arg0_key;
      var min_max_argument = arg1_min_max_argument;
      var local_value = Math.round(returnSafeNumber(arg2_value));

      //Add to goods production
      if (goods_production[local_key]) {
        switch (min_max_argument) {
          case "minimum":
            goods_production[local_key][0] += local_value;

            break;
          case "maximum":
            goods_production[local_key][1] += local_value;

            break;
          default:
            goods_production[local_key][0] += local_value;
            goods_production[local_key][1] += local_value;

            break;
        }
      } else {
        switch (min_max_argument) {
          case "minimum":
            goods_production[local_key] = [local_value, 0];

            break;
          case "maximum":
            goods_production[local_key] = [0, local_value];

            break;
          default:
            goods_production[local_key] = [local_value, local_value];

            break;
        }
      }
    }

    //Get all goods production by default, filter only if good_type is not set to "all"
    if (usr) {
      try {
        for (var i = 0; i < cities.length; i++)
          //Iterate over all buildings in city
          for (var x = 0; x < cities[i].buildings.length; x++) {
            var building_obj = getBuilding(cities[i].buildings[x].building_type);
            var local_building = cities[i].buildings[x];
            var production_valid = true;
            var raw_building_name = cities[i].buildings[x].building_type;

            if (building_obj.maintenance) {
              var all_maintenance_costs = Object.keys(building_obj.maintenance);
              var local_checks = 0;

              for (var y = 0; y < all_maintenance_costs.length; y++) {
                var local_value = getList(building_obj.maintenance[all_maintenance_costs[y]]);

                //Check to make sure that material actually exists
                var current_amount = randomElement(local_value);
                var local_actual_material = all_goods.includes(all_maintenance_costs[y]);

                if (local_actual_material) {
                  if (virtual_inventory[all_maintenance_costs[y]] >= current_amount) {
                    local_checks++;
                    virtual_inventory[all_maintenance_costs[y]] -= current_amount;
                  }
                } else {
                  if (virtual_usr[all_maintenance_costs[y]] >= current_amount) {
                    local_checks++;
                    virtual_usr[all_maintenance_costs[y]] -= current_amount;
                  }
                }

                //Change production value for it
                if (good_type == "all") {
                  changeProductionValue(`${all_maintenance_costs[y]}_upkeep`, "minimum", current_amount);
                  changeProductionValue(`${all_maintenance_costs[y]}_upkeep`, "maximum", current_amount);
                }

                //Begin removing resources from virtual_inventory and virtual_user
                (local_actual_material) ?
                  virtual_inventory[all_maintenance_costs[y]] -= current_amount :
                  virtual_usr[all_maintenance_costs[y]] -= current_amount;
              }
            }

            if (building_obj.maintenance)
              production_valid = (local_checks >= all_maintenance_costs.length);

            //Only produce if the building has the necessary resources to do so
            if (production_valid) {
              //Add building special_effect to total goods production array
              goods_production[`${raw_building_name}_special_effect`] = (goods_production[`${raw_building_name}_special_effect`]) ?
                goods_production[`${raw_building_name}_special_effect`] + 1 :
                1;

              var building_production = module.exports.getBuildingProduction(user_id, raw_building_name, cities[i].name);

              //Add all_building_production to goods_production
              var all_building_production = Object.keys(building_production);

              for (var y = 0; y < all_building_production.length; y++) {
                var current_amount = building_production[all_building_production[y]];

                changeProductionValue(`${all_building_production[y]}`, "minimum", current_amount[0]);
                changeProductionValue(`${all_building_production[y]}`, "maximum", current_amount[1]);
              }
            }
          }

        //Sort goods_production so that each key is actually [min, max]
        var all_good_keys = Object.keys(goods_production);
        for (var i = 0; i < all_good_keys.length; i++)
          if (Array.isArray(all_good_keys[i]))
            goods_production[all_good_keys[i]].sort();
      } catch (e) {
        log.error(`getProduction() - ran into an error whilst trying to parse production for User ID: ${e}.`);
        console.error(e);
      }
    } else {
      log.error(`getProduction() - encountered an error when trying to parse production for User ID: ${user_id}.`);
    }

    //Return statement
    return (good_type == "all") ?
      (Object.keys(goods_production).length > 0) ? goods_production : {} :
      (goods_production[good_type]) ? goods_production[good_type] : [0, 0];
  },

  getTotalBuildings: function (arg0_city_name, arg1_building_name) {
    //Convert from parameters
    var city_name = arg0_city_name.toLowerCase().trim();
    var building_name = arg1_building_name.toLowerCase().trim();

    //Declare local instance variables
    var city_obj = getCity(city_name);
    var raw_building_name = module.exports.getBuilding(building_name);
    var total = 0;

    //Iterate over all buildings in province
    if (city_obj)
      for (var i = 0; i < city_obj.buildings.length; i++)
        if (city_obj.buildings[i].building_type == raw_building_name)
          total++;

    //Return statement
    return total;
  }
};
