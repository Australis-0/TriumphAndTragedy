module.exports = {
  //cedeProvince() - Cedes a province from arg0_user to arg1_user.
  cedeProvince: function (arg0_user, arg1_user, arg2_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var province_id = arg2_province_id.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var all_users = Object.keys(main.users);
    var at_war = (getWars(user_id).length > 0);
    var city_obj = getCity(province_id);
    var game_obj = getGameObject(user_id);
    var is_being_justified_on = [false, ""]; //[is_being_justified_on, country_name];
    var ot_user = main.users[actual_ot_user_id];
    var province_obj = getProvince(province_id);
    var usr = main.users[actual_id];

    //Check if user is being justified on
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      for (var x = 0; x < local_user.diplomacy.justifications.length; x++) {
        var local_justification = local_user.diplomacy.justifications[x];

        if (local_justification.target == actual_id)
          is_being_justified_on = [true, local_user.name];
      }
    }

    //Check if the other user even exists in the first place
    if (ot_user) {
      if (city_obj || province_obj) {
        if (!province_obj)
          province_obj = getProvince(city_obj.id);

        if (usr.total_ceded_this_turn < config.defines.diplomacy.cede_province_limit) {
          if (usr.total_cities_ceded_this_turn < config.defines.diplomacy.cede_city_limit) {
            if (!is_being_justified_on[0]) {
              if (!at_war) {
                if (ot_user.options.allow_ceding.includes(actual_id)) {
                  //Update tracker variables
                  if (city_obj)
                    usr.total_cities_ceded_this_turn++;
                  usr.total_ceded_this_turn++;

                  //Use framework variable to transfer
                  transferProvince(actual_id, {
                    province_id: province_obj.id,
                    target: actual_ot_user_id
                  });

                  //Print alert
                  printAlert(game_obj.id, `${config.icons.provinces} You have transferred Province **${province_obj.id}** to **${ot_user.name}**.`);
                } else {
                  printError(game_obj.id, `**${ot_user.name}** is not currently accepting provinces from you! Ask them to **[Allow Ceding]** from you first before trying to cede more land.`);
                }
              } else {
                printError(game_obj.id, `You can't cede provinces to other nations whilst in an armed conflict! Focus on the war effort first.`);
              }
            } else {
              printError(game_obj.id, `You can't cede provinces to other nations whilst being justified on! Convince them to cancel their justification in order to cede Province **${province_obj.id}**.`);
            }
          } else {
            printError(game_obj.id, `You may only cede up to **${parseNumber(config.defines.diplomacy.cede_city_limit)}** cities per turn! Wait until next turn to potentially cede more cities.`);
          }
        } else {
          printError(game_obj.id, `You may only cede up to **${parseNumber(config.defines.diplomacy.cede_province_limit)}** provinces each round! Wait until next turn to potentially cede more provinces.`);
        }
      } else {
        printError(game_obj.id, `The province/city you have specified, **${province_id}**, could not be found!`);
      }
    } else {
      printError(game_obj.id, `Why not cede a province to Narnia or Xanadu instead? That country doesn't even exist anyway.`);
    }
  },

  initialiseCedeProvince: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cede A Province/City:`,
      prompts: [
        [`Which country would you like to cede a province to?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`What is the name of the province you would like to give up to them?\n\nType **[View Provinces]** to see a list of all your provinces.`, "string"]
      ]
    },
    function (arg) {
      module.exports.cedeProvince(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
        case "view provinces":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvinces(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    })
  }
};
