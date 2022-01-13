module.exports = {
  deployUnitsCommand: function (arg0_user, arg1_amount, arg2_units, arg3_army_name) { //[WIP] - Update army page if user is currently viewing it
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name;
    var army_name = arg3_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if army_obj exists
    if (army_obj) {
      if (amount > 0) {
        if (unit_obj) {
          var deploy_units = deployUnits(actual_id, amount, raw_unit_name);

          //Print out error message if one exists
          (deploy_units[0]) ?
            printAlert(game_obj.id, deploy_units[1]) :
            printError(game_obj.id, deploy_units[1]);
        } else {
          printError(game_obj.id, `The unit type you have specified, **${unit_name}** doesn't even exist!`);
        }
      } else if (amount == 0) {
        printError(game_obj.id, `You can't deploy zero people, unless ghosts serve in your army!`);
      } else {
        printError(game_obj.id, `How can you even deploy negative people? How does that even work? I know I can deploy a negative brain from you, though.`);
      }
    } else {
      printError(game_obj.id, `The army you have specified, the **${army_name}**, proved nonexistent!`);
    }
  }
};
