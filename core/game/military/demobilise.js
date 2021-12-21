module.exports = {
  demobilise: function (arg0_user) { //[WIP] - Update military tab if demobilisation successfully went through and user is on it
    //Convert from parameters; remove unit type from all army objects
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[user_id];

    var last_mobilised = returnSafeNumber(usr.mobilised.last_mobilised);

    //Check if user is currently mobilised
    if (usr.mobilised.is_mobilised) {
      if (usr.enable_mobilisation) {
        //Check if user has passed demobilisation cooldown first
        if (main.global.round_count - last_mobilised > config.defines.combat.mobilisation_cooldown) {
          //Begin standing down troops
          var all_mobilisation_modifiers = Object.keys(config.defines.combat.base_mobilisation_impact);
          var all_mobilised_pops = Object.keys(usr.mobilised.mobilised_pops);
          var inverted_mobilisation_modifiers = {};

          //Invert the mobilisation modifiers first before applying them to the user
          for (var i = 0; i < all_mobilisation_modifiers.length; i++) {
            var local_mobilisation_modifier = config.defines.combat.base_mobilisation_impact[all_mobilisation_modifiers[i]];

            inverted_mobilisation_modifiers[all_mobilisation_modifiers[i]] = local_mobilisation_modifier*-1;
          }

          //Apply this new inverted modifier object to the given user
          applyModifiers(user_id, inverted_mobilisation_modifiers);

          //Restore all remaining mobilised pops to the fore
          for (var i = 0; i < all_mobilised_pops.length; i++) {
            var local_mobilised_pop = usr.mobilised.mobilised_pops[all_mobilised_pops[i]];

            usr[`used_${all_mobilised_pops[i]}`] -= local_mobilised_pop;
          }

          var unit_obj = getUnit(usr.mobilised.unit_type);
          var unit_reserves = usr.reserves[usr.mobilised.unit_type];
          var units_to_remove = JSON.parse(JSON.stringify(usr.mobilised.current_manpower_mobilised));

          //Remove unit type from reserves
          units_to_remove -= unit_reserves;
          unit_reserves = (unit_reserves - units_to_remove > 0) ?
            unit_reserves - units_to_remove :
            0;

          //[WIP] - Remove unit type from all armies

          //Print out user feedback
          printAlert(game_obj.id, `You demobilised **${parseNumber(usr.mobilised.current_manpower_mobilised)}** ${(unit_obj.name) ? unit_obj.name : usr.mobilised.unit_type}.`);

          //Reset all mobilisation keys apart from last_mobilised
          var all_mobilisation_keys = Object.keys(usr.mobilised);

          for (var i = 0; i < all_mobilisation_keys.length; i++)
            if (!["last_mobilised"].includes(all_mobilisation_keys[i]))
              delete usr.mobilised[all_mobilisation_keys[i]];

          //Update last_mobilised modifier to be the last turn the user demobilised
          usr.mobilised.last_mobilised = JSON.parse(JSON.stringify(main.global.round_count));
        } else {
          printError(game_obj.id, `Your people can't mobilise and demobilise instantly! Wait for **${parseNumber((main.global.round_count - last_mobilised) + 1)}** more turn(s).`);
        }
      } else {
        printError(game_obj.id, `Your people haven't even heard about mobilisation yet! Research mobilisation first before attempting to demobilise.`);
      }
    } else {
      printError(game_obj.id, `You have already demobilised your population! Mobilise first before attempting to demobilise.`);
    }
  }
};
