module.exports = {
  pageHandler: function (arg0_input) {
    //Convert from parameters
    var arg = arg0_input.split(" ");
    var input = arg0_input;

    //Declare local instance variables
    var game_obj = getGameObject(interaction.user);
    var user_id = interaction.user.id;

    //Economy page handler
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

    //Cities page handler
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
            game_obj.page = `view_city_${city_name}`;
          });
        }
      }
    }
  }
};
