//Lobby initialisation functions
module.exports = {
  initLobby: function (arg0_lobby_id, arg1_user_id) {
    //Convert from parameters
    var lobby_id = arg0_lobby_id;
    var master_id = arg1_user_id;

    //Declare local instance variables
    main.lobbies[lobby_id] = (!main.lobbies[lobby_id]) ? {} : main.lobbies[lobby_id];
    var lobby_obj = main.lobbies[lobby_id];

    //Declare lobby setting variables
    if (!lobby_obj.name) lobby_obj.name = "Multiplayer Lobby";
    if (!lobby_obj.master_id) lobby_obj.master_id = master_id;
    if (!lobby_obj.game_masters) lobby_obj.game_masters = [];

    if (!lobby_obj.map) lobby_obj.map = "none";

    if (!lobby_obj.minimum_players) lobby_obj.minimum_players = "none";
    if (!lobby_obj.maximum_players) lobby_obj.maximum_players = "none";

    if (!lobby_obj.starting_era) lobby_obj.starting_era = "renaissance";
    if (!lobby_obj.starting_year) lobby_obj.starting_year = 1500;
    if (!lobby_obj.starting_resources) lobby_obj.starting_resources = config.defines.common.starting_kit;
    if (!lobby_obj.starting_tech) lobby_obj.starting_tech = 0;

    if (!lobby_obj.mod) lobby_obj.mod = "none";

    //Players
    if (!lobby_obj.chat) lobby_obj.chat = [];
    if (!lobby_obj.players) lobby_obj.players = {};
  }
};
