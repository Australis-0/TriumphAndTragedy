module.exports = {
  printGlobalMarket: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_market_goods = unique(Object.keys(main.market).sort());
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise market_string
    var market_embeds = [];
    var market_ending_string = [];
    var market_fields = [];
    var market_string = [];

    //Print out remaining Market Capacity
    market_string.push(`You have **${parseNumber(getMarketCapacity(user_id))}** Market Capacity remaining for this turn.`);
    market_string.push("");

    //Print out all market goods
    for (var i = 0; i < all_market_goods.length; i++) {
      var local_good = getGood(all_market_goods[i]);
      var local_market_good = main.market[all_market_goods[i]];

      market_fields.push({
        name: `${(local_good.icon) ? config.icons[local_good.icon] : ""} - ${(local_good.name) ? local_good.name : all_market_goods[i]} (**${parseNumber(local_market_good.stock)}** in stock):`,
        value: "```yaml" + `\nBuy Price: £${parseNumber(local_market_good.buy_price)}\nSell Price: £${parseNumber(local_market_good.sell_price)}` + "``````css" + `\n- [Buy ${(local_good.name) ? local_good.name : all_market_goods[i]}]\n- [Sell ${(local_good.name) ? local_good.name : all_market_goods[i]}]` + "\n```",
        inline: true
      });
    }

    //Interject ending message
    market_ending_string.push(`Our deals are always steals!`);

    //Return statement
    return splitEmbed(market_string, {
      fields: market_fields,
      maximum_fields: 12,
      table_width: 2,
      fixed_width: true,
      title: `[Back] | [Jump To Page] | **World Market:**`,
      title_pages: true,

      footer_description: market_ending_string
    });
  }
};
