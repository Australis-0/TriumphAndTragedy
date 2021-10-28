module.exports = {
  initialiseSettleStartingProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var usr = main.users[arg0_user];

    //Reinitialise visual prompt
    console.log(game_obj.alert_embed);

    visualPrompt(game_obj.alert_embed, user_id, {
      title: "Choose Your Starting Province(s):",
      prompts: [
        [`Please input the Province ID's in which you would like to settle the peoples of ${usr.name}. You may choose up to **${parseNumber(config.defines.common.starting_provinces)}** province(s).`, "string"]
      ]
    },
    function (arg) {
      var province_list = arg[0].replace(/ +(?= )/g, "").split(" ");
      settleStartingProvinces(user_id, province_list);
    });
  },

  //Used for instantly settling provinces when a new country is founded
  settleStartingProvinces: function (arg0_user, arg1_provinces) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = arg1_provinces;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var reinitialise_command = false;
    var usr = main.users[actual_id];

    //Error tracker variables
    var colonised_provinces = [];
    var error_msg = [];
    var has_duplicates = false;
    var missing_provinces = [];

    if (provinces.length <= config.defines.common.starting_provinces) {
      //Instantly settle target provinces if all of them are valid
      var local_checks = 0;
      for (var i = 0; i < provinces.length; i++)
        if (main.provinces[provinces[i]]) //Check to make sure that province can be found
          if (findDuplicates(provinces).length == 0) //Check for any duplicates
            if (!main.provinces[provinces[i]].owner) //Check to make sure province is not settled
              local_checks++;
            else
              colonised_provinces.push(`**${provinces[i]}**`);
          else
            has_duplicates = true;
        else
          missing_provinces.push(`**${provinces[i]}**`);

      //We ran into an error! I wonder what it was ..
      if (local_checks < provinces.length) {
        error_msg.push(`**Your colonists are baffled at your command!** The following errors were jotted down:`);
        if (colonised_provinces.length > 0) error_msg.push(`- The province(s) of ${colonised_provinces.join(", ")} were already owned by other nations.`);
        if (has_duplicates) error_msg.push(`- The specified province(s) of ${findDuplicates(provinces).join(", ")} were duplicates of one another.`);
        if (missing_provinces.length > 0) error_msg.push(`- Our cartographers failed to find the province(s) of ${missing_provinces.join(", ")} anywhere on the map!`);

        printError(game_obj.id, error_msg.join(" "));
        reinitialise_command = true;
      } else {
        var display_provinces = [];

        //No errors were ran into, begin instantly settling provinces
        for (var i = 0; i < provinces.length; i++) {
          settleProvince(provinces[i], actual_id);
          setProvinceColour("political", provinces[i], usr.colour);
          display_provinces.push(`**${provinces[i]}**`);
        }

        //Output successful feedback
        printAlert(game_obj.id, `Your peoples have successfully settled the lands of ${display_provinces.join(", ")} and have claimed it for the fledgling country of **${usr.name}**!`);

        //Reload all maps, initialise user topbar
        reloadAllMaps("political");
        game_obj.page = "country_interface";
        initialiseTopbar(user_id);
      }
    } else {
      printError(game_obj.id, `You may only settle up to **${parseNumber(config.defines.common.starting_provinces)}** province(s) at once!`);
      reinitialise_command = true;
    }

    if (reinitialise_command) setTimeout(function(){
      module.exports.initialiseSettleStartingProvinces(user_id);
    }, settings.visual_prompt_delay);
  }
};
