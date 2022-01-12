module.exports = {
  disbandUnitsCommand: function (arg0_user, arg1_amount, arg2_unit_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if unit actually exists
    if (unit_obj) {
      if (!isNaN(amount)) {
        if (amount > 0) {
          if (usr.reserves[raw_unit_name] >= amount) {
            disbandUnits(actual_id, amount, raw_unit_name);
          } else {
            printError(game_obj.id, `You don't have that many **${(unit_obj.name) ? unit_obj.name : raw_unit_name}** in your reserves! You may only disband up to **${parseNumber(usr.reserves[raw_unit_name])}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name}.`)
          }
        } else if (amount == 0) {
          printError(game_obj.id, `You can't disband zero of a unit!`);
        } else {
          printError(game_obj.id, `You can't disband negative units! How does that even work?`);
        }
      } else {
        printError(game_obj.id, `You must specify a valid number of units to disband!`);
      }
    } else {
      printError(game_obj.id, `**${unit_name}** are not a valid type of unit!`);
    }
  }
};
