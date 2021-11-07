module.exports = {
  pageHandler: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;

    //Cities page handler
    {
      if (game_obj.page == "cities_list") {
        if (arg[0] == "view") {
          if (arg.length > 1) {
            //Process city_name by removing initial argument and print city
            var city_name = input.replace("view", "").trim();
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCity(game_obj.user, city_name),
              user: game_obj.user
            });
          } else {
            initialisePrintCity(game_obj.user, game_obj.id);
          }
        }

        switch (input) {
          case "back":
            game_obj.page = "economy";
            printEconomy(user_id);

            break;
          case "found city":
            initialiseFoundCity(game_obj.user, game_obj.id);

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printCities(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCities(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });
        }
      } else if (game_obj.page.startsWith("view_city")) {
        var city_name = game_obj.page.replace("view_city_", "");

        switch (input) {
          case "back":
            game_obj.page = "cities_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCities(game_obj.user),
              user: game_obj.user
            });

            break;
          case "develop":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Develop A Building Category in ${getCity(city_name).name}:`,
              prompts: [
                [`Which building category would you like to develop in this city?`, "string"],
                [`How many urbanisation edicts would you like to issue for this category?`, "number", { min: 0 }]
              ]
            },
            function (arg) {
              developCity(game_obj.user, city_name, arg[1], arg[0]);
            });

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printCity(game_obj.user, city_name).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCity(game_obj.user, city_name),
                page: arg[0] - 1,
                user: game_obj.user
              })
            });

            break;
          case "move capital":
            moveCapital(game_obj.user, city_name);

            break;
          case "rename city":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Rename ${getCity(city_name).name}:`,
              prompts: [
                [`What would you like to rename the City of ${getCity(city_name).name} to?`, "string"]
              ]
            },
            function (arg) {
              renameCity(game_obj.user, city_name, arg[0]);
            });
        }
      }
    }

    //Economy page handler
    {
      if (economy_pages.includes(game_obj.page)) {
      switch (input) {
        case "inventory":
          game_obj.page = "inventory";
          printInventory(user_id);

          break;
        case "view cities":
          game_obj.page = "cities_list";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCities(game_obj.user),
            user: game_obj.user
          });

          break;
        }
      }
    }

    //Pops page handler
    {
      if (population_pages.includes(game_obj.page)) {
        switch (input) {
          case "view provinces":
            game_obj.page = "provinces_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(game_obj.user),
              user: game_obj.user
            });

            break;
        }
      }
    }

    //Province page handlers
    {
      if (game_obj.page == "provinces_list") {
        if (arg[0] == "view") {
          if (arg.length > 1) {
            if (arg[1] != "province") {
              //City view handler
              var city_name = input.replace("view", "").trim();

              (getCity(city_name)) ?
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCity(game_obj.user, city_name),
                  user: game_obj.user
                }) :
                printError(game_obj.id, `**${city_name}** is not a valid city that you can view!`);
            } else {
              //Province view handler [WIP]
              var province_name = input.replace("view", "").trim()
                .replace("province", "").trim();

              (getProvince(province_name)) ?
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, province_name),
                  user: game_obj.user
                }) :
                printError(game_obj.id, `**${province_name}** is not a valid province that you can view!`);
            }
          } else {
            initialisePrintProvince(user_id, game_obj.id);
          }
        }

        switch (input) {
          case "back":
            game_obj.page = "population";
            printPops(user_id);

            break;
        }
      } else if (game_obj.page.startsWith("view_province_")) {
        var province_name = game_obj.page.replace("view_province_", "");

        switch (input) {
          case "back":
            game_obj.page = "provinces_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(game_obj.user),
              user: game_obj.user
            });

            break;
          case "jump to page":
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
            })
          });
        }
      }
    }
  }
};
