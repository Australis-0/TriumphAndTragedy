module.exports = {
  initialiseRenameVassal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Vassal:`,
      prompts: [
        [`Whom would you like to change the country name of? The target in question must be your vassal.\n\nType **[Diplomacy]** to view a full list of all your vassals.`, "mention"],
        [`What would you like to rename this vassal to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameVassal(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "diplomacy":
          printDiplomacy(user_id);
          return true;

          break;
      }
    });
  },

  renameVassal: function (arg0_user, arg1_user, arg2_new_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var new_name = arg2_new_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var vassal_obj = getVassal(actual_ot_user_id);

    //Check to see if user is actually a vassal
    if (actual_id != actual_ot_user_id) {
      if (ot_user) {
        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            //Check to make sure that the new name is under 100 characters
            var all_users = Object.keys(main.users);
            var duplicate_name = false;
            var processed_new_name = parseString(new_name);

            for (var i = 0; i < all_users.length; i++)
              if (main.users[all_users[i]].name == processed_new_name)
                duplicate_name = true;

            if (!duplicate_name) {
              if (processed_new_name.length <= 100) {
                var old_vassal_name = JSON.parse(JSON.stringify(ot_user.name));

                ot_user.name = processed_new_name;

                //Print user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully changed the country name of **${old_vassal_name}** to **${ot_user.name}**.`);
              } else {
                printError(game_obj.id, `**${processed_new_name}** exceeded the maximum limit of **100** characters by a total of **${parseNumber(processed_new_name.length - 100)}** character(s)! Consider shortening the name down, or picking another one.`);
              }
            } else {
              printError(game_obj.id, `You can't rename **${ot_user.name}** to **${processed_new_name}**, because someone else already has that name!`);
            }
          } else {
            printError(game_obj.id, `**${ot_user.name}** might be a vassal, but they certainly aren't _your_ vassal, and that's what matters here.`)
          }
        } else {
          printError(game_obj.id, `The target country of **${ot_user.name}** must be vassalised to begin with before it can be bossed around by someone else!`);
        }
      } else {
        printError(game_obj.id, `No one at the Cartography Office seems to know whom that is! Try specifying a valid country name, or type **[View Ledger]** to view a full list of all diplomatically recognised nations.`);
      }
    } else {
      printError(game_obj.id, `You are not your own vassal!`);
    }
  }
};
