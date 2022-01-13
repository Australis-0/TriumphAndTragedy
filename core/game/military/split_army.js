module.exports = {
  splitArmy: function (arg0_user, arg1_army_name, arg2_new_army_name) { //[WIP] - Update army list if user is currnetly on it
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();
    var new_army_name = parseString(arg2_new_army_name.trim());

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check to see if the new army name exceeds the maximum amount of characters
    if (new_army_name.length >= 100) {
      if (army_obj) {
        if (army_obj.type != "navy") {
          if (Object.keys(army_obj.units).length != 0) {
            createArmy(actual_id, new_army_name, army_obj.province);

            //Print user feedback
            printAlert(game_obj.id, `You have created a new field army named the **${new_army_name}** alongside the previously existing **${army_obj.name}**. To deploy units into this new army, type **[Transfer Units]**`);
          } else {
            printError(game_obj.id, `You can't split off armies that have no units in them!`);
          }
        } else {
          printError(game_obj.id, `You can't split off fleets like that!`);
        }
      } else {
        printError(game_obj.id, `The **${army_name}** could not be found in your current order of battle! Check your **[Army List]** to view a complete roster of all armies in your control.`);
      }
    } else {
      printError(game_obj.id, `**${new_army_name}** exceeds the maximum character limit of **100** by **${parseNumber(new_army_name.length - 100)}** character(s)!`);
    }
  }
};
