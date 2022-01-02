module.exports = {
  printAlerts: function (arg0_user) { //[WIP] - Finish print UI for printAlerts()
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare alert_embeds
    var alert_embeds = [];

    //Go through all usr.alerts
    for (var i = 0; i < usr.alerts.length; i++) {

    }
  }
};
