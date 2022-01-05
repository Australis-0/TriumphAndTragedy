module.exports = {
  annex: function (arg0_user, arg1_user) { //[WIP] - Print out news alert in future
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if the other user exists and is a vassal
    if (ot_user) {
      if (getVassal(actual_ot_user_id)) {
        if (getVassal(actual_ot_user_id).overlord == actual_id) {
          //Check if user has political capital
          if (usr.modifiers.political_capital >= config.defines.diplomacy.annex_cost) {
            //Subtract political capital and send alert
            usr.modifiers.political_capital -= config.defines.diplomacy.annex_cost;

            sendAlert(actual_ot_user_id, config.defines.diplomacy.annex_alert_id, {
              TO: actual_ot_user_id,
              FROM: actual_id
            });

            usr.modifiers.infamy += config.defines.diplomacy.infamy_annex_cost;

            //Print user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} We have sent **${ot_user.name}** an ultimatum for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.annex_cost)}** Political Capital demanding their immediate incorporation into our empire, lest they be consumed by fire.`);
          } else {
            printError(game_obj.id, `You don't have enough Political Capital to annex **${ot_user.name}** yet! You need an additional ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.annex_cost - usr.modifiers.political_capital)}** Political Capital before being able to send an annexation request to this country.`);
          }
        } else {
          printError(game_obj.id, `You must be the overlord of **${ot_user.name}** in order to annex it into your country!`);
        }
      } else {
        printError(game_obj.id, `You may only demand the annexation of someone that is currently your vassal!`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to annex into your country doesn't even exist!`);
    }
  }
};
