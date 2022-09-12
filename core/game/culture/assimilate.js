module.exports = {
  /*
    assimilate() - Assimilates a given province into a culture of the user's choice.
    options: {
      hide_display: true/false - Whether or not to display user feedback or prompts. Used for macro assimilation functions. Defaults to false
    }
  */
  assimilate: function (arg0_user, arg1_province, arg2_culture_name, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province;
    var culture_name = arg2_culture_name.trim().toLowerCase();
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if province actually exists
    if (province_obj) {
      if (province_obj.controller == actual_id) {
        if (
          culture_obj.primary_culture.includes(actual_id) || culture_obj.accepted_culture.includes(actual_id)
        ) {
          var province_culture = getCulture(province_obj.culture);

          if (!province_culture.primary_culture.includes(actual_id)) {
            if (usr.modifiers.political_capital >= config.defines.politics.assimilate_cost) {
              if (usr.money >= config.defines.politics.assimilate_fiscal_cost) {
                //Check if province is already being assimilated
                var is_being_assimilated = [false, ""]; //[is_being_assimilated, assimilation_obj];

                for (var i = 0; i < usr.pops.assimilations.length; i++)
                  if (usr.pops.assimilations[i].province_id == province_id)
                    is_being_assimilated = [true, usr.pops.assimilations[i]];

                if (!is_being_assimilated[0]) {
                  //Declare sub-local instance variables
                  var assimilation_time = config.defines.politics.assimilation_turns;

                  //Subtract from usr.modifiers.political_capital
                  usr.modifiers.political_capital -= config.defines.politics.assimilate_cost;

                  //Push to usr.pops.assimilations
                  usr.pops.assimilations.push({
                    culture_id: raw_culture_name,
                    province_id: province_id,

                    duration: assimilation_time
                  });

                  //Update province UI if user is currently on it
                  if (game_obj.page.startsWith("view_province_")) {
                    var province_name = game_obj.page.replace("view_province_", "");

                    if (getCity(province_name)) {
                      createPageMenu(game_obj.middle_embed, {
                        embed_pages: printCity(game_obj.user, province_name),
                        user: game_obj.user
                      });
                    } else if (getProvince(province_name)) {
                      createPageMenu(game_obj.middle_embed, {
                        embed_pages: printProvince(game_obj.user, province_name),
                        user: game_obj.user
                      });
                    }
                  }

                  //Print user feedback
                  if (!options.hide_display)
                    printAlert(game_obj.id, `We have begun assimilating the province of **${province_id}** for ${config.icons.political_capital} **${parseNumber(config.defines.politics.assimilate_cost)}** Political Capital and ${config.icons.money} ${parseNumber(config.defines.politics.assimilate_fiscal_cost)} into our cultural fabric. Your advisor estimates that it will take up to **${parseNumber(assimilation_time)}** turn(s) before the locals learn to embrace our culture.`);

                  return true;
                } else {
                  if (!options.hide_display)
                    printError(game_obj.id, `Province **${province_id}** is already being assimilated to the **${getCulture(is_being_assimilated[1].culture_id).adjective}** culture! Your advisor estimates that it will take up to **${parseNumber(is_being_assimilated[1].duration)}** turn(s) to finish the assimilation process.`);
                }
              } else {
                if (!options.hide_display)
                  printError(game_obj.id, `You don't have enough money to assimilate this province! You need **£${parseNumber(config.defines.politics.assimilate_fiscal_cost - usr.money)}** more to carry out this action.`);
              }
            } else {
              if (!options.hide_display)
                printError(game_obj.id, `You don't have enough Political Capital to assimilate this province! You need **${parseNumber(config.defines.politics.assimilate_cost - usr.modifiers.political_capital)} more ${config.icons.political_capital} Political Capital to carry out this action.`);
            }
          } else {
            if (!options.hide_display)
              printError(game_obj.id, `You may not integrate a province that is already of your own primary culture!`);
          }
        } else {
          if (!options.hide_display)
            printError(game_obj.id, `You must choose a valid accepted culture to assimilate this province to! Type **[View Cultures]** to see a full list of your nation's accepted cultures.`);
        }
      } else {
        if (!options.hide_display)
          printError(game_obj.id, `You must control Province **${province_id}** before you can assimilate its culture into something else!`);
      }
    } else {
      if (!options.hide_display)
        printError(game_obj.id, `The province you have specified wasn't even on the map! Cartographers are scrambling to find a province with the name '**${province_id}**'.`);
    }
  },

  initialiseAssimilate: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Assimilate A Province:`,
      prompts: [
        [`Where would you like to change the local culture? Please specify a valid Province ID.\n\nType **[Province List]** to view all your provinces and their respective populations.`, "string"],
        [`Which culture would you like to assimilate the locals to?\n\nType **[View Cultures]** for a list of valid cultures.`, "string"]
      ]
    },
    function (arg) {
      module.exports.assimilate(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "province list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvinces(user_id),
            usr: game_obj.user
          });
          return true;

          break;
        case "view cultures":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            usr: game_obj.user
          });
          return true;

          break;
      }
    });
  }
};
