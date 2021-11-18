module.exports = {
  getAllTechnologies: function () {
    //Declare local instance variables
    var all_tech_categories = Object.keys(config.technology);
    var tech_array = [];

    //Iterate over all categories and their respective keys
    for (var i = 0; i < all_tech_categories.length; i++) {
      var local_category = config.technology[all_tech_categories[i]];
      var local_techs = Object.keys(local_category);

      for (var x = 0; x < local_techs.length; x++)
        tech_array.push(local_category[local_techs[x]]);
    }

    //Return statement
    return tech_array;
  },

  /*
    getTechnology() - Fetches a technology object/key depending on its options.
    options: {
      return_key: true/false - Whether or not to return a key from the object
    }
  */
  getTechnology: function (arg0_name, arg1_options) {
    //Convert from parameters
    var tech_name = arg0_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_tech_categories = Object.keys(config.technology);
    var technology_exists = [false, ""]; //[technology_exists, technology_name/object];

    //Iterate over all categories and their respective keys
    {
      //Key name, soft match
      for (var i = 0; i < all_tech_categories.length; i++) {
        var local_category = config.techology[all_tech_categories[i]];
        var local_techs = Object.keys(local_category);

        for (var x = 0; x < local_techs.length; x++)
          if (local_techs[x].toLowerCase().indexOf(tech_name) != -1)
            technology_exists = [true, (!options.return_key) ? local_category[local_techs[x]], local_techs[x]];
      }

      //Key name, hard match
      for (var i = 0; i < all_tech_categories.length; i++) {
        var local_category = config.techology[all_tech_categories[i]];
        var local_techs = Object.keys(local_category);

        for (var x = 0; x < local_techs.length; x++)
          if (local_techs[x].toLowerCase() == tech_name)
            technology_exists = [true, (!options.return_key) ? local_category[local_techs[x]], local_techs[x]];
      }

      //Move on to regular tech names if technology still isn't found
      if (!technology_exists[0]) {
        //Tech name, soft match
        for (var i = 0; i < all_tech_categories.length; i++) {
          var local_category = config.technology[all_tech_categories[i]];
          var local_techs = Object.keys(local_category);

          for (var x = 0; x < local_techs.length; x++) {
            var local_tech = local_category[local_techs[x]];

            if (local_tech.name)
              if (local_tech.name.toLowerCase().indexOf(tech_name) != -1)
                technology_exists = [true, (!options.return_key) ? local_tech : local_techs[x]];
          }
        }

        //Tech name, hard match
        for (var i = 0; i < all_tech_categories.length; i++) {
          var local_category = config.technology[all_tech_categories[i]];
          var local_techs = Object.keys(local_category);

          for (var x = 0; x < local_techs.length; x++) {
            var local_tech = local_category[local_techs[x]];

            if (local_tech.name)
              if (local_tech.name.toLowerCase() == tech_name)
                technology_exists = [true, (!options.return_key) ? local_tech : local_techs[x]];
          }
        }
      }
    }

    //Return statement
    return (technology_exists[0]) ? technology_exists[1] : undefined;
  }
};
