module.exports = {
  /*
    canRecruit() - Checks whether a user can recruit new units
    options: {
      get_duration: true/false - False by default. Returns the number of turns before the user can build new units
    }
  */
  canRecruit: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var can_recruit = true;
    var disabled_duration = 0;
    var usr = main.users[actual_id];

    var all_cooldowns = Object.keys(usr.cooldowns);

    //Check usr.cooldowns
    if (all_cooldowns.indexOf("recruitment_disabled") != -1)
      can_recruit = false;

    if (options.get_duration)
      for (var i = 0; i < all_cooldowns.length; i++) {
        var local_cooldown = usr.cooldowns[all_cooldowns[i]];

        disabled_duration = Math.max(local_cooldown.duration, disabled_duration);
      }

    //Return statement
    return (!options.get_duration) ? can_recruit : disabled_duration;
  },

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
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var army_size = returnSafeNumber(options.army_size);
    var at_war = atWar(user_id);
    var local_graph = global.bn_graph();

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];
      var valid_province = false;

      //Check if province is uncolonised
      valid_province = (local_province.controller) ? true : valid_province;

      //Check if province is valid
      if (local_province.controller) {
        //Check for alliances, military access, vassalage, or being at war
        if (usr.options.avoid_territorial_violation != "never") {
          var vassal_obj = getVassal(local_province.controller);

          valid_province = (hasAlliance(user_id, local_province.controller)) ? true : valid_province;
          valid_province = (hasMilitaryAccess(user_id, local_province.controller)) ? true : valid_province;
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

        //Check for demilitarisation
        if (local_province.demilitarised && !at_war)
          valid_province = false;

        if (valid_province)
          for (var x = 0; x < local_province.adjacencies.length; x++)
            local_graph.addLink(all_provinces[i], local_province.adjacencies[x], {
              weight: local_province.adjacency_distances[x]
            });
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
    var all_provinces = module.exports.getProvinces(user_id, { include_occupations: true, include_hostile_occupations: true });
    var all_users = Object.keys(main.users);
    var all_wars = Object.keys(main.global.wars);
    var usr = main.users[actual_id];

    //Remove all occupations
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].controller != all_provinces[i].owner)
        all_provinces[i].controller = all_provinces[i].owner;

    //Clear all blockades
    deleteBlockade(user_id);

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

    //Remove all blockades
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      if (local_user.blockaded.is_blockaded)
        for (var x = 0; x < local_user.blockaded.fleets.length; x++) {
          var local_fleet = local_user.blockaded.fleets[x];

          if (local_fleet.id == actual_id)
            deleteArmy(user_id, local_fleet.id);
        }
    }

    //Switch war leaders or end wars
    for (var i = 0; i < all_wars.length; i++) {
      var end_war = false;
      var local_war = main.global.wars[all_wars[i]];
      var opposing_side = "";

      if (local_war.attackers_war_leader == actual_id)
        if (local_war.attackers.length > 1) {
          for (var x = 0; x < local_war.attackers.length; x++)
            if (local_war.attackers[x] != actual_id)
              local_war.attackers_war_leader = local_war.attackers[x];
        } else {
          end_war = true;
          opposing_side = "defenders";
        }

      if (local_war.defenders_war_leader == actual_id)
        if (local_war.defenders.length > 1) {
          for (var x = 0; x < local_war.defenders.length; x++)
            if (local_war.defenders[x] != actual_id)
              local_war.defenders_war_leader = local_war.defenders[x];
        } else {
          end_war = true;
          opposing_side = "attackers";
        }

      if (end_war) {
        var white_peace = createPeaceTreaty(local_war[`${opposing_side}_war_leader`], local_war, true);

        parsePeaceTreaty(local_war, white_peace);
      }
    }

    //Remove all diplomatic relations and delete user object
    destroyAllDiplomaticRelations(user_id);

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
    var actual_id = main.global.user_map[user_id];

    var all_cities = module.exports.getCities(user_id, {
      include_hostile_occupations: true
    });

    for (var i = 0; i < all_cities.length; i++)
      if (all_cities[i].city_type == "capital")

        //Return statement
        return all_cities[i];

    //Otherwise return the first province a user has
    var all_provinces = module.exports.getProvinces(user_id);

    if (all_provinces.length > 0) return all_provinces[0];
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
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var all_owned_cities = [];
    var usr = main.users[actual_id];

    try {
      for (var i = 0; i < all_provinces.length; i++)
        //Check to make sure province is a valid city
        if (main.provinces[all_provinces[i]].type == "urban")
          if (
            //Complex boolean to parse options field; core cities
            (main.provinces[all_provinces[i]].owner == actual_id &&
            (main.provinces[all_provinces[i]].controller == actual_id ||
                options.include_hostile_occupations
            )) ||

            //Complex boolean to parse options field; cities occupied by user
            (main.provinces[all_provinces[i]].controller == actual_id && options.include_occupations)

            //Push if any of these options are valid. Geez. This is messy
          ) all_owned_cities.push(main.provinces[all_provinces[i]]);

      //Sort cities by capital; population
      var capital_index;

      all_owned_cities.sort(function (a, b) {
        return b.population - a.population;
      });

      //Look for core capital and move it to the zeroth index if possible
      for (var i = 0; i < all_owned_cities.length; i++)
        if (all_owned_cities[i].city_type == "capital" && all_owned_cities[i].owner == actual_id)
          capital_index = i;

      if (capital_index)
        moveElement(all_owned_cities, capital_index, 0);

      //Return statement
      return all_owned_cities;
    } catch (e) {
      log.error(`getCities() - ran into an error with User ID ${actual_id}: ${e}`);
    }
  },

  getCitiesCap: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var calculated_cap = 0;
    var city_caps = config.defines.economy.city_unlock_caps;
    var usr = main.users[actual_id];

    //Iterate over city_unlock_caps to check for certain province bounds
    for (var i = 0; i < city_caps.length; i++) {
      var next_bound = city_caps[i+1];

      if (next_bound)
        if (usr.provinces >= city_caps[i] && usr.provinces < next_bound)
          calculated_cap = i + 1;
      if (!next_bound)
        if (usr.provinces >= city_caps[i])
          calculated_cap = i + 1;
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
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return Math.ceil(
      config.defines.combat.colonisation_speed*usr.modifiers.colonist_travel_speed
    );
  },

  getDemilitarisedTurns: function (arg0_province) {
    //Convert from parameters
    var province_id = arg0_province;

    //Declare local instance variables
    var all_cooldowns = Object.keys(main.global.cooldowns);
    var demilitarised_turns = 0;
    var province_obj = getProvince(province_id);

    //Iterate over all cooldowns
    if (province_obj)
      if (province_obj.demilitarised)
        for (var i = 0; i < all_cooldowns.length; i++)
          if (all_cooldowns.includes("demiltiarisation")) {
            var local_cooldown = main.global.cooldowns[all_cooldowns[i]];

            if (local_cooldown.demilitarised_provinces.includes(province_obj.id))
              demilitarised_turns = Math.max(
                returnSafeNumber(local_cooldown.turns),
                demilitarised_turns
              );
          }

    //Return statement
    return demilitarised_turns;
  },

  getDevelopmentCost: function (arg0_user, arg1_name, arg2_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_name.toLowerCase();
    var amount = (arg2_amount) ? parseInt(arg2_amount) : 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var cached_amount = 0;
    var city_obj = (!main.provinces[city_name]) ? getCity(city_name) : main.provinces[city_name];
    var usr = main.users[actual_id];

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

  getDistance: function (arg0_province, arg1_province) {
    //Convert from parameters
    var current_province = arg0_province;
    var destination_province = arg1_province;

    //Declare local instance variables
    var current_province_obj = module.exports.getProvince(current_province);
    var destination_province_obj = module.exports.getProvince(destination_province);
    var total_distance = 0;

    if (current_province_obj && destination_province_obj)
      if (current_province_obj.centre && destination_province_obj.centre) {
        total_distance = Math.sqrt(
          Math.pow(destination_province_obj.centre[0] - current_province_obj.centre[0], 2) +
          Math.pow(destination_province_obj.centre[1] - current_province_obj.centre[1], 2)
        );
      }

    //Return statement
    return total_distance*returnSafeNumber(config.defines.map.km_per_pixel, 1);
  },

  getEnemyOccupiedProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemies = getEnemies(user_id);
    var enemy_occupied_provinces = [];
    var user_provinces = module.exports.getProvinces(user_id, { include_hostile_occupations: true });

    //Iterate over all provinces
    for (var i = 0; i < user_provinces.length; i++)
      if (user_provinces[i].owner != user_provinces[i].controller)
        if (enemies.includes(user_provinces[i].controller))
          enemy_occupied_provinces.push(user_provinces[i]);

    //Return statement
    return enemy_occupied_provinces;
  },

  getOccupyingUserContribution: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user; //Occupying user
    var ot_user_id = arg1_user; //Occupied user

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var controlled_provinces = module.exports.getProvinces(ot_user_id);
    var occupied_provinces = module.exports.getOccupyingUserProvinces(user_id, ot_user_id);
    var owned_provinces = module.exports.getProvinces(ot_user_id, { include_hostile_occupations: true });
    var total_occupied_provinces = owned_provinces.length - controlled_provinces.length;

    //Return statement
    return returnSafeNumber(occupied_provinces.length/total_occupied_provinces);
  },

  getOccupyingUserProvinces: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user; //Occupying user
    var ot_user_id = arg1_user; //Occupied user

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var controlled_provinces = module.exports.getProvinces(ot_user_id);
    var occupied_provinces = [];
    var owned_provinces = module.exports.getProvinces(ot_user_id, { include_hostile_occupations: true });
    var total_occupied_provinces = owned_provinces.length - controlled_provinces.length;
    var usr = main.users[actual_id];

    //Iterate over all owned_provinces
    for (var i = 0; i < owned_provinces.length; i++)
      if (owned_provinces[i].owner != owned_provinces[i].controller)
        if (owned_provinces[i].controller == actual_id)
          occupied_provinces.push(owned_provinces[i]);

    //Return statement
    return occupied_provinces;
  },

  getOccupyingUsers: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user; //Occupied user

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var controlled_provinces = module.exports.getProvinces(user_id);
    var occupying_users = [];
    var owned_provinces = module.exports.getProvinces(user_id, { include_hostile_occupations: true });
    var usr = main.users[actual_id];

    //Iterate over all owned_provinces
    for (var i = 0; i < owned_provinces.length; i++)
      if (owned_provinces[i].owner != owned_provinces[i].controller)
        if (!occupying_users.includes(owned_provinces[i].controller))
          occupying_users.push(owned_provinces[i].controller);

    //Return statement
    return occupying_users;
  },

  getProvince: function (arg0_province) {
    //Convert from parameters
    var province_id = arg0_province;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);

    //Optimisation guard clause
    if (main.provinces[province_id])
      return main.provinces[province_id];

    //Iterate over all provinces to find it
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i] == province_id) {
        //Set ID tracker variable just in case
        var local_province = main.provinces[all_provinces[i]];
        local_province.id = all_provinces[i];

        //Return statement if province is found
        return local_province;
      }

    //If not found, try getCity()
    return getCity(province_id);
  },

  getProvinceDistances: function (arg0_provinces) {
    //Convert from parameters
    var provinces = arg0_provinces;

    //Declare local instance variables
    var distance_array = [];

    //Fetch distance_array
    for (var i = 0; i < provinces.length; i++)
      if (provinces[i + 1]) {
        var local_distance = module.exports.getDistance(provinces[i], provinces[i + 1]);
        var local_province = main.provinces[provinces[i]];

        //Push actual distance
        distance_array.push(
          local_distance*getSupplyLimitMovementBonus(provinces[i], provinces[i + 1], local_distance)
        );
      } else {
        distance_array.push(0);
      }

    //Return statement
    return distance_array;
  },

  /*
    getProvinces() - Returns an array of provinces for a certain user based on certain options.
    options: {
      exclude_cities: true/false, - Optional. Whether to exclude cities. False by default
      include_hostile_occupations: true/false, - Optional. Includes occupations by other users of the target user. False by default.
      include_occupations: true/false, - Optional. Includes occupations by the target user. False by default
      return_keys: true/false - Optional. Whether to return the keys of the provinces instead of the object. False by default
    }
  */
  getProvinces: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var all_owned_provinces = [];
    var usr = main.users[actual_id];

    try {
      for (var i = 0; i < all_provinces.length; i++)
        if (
          (
            //Complex boolean to parse options field; core provinces
            (main.provinces[all_provinces[i]].owner == actual_id &&
                (
                  main.provinces[all_provinces[i]].controller == actual_id || options.include_hostile_occupations
                )
            ) ||

            //Complex boolean to parse options field; provinces occupied by user
            (main.provinces[all_provinces[i]].controller == actual_id && options.include_occupations)
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
      log.error(`getProvinces() - ran into an error with User ID ${actual_id}: ${e}.`)
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

  getSupplyLimitMovementBonus: function (arg0_province, arg1_province, arg2_distance) {
    //Convert from parameters
    var current_province = arg0_province;
    var next_province = arg1_province;
    var distance = arg2_distance;

    //Declare local instance variables
    var destination_province = main.provinces[next_province];
    var starting_province = main.provinces[current_province];

    if (starting_province && destination_province) {
      //Get distance
      if (!distance)
        distance = module.exports.getDistance(current_province, next_province);

      //Calculate bonus
      var average_supply_limit = (
        returnSafeNumber(destination_province.supply_limit, config.defines.combat.base_supply_limit) + returnSafeNumber(starting_province.supply_limit, config.defines.combat.base_supply_limit)
      )/2;

      //Return statement
      return Math.min(
        distance/average_supply_limit,
        1
      );
    }
  },

  getTotalSoldiers: function (arg0_user) {
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

    //Get army maintenance
    var army_maintenance_obj = getArmyMaintenance(user_id);

    //Return statement
    return returnSafeNumber(army_maintenance_obj.money);
  },

  getWarReparations: function (arg0_user, arg1_income) {
    //Convert from parameters
    var user_id = arg0_user;
    var income = (arg1_income) ? arg1_income : undefined;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];
    var war_reparations_obj = {};

    var all_cooldowns = Object.keys(usr.cooldowns);

    //Define income
    if (!income)
      var income = getIncome(user_id, undefined, true);

    //Iterate through all cooldowns, check for war reparations, minimum case
    for (var i = 0; i < all_cooldowns.length; i++) {
      var local_cooldown = usr.cooldowns[all_cooldowns[i]];
      var money_taken = [
        Math.ceil(income[0]*local_cooldown.percentage_amount),
        Math.ceil(income[1]*local_cooldown.percentage_amount),
        local_cooldown.duration
      ];

      //Set war_reparations_obj
      war_reparations_obj[local_cooldown.owner] = money_taken;
    }

    //Return statement
    return war_reparations_obj;
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
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var usr = main.users[actual_id];
    var ot_user = main.users[actual_ot_user_id];

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
    var actual_ot_user_id = returnMention(ot_user_id);
    var all_cultures = Object.keys(main.global.cultures);
    var all_mapped_users = Object.keys(main.global.user_map);

    //Annex all provinces
    var all_provinces = module.exports.getProvinces(user_id, { include_occupations: true, include_hostile_occupations: true });

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
        transferProvince(user_id, { target: ot_user_id, province_id: all_provinces[i].id });

    //KEEP AT BOTTOM! Remove all diplomatic relations and delete user object
    try {
      destroyAllDiplomaticRelations(user_id);
    } catch {}
    try {
      deleteCountry(user_id);
    } catch {}

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
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);

    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      try {
        for (var x = 0; x < local_user.diplomacy.justifications.length; x++) {
          var local_justification = local_user.diplomacy.justifications[x];

          if (local_justification.target == actual_id)
            return true;
        }
      } catch {}
    }
  },

  isBlockaded: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

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
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var usr = main.users[actual_id];
    var ot_user = main.users[actual_ot_user_id];

    //Check for justification against ot_user
    for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
      var local_justification = usr.diplomacy.justifications[i];

      if (local_justification.target == actual_ot_user_id)
        return true;
    }
  },

  isValidCountryName: function (arg0_name) {
    //Convert from parameters
    var country_name = arg0_name;

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var country_name_taken = false;
    var processed_country_name = formaliseString(country_name);

    //Check to see if country name is already taken
    for (var i = 0; i < all_users.length; i++)
      country_name_taken = (processed_country_name == main.users[all_users[i]].name) ?
        true : country_name_taken;

    if (country_name_taken)
      return [false, `The country name **${processed_country_name}** was already taken by another nation! Try renaming your country to something else.`];

    //See if country name meets length requirements
    if (processed_country_name.length >= 100)
      return [false, `The new name of your country, **${parseString(country_name)}** must be less than **100** characters! Its current proposed length is **${parseNumber(parseString(country_name).length)}** characters long.`];

    //Return statement
    return [true, `This country name was available.`];
  },

  moveTo: function (arg0_province, arg1_province) {
    //Convert from parameters
    var starting_province = arg0_province;
    var ending_province = arg1_province;

    try {
      var pathfinder = bn_path.nba(graph, {
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
    var army_name = (typeof arg1_army_name != "object") ?  arg1_army_name.trim().toLowerCase() : arg1_army_name;
    var starting_province = arg2_starting_province;
    var ending_province = arg3_ending_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var army_obj = (typeof army_name != "object") ? getArmy(user_id, army_name) : army_name;
    var at_war = getEnemies(user_id);
    var usr = main.users[actual_id];

    //Make sure both the starting and ending province actually exist
    if (army_obj)
      if (main.provinces[starting_province])
        if (main.provinces[ending_province]) {
          var army_size = getArmySize(user_id, army_obj.name);
          var connections = [];

          if (usr.options.avoid_attrition == "never" && usr.options.avoid_territorial_violation == "never") {
            return module.exports.moveTo(starting_province, ending_province);
          } else {
            if (usr.options.avoid_attrition != "never") {
              try {
                var local_graph = module.exports.createUserGraph(user_id, { army_size: army_size });

                var pathfinder = bn_path.nba(local_graph, {
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
                  var local_graph = module.exports.createUserGraph(user_id, { army_size: army_size, avoid_attrition: false });

                  var pathfinder = bn_path.nba(local_graph, {
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
    sortProvinces() - Sorts an array of user provinces by a certain mode.
    mode: "population_ascending", "population_descending". Optional. "population_descending" by default
  */
  sortProvinces: function (arg0_user, arg1_mode) {
    //Convert from parameters
    var user_id = arg0_user;
    var mode = (mode) ? arg1_mode.toLowerCase() : "population_descending";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var provinces = getProvinces(user_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });
    var usr = main.users[actual_id];

    //Iterate over all provinces and sort
    provinces.sort(function(a, b) {
      if (!a.pops)
        a.pops = { population: 0 };
      if (!b.pops)
        b.pops = { population: 0 };

      if (mode == "population_ascending")
        return a.pops.population - b.pops.population;
      if (mode == "population_descending")
        return b.pops.population - a.pops.population;
    });

    //Return statement
    return provinces;
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

      for (var i = 0; i < all_pops.length; i++)
        if (config.pops[all_pops[i]] || all_pops[i].startsWith("used_")) {
          var local_value = province_obj.pops[all_pops[i]];
          modifyValue(usr.pops, all_pops[i], local_value);
          modifyValue(ot_user.pops, all_pops[i], local_value*-1);
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
      setAllProvinceColours(options.target, options.province_id);
    }
  },

  updateControl: function () {
    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_users = Object.keys(main.users);
    var control_obj = {};

    //Initialise control_obj
    for (var i = 0; i < all_users.length; i++)
      control_obj[all_users[i]] = [];

    //Iterate over all_provinces
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      if (local_province.controller)
        control_obj[local_province.controller].push(all_provinces[i]);
    }

    lookup.province_controllers = control_obj;

    //Return statement
    return control_obj;
  },

  updateOwnership: function () {
    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_users = Object.keys(main.users);
    var owner_obj = {};

    //Initialise owner_obj
    for (var i = 0; i < all_users.length; i++)
      owner_obj[all_users[i]] = [];

    //Iterate over all_provinces
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      if (local_province.owner)
        owner_obj[local_province.owner].push(all_provinces[i]);
    }

    lookup.province_owners = owner_obj;

    //Return statement
    return owner_obj;
  }
};
