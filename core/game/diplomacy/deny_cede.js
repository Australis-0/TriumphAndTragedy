module.exports = {
  denyCede: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
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
  }
};
