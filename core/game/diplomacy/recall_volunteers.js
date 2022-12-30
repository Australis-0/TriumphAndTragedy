module.exports = {
  initialiseRecallVolunteers: function (arg0_user, arg1_war_obj, arg2_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj;
    var armies = arg2_armies;

    if (arg1_war_obj)
      war_obj = (typeof arg1_war_obj != "object") ? arg1_war_obj.trim().toLowerCase() : arg1_war_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Guard clause
    if (war_obj && armies)
      module.exports.recallVolunteers(user_id, war_obj, armies);

    //Initialise visual prompt
    if (war_obj) {
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Withdraw Volunteer Armies from the ${war_obj.name}:`,
        prompts: [
          [`Which armies would you like to withdraw from this armed intervention?\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.recallVolunteers(user_id, war_obj, arg[0]);
      });
    } else if (armies) {
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Withdraw Volunteer Forces From A Special Military Operation:`,
        prompt: [
          [`Which armed intervention would you like to withdraw these volunteer forces from?\n\nType **[Diplomacy]** for a full list of our armed interventions.`, "string"]
        ]
      },
      function (arg) {
        module.exports.recallVolunteers(user_id, arg[0], armies);
      });
    } else {
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Recall Volunteer Armies:`,
        prompts: [
          [`Which armed conflict would you like to withdraw your units from?\n\nType **[Diplomacy]** to view a valid list of all our armed interventions.`, "string"],
          [`Which armies would you like to withdraw from the battlefield?\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.recallVolunteers(user_id, arg[0], arg[1]);
      });
    }
  },

  recallVolunteers: function (arg0_user, arg1_war_name, arg2_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;
    var armies = parseArmies(arg2_armies);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Check if user is even involved in the war
    if (war_obj) {
      if (war_obj[`${actual_id}_sent_volunteers`]) {
        //Check if user has any armies to recall
        var all_armies = Object.keys(usr.armies);
        var has_participant_army = false;

        for (var i = 0; i < all_armies.length; i++) {
          var local_army = usr.armies[all_armies[i]];

          if (local_army.volunteering)
            if (local_army.volunteering[1] == war_obj.id)
              has_participant_army = true;
        }

        if (has_participant_army) {
          if (armies.length > 0) {
            var nonexistent_armies = 0;
            var recalled_armies = 0;
            var total_recalled = 0;

            for (var i = 0; i < armies.length; i++) {
              var local_army = getArmy(user_id, armies[i]);

              if (local_army) {
                var local_army_size = getArmySize(user_id, local_army);

                delete local_army.volunteering;
                recalled_armies++;
                total_recalled += returnSafeNumber(local_army_size);
              } else {
                nonexistent_armies++;
              }
            }

            //Print user feedback
            if (recalled_armies != 0) {
              (recalled_armies == armies.length) ?
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully recalled **${parseNumber(armies.length)}** armies from serving as volunteers in the **${war_obj.name}**, or **${parseNumber(total_recalled)}** personnel.`) :
                printAlert(game_obj.id, `${config.icons.checkmark} You have recalled **${parseNumber(recalled_armies)}**/${parseNumber(armies.length)} queried volunteer armies from the theatre(s) of the **${war_obj.name}**.\n\nOf the missing armies, **${parseNumber(nonexistent_armies)}** were entirely nonexistent.`);

              //Update UI's
              if (game_obj.page == "army_list")
                printArmyList(user_id, interfaces[game_obj.middle_embed.id].page);

              if (game_obj.page.includes("army_viewer_")) {
                var army_to_view = game_obj.page.replace("army_viewer_", "");

                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printArmy(user_id, army_to_view),
                  page: main.interfaces[game_obj.middle_embed.id].page,
                  user: game_obj.user
                });
              }

              if (game_obj.page == "diplomacy")
                printDiplomacy(user_id);

              if (game_obj.page == "military")
                printMilitary(user_id, interfaces[game_obj.middle_embed.id].page);

            } else {
              printError(game_obj.id, `None of the armies you have specified existed as coherent combat formations!`);
            }
          } else {
            printError(game_obj.id, `You must specify at least one valid army to send back home!`);
          }
        } else {
          printError(game_obj.id, `You currently have no volunteer armies participating in the **${war_obj.name}**!`);
        }
      } else {
        printError(game_obj.id, `You must **[Send Volunteers]** into a war first before being able to recall them!`);
      }
    } else {
      printError(game_obj.id, `The conflict you have specified, **${war_name}**, is either no longer ongoing, or has already ended!`);
    }
  }
};
