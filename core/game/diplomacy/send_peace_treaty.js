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

    //Make sure peace treaty is valid first
    if (isPeaceTreatyValid(war_obj, peace_obj)) {
      //Send alert involving peace_obj. The peace offer is voluntary if it is either a user treaty, or a combined treaty where allied warscore is less than 100%
      if (war_obj[`${friendly_side.replace("s", "")}_warscore`] == 1 && peace_obj.type != "user") {
        //Send alert to opposing war leader
        sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.unconditional_peace_alert_id, {
          FROM: actual_id,
          LOCAL: {
            war_name: war_obj.name,
            peace_treaty: JSON.parse(JSON.stringify(peace_obj)),
            peace_treaty_string: parsePeaceTreatyLocalisation(war_obj, peace_obj)
          },
          TO: war_obj[`${enemy_side}_war_leader`]
        });

        //Print user feedback
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a peace offer to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. We are negotiating for our entire alliance, and they are negotiating for their entire alliance.\n\nThey have signed an unconditional surrender, and will be forced to accept its terms.`);

        //Parse peace treaty
        parsePeaceTreaty(war_obj.name, peace_obj);

        //Update UI
        if (game_obj.page == "edit_peace_offer")
          closePeaceTreaty(game_obj.user);
        if (game_obj.page.startsWith("view_war_")) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printWars(game_obj.user),
            user: game_obj.user
          });
          game_obj.page = "war_list";
        }
        if (game_obj.page.startsWith("view_peace_treaties_"))
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printPeaceTreaties(user_id, war_obj),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

      } else {
        //Check to see if the peace treaty is inferior or superior separate
        var is_separate_inferior_peace = false;
        var is_separate_superior_peace = false;

        //Check for is_separate_inferior_peace
        if (peace_obj.type == "user")
          if (peace_obj[`${friendly_side}_war_leader`] != actual_id)
            is_separate_inferior_peace = true;

        //Check for is_separate_superior_peace
        if (hasPeaceTreatyTargetRequirement(war_obj, peace_obj))
          is_separate_superior_peace = true;

        //Begin case handling
        if (is_separate_inferior_peace) {
          sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.enemy_separate_peace_alert_id, {
            FROM: actual_id,
            LOCAL: {
              war_name: war_obj.name,
              peace_treaty: peace_obj,
              peace_treaty_string: parsePeaceTreatyLocalisation(war_obj, peace_obj.join("\n"))
            },
            TO: war_obj[`${enemy_side}_war_leader`]
          });

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a separate peace offer to **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. They are negotiating for their entire alliance, and we are merely negotiating for ourselves.\n\nThey must manually accept your peace offer in their diplomatic alerts.`);
        } else if (is_separate_superior_peace) {
          sendAlert(peace_obj.target, config.defines.diplomacy.friendly_separate_peace_alert_id, {
            FROM: actual_id,
            LOCAL: {
              war_name: war_obj.name,
              peace_treaty: peace_obj,
              peace_treaty_string: parsePeaceTreatyLocalisation(war_obj, peace_obj.join("\n"))
            },
            TO: peace_obj.target
          });

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a separate peace offer to **${main.users[peace_obj.target].name}**. We are negotiating for our entire alliance, and they are merely negotiating for themselves.\n\nThey must manually accept your peace offer in their diplomatic alerts.`);
        } else {
          sendAlert(war_obj[`${enemy_side}_war_leader`], config.defines.diplomacy.peace_offer_alert_id, {
            FROM: actual_id,
            LOCAL: {
              war_name: war_obj.name,
              peace_treaty: peace_obj,
              peace_treaty_string: parsePeaceTreatyLocalisation(war_obj, peace_obj).join("\n")
            },
            TO: war_obj[`${enemy_side}_war_leader`]
          });

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent a peace offer to the enemy war leader, **${main.users[war_obj[`${enemy_side}_war_leader`]].name}**. We are negotiating for our entire alliance, and they are negotiating for our entire alliance.\n\nThey must manually accept your peace offer in their diplomatic alerts.`);
        }

        //Return statement
        return true;
      }
    } else {
      printError(game_obj.id, `The peace treaty you have proposed is not currently valid! Check to make sure none of your plenipotentiaries are demanding wargoals over their warscore. ${(peace_obj.type == "user" && war_obj[`${friendly_side}_war_leader`] == actual_id) ? " You must also select a valid target country to propose this peace treaty to." : ""}`);
    }
  }
};
