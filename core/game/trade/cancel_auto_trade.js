module.exports = {
  cancelAutoTrade: function (arg0_user, arg1_key) { //[WIP] - Remember to update auto-trade UI when being focused on by user
    //Convert from parameters
    var user_id = arg0_user;
    var auto_trade_key = arg1_key;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var selected_auto_trade = usr.auto_trades[auto_trade_key];

    //Make sure that the specified auto-trade actually city_exists
    if (Object.keys(usr.auto_trades).length > 0) {
      if (selected_auto_trade) {
        //Formatting variables
        var good_name = getGood(selected_auto_trade.good_type, { return_key: true });
        var local_good_icon = (getGood(good_name).icon) ?
          getGood(good_name).icon + " " :
          (raw_good_name == "money") ?
            config.icons.money + " " :
            "";
        var local_good_name = (getGood(good_name).name) ?
          getGood(good_name).name :
          all_imports[i].good_type;

        //Print out alert first
        printAlert(game_obj.id, `You have cancelled the automatic shipment of ${local_good_icon}**${parseNumber(selected_auto_trade.amount)}** ${local_good_name} to **${main.users[selected_auto_trade.target].name}**.`);

        //Remove selected auto trade
        delete selected_auto_trade;
      } else {
        printError(game_obj.id, `The auto-trade you have selected turned out to be nonexistent! Try selected a valid autotrade ID to cancel instead.`)
      }
    } else {
      printError(game_obj.id, `You don't currently have any ongoing auto-trades! Try creating a new auto-trade before cancelling it.`);
    }
  },
};
