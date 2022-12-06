module.exports = {
  initialiseInviteVassalPlayer: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[user_id];
    var display_vassal_list = [];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Get list of valid vassals
    var all_vassals = Object.keys(usr.diplomacy.vassals);

    for (var i = 0; i < all_vassals.length; i++)
      display_vassal_list.push(`- **${main.users[all_vassals[i]].name}**`);

    //Check if ot_user exists
    (ot_user) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Invite Vassal Player:`,
        prompts: [
          [`Whom would you like to invite to help run your client state of **${ot_user.name}**? Please type out the name of a user or ping them.`, "user"]
        ]
      },
      function (arg) {
        module.exports.inviteVassalPlayer(user_id, ot_user_id, arg[0]);
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Invite Vassal Player:`,
        prompts: [
          [`Which vassal country would you like to invite a player to? Please select one of the following vassals: \n${display_vassal_list.join("\n")}`, "mention"],
          [`Whom would you like to invite to help run this vassal state? Please type out the name of a user or ping them.`, "user"]
        ]
      },
      function (arg) {
        module.exports.inviteVassalPlayer(user_id, arg[0], arg[1]);
      });
  },

  inviteVassalPlayer: function (arg0_user, arg1_user, arg2_user_id) { //[WIP] - Reload UI
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var invited_player = arg2_user_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var user = client.users.cache.find(user => user.id.toString() == invited_player);

    //Check if user exists
    if (user) {
      if (ot_user) {
        var vassal_obj = getVassal(ot_user_id);

        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            //Check to make sure vassal isn't justifying against their overlord or currently at war with them
            var all_mapped_users = Object.keys(main.global.user_map);
            var all_vassal_players = [];
            var has_player_justification = false;
            var is_currently_justifying = false;

            //Fetch all_vassal_players
            for (var i = 0; i < all_mapped_users.length; i++)
              if (main.global.user_map[all_mapped_users[i]] == actual_ot_user_id)
                if (client.users.cache.find(user => user.id == all_mapped_users[i]))
                  all_vassal_players.push(all_mapped_users[i]);

            //Check justifications
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

            if (!is_currently_justifying) {
              if (!has_player_justification) {
                if (!areAtWar(user_id, ot_user_id)) {
                  //Attempt sending in PM's
                  var could_reach_pms = false;

                  try {
                    user.send(`<@${invited_player}>`).then((msg) => {
                      confirmDialogue(msg, {
                        text: `**Join ${ot_user.name}**\n\nWould you like to accept <@${user_id}>'s (**${usr.name}**)'s invitation to help run their vassal state?\n\n**Note:** You must quit your current country before accepting this invite.`,
                        user: invited_player,
                        delete_after: true
                      }, function () {
                        //Make sure user isn't currently playing a country
                        if (!main.global.user_map[invited_player]) {
                          //Set user map
                          main.global.user_map[invited_player] = actual_id;

                          //Print user feedback
                          sendPlainEmbed(msg, `You have switched to playing **${ot_user.name}** at the behest of **${usr.name}**.`);
                        } else {
                          sendPlainEmbed(msg, `:warning: You are currently playing as **${main.users[main.global.user_map[invited_player]].name}**! Quit playing your country first before accepting an invite.`);
                        }
                      });
                    });
                  } catch (e) {
                    console.log(e);
                  }

                  //Try sending in hub channel
                  if (!could_reach_pms)
                    returnChannel(settings.alert_channel).send(`<@${invited_player}>`).then((msg) => {
                      confirmDialogue(msg, {
                        text: `**Join ${ot_user.name}**\n\nWould you like to accept <@${user_id}>'s (**${usr.name}**)'s invitation to help run their vassal state?\n\n**Note:** You must quit your current country before accepting this invite.\n:warning: **Your DM's couldn't be reached!** Please enable DM's from this server to receive confidential player information and avoid unintended consequences.`,
                        user: invited_player,
                        delete_after: true
                      }, function () {
                        //Make sure user isn't currently playing a country
                        if (!main.global.user_map[invited_player]) {
                          //Set user map
                          main.global.user_map[invited_player] = actual_id;

                          //Print user feedback
                          sendPlainEmbed(msg, `You have switched to playing **${ot_user.name}** at the behest of **${usr.name}**.`);
                        } else {
                          sendPlainEmbed(msg, `:warning: You are currently playing as **${main.users[main.global.user_map[invited_player]].name}**! Quit playing your country first before accepting an invite.`);
                        }
                      });
                    });
                } else {
                  printError(game_obj.id, `You can't manage the players of a vassal state that is currently at war with you!`);
                }
              } else {
                printError(game_obj.id, `**${ot_user.name}** has a wargoal aginst you! You won't be able to manage their players until they either cancel all their valid wargoals, or the current player(s) resign from playing this nation.`);
              }
            } else {
              printError(game_obj.id, `**${ot_user.name}** is currently justifying against you! You can't invite new players onto this country until the war is either resolved, or they rescind the justification.`);
            }
          } else {
            printError(game_obj.id, `**${ot_user.name}** is a vassal, but they aren't your vassal, they're **${main.users[vassal_obj.overlord].name}**'s, and that's what matters.`);
          }
        } else {
          printError(game_obj.id, `You can't control the affairs of a free and independent country, which **${ot_user.name}** is.`);
        }
      } else {
        printError(game_obj.id, `You must invite players to a valid vassal state of yours, not Narnia!`);
      }
    } else {
      printError(game_obj.id, `<@${invited_player}> isn't a valid player you can invite to play this country! Try selecting someone currently in this server.`);
    }
  }
};
