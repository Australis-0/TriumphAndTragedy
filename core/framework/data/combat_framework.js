module.exports = {
  calculateCasualties: function (arg0_user, arg1_army_obj, arg2_attacker_roll) {
    //Convert from parameters
    var user_id = arg0_user;
    var defending_army_obj = arg1_army_obj;
    var attacker_roll = arg2_attacker_roll;

    //Declare local instance variables
    var attacker_roll = module.exports.calculateRoll(attacking_army_obj);
    var defender_units = Object.keys(army_obj.units);
    var total_losses = 0;
    var usr = main.users[user_id];

    //Go through all units to deal damage
    for (var i = 0; i < defender_units.length; i++) {
      var local_unit = getUnit(defender_units[i]);

      var local_defence = returnSafeNumber(local_unit.defence);
      var local_manoeuvre = returnSafeNumber(local_unit.manoeuvre);
      var local_manpower_costs = (local_unit.manpower_cost) ?
        Object.keys(local_unit.manpower_cost) :
        [];
      var manoeuvre_roll = randomNumber(0, 20);
      var unit_loss_rate = 1;

      //Check for MP first
      if (manoeuvre_roll > local_manoeuvre)
        unit_loss_rate = 0.1; //Only 10% of units can be lost if the roll is dodged

      //Deal damage
      attacker_roll -= defending_army_obj.units[defender_units[i]]*local_defence;

      for (var x = 0; x < local_manpower_costs.length; x++) {
        //Check to see if local_manpower_cost is of a military pop or not
        var local_value = local_unit.manpower_cost[local_manpower_costs[x]]/returnSafeNumber(local_unit.quantity, 1);
        var pop_obj = config.pops[local_manpower_costs[x]];
        var total_casualties = defending_army_obj.units[defender_units[i]];

        //Determine unit casualties
        total_casualties = (attacker_roll > defending_army_obj.units[defender_units[i]]*local_defence) ?
          Math.ceil(total_casualties*0.5*unit_loss_rate) :
          Math.ceil((attacker_roll/local_defence)*unit_loss_rate);

        //Kill off pops; mobilisation handler
        if (usr.mobilisation.is_mobilised) {
          var all_mobilised_pops = Object.keys(usr.mobilisation.mobilised_pops);

          for (var y = 0; y < all_mobilised_pops.length; i++) {
            var local_amount = usr.mobilisation.mobilised_pops[all_mobilised_pops];
            var local_percentage = local_amount/usr.mobilisation.current_manpower_mobilised;

            //Begin removing pops based on local percentage
            if (defender_units[i] != usr.mobilisation.unit_type) {
              var amount_killed = Math.ceil(local_value/all_mobilised_pops.length)*total_casualties;

              killPops(user_id, {
                type: local_manpower_costs[x],
                amount: amount_killed
              });

              usr.pops[`used_${local_manpower_costs[x]}`] = Math.max(
                usr.pops[`used_${local_manpower_costs[x]}`] - amount_killed,
                0
              );

              total_losses += amount_killed;
            } else {
              var amount_killed = Math.ceil(local_value*local_percentage)*total_casualties;

              killPops(user_id, {
                type: all_mobilised_pops[y],
                amount: Math.ceil(amount_killed)
              });

              total_losses += Math.ceil(amount_killed);
            }
          }
        }
      }
    }

    //Return statement
    return total_losses;
  },

  calculateRoll: function (arg0_army_obj) {
    //Convert from parameters
    var army_obj = arg0_army_obj;

    //Declare local instance variables
    var all_units = Object.keys(army_obj.units);
    var current_roll = 0;

    //Loop over all units
    for (var i = 0; i < all_units.length; i++) {
      var unit_obj = getUnit(all_units[i]);

      //Implement minimum AP roll
      var local_attack = returnSafeNumber(unit_obj.attack);
      var local_category = getUnitCategoryFromUnit(all_units[i]);
      var local_initiative = returnSafeNumber(unit_obj.initiative);

      //Check if unit is of type air in a navy
      if (local_category.type == "air")
        if (army_obj.type == "navy")
          local_attack = local_attack*1.5; //+50% boost to aeroplanes at sea

      var local_initiative_roll = randomNumber(0, 20);
      var local_attack_roll = randomNumber(local_attack*(1/3), local_attack);

      current_roll += (local_initiative_roll < local_initiative) ?
        local_attack :
        local_attack*0.1; //Unit only rolls 10% of their AP if initiative roll fails
    }

    //Return statement
    return current_roll;
  },

  initialiseBattle: function (arg0_user, arg1_army_name, arg2_user, arg3_army_name) { //[WIP] - There needs to be some way to send battle results as an alert
    //Convert from parameters
    var user_id = arg0_user;
    var attacking_army_name = arg1_army_name.trim();
    var ot_user_id = arg2_user;
    var defending_army_name = arg3_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var attacking_army_obj = getArmy(actual_id, attacking_army_name);
    var defending_army_obj = getArmy(actual_ot_user_id, defending_army_name);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (ot_user)
        if (attacking_army_obj)
          if (defending_army_obj) {
            var battle_type = "";
            var battle_name = "";
            var province_obj = main.provinces[attacking_army_obj.province];

            var province_name = (province_obj.name) ? province_obj.name : province_obj.id;

            //Check for battle type
            if (attacking_army_obj.type == "land" && defending_army_obj.type == "land") {
              battle_type = "land";
            } else if (attacking_army_obj.type == "sea" && defending_army_obj.type == "sea") {
              battle_type = "sea";
            } else {
              battle_type = "air";
            }

            //Get battle name
            switch (battle_type) {
              case "land":
                battle_name = (province_name == province_obj.id) ?
                  `${(province_obj.battle_ordinal) ? ordinalise(province_obj.battle_ordinal) + " " : ""} of ${randomElement(config.localisation.battle_prefixes)} ${province_obj.id}` :
                  `${(province_obj.battle_ordinal) ? ordinalise(province_obj.battle_ordinal) + " " : ""} of ${province_name}`;

                break;
              case "sea":
                battle_name = `Battle of ${randomElement(config.localisation.bathymetric_names)}`;

                break;
              case "air":
                battle_name = `Battle of ${ot_user.name}`;

                break;
            }

            //Calculate army stats
            var attacking_army_stats = calculateArmyStats(actual_id, attacking_army_obj);
            var attacker_losses = 0;
            var attacker_units = Object.keys(attacking_army_obj.units);
            var defending_army_stats = calculateArmyStats(actual_ot_user_id, defending_army_obj);
            var defender_losses = 0;
            var defender_units = Object.keys(defending_army_obj.units);

            //Check for combat_order
            var combat_order = config.defines.combat.combat_order;

            if (usr.researched_technologies.includes(config.defines.combat.combacombat_order_stalemate_tech))
              combat_order = ["defence", "attack"];

            if (ot_user.researched_technologies.includes(config.defines.combat.ccombat_order_switch_tech))
              combat_order = ["attack", "defence"];

            //Begin rolling and subtracting units
            for (var i = 0; i < combat_order.length; i++)
              if (combat_order[i] == "attack") {
                var defender_casualties = module.exports.calculateCausalties(actual_ot_user_id, defending_army_obj,
                    module.exports.calculateRoll(attacking_army_obj)
                );
              } else if (combat_order[i] == "defence") {
                var attacker_casualties = module.exports.calculateCausalties(actual_id, attacking_army_obj,
                    module.exports.calculateRoll(defending_army_obj)
                );
              }

            //Check if army must retreat

            //Occupy province

            //Add warscore

            //Delete armies if no units are left in them
          }
  },

  initialiseAirRaid: function (arg0_user, arg1_city_name, arg2_army_name) { //[WIP] - Work on initialiseAirBattle() first
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name.trim();
    var army_name = arg2_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var army_obj = getArmy(actual_id, army_name);
    var city_obj = getCity(city_name);
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (city_obj)
        if (army_obj) {
          var actual_ot_user_id = city_obj.owner;
          var army_stats = calculateArmyStats(actual_id, army_obj, { mode: "air_raid" });
          var ot_user = main.users[actual_ot_user_id];


        }
  }
};
