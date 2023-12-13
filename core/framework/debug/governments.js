module.exports = {
  debugChangeGovernment: function (arg0_user, arg1_government) {
    //Convert from parameters
    var user_id = arg0_user;
    var government_name = arg1_government;

    //Declare local instance variables
    var actual_id = amin.global.user_map[user_id];
    var usr = main.users[actual_id];

    //
  },

  debugGivePC: function (arg0_user, arg1_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = (arg1_amount) ? parseInt(arg1_amount) : 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //
  }
};
