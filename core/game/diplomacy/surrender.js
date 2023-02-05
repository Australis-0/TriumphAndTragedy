module.exports = {
  surrender: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_wars = Object.keys(main.global.wars);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if user is involved in any wars. If they are viewing a war, are they involved in it?
    var at_war = atWar(user_id);
    var user_is_in_current_war = true;

    if (game_obj.page.startsWith("view_war_")) {
      var war_name = game_obj.page.replace("view_war_", "");
      var war_obj = getWar(war_name);

      if (!war_obj.attackers.includes(actual_id) && !war_obj.defenders.includes(actual_id))
        user_is_in_current_war = false;
    }

    if (user_is_in_current_war && at_war) {
      //Instantly set war exhaustion to 100 and print user feedback
      usr.modifiers.war_exhaustion = 1;

      //Send alerts to everyone in all belligerent wars
      var enemy_side = [];
      var friendly_side = [];

      for (var i = 0; i < all_wars.length; i++) {
        var enemy_side = "";
        var friendly_side = "";
        var local_war = main.global.wars[all_wars[i]];

        if (local_war.attackers.includes(actual_id)) {
          friendly_side = "attackers";
          enemy_side = "defenders";
        }
        if (local_war.defenders.includes(actual_id)) {
          friendly_side = "defenders";
          enemy_side = "attackers";
        }

        //Iterate over enemy_side, friendly_side
        for (var x = 0; x < war_obj[enemy_side].length; x++)
          if (!enemy_side.includes(war_obj[enemy_side][x]))
            enemy_side.push(war_obj[enemy_side][x]);

        for (var x = 0; x < war_obj[friendly_side].length; x++)
          if (!friendly_side.includes(war_obj[friendly_side][x]))
            friendly_side.push(war_obj[friendly_side][x]);
      }

      //Send out the events
      for (var i = 0; i < enemy_side.length; i++)
        sendAlert(enemy_side[i], config.defines.enemy_surrender_alert_id, {
          FROM: actual_id,
          TO: enemy_side[i]
        });

      for (var i = 0; i < friendly_side.length; i++)
      sendAlert(friendly_side[i], config.defines.ally_surrender_alert_id, {
        FROM: actual_id,
        TO: friendly_side[i]
      });

      printAlert(game_obj.id, `${config.icons.retreat} We have surrendered in all wars in which we are a belligerent part, and we now have full war exhaustion.`);

      //Refresh UI's
      if (game_obj.page.startsWith("view_war_")) {
        var current_war_id = game_obj.page.replace("view_war_", "");

        printWar(user_id, war_obj.name);
      }
    } else {
      printError(game_obj.id, `You must be at war in order for you to surrender!`);
    }
  }
};
