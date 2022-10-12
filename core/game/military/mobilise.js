module.exports = {
  getMobilisationPops: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var mobilised_pops = { population: 0 };
    var usr = main.users[actual_id];

    //Sum up all pops that can be mobilised
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];
      var mobilisation_value = Math.max(Math.ceil(
        (
          getTotalPopManpower(actual_id, all_pops[i]) - usr.pops[`used_${all_pops[i]}`]
        )
          *config.defines.combat.base_mobilisation_size*usr.modifiers.mobilisation_size
      ), 0);

      mobilised_pops[all_pops[i]] = returnSafeNumber(mobilisation_value);
      mobilised_pops.population += returnSafeNumber(mobilisation_value);
    }

    return mobilised_pops;
  },

  mobilise: function (arg0_user) { //[WIP] - Apply infamy malus if it turns out that the user mobilising isn't currently being justified on or isn't currently at war; update military UI if mobilised; print to global news reports
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
      if (main.round_count - last_mobilised > config.defines.combat.mobilisation_cooldown) {
        if (usr.modifiers.enable_mobilisation) {
          //Sum up all non-military pops as being eligible for mobilisation, add them collectively to a moblisation pops object
          var manpower_mobilised = 0;
          var mobilisation_speed = Math.ceil(
            usr.modifiers.mobilisation_speed*config.defines.combat.base_mobilisation_time
          );
          var mobilised_pops = module.exports.getMobilisationPops(actual_id);
          var unit_obj = getUnit(usr.mobilisation.unit_type);
          var unit_type = JSON.parse(JSON.stringify(usr.mobilisation.unit_type)); //Deep copied in-case unit changes with new tech research

          //Initialise mobilised_pops and other variables
          delete mobilised_pops.population;

          //Sum them all up
          var all_mobilised_pops = Object.keys(mobilised_pops);

          for (var i = 0; i < all_mobilised_pops.length; i++) {
            var local_mobilised_pop = mobilised_pops[all_mobilised_pops[i]];

            //Add to used_(pop type)
            usr.pops[`used_${all_mobilised_pops[i]}`] += local_mobilised_pop;

            //Add to tracker sum
            manpower_mobilised += local_mobilised_pop;
          }

          //Parse through all modifiers in config.defines.combat.base_mobilisation_impact
          applyModifiers(actual_id, config.defines.combat.base_mobilisation_impact);

          //Create mobilisation object
          usr.mobilisation = {
            is_mobilised: true,
            last_mobilised: JSON.parse(JSON.stringify(main.round_count)),

            current_manpower_mobilised: 0,
            total_manpower_mobilised: manpower_mobilised,
            mobilised_pops: mobilised_pops,

            original_duration: mobilisation_speed,
            duration: mobilisation_speed,
            mobilised_type: unit_type,
            unit_type: unit_type
          };

          //Print out user feedback
          printAlert(game_obj.id, `You have begun to mobilise **${parseNumber(usr.mobilisation.total_manpower_mobilised)}** men as **${(unit_obj.name) ? unit_obj.name : usr.mobilisation.unit_type}**! They will finish mobilising in **${parseNumber(usr.mobilisation.duration)}** ${(usr.mobilisation.duration == 1) ? "turn" : "turns"}.`);

          //Update military UI
          if (game_obj.page == "military")
            printMilitary(user_id);
        } else {
          printError(game_obj.id, `Your people haven't even heard of such a concept yet! Research mobilisation first.`);
        }
      } else {
        printError(game_obj.id, `Your people can't mobilise and demobilise instantly! Wait for **${parseNumber(config.defines.combat.mobilisation_cooldown - (main.round_count - last_mobilised) + 1)}** more turn(s).`);
      }
    } else {
      printError(game_obj.id, `You can't mobilise more personnel if you're already fully mobilised! Demobilise first before mobilising again.`);
    }
  }
};
