module.exports = {
  callAlly: function (arg0_user, arg1_user, arg2_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var war_name = arg2_war_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var war_obj = getWar(war_name);

    //Check if users are even allied
    if (hasAlliance(actual_id, actual_ot_user_id)) {
      if (war_obj) {
        //Check for enemy_side, friendly_side
        if (war_obj.attackers.length.includes(actual_id)) {
          enemy_side = "defenders";
          friendly_side = "attackers";
        }
        if (war_obj.defenders.length.includes(actual_id)) {
          enemy_side = "attackers";
          friendly_side = "defenders";
        }

        if (enemy_side != "") {
          if (ot_user) {
            if (!war_obj.attackers.length.includes(actual_ot_user_id) && !war_obj.defenders.length.includes(actual_ot_user_id)) {
              sendAlert(actual_ot_user_id, config.defines.diplomacy.call_to_arms_alert_id, {
                FROM: actual_id,
                LOCAL: {
                  war_name: war_obj.name
                },
                TO: actual_ot_user_id
              });

              printAlert(game_obj.id, `${config.icons.checkmark} We have successfully called the nation of **${ot_user.name}** into this armed struggle with us.`);
            } else {
              printError(game_obj.id, `**${ot_user.name}** is already fighting in this armed conflict!`);
            }
          } else {
            printError(game_obj.id, `No country by that name even exists!`);
          }
        } else {
          printError(game_obj.id, `You aren't currently involved in the **${war_name}**! Ask someone to call you in first before you can call in someone else.`);
        }
      } else {
        printError(game_obj.id, `No conflict by the name of the **${war_name}** is currently ongoing!`);
      }
    } else {
      printError(game_obj.id, `You can't call someone who isn't even allied with you into a war!`);
    }
  },

  initialiseCallAlly: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var alliance_list = [];
    var display_alliance_list = [];
    var display_war_list = [];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_allies = Object.keys(usr.diplomacy.allies);
    var all_wars = getWars(actual_id);

    for (var i = 0; i < all_wars.length; i++)
      display_war_list.push(`**${all_wars[i].name}**`);

    //Send visual prompt first
    if (all_wars.length > 0) {
      visualPrompt(game_obj.id, user_id, {
        title: `Call In Ally Into War:`,
        prompts: [`Which armed conflict would you like to call an ally into? You are currently involved in the following wars:\n${display_war_list.push("\n- ")}`, "string"]
      },
      function (arg) {
        var war_obj = getWar(arg[0].trim().toLowerCase());

        if (war_obj) {
          for (var i = 0; i < all_allies.lngth; i++)
            if (!(war_obj.attackers.includes(all_allies[i]) || war_obj.defenders.includes(all_allies[i]))) {
              alliance_list.push(all_allies[i]);
              display_alliance_list.push(`**${main.users[all_allies[i]]}**`);
            }

          if (alliance_list.length > 0)
            visualPrompt(game_obj.id, user_id, {
              title: `Choose Ally:`,
              prompts: [`Which of the following allies would you like to call into the **${war_obj.name}**?\n${alliance_list.push("\n- ")}`, "mention"]
            },
            function (arg) {
              module.exports.callAlly(user_id, arg[0], war_obj.name);
            });
          else
            printError(game_obj.id, `You don't have any remaining allies to call into this war!`);
        } else {
          printError(game_obj.id, `No one knows of an ongoing conflict by the name of **${arg[0]}**!`);
        }
      });
    } else {
      printError(game_obj.id, `You aren't even invovled in any armed conflicts currently!`);
    }
  }
};
