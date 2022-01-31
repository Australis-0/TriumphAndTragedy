//Initialise Games/Lobbies UI
module.exports = {
  clearGame: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[arg0_game_id];

    //Delete game channel first
    try {
      returnChannel(game_obj.channel).delete();
    } catch (e) {
      log.warn(`clearGame() - Game channel for Game ID ${game_id} could not be found: ${e}`);
    }

    //Delete game object
    delete interfaces[game_id];
  },

  clearGames: function () {
    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);

    //Delete all game objects and associated channels
    for (var i = 0; i < all_interfaces.length; i++) {
      var local_game_obj = interfaces[all_interfaces[i]];

      if (local_game_obj.type == "game") {
        //Error trapping just in case channel doesn't exist
        try {
          returnChannel(local_game_obj.channel).delete();
        } catch (e) {
          log.warn(`Game channel for Game ID ${all_interfaces[i]} could not be found: ${e}.`);
        }

        //Remove game object
        delete interfaces[all_interfaces[i]];
      }
    }
  },

  createNewGame: function (arg0_user, arg1_message) {
    //Convert from parameters
    var user_id = arg0_user;
    var msg = arg1_message;

    //Declare local instance variables
    var server = msg.guild;

    //Create new game channel
    if (!getGame(user_id)) {
      var game_id = generateRandomID();

      //Create new game interface object
      interfaces[game_id] = {
        id: game_id,
        type: "game",
        user: user_id,

        cache: {}, //Used for storing interface position and temporary UI information
        collectors: [],
        last_active: new Date().getTime()
      };

      //Create new game channel
      server.channels.create(`tt-${username}`, {
        type: "text"
      }).then((channel) => {
        var category_id = settings.tt_category_id;

        //Initialise channel
        channel.setParent(category_id);
        channel.setTopic(`This is a private game channel for <@${user_id}> related to **Triumph & Tragedy**.\nCurrently in game.`);

        //Make channel private so that only the user who requested the channel can access it
        channel.permissionOverwrites.set([
          {
            id: user_id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          }
        ]);

        interfaces[game_id].channel = channel.id;
        interfaces[game_id].map = {};
        interfaces[game_id].page = (main.users[user_id]) ? "country_interface" : "founding_map";

        //Send confirmation message and initialise main menu embeds
        sendPlainEmbed(msg, `<@${user_id}> - Click <#${channel.id}> to begin playing.`);
        initialiseGameEmbeds(game_id);
      });
    } else {
      sendPlainEmbed(msg, "You are already playing a concurrent game of **Triumph & Tragedy**!");
    }
  },

  initialiseGameEmbeds: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[game_id];

    //Declare local instance variables
    var usr = main.users[game_obj.user];

    //Reset alert_array and collectors
    game_obj.alert_array = [];
    game_obj.collectors = [];

    //Initialise embeds
    const middle_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription("Nothing to see here.");
    const bottom_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setDescription("No recent alerts.")
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    //Send out the embeds!
    try {
      //Initialise message objects
      returnChannel(game_obj.channel).send(config.localisation.blank).then((message) => {
        game_obj.header = message;

        setInterval(function(){
          if (game_obj.header_change) {
            message.edit({ embeds: [game_obj.new_header] });
            delete game_obj.header_change;
          }
        }, 100);
      });

      //Main embed displaying stats screen
      returnChannel(game_obj.channel).send({ embeds: [middle_embed] }).then((message) => {
        game_obj.collectors.push(message.id);
        game_obj.middle_embed = message;

        setInterval(function(){
          if (game_obj.main_change) {
            message.edit({ embeds: [game_obj.main_embed] });
            message.reactions.removeAll().catch(error => log.error(`Failed to clear reactions: ${error}.`));
            game_obj.main_change = false;
          }
        }, 100);
      });
      //Extra control panel elements
      returnChannel(game_obj.channel).send("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png").then((message) => {
        game_obj.collectors.push(message.id);
        game_obj.middle_control_panel = message;
      });
      returnChannel(game_obj.channel).send("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png").then((message) => {
        game_obj.collectors.push(message.id);
        game_obj.bottom_control_panel = message;
      });

      //Bottom embed displaying alerts
      returnChannel(game_obj.channel).send({ embeds: [bottom_embed] }).then((message) => {
        game_obj.alert_embed = message;

        setInterval(function(){
          var message_is_prompt = false;
          var all_visual_prompts = Object.keys(interfaces);

          //Check if message is subject to a current command prompt
          for (var i = 0; i < all_visual_prompts.length; i++) {
            var local_prompt = interfaces[all_visual_prompts[i]];
            if (local_prompt.type == "visual_prompt")
              if (local_prompt.message.id == message.id)
                message_is_prompt = true;
          }

          //Only edit the message if the message is not a prompt.
          if (!message_is_prompt) {
            if (game_obj.alert_change) {
              if (game_obj.alert_array.length == 0) {
                const new_alert_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription("No new alerts.")
                  .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

                message.edit({ embeds: [new_alert_embed] });
              } else {
                const new_alert_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription(game_obj.alert_array.join("\n"))
                  .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

                message.edit({ embeds: [new_alert_embed] });
              }
              game_obj.alert_change = false;
            }
          }
        }, 100);

        //Date processing
        setInterval(function(){
          const topbar_embed = new Discord.MessageEmbed()
            .setColor(settings.bot_colour)
            .setTitle(`${config.icons.time} **${getDate(main.date)}**`)
            .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

          try {
            game_obj.header.edit({ embeds: [topbar_embed] });
          } catch {}
        }, 10000);

        //Begin processing page
        if (!["country_interface", "map", "founding_map"].includes(game_obj.page))
          game_obj.page = (main.global.user_map[game_obj.user]) ? "country_interface" : "founding_map";

        //Load up either the starting map viewer or country interface depending on the starting page
        switch (game_obj.page) {
          case "country_interface":
            initialiseTopbar(game_obj.user);
            printStats(game_obj.user);

            break;
          case "map":
          case "founding_map":
            //Initialise map viewer and found country dialogue prompt
            initialiseMapViewer(game_id);
            if (game_obj.page == "founding_map") initialiseFoundCountry(game_obj.user);
            if (["map"].includes(game_obj.page)) initialiseTopbar(game_obj.user);

            break;
        }
      });
    } catch {}
  },

  reinitialiseGameEmbeds: function () {
    //Regular error trapping
    try {
       //Declare local instance variables
       var all_interfaces = Object.keys(interfaces);
       var open_channels = [];

       //Reinitialise all game embeds
       for (var i = 0; i < all_interfaces.length; i++)
        if (interfaces[all_interfaces[i]].type == "game") {
          var local_ui = interfaces[all_interfaces[i]];

          try {
            var local_messages = returnChannel(local_ui.channel).messages.fetch({ limit: 10 }).then((messages) => {
              messages.forEach(msg => msg.delete());
            });
            initialiseGameEmbeds(all_interfaces[i]);
          } catch (e) {
            if (returnChannel(local_ui.channel)) {
              log.error(`Could not delete messages and reinitialise game embeds: ${e}.`);
              setTimeout(module.exports.reinitialiseGameEmbeds, 3000);
            }
          }
        }

       //Clear all menus of type page_menu, visual_prompt
       for (var i = 0; i < all_interfaces.length; i++)
         if (["page_menu", "visual_prompt"].includes(interfaces[all_interfaces[i]].type))
          delete interfaces[all_interfaces[i]];
    } catch (e) {
      log.error(`reinitialiseGameEmbeds() ran into an error: ${e}.`);
    }
  }
};
