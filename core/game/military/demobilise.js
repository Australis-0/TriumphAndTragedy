module.exports = {
  demobilise: function (arg0_user) { //[WIP] - Update military tab if demobilisation successfully went through and user is on it
    //Convert from parameters; remove unit type from all army objects
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);
    var last_mobilised = returnSafeNumber(usr.mobilisation.last_mobilised);

    //Check if user is currently mobilised
    if (usr.mobilisation.is_mobilised) {
      if (usr.modifiers.enable_mobilisation) {
        //Check if user has passed demobilisation cooldown first
        if (main.global.round_count - last_mobilised > config.defines.combat.mobilisation_cooldown) {
          //Begin standing down troops
          var all_mobilisation_modifiers = Object.keys(config.defines.combat.base_mobilisation_impact);
          var all_mobilised_pops = Object.keys(usr.mobilisation.mobilised_pops);
          var inverted_mobilisation_modifiers = {};

          //Invert the mobilisation modifiers first before applying them to the user
          for (var i = 0; i < all_mobilisation_modifiers.length; i++) {
            var local_mobilisation_modifier = config.defines.combat.base_mobilisation_impact[all_mobilisation_modifiers[i]];

            inverted_mobilisation_modifiers[all_mobilisation_modifiers[i]] = local_mobilisation_modifier*-1;
          }

          //Apply this new inverted modifier object to the given user
          try {
            applyModifiers(actual_id, inverted_mobilisation_modifiers);
          } catch {}

          //Restore all remaining mobilised pops to the fore
          for (var i = 0; i < all_mobilised_pops.length; i++) {
            var local_mobilised_pop = usr.mobilisation.mobilised_pops[all_mobilised_pops[i]];

            if (local_mobilised_pop < 0)
              local_mobilised_pop = 0;

            usr.pops[`used_${all_mobilised_pops[i]}`] -= local_mobilised_pop;
          }

          var unit_obj = getUnit(usr.mobilisation.mobilised_type);
          var unit_reserves = usr.reserves[usr.mobilisation.mobilised_type];
          var units_to_remove = JSON.parse(JSON.stringify(usr.mobilisation.current_manpower_mobilised));

          //Make sure we can't remove negative units
          if (units_to_remove < 0)
            units_to_remove = 0;

          //Remove unit type from reserves
          usr.reserves[usr.mobilisation.mobilised_type] = (unit_reserves - units_to_remove > 0) ?
            unit_reserves - units_to_remove :
            0;

          units_to_remove -= unit_reserves;

          //Remove unit type from all armies
          for (var i = 0; i < all_armies.length; i++) {
            var local_army = usr.armies[all_armies[i]];
            var local_unit = local_army.units[usr.mobilisation.mobilised_type];

            if (units_to_remove > 0)
              if (local_unit > 0)
                local_army.units[usr.mobilisation.mobilised_type] = (local_unit - units_to_remove > 0) ?
                  local_unit - units_to_remove :
                  0;

            if (local_unit == 0)
              delete local_army.units[usr.mobilisation.mobilised_type];
          }

          //Print out user feedback
          printAlert(game_obj.id, `You demobilised **${parseNumber(Math.abs(units_to_remove))}** ${(unit_obj.name) ? unit_obj.name : usr.mobilisation.mobilised_type}.`);

          //Reset all mobilisation keys apart from last_mobilised
          var all_mobilisation_keys = Object.keys(usr.mobilisation);

          for (var i = 0; i < all_mobilisation_keys.length; i++)
            if (!["last_mobilised", "unit_type"].includes(all_mobilisation_keys[i]))
              delete usr.mobilisation[all_mobilisation_keys[i]];

          //Update last_mobilised modifier to be the last turn the user demobilised
          usr.mobilisation.last_mobilised = JSON.parse(JSON.stringify(main.global.round_count));

          //Update military UI
          if (game_obj.page == "military")
            printMilitary(user_id);
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
