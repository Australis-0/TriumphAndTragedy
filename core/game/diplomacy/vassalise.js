module.exports = {
  vassalise: function (arg0_user, arg1_user) {
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
      if (actual_id != actual_ot_user_id) {
        //Check if user is already vassalised
        if (!getVassal(ot_user)) {
          //Check if user has enough Political Capital
          if (usr.modifiers.political_capital >= config.defines.diplomacy.vassalise_cost) {
            //Check if user has enough diplomatic slots remaining
            if (usr.diplomacy.used_diplomatic_slots < usr.modifiers.diplomatic_slots) {
              //Deduct Political Capital
              usr.modifiers.political_capital -= config.defines.diplomacy.vassalise_cost;

              //Send vassalisation request alert
              sendAlert(actual_ot_user_id, config.defines.diplomacy.vassalisation_request_alert_id, {
                FROM: actual_id,
                TO: actual_ot_user_id
              });

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} We have sent **${ot_user.name}** a request for them to become our vassal.`);
            } else {
              printError(game_obj.id, `You are already using your current maximum amount of diplomatic slots! (${config.icons.bureaucrats} **${parseNumber(usr.diplomacy.used_diplomatic_slots)}**/${parseNumber(usr.modifiers.diplomatic_slots)})!\n\nTry cancelling some sort of diplomatic relation first to gain back your slots.`);
            }
          } else {
            printError(game_obj.id, `You don't have enough Political Capital to request the vassalisation of another country! You need ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.vassalise_cost - usr.modifiers.political_capital)}** more Political Capital in order to send this request to **${ot_user.name}**.`);
          }
        } else {
          printError(game_obj.id, `**${ot_user.name}** is already vassalised!`);
        }
      } else {
        printError(game_obj.id, `It's physically impossible to prostrate yourself to yourself. Try demanding vassalisation from a real country.`);
      }
    } else {
      printError(game_obj.id, `You can't run around sending vassalisation requests to countries you've never even heard of! How about Shangri-La?`);
    }
  },

  initialiseVassalise: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Demand Vassalisation:`,
      prompts: [
        [`Which country would you like to demand the immediate vassalisation of?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.vassalise(user_id, arg[0]);
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
