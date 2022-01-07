module.exports = {
  cancelWargoal: function (arg0_user, arg1_user, arg2_cb_name) { //[WIP] - Add to news display; initWar()
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var casus_belli_name = arg2_cb_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var cb_obj = getCB(casus_belli_name);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var raw_cb_name = getCB(casus_belli_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if other user exists and has a valid wargoal
    if (ot_user) {
      if (cb_obj) {
        var has_valid_wargoal = [false, -1]; //[has_valid_wargoal, wargoal_index];

        for (var i = 0; i < usr.diplomacy.wargoals.length; i++) {
          var local_wargoal = usr.diplomacy.wargoals[i];

          if (local_wargoal.type == raw_cb_name && local_wargoal.target == actual_ot_user_id)
            has_valid_wargoal = [true, i];
        }

        if (has_valid_wargoal[0]) {
          //Status updater
          if (game_obj.page.startsWith("diplomacy_view_")) {
            var current_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

            if (current_ot_user_id == actual_ot_user_id)
              viewDiplomacy(user_id, current_ot_user_id);
          }

          if (game_obj.page.startsWith("view_wargoals_")) {
            var current_ot_user_id = game_obj.page.replace("view_wargoals_", "");

            if (current_ot_user_id == actual_ot_user_id)
              viewDiplomacy(user_id, current_ot_user_id);
          }

          //Print user feedback
          printAlert(game_obj.id, `We have forgiven **${ot_user.name}** and have dropped our wargoal of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against them.`);

          //Cancel wargoal by splicing
          usr.diplomacy.wargoals.splice(has_valid_wargoal[1], 1);
        } else {
          printError(game_obj.id, `You do not currently have a **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** Wargoal against **${ot_user.name}**!`);
        }
      } else {
        printError(game_obj.id, `The wargoal you have specified to forgive proved nonexistent! View **[CB List]** for a valid list of all casus belli.`);
      }
    } else {
      printError(game_obj.id, `You can't cancel a nonexistent wargoal against a nonexistent nation!`);
    }
  },

  initialiseCancelWargoal: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cancel A Current Wargoal:`,
      prompts: [
        [`Which country would you like to forgive?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`Which type of wargoal would you like to cancel currently?\n\nType **[View CB List]** to a view a list of all valid CB's.`, "string"]
      ]
    },
    function (arg) {
      module.exports.cancelWargoal(user_id, arg[0], arg[1]);
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
