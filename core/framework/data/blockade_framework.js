module.exports = {
  createBlockade: function (arg0_user, arg1_blockading_user, arg2_fleet_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_blockading_user;
    var fleet_name = arg2_fleet_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var army_obj = getArmy(actual_ot_user_id, fleet_name);
    var game_obj = getGameObject(actual_id);
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
                if (usr.modifiers.enable_blockades) {
                  //Check if user is at war or not
                  var at_war = areAtWar(actual_id, actual_ot_user_id);

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
                    ot_user.casus_belli.push({
                      type: "theft",
                      target: actual_id,

                      duration: 10
                    });
                    usr.modifiers.infamy += config.defines.diplomacy.peacetime_blockade_penalty;
                  }

                  return [true, `You have instituted a blockade on **${ot_user.name}**. They may challenge it at any time by typing **[Challenge Blockade]**.`];
                } else {
                  return [false, `Your people haven't even heard of the concept of a blockade before, let alone of how to implement it on someone else!`];
                }
              } else {
                return [false, `**${ot_user.name}** has been blockaded too recently for you to carry out a blockade on them! Wait **${parseNumber(blockade_obj.blockaded.blockade_cooldown)}** more turn(s) before attempting to carry out another blockade on them.`];
              }
            } else {
              return [false, `The **${fleet_name}** is still recovering from its recent deployment! Wait **${parseNumber(army_obj.blockade_recovery_turns)}** more turn(s) before trying to blockade **${ot_user.name}** with this fleet.`];
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
      if (isBlockaded(actual_id)) {
        //Go through all fleets that are still blockading
        for (var i = 0; i < usr.blockaded.fleets.length; i++) {
          var local_fleet = getArmy(usr.blockaded.fleets[i].id, usr.blockaded.fleets[i].fleet_id);

          local_fleet.blockade_recovery_turns = config.defines.combat.blockade_cooldown;
          local_fleet.status = "in harbour";
          delete local_fleet.is_blockading;
        }

        //Subtract from war_exhaustion
        usr.modifiers.war_exhaustion -= usr.blockaded.blockaded_war_exhaustion;

        //Set cooldown
        usr.blockaded.blockade_cooldown = config.defines.combat.blockade_cooldown;

        //Delete blockading object
        usr.blockaded = {};
      }
  }
};
