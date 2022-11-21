module.exports = {
  initialiseRenameWar: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var war_obj = getWar(war_name);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename ${war_obj.name}:`,
      prompts: [
        [`What would you like to rename the **${war_obj.name}** to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameWar(user_id, war_obj.name, arg[0]);
    });
  },

  renameWar: function (arg0_user, arg1_war_name, arg2_new_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var old_war_name = arg1_war_name.trim().toLowerCase();
    var new_war_name = arg2_new_war_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = getWar(old_war_name);

    //Check if war_obj exists
    if (war_obj) {
      //Determine war leader of currently winning side
      var currently_winning_side = (war_obj.attacker_warscore >= war_obj.defender_warscore) ? "attackers" : "defenders";

      if (war_obj[`${currently_winning_side}_war_leader`] == actual_id) {
        //User is able to rename war, so do it unless another war shares the exact same name or the name of the war is over 100 characters
        if (new_war_name.length <= 100) {
          var all_wars = Object.keys(main.global.wars);
          var duplicate_war_name = false;

          for (var i = 0; i < all_wars.length; i++) {
            var local_war = main.global.wars[all_wars[i]];

            if (local_war.name.toLowerCase() == new_war_name.toLowerCase())
              duplicate_war_name = true;
          }

          if (!duplicate_war_name) {
            var old_war_name = JSON.parse(JSON.stringify(war_obj.name));

            war_obj.name = parseString(new_war_name);

            //Update war UI
            if (game_obj.page.includes("view_war_")) {
              var war_to_view = game_obj.page.replace("view_war_", "");

              printWar(user_id, war_to_view);
            }

            //Print user feedback
            printAlert(game_obj.id, `You have renamed the **${old_war_name}** to the **${new_war_name}**.`);
          } else {
            printError(game_obj.id, `An ongoing conflict by the name of the **${new_war_name}** already exists!`);
          }
        } else {
          printError(game_obj.id, `The new name of the war cannot exceed the set maximum of 100 characters!`);
        }
      } else {
        (war_obj.attacker_warscore == war_obj.defender_warscore) ?
          printError(game_obj.id, `Since both sides are at a stalemate currently, only the war leader of the attacking side, **${main.users[war_obj.attackers_war_leader].name}**, is able to rename the conflict!`) :
          printError(game_obj.id, `You must be the war leader of the winning side in order to change the name of the **${war_obj.name}**!`);
      }
    } else {
      printError(game_obj.id, `The war you have specified, **${old_war_name}**, proved as entirely fictitious as the downfall of the Atlanteans!`);
    }
  }
};
