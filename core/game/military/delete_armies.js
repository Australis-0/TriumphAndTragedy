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
  },

  initialiseDeleteArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Delete Multiple Armies:`,
      prompts: [
        [`Please type out the names of the armies you'd like to delete en masse. Their men and equipment will be returned to our reserves.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.\nType 'none' to use available armies instead.`, "string"]
      ]
    },
    function (arg) {
      module.exports.deleteArmies(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "army list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  }
}
