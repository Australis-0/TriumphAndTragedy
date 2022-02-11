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
  },

  initialiseDeployUnits: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Deploy Units:`,
      prompts: [
        [`What is the name of the army you would like to deploy your units in?\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        [`Which type of unit would you like to deploy?\n\nType **[View Reserves]** to view a list of all valid units.`, "string"],
        [`How many soldiers would you like to deploy?`, "number", { min: 0 }]
      ]
    },
    function (arg) {
      module.exports.deployUnits(user_id, arg[1], arg[2], arg[0]);
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
