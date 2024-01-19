module.exports = {
  /*
    buyMarketGood() - Buys goods from the Global Market.
    options: {
      is_simulation: true/false - Optional. Whether this is a simulation. False by default
    }
  */
  buyMarketGood: function (arg0_good, arg1_amount, arg2_options) {
    //Make sure lookup is fine
    if (!global.lookup)
      global.lookup = {};
    if (!global.lookup.all_goods)
      global.lookup.all_goods = getGoods({ return_object: true });
    if (!global.lookup.all_subgoods)
      global.lookup.all_subgoods = getGoodsSubgoods();

    //Convert from parameters
    var good_type = arg0_good;
    var amount = parseInt(arg1_amount);
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var buy_amount = 0; //The total that was actually bought
    var spending = 0;

    //Buy from relevant .all_subgoods
    if (lookup.all_goods[good_type]) {
      var local_subgood = lookup.all_subgoods[good_type];
      var relevant_market_goods = [];

      //Iterate over local_subgood to sort by buy_price
      for (var i = 0; i < local_subgood.length; i++) {
        var local_market_good = main.market[local_subgood[i]];

        relevant_market_goods.push({ good_type: local_subgood[i], buy_price: local_market_good.buy_price });
      }

      relevant_market_goods.sort((a, b) => {
        return a.buy_price - b.buy_price;
      });

      //Iterate over relevant_market_goods
      for (var i = 0; i < relevant_market_goods.length; i++) {
        var local_market_good = main.market[relevant_market_goods[i].good_type];

        //Check that local_market_good exists
        if (local_market_good) {
          var remaining_amount = amount - buy_amount;

          if (remaining_amount > 0) {
            var actual_consumption = Math.min(local_market_good.stock, remaining_amount);

            //Buy up goods from here
            buy_amount += actual_consumption;
            spending += local_market_good.buy_price*actual_consumption;

            if (!options.is_simulation) {
              local_market_good.demand += actual_consumption;
              local_market_good.stock -= actual_consumption;
            }
          }
        }
      }
    }

    //Return statement
    return {
      amount: buy_amount,
      cost: spending
    };
  },

  processMarket: function () {
    //Make sure lookup is fine
    if (!global.lookup)
      global.lookup = {};
    if (!global.lookup.all_goods)
      global.lookup.all_goods = getGoods({ return_object: true });
    if (!global.lookup.all_subgoods)
      global.lookup.all_subgoods = getGoodsSubgoods();

    //Declare local instance variables
    var all_market_goods = Object.keys(main.market);
    var all_goods = Object.keys(lookup.all_goods);
    var all_subgoods = Object.keys(global.lookup.all_subgoods);

    //Iterate over all_market_goods
    for (var i = 0; i < all_market_goods.length; i++) {
      var local_good = getGood(all_market_goods[i]);
      var local_market_good = main.market[all_market_goods[i]];

      if (local_market_good && local_good) {
        var local_price = local_good.buy_price*(local_market_good.demand/local_market_good.stock);

        //Supply must at least be 1
        if (local_market_good.stock <= 1)
          local_market_good.stock = 1;

        //No demand? Just hold at buy_price
        if (local_market_good.demand <= 0)
          local_price = local_good.buy_price;

        //Set buy/sell prices
        local_market_good.buy_price = local_price;
        local_market_good.sell_price = local_price*(1/(config.defines.economy.resource_markup + 1));

        //Institute minimum good price caps
        local_market_good.buy_price =
          Math.max(local_market_good.buy_price, config.defines.economy.resource_min_buy_price);

        local_market_good.sell_price =
          Math.max(local_market_good.sell_price, config.defines.economy.resource_min_sell_price);
      }
    }

    //Iterate over all_subgoods
    for (var i = 0; i < all_subgoods.length; i++) {
      var local_subgood = lookup.all_subgoods[all_subgoods[i]];

      //This is a category; weighted average each price
      if (local_subgood.length > 1) {
        var total_buy_price = 0;
        var total_demand = 0;
        var total_sell_price = 0;
        var total_stock = 0;

        for (var x = 0; x < local_subgood.length; x++) {
          var local_market_good = main.market[local_subgood[x]];

          if (local_market_good) {
            var local_value = local_market_good.stock;

            total_buy_price += returnSafeNumber(local_market_good.buy_price*local_value);
            total_demand += returnSafeNumber(local_market_good.demand);
            total_sell_price += returnSafeNumber(local_market_good.sell_price*local_value);
            total_stock += local_value;
          }
        }

        //Set main.market object
        main.market[all_subgoods[i]] = {
          demand: total_demand,
          buy_price: total_buy_price/unzero(total_stock, 1),
          sell_price: total_sell_price/unzero(total_stock, 1),
          stock: total_stock
        };
      }
    }

    //Set lookup tables for category_buy_prices and category_sell_prices
    lookup.category_buy_prices = getCategoryPrices("buy");
    lookup.category_sell_prices = getCategoryPrices("sell");
  },

  /*
    sellMarketGood() - Sells goods to the Global Market.
    options: {
      is_simulation: true/false - Optional. Whether this is a simulation. False by default
    }
  */
  sellMarketGood: function (arg0_good, arg1_amount, arg2_options) {
    //Make sure lookup is fine
    if (!global.lookup)
      global.lookup = {};
    if (!global.lookup.all_goods)
      global.lookup.all_goods = getGoods({ return_object: true });
    if (!global.lookup.all_subgoods)
      global.lookup.all_subgoods = getGoodsSubgoods();

    //Convert from parameters
    var good_type = arg0_good;
    var amount = parseInt(arg1_amount);
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var spending = 0;

    //Sell to relevant .all_subgoods
    if (lookup.all_goods[good_type]) {
      var local_subgood = lookup.all_subgoods[good_type];
      var relevant_market_goods = [];

      //Iterate over local_subgood to sort by sell_price
      for (var i = 0; i < local_subgood.length; i++) {
        var local_market_good = main.market[local_subgood[i]];

        relevant_market_goods.push({ good_type: local_subgood[i], sell_price: local_market_good.sell_price });
      }

      relevant_market_goods.sort((a, b) => {
        return b.sell_price - a.sell_price;
      });

      //Sell to the most valuable current market good
      var local_market_good = main.market[relevant_market_goods[0].good_type];

      spending += local_market_good.sell_price*amount;

      if (!options.is_simulation)
        local_market_good.stock += amount;
    }

    //Return statement
    return {
      amount: amount,
      cost: spending
    };
  },

  setMarketStock: function (arg0_amount) {
    //Convert from parameters
    var amount = parseInt(arg0_amount);

    //Declare local instance variables
    var all_market_goods = Object.keys(main.market);

    //Iterate over all_market_goods
    for (var i = 0; i < all_market_goods.length; i++) {
      var local_market_good = main.market[all_market_goods[i]];
      var local_stock = returnSafeNumber(local_market_good.stock);

      if (local_stock < amount)
        local_market_good.stock = amount;
    }
  }
};
