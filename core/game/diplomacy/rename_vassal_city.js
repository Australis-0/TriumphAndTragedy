module.exports = {
  initialiseRenameVassalCity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Vassal-Controlled City:`,
      prompts: [
        [`What is the current name of the city you would like to rename?`, "string"],
        [`Which of your vassals currently controls this city?\n\nType **[Diplomacy]** to view a full list of all your vassals.`, "mention"],
        [`What would you like to rename this vassal to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameVassalCity(user_id, arg[1], arg[0], arg[2]);
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

  renameVassalCity: function (arg0_user, arg1_vassal, arg2_old_city_name, arg3_new_city_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_vassal;
    var old_city_name = arg2_old_city_name.trim();
    var new_city_name = arg3_new_city_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[user_id];
    var city_obj = getCity(old_city_name, { users: [ot_user_id] });
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var vassal_obj = getVassal(ot_user_id);

    //Check to see if user is actually a vassal
    if (actual_id != actual_ot_user_id) {
      if (ot_user) {
        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            if (city_obj) {
              if (city_obj.controller == actual_ot_user_id) {
                //Check to make sure that the new name is under 100 characters
                var all_provinces = Object.keys(main.provinces);
                var duplicate_name = false;
                var processed_new_name = parseString(new_name);

                for (var i = 0; i < all_provinces.length; i++)
                  if (main.provinces[all_provinces[i]].name == processed_new_name && all_provinces[i] != city_obj.id)
                    duplicate_name = true;

                if (!duplicate_name) {
                  if (processed_new_name.length <= 100) {
                    var old_city_name = JSON.parse(JSON.stringify(city_obj.name));

                    city_obj.name = processed_new_name;

                    //Print user feedback
                    printAlert(game_obj.id, `${config.icons.checkmark} You have successfully changed the city name of **${old_city_name}** to **${city_obj.name}**.`);
                  } else {
                    printError(game_obj.id, `**${processed_new_name}** exceeded the maximum limit of **100** characters by a total of **${parseNumber(processed_new_name.length - 100)}** character(s)! Consider shortening the name down, or picking another one.`);
                  }
                } else {
                  printError(game_obj.id, `A city by the exact name of **${processed_new_name}** already exists somewhere in the world!`);
                }
              } else {
                printError(game_obj.id, `**${city_obj.name}** must actually be under the control of your vassal, **${ot_user.name}**, for it to be able to be renamed in the name of your puppet!`);
              }
            } else {
              printError(game_obj.id, `A city by the name of **${old_city_name}** could not be found anywhere in the world!`);
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
      printError(game_obj.id, `You may not rename your own country's cities like that of a vassal's!`);
    }
  }
};
