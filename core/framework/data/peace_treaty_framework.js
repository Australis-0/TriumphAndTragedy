module.exports = {
  /*
    Peace treaty data structure:
    {
      status_quo: true/false,
      install_government: {
        "actual_user_id": {
          id: "actual_user_id",
          type: "democracy"
        }
      },
      cut_down_to_size: ["actual_user_id", "actual_user_id_2", "actual_user_id_3"],
      liberation: true/false,
      puppet: {
        "actual_user_id": {
          id: "actual_user_id",
          overlord: "overlord_id"
        }
      },
      retake_cores: ["actual_user_id", "actual_user_id_2"],
      annexation: {
        "actual_user_id": {
          id: "actual_user_id",
          provinces: ["4082", "2179", ...],
          annex_all:  true/false
        }
      }
    }

  */
  createPeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var war_obj = module.exports.getWar(war_name);

    //Make sure user doesn't already have a peace treaty registered
    if (!war_obj.peace_treaties[actual_id]) {
      var peace_treaty_obj = {
        id: actual_id,
        peace_demands: {}
      };

      war_obj.peace_treaties[actual_id] = peace_treaty_obj;
    }
  },

  deletePeaceTreaty: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var war_obj = module.exports.getWar(war_name);

    //Delete peace treaty object
    delete war_obj.peace_treaties[actual_id];
  },
};
