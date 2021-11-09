module.exports = {
  printBuildList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise building_string
    var building_string = [];

    //Iterate over all valid buildings
    var all_building_categories = getBuildingCategories();

    for (var i = 0; i < all_building_categories.length; i++) {
      var local_building_category = getBuildingCategory(all_building_categories[i]);
      var local_buildings = Object.keys(local_building_category);

      //Iterate over all buildings in category and push them to the list based on availability
      for (var x = 0; x < local_buildings.length; x++) {
        var local_building = local_building_category[local_buildings[x]];

        //Only push building to category if user has the building unlocked
        if (usr.available_buildings.includes(local_building)) {
          
        }
      }
    }
  }
};
