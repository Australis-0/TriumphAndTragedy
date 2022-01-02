module.exports = {
  ally: function (arg0_user, arg1_user) { //[WIP] - Finish bulk of function
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists
    if (ot_user) {
      if (usr.modifiers.political_capital >= config.defines.diplomacy.form_alliance_cost) {
        //Check if ally is yourself, already an ally, or a rival

      } else {
        printError(game_obj.id, `You don't have enough Political Capital to propose an alliance! You must have at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.form_alliance_cost - usr.modifiers.political_capital)}** more Political Capital in order to form an alliance.`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to conduct diplomatic relationships with does not exist!`);
    }
  }
};
