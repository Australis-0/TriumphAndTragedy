module.exports = {
  printCultures: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare tracker variables
    var accepted_culture_provinces = getAcceptedCultureProvinces(actual_id);
    var all_accepted_cultures = getAcceptedCultures(actual_id, { exclude_primary_culture: true });
    var all_primary_cultures = getPrimaryCultures(actual_id);
    var total_accepted_culture_population = calculateAcceptedCultureTotal(actual_id);
    var sorted_culture_array = [];
    var total_unaccepted_population = calculateUnacceptedCultureTotal(actual_id);

    //Initialise sorted_culture_array
    

    //Initialise culture_string
    var culture_string = [];

    //Format culture_string

  }
};
