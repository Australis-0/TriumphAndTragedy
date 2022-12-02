module.exports = {
  initialiseRenameArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Multiple Armies:`,
      prompts: [
        [`Please type out the names of the armies you'd like to rename.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        [`What would you like to rename these combat formations to?\n\nYou may specify armies just as you did previously.`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameArmies(user_id, arg[0], arg[1]);
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

  renameArmies: function (arg0_user, arg1_armies, arg2_names) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies.trim();
    var new_names = parseArmies(arg2_names.trim());

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if user has any armies to begin with
    if (all_armies.length > 0) {
      if (new_names.length > 0) {
        var armies = parseArmies(armies_string);

        if (armies.length > 0) {
          var duplicate_names = 0;
          var has_error = false;
          var invalid_names = 0;
          var missing_armies = 0;
          var missing_names = 0;
          var successfully_renamed = 0;

          for (var i = 0; i < armies.length; i++)
            if (new_names[i]) {
              var rename_army = renameArmy(user_id, armies[i], new_names[i], true);

              if (!rename_army[0]) {
                if (rename_army[1] == "duplicate_name")
                  duplicate_names++;
                if (rename_army[1] == "invalid_name")
                  invalid_names++;
                if (rename_army[1] == "missing_army")
                  missing_armies++;

                has_error = true;
              } else {
                successfully_renamed++;
              }
            } else {
              missing_names++;
            }

          printAlert(game_obj.id, `You have successfully renamed **${parseNumber(successfully_renamed)}**/${parseNumber(armies.length)} armies specified. ${(has_error) ? `Of the remainder:\n\n- **${parseNumber(duplicate_names)}** featured a duplicate name\n- **${parseNumber(invalid_names)}** featured invalid names\n- and **${parseNumber(missing_armies)}** could not be found.` : ""}`);
        } else {
          printError(game_obj.id, `You must specify the armies you wish to rename! You may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.`)
        }
      } else {
        printError(game_obj.id, `You must specify what to rename your armies to! You may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.`);
      }
    } else {
      printError(game_obj.id, `You currently don't have any active armies in service! Create some new ones by typing either **[Create Armies]** to create multiple armies, or by typing **[Create Army]** to create an individual army unit.`);
    }
  }
};
