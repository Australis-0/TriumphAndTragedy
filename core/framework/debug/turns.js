module.exports = {
  debugNextGlobalTurn: function () {
    nextGlobalTurn();

    //Return statement
    return [true, `You have incremented the game by one turn.`];
  },

  debugNextTurn: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    if (usr) {
      nextTurn(user_id);

      return [true, `You have incremented **${usr.name}** by one turn.`];
    } else {
      return [false, `The user you have specified to process a turn for does not exist.`];
    }
  }
};
