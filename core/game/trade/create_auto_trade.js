module.exports = {
  createAutoTrade: function (arg0_user, arg1_receiving_user, arg2_amount, arg3_good_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var other_user = arg1_receiving_user;
    var raw_amount = parseInt(Math.ceil(arg2_amount));
    var raw_good_name = arg3_good_type.toLowerCase();
    var good_name = getGood(arg3_good_type, { return_key: true });
    var good_obj = getGood(arg3_good_type);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var ot_actual_id = main.global.user_map[other_user];
    var ot_user = main.users[ot_actual_id];
    var trade_display_whitelist = [];
    var trade_whitelist = getTradeWhitelist(user_id);
    var usr = main.users[actual_id];

    //Render trade_display_whitelist
    for (var i = 0; i < trade_whitelist.length; i++)
      trade_display_whitelist.push(`**${main.users[trade_whitelist[i]].name}**`);

    //Make sure that the other user exists to begin with
    if (ot_user) {
      if (ot_actual_id != actual_id) {
        if (good_obj || raw_good_name == "money") {
          if (!good_obj.research_good) {
            if (!good_obj.doesnt_stack) {
              if (!isNaN(raw_amount)) {
                if (raw_amount > 0) {
                  if (!isBlockaded(actual_id)) {
                    if (!isBlockaded(ot_actual_id)) {
                      if (trade_whitelist.includes(ot_actual_id)) {
                        //This is referred to twice to make sure we can get the name of the key later on
                        var auto_trade_id = generateAutoTradeID(user_id);

                        usr.auto_trades[auto_trade_id] = {
                          id: auto_trade_id,

                          exporter: actual_id,
                          target: ot_actual_id,

                          amount: raw_amount,
                          good_type: (raw_good_name == "money") ?
                            "money" :
                            good_name
                        };

                        //Update auto trade UI if game_obj.page is still on auto_trades
                        if (game_obj.page == "auto_trades")
                          createPageMenu(game_obj.middle_embed, {
                            embed_pages: printAutoTrades(game_obj.user),
                            user: game_obj.user
                          });

                        //Print alert
                        printAlert(game_obj.id, `You have begun shipping out **${parseNumber(raw_amount)}** ${(good_obj.name) ? good_obj.name : "money"} per turn to the country of **${ot_user.name}**.`);
                      } else {
                        printError(game_obj.id, `Our trade is currently being steered by the following countries! We are only allowed to trade with them.\n\n- ${trade_display_whitelist.join("\n- ")}`);
                      }
                    } else {
                      printError(game_obj.id, `You can't ship items to other blockaded users!`);
                    }
                  } else {
                    printError(game_obj.id, `You can't conduct auto-trades whilst blockaded!`);
                  }
                } else if (raw_amount == 0) {
                  printError(game_obj.id, `Why did you even try to set up an auto-trade ...`);
                } else {
                  printError(game_obj.id, `You can't steal items from other players like that!`);
                }
              } else {
                printError(game_obj.id, `You must ship valid numeric amounts of goods to other countries!`);
              }
            } else {
              printError(game_obj.id, `You can't ship non-stackable goods to other countries!`);
            }
          } else {
            printError(game_obj.id, `You can't ship Knowledge to other countries!`);
          }
        } else {
          printError(game_obj.id, `You can only ship inventory items or money to other countries!`);
        }
      } else {
        printError(game_obj.id, `You can't conduct auto-trades with yourself!`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to ship items to doesn't even exist!`);
    }
  },

  initialiseCreateAutoTrade: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Create Auto Trade:`,
      prompts: [
        [`Which country would you like to conduct an auto-trade with?`, "mention"],
        [`What type of resource would you like to send?\n\nType **[Inventory]** for a list of valid resources, or 'money' to send money.`, "string"],
        [`How much of this resource would you like to send per turn?`, "number", { min: 1 }]
      ]
    },
    function (arg) {
      module.exports.createAutoTrade(user_id, arg[0], arg[2], arg[1]);
    },
    function (arg) {
      switch (arg) {
        case "inventory":
          printInventory(user_id);
          return true;

          break;
      }
    });
  }
};
