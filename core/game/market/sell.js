module.exports = {
  initialiseDumbSell: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Sell Goods To The World Market:`,
      prompts: [
        [`How much material would you like to sell?\n\nType **[Inventory]** to view your current inventory.\nType **[World Market]** for a list of valid goods.`, "number", { min: 1 }],
        [`What type of good would you like to sell to the World Market?`, "string"],
      ]
    },
    function (arg) {
      module.exports.sell(user_id, arg[0], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "inventory":
          printInventory(user_id);
          return true;

          break;
        case "global market":
        case "world market":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printGlobalMarket(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  initialiseSell: function (arg0_user, arg1_good_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_good_name = arg1_good_type;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var good_obj = getGood(raw_good_name);

    //Initialise visual prompt
    (good_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Sell ${good_obj.name}:`,
        prompts: [
          [`How much ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${good_obj.name} would you like to sell?\n\nType **[Inventory]** to view your current inventory.\nType **[World Market]** for a list of valid goods.`, "number", { min: 1 }]
        ]
      },
      function (arg) {
        module.exports.sell(user_id, arg[0], good_obj.name);
      },
      function (arg) {
        switch (arg) {
          case "inventory":
            printInventory(user_id);
            return true;

            break;
          case "global market":
          case "world market":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printGlobalMarket(user_id),
              user: game_obj.user
            });
            return true;

            break;
        }
      }) :
      printError(game_obj.id, `You must specify a valid good to buy!`);
  },

  sell: function (arg0_user, arg1_amount, arg2_good_type) {
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
        if (getGoodAmount(user_id, good_name) >= good_amount) {
          var total_cost = 0;

          //Make sure that user has enough market capacity remaining to process the sale
          if (getMarketCapacity(user_id) >= good_amount) {
            //Update user_transactions
            usr.transactions_this_turn += good_amount;

            //Process sale
            for (var i = 0; i < good_amount; i++) {
              var previous_stock = JSON.parse(JSON.stringify(main.market[good_name].stock));

              usr.money += main.market[good_name].sell_price;
              total_cost += main.market[good_name].sell_price;

              main.market[good_name].stock++;

              //Decrease buy/sell price
              main.market[good_name].buy_price =
                main.market[good_name].buy_price*(previous_stock/main.market[good_name].stock);
              main.market[good_name].sell_price =
                main.market[good_name].sell_price*(previous_stock/main.market[good_name].stock);
            }

            main.market[good_name].amount_sold += good_amount;
            modifyGoodAmount(user_id, good_name, good_amount);

            //Update market UI if game_obj.page == "world_market" || "trade"
            if (game_obj.page == "trade")
              printTrade(game_obj.user);
            if (game_obj.page == "world_market")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGlobalMarket(game_obj.user),
                page: main.interfaces[game_obj.middle_embed.id].page - 1,
                user: game_obj.user
              });

            //Print out feedback
            printAlert(game_obj.id, `You sold **${parseNumber(good_amount)}** ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${(good_obj.name) ? good_obj.name : good_name} for **£${parseNumber(total_cost)}**.`);
          } else {
            printError(game_obj.id, `You do not have enough Market Capacity remaining to sell this much **${(good_obj.name) ? good_obj.name : good_name}**! You need at least **${parseNumber(good_amount - getMarketCapacity(user_id))}** remaining Market Capacity in order to fulfil this purchase request.`);
          }
        } else {
          printError(game_obj.id, `You don't have enough **${(good_obj.name) ? good_obj.name : good_name}** to do that! You're **${parseNumber(good_amount - getGoodAmount(user_id, good_name))}** ${(good_obj.name) ? good_obj.name : good_name} short.`);
        }
      } else {
        printError(game_obj.id, `You must specify a valid number of goods to sell!`);
      }
    } else {
      printError(game_obj.id, `The resource you have specified isn't currently being accepted by market vendors! Specify a valid resource for sale.`);
    }
  }
}
