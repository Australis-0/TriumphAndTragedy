module.exports = {
  /*
    getAllUnits() - Fetches an object/key list of all units.
    options: {
      return_names: true/false - Whether or not to return the keys instead.
    }
  */
  getAllUnits: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var all_units = [];

    //Iterate over all_unit_categories and push their respective objects into array
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        all_units.push(
          (!options.return_names) ?
            local_unit_category[local_units[x]] :
            local_units[x]
        );
    }

    //Return statement
    return all_units;
  },

  /*
    getUnit() - Returns the true object/key of a unit.
    options: {
      return_key: true/false - Whether or not to return the key of the unit instead.
    }
  */
  getUnit: function (arg0_name, arg1_options) {
    //Convert from parameters
    var unit_name = arg0_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_unit_categories = Object.keys(config.units);
    var unit_exists = [false, ""];

    //Unit key, soft search
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        if (local_units[x].toLowerCase().indexOf(unit_name) != -1)
          unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
    }

    //Unit key, hard search
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_unit_category = config.units[all_unit_categories[i]];
      var local_units = Object.keys(local_unit_category);

      for (var x = 0; x < local_units.length; x++)
        if (local_units[x].toLowerCase() == unit_name)
          unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
    }

    if (!unit_exists[0]) {
      //Unit name, soft search
      for (var i = 0; i < all_unit_categories.length; i++) {
        var local_unit_category = config.units[all_unit_categories[i]];
        var local_units = Object.keys(local_unit_category);

        for (var x = 0; x < local_units.length; x++)
          if (local_unit_category[local_units[x]].name.toLowerCase().indexOf(unit_name) != -1)
            unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
      }

      //Unit name, hard search
      for (var i = 0; i < all_unit_categories.length; i++) {
        var local_unit_category = config.units[all_unit_categories[i]];
        var local_units = Object.keys(local_unit_category);

        for (var x = 0; x < local_units.length; x++)
          if (local_unit_category[local_units[x]].name.toLowerCase() == unit_name)
            unit_exists = [true, (!options.return_key) ? local_unit_category[local_units[x]] : local_units[x]];
      }
    }

    //Return statement
    return (unit_exists[0]) ? unit_exists[1] : undefined;
  }
};
