module.exports = {
  /*
    getWargoal() - Fetches a wargoal object/key depending on the options field.
    options: {
      return_key: true/false - Defaults to false
    }
  */
  getWargoal: function (arg0_wargoal_name, arg1_options) {
    //Convert from parameters
    var wargoal_name = arg0_wargoal_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_wargoals = Object.keys(config.wargoals);
    var wargoal_exists = [false, ""]; //[wargoal_exists, wargoal_name];

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
