module.exports = {
  initialiseViewPeaceTreaty: function (arg0_user, arg1_war_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = arg1_war_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View Peace Treaty:`,
      prompts: [
        [`Which peace treaty would you like to view for the **${war_obj.name}**? You may only contribute to your own peace treaties or those of the entire alliance.`, "string"]
      ]
    },
    function (arg) {
      var peace_obj = getPeaceTreaty(war_obj, arg[0]);

      if (peace_obj) {
        if (peace_obj.type != "user" || (peace_obj.type == "user" && peace_obj.owner == actual_id)) {
          game_obj.page = "edit_peace_offer";
          modifyPeaceTreaty(user_id, peace_obj);
        } else {
          printError(game_obj.id, `You can only contribute to peace proposals you are working on, or the end peace treaty for the entire alliance!`);
        }
      } else {
        printError(game_obj.id, `The peace treaty you have specified, **${arg[0]}**, does not exist!`);
      }
    })
  }
};
