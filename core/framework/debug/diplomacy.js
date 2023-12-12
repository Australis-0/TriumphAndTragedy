module.exports = {
  debugAlly: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Create alliance; print feedback
    if (usr && ot_user) {
      createAlliance(user_id, ot_user_id);

      //Return statement
      return [true, `Set an alliance between **${usr.name}** and **${ot_user.name}**.`];
    } else {
      //Return statement
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugDissolveAlliance: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    if (usr && ot_user) {
      //Dissolve alliance; print feedback
      dissolveAlliance(user_id, ot_user_id);

      //Return statement
      return [true, `Removed any alliance between **${usr.name}** and **${ot_user.name}**.`];
    } else {
      //Return statement
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugDissolveNonAggression: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    if (usr && ot_user) {
      //Dissolve non-aggression pact; print feedback
      dissolveNonAggressionPact(user_id, ot_user_id);

      //Return statement
      return [true, `Dissolved any non-aggression pact between **${usr.name}** and **${ot_user.name}**.`];
    } else {
      //Return statement
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugEndWar: function (arg0_war_name) {
    //Convert from parameters
    var war_name = arg0_war_name;

    //Declare local instance variables
    var war_obj = getWar(war_name);

    //End the war in white peace
    if (war_obj) {
      var attacker_war_leader_obj = main.users[war_obj.attackers_war_leader];

      //Create a white peace treaty
      var white_peace_obj = createPeaceTreaty(war_obj.attackers_war_leader, war_name, true, { type: "attackers" });

      //Send white peace and auto-resolve
      parsePeaceTreaty(war_name, white_peace_obj);

      //Return statement
      return [true, `Ended the **${war_obj.name}** in a white peace.`];
    } else {
      //Return statement
      return [false, `Could not find a war by the name **${war_name}**!`];
    }
  },

  debugGiveCB: function (arg0_user, arg1_user, arg2_cb_name, arg3_turns) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var cb_name = arg2_cb_name;
    var duration = parseInt(arg3_turns);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var cb_key = getCB(cb_name, { return_key: true });
    var cb_obj = getCB(cb_name);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check to make sure that users exist and CB exists
    if (usr && ot_user) {
      if (cb_obj) {
        if (!isNaN(duration)) {
          usr.diplomacy.casus_belli.push({
            type: cb_key,
            target: ot_user.id,

            duration: duration
          });

          return [true, `Added a **${(cb_obj.name) ? cb_obj.name : cb_name}** CB on **${ot_user.name}** to **${usr.name}**.`];
        } else {
          return [false, `Duration in turns must be a valid number.`];
        }
      } else {
        return [false, `There is no CB by the name **${cb_name}**.`];
      }
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugNonAggression: function (arg0_user, arg1_user, arg2_turns) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var duration = (arg2_turns) ? parseInt(arg2_turns) : -1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set non-aggression pact
    if (usr && ot_user) {
      if (!isNaN(duration)) {
        createNonAggressionPact(user_id, ot_user_id, { duration: duration });

        return [true, `You have created a non-aggression pact between **${usr.name}** and **${ot_user.name}** for **${(duration == -1) ? `infinite` : `${parseNumber(duration)}`}** turn(s).`];
      } else {
        return [false, `You must specify a valid number for the duration of the non-aggression pact.`];
      }
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugSetMutualRelations: function (arg0_user, arg1_user, arg2_value) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var value = (arg2_value) ? parseInt(arg2_value) : 0;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set mutual relations
    if (usr && ot_user) {
      if (!isNaN(value)) {
        if (!(value < -100 || value > 100)) {
          if (!usr.diplomacy.relations[actual_ot_user_id]) usr.diplomacy.relations[actual_ot_user_id] = {};
          if (!ot_user.diplomacy.relations[actual_id]) ot_user.diplomacy.relations[actual_id] = {};

          var ot_relations_obj = ot_user.diplomacy.relations[actual_id];
          var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

          //Set relations
          ot_relations_obj.value = value;
          relations_obj.value = value;

          //Return statement
          return [true, `Mutual relations between **${usr.name}** and **${ot_user.name}** have been set to **${parseNumber(value, { display_prefix: true })}`];
        } else {
          return [false, `Value must be within the range [-100, 100].`];
        }
      } else {
        return [false, `You must specify a valid number to set relations to.`];
      }
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugSetRelations: function (arg0_user, arg1_user, arg2_value) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var value = (arg2_value) ? parseInt(arg2_value) : 0;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Set mutual relations
    if (usr && ot_user) {
      if (!isNaN(value)) {
        if (!usr.diplomacy.relations[actual_ot_user_id]) usr.diplomacy.relations[actual_ot_user_id] = {};

        var relations_obj = usr.diplomacy.relations[actual_ot_user_id];

        //Set relations
        relations_obj.value = value;

        //Return statement
        return [true, `Opinion of **${ot_user.name}** in **${usr.name}** set to **${parseNumber(value, { display_prefix: true })}**.`];
      } else {
        return [false, `You must specify a valid number to set relations to.`];
      }
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugVassalise: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Vassalise ot_user under user control
    if (usr && ot_user) {
      //Vassalise
      createVassal(user_id, { target: actual_ot_user_id });

      return [true, `Vassalised **${usr.name}** under the influence of **${ot_user.name}**.`];
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  },

  debugWar: function (arg0_user, arg1_user, arg2_cb_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var cb_name = arg2_cb_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var cb_obj = getCB(cb_name);
    var cb_type = getCB(cb_name, { return_key: true });
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check to make sure users exist; CB exists
    if (usr && ot_user) {
      if (cb_obj) {
        //Initilaise war
        initialiseWar({
          type: cb_type,

          attacker: actual_id,
          defender: actual_ot_user_id
        });

        return [true, `**${usr.name}** has declared a war on **${ot_user.name}**! (CB: ${(cb_obj.name) ? cb_obj.name : cb_type})`];
      } else {
        return [false, `The CB you have specified, **${cb_name}**, does not exist.`];
      }
    } else {
      return [false, `One of the users you have specified did not exist.`];
    }
  }
};
