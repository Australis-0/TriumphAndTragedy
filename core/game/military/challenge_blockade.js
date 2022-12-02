module.exports = {
  challengeBlockade: function (arg0_user, arg1_user, arg2_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var army_name = arg2_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var army_obj = (typeof army_name != "object") ? getArmy(user_id, army_name.trim().toLowerCase()) : army_name;
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check to see if the user is currently blockaded
    if (isBlockaded(ot_user_id)) {
      //Check if user is currently being blockaded by actual_id
      var blockade_obj = ot_user.blockaded;
      var friendly_forces = [];
      var is_being_blockaded_by_own_forces = false;

      for (var i = 0; i < blockade_obj.fleets.length; i++)
        if (blockade_obj.fleets[i].id == actual_id)
          friendly_forces.push(`**${main.users[blockade_obj.fleets[i].id].armies[blockade_obj.fleets[i].fleet_id].name}**`);

      if (!is_being_blockaded_by_own_forces) {
        if (army_obj) {
          if (!army_obj.is_blockading) {
            if (returnSafeNumber(army_obj.challenged_this_turn) <= config.defines.combat.blockade_challenge_limit) {
              //Increment how much the army in question has challenged blockades this turn
              army_obj.challenged_this_turn = (army_obj.challenged_this_turn) ?
                army_obj.challenged_this_turn + 1 :
                1;

              var random_navy = randomElement(blockade_obj.fleets);

              //Initialise battle
              initialiseBattle(user_id, army_obj, random_navy.id, main.users[random_navy.id].armies[random_navy.fleet_id]);

              //Print user feedback
              printAlert(game_obj.id, `You have decided to challenge the blockade imposed on **${ot_user.name}** ..`);
            } else {
              printError(game_obj.id, `You can only challenge a blockade with the same fleet for up to **${parseNumber(config.defines.combat.blockade_challenge_limit)}** times per turn! Wait until next turn to challenge more blockades with this fleet.`);
            }
          } else {
            printError(game_obj.id, `**${army_obj.name}** is currently blockading someone! Withdraw it from an active blockade first before using it to challenge someone.`);
          }
        } else {
          printError(game_obj.id, `The fleet you have specified, the **${army_name}**, could not be found!`);
        }
      } else {
        printError(game_obj.id, `**${ot_user.name}** is currently being blockaded by elements of the ${parseList(friendly_forces)}! Withdraw them from the blockade first before challenging it.`);
      }
    } else {
      printError(game_obj.id, `**${ot_user.name}** is not currently being blockaded by foreign forces!`);
    }
  },

  initialiseChallengeBlockade: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Challenge Blockade:`,
        prompts: [
          [`Which country would you like to challenge the blockade on?\n\nType **[View Ledger]** to view a ledger of all valid nations.`, "mention"],
          [`What is the name of the fleet you would like to send to relieve the blockade on this country?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.challengeBlockade(user_id, arg[0], arg[1]);
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
          case "view ledger":
            printLedger(user_id);
            return true;

            break;
        }
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Challenge A Blockade w/ the ${army_name}:`,
        prompts: [
          [`Which country would you like to challenge the blockade on?\n\nType **[View Ledger]** to view a ledger of all valid nations.`, "mention"]
        ]
      },
      function (arg) {
        module.exports.challengeBlockade(user_id, arg[0], army_name);
      },
      function (arg) {
        switch (arg) {
          case "view ledger":
            printLedger(user_id);
            return true;

            break;
        }
      });
  }
};
