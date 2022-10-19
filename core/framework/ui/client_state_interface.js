module.exports = {
  initialiseAddProvinces: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Add Provinces to Client State:`,
      prompts: [
        [`Which provinces would you like to give to **${client_obj.name}**?\nPlease separate each province with a space like so: '4702 4703 4709'.\n\nType **[View Provinces]** to view a list of all your provinces.\nType **[Back]** to cancel adding provinces to this client state.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var all_provinces = unique(arg[0].trim().split(" "));

      var neutral_provinces = [];
      var nonexistent_provinces = [];
      var occupied_provinces = [];
      var redundant_provinces = [];

      //Check to make sure that all provinces exist
      for (var i = 0; i < all_provinces.length; i++)
        if (!main.provinces[all_provinces[i]])
          nonexistent_provinces.push(all_provinces[i]);
        else {
          var local_province = main.provinces[all_provinces[i]];

          //Check to see if province belongs to owner
          if (local_province.owner == actual_id && local_province.controller == actual_id) {
            //Check for redundant provinces
            if (client_obj.provinces.includes(all_provinces[i]))
              redundant_provinces.push(all_provinces[i])
          } else if (local_province.owner == actual_id && (local_province.owner != local_province.controller)) {
            occupied_provinces.push(all_provinces[i]);
          } else {
            neutral_provinces.push(all_provinces[i]);
          }
        }

      //Add provinces to client_obj.provinces if no errors are detected and shade in provinces on the map
      if (neutral_provinces.length + nonexistent_provinces.length + occupied_provinces.length + redundant_provinces.length == 0) {
        for (var i = 0; i < all_provinces.length; i++)
          client_obj.provinces.push(all_provinces[i].trim());

        //Print alert
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully requested that the provinces of **${all_provinces.join(", ")}** be granted to the new client state of **${client_obj.name}**.`);

        //Go back to the client state menu
        module.exports.modifyClientState(user_id, client_obj, true);

        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      } else {
        //Print error
        printError(game_obj.id, `Your petition to add provinces on the behalf of your client state of **${local_user.name}** failed for the following reasons:${(neutral_provinces.length > 0) ? `\n- The following provinces don't even belong to you! ${neutral_provinces.join(", ")}` : ``}${(nonexistent_provinces.length > 0) ? `\n- Your cartographers are currently puzzling over your maps, as the following provinces don't even exist! ${nonexistent_provinces.join(", ")}` : ``}${(occupied_provinces.length > 0) ? `\n- You can't request occupied provinces to join your client state! The following provinces are currently occupied by the enemy: ${occupied_provinces.join(", ")}` : ``}${(redundant_provinces.length > 0) ? `\n- The following provinces are already being given to **${client_obj.name}**! ${redundant_provinces.join(", ")}` : ``}`);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseAddProvinces(user_id, client_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseModifyClientState(user_id, client_obj);
          module.exports.initialiseClientStateScreen(user_id, client_obj);

          break;
        case "view provinces":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvinces(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

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
    var embed_list = [];
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

    //Format province_list_string
    var cede_province_embeds = [];
    var cede_provinces = client_obj.provinces.map(Number)
      .sort(function(a, b) { return a - b }); //Convert string to sorted int array
    var province_list_string = [];

    //Push province list to a separate page [WIP]
    province_list_string.push(`**Province Holdings:**`);
    province_list_string.push(config.localisation.divider);
    province_list_string.push("");

    //Display provinces being ceded
    if (cede_provinces.length > 0) {
      province_list_string.push(`We currently plan on ceding the following provinces to **${client_obj.name}**:`);
      province_list_string.push("");
      province_list_string.push(config.localisation.divider);
      province_list_string.push("");

      for (var i = 0; i - 5 < cede_provinces.length; i += 5) {
        var local_cede_string = [];

        for (var x = 0; x < 5; x++)
          if (cede_provinces[i*5 + x])
            local_cede_string.push(`**${cede_provinces[i*5 + x]}**`)

        //Push to province_list_string
        province_list_string.push(`- ${cede_provinces.join(", ")}`);
      }
    } else {
      province_list_string.push(`_We are not currently ceding any provinces to this nation._`);
      province_list_string.push("");
      province_list_string.push(`Client states cannot be formed without any provinces! Type **[Add Provinces]** to give provinces to this Client State.`);
    }

    cede_province_embeds = splitEmbed(local_cede_string, {
      title: `Province Holdings for **${client_obj.name}**:`,
      title_pages: true,
      fixed_width: true
    });

    //Declare client_stats embed
    const client_stats_embed = new Discord.MessageEmbed()
      .setColor(RGBToHex(...client_obj.colour))
      .setTitle(`**Client State Overview:**`)
      .setThumbnail(client_obj.flag)
      .setDescription(client_string.join("\n"));

    embed_list = [client_stats_embed];

    //Add cede_province_embeds
    for (var i = 0; i < cede_province_embeds.length; i++)
      embed_list.push(cede_province_embeds[i]);

    //Initialise 1-page menu showing client state properties
    createPageMenu(game_obj.alert_embed, {
      embed_pages: embed_list,
      fixed_width: true,
      user: user_id
    });
  },

  initialiseModifyClientState: function (arg0_user, arg1_client_state) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Create invisible visualPrompt()
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Editing the Client State of **${client_obj.name}**:`,
      do_not_cancel: true,
      do_not_display: true,

      prompts: [
        [`Which of the above actions would you like to take?`, "string"]
      ]
    },
    function (arg) {

    });
  },

  initialiseRemoveProvinces: function (arg0_user, arg1_client_state) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual prompt
    visualPrompt(game_obj.id, user_id, {
      title: `Remove Provinces from Client State:`,
      prompts: [
        [`Which provinces would you like to remove from the posession of **${client_obj.name}**?\nPlease separate each province with a space like so: '4702 4703 4709'.\n\nType **[Back]** to cancel taking away provinces from this client state's control.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var all_provinces = unique(arg[0].trim().split(" "));
      var successfully_removed = 0;

      //Go through all provinces and try removing them
      for (var i = 0; i < all_provinces.length; i++) {
        var local_element = all_provinces[i].trim();

        if (client_obj.provinces.includes(local_element)) {
          client_obj.provinces = removeElement(client_obj.provinces, local_element);
          successfully_removed++;
        }
      }

      //Print output
      if (successfully_removed > 0) {
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully removed **${parseNumber(successfully_removed)}** provinces from the control of **${client_obj.name}**.`);

        //Go back to the client state menu
        module.exports.modifyClientState(user_id, client_obj, true);

        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      } else {
        printError(game_obj.id, `All of the provinces you have specified were either invalid or simply didn't exist!`);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseRemoveProvinces(user_id, client_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseModifyClientState(user_id, client_obj);
          module.exports.initialiseClientStateScreen(user_id, client_obj);

          break;
      }
    });
  },

  modifyClientState: function (arg0_user, arg1_client_state, arg2_change_image) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;
    var change_image = arg2_change_image;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var map_file = `${client_obj.id}_client_state`;
    var usr = main.users[actual_id];

    //Cache a new SVG
    if (!change_image)
      loadMap(`${map_file}.svg`, map_file);

    //Shade in any provinces belonging to usr that aren't listed as being ceded to client_obj
    var user_provinces = getProvinces(actual_id, { include_hostile_occupations: true });

    for (var i = 0; i < user_provinces.length; i++)
      if (client_obj.provinces.includes(user_provinces[i].id)) {
        //Shade in province
        setProvinceColour(map_file, user_provinces[i].id, client_obj.colour);
      } else if (user_provinces[i].owner == user_provinces[i].controller) {
        //Normal shader
        setProvinceColour(map_file, user_provinces[i].id, usr.colour)
      } else if (user_provinces[i].owner != user_provinces[i].controller) {
        //Occupation shader
        var ot_user = main.users[user_provinces[i].controller];
        var new_colour = [
          Math.min(ot_user.colour[0] + 20, 255),
          Math.min(ot_user.colour[1] + 20, 255),
          Math.min(ot_user.colour[2] + 20, 255)
        ];

        //Shade in province
        setProvinceColour(map_file, user_provinces[i].id, new_colour);
      }

    //Initialise map viewer
    cacheSVG(map_file);

    setTimeout(function(){
      (!change_image) ?
        initialiseMapViewer(game_obj.id, map_file) :
        changeImage(game_obj.id, map_file);
    }, 5000);

    //Visual interface using visualPrompt() before creating a page menu
    module.exports.initialiseModifyClientState(user_id, client_obj);
    module.exports.initialiseClientStateScreen(user_id, client_obj);
  }
};
