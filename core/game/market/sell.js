module.exports = {
  sell: function (arg0_user, arg1_amount, arg2_good_type) { //[WIP] - Update market UI once sell request has been processed
    //Convert from parameters
    var user_id = arg0_user;
    var good_amount = parseInt(arg1_amount);
    var good_type = arg2_good_type.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_market_goods = Object.keys(main.market);
    var game_obj = getGameObject(user_id);
    var good_name = getGood(good_type, { return_key: true });
    var good_obj = getGood(good_type);
    var usr = main.users[actual_id];

    //Only process sell request if good is actually valid
    if (main.market[good_name]) {
      if (!isNaN(good_amount)) {
        if (usr.inventory[good_name] <= good_amount) {
          var total_cost = 0;

          //Make sure that user has enough market capacity remaining to process the sale
          if (getMarketCapacity(actual_id) >= good_amount) {
            //Update user_transactions
            usr.transactions_this_turn += good_amount;

            //Process sale
            for (var i = 0; i < good_amount; i++) {
              var previous_stock = JSON.parse(JSON.stringify(market[good_name].stock));

              usr.money += market[good_name].sell_price;
              total_cost += market[good_name].sell_price;

              market[good_name].stock++;

              //Decrease buy/sell price
              market[good_name].buy_price =
                market[good_name].buy_price*(previous_stock/market[good_name].stock);
              market[good_name].sell_price =
                market[good_name].sell_price*(previous_stock/market[good_name].stock);
            }

            market[good_name].amount_sold += good_amount;
            usr.inventory[good_name] -= good_amount;

            //Print out feedback
            printAlert(`You sold **${parseNumber(good_amount)}** ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${(good_obj.name) ? good_obj.name : good_name} for **£${parseNumber(total_cost)}**.`);
          } else {
            printError(game_obj.id, `You do not have enough Market Capacity remaining to sell this much **${(good_obj.name) ? good_obj.name : good_name}**! You need at least **${parseNumber(good_amount - getMarketCapacity(actual_id))} more remaining Market Capacity in order to fulfil this purchase request.`);
          }
        } else {
          printError(game_obj.id, `You don't have enough **${(good_obj.name) ? good_obj.name : good_name}** to do that! You're **${parseNumber(good_amount - usr.inventory[good_name])}** ${(good_obj.name) ? good_obj.name : good_name} short.`);
        }
      } else {
        printError(game_obj.id, `You must specify a valid number of goods to sell!`);
      }
    } else {
      printError(game_obj.id, `The resource you have specified isn't currently being accepted by market vendors! Specify a valid resource for sale.`);
    }
  }
}
