module.exports = {
  setNationalSpirit: function (arg0_user, arg1_id, arg2_options) { //[WIP] - Code bulk of function
    //Convert from parameters
    var user_id = arg0_user;
    var modifier_id = arg1_id;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];
  }
};
