module.exports = {
  printGlobalMarket: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_market_goods = Object.keys(main.market);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise market_string
    var market_string = [];

    //Print out remaining Market Capacity
    market_string.push(`You have **${parseNumber(getMarketCapacity(actual_id))}** Market Capacity remaining for this turn.`);
    market_string.push("");

    //Print out all market goods
    for (var i = 0; i < all_market_goods.length; i++) {
      var local_good = getGood(all_market_goods[i]);
      var local_market_good = main.market[all_market_goods[i]];

      market_string.push(`${(local_good.icon) ? config.icons[local_good.icon] : ""} - ${(local_good.name) ? local_good.name : all_market_goods[i]} (**${parseNumber(local_market_good.stock)}** in stock): Buy Price: £${parseNumber(local_market_good.buy_price)} ¦ Sell Price: £${parseNumber(local_market_good.sell_price)}`);
      market_string.push(`- **[Buy ${(local_good.name) ? local_good.name : all_market_goods[i]}]** ¦ **[Sell ${(local_good.name) ? local_good.name : all_market_goods[i]}]**`);
      market_string.push("");
    }

    //Interject ending message
    market_string.push(`_Our deals are always steals!_`);

    //Return statement
    return splitEmbed(market_string, {
      title: `**[Back]** ¦ World Market:`,
      title_pages: true,
      fixed_width: true
    });
  }
};
