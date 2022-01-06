module.exports = {
  cancelJustification: function (arg0_user, arg1_user, arg2_cb_name) { //[WIP] - Add to news display
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var casus_belli_name = arg2_cb_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var cb_obj = getCB(casus_belli_name);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var raw_cb_name = getCB(casus_belli_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if other user exists
    if (ot_user) {
      if (cb_obj) {
        //Declare local tracker variables
        var has_justifcation = getJustification(actual_id, {
          target: actual_ot_user_id,
          type: raw_cb_name
        });

        //Check if user has an ongoing justification
        if (has_justifcation) {
          var justification_index = getJustification(actual_id, {
            target: actual_ot_user_id,
            type: raw_cb_name,

            return_index: true
          });

          //Print user feedback
          printAlert(game_obj.id, `We have cancelled our justification of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against **${ot_user.name}**.`);

          //Splice it from the justification array
          usr.diplomacy.justifications.splcie(justification_index, 1);
        } else {
          printError(game_obj.id, `You are not currently justifying a war of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against this country!`);
        }
      } else {
        printError(game_obk.id, `You cannot cancel the justification of a nonexistent CB!`);
      }
    } else {
      printError(game_obj.id, `You cannot cancel your justification against a nonexistent nation!`);
    }
  }
};
