module.exports = {
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

    //Return statement
    return (modifier_exists[0]) ? modifier_exists[1] : undefined;
  }
};
