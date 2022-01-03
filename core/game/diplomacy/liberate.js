module.exports = {
  liberate: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists and is a vassal of usr
    if (ot_user) {
      //Check if user are themselves
      if (actual_id != actual_ot_user_id) {
        //Check if user is underneath their overlordship
        if (getVassal(actual_ot_user_id).overlord == actual_id) {
          //Remove used diplomatic slot
          usr.diplomacy.used_diplomatic_slots--;

          //Send alert
          sendAlert(actual_ot_user_id, config.defines.diplomacy.liberation_alert_id, {
            FROM: actual_id,
            TO: actual_ot_user_id
          });

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} We have let our vassal, **${ot_user.name}** go free.`);
        } else {
          printError(game_obj.id, `**${ot_user.name}** is not a vassal underneath your control!`);
        }
      } else {
        printError(game_obj.id, `You cannot unvassalise yourself!`);
      }
    } else {
      printError(game_obj.id, `You cannot liberate a nonexistent vassal not under your control!`);
    }
  }
};
