module.exports = {
  createArmyCommand: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = parseString(arg1_army_name.trim());

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if an army by this name already exists
    var all_armies = Object.keys(usr.armies);
    var duplicate_army = false;

    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];

      if (local_army.name == army_name)
        duplicate_army = true;
    }

    if (!duplicate_army) {
      if (all_armies.length + 1 <= config.defines.combat.max_army_limit || config.defines.combat.max_army_limit == 0) {
        var capital_obj = getCapital(actual_id);

        if (capital_obj.id) {
          createArmy(actual_id, army_name, capital_obj.id);

          //Update army_list if user is currently viewing it
          if (game_obj.page == "army_list")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });

          printAlert(game_obj.id, `You have created the **${army_name}**! Make sure to check your **[Army List]** for a complete list of all your active field armies.`);
        } else {
          printError(game_obj.id, `You must have a capital somewhere in your country to create new armies!`);
        }
      } else {
        printError(game_obj.id, `You have already reached the maximum army limit allowed of **${parseNumber(config.defines.combat.max_army_limit)}**, and were therefore unable to create any new armies!`);
      }
    } else {
      printError(game_obj.id, `You already have an army by the name of the **${army_name}**!`);
    }
  },

  initialiseCreateArmyCommand: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Create An Army:`,
      prompts: [
        [`What is the name of the army you would like to create?`, "string"]
      ]
    },
    function (arg) {
      module.exports.createArmyCommand(user_id, arg[0]);
    });
  }
};
