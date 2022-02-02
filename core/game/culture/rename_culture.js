module.exports = {
  initialiseRenameCulture: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Culture:`,
      prompts: [
        [`Which primary culture inside of your country would you like to change the name of?\n\nType **[View Cultures]** for a full list of domestic cultures. Please note that you may only change the name of your primary culture(s).`, "string"],
        [`What would you like to rename this culture to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.initialiseRenameCulture(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "view cultures":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            usr: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  renameCulture: function (arg0_user, arg1_culture_name, arg2_new_culture_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture_name.trim().toLowerCase();
    var new_culture_name = arg2_new_culture_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if culture exists before attempting to rename it
    if (culture_obj) {
      if (culture_obj.primary_culture.includes(actual_id)) {
        //Check if changing the name of the culture would result in a duplicate
        if (!getCulture(new_culture_name)) {
          var old_culture_name = JSON.parse(JSON.stringify(culture_obj.name));

          //Change culture name
          culture_obj.name = new_culture_name;

          //Update culture page if user is currently on it
          if (game_obj.page == "culture")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCultures(user_id),
              user: game_obj.user
            });

          //Print user feedback
          printAlert(game_obj.id, `You have successfully changed your culture name from **${old_culture_name}** to **${new_culture_name}**!`);
        } else {
          printError(game_obj.id, `A culture by that name already exists!`);
        }
      } else {
        printError(game_obj.id, `**${culture_obj.name}** must be your primary culture before you can rename it to something else!`);
      }
    } else {
      printError(game_obj.id, `The culture you have specified, **${culture_name}** was entirely fictitious!`);
    }
  }
};
