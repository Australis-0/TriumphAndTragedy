module.exports = {
  cancelWargoal: function (arg0_user, arg1_user, arg2_cb_name) { //[WIP] - Add to news display; initWar()
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

    //Check if other user exists and has a valid wargoal
    if (ot_user) {
      if (cb_obj) {
        var has_valid_wargoal = [false, -1]; //[has_valid_wargoal, wargoal_index];

        for (var i = 0; i < usr.diplomacy.wargoals.length; i++) {
          var local_wargoal = usr.diplomacy.wargoals[i];

          if (local_wargoal.type == raw_cb_name && local_wargoal.target == actual_ot_user_id)
            has_valid_wargoal = [true, i];
        }

        if (has_valid_wargoal[0]) {
          //Print user feedback
          printAlert(game_obj.id, `We have forgiven **${ot_user.name}** and have dropped our wargoal of **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** against them.`);

          //Cancel wargoal by splicing
          usr.diplomacy.wargoals.splice(has_valid_wargoal[1], 1);
        } else {
          printError(game_obj.id, `You do not currently have a **${(cb_obj.name) ? cb_obj.name : raw_cb_name}** Wargoal against **${ot_user.name}**!`);
        }
      } else {
        printError(game_obj.id, `The wargoal you have specified to forgive proved nonexistent! View **[CB List]** for a valid list of all casus belli.`);
      }
    } else {
      printError(game_obj.id, `You can't cancel a nonexistent wargoal against a nonexistent nation!`);
    }
  }
};
