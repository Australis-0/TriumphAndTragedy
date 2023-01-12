module.exports = {
  inviteKickVassalPlayer: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[user_id];
    var display_vassal_list = [];
    var display_vassal_players = [];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Get list of valid vassals
    var all_vassals = Object.keys(usr.diplomacy.vassals);

    for (var i = 0; i < all_vassals.length; i++)
      display_vassal_list.push(`- **${main.users[all_vassals[i]].name}**`);

    //Get list of all players if ot_user is specified
    if (ot_user) {
      var all_mapped_users = Object.keys(main.global.user_map);

      //Fetch all_vassal_players
      for (var i = 0; i < all_mapped_users.length; i++)
        if (main.global.user_map[all_mapped_users[i]] == actual_ot_user_id)
          if (client.users.cache.find(user => user.id == all_mapped_users[i]))
            display_vassal_players.push(`<@${all_mapped_users[i]}>`);
    }

    //Check if ot_user exists
    (ot_user) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Kick Vassal Player:`,
        prompts: [
          [`Which of these players would you like to force to step down from their post as leader of **${ot_user.name}**?\n\n- ${display_vassal_players.join("\n")}`, "user"]
        ]
      },
      function (arg) {
        module.exports.kickVassalPlayer(user_id, ot_user_id, arg[0]);
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Kick Vassal Player:`,
        prompts: [
          [`Which vassal country would you like to boot a player off of? Please select one of the following vassals:\n\n- ${display_vassal_list.join("\n")}`, "mention"],
          [`Please ping the user that you would like to remove from being able to manage this country.`, "user"]
        ]
      },
      function (arg) {
        module.exports.kickVassalPlayer(user_id, arg[0], arg[1]);
      });
  },

  kickVassalPlayer: function (arg0_user, arg1_user, arg2_user_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var kicked_player = arg2_user_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var user = client.users.cache.find(user => user.id.toString() == kicked_player);

    //Check if user exists
    if (user) {
      if (ot_user) {
        var vassal_obj = getVassal(ot_user_id);

        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            //Check to see if kicked_player is currently mapped to ot_user
            var all_mapped_users = Object.keys(main.global.user_map);
            var all_vassal_players = [];

            //Fetch all_vassal_players
            for (var i = 0; i < all_mapped_users.length; i++)
              if (main.global.user_map[all_mapped_users[i]] == actual_ot_user_id)
                if (client.users.cache.find(user => user.id == all_mapped_users[i]))
                  all_vassal_players.push(all_mapped_users[i]);


            //Check to make sure vassal isn't justifying against their overlord or currently at war with them
            for (var i = 0; i < ot_user.diplomacy.justifications.length; i++) {
              var local_justification = ot_user.diplomacy.justifications[i];

              if (local_justification.target == actual_id)
                is_currently_justifying = true;
            }

            //Check if vassal has at least one player on them and a justification against their overlord
            for (var i = 0; i < ot_user.diplomacy.wargoals.length; i++) {
              var local_wargoal = ot_user.diplomacy.wargoals[i];

              if (local_wargoal.target == actual_id && all_vassal_players.length > 0)
                has_player_justification = true;
            }

            if (all_vassal_players.includes(kicked_player)) {
              if (!is_currently_justifying) {
                if (!has_player_justification) {
                  if (!areAtWar(user_id, ot_user_id)) {
                    //Kick from party
                    delete main.global.user_map[kicked_player];

                    //Add infamy penalty
                    usr.modifiers.infamy += returnSafeNumber(config.defines.infamy_vassal_kick_player);

                    //Print user feedback
                    try {
                      user.send(`You were kicked from the country of **${ot_user.name}**.`);
                    } catch {}
                    returnChannel(settings.alert_channel).send(`<@${kicked_player}> was kicked from the country of **${ot_user.name}**.`);
                    printAlert(game_obj.id, `You have kicked <@${kicked_player}> from being able to play for **${ot_user.name}**.${(returnSafeNumber(config.defines.infamy_vassal_kick_player) != 0) ? ` We have incurred ${config.icons.infamy} **${parseNumber(config.defines.infamy_vassal_kick_player)}** Infamy for this action.` : ""}`);

                    //Update UI
                    if (game_obj.page.startsWith("view_coop_")) {
                      var local_player = game_obj.page.replace("view_coop_", "");

                      if (main.global.user_map[local_player] == actual_ot_user_id)
                        printVassalCoopMenu(user_id, ot_user_id);
                    }
                  } else {
                    printError(game_obj.id, `You can't kick players off a nation that's at war with you!`);
                  }
                } else {
                  printError(game_obj.id, `**${ot_user.name}** has a wargoal against you! You won't be able to manage their players until they either cancel all their valid wargoals, or the current player(s) resign from playing this nation.`);
                }
              } else {
                printError(game_obj.id, `**${ot_user.name}** is currently justifying against you! Nice try.`);
              }
            } else {
              printError(game_obj.id, `<@${kicked_player}> couldn't be found currently playing on **${ot_user.name}**!`);
            }
          } else {
            printError(game_obj.id, `**${ot_user.name}** is a vassal, but they aren't your vassal, they're **${main.users[vassal_obj.overlord].name}**'s, and that's what matters.`);
          }
        } else {
          printError(game_obj.id, `You can't control the affairs of a free and independent country, which **${ot_user.name}** is.`);
        }
      } else {
        printError(game_obj.id, `You can't kick players off a nonexistent vassal, let alone a nonexistent country.`);
      }
    } else {
      printError(game_obj.id, `<@${kicked_player}> could not be found as a user in this server! Try selecting a valid player on your vassal.`);
    }
  }
};
