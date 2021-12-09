module.exports = {
  generateTradeID: function (arg0_user, arg1_receiving_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var other_user = arg1_receiving_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var ot_actual_id = main.global.user_map[other_user];
    var ot_user = main.users[ot_actual_id];
    var usr = main.users[actual_id];

    var local_id_suffix;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var full_id = `${actual_id}-${ot_actual_id}-${local_id_suffix}`;
      local_id_suffix = generateRandomID();

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
    var usr = main.users[user_id];

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
    var usr = main.users[user_id];

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
    var usr = main.users[user_id];

    //Return statement
    return usr.modifiers.shipment_capacity - module.exports.getUsedCapacity(user_id);
  },

  getUsedCapacity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var usr = main.users[user_id];

    var all_exports = Object.keys(usr.trades);
    var total_used_capacity = 0;

    for (var i = 0; i < all_exports.length; i++) {
      var local_trade = usr.trades[all_exports[i]];

      total_used_capacity += local_trade.amount;
    }

    //Return statement
    return total_used_capacity + usr.transactions_this_turn;
  }
};
