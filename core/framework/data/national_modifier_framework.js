module.exports = {
  generateNationalModifierID: function (arg0_user) {
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
      if (!usr.national_modifiers[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    getNationalModifier() - Returns a national modifier key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getNationalModifier: function (arg0_national_modifier_name, arg1_options) {
    //Convert from parameters
    var national_modifier_name = arg0_national_modifier_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_national_modifier_categories = Object.keys(config.national_modifiers);
    var national_modifier_found = [false, ""]; //[national_modifier_found, national_modifier_obj];

    //Soft-match first
    for (var i = 0; i < all_national_modifier_categories.length; i++) {
      var local_national_modifier_category = config.national_modifiers[all_national_modifier_categories[i]];
      var local_national_modifiers = Object.keys(local_national_modifier_category);

      for (var x = 0; x < local_national_modifiers.length; x++)
        if (local_national_modifiers[x].indexOf(national_modifier_name) != -1)
          national_modifier_found = [true, (!options.return_key) ? local_national_modifier_category[local_national_modifiers[x]] : local_national_modifiers[x]];
    }

    //Hard-match second
    for (var i = 0; i < all_national_modifier_categories.length; i++) {
      var local_national_modifier_category = config.national_modifiers[all_national_modifier_categories[i]];
      var local_national_modifiers = Object.keys(local_national_modifier_category);

      for (var x = 0; x < local_national_modifiers.length; x++)
        if (local_national_modifiers[x] == national_modifier_name)
          national_modifier_found = [true, (!options.return_key) ? local_national_modifier_category[local_national_modifiers[x]] : local_national_modifiers[x]];
    }

    //Return statement
    return (national_modifier_found[0]) ? national_modifier_found[1] : undefined;
  },

  /*
    getNationalModifiers() - Returns an array of keys/objects.
    options: {
      return_names: true/false - Whether or not to return the keys of the individual national modifiers
    }
  */
  getNationalModifiers: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_national_modifiers = [];
    var all_national_modifier_categories = Object.keys(config.national_modifiers);

    //Iterate over all categories and events in them
    for (var i = 0; i < all_national_modifier_categories.length; i++) {
      var local_national_modifier_category = config.national_modifiers[all_national_modifier_categories[i]];
      var local_national_modifiers = Object.keys(local_national_modifier_category);

      for (var x = 0; x < local_national_modifiers.length; x++)
        all_national_modifiers.push((!options.return_names) ? local_national_modifier_category[local_national_modifiers[x]] : local_national_modifiers[x]);
    }

    //Return statement
    return all_national_modifiers;
  },

  processNationalModifiers: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var national_modifier_names = lookup.all_national_modifier_names;
    var national_modifiers = lookup.all_national_modifiers;
    var usr = main.users[user_id];

    //Iterate over all national modifiers and check triggers
    for (var i = 0; i < national_modifiers.length; i++)
      if (national_modifiers[i].trigger)
        if (national_modifiers[i].trigger(usr)) {
          //Declare modifier object
          var modifiers = (national_modifiers[i].effect) ?
            national_modifiers[i].effect(usr) :
            {};

          //Check for static modifiers
          if (national_modifiers[i].modifiers) {
            var all_modifiers = Object.keys(national_modifiers[i].modifiers);

            for (var x = 0; x < all_modifiers.length; x++)
              modifiers[all_modifiers[x]] = (modifiers[all_modifiers[x]]) ?
                modifiers[all_modifiers[x]] + national_modifiers[i].modifiers[all_modifiers[x]] :
                national_modifiers[i].modifiers[all_modifiers[x]];
          }

          //Set national modifier
          module.exports.setNationalModifier(actual_id, national_modifier_names[i], {
            name: national_modifiers[i].name,
            image: national_modifiers[i].image,
            icon: national_modifiers[i].icon,
            description: national_modifiers[i].description,

            modifiers: modifiers
          });
        } else {
          module.exports.removeNationalModifier(actual_id, national_modifier_names[i]);
        }
  },

  removeNationalModifier: function (arg0_user, arg1_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var modifier_id = arg1_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var reversed_modifiers = {};
    var usr = main.users[actual_id];

    //Parse existing modifiers if national modifier exists and has modifiers
    if (usr.national_modifiers[modifier_id]) {
      var local_modifier = usr.national_modifiers[modifier_id];

      //Check for existing modifiers
      if (local_modifier.modifiers) {
        var all_local_modifiers = Object.keys(local_modifier.modifiers);

        for (var i = 0; i < all_local_modifiers.length; i++)
          reversed_modifiers[all_local_modifiers[i]] = local_modifier.modifiers[all_local_modifiers[i]]*-1;

        //Apply reversed modifiers
        applyModifiers(actual_id, reversed_modifiers);
      }

      //Delete national modifier object
      delete usr.national_modifiers[modifier_id];
    }
  },

  setNationalModifier: function (arg0_user, arg1_id, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var modifier_id = arg1_id;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var local_icon = "";
    var usr = main.users[actual_id];

    //Remove any previous modifier occupying the same slot
    if (usr.national_modifiers[modifier_id])
      module.exports.removeNationalModifier(actual_id, modifier_id);

    //Parse options field
    if (options.icon)
      local_icon = config.icons[local_icon];
    if (options.modifiers)
      applyModifiers(actual_id, options.modifiers);

    usr.national_modifiers[modifier_id] = {
      name: (options.name) ? options.name : modifier_id,
      image: (options.image) ? options.image : "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png",
      icon: local_icon,
      description: (options.description) ?
        `${parseLocalisation(options.description, { scopes: { FROM: actual_id, LOCAL: (options.local) ? options.local : actual_id, TO: actual_id }})}\n\n${parseModifiers(options.modifiers)}` :
        "",

      modifiers: options.modifiers
    };
  }
};
