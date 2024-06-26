module.exports = {
  initialiseMassRelieve: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Mass Relieve:`,
      prompts: [
        [`How many troops would you like to relieve from each of these armies?`, "number", { min: 0 }],
        [`What type of unit do you wish to relieve from these armies?`, "string"],
        [`Please type out the names of the armies you'd like to relieve troops from en masse.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
      ]
    },
    function (arg) {
      module.exports.massRelieve(user_id, arg[2], arg[0], arg[1]);
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
      }
    });
  },

  massRelieve: function (arg0_user, arg1_armies, arg2_amount, arg3_unit_name) {
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
          var relieve_from_armies = parseArmies(armies_string);

          if (relieve_from_armies.length > 0) {
            //Get old number of units in reserves, and compare it to the new number to see how many units have been successfully relieved
            var old_unit_count = JSON.parse(JSON.stringify(returnSafeNumber(usr.reserves[raw_unit_name])));

            for (var i = 0; i < relieve_from_armies.length; i++)
              relieveUnits(user_id, unit_amount, raw_unit_name, relieve_from_armies[i]);

            var new_unit_count = returnSafeNumber(usr.reserves[raw_unit_name]);
            var successfully_withdrawn = new_unit_count - old_unit_count;

            //Update army_list if user is currently viewing it
            if (game_obj.page == "army_list")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(user_id),
                page: main.interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });

            //Return success/error messages
            (successfully_withdrawn != 0) ?
              printAlert(game_obj.id, `You have successfully withdrawn up to **${parseNumber(successfully_withdrawn)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} from **${parseNumber(relieve_from_armies.length)}** armies, and placed them back in your reserves.`) :
              printError(game_obj.id, `The armies you have specified could not be found! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
          } else {
            printError(game_obj.id, `The names you have specified could not turn up any valid armies! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
          }
        } else {
          printError(game_obj.id, `**${raw_unit_type}** could not be recognised as a valid unit type! Type **[View Army]** for a list of units you can relieve.`);
        }
      } else {
        printError(game_obj.id, `Please enter a valid number of units! **${raw_unit_amount}** was not recognised as a valid number.`);
      }
    } else {
      printError(game_obj.id, `You don't even have any armies to relieve units from! Try creating a new army by typing **[Create Army]**, or create multiple armies at once by typing **[Create Armies]**.`);
    }
  }
};
