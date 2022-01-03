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
    usr.allies[actual_ot_user_id] = {
      id: ot_user_id,
      status: "active"
    };
    ot_user.allies[actual_id] = {
      id: actual_id,
      status: "active"
    };
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

    //Set alliance objects for both users
    usr.rivals[actual_ot_user_id] = {
      id: ot_user_id,
      status: "active"
    };
    ot_user.rivals[actual_id] = {
      id: actual_id,
      status: "active"
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
    delete usr.allies[actual_ot_user_id];
    delete ot_user.allies[actual_id];
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
    delete usr.rivals[actual_ot_user_id];
    delete ot_user.rivals[actual_id];
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
    if (usr.relations[actual_ot_user_id]) {
      var local_relations = usr.relations[actual_ot_user_id];

      current_relations[0] = local_relations.value;
    }

    //Return statement
    return current_relations;
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
    if (usr.allies[actual_ot_user_id]) {
      var local_alliance = usr.allies[actual_ot_user_id];

      //Return statement if alliance is currently active
      if (local_alliance.status == "active")
        return true;
    }
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
    if (usr.rivals[actual_ot_user_id]) {
      var local_rivalry = usr.rivals[actual_ot_user_id];

      //Return statement if a rivalry is currently active
      if (local_rivalry.status == "active")
        return true;
    }
  }
};
