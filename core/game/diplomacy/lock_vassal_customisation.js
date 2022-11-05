module.exports = {
  lockVassalCustomisation: function (arg0_user, arg1_mode) {
    //Convert from parameters
    var user_id = arg0_user;
    var lock_mode = arg1_mode;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check to see if overlord has any vassals to begin with
    if (Object.keys(usr.diplomacy.vassals).length > 0) {
      var all_vassals = Object.keys(usr.diplomacy.vassals);

      if (lock_mode == "lock") {
        for (var i = 0; i < all_vassals.length; i++) {
          var local_vassal = main.users[usr.diplomacy.vassals[all_vassals[i]].id];

          local_vassal.options.customisation_locked = true;
        }

        usr.options.vassal_customisation_locked = true;

        printAlert(game_obj.id, `${config.icons.checkmark} **You have successfully locked national customisation for all your vassals.`);
      } else if (lock_mode == "unlock") {
        for (var i = 0; i < all_vassals.length; i++) {
          var local_vassal = main.users[usr.diplomacy.vassals[all_vassals[i]].id];

          local_vassal.options.customisation_locked = false;
        }

        usr.options.vassal_customisation_locked = false;

        printAlert(game_obj.id, `${config.icons.checkmark} **You have successfully unlocked national customisation for all your vassals.`);
      }
    } else {
      printError(game_obj.id, `You don't even have any vassals to issue diktats for! Boss yourself around first.`);
    }
  }
};
