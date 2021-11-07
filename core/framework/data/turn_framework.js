module.exports = {
  nextTurn: function (arg0_user) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Modifier and tracker variable processing
    {
      //City modifiers/trackers
      usr.city_cap = getCitiesCap(actual_id);
      usr.total_cities += getCities(actual_id, { include_hostile_occupations: true });

      //Population modifiers/trackers
      usr.population = getPopulation(actual_id);
    }

    //Budget processing
    {
      //Add money based on calculated user income
      usr.money += getIncome(actual_id);
    }
  }
}
