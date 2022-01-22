module.exports = {
  printMilitary: function (arg0_user) { //[WIP] - Code bulk of function
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.users[user_id];
    var game_obj = getGameObject(user_id);
    var military_string = [];
    var reserves_strength = getReserveStrength(actual_id);
    var usr = main.users[actual_id];


  }
};
