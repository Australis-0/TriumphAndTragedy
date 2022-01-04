module.exports = {
  proclaimGuarantee: function (arg0_user, arg1_user) {
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
      //Check that user isn't attempting to protect their own independence
      if (actual_id != actual_ot_user_id) {
        //Check if user has enough political capital
        if (usr.modifiers.political_capital >= config.defines.diplomacy.request_military_access_cost) {
          //Check if target user is already guaranteed
          if (!hasGuarantee(actual_id, actual_ot_user_id)) {
            //Check if user is rival
            if (!hasRivalry(actual_id, actual_ot_user_id)) {
              //Check if user has enough diplomatic slots
              if (usr.diplomacy.used_diplomatic_slots < usr.modifiers.diplomatic_slots) {
                //Deduct Political Capital and send request
                usr.modifiers.political_capital -= config.defines.diplomacy.guarantee_independence_cost;
                usr.diplomacy.used_diplomatic_slots++;

                sendAlert(actual_ot_user_id, config.defines.diplomacy.proclaim_guarantee_alert_id, {
                  FROM: actual_id,
                  TO: actual_ot_user_id
                });

                //Print user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} We have guaranteed the independence of **${ot_user.name}**! Only good can result from this ...`);
              } else {
                printError(game_obj.id, `You are already using your current maximum amount of diplomatic slots! (${config.icons.bureaucrats} **${parseNumber(usr.diplomacy.used_diplomatic_slots)}**/${parseNumber(usr.modifiers.diplomatic_slots)})!\n\nTry cancelling some sort of diplomatic relation first to gain back your slots.`);
              }
            } else {
              printError(game_obj.id, `You can't guarantee the independence of a rival country! Unrival them first.`);
            }
          } else {
            printError(game_obj.id, `You're already protecting the independence of **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `You don't have enough Political Capital remainingto guarantee the indepen of **${ot_user.name}**! You need ${config.icons.political_capital} more **${parseNumber(config.defines.diplomacy.sign_non_aggression_pact_cost - usr.modifiers.political_capital)}** more Political Capital to carry out this action.`);
        }
      } else {
        printError(game_obj.id, `Wait. What.`);
      }
    } else {
      printError(game_obj.id, `You can't protect the independence of a country that doesn't exist!`);
    }
  }
};
