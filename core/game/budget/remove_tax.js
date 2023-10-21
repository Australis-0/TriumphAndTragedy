module.exports = {
  initialiseRemoveTax: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Remove Industry Tax:`,
      prompts: [
        [`What is the ID of the tax you would like to abolish?\n\nThis is the number displayed to the left of the tax imposed.`, "number", { min: 0 }]
      ]
    },
    function (arg) {
      var remove_tax = removeCustomTax(user_id, arg[0]);

      //Print feedback
      (remove_tax[0]) ?
        printAlert(game_obj.id, remove_tax[1]) :
        printError(game_obj.id, remove_tax[1]);
    });
  }
};
