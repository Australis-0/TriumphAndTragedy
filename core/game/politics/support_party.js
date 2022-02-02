module.exports = {
  initialiseSupportParty: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Support Party:`,
      prompts: [
        [`Which party would you like to support?\n\nType **[Government List]** for a full list of valid parties.`, "string"]
      ]
    },
    function (arg) {
      module.exports.supportParty(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "government list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printGovernmentList(user_id),
            usr: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  supportParty: function (arg0_user, arg1_party_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var party_name = arg1_party_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var raw_party_name = getParty(party_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if party exists or not
    if (raw_party_name) {
      var government_obj = config.governments[raw_party_name];

      //Check to see if user has unlocked the government type yet
      if (usr.available_governments.includes(raw_party_name)) {
        if (usr.modifiers.political_capital >= config.defines.politics.support_cost) {
          //Support party
          addPartyPopularity(actual_id, {
            ideology: raw_party_name,
            amount: config.defines.politics.support_boost
          });

          //Update politics page if user is currently on it
          if (game_obj.page == "politics")
            printPolitics(user_id);

          //Print user feedback
          printAlert(game_obj.id, `You boosted **${government_obj.adjective}** by **${printPercentage(config.defines.politics.support_boost)}** for ${config.icons.political_capital} ${parseNumber(config.defines.politics.support_cost)} Political Capital.`);
        } else {
          printError(game_obj.id, `You need at least ${config.icons.political_capital} **${parseNumber(config.defines.politics.support_cost - usr.modifiers.political_capital)}** more Political Capital to be able to promote **${government_obj.adjective}** in your country!`);
        }
      } else {
        printError(game_obj.id, `Your people have never heard of **${government_obj.adjective}** before! Unlock the government type first before trying to support it.`);
      }
    } else {
      printError(game_obj.id, `The party you have specified does not exist! Try typing **[Government List]** for a valid list of parties instead.`);
    }
  }
};
