module.exports = {
  /*
    getEvent() - Returns an event key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getEvent: function (arg0_event_name, arg1_options) {
    //Convert from parameters
    var event_name = arg0_event_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_event_categories = Object.keys(config.events);
    var event_found = [false, ""]; //[event_found, event_obj];

    //Soft-match first
    for (var i = 0; i < all_event_categories.length; i++) {
      var local_event_category = config.events[all_event_categories[i]];
      var local_events = Object.keys(local_event_category);

      for (var x = 0; x < local_events.length; x++)
        if (local_events[x].indexOf(event_name) != -1)
          event_found = [true, (!options.return_key) ? local_event_category[local_events[x]] : local_events[x]];
    }

    //Hard-match second
    for (var i = 0; i < all_event_categories.length; i++) {
      var local_event_category = config.events[all_event_categories[i]];
      var local_events = Object.keys(local_event_category);

      for (var x = 0; x < local_events.length; x++)
        if (local_events[x] == event_name)
          event_found = [true, (!options.return_key) ? local_event_category[local_events[x]] : local_events[x]];
    }

    //Return statement
    return (event_found[0]) ? event_found[1] : undefined;
  },

  /*
    getEvents() - Returns an array of keys/objects.
    options: {
      return_names: true/false - Whether or not to return the keys of the individual events
    }
  */
  getEvents: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_events = [];
    var all_event_categories = Object.keys(config.events);

    //Iterate over all categories and events in them
    for (var i = 0; i < all_event_categories.length; i++) {
      var local_event_category = config.events[all_event_categories[i]];
      var local_events = Object.keys(local_event_category);

      for (var x = 0; x < local_events.length; x++)
        all_events.push((!options.return_names) ? local_event_category[local_events[x]] : local_events[x]);
    }

    //Return statement
    return all_events;
  },

  /*
    getOption() - Returns the option key/object based on the provided name for a specific alert.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getOption: function (arg0_event_name, arg1_option_name, arg2_options) {
    //Convert from parameters
    var event_name = arg0_event_name;
    var option_name = arg1_option_name.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var option_found = [false, ""]; //[option_found, event_obj]
    var event_obj = module.exports.getEvent(event_name);

    var all_options = Object.keys(event_obj);

    //Key match first
    if (event_obj[option_name])
      //1st Return statement
      return event_obj[option_name];

    if (!option_found[0]) {
      //Soft-match first
      for (var i = 0; i < all_options.length; i++)
        if (all_options[i].startsWith("option_")) {
          var local_option = event_obj[all_options[i]];
          var local_title = (local_option.title) ? local_option.title : all_options[i];

          if (local_title.toLowerCase().indexOf(option_name) != -1)
            option_found = [true, (!options.return_key) ? local_option : all_options[i]];
        }

      //Hard-match second
      for (var i = 0; i < all_options.length; i++)
        if (all_options[i].startsWith("option_")) {
          var local_option = event_obj[all_options[i]];
          var local_title = (local_option.title) ? local_option.title : all_options[i];

          if (local_title.toLowerCase() == option_name)
            option_found = [true, (!options.return_key) ? local_option : all_options[i]];
        }
    }

    //2nd Return statement
    return (option_found[0]) ? option_found[1] : undefined;
  },

  /*
    sendEvent() - Sends an event to a given user based on the provided key.
    options: {
      FROM: "actual_id", - Which user first invoked the event
      TO: "actual_id" - The recipient user
    }
  */
  sendEvent: function (arg0_user, arg1_event_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var event_name = arg1_event_name;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var event_name = module.exports.getEvent(event_name, { return_key: true });
    var event_obj = module.exports.getEvent(event_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Add to usr.events object
    var event_options = [];
    var event_description = (event_obj.description) ?
      parseLocalisation(event_obj.description, { scopes: options }) :
      "";
    var event_title = (event_obj.name) ?
      parseLocalisation(event_obj.name, { scopes: options }) :
      "";
    var has_ai_chance = false;

    //Push options to array
    var all_subkeys = Object.keys(event_obj);

    for (var i = 0; i < all_subkeys.length; i++)
      if (all_subkeys[i].startsWith("option_")) {
        var option_obj = event_obj[all_subkeys[i]];
        var option_title = (option_obj.title) ?
          parseLocalisation(option_obj.title, { scopes: options }) :
          all_subkeys[i];

        var push_obj = {
          id: all_subkeys[i],
          name: option_title,

          description: (option_obj.description) ?
          option_obj.description.join("\n• ") :
          `• _This choice currently has no effect._`
        };

        //AI chance
        if (option_obj.ai_chance) {
          has_ai_chance = true;
          push_obj.ai_chance = option_obj.ai_chance;
        }

        //Add effect to push_obj if it exists
        if (option_obj.effect)
          push_obj.effect = option_obj.effect;

        //Push push_obj to event_options
        event_options.push(push_obj);
      }

    //Push event_obj to usr.events
    usr.events.push({
      id: event_name,
      name: event_title,
      scopes: options,

      has_ai_chance: has_ai_chance,

      description: event_description,
      icon: event_obj.icon,
      image: event_obj.image,
      thumbnail: event_obj.thumbnail,

      options: event_options,

      //Tracker variables
      date: JSON.parse(JSON.stringify(main.date)),
      round_count: JSON.parse(JSON.stringify(main.round_count)),
      duration: config.defines.common.event_timeout
    });
  }
};
