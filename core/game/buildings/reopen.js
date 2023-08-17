module.exports = {
  initialiseReopenBuilding: function (arg0_user) { //[WIP] - Finish function body
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Reopen Building:`,
      prompts: [
        [`What is the name of the building that you would like to manually reopen?\n\nType **[View Industry]** for a full list of buildings under your control.`, "string"]
      ]
    },
    function (arg) {
      module.exports.reopenBuilding(user_id, arg[0]);
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

  reopenAllBuildings: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_provinces = getProvinces(user_id);
    var bailout_cost = 0;
    var total_bailed_out = 0;

    //Iterate over all_provinces and bail out every single building that's insolvent
    for (var i = 0; i < all_provinces.length; i++)
      if (all_provinces[i].buildings)
        for (var x = 0; x < all_provinces[i].buildings.length; x++) {
          var local_building = all_provinces[i].buildings[x];

          var bailed_out = module.exports.reopenBuilding(user_id, local_building, { do_not_display: true });

          bailout_cost += returnSafeNumber(bailed_out);
          if (bailed_out) total_bailed_out++;
        }

    //Print user feedback
    if (bailed_out > 0) {
      printAlert(game_obj.id, `You have bailed out **${parseNumber(total_bailed_out)}** building(s) for a total cost of ${config.icons.money} **${parseNumber(bailout_cost)}**.`);
    } else {
      printAlert(game_obj.id, `No insolvent buildings could be found that needed a fiscal bailout!`);
    }

    //Refresh UI
    if (game_obj.page.startsWith("view_building_"))
      printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
    if (game_obj.page.startsWith("view_buildings_"))
      printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
    if (game_obj.page == "view_industry")
      printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
  },

  /*
    reopenBuilding() - Reopens a player building if requirements are met.
    options: {
      do_not_display: true/false - Whether to display anything to a player's game UI
    }
  */
  reopenBuilding: function (arg0_user, arg1_building_name, arg2_options) { //[WIP] - Finish function body
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building_name;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = (typeof building_name != "object") ? getBuildingByName(user_id, building_name) : building_obj;
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    if (building_obj) {
      var province_id = building_obj.id.split("-")[0];
      var province_obj = main.provinces[province_id];

      //Check if user owns building
      if (province_obj) {
        if (province_obj.controller == actual_id) {
          if (building_obj.insolvent) {
            //Reopen building and pay for infusion
            var reopen_cost = getReopenCost(building_obj);

            usr.money -= reopen_cost;
            building_obj.stockpile.money = config.defines.economy.subsidy_infusion;
            delete building_obj.insolvent;
            delete building_obj.insolvency_turns;

            if (!options.do_not_display) {
              //Refresh UI
              if (game_obj.page.startsWith("view_building_"))
                printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
              if (game_obj.page.startsWith("view_buildings_"))
                printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
              if (game_obj.page == "view_industry")
                printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);

              //Print user feedback
              printAlert(game_obj.id, `**${building_obj.name}** has been bailed out by the state at a fiscal cost of ${config.icons.money} **${parseNumber(reopen_cost)}**`);
            }

            return reopen_cost;
          } else {
            if (!options.do_not_display)
              printError(game_obj.id, `You cannot rescue a building that is not fiscally insolvent!`);
          }
        } else {
          if (!options.do_not_display)
            printError(game_obj.id, `**${building_obj.name}**, located in **${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}**, is not currently controlled by you! The building is currently administered by **${main.users[province_obj.controller].name}**.`);
        }
      } else {
        if (!options.do_not_display)
          printError(game_obj.id, `The building you have specified, **${(building_obj.name) ? building_obj.name : building_name}** could not be found in a valid province! Please contact your local administrator.`);
      }
    } else {
      if (!options.do_not_display)
        printError(game_obj.id, `No building by the name of **${building_name}** could be found!`);
    }
  }
};
