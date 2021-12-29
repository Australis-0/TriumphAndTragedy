module.exports = {
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
  }
};
