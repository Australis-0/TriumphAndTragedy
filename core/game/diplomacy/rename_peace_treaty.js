module.exports = {
  initialiseRenamePeaceTreaty: function (arg0_user, arg1_peace_treaty_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_treaty_name = arg1_peace_treaty_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var peace_treaty_obj = (typeof peace_treaty_name != "object") ? getPeaceTreaty(peace_treaty_name.trim().toLowerCase()) : war_name;

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Peace Treaty:`,
      prompts: [,
        [`What would you like to rename this treaty to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renamePeaceTreaty(user_id, peace_treaty_obj, arg[0]);
    });
  },

  renamePeaceTreaty: function (arg0_user, arg1_peace_treaty_object, arg2_name) { //[WIP] - Update Peace Treaties UI
    //Convert from parameters
    var user_id = arg0_user;
    var peace_treaty_obj = arg1_peace_treaty_object;
    var peace_treaty_name = arg2_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_treaty_obj.id];

    if (war_obj) {
      var all_peace_treaties = Object.keys(war_obj.peace_treaties);
      var duplicate_name = false;

      //Check if name is already taken
      for (var i = 0; i < all_peace_treaties.length; i++) {
        var local_treaty = war_obj.peace_treaties[all_peace_treaties[i]];

        if (local_treaty.name.trim().toLowerCase() == peace_treaty_name.toLowerCase())
          duplicate_name = true;
      }

      if (!duplicate_name) {
        if (peace_treaty_name.length <= 100) {
          var old_peace_treaty_name = JSON.parse(JSON.stringify(peace_treaty_obj.name));

          //Rename peace treaty
          peace_treaty_obj.name = parseString(peace_treaty_name);

          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully renamed the **${old_peace_treaty_name}** to the **${peace_treaty_obj.name}**.`);
        } else {
          printError(game_obj.id, `**${peace_treaty_name}** exceeded the maximum limit of **100** characters by a total of **${parseNumber(peace_treaty_name.length - 100)}** character(s)! Consider shortening the name down, or picking another one.`);
        }
      } else {
        printError(game_obj.id, `There already exists a peace treaty for the **${war_obj.name}** by this name! Please choose another name.`);
      }
    } else {
      printError(game_obj.id, `How'd you manage that? You must specify a valid peace treaty to be renamed!`);
    }
  }
};
