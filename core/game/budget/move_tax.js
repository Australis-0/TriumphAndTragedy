module.exports = {
  initialiseMoveTax: function (arg0_user) { //[WIP] - Finish body function
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Move Industry Tax:`,
      prompts: [
        [`How many positions up/down would you like to move this unit?`, "number", { min: 0 }],
        [`What is the tax ID you would like to reorder?\n\nThis is the number displayed to the left of the tax imposed.`, "number", { min: 0 }],
        [`Type 'up' to move this tax towards the top. Type 'down' to send this tax towards the bottom.`, "string"]
      ]
    },
    function (arg) {
      var move_tax = moveCustomTax(user_id, arg[1], {
        direction: arg[2].trim().toLowerCase(),
        amount: arg[0]
      });

      //Print feedback
      (move_tax[0]) ?
        printAlert(game_obj.id, move_tax[1]) :
        printError(game_obj.id, move_tax[1]);
    });
  }
};
