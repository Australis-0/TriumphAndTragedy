module.exports = {
  endRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists and is rival
    if (ot_user) {
      //Check if country is rival
      if (hasRivalry(actual_id, actual_ot_user_id)) {
        //Fire remove rivalry event
        sendAlert(actual_ot_user_id, config.defines.diplomacy.rival_cancellation_alert_id, {
          FROM: actual_id,
          TO: actual_ot_user_id
        });

        //Print out user feedback
        printAlert(game_obj.id, `${config.icons.checkmark} We have attempted to begin a process of mutual reconciliation with **${ot_user.name}**.`);
      } else {
        printError(game_obj.id, `**${ot_user.id}** is not currently considered by your country to be a valid rival!`);
      }
    } else {
      printError(game_obj.id, `The person you are trying to unrival is nonexistent! Try finding a valid country to unrival in your **[Diplomacy]** screen.`);
    }
  },

  initialiseEndRivalry: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `End Rivalry:`,
      prompts: [
        [`Whom would you like to thaw tensions with? This country must be one of your current rivals.\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.endRivalry(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printLedger(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    })
  }
};
