module.exports = {
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
        moveElement(all_owned_cities, i, 0);

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
    return (city_exists[0]) ? city_exists[1] : undefined;
  },

  getCityRGOThroughput: function (arg0_name) {
    //Convert from parameters
    var city_name = arg0_name;

    //Declare local instance variables
    try {
      var city_obj = getCity(city_name);
      var usr = main.users[city_obj.controller];
    } catch {}

    return returnSafeNumber(
      (usr.modifiers.rgo_throughput) +
        (
          returnSafeNumber(city_obj.supply_limit, config.defines.combat.base_supply_limit)/
          config.defines.economy.supply_limit_rgo_modifier
        )*0.01
    , 1);
  },

  getDevelopmentCost: function (arg0_user, arg1_name, arg2_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_name.toLowerCase();
    var amount = (arg2_amount) ? parseInt(arg2_amount) : 1;

    //Declare local instance variables
    var cached_amount = 0;
    var city_obj = getCity(city_name, options);
    var usr = main.users[user_id];

    //Declare local tracker variables
    var average_cities = Math.ceil(usr.total_cities/usr.country_age);
    var pc_price = 0;

    for (var i = 0; i < amount; i++) {
      //Increment cached_amount to ensure recursion
      cached_amount++;

      pc_price += Math.floor(config.defines.economy.urbanisation_cost*Math.pow(config.defines.economy.urbanurbanisation_cost_percentile_growth, city_obj.development + cached_amount)*average_cities);
    }

    //Return statement
    return pc_price;
  },

  //Fetches user income before production costs
  getIncome: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var calculated_income = 0;
    var usr = main.users[user_id];

    //Declare local tracker variables
    var civilian_actions = Math.ceil(usr.actions*usr.modifiers.civilian_actions);

    //Regular error trapping just in case!
    try {
      calculated_income = Math.ceil(
          (usr.actions - civilian_actions)
        *config.defines.economy.money_per_action
        *usr.tax_rate
        *usr.modifiers.tax_efficiency
      );

      return calculated_income;
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
      include_occupations: true/false - Includes occupations by the target user
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
            (main.provinces[all_provinces[i]].owner == user_id && main.provinces[all_provinces[i]].controller == user_id ||
                options.include_hostile_occupations
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
        ) all_owned_provinces.push(main.provinces[all_provinces[i]]);

      //Return statement
      return all_owned_provinces;
    } catch (e) {
      log.error(`getProvinces() - ran into an error with User ID ${user_id}: ${e}.`)
    }
  }
};
