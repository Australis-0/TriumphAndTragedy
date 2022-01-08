module.exports = {
  justifyWar: function (arg0_user, arg1_user, arg2_cb_type) { //[WIP] - Send out news alert to other countries when someone is being justified on
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var cb_name = arg2_cb_type;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if ot_user is defined
    if (ot_user) {
      if (actual_id != actual_ot_user_id) {
        //Check if user has enough political capital
        if (usr.modifiers.political_capital >= config.defines.diplomacy.justify_wargoal_cost) {
          //Check if user has a non-aggression pact, is guaranteeing the target nation's independence, or has an alliance/vassalage
          if (!hasNonAggressionPact(actual_id, actual_ot_user_id)) {
            if (!hasGuarantee(actual_id, actual_ot_user_id)) {
              if (!hasAlliance(actual_id, actual_ot_user_id)) {
                var is_vassal_of_user = false;

                if (getVassal(actual_id))
                  if (getVassal(actual_id).overlord == actual_id)
                    is_vassal_of_user = true;

                if (!is_vassal_of_user) {
                  if (!getVassal(actual_id)) {
                    //Check if user has a valid CB
                    var has_valid_cb = [false, -1]; //[has_valid_cb, cb_index]
                    var raw_cb_name = getCB(cb_name, { return_key: true });

                    for (var i = 0; i < usr.diplomacy.casus_belli.length; i++) {
                      var local_cb = usr.diplomacy.casus_belli[i];

                      if (local_cb.type == raw_cb_name)
                        has_valid_cb = [true, i];
                    }

                    //Final check
                    if (has_valid_cb[0]) {
                      //Begin justification and add infamy
                      var cb_obj = getCB(cb_name);

                      //Fetch actual_justification_time
                      var actual_justification_time = (hasRivalry(actual_id, actual_ot_user_id)) ?
                        Math.round(config.defines.diplomacy.justify_wargoal_time/2) :
                        config.defines.diplomacy.justify_wargoal_time;
                      var actual_infamy = (cb_obj.infamy) ? cb_obj.infamy : 0;

                      usr.justifications.push({
                        type: raw_cb_name,
                        target: actual_ot_user_id,

                        duration: actual_justification_time
                      });

                      //Status updater
                      if (game_obj.page.startsWith("diplomacy_view_")) {
                        var current_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

                        if (current_ot_user_id == actual_ot_user_id)
                          viewDiplomacy(user_id, current_ot_user_id);
                      }

                      if (game_obj.page.startsWith("view_cb_")) {
                        var current_ot_user_id = game_obj.page.replace("view_cb_", "");

                        if (current_ot_user_id == actual_ot_user_id)
                          viewDiplomacy(user_id, current_ot_user_id);
                      }

                      //Print user feedback
                      printAlert(`You have begun justifying a war of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against **${ot_user.name}**!\n\nYou may cancel this justification at any time before its completion by typing **[Cancel Justification]**`);

                      //Remove CB
                      usr.casus_belli.splice(has_valid_cb[1], 1);
                    } else {
                      printError(game_obj.id, `**${cb_name}** is not a valid CB for **${ot_user.name}**! View a list of valid CB's by typing **[View Casus Belli]**.`);
                    }
                  } else {
                    printError(game_obj.id, `You cannot justify on another independent country as a vassal yourself!`);
                  }
                } else {
                  printError(game_obj.id, `**${ot_user.name}** is one of your vassals! You cannot justify on one of your own vassals.`);
                }
              } else {
                printError(game_obj.id, `You can't justify a wargoal on someone you're currently in an alliance with! Break off the alliance with them first before attempting to justify one.`);
              }
            } else {
              printError(game_obj.id, `You can't justify a wargoal on someone you're currently guaranteeing! Try cancelling the guarantee on them first before justifying.`);
            }
          } else {
            var local_non_aggression_pact = main.users[actual_id].non_aggression_pacts[actual_ot_user_id];

            printError(game_obj.id, `You currently have an ongoing non-aggression pact with the nation you're trying to justify on! The non-aggression pact will expire in **${(local_non_aggression_pact.duration != -1) ? parseNumber(local_non_aggression_pact.duration) : "infinite"}** turns.`);
          }
        } else {
          printError(game_obj.id, `You don't have enough Political Capital to justify a wargoal on **${ot_user.name}**! You need ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.justify_wargoal_cost - usr.modifiers.political_capital)}** more Political Capital in order to justify a wargoal on this nation!`);
        }
      } else {
        printError(game_obj.id, `You cannot justify a war on yourself!`);
      }
    } else {
      printError(game_obj.id, `You cannot justify a war on a nonexistent nation!`);
    }
  },

  initialiseJustifyWar: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Justify A Wargoal:`,
      prompts: [
        [`Which country would you like to justify a war against?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`What type of wargoal would you like to use?\n\nType **[View CB List]** to a view a list of all valid CB's.`, "string"]
      ]
    },
    function (arg) {
      module.exports.justifyWar(user_id, arg[0], arg[1]);
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
