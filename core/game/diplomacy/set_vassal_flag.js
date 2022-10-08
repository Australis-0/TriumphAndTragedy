module.exports = {
  initialiseSetVassalFlag: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set Vassal Flag:`,
      prompts: [
        [`Whom would you like to change the national standard of? The target in question must be one of your vassals.\n\nType **[Diplomacy]** to view a full list of all your vassals.`, "mention"],
        [`What would you like to change this country's national standard to? Please insert a valid image URL.`, "string"]
      ]
    },
    function (arg) {
      module.exports.setVassalFlag(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "diplomacy":
          printDiplomacy(user_id);
          return true;

          break;
      }
    });
  },

  setVassalFlag: function (arg0_user, arg1_user, arg2_flag_url) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var flag_url = arg2_new_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var vassal_obj = getVassal(actual_ot_user_id);

    //Check to see if user is actually a vassal
    if (actual_id != actual_ot_user_id) {
      if (ot_user) {
        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            //Check to make sure that the new name is under 100 characters
            var all_users = Object.keys(main.users);
            var change_flag = setFlag(actual_ot_user_id, flag_url, true, true);

            //Print user feedback
            (change_flag[0]) ?
              printAlert(game_obj.id, change_flag[1]) :
              printError(game_obj.id, change_flag[0]);
          } else {
            printError(game_obj.id, `**${ot_user.name}** might be a vassal, but they certainly aren't _your_ vassal, and that's what matters here.`)
          }
        } else {
          printError(game_obj.id, `The target country of **${ot_user.name}** must be vassalised to begin with before it can be bossed around by someone else!`);
        }
      } else {
        printError(game_obj.id, `No one at the Cartography Office seems to know whom that is! Try specifying a valid country name, or type **[View Ledger]** to view a full list of all diplomatically recognised nations.`);
      }
    } else {
      printError(game_obj.id, `Change your own flag using **[Set Flag]** instead! You aren't your own vassal.`);
    }
  }
};
