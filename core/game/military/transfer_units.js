module.exports = {
  transferUnits: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name, arg4_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name.trim().toLowerCase();
    var army_name = arg3_army_name.trim().toLowerCase();
    var new_army_name = arg4_army_name.trim().toLowerCase();

    //Convert from parameters
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var ot_army_obj = getArmy(actual_id, new_army_name);
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
                if (army_obj != ot_army_obj) {
                  var deployment = deployUnits(actual_id, amount, raw_unit_name, army_obj.name, { spawn_units: true });

                  if (deployment[0]) {
                    army_obj.units[raw_unit_name] -= amount;

                    if (army_obj.units[raw_unit_name] == 0)
                      delete army_obj.units[raw_unit_name];

                    //Update army page
                    if (game_obj.page.includes("army_viewer_")) {
                      var army_to_view = game_obj.page.replace("army_viewer_", "");

                      createPageMenu(game_obj.middle_embed, {
                        embed_pages: printArmy(user_id, army_to_view),
                        page: interfaces[game_obj.middle_embed.id].page,
                        user: game_obj.user
                      });
                    }

                    //Print user feedback
                    printAlert(game_obj.id, `You have successfully transferred **${parseNumber(amount)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from the **${army_obj.name}** to the **${ot_army_obj.name}**.`);
                  } else {
                    printError(game_obj.id, deployment[1]);
                  }
                } else {
                  printError(game_obj.id, `You can't transfer units from the **${army_obj.name}** to itself!`);
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
  },

  initialiseTransferUnits: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Transfer Units Between Armies:`,
        prompts: [
          [`How many soldiers would you like to transfer?`, "number", { min: 0 }],
          [`Which type of unit would you like to transfer?`, "string"],
          [`Which army would you like to transfer units from?\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
          [`Which army would you like to transfer these soldiers to?\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        ]
      },
      function (arg) {
        module.exports.transferUnits(user_id, arg[0], arg[1], arg[2], arg[3]);
      },
      function (arg) {
        switch (arg) {
          case "army list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              user: game_obj.user
            });
            return true;

            break;
        }
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Transfer Units From ${army_name} To Another Army:`,
        prompts: [
          [`How many soldiers would you like to transfer?`, "number", { min: 0 }],
          [`Which type of unit would you like to transfer?`, "string"],
          [`Which army would you like to transfer these soldiers to?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.transferUnits(user_id, arg[0], arg[1], army_name, arg[2]);
      },
      function (arg) {
        switch (arg) {
          case "army list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              user: game_obj.user
            });
            return true;

            break;
        }
    });
  }
};
