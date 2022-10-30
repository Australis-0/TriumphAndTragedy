module.exports = {
  /*
    createUserGraph() - Creates a new user graph from options
    options: {
      army_size: 0, - Whatever the army size is. 0 by default
      avoid_attrition: true/false - true by default
    }
  */
  createUserGraph: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var army_size = returnSafeNumber(options.army_size);
    var local_graph = global.bn_graph();

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];
      var valid_province = false;

      //Check if province is uncolonised
      valid_province = (local_province.controller) ? true : valid_province;

      if (local_province.controller) {
        //Check for alliances, military access, vassalage, or being at war
        if (usr.options.avoid_territorial_violation != "never") {
          var vassal_obj = getVassal(local_province.controller);

          valid_province = (hasAlliance(actual_id, local_province.controller)) ? true : valid_province;
          valid_province = (hasMilitaryAccess(actual_id, local_province.controller)) ? true : valid_province;
          valid_province = (at_war.includes(local_province.controller)) ? true : valid_province;

          if (vassal_obj)
            if (vassal_obj.overlord)
              valid_province = true;
        } else {
          valid_province = true;
        }

        var local_supply = returnSafeNumber(local_province.supply_limit*1000, 0);

        if (options.avoid_attrition != "never")
          if (getTroopsInProvince(all_provinces[i]) + army_size > local_supply)
            valid_province = false;

        if (valid_province)
          for (var x = 0; x < local_province.adjacencies.length; x++)
            local_graph.addLink(all_provinces[i], local_province.adjacencies[x], { weight: 1 });
      }
    }

    //Return statement
    return local_graph;
  },

  deleteCountry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user; //User to be deleted

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_cultures = Object.keys(main.global.cultures);
    var all_mapped_users = Object.keys(main.global.user_map);
    var all_provinces = module.exports.getProvinces(actual_id, { include_occupations: true, include_hostile_occupations: true });
    var usr = main.users[actual_id];

    //Remove all occupations
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller != all_provinces[i].owner)
        all_provinces[i].controller = all_provinces[i].owner;

    //Clear all blockades
    deleteBlockade(actual_id);

    //Cultural handler
    for (var i = 0; i < all_cultures.length; i++) {
      var local_culture = main.global.cultures[all_cultures[i]];

      removeElement(local_culture.primary_culture, actual_id);
      removeElement(local_culture.accepted_culture, actual_id);
    }

    //Occupation handler
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller != all_provinces[i].owner)
        all_provinces[i].controller = all_provinces[i].owner;

    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller == actual_id) {
        var all_subkeys = Object.keys(all_provinces[i]);

        for (var x = 0; x < all_subkeys.length; x++)
          if (!config.defines.common.default_keys.includes(all_subkeys[x]))
            delete all_provinces[i][all_subkeys[x]];
      }

    //Remove all diplomatic relations and delete user object
    destroyAllDiplomaticRelations(actual_id);

    //Remove all connections in user map
    for (var i = 0; i < all_mapped_users.length; i++)
      if (main.global.user_map[all_mapped_users[i]] == actual_id)
        delete main.global.user_map[all_mapped_users[i]];

    delete main.users[actual_id];
  },

  generateColonisationColour: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var iterations = 0;
    var new_colour;
    var usr = main.users[actual_id];

    var all_expeditions = Object.keys(usr.expeditions);

    //Generate random colour
    while (iterations < 15) {
      new_colour = [
        usr.colour[0] + randomNumber(5, 20),
        usr.colour[1] + randomNumber(5, 20),
        usr.colour[2] + randomNumber(5, 20)
      ];

      for (var i = 0; i < all_expeditions.length; i++) {
        var local_expedition = usr.expeditions[all_expeditions[i]];

        if (
          local_expedition.colour[0] != new_colour[0] ||
          local_expedition.colour[1] != new_colour[1] ||
          local_expedition.colour[2] != new_colour[2]
        )
          break;
      }

      //Break after 15 iterations
      iterations++;
    }

    return new_colour;
  },

  //getAverageTechCount() - Fetches average tech count from all users
  getAverageTechCount: function () {
    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var tech_sum = 0;

    //Iterate over all users and sum
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      tech_sum += local_user.researched_technologies.length;
    }

    //Return statement
    return tech_sum/all_users.length;
  },

  getCapital: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_cities = module.exports.getCities(user_id, {
      include_hostile_occupations: true
    });

    for (var i = 0; i < all_cities.length; i++)
      if (all_cities[i].city_type == "capital")

        //Return statement
        return all_cities[i];
  },

  /*
    getCities() - Returns an array list of urban province objects from selected users.
    options: {
      include_hostile_occupations: true/false, - Includes occupations by other users of the target user
      include_occupations: true/false - Includes occupations by the target user
    }
  */
  getCities: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_owned_cities = [];
    var usr = main.users[user_id];

    try {
      for (var i = 0; i < all_provinces.length; i++)
        //Check to make sure province is a valid city
        if (main.provinces[all_provinces[i]].type == "urban")
          if (
            //Complex boolean to parse options field; core cities
            (main.provinces[all_provinces[i]].owner == user_id &&
            (main.provinces[all_provinces[i]].controller == user_id ||
                options.include_hostile_occupations
            )) ||

            //Complex boolean to parse options field; cities occupied by user
            (main.provinces[all_provinces[i]].controller == user_id && options.include_occupations)

            //Push if any of these options are valid. Geez. This is messy
          ) all_owned_cities.push(main.provinces[all_provinces[i]]);

      //Sort cities by capital; population
      var capital_index;

      all_owned_cities.sort(function (a, b) {
        return b.population - a.population;
      });

      //Look for core capital and move it to the zeroth index if possible
      for (var i = 0; i < all_owned_cities.length; i++)
        if (all_owned_cities[i].city_type == "capital" && all_owned_cities[i].owner == user_id)
          capital_index = i;

      if (capital_index)
        moveElement(all_owned_cities, capital_index, 0);

      //Return statement
      return all_owned_cities;
    } catch (e) {
      log.error(`getCities() - ran into an error with User ID ${user_id}: ${e}`);
    }
  },

  getCitiesCap: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var calculated_cap = 0;
    var city_caps = config.defines.economy.city_unlock_caps;
    var usr = main.users[user_id];

    //Iterate over city_unlock_caps to check for certain province bounds
    for (var i = 0; i < city_caps.length; i++) {
      var next_bound = city_caps[i+1];

      if (next_bound)
        if (usr.provinces >= city_caps[i] && usr.provinces < next_bound)
          calculated_cap = i+1;
      if (!next_bound)
        if (usr.provinces >= city_caps[i])
          calculated_cap = i+1;
    }

    //Return statement
    return (city_caps.length > 0) ? calculated_cap : usr.provinces;
  },

  /*
    getCity() - Returns a city object from a set of selected users. All by default.
    options: {
      users: ["user_id_1", "user_id_2"] - Find a city from this set of users
    }
  */
  getCity: function (arg0_name, arg1_options) {
    //Convert from parameters; initialise options
    var city_name = arg0_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};
    options.users = (options.users) ? getList(options.users) : ["all"];

    //Declare local instance variables
    var all_users = (options.users.includes("all")) ? Object.keys(main.users) : options.users;
    var city_exists = [false, ""]; //[city_exists, city_obj];

    //Iterate over all users and their respective cities - Soft match first
    for (var i = 0; i < all_users.length; i++) {
      var local_cities = getCities(all_users[i]);

      for (var x = 0; x < local_cities.length; x++)
        if (local_cities[x].name.toLowerCase().indexOf(city_name) != -1)
          city_exists = [true, local_cities[x]];
    }

    //Iterate over all users and their respective cities - Hard match second
    for (var i = 0; i < all_users.length; i++) {
      var local_cities = getCities(all_users[i]);

      for (var x = 0; x < local_cities.length; x++)
        if (local_cities[x].name.toLowerCase() == city_name)
          city_exists = [true, local_cities[x]];
    }

    //Return statement if city is found
    return (city_exists[0]) ? city_exists[1] : main.provinces[city_name];
  },

  getCityPopGrowth: function (arg0_name, arg1_options) {
    //Convert from parameters
    var city_name = arg0_name;
    var options = (arg1_options) ? arg1_options : { pop_type: "all" };

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var total_growth = 0;
    var usr = main.users[city_obj.controller];

    //Calcualte total growth
    if (options.pop_type == "all") {
      for (var i = 0; i < all_pops.length; i++)
        total_growth += Math.ceil(
          city_obj.pops[all_pops[i]]*
          module.exports.getCityPopGrowthRate(city_obj, { pop_type: all_pops[i] })
        );
    } else {
      total_growth = Math.ceil(
        city_obj.pops[options.pop_type]*
        module.exports.getCityPopGrowthRate(city_obj, { pop_type: options.pop_type })
      );
    }

    //Return statement
    return total_growth;
  },

  /*
    getCityPopGrowthRate() - Returns the decimal percentage growth of a given city.
    options: {
      pop_type: "workers" - The pop type to calculate growth for. Defaults to 'all'
    }
  */
  getCityPopGrowthRate: function (arg0_name, arg1_options) {
    //Convert from parameters
    var city_name = arg0_name;
    var options = (arg1_options) ? arg1_options : { pop_type: "all" };

    //Declare local instance variables
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var scalar = 1;
    var usr = main.users[city_obj.controller];

    var local_growth_modifier = (options.pop_type != "all") ?
      usr.pops[`${options.pop_type}_growth_modifier`] : 1;

    //Local pop growth logic
    {
      //Calculate scalar
      if (city_obj.pops.population > config.defines.economy.urban_pop_growth_penalty_threshold) //-3% per million
        scalar -= Math.ceil(
          (city_obj.pops.population - config.defines.economy.urban_pop_growth_penalty_threshold)/1000000
        )*config.defines.economy.urban_pop_growth_penalty_per_million;

      //Calculate urban pop growth rate for chosen pop
      var local_pop_growth_rate = (
        local_growth_modifier*
        scalar*
        usr.modifiers.pop_growth_modifier
      );

      //Set local pop growth cap from economy defines
      var urban_growth_cap;
      for (var y = 0; y < config.defines.economy.urban_pop_growth_cap.length; y++) {
        var local_element = config.defines.economy.urban_pop_growth_cap[y];

        if (city_obj.pops.population >= local_element[0])
          urban_growth_cap = local_element[1];
      }

      if (urban_growth_cap)
        local_pop_growth_rate = Math.min(local_pop_growth_rate, urban_growth_cap);

      //Cap to maximum
      if (config.defines.economy.urban_pop_maximum_growth_rate)
        local_pop_growth_rate = Math.min(local_pop_growth_rate, config.defines.economy.urban_pop_maximum_growth_rate);

      //Occupation penalty
      if (city_obj.controller != city_obj.owner)
        local_pop_growth_rate = local_pop_growth_rate*config.defines.economy.occupation_pop_growth_penalty;

      //Make sure population can't drop by more than 100%
      if (local_pop_growth_rate < -1)
        local_pop_growth_rate = local_pop_growth_rate % 1;
    }

    //Return statement
    return local_pop_growth_rate;
  },

  getCityRGOThroughput: function (arg0_name) {
    //Convert from parameters
    var city_name = arg0_name;

    //Declare local instance variables
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var usr = main.users[city_obj.controller];

    return returnSafeNumber(
      (1 + usr.modifiers.rgo_throughput) +
        (
          returnSafeNumber(city_obj.supply_limit, 0)/
          config.defines.economy.supply_limit_rgo_modifier
        )*0.01
    , 1);
  },

  getColonisationSpeed: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Ddeclare local instance variables
    var usr = main.users[user_id];

    //Return statement
    return Math.ceil(
      config.defines.combat.colonisation_speed*usr.modifiers.colonist_travel_speed
    );
  },

  getDevelopmentCost: function (arg0_user, arg1_name, arg2_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_name.toLowerCase();
    var amount = (arg2_amount) ? parseInt(arg2_amount) : 1;

    //Declare local instance variables
    var cached_amount = 0;
    var city_obj = (!main.provinces[city_name]) ? getCity(city_name) : main.provinces[city_name];
    var usr = main.users[user_id];

    //Declare local tracker variables
    if (usr.total_cities < 1)
      usr.total_cities += getCities(user_id, { include_hostile_occupations: true }).length;

    var average_cities = Math.ceil(usr.total_cities/Math.max(usr.country_age, 1));
    var pc_price = 0;

    for (var i = 0; i < amount; i++) {
      //Increment cached_amount to ensure recursion
      cached_amount++;

      pc_price += Math.floor(config.defines.economy.urbanisation_cost*Math.pow(config.defines.economy.urbanisation_cost_percentile_growth, city_obj.development + cached_amount)*average_cities);
    }

    //Return statement
    return pc_price;
  },

  //Fetches user income before production costs
  getIncome: function (arg0_user, arg1_production) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_production = arg1_production;

    //Declare local instance variables
    var calculated_income = 0;
    var usr = main.users[user_id];

    //Declare local tracker variables
    var civilian_actions = Math.ceil(usr.actions*usr.modifiers.civilian_actions);

    //Regular error trapping just in case!
    try {
      var total_production = (!raw_production) ? getProduction(user_id) : raw_production;

      var total_maintenance = [
        (total_production.money_upkeep) ? total_production.money_upkeep[0] : 0,
        (total_production.money_upkeep) ? total_production.money_upkeep[1] : 0
      ].sort(function (a, b) { return a - b });

      calculated_income = Math.ceil(
          (usr.actions - civilian_actions)
        *config.defines.economy.money_per_action
        *usr.tax_rate
        *usr.modifiers.tax_efficiency
      ) - module.exports.getUnitUpkeep(user_id);

      return [calculated_income - total_maintenance[0], calculated_income - total_maintenance[1]];
    } catch (e) {
      log.error(`getIncome() ran into an error whilst processing User ID: ${user_id}: ${e}.`);
      console.log(e);
    }
  },

  getProvince: function (arg0_province) {
    //Convert from parameters
    var province_id = arg0_province;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);

    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i] == province_id) {
        //Set ID tracker variable just in case
        var local_province = main.provinces[all_provinces[i]];
        local_province.id = all_provinces[i];

        //Return statement if province is found
        return local_province;
      }
  },

  /*
    getProvinces() - Returns an array of provinces for a certain user based on certain options.
    options: {
      include_hostile_occupations: true/false, - Includes occupations by other users of the target user
      include_occupations: true/false, - Includes occupations by the target user
      return_keys: true/false - Whether to return the keys of the provinces instead of the object
    }
  */
  getProvinces: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_owned_provinces = [];
    var usr = main.users[user_id];

    try {
      for (var i = 0; i < all_provinces.length; i++)
        if (
          (
            //Complex boolean to parse options field; core provinces
            (main.provinces[all_provinces[i]].owner == user_id &&
                (
                  main.provinces[all_provinces[i]].controller == user_id || options.include_hostile_occupations
                )
            ) ||

            //Complex boolean to parse options field; provinces occupied by user
            (main.provinces[all_provinces[i]].controller == user_id && options.include_occupations)
          ) &&

          //Exclude cities if exclude_cities is set to true
          (
            options.exclude_cities && main.provinces[all_provinces[i]].type != "urban" ||
            !options.exclude_cities
          ) &&

          //Make sure uncolonised provinces don't get in
          (
            main.provinces[all_provinces[i]].owner &&
            main.provinces[all_provinces[i]].controller
          )

          //Push if any of these options are valid
        ) all_owned_provinces.push((!options.return_keys) ? main.provinces[all_provinces[i]] : all_provinces[i]);

      //Return statement
      return all_owned_provinces;
    } catch (e) {
      log.error(`getProvinces() - ran into an error with User ID ${user_id}: ${e}.`)
    }
  },

  getProvincesInRange: function (arg0_province_id, arg1_distance) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var distance = parseInt(arg1_distance);

    //Declare local instance variables
    var dead_province_cache = [];
    var new_province_cache = [province_id];
    var province_cache = [province_id];

    for (var i = 0; i < distance; i++) {
      //Push everything in dead_province_cache to province_cache
      for (var x = 0; x < dead_province_cache.length; x++)
        if (!province_cache.includes(dead_province_cache[x]))
          province_cache.push(dead_province_cache[x]);

      //Move old new_province_cache to dead_province_cache
      dead_province_cache = JSON.parse(JSON.stringify(new_province_cache));
      new_province_cache = [];

      for (var x = 0; x < dead_province_cache.length; x++) {
        var local_province = main.provinces[dead_province_cache[x]];

        if (local_province)
          if (local_province.adjacencies)
            for (var y = 0; y < local_province.adjacencies.length; y++)
              if (!new_province_cache.includes(local_province.adjacencies[y]))
                new_province_cache.push(local_province.adjacencies[y]);
      }
    }

    //Push anything remaining in new_province_cache to province_cache
    for (var i = 0; i < new_province_cache.length; i++)
      if (!province_cache.includes(new_province_cache[i]))
        province_cache.push(new_province_cache[i]);

    //Return statement
    return province_cache;
  },

  getTotalSoldiers: function (arg0_user) { //Needs to account for mobilised soldiers
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var total_sum = 0;
    var usr = main.users[actual_id];

    //Check how many total soldiers in all military pops there are
    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].military_pop)
        total_sum += usr.pops[`used_${all_pops[i]}`];

    //Add mobilised soldiers to the count
    if (usr.mobilisation.is_mobilised)
      total_sum += usr.mobilisation.current_manpower_mobilised;

    //Return statement
    return total_sum;
  },

  getUnitUpkeep: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return (
      Math.ceil(module.exports.getTotalSoldiers(actual_id)/100)*
        config.defines.combat.unit_upkeep*usr.modifiers.army_upkeep
    );
  },

  //getWars() - Returns array of all war objects user is in
  getWars: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];
    var all_wars = Object.keys(main.global.wars);
    var user_wars = [];

    //Iterate across wars to create list
    for (const war of all_wars) {
      var local_war = main.global.wars[war];
      if (local_war.attackers.includes(actual_id) || local_war.defenders.includes(actual_id))
        user_wars.push(local_war);
    }

    return user_wars;
  },

  hasWargoal: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var usr = main.users[user_id];
    var ot_user = main.users[ot_user_id];

    //Iterate over all wargoals to check
    for (var i = 0; i < usr.diplomacy.wargoals.length; i++) {
      var local_wargoal = usr.diplomacy.wargoals[i];

      if (local_wargoal.target == ot_user_id)
        return true;
    }
  },

  //inherit() - Completely annexes a target nation into another
  inherit: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user; //User to be annexed
    var ot_user_id = arg1_user; //Recipient user

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var all_cultures = Object.keys(main.global.cultures);
    var all_mapped_users = Object.keys(main.global.user_map);

    //Annex all provinces
    var all_provinces = module.exports.getProvinces(actual_id, { include_occupations: true, include_hostile_occupations: true });

    //Cultural handler
    for (var i = 0; i < all_cultures.length; i++) {
      var local_culture = main.global.cultures[all_cultures[i]];

      removeElement(local_culture.primary_culture, actual_id);
      removeElement(local_culture.accepted_culture, actual_id);
    }

    //Occupation handler
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller != all_provinces[i].owner)
        all_provinces[i].controller = all_provinces[i].owner;

    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller == actual_id)
        transferProvince(actual_id, { target: actual_ot_user_id, province_id: all_provinces[i].id });

    //Remove all diplomatic relations and delete user object
    destroyAllDiplomaticRelations(actual_id);
    deleteCountry(actual_id);

    //Remove all connections in user map
    for (var i = 0; i < all_mapped_users.length; i++)
      if (main.global.user_map[all_mapped_users[i]] == actual_id)
        delete main.global.user_map[all_mapped_users[i]];

    delete main.users[actual_id];
  },

  isBeingJustifiedOn: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_users = Object.keys(main.users);

    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      try {
        for (var x = 0; x < local_user.diplomacy.justifications.length; x++) {
          var local_justification = local_user.diplomacy.justifications[x];

          if (local_justification.target == user_id)
            return true;
        }
      } catch {}
    }
  },

  isBlockaded: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var usr = main.users[user_id];

    //Return statement
    if (usr.blockaded)
      if (Object.keys(usr.blockaded).length > 0)
        if (usr.blockaded.is_blockaded)
          return true;
  },

  isJustifying: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var usr = main.users[user_id];
    var ot_user = main.users[ot_user_id];

    //Check for justification against ot_user
    for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
      var local_justification = usr.diplomacy.justifications[i];

      if (local_justification.target == ot_user_id)
        return true;
    }
  },

  moveTo: function (arg0_province, arg1_province) {
    //Convert from parameters
    var starting_province = arg0_province;
    var ending_province = arg1_province;

    try {
      var pathfinder = bn_path.aStar(graph, {
        distance(fromNode, toNode, link) {
          return link.data.weight;
        }
      });

      var connections = [];
      var path = pathfinder.find(ending_province, starting_province);

      for (var i = 0; i < path.length; i++)
        connections.push(path[i].id);

      //Parse connections
      for (var i = 0; i < connections.length; i++)
        if (isNaN(parseInt(connections[i])))
          connections.splice(i, 1);

      //Return connections
      return connections;
    } catch (e) {
      log.error(`moveTo() ran into an exception when trying to find a path between Province ID ${starting_province} and Province ID ${ending_province}! ${e}`);

      //Return statement
      return [starting_province, ending_province];
    }
  },

  smartMove: function (arg0_user, arg1_army_name, arg2_starting_province, arg3_ending_province) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();
    var starting_province = arg2_starting_province;
    var ending_province = arg3_ending_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var army_obj = getArmy(actual_id, army_name);
    var at_war = getEnemies(actual_id);
    var usr = main.users[actual_id];

    //Make sure both the starting and ending province actually exist
    if (army_obj)
      if (main.provinces[starting_province])
        if (main.provinces[ending_province]) {
          var army_size = getArmySize(actual_id, army_obj.name);
          var connections = [];

          if (usr.options.avoid_attrition == "never" && usr.options.avoid_territorial_violation == "never") {
            return module.exports.moveTo(starting_province, ending_province);
          } else {
            if (usr.options.avoid_attrition != "never") {
              try {
                var local_graph = module.exports.createUserGraph(actual_id, { army_size: army_size });

                var pathfinder = bn_path.aStar(local_graph, {
                  distance(fromNode, toNode, link) {
                    return link.data.weight;
                  }
                });

                var path = pathfinder.find(ending_province, starting_province);

                for (var i = 0; i < path.length; i++)
                  connections.push(path[i].id);

                //Parse connections
                for (var i = 0; i < connections.length; i++)
                  if (isNaN(parseInt(connections[i])))
                    connections.splice(i, 1);
              } catch {}
            }

            if (connections.length == 0)
              if (usr.options.avoid_attrition != "always") {
                try {
                  var local_graph = module.exports.createUserGraph(actual_id, { army_size: army_size, avoid_attrition: false });

                  var pathfinder = bn_path.aStar(local_graph, {
                    distance(fromNode, toNode, link) {
                      return link.data.weight;
                    }
                  });

                  var path = pathfinder.find(ending_province, starting_province);

                  for (var i = 0; i < path.length; i++)
                    connections.push(path[i].id);

                  //Parse connections
                  for (var i = 0; i < connections.length; i++)
                    if (isNaN(parseInt(connections[i])))
                      connections.splice(i, 1);
                } catch {}
              }

            if (connections.length == 0)
              return module.exports.moveTo(starting_province, ending_province);
          }

          //Return statement
          return connections;
        }
  },

  /*
    transferProvince() - Transfers a province from the base user to another one. Cannot transfer an uncolonised province.
    options: {
      province_id: "province_id", //Which province to transfer
      target: "actual_ot_user_id" //Whom to transfer it to
    }
  */
  transferProvince: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[options.target];
    var all_pops = Object.keys(config.pops);
    var ot_user = main.users[actual_ot_user_id];
    var province_obj = main.provinces[options.province_id];
    var usr = main.users[actual_id];

    //Transfer province
    if (province_obj.controller) {
      var old_owner = JSON.parse(JSON.stringify(user_id));

      province_obj.owner = actual_ot_user_id;
      province_obj.controller = actual_ot_user_id;

      //Pops transfer
      usr.pops.population += province_obj.pops.population;
      ot_user.pops.population -= province_obj.pops.population;

      for (var i = 0; i < all_pops.length; i++) {
        usr.pops[all_pops[i]] += province_obj.pops[all_pops[i]];
        ot_user.pops[all_pops[i]] -= province_obj.pops[all_pops[i]];
      }

      //Change other indicators
      if (province_obj.city_type == "capital")
        if (province_obj.controller != old_owner)
          province_obj.city_type = "city";

      if (province_obj.type == "urban") {
        usr.city_count++;
        ot_user.city_count--;
      }

      usr.provinces--;
      ot_user.provinces++;

      //Change province colour
      setAllProvinceColours(actual_ot_user_id, options.province_id);
    }
  }
};
