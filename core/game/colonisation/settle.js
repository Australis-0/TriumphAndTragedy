module.exports = {
  initialiseSettle: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: "Create A New Colonisation Charter:",
      prompts: [
        [`Which Province ID's would you like to claim in the name of **${usr.name}**? Please list them out as numeric ID's separated by spaces`, "string"]
      ]
    },
    function (arg) {
      settle(user_id, arg[0]);
    });
  },

  initialiseSettleStartingProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Reinitialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: "Choose Your Starting Province(s):",
      prompts: [
        [`Please input the Province ID's in which you would like to settle the peoples of ${usr.name}. You may choose up to **${parseNumber(config.defines.common.starting_provinces)}** province(s).`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      settleStartingProvinces(user_id, arg[0]);
    });
  },

  settle: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = splitCommandLine(arg1_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var all_units = getAllUnits({ return_names: true });
    var capital_obj = getCapital(actual_id);
    var game_obj = getGameObject(user_id);
    var unit_type = "";
    var usr = main.users[actual_id];

    var all_expeditions = Object.keys(usr.expeditions);

    //Error tracker variables
    var colonised_provinces = [];
    var error_msg = [];
    var has_duplicates = false;
    var missing_provinces = [];

    //Check if user even has enough expedition capacity for a new colonisation expedition
    if (all_expeditions.length < usr.modifiers.maximum_expeditions) {
      //Check for appropriate unit type
      for (var i = 0; i < all_units.length; i++) {
        var local_unit = getUnit(all_units[i]);
        var local_unit_name = getUnit(all_units[i], { return_key: true });

        if (local_unit.colonise_provinces)
          if (provinces.length <= local_unit.colonise_provinces)
            if (unit_type == "" || returnSafeNumber(usr.reserves[unit_type]) <= 0)
              if (usr.reserves[local_unit_name] > 0)
                unit_type = local_unit_name;
      }

      //Check if unit_type even exists
      if (usr.reserves[unit_type] > 0) {
        //Check for errors
        var local_checks = 0;
        for (var i = 0; i < provinces.length; i++)
          if (main.provinces[provinces[i]]) { //Check to make sure that the province even exists in the first place
            //Check for any duplicates
            if (findDuplicates(provinces).length == 0) {
              //Check to make sure province is not settled
              if (!main.provinces[provinces[i]].owner) {
                local_checks++;
              } else {
                colonised_provinces.push(`**${provinces[i]}**`);
              }
            } else {
              has_duplicates = true;
            }
          } else {
            missing_provinces.push(`**${provinces[i]}**`);
          }

        //We ran into an error! I wonder what it was ..
        if (local_checks < provinces.length) {
          error_msg.push(`**Your colonists are baffled at your command!** The following errors were jotted down:`);
          if (colonised_provinces.length > 0)
            error_msg.push(`- The province(s) of ${colonised_provinces.join(", ")} were already owned by other nations.`);
          if (has_duplicates)
            error_msg.push(`- The specified province(s) of ${findDuplicates(provinces).join(", ")} were duplicates of one another.`);
          if (missing_provinces.length > 0)
            error_msg.push(`- Our cartographers failed to find the province(s) of ${missing_provinces.join(", ")} anywhere on the map!`);

          printError(game_obj.id, error_msg.join("\n"));
        } else {
          //Get unit_costs so that we can subtract the needed manpower from the used pile
          var unit_costs = getUnitCost(actual_id, unit_type);

          var all_unit_costs = Object.keys(unit_costs);

          //Deduct from used pops
          for (var i = 0; i < all_unit_costs.length; i++)
            if (all_pops.includes(all_unit_costs[i]))
              usr.pops[`used_${all_unit_costs[i]}`] = Math.max(usr.pops[`used_${all_unit_costs[i]}`] - unit_costs[all_unit_costs[i]], 0);

          //The $settle command went through, create a new colonial charter, update Colonisation UI if currently active, and send user feedback
          usr.reserves[unit_type]--;

          //Get distance and colonisation time
          var prov_colonisation_turns = 0;
          var prov_distance = 0;
          var random_prov_id = randomElement(provinces);

          try {
            prov_distance = moveTo(capital_obj.id, random_prov_id.toString()).length;

            prov_colonisation_turns = Math.ceil(
              prov_distance/
                (config.defines.combat.colonisation_speed*usr.modifiers.colonist_travel_speed)
            );

            //Cap it off at a certain point so that things can't get too crazy
            if (!(config.defines.combat.max_colonisation_speed == 0 || !config.defines.combat.max_colonisation_speed))
              prov_colonisation_turns = Math.min(config.defines.combat.max_colonisation_speed, prov_colonisation_turns);

            //Generate new colonisation ID
            var local_colonisation_id = generateColonisationID(actual_id);

            //Push to expeditions
            usr.expeditions[local_colonisation_id] = {
              id: local_colonisation_id,
              colour: generateColonisationColour(actual_id),

              provinces: provinces,
              duration: prov_colonisation_turns + config.defines.colonisation.base_colonisation_turns,
              unit_type: unit_type
            };

            //Update colonisation mapmode
            for (var i = 0; i < provinces.length; i++)
              setProvinceColour("colonisation", provinces[i], usr.expeditions[local_colonisation_id].colour);

            //Update colonisation/reserves UI if user is currently on it
            if (game_obj.page == "colonisation")
              printColonisation(user_id);

            //Print user alert feedback
            printAlert(game_obj.id, `Settlers from **${usr.name}** have set out to colonise the province(s) of ${provinces.join(", ")}. They will arrive in **${parseNumber(prov_colonisation_turns)}** turn(s). They will then take an additional **${parseNumber(config.defines.colonisation.base_colonisation_turns)}** turn(s) to colonise.`);
          } catch (e) {
            if (!capital_obj)
              printError(game_obj.id, `You need to have a set capital city in order to start colonising provinces!`);

            log.error(`settle() command by User ID ${user_id}, Actual ID ${actual_id}, Country ${usr.name} was noted: ${e}.`);
            console.log(e);
          }
        }
      }
    } else {
      printError(game_obj.id, `You have already reached your limit of **${parseNumber(usr.modifiers.maximum_expeditions)}** ongoing expedition(s)!`);
    }
  },

  //Used for instantly settling provinces when a new country is founded
  settleStartingProvinces: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = splitCommandLine(arg1_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var reinitialise_command = false;
    var usr = main.users[actual_id];

    //Error tracker variables
    var colonised_provinces = [];
    var error_msg = [];
    var foreign_countries = [];
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
            else {
              colonised_provinces.push(`**${provinces[i]}**`);
              foreign_countries.push(`**${main.users[main.provinces[provinces[i]].owner].name}**`);
            }
          else
            has_duplicates = true;
        else
          missing_provinces.push(`**${provinces[i]}**`);

      //We ran into an error! I wonder what it was ..
      if (local_checks < provinces.length) {
        error_msg.push(`**Your colonists are baffled at your command!** The following errors were jotted down:`);
        if (colonised_provinces.length > 0)
          error_msg.push(`- The province(s) of ${colonised_provinces.join(", ")} were already owned by the nations of ${parseList(foreign_countries.join(", "))}.`);
        if (has_duplicates)
          error_msg.push(`- The specified province(s) of ${findDuplicates(provinces).join(", ")} were duplicates of one another.`);
        if (missing_provinces.length > 0)
          error_msg.push(`- Our cartographers failed to find the province(s) of ${missing_provinces.join(", ")} anywhere on the map!`);

        printError(game_obj.id, error_msg.join("\n"));
        reinitialise_command = true;
      } else {
        var display_provinces = [];

        //No errors were ran into, begin instantly settling provinces
        for (var i = 0; i < provinces.length; i++) {
          settleProvince(provinces[i], actual_id);
          setAllProvinceColours(actual_id, provinces[i]);
          display_provinces.push(`**${provinces[i]}**`);
        }

        delete usr.settle_starting_provinces;

        //Output successful feedback
        printAlert(game_obj.id, `Your peoples have successfully settled the lands of ${display_provinces.join(", ")} and have claimed it for the fledgling country of **${usr.name}**!`);

        //Reload all maps, initialise user topbar
        reloadAllMaps("political");
        game_obj.page = "country_interface";

        if (main.season_started) {
          initialiseTopbar(user_id);
          printStats(user_id);
        } else {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printQueue(user_id),
            user: user_id
          });
        }
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
