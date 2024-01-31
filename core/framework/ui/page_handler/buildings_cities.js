module.exports = {
  pageHandlerBuildingsCities: function (arg0_user, arg1_input) {
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

    //Buildings handler
    if (game_obj.page.startsWith("view_building_")) {
      var building_id = game_obj.page.replace("view_building_", "");
      var local_building = getBuildingByID(building_id);
      var province_id = building_id.split("-")[0];

      //[Back]
      if (input == "back") {
        printProvinceBuildings(user_id, province_id);
        game_obj.page = `view_buildings_${province_id}`;

        return true;
      }

      //[Change Production Choice]
      if (input == "change production choice") {
        initialiseChangeProductionChoice(user_id, local_building);

        return true;
      }

      //[Demolish]
      if (input == "demolish") {
        demolish(user_id, {
          province_id: province_id,

          building_object: local_building
        });

        return true;
      }

      //[Hide Production Choices]
      if (["hide production choice", "hide production choices"].includes(input)) {
        game_obj.hide_production_choices = true;
        printBuilding(user_id, building_id, current_page);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printBuilding(game_obj.user, local_building, undefined, { do_not_display: true }).length }]
          ]
        },
        function (arg) {
          printBuilding(user_id, local_building, arg[0]);
        });

        return true;
      }

      //[Rename Building]
      if (input == "rename building") {
        initialiseRenameBuilding(user_id, local_building);

        return true;
      }

      //[Reopen]
      if (["reopen", "reopen building"].includes(input)) {
        reopenBuilding(user_id, local_building);

        return true;
      }

      //[Show Production Choices]
      if (["show production choice", "show production choices"].includes(input)) {
        delete game_obj.hide_production_choices;
        printBuilding(user_id, building_id, current_page);

        return true;
      }

      //[Subsidise]
      if (["subsidise", "subsidize"].includes(input)) {
        subsidiseBuilding(user_id, local_building);

        return true;
      }

      //[Turn Off Subsidies]
      if (input == "turn off subsidies") {
        subsidiseBuilding(user_id, local_building, { desubsidise: true });

        return true;
      }

      //[Switch to (Production Choice)]
      if (input.startsWith("switch to ")) {
        var production_choice_name = input.replace("switch to ", "");
        var change_production_choice = changeProductionChoice(user_id, local_building, production_choice_name);

        (change_production_choice[0]) ?
          printAlert(game_obj.id, change_production_choice[1]) :
          printError(game_obj.id, change_production_choice[1]);

        return true;
      }
    }

    if (game_obj.page.startsWith("view_buildings_")) {
      var province_id = game_obj.page.replace("view_buildings_", "");

      //[Alphabetical]
      if (input == "alphabetical") {
        game_obj.building_sort = "alphabetical";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Back]
      if (input == "back") {
        game_obj.page = `view_city_${province_id}`;
        printProvince(user_id, province_id);

        return true;
      }

      //[Cash Reserves]
      if (input == "cash reserves") {
        game_obj.building_sort = "cash_reserves";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Category]
      if (input == "category") {
        game_obj.building_sort = "category";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Chronology]
      if (input == "chronology") {
        game_obj.building_sort = "chronology";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Defund All Buildings]
      if (input == "defund all buildings") {
        subsidiseAllBuildings(user_id, {
          province_ids: [province_id],
          desubsidise: true
        });

        return true;
      }

      //[Employment]
      if (input == "employment") {
        game_obj.building_sort = "employment";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Hide All Details]
      if (input == "hide all details") {
        game_obj.hide_build_list_details = true;
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printProvinceBuildings(user_id, province_id, undefined, { do_not_display: true }).length }]
          ]
        },
        function (arg) {
          printProvinceBuildings(game_obj.user, province_id, arg[0] - 1);
        });

        return true;
      }

      //[Mass Change Production Choice]
      if (input == "mass change production choice") {
        initialiseMassChangeProductionChoice(user_id, province_id);

        return true;
      }

      //[Numeric]
      if (input == "numeric") {
        game_obj.building_sort = "numeric";
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Rename Building]
      if (input == "rename building") {
        initialiseRenameBuilding(user_id);

        return true;
      }

      //[Reopen]
      if (input == "reopen") {
        initialiseReopenBuilding(user_id);

        return true;
      }

      //[Show All Details]
      if (input == "show all details") {
        delete game_obj.hide_build_list_details;
        printProvinceBuildings(user_id, province_id, current_page);

        return true;
      }

      //[Subsidise All Buildings]
      if (["subsidise all buildings", "subsidize all buildings"].includes(input)) {
        subsidiseAllBuildings(user_id, { province_ids: [province_id] });

        return true;
      }

      //[View Building]
      if (input == "view building") {
        initialiseViewBuilding(user_id);

        return true;
      }

      //[View (Building Name)]
      if (input.startsWith("view ")) {
        var building_name = input.replace("view ", "");
        var building_view = viewBuilding(user_id, building_name);

        if (building_view) {
          game_obj.page = `view_building_${building_view.id}`;

          return true;
        }
      }
    }

    //Cities handler
    if (game_obj.page.startsWith("view_city")) {
      var city_name = game_obj.page.replace("view_city_", "");
      var city_obj = getCity(city_name);

      //[Back]
      if (input == "back") {
        game_obj.page = "cities_list";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvinces(game_obj.user),
          user: game_obj.user
        });

        return true;
      }

      //[Build]
      if (input == "build") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Constructing Building(s) in ${city_obj.name}:`,
          prompts: [
            [`How many buildings of this type would you like to begin building?`, "number", { min: 1 }],
            [`What would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.\nType **[Inventory]** to view your inventory.`, "string"]
          ]
        },
        function (arg) {
          build(user_id, city_obj.name, arg[0], arg[1]);
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
            case "inventory":
              printInventory(user_id);
              return true;

              break;
          }
        });

        return true;
      }

      //[Demolish]
      if (input == "demolish") {
        initialiseDemolish(user_id, city_obj.id);

        return true;
      }

      //[Develop]
      if (input == "develop") {
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

        return true;
      }

      //[Hide Warnings]
      if (input == "hide warnings") {
        delete game_obj.show_pop_need_warnings;
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvince(game_obj.user, city_name),
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
            [`Which page would you like to jump to?`, "number", { min: 1, max: printProvince(game_obj.user, city_name).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvince(game_obj.user, city_name),
            page: arg[0] - 1,
            user: game_obj.user
          })
        });

        return true;
      }

      //[Move Capital]
      if (input == "move capital") {
        moveCapital(game_obj.user, city_name);

        return true;
      }

      //[Rename City]
      if (input == "rename city") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Rename ${getCity(city_name).name}:`,
          prompts: [
            [`What would you like to rename the City of ${getCity(city_name).name} to?`, "string"]
          ]
        },
        function (arg) {
          renameCity(game_obj.user, city_name, arg[0]);
        });

        return true;
      }

      //[Show Warnings]
      if (input == "show warnings") {
        game_obj.show_pop_need_warnings = true;
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printProvince(game_obj.user, city_name),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[View Buildings]
      if (input == "view buildings") {
        printProvinceBuildings(user_id, city_obj.id);
        game_obj.page = `view_buildings_${city_obj.id}`;

        return true;
      }

      //[View Demographics]
      if (input == "view demographics") {
        printDemographics(user_id, city_name);
        game_obj.page = `view_demographics_${city_name}`;

        return true;
      }

      //[View Job Market]
      if (input == "view job market") {
        printJobMarket(user_id, city_obj.id);
        game_obj.page = `view_job_market_${city_obj.id}`;

        return true;
      }
    }
  }
};
