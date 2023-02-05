module.exports = {
  initialiseRenamePeaceTreaty: function (arg0_user, arg1_war_name, arg2_peace_treaty_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;
    var peace_treaty_obj = arg2_peace_treaty_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = (typeof war_name != "object") ? getWar(war_name.trim().toLowerCase()) : war_name;

    //Initialise visual prompt
    (!peace_treaty_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Rename A Peace Offer:`,
        prompts: [,
          [`Which treaty would you like to rename?\n\nType **[View Peace Offers]** to see a list of all valid peace offers in this conflict.`, "string"],
          [`What would you like to rename this treaty to?`, "string"]
        ]
      },
      function (arg) {
        var peace_treaty_obj = getPeaceTreaty(war_obj, arg[0]);

        (peace_treaty_obj) ?
          module.exports.renamePeaceTreaty(user_id, peace_treaty_obj, arg[1]) :
          printError(game_obj.id, `You must specify a valid peace treaty to rename! **${arg[0]}** was not recognised as a valid peace treaty, whatever that was.`);
      },
      function (arg) {
        switch (arg) {
          case "view peace offers":
            if (game_obj.page.startsWith("view_war_")) {
              var current_war_id = game_obj.page.replace("view_war_", "");
              var war_obj = main.global.wars[current_war_id];

              printPeaceTreaties(user_id, war_obj);
            }

            return true;
            break;
        }
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Rename the ${peace_treaty_obj.name}:`,
        prompts: [
          [`What would you like to rename this treaty to?`, "string"]
        ]
      },
      function (arg) {
        module.exports.renamePeaceTreaty(user_id, peace_treaty_obj, arg[0])
      });
  },

  renamePeaceTreaty: function (arg0_user, arg1_peace_treaty_object, arg2_name) { //[WIP] - Update Peace Treaties UI
    //Convert from parameters
    var user_id = arg0_user;
    var peace_treaty_obj = arg1_peace_treaty_object;
    var peace_treaty_name = arg2_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_treaty_obj.id];

    if (war_obj) {
      var all_peace_treaties = Object.keys(war_obj.peace_treaties);
      var duplicate_name = false;

      //Check if name is already taken
      for (var i = 0; i < all_peace_treaties.length; i++) {
        var local_treaty = war_obj.peace_treaties[all_peace_treaties[i]];

        if (local_treaty.name.trim().toLowerCase() == peace_treaty_name.toLowerCase())
          duplicate_name = true;
      }

      if (!duplicate_name) {
        if (peace_treaty_name.length <= 100) {
          var old_peace_treaty_name = JSON.parse(JSON.stringify(peace_treaty_obj.name));

          //Rename peace treaty
          peace_treaty_obj.name = parseString(peace_treaty_name);

          //Refresh UI
          if (game_obj.page.startsWith("view_war_")) {
            var current_war_id = game_obj.page.replace("view_war_", "");

            if (current_war_id == war_obj.id)
              printWar(user_id, war_obj.name);
          }
          if (game_obj.page.startsWith("view_peace_treaties_")) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printPeaceTreaties(user_id, war_obj),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          }

          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully renamed the **${old_peace_treaty_name}** to the **${peace_treaty_obj.name}**.`);
        } else {
          printError(game_obj.id, `**${peace_treaty_name}** exceeded the maximum limit of **100** characters by a total of **${parseNumber(peace_treaty_name.length - 100)}** character(s)! Consider shortening the name down, or picking another one.`);
        }
      } else {
        printError(game_obj.id, `There already exists a peace treaty for the **${war_obj.name}** by this name! Please choose another name.`);
      }
    } else {
      printError(game_obj.id, `How'd you manage that? You must specify a valid peace treaty to be renamed!`);
    }
  }
};
