module.exports = {
  relieveUnitsCommand: function (arg0_user, arg1_amount, arg2_unit_name, arg3_army_name) {
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

    //Check for the usual
    if (army_obj) {
      if (unit_obj) {
        if (amount > 0) {
          var relieved_units = relieveUnits(user_id, amount, raw_unit_name, army_obj.name);

          //Update army page
          if (game_obj.page.includes("army_viewer_")) {
            var army_to_view = game_obj.page.replace("army_viewer_", "");

            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmy(user_id, army_to_view),
              page: interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          }

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
  },

  initialiseRelieveUnits: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Relieve Units:`,
        prompts: [
          [`How many soldiers would you like to put back in your reserves?`, "number", { min: 0 }],
          [`Which type of unit would you like to relieve?`, "string"],
          [`What is the name of the army you would like to relieve your units from?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.relieveUnitsCommand(user_id, arg[0], arg[1], arg[2]);
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
        title: `Relieve Units From ${army_name}:`,
        prompts: [
          [`How many soldiers would you like to put back in your reserves?`, "number", { min: 0 }],
          [`Which type of unit would you like to relieve?`, "string"]
        ]
      },
      function (arg) {
        module.exports.relieveUnitsCommand(user_id, arg[0], arg[1], army_name);
      });
  }
};
