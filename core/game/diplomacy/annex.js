module.exports = {
  annex: function (arg0_user, arg1_user) { //[WIP] - Print out news alert in future
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if the other user exists and is a vassal
    if (ot_user) {
      if (getVassal(ot_user_id)) {
        if (getVassal(ot_user_id).overlord == actual_id) {
          //Check if user has political capital
          if (usr.modifiers.political_capital >= config.defines.diplomacy.annex_cost) {
            //Check to see if actual_ot_user_id is at war
            if (!atWar(ot_user_id)) {
              //Subtract political capital and send alert
              usr.modifiers.political_capital -= config.defines.diplomacy.annex_cost;

              sendAlert(ot_user_id, config.defines.diplomacy.annex_alert_id, {
                TO: actual_ot_user_id,
                FROM: actual_id
              });

              usr.modifiers.infamy += config.defines.diplomacy.infamy_annex_cost;

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} We have sent **${ot_user.name}** an ultimatum for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.annex_cost)}** Political Capital demanding their immediate incorporation into our empire, lest they be consumed by fire.`);
            } else {
              printError(game_obj.id, `You cannot annex a vassal whilst they are at war! Wait for them to be at peace first before annexing them.`);
            }
          } else {
            printError(game_obj.id, `You don't have enough Political Capital to annex **${ot_user.name}** yet! You need an additional ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.annex_cost - usr.modifiers.political_capital)}** Political Capital before being able to send an annexation request to this country.`);
          }
        } else {
          printError(game_obj.id, `You must be the overlord of **${ot_user.name}** in order to annex it into your country!`);
        }
      } else {
        printError(game_obj.id, `You may only demand the annexation of someone that is currently your vassal!`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to annex into your country doesn't even exist!`);
    }
  },

  initialiseAnnex: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Integrate A Vassal:`,
      prompts: [
        [`Which of your vassals would you like to forcibly integrate into your country?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.annex(user_id, arg[0]);
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
