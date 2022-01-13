module.exports = {
  transferUnits: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name, arg4_army_name) { //[WIP] - Update army UI if user is currently on it
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name.trim().toLowerCase();
    var new_army_name = arg4_army_name.trim().toLowerCase();

    //Convert from parameters
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(army_name);
    var game_obj = getGameObject(user_id);
    var ot_army_obj = getArmy(new_army_name);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if both armies exist
    if (army_obj) {
      if (ot_army_obj) {
        if (unit_obj) {
          var all_units = Object.keys(army_obj.units);

          if (all_units.includes(raw_unit_name)) {
            if (amount > 0) {
              //Check if the original army really has this many units of this type
              if (army_obj.units[raw_unit_name] >= amount) {
                var deployment = deployUnits(actual_id, amount, raw_unit_name, army_obj.name, { spawn_units: true });

                if (deployment[0]) {
                  army_obj.units[raw_unit_name] -= amount;

                  if (army_obj.units[raw_unit_name] == 0)
                    delete army_obj.units[raw_unit_name];

                  //Print user feedback
                  printAlert(game_obj.id, `You have successfully transferred **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from the **${army_obj.name}** to the **${ot_army_obj.name}**.`);
                } else {
                  printError(game_obj.id, deployment[1]);
                }
              } else {
                printError(game_obj.id, `The **${army_obj.name}** doesn't have this many **${(unit_obj.name) ? unit_obj.name : raw_unit_name}** available for transfer! You may only transfer up to **${parseNumber(army_obj.units[raw_unit_name])}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from this army.`);
              }
            } else if (amount == 0) {
              printError(game_obj.id, `You can't transfer ghosts between armies!`);
            } else {
              printError(game_obj.id, `You can't transfer negative units between armies!`);
            }
          } else {
            printError(game_obj.id, `**${(unit_obj.name) ? unit_obj.name : raw_unit_name}** could not be found in **${army_obj.name}**! Make sure to **[View ${army_obj.name}]** for a full list of valid units available for transfer.`);
          }
        } else {
          printError(game_obj.id, `**${unit_name}** is not a valid type of unit that you can transfer! Make sure to **[View ${army_obj.name}]** for a full list of valid units available for transfer.`);
        }
      } else {
        printError(game_obj.id, `You can't transfer units to a nonexistent army! Check your **[Army List]** for a full view of all armies under your control, or consider creating a new army. ¦ **[Create Army]**`);
      }
    } else {
      printError(game_obj.id, `You can't transfer units from a nonexistent army! Check your **[Army List]** for a full view of all armies under your control.`);
    }
  }
};
