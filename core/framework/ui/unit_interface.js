module.exports = {
  printUnitList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise unit_string
    var unit_string = [];

    //Iterate over all valid units
    var all_unit_categories = getUnitCategories();

    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = getUnitCategory(all_unit_categories[i]);
      
    }
  }
}
