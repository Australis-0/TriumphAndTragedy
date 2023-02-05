module.exports = {
  armistice: function (arg0_user, arg1_war_name) {
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
        //Send ceasefire proposal
        sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.armistice_proposal_alert_id, {
          FROM: actual_id,
          LOCAL: {
            war_id: war_obj.id,
            war_name: war_obj.name
          },
          TO: war_obj[`${enemy_side}_war_leader`]
        });

        //Print user feedback
        printAlert(game_obj.id, `${config.icons.checkmark} We have successfully issued a proposal for an armistice to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. They must manually accept for the armistice to come into effect. If this occurs, all war exhaustion directly related to the war will no longer increase and fighting can only resume once one of the leaders breaks the armistice.`);
      } else {
        printError(game_obj.id, `You are not the war leader on your own side! Consider challenging war leadership first before proposing an armistice.`);
      }
    } else {
      printError(game_obj.id, `You must be involved in the **${war_obj.name}** as a war leader before you can propose a ceasefire!`);
    }
  },

  breakArmistice: function (arg0_user, arg1_war_name) {
    //Convert from parameters
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
        //Check to see if there is an armistice in effect
        if (war_obj.armistice) {
          delete war_obj.armistice;

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.cb} We have manually terminated this armistice, and this conflict is no longer frozen. We are free to attack the enemy, as are they.`);
        } else {
          printError(game_obj.id, `There is no current armistice in effect for this war!`);
        }
      } else {
        printError(game_obj.id, `You are not the war leader on your own side! Only war leaders can terminate an armistice.`);
      }
    } else {
      printError(game_obj.id, `You must be involved in the **${war_obj.name}** as a war leader before you can violate an armistice agreement!`);
    }
  }
};
