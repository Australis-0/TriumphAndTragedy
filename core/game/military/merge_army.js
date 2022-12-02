module.exports = {
  mergeArmiesCommand: function (arg0_user, arg1_army_name, arg2_army_name) { //[WIP] - Update army list if user is currently viewing it
    //Convert from parameters
    var user_id = arg0_user;
    var merged_army = arg1_army_name;
    var army_name = arg2_army_name;

    //Declare local inbstance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(user_id, army_name);
    var game_obj = getGameObject(user_id);
    var merged_army_obj = getArmy(user_id, merged_army);
    var usr = main.users[actual_id];

    //Check for the usual
    if (army_obj) {
      if (merged_army_obj) {
        var merged_army = mergeArmy(user_id, merged_army, army_name);

        //Print out user feedback
        (merged_army[0]) ?
          printAlert(game_obj.id, merged_army[1]) :
          printError(game_obj.id, merged_army[1]);
      } else {
        printError(game_obj.id, `The army you have specified to merge into, the **${merged_army}**, could not be found as an actively deployed field army! Check **[Army List]** for a full list of valid armies.`);
      }
    } else {
      printError(game_obj.id, `The army you have specified to merge, the **${army_name}**, could not be found as an actively deployed field army! Check **[Army List]** for a full list of valid armies.`);
    }
  },

  initialiseMergeArmy: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Merge Army:`,
        prompts: [
          [`What is the name of the army you would like to merge?\n\nType **[Army List]** for a valid list of all armies.`, "string"],
          [`What is the name of the army you would like to merge it into?\n\nType **[Army List]** for a valid list of all armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.mergeArmy(user_id, arg[0], arg[1]);
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
        title: `Merge ${army_name}:`,
        prompts: [
          [`What is the name of the army you would like to merge the **${army_name}** into?\n\nType **[Army List]** for a valid list of all armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.mergeArmy(user_id, army_name, arg[0]);
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
