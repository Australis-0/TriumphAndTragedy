module.exports = {
  breakAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists and is allied
    if (ot_user) {
      if (hasAlliance(actual_id, actual_ot_user_id)) {
        //Check if user has enough Political Capital
        if (usr.modifiers.political_capital >= config.defines.diplomacy.break_alliance_cost) {
          //Remove allied status
          dissolveAlliance(actual_id, actual_ot_user_id);

          usr.diplomacy.used_diplomatic_slots--;
          ot_user.diplomacy.used_diplomatic_slots--;

          sendAlert(actual_ot_user_id, config.defines.diplomacy.alliance_break_alert_id, {
            FROM: actual_id,
            TO: actual_ot_user_id
          });

          //Remove Political Capital
          usr.modifiers.political_capital -= config.defines.diplomacy.break_alliance_cost;

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully broken off your alliance with **${ot_user.name}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.break_alliance_cost)}** Political Capital.`);
        } else {
          printError(game_obj.id, `You must have at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.break_alliance_cost)}** Political Capital before being able to break off one of your alliances!`);
        }
      } else {
        printError(game_obj.id, `You must have an accepted alliance between your two nations before you can break it off!`);
      }
    } else {
      printError(game_obj.id, `You may only break an alliance with another valid user!`);
    }
  },

  initialiseBreakAllianc: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Break An Alliance:`,
      prompts: [
        [`Whom would you like to break an alliance with?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.breakAlliance(user_id, arg[0]);
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
