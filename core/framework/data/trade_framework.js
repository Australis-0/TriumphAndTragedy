module.exports = {
  generateAutoTradeID: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!usr.auto_trades[local_id]) {
        return local_id;
        break;
      }
    }
  },

  generateTradeID: function (arg0_user, arg1_receiving_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_receiving_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var ot_user_actual_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[ot_user_actual_id];
    var usr = main.users[actual_id];

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id_suffix = generateRandomID();

      var full_id = `${actual_id}-${ot_user_actual_id}-${local_id_suffix}`;

      //Return and break once a true ID is found
      if (!usr.trades[full_id]) {
        return full_id;
        break;
      }
    }
  },

  getImports: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_users = Object.keys(main.users);
    var import_list = [];

    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      var local_trades = Object.keys(local_user.trades);

      for (var x = 0; x < local_trades.length; x++) {
        var local_trade = local_user.trades[local_trades[x]];

        if (local_trade.target == user_id)
          import_list.push(local_trade);
      }
    }

    //Return statement
    return import_list;
  },

  getMarketCapacity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return Math.ceil(
      (usr.modifiers.shipment_capacity*usr.modifiers.maximum_transaction_amount) -
      usr.transactions_this_turn
    );
  },

  getShipmentCapacity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return usr.modifiers.shipment_capacity - module.exports.getUsedCapacity(user_id);
  },

  getSyphonedActions: function (arg0_user, arg1_actions) {
    //Convert from parameters
    var user_id = arg0_user;
    var actions = (arg1_actions) ? JSON.parse(JSON.stringify(arg1_actions)) : undefined;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var syphoned_actions = 0;
    var usr = main.users[actual_id];

    var all_cooldowns = Object.keys(usr.cooldowns);

    //Define actions
    if (!actions)
      actions = JSON.parse(JSON.stringify(usr.actions));

    //Iterate over all cooldowns

    for (var i = 0; i < all_cooldowns.length; i++)
      if (all_cooldowns[i].includes("syphon_actions")) {
        var local_cooldown = usr.cooldowns[all_cooldowns[i]];

        var actions_taken = Math.ceil(Math.max(
          actions*local_cooldown.percentage_amount,
          Math.min(actions, local_cooldown.amount)
        ));

        actions -= actions_taken;
        syphoned_actions += actions_taken;
      }

    //Return statement
    return syphoned_actions;
  },

  getTradeWhitelist: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Check cooldowns
    var all_cooldowns = Object.keys(usr.cooldowns);
    var all_users = Object.keys(main.users);
    var trade_whitelist = (all_cooldowns.indexOf("steer_trade") != -1) ?
      [] : all_users;

    //Check if trade is being steered by someone
    for (var i = 0; i < all_cooldowns.length; i++)
      if (all_cooldowns[i].includes("steer_trade"))
        trade_whitelist.push(usr.cooldowns[all_cooldowns[i]].overlord);

    //Return statement
    return trade_whitelist;
  },

  getUsedCapacity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_exports = Object.keys(usr.trades);
    var total_used_capacity = 0;

    for (var i = 0; i < all_exports.length; i++) {
      var local_trade = usr.trades[all_exports[i]];

      if (local_trade.good_type != "money")
        total_used_capacity += local_trade.amount;
    }

    //Return statement
    return total_used_capacity + usr.transactions_this_turn;
  }
};
