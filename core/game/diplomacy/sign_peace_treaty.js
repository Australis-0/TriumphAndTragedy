module.exports = {
  signPeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var friendly_side = "neutral";
    var game_obj = getGameObject(user_id);
    var opposing_side = "neutral";
    var usr = main.users[actual_id];
    var war_obj = (typeof arg1_war_name != "object") ?
      getWar(war_name.trim().toLowerCase()) : arg1_war_name;

    //Check if a war is currently active
    if (war_obj) {
      //Check if user is actually involved
      if (war_obj.attackers.includes(actual_id)) {
        friendly_side = "attackers";
        opposing_side = "defenders";
      }
      if (war_obj.defenders.includes(actual_id)) {
        friendly_side = "defenders";
        opposing_side = "attackers";
      }

      if (friendly_side != "neutral") {
        //Check to make sure that user is not a vassal
        if (!getVassal(user_id)) {
          //Create a new peace treaty
          createPeaceTreaty(user_id, war_obj);

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

          //Check if actual_id is the war leader of their side
          (war_obj[`${friendly_side}_war_leader`] == actual_id) ?
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully created a new separate peace offer for the enemy side. For this peace offer to be valid, you must specify an enemy combatant that is not the enemy war leader as plenipotentiary.`) :
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully created a new separate peace offer for the enemy side. Because you are not the leader in this war, this will be a conditional surrender and has to be negotiated with the enemy war leader.`);
        } else {
          printError(game_obj.id, `You may not sign a separate peace as a vassal nation! Wait for others to do the talking.`);
        }
      } else {
        printError(game_obj.id, `You must be involved in the **${war_obj.name}** in order for you to seriously propose a peace treaty!`);
      }
    } else {
      printError(game_obj.id, `You can't sign a peace treaty for a war that is no longer currently ongoing!`);
    }
  }
};
