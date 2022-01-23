module.exports = {
  setMotto: function (arg0_user, arg1_new_motto) {
    //Convert from parameters
    var user_id = arg0_user;
    var new_motto = arg1_new_motto.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    if (!usr.options.motto_locked) {
      if (!usr.options.customisation_locked) {
        if (new_motto.length <= 250) {
          //Set motto
          usr.motto = new_motto;

          printAlert(game_obj.id, `You have set your motto to **${new_motto}**.`);
        } else {
          printError(game_obj.id, `Your motto exceeded the maximum of **250** characters!`);
        }
      } else {
        printError(game_obj.id, `You may no longer change the motto of your country without prior consent from your overlord!`);
      }
    } else {
      printError(game_obj.id, `You have been barred from changing your motto by moderator action! Please try again later.`);
    }
  },

  initialiseSetMotto: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set Motto:`,
      prompts: [
        [`What would you like your new national motto to be?\n\nMottos may not exceed 250 characters.`, "string"]
      ]
    },
    function (arg) {
      module.exports.setMotto(user_id, arg[0]);
    });
  }
};
