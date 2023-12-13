module.exports = {
  debugDelete: function (arg0_user, arg1_amount, arg2_good) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = (arg1_amount) ? parseInt(arg1_amount)*-1 : -1;
    var good_name = arg2_good;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Modify good amount
    if (usr) {
      if (!isNaN(amount)) {
        if (good_name != "money") {
          modifyGoodAmount(user_id, good_name, amount);

          //Return statement
          return [true, `Removed ${parseGood(good_name, "**", false, `${parseNumber(amount) }`)} from **${usr.name}**.`];
        } else {
          usr.money += amount;

          //Return statement
          return [true, `Removed ${config.icons.money} **${parseNumber(amount)}** from **${usr.name}**.`];
        }
      } else {
        return [false, `The amount specified must be a valid number.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugGive: function (arg0_user, arg1_amount, arg2_good) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = (arg1_amount) ? parseInt(arg1_amount) : 1;
    var good_name = arg2_good;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Modify good amount
    if (usr) {
      if (!isNaN(amount)) {
        if (good_name != "money") {
          modifyGoodAmount(user_id, good_name, amount);

          //Return statement
          return [true, `Gave ${parseGood(good_name, "**", false, `${parseNumber(amount) }`)} to **${usr.name}**.`];
        } else {
          usr.money += amount;

          //Return statement
          return [true, `Gave ${config.icons.money} **${parseNumber(amount)}** to **${usr.name}**.`];
        }
      } else {
        return [false, `The amount specified must be a valid number.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  }
};
