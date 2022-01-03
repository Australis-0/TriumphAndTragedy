module.exports = {
  createAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set alliance objects for both users
    usr.diplomacy.allies[actual_ot_user_id] = {
      id: actual_ot_user_id,
      status: "active"
    };
    ot_user.allies[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  createMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set military access objects for both users
    usr.diplomacy.military_access[actual_ot_user_id] = {
      id: actual_ot_user_id,
      status: "active"
    };
    ot_user.military_access[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  /*
    createNonAggressionPact() - Creates a non-aggression pact between two countries.
    options: {
      time_remaining: 20 //-1 by default, equals infinite
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
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var time_remaining = (options.time_remaining) ? options.time_remaining : -1;

    //Create non-aggression pact if it doesn't exist
    if (!usr.diplomacy.non_aggression_pacts[actual_ot_user_id]) {
      usr.diplomacy.non_aggression_pacts[actual_ot_user_id] = {
        id: actual_ot_user_id,
        time_remaining: time_remaining
      };
      ot_user.non_aggression_pacts[actual_ot_user_id] = {
        id: actual_ot_user_id,
        time_remaining: time_remaining
      };
    }

    //Extend non-aggression pact if it does unless it is already infinite
    if (usr.diplomacy.non_aggression_pacts[actual_ot_user_id]) {
      var non_aggression_pact = usr.diplomacy.non_aggression_pacts[actual_ot_user_id];

      if (non_aggression_pact.time_remaining != -1) {
        non_aggression_pact.time_remaining += time_remaining;

        //Delete if time_remaining is less than one afterwards
        if (non_aggression_pact.time_remaining < 1)
          delete usr.diplomacy.non_aggression_pacts[actual_ot_user_id];
      }

      //Non-aggression pacts are mutual, so clone if existent
      if (usr.diplomacy.non_aggression_pacts[actual_ot_user_id])
        ot_user.non_aggression_pacts[actual_id] = JSON.parse(JSON.stringify(non_aggression_pact));
    }
  },

  createRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set rivalry objects for both users
    usr.diplomacy.rivals[actual_ot_user_id] = {
      id: actual_ot_user_id,
      status: "active"
    };
    ot_user.rivals[actual_id] = {
      id: actual_id,
      status: "active"
    };
  },

  /*
    createVassal() - Turns the target country into a vassal of another.
    options: {
      target: "actual_ot_user_id", //Whom should the overlord be?
    }
  */
  createVassal: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[options.target];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set vassal object
    usr.diplomacy.vassals = {
      id: actual_ot_user_id
    };
  },

  dissolveAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve alliances for both users
    delete usr.diplomacy.allies[actual_ot_user_id];
    delete ot_user.allies[actual_id];
  },

  dissolveNonAggressionPact: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve non aggression pact for both users
    delete usr.diplomacy.non_aggression_pacts[actual_ot_user_id];
    delete ot_user.non_aggression_pacts[actual_id];
  },

  dissolveMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve military access for both users
    delete usr.diplomacy.military_access[actual_ot_user_id];
    delete ot_user.military_access[actual_id];
  },

  dissolveRivalry: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Dissolve alliances for both users
    delete usr.diplomacy.rivals[actual_ot_user_id];
    delete ot_user.rivals[actual_id];
  },

  dissolveVassal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var vassal_obj = module.exports.getVassal(user_id);

    //Delete vassal_obj
    delete vassal_obj;
  },

  getMutualRelations: function (arg0_user, arg1_user) {
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
    var game_obj = getGameObject(user_id);
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

  getVassal: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare lcal instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);

    //Iterate through all users and their respective vassal keys
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      if (local_user.diplomacy.vassals[actual_id])
        //Return statement
        return local_user.diplomacy.vassals[actual_id];
    }
  },

  hasAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
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

  hasMilitaryAccess: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if user_id has military_access on ot_user_id
    if (usr.diplomacy.military_access[actual_ot_user_id]) {
      var local_military_access = usr.diplomacy.military_access[actual_ot_user_id];

      //Return statement if an access agreement is currently active
      if (local_military_access.status == "active")
        return true;
    }
  },

  hasNonAggressionPact: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
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
    var game_obj = getGameObject(user_id);
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
      time_remaining: 0 //0 by default, equals instant
    }
  */
  modifyRelations: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[options.target];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Improve relations instantly if time_remaining is not defined
    var relations_value = (options.value) ? options.value : 0;
    var time_remaining = (options.time_remaining) ? options.time_remaining : 0;

    //Check if relation modification time is instant or not
    if (time_remaining <= 0) {
      //Check if usr.diplomacy.relations is alrady defined
      if (!usr.diplomacy.relations[actual_ot_user_id]) {
        usr.diplomacy.relations[actual_ot_user_id] = {
          value: relations_value,
          status: "stagnant"
        };
      } else {
        var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

        //If relations are of default type, delete
        if (relations_obj.status == "stagnant" && relations_value == 0)
          delete usr.diplomacy.relations[actual_ot_user_id];
        else
          relations_obj.value = relations_value;
      }
    } else {
      //Improve/decrease gradually over time if not instant
      //Check for improving_type
      var current_relations = module.exports.getRelations(actual_id, actual_ot_user_id)[0];
      var improving_type = "stagnant";

      if (relations_value < current_relations) {
        improving_type = "decreasing";
      } else if (relations_value == current_relations) {
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
            time_remaining: time_remaining
          };
        } else {
          var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

          relations_obj.improving_to = relations_value;
          relations_obj.status = improving_type;
          relations_obj.time_remaining = time_remaining;
        }
    }
  }
};
