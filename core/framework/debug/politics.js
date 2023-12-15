module.exports = {
  debugAddPartyPopularity: function (arg0_user, arg1_amount, arg2_ideology) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = arg1_amount;
    var ideology = arg2_ideology;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var government_key = getGovernment(ideology, { return_key: true });
    var government_obj = getGovernment(ideology);
    var usr = main.users[actual_id];

    //Add party popularity
    if (usr) {
      if (!isNaN(amount)) {
        addPartyPopularity(user_id, {
          ideology: government_key, amount: amount
        });

        //Return statement
        return [true, `Added **${printPercentage(amount)}** party popularity to **${(government_obj.name) ? government_obj.name : government_key}**.`];
      } else {
        return [false, `You must specify a valid percentage to add party popularity.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugPassReform: function (arg0_user, arg1_reform_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var reform_name = arg1_reform_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var reform_key = getReform(reform_name, { return_key: true });
    var reform_obj = getReform(reform_name);
    var usr = main.users[actual_id];

    //Pass reform
    if (usr) {
      if (reform_obj) {
        enactReform(user_id, reform_key, { force_reform: true });

        //Return statement
        return [true, `Forced through a reform on **${(reform_obj.name) ? reform_obj.name : reform_key}** for **${usr.name}**.`];
      } else {
        return [false, `The reform you have specified, **${reform_name}** does not exist.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugSetPartyPopularity: function (arg0_user, arg1_amount, arg2_ideology) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = arg1_amount;
    var ideology = arg2_ideology;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var government_key = getGovernment(ideology, { return_key: true });
    var government_obj = getGovernment(ideology);
    var usr = main.users[actual_id];

    //Set party popularity
    if (usr) {
      if (!isNaN(amount)) {
        if (government_obj) {
          usr.politics[government_key].popularity = amount;
          balanceParties(user_id);

          return [true, `You have set **${(government_obj.name) ? government_obj.name : government_key}** in **${usr.name}** to have **${printPercentage(usr.politics[government_key].popularity)}** popularity.`];
        } else {
          return [false, `The ideology you have specified, **${ideology}**, is not a valid ideology type.`];
        }
      } else {
        return [false, `You must specify a valid percentage to add to party popularity.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  }
};
