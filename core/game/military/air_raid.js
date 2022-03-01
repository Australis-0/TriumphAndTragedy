module.exports = {
  airRaid: function (arg0_user, arg1_city_name, arg2_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var army_name = arg2_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var city_obj = getCity(city_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if army exists
    if (army_obj) {
      if (city_obj) {
        //Check if city_obj is at war with actual_id
        if (city_obj.controller != actual_id) {
          if (areAtWar(actual_id, city_obj.controller)) {
            //Check to make sure force is of type 'air'
            if (army_obj.type == "air") {
              //Check to see if this city has been attacked this turn
              if (!city_obj.bombed_this_turn) {
                //Check to see if the city has any buildings to bomb
                if (city_obj.buildings.length > 0) {
                  //Initialise air raid
                  initialiseAirRaid(actual_id, city_obj, army_obj);

                  //Print user feedback
                  printAlert(game_obj.id, `We have sent the **${army_obj.name}** to go bomb the **${getPrimaryCultures(city_obj.controller, { return_objects: true })[0].adjective}** city of **${city_obj.name}**.`);
                } else {
                  printError(game_obj.id, `**${city_obj.name}** has no buildings for you to bomb!`);
                }
              } else {
                printError(game_obj.id, `**${city_obj.name}** has already been bombed this turn!`);
              }
            } else {
              printError(game_obj.id, `You may only send air forces to bomb your opponents' cities!`);
            }
          } else {
            printError(game_obj.id, `You are not currently at war with the controller of **${city_obj.name}**, **${main.users[city_obj.controller].name}**!`);
          }
        } else {
          printError(game_obj.id, `You can't bomb yourself!`);
        }
      } else {
        printError(game_obj.id, `No city by the name of **${city_name}** could be found!`);
      }
    } else {
      printError(game_obj.id, `No air wing by the name of **${army_name}** could be found!`);
    }
  },

  initialiseAirRaidCommand: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Conduct An Air Raid:`,
        prompts: [
          [`Which city would you like to bomb?`, "string"],
          [`What is the name of the air force you would like to send on this mission?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
        ]
      },
      function (arg) {
        module.exports.airRaid(user_id, arg[0], arg[1]);
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
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Conduct An Air Raid w/ the ${army_name}:`,
        prompts: [
          [`Which city would you like to bomb?`, "string"]
        ]
      },
      function (arg) {
        module.exports.airRaid(user_id, arg[0], army_name);
      });
  }
};
