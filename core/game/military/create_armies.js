module.exports = {
  createArmies: function (arg0_user, arg1_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_creation_string = arg1_armies.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var capital_obj = getCapital(user_id);
    var game_obj = getGameObject(user_id);
    var new_army_array = parseArmies(army_creation_string);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to make sure that the user isn't exceeding their army limit
    if (new_army_array.length <= config.defines.combat.max_army_creation_limit || config.defines.combat.max_army_creation_limit == 0) {
      if (new_army_array.length + all_armies.length <= config.defines.combat.max_army_limit || config.defines.combat.max_army_limit == 0) {
        if (capital_obj) {
          if (capital_obj.id) {
            if (capital_obj.controller == actual_id) {
              for (var i = 0; i < new_army_array.length; i++)
                createArmy(user_id, new_army_array[i], capital_obj.id);

              //Update army_list if user is currently viewing it
              if (game_obj.page == "army_list")
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printArmyList(user_id),
                  page: main.interfaces[game_obj.middle_embed.id].page,
                  user: game_obj.user
                });

              //Print user feedback
              printAlert(game_obj.id, `You have successfully created up to **${parseNumber(new_army_array.length)}** new armies in Province **${capital_obj.id.toString()}**!`)
            } else {
              printError(game_obj.id, `Your capital city is currently being occupied by **${main.users[capital_obj.controller].name}**! Regain control of your capital city or move your seat of government first before attempting to create new armies.`);
            }
          } else {
            printError(game_obj.id, `You can't create armies without a capital city! Set a seat of government first before attempting to create new armies.`);
          }
        } else {
          printError(game_obj.id, `No capital, no armies!`);
        }
      } else {
        printError(game_obj.id, `You have already reached the maximum army limit of **${parseNumber(config.defines.combat.army_limit)}**! You can only create up to **${parseNumber(config.defines.combat.army_limit - all_armies.length)}** new armies, whilst you attempted to create up to **${parseNumber(new_army_array.length)}** new armies.`);
      }
    } else {
      printError(game_obj.id, `You can only create up to a maximum of ${parseNumber(config.defines.combat.max_army_creation_limit)}** armies at once!`);
    }
  },

  initialiseCreateArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Create Multiple Armies:`,
      prompts: [
        [`Please type out the names of the new armies you'd like to create en masse.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.`, "string"]
      ]
    },
    function (arg) {
      module.exports.createArmies(user_id, arg[0]);
    });
  }
};
