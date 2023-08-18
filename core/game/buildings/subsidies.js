module.exports = {
  initialiseSubsidiseBuilding: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Subsidise/Defund Building:`,
      prompts: [
        [`What is the name of the building you would like to subsidise?\n\nType **[View Industry]** for a full list of all buildings under your control.`, "string"],
        [`If this building is already subsidised, would you like to defund it? Please type either 'yes' or 'no'.`, "string"]
      ]
    },
    function (arg) {
      var building_obj = getBuildingByName(user_id, arg[0]);
      var desubsidise = (arg[1].trim().toLowerCase() == "yes");

      if (building_obj) {
        module.exports.subsidiseBuilding(user_id, building_obj, { desubsidise: desubsidise });
      } else {
        printError(game_obj.id, `The building you have specified, **${arg[0]}**, could not be found anywhere in your country!`);
      }
    },
    function (arg) {
      switch (arg) {
        case "view industry":
          printIndustry(user_id);
          return true;

          break;
    });
  },

  /*
    subsidiseAllBuildings() - Subsidises all of a user's buildings. Fires once per turn if user has toggleAllSubsidies() enabled.
    options: {
      desubsidise: true/false, - Turn off subsidies for all buildings instead of subsidisng
      province_ids: [], - The province IDs to target for subsidies instead of targeting a user's global provinces

      do_not_display: true/false - Whether to display this action to a player's game UI
    }
  */
  subsidiseAllBuildings: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces;
    var game_obj = getGameObject(user_id);
    var total_subsidised = 0;
    var usr = main.users[actual_id];

    //Handle options.province_ids
    if (options.province_ids) {
      all_provinces = [];
      options.province_ids = getList(options.province_ids);

      for (var i = 0; i < options.province_ids.length; i++)
        all_provinces.push(main.provinces[options.province_ids[i]]);
    } else {
      all_provinces = getProvinces(user_id);
    }

    //Set all buildings to being subsidised
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].buildings)
        for (var x = 0; x < all_provinces[i].buildings.length; x++) {
          var local_building = all_provinces[i].buildings[x];

          //Check if building is being subdisied/desubsidised
          if (local_building.subsidised) {
            if (options.desubsidise) {
              total_subsidised++;
              delete local_building.subsidised;
            }
          } else {
            if (!options.desubsidise) {
              total_subsidised++;
              local_building.subsidised = true;
            }
          }
        }

    //Set usr.all_subsidies to true/false so that this can be constantly updated in turn_framework
    if (!options.desubsidise) {
      if (!options.province_ids)
        usr.all_subsidies = true;

      if (!options.do_not_display)
        printAlert(game_obj.id, `We have enabled subsidies for all **${parseNumber(total_subsidised)}** building(s) across ${(options.province_ids) ? `**${parseNumber(all_provinces.length)}** province(s).` : `our country. This will continually update for new buildings.`}`);
    } else {
      delete usr.all_subsidies;

      if (!options.do_not_display)
        printAlert(game_obj.id, `We have turned off subsidies for all **${parseNumber(total_subsidised)}** building(s) across ${(options.province_ids) ? `**${parseNumber(all_provinces.length)}** province(s)` : `our country`}. In order to allow for manual subsidies, this will not continually update, even for newly incorporated territories.`);
    }

    if (!options.do_not_display) {
      //Refresh UI
      if (game_obj.page.startsWith("view_building_"))
        printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
      if (game_obj.page.startsWith("view_buildings_"))
        printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
      if (game_obj.page == "view_industry")
        printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
    }

    //Return statement
    return total_subsidised;
  },

  /*
    subsidiseBuilding() - Subsidises an individual building or turns off subsidies.
    options: {
      desubsidise: true/false, - Turn off subsidies instead of subsidising the building

      do_not_display: true/false - Whether to display the action in the player's UI
    }
  */
  subsidiseBuilding: function (arg0_user, arg1_building, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_obj = arg1_building;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_id = building_obj.split("-")[0];
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    //Subsidise building
    if (province_obj.controller == actual_id) {
      if (!building_obj.insolvent) {
        if (!options.desubsidised) {
          if (building_obj.subsidised) {
            delete building_obj.subsidised;
            delete usr.all_subsidies; //This is needed for obvious reasons

            if (!options.do_not_display)
              printAlert(game_obj.id, `We have stopped subsidies for **${(building_obj.name) ? building_obj.name : building_obj.id}**.`);
          } else {
            if (!options.do_not_display)
              printError(game_obj.id, `**${(building_obj.name) ? building_obj.name : building_obj.id}** is already no longer receiving subsidies!`);
          }
        } else {
          if (!building_obj.subsidised) {
            building_obj.subsidised = true;

            if (!options.do_not_display)
              printAlert(game_obj.id, `We have subsidised the **${(building_obj.name) ? building_obj.name : building_obj.id}**.`);
          } else {
            if (!options.do_not_display)
              printError(game_obj.id, `**${(building_obj.name) ? building_obj.name : building_obj.id}** is already being subsidised!`);
          }

          if (!options.do_not_display) {
            //Refresh UI
            if (game_obj.page.startsWith("view_building_"))
              printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
            if (game_obj.page.startsWith("view_buildings_"))
              printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
            if (game_obj.page == "view_industry")
              printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
          }
        }
      } else {
        if (!options.do_not_display)
          printError(game_obj.id, `We must manually reopen this building first for ${config.icons.money} **${parseNumber(getReopenCost(building_obj))}** by typing **[Reopen Building]**!`);
      }
    } else {
      if (!options.do_not_display)
        printError(game_obj.id, `You must control **${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`} before being able to control subsidies there!`);
    }
  },

  toggleAllSubsidies: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_ids = (arg1_provinces) ? getList(arg1_provinces) : undefined;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Toggle all subsidies
    (usr.all_subsidies) ?
      module.exports.subsidiseAllBuildings(user_id, {
        desubsidise: true,
        province_ids: province_ids
      }) :
      module.exports.subsidiseAllBuildings(user_id, {
        province_ids: province_ids
      });
  }
};
