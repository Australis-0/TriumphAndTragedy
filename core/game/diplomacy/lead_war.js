module.exports = {
  initialiseLeadWar: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = getWar(war_name);

    //Initialise visual prompt
    if (war_obj) {
      //Check to see if user is involved
      if (war_obj.attackers.includes(actual_id) || war_obj.defenders.includes(actual_id)) {
        var friendly_side = "";
        var opposing_side = "";
        var valid_country_display_list = [];

        if (war_obj.attackers.includes(actual_id)) {
          friendly_side = "attackers";
          opposing_side = "defenders";
        }
        if (war_obj.defenders.includes(actual_id)) {
          friendly_side = "defenders";
          opposing_side = "attackers";
        }

        //Fetch valid_country_display_list
        for (var i = 0; i < war_obj[friendly_side].length; i++)
          valid_country_display_list.push(`**${main.users[war_obj[friendly_side][i]].name}**`);

        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Become War Leader in the ${war_obj.name}:`,
          prompts: [
            [`Whom would you like to support to become war leader? This action will cost you ${config.icons.political_capital} **${parseNumber(getWarLeadershipCost(user_id, war_obj))}** Political capital. Please choose one of the following countries:\n\n- ${valid_country_display_list.join("\n- ")}`, "mention"]
          ]
        },
        function (arg) {
          module.exports.leadWar(user_id, arg[0], war_obj);
        });
      } else {
        printError(game_obj.id, `You must be involved in the **${war_obj.name}** to support someone's war leader candidacy!`);
      }
    } else {
      printError(game_obj.id, `**${war_name}** is not a valid war you can launch a leadership bid for! Type **[View Wars]** to view a valid list of all wars.`);
    }
  },

  leadWar: function (arg0_user, arg1_user, arg2_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var war_name = arg2_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ?
      getWar(war_name.trim().toLowerCase()) : war_name;

    //Check if a war is currently active
    if (war_obj) {
      //Check to make sure usr exists
      if (ot_user) {
        //Check if user is actually involved
        if (war_obj.attackers.includes(actual_ot_user_id) || war_obj.defenders.includes(actual_ot_user_id)) {
          var friendly_side = "";
          var opposing_side = "";

          if (war_obj.attackers.includes(actual_ot_user_id)) {
            friendly_side = "attackers";
            opposing_side = "defenders";
          }
          if (war_obj.defenders.includes(actual_ot_user_id)) {
            friendly_side = "defenders";
            opposing_side = "attackers";
          }

          //Check to make sure initialising usr is on the same side as ot_user
          if (war_obj[friendly_side].includes(actual_id)) {
            //Check to make sure they aren't already a war leader
            if (war_obj[`${friendly_side}_war_leader`] != actual_ot_user_id) {
              //Check to see if they have enough political capital
              var pc_cost = getWarLeadershipCost(user_id, war_obj);

              if (usr.modifiers.political_capital >= pc_cost) {
                //Check current war leader strength, user strength
                var candidate_strength = getMilitaryStrength(actual_ot_user_id);
                var war_leader_strength = getMilitaryStrength(war_obj[`${friendly_side}_war_leader`]);

                if (
                  returnSafeNumber(candidate_strength.attack) >= returnSafeNumber(war_leader_strength.attack)*config.defines.diplomacy.war_leader_bid_strength &&
                  returnSafeNumber(candidate_strength.defence) >=
                  returnSafeNumber(war_leader_strength.defence)*config.defines.diplomacy.war_leader_bid_strength
                ) {
                  //Time for ot_user to become war leader
                  war_obj[`${friendly_side}_war_leader`] = actual_ot_user_id;

                  if (!war_obj[`${friendly_side}_war_leader_bids`])
                    war_obj[`${friendly_side}_war_leader_bids`] = 0;
                  war_obj[`${friendly_side}_war_leader_bids`]++;

                  //Subtract political capital
                  usr.modifiers.political_capital -= pc_cost;

                  //Refresh UI
                  if (game_obj.page.startsWith("view_war_")) {
                    var current_war_id = game_obj.page.replace("view_war_", "");

                    if (current_war_id == war_obj.id)
                      printWar(user_id, war_obj.name);
                  }

                  //Print user feedback
                  printAlert(game_obj.id, `${config.icons.checkmark} **${ot_user.name}** has successfully become the war leader on the ${(friendly_side == "attackers") ? `attacking` : `defending`} side for ${config.icons.political_capital} **${parseNumber(pc_cost)}** Political Capital.`);
                } else {
                  (actual_id != actual_ot_user_id) ?
                    printError(game_obj.id, `**${ot_user.name}** must have at least **${printPercentage(config.defines.diplomacy.war_leader_bid_strength)}** of the current war leader's Attack and Defence in order to take over leadership of the current war!`) :
                    printError(game_obj.id, `You must have at least **${printPercentage(config.defines.diplomacy.war_leader_bid_strength)}** of the current war leader's Attack and Defence in order to take over leadership of the current war!`);
                }
              } else {
                printError(game_obj.id, `You don't have enough Political Capital to support ${(actual_id != actual_ot_user_id) ? `**${ot_user.name}**'s` : `your own`} candidacy to become war leader!\n\nYou need at least ${config.icons.political_capital} **${parseNumber(pc_cost - usr.modifiers.political_capital)}** more Political Capital to attempt this action.`);
              }
            } else {
              printError(game_obj.id, `**${ot_user.name}** is already the war leader in this conflict!`);
            }
          } else {
            printError(game_obj.id, `You cannot support someone else on the enemy team to become the war leader of their respective faction!`);
          }
        } else {
          printError(game_obj.id, `**${usr.name}** is not currently involved in the **${war_obj.name}**! Please support someone else in their bid to become war leader.`);
        }
      } else {
        printError(game_obj.id, `You must support a valid country to assume the role of war leader in the **${war_obj.name}**! Whatever you just typed was not a valid country.`);
      }
    } else {
      printError(game_obj.id, `The war you have specified, **${war_name}** doesn't even exist!`);
    }
  }
};
