module.exports = {
  cancelJustification: function (arg0_user, arg1_user, arg2_cb_name) { //[WIP] - Add to news display
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var casus_belli_name = arg2_cb_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]
    var actual_ot_user_id = returnMention(ot_user_id);
    var cb_obj = getCB(casus_belli_name);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var raw_cb_name = getCB(casus_belli_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if other user exists
    if (ot_user) {
      if (cb_obj) {
        //Declare local tracker variables
        var has_justifcation = getJustification(user_id, {
          target: actual_ot_user_id,
          type: raw_cb_name
        });

        //Check if user has an ongoing justification
        if (has_justifcation) {
          var justification_index = getJustification(user_id, {
            target: actual_ot_user_id,
            type: raw_cb_name,

            return_index: true
          });

          //Status updater
          if (game_obj.page.startsWith("diplomacy_view_")) {
            var current_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

            if (current_ot_user_id == actual_ot_user_id)
              viewDiplomacy(user_id, current_ot_user_id);
          }

          //Print user feedback
          printAlert(game_obj.id, `We have cancelled our justification of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against **${ot_user.name}**.`);

          //Splice it from the justification array
          usr.diplomacy.justifications.splcie(justification_index, 1);
        } else {
          printError(game_obj.id, `You are not currently justifying a war of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against this country!`);
        }
      } else {
        printError(game_obk.id, `You cannot cancel the justification of a nonexistent CB!`);
      }
    } else {
      printError(game_obj.id, `You cannot cancel your justification against a nonexistent nation!`);
    }
  },

  initialiseCancelJustification: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cancel An Ongoing Justification:`,
      prompts: [
        [`Whom are you justifying against?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`Which type of CB would you like to cancel currently?\n\nType **[View CB List]** to a view a list of all valid CB's.`, "string"]
      ]
    },
    function (arg) {
      module.exports.cancelJustification(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "view cb list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCBList(user_id),
            user: game_obj.user
          });
          return true;

          break;
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    })
  }
};
