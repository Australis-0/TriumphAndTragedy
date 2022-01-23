module.exports = {
  deleteArmies: function (arg0_user, arg1_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_deletion_string = arg1_armies.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Make sure user has armies available for deletion to begin with
    if (all_armies.length > 0) {
      var army_array = parseArmies(army_deletion_string);

      if (army_array.length > 0) {
        //Remove the actual armies by running the delete army command
        for (var i = 0; i < army_array.length; i++)
          deleteArmy(actual_id, army_array[i]);

        var current_armies = Object.keys(usr.armies).length;

        //Return success or error messages
        (all_armies.length == current_armies) ?
          printError(game_obj.id, `No armies of the specified name(s) could be found! Please check your spelling and formatting.`) :
          printAlert(game_obj.id, `You have successfully deleted **${parseNumber(all_armies.length - current_armies)}**/**${parseNumber(all_armies.length)}** total armies. Their men and materiel have been returned to your reserves.\n${(all_armies.length - current_armies != army_array.length) ? `**${parseNumber(army_array.length - (all_armies.length - current_armies))}** failed to be deleted, or could not be found` : ""}`);
      } else {
        printError(game_obj.id, `You have specified invalid army input(s)! Please check your spelling and formatting.`);
      }
    } else {
      printError(game_obj.id, `You currently have no active armies in service, empty or not!`);
    }
  }
}
