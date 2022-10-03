module.exports = {
  printAutoTrades: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise auto_trade_string
    var all_auto_trades = Object.keys(usr.auto_trades);
    var auto_trade_prefix_string = [];
    var auto_trade_string = [];

    auto_trade_prefix_string.push(`**[Back]**`);
    auto_trade_prefix_string.push("");
    auto_trade_prefix_string.push(`${config.icons.taxes} **Auto-Trades** are shipments of goods that occur automatically from your nation to another country. These goods are shipped out once per turn.`);
    auto_trade_prefix_string.push("");
    auto_trade_prefix_string.push(` **[Cancel Auto Trade]** | **[Create Auto Trade]**`);
    auto_trade_prefix_string.push("");
    auto_trade_prefix_string.push(config.localisation.divider);
    auto_trade_prefix_string.push("");

    //Dynamically print out auto-trades
    if (all_auto_trades.length > 0) {
      for (var i = 0; i < all_auto_trades.length; i++) {
        var local_auto_trade = usr.auto_trades[all_auto_trades[i]];
        var local_good_icon = (local_auto_trade.good_type == "money") ?
          config.icons.money + " " :
          (getGood(local_auto_trade.good_type)) ?
            config.icons[getGood(local_auto_trade.good_type).icon] + " " :
            "";
        var local_good_name = (getGood(local_auto_trade.good_type)) ?
          (getGood(local_auto_trade.good_type)) ?
            getGood(local_auto_trade.good_type).name :
            local_auto_trade.good_type :
          local_auto_trade.good_type;

        //Format string
        auto_trade_string.push(`#**${local_auto_trade.id}**. Exporting ${local_good_icon}${parseNumber(local_auto_trade.amount)} ${local_good_name} to **${main.users[local_auto_trade.target].name}** each turn.`);
      }
    } else {
      auto_trade_string.push(`_You currently have no ongoing auto-trades._`);
    }

    //Return statement
    return splitEmbed(auto_trade_string, {
      title: "[Back] | Auto-Trades:",
      description: auto_trade_prefix_string,
      title_pages: true,
      fixed_width: true
    });
  },

  printExports: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initailise export_string
    var all_exports = Object.keys(usr.trades);
    var export_string = [];

    for (var i = 0; i < all_exports.length; i++) {
      var local_export = usr.trades[all_exports[i]];
      var local_good_icon = (local_export == "money") ?
        config.icons.money + " " :
        (getGood(local_export.good_type)) ?
          config.icons[getGood(local_export).icon] + " " :
          "";
      var local_good_name = (getGood(local_export)) ?
        (getGood(local_export.good_type)) ?
          getGood(local_export).name :
          local_export :
        local_export;

      export_string.push(`Exporting ${local_good_icon}${parseNumber(local_export.amount)} ${local_good_name} to **${main.users[local_export.target].name}**.\nThe shipment will arrive in **${parseNumber(local_export.duration)}** turn(s).`);
    }

    if (all_exports.length == 0)
      export_string.push(`_You have no outgoing exports._`);

    //Return statement
    return splitEmbed(export_string, {
      title: "[Back] | Exports:",
      title_pages: true,
      fixed_width: true
    });
  },

  printImports: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initailise import_string
    var import_string = [];

    //Format import_string
    var all_imports = getImports(actual_id);

    for (var i = 0; i < all_imports.length; i++) {
      var local_good_icon = (all_imports[i] == "money") ?
        config.icons.money + " " :
        (getGood(all_imports[i].good_type)) ?
          config.icons[getGood(all_imports[i]).icon] + " " :
          "";
      var local_good_name = (getGood(all_imports[i].good_type)) ?
        (getGood(all_imports[i].good_type)) ?
          getGood(all_imports[i].good_type).name :
          all_imports[i].good_type :
        all_imports[i].good_type;

      import_string.push(`Importing ${local_good_icon}${parseNumber(all_imports[i].amount)} ${local_good_name} from **${main.users[all_imports[i].exporter].name}**.\nThe shipment will arrive in **${parseNumber(all_imports[i].duration)}** turn(s).`);
    }

    if (all_imports.length == 0)
      import_string.push(`_You have no incoming imports._`);

    //Return statement
    return splitEmbed(import_string, {
      title: "[Back] | Imports:",
      title_pages: true,
      fixed_width: true
    });
  },

  printTrade: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise trade_string, import_string, export_string and market_string, with the latter being separate fields of the embed.
    var export_string = [];
    var import_string = [];
    var market_string = [];
    var trade_string = [];

    //Format trade_string
    var all_exports = Object.keys(usr.trades);
    var all_market_goods = Object.keys(main.market);
    var local_imports = getImports(actual_id);
    var number_of_autotrades = Object.keys(usr.auto_trades).length;
    var capacity_used = getUsedCapacity(actual_id);

    trade_string.push(`**Travel Modifiers:**`);
    trade_string.push("");

    if (isBlockaded(actual_id)) {
      trade_string.push(`${config.icons.blockade} **You are currently blockaded!**`);
      trade_string.push(`Being blockaded means you won't be able to ship or receive goods anymore. You can challenge this blockade by building up a naval fleet.`);
      trade_string.push("");
    }

    trade_string.push(`Base travel time: **${parseNumber(Math.ceil(config.defines.combat.base_transfer_time*usr.modifiers.shipment_time))}** turn(s).`);
    trade_string.push(`Current travel speed: **${parseNumber(Math.ceil(config.defines.combat.shipment_time/usr.modifiers.shipment_time))}** province(s) a turn.`);
    trade_string.push(`Shipment capacity: **${parseNumber(capacity_used)}** out of **${parseNumber(usr.modifiers.shipment_capacity)}** currently in use.`);
    trade_string.push(`- Shipment Time Modifier: **${printPercentage(usr.modifiers.shipment_time)}**`);

    //Import/Export list
    trade_string.push(config.localisation.divider);
    trade_string.push(`**Imports/Exports:** | **[Transfer Goods]**`);
    trade_string.push("");

    (number_of_autotrades > 0) ?
      trade_string.push(`You currently have **${parseNumber(number_of_autotrades)}** ongoing auto-trades. **[Manage Auto-Trades]**`) :
      trade_string.push(`_You currently have no ongoing autotrades._ In order to access the Auto Trade UI, type **[Manage Auto-Trades]**.`);

    (local_imports.length > 0) ?
      import_string.push(`You currently have **${parseNumber(local_imports.length)}** imports in transfer.`) :
      import_string.push(`_You have no incoming imports._`);

    import_string.push("");

    //Print imports; may only print up to 10 imports
    for (var i = 0; i < local_imports.length; i++)
      if (i <= 5) {
        var actual_exporter_id = main.global.user_map[local_imports[i].exporter];
        var local_good_icon = (local_imports[i].good_type == "money") ?
          config.icons.money + " " :
          (getGood(local_imports[i].good_type)) ?
            config.icons[getGood(local_imports[i].good_type).icon] + " " :
            "";
        var local_good_name = (getGood(local_imports[i].good_type)) ?
          (getGood(local_imports[i].good_type)) ?
            getGood(local_imports[i].good_type).name :
            local_imports[i].good_type :
          local_imports[i].good_type;

        import_string.push(`Importing ${local_good_icon}${parseNumber(local_imports[i].amount)} ${local_good_name} from **${main.users[actual_exporter_id].name}**.\nThe shipment will arrive in **${parseNumber(local_imports[i].duration)}** turn(s).`);
      }

    if (local_imports.length > 5)
      import_string.push(`+${parseNumber(local_imports.length-10)} more ...`);

    //Print exports; may only print up to 10 exports

    (all_exports.length > 0) ?
      export_string.push(`You currently have **${all_exports.length}** exports in transfer.`) :
      export_string.push(`_You have no outgoing exports._`);

    for (var i = 0; i < all_exports.length; i++)
      if (i <= 5) {
        var local_export = usr.trades[all_exports[i]];
        var local_good_icon = (local_export.good_type == "money") ?
          config.icons.money + " " :
          (getGood(local_export.good_type)) ?
            config.icons[getGood(local_export.good_type).icon] + " " :
            "";
        var local_good_name = (getGood(local_export.good_type)) ?
          (getGood(local_export.good_type)) ?
            getGood(local_export.good_type).name :
            local_export.good_type :
          local_export.good_type;

        var actual_target_id = main.global.user_map[local_export.target];

        export_string.push(`Exporting ${local_good_icon}${parseNumber(local_export.amount)} ${local_good_name} to **${main.users[actual_target_id].name}**.\nThe shipment will arrive in **${parseNumber(local_export.duration)}** turn(s).`);
      }

    if (all_exports.length > 5)
      export_string.push(`+${parseNumber(all_exports.length-10)} more ...`);

    //World Market
    market_string.push(config.localisation.divider);
    market_string.push("");

    //Enter entries
    for (var i = 0; i < all_market_goods.length; i++)
      if (i <= 5) {
        var local_good = getGood(all_market_goods[i]);
        var local_market_good = main.market[all_market_goods[i]];

        var local_good_icon = (local_good.icon) ?
          config.icons[local_good.icon] + " " :
          "";
        var local_good_name = (local_good.name) ?
          local_good.name :
          all_market_goods[i];

        market_string.push(`${local_good_icon} - ${local_good_name} (**${parseNumber(local_market_good.stock)}** in stock): Buy Price: £${parseNumber(local_market_good.buy_price)} | Sell Price: £${parseNumber(local_market_good.sell_price)}`);
        market_string.push(`- **[Buy ${local_good_name}]** | **[Sell ${local_good_name}]**`);
      }

    if (all_market_goods.length > 10)
      market_string.push(`+${parseNumber(all_market_goods.length-10)} more ...`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const trade_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Trade:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(trade_string.join("\n"))
      .addFields(
        {
          name: `${config.icons.taxes} **[Import List]**:`,
          value: truncateString(import_string.join("\n"), 900),
          inline: true
        },
        {
          name: `${config.icons.trade} **[Export List]**:`,
          value: truncateString(export_string.join("\n"), 900),
          inline: true
        },
        {
          name: `**[World Market]**:`,
          value: market_string.join("\n")
        }
      );

    //Return statement
    game_obj.main_embed = trade_embed;
    game_obj.main_change = true;
  }
};
