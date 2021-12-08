module.exports = {
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
  }
};
