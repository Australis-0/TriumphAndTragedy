module.exports = {
  initialiseRenameCultureAdjective: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Culture Adjective:`,
      prompts: [
        [`Which primary culture inside of your country would you like to change the demonym of?\n\nType **[View Cultures]** for a full list of domestic cultures. Please note that you may only change the adjective of your primary culture(s).`, "string"],
        [`What would you like to rename this culture's adjective to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.initialiseRenameCultureAdjective(user_id, arg[0], arg[1]);
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

  renameCultureAdjective: function (arg0_user, arg1_culture_name, arg2_new_culture_adjective) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture_name.trim().toLowerCase();
    var new_culture_adjective = arg2_new_culture_adjective.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if culture exists before attempting to rename it
    if (culture_obj) {
      if (culture_obj.primary_culture.includes(actual_id)) {
        var old_culture_adjective = JSON.parse(JSON.stringify(culture_obj.adjective));

        //Change culture adjective
        culture_obj.name = new_culture_adjective;

        //Update culture page if user is currently on it
        if (game_obj.page == "culture")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            user: game_obj.user
          });

        //Print user feedback
        printAlert(game_obj.id, `You have successfully changed your culture name from **${old_culture_adjective}** to **${new_culture_adjective}**!`);
      } else {
        printError(game_obj.id, `**${culture_obj.name}** must be your primary culture before you can change its adjective!`);
      }
    } else {
      printError(game_obj.id, `The culture you have specified, **${culture_name}** was entirely fictitious!`);
    }
  }
};
