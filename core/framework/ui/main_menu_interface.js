module.exports = {
  closeMainMenu: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Check if main_menu_embed exists
    if (game_obj.main_menu_embed) {
      game_obj.main_menu_embed.delete();
      delete game_obj.main_menu_embed;
    }
  },

  initialiseExitGame: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise confirmation prompt
    returnChannel(game_obj.channel).send("Loading ..").then((msg) => {
      confirmDialogue(msg, {
        text: "**Save and Exit Game**\n\nAre you sure you want to quit the game and return to the main menu?",
        user: game_obj.user,
        delete_after: true
      }, function () {
        clearGame(game_obj.id);
      })
    });
  },

  initialiseInvitePlayer: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Invite Player:`,
      prompts: [
        [`Whom would you like to invite to help you run your nation's affairs? Please type out the name of a user or ping them.`, "user"]
      ]
    },
    function (arg) {
      module.exports.invitePlayer(user_id, arg[0]);
    });
  },

  initialiseKickPlayer: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Kick Player:`,
      prompts: [
        [`Whom would you like to kick from your current party? Please type out the name of a user or ping them.\n\nType **[View Players]** to view a list of current controlling players.`, "user"]
      ]
    },
    function (arg) {
      module.exports.kickPlayer(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view players":
          module.exports.printCoopMenu(user_id);

          break;
      }
    });
  },

  initialiseTransferLeadership: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Transfer Leadership:`,
      prompts: [
        [`Whom would you like to transfer ownership of your country to? Please type out the name of a user or ping them.\n\nType **[View Players]** to view a list of current controlling players.`, "user"]
      ]
    },
    function (arg) {
      module.exports.promotePlayer(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view players":
          module.exports.printCoopMenu(user_id);

          break;
      }
    });
  },

  initialiseResign: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise confirmation prompt
    returnChannel(game_obj.channel).send("Loading ..").then((msg) => {
      confirmDialogue(msg, {
        text: `**Resign**\n\nAre you sure you wish to abandon this nation? ${(config.defines.common.enable_choose_countries) ? `If another player chooses to pick your abandoned country, you won't be able to get back in unless they invite you!` : `If no other players are on this nation, it will be permanently abandoned and you will not be able to pick it again!`}`,
        user: game_obj.user,
        delete_after: true
      }, function () {
        //Check if user has quit their previous country too recently for this to happen
        if (main.round_count - config.defines.common.resign_cooldown >= returnSafeNumber(main.global[`${user_id}_last_quit`])) {
          //Quit country and put marker on global
          main.global[`${user_id}_last_quit`] = main.round_count;
          delete main.global.user_map[user_id];

          //Quit game
          clearGame(game_obj.id);
        } else {
          printError(game_obj.id, `You have started a new country too recently to be able to resign again! Wait another **${parseNumber(config.defines.common.resign_cooldown - (main.round_count - main.global[`${user_id}_last_quit`]))}** turn(s) to abdicate from ruling your nation.`);
        }
      });
    });
  },

  invitePlayer: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if player is valid
    returnChannel(settings.alert_channel).send(`<@${ot_user_id}>`).then((msg) => {
      confirmDialogue(msg, {
        text: `**Join ${usr.name}**\n\nWould you like to accept <@${user_id}>'s invitation to help run their country?\n\n**Note:** You must quit your current country before accepting this invite.`,
        user: ot_user_id,
        delete_after: true
      }, function () {
        //Make sure user isn't currently playing a country
        if (!main.global.user_map[ot_user_id]) {
          //Set user map
          main.global.user_map[ot_user_id] = actual_id;

          //Reload UI
          if (game_obj.page == "coop_menu")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: module.exports.printCoopMenu(user_id),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });

          //Print user feedback
          sendPlainEmbed(msg, `You have switched to playing **${usr.name}**.`);
        } else {
          sendPlainEmbed(msg, `:warning: You are currently playing as **${main.users[main.global.user_map[ot_user_id]].name}**! Quit playing your country first before accepting an invite.`);
        }
      })
    });
  },

  kickPlayer: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user is even playing that country
    if (main.global.user_map[arg[0]] == actual_id) {
      if (client.users.cache.find(user => user.id == arg[0])) {
        //Kick from party
        delete main.global.user_map[arg[0]];

        //Reload UI
        if (game_obj.page == "coop_menu")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: module.exports.printCoopMenu(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        //Print user feedback
        returnChannel(settings.alert_channel).send(`<@${arg[0]}> was kicked from the country of **${usr.name}**.`);
        printAlert(game_obj.id, `You have kicked <@${arg[0]}> from being able to play on your country.`);
      } else {
        printError(game_obj.id, `You must specify a real user to kick from your country! This player has either left all servers the bot is in, or was not a real user.`);
      }
    } else {
      printError(game_obj.id, `<@${arg[0]}> could not be found playing your country!`);
    }
  },

  printCoopMenu: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_mapped_users = Object.keys(main.global.user_map);
    var actual_id = main.global.user_map[user_id];
    var current_players = [];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Get current players
    for (var i = 0; i < all_mapped_users.length; i++)
      if (main.global.user_map[all_mapped_users[i]] == actual_id)
        if (usr.owner != all_mapped_users[i])
          current_players.push(all_mapped_users[i]);

    //Format coop_menu_string
    var coop_menu_string = [];

    coop_menu_string.push(`**Current Players**:`);
    coop_menu_string.push("");

    //Push the owner
    coop_menu_string.push(`<@${usr.owner}> - ${(!getVassal(actual_id)) ? "_Owner_" : "_Overlord_"}`);

    if (current_players.length > 0)
      coop_menu_string.push("");

    for (var i = 0; i < current_players.length; i++) {
      var user_obj = client.users.cache.find(user => user.id == current_players[i]);

      //Exclude user if it is not an actual User ID
      if (user_obj) {
        coop_menu_string.push(`<@${current_players[i]}> - Player`);
        coop_menu_string.push(`- **[Kick ${user_obj.username}]** | **[Promote ${user_obj.username}]**`);
      }
    }

    coop_menu_string.push("");
    coop_menu_string.push(config.localisation.divider);
    coop_menu_string.push("");
    coop_menu_string.push(`- **[Invite Player]** | **[Kick Player]** | **[Transfer Leadership]**`);

    //Create embed and edit current main menu if it exists, if not edit game_obj.main_embed
    createPageMenu((game_obj.main_menu_embed) ? game_obj.main_menu_embed : game_obj.middle_embed, {
      embed_pages: splitEmbed(coop_menu_string, {
        title: `[Back] | Player List:`,
        title_pages: true,
        fixed_width: true
      }),
      user: game_obj.user
    });
  },

  printMainMenu: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Format main_menu_string
    var main_menu_string = [];

    main_menu_string.push("");
    main_menu_string.push(config.localisation.divider);
    main_menu_string.push("");
    main_menu_string.push(`**[Resume Game]**`);
    main_menu_string.push("");
    main_menu_string.push(`**[Manage Co-Op]**`);
    main_menu_string.push(`**[Resign]**`);
    main_menu_string.push(`**[Exit Game]**`);

    //Create embed and post new message
    const main_menu_embed = new Discord.MessageEmbed()
      .setColor(RGBToHex(212, 201, 161))
      .setTitle(`--- **Main Menu:** ---`)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(main_menu_string.join("\n"));

    //Post new message
    (!game_obj.main_menu_embed) ?
      returnChannel(game_obj.channel).send({ embeds: [main_menu_embed] }).then((message) => {
        game_obj.main_menu_embed = message;
      }) :
      game_obj.main_menu_embed.edit({ embeds: [main_menu_embed] });
  },

  promotePlayer: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Make sure player is playing that country to begin with
    if (main.global.user_map[arg[0]] == actual_id) {
      if (client.users.cache.find(user => user.id == arg[0])) {
        //Set as owner
        usr.owner = arg[0];

        //Reload UI
        if (game_obj.page == "coop_menu")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: module.exports.printCoopMenu(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        //Print user feedback
        returnChannel(settings.alert_channel).send(`<@${arg[0]}> was granted ownership of the country of **${usr.name}**.`);
        printAlert(game_obj.id, `You have transferred ownership of your country to <@${arg[0]}>. You remain playing this country until you **[Resign]**.`);
      } else {
        printError(game_obj.id, `You must specify a real user to transfer ownership of your country to! This player has either left all servers the bot is in, or was not a real user.`);
      }
    } else {
      printError(game_obj.id, `<@${arg[0]}> could not be found playing your country!`);
    }
  }
};
