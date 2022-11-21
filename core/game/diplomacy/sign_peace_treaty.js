module.exports = {
  signPeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof arg1_war_name != "object") ?
      getWar(war_name.trim().toLowerCase()) : arg1_war_name;

    //Check if a war is currently active
    if (war_obj) {
      //Check if user is actually involved
      if (war_obj.attackers.includes(actual_id) || war_obj.defenders.includes(actual_id)) {
        if (war_obj.attackers_war_leader == actual_id || war_obj.defenders_war_leader == actual_id) {
          //Create a new peace treaty
          createPeaceTreaty(actual_id, war_obj.name);

          //Refresh UI
          if (game_obj.page.startsWith("view_war_")) {
            var current_war_id = game_obj.page.replace("view_war_", "");

            if (current_war_id == war_obj.id)
              printWar(user_id, war_obj.name);
          }

          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully cleared your demands and created a new peace offer for the **${war_obj.name}**.\nIn order to view it, please type **[View Peace Offer]**.`);
        } else {
          var friendly_side = (war_obj.attackers.includes(actual_id)) ? "attackers" : "defenders";

          printAlert(game_obj.id, `Only the war leader on your faction, **${main.users[war_obj[`${friendly_side}_war_leader`]].name}** can sign peace treaties on behalf of your entire alliance! Consider becoming the war leader by typing **[Lead War]**, or wait for your war leader to sign a peace treaty for you.`);
        }
      } else {
        printError(game_obj.id, `You must be involved in the **${war_obj.name}** for you to be able to even think about proposing a peace deal!`);
      }
    } else {
      printError(game_obj.id, `You can't sign a peace treaty for a war that is no longer currently ongoing!`);
    }
  }
};
