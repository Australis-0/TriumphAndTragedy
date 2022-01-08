module.exports = {
  printNextTurn: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var current_date = new Date().getTime();
    var game_obj = getGameObject(user_id);
    var time_difference = current_date - main.last_turn;
    var usr = main.users[actual_id];

    //Print out when the next turn is happening
    printAlert(game_obj.id, `It is currently round **${parseNumber(main.round_count)}**.\n${parseDate((settings.turn_timer*1000) - time_difference)} remaining until the next turn.\nIt is also the year of our Lord, **${getDate(main.date)}**.`);
  }
};
