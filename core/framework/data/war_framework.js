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
    getWar() - Fetches war object/key.
    options: {
      return_key: true/false //Whether or not to return the key instead of the object
    }
  */
  getWar: function (arg0_war_name, arg1_options) {
    //Convert from parameters
    var war_name = arg0_war_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_wars = Object.keys(main.global.wars);
    var war_found = [false, ""];

    //ID search
    if (main.global.wars[war_name])
      return (!options.return_key) ?
        main.global.wars[war_name] :
        war_name;

    //Name search - Soft
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war.name.trim().toLowerCase().indexOf(war_name) != -1)
        war_found = [true, (!options.return_key) ? local_war : all_wars[i]];
    }

    //Name search - Hard
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war.name.trim().toLowerCase() == war_name)
        war_found = [true, (!options.return_key) ? local_war : all_wars[i]];
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
      id: war_id,

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
  },

  joinWar: function (arg0_user, arg1_side, arg2_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var friendly_side = arg1_side;
    var war_name = arg2_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var opposite_side = (friendly_side == "defenders") ? "attackers" : "defenders";
    var usr = main.users[actual_id];
    var war_obj = module.exports.getWar(war_name);

    //Check if joining against yourself
    if (!war_obj[opposite_side].includes(actual_id)) {
      //Check if user has any non-aggression pacts with the opposing side
      var has_non_aggression_pact = false;

      for (var i = 0; i < war_obj[opposite_side].length; i++) {
        if (hasNonAggressionPact(war_obj[opposite_side][i], actual_id))
          has_non_aggression_pact = true;

      if (!has_non_aggression_pact) {
        //Break off any alliances on the opposing side
        for (var i = 0; i < war_obj[opposite_side].length; i++) {
          var local_user = main.users[war_obj[opposite_side][i]];

          if (hasAlliance(war_obj[opposite_side][i], actual_id)) {
            dissolveAlliance(war_obj[opposite_side][i], actual_id);

            usr.diplomacy.used_diplomatic_slots--;
            local_user.diplomacy.used_diplomatic_slots--;
          }
        }

        //Push user into conflict if not already included
        if (!war_obj[friendly_side].includes(actual_id))
          war_obj[friendly_side].push(actual_id);

        //Declare casualties tracker
        war_obj[`${actual_id}_casualties`] = 0;
      }
    }
  }
};
