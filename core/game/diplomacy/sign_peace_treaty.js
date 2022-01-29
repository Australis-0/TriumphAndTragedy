module.exports = {
  signPeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = (typeof arg1_war_name != "object") ?
      getWar(war_name.trim().toLowerCase()) : arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if a war is currently active
    if (war_obj) {
      //Create a new peace treaty
      createPeaceTreaty(actual_id, war_obj.name);

      printAlert(game_obj.id, `${config.icons.checkmark} You have successfully cleared your demands and created a new peace offer for the **${war_obj.name}**.\nIn order to view it, please type **[View Peace Offer]**.`);
    } else {
      printError(game_obj.id, `You can't sign a peace treaty for a war that is no longer currently ongoing!`);
    }
  }
};
