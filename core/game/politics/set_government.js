module.exports = {
  initialiseSetGovernmentCommand: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.users[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual_prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set Government:`,
      prompts: [
        [`What would you like to set your current government to?\n\nType **[Government List]** for a list of valid governments.`, "string"]
      ]
    },
    function (arg) {
      setGovernmentCommand(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "government list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printGovernmentList(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  setGovernmentCommand: function (arg0_user, arg1_government_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_government_type = arg1_government_type.toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if user
    if (usr) {
      //Check if user government is anarchy
      var anarchy_name = getGovernment({
        return_anarchy: true,
        return_key: true
      });
      var government_name = getGovernment(raw_government_type, { return_key: true });

      if (usr.government == anarchy_name) {
        //Check if government type is valid
        if (government_name) {
          if (usr.available_governments.includes(government_name)) {
            setGovernment(actual_id, raw_government_type, { set_party_popularity: 1 });

            //Update stats page if user is currently on it
            if (game_obj.page == "country_interface")
              printStats(user_id);

            //Update politics page if user is currently on it
            if (game_obj.page == "politics")
              printPolitics(user_id);

            printAlert(game_obj.id, `You have successfully set your government type to **${(getGovernment(usr.government).name) ? getGovernment(usr.government).name : usr.government}**.`);
          } else {
            printError(game_obj.id, `The government you have specified, **${government_name}** has not yet been unlocked by your country! Consider researching new technologies in order to unlock this form of government.`);
          }
        } else {
          printError(game_obj.id, `The government you have specified, **${raw_government_type}** does not exist!`);
        }
      } else {
        printError(game_obj.id, `You can't just change your government on a whim like that! Try couping your current government instead for ${config.icons.political_capital} **${parseNumber(config.defines.politics.coup_cost)}** Political Capital.`);
      }
    } else {
      printError(game_obj.id, `You must have a nation first before you can set your government to anything!`);
    }
  }
};
