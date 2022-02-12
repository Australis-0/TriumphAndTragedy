module.exports = {
  initialiseMassDeploy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Mass Deploy:`,
      prompts: [
        [`Please type out the names of the armies you'd like to deploy troops to en masse.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        [`How many troops would you like to deploy in each of these armies?\n\nType **[View Reserves]** to see how many troops you can currently deploy.`, "number", { min: 0 }],
        [`What type of unit do you wish to deploy in these armies?`, "string"]
      ]
    },
    function (arg) {
      module.exports.massDeploy(user_id, arg[0], arg[1], arg[2]);
    },
    function (arg) {
      switch (arg) {
        case "army list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            user: game_obj.user
          });
          return true;

          break;
        case "view reserves":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printReserves(game_obj.user),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  massDeploy: function (arg0_user, arg1_armies, arg2_amount, arg3_unit_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies.trim();
    var raw_unit_amount = arg2_amount;
    var raw_unit_type = arg3_unit_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(raw_unit_type, { return_key: true });
    var unit_amount = Math.ceil(parseInt(raw_unit_amount));
    var unit_obj = getUnit(raw_unit_type);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if user has any armies to begin with
    if (all_armies.length > 0) {
      if (!isNaN(unit_amount)) {
        if (unit_obj) {
          var deploy_in_armies = parseArmies(armies_string);

          if (deploy_in_armies.length > 0) {
            //Get old number of units in reserves, and compare it to the new number to see how many units have been successfully deployed
            var old_unit_count = JSON.parse(JSON.stringify(returnSafeNumber(usr.reserves[raw_unit_name])));

            if (unit_amount*deploy_in_armies.length <= old_unit_count) {
              for (var i = 0; i < deploy_in_armies.length; i++)
                deployUnits(actual_id, unit_amount, raw_unit_name, deploy_in_armies[i]);

              var new_unit_count = old_unit_count - returnSafeNumber(usr.reserves[raw_unit_name]);
              var successful_deployments = old_unit_count - new_unit_count;

              //Return success/error messages
              (successful_deployments > 0) ?
                printAlert(game_obj.id, `You have successfully deployed up to **${parseNumber(successful_deployments)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} in **${parseNumber(deploy_in_armies.length)}** armies.`) :
                printError(game_obj.id, `The armies you have specified could not be found! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
            } else {
              printError(game_obj.id, `You don't have this many **${(unit_obj.name) ? unit_obj.name : unit_obj.name}** to deploy! You may only deploy up to **${parseNumber(Math.floor(old_unit_count/deploy_in_armies.length))}** ${(unit_obj.name) ? unit_obj.name : unit_obj.name} over **${parseNumber(deploy_in_armies.length)}** armies, for a total of **${parseNumber(old_unit_count)}** ${(unit_obj.name) ? unit_obj.name : unit_obj.name}.`);
            }
          } else {
            printError(game_obj.id, `The names you have specified could not turn up any valid armies! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
          }
        } else {
          printError(game_obj.id, `**${raw_unit_type}** could not be recognised as a valid unit type! Type **[View Reserves]** for a list of units you can deploy.`);
        }
      } else {
        printError(game_obj.id, `Please enter a valid number of units! **${raw_unit_amount}** was not recognised as a valid number.`);
      }
    } else {
      printError(game_obj.id, `You don't even have any armies to deploy units in! Try creating a new army by typing **[Create Army]**, or create multiple armies at once by typing **[Create Armies]**.`);
    }
  }
};
