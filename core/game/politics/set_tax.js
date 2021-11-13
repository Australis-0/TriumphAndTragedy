module.exports = {
  setTax: function (arg0_user, arg1_amount) { //[WIP] - Reload budget panel later on if user comes around to it
    //Convert from parameters
    var user_id = arg0_user;
    var raw_amount = arg1_amount;
    var amount = parseInt(Math.round(arg1_amount/100));

    //Convert from parameters
    var actual_id = main.global.user_map[user_id];
    var anarchy_name = getGovernment({ return_anarchy: true, return_key: true });
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    if (usr) {
      if (usr.government != anarchy_name) {
        if (!isNaN(amount)) {
          if (amount >= 0) {
            //Check if user's max_tax allows for this type of tax rate
            if (amount <= usr.modifiers.max_tax) {
              //Set tax amount
              usr.tax_rate = amount;
              printAlert(game_obj.id, `You have set your tax rate to **${printPercentage(usr.tax_rate)}**.`);
            } else {
              printError(game_obj.id, `Your government currently only allows for a maximum tax rate of ${printPercentage(usr.modifiers.max_tax)}! If you wish to raise your taxes this high, consider switching governments.`);
            }
          } else {
            printError(game_obj.id, `You can't set your tax rate to be negative.`);
          }
        } else {
          printError(game_obj.id, `**${raw_amount}** was not recognised as a valid amount!`);
        }
      } else {
        printError(game_obj.id, `Do you realise how ridiculous an anarchy tax would be? Apparently not, which is why I'm writing this.`);
      }
    } else {
      printError(game_obj.id, `You aren't roleplaying the mafia with extortion rackets. If you want to tax people, you need a state!`);
    }
  }
};
