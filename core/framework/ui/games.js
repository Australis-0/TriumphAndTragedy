//Initialise Games/Lobbies UI
module.exports = {
  createNewGame: function (arg0_user, arg1_message) {
    //Convert from parameters
    var user_id = arg0_user;
    var msg = message;

    //Create new game channel
    if (!getGame(usr)) {
      var game_id = generateRandomID();

      //Create new game interface object
      interfaces[game_id] = {
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
        interfaces[game_id].page = (main.users[user_id]) ? "country_interface" : "founding_map";

        //Send confirmation message and initialise main menu embeds
        sendPlainEmbed(msg, `<@${user_id}> - Click <#${channel.id}> to begin playing.`);
        intiialiseGameEmbeds(game_id);
      });
    } else {
      sendPlainEmbed(msg, "You are already playing a concurrent game of **Triumph & Tragedy**!");
    }
  },

  initialiseGameEmbeds: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var game_obj = interfaces[game_id];

    var usr = main.users[game_obj.user];

    //Load up either the starting map viewer or country interface depending on the starting page
    switch (game_obj.page) {
      case "country_interface":
        

        break;
      case "founding_map":
        break;
    }
  },

  reinitialiseGameEmbeds: function () {
    //Regular error trapping
    try {
       //Declare local instance variables
       var all_interfaces = Object.keys(interfaces);
       var open_channels = [];

       //Reinitialise all game embeds
       for (var i = 0; i < all_interfaces.length; i++) if (interfaces[all_interfaces[i]].type == "game") {
         try {
           var local_ui = interfaces[all_interfaces[i]];
           var local_messages = returnChannel(local_ui.channel).messages.fetch({ limit: 10 }).then(messages => {
             messages.forEach(msg => msg.delete());
           });
           initialiseGameEmbeds(all_interfaces[i]);
         } catch (e) {
           log.error(`Could not delete messages and reinitialise game embeds: ${e}.`);
         }
       }
    } catch (e) {
      log.error(`reinitialiseGameEmbeds() ran into an error: ${e}.`);
    }
  }
};
