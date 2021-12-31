module.exports = {
  raiseStability: function (arg0_user) { //[WIP] - Update the politics screen if user is currently on it
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if user has enough political capital
    if (usr.modifiers.political_capital >= config.defines.politics.stability_cost) {
      if (returnSafeNumber(usr.boosted_stability) < config.defines.politics.max_stab_boost) {
        //Boost stability
        usr.modifiers.political_capital -= config.defines.politics.stability_cost;
        usr.boosted_stability = returnSafeNumber(
          usr.boosted_stability + 0.10,
          0.10
        );
        usr.modifiers.stability += 0.10;

        //Print user feedback
        printAlert(game_obj.id, `${config.icons.stability} You have raised your stability by **${printPercentage(config.defines.politics.stability_boost)}**! (-1% per turn).`);
      }
    } else {
      printError(game_obj.id, `You don't have enough Political Capital to raise stability yet! You need at least **${parseNumber(config.defines.politics.stability_cost - usr.modifiers.political_capital)}** more ${config.icons.political_capital} **Political Capital** to raise your stability by **${printPercentage(config.defines.politics.stability_boost)}**.`);
    }
  }
};
