module.exports = {
  printWar: function (arg0_user, arg1_war_name) { //[WIP] - Work on remainder of function
    //Convert from parameters
    var user_id = arg0_user;
    var raw_war_name = arg1_war_name.trim().toLowerCase();

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var usr = main.users[user_id];
    var war_obj = getwar(raw_war_name);

    //Declare local tracker variables
    var attackers_string = [];
    var defenders_string = [];
    var war_string = [];

    //Check if war_obj exists
    if (war_obj) {

    } else {
      printError(game_obj.id, `The war you have specified, **${raw_war_name}** is either no longer ongoing, or does not exist!`);
    }
  }
};
