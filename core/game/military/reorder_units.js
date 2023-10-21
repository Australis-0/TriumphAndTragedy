module.exports = {
  reorderUnitsInArmy: function (arg0_user, arg1_army_name, arg2_unit_name, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();
    var unit_name = arg2_unit_name.trim();
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(user_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Attempt reordering units
    var reorder_units = reorderUnits(user_id, army_obj, unit_name, options);

    printAlert(game_obj.id, reorder_units[1]);

    //Update army_list if user is currently viewing it
    if (game_obj.page == "army_list")
      createPageMenu(game_obj.middle_embed, {
        embed_pages: printArmyList(user_id),
        page: main.interfaces[game_obj.middle_embed.id].page,
        user: game_obj.user
      });

    //Update army page
    if (game_obj.page.includes("army_viewer_")) {
      var army_to_view = game_obj.page.replace("army_viewer_", "");

      createPageMenu(game_obj.middle_embed, {
        embed_pages: printArmy(user_id, army_to_view),
        page: interfaces[game_obj.middle_embed.id].page,
        user: game_obj.user
      });
    }
  },

  initialiseReorderUnits: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    (army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Reorder Units:`,
        prompts: [
          [`How many positions up/down would you like to move this unit?`, "number", { min: 0 }],
          [`What type of unit would you like to reorder in this army?`, "string"],
          [`Type "up" to send this unit closer to the frontlines. Type "down" to send this unit towards the rear.`, "string"]
        ]
      },
      function (arg) {
        module.exports.reorderUnitsInArmy(user_id, army_name, arg[1], {
          direction: arg[2].toLowerCase(),
          amount: arg[0]
        });
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Reorder Units:`,
        prompts: [
          [`Which army would you like to reorder units in?\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
          [`How many positions down/up would you like to move this unit?`, "number", { min: 0 }],
          [`What type of unit would you like to reorder in this army?`, "string"],
          [`Type "up" to send this unit closer to the frontlines. Type "down" to send this unit towards the rear.`, "string"]
        ]
      },
      function (arg) {
        module.exports.reorderUnitsInArmy(user_id, arg[0], arg[2], {
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
