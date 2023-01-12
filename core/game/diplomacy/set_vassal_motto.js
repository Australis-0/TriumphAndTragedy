module.exports = {
  initialiseSetVassalMotto: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set Vassal Motto:`,
      prompts: [
        [`Which of your vassals would you like to change their motto for?\n\nType **[Diplomacy]** to view a full list of all your vassals.`, "mention"],
        [`What would you like to decree this country's motto as?`, "string"]
      ]
    },
    function (arg) {
      module.exports.setVassalMotto(user_id, arg[0], arg[1]);
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

  setVassalMotto: function (arg0_user, arg1_user, arg2_new_motto) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var new_motto = arg2_new_motto.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var vassal_obj = getVassal(ot_user_id);

    //Check to see if user is actually a vassal
    if (actual_id != actual_ot_user_id) {
      if (ot_user) {
        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            //Check to make sure that the new motto is under 250 characters
            if (new_motto.length <= 250) {
              var old_vassal_motto = JSON.parse(JSON.stringify(ot_user.motto));

              ot_user.motto = new_motto;

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully changed the country motot of **${old_vassal_name}** to **${new_motto}**.`);
            } else {
              printError(game_obj.id, `**${processed_new_name}** exceeded the maximum limit of **250** characters by a total of **${parseNumber(processed_new_name.length - 250)}** character(s)! Consider shortening the name down, or picking another one.`);
            }
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
      printError(game_obj.id, `You may not change your own motto like that of a vassal's!`);
    }
  }
};
