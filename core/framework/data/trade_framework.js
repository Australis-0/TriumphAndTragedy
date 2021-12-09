module.exports = {
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
    return total_used_capacity;
  }
};
