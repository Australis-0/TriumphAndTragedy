module.exports = {
  pageHandlerProvince: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Province handler
    if (game_obj.page == "provinces_list") {
      //[Assimilate]
      if (input == "assimilate") {
        initialiseAssimilate(user_id);

        return true;
      }

      //[Back]
      if (input == "back") {
        game_obj.page = "population";
        printPops(user_id);

        return true;
      }

      //[Found City]
      if (input == "found city") {
        usr.city_cap = getCitiesCap(user_id);
        initialiseFoundCity(user_id);

        return true;
      }

      //[View (Province Name)]
      if (input != "view provinces")
        if (arg[0] == "view") {
          if (arg.length > 1) {
            if (arg[1] != "province") {
              //City view handler
              var city_name = input.replace("view", "").trim()
                .replace("province", "").trim();

              if (getCity(city_name)) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, city_name),
                  user: game_obj.user
                });

                return true;
              } else if (getProvince(province_name)) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, city_name),
                  user: game_obj.user
                });

                return true;
              } else {
                printError(game_obj.id, `**${city_name}** is not a valid city that you can view!`);
              }
            } else {
              //Province view handler [WIP]
              var province_name = input.replace("view", "").trim()
                .replace("province", "").trim();

              if (getProvince(province_name)) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, province_name),
                  user: game_obj.user
                });

                return true;
              } else {
                printError(game_obj.id, `**${province_name}** is not a valid province that you can view!`);
              }
            }
          } else {
            initialisePrintProvince(user_id, game_obj.id);

            return true;
          }
        }
    } else if (game_obj.page.startsWith("view_province_")) {
      var province_name = game_obj.page.replace("view_province_", "");

      //[Assimilate]
      if (input == "assimilate") {
        initialiseAssimilate(user_id);

        return true;
      }

      //[Back]
      if (input == "back") {
        game_obj.page = "provinces_list";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvinces(game_obj.user),
          user: game_obj.user
        });

        return true;
      }

      //[Display All Pops]
      if (input == "display all pops") {
        game_obj.display_irrelevant_pops = true;
        game_obj.display_no_pops = true;

        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvince(game_obj.user, province_name),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Display Relevant Pops]
      if (input == "display relevant pops") {
        delete game_obj.display_irrelevant_pops;
        delete game_obj.display_no_pops;

        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvince(game_obj.user, province_name),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printProvince(game_obj.user, province_name).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvince(game_obj.user, province_name),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });

        return true;
      }

      //[View Demographics]
      if (input == "view demographics") {
        printDemographics(user_id, province_name);
        game_obj.page = `view_demographics_${province_name}`;

        return true;
      }

      //[View Job Market]
      if (input == "view job market") {
        printJobMarket(user_id, province_name);
        game_obj.page = `view_job_market_${province_name}`;

        return true;
      }
    }
  }
};
