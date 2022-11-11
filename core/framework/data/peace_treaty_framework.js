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

  hasProvinceOwnerChange: function (arg0_province_id, arg1_peace_treaty_object) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_demands = Object.keys(peace_obj.peace_demands);
    var friendly_side = "";
    var new_owner;
    var opposing_side = "";
    var province_obj = main.provinces[province_id];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch friendly side
    if (war_obj.attackers.includes(peace_obj.id)) {
      friendly_side = "attackers";
      opposing_side = "defenders";
    }
    if (war_obj.defenders.includes(peace_obj.id)) {
      friendly_side = "defenders";
      opposing_side = "attackers";
    }

    //Cycle through all demands; only retake_cores and annexation can actually change the owner currently
    for (var i = 0; i < all_demands.length; i++) {
      var local_value = peace_obj.peace_demands[all_demands[i]];

      switch (all_demands[i]) {
        case "retake_cores":
          for (var x = 0; x < local_demands.length; x++) {
            var culture_obj = getCulture(province_obj.culture);

            if (war_obj[opposing_side].includes(province_obj.owner))
              if (culture_obj.primary_culture.includes(local_demands[x]))
                new_owner = local_value[i];
          }

          break;
        case "annexation":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++) {

            if (local_value[local_demands[x]].annex_all)
              if (local_value[local_demands[x]].annex_all.includes(province_obj.owner))
                new_owner = local_value[local_demands[x]].id;
            if (local_value[local_demands[x]].provinces)
              if (local_value[local_demands[x]].provinces.includes(province_obj.id));
                new_owner = local_value[local_demands[x]].id;
          }
      }
    }

    //Return statement
    return new_owner;
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
    for (var i = 0; i < all_demands.length; i++) {
      var local_value = peace_obj.peace_demands[all_demands[i]];

      switch (all_demands[i]) {
        case "status_quo":
          //Extract value from opposing side
          var total_money = 0;

          for (var x = 0; x < war_obj[opposing_side].length; x++) {
            var local_user = main.users[war_obj[opposing_side][x]];

            //Take 15% of their money
            local_user.money -= local_user.money*0.15;
            total_money += Math.ceil(local_user.money*0.15);
          }

          //Distribute total_money equally
          for (var x = 0; x < war_obj[friendly_side].length; x++) {
            var local_user = main.users[war_obj[friendly_side][x]];

            local_user.money += Math.ceil(total_money/war_obj[friendly_side].length);
          }

          break;
        case "install government":
          var local_demands = Object.keys(local_value);

          //Set government for all local demands
          for (var x = 0; x < local_demands.length; x++)
            setGovernment(local_demands[x], local_value[local_demands[x]].type);

          break;
        case "cut_down_to_size":
          //Cuts down each user to 10% of their military size
          for (var x = 0; x < local_value.length; x++) {
            var local_user = main.users[local_value[x]];
            var all_armies = Object.keys(local_user.armies);
            var all_reserve_units = Object.keys(local_user.reserves);

            //Disband all troops in reserves first
            for (var y = 0; y < all_reserve_units.length; y++)
              disbandUnits(local_value[i], Math.ceil(local_user.reserves[all_reserve_units[y]]*0.9), all_reserve_units[y]);

            for (var y = 0; y < all_armies.length; y++) {
              var local_army = local_user.armies[all_armies[y]];
              var all_units = Object.keys(local_army.units);


              //Relieve, then disband
              for (var z = 0; z < all_units.length; z++) {
                var amount = Math.ceil(local_army.units[all_units[z]]*0.9);

                relieveUnits(local_value[i], amount, all_units[z], local_army);
                disbandUnits(local_value[i], amount, all_units[z]);
              }
            }
          }

          break;
        case "liberation":
          //Liberates peace_obj.id from their overlord
          var vassal_obj = getVassal(peace_obj.id);

          if (vassal_obj)
            if (war_obj.attackers.includes(vassal_obj.overlord) || war_obj.defenders.includes(vassal_obj.overlord))
              dissolveVassal(peace_obj.id, vassal_obj.overlord);

          break;
        case "puppet":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++) {
            var local_user = main.users[local_demands[x]];
            var overlord_id = local_value[local_demands[x]].overlord;
            var overlord_obj = main.users[overlord_id];
            var vassal_obj = getVassal(local_demands[x]);

            //Preexisting vassal handler
            if (vassal_obj) {
              main.users[vassal_obj.overlord].diplomacy.used_diplomatic_slots--;
              dissolveVassal(local_demands[x]);
            }

            createVassal(local_demands[x], { target: overlord_id });
            overlord_obj.diplomacy.used_diplomatic_slots++;
          }

          break;
        case "retake_cores":
          for (var x = 0; x < local_value.length; x++) {
            var local_user = main.users[local_value[x]];

            //Go through all provinces on opposing side, and if the primary culutre of that province is the primary culture of local_user, set its controller and owner to them
            for (var y = 0; y < war_obj[opposing_side].length; y++) {
              var local_provinces = getProvinces(war_obj[opposing_side][y], { include_hostile_occupations: true });

              for (var z = 0; z < local_provinces.length; z++) {
                var culture_obj = getCulture(local_provinces[z].culture);

                if (culture_obj.primary_culture.includes(local_value[i]))
                  transferProvince(local_provinces[z].owner, { target: local_value[i], province_id: local_provinces[z].id });
              }
            }
          }

          break;
        case "annexation":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++) {
            if (local_value[local_demands[x]].annex_all)
              for (var y = 0; y < local_value[local_demands[x]].annex_all.length; y++)
                inherit(local_value[local_demands[x]].annex_all[y], local_demands[x]);
            if (local_value[local_demands[x]].provinces)
              for (var y = 0; y < local_value[local_demands[x]].provinces.length; y++) {
                var is_owned_by_enemy = false;
                var local_province = main.provinces[local_value[local_demands[x]].provinces[y]];

                //Check if the province is owned by enemy in the same war
                if (war_obj[opposing_side].includes(local_province.owner))
                  is_owned_by_enemy = true;

                if (is_owned_by_enemy)
                  transferProvince(local_province.owner, { target: local_demands[x], province_id: local_province.id });
              }
          }

          break;
      }
    }
  },

  parsePeaceTreatyString: function (arg0_war_obj, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_obj = arg0_war_obj;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_demands = Object.keys(peace_obj.peace_demands);
    var all_participants = [];
    var friendly_side = "";
    var opposing_side = "";
    var peace_string = [];

    //Fetch friendly side
    if (war_obj.attackers.includes(peace_obj.id)) {
      friendly_side = "attackers";
      opposing_side = "defenders";
    }
    if (war_obj.defenders.includes(peace_obj.id)) {
      friendly_side = "defenders";
      opposing_side = "attackers";
    }

    //Parse through all demands
    for (var i = 0; i < all_demands.length; i++) {
      var local_value = peace_obj.peace_demands[all_demands[i]];

      switch (all_demands[i]) {
        case "status_quo:":
          peace_string.push(`• The opposing side will be required to pay **15%** of their cash reserves as war reparations.`);

          break;
        case "install_government":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++)
            peace_string.push(`• The nation of **${main.users[local_demands[x]].name}** will be forced to change their government to ${config.governments[local_value[local_demands[x]].type].name.totoLowerCase()}.`);

          break;
        case "cut_down_to_size":
          for (var x = 0; x < local_value.length; x++)
            peace_string.push(`• **${main.users[local_value[x]].name}** will be required to demobilise and disband **90%** of its active forces in all its divisions and armies.`);

          break;
        case "liberation":
          peace_string.push(`• The country of **${main.users[peace_obj.id]}** has demanded their liberation from its overlord.`);

          break;
        case "puppet":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++)
            peace_string.push(`• **${main.users[local_value[local_demands[x]].overlord].name}** will gain overlordship over the nation of **${main.users[local_demands[x]].name}**.`);

          break;
        case "retake_cores":
          for (var x = 0; x < local_demands.length; x++)
            peace_string.push(`• **${main.users[local_demands[x]].name}** will be returned all of their core provinces from the opposing side.`);

          break;
        case "annexation":
          var local_demands = Object.keys(local_value);

          for (var x = 0; x < local_demands.length; x++)
            if (local_value[local_demands[x]].annex_all)
              for (var y = 0; y < local_value[local_demands[x]].annex_all.length; y++)
                peace_string.push(`• **${main.users[local_value[local_demands[x]].annex_all[y]].name}** will be annexed in their entirety by **${main.users[local_demands[x]].name}**.`);
            else {
              var local_provinces = local_value[local_demands[x]].provinces;
              var lost_provinces = {};

              for (var y = 0; y < local_provinces.length; y++) {
                var local_province = main.provinces[local_provinces[y]];

                if (local_province.owner)
                  if (lost_provinces[local_province.owner])
                    lost_provinces[local_province.owner].push(local_provinces[y]);
                  else
                    lost_provinces[local_province.owner] = [local_provinces[y]];
              }

              var all_losers = Object.keys(lost_provinces);

              for (var y = 0; y < all_losers.length; y++)
                peace_string.push(`• **${main.users[local_demands[x]].name}** will be ceded the provinces of **${lost_provinces[all_losers[y]].join(", ")}** from the nation of **${main.users[all_losers[y]].name}**.`);
            }

          break;
      }
    }

    if (peace_string.length == 0)
      peace_string.push(`• White Peace`);

    //Return statement
    return peace_string;
  }
};
