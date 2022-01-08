module.exports = {
  declareWar: function (arg0_user, arg1_user, arg2_cb_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var raw_cb_name = arg2_cb_name.trim().toLowerCase();

    //Convert from parameters
    var attacker_id = main.global.user_map[user_id];
    var attacker_obj = main.users[attacker_id];
    var cb_obj = getCB(raw_cb_name);
    var defender_id = main.global.user_map[ot_user_id];
    var defender_obj = main.users[defender_id];

    //Check if CB exists
    if (attacker_id != defender_id) {

      if (cb_obj) {
        if (defender_obj) {
          //Check if user has justification
          var actual_raw_cb_name = getCB(raw_cb_name, { return_key: true });
          var has_wargoal = [false, -1]; //[has_wargoal, wargoal_index];

          for (var i = 0; i < usr.diplomacy.wargoals.length; i++) {
            var local_wargoal = usr.diplomacy.wargoals[i];

            if (local_wargoal.type == actual_raw_cb_name && local_wargoal.target == defender_id)
              has_wargoal = [true, i];
          }

          if (has_wargoal[0]) {
            //Check if user is allied
            if (!hasAlliance(attacker_id, defender_id)) {
              //Check if user has non-aggression pact
              if (!hasNonAggressionPact(attacker_id, defender_id)) {
                //Check if user is vassal
                var is_vassal_of_attacker = false;

                if (getVassal(defender_id))
                  if (getVassal(defender_id).overlord == attacker_id)
                    is_vassal_of_attacker = true;

                if (!is_vassal_of_attacker) {
                  //Check if users are already at war
                } else {
                  printError(game_obj.id, `You can't declare war on your own vassal!`);
                }
              } else {
                printError(game_obj.id, `You can't declare war on a country you have a non-aggression pact with!`);
              }
            } else {
              printError(game_obj.id, `You can't declare war on someone you're already allied to!`);
            }
          } else {
            printError(game_obj.id, `You don't have any **${(cb_obj.name) ? cb_obj.name : actual_raw_cb_name}** on **${ot_user.name}**! Consider justifying a new wargoal on ${ot_user.name} using **[Justify Wargoal]** first in order to use this CB.`);
          }
        } else {
          printError(game_obj.id, `The country you are trying to declare war on doesn't even exist!`);
        }
      } else {
        printError(game_obj.id, `The Casus Belli you are attempting to use to declare war, **${raw_cb_name}**, doesn't even exist!`);
      }
    } else {
      printError(game_obj.id, `You can't declare war on yourself!`);
    }
  }
};
