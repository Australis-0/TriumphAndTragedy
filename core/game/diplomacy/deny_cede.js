module.exports = {
  denyCede: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check to see if the other user exists
    if (ot_user) {
      if (usr.options.allow_ceding.includes(actual_ot_user_id)) {
        removeElement(usr.options.allow_ceding, actual_ot_user_id);

        //Print user feedback
        printAlert(`${config.icons.cancel} You have decided to blacklist **${ot_user.name}** from ceding provinces to you.`);
      } else {
        printError(game_obj.id, `You already forbid **${ot_user.name}** from ceding provinces to you! To allow access instead, try to **[Allow Ceding]** by this country.`);
      }
    } else {
      printError(game_obj.id, `You must allow a nation that actually _exists_ from ceding to you, not some fictitious country!`);
    }
  },

  initialiseDenyCede: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Deny Ceding By A Foreign Country:`,
      prompts: [
        [`Whom would you like to blacklist from ceding provinces to you?\n\nType **[View Diplomacy]** to see a list of nations you currently allow ceding from.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.denyCede(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view diplomacy":
          printDiplomacy(user_id);
          return true;

          break;
      }
    });
  }
};
