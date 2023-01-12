module.exports = {
  allowCede: function (arg0_user, arg1_user) {
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
      if (!usr.options.allow_ceding.includes(actual_ot_user_id)) {
        usr.options.allow_ceding.push(actual_ot_user_id);

        //Print user feedback
        printAlert(`${config.icons.checkmark} You have decided to allow **${ot_user.name}** to cede provinces to you.`);
      } else {
        printError(game_obj.id, `You already allow **${ot_user.name}** to cede provinces to you! To revoke access instead, try **[Deny Ceding]** by this country.`);
      }
    } else {
      printError(game_obj.id, `You must allow a nation that actually _exists_ to be able to cede to you, not some fictitious country!`);
    }
  },

  initialiseAllowCede: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Allow Ceding By A Foreign Country:`,
      prompts: [
        [`Whom would you like to grant permission to cede provinces to you?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.allowCede(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    });
  }
};
