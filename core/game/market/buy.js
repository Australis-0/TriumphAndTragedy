module.exports = {
  buy: function (arg0_user, arg1_amount, arg2_good_type) { //[WIP] - Update market page if current user page is set to there
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

    //Check to make sure that resource exists in the first place
    if (main.market[good_name]) {
      //Make sure that the user isn't blockaded
      if (Object.keys(usr.blockaded).length == 0) {
        if (!isNaN(good_amount)) {
          var temp_market = JSON.parse(JSON.stringify(main.market));
          var total_cost = 0;

          for (var i = 0; i < good_amount; i++) {
            var previous_stock = JSON.parse(JSON.stringify(temp_market[good_name].stock));
            total_cost += temp_market[good_name].buy_price;
            temp_market[good_name].stock--;

            //Adjust simulated prices
            temp_market[good_name].buy_price =
              temp_market[good_name].buy_price*
              (previous_stock/temp_market[good_name].stock);
            temp_market[good_name].sell_price =
              temp_market[good_name].sell_price*
              (previous_stock/temp_market[good_name].stock);
          }

          //Check if user actually has enough money for the purchase
          if (usr.money >= total_cost) {
            if (good_amount < market[good_name].stock) {
              if (good_amount <= 1000) {
                //Check if user has enough market capacity remaining
                if (getMarketCapacity(actual_id) - good_amount > 0) {
                  //Check with stock limitations
                  if (
                    (market[good_name].stock < 50) ||
                    (market[good_name].stock >= 50 && good_amount < market[good_name].stock*0.2)
                  ) {
                    //Make the purchase now that all checks have been cleared
                    var total_buy_price = 0;

                    usr.transactions_this_turn += good_amount;
                    for (var i = 0; i < good_amount; i++) {
                      var previous_stock = JSON.parse(JSON.stringify(market[good_name].stock));

                      usr.money -= market[good_name].buy_price;
                      total_buy_price += market[good_name].buy_price;
                      usr.inventory[good_name]++;

                      //Increase buy/sell price
                      market[good_name].buy_price =
                        market[good_name].buy_price*
                        (previous_stock/market[good_name].stock);
                      market[good_name].sell_price =
                        market[good_name].sell_price*
                        (previous_stock/market[good_name].stock);
                      market[good_name].stock--;
                    }

                    //Increase amount sold
                    market[good_name].amount_sold += good_amount;

                    //Print out alert
                    printAlert(game_obj.id, `You bought **${parseNumber(good_amount)}** ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${(good_obj.name) ? good_obj.name : good_name} for **£${parseNumber(total_buy_price)}**.`);
                  } else {
                    printError(game_obj.id, `You can only buy/sell up to **20%** of the goods in a large market at once! This equates to about **${parseNumber(Math.floor(market[good_name].stock*0.2))}** ${(good_obj.name) ? good_obj.name : good_name}.`);
                  }
                } else {
                  printError(game_obj.id, `You do not have enough Market Capacity remaining to make this purchase! You need at least **${parseNumber(good_amount - getMarketCapacity(actual_id))} more remaining Market Capacity in order to fulfil this purchase request.`);
                }
              } else {
                printError(game_obj.id, `You may not make purchases larger than **1.000** on the Global Market!`);
              }
            } else {
              printError(game_obj.id, `There isn't enough stock remaining in the Global Market to purchase this much ${(good_obj.name) ? good_obj.name : good_name}! There is only **${parseNumber(temp_market[good_name].stock)}** ${(good_obj.name) ? good_obj.name : good_obj.name} remaining in the Global Market, whilst your purchase demand called for **${parseNumber(good_amount)}** ${(good_obj.name) ? good_obj.name : good_obj.name}`)
            }
          } else {
            printError(game_obj.id, `You don't have enough money to buy that much ${(good_obj.name) ? good_obj.name : good_name}! You need another ${config.icons.money} ${parseNumber(Math.ceil(total_cost) - usr.money)} to fulfil this purchase request.`);
          }
        } else {
          printError(game_obj.id, `You must specify a valid number to buy!`);
        }
      } else {
        printError(game_obj.id, `You can't buy items whilst blockaded! Relieve the blockade on your home country first before attempting to make purchases from the Global Market.`);
      }
    } else {
      printError(game_obj.id, `**${good_type}** isn't for sale!`);
    }
  }
};
