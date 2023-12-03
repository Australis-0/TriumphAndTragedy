module.exports = {
  pageHandler: function (arg0_user, arg1_input) {
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

    //Main Menu handler
    pageHandlerMainMenu(user_id, input);

    //Global commands
    pageHandlerGlobalCommands(user_id, input);

    if (
      !in_founding_map && !in_visual_prompt && !game_obj.main_menu_embed &&
      main.season_started
    ) {
      //Alerts page handler
      pageHandlerAlerts(user_id, input);

      //Budget handler
      pageHandlerBudget(user_id, input);

      //Buildings/Cities page handler
      pageHandlerBuildingsCities(user_id, input);

      //Colonisation interface page handler
      pageHandlerColonisation(user_id, input);

      //Country interface page handler
      pageHandlerCountryInterface(user_id, input);

      //Diplomacy page handler
      pageHandlerDiplomacy(user_id, input);

      //Economy page handler
      pageHandlerEconomy(user_id, input);

      //Events page handler
      pageHandlerEvents(user_id, input);

      //Government page handler
      pageHandlerGovernment(user_id, input);

      //Map page handler
      pageHandlerMap(user_id, input);

      //Military page handler
      pageHandlerMilitary(user_id, input);

      //Modifiers page handler
      pageHandlerModifiers(user_id, input);

      //Politics page handler
      pageHandlerPolitics(user_id, input);

      //Pops page handler
      pageHandlerPops(user_id, input);

      //Province page handlers
      pageHandlerPops(user_id, input);

      //Technology page handler
      pageHandlerTechnology(user_id, input);

      //Trade page handler
      pageHandlerTrade(user_id, input);
    }
  }
};
