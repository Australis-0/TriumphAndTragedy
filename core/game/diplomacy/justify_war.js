module.exports = {
  justifyWar: function (arg0_user, arg1_user) { //[WIP] - Send out news alert to other countries when someone is being justified on
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

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
                  //Check if user has a valid CB
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
  }
};
