module.exports = {
  deployUnitsCommand: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name;
    var army_name = arg3_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(user_id, army_name);
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if army_obj exists
    if (army_obj) {
      if (usr.available_units.includes(raw_unit_name)) {
        if (usr.reserves[raw_unit_name] >= amount) {
          if (amount > 0) {
            if (unit_obj) {
              var deploy_units = deployUnits(user_id, amount, raw_unit_name, army_obj);

              //Update army page
              if (game_obj.page.includes("army_viewer_")) {
                var army_to_view = game_obj.page.replace("army_viewer_", "");

                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printArmy(user_id, army_to_view),
                  page: interfaces[game_obj.middle_embed.id].page,
                  user: game_obj.user
                });
              } else if (game_obj.page == "reserves") {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printReserves(user_id),
                  user: game_obj.user
                });
              }

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
          (returnSafeNumber(usr.reserves[raw_unit_name]) > 0) ?
            printError(game_obj.id, `You don't have this many **${(unit_obj.name) ? unit_obj.name : raw_unit_name}** in your reserves! You may only deploy up to **${parseNumber(returnSafeNumber(usr.reserves[raw_unit_name]))}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} to the **${army_obj.name}**.`) :
            printError(game_obj.id, `You don't have any **${(unit_obj.name) ? unit_obj.name : raw_unit_name} in your reserves! Recruit some more by typing **[Train Units]**.`);
        }
      } else {
        printError(game_obj.id, `You haven't even unlocked **${(unit_obj.name) ? unit_obj.name : raw_unit_name} yet! Discover their relevant technologies first before being able to craft them.`);
      }
    } else {
      printError(game_obj.id, `The army you have specified, the **${army_name}**, proved nonexistent!`);
    }
  },

  initialiseDeployUnits: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Deploy Units:`,
        prompts: [
          [`How many soldiers would you like to deploy?`, "number", { min: 0 }],
          [`Which type of unit would you like to deploy?\n\nType **[View Reserves]** to view a list of all valid units.`, "string"],
          [`What is the name of the army you would like to deploy your units in?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.deployUnitsCommand(user_id, arg[0], arg[1], arg[2]);
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
          case "view reserves":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printReserves(game_obj.user),
              user: game_obj.user
            });

            break;
        }
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Deploy Units In The ${army_name}:`,
        prompts: [
          [`How many soldiers would you like to deploy?`, "number", { min: 0 }],
          [`Which type of unit would you like to deploy?\n\nType **[View Reserves]** to view a list of all valid units.`, "string"],
        ]
      },
      function (arg) {
        module.exports.deployUnitsCommand(user_id, arg[0], arg[1], army_name);
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
          case "view reserves":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printReserves(game_obj.user),
              user: game_obj.user
            });

            break;
        }
      });
  }
};
