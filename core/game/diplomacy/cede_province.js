module.exports = {
  cedeProvinces: function (arg0_user, arg1_user, arg2_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var provinces = arg2_provinces.split(" ");

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var at_war = (getWars(user_id).length > 0);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var tried_to_cede_capital_city = false;
    var usr = main.users[actual_id];

    //Trim out invalid provinces
    var provinces_to_remove = [];

    for (var i = 0; i < provinces.length; i++) {
      var local_province = main.provinces[provinces[i]];

      if (local_province) {
        if (local_province.owner != actual_id || local_province.controller != actual_id)
          provinces_to_remove.push(provinces[i]);
      } else {
        if (provinces[i] != "") {
          var city_obj = getCity(provinces[i]);

          if (!city_obj) {
            provinces_to_remove.push(provinces[i]);
          } else try {
            if (city_obj.owner != actual_id || city_obj.controller != actual_id)
              provinces_to_remove.push(provinces[i]);
            if (city_obj.id == getCapital(user_id).id) {
              provinces_to_remove.push(provinces[i]);
              tried_to_cede_capital_city = true;
            }
          } catch {}
        } else {
          provinces_to_remove.push(provinces[i]);
        }
      }
    }

    for (var i = 0; i < provinces_to_remove.length; i++)
      provinces = removeElement(provinces, provinces_to_remove[i]);

    //Check if the other user even exists in the first place
    if (provinces.length > 0) {
      if (ot_user) {
        if (!isBeingJustifiedOn(user_id)) {
          if (!at_war) {
            if (ot_user.options.allow_ceding.includes(actual_id)) {
              if (usr.total_ceded_this_turn + provinces.length <= config.defines.diplomacy.cede_province_limit) {
                //Fetch total number of cities being ceded
                var number_of_cities = 0;

                for (var i = 0; i < provinces.length; i++) {
                  var local_city = getCity(provinces[i]);

                  if (local_city)
                    if (local_city.type == "urban")
                      number_of_cities++;
                }

                if (usr.total_cities_ceded_this_turn + number_of_cities <= config.defines.diplomacy.cede_city_limit) {
                  //Use framework function to transfer
                  for (var i = 0; i < provinces.length; i++)
                    transferProvince(user_id, {
                      province_id: provinces[i],
                      target: actual_ot_user_id
                    });

                  usr.total_cities_ceded_this_turn += number_of_cities;
                  usr.total_ceded_this_turn += provinces.length;

                  if (tried_to_cede_capital_city)
                    printError(game_obj.id, `You can't cede your capital city! **${getCapital(user_id).name}** was removed from the list of ceded provinces.`);

                  //Print alert
                  printAlert(game_obj.id, `${config.icons.provinces} You have successfully transferred **${parseNumber(number_of_cities)}** urban province(s) and **${parseNumber(provinces.length - number_of_cities)}** rural province(s) to **${ot_user.name}** for a total of **${parseNumber(provinces.length)}** province(s).`);
                } else {
                  printError(game_obj.id, `You may only cede up to **${parseNumber(config.defines.diplomacy.cede_city_limit)}** cities per turn! You have already ceded **${parseNumber(usr.total_cities_ceded_this_turn)}** cities this turn, and attempted to cede **${parseNumber(number_of_cities)}** more. Wait until next turn to potentially cede more cities.`);
                }
              } else {
                printError(game_obj.id, `You may only cede up to **${parseNumber(config.defines.diplomacy.cede_province_limit)}** provinces each round! You attempted to cede **${parseNumber(provinces.length)}** provinces in addition to **${parseNumber(usr.total_ceded_this_turn)}** more provinces already ceded this turn, for a total of **${parseNumber(provinces.length + usr.total_ceded_this_turn)}**/${parseNumber(config.defines.diplomacy.cede_province)} provinces.`);
              }
            } else {
              printError(game_obj.id, `**${ot_user.name}** is not currently accepting provinces from you! Ask them to **[Allow Ceding]** from you first before trying to cede more land.`);
            }
          } else {
            printError(game_obj.id, `You can't cede provinces to other nations whilst in an armed conflict! Focus on the war effort first.`);
          }
        } else {
          printError(game_obj.id, `You cannot cede provinces to another country whilst being justified on!`);
        }
      } else {
        printError(game_obj.id, `Why not cede a province to Narnia or Xanadu instead? That country doesn't even exist anyway.`);
      }
    } else {
      printError(game_obj.id, `You must select more than zero provinces to cede!`);
    }
  },

  initialiseCedeProvince: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cede A Province/City:`,
      prompts: [
        [`Which country would you like to cede a province to?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"],
        [`Please input the Province ID's of the provinces you would like to cede to this nation. You may choose up to **${parseNumber(config.defines.diplomacy.cede_province_limit - usr.total_ceded_this_turn)}** total province(s), **${parseNumber(config.defines.diplomacy.cede_city_limit - usr.total_cities_ceded_this_turn)}** of which may be urban.\n\nType **[View Provinces]** to see a list of all your provinces.`, "string"]
      ]
    },
    function (arg) {
      module.exports.cedeProvinces(user_id, arg[0], arg[1]);
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
