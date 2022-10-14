module.exports = {
  initialiseRenameArmy: function (arg0_user, arg1_army) {
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Rename Army:`,
        prompts: [
          [`What is the current name of the army you would like to rename?\n\nType **[Army List]** for a valid list of all armies.`, "string"],
          [`What should be the new name of this army?`, "string"]
        ]
      },
      function (arg) {
        module.exports.renameArmy(user_id, arg[0], arg[1]);
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
        title: `Rename Army:`,
        prompts: [
          [`What should be the new name of this army?`, "string"]
        ]
      },
      function (arg) {
        module.exports.renameArmy(user_id, army_name, arg[0]);
      });
  },

  renameArmy: function (arg0_user, arg1_old_army_name, arg2_new_army_name, arg3_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var old_army_name = arg1_old_army_name.trim();
    var new_army_name = parseString(arg2_new_army_name.trim());
    var do_not_display = arg3_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, old_army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if the old army object even exists
    if (army_obj) {
      if (new_army_name.length <= 100) {
        //Check to see if army name is duplicate
        var is_duplicate = false;

        for (var i = 0; i < all_armies.length; i++)
          if (usr.armies[all_armies[i]].name.trim().toLowerCase() == new_army_name.trim().toLowerCase())
            is_duplicate = true;

        if (!is_duplicate) {
          var actual_old_army_name = JSON.parse(JSON.stringify(army_obj.name));

          army_obj.name = new_army_name;

          //Print user feedback
          if (!do_not_display)
            printAlert(game_obj.id, `You have successfully renamed the **${actual_old_army_name}** to the **${new_army_name}**!`);

          return [true, "successfully_renamed"];
        } else {
          if (!do_not_display)
            printError(game_obj.id, `The army name you have specified, **${new_army_name}**, already exists!`);

          return [false, "duplicate_name"];
        }
      } else {
        if (!do_not_display)
          printError(game_obj.id, `**${new_army_name}** exceeds the maximum character limit of **100** by **${parseNumber(new_army_name.length - 100)}** characters!`);

        return [false, "invalid_name"];
      }
    } else {
      if (!do_not_display)
        printError(game_obj.id, `No such army by the name of **${old_army_name}** could be found anywhere in your country! Type **[Army List]** to view a valid list of all your armies.`);

      return [false, "missing_army"];
    }
  }
};
