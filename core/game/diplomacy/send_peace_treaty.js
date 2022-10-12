module.exports = {
  sendPeaceTreaty: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Get enemy war leader
    if (war_obj.attackers.includes(actual_id)) {
      enemy_side = "defenders";
      friendly_side = "attackers";
    }
    if (war_obj.defenders.includes(actual_id)) {
      enemy_side = "attackers";
      friendly_side = "defenders";
    }

    console.log(war_obj);

    //Send alert involving peace_obj
    if (war_obj[`${friendly_side.replace("s", "")}_warscore`] == 1) {
      //Send alert to opposing war leader
      sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.unconditional_peace_alert_id, {
        FROM: actual_id,
        LOCAL: {
          war_name: war_obj.name,
          peace_treaty: JSON.parse(JSON.stringify(peace_obj)),
          peace_treaty_string: parsePeaceTreatyString(war_obj, peace_obj)
        },
        TO: war_obj[`${enemy_side}_war_leader`]
      });

      //Print user feedback
      printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a peace offer to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. They have signed an unconditional surrender, and will be forced to accept its terms.`);

      //Parse peace treaty
      parsePeaceTreaty(war_obj.name, peace_obj);
    } else {
      sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.peace_offer_alert_id, {
        FROM: actual_id,
        LOCAL: {
          war_name: war_obj.name,
          peace_treaty: peace_obj,
          peace_treaty_string: parsePeaceTreatyString(war_obj, peace_obj)
        },
        TO: war_obj[`${enemy_side}_war_leader`]
      });

      //Print user feedback
      printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a peace offer to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**.`);
    }

  }
};
