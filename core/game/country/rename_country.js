module.exports = {
  renameCountry: function (arg0_user, arg1_new_country_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var new_country_name = arg1_new_country_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var duplicate_name = false;
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Make sure user is able to change their name
    if (!usr.options.name_locked) {
      if (!usr.options.customisation_locked) {
        //Check to make sure that the new country name is less than 100 characters
        if (parseString(new_country_name).length <= 100) {
          var new_name = parseString(new_country_name);
          var old_name = JSON.parse(JSON.stringify(usr.name));

          //Make sure no other country has this name
          for (var i = 0; i < all_users.length; i++) {
            var local_user = main.users[all_users[i]];

            if (local_user.name == parseString(new_country_name))
              duplicate_name = true;
          }

          if (!duplicate_name) {
            //Change name
            usr.name = new_name;

            //Print user feedback
            printAlert(game_obj.id, `You have changed the name of your country from the **${old_name}** to the **${new_name}**.`);
          } else {
            printError(game_obj.id, `There already exists a country by the name of **${parseString(new_country_name)}**! Try changing your name to something else instead.`);
          }
        } else {
          printError(game_obj.id, `The new name of your country, **${parseString(new_country_name)}**, must be less than **100** characters! Its current proposed length is **${parseNumber(parseString(new_country_name).length)}**.`);
        }
      } else {
        printError(game_obj.id, `Your vassal overlord has issued a decree stating the name of their colony! Try to request a licence of change from your overlord before attempting to change your name again. Further acts of rebellion will not be tolerated!`);
      }
    } else {
      printError(game_obj.id, `Your name has been locked in place by moderator action due to prior abuses.`);
    }
  },

  initialiseRenameCountry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Rename Your Country:`,
      prompts: [
        [`What would you like to rename your country to?`, "string"]
      ]
    },
    function (arg) {
      module.exports.renameCountry(user_id, arg[0]);
    });
  }
};
