module.exports = {
  closeClientState: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);

    //Close UI
    removeControlPanel(game_obj.id);
    printDiplomacy(user_id);
    game_obj.page = "diplomacy";

    delete game_obj.freeze_alerts;

    //Fix alert_embed
    printAlert(game_obj.id, `${config.icons.checkmark} You have successfully finished editing your client state proposal for **${client_obj.name}**.`);

    //Delete map file
    try {
      fs.unlinkSync(`./map/${client_obj.id}_client_state`);
    } catch {}
  },

  deleteClientState: function (arg0_user, arg1_client_state, arg2_force_delete) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;
    var force_delete = arg2_force_delete;

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
    if (!force_delete)
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
        setTimeout(function(){
          module.exports.modifyClientState(user_id, client_obj, true);
        }, 3000);
      } else {
        //Print error
        printError(game_obj.id, `Your petition to add provinces on the behalf of your client state of **${client_obj.name}** failed for the following reasons:${(neutral_provinces.length > 0) ? `\n- The following provinces don't even belong to you! ${neutral_provinces.join(", ")}` : ``}${(nonexistent_provinces.length > 0) ? `\n- Your cartographers are currently puzzling over your maps, as the following provinces don't even exist! ${nonexistent_provinces.join(", ")}` : ``}${(occupied_provinces.length > 0) ? `\n- You can't request occupied provinces to join your client state! The following provinces are currently occupied by the enemy: ${occupied_provinces.join(", ")}` : ``}${(redundant_provinces.length > 0) ? `\n- The following provinces are already being given to **${client_obj.name}**! ${redundant_provinces.join(", ")}` : ``}`);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseClientStateAddProvinces(user_id, client_obj);
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
        setTimeout(function(){
          module.exports.modifyClientState(user_id, client_obj, true);
        }, 3000);
      } else {
        printError(game_obj.id, `All of the provinces you have specified were either invalid or simply didn't exist!`);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseClientStateRemoveProvinces(user_id, client_obj);
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
    client_string.push(`- **[Set Capital]**`);
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

      var provinces_string = parseProvinces(client_obj.provinces, {
        display_cities: true,
        display_prefix: true,
        limit: 5
      });

      for (var i = 0; i < provinces_string.length; i++)
        province_list_string.push(provinces_string[i]);
    } else {
      province_list_string.push(`_We are not currently ceding any provinces to this nation._`);
      province_list_string.push("");
      province_list_string.push(`Client states cannot be formed without any provinces! Type **[Add Provinces]** to give provinces to this Client State.`);
    }

    cede_province_embeds = splitEmbed(province_list_string, {
      title: `Province Holdings for **${client_obj.name}**:`,
      title_pages: true,
      fixed_width: true
    });

    //Declare client_stats embed
    const client_stats_embed = new Discord.MessageEmbed()
      .setColor(RGBToHex(...client_obj.colour))
      .setTitle(`[Back] | **Client State Overview:**`)
      .setThumbnail(client_obj.flag)
      .setDescription(client_string.join("\n"))
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

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

    game_obj.freeze_alerts = true;
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
      var client_state_obj = createClientState(user_id, arg[0]);

      //Check to make sure name was valid
      if (client_state_obj) {
        var client_state_id = client_state_obj[0].id;

        //Set it as a vassal
        createVassal(user_id, {
          target: client_state_id
        });

        //Call initialiseClientStateScreen()
        module.exports.modifyClientState(user_id, client_state_obj[1]);
      } else {
        printError(game_obj.id, `The name you have specified was already taken or otherwise invalid!`);

        setTimeout(function(){
          module.exports.initialiseCreateClientState(user_id);
        }, 3000);
      }
    });
  },

  initialiseDeleteClientState: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Delete Client State:`,
      prompts: [
        [`Which of your client states would you like to delete?\n\nType **[View Client States]** for a full list of your client state proposals.`, "string"]
      ]
    },
    function (arg) {
      module.exports.deleteClientState(user_id, arg[0], true);

      //Update client_state_proposals if user is currently viewing it
      if (game_obj.page == "client_state_proposals")
        createPageMenu(game_obj.middle_embed, {
          embed_pages: module.exports.printClientStateProposals(user_id),
          page: main.interfaces[game_obj.middle_embed.id].page,
          user: game_obj.user
        });
    },
    function (arg) {
      switch (arg) {
        case "view client states":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printClientStateProposals(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  initialiseEditClientState: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Edit Client State:`,
      prompts: [
        [`Which of your client states would you like to delete?\n\nType **[View Client States]** for a full list of your client state proposals.`, "string"]
      ]
    },
    function (arg) {
      var client_obj = getClientState(user_id, arg[0]);

      //Check if client_obj actually exists
      if (client_obj) {
        module.exports.modifyClientState(user_id, client_obj);
      } else {
        printError(game_obj.id, `The client state proposal you have specified, **${arg[0]}**, turned out to be entirely nonexistent!\n\nType **[View Client State Proposals]** in your diplomacy menu for a full list.`);
      }
    },
    function (arg) {
      switch (arg) {
        case "view client states":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printClientStateProposals(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  initialiseModifyClientState: function (arg0_user, arg1_client_state) {
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
          module.exports.initialiseClientStateAddProvinces(user_id, client_obj);

          break;
        case "back":
          module.exports.closeClientState(user_id, client_obj);

          break;
        case "delete client state":
          module.exports.deleteClientState(user_id, client_obj);

          break;
        case "release client state":
          module.exports.releaseClientState(user_id, client_obj);

          break;
        case "remove provinces":
          module.exports.initialiseClientStateRemoveProvinces(user_id, client_obj);

          break;
        case "set capital":
          module.exports.setClientStateCapital(user_id, client_obj);

          break;
        case "set color":
        case "set colour":
          module.exports.setClientStateColour(user_id, client_obj);

          break;
        case "set flag":
          module.exports.setClientStateFlag(user_id, client_obj);

          break;
        case "set name":
          module.exports.setClientStateName(user_id, client_obj);

          break;
      }
    });
  },

  initialiseReleaseClientState: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Release Client State:`,
      prompts: [
        [`Which of your client states would you like to release?\n\nType **[View Client States]** for a full list of your client state proposals.`, "string"]
      ]
    },
    function (arg) {
      var client_obj = getClientState(user_id, arg[0]);

      //Check if client_obj actually exists
      if (client_obj) {
        module.exports.releaseClientState(user_id, client_obj, true);

        //Update client_state_proposals if user is currently viewing it
        if (game_obj.page == "client_state_proposals")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: module.exports.printClientStateProposals(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });
      } else {
        printError(game_obj.id, `The client state proposal you have specified, **${arg[0]}**, turned out to be entirely nonexistent!\n\nType **[View Client State Proposals]** in your diplomacy menu for a full list.`);
      }
    },
    function (arg) {
      switch (arg) {
        case "view client states":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printClientStateProposals(user_id),
            user: game_obj.user
          });
          return true;

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
    var user_provinces = getProvinces(user_id, { include_hostile_occupations: true });

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
        initialiseMapViewer(game_obj.id, map_file, true) :
        changeImage(game_obj.id, map_file);
    }, 10000);

    //Visual interface using visualPrompt() before creating a page menu
    module.exports.initialiseModifyClientState(user_id, client_obj);
    module.exports.initialiseClientStateScreen(user_id, client_obj);
  },

  printClientStateProposals: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_client_states = Object.keys(usr.client_states);

    //Declare proposals_string
    var proposals_string = [];

    //Format embed
    if (all_client_states.length > 0) {
      proposals_string.push(`Name | Capital | Provinces`);
      proposals_string.push("");
      proposals_string.push(config.localisation.divider);
      proposals_string.push("");

      //Iterate through all client states and push to proposals_string
      for (var i = 0; i < all_client_states.length; i++) {
        var local_client_state = usr.client_states[all_client_states[i]];

        proposals_string.push(`**${local_client_state.name}** - ${(local_client_state.capital_id) ? main.provinces[local_client_state.capital_id].name : "_None_"} | ${parseNumber(local_client_state.provinces.length)}`);
        proposals_string.push(`- **[Edit ${local_client_state.name}]**`);
      }
    } else {
      proposals_string.push(`_You currently have no proposals to form new client states._`);
    }

    //Return statement
    return splitEmbed(proposals_string, {
      title: "[Back] | Client State Proposal List:",
      description: [
        `**[Create Client State]** | **[Delete Client State]** | **[Edit Client State]** | **[Release Client State]**`,
        "",
        config.localisation.divider,
        ""
      ],
      title_pages: true,
      fixed_width: true
    });
  },

  releaseClientState: function (arg0_user, arg1_client_state, arg2_force_release) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = JSON.parse(JSON.stringify(arg1_client_state));
    var force_release = arg2_force_release;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[client_obj.id];
    var reload_interface = false;
    var usr = main.users[actual_id];

    //Check if usr is currently being justified on or is at war
    if (!atWar(user_id)) {
      if (!isBeingJustifiedOn(user_id)) {
        //Check if client state has a capital
        if (client_obj.capital_id) {
          //Make sure user has a capital in the first place
          if (getCapital(user_id)) {
            if (client_obj.capital_id != getCapital(user_id)) {
              if (usr.provinces > 1) {
                var capital_obj = main.provinces[client_obj.capital_id];
                var culture_obj = main.global.cultures[capital_obj.culture];

                //Remove all provinces that are not under the full control of the client state's owner
                for (var i = client_obj.provinces.length - 1; i >= 0; i--) {
                  var local_province = main.provinces[client_obj.provinces[i]];

                  if (local_province.owner != actual_id)
                    client_obj.provinces.splice(i, 1);
                }

                //Check if the capital is actually in the client state's possession
                if (client_obj.provinces.includes(client_obj.capital_id)) {
                  //Release client state
                  for (var i = 0; i < client_obj.provinces.length; i++)
                    try {
                      var local_province = main.provinces[client_obj.provinces[i]];

                      if (local_province.owner == actual_id && local_province.controller == actual_id) {
                        //Transfer province
                        transferProvince(user_id, {
                          province_id: client_obj.provinces[i],
                          target: client_obj.id
                        });
                      } else if (local_province.owner == actual_id) {
                        //Set owner instead
                        local_province.owner = client_obj.id;
                      }
                    } catch {}

                  //Set client state capital
                  moveCapital(client_obj.id, client_obj.capital_id, true, true);

                  //Set client state culture to culture of capital
                  culture_obj.primary_culture.push(client_obj.id);

                  ot_user.pops.accepted_culture = [culture_obj.id];
                  ot_user.pops.primary_culture = culture_obj.id;

                  //Close client state if open
                  if (!force_release)
                    module.exports.closeClientState(user_id, client_obj);

                  //Delete client_state object
                  delete usr.client_states[client_obj.id];

                  //Print user feedback
                  printAlert(game_obj.id, `You have successfully released the client state of **${client_obj.name}** under your control with **${parseNumber(client_obj.provinces.length)}** province(s).`);
                } else {
                  printError(game_obj.id, `The capital of your client state, **${main.provinces[client_obj.capital_id].name}**, is not under its control! Please specify a different capital city for your client nation.`);
                  reload_interface = true;
                }
              } else {
                printError(game_obj.id, `You must have more than **1** Province in order to release client states!`);
                reload_interface = true;
              }
            } else {
              printError(game_obj.id, `The capital of your client state cannot be the same as the capital city of your nation!`);
              reload_interface = true;
            }
          } else {
            printError(game_obj.id, `You must have a capital city yourself before you can release any client states!`);
            reload_interface = true;
          }
        } else {
          printError(game_obj.id, `You must set a capital city for **${client_obj.name}** before being able to release them!`);
          reload_interface = true;
        }
      } else {
        printError(game_obj.id, `You cannot release client states whilst being justified on!`);
        reload_interface = true;
      }
    } else {
      printError(game_obj.id, `You can't release client states whilst at war!`);
      reload_interface = true;
    }

    if (reload_interface)
      setTimeout(function(){
        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      }, 3000);
  },

  setClientStateCapital: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
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
      var city_obj = getCity(arg[0], { users: user_id });

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
      setTimeout(function(){
        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      }, 3000);
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
    var game_obj = getGameObject(user_id);
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
      setTimeout(function(){
        module.exports.modifyClientState(user_id, client_obj, true);

        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      }, 3000);
    });
  },

  setClientStateFlag: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var game_obj = getGameObject(user_id);
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
      setTimeout(function(){
        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      }, 3000);
    });
  },

  setClientStateName: function (arg0_user, arg1_client_state) {
    //Convert from parameters
    var user_id = arg0_user;
    var client_obj = arg1_client_state;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var client_state_id = arg1_client_state;
    var game_obj = getGameObject(user_id);
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
      setTimeout(function(){
        module.exports.initialiseModifyClientState(user_id, client_obj);
        module.exports.initialiseClientStateScreen(user_id, client_obj);
      }, 3000);
    });
  }
};
