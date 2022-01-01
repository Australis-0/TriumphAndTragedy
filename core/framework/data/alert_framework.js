module.exports = {
  /*
    findAlert() - Returns an alert key/object based on the provided name
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  findAlert: function (arg0_alert_name, arg1_options) {
    //Convert from parameters
    var alert_name = arg0_alert_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var alert_found = [false, ""]; //[alert_found, alert_obj];
    var all_alert_categories = Object.keys(config.alerts);

    //Soft-match first
    for (var i = 0; i < all_alert_categories.length; i++) {
      var local_alert_category = config.alerts[all_alert_categories[i]];
      var local_alerts = Object.keys(local_alert_category);

      for (var x = 0; x < local_alerts.length; x++)
        if (local_alerts[x].indexOf(alert_name) != -1)
          alert_found = [true, (!options.return_key) ? lcoal_alert_category[local_alerts[x]] : local_alerts[x]];
    }

    //Hard-match first
    for (var i = 0; i < all_alert_categories.length; i++) {
      var local_alert_category = config.alerts[all_alert_categories[i]];
      var local_alerts = Object.keys(local_alert_category);

      for (var x = 0; x < local_alerts.length; x++)
        if (local_alerts[x] == alert_name)
          alert_found = [true, (!options.return_key) ? lcoal_alert_category[local_alerts[x]] : local_alerts[x]];
    }
  },

  /*
    printAlert() - Prints an alert to a given user based on the provided key
    options: {
      from: "actual_id", - Which user first invoked the alert
      to: "actual_id" - The recipient user
    }
  */
  printAlert: function (arg0_user, arg1_alert_name, arg2_options) { //[WIP] - Add localisation API later
    //Convert from parameters
    var user_id = arg0_user;
    var alert_name = arg1_alert_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var alert_obj = module.exports.findAlert(alert_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Add to usr.alerts object

  }
};
