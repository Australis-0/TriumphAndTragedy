module.exports = {
  nonAggressionPact: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if ot_user exists
    if (ot_user) {
      //Check that user isn't attempting to sign a non-aggression pact with themselves
      if (actual_id != actual_ot_user_id) {
        //Check if user has enough political capital
        if (usr.modifiers.political_capital >= config.defines.diplomacy.request_military_access_cost) {
          //Check if user already has a non-aggression pact with the target user
          if (!hasNonAggressionPact(actual_id, actual_ot_user_id)) {
            //Check if user has enough diplomatic slots
            if (usr.diplomacy.used_diplomatic_slots < usr.modifiers.diplomatic_slots) {
              //Deduct Political Capital and send request
              usr.modifiers.political_capital -= config.defines.diplomacy.sign_non_aggression_pact_cost;

              sendAlert(actual_ot_user_id, config.defines.diplomacy.non_aggression_pact_request_alert_id, {
                FROM: actual_id,
                TO: actual_ot_user_id
              });

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a request for a non-aggression pact to **${ot_user.name}**.`);
            } else {
              printError(game_obj.id, `You are already using your current maximum amount of diplomatic slots! (${config.icons.bureaucrats} **${parseNumber(usr.diplomacy.used_diplomatic_slots)}**/${parseNumber(usr.modifiers.diplomatic_slots)})!\n\nTry cancelling some sort of diplomatic relation first to gain back your slots.`);
            }
          } else {
            printError(game_obj.id, `You already have military access to **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `You don't have enough Political Capital to carry out this request! You need ${config.icons.political_capital} more **${parseNumber(config.defines.diplomacy.sign_non_aggression_pact_cost - usr.modifiers.political_capital)}** more Political Capital to send out a request for a non-aggression pact to **${ot_user.name}`);
        }
      } else {
        printError(game_obj.id, `Are you scared you're planning on invading yourself?`);
      }
    } else {
      printError(game_obj.id, `You can't be terrified enough of a nonexistent country to request a non-aggression pact with them!`);
    }
  },

  initialiseNonAggressionPact: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Sign Non-Aggression Pact:`,
      prompts: [
        [`What country would you like to try signing a non-aggression pact with?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.nonAggressionPact(user_id, arg[0]);
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
