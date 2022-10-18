module.exports = {
  deleteArmyCommand: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(actual_id);
    var usr = main.users[actual_id];

    //Check to see if army_obj exists
    if (army_obj) {
      if (!army_obj.is_blockading) {
        var old_name = JSON.parse(JSON.stringify(army_obj.name));

        deleteArmy(actual_id, army_name);

        //Update army_list if user is currently viewing it
        if (game_obj.page == "army_list")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        printAlert(game_obj.id, `You have demobilised the **${old_name}**! All their units and equipment have been returned to your **[Reserves]**.`);
      } else {
        printError(game_obj.id, `You cannot delete an army that is currently blockading someone! Withdraw it from the blockade first before deleting it.`);
      }
    } else {
      printError(game_obj.id, `The **${army_name}** is not currently a valid army in active service! Check your **[Army List]** for a full list of valid field armies.`);
    }
  },

  initialiseDeleteArmy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Delete An Army:`,
      prompts: [
        [`What is the name of the army you would like to return to your reserves?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
      ]
    },
    function (arg) {
      module.exports.deleteArmyCommand(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "army list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  }
};
