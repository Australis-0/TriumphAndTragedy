module.exports = {
  militaryAccess: function (arg0_user, arg1_user) {
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
      //Check that user isn't attempting to demand military access from themselves
      if (actual_id != actual_ot_user_id) {
        //Check if user has enough political capital
        if (usr.modifiers.political_capital >= config.defines.diplomacy.request_military_access_cost) {
          //Check if user already has military access
          if (!hasMilitaryAccess(actual_id, actual_ot_user_id)) {
            //Deduct Political Capital and send request
            usr.modifiers.political_capital -= config.defines.diplomacy.decrease_relations_cost;

            sendAlert(actual_ot_user_id, config.defines.diplomacy.military_access_request_alert_id, {
              FROM: actual_id,
              TO: actual_ot_user_id
            });

            //Print user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have sent **${ot_user.name}** a request for military access.`);
          } else {
            printError(game_obj.id, `You already have military access to **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `Not enough Political Capital! You need ${config.icons.political_capital} more **${parseNumber(config.defines.diplomacy.request_military_access_cost - usr.modifiers.political_capital)}** more Political Capital to request military access from **${ot_user.name}`);
        }
      } else {
        printError(game_obj.id, `You already have military access with yourself! That's like trying to request access to your own body!`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to request military access of doesn't even exist! Try brushing up on your geography skills ...`);
    }
  },

  initialiseMilitaryAccess: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Request Military Access:`,
      prompts: [
        [`Where do you wish to request military access to?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.militaryAccess(user_id, arg[0]);
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
