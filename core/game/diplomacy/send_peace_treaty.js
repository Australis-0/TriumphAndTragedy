module.exports = {
  sendPeaceTreaty: function (arg0_user, arg1_peace_treaty_object) { //[WIP] - Finish bulk of function
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];


  }
};
