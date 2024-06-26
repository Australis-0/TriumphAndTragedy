module.exports = {
  initialiseMoveArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Move Multiple Armies:`,
      prompts: [
        [`Please type out the names of the armies you'd like to move.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        [`Which province would you like to move these combat formations into? Please specify a valid numeric Province ID.`, "string"]
      ]
    },
    function (arg) {
      module.exports.moveArmies(user_id, arg[0], arg[1].split(" "));
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
  },

  moveArmies: function (arg0_user, arg1_armies, arg2_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies.trim();
    var provinces = getList(arg2_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var valid_province = true;

    var all_armies = Object.keys(usr.armies);

    //Check to see that the user actually has some armies to begin with
    if (all_armies.length > 0) {
      if (provinces.length > 0) {
        ///Trim provinces first
        for (var i = 0; i < provinces.length; i++)
          provinces[i] = provinces[i].trim();

        var moving_armies = parseArmies(armies_string);

        if (moving_armies.length > 0) {
          var successfully_moved_armies = 0;

          for (var i = 0; i < moving_armies.length; i++) {
            var local_army = getArmy(user_id, moving_armies[i]);

            try {
              successfully_moved_armies = (moveArmy(user_id, local_army, provinces)) ? successfully_moved_armies + 1 : successfully_moved_armies;
            } catch {}
          }

          //Update army_list if user is currently viewing it
          if (game_obj.page == "army_list")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });

          printAlert(game_obj.id, `You have begun successfully moving **${parseNumber(successfully_moved_armies)}**/**${parseNumber(moving_armies.length)}** requested armies to their destination, Province **${provinces[provinces.length - 1]}**.\n\nDifferent armies may arrive at different times.\nType **[View Army]** to see when an army will arrive at a given province.`);
        } else {
          printError(game_obj.id, `You can't move a bunch of nonexistent armies around! Check your spelling and formatting first.\n\nConsider viewing your **[Army List]** to see a full list of your current Order of Battle.`);
        }
      } else {
        printError(game_obj.id, `You must specify a province to move these armies to!`);
      }
    } else {
      printError(game_obj.id, `You don't even have any armies to move around!\n\nTry creating a new army by typing **[Create Army]**, or create multiple armies simultaneously by typing **[Create Armies]**.`);
    }
  }
};
