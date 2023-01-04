module.exports = {
  /*
    Peace treaty data structure:
     {
      id: peace_obj_id,
      war_id: war_id,

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
                air_removal: 1, - All <type>_removal fields are set to the same value if the demilitarisation of individual army types are not specified by the user
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

  createPeaceTreaty: function (arg0_user, arg1_war_name, arg2_simulation) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ?
      arg1_war_name.trim().toLowerCase() :
      arg1_war_name;
    var simulation = arg2_simulation;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Make sure user doesn't already have a peace treaty registered
    if (!war_obj.peace_treaties[actual_id] || simulation) {
      var peace_treaty_obj = {
        id: actual_id,
        war_id: war_obj.id,

        wargoals: []
      };

      if (!simulation)
        war_obj.peace_treaties[actual_id] = peace_treaty_obj;
      if (simulation)
        return peace_treaty_obj;
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

  getPeaceTreatyInfamy: function (arg0_war_name, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_name = (typeof arg0_war_name != "object") ? arg0_war_name.trim().toLowerCase() : arg0_war_name;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var enemy_provinces = 0;
    var enemy_vassals = [];
    var friendly_side = "";
    var infamy_map = {};
    var opposing_side = "";
    var usr = main.users[peace_obj.id];
    var war_obj = (typeof war_name != "object") ? JSON.parse(JSON.stringify(getWar(war_name))) : war_name;

    var cb_obj = getCB(war_obj.cb);
    var infamy_scaling = returnSafeNumber(cb_obj.infamy_scaling, 1);

    //Fetch friendly side
    if (war_obj.attackers.includes(peace_obj.id)) {
      friendly_side = "attackers";
      opposing_side = "defenders";
    }
    if (war_obj.defenders.includes(peace_obj.id)) {
      friendly_side = "defenders";
      opposing_side = "attackers";
    }

    //Fetch enemy_provinces
    for (var i = 0; i < war_obj[opposing_side].length; i++)
      enemy_provinces += main.users[war_obj[opposing_side][i]].provinces;

    //Fetch enemy_vassals
    for (var i = 0; i < war_obj[opposing_side].length; i++) {
      var local_user = main.users[war_obj[opposing_side][i]];
      var local_vassals = Object.keys(local_user.diplomacy.vassals);

      for (var x = 0; x < local_vassals.length; x++) {
        var local_vassal = local_user.diplomacy.vassals[local_vassals[x]];

        if (local_vassal.overlord == war_obj[opposing_side][i])
          if (!enemy_vassals.includes(local_vassal.id))
            enemy_vassals.push(local_vassal.id);
      }
    }

    //Iterate over each wargoal to determine the infamy map and primary recipients
    for (var i = 0; i < peace_obj.wargoals.length; i++) {
      var local_wargoal = getWargoal(peace_obj.wargoals[i].id);
      var local_value = peace_obj.wargoals[i].effect;

      if (local_wargoal)
        if (local_wargoal.infamy) {
          var enemy_soldiers = 0;
          var infamy_obj = local_wargoal.infamy;
          var provinces_affected = [];
          var recipient_count = {};
          var total_percentage = 0; //Counts total percentage of all wargoals to adjust for
          var total_percentage_affected = 0;
          var type_count = {};
          var wargoal_infamy = 0; //All infamy lands on the primary beneficiary of the wargoal

          //Initialise enemy soldiers
          for (var i = 0; i < war_obj[opposing_side].length; i++)
            enemy_soldiers += getTotalSoldiers(war_obj[opposing_side][i]);

          //Initialise recipient_count
          for (var i = 0; i < all_users.length; i++)
            recipient_count[all_users[i]] = 0;

          //Begin iterating over all wargoal effects
          if (local_value) {
            var all_local_effects = Object.keys(local_value);

            for (var x = 0; x < all_local_effects.length; x++)
              switch (all_local_effects[x]) {
                case "annex_all":
                  var local_clauses = Object.keys(local_value.annex_all);
                  var provinces_taken = 0;

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_target_id = local_value.annex_all[local_clauses[y]];
                    var local_provinces = getProvinces(local_target_id, { include_hostile_occupations: true });

                    var local_recipient = main.users[local_clauses[y]];
                    var local_target = main.users[local_target_id];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    //Add to tracker variables
                    provinces_taken += local_target.provinces;
                    recipient_count[local_clauses[y]]++;

                    //Iterate over all province types
                    for (var z = 0; z < local_provinces.length; z++) {
                      var local_province = local_provinces[z];

                      if (!provinces_affected.includes(local_provinces[z].id))
                        provinces_affected.push(local_provinces[z].id);

                      if (local_province.type)
                        type_count[local_province.type] = (type_count[local_province.type]) ?
                          type_count[local_province.type] + 1 :
                          1;
                    }
                  }

                  //Percentage calculation
                  var percentage_affected = provinces_taken/enemy_provinces;

                  total_percentage_affected += percentage_affected;
                  total_percentage++;

                  break;
                case "annexation":
                  var local_clauses = Object.keys(local_value.annexation);
                  var provinces_taken = {};

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_recipient = main.users[local_clauses[y]];
                    var target_obj = local_value.annexation[local_clauses[y]];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    //Iterate over all provinces
                    for (var z = 0; z < target_obj.provinces.length; z++) {
                      var local_province = main.provinces[target_obj.provinces[z]];

                      provinces_taken[local_province.owner] = (provinces_taken[local_province.owner]) ?
                        provinces_taken[local_province.owner] + 1 :
                        1;

                      if (!provinces_affected.includes(target_obj.provinces[z]))
                        provinces_affected.push(target_obj.provinces[z]);

                      if (local_province.type)
                        type_count[local_province.type] = (type_count[local_province.type]) ?
                          type_count[local_province.type] + 1 :
                          1;
                    }
                  }

                  //Perecentage calculation
                  var all_targets = Object.keys(provinces_taken);
                  var percentage_affected = 0;

                  for (var y = 0; y < all_targets.length; y++) {
                    var local_target = main.users[all_targets[y]];

                    percentage_affected += provinces_taken[all_targets[y]]/local_target.provinces;
                  }

                  percentage_affected = percentage_affected/all_targets.length;

                  total_percentage_affected += percentage_affected;
                  total_percentage++;

                  break;
                case "cut_down_to_size":
                  var local_clauses = Object.keys(local_value.cut_down_to_size);
                  var enemy_soldiers_disbanded = 0;

                  //Track recipient
                  recipient_count[peace_obj.id]++;

                  //Fetch enemy_soldiers_disbanded
                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_target = main.users[local_clauses[y]];
                    var target_armies = Object.keys(local_target.armies);
                    var target_obj = local_value.cut_down_to_size[local_clauses[y]];

                    var local_keys = Object.keys(target_obj);

                    for (var z = 0; z < local_keys.length; z++) {
                      var local_amount = target_obj[local_keys[z]];

                      if (local_keys[z].includes("_removal")) {
                        var local_key = local_keys[z].replace("_removal", "");

                        for (var a = 0; a < target_armies.length; a++) {
                          var local_army = local_target.armies[target_armies[a]];

                          if (local_army.type == local_key)
                            enemy_soldiers_disbanded += getArmySize(local_clauses[y], local_army);
                        }
                      }
                    }

                    //Percentage calculation
                    total_percentage_affected = enemy_soldiers_disbanded/enemy_soldiers;
                    total_percentage++;
                  }

                  break;
                case "demilitarisation":
                  var provinces_demilitarised = 0;

                  //Track recipient
                  recipient_count[peace_obj.id]++;

                  for (var y = 0; y < local_value.demilitarisation.demilitarised_provinces.length; y++) {
                    var local_province = main.provinces[local_value.demilitarisation.demilitarised_provinces.length];

                    if (!provinces_affected.includes(local_provinces[z]))
                      provinces_affected.push(local_provinces[z]);

                    if (local_province.type)
                      type_count[local_province.type] = (type_count[local_province.type]) ?
                        type_count[local_province.type] + 1 :
                        1;

                    provinces_demilitarised++;
                  }

                  //Percentage calculation
                  total_percentage_affected += provinces_demilitarised/enemy_provinces;
                  total_percentage++;

                  break;
                case "free_oppressed_people":
                  var local_clauses = Object.keys(local_value.free_oppressed_people);

                  //Track recipient
                  recipient_count[peace_obj.id]++;

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_target = main.users[local_clauses[y]];
                    var provinces_taken = 0;
                    var target_obj = local_value.free_oppressed_people[local_clauses[y]];

                    //Get local_culture
                    var culture_ids = Object.keys(target_obj);

                    for (var z = 0; z < culture_ids.length; z++) {
                      var local_culture = target_obj[culture_ids[z]];

                      for (var a = 0; a < local_culture.provinces.length; a++) {
                        var local_province = main.provinces[local_culture.provinces[a]];

                        if (!provinces_affected.includes(local_culture.provinces[a]))
                          provinces_affected.push(local_culture.provinces[a]);;

                        if (local_province.type)
                          type_count[local_province.type] = (type_count[local_province.type]) ?
                            type_count[local_province.type] + 1 :
                            1;
                      }

                      provinces_taken += local_culture.provinces.length;
                    }

                    //Percentage calculation is per user
                    total_percentage_affected += provinces_taken/local_target.provinces;
                    total_percentage++;
                  }

                  break;
                case "install_government":
                  var local_clauses = Object.keys(local_value.install_government);

                  //Track recipient
                  recipient_count[peace_obj.id]++;

                  //Percentage calculation
                  total_percentage_affected += local_clauses.length/war_obj[opposing_side].length;
                  total_percentage++;

                  break;
                case "liberation":
                  //Track recipient
                  for (var y = 0; y < local_value.liberation.length; y++)
                    recipient_count[local_value.liberation[y]]++;

                  //Percentage calculation
                  total_percentage_affected += local_value.liberation.length/enemy_vassals.length;
                  total_percentage++;

                  break;
                case "puppet":
                  var local_clauses = Object.keys(local_value.puppet);

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_recipient = main.users[local_value.puppet[local_clauses[y]]];
                    var local_target = main.users[local_clauses[y]];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    var local_provinces = getProvinces(local_clauses[y], { include_hostile_occupations: true });

                    for (var a = 0; a < local_provinces.length; a++) {
                      if (!provinces_affected.includes(local_provinces[a].id))
                        provinces_affected.push(local_provinces[a].id);

                      if (local_provinces[a].type)
                        type_count[local_provinces[a].type] = (type_count[local_provinces[a].type]) ?
                          type_count[local_provinces[a].type] + 1 :
                          1;
                    }
                  }

                  //Percentage calculation is per user
                  total_percentage_affected += local_clauses.length/war_obj[opposing_side].length;
                  total_percentage++;

                  break;
                case "release_client_state":
                  var local_clauses = Object.keys(local_value.release_client_state);
                  var provinces_taken = 0;

                  for (var y = 0; y < local_clauses.length; y++) {
                    var target_obj = local_value.release_client_state[local_clauses[y]];

                    var local_recipient = main.users[target_obj.overlord];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    for (var a = 0; a < target_obj.provinces.length; a++) {
                      var local_province = main.provinces[target_obj.provinces[a]];

                      if (!provinces_affected.includes(target_obj.provinces[a]))
                        provinces_affected.push(target_obj.provinces[a]);

                      if (local_province.type)
                        type_count[local_province.type] = (type_count[local_province.type]) ?
                          type_count[local_province.type] + 1 :
                          1;
                    }

                    provinces_taken += target_obj.provinces.length;
                  }

                  //Percentage calculation
                  total_percentage_affected += provinces_taken/enemy_provinces;
                  total_percentage++;

                  break;
                case "retake_cores":
                  var local_clauses = Object.keys(local_value.release_client_state);
                  var provinces_taken = 0;

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_clause = local_value.retake_cores[local_clauses[y]];
                    var local_target = main.users[local_clauses[y]];

                    for (var z = 0; z < local_clause.length; z++) {
                      var all_target_provinces = getProvinces(local_clauses[y], { include_hostile_occupations: true });
                      var local_provinces = [];
                      var local_recipient = main.users[local_clause[z]];

                      //Track recipient
                      recipient_count[local_recipient.id]++;

                      //Fetch local_provinces with a .culture matching the primary culture of local_recipient
                      for (var a = 0; a < all_target_provinces.length; a++)
                        if (all_target_provinces[a].culture == local_recipient.pops.primary_culture)
                          local_provinces.push(all_target_provinces[a]);

                      //Province counter
                      for (var a = 0; a < local_provinces.length; a++) {
                        if (!provinces_affected.includes(local_provinces[a].id))
                          provinces_affected.push(local_provinces[a].id);

                        if (local_provinces[a].type)
                          type_count[local_provinces[a].type] = (type_count[local_provinces[a].type]) ?
                            type_count[local_provinces[a].type] + 1 :
                            1;
                      }

                      provinces_taken += local_provinces.length;
                    }

                    //Percentage calculation
                    total_percentage_affected += provinces_taken/enemy_provinces;
                    total_percentage++;
                  }

                  break;
                case "revoke_reparations":
                  //Track recipient
                  for (var i = 0; i < local_value.revoke_reparations.length; i++)
                    recipient_count[local_value.revoke_reparations[i]]++;

                  //Percentage calculation
                  total_percentage_affected += local_value.revoke_reparations.length/war_obj[friendly_side].length;
                  total_percentage++;

                  break;
                case "seize_resources":
                  for (var y = 0; y < local_value.seize_resources.length; y++) {
                    var target_obj = local_value.seize_resources[y];

                    var local_clauses = Object.keys(target_obj);
                    var local_recipient = main.users[target_obj.owner];
                    var local_target = main.users[target_obj.debtor];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    //Percentage calculations are by user - actions, money, and inventory all equal 100%, each resource is 1/total_goods that
                    for (var z = 0; z < local_clauses.length; z++) {
                      var local_amount = target_obj[local_clauses[z]];

                      if (local_clauses[z].startsWith("inherit_")) {
                        var local_key = local_clauses[z].replace("inherit_", "");

                        total_percentage_affected += local_amount;
                        total_percentage++;
                      } else if (local_clauses[z] == "seize_inventory") {
                        total_percentage_affected += local_amount;
                        total_percentage++;
                      } else if (local_clauses[z].startsWith("seize_")) {
                        var local_key = local_clauses[z].replace("seize_", "");

                        total_percentage_affected += local_amount/lookup.all_goods_array.length;
                        total_percentage += 1/lookup.all_goods_array.length;
                      }
                    }
                  }

                  break;
                case "steer_trade":
                  var local_clauses = Object.keys(local_value.steer_trade);

                  for (var y = 0; y < local_clauses.length; y++) {
                    var local_clause = local_value.steer_trade[local_clauses[y]];
                    var local_recipient = main.users[local_clause.overlord];

                    //Track recipient
                    recipient_count[local_recipient.id]++;
                  }

                  //Percentage calculation
                  total_percentage_affected += Object.keys(local_value.steer_trade).length/war_obj[opposing_side].length;
                  total_percentage++;

                  break;
                case "syphon_actions":
                  var total_percentage_amount = 0;

                  for (var y = 0; y < local_value.syphon_actions.length; y++) {
                    var target_obj = local_value.syphon_actions[y];
                    var local_recipient = main.users[target_obj.owner];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    total_percentage_amount += returnSafeNumber(target_obj.percentage_amount);
                  }

                  //Percentage calculation
                  total_percentage_affected += total_percentage_amount/war_obj[opposing_side].length;
                  total_percentage++;

                  break;
                case "war_reparations":
                  var total_percentage_amount = 0;

                  for (var y = 0; y < local_value.war_reparations.length; y++) {
                    var target_obj = local_value.war_reparations[y];

                    var local_recipient = main.users[target_obj.owner];

                    //Track recipient
                    recipient_count[local_recipient.id]++;

                    total_percentage_amount += returnSafeNumber(target_obj.percentage_amount);
                  }

                  //Percentage calculation
                  total_percentage_affected += total_percentage_amount/war_obj[opposing_side].length;
                  total_percentage++;

                  break;
              }
          }

          //Get primary beneficiary
          var all_recipients = Object.keys(recipient_count);
          var biggest_recipient = [peace_obj.id, 0];
          var primary_beneficiary = peace_obj.id;

          for (var x = 0; x < all_recipients.length; x++) {
            var local_recipient_count = recipient_count[all_recipients[x]];

            if (local_recipient_count > biggest_recipient[1])
              biggest_recipient = [all_recipients[x], local_recipient_count];
          }

          primary_beneficiary = biggest_recipient[0];

          //Add infamy to primary beneficiary's infamy_map
          var default_infamy_keys = ["infamy_per_percentage", "infamy_per_province", "maximum_infamy", "minimum_infamy"];

          if (infamy_obj) {
            if (infamy_obj.minimum_infamy)
              wargoal_infamy += infamy_obj.minimum_infamy;

            //Percentage handler
            var absolute_percentage = returnSafeNumber(total_percentage_affected/total_percentage);

            if (infamy_obj.infamy_per_percentage)
              wargoal_infamy += absolute_percentage*infamy_obj.infamy_per_percentage*100;

            //Per province handler
            if (infamy_obj.infamy_per_province)
              wargoal_infamy += provinces_affected.length*infamy_obj.infamy_per_province;

            //Per type handler
            var all_infamy_keys = Object.keys(infamy_obj);

            for (var x = 0; x < all_infamy_keys.length; x++)
              if (!default_infamy_keys.includes(all_infamy_keys[x])) {
                var local_infamy_key = all_infamy_keys[x].replace("infamy_per_", "");

                if (type_count[local_infamy_key])
                  wargoal_infamy += returnSafeNumber(type_count[local_infamy_key]*infamy_obj[all_infamy_keys[x]]);
              }

            //Cap infamy
            if (infamy_obj.maximum_infamy)
              wargoal_infamy = Math.min(wargoal_infamy, returnSafeNumber(infamy_obj.maximum_infamy));

            //Apply infamy_scaling
            wargoal_infamy = wargoal_infamy*infamy_scaling;

            //Add infamy to primary beneficiary
            infamy_map[primary_beneficiary] = (infamy_map[primary_beneficiary]) ?
              infamy_map[primary_beneficiary] + wargoal_infamy :
              wargoal_infamy;
          }
      }
    }

    //Return statement
    return infamy_map;
  },

  getWargoalInfamy: function (arg0_user, arg1_war_obj, arg2_wargoal_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = arg1_war_obj;
    var wargoal_obj = arg2_wargoal_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var peace_treaty_simulation = module.exports.createPeaceTreaty(user_id, war_obj, true);
    var usr = main.users[actual_id];

    //Push current wargoal
    peace_treaty_simulation.wargoals.push(wargoal_obj);

    //Return statement
    return module.exports.getPeaceTreatyInfamy(war_obj, peace_treaty_simulation);
  },

  parsePeaceTreaty: function (arg0_war_name, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_name = (typeof arg0_war_name != "object") ? arg0_war_name.trim().toLowerCase() : war_name;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_participants = [];
    var friendly_side = "";
    var opposing_side = "";
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    var all_war_keys = Object.keys(war_obj);
    var infamy_map = module.exports.getPeaceTreatyInfamy(war_obj, peace_obj);

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
    archiveWar(war_obj);

    //End war first; lift all occupations
    for (var i = 0; i < all_participants.length; i++) {
      var local_provinces = getProvinces(all_participants[i], { include_hostile_occupations: true });
      var local_user = main.users[all_participants[i]];

      if (local_provinces.length > 0)
        for (var x = 0; x < local_provinces.length; x++) {
          if (local_provinces[x].controller != local_provinces[x].owner) {
            //Check if controller is still at war with owner
            if (!areAtWar(local_provinces[x].controller, local_provinces[x].owner))
              //Revert control
              local_provinces[x].controller = local_provinces[x].owner;
          }
        }
    }

    //End war first; repatriate all volunteer armies
    for (var i = 0; i < all_war_keys.length; i++)
      if (all_war_keys[i].includes("_sent_volunteers")) {
        var local_id = all_war_keys[i].replace("_sent_volunteers", "");
        var local_user = main.users[local_id];

        if (local_user) {
          var local_armies = Object.keys(local_user.armies);

          for (var x = 0; x < local_armies.length; x++) {
            var local_army = local_user.armies[local_armies[x]];

            if (local_army.volunteering)
              if (local_army.volunteering[1] == war_obj.id)
                delete local_army.volunteering;
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
              var local_clauses = Object.keys(local_value.cut_down_to_size);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_target = main.users[local_clauses[y]];
                var target_obj = local_value.cut_down_to_size[local_clauses[y]];

                var target_keys = Object.keys(target_obj);

                //Loop through all cut_down_to_size keys
                for (var z = 0; z < target_keys.length; z++)
                  if (target_keys[z].includes("_removal")) {
                    var army_type = target_keys[z].replace("_removal", "");
                    var local_value = target_obj[target_keys[z]];

                    dissolveUnits(local_clauses[y], {
                      type: army_type,
                      percentage_amount: local_value
                    });
                  } else if (target_keys[z] == "turns") {
                    var current_duration = 0;

                    //Check for current_duration, add to it if it already exists
                    if (target_obj.cooldowns.recruitment_disabled)
                      current_duration = returnSafeNumber(target_obj.cooldowns.recruitment_disabled.duration);

                    target_obj.cooldowns.recruitment_disabled = {
                      duration: current_duration + local_value
                    };
                  }
              }

              break;
            case "demilitarisation":
              var demilitarised_provinces = local_value.demilitarisation.demilitarised_provinces;

              //Check for demilitarised provinces
              if (demilitarised_provinces)
                for (var y = 0; y < demilitarised_provinces.length; y++) {
                  var local_province = demilitarised_provinces[y];

                  //Set province as demiltiarised
                  local_province[y].demilitarised = true;
                }

              //Push to main.global.cooldowns
              if (local_value.demilitarisation.turns) {
                var all_cooldowns = Object.keys(main.global.cooldowns);
                var cooldown_id = generateGlobalCooldownID("demilitarisation");

                //Remove demilitarised_provinces from all cooldowns
                for (var y = 0; y < all_cooldowns.length; y++) {
                  var local_cooldown = main.global.cooldowns[all_cooldowns[y]];

                  if (all_cooldowns[y].includes("demilitarisation"))
                    for (var z = 0; z < demilitarised_provinces.length; z++) {
                      var local_index = local_cooldown.demilitarised_provinces.indexOf(demilitarised_provinces[z]);

                      //If local_index is found, splice it
                      local_cooldown.demilitarised_provinces.splice(local_index, 1);
                    }
                }

                main.global.cooldowns[cooldown_id] = {
                  demilitarised_provinces: demilitarised_provinces,

                  duration: (local_value.demilitarisation.turns) ? local_value.demilitarisation.turns : 1000
                };
              }

              break;
            case "free_oppressed_people":
              var local_clauses = Object.keys(local_value.free_oppressed_people);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_target = main.users[local_clauses[y]];
                var target_obj = local_value.free_oppressed_people[local_clauses[y]];

                var local_keys = Object.keys(target_obj);

                for (var z = 0; z < local_keys.length; z++)
                  try {
                    //Initialise country, set local_recipient
                    var culture_obj = main.global.cultures[local_keys[z]];
                    var local_culture = target_obj[local_keys[z]];
                    var recipient_state_id = module.exports.generateClientStateID(local_clauses[y]);

                    var local_recipient = initCountry(recipient_state_id, culture_obj.name);

                    //Transfer provinces to recipient
                    for (var a = 0; a < local_culture.provinces.length; a++)
                      transferProvince(local_clauses[y], { target: recipient_state_id, province_id: local_culture.provinces[a] });
                  } catch {}
              }

              break;
            case "install_government":
              var local_clauses = Object.keys(local_value.install_government);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_target = main.users[local_clauses[y]];

                //Change government type, but don't set party popularity
                local_target.government = local_value.install_government[local_clauses[y]];
              }

              break;
            case "liberation":
              for (var y = 0; y < local_value.liberation.length; y++)
                dissolveVassal(local_value.liberation[y]);

              break;
            case "puppet":
              var local_clauses = Object.keys(local_value.puppet);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_clause = local_value.puppet[local_clauses[y]];

                //Set target as vassal
                createVassal(local_clause, local_clauses[y]);
              }

              break;
            case "release_client_state":
              var local_clauses = Object.keys(local_value.release_client_state);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_clause = local_value.release_client_state[local_clauses[y]];
                var local_recipient = initCountry(local_clauses[y], local_clause.name);
                var local_user = main.users[local_clauses[y]];

                //Cede provinces
                for (var z = 0; z < local_clause.provinces.length; z++) {
                  var local_province = main.provinces[local_clause.provinces[z]];

                  //Transfer local_province to local_clauses[y]
                  transferProvince(local_province.owner, { target: local_clauses[y], province_id: local_clause.provinces[z] });
                }

                //Edit culture
                try {
                  var culture_obj;

                  if (local_clause.capital_id) {
                    var capital_obj = main.provinces[local_clause.capital_id];

                    if (capital_obj.culture)
                      culture_obj = main.global.cultures[capital_obj.culture];
                  } else {
                    var random_province = main.provinces[randomElement(local_clause.provinces[z])];

                    culture_obj = main.global.cultures[random_province.culture];
                  }

                  //Add as primary and accepted culture
                  culture_obj.primary_culture.push(local_clauses[y]);

                  local_user.pops.accepted_culture = [culture_obj.id];
                  local_user.pops.primary_culture = culture_obj.id;
                } catch (e) {
                  console.log(e);
                }

                //Edit client state fields
                if (local_clause.capital_id)
                  moveCapital(local_recipient, local_clause.capital_id, true, true);
                if (local_clause.colour)
                  setColour(local_clauses[y], local_clause.colour[0], local_clause.colour[1], local_clause.colour[2], true, true);
                if (local_clause.flag)
                  setFlag(local_clauses[y], local_clause.flag, true, true);

                //Add as vassal
                createVassal(local_clause.overlord, { target: local_clauses[y] });
              }

              break;
            case "retake_cores":
              var local_clauses = Object.keys(local_value.retake_cores);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_clause = local_value.retake_cores[local_clauses[y]];
                var local_target = main.users[local_clauses[y]];

                for (var z = 0; z < local_clause.length; z++) {
                  var all_target_provinces = getProvinces(local_clauses[y], { include_hostile_occupations: true });
                  var local_provinces = [];
                  var local_recipient = main.users[local_clause[z]];

                  //Fetch local_provinces with a .culture matching the primary culture of local_recipient
                  for (var a = 0; a < all_target_provinces.length; a++)
                    if (all_target_provinces[a].culture == local_recipient.pops.primary_culture)
                      local_provinces.push(all_target_provinces[a]);

                  //Transfer provinces
                  for (var a = 0; a < local_provinces.length; a++)
                    transferProvince(local_clauses[y], { target: local_clause[z], province_id: local_provinces[a] });
                }
              }

              break;
            case "revoke_reparations":
              for (var y = 0; y < local_value.revoke_reparations.length; y++) {
                var local_recipient = main.users[local_value.revoke_reparations[y]];
                var recipient_cooldowns = Object.keys(local_recipient.cooldowns);

                //Remove reparations cooldown from this user
                for (var z = 0; z < recipient_cooldowns.length; z++)
                  if (
                    recipient_cooldowns.includes("steer_trade") ||
                    recipient_cooldowns.includes("syphon_actions") ||
                    recipient_cooldowns.includes("war_reparations")
                  )
                    delete local_recipient.cooldowns[recipient_cooldowns[z]];
              }

              break;
            case "seize_resources":
              for (var y = 0; y < local_value.seize_resources.length; y++) {
                var goods_obj = {};
                var local_clause = local_value.seize_resources[y];
                var local_clauses = Object.keys(local_clause);
                var local_recipient = main.users[local_clause.owner];
                var local_target = main.users[local_clause.debtor];

                for (var z = 0; z < local_clauses.length; z++) {
                  var local_clause_value = local_clause[local_clauses[z]];

                  //Add both custom and default keys to goods_obj
                  if (local_clauses[z] == "inherit_actions")
                    goods_obj.actions = local_clause_value;
                  if (local_clauses[z] == "inherit_money")
                    goods_obj.money = local_clause_value;

                  if (local_clauses[z].includes("seize_"))
                    goods_obj[local_clauses[z].replace("seize_", "")] = local_clause_value;
                }

                //Add goods_obj from local_target to local_recipient's inventory
                var all_goods = Object.keys(goods_obj);

                for (var z = 0; z < all_goods.length; z++) {
                  var local_percentage = goods_obj[all_goods[z]];

                  if (all_goods[z] == "actions" || all_goods[z] == "money") {
                    var local_amount = Math.ceil(local_target[all_goods[z]]*(1 - local_percentage));

                    local_target[all_goods[z]] -= local_amount;
                    local_recipient[all_goods[z]] += local_amount;
                  } else if (all_goods[z] == "inventory") {
                    var all_goods = Object.keys(lookup.all_goods);

                    for (var a = 0; a < all_goods.length; a++) {
                      var local_good = lookup.all_goods[all_goods[a]];

                      if (!local_good.is_cp && !local_good.doesnt_stack) {
                        var local_amount = Math.ceil(local_target.inventory[local_goods[a]]*(1 - local_percentage));

                        local_target.inventory[local_goods[a]] -= local_amount;
                        local_recipient.inventory[local_goods[a]] += local_amount;
                      }
                    }
                  } else {
                    var local_amount = Math.ceil(local_target.inventory[all_goods[z]]*(1 - local_percentage));

                    local_target.inventory[all_goods[z]] -= local_amount;
                    local_recipient.inventory[all_goods[z]] += local_amount;
                  }
                }
              }

              break;
            case "steer_trade":
              var local_clauses = Object.keys(local_value.steer_trade);

              for (var y = 0; y < local_clauses.length; y++) {
                var local_clause = local_value.steer_trade[local_clauses[y]];
                var local_recipient = main.users[local_clause.overlord];
                var local_target = main.users[local_clauses[y]];

                //Append to cooldown
                var cooldown_id = generateUserCooldownID(local_clauses[y], "steer_trade");

                local_target.cooldowns[cooldown_id] = {
                  overlord: local_clause.overlord,

                  duration: (local_clause.turns) ? local_clause.turns : 1000
                };
              }

              break;
            case "syphon_actions":
              for (var y = 0; y < local_value.syphon_actions.length; y++) {
                var local_clause = local_value.syphon_actions[y];
                var local_recipient = main.users[local_clause.owner];
                var local_target = main.users[local_clause.debtor];

                //Add to local_target.cooldowns
                var cooldown_id = generateUserCooldownID(local_clause.debtor, "syphon_actions");

                local_target.cooldowns[cooldown_id] = {
                  owner: local_clause.owner,

                  amount: local_clause.amount,
                  percentage_amount: local_clause.percentage_amount,

                  duration: (local_clause.turns) ? local_clause.turns : 1000
                };
              }

              break;
            case "war_reparations":
              for (var y = 0; y < local_value.war_reparations.length; y++) {
                var local_clause = local_value.war_reparations[y];
                var local_recipient = main.users[local_clause.owner];
                var local_target = main.users[local_clause.debtor];

                //Add to local_target.cooldowns
                var cooldown_id = generateUserCooldownID(local_clause.debtor, "war_reparations");

                local_target.cooldowns[cooldown_id] = {
                  owner: local_clause.owner,

                  percentage_amount: local_clause.amount,

                  duration: (local_clause.turns) ? local_clause.turns : 1000
                };
              }

              break;
          }
      }

    //Apply infamy
    var all_infamy_keys = Object.keys(infamy_map);

    for (var i = 0; i < all_infamy_keys.length; i++) {
      var local_amount = infamy_map[all_infamy_keys[i]];
      var local_user = main.users[all_infamy_keys[i]];

      //Add to local_user.infamy
      if (local_user)
        local_user.infamy += returnSafeNumber(local_amount);
    }
  }
};
