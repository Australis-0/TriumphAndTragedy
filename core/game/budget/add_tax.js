module.exports = {
  initialiseAddTax: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Add Industry Tax:`,
      prompts: [
        [`Which industry or building should a new tax be levied upon? You may type the name of building categories or individual buildings, so long as they are commercial.`, "string"],
        [`What should the level of tax levied upon this sector be?`, "number", { min: 0, max: usr.modifiers.max_tax }]
      ]
    },
    function (arg) {
      var custom_tax = setCustomTax(user_id, arg[0], arg[1]);

      //Print feedback
      (custom_tax[0]) ?
        printAlert(game_obj.id, custom_tax[1]) :
        printError(game_obj.id, custom_tax[1]);
    });
  }
};
