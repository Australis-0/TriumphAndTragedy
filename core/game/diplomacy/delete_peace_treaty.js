module.exports = {
  deletePeaceTreaty: function (arg0_user, arg1_peace_treaty_object, arg2_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;
    var war_name = (typeof arg2_war_name != "object") ? arg2_war_name.trim().toLowerCase() : arg2_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Check to make sure that war_obj is valid
    if (war_obj) {
      //Check if peace_obj even exists
      if (peace_obj) {
        //Check to make sure that the user is the owner of the peace treaty
        if (peace_obj.type == "user") {
          if (peace_obj.owner == actual_id) {
            var treaty_name = JSON.parse(JSON.stringify(peace_obj.name));

            //Clear peace offer
            delete war_obj.peace_treaties[peace_obj.id];

            //Print alert
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully cleared the **${treaty_name}** from the negotiating table.`);

            //Refresh UI
            if (game_obj.page.startsWith("view_war_")) {
              var current_war_id = game_obj.page.replace("view_war_", "");

              if (current_war_id == war_obj.id)
                printWar(user_id, war_obj.name);
            }
            if (game_obj.page.startsWith("view_peace_treaties_")) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printPeaceTreaties(user_id, war_obj),
                page: main.interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });
            }
          } else {
            printError(game_obj.id, `This peace treaty doesn't belong to you! You may only delete your own peace offers.`);
          }
        } else {
          printError(game_obj.id, `You cannot nominate your side's combined peace treaty for deletion! This is negotiated by all parties, not just you.`);
        }
      } else {
        printError(game_obj.id, `You must nominate a valid peace offer for deletion! Please type **[View Peace Offers]** for a valid list of all peace offers.`);
      }
    } else {
      printError(game_obj.id, `The war you have specified doesn't even exist! How'd that happen?`);
    }
  },

  initialiseDeletePeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Clear Peace Offer for the **${war_obj.name}**:`,
      prompts: [
        [`What is the name of the peace treaty you would like to bin?\n\nType **[View Peace Offers]** for a valid list of all our proposals.`, "string"]
      ]
    },
    function (arg) {
      var peace_obj = getPeaceTreaty(war_obj, arg[0]);

      module.exports.deletePeaceTreaty(user_id, peace_obj, war_obj);
    },
    function (arg) {
      switch (arg) {
        case "view peace offers":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printPeaceTreaties(user_id, war_name),
            user: game_obj.user
          });

          return true;
          break;
      }
    })
  }
};
