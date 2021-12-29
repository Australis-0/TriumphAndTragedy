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
    var usr = main.users[user_id];

    //Iterate over all provincs controlled by the target user
    for (var i = 0; i < all_provinces.length; i++)
      if (main.provinces[all_provinces[i]].controller == user_id) {
        var local_province = main.provinces[all_provinces[i]];

        if (local_province.culture == raw_culture_name)
          total_culture_population += local_province.population;
      }

    //Return percentage as number
    return (total_culture_population/usr.population);
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
          total_culture_population += local_province.population;
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

    //Return key
    return (culture_exists[0]) ? culture_exists[1] : undefined;
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
        all_primary_cultures.push(all_cultures[i]);
    }

    //Return statement#
    return all_primary_cultures;
  },
};
