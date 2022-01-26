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
    var war_obj = getWar(war_name);

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
    var war_obj = getWar(war_name);

    //Delete peace treaty object
    delete war_obj.peace_treaties[actual_id];
  },

  parsePeaceTreaty: function (arg0_war_name, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_name = arg0_war_name.trim().toLowerCase();
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_demands = Object.keys(peace_obj.peace_demands);
    var all_participants = [];
    var friendly_side = "";
    var opposing_side = "";
    var war_obj = JSON.parse(JSON.stringify(getWar(war_name)));

    //Fetch friendly side
    if (war_obj.attackers.includes(peace_obj.id)) {
      friendly_side = "attackers";
      opposing_side = "defenders";
    }
    if (war_obj.defenders.includes(peace_obj.id)) {
      friendly_side = "defenders";
      opposing_side = "attackers";
    }

    //Archive war
    for (var i = 0; i < war_obj.attackers.length; i++)
      all_participants.push(war_obj.attackers[i]);
    for (var i = 0; i < war_obj.defenders.length; i++)
      all_participants.push(war_obj.defenders[i]);

    archiveWar(war_name);

    //End war first; lift all occupations
    for (var i = 0; i < all_participants.length; i++) {
      var local_provinces = getProvinces(all_participants[i], { include_hostile_occupations: true });
      var local_user = main.users[all_participants[i]];

      for (var x = 0; x < local_provinces.length; x++) {
        if (local_provinces[x].controller != local_provinces[x].owner) {
          //Check if controller is still at war with owner
          if (!areAtWar(local_provinces[x].controller, local_provinces[x].owner))
            //Revert control
            local_provinces[x].controller = local_provinces[x].owner;
        }
      }
    }

    //Parse peace treaty
    for (var i = 0; i < all_demands.length; i++) {
      var local_value = peace_obj.peace_demands[all_demands[i]];

      switch (all_demands[i]) {
        case "status_quo":
          //Extract value from opposing side
          var total_money = 0;

          for (var i = 0; i < war_obj[opposing_side].length; i++) {
            var local_user = main.users[war_obj[opposing_side][i]];

            //Take 15% of their money
            local_user.money -= local_user.money*0.15;
            total_money += Math.ceil(local_user.money*0.15);
          }

          //Distribute total_money equally
          for (var i = 0; i < war_obj[friendly_side].length; i++) {
            var local_user = main.users[war_obj[friendly_side][i]];

            local_user.money += Math.ceil(total_money/war_obj[friendly_side].length);
          }

          break;
        case "install government":
          var local_demands = Object.keys(local_value);

          //Set government for all local demands
          for (var i = 0; i < local_demands.length; i++)
            setGovernment(local_demands[i], local_value[local_demands[i]].type);

          break;
        case "cut_down_to_size":
          //Cuts down each user to 10% of their military size
          for (var i = 0; i < local_value.length; i++) {
            var local_user = main.users[local_value[i]];
            var all_armies = Object.keys(local_user.armies);

            for (var x = 0; x < all_armies.length; x++) {
              var local_army = local_user.armies[all_armies[x]];
              var all_units = Object.keys(local_army.units);

              //Relieve, then disband
              for (var y = 0; y < all_units.length; y++) {
                var amount = Math.ceil(local_army.units[all_units[y]]*0.9);

                relieveUnits(local_value[i], amount, all_units[y], local_army);
                disbandUnits(local_value[i], amount, all_units[y]);
              }
            }
          }

          break;
      }
    }
  }
};
