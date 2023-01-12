module.exports = {
  declareWar: function (arg0_user, arg1_user, arg2_cb_name) { //[WIP] - Print to news; update war UI if user is currently on it
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var raw_cb_name = arg2_cb_name.trim().toLowerCase();

    //Convert from parameters
    var all_users = Object.keys(main.users);
    var attacker_id = main.global.user_map[user_id];
    var attacker_obj = main.users[attacker_id];
    var cb_obj = getCB(raw_cb_name);
    var game_obj = getGameObject(user_id);
    var defender_id = returnMention(ot_user_id);
    var defender_obj = main.users[defender_id];

    //Check if CB exists
    if (attacker_id != defender_id) {

      if (cb_obj) {
        if (defender_obj) {
          //Check if user has justification
          var actual_raw_cb_name = getCB(raw_cb_name, { return_key: true });
          var has_wargoal = [false, -1]; //[has_wargoal, wargoal_index];

          for (var i = 0; i < attacker_obj.diplomacy.wargoals.length; i++) {
            var local_wargoal = attacker_obj.diplomacy.wargoals[i];

            if (local_wargoal.type == actual_raw_cb_name && local_wargoal.target == defender_id)
              has_wargoal = [true, i];
          }

          if (has_wargoal[0]) {
            //Check if user is allied
            if (!hasAlliance(attacker_id, defender_id)) {
              //Check if user has non-aggression pact
              if (!hasNonAggressionPact(attacker_id, defender_id)) {
                //Check if user is vassal
                var is_vassal_of_attacker = false;

                if (getVassal(defender_id))
                  if (getVassal(defender_id).overlord == attacker_id)
                    is_vassal_of_attacker = true;

                if (!is_vassal_of_attacker) {
                  //Check if users are already at war
                  if (!areAtWar(attacker_id, defender_id)) {
                    //Initialise war
                    initialiseWar({
                      type: getCB(raw_cb_name, { return_key: true }),

                      attacker: attacker_id,
                      defender: defender_id
                    });

                    //Call in guarantors
                    for (var i = 0; i < all_users.length; i++)
                      if (hasGuarantee(all_users[i], defender_id))
                        sendAlert(all_users[i], config.defines.diplomacy.guarantee_alert_id, {
                          TO: all_users[i],
                          FROM: defender_id
                        });

                    //Remove from wargoals
                    attacker_obj.diplomacy.wargoals.splice(has_wargoal[1], 1);

                    //Print out user feedback
                    printAlert(game_obj.id, `${config.icons.defender} You are now at war with **${defender_obj.name}**. In order to call in allies, type **[Call Ally]** from the diplomacy screen. In order to a view a list of ongoing wars, type **[View Wars]**.`);
                  } else {
                    printError(game_obj.id, `You can't declare war on a country you are already at war with!`);
                  }
                } else {
                  printError(game_obj.id, `You can't declare war on your own vassal!`);
                }
              } else {
                printError(game_obj.id, `You can't declare war on a country you have a non-aggression pact with!`);
              }
            } else {
              printError(game_obj.id, `You can't declare war on someone you're already allied to!`);
            }
          } else {
            printError(game_obj.id, `You don't have any **${(cb_obj.name) ? cb_obj.name : actual_raw_cb_name}** on **${defender_obj.name}**! Consider justifying a new wargoal on ${defender_obj.name} using **[Justify Wargoal]** first in order to use this CB.`);
          }
        } else {
          printError(game_obj.id, `The country you are trying to declare war on doesn't even exist!`);
        }
      } else {
        printError(game_obj.id, `The Casus Belli you are attempting to use to declare war, **${raw_cb_name}**, doesn't even exist!`);
      }
    } else {
      printError(game_obj.id, `You can't declare war on yourself!`);
    }
  },

  initialiseDeclareWar: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Declare War:`,
      prompts: [
        [`Which country would you like to declare a war against?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`What type of wargoal would you like to use?\n\nType **[View CB List]** to a view a list of all valid CB's.`, "string"]
      ]
    },
    function (arg) {
      module.exports.declareWar(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "view cb list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCBs(user_id),
            user: game_obj.user
          });
          return true;

          break;
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    });
  }
};
