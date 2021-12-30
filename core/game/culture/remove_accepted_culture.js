module.exports = {
  removeAcceptedCulture: function (arg0_user, arg1_culture_name) { //[WIP] - Update culture screen if user is still on it
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if culture exists
    if (culture_obj) {
      if (culture_obj.accepted_culture.includes(actual_id)) {
        //Remove actual_id from list of accepted cultures
        removeElement(culture_obj.accepted_culture, actual_id);

        //Print user feedback
        printAlert(game_obj.id, `We have begun oppressing the **${culture_obj.adjective}** minority in our country, and as such they have been removed from the list of accepted cultures.`);
      } else {
        printError(game_obj.id, `**${culture_obj.adjective}** is already an unaccepted culture in your country!`);
      }
    } else {
      printError(game_obj.id, `**${culture_name}** could not be found as a valid culture anywhere in the world! Other valid cultures may include the Atlanteans, the Hyperboreans, and the Prester Johnians.`);
    }
  }
};
