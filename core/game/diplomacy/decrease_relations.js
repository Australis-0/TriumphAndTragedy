module.exports = {
  decreaseRelations: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists
    if (ot_user) {
      //Check if user is targeting themselves
      if (actual_id != actual_ot_user_id) {
        if (usr.modifiers.political_capital >= config.defines.diplomacy.decrease_relations_cost) {
          //Check if relations are already at a minimum
          var current_relations = getRelations(actual_ot_user_id, actual_id);

          if (current_relations[0] > -100) {
            //Check if user is already decreasing relations
            if (current_relations[1].status != "decreasing") {
              //Begin decreasing relations
              usr.modifiers.political_capital -= config.defines.diplomacy.decrease_relations_cost;

              modifyRelations(actual_ot_user_id, {
                target: actual_id,
                value: -50,
                duration: 5
              });

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have begun to deteriorate your relations with **${ot_user.name}** to **${Math.max(current_relations[0] - 50, -100)}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.decrease_relations_cost)}** Political Capital.`);
            } else {
              printError(game_obj.id, `You are already in the process of decreasing relations with **${ot_user.name}**!`)
            }
          } else {
            printError(game_obj.id, `You already have minimum relations with **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `You need ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.decrease_relations_cost - usr.modifiers.political_capital)}** more Political Capital before you can decrease relations with **${ot_user.name}**`);
        }
      } else {
        printError(game_obj.id, `How about practising some positive self-talk instead?`);
      }
    } else {
      printError(game_obj.id, `The person you are trying to insult doesn't even exist!`);
    }
  },

  initialiseDecreaseRelations: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Decrease Relations:`,
      prompts: [
        [`Whom would you like to send a string of insults to?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.decreaseRelations(user_id, arg[0]);
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
