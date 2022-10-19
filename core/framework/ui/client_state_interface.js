module.exports = {
  closeClientState: function (arg0_user, arg1_client_state) { //[WIP] - Redirect to diplomacy menu instead of country interface
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);

    //Close UI
    removeControlPanel(game_obj.id);
    printStats(user_id);
    game_obj.page = "country_interface";

    //Delete map file
    try {
      fs.unlinkSync(`./map/${client_obj.id}_client_state`);
    } catch {}
  },

  deleteClientState: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Deep copy client_obj for preservation
    var old_client_obj = JSON.parse(JSON.stringify(client_obj));

    //Delete client state
    deleteCountry(client_obj.id);
    delete usr.client_states[client_obj.id];

    //Print user feedback
    printAlert(game_obj.id, `You have successfully shelved the prospects of **${old_client_obj.name}** as a viable state.`);

    //Close client state UI
    module.exports.closeClientState(user_id, old_client_obj.id);
  },

  initialiseClientStateAddProvinces: function (arg0_user, arg1_client_state) {
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

  initialiseClientStateRemoveProvinces: function (arg0_user, arg1_client_state) {
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

  initialiseClientStateScreen: function (arg0_user, arg1_client_state) {
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
    client_string.push("");
    client_string.push(`${config.icons.political_capital} Capital City: ${(client_obj.capital_id) ? main.provinces[client_obj.capital_id].name : "None"}`);
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
    client_string.push("");
    client_string.push(`- **[Delete Client State]**`);
    client_string.push(`- **[Release Client State]**`);

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
      .setTitle(`[Back] | **Client State Overview:**`)
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

  initialiseModifyClientState: function (arg0_user, arg1_client_state) { //[WIP] - Add a way to save client states and release them
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
      switch (arg[0]) {
        case "add provinces":
          initialiseClientStateAddProvinces(user_id, client_obj);

          break;
        case "delete client state":
          deleteClientState(user_id, client_obj);

          break;
        case "remove provinces":
          initialiseClientStateRemoveProvinces(user_id, client_obj);

          break;
        case "set color":
        case "set colour":
          setClientStateColour(user_id, client_obj);

          break;
        case "set flag":
          setClientStateFlag(user_id, client_obj);

          break;
        case "set name":
          setClientStateName(user_id, client_obj);

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
  },

  printClientStateProposals: function (arg0_user) { //[WIP]

  },

  releaseClientState: function (arg0_user, arg1_client_state) { //[WIP]

  },

  setClientStateCapital: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.id, user_id, {
      title: `Set Client State Capital:`,
      prompts: [
        [`What city would you like to set as your client state's new capital?\n\nType **[View Cities]** to view a full list of your cities.`, "text"]
      ]
    },
    function (arg) {
      var city_obj = getCity(arg[0], { users: actual_id });

      if (city_obj) {
        if (client_obj.provinces.includes(city_obj.id)) {
          //Set capital
          client_obj.capital_id = city_obj.id;

          //Print user feedback
          printAlert(game_obj.id, `You have successfully set **${city_obj.name}** as the proposed capital of the future state of **${client_obj.name}**.`);
        } else {
          printError(game_obj.id, `**${client_obj.name}** isn't in proposed possession of this province! Add this province to **${client_obj.name}** first before setting it as their capital.`);
        }
      } else {
        printError(game_obj.id, `You must specify a valid city to set as the capital of **${client_obj.name}**!`)
      }

      //Go back to the main client state menu
      module.exports.initialiseModifyClientState(user_id, client_obj);
      module.exports.initialiseClientStateScreen(user_id, client_obj);
    },
    function (arg) {
      switch (arg) {
        case "view cities":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCities(game_obj.user),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  setClientStateColour: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.id, user_id, {
      title: `Set Client State Colour:`,
      prompts: [
        [`Please insert the R code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the G code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the B code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }]
      ]
    },
    function (arg) {
      var change_client_state_colour = setColour(client_obj.id, arg[0], arg[1], arg[2], true, true);

      //Check if command went through
      if (change_client_state_colour[0]) {
        printAlert(game_obj.id, `You have successfully changed the colour of **${client_obj.name}** to **${arg[0]}**, **${arg[1]}**, **${arg[2]}**.`);
        client_obj.colour = [arg[0], arg[1], arg[2]];
      } else {
        printError(game_obj.id, change_client_state_colour[1]);
      }

      //Go back to the main client state menu
      module.exports.modifyClientState(user_id, client_obj, true);

      module.exports.initialiseModifyClientState(user_id, client_obj);
      module.exports.initialiseClientStateScreen(user_id, client_obj);
    });
  },

  setClientStateFlag: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.id, user_id, {
      title: `Set Client State Flag:`,
      prompts: [
        [`What would you like to change the standard of **${client_obj.name}** to? Please insert a valid image URL.`, "string"]
      ]
    },
    function (arg) {
      var change_client_state_flag = setFlag(client_obj.id, arg[0], true, true);

      //Print user feedback
      if (change_client_state_flag[0]) {
        printAlert(game_obj.id, `You have successfully changed the flag of **${client_obj.name}**.`);
        client_obj.flag = arg[0];
      } else {
        printError(game_obj.id, change_client_state_flag[1]);
      }

      //Go back to the main client state menu
      module.exports.initialiseModifyClientState(user_id, client_obj);
      module.exports.initialiseClientStateScreen(user_id, client_obj);
    });
  },

  setClientStateName: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.id, user_id, {
      title: `Rename Client State:`,
      prompts: [
        [`What would you like to rename the client state of **${client_obj.name}** to?`, "text"]
      ]
    },
    function (arg) {
      var change_client_state_name = renameCountry(client_obj.id, arg[0], true, true);

      //Print user feedback
      if (change_client_state_name[0]) {
        printAlert(game_obj.id, `You have successfully changed the name of **${client_obj.name}** to **${arg[0]}**.`);
        client_obj.name = arg[0];
      } else {
        printError(game_obj.id, change_client_state_name[1]);
      }

      //Go back to the main client state menu
      module.exports.initialiseModifyClientState(user_id, client_obj);
      module.exports.initialiseClientStateScreen(user_id, client_obj);
    });
  }
};
