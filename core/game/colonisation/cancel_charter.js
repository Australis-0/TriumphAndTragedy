module.exports = {
  cancelCharter: function (arg0_user, arg1_charter_id) { //[WIP] - Update colonisation UI if currently active
    //Convert from parameters
    var user_id = arg0_user;
    var charter_id = arg1_charter_id.toLowerCase().trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if Colonial Charter ID even exists
    if (!isNaN(parseInt(charter_id))) {
      if (usr.expeditions[actual_id]) {
        //Print user feedback
        printAlert(game_obj.id, `You have removed Colonial Charter **#${charter_id}** from your current colonisation efforts.`);

        //Delete from expeditions object
        delete usr.expeditions[actual_id];
      } else {
        printError(game_obj.id, `The Colonial Charter you have specified, **#${charter_id}**, turned out to be nonexistent! Try checking your list of ongoing colonial expeditions before issuing this command again.`);
      }
    } else {
      printError(game_obj.id, `You must specify a numeric ID to remove from your list of ongoing expeditions!`);
    }
  },

  initialiseCancelCharter: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: "Cancel An Ongoing Expedition",
      prompts: [
        [`Which current expedition would you like to cancel? You currently have **${Object.keys(usr.expeditions).length}** ongoing expedition(s).\n\nCheck **[Colonisation]** for a full list of your current colonial ventures.`, "string"]
      ]
    },
    function (arg) {
      module.exports.cancelCharter(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "colonisation":
          printColonisation(user_id);
          return true;
          
          break;
      }
    });
  }
};
