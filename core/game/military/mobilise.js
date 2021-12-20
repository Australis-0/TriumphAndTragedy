module.exports = {
  mobilise: function (arg0_user) { //pWIP] - Apply infamy malus if it turns out that the user mobilising isn't currently being justified on or isn't currently at war; update military UI if mobilised
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var last_mobilised = returnSafeNumber(usr.mobilisation.last_mobilised);

    //Check if user is already mobilised
    if (!usr.mobilisation.is_mobilised) {
      if (main.global.round_count - last_mobilised > config.defines.combat.mobilisation_cooldown) {
        if (usr.enable_mobilisation) {
          //Sum up all non-military pops as being eligible for mobilisation, add them collectively to a moblisation pops object
          var manpower_mobilised = 0;
          var mobilisation_speed = Math.ceil(
            usr.modifiers.mobilisation_speed*config.defines.combat.base_mobilisation_time
          );
          var mobilised_pops = {};
          var unit_obj = getUnit(usr.mobilise_unit);
          var unit_type = usr.mobilise_unit;

          for (var i = 0; i < all_pops.length; i++) {
            var local_pop = config.pops[all_pops[i]];

            if (!local_pop.specialised_pop && !local_pop.military_pop)
              mobilised_pops[all_pops[i]] = Math.ceil(
                (
                  getTotalPopManpower(actual_id, all_pops[i]) - usr[`used_${all_pops[i]}`]
                )
                  *config.defines.combat.base_mobilisation_size*usr.modifiers.mobilisation_size
              );
          }

          //Sum them all up
          var all_mobilised_pops = Object.keys(mobilised_pops);

          for (var i = 0; i < all_mobilised_pops.length; i++) {
            var local_mobilised_pop = mobilised_pops[all_mobilised_pops[i]];

            //Add to used_(pop type)
            usr[`used_${all_mobilised_pops[i]}`] += local_mobilised_pop;

            //Add to tracker sum
            manpower_mobilised += local_mobilised_pop;
          }

          //Parse through all modifiers in config.defines.combat.base_mobilisation_impact
          applyModifiers(actual_id, config.defines.combat.base_mobilisation_impact);

          //Create mobilisation object
          usr.mobilisation = {
            is_mobilised: true,

            current_manpower_mobilised: 0,
            total_manpower_mobilised: manpower_mobilised,
            mobilised_pops: mobilised_pops,

            time_remaining: mobilisation_speed,
            unit_type: unit_type
          };

          //Print out user feedback
          printAlert(`You have begun to mobilise **${parseNumber(usr.mobilisation.total_manpower_mobilised)}** men as **${(unit_obj.name) ? unit_obj.name : usr.mobilise_unit}**! They will finish mobilising in **${parseNumber(usr.mobilisation.time_remaining)}** ${(usr.mobilisation.time_remaining == 1) ? "turn" : "turns"}.`);
        } else {
          printError(game_obj.id, `Your people haven't even heard of such a concept yet! Research mobilisation first.`);
        }
      } else {
        printError(game_obj.id, `Your people can't mobilise and demobilise instantly! Wait for **${parseNumber(config.defines.combat.mobilisation_cooldown - (main.global.round_count - last_mobilised) + 1)}** more turn(s).`);
      }
    } else {
      printError(game_obj.id, `You can't mobilise more personnel if you're already fully mobilised! Demobilise first before mobilising again.`);
    }
  }
};
