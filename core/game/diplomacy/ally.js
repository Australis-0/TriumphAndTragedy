module.exports = {
  ally: function (arg0_user, arg1_user) { //[WIP] - If the other user already has an alliance pending, just accept it
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
      if (usr.modifiers.political_capital >= config.defines.diplomacy.form_alliance_cost) {
        //Check if ally is yourself, already an ally, or a rival
        if (!hasAlliance(actual_id, actual_ot_user_id)) {
          if (!hasRivalry(actual_id, actual_ot_user_id)) {
            if (actual_id != actual_ot_user_id) {
              //Check if an alliance is already pending
              var alliance_is_pending = false;

              if (usr.allies[actual_ot_user_id])
                if (usr.allies[actual_ot_user_id].status == "pending")
                  alliance_is_pending = true;

              if (!alliance_is_pending) {
                //Check if relations are high enough
                if (getRelations(actual_id, actual_ot_user_id)[0] >= config.defines.diplomacy.alliance_relation_threshold) {
                  if (usr.diplomacy.used_diplomatic_slots < usr.modifiers.diplomatic_slots) {
                    //Pending alliances take 1 diplomatic slot and cost PC
                    usr.diplomacy.used_diplomatic_slots++;
                    usr.modifiers.political_capital -= config.defines.diplomacy.alliance_relation_threshold;

                    //Send diplomatic alert to other user
                    sendAlert(actual_ot_user_id, config.defines.diplomacy.alliance_alert_id, {
                      FROM: actual_id,
                      TO: actual_ot_user_id
                    });

                    //Declare pending alliance object


                    //Print out user feedback
                  } else {
                    printError(game_obj.id, `You do not have enough diplomatic slots remaining to propose an alliance!`);
                  }
                } else {
                  printError(game_obj.id, `You must have at leas **${parseNumber(config.defines.diplomacy.alliance_relation_threshold, { display_prefix: true })}** Relations with **${ot_user.name}** in order to propose an alliance!`);
                }
              } else {
                printError(game_obj.id, `You already have an alliance request pending with **${ot_user.name}**!`);
              }
            } else {
              printError(game_obj.id, `You can't ally yourself!`);
            }
          } else {
            printError(game_obj.id, `You can't ally a rival!`);
          }
        } else {
          printError(game_obj.id, `You already have an alliance with **${ot_user.name}**!`);
        }
      } else {
        printError(game_obj.id, `You don't have enough Political Capital to propose an alliance! You must have at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.form_alliance_cost - usr.modifiers.political_capital)}** more Political Capital in order to form an alliance.`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to conduct diplomatic relationships with does not exist!`);
    }
  }
};
