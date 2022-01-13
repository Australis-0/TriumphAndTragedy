module.exports = {
  moveArmyCommand: function (arg0_user, arg1_army_name, arg2_province_id) { //[WIP] - Update printArmy() if user is currently on it
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();
    var province_id = arg2_province_id.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    //Check to see if the army actually exists
    if (army_obj) {
      if (province_obj) {
        var move_command = moveArmy(actual_id, army_obj.name, province_id);

        //Print user feedback
        (move_command[0]) ?
          printAlert(game_obj.id, move_command[1]) :
          printError(game_obj.id, move_command[1]);
      } else {
        printError(game_obj.id, `Your cartographers are still struggling from overwork from just trying to find the nonexistent province of **${province_id}**! Please specify a valid province to move to on the map. `);
      }
    } else {
      printError(game_obj.id, `The army you have specified, the **${army_name}**, doesn't even exist!`);
    }
  }
};
