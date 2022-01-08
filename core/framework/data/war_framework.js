module.exports = {
  areAtWar: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Iterate over all wars to check
    var all_wars = Object.keys(main.global.wars);

    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      //Iterate over both attackers and defenders to determine opposing sides
      var usr_war_side = "none";
      var ot_user_war_side = "none";

      for (var x = 0; x < local_war.attackers.length; x++)
        if (local_war.attackers[x] == actual_id) {
          usr_war_side = "attackers";
        } else if (local_war.defenders[x] == actual_ot_user_id) {
          ot_user_war_side = "attackers";
        }

      for (var x = 0; x < local_war.defenders.length; x++)
      if (local_war.attackers[x] == actual_id) {
        usr_war_side = "defenders";
      } else if (local_war.defenders[x] == actual_ot_user_id) {
        ot_user_war_side = "defenders";
      }

      //Return statement
      if (usr_war_side != "none")
        if (usr_war_side == ot_user_war_side)
          return true;
    }
  },

  generateWarID: function () {
    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!main.global.wars[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    initialiseWar() - Creates a new war data structure with aggressors and all. Make sure users can't declare war on themselves
    options: {
      type: "acquire_state",

      attacker: "user_id",
      defender: "ot_user_id"
    }
  */
  initialiseWar: function (arg0_options) { //[WIP] - Format war object properly
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var attacker_id = main.global.user_map[options.attacker];
    var attacker_obj = main.users[attacker_id];
    var cb_obj = getCB(options.type);
    var defender_id = main.global.user_map[options.defender];
    var defender_obj = main.users[defender_obj];

    //Declare local tracker variables
    var attacker_culture_adjective = main.global.cultures[getPrimaryCultures(defender_id)[1]].adjective;
    var defender_culture_adjective = main.global.cultures[getPrimaryCultures(attacker_id)[0]].adjective;

    //Declare war_obj and format
    var war_id = module.exports.generateWarID();
    var war_obj = {
      name: `${attacker_culture_adjective}-${defender_culture_adjective} War`,
      starting_date: JSON.parse(JSON.stringify(main.date)),
      starting_round: JSON.parse(JSON.stringify(main.round_count)),

      cb: options.type,
      wargoals: [],

      attackers_war_leader: attacker_id,
      defenders_war_leader: defender_id,
      attackers: [attacker_id],
      defenders: [defender_id],

      attacker_total_casualties: 0,
      defender_total_casualties: 0,
      attacker_warscore: 0,
      defender_warscore: 0,

      peace_treaties: {}
    };

    //Automatically call in all vassals on both sides
    for (var i = 0; i < attacker_obj.diplomacy.vassals.length; i++) {
      var local_vassal = attacker_obj.diplomacy.vassals[i];

      if (local_vassal.overlord == attacker_id)
        war_obj.attackers.push(local_vassal.id);
    }

    for (var i = 0; i < defender_obj.diplomacy.vassals.length; i++) {
      var local_vassal = defender_obj.diplomacy.vassals[i];

      if (local_vassal.overlord == defender_id)
        war_obj.defenders.push(local_vassal.id);
    }

    //[WIP] - Automatically call in overlords if they exist

    //Add wargoals
    if (cb_obj.peace_demands)
      for (var i = 0; i < cb_obj.peace_demands.length; i++)
        war_obj.wargoals.push(cb_obj.peace_demands[i]);

    //Set war_obj
    main.global.wars[war_id] = war_obj;
  }
};
