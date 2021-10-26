module.exports = {
  //Used for instantly settling provinces when a new country is founded
  settleStartingProvinces: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = arg1_provinces;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGame(user_id);
    var reinitialise_command = false;

    if (provinces.length <= config.defines.common.starting_provinces) {

    } else {
      printError(game_obj.id, `You may only settle up to **${parseNumber(config.defines.common.starting_provinces)}** province(s) at once!`);
      reinitialise_command = true;
    }
  }
};
