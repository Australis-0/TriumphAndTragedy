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

    //Strip starting and ending brackets from input
    if (input.startsWith("[") && input.endsWith("]"))
      input = input.slice(1, -1);

    //Main Menu handler
    pageHandlerMainMenu(user_id, input);

    //Global commands
    pageHandlerGlobalCommands(user_id, input);

    if (
      !in_founding_map && !in_visual_prompt && !game_obj.main_menu_embed &&
      main.season_started
    ) {
      //Alerts page handler
      var alerts = pageHandlerAlerts(user_id, input);
      if (alerts) return alerts;

      //Budget handler
      var budget = pageHandlerBudget(user_id, input);
      if (budget) return budget;

      //Buildings/Cities page handler
      var buildings_cities = pageHandlerBuildingsCities(user_id, input);
      if (buildings_cities) return buildings_cities;

      //Colonisation interface page handler
      var colonisation = pageHandlerColonisation(user_id, input);
      if (colonisation) return colonisation;

      //Country interface page handler
      var country_interface = pageHandlerCountryInterface(user_id, input);
      if (country_interface) return country_interface;

      //Diplomacy page handler
      var diplomacy = pageHandlerDiplomacy(user_id, input);
      if (diplomacy) return diplomacy;

      //Economy page handler
      var economy = pageHandlerEconomy(user_id, input);
      if (economy) return economy;

      //Events page handler
      var events = pageHandlerEvents(user_id, input);
      if (events) return events;

      //Government page handler
      var government = pageHandlerGovernment(user_id, input);
      if (government) return government;

      //Map page handler
      var map = pageHandlerMap(user_id, input);
      if (map) return map;

      //Military page handler
      var military = pageHandlerMilitary(user_id, input);
      if (military) return military;

      //Modifiers page handler
      var modifiers = pageHandlerModifiers(user_id, input);
      if (modifiers) return modifiers;

      //Politics page handler
      var politics = pageHandlerPolitics(user_id, input);
      if (politics) return politics;

      //Pops page handler
      var pops = pageHandlerPops(user_id, input);
      if (pops) return pops;

      //Province page handlers
      var province = pageHandlerProvince(user_id, input);
      if (province) return province;

      //Technology page handler
      var technology = pageHandlerTechnology(user_id, input);
      if (technology) return technology;

      //Trade page handler
      var trade = pageHandlerTrade(user_id, input);
      if (trade) return trade;
    }
  }
};
