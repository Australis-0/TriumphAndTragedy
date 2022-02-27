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
