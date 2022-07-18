module.exports = {
  printModifiers: function (arg0_user, arg1_sort_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var sort_type = (arg1_sort_type) ? arg1_sort_type : "key";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_national_modifiers = Object.keys(usr.national_modifiers);
    var all_modifiers = Object.keys(usr.modifiers);
    var all_temporary_modifiers = Object.keys(usr.temporary_modifiers);
    var game_obj = getGameObject(user_id);
    var sorted_matrix = [];
    var usr = main.users[actual_id];

    //Sort sorted_matrix
    for (var i = 0; i < all_modifiers.length; i++) {
      var local_modifier = getModifier(all_modifiers[i]);
      var local_value = usr.modifiers[all_modifiers[i]];

      var local_impact = local_value - returnSafeNumber(local_modifier.default_value);

      sorted_matrix.push([(local_modifier.name) ? local_modifier.name : all_modifiers[i], all_modifiers[i], local_impact]);
    }

    //Sort by alphabetical or by impact
    if (sort_type == "alphabetical")
      sorted_matrix.sort((a, b) => a[0].toUpperCase().localeCompare(b[0].toUpperCase()));
    if (sort_type == "impact")
      sorted_matrix.sort((a, b) => b[2] - a[2]);

    //Reorganise sorted_matrix
    all_modifiers = [];

    for (var i = 0; i < sorted_matrix.length; i++)
      all_modifiers.push(sorted_matrix[i][1]);

    //Cache sort type
    cache[game_obj.middle_embed.id] = sort_type

    //Format modifier_string
    var modifier_string = [];

    //National Modifiers/Temporary Modifiers list
    if (all_national_modifiers.length > 0)
      modifier_string.push(`You currently have **${parseNumber(all_national_modifiers.length)}** National Modifier(s) active.`);
    if (all_temporary_modifiers.length > 0)
      modifier_string.push(`You currently have **${parseNumber(all_temporary_modifiers.length)}** Temporary Modifier(s) active.`);

    if (all_national_modifiers.length > 0 || all_temporary_modifiers.length > 0) {
      if (all_national_modifiers.length > 0)
        modifier_string.push(`- **[View National Modifiers]`);
      if (all_temporary_modifiers.length > 0)
        modifier_string.push(`- **[View Temporary Modifiers]`);

      modifier_string.push("");
      modifier_string.push(config.localisation.divider);
      modifier_string.push("");
    }

    //Print header
    modifier_string.push(`- **[Sort by Alphabetical]** | **[Sort by Impact]** | **[Sort by Key]**`);
    modifier_string.push("");
    modifier_string.push(`The following is a list of your modifiers at the national level. These modifiers are distributed through your entire country equally where they can then be modified by more local modifiers.`);
    modifier_string.push("");
    modifier_string.push(config.localisation.divider);
    modifier_string.push("");

    //Iterate over all_modifiers and fetch proper names, only display if the modifier is not set at default value
    for (var i = 0; i < all_modifiers.length; i++) {
      var local_modifier = getModifier(all_modifiers[i]);
      var local_value = usr.modifiers[all_modifiers[i]];

      if (returnSafeNumber(local_modifier.default_value) != local_value)
        modifier_string.push(`${(local_modifier.icon) ? config.icons[local_modifier.icon] + " " : ""}${(local_modifier.name) ? local_modifier.name : all_modifiers[i]}: **${parseModifiers(local_value, true)}**`);
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Return embed
    createPageMenu(game_obj.middle_embed, {
      embed_pages: splitEmbed(modifier_string, {
        title: `[Jump To Page] | Modifiers:`,
        title_pages: true,
        fixed_width: true
      }),
      user: game_obj.user
    });
  },

  printTemporaryModifiers: function (arg0_user, arg1_sort_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var sort_type = (arg1_sort_type) ? arg1_sort_type : "chronological";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_temporary_modifiers = Object.keys(usr.temporary_modifiers);
    var game_obj = getGameObject(user_id);
    var sorted_matrix = [];

    //Sort sorted_matrix
    for (var i = 0; i < all_temporary_modifiers.length; i++) {
      var local_object = usr.temporary_modifiers[all_temporary_modifiers[i]];

      var local_duration = local_object.duration;
      var local_modifier = getModifier(local_object.type);
      var local_value = local_object.value;

      sorted_matrix.push([(local_modifier.name) ? local_modifier.name : local_object.type, all_temporary_modifiers[i], local_duration, local_value]);
    }

    //Sort by alphabetical, chronological (none), duration, or impact
    if (sort_type == "alphabetical")
      sorted_matrix.sort((a, b) => a[0].toUpperCase().localeCompare(b[0].toUpperCase()));
    if (sort_type == "duration")
      sorted_matrix.sort((a, b) => b[2] - a[2]);
    if (sort_type == "impact")
      sorted_matrix.sort((a, b) => b[3] - a[3]);

    //Reorganise sorted_matrix
    all_temporary_modifiers = [];

    for (var i = 0; i < sorted_matrix.length; i++)
      all_temporary_modifiers.push(sorted_matrix[i][1]);

    //Cache sort type
    cache[game_obj.middle_embed.id] = sort_type

    //Format temporary_modifier_string
    var temporary_modifier_string = [];

    if (all_temporary_modifiers.length == 0) {
      temporary_modifier_string.push(`_No temporary modifiers are currently active._`);
      temporary_modifier_string.push("");
      temporary_modifier_string.push(`Temporary Modifiers can be gained through **Alerts**, **Events**, and other game mechanics.`);
    } else {
      temporary_modifier_string.push(`Temporary Modifiers are flags that only affect a single modifier which expire after a set amount of turns.`);
      temporary_modifier_string.push("");
      temporary_modifier_string.push(`- **[Sort by Alphabetical]** | **[Sort by Chronological]** | **[Sort by Duration]** | **[Sort by Impact]**`);
      temporary_modifier_string.push("");
      temporary_modifier_string.push(config.localisation.divider);
      temporary_modifier_string.push("");

      //Iterate over all_temporary_modifiers and fetch proper names, parse localisation by base_zero
      for (var i = 0; i < all_temporary_modifiers.length; i++) {
        var local_object = usr.temporary_modifiers[all_temporary_modifiers[i]];

        temporary_modifier_string.push(`${parseModifiers({ [local_object.type]: local_object.value }, false, true)} for **${parseNumber(local_object.duration)}** turn(s).`);
      }
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Return embed
    createPageMenu(game_obj.middle_embed, {
      embed_pages: splitEmbed(temporary_modifier_string, {
        title: `[Jump To Page] | Temporary Modifiers:`,
        title_pages: true,
        fixed_width: true
      }),
      user: game_obj.user
    });
  }
};
