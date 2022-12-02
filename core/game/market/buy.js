module.exports = {
  buy: function (arg0_user, arg1_amount, arg2_good_type) {
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
      if (!isBlockaded(user_id)) {
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
            if (good_amount < main.market[good_name].stock) {
              if (good_amount <= 1000) {
                //Check if user has enough market capacity remaining
                if (getMarketCapacity(user_id) - good_amount >= 0) {
                  //Check with stock limitations
                  if (
                    (main.market[good_name].stock < 50) ||
                    (main.market[good_name].stock >= 50 && good_amount <= main.market[good_name].stock*0.2)
                  ) {
                    //Make the purchase now that all checks have been cleared
                    var total_buy_price = 0;

                    usr.transactions_this_turn += good_amount;
                    for (var i = 0; i < good_amount; i++) {
                      var previous_stock = JSON.parse(JSON.stringify(main.market[good_name].stock));

                      usr.money -= main.market[good_name].buy_price;
                      total_buy_price += main.market[good_name].buy_price;
                      usr.inventory[good_name]++;

                      main.market[good_name].stock--;

                      //Increase buy/sell price
                      main.market[good_name].buy_price =
                        main.market[good_name].buy_price*
                        (previous_stock/main.market[good_name].stock);
                      main.market[good_name].sell_price =
                        main.market[good_name].sell_price*
                        (previous_stock/main.market[good_name].stock);
                    }

                    //Increase amount sold
                    main.market[good_name].amount_sold += good_amount;

                    //Update global market UI if page is still on world_market or trade
                    if (game_obj.page == "trade")
                      printTrade(game_obj.user);
                    if (game_obj.page == "world_market")
                      createPageMenu(game_obj.middle_embed, {
                        embed_pages: printGlobalMarket(game_obj.user),
                        page: main.interfaces[game_obj.middle_embed.id].page - 1,
                        user: game_obj.user
                      });

                    //Print out alert
                    printAlert(game_obj.id, `You bought **${parseNumber(good_amount)}** ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${(good_obj.name) ? good_obj.name : good_name} for **£${parseNumber(total_buy_price)}**.`);
                  } else {
                    printError(game_obj.id, `You can only buy up to **20%** of the goods in a large market at once! This equates to about **${parseNumber(Math.floor(main.market[good_name].stock*0.2))}** ${(good_obj.name) ? good_obj.name : good_name}.`);
                  }
                } else {
                  printError(game_obj.id, `You do not have enough Market Capacity remaining to make this purchase! You need at least **${parseNumber(good_amount - getMarketCapacity(user_id))}** remaining Market Capacity in order to fulfil this purchase request.`);
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
      printError(game_obj.id, `**${good_name}** isn't for sale!`);
    }
  },

  initialiseBuy: function (arg0_user, arg1_good_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_good_name = arg1_good_type;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var good_obj = getGood(raw_good_name);

    //Initialise visual prompt
    (good_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Buy ${good_obj.name}:`,
        prompts: [
          [`How much ${(good_obj.icon) ? config.icons[good_obj.icon] + " " : ""}${good_obj.name} would you like to buy?\n\nType **[Inventory]** to view your current inventory.\nType **[World Market]** for a list of valid goods.`, "number", { min: 1 }]
        ]
      },
      function (arg) {
        module.exports.buy(user_id, arg[0], good_obj.name);
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

  initialiseDumbBuy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Buy Goods From The World Market:`,
      prompts: [
        [`What type of good would you like to buy from the World Market?`, "string"],
        [`How much of this material would you like to buy?\n\nType **[Inventory]** to view your current inventory.\nType **[World Market]** for a list of valid goods.`, "number", { min: 1 }]
      ]
    },
    function (arg) {
      module.exports.buy(user_id, arg[1], arg[0]);
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
  }
};
