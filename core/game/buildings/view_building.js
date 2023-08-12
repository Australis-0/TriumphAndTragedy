module.exports = {
  initialiseViewBuilding: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View Building:`,
      prompts: [
        [`What is the name of the building you would like to view?`, "string"]
      ]
    },
    function (arg) {
      viewBuilding(user_id, arg[0]);
    });
  },

  viewBuilding: function (arg0_user, arg1_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_id = getBuildingByName(user_id, building_name, { return_key: true });
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    if (building_id) {
      printBuilding(user_id, building_id);
    } else {
      printError(game_obj.id, `The building you are trying to view, **${building_name}**, does not exist!`);
    }
  }
};
