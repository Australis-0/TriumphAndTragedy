module.exports = {
  relieveUnitsCommand: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name) {
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

    //Check for the usual
    if (army_obj) {
      if (unit_obj) {
        if (amount > 0) {
          var relieved_units = relieveUnits(actual_id, amount, raw_unit_name, army_obj.name);

          //Print out user feedback
          (relieved_units[0]) ?
            printAlert(game_obj.id, relieved_units[1]) :
            printError(game_obj.id, relieved_units[1]);
        } else if (amount == 0) {
          printError(game_obj.id, `You can't withdraw ghosts from an army!`);
        } else {
          printError(game_obj.id, `You can't withdraw negative troops from an army. This isn't 1984 where you can just invent fictitious war heroes.`);
        }
      } else {
        printError(game_obj.id, `No unit by the name of **${unit_name}** could be found!`);
      }
    } else {
      printError(game_obj.id, `No army by the name of the **${army_name}** could be found in your country! Check your **[Army List]** for a comprehensive overview of all your armies.`);
    }
  }
};
