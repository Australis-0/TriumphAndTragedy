module.exports = {
  getPeaceDemands: function (arg0_cb_name) {
    //Convert from parameters
    var cb_name = (typeof arg0_cb_name != "object") ? arg0_cb_name.trim().toLowerCase() : arg0_cb_name;

    //Declare local instance variables
    var cb_obj = (typeof cb_name != "object") ? getCB(cb_name) : cb_name;
    var peace_demands = {
      attackers: {},
      defenders: {}
    };

    //Check for cb_obj
    if (cb_obj) {
      //Push attacker_peace_demands
      if (cb_obj.attacker_peace_demands) {
        var all_attacker_peace_demands = Object.keys(cb_obj.attacker_peace_demands);

        for (var i = 0; i < all_attacker_peace_demands.length; i++) {
          var local_value = cb_obj.attacker_peace_demands[all_attacker_peace_demands[i]];

          if (!peace_demands.attackers[all_attacker_peace_demands[i]])
            peace_demands.attackers[all_attacker_peace_demands[i]] = 0;
          peace_demands.attackers[all_attacker_peace_demands[i]] += local_value;
        }
      }

      //Push defender_peace_demands
      if (cb_obj.defender_peace_demands) {
        var all_defender_peace_demands = Object.keys(cb_obj.defender_peace_demands);

        for (var i = 0; i < all_defender_peace_demands.length; i++) {
          var local_value = cb_obj.defender_peace_demands[all_defender_peace_demands[i]];

          if (!peace_demands.defenders[all_defender_peace_demands[i]])
            peace_demands.defenders[all_defender_peace_demands[i]] = 0;
          peace_demands.defenders[all_defender_peace_demands[i]] += local_value;
        }
      }

      //Push peace_demands
      if (cb_obj.peace_demands) {
        var all_general_peace_demands = Object.keys(cb_obj.peace_demands);

        for (var i = 0; i < all_general_peace_demands.length; i++) {
          var local_value = cb_obj.peace_demands[all_general_peace_demands[i]];

          if (!peace_demands.attackers[all_general_peace_demands[i]])
            peace_demands.attackers[all_general_peace_demands[i]] = 0;
          peace_demands.attackers[all_general_peace_demands[i]] += local_value;
          if (!peace_demands.defenders[all_general_peace_demands[i]])
            peace_demands.defenders[all_general_peace_demands[i]] = 0;
          peace_demands.defenders[all_general_peace_demands[i]] += local_value;
        }
      }
    }

    //Return statement
    return peace_demands;
  },

  /*
    getWargoal() - Fetches a wargoal object/key depending on the options field.
    options: {
      return_key: true/false - Defaults to false
    }
  */
  getWargoal: function (arg0_wargoal_name, arg1_options) {
    //Convert from parameters
    var wargoal_name = (typeof arg0_wargoal_name != "object") ? arg0_wargoal_name.trim().toLowerCase() : arg0_wargoal_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_wargoals = Object.keys(config.wargoals);
    var wargoal_exists = [false, ""]; //[wargoal_exists, wargoal_name];

    //Object guard clause
    if (typeof wargoal_name == "object")
      return wargoal_name;

    //Key match
    if (config.wargoals[wargoal_name])
      return config.wargoals[wargoal_name];

    //Soft match first
    for (var i = 0; i < all_wargoals.length; i++)
      if (all_wargoals[i].indexOf(wargoal_name) != -1)
        wargoal_exists = [true, (!options.return_key) ? config.wargoals[all_wargoals[i]] : all_wargoals[i]];

    //Hard match second
    for (var i = 0; i < all_wargoals.length; i++)
      if (all_wargoals[i] == wargoal_name)
        wargoal_exists = [true, (!options.return_key) ? config.wargoals[all_wargoals[i]] : all_wargoals[i]];

    //Search by name
    if (!wargoal_exists[0]) {
      //Soft match first
      for (var i = 0; i < all_wargoals.length; i++) {
        var local_wargoal = config.wargoals[all_wargoals[i]];

        if (local_wargoal.name)
          if (local_wargoal.name.trim().toLowerCase().indexOf(wargoal_name) != -1)
            wargoal_exists = [true, (!options.return_key) ? config.wargoals[all_wargoals[i]] : all_wargoals[i]];
      }

      //Hard match second
      for (var i = 0; i < all_wargoals.length; i++) {
        var local_wargoal = config.wargoals[all_wargoals[i]];

        if (local_wargoal.name)
          if (local_wargoal.name.trim().toLowerCase() == wargoal_name)
            wargoal_exists = [true, (!options.return_key) ? config.wargoals[all_wargoals[i]] : all_wargoals[i]];
      }
    }

    //Return statement
    return (wargoal_exists[0]) ? wargoal_exists[1] : undefined;
  }
};
