module.exports = {
  deleteAllArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Make sure user has armies to delete to begin with
    if (Object.keys(usr.armies).length > 0) {
      //Begin removing all armies
      var old_army_count = Object.keys(usr.armies).length;

      while (true) {
        var all_armies = Object.keys(usr.armies);

        if (all_armies.length > 0) {
          for (var i = 0; i < all_armies.length; i++) {
            var local_army = usr.armies[all_armies[i]];
            deleteArmy(actual_id, local_army.name);
          }

          console.log(all_armies);
        } else {
          break;
        }
      }

      //Print user feedback
      printAlert(game_obj.id, `You have successfully deleted all of your **${parseNumber(old_army_count)}** armies. Their men and materiel have been returned to your reserves.\n\nTo mass-create new armies, type **[Create Armies]**. To create an individual army unit, type **[Create Army]**.`);
    } else {
      printError(game_obj.id, `You currently have no armies in active service!`);
    }
  }
};
