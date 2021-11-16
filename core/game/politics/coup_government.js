module.exports = {
  coup: function (arg0_user, arg1_government_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_government_type = arg1_government_type;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var anarchy_name = getGovernment({ return_anarchy: true, return_key: true });
    var game_obj = getGameObject(user_id);
    var government_type = getGovernment(raw_government_type);
    var government_type_name = getGovernment(raw_government_type, { return_key: true });
    var usr = main.users[actual_id];

    if (usr) {
      if (usr.modifiers.political_capital >= config.defines.politics.coup_cost) {
        if (usr.government != anarchy_name) {
          if (government_type) {
            if (usr.available_governments.includes(government_type_name)) {
              if (usr.government != government_type_name) {
                usr.modifiers.political_capital -= config.defines.politics.coup_cost;
                usr.coup_this_turn = government_type_name;
                printAlert(game_obj.id, `You have initiated a coup! Your country will begin embracing **${(government_type.name) ? government_type.name.toLowerCase() : government_type_name}** next turn.`);
              } else {
                printError(game_obj.id, `You cannot coup a government form that is already in power!`);
              }
            } else {
              printError(game_obj.id, `The ideology you have specified, **${(government_type.name) ? government_type.name : government_type_name}**, has not yet been unlocked as a valid form of government by your country! Check **[Government List]** for a valid list of current governments.`);
            }
          } else {
            printError(game_obj.id, `Local coup plotters are puzzled at the ideology of **${raw_government_type}**, as it does not constitute a valid form of known government!`);
          }
        } else {
          printError(game_obj.id, `You cannot coup in a 'state' of anarchy! Try using **[Set Government]** from the country interface instead.`);
        }
      } else {
        printError(game_obj.id, `You don't have enough Political Capital to afford a coup! You need at least ${config.icons.political_capital} **${parseNumber(config.defines.politics.coup_cost - usr.modifiers.political_capital)}** more Political Capital to be able to afford a coup.`);
      }
    } else {
      printError(game_obj.id, `You must have a valid country first before you can attempt a coup to overthrow its government!`);
    }
  }
};
