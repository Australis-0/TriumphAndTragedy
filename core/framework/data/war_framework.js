module.exports = {
  archiveWar: function (arg0_war_name) {
    //Convert from parameters
    var raw_war_name = (typeof arg0_war_name != "object") ? arg0_war_name.trim().toLowerCase() : arg0_war_name;

    //Declare local instance variables
    var war_id = module.exports.getWar(raw_war_name, { return_key: true });
    var war_obj = module.exports.getWar(raw_war_name);

    //Move to war archive
    if (war_obj) {
      //Add end date
      war_obj.end_date = JSON.parse(JSON.stringify(main.date));

      main.global.archived_wars[module.exports.generateArchivedWarID()] = JSON.parse(JSON.stringify(war_obj));

      delete main.global.wars[war_id];
    }
  },

  atWar: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_wars = Object.keys(main.global.wars);
    var is_at_war = false;

    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war.attackers.includes(actual_id) || local_war.defenders.includes(actual_id))
        is_at_war = true;
    }

    //Return statement
    return is_at_war;
  },

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
        } else if (local_war.attackers[x] == actual_ot_user_id) {
          ot_user_war_side = "attackers";
        }

      for (var x = 0; x < local_war.defenders.length; x++)
        if (local_war.defenders[x] == actual_id) {
          usr_war_side = "defenders";
        } else if (local_war.defenders[x] == actual_ot_user_id) {
          ot_user_war_side = "defenders";
        }

      //Return statement
      if (usr_war_side != "none" && ot_user_war_side != "none")
        if (usr_war_side != ot_user_war_side)
          return true;
    }
  },

  generateArchivedWarID: function () {
    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!main.global.archived_wars[local_id]) {
        return local_id;
        break;
      }
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
    getArchivedWar() - Fetches war object/key.
    options: {
      return_key: true/false - Whether or not to return the key instead of the object
    }
  */
  getArchivedWar: function (arg0_war_name, arg1_options) {
    //Convert from parameters
    var war_name = arg0_war_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_wars = Object.keys(main.global.archived_wars);
    var war_found = [false, ""];

    //ID search
    if (main.global.wars[war_name])
      return (!options.return_key) ?
        main.global.wars[war_name] :
        war_name;

    //Name search - Soft
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.archived_wars[all_wars[i]];

      if (local_war.name.trim().toLowerCase().indexOf(war_name) != -1)
        war_found = [true, (!options.return_key) ? local_war : all_wars[i]];
    }

    //Name search - Hard
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.archived_wars[all_wars[i]];

      if (local_war.name.trim().toLowerCase() == war_name)
        war_found = [true, (!options.return_key) ? local_war : all_wars[i]];
    }

    //Return statement
    return (war_found[0]) ? war_found[1] : undefined;
  },

  getEnemies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_wars = Object.keys(main.global.wars);
    var enemies = [];
    var usr = main.users[actual_id];

    //Iterate through all wars
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];
      var opposing_side = "";

      if (local_war.attackers.includes(actual_id))
        opposing_side = "defenders";
      if (local_war.defenders.includes(actual_id))
        opposing_side = "attackers";

      if (opposing_side != "")
        for (var x = 0; x < local_war[opposing_side].length; x++)
          if (!enemies.includes(local_war[opposing_side][x]))
            enemies.push(local_war[opposing_side][x]);
    }

    //Return statement
    return enemies;
  },

  /*
    getWar() - Fetches war object/key.
    options: {
      return_key: true/false - Whether or not to return the key instead of the object
    }
  */
  getWar: function (arg0_war_name, arg1_options) {
    //Convert from parameters
    var war_name = (typeof arg0_war_name != "object") ? arg0_war_name.trim().toLowerCase() : arg0_war_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_wars = Object.keys(main.global.wars);
    var war_found = [false, ""];

    //Object guard clause
    if (typeof war_name == "object")
      return main.global.wars[war_name.id];

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

    return (war_found[0]) ? war_found[1] : undefined;
  },

  getWarLeadershipCost: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var pc_cost = config.defines.diplomacy.war_leader_bid_cost;
    var political_capital_penalty = 0;
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ?
      (!main.global.wars[war_name]) ?
        getWar(war_name.trim().toLowerCase()) :
        main.global.wars[war_name] :
      war_name;

    if (usr)
      if (war_obj)
        if (war_obj.attackers.includes(actual_id) || war_obj.defenders.includes(actual_id)) {
          //Get friendly_side, opposing_side
          var friendly_side = "";
          var opposing_side = "";

          if (war_obj.attackers.includes(actual_id)) {
            friendly_side = "attackers";
            opposing_side = "defenders";
          }
          if (war_obj.defenders.includes(actual_id)) {
            friendly_side = "defenders";
            opposing_side = "attackers";
          }

          political_capital_penalty = returnSafeNumber(war_obj[`${friendly_side}_war_leader_bids`])*config.defines.diplomacy.war_leader_bid_penalty_cost;

          //Return statement
          return pc_cost + political_capital_penalty;
        }
  },

  /*
    getWars() - Fetches an object/key list of all wars a user is currently involved in.
    options: {
      return_key: true/false - Whether or not to return a key instead of the object. False by default
    }
  */
  getWars: function (arg0_user_id, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user_id;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];
    var war_array = [];

    var all_wars = Object.keys(main.global.wars);

    //Iterate through all conflicts
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war.attackers.includes(actual_id) || local_war.defenders.includes(actual_id))
        war_array.push((!options.return_key) ? local_war : all_wars[i]);
    }

    //Return statement
    return war_array;
  },

  /*
    initialiseWar() - Creates a new war data structure with aggressors and all. Make sure users can't declare war on themselves
    options: {
      type: "acquire_state",

      attacker: "user_id",
      defender: "ot_user_id"
    }
  */
  initialiseWar: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var attacker_id = main.global.user_map[options.attacker];
    var attacker_obj = main.users[attacker_id];
    var cb_obj = getCB(options.type);
    var defender_id = main.global.user_map[options.defender];
    var defender_obj = main.users[defender_id];

    //Declare local tracker variables
    var attacker_culture_adjective = main.global.cultures[getPrimaryCultures(defender_id)[0]].adjective;
    var defender_culture_adjective = main.global.cultures[getPrimaryCultures(attacker_id)[0]].adjective;

    //Declare war_obj and format
    var war_id = module.exports.generateWarID();
    var war_obj = {
      id: war_id,

      name: `${attacker_culture_adjective}-${defender_culture_adjective} War`,
      starting_date: JSON.parse(JSON.stringify(main.date)),
      starting_round: JSON.parse(JSON.stringify(main.round_count)),

      attackers_wargoals: {},
      defenders_wargoals: {},
      cb: options.type,

      attackers_war_leader: attacker_id,
      defenders_war_leader: defender_id,
      attackers: [attacker_id],
      defenders: [defender_id],

      [`${attacker_id}_casualties`]: 0,
      [`${defender_id}_casualties`]: 0,

      attacker_total_casualties: 0,
      defender_total_casualties: 0,
      attacker_warscore: 0,
      defender_warscore: 0,

      peace_treaties: {}
    };

    //Vassal processing
    var all_attacker_vassals = Object.keys(attacker_obj.diplomacy.vassals);
    var all_defender_vassals = Object.keys(defender_obj.diplomacy.vassals);

    //Liberate any vassals that are on the opposing side of their overlord
    for (var i = 0; i < all_attacker_vassals.length; i++)
      if (war_obj.defenders.includes(all_attacker_vassals[i]))
        module.exports.dissolveVassal(all_attacker_vassals[i]);
    for (var i = 0; i < all_defender_vassals.length; i++)
      if (war_obj.attackers.includes(all_defender_vassals[i]))
        module.exports.dissolveVassal(all_defender_vassals[i]);

    //Automatically call in all remaining vassals on both sides
    for (var i = 0; i < all_attacker_vassals.length; i++) {
      var local_vassal = attacker_obj.diplomacy.vassals[all_attacker_vassals[i]];

      if (local_vassal.overlord == attacker_id)
        if (!war_obj.defenders.includes(local_vassal.id))
          war_obj.attackers.push(local_vassal.id);
    }

    for (var i = 0; i < all_defender_vassals.length; i++) {
      var local_vassal = defender_obj.diplomacy.vassals[all_defender_vassals[i]];

      if (local_vassal.overlord == defender_id)
        if (!war_obj.attackers.includes(local_vassal.id))
          war_obj.defenders.push(local_vassal.id);
    }

    //Add wargoals
    if (cb_obj.attacker_peace_demands) {
      var all_attacker_peace_demands = Object.keys(cb_obj.attacker_peace_demands);

      for (var i = 0; i < all_attacker_peace_demands.length; i++) {
        var local_value = cb_obj.peace_demands[all_attacker_peace_demands[i]];

        if (!war_obj.attackers_wargoals[all_attacker_peace_demands[i]])
          war_obj.attackers_wargoals[all_attacker_peace_demands[i]] = 0;
        war_obj.attackers_wargoals[all_attacker_peace_demands[i]] += local_value;
      }
    }
    if (cb_obj.defender_peace_demands) {
      var all_defender_peace_demands = Object.keys(cb_obj.defender_peace_demands);

      for (var i = 0; i < all_defender_peace_demands.length; i++) {
        var local_value = cb_obj.peace_demands[all_defender_peace_demands[i]];

        if (!war_obj.defenders_wargoals[all_defender_peace_demands[i]])
          war_obj.defenders_wargoals[all_defender_peace_demands[i]] = 0;
        war_obj.defenders_wargoals[all_defender_peace_demands[i]] += local_value;
      }
    }
    if (cb_obj.peace_demands) {
      var all_general_peace_demands = Object.keys(cb_obj.peace_demands);

      for (var i = 0; i < all_general_peace_demands.length; i++) {
        var local_value = cb_obj.peace_demands[all_general_peace_demands[i]];

        if (!war_obj.attackers_wargoals[all_general_peace_demands[i]])
          war_obj.attackers_wargoals[all_general_peace_demands[i]] = 0;
        war_obj.attackers_wargoals[all_general_peace_demands[i]] += local_value;
        if (!war_obj.defenders_wargoals[all_general_peace_demands[i]])
          war_obj.defenders_wargoals[all_general_peace_demands[i]] = 0;
        war_obj.defenders_wargoals[all_general_peace_demands[i]] += local_value;
      }
    }

    //Set war_obj
    main.global.wars[war_id] = war_obj;

    //[WIP] - Automatically call in overlords if they exist
    var attacker_vassal_obj = getVassal(attacker_id);
    var defender_vassal_obj = getVassal(defender_id);

    if (attacker_vassal_obj)
      if (defender_id != vassal_obj.overlord)
        module.exports.joinWar(vassal_obj.overlord, "attackers", war_obj.name);
    if (defender_vassal_obj)
      if (attacker_id != vassal_obj.overlord)
        module.exports.joinWar(vassal_obj.overlord, "defenders", war_obj.name);
  },

  isVolunteering: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_wars = Object.keys(main.global.wars);
    var is_volunteering = false;

    //Iterate over all_wars
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war[`${actual_id}_sent_volunteers`])
        is_volunteering = true;
    }

    //Return statement
    return is_volunteering;
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
    var war_obj = (typeof war_name != "object") ? module.exports.getWar(war_name) : war_name;

    var all_armies = Object.keys(usr.armies);
    var all_vassals = Object.keys(usr.diplomacy.vassals);

    //Check if joining against yourself
    if (!war_obj[opposite_side].includes(actual_id)) {
      //Check if user has any non-aggression pacts with the opposing side
      var has_non_aggression_pact = false;

      for (var i = 0; i < war_obj[opposite_side].length; i++)
        if (hasNonAggressionPact(war_obj[opposite_side][i], user_id))
          has_non_aggression_pact = true;

      if (!has_non_aggression_pact) {
        //Break off any alliances on the opposing side
        for (var i = 0; i < war_obj[opposite_side].length; i++) {
          var local_user = main.users[war_obj[opposite_side][i]];

          if (hasAlliance(war_obj[opposite_side][i], user_id)) {
            dissolveAlliance(war_obj[opposite_side][i], user_id);

            usr.diplomacy.used_diplomatic_slots--;
            local_user.diplomacy.used_diplomatic_slots--;
          }
        }

        //Delete and repatriate volunteers if they're there
        delete war_obj[`${actual_id}_sent_volunteers`];

        for (var i = 0; i < all_armies.length; i++) {
          var local_army = usr.armies[all_armies[i]];

          if (local_army.volunteering)
            if (local_army.volunteering[1] == war_obj.id)
              delete local_army.volunteering;
        }

        //Push user into conflict if not already included
        if (!war_obj[friendly_side].includes(actual_id))
          war_obj[friendly_side].push(actual_id);

        //Declare casualties tracker
        war_obj[`${actual_id}_casualties`] = 0;
      }

      //Call in all user vassals not already involved in the war
      for (var i = 0; i < all_vassals.length; i++)
        if (!war_obj.attackers.includes(all_vassals[i]) && !war_obj.defenders.includes(all_vassals[i]))
          module.exports.joinWar(all_vassals[i], friendly_side, war_obj);
    }
  }
}
