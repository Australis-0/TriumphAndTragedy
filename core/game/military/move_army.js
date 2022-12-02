module.exports = {
  moveArmyCommand: function (arg0_user, arg1_army_name, arg2_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();
    var provinces = getList(arg2_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var valid_province = true;

    //Check to see if the army actually exists
    if (army_obj) {
      if (provinces.length > 0) {
        //Trim provinces first
        for (var i = 0; i < provinces.length; i++)
          provinces[i] = provinces[i].trim();

        var move_command = moveArmy(actual_id, army_obj, provinces);

        //Print user feedback
        (move_command[0]) ?
          printAlert(game_obj.id, move_command[1]) :
          printError(game_obj.id, move_command[1]);

        if (game_obj.page.includes("army_viewer_")) {
          var army_to_view = game_obj.page.replace("army_viewer_", "");

          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmy(user_id, army_to_view),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });
        }
      } else {
        printError(game_obj.id, `You must specify a province to move the **${army_name}** to!`);
      }
    } else {
      printError(game_obj.id, `The army you have specified, the **${army_name}**, doesn't even exist!`);
    }
  },

  initialiseMoveArmy: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Move Army:`,
        prompts: [
          [`What's the name of the army you would like to move?\n\nType **[Army List]** for a valid list of all armies.`, "string"],
          [`What is the ID of the province you would like to move this army to? You may specify multiple Province ID's as waypoints.`, "string"]
        ]
      },
      function (arg) {
        module.exports.moveArmyCommand(user_id, arg[0], arg[1].split(" "));
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
        title: `Move ${army_name}:`,
        prompts: [
          [`What is the ID of the province you would like to move this army to? You may specify multiple Province ID's as waypoints.`, "string"]
        ]
      },
      function (arg) {
        module.exports.moveArmyCommand(user_id, army_name, arg[0].split(" "));
      });
  }
};
