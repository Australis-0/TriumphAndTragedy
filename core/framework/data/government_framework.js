module.exports = {
  /*
    getGovernment() - Returns government key/object based on name.
    options: {
      return_anarchy: true/false, - Attempts to fetch a government with the argument is_anarchy
      return_key: true/false - Whether or not to return the government key instead of name
    }
  */
  getGovernment: function (arg0_government_name, arg1_options) {
    //Convert from parameters; initialise options
    var government_name = arg0_government_name;
    var options = (arg1_options) ? arg1_options : {};

    if (typeof government_name == "string")
      government_name = government_name.toLowerCase();
    else {
      options = government_name;
      government_name = "all";
    }


    //Declare local instance variables
    var all_governments = Object.keys(config.governments);
    var government_exists = [false, ""]; //[government_exists, government_value]

    //Soft match first
    for (var i = 0; i < all_governments.length; i++)
      if (all_governments[i].toLowerCase().indexOf(government_name) != -1 || government_name == "all")
        if (
          (options.return_anarchy && config.governments[all_governments[i]].is_anarchy) ||
          (!options.return_anarchy)
        )
          government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];

    //Hard match second
    for (var i = 0; i < all_governments.length; i++)
      if (all_governments[i].toLowerCase() == government_name || government_name == "all")
        if (
          (options.return_anarchy && config.governments[all_governments[i]].is_anarchy) ||
          (!options.return_anarchy)
        )
          government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];

    //Name search
    if (!government_exists[0]) {
      //Soft match
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.name)
          if (local_government.name.toLowerCase().indexOf(government_name) != -1)
            government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];
      }

      //Hard match
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.name)
          if (local_government.name.toLowerCase() == government_name)
            government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];
      }
    }

    //Adjective search
    if (!government_exists[0]) {
      //Soft match
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.adjective)
          if (local_government.adjective.toLowerCase().indexOf(government_name) != -1)
            government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];
      }

      //Hard match
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.adjective)
          if (local_government.adjective.toLowerCase() == government_name)
            government_exists = [true, (!options.return_key) ? config.governments[all_governments[i]] : all_governments[i]];
      }
    }

    //Return statement
    return (government_exists[0]) ? government_exists[1] : undefined;
  },

  /*
    setGovernment() - Sets the government of a user along with the corresponding popularity of the ideology of the new government.
    options: {
      set_party_popularity: 0-100 - What to set the new party's popularity to
    }
  */
  setGovernment: function (arg0_user, arg1_government_type, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var government_type = arg1_government_type;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var anarchy_name = module.exports.getGovernment({
      return_anarchy: true,
      return_key: true
    });
    var usr = main.users[actual_id];
    var game_obj = getGameObject(user_id);
    var government_name = module.exports.getGovernment(government_type, { return_key: true });
    var government_obj = module.exports.getGovernment(government_type);

    //Apply effects
    if (government_obj) {
      var all_government_keys = Object.keys(government_obj.effect);

      //Set usr.government
      usr.politics[anarchy_name].popularity = 0;
      usr.government = government_name;

      //Go through .options field
      if (options.set_party_popularity)
        usr.politics[government_name].popularity = options.set_party_popularity;

      //Delete current tax keys for all classes
      {
        for (var i = 0; i < lookup.all_pop_classes.length; i++) {
          var local_class = lookup.all_pop_classes[i];

          delete usr.modifiers[`max_${local_class}_duties_tax`];
          delete usr.modifiers[`max_${local_class}_income_tax`];
        }
      }

      //Loop through all keys and values
      for (var i = 0; i < all_government_keys.length; i++) {
        var local_value = government_obj.effect[all_government_keys[i]];

        if (all_government_keys[i] == "civilian_actions") {
          usr.modifiers.civilian_actions = local_value;
        } if (all_government_keys[i].endsWith("_tax_rate")) { //Class taxes
          var new_key = all_government_keys[i].replace("_tax_rate", "_max_tax")
            .replace("maximum_", "");

          usr.modifiers[new_key] = local_value;
        } if (all_government_keys[i] == "maximum_manpower") {
          usr.modifiers.maximum_manpower = local_value;
        } if (all_government_keys[i] == "maximum_tax_rate") {
          usr.modifiers.max_tax = local_value;
        }
      }

    } else {
      log.error(`A government of type ${government_type} could not be found whilst trying to set the government of ${usr.name}!`);
    }
  }
};
