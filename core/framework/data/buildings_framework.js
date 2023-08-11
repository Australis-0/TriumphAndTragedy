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

  /*
    applyProduction() - Used internally for getBuildingProduction() recursion
    options: {
      config_object: {}, //Passes original building_object to check for top-level fields
      current_scope: { name: "produces" }, //What the current scope being passed to the function is
      modifiers: {}, //Modifier scope, optional
    }
  */
  applyProduction: function (arg0_produces_scope, arg1_options) {
    //Convert from parameters
    var scope = arg0_produces_scope;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_good_keys = Object.keys(scope);
    var building_object = options.config_object;
    var current_scope_name = options.current_scope;

    //Initialise defaults for options
    if (!current_scope_name) current_scope_name = "produces"; //.produces by default
    if (!options.modifiers) options.modifiers = {};

    var production_efficiency_applicable = (
      building_object.produces && building_object.maintenance &&
      current_scope_name == "produces"
    );
    var research_efficiency_applicable = (
      building_object.produces &&
      current_scope_name == "produces"
    );
    var rgo_throughput_applicable = (
      building_object.produces && !building_object.maintenance &&
      current_scope_name == "produces"
    );

    if (building_object) {
      for (var i = 0; i < all_good_keys.length; i++) {
        var local_subobj = scope[all_good_keys[i]];
        var local_values = getList(local_subobj);

        if (all_good_keys[i] == "production_choice" || all_good_keys[i].startsWith("production_choice_")) {
          local_subobj = module.exports.applyProduction(local_subobj, options);
        } else {
          if (lookup.all_goods[all_good_keys[i]]) {
            var local_good = lookup.all_goods[all_good_keys[i]];

            if (all_good_keys[i] == "knowledge") {
              if (research_efficiency_applicable)
                if (options.modifiers.research_efficiency) {
                  for (var x = 0; x < local_values.length; x++)
                    local_values[x] = local_values[x]*options.modifiers.research_efficiency;
                  local_subobj = (local_values.length == 1) ?
                    local_values[0] : local_values;
                }
            } else {
              //production_efficiency
              if (production_efficiency_applicable)
                if (options.modifiers.production_efficiency) {
                  for (var x = 0; x < local_values.length; x++)
                    local_values[x] = local_values[x]*options.modifiers.production_efficiency;
                  local_subobj = (local_values.length == 1) ?
                    local_values[0] : local_values;
                }
              //<resource_key>_gain
              if (options.modifiers[`${all_good_keys[i]}_gain`]) {
                for (var x = 0; x < local_values.length; x++)
                  local_values[x] = local_values[x]*options.modifiers[`${all_good_keys[i]}_gain`];
                local_subobj = (local_values.length == 1) ?
                  local_values[0] : local_values;
              }
              //rgo_throughput
              if (rgo_throughput_applicable)
                if (options.modifiers.rgo_throughput) {
                  for (var x = 0; x < local_values.length; x++)
                    local_values[x] = local_values[x]*options.modifiers.rgo_throughput;
                  local_subobj = (local_values.length == 1) ?
                    local_values[0] : local_values;
                }
            }
          }
        }
      }
    } else {
      log.warn(`applyProduction() was passed with no options.building_object!`);
    }

    //Return statement
    return scope;
  },

  changeProductionValue: function (arg0_scope, arg1_good_key, arg2_min_max_argument, arg3_value) {
    //Convert from parameters
    var production_obj = arg0_scope;
    var good_key = arg1_good_key;
    var min_max_argument = (arg2_min_max_argument) ? arg2_min_max_argument : "both"; //Can be "minimum", "maximum", or "both"
    var value = parseInt(arg3_value);

    //Modify value
    if (production_obj[good_key]) {
      var local_good_value = production_obj[good_key];

      if (min_max_argument == "minimum")
        local_good_value[0] += value;
      if (min_max_argument == "maximum")
        local_good_value[1] += value;
      if (min_max_argument == "both") {
        local_good_value[0] += value;
        local_good_value[1] += value;
      }
    } else {
      if (min_max_argument == "minimum")
        production_obj[good_key] = [value, 0];
      if (min_max_argument == "maximum")
        production_obj[good_key] = [0, value];
      if (min_max_argument == "both")
        production_obj[good_key] = [value, value];
    }

    //Return statement
    return production_obj;
  },

  constructBuilding: function (arg0_amount, arg1_building_name, arg2_province, arg3_index) {
    //Convert from parameters
    var amount = Math.ceil(parseInt(arg0_amount));
    var building_name = arg1_building_name.trim();
    var province_id = arg2_province;
    var construction_index = arg3_index;

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var new_modifiers = {};
    var province_obj = main.provinces[province_id];
    var raw_building_name = module.exports.getBuilding(building_name, { return_key: true });

    if (province_obj)
      if (province_obj.buildings)
        if (building_obj)
          if (!isNaN(amount)) {
            //Remove index
            if (construction_index) {
              var local_user = main.users[province_obj.owner];

              local_user.under_construction.splice(construction_index, 1);
            }

            //Modifier handler
            if (building_obj.modifiers) {
              var all_modifiers = Object.keys(building_obj.modifiers);

              for (var i = 0; i < all_modifiers.length; i++) {
                var local_value = building_obj.modifiers[all_modifiers[i]];

                new_modifiers[all_modifiers[i]] = (isNaN(local_value)) ?
                  local_value :
                  local_value*amount;
              }

              //Apply new_modifiers
              applyModifiers(province_obj.owner, new_modifiers);
            }

            //Housing modifier
            if (building_obj.houses)
              province_obj.housing = (province_obj.housing) ?
                province_obj.housing + building_obj.houses*amount :
                building_obj.houses*amount;

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
            if (!province_obj.buildings)
              province_obj.buildings = [];

            for (var i = 0; i < amount; i++) {
              var local_object = {
                id: module.exports.generateBuildingID(province_id),
                building_type: raw_building_name,
                order: province_obj.buildings.length
              };

              if (building_obj.manpower_cost) local_object.employment = {};
              if (building_obj.manpower_cost) local_object.stockpile = {
                money: module.exports.getStartingStockpile(building_obj)
              };

              province_obj.buildings.push(local_object);
            }
          }
  },

  /*
    destroyBuildings() - Demolishes a set of buildings and returns the freed manpower.
    options: {
      province_id: "4406", - The province ID to demolish in
      building_count: 2, - Optional. 1 by default
      building_type: "lumberjacks", - Optional. The building type to demolish. If not defined, building_object must be provided

      building_object: {} - The building object to demolish
    }
  */
  destroyBuildings: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var individual_id = false;

    var amount = options.building_count;
    var building_obj;
    var freed_manpower = {};
    var province_id = options.province_id;
    var province_obj = main.provinces[province_id];
    var raw_building_name;
    var remaining_amount;

    if (!options.amount) {
      individual_id = true;

      amount = 1;
      building_obj = lookup.all_buildings[options.building_object.building_type];
      raw_building_name = options.building_object.building_type;
    } else {
      building_obj = module.exports.getBuilding(options.building_type);
      raw_building_name = module.exports.getBuilding(options.building_type, { return_key: true });
    }

    remaining_amount = JSON.parse(JSON.stringify(amount));

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
              if (remaining_amount > 0) {
                var has_building_obj = false;

                if (!individual_id) {
                  has_building_obj = true;
                } else {
                  if (options.building_object.id == province_obj.buildings[i].id)
                    has_building_obj = true;
                }

                if (has_building_obj)
                  if (province_obj.buildings[i].building_type == raw_building_name) {
                    province_obj.buildings.splice(i, 1);
                    remaining_amount--;
                  }
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

  generateBuildingID: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var province_obj = getProvince(province_id);

    //While loop to find ID just in case of conflicting random ID's:
    if (province_obj)
      while (true) {
        var duplicate_id = false;
        var local_id_suffix = generateRandomID();

        var full_id = `${province_obj.id}-${local_id_suffix}`;

        //Return and break once a true ID is found
        for (var i = 0; i < province_obj.buildings.length; i++)
          if (province_obj.buildings[i].id == full_id)
            duplicate_id = true;

        if (!duplicate_id) {
          return full_id;
          break;
        }
      }
  },

  /*
    generateBuildingName() - Returns a valid building name in a province as a string.
    options: {
      exclude_number: true/false - Whether to exclude the ending number (e.g. #15)
    }
  */
  generateBuildingName: function (arg0_province_id, arg1_building_name, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var building_name = arg1_building_name.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var building_key = module.exports.getBuilding(building_name, { return_key: true });
    var building_obj = module.exports.getBuilding(building_name);
    var building_string = "";
    var province_obj = getProvince(province_id);

    //Fetch building name
    if (province_obj) {
      building_name = `${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}`;

      if (building_obj) {
        var total_building_count = 0;

        if (!options.exclude_number)
          total_building_count = module.exports.getTotalBuildings(province_obj.id, building_key);

        building_name = truncateString(`${building_name} ${(building_obj.name) ? building_obj.name : building_key}${(!options.exclude_number) ? ` #${total_building_count + 1}` : ""}`, 80);
      }
    }

    //Return statement
    return building_name;
  },

  //getAllBuildingGoods() - Returns a key array of all goods relevant to the set of a user's available_buildings
  getAllBuildingGoods: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_building_goods = [];
    var all_building_keys = Object.keys(lookup.all_buildings);
    var usr = main.users[actual_id];

    //Iterate through all buildings to get all_building_goods
    for (var i = 0; i < all_building_keys.length; i++)
      if (usr.available_buildings.includes(all_building_keys[i])) {
        var local_building = lookup.all_buildings[all_building_keys[i]];

        for (var x = 0; x < reserved.building_good_keys.length; x++) {
          var local_goods_field = local_building[reserved.building_good_keys[x]];

          if (local_goods_field) {
            var local_good_keys = Object.keys(local_goods_field);

            for (var y = 0; y < local_good_keys.length; y++)
              if (!all_building_goods.includes(local_good_keys[y]))
                if (lookup.all_goods[local_good_keys[y]])
                  all_building_goods.push(local_good_keys[y]);
          }
        }
      }

    //Return statement
    return all_building_goods;
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

    //Guard clause for verbatim key
    if (lookup.all_buildings[building_name])
      return (!options.return_key) ? lookup.all_buildings[building_name] : building_name;

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

  /*
    getBuildingByID() - Returns a building by its given ID
    options: {
      return_key: true/false - Whether to return the array element instead of the building object
    }
  */
  getBuildingByID: function (arg0_id) {
    //Convert from parameters
    var id = (typeof arg0_id != "object") ? arg0_id.trim().toLowerCase() : arg0_id;

    //Guard clause
    if (typeof id == "object") return id;

    //Declare local instance variables
    var building_obj;
    var split_id = id.split("-");

    var province_obj = main.provinces[split_id[0]];

    if (province_obj)
      if (province_obj.buildings)
        for (var i = 0; i < province_obj.buildings.length; i++)
          if (province_obj.buildings[i].id == id) {
            building_obj = (!options.return_key) ? province_obj.buildings[i] : i;
            break;
          }

    //Return statement
    return building_obj;
  },

  /*
    getBuildingByName() - Returns a building by its name string
    options: {
      return_key: true/false - Whether to return an array [province_id, building_element] instead of an object
    }
  */
  getBuildingByName: function (arg0_user, arg1_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = (typeof arg1_building_name != "object") ? arg1_building_name.trim().toLowerCase() : arg1_building_name;

    //Guard clause
    if (typeof building_name == "object") return building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj;
    var provinces = getProvinces(user_id, { include_occupations: true });
    var usr = main.users[actual_id];

    //Iterate over all provinces; soft search first
    for (var i = 0; i < provinces.length; i++)
      if (provinces[i].buildings)
        for (var x = 0; x < provinces[i].buildings.length; x++)
          if (provinces[i].buildings[x].name)
            if (provinces[i].buildings[x].name.trim().toLowerCase().indexOf(building_name) != -1)
              building_obj = (!options.return_key) ? provinces[i].buildings[x] : [provinces[i].id, x];

    //Iterate over all provinces; hard search second
    for (var i = 0; i < provinces.length; i++)
      if (provinces[i].buildings)
        for (var x = 0; x < provinces[i].buildings.length; x++)
          if (provinces[i].buildings[x].name)
            if (provinces[i].buildings[x].name.trim().toLowerCase() == building_name)
              building_obj = (!options.return_key) ? provinces[i].buildings[x] : [provinces[i].id, x];

    //Return statement
    return building_obj;
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
    var actual_id = main.global.user_map[user_id];
    var building_obj = module.exports.getBuilding(building_name);
    var maintenance_obj = {};
    var usr = main.users[actual_id];

    //Only start appending if the .maintenance object exists at all
    if (building_obj.maintenance) {
      var all_maintenance_costs = Object.keys(building_obj.maintenance);

      maintenance_obj = module.exports.applyProduction(
        JSON.parse(JSON.stringify(building_obj.maintenance)),
        {
          config_object: building_obj,
          current_scope: { name: "maintenance" }
        }
      );
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
    var actual_id = main.global.user_map[user_id];
    var building_obj = module.exports.getBuilding(building_name);
    var costs_obj = {};
    var usr = main.users[actual_id];

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
          is_resource: lookup.all_good_names.includes(all_costs[i])
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
    var actual_id = main.global.user_map[user_id];
    var building_obj = (typeof building_name != "object") ?
      module.exports.getBuilding(building_name) :
      building_name;
    var city_obj = (typeof city_name != "object") ?
      (city_name) ?
        getCity(city_name, { users: user_id }) :
        { name: "No city provided." } :
      city_name;
    var production_obj = {};
    var usr = main.users[actual_id];

    //Only start appending if the user and building_obj.produces is actually defined
    if (usr)
      try {
        if (building_obj.produces) {
          var all_produced_goods = Object.keys(building_obj.produces);
          var city_rgo_throughput = getCityRGOThroughput(city_obj);

          production_obj = module.exports.applyProduction(
            JSON.parse(JSON.stringify(building_obj.produces)),
            {
              config_object: building_obj,
              current_scope: { name: "produces" },
              province_id: city_obj.id,

              modifiers: {
                [`${city_obj.resource}_gain`]:
                  (city_obj.resource && city_rgo_throughput) ? city_rgo_throughput : 1, //This serves as the RGO throughput modifier
                production_efficiency: usr.modifiers.production_efficiency,
                research_efficiency: usr.modifiers.research_efficiency
              }
            }
          );
        }
      } catch (e) {
        log.error(`getBuildingProduction() encountered an error whilst parsing for building type ${building_name}.`);
        console.log(e);
      }

    //Return statement
    return production_obj;
  },

  getBuildingProductionChoice: function (arg0_building_obj) {
    //Convert from parameters
    var building_obj = arg0_building_obj;

    //Declare local instance variables
    var config_obj = lookup.all_buildings[building_obj.building_type];

    if (config_obj.produces) {
      var all_production_keys = Object.keys(config_obj.produces);
      var production_choice_amount = 0;

      //Check how many keys start with production_choice_
      for (var i = 0; i < config_obj.produces.length; i++)
        if (config_obj.produces[i].startsWith("production_choice_"))
          production_choice_amount++;

      //Return statement
      if (!building_obj.production_choice && production_choice_amount < all_production_keys.length) {
        return "base";
      } else if (building_obj.production_choice) {
        return building_obj.production_choice;
      }
    }
  },

  /*
    getBuildings() - Returns an array of all valid building objects/keys.
    options: {
      return_names: true/false - Whether to return back keys or not
      return_object: true/false - Whether or not to return back a singular object.
    }
  */
  getBuildings: function (arg0_options) {
    //Convert from parameters; initialise options
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_building_categories = module.exports.getBuildingCategories();
    var all_buildings = [];
    var building_object = {};

    //Push all valid buildings to array
    for (var i = 0; i < all_building_categories.length; i++) {
      var local_category = config.buildings[all_building_categories[i]];
      var local_buildings = Object.keys(local_category);

      for (var x = 0; x < local_buildings.length; x++)
        if (!module.exports.ignore_building_keys.includes(local_buildings[x])) {
          all_buildings.push((options.return_names) ?
            local_buildings[x] :
            local_category[local_buildings[x]]
          );
          building_object[local_buildings[x]] = local_category[local_buildings[x]];
        }
    }

    //Return statement
    return (!options.return_object) ? all_buildings : building_object;
  },

  //getBuildingsToCategoryMap() - Returns an object of building keys to their building category key
  getBuildingsToCategoryMap: function () {
    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var all_buildings = module.exports.getBuildings({ return_object: true });
    var category_map = {};

    var all_building_keys = Object.keys(all_buildings);

    //Iterate over all_building_keys and call module.exports.getBuildingCategoryFromBuilding()
    for (var i = 0; i < all_building_keys.length; i++)
      category_map[all_building_keys[i]] = module.exports.getBuildingCategoryFromBuilding({ return_key: true });

    //Return statement
    return category_map;
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
    var actual_id = main.global.user_map[user_id];
    var available_building_slots = [false, {
      available_slots: 0,
      total_buildings: 0,
      total_buildings_under_construction: 0,
      total_slots: 0
    }]; //[encountered_error, { available_slots: 0, total_buildings: 0, total_buildings_under_construction: 0, total_slots: 0}]
    var building_category = module.exports.getBuildingCategory(building_category_name);
    var building_obj = module.exports.getBuilding(building_category_name);
    var city_obj = (typeof city_name != "object") ?
      getCity(city_name, { users: user_id }) :
      city_name;
    var raw_building_category_name = module.exports.getBuildingCategory(building_category_name, { return_key: true });
    var raw_building_name = module.exports.getBuilding(building_category_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see whether building_category_name is of type building or building_category
    try {
      if (building_category) {
        var all_buildings_in_category = Object.keys(building_category);

        //Count all buildings in category in city
        for (var i = 0; i < city_obj.buildings.length; i++)
          if (Object.keys(building_category).includes(city_obj.buildings[i].building_type))
            available_building_slots[1].total_buildings++;

        //Fetch total available slots in city for building_category
        available_building_slots[1].total_slots =
          Math.min(usr.modifiers[`${raw_building_category_name}_building_slots`], 1) +
            Math.max(city_obj[`${raw_building_category_name}_building_slots`] - usr.modifiers[`${raw_building_category_name}_building_slots`], 0) +
            returnSafeNumber(usr.modifiers[raw_building_name]) +
            returnSafeNumber(usr.modifiers[`${raw_building_category_name}_building_slots`]) + usr.modifiers.extra_building_slots;

        //Set .available_slots
        available_building_slots[1].available_slots =
          available_building_slots[1].total_slots -
          available_building_slots[1].total_buildings;

        //Reset available/total slots if building slots are disabled for this category
        if (building_category.disable_slots) {
          available_building_slots[1].available_slots = -1;
          available_building_slots[1].total_slots = -1;
        }

        available_building_slots[0] = true;
      } else if (building_obj) {
        //If building_category_name is of type building, fetch available slots for that local building
        //Declare local instance variables
        var all_building_categories = Object.keys(config.buildings);
        var actual_building_category;
        var total_building_type = 0;

        for (var i = 0; i < all_building_categories.length; i++)
          if (Object.keys(config.buildings[all_building_categories[i]]).includes(building_category_name))
            actual_building_category = all_building_categories[i];

        var local_building_category = module.exports.getBuildingCategory(actual_building_category);

        //Fetch total_buildings
        for (var i = 0; i < city_obj.buildings.length; i++)
          if (
            (Object.keys(local_building_category).includes(city_obj.buildings[i].building_type) && !local_building_category.disable_slots) ||
            (local_building_category.disable_slots && city_obj.buildings[i].building_type == raw_building_name)
          ) {
            available_building_slots[1].total_buildings++;

            //Increment for total_building_type
            if (city_obj.buildings[i].building_type == raw_building_name)
              total_building_type++;
          }

        //Fetch total available slots in city for that building type
        if (building_obj.separate_building_slots) {
          available_building_slots[1].total_slots = (usr.modifiers[raw_building_name]) ?
            usr.modifiers[raw_building_name] :
            0;

          //Set total number of available_slots
          available_building_slots[1].available_slots =
            available_building_slots[1].total_slots -
            available_building_slots[1].total_buildings;
        } else if (building_obj.unlimited_slots) {
          available_building_slots[1].available_slots = -1;
          available_building_slots[1].total_slots = -1;
        } else {
          var actual_raw_building_category_name = module.exports.getBuildingCategory(actual_building_category, { return_key: true });

          available_building_slots[1].total_slots =
            returnSafeNumber(usr.modifiers[raw_building_name]) + usr.modifiers.extra_building_slots;

            available_building_slots[1].total_slots = Math.min(city_obj[`${actual_raw_building_category_name}_building_slots`] - available_building_slots[1].total_buildings, available_building_slots[1].total_slots);
          available_building_slots[1].available_slots =
            available_building_slots[1].total_slots -
            available_building_slots[1].total_buildings;
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
    console.time(`getProduction()`);

    //Convert from parameters
    var user_id = arg0_user;
    var good_type = (arg1_good) ? arg1_good : "all";

    //Declare local instance variables, corresponding functions
    var actual_id = main.global.user_map[user_id];
    var all_goods = lookup.all_good_names;
    var cities = getCities(user_id);
    var usr = main.users[actual_id];

    //Note that deep copies are made to make sure not to effect the actual user variable and to run a valid simulation to simply fetch values instead of alter them
    var goods_production = {};
    var virtual_usr = JSON.parse(JSON.stringify(usr));

    var virtual_inventory = virtual_usr.inventory;

    //Get all goods production by default, filter only if good_type is not set to "all"
    if (usr) {
      try {
        var all_buildings = lookup.all_buildings;
        var army_maintenance_obj = getArmyMaintenance(user_id);

        var all_army_maintenance_costs = Object.keys(army_maintenance_obj);

        for (var i = 0; i < cities.length; i++)
          //Iterate over all buildings in city
          for (var x = 0; x < cities[i].buildings.length; x++) {
            var building_obj = all_buildings[cities[i].buildings[x].building_type];
            var local_building = cities[i].buildings[x];
            var production_valid = true;
            var raw_building_name = cities[i].buildings[x].building_type;

            if (building_obj.maintenance || building_obj.produces) {
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
                    changeProductionValue(goods_production, `${all_maintenance_costs[y]}_upkeep`, "minimum", current_amount);
                    changeProductionValue(goods_production, `${all_maintenance_costs[y]}_upkeep`, "maximum", current_amount);
                  }

                  //Begin removing resources from virtual_inventory and virtual_user
                  (local_actual_material) ?
                    virtual_inventory[all_maintenance_costs[y]] -= current_amount :
                    virtual_usr[all_maintenance_costs[y]] -= current_amount;
                }

                //Check if production is valid
                production_valid = (local_checks >= all_maintenance_costs.length);
              }

              //Only produce if the building has the necessary resources to do so
              if (production_valid) {
                //Add building special_effect to total goods production array
                goods_production[`${raw_building_name}_special_effect`] = (goods_production[`${raw_building_name}_special_effect`]) ?
                  goods_production[`${raw_building_name}_special_effect`] + 1 :
                  1;

                var building_production = module.exports.getBuildingProduction(user_id, building_obj, cities[i]);

                //Add all_building_production to goods_production
                var all_building_production = Object.keys(building_production);

                for (var y = 0; y < all_building_production.length; y++) {
                  var current_amount = building_production[all_building_production[y]];

                  changeProductionValue(goods_production, all_building_production[y], "minimum", current_amount[0]);
                  changeProductionValue(goods_production, all_building_production[y], "maximum", current_amount[1]);
                }
              }
            }
          }

        //Subtract army maintenance
        for (var i = 0; i < all_army_maintenance_costs.length; i++) {
          var local_amount = army_maintenance_obj[all_army_maintenance_costs[i]];

          changeProductionValue(goods_production, `${all_army_maintenance_costs[i]}_upkeep`, "minimum", local_amount);
          changeProductionValue(goods_production, `${all_army_maintenance_costs[i]}_upkeep`, "maximum", local_amount);
        }

        //Check for special_effect
        if (good_type == "all")
          for (var i = 0; i < all_goods.length; i++) {
            var local_good = lookup.all_goods[all_goods[i]];

            if (local_good.special_effect) {
              changeProductionValue(goods_production, all_goods[i], "minimum", virtual_inventory[all_goods[i]] - getGoodAmount(user_id, all_goods[i]));
              changeProductionValue(goods_production, all_goods[i], "maximum", virtual_inventory[all_goods[i]] - getGoodAmount(user_id, all_goods[i]));
            }
          }
        else
          if (lookup.all_goods[good_type])
            if (lookup.all_goods[good_type].special_effect) {
              local_good.special_effect(virtual_usr);

              changeProductionValue(goods_production, good_type, "minimum", virtual_inventory[good_type] - getGoodAmount(user_id, good_type));
              changeProductionValue(goods_production, good_type, "maximum", virtual_inventory[good_type] - getGoodAmount(user_id, good_type));
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

    console.timeEnd(`getProduction()`);

    //Return statement
    return (good_type == "all") ?
      (Object.keys(goods_production).length > 0) ? goods_production : {} :
      (goods_production[good_type]) ? goods_production[good_type] : [0, 0];
  },

  /*
    getProductionChain() - Returns a special object mapping various stages of a good's production chain. Used recursively. Base production methods are referred to with the "base" key.

    Returns {
     steel: { //good
      building_1: { //building type
       base: { //production choice
        iron: -5,
        coal: -5,
        regular_steel: 5
       }
      }
      ..
    }
  */
  getProductionChain: function (arg0_user, arg1_good, arg2_used_goods) { //[WIP] - Finish function body
    //Convert from parameters
    var user_id = arg0_user;
    var good_key = arg1_good;
    var used_goods = (arg2_used_goods) ? arg2_used_goods : []; //Used for tracking which goods have already been appended to avoid infinite loops if they exist

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_building_keys = Object.keys(lookup.all_buildings);
    var production_chain_obj = {};
    var usr = main.users[actual_id];

    var capital_obj = getCapital(user_id);

    //Iterate over all buildings
    if (!used_goods.includes(good_key)) {
      var dependent_goods = [];

      //Initialise 1st layer good_key object
      if (!production_chain_obj[good_key]) production_chain_obj[good_key] = {};

      //Append buildings and relevant production choices to production_chain_obj
      for (var i = 0; i < all_building_keys.length; i++) {
        var building_obj = lookup.all_buildings[all_building_keys[i]];
        var local_production_obj = {};

        //Check if building_obj.produces has good_key, if so append an object with all production methods
        if (building_obj.produces) {
          var all_production_keys = Object.keys(building_obj.produces);
          var base_has_good = false;
          var valid_production_choices = [];

          for (var x = 0; x < all_production_keys.length; x++) {
            var local_subobj = building_obj.produces[all_production_keys[x]];

            if (all_production_keys[x].startsWith("production_choice_")) {
              //Production choice handling
              if (local_subobj[good_key])
                if (local_subobj[good_key] > 0)
                  valid_production_choices.push(all_production_keys[x].replace("production_choice_", ""));
            } else {
              if (all_production_keys[x] == good_key)
                if (local_subobj > 0)
                  base_has_good = true;
            }
          }

          if (base_has_good || valid_production_choices.length > 0) {
            //Append base if applicable
            if (base_has_good)
              local_production_obj.base = getProductionChoiceOutput({
                province_id: capital_obj.id,
                building_type: all_building_keys[i]
              });

            //Iterate over valid_production_choices and use getProductionChoiceOutput() with capital_obj to get proper produces output
            for (var x = 0; x < valid_production_choices.length; x++) {
              var local_production_choice_obj = getProductionChoiceOutput({
                province_id: capital_obj.id,
                building_type: all_building_keys[i],
                production_choice: valid_production_choices[x]
              });

              local_production_obj[valid_production_choices[x]] = local_production_choice_obj;
            }

            //Add local_production_obj (building production) to production_chain_obj[good_key]
            production_chain_obj[good_key][all_building_keys[i]] = local_production_obj;
          }
        }
      }

      //Fetch dependent_goods
      var good_production = production_chain_obj[good_key];

      var all_production_buildings = Object.keys(good_production);

      //Iterate over all_production_buildings and all_production_choices
      for (var i = 0; i < all_production_buildings.length; i++) {
        var local_building = good_production[all_production_buildings[i]];
        var all_production_choices = Object.keys(local_building);

        for (var x = 0; x < all_production_choices.length; x++) {
          var local_production_choice = local_building[all_production_choices[x]];
          var all_production_keys = Object.keys(local_production_choice);

          for (var y = 0; y < all_production_keys.length; y++) {
            if (lookup.all_goods[all_production_keys[y]] || all_production_keys[y] == "money")
              if (!dependent_goods.includes(all_production_keys[y])) {
                var local_good = lookup.all_goods[all_production_keys[y]];

                dependent_goods.push(all_production_keys[y]);

                //Category handling
                if (local_good)
                  if (local_good.type == "category") {
                    var all_subgoods = lookup.all_subgoods[all_production_keys[y]];

                    for (var z = 0; z < all_subgoods.length; z++)
                      if (!dependent_goods.includes(all_subgoods[z]))
                        dependent_goods.push(all_subgoods[z]);
                  }
              }
          }
        }
      }

      //Iterate over dependent_goods and recursively merge
      for (var i = 0; i < dependent_goods.length; i++)
        if (lookup.all_goods[dependent_goods[i]]) {
          var new_used_goods = JSON.parse(JSON.stringify(used_goods));

          //Push current good to new_used_goods
          new_used_goods.push(good_key);

          var local_production_chain = module.exports.getProductionChain(user_id, dependent_goods[i], new_used_goods);

          //Merge local_production_chain with production_chain_obj
          production_chain_obj = mergeObjects(production_chain_obj, local_production_chain);
        }
    }

    //Return statement
    return production_chain_obj;
  },

  /*
    getProductionChoiceOutput() - Returns a flattened good scope of produced goods.
    options: {
      province_id: "4407", - The province ID in which the building is located. Player modifiers are taken from the controller of the province if applicable, all production is negated if province is occupied
      building_object: {}, - Optional. Uses default options.building_type if not defined, and assumes full employment
      no_maintenance: true/false, - Optional. Whether or not to include maintenance in output calculations. False by default

      building_type: "lumberjacks", - Optional. Replaces building_object
      production_choice: "one" - Optional. The name of the production choice, excluding "production_choice_" prefix. If not defined, base scope is taken as production choice
    }
  */
  getProductionChoiceOutput: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var maintenance_obj = {};
    var produces_obj = {};
    var production_choice = (options.production_choice) ? options.production_choice : "";
    var raw_building_name = (options.building_object) ? options.building_object.building_type : getBuilding(options.building_type, { return_key: true });

    //Initialise local instance variables
    maintenance_obj = multiplyObject(module.exports.getProductionChoice(raw_building_name, production_choice, "maintenance"), -1);
    produces_obj = module.exports.getProductionChoice(raw_building_name, production_choice);

    //Check if province exists
    if (options.province_id) {
      var province_id = options.province_id;
      var province_obj = main.provinces[province_id];

      //Make sure province isn't currently occupied
      if (province_obj.controller)
        if (province_obj.controller == province_obj.owner) {
          var usr = main.users[province_obj.controller];

          var building_obj;
          var is_individual = (options.building_object);
          var modifiers = JSON.parse(JSON.stringify(usr.modifiers));

          //Initialise modifiers
          {
            //Override for local RGO throughput gain
            var province_rgo_throughput = getCityRGOThroughput(province_obj);

            //Remove modifiers
            delete modifiers.rgo_throughput;

            //Add local modifiers
            modifiers[`${province_obj.resource}_gain`] =
              (province_obj.resource && province_rgo_throughput) ? province_rgo_throughput : 1;
          }

          if (is_individual) {
            //This has a verbatim building_object we're talking about
            var local_building = options.building_object;

            building_obj = lookup.all_buildings[local_building.building_type];

            produces_obj = module.exports.applyProduction(produces_obj, {
              config_object: building_obj,
              current_scope: { name: "produces" },
              province_id: province_obj.id,

              modifiers: modifiers
            });

            //Account for maintenance
            if (!do_not_display)
              produces_obj = mergeObjects(produces_obj, maintenance_obj);
          } else {
            //This is a generic building; assume full employment
            building_obj = module.exports.getBuilding(options.building_type);

            produces_obj = module.exports.applyProduction(produces_obj, {
              config_object: building_obj,
              current_scope: { name: "produces" },
              province_id: province_obj.id,

              modifiers: modifiers
            });

            //Account for maintenance
            if (!options.no_maintenance)
              produces_obj = mergeObjects(produces_obj, maintenance_obj);
          }
        }
    }

    //Return statement
    return produces_obj;
  },

  getProductionChoice: function (arg0_building, arg1_production_choice, arg2_maintenance_production) {
    //Convert from parameters
    var building_name = arg0_building;
    var production_choice = arg1_production_choice.trim().toLowerCase();
    var maintenance_production = (arg2_maintenance_production) ? arg2_maintenance_production : "produces";

    //Declare local instance variables
    var building_obj = module.exports.getBuilding(building_name);
    var found_production_choice_obj = false;
    var production_choice_obj = {};

    //Find production_choice_<key>
    if (building_obj[maintenance_production]) {
      var all_production_keys = Object.keys(building_obj[maintenance_production]);

      for (var i = 0; i < all_production_keys.length; i++)
        if (all_production_keys[i].startsWith("production_choice_")) {
          var local_subobj = building_obj[maintenance_production][all_production_keys[i]];
          var production_choice_name = all_production_keys[i].replace("production_choice_", "");

          if (production_choice_name == production_choice) {
            found_production_choice_obj = true;
            production_choice_obj = JSON.parse(JSON.stringify(local_subobj));
          }
        }

      //If found_production_choice_obj could not be found, reduce to base scope and strip production_choice_ and reserved.production_choice keys
      if (!found_production_choice_obj) {
        production_choice_obj = JSON.parse(JSON.stringify(building_obj[maintenance_production]));

        for (var i = 0; i < all_production_keys.length; i++) {
          if (all_production_keys[i].startsWith("production_choice_"))
            delete production_choice_obj[all_production_keys[i]];
          if (reserved.production_choice.includes(all_production_keys[i]))
            delete production_choice_obj[all_production_keys[i]];
        }
      }
    }

    //Return statement
    return production_choice_obj;
  },

  getProductionChoiceKey: function (arg0_building, arg1_production_choice) {
    //Convert from parameters
    var building_type = arg0_building;
    var production_choice_name = arg1_production_choice;

    //Declare local instance variables
    var config_obj = lookup.all_buildings[building_type];
    var production_choice_key = [false, ""]; //[key_exists, key_name];

    if (typeof production_choice_name == "object") return production_choice_name; //Object guard clause

    //Iterate over all produces keys if they exist
    if (config_obj)
      if (config_obj.produces) {
        var all_production_keys = Object.keys(config_obj.produces);
        production_choice_name = production_choice_name.toLowerCase().trim();

        //Key search - Soft
        for (var i = 0; i < all_production_keys.length; i++)
          if (all_production_keys[i].startsWith("production_choice_"))
            if (all_production_keys[i].replace("production_choice_", "").toLowerCase().trim().indexOf(production_choice_name) != -1)
              production_choice_key = [true, all_production_keys[i].replace("production_choice_", "")];
        //Key search - Hard
        for (var i = 0; i < all_production_keys.length; i++)
          if (all_production_keys[i].startsWith("production_choice_"))
            if (all_production_keys[i].replace("production_choice_", "").toLowerCase().trim() == production_choice_name)
              production_choice_key = [true, all_production_keys[i].replace("production_choice_", "")];

        //Name search - Soft
        for (var i = 0; i < all_production_keys.length; i++)
          if (all_production_keys[i].startsWith("production_choice_")) {
            var local_production_choice = config_obj.produces[all_production_keys[i]];
            var trimmed_string = all_production_keys[i].replace("production_choice_", "");

            var local_name = (!local_production_choice.name) ?
              parseString(trimmed_string) : local_production_choice.name;

            if (local_name.toLowerCase().trim().indexOf(production_choice_name) != -1)
              production_choice_key = [true, trimmed_string];
          }

        //Name search - Hard
        for (var i = 0; i < all_production_keys.length; i++)
          if (all_production_keys[i].startsWith("production_choice_")) {
            var local_production_choice = config_obj.produces[all_production_keys[i]];
            var trimmed_string = all_production_keys[i].replace("production_choice_", "");

            var local_name = (!local_production_choice.name) ?
              parseString(trimmed_string) : local_production_choice.name;

            if (local_name.toLowerCase().trim() == production_choice_name)
              production_choice_key = [true, trimmed_string];
          }

        //Return statement
        return (production_choice_key[0]) ? production_choice_key[1] : undefined;
      }
  },

  getProductionObject: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_produced_goods = [];
    var all_production = module.exports.getProduction(user_id);
    var all_unprocessed_goods = Object.keys(all_production);
    var sorted_goods_cache = [];
    var usr = main.users[actual_id];

    //Sort goods first
    for (var i = 0; i < all_unprocessed_goods.length; i++) {
      var local_good = lookup.all_goods[all_unprocessed_goods[i]];

      (local_good) ?
        sorted_goods_cache.push([(local_good.name) ? local_good.name : all_unprocessed_goods[i], all_unprocessed_goods[i]]) :
        sorted_goods_cache.push([all_unprocessed_goods[i], all_unprocessed_goods[i]]);
    }

    sorted_goods_cache.sort(); //Only the first element in a nested array is sorted

    for (var i = 0; i < sorted_goods_cache.length; i++)
      all_produced_goods.push(sorted_goods_cache[i][1]);

    for (var i = 0; i < all_produced_goods.length; i++) {
      var local_good = lookup.all_goods[all_produced_goods[i]];
      var local_value = all_production[all_produced_goods[i]];

      if (local_good) {
        //Deduct upkeep from good production
        if (Array.isArray(local_value)) {
          var upkeep_array = (all_production[`${all_produced_goods[i]}_upkeep`]) ?
            all_production[`${all_produced_goods[i]}_upkeep`] :
            [0, 0];

          upkeep_array.sort(function (a, b) { return a - b; });

          all_production[all_produced_goods[i]] = [
            local_value[0] - upkeep_array[1],
            local_value[1] - upkeep_array[0],
          ].sort(function (a, b) { return a - b; });
        }
      }
    }

    //Make sure _upkeep keys are cloned to regular good if regular good doesn't exist
    var all_production_keys = Object.keys(all_production);

    for (var i = 0; i < all_production_keys.length; i++)
      if (all_production_keys[i].includes("_upkeep"))
        if (!all_production[all_production_keys[i].replace("_upkeep", "")]) {
          var new_value = all_production[all_production_keys[i]];

          //Invert upkeep since it's not production
          for (var x = 0; x < new_value.length; x++) new_value[x] = new_value[x]*-1;

          all_production[all_production_keys[i].replace("_upkeep", "")] = new_value;
        }

    //Return statement
    return all_production;
  },

  getStartingStockpile: function (arg0_building) {
    //Convert from parameters
    var building_name = arg0_building;

    //Declare local instance variables
    var building_obj = (typeof building_name != "object") ? lookup.all_buildings[building_name.trim().toLowerCase()] : building_name;
    var starting_money_stockpile = config.defines.economy.starting_money_stockpile;

    //Check money cost
    if (building_obj.cost)
      if (building_obj.cost.money)
        if (config.defines.economy.starting_money_multiplier != 0)
          starting_money_stockpile = building_obj.cost.money*config.defines.economy.starting_money_multiplier;

    //Return statement
    return starting_money_stockpile;
  },

  getTotalBuildings: function (arg0_city_name, arg1_building_name) {
    //Convert from parameters
    var city_name = (typeof arg0_city_name != "object") ? arg0_city_name.toLowerCase().trim() : arg0_city_name;
    var building_name = arg1_building_name.toLowerCase().trim();

    //Declare local instance variables
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var raw_building_name = module.exports.getBuilding(building_name, { return_key: true });
    var total = 0;

    //Iterate over all buildings in province
    if (city_obj)
      for (var i = 0; i < city_obj.buildings.length; i++)
        if (city_obj.buildings[i].building_type == raw_building_name)
          total++;

    //Return statement
    return total;
  },

  hasProductionChoice: function (arg0_building_obj) {
    //Convert from parameters
    var building_obj = arg0_building_obj;

    //Declare local instance variables
    var config_obj = lookup.all_buildings[building_obj.building_type];

    if (config_obj.produces) {
      var all_production_keys = Object.keys(config_obj.produces);

      for (var i = 0; i < all_production_keys.length; i++)
        if (all_production_keys[i].startsWith("production_choice_"))
          return true;
    }
  },

  parseProduction: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var production_obj = module.exports.getProduction(user_id);
    var usr = main.users[actual_id];
    var virtual_inventory = {};
    var virtual_user = JSON.parse(JSON.stringify(usr));

    var all_produced_goods = Object.keys(production_obj);

    //Iterate over all goods; transform into min, max arrays
    for (var i = 0; i < lookup.all_good_names.length; i++)
      virtual_inventory[lookup.all_good_names[i]] = [0, 0];
    virtual_inventory.money = [0, 0];

    //Iterate over all_produced_goods
    for (var i = 0; i < all_produced_goods.length; i++) {
      var local_value = production_obj[all_produced_goods[i]];

      //Process upkeep
      if (all_produced_goods[i].includes("_upkeep")) {
        var upkeep_to_process = all_produced_goods[i].replace("_upkeep", "");

        virtual_inventory[upkeep_to_process] = (virtual_inventory[upkeep_to_process]) ?
          [
            virtual_inventory[upkeep_to_process][0] - local_value[1],
            virtual_inventory[upkeep_to_process][1] - local_value[0]
          ] :
          [
            local_value[1]*-1,
            local_value[0]*-1
          ];
      } else if (all_produced_goods[i].includes("_special_effect")) {
        //Process special effects
        var special_effect_to_process = all_produced_goods[i].replace("_special_effect", "");

        var building_obj = getBuilding(special_effect_to_process);

        if (building_obj.special_effect)
          building_obj.special_effect(virtual_user);
      } else {
        if (virtual_inventory[all_produced_goods[i]])
          virtual_inventory[all_produced_goods[i]] = (virtual_inventory[all_produced_goods[i]]) ?
            [
              virtual_inventory[all_produced_goods[i]][0] + local_value[0],
              virtual_inventory[all_produced_goods[i]][1] + local_value[1]
            ] :
            [
              local_value[0],
              local_value[1]
            ];
      }
    }

    //Check for any inventory changes
    var all_inventory_goods = Object.keys(virtual_user.inventory);

    for (var i = 0; i < all_inventory_goods.length; i++) {
      var local_simulation_value = returnSafeNumber(virtual_user.inventory[all_inventory_goods[i]]);
      var local_true_value = getGoodAmount(user_id, all_inventory_goods[i]);

      if (local_simulation_value != local_true_value) {
        var local_change = local_simulation_value - local_true_value;

        //Add to virtual_inventory
        virtual_inventory[all_inventory_goods[i]] = (virtual_inventory[all_inventory_goods[i]]) ?
          [
            virtual_inventory[all_inventory_goods[i]][0] + local_change,
            virtual_inventory[all_inventory_goods[i]][1] + local_change
          ] :
          [
            local_change,
            local_change
          ];
      }
    }

    //Add income
    var user_income = getIncome(virtual_user, production_obj);

    virtual_inventory.money[0] += user_income[0];
    virtual_inventory.money[1] += user_income[1];

    //Return statement
    return virtual_inventory;
  },

  refreshBuildingNames: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province;

    //Declare local instance variables
    var building_count = {};
    var province_obj = main.provinces[province_id];

    if (province_obj.buildings)
      for (var i = 0; i < province_obj.buildings.length; i++) {
        var local_building = province_obj.buildings[i];

        var building_obj = getBuilding(local_building.building_type);

        modifyValue(building_count, local_building.building_type, 1);
        local_building.name = `${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`} ${(building_obj.name) ? building_obj.name : local_building.building_type} #${building_count[local_building.building_type]}`;
      }
  },

  /*
    sortBuildings() - Sorts a province array of buildings by mode: "alphabetical", "numeric", "cash_reserves", "category", "employment"
  */
  sortBuildings: function (arg0_building_array, arg1_mode) { //[WIP] - Finish function body
    //Convert from parameters
    var building_array = arg0_building_array;
    var mode = (arg1_mode) ? arg1_mode.trim().toLowerCase() : "category";

    //Declare local instance variables
    var building_array = [];
    var building_count = {};
    var province_obj = main.provinces[province_id];

    if (building_array) {
      //Initialise building_count
      for (var i = 0; i < building_array.length; i++)
        modifyValue(building_count, building_array[i].building_type, 1);

      for (var i = 0; i < building_array.length; i++) {
        var total_employees = 0;

        if (building_array[i].employment) {
          var all_employment_keys = Object.keys(building_array[i].employment);

          //Cash reserves
          if (building_array[i].stockpile)
            building_array[i].cash_reserves = returnSafeNumber(building_array[i].cash_reserves);
          if (!building_array[i].cash_reserves) building_array[i].cash_reserves = 0;

          //Category
          building_array[i].category = lookup.all_buildings_categories[building_array[i].building_type];

          //Employment
          for (var x = 0; x < all_employment_keys.length; x++)
            total_employees += returnSafeNumber(building_array[i].employment[all_employment_keys[x]]);
          building_array[i].total_employees = total_employees;

          //Number
          building_array[i].building_count = building_count[building_array[i].building_type];
        }
      }

      //Sort object
      if (mode == "alphabetical") {
        building_array.sort((a, b) => {
          var building_name_a = (a.name) ? a.name.toLowerCase() : a.id;
          var building_name_b = (b.name) ? b.name.toLowerCase() : b.id;

          if (building_name_a < building_name_b) return -1;
          if (building_name_a > building_name_b) return 1;
          return 0;
        });
      } else if (mode == "numeric") {
        building_array.sort((a, b) => {
          return b.building_count - a.building_count;
        });
      } else if (mode == "cash_reserves") {
        building_array.sort((a, b) => {
          return b.cash_reserves - a.cash_reserves;
        });
      } else if (mode == "category") {
        building_array.sort((a, b) => {
          var building_category_a = a.category;
          var building_category_b = b.category;

          if (building_category_a < building_category_b) return -1;
          if (building_category_a > building_category_b) return 1;
          return 0;
        });
      } else if (mode == "chronological") {
        building_array.sort((a, b) => {
          return a.order - b.order;
        });
      } else if (mode == "employment") {
        building_array.sort((a, b) => {
          return b.total_employees - a.total_employees;
        });
      }

      //Remove attributes you just sorted by
      for (var i = 0; i < building_array.length; i++) {
        delete building_array[i].building_count;
        delete building_array[i].cash_reserves;
        delete building_array[i].category;
        delete building_array[i].total_employees;
      }
    }

    //Return statement
    return building_array;
  }
};
