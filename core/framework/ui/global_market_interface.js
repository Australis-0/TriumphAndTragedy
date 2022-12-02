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

      if ((i + 1) % 2 == 0)
        market_fields.push({
          name: config.localisation.blank,
          value: config.localisation.blank
        });
    }

    //Interject ending message
    market_ending_string.push(`Our deals are always steals!`);

    //Begin churning out embeds!
    var local_market_fields = [];

    if (market_fields.length > 0)
      for (var i = 0; i < market_fields.length; i++) {
        local_market_fields.push(market_fields[i]);

        if (i != 0 || market_fields.length == 1)
          if (i % 13 == 0 || i == market_fields.length - 1) {
            var market_embed = new Discord.MessageEmbed()
              .setColor(settings.bot_colour)
              .setTitle(`[Back] | [Jump To Page] | **World Market:**`)
              .setDescription(market_string.join("\n"))
              .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
              .setFooter(market_ending_string.join("\n"));

            for (var x = 0; x < local_market_fields.length; x++)
              market_embed.addField(local_market_fields[x].name, local_market_fields[x].value, local_market_fields[x].inline);

            market_embeds.push(market_embed);
            local_market_fields = [];
          }
      }

    //Return statement
    return market_embeds;
  }
};
