module.exports = {
  initialiseChop: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Chop Wood:`,
      prompts: [`How much wood would you like to chop down? Each action chops down 5 pieces of wood.`, "number", { min: 1, max: usr.actions }]
    },
    function (arg) {
      mine(actual_id, arg[0], "chop");
    });
  }
};
