module.exports = {
  mergeArmiesCommand: function (arg0_user, arg1_army_name, arg2_army_name) { //[WIP] - Update army list if user is currently viewing it
    //Convert from parameters
    var user_id = arg0_user;
    var merged_army = arg1_army_name;
    var army_name = arg2_army_name;

    //Declare local inbstance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(user_id, army_name);
    var game_obj = getGameObject(user_id);
    var merged_army_obj = getArmy(user_id, merged_army);
    var usr = main.users[actual_id];

    //Check for the usual
    if (army_obj) {
      if (merged_army_obj) {
        var merged_army = mergeArmy(actual_id, merged_army, army_name);

        //Print out user feedback
        (merged_army[0]) ?
          printAlert(game_obj.id, merged_army[1]) :
          printError(game_obj.id, merged_army[1]);
      } else {
        printError(game_obj.id, `The army you have specified to merge into, the **${merged_army}**, could not be found as an actively deployed field army! Check **[Army List]** for a full list of valid armies.`);
      }
    } else {
      printError(game_obj.id, `The army you have specified to merge, the **${army_name}**, could not be found as an actively deployed field army! Check **[Army List]** for a full list of valid armies.`);
    }
  }
};