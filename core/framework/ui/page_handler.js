module.exports = {
  pageHandler: function (arg0_input) {
    //Convert from parameters
    var input = arg0_input;

    //Declare local instance variables
    var game_obj = getGameObject(interaction.user);
    var user_id = interaction.user.id;

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
};
