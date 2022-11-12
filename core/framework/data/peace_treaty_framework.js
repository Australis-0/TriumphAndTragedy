module.exports = {
  /*
    Peace treaty data structure:
    {
      //Wargoals are stored in an array to keep track of demand_limit
      wargoals: [
        {
          id: "cut_down_to_size",
          effect: {
            annex_all: {
              target_id: "user_id"
            },
            annexation: {
              user_id: {
                provinces: ["9701", "9702", ..] - Provinces to be annexed to user_id
              }
            },
            cut_down_to_size: {
              user_id: {
                air_force_removal: 1, - All <type>_removal fields are set to the same value if the demilitarisation of individual army types are not specified by the user
                army_removal: 0.50,
                navy_removal: 0.10,
                turns: -
              }
            },
            demilitarisation: {
              demilitarised_provinces: ["9701", "9702", ..],
              turns: -
            },
            free_oppressed_people: {
              user_id: {
                culture_id: {
                  provinces: ["9701", "9702", ..] - This is automatically as many provinces as possible held by that culture if not specified by the user
                }
              }
            },
            install_government: {
              user_id: {
                government_type: "democracy"
              }
            },
            liberation: ["user_id", ..],
            puppet: {
              vassal_id: "overlord_id"
            },
            release_client_state: {
              client_state_id: {
                overlord: "overlord_id",

                name: "Bufferland",
                colour: [100, 100, 100]
                flag: "",

                capital_id: "725",
                provinces: ["9701", "9702", ..]
              }
            },
            retake_cores: {
              oppressor_id: ["user_id"] - Takes all core provinces from oppressor_id
            },
            revoke_reparations: ["user_id", ..],
            seize_resources: [{
              owner: "owner_id", - The new owner of the seized resources
              debtor: "debtor_id", - vassal_id pays resources to owner_id

              inherit_actions: 0.50,
              inherit_money: 0.50,
              seize_iron: 0.70,
              seize_inventory: 0.25 - What % of the entire inventory is seized?
            }],
            steer_trade: {
              vassal_id: {
                overlord: "overlord_id" - Trade of vassal_id is commandeered by overlord_id,
                turns: 50 (optional)
              }
            },
            syphon_actions: [{
              owner: "user_id",
              debtor: "debtor_id", - Payments are made from debtor_id to user_id
              amount: 500,
              percentage_amount: 0.50, - Number of actions syphoned are determined by whether amount or percentage_amount are higher
              turns: 50
            }],
            war_reparations: [{
              owner: "user_id",
              debtor: "debtor_id", - Payments are made from debtor_id to user_id
              percentage_amount: 0.50,
              turns: 35
            }]
          }
        }
      ],
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
        war_id: war_obj.id,

        wargoals: []
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

  parsePeaceTreaty: function (arg0_war_name, arg1_peace_treaty_object) { //[WIP] - Refactor to new peace treaty data structure
    //Convert from parameters
    var war_name = arg0_war_name.trim().toLowerCase();
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
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

    war_obj.attacker_names = [];
    war_obj.defender_names = [];

    //Add all participants
    for (var i = 0; i < war_obj.attackers.length; i++) {
      all_participants.push(war_obj.attackers[i]);
      war_obj.attacker_names.push(main.users[war_obj.attackers[i]].name);
    }
    for (var i = 0; i < war_obj.defenders.length; i++) {
      all_participants.push(war_obj.defenders[i]);
      war_obj.defender_names.push(main.users[war_obj.defenders[i]].name);
    }

    //Archive war
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
    for (var i = 0; i < peace_obj.wargoals.length; i++)
      if (peace_obj.wargoals[i].effect) {
        var all_local_effects = Object.keys(peace_obj.wargoals[i].effect);
        var local_value = peace_obj.wargoals[i].effect;

        for (var x = 0; x < all_local_effects.length; x++)
          switch (all_local_effects[x]) {
            case "annex_all":
              var local_clauses = Object.keys(local_value.annex_all);

              for (var y = 0; y < local_clauses.length; y++)
                inherit(local_clauses[y], local_value.annex_all[local_clauses[y]]);

              break;
            case "annexation":
              var local_clauses = Object.keys(local_value.annexation);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_clause = local_value.annexation[local_clauses[y]];

                for (var z = 0; z < local_clause.provinces.length; z++)
                  try {
                    var local_province = main.provinces[local_clause.provinces[z]];

                    transferProvince(local_province.owner, { target: local_clauses[y], province_id: local_clause.provinces[z] });
                  } catch {}
              }

              break;
            case "cut_down_to_size":
              break;
            case "demilitarisation":
              break;
            case "free_oppressed_people":
              break;
            case "install_government":
              break;
            case "liberation":
              break;
            case "puppet":
              break;
            case "release_client_state":
              break;
            case "retake_cores":
              break;
            case "revoke_reparations":
              break;
            case "seize_resources":
              break;
            case "steer_trade":
              break;
            case "syphon_actions":
              break;
            case "war_reparations":
              break;
          }
      }
  }
};
