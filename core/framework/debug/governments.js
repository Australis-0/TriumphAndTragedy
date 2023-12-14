module.exports = {
  debugChangeGovernment: function (arg0_user, arg1_government) {
    //Convert from parameters
    var user_id = arg0_user;
    var government_name = arg1_government;

    //Declare local instance variables
    var actual_id = amin.global.user_map[user_id];
    var government_key = getGovernment(government_name, { return_key: true });
    var government_obj = getGovernment(government_name);
    var usr = main.users[actual_id];

    //Change government
    if (usr) {
      if (government_obj) {
        usr.government = government_key;

        return [true, `You have changed the government type of **${usr.name}** to **${government_obj.name}**.`];
      } else {
        return [false, `There is no government type by the name of **${government_name}**.`];
      }
    } else {
      return [false, `The user you have specified did not exist.`];
    }
  },

  debugGivePC: function (arg0_user, arg1_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = (arg1_amount) ? parseInt(arg1_amount) : 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Give PC
    if (usr) {
      if (!isNaN(amount)) {
        usr.modifiers.political_capital += amount;

        return [true, `You have given ${config.icons.political_capital} **${parseNumber(amount)}** Political Capital to **${usr.name}**.`];
      } else {
        return [false, `You must specify a valid amount.`];
      }
    } else {
      return [false, `The user you have specified did not exist.`];
    }
  }
};
