module.exports = {
  renameCulture: function (arg0_user, arg1_new_culture_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_culture_name = arg1_new_culture_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_cultures = Object.keys(main.global.cultures);
    var duplicate_name = false;
    var culture_obj = getPrimaryCultures(actual_id)[0];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check to make sure that the new culture name is less than 100 characters
    if (parseString(raw_culture_name).length <= 100) {
      var new_culture_name = parseString(new_culture_name);

      //Check if the new name is a duplicate one
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];

        if (local_culture.name == new_culture_name)
          duplicate_name = true;
      }

      if (!duplicate_name) {
        var old_culture_name = JSON.parse(JSON.stringify(culture_obj.name));

        //Rename culture
        culture_obj.name = new_culture_name;

        //Print user alert
        printAlert(game_obj.id, `You have renamed your primary culture of **${old_culture_name}** to **${new_culture_name}**.`);
      } else {
        printError(game_obj.id, `There is already a **${new_culture_name}** culture! Try renaming your culture to something else instead.`);
      }
    } else {
      printError(game_obj.id, `Your new culture name of **${parseString(raw_culture_name)}** exceeded **100** characters in length by a total of **${parseNumber(parseString(raw_culture_name).length - 100)}** characters! Mew!`);
    }
  },

  initialiseRenameCountry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getPrimaryCultures(actual_id)[0];
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Change Cultural Name:`,
      prompts: [
        [`What would you like to rename the **${culture_obj.name}** culture to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameCulture(user_id, arg[0]);
    });
  }
};
