module.exports = {
  createBlockade: function (arg0_user, arg1_blockading_user, arg2_fleet_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_blockading_user;
    var fleet_name = arg2_fleet_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var army_obj = getArmy(ot_user_id, fleet_name);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if the fleet even exists
    if (usr) {
      if (ot_user) {
        if (army_obj) {
          if (army_obj.type == "navy") {
            //Check to make sure that the local army can actually blockade
            if (returnSafeNumber(army_obj.blockade_recovery_turns) == 0) {
              //Check if the user currently has a blockade cooldown on them
              if (returnSafeNumber(usr.blockaded.blockade_cooldown) == 0) {
                if (ot_user.modifiers.enable_blockades) {
                  //Check if user is at war or not
                  var armistice_broken = false;
                  var at_war = areAtWar(user_id, ot_user_id);
                  var broken_wars = [];

                  //Check if the instigating user is the war leader in any at_war wars with an armistice
                  if (at_war)
                    for (var i = 0; i < at_war.length; i++)
                      if (at_war[i].armistice)
                        if (at_war[i].attackers_war_leader == actual_id || at_war[i].defenders_war_leader == actual_id) {
                          var friendly_side = (at_war[i].attackers_war_leader == actual_id) ? "attackers" : "defenders";
                          var opposing_side = (at_war[i].defenders_war_leader == actual_id) ? "defenders" : "attackers";

                          //The armistice has been broken through blockades
                          if (war_obj[opposing_side].includes(actual_ot_user_id)) {
                            armistice_broken = true;
                            broken_wars.push(at_war[i].name);

                            //Remove armistice key
                            delete main.global.wars[at_war[i].id].armistice;
                          }
                        }

                  //Set blockaded status
                  usr.blockaded = {
                    id: usr.id,
                    is_blockaded: true,

                    blockaded_war_exhaustion: 0,
                    fleets: [{ id: actual_ot_user_id, fleet_id: army_obj.id }]
                  };

                  //Set new army status
                  army_obj.status = `blockading **${usr.name}**`;
                  army_obj.is_blockading = true;

                  //If users are not already at war, grant a theft CB to the other user; print to news
                  if (!at_war) {
                    ot_user.diplomacy.casus_belli.push({
                      type: "theft",
                      target: actual_id,

                      duration: 10
                    });
                    usr.modifiers.infamy += config.defines.diplomacy.peacetime_blockade_penalty;
                  }

                  return [true, `You have instituted a blockade on **${usr.name}**. They may challenge it at any time by typing **[Challenge Blockade]**.${(armistice_broken) ? `\n\nYou have also broken your armistice(s) in the following war(s): **${broken_wars.join(", ")}**` : ""}`];
                } else {
                  return [false, `Your people haven't even heard of the concept of a blockade before, let alone of how to implement it on someone else!`];
                }
              } else {
                return [false, `**${usr.name}** has been blockaded too recently for you to carry out a blockade on them! Wait **${parseNumber(blockade_obj.blockaded.blockade_cooldown)}** more turn(s) before attempting to carry out another blockade on them.`];
              }
            } else {
              return [false, `The **${fleet_name}** is still recovering from its recent deployment! Wait **${parseNumber(army_obj.blockade_recovery_turns)}** more turn(s) before trying to blockade **${usr.name}** with this fleet.`];
            }
          } else {
            return [false, `Only ships can carry out a blockade!`];
          }
        } else {
          return [false, `The fleet you have specified to conduct this blockade, the **${fleet_name}**, doesn't even exist!`];
        }
      } else {
        return [false, `You can't blockade someone else if you don't even have a country of your own! What is this, a pirate blockade?`];
      }
    } else {
      return [false, `You must specify an extant nation to blockade!`];
    }
  },

  deleteBlockade: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Check if user is actually blockaded
    if (actual_id)
      if (isBlockaded(user_id)) {
        //Go through all fleets that are still blockading
        for (var i = 0; i < usr.blockaded.fleets.length; i++)
          try {
            var local_fleet = getArmy(usr.blockaded.fleets[i].id, usr.blockaded.fleets[i].fleet_id);

            local_fleet.blockade_recovery_turns = config.defines.combat.blockade_cooldown;
            local_fleet.status = "in harbour";
            delete local_fleet.is_blockading;
          } catch {}

        //Subtract from war_exhaustion
        usr.modifiers.war_exhaustion -= usr.blockaded.blockaded_war_exhaustion;

        //Set cooldown
        usr.blockaded.blockade_cooldown = config.defines.combat.blockade_cooldown;

        //Delete blockading object
        usr.blockaded = {};
      }
  },

  getBlockadingUserContribution: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user; //User blockading
    var ot_user_id = arg1_user; //User being blockaded

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var total_combined_points = 0;
    var total_user_points = 0;
    var user_blockading_fleets = module.exports.getBlockadingUserFleets(user_id, ot_user_id);
    var usr = main.users[actual_id];

    //Check for ot_user.blockaded
    if (actual_ot_user_id)
      if (isBlockaded(ot_user_id))
        //Go through all the fleets that are still blockading for total_combined_points
        for (var i = 0; i < ot_user.blockaded.fleets.length; i++)
          try {
            var local_fleet = getArmy(ot_user.blockaded.fleets[i].id, ot_user.blockaded.fleets[i].fleet_id);

            if (local_fleet) {
              var local_fleet_stats = calculateArmyStats(ot_user.blockaded.fleets[i].id, local_fleet);

              total_combined_points += returnSafeNumber(local_fleet_stats.attack);
              total_combined_points += returnSafeNumber(local_fleet_stats.defence);
            }
          } catch {}

    //Iterate over user_blockading_fleets
    for (var i = 0; i < user_blockading_fleets.length; i++) {
      var local_fleet_stats = calculateArmyStats(user_id, user_blockading_fleets[i]);

      total_user_points += returnSafeNumber(local_fleet_stats.attack);
      total_user_points += returnSafeNumber(local_fleet_stats.defence);
    }

    //Return statement
    return returnSafeNumber(total_user_points/total_combined_points);
  },

  getBlockadingUserFleets: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user; //User blockading
    var ot_user_id = arg1_user; //User being blockaded

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var blockading_fleets = [];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check for ot_user.blockaded
    if (actual_ot_user_id)
      if (isBlockaded(ot_user_id))
        //Go through all the fleets that are still blockading
        for (var i = 0; i < ot_user.blockaded.fleets.length; i++)
          try {
            var local_fleet = getArmy(ot_user.blockaded.fleets[i].id, ot_user.blockaded.fleets[i].fleet_id);

            if (local_fleet)
              blockading_fleets.push(local_fleet);
          } catch {}

    //Return statement
    return blockading_fleets;
  },

  getBlockadingUsers: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user; //User being blockaded

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var blockading_users = [];
    var usr = main.users[actual_id];

    //Check if user is actually blockaded
    if (actual_id)
      if (isBlockaded(user_id))
        //Go through all the fleets that are still blockading
        for (var i = 0; i < usr.blockaded.fleets.length; i++)
          try {
            if (!blockading_users.includes(usr.blockaded.fleets[i].id))
              blockading_users.push(usr.blockaded.fleets[i].id);
          } catch {}

    //Return statement
    return blockading_users;
  },

  isBlockadedInArmistice: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user; //User being blockaded

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_wars = Object.keys(main.global.wars);
    var armisticed_users = [];
    var blockading_users = module.exports.getBlockadingUsers(user_id);

    //Iterate over all blockading_users, all_wars, check for total armistice
    for (var i = 0; i < blockading_users.length; i++) {
      var has_unarmisticed_war = false;
      var is_at_war = areAtWar(user_id, blockading_users[i]);

      for (var x = 0; x < all_wars.length; x++) {
        var friendly_side = "";
        var local_war = main.global.wars[all_wars[x]];
        var opposing_side = "";

        if (!local_war.armistice) {
          //Fetch friendly_side, opposing_side
          if (local_war.attackers.includes(actual_id))
            friendly_side = "attackers";
          if (local_war.defenders.includes(actual_id))
            friendly_side = "defenders";
          if (local_war.attackers.includes(blockading_users[i]))
            opposing_side = "attackers";
          if (local_war.defenders.includes(blockading_users[i]))
            opposing_side = "defenders";

          if (friendly_side != "" && opposing_side != "")
            if (friendly_side != opposing_side)
              has_unarmisticed_war = true;
        }
      }

      if (!has_unarmisticed_war && is_at_war)
        armisticed_users.push(blockading_users[i]);
    }

    //Remove armisticed_users from blockading_users
    for (var i = blockading_users.length - 1; i >= 0; i--)
      if (armisticed_users.includes(blockading_users[i]))
        blockading_users.splice(i, 1);

    //Return statement
    return (blockading_users.length == 0);
  },

  isBlockadedByEnemies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user; //User being blockaded

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var blockading_users = module.exports.getBlockadingUsers(user_id);
    var enemies = getEnemies(user_id);
    var enemies_blockading = [];
    var is_blockaded_by_enemies = false;

    //Iterate over blockading_users
    for (var i = 0; i < blockading_users.length; i++)
      if (enemies.includes(blockading_users[i]))
        is_blockaded_by_enemies = true;

    //Return statement
    return is_blockaded_by_enemies;
  }
};
