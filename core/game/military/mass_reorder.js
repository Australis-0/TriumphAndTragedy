module.exports = {
  massReorder: function (arg0_user, arg1_armies, arg2_unit_name, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_reorder_string = arg1_armies.trim();
    var unit_name = arg2_unit_name.trim();
    var options = (arg3_options) ? arg3_options: {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Make sure user has armies available for reordering
    if (all_armies.length > 0) {
      var army_array = parseArmies(army_reorder_string);
      var unit_obj = getUnit(unit_name);

      if (army_array.length > 0) {
        if (unit_obj) {
          var successfully_reordered = 0;

          //Reorder units
          for (var i = 0; i < army_array.length; i++) {
            var reordered_army = reorderUnits(user_id, army_array[i], unit_name, options);

            if (reordered_army)
              if (reordered_army[0])
                successfully_reordered++;
          }

          //Return success messages
          (successfully_reordered == army_array.length) ?
            printAlert(game_obj.id, `You have successfully moved **${unit_obj.name}** ${(options.direction == "up") ? "up" : "down"} **${parseNumber(options.amount)}** columns in **${parseNumber(army_array.length)}** armies.`) :
            printAlert(game_obj.id, `You have successfully moved **${unit_obj.name}** ${(options.direction == "up") ? "up" : "down"} **${parseNumber(options.amount)}** columns in **${parseNumber(successfully_reordered)}**/${parseNumber(army_array.length)} armies.`);
        } else {
          printError(game_obj.id, `No unit by the name of **${unit_name}** could be found!`);
        }
      } else {
        printError(game_obj.id, `You have specified invalid army input(s)! Please check your spelling and formatting.`);
      }
    } else {
      printError(game_obj.id, `You currently have no active armies in service, empty or not!`);
    }
  },

  initialiseMassReorder: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Reorder Units In Multiple Armies`,
      prompts: [
        [`Please type out the names of the armies you'd like to reorder units in.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.\nType 'none' to use available armies instead.`, "string"],
        [`How many positions down/up would you like to move this unit?`, "number", { min: 0 }],
        [`What type of unit would you like to reorder in these armies?`, "string"],
        [`Type "up" to send this unit closer to the frontlines. Type "down" to send this unit towards the rear.`, "string"]
      ]
    },
    function (arg) {
      module.exports.massReorder(user_id, arg[0], arg[2], {
        direction: arg[3].toLowerCase(),
        amount: arg[1]
      });
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
