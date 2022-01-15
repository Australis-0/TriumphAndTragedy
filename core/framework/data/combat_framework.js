module.exports = {
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
      var local_initiative = returnSafeNumber(unit_obj.initiative);

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

            //Check for battle type
            if (attacking_army_obj.type == "land" && defending_army_obj.type == "land") {
              battle_type = "land";
            } else if (attacking_army_obj.type == "sea" && defending_army_obj.type == "sea") {
              battle_type = "sea";
            } else {
              battle_type = "air";
            }

            //Get battle name
            

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

              }
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
