module.exports = {
  assimilateAll: function (arg0_user, arg1_culture_name, arg2_culture_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var assimilating_culture_name = arg1_culture_name.trim().toLowerCase();
    var core_culture_name = arg2_culture_name.trim().toLowerCase();
    var raw_assimilating_culture_name = arg1_culture_name;
    var raw_core_culture_name = arg2_culture_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var assimilating_culture = getCulture(assimilating_culture_name);
    var assimilated_provinces = 0;
    var core_culture = getCulture(core_culture_name);
    var game_obj = getGameObject(user_id);
    var raw_assimilating_culture = getCulture(assimilating_culture_name, { return_key: true });
    var raw_core_culture = getCulture(core_culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if user is defined
    if (usr) {
      if (assimilating_culture) {
        if (core_culture) {
          if (
            core_culture.primary_culture.includes(actual_id) ||
            core_culture.accepted_culture.includes(actual_id)
          ) {
            //Check if the culture to be assimilated can be found in the target user's territory
            var all_provinces = Object.keys(main.provinces);
            var provinces_to_assimilate = [];

            for (var i = 0; i < all_provinces.length; i++) {
              var local_province = main.provinces[all_provinces[i]];

              if (local_province.controller == actual_id)
                if (local_province.culture == raw_assimilating_culture)
                  provinces_to_assimilate.push(all_provinces[i]);
            }

            //Begin trying to assimiilate as any marked provinces as found
            for (var i = 0; i < provinces_to_assimilate.length; i++) {
              var province_assimilation_status = assimilate(
                actual_id,
                provinces_to_assimilate[i],
                raw_core_culture,
                {
                  hide_display: true
                }
              );

              if (province_assimilation_status)
                assimilated_provinces++;
            }

            //Update culture page if user is currently on it
            if (game_obj.page == "culture")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCultures(user_id),
                user: game_obj.user
              });

            //Print status essage
            (assimilated_provinces == provinces_to_assimilate.length) ?
              printAlert(game_obj.id, `You have successfully begun integrating all **${parseNumber(assimilated_provinces)}** ${assimilating_culture.adjective} province(s) underneath your control to the **${core_culture.adjective}** culture.`) :
              printAlert(game_obj.id, `You have begun integrating **${parseNumber(assimilated_provinces)}**/**${parseNumber(provinces_to_assimilate.length)}** province(s) underneath your control to the **${core_culture.adjective}** culture. The others could not be assimilated due to a shortage of ${config.icons.political_capital} Political Capital, or ${config.icons.money} Money.`);
          } else {
            printError(game_obj.id, `You cannot assimilate other people to a non-accepted culture of yours!`);
          }
        } else {
          printError(game_obj.id, `The culture you have mandated the assimilation of, **${assimilating_culture.name}**, proved as imaginary as the people of Prester John!`);
        }
      } else {
        printError(game_obj.id, `The culture you have specified to assimilate into ${raw_core_culture_name}, ${raw_assimilating_culture_name}, could not be found!`);
      }
    } else {
      printError(game_obj.id, `You must have a country before you can begin assimilating other cultures into your fold!`);
    }
  },

  initialiseAssimilateAll: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Assimilate All Provinces of a Given Culture:`,
      prompts: [
        [`Which culture would you like to assimilate?\n\nType **[View Cultures]** for a list of valid cultures.`, "string"],
        [`Which culture would you like to assimilate them into?\n\nType **[View Cultures]** for a list of valid cultures.`, "string"]
      ]
    },
    function (arg) {
      module.exports.assimilateAll(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "view cultures":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  }
};
