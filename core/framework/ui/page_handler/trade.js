module.exports = {
  pageHandlerTrade: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Trade handler
    switch (game_obj.page) {
      case "auto_trades":
        //Button Handler
        //[Back]
        if (input == "back") {
          game_obj.page = "trade";
          printTrade(user_id);
        }

        //[Cancel Auto Trade]
        if (["cancel auto trade", "cancel auto-trade"].includes(input))
          initialiseCancelAutoTrade(user_id);

        //[Create Auto Trade]
        if (["create auto trade", "create auto-trade"].includes(input))
          initialiseCreateAutoTrade(user_id);

        break;
      case "exports":
        //Button Handler
        //[Back]
        if (input == "back") {
          game_obj.page = "back";
          printTrade(user_id);
        }

        break;
      case "imports":
        //Button Handler
        //[Back]
        if (input == "back") {
          game_obj.page = "back";
          printTrade(user_id);
        }

        break;
      case "world_market":
        //Button Handler
        //[Back]
        if (input == "back") {
          game_obj.page = "trade";
          printTrade(user_id);
        }

        //[Buy (Good)]
        if (input.startsWith("buy ")) {
          var good_name = input.trim().replace("buy ", "");

          initialiseBuy(user_id, good_name);
        } else if (input == "buy") {
          initialiseDumbBuy(user_id);
        }

        //[Jump To Page]
        if (input == "jump to page")
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like jump to?`, "number", { min: 1, max: printGlobalMarket(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printGlobalMarket(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            });
          });

        //[Sell (Good)]
        if (input.startsWith("sell ")) {
          var good_name = input.trim().replace("sell ", "");

          initialiseSell(user_id, good_name);
        } else if (input == "sell") {
          initialiseDumbSell(user_id);
        }

        break;

      //Default handler for main trade tab
      default:
        if (trade_pages.includes(game_obj.page)) {
          if (game_obj.page == "trade") {
            //Button Handler
            //[Buy (Good)]
            if (input.startsWith("buy ")) {
              var good_name = input.trim().replace("buy ", "");

              initialiseBuy(user_id, good_name);
            } else if (input == "buy") {
              initialiseDumbBuy(user_id);
            }

            //[Export List]
            if (input == "export list") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printExports(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "exports";
            }

            //[Give]
            if (["give", "transfer", "transfer goods"].includes(input))
              initialiseGive(user_id);

            //[Import List]
            if (input == "import list") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printImports(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "imports";
            }

            //[Manage Auto-Trades]
            if (["auto-trades", "autotrades", "manage auto-trades", "manage autotrades", "manage auto trades"].includes(input)) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printAutoTrades(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "auto_trades";
            }

            //[Sell (Good)]
            if (input.startsWith("sell ")) {
              var good_name = input.trim().replace("sell ", "");

              initialiseSell(user_id, good_name);
            } else if (input == "sell") {
              initialiseDumbSell(user_id);
            }

            //[World Market]
            if (["global market", "world market"].includes(input)) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGlobalMarket(user_id),
                user: game_obj.user
              });
              game_obj.page = "world_market";
            }
          }
        }

        break;
    }
  }
};