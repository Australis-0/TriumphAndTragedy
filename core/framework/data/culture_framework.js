module.exports = {
  calculateAcceptedCulturePercentage: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_accepted_cultures = module.exports.getAcceptedCultures(user_id);
    var all_accepted_population_percentage = 0;

    //Go over all accepted cultures and add to percentage
    for (var i = 0; i < all_accepted_cultures.length; i++)
      all_accepted_population_percentage += module.exports.calculateCulturalPercentage(actual_id, all_accepted_cultures[i]);

    //Return statement
    return all_accepted_population_percentage;
  },

  calculateAcceptedCultureTotal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_accepted_cultures = module.exports.getAcceptedCultures(user_id);
    var all_accepted_population_percentage = 0;

    //Go over all accepted cultures and add to percentage
    for (var i = 0; i < all_accepted_cultures.length; i++)
      all_accepted_population_percentage += module.exports.calculateCulturalTotal(actual_id, all_accepted_cultures[i]);

    //Return statement
    return all_accepted_population_percentage;
  },

  calculateCulturalPercentage: function (arg0_user, arg1_culture) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var culture_obj = module.exports.getCulture(culture_name);
    var raw_culture_name = module.exports.getCulture(culture_name, { return_key: true });
    var total_culture_population = 0;
    var total_population = 0;
    var usr = main.users[user_id];

    //Iterate over all provincs controlled by the target user
    for (var i = 0; i < all_provinces.length; i++)
      if (main.provinces[all_provinces[i]].controller == user_id) {
        var local_province = main.provinces[all_provinces[i]];

        if (local_province.culture == raw_culture_name)
          total_culture_population += local_province.pops.population;
        total_population += local_province.pops.population;
      }

    usr.population = total_population;

    //Return percentage as number
    return (total_culture_population/total_population);
  },

  calculateCulturalTotal: function (arg0_user, arg1_culture) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var culture_obj = module.exports.getCulture(culture_name);
    var raw_culture_name = module.exports.getCulture(culture_name, { return_key: true });
    var total_culture_population = 0;
    var usr = main.users[user_id];

    //Iterate over all provincs controlled by the target user
    for (var i = 0; i < all_provinces.length; i++)
      if (main.provinces[all_provinces[i]].controller == user_id) {
        var local_province = main.provinces[all_provinces[i]];

        if (local_province.culture == raw_culture_name)
          total_culture_population += local_province.pops.population;
      }

    //Return total cultural population
    return total_culture_population;
  },

  calculateUnacceptedCulturePercentage: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return (usr.population - module.exports.calculateAcceptedCultureTotal(actual_id))/usr.population;
  },

  calculateUnacceptedCultureTotal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return (usr.population - module.exports.calculateAcceptedCultureTotal(actual_id));
  },

  generateCultureID: function () {
    //Declare local instance variables
    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!main.global.cultures[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    getAcceptedCultureProvinces() - Returns an array of province keys where the accepted culture is dominant
    options: {
      exclude_primary_culture: true/false - Whether or not to exclude the primary culture. Defaults to false
    }
  */
  getAcceptedCultureProvinces: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options: {};

    //Declare local instance variables
    var accepted_culture_provinces = [];
    var all_provinces = Object.keys(main.provinces);
    var usr = main.users[user_id];

    for (var i = 0; i < all_provinces.length; i++)
      if (main.provinces[all_provinces[i]].controller == user_id) {
        var local_province = main.provinces[all_provinces[i]];
        var local_culture = getCulture(local_province.culture);

        //Check if local_culture meets the prerequisites for being pushed
        if (
          local_culture.accepted_culture.includes(user_id) ||
          (local_culture.primary_culture.includes(user_id) && !options.exclude_primary_culture)
        )
          accepted_culture_provinces.push(all_provinces[i]);
      }

    //Return statement
    return accepted_culture_provinces;
  },

  /*
    getAcceptedCultures() - Returns an array of accepted culture keys based on the user.
    options: {
      exclude_primary_culture: true/false - Whether or not to exclude the primary culture. Defaults to false
    }
  */
  getAcceptedCultures: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_accepted_cultures = [];
    var all_cultures = Object.keys(main.global.cultures);

    //Go over all cultures and check to see which one meets the criteria
    for (var i = 0; i < all_cultures.length; i++) {
      var local_culture = main.global.cultures[all_cultures[i]];

      if (
        local_culture.accepted_culture.includes(actual_id) ||
        (local_culture.primary_culture.includes(actual_id) && !options.exclude_primary_culture)
      )
        all_accepted_cultures.push(all_cultures[i]);
    }

    //Return statement
    return all_accepted_cultures;
  },

  /*
    getCulture() - Returns the key/object of a specified culture.
    options: {
      return_key: true/false - Whether or not to return the key instead of the object. Default is false.
    }
  */
  getCulture: function (arg0_culture, arg1_options) {
    //Convert from parameters
    var culture_name = arg0_culture.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_cultures = Object.keys(main.global.cultures);
    var culture_exists = [false, ""]; //[culture_exists, culture key/object]

    //Key search
    {
      //Soft-search
      for (var i = 0; i < all_cultures.length; i++)
        if (all_cultures[i].toLowerCase().indexOf(culture_name) != -1)
          culture_exists = [true, (!options.return_key) ? main.global.cultures[all_cultures[i]] : all_cultures[i]];

      //Hard-search
      for (var i = 0; i < all_cultures.length; i++)
        if (all_cultures[i].toLowerCase() == culture_name)
          culture_exists = [true, (!options.return_key) ? main.global.cultures[all_cultures[i]] : all_cultures[i]];
    }

    //Name search
    {
      //Soft-search
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];

        if (local_culture.name.toLowerCase().indexOf(culture_name) != -1)
          culture_exists = [true, (!options.return_key) ? local_culture : all_cultures[i]];
      }

      //Hard-search
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];

        if (local_culture.name.toLowerCase() == culture_name)
          culture_exists = [true, (!options.return_key) ? local_culture : all_cultures[i]];
      }
    }

    //Adjective search
    if (!culture_exists[0]) {
      //Soft-search
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];

        if (local_culture.adjective.toLowerCase().indexOf(culture_name) != -1)
          culture_exists = [true, (!options.return_key) ? local_culture : all_cultures[i]];
      }

      //Hard-search
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];

        if (local_culture.adjective.toLowerCase() == culture_name)
          culture_exists = [true, (!options.return_key) ? local_culture : all_cultures[i]];
      }
    }

    //Return key
    return (culture_exists[0]) ? culture_exists[1] : undefined;
  },

  getCultureNames: function (arg0_cultures) {
    //Convert from parameters
    var culture_list = getList(arg0_cultures);

    //Declare local instance variable
    var name_list = [];

    for (var i = 0; i < culture_list.length; i++)
      name_list.push(getCulture(culture_list[i]).name);

    //Return statement
    return name_list;
  },

  //getCultures() - Returns an array of keys for all cultures inside a given user's controlled territory
  getCultures: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var culture_list = [];

    //Parse through all provinces the user controls for unique cultures
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      if (local_province.controller == actual_id)
        if (!culture_list.includes(local_province.culture))
          culture_list.push(local_province.culture);
    }

    //Return statement
    return culture_list;
  },

  getCultureProvinces: function (arg0_user, arg1_culture) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = Object.keys(main.provinces);
    var province_list = [];

    //Parse through all provinces the user controls for unique cultures
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      if (local_province.controller == actual_id || user_id == "all")
        if (local_province.culture == culture_name)
          province_list.push(all_provinces[i]);
    }

    //Return statement
    return province_list;
  },

  getPrimaryCultureProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var primary_culture_provinces = [];
    var usr = main.users[user_id];

    for (var i = 0; i < all_provinces.length; i++)
      if (main.provinces[all_provinces[i]].controller == user_id) {
        var local_province = main.provinces[all_provinces[i]];
        var local_culture = getCulture(local_province.culture);

        //Check if local_culture meets the prerequisites for being pushed
        if (local_culture.primary_culture.includes(user_id))
          primary_culture_provinces.push(all_provinces[i]);
      }

    //Return statement
    return primary_culture_provinces;
  },

  /*
    getPrimaryCultures() - Returns a list of a user's primary cultures.
    options: {
      return_objects: true/false - Whether or not to return the objects of the cultures instead. False by default
    }
  */
  getPrimaryCultures: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_primary_cultures = [];
    var all_cultures = Object.keys(main.global.cultures);

    //Go over all cultures and check to see which one meets the criteria
    for (var i = 0; i < all_cultures.length; i++) {
      var local_culture = main.global.cultures[all_cultures[i]];

      if (local_culture.primary_culture.includes(actual_id))
        all_primary_cultures.push((!options.return_objects) ? all_cultures[i] : local_culture);
    }

    //Return statement#
    return all_primary_cultures;
  },

  getSortedCultures: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_list = []; //[culture_id, population]
    var user_cultures = module.exports.getCultures(actual_id);

    //Initialise culture_list array
    for (var i = 0; i < user_cultures.length; i++)
      culture_list.push({
        id: user_cultures[i],
        percentage_population: calculateCulturalPercentage(actual_id, user_cultures[i]),
        total_population: calculateCulturalTotal(actual_id, user_cultures[i])
      });

    //Sort culture_list array
    culture_list = culture_list.sort((a, b) => b.total_population - a.total_population);

    //Return statement
    return culture_list;
  },

  /*
    getUserCulture() - Returns all matching cultures within a user by that name.
    options: {
      return_all_cultures: true/false - Whether or not to return all cultures instead of the most common one
      return_objects: true/false - Whether to return culture objects instead of keys
    }
  */
  getUserCulture: function (arg0_user, arg1_culture, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var matching_cultures = [];
    var sorted_cultures = module.exports.getSortedCultures(user_id);
    var usr = main.users[actual_id];

    //First pass, push hard matches, name/adjective
    for (var i = 0; i < sorted_cultures.length; i++) {
      var local_culture = main.global.cultures[sorted_cultures[i].id];

      if (local_culture.name.trim().toLowerCase() == culture_name || local_culture.adjective.trim().toLowerCase() == culture_name)
        (!options.return_objects) ?
          matching_cultures.push(sorted_cultures[i].id):
          matching_cultures.push(local_culture);
    }

    //Second pass, push soft matches, name/adjective
    for (var i = 0; i < sorted_cultures.length; i++) {
      var local_culture = main.global.cultures[sorted_cultures[i].id];

      if (local_culture.name.trim().toLowerCase().indexOf(culture_name) != -1 || local_culture.adjective.trim().toLowerCase().indexOf(culture_name) != -1)
        (!options.return_objects) ?
          matching_cultures.push(sorted_cultures[i].id):
          matching_cultures.push(local_culture);
    }

    //Return statement
    return (!options.return_all_cultures) ? matching_cultures[0] : matching_cultures;
  }
};
