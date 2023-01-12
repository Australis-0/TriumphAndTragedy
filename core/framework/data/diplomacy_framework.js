module.exports = {
  createAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set alliance objects for both users
    usr.diplomacy.allies[actual_ot_user_id] = {
      id: actual_ot_user_id,
      status: "active"
    };
    ot_user.diplomacy.allies[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  createGuarantee: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set guarantee objects for both users
    usr.diplomacy.guarantees[actual_ot_user_id] = {
      guarantor: actual_id,
      id: actual_ot_user_id
    };
  },

  createMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set military access objects for only one user, since military access only goes one way
    usr.diplomacy.military_access[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  /*
    createNonAggressionPact() - Creates a non-aggression pact between two countries.
    options: {
      duration: 20 //-1 by default, equals infinite
    }
  */
  createNonAggressionPact: function (arg0_user, arg1_user, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var duration = (options.duration) ? options.duration : -1;

    //Create non-aggression pact if it doesn't exist
    if (!usr.diplomacy.non_aggression_pacts[actual_ot_user_id]) {
      usr.diplomacy.non_aggression_pacts[actual_ot_user_id] = {
        id: actual_ot_user_id,
        duration: duration
      };
      ot_user.diplomacy.non_aggression_pacts[actual_ot_user_id] = {
        id: actual_ot_user_id,
        duration: duration
      };
    } else { //Extend non-aggression pact if it does unless it is already infinite
      var non_aggression_pact = usr.diplomacy.non_aggression_pacts[actual_ot_user_id];

      if (non_aggression_pact.duration != -1) {
        non_aggression_pact.duration += duration;

        //Delete if duration is less than one afterwards
        if (non_aggression_pact.duration < 1)
          delete usr.diplomacy.non_aggression_pacts[actual_ot_user_id];
      }

      //Non-aggression pacts are mutual, so clone if existent
      if (usr.diplomacy.non_aggression_pacts[actual_ot_user_id])
        ot_user.diplomacy.non_aggression_pacts[actual_id] = JSON.parse(JSON.stringify(non_aggression_pact));
    }
  },

  createRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set rivalry objects for both users
    usr.diplomacy.rivals[actual_ot_user_id] = {
      id: actual_ot_user_id,
      status: "active"
    };
    ot_user.diplomacy.rivals[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  /*
    createVassal() - Turns the target country into a vassal of another.
    options: {
      target: "actual_ot_user_id", //Whom should the puppet be?
    }
  */
  createVassal: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[options.target];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set vassal object
    usr.diplomacy.vassals[actual_ot_user_id] = {
      id: actual_ot_user_id,
      overlord: actual_id
    };

    //Lock customisation for new vassal if overlord has it set to locked
    if (usr.options.vassal_customisation_locked)
      ot_user.options.customisation_locked = true;

    //Replace vassal owner with the actual_id of its overlord
    ot_user.owner = actual_id;
  },

  //destroyAllDiplomaticRelations() - Destroys all diplomatic relations other countries have with the target user
  destroyAllDiplomaticRelations: function (arg0_user) { //[WIP] - Add war justifications in the future; withdraw from war
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var all_wars = Object.keys(main.global.wars);
    var usr = main.users[actual_id];

    //Iterate over all users, destroying any diplomatic relations that currently exist
    for (var i = 0; i < all_users.length; i++)
      if (all_users[i] != actual_id) {
        var local_user = main.users[all_users[i]];
        var overlord_id = module.exports.getVassal(user_id, true);

        //Allies
        if (local_user.diplomacy.allies[actual_id]) {
          local_user.diplomacy.used_diplomatic_slots--;

          module.exports.dissolveAlliance(all_users[i], user_id);
        }

        //Guarantees
        if (module.exports.hasGuarantee(all_users[i], user_id)) {
          local_user.diplomacy.used_diplomatic_slots--;

          module.exports.dissolveGuarantee(all_users[i], user_id);
        }

        //Military Accesses
        if (module.exports.hasMilitaryAccess(all_users[i], user_id))
          module.exports.dissolveMilitaryAccess(all_users[i], user_id);

        //Non-Aggression Pacts
        if (module.exports.hasNonAggressionPact(all_users[i], user_id)) {
          local_user.diplomacy.used_diplomatic_slots--;

          module.exports.dissolveNonAggressionPact(all_users[i], user_id);
        }

        //Overlords
        if (overlord_id)
          module.exports.dissolveVassal(user_id);

        //Relations
        if (local_user.diplomacy.relations[actual_id])
          delete local_user.diplomacy.relations[actual_id];

        //Rivals
        if (module.exports.hasRivalry(all_users[i], user_id))
          module.exports.dissolveRivalry(all_users[i], user_id);

        //Vassals
        if (local_user.diplomacy.vassals[actual_id]) {
          local_user.diplomacy.used_diplomatic_slots--;

          module.exports.dissolveVassal(user_id);
        }

        //Wars
        for (var x = 0; x < all_wars.length; x++) {
          var local_war = main.global.wars[all_wars[x]];

          removeElement(local_war.attackers, actual_id);
          removeElement(local_war.defenders, actual_id);

          //If either attackers or defenders have zero belligerents remaining, archive the war
          if (local_war.attackers.length == 0 || local_war.defenders.length == 0)
            archiveWar(local_war.name);
        }
      }
  },

  dissolveAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve alliances for both users
    delete usr.diplomacy.allies[actual_ot_user_id];
    delete ot_user.diplomacy.allies[actual_id];
  },

  dissolveGuarantee: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Delete guarantee object
    delete usr.diplomacy.guarantees[actual_ot_user_id];
  },

  dissolveNonAggressionPact: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve non aggression pact for both users
    delete usr.diplomacy.non_aggression_pacts[actual_ot_user_id];
    delete ot_user.diplomacy.non_aggression_pacts[actual_id];
  },

  dissolveMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve military access for the other user
    delete usr.diplomacy.military_access[actual_ot_user_id];
  },

  dissolveRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve alliances for both users
    delete usr.diplomacy.rivals[actual_ot_user_id];
    delete ot_user.diplomacy.rivals[actual_id];
  },

  dissolveVassal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_mapped_users = Object.keys(main.global.user_map);
    var overlord_id = module.exports.getVassal(user_id, true);
    var usr = main.users[actual_id];

    //Delete vassal_obj
    delete usr.options.customisation_locked; //Customisation can't be locked by their overlords anymore
    delete main.users[overlord_id].diplomacy.vassals[actual_id];

    //Transfer ownership if possible
    delete usr.owner;

    for (var i = 0; i < all_mapped_users.length; i++)
      if (main.global.user_map[all_mapped_users[i]] == actual_id && !usr.owner)
        usr.owner = all_mapped_users[i];

    //Reset trackers
    usr.vassal_years = 0;
  },

  getGuarantees: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_guarantees = [];
    var all_users = Object.keys(main.users);

    //Iterate over all users and push all guarantee objects to array
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      if (local_user.diplomacy.guarantees[actual_id])
        all_guarantees.push(local_user.diplomacy.guarantees[actual_id]);
    }

    //Return statement
    return all_guarantees;
  },

  getMilitaryAccesses: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_military_accesses = [];
    var all_users = Object.keys(main.users);

    //Iterate over all users and push all military access objects to array
    for (var i = 0; i < all_users.length; i++)
      if (module.exports.hasMilitaryAccess(all_users[i], actual_id))
        all_military_accesses.push(all_users[i]);

    //Return statement
    return all_military_accesses;
  },

  getMutualRelations: function (arg0_user, arg1_user) {
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    return [
      module.exports.getRelations(user_id, ot_user_id)[0],
      module.exports.getRelations(ot_user_id, user_id)[0]
    ];
  },

  getRelations: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Declare tracker variables
    var current_relations = [0, {
      status: "stagnant"
    }];

    //Get current relations
    if (usr.diplomacy.relations[actual_ot_user_id]) {
      var local_relations = usr.diplomacy.relations[actual_ot_user_id];

      current_relations[0] = local_relations.value;
      current_relations[1] = local_relations;
    }

    //Return statement
    return current_relations;
  },

  getVassal: function (arg0_user, arg1_return_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var return_user = arg1_return_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);

    //Iterate through all users and their respective vassal keys
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      if (local_user.diplomacy.vassals[actual_id])
        //Return statement
        return (!return_user) ? local_user.diplomacy.vassals[actual_id] : all_users[i];
    }
  },

  getVassalMaintenance: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_vassals = excludeClientStates(Object.keys(usr.diplomacy.vassals));

    //Return statement
    return (
      usr.modifiers.political_capital_gain*
        all_vassals.length*config.defines.diplomacy.vassal_maintenance_cost
    );
  },

  getScore: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Return statement
    return (
      (usr.population/100000) + //Population
      Math.max( //Technology
        (usr.researched_technologies.length - getAverageTechCount())*5, 0
      ) +
      getTotalActiveDuty(user_id)/50000 + //Military
      usr.provinces //Provinces
    );
  },

  getSortedUsers: function () {
    //Declare local instance variables
    var all_users = Object.keys(main.global.user_map);
    var appended_users = [];
    var final_sorted_user_array = [];
    var sorted_user_array = [];

    //Iterate over all users and append their respective scores and ID's
    for (var i = 0; i < all_users.length; i++) {
      var local_id = main.global.user_map[all_users[i]];

      if (!appended_users.includes(local_id)) {
        sorted_user_array.push([local_id, module.exports.getScore(all_users[i])]);
        appended_users.push(local_id);
      }
    }

    //Sort sorted_user_array and push final result to final_sorted_user_array
    sorted_user_array = sorted_user_array.sort(function (a, b) { return b[1] - a[1] });

    for (var i = 0; i < sorted_user_array.length; i++)
      final_sorted_user_array.push(sorted_user_array[i][0]);

    //Return statement
    return final_sorted_user_array;
  },

  getUsedDiplomaticSlots: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var used_diplomatic_slots = 0;
    var usr = main.users[actual_id];

    var all_allies = Object.keys(usr.diplomacy.allies);
    var all_guarantees = Object.keys(usr.diplomacy.guarantees);
    var all_military_accesses = Object.keys(usr.diplomacy.military_access);
    var all_non_aggression_pacts = Object.keys(usr.diplomacy.non_aggression_pacts);
    var all_vassals = Object.keys(usr.diplomacy.vassals);

    //Check all diplomatic relations
    for (var i = 0; i < all_allies.length; i++)
      if (hasAlliance(user_id, all_allies[i]))
        used_diplomatic_slots++;
    for (var i = 0; i < all_guarantees.length; i++)
      if (hasGuarantee(user_id, all_guarantees[i]))
        used_diplomatic_slots++;
    for (var i = 0; i < all_military_accesses.length; i++)
      if (hasMilitaryAccess(user_id, all_military_accesses[i]))
        used_diplomatic_slots++;
    for (var i = 0; i < all_non_aggression_pacts.length; i++)
      if (hasNonAggressionPact(user_id, all_non_aggression_pacts[i]))
        used_diplomatic_slots++;
    for (var i = 0; i < all_vassals.length; i++)
      if (usr.diplomacy.vassals[all_vassals[i]].overlord == actual_id)
        used_diplomatic_slots++;

    //Return statement
    return used_diplomatic_slots;
  },

  hasAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has an alliance with ot_user_id
    if (usr.diplomacy.allies[actual_ot_user_id]) {
      var local_alliance = usr.diplomacy.allies[actual_ot_user_id];

      //Return statement if alliance is currently active
      if (local_alliance.status == "active")
        return true;
    }
  },

  hasGuarantee: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has a gaurantee on ot_user_id
    var all_guarantees = module.exports.getGuarantees(ot_user_id);

    for (var i = 0; i < all_guarantees.length; i++)
      if (all_guarantees[i].guarantor == actual_id)
        //Return statement
        return true;
  },

  hasMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has military_access on ot_user_id
    try {
      if (usr.diplomacy.military_access[actual_ot_user_id]) {
        var local_military_access = usr.diplomacy.military_access[actual_ot_user_id];

        //Return statement if an access agreement is currently active
        if (local_military_access.status == "active")
          return true;
      }
    } catch {}
  },

  hasNonAggressionPact: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has a non aggression pact with ot_user_id
    if (usr.diplomacy.non_aggression_pacts[actual_ot_user_id])
      //Return statement
      return true;
  },

  hasRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has a rivalry with ot_user_id
    if (usr.diplomacy.rivals[actual_ot_user_id]) {
      var local_rivalry = usr.diplomacy.rivals[actual_ot_user_id];

      //Return statement if a rivalry is currently active
      if (local_rivalry.status == "active")
        return true;
    }
  },

  /*
    modifyRelations() - Changes target relations over time between two countries by a certain amount.
    options: {
      target: "actual_ot_user_id",
      value: 40, //Any range from -100 to 100
      duration: 0 //0 by default, equals instant
    }
  */
  modifyRelations: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[options.target];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Improve relations instantly if duration is not defined
    var relations_value = (options.value) ? options.value : 0;
    var duration = (options.duration) ? options.duration : 0;

    //Check if relation modification time is instant or not
    if (duration <= 0) {
      //Check if usr.diplomacy.relations is alrady defined
      if (!usr.diplomacy.relations[actual_ot_user_id]) {
        usr.diplomacy.relations[actual_ot_user_id] = {
          value: relations_value,
          status: "stagnant"
        };

        var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

        relations_obj.value = Math.min(100, relations_obj.value);
        relations_obj.value = Math.max(-100, relations_obj.value);
      } else {
        var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

        //If relations are of default type, delete
        if (relations_obj.status == "stagnant" && relations_obj.value + relations_value == 0)
          delete usr.diplomacy.relations[actual_ot_user_id];
        else
          relations_obj.value += relations_value;

        relations_obj.value = Math.min(100, relations_obj.value);
        relations_obj.value = Math.max(-100, relations_obj.value);
      }
    } else {
      //Improve/decrease gradually over time if not instant
      //Check for improving_type
      var current_relations = module.exports.getRelations(user_id, options.target)[0];
      var improving_type = "stagnant";

      if (relations_value < 0) {
        improving_type = "decreasing";
      } else if (relations_value == 0) {
        improving_type = "stagnant";
      } else {
        improving_type = "increasing";
      }

      //Don't change anything if stagnant
      if (improving_type != "stagnant")
        if (!usr.diplomacy.relations[actual_ot_user_id]) {
          usr.diplomacy.relations[actual_ot_user_id] = {
            value: 0,
            improving_to: relations_value,

            status: improving_type,
            duration: duration
          };

          var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

          relations_obj.improving_to = Math.min(100, relations_obj.improving_to);
          relations_obj.improving_to = Math.max(-100, relations_obj.improving_to);
        } else {
          var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

          if (!relations_obj.improving_to)
            relations_obj.improving_to = (relations_obj.value) ?
              relations_obj.value : 0;

          relations_obj.improving_to += relations_value;
          relations_obj.status = improving_type;
          relations_obj.duration = duration;

          relations_obj.improving_to = Math.min(100, relations_obj.improving_to);
          relations_obj.improving_to = Math.max(-100, relations_obj.improving_to);
        }
    }
  }
};
