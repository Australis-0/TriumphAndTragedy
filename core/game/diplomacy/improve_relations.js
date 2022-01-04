module.exports = {
  improveRelations: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if ot_user exists
    if (ot_user) {
      if (actual_id != actual_ot_user_id) {
        if (usr.modifiers.political_capital >= config.defines.diplomacy.improve_relations_cost) {
          //Check if user already has maximum relations with target country
          var current_relations = getRelations(actual_id, actual_ot_user_id);

          if (current_relations[0] < 100) {
            //Check if user is already improving their opinion of the target country
            if (current_relations.status != "improving") {
              //Subtract political capital and begin improving relations
              usr.modifiers.political_capital -= config.defines.diplomacy.decrease_relations_cost;

              modifyRelations(actual_ot_user_id, {
                target: actual_id,
                value: 50,
                duration: 5
              });

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have begun to improve your relations with **${ot_user.name}** to **${Math.max(current_relations[0] + 50, -100)}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.improve_relations_cost)}** Political Capital.`);
            } else {
              printError(game_obj.id, `You are already currently improving your relations with **${ot_user.name}**! They will finish improving to **${parseNumber(current_relations.improving_to, { display_prefix: true })}** in **${parseNumber(current_relations.duration)}** turn(s).`);
            }
          } else {
            printError(game_obj.id, `You already have maximum **+100** Relations with **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `You need ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.improve_relations_cost - usr.modifiers.political_capital)}** more Political Capital to improve relations with **${usr.name}**!`);
        }
      } else {
        printError(game_obj.id, `You can't improve relations with yourself, you narcissist!`);
      }
    } else {
      printError(game_obj.id, `The other country you have specified doesn't even exist!`);
    }
  }
};
