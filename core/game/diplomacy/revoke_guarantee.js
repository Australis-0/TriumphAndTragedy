module.exports = {
  revokeGuarantee: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user even exists
    if (ot_user) {
      //See if other user are themselves
      if (actual_id != actual_ot_user_id) {
        //Check if target user is currently being guaranteed by invokee
        if (hasGuarantee(actual_id, actual_ot_user_id)) {
          //Remove a used diplomatic slot and print user feedback
          dissolveGuarantee(actual_id, actual_ot_user_id);
          usr.diplomacy.used_diplomatic_slots--;

          sendAlert(actual_ot_user_id, config.defines.diplomacy.revoke_guarantee_alert_id, {
            FROM: actual_id,
            TO: actual_ot_user_id
          });

          //Status updater
          if (game_obj.page.startsWith("diplomacy_view_")) {
            var current_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

            if (current_ot_user_id == actual_ot_user_id)
              viewDiplomacy(user_id, current_ot_user_id);
          }

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} We have broken off our guarantee with **${ot_user.name}**.`);
        } else {
          printError(game_obj.id, `You aren't currently guaranteeing the independence of **${ot_user.name}**!`);
        }
      } else {
        printError(game_obj.id, `You can't stop guaranteeing the independence of yourself! If you're really that desperate, try vassalising yourself to someone.`);
      }
    } else {
      printError(game_obj.id, `You can't revoke your guarantee of independence for a non-existent country!`);
    }
  },

  initialiseRevokeGuarantee: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Revoke Guarantee:`,
      prompts: [
        [`Which country do you wish to no longer protect?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.revokeGuarantee(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    })
  }
};
