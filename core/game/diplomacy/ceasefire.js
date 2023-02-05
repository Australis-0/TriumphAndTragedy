module.exports = {
  ceasefire: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "neutral";
    var friendly_side = "neutral";
    var game_obj = getGameObject(user_id);
    var war_obj = (typeof war_name != "object") ? getWar(war_name.trim().toLowerCase()) : war_name;
    var usr = main.users[actual_id];

    //Check if user is even involved in the war
    if (war_obj.attackers.includes(actual_id)) {
      enemy_side = "defenders";
      friendly_side = "attackers";
    }
    if (war_obj.defenders.includes(actual_id)) {
      enemy_side = "attackers";
      friendly_side = "defenders";
    }

    if (friendly_side != "neutral") {
      if (war_obj[`${friendly_side}_war_leader`] == actual_id) {
        //Send ceasefire propsal
        sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.ceasefire_proposal_alert_id, {
          FROM: actual_id,
          LOCAL: {
            war_id: war_obj.id,
            war_name: war_obj.name
          },
          TO: war_obj[`${enemy_side}_war_leader`]
        });

        //Print user feedback
        printAlert(game_obj.id, `${config.icons.checkmark} We have successfully issued a proposal for a general ceasefire to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. They must manually accept it in order for the war to end and all occupations to be lifted.`);
      } else {
        printError(game_obj.id, `You are not the war leader on your own side! Consider challenging war leadership first before proposing a ceasefire.`);
      }
    } else {
      printError(game_obj.id, `You must be involved in the **${war_obj.name}** as a war leader before you can propose a ceasefire!`);
    }
  }
};
