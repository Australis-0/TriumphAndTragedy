module.exports = {
  initialiseRenameBuilding: function (arg0_user, arg1_building_obj) { //Add [View Industry] ability later
    //Convert from parameters
    var user_id = arg0_user;
    var building_obj = arg1_building_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    (building_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Rename ${building_obj.name}:`,
        prompts: [
          [`How should ${building_obj.name} be called from now on?`, "string"]
        ]
      },
      function (arg) {
        module.exports.renameBuilding(user_id, building_obj, arg[0]);
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Rename Building:`,
        prompts: [
          [`What is the current name of the building that ought to be renamed?\n\nType **[View Industry]** for a full list of all buildings under your control.`, "string"],
          [`What would you like to rename this building to?`, "string"]
        ]
      },
      function (arg) {
        module.exports.renameBuilding(user_id, arg[0], arg[1]);
      },
      function (arg) {
        switch (arg) {
          case "view industry":
            printIndustry(user_id);
            return true;

            break;
        }
      });
  },

  renameBuilding: function (arg0_user, arg1_building_name, arg2_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building_name;
    var new_building_name = arg2_building_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuildingByName(user_id, building_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if building_obj belongs to actual_id
    if (building_obj) {
      var province_id = building_obj.id.split("-")[0];
      var province_obj = main.provinces[province_id];

      if (province_obj) {
        if (province_obj.controller == actual_id) {
          //Rename building and print alert
          var old_building_name = JSON.parse(JSON.stringify(building_obj.name));
          building_obj.name = truncateString(new_building_name, 80);

          printAlert(game_obj.id, `You have renamed **${old_building_name}** to **${building_obj.name}**.`);

          //Refresh UI
          if (game_obj.page.startsWith("view_building_"))
            printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
          if (game_obj.page.startsWith("view_buildings_"))
            printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
          if (game_obj.page == "view_industry")
            printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
        } else {
          printError(game_obj.id, `**${building_obj.name}**, located in **${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}**, is not currently controlled by you! The building is currently administered by **${main.users[province_obj.controller].name}**.`);
        }
      } else {
        printError(game_obj.id, `The building you have specified, **${(building_obj.name) ? building_obj.name : building_name}** could not be found in a valid province! Please contact your local administrator.`);
      }
    } else {
      printError(game_obj.id, `No building by the name of **${building_name}** could be found!`);
    }
  }
};
