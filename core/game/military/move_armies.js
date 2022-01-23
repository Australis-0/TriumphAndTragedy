module.exports = {
  moveArmies: function (arg0_user, arg1_armies, arg2_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies.trim();
    var province_id = arg2_province_id.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see that the user actually has some armies to begin with
    if (all_armies.length > 0) {
      if (province_obj) {
        var moving_armies = parseArmies(armies_string);

        if (moving_armies.length > 0) {
          var successfully_moved_armies = 0;

          for (var i = 0; i < moving_armies.length; i++) {
            var local_army = getArmy(actual_id, moving_armies[i]);

            try {
              successfully_moved_armies = (moveArmy(actual_id, moving_armies[i], province_id)) ? successfully_moved_armies + 1 : successfully_moved_armies;
            } catch {}
          }

          printAlert(game_obj.id, `You have begun successfully moving **${parseNumber(successfully_moved_armies)}**/**${parseNumber(moving_armies.length)}** requested armies to their destination, Province **${province_id}**.\n\nDifferent armies may arrive at different times.\nType **[View Army]** to see when an army will arrive at a given province.`);
        } else {
          printError(game_obj.id, `You can't move a bunch of nonexistent armies around! Check your spelling and formatting first.\n\nConsider viewing your **[Army List]** to see a full list of your current Order of Battle.`);
        }
      } else {
        printError(game_obj.id, `The province you have specified, **${province_id}** could not be found on the charts of any of our cartographers!\n\nTry taking a look at the map first to find a valid province to move your armies to.`);
      }
    } else {
      printError(game_obj.id, `You don't even have any armies to move around!\n\nTry creating a new army by typing **[Create Army]**, or create multiple armies simultaneously by typing **[Create Armies]**.`);
    }
  }
};
