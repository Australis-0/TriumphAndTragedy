module.exports = {
  initialiseRemoveAcceptedCulture: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Remove An Accepted Culture:`,
      prompts: [
        [`Which minority within your country would you like to oppress?\n\nType **[View Cultures]** for a full list of domestic cultures. Please note that you may only further oppress currently accepted cultures.`, "string"]
      ]
    },
    function (arg) {
      module.exports.removeAcceptedCulture(user_id, arg[0]);
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

  removeAcceptedCulture: function (arg0_user, arg1_culture_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var culture_name = arg1_culture_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var culture_obj = getCulture(culture_name);
    var game_obj = getGameObject(user_id);
    var raw_culture_name = getCulture(culture_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check to see if culture exists
    if (culture_obj) {
      if (culture_obj.accepted_culture.includes(actual_id)) {
        //Remove actual_id from list of accepted cultures
        removeElement(culture_obj.accepted_culture, actual_id);

        //Update culture page if user is currently on it
        if (game_obj.page == "culture")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            user: game_obj.user
          });

        //Print user feedback
        printAlert(game_obj.id, `We have begun oppressing the **${culture_obj.adjective}** minority in our country, and as such they have been removed from the list of accepted cultures.`);
      } else {
        printError(game_obj.id, `**${culture_obj.adjective}** is already an unaccepted culture in your country!`);
      }
    } else {
      printError(game_obj.id, `**${culture_name}** could not be found as a valid culture anywhere in the world! Other valid cultures may include the Atlanteans, the Hyperboreans, and the Prester Johnians.`);
    }
  }
};
