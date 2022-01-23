module.exports = {
  initialiseMoveAllArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Concentrate All Armies:`,
      prompts: [
        [`Which province would you like to concentrate all your armies in? Please specify a numeric Province ID.`, "string"]
      ]
    },
    function (arg) {
      module.exports.moveAllArmies(user_id, arg[0]);
    });
  },

  moveAllArmies: function (arg0_user, arg1_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var successful_moves = 0;
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if the province even exists
    if (province_obj) {
      if (all_armies.length > 0) {
        for (var i = all_armies.length - 1; i >= 0; i--)
          successful_moves = (moveArmy(actual_id, usr.armies[all_armies[i]], province_id)) ? successful_moves + 1 : successful_moves;

        printAlert(game_obj.id, `You have begun moving **${parseNumber(successful_moves)}**/**${parseNumber(all_armies.length)}** total armies to Province #${province_id}, wherever possible.`);
      } else {
        printError(game_obj.id, `You can't move around fictitious armies! Consider creating armies and putting soldiers in them first before ordering to coalesce somewhere.`);
      }
    } else {
      printError(game_obj.id, `The province you have specified, **${province_id}**, doesn't even exist!`);
    }
  }
};
