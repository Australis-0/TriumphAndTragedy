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
            printCity(game_obj.user, city_name);
          } else {
            visualPrompt(game_obj.alert_embed, user_id, {
              title: "View A City:",
              prompts: [
                [`What is the name of the city you would like to view?`, "string"]
              ]
            },
            function (arg) {
              printCity(game_obj.user, arg[0]);
              game_obj.page = `view_city_${arg[0]}`;
            });
          }
        }

        switch (input) {
          case "found city":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Found A New City:`,
              prompts: [
                [`Please choose a province in which to found a new city.`, "string"],
                [`What would you like to name your new city?`, "string"]
              ]
            },
            function (arg) {
              foundCity(game_obj.user, arg[0], arg[1]);
            });

            break;
        }
      } else if (game_obj.page.startsWith("view_city")) {
        var city_name = game_obj.page.replace("view_city_", "");

        switch (input) {
          case "back":
            game_obj.page = "cities_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCities(game_obj.user),
              user: game_obj.contents
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
            user: game_obj.contents
          });

          break;
        }
      }
    }
  }
};
