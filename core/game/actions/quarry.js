module.exports = {
  initialiseQuarry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Quarry:`,
      prompts: [
        [`How many times would you like to mine stone?`, "number", { min: 1, max: usr.actions }]
      ]
    },
    function (arg) {
      mine(user_id, arg[0], "quarry");
    });
  }
};
