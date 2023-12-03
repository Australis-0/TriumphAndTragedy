module.exports = {
  pageHandlerEconomy: function (arg0_user, arg1_input) {
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

    //Economy page handler
    if (game_obj.page == "economy") {
      //[Hide Available Pops]
      if (input == "hide available pops") {
        game_obj.hide_building_pops = true;
        printEconomy(user_id);
      }

      //[Show Available Pops]
      if (input == "show available pops") {
        delete game_obj.hide_building_pops;
        printEconomy(user_id);
      }
    }

    if (economy_pages.includes(game_obj.page)) {
      switch (input) {
        case "build":
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Building Construction Menu:`,
            prompts: [
              [`What type of building would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.`, "string"],
              [`How many buildings of this type would you like to begin building?`, "number", { min: 0 }],
              [`Which city would you like to build these new buildings in?\n\nType **[View Cities]** for a list of valid cities.`, "string"]
            ]
          },
          function (arg) {
            build(user_id, arg[2], arg[1], arg[0]);
          },
          function (arg) {
            switch (arg) {
              case "build list":
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printBuildList(user_id),
                  user: game_obj.user
                });
                return true;

                break;
              case "view cities":
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvinces(game_obj.user),
                  user: game_obj.user
                });
                return true;

                break;
            }
          })

          break;
        case "building list":
        case "build list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printBuildList(user_id),
            user: game_obj.user
          });

          break;
        case "constructions":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printConstructions(user_id),
            user: game_obj.user
          });
          game_obj.page = "view_constructions";

          break;
        case "found city":
          //Make sure that user is actually able to found a city before authorising the command, otherwise print an error
          (usr.city_cap-usr.city_count > 0) ?
            initialiseFoundCity(user_id) :
            printError(game_obj.id, `You don't have enough city slots remaining to found a new city!`);

          break;
        case "industry":
          printIndustry(user_id);
          game_obj.page = "view_industry";

          break;
      }
    }

    if (game_obj.page == "inventory") {
      var all_good_names = getAllGoodNamesLowercase();

      //[Back]
      if (input == "back") {
        printEconomy(user_id);
        game_obj.page = "economy";
      }

      //[Clear]
      if (["clear", "clear search"].includes(input))
        printInventory(user_id, current_page);

      //[(Good Name)] - Tooltip
      goodTooltip(user_id, input);

      //[Hide All Goods]
      if (["hide goods", "hide all goods"].includes(input)) {
        delete game_obj.inventory_show_all_goods;
        printInventory(user_id, current_page);
      }

      //[Jump To Page]
      if (input == "jump to page")
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printInventory(user_id, undefined, true).length }]
          ]
        },
        function (arg) {
          printInventory(user_id, arg[0] - 1);
        });

      //[Search]
      if (input == "search")
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Search Inventory:`,
          prompts: [
            [`What is the name of the good you would like to view?`, "string"]
          ]
        },
        function (arg) {
          printInventory(user_id, undefined, { search_query: arg[0] });
        });

      //[Show All Goods]
      if (input == "show all goods") {
        game_obj.inventory_show_all_goods = true;
        printInventory(user_id, current_page);
      }
    }

    if (game_obj.page == "view_constructions") {
      switch (input) {
        case "back":
          game_obj.page = "economy";
          printEconomy(user_id);

          break;
        case "jump to page":
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like to jump to?`, "number", { min: 1, max: printConstructions(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printConstructions(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            });
          });

          break;
      }
    }

    if (game_obj.page == "view_industry") {
      //[Alphabetical]
      if (input == "alphabetical") {
        game_obj.building_sort = "alphabetical";
        printIndustry(user_id, current_page);
      }

      //[Back]
      if (input == "back") {
        game_obj.page = "economy";
        printEconomy(user_id);
        initialiseTopbar(user_id);
      }

      //[Cash Reserves]
      if (input == "cash reserves") {
        game_obj.building_sort = "cash_reserves";
        printIndustry(user_id, current_page);
      }

      //[Category]
      if (input == "category") {
        game_obj.building_sort = "category";
        printIndustry(user_id, current_page);
      }

      //[Chronology]
      if (input == "chronology") {
        game_obj.building_sort = "chronology";
        printIndustry(user_id, current_page);
      }

      //[Disable All Subsidies]
      if (input == "disable all subsidies")
        subsidiseAllBuildings(user_id, { desubsidise: true });

      //[Employment]
      if (input == "employment") {
        game_obj.building_sort = "employment";
        printIndustry(user_id, current_page);
      }

      //[Numeric]
      if (input == "numeric") {
        game_obj.building_sort = "numeric";
        printIndustry(user_id, current_page);
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printIndustry(game_obj.user, 0, { do_not_display: true }).length }]
          ]
        },
        function (arg) {
          printIndustry(user_id, arg[0]);
        });
      }

      //[Mass Change Production Choice]
      if (input == "mass change production choice")
        initialiseMassChangeProductionChoice(user_id);

      //[Rename Building]
      if (input == "rename building")
        initialiseRenameBuilding(user_id);

      //[Reopen]
      if (input == "reopen")
        initialiseReopenBuilding(user_id);

      //[Subsidise All Buildings]
      if (["subsidise all buildings", "subsidize all buildings"].includes(input))
        subsidiseAllBuildings(user_id);

      //[View Building]; [View (Building Name)]
      if (input == "view building") {
        initialiseViewBuilding(user_id);
      } else if (input.startsWith("view ")) {
        var building_name = input.replace("view ", "");
        var building_view = viewBuilding(user_id, building_name); //This automatically sets game_obj.page
      }
    }

    if (game_obj.page == "view_production") {
      //[Back]
      if (input == "back") {
        game_obj.page = "economy";
        printEconomy(user_id);
      }

      //[Jump To Page]
      if (input == "jump to page")
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like jump to?`, "number", { min: 1, max: printProduction(game_obj.user, 0, true).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProduction(game_obj.user),
            page: arg[0] - 1,
            user: game_obj.user
          })
        });
    }
  }
};