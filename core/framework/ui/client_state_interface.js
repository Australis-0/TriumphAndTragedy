module.exports = {
  initialiseCreateClientState: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt asking for name
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Create A New Client State:`,
      prompts: [
        [`What would you like to name your new client state?`, "string"]
      ]
    },
    function (arg) {
      //Create new country object with that name
      var client_state_obj = createClientState(client_state_id, arg[0]);

      //Check to make sure name was valid
      if (client_state_obj) {
        var client_state_id = client_state_obj[0].id;

        //Set it as a vassal
        createVassal(actual_id, {
          target: client_state_id
        });

        //Call initialiseClientStateScreen()
        module.exports.initialiseClientStateScreen(user_id);
      } else {
        printError(game_obj.id, `The name you have specified was already taken or otherwise invalid!`);

        setTimeout(function(){
          module.exports.initialiseCreateClientState(user_id);
        }, 3000);
      }
    });
  },

  initialiseClientStateScreen: function (arg0_user, arg1_client_state) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Format client_string
    var client_string = [];

    //Push name
    client_string.push(`${config.icons.globe} Country: **${client_obj.name}**`);
    client_string.push(`${config.icons.old_scroll} Colour: **${client_obj.colour.join(", ")}**`);
    client_string.push(`${config.icons.provinces} Provinces: **${parseNumber(client_obj.provinces.length)}**`);
    client_string.push("");
    client_string.push(config.localisation.divider);
    client_string.push("");
    client_string.push(`- **[Add Provinces]**`);
    client_string.push(`- **[Remove Provinces]**`);
    client_string.push("");
    client_string.push(`- **[Set Colour]**`);
    client_string.push(`- **[Set Flag]**`);
    client_string.push(`- **[Set Name]**`);

    //Push province list to a separate page [WIP]

    //Declare client_stats embed
    const client_stats_embed = new Discord.MessageEmbed()
      .setColor(RGBToHex(...client_obj.colour))
      .setTitle(`**Client State Overview:**`)
      .setThumbnail(client_obj.flag)
      .setDescription(client_string.join("\n"));

    //Initialise 1-page menu showing client state properties
    createPageMenu(game_obj.alert_embed, {
      embed_pages: [client_stats_embed],
      fixed_width: true,
      user: user_id
    })
  },

  initialiseModifyClientState: function (arg0_user) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
  }
};
