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
      //Check if usr.relations is alrady defined
      if (!usr.relations[actual_ot_user_id]) {
        usr.relations[actual_ot_user_id] = {
          value: relations_value,
          status: "stagnant"
        };
      } else {
        var relations_obj = usr.relations[actual_ot_user_id];

        //If relations are of default type, delete
        if (relations_obj.status == "stagnant" && relations_value == 0)
          delete usr.relations[actual_ot_user_id];
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
        if (!usr.relations[actual_ot_user_id]) {
          usr.relations[actual_ot_user_id] = {
            value: 0,
            improving_to: relations_value,

            status: improving_type,
            time_remaining: time_remaining
          };
        } else {
          var relations_obj = usr.relations[actual_ot_user_id];

          relations_obj.improving_to = relations_value;
          relations_obj.status = improving_type;
          relations_obj.time_remaining = time_remaining;
        }
    }
  }
};
