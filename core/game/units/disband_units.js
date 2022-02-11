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
  },

  initialiseDisbandUnitsCommand: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Disband Units:`,
      prompts: [
        [`Which type of unit would you like to disband?\n\nCheck your **[Reserves]** for a full list of available units to disband.`, "string"],
        [`How many units would you like to demobilise?`, "number", { min: 1 }]
      ]
    },
    function (arg) {
      module.exports.disbandUnitsCommand(user_id, arg[1], arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "reserves":
        case "view reserves":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printReserves(game_obj.user),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  }
};
