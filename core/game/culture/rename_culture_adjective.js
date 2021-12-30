module.exports = {
  renameCultureAdjective: function (arg0_user, arg1_culture_name, arg2_new_culture_adjective) { //[WIP] - Update culture screen if user is currently viewing it
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture_name.trim().toLowerCase();
    var new_culture_adjective = arg2_new_culture_adjective.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if culture exists before attempting to rename it
    if (culture_obj) {
      if (culture_obj.primary_culture.includes(actual_id)) {
        var old_culture_adjective = JSON.parse(JSON.stringify(culture_obj.adjective));

        //Change culture adjective
        culture_obj.name = new_culture_adjective;

        //Print user feedback
        printAlert(game_obj.id, `You have successfully changed your culture name from **${old_culture_adjective}** to **${new_culture_adjective}**!`);
      } else {
        printError(game_obj.id, `**${culture_obj.name}** must be your primary culture before you can change its adjective!`);
      }
    } else {
      printError(game_obj.id, `The culture you have specified, **${culture_name}** was entirely fictitious!`);
    }
  }
};
