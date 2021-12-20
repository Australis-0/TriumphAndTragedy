module.exports = {
  applyModifiers: function (arg0_user, arg1_scope) {
    //Convert from parameters
    var user_id = arg0_user;
    var modifiers = arg1_scope;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_modifiers = Object.keys(modifiers);
    var usr = main.users[user_id];

    //Begin parsing
    for (var i = 0; i < all_modifiers.length; i++)
      //Check if the modifier in question actually exists before incrementing
      if (usr.modifiers[all_modifiers[i]])
        usr.modifiers[all_modifiers[i]] += modifiers[all_modifiers[i]];
  },

  /*
    Returns either an object or key list of all available modifiers.
    options: {
      return_names: true/false - Whether or not to return modifier keys instead of objects
    }
  */
  getAllModifiers: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var modifier_dump = [];

    //Iterate through all modifier keys, 1st layer
    var all_modifiers = Object.keys(config.modifiers);

    for (var i = 0; i < all_modifiers.length; i++) {
      var local_modifier = config.modifiers[all_modifiers[i]];
      //Push base modifier
      (!options.return_names) ?
        modifier_dump.push(local_modifier) :
        modifier_dump.push(all_modifiers[i]);

      //Iterate over all submodifier keys if they exist (2nd layer)
      var all_modifier_keys = Object.keys(local_modifier);

      for (var x = 0; x < all_modifier_keys.length; x++)
        if (all_modifier_keys[x].startsWith("create_modifier_"))
          (!options.return_names) ?
            modifier_dump.push(local_modifier[all_modifier_keys[x]]) :
            modifier_dump.push(all_modifier_keys[x]);
    }

    //Return statement
    return modifier_dump;
  },

  /*
    getModifier() - Gets either the modifier object or key.
    options: {
      return_key: true/false - Whether or not to return the modifier key
    }
  */
  getModifier: function (arg0_modifier_name, arg1_options) {
    //Convert from parameters
    var modifier_name = arg0_modifier_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_modifiers = Object.keys(config.modifiers);
    var modifier_exists = [false, ""]; //[modifier_exists, modifier_key/object]

    //1st-level Modifier processing
    {
      {
        //Key, soft match
        for (var i = 0; i < all_modifiers.length; i++)
          if (all_modifiers[i].toLowerCase().indexOf(modifier_name) != -1)
            modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];

        //Key, hard match
        for (var i = 0; i < all_modifiers.length; i++)
          if (all_modifiers[i].toLowerCase() == modifier_name)
            modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
      }

      if (!modifier_exists[0]) {
        //Name, soft match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];

          if (local_modifier.name)
            if (local_modifier.name.toLowerCase().indexOf(modifier_name) != -1)
              modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
        }

        //Name, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];

          if (local_modifier.name)
            if (local_modifier.name.toLowerCase() == modifier_name)
              modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
        }
      }
    }

    //2nd-level Submodifier processing
    {
      {
        //Key, soft match
        if (!modifier_exists[0])
          for (var i = 0; i < all_modifiers.length; i++) {
            var local_modifier = config.modifiers[all_modifiers[i]];
            var local_modifier_keys = Object.keys(local_modifier);

            for (var x = 0; x < local_modifier_keys.length; x++)
              if (local_modifier_keys[x].startsWith("create_modifier_"))
                if (local_modifier_keys[x].replace("create_modifier_", "").indexOf(modifier_name) != -1)
                  modifier_exists = [true, (!options.return_key) ? local_modifier[local_modifier_keys[x]] : local_modifier_keys[x]];
          }

        //Key, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++)
            if (local_modifier_keys[x].startsWith("create_modifier_"))
              if (local_modifier_keys[x].replace("create_modifier_", "") == modifier_name)
                modifier_exists = [true, (!options.return_key) ? local_modifier[local_modifier_keys[x]] : local_modifier_keys[x]];
        }
      }

      //Name, soft match
      if (!modifier_exists[0]) {
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++) {
            if (local_modifier_keys[x].startsWith("create_modifier_")) {
              var local_submodifier = local_modifier[local_modifier_keys[x]];

              if (local_submodifier.name.indexOf(modifier_name) != -1)
                modifier_exists = [true, (!options.return_key) ? local_submodifier : local_modifier_keys[x]];
            }
          }
        }

        //Name, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++) {
            if (local_modifier_keys[x].startsWith("create_modifier_")) {
              var local_submodifier = local_modifier[local_modifier_keys[x]];

              if (local_submodifier.name.toLowerCase() == modifier_name)
                modifier_exists = [true, (!options.return_key) ? local_submodifier : local_modifier_keys[x]];
            }
          }
        }
      }
    }

    //Return statement
    return (modifier_exists[0]) ? modifier_exists[1] : undefined;
  }
};
