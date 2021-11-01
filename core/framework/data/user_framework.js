module.exports = {
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

      //Sort cities by population
      all_owned_cities.sort(function (a, b) {
        return b.population - a.population;
      });

      //Return statement
      return all_owned_cities;
    } catch (e) {
      log.error(`getCities() - ran into an error with User ID ${user_id}: ${e}`);
    }
  },

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
          //Complex boolean to parse options field; core provinces
          (main.provinces[all_provinces[i]].owner == user_id && main.provinces[all_provinces[i]].controller == user_id ||
              options.include_hostile_occupations
          )) ||

          //Complex boolean to parse options field; provinces occupied by user
          (main.provinces[all_provinces[i]].controller == user_id && options.include_occupations)

          //Push if any of these options are valid
        ) all_owned_provinces.push(main.provinces[all_provinces[i]]);

      //Return statement
      return all_owned_provinces;
    } catch (e) {
      log.error(`getProvinces() - ran into an error with User ID ${user_id}: ${e}.`)
    }
  }
};
