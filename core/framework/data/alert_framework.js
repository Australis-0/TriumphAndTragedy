module.exports = {
  /*
    getAlert() - Returns an alert key/object based on the provided name
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getAlert: function (arg0_alert_name, arg1_options) {
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
          alert_found = [true, (!options.return_key) ? local_alert_category[local_alerts[x]] : local_alerts[x]];
    }

    //Hard-match second
    for (var i = 0; i < all_alert_categories.length; i++) {
      var local_alert_category = config.alerts[all_alert_categories[i]];
      var local_alerts = Object.keys(local_alert_category);

      for (var x = 0; x < local_alerts.length; x++)
        if (local_alerts[x] == alert_name)
          alert_found = [true, (!options.return_key) ? local_alert_category[local_alerts[x]] : local_alerts[x]];
    }

    //Return statement
    return (alert_found[0]) ? alert_found[1] : undefined;
  },

  /*
    getButton() - Returns the button key/object based on the provided name for a specific alert.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getButton: function (arg0_alert_name, arg1_button_name, arg2_options) {
    //Convert from parameters
    var alert_name = arg0_alert_name;
    var button_name = arg1_button_name.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var alert_obj = module.exports.getAlert(alert_name);
    var button_found = [false, ""]; //[button_found, button_obj]

    var all_buttons = Object.keys(alert_obj);

    //Soft-match first
    for (var i = 0; i < all_buttons.length; i++)
      if (all_buttons[i].startsWith("btn_")) {
        var local_btn = alert_obj[all_buttons[i]];
        var local_title = (local_btn.title) ? local_btn.title : all_buttons[i];

        if (local_title.toLowerCase().indexOf(button_name) != -1)
          button_found = [true, (!options.return_key) ? local_btn : all_buttons[i]];
      }

    //Hard-match second
    for (var i = 0; i < all_buttons.length; i++)
      if (all_buttons[i].startsWith("btn_")) {
        var local_btn = alert_obj[all_buttons[i]];
        var local_title = (local_btn.title) ? local_btn.title : all_buttons[i];

        if (local_title.toLowerCase() == button_name)
          button_found = [true, (!options.return_key) ? local_btn : all_buttons[i]];
      }

    //Return statement
    return (button_found[0]) ? button_found[1] : undefined;
  },

  /*
    sendAlert() - Sends an alert to a given user based on the provided key
    options: {
      FROM: "actual_id", - Which user first invoked the alert
      TO: "actual_id" - The recipient user
    }
  */
  sendAlert: function (arg0_user, arg1_alert_name, arg2_options) { //[WIP] - Add localisation API later
    //Convert from parameters
    var user_id = arg0_user;
    var alert_name = arg1_alert_name;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var alert_name = module.exports.getAlert(alert_name, { return_key: true });
    var alert_obj = module.exports.getAlert(alert_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Add to usr.alerts object
    var alert_buttons = [];
    var alert_description = (alert_obj.description) ?
      parseLocalisation(alert_obj.description, { scopes: options }) :
      "";
    var alert_title = (alert_obj.name) ?
      parseLocalisation(alert_obj.name, { scopes: options }) :
      "";
    var has_ai_chance = false;

    //Push buttons to array
    var all_subkeys = Object.keys(alert_obj);

    for (var i = 0; i < all_subkeys.length; i++)
      if (all_subkeys[i].startsWith("btn_")) {
        var button_obj = alert_obj[all_subkeys[i]];

        var button_title = (button_obj.title) ?
          parseLocalisation(button_obj.title, { scopes: options }) :
          all_subkeys[i];

        var push_obj = {
          id: all_subkeys[i],
          name: button_title,

          description: (button_obj.description) ?
            button_obj.description.join("\n• ") :
            `• _This choice currently has no effect._`
        };

        //AI chance
        if (button_obj.ai_chance) {
          has_ai_chance = true;
          push_obj.ai_chance = button_obj.ai_chance;
        }

        //Add effect to push_obj if it exists
        if (button_obj.effect)
          push_obj.effect = button_obj.effect;

        //Push push_obj to alert_buttons
        alert_buttons.push(push_obj);
      }

    //Push alert_obj to usr.alerts
    usr.alerts.push({
      id: alert_name,
      name: alert_title,
      options: options,

      has_ai_chance: has_ai_chance,

      description: alert_description,
      icon: alert_obj.icon,
      image: alert_obj.image,
      thumbnail: alert_obj.thumbnail,

      buttons: alert_buttons,

      //Tracker variables
      date: JSON.parse(JSON.stringify(main.date)),
      round_count: JSON.parse(JSON.stringify(main.round_count)),
      duration: config.defines.common.alert_timeout
    });
  },

  sendEmbedAlert: function (arg0_user, arg1_embed_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var embed_obj = arg1_embed_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Push embed_obj to usr.alerts
    usr.alerts.push({
      news_alert: true,
      embed: embed_obj,

      //Tracker variables
      date: JSON.parse(JSON.stringify(main.date)),
      round_count: JSON.parse(JSON.stringify(main.round_count)),
      duration: config.defines.common.alert_timeout
    });
  }
};
