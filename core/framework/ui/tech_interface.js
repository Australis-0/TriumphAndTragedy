module.exports = {
  printResearchList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_tech_categories = Object.keys(config.technology);
    var all_techs = getAllTechnologies({ return_names: true });
    var tech_array_dump = [];
    var processed_tech_categories = {};

    //Initialise tech_string
    var tech_string = [];

    //Initialise processed_tech_categories
    for (var i = 0; i < all_tech_categories.length; i++)
      processed_tech_categories[all_tech_categories[i]] = [];

    //Check which techs are available or not
    for (var i = 0; i < all_techs.length; i++) {
      var local_tech = getTechnology(all_techs[i]);
      var tech_available = false;

      //Check for prerequisite_techs. If no prerequisite_techs are available, the tech is automatically available unless the user has already researched it
      if (local_tech.prerequisite_techs) {
        var prerequisite_checks = 0;

        for (var x = 0; x < local_tech.prerequisite_techs.length; x++)
          if (usr.researched_technologies.includes(local_tech.prerequisite_techs[x]))
            prerequisite_techs++;

        if (prerequisite_techs == local_tech.prerequisite_techs.length)
          tech_available = true;
      } else {
        //No prerequisite_techs were found, so it must be a starting tech
        tech_available = true;
      }

      //Check if user has already researched tech
      if (usr.researched_technologies.includes(all_techs[i]))
        tech_available = false;

      //If the technology is available, push to tech_array_dump
      if (tech_available) tech_array_dump.push(all_techs[i]);
    }

    //Sort the current tech_array_dump into processed_tech_categories
    for (var i = 0; i < all_tech_categories.length; i++) {
      var local_category_techs = Object.keys(config.technology[all_tech_categories[i]]);

      for (var x = 0; x < tech_array_dump.length; x++)
        if (local_category_techs.includes(tech_array_dump[x]))
          processed_tech_categories[all_tech_categories[i]].push(tech_array_dump[x]);
    }

    //Format string
    //Begin assembling the tech array by getting all valid tech categories
    for (var i = 0; i < all_tech_categories.length; i++)
      if (processed_tech_categories[all_tech_categories[i]].length > 0) {
        var local_tech_category = processed_tech_categories[all_tech_categories[i]];

        //Format header
        tech_string.push(`${config.icons.technology} **${parseString(all_tech_categories[i])}:**`);
        tech_string.push(config.localisation.divider);
        tech_string.push("");

        for (var x = 0; x < local_tech_category.length; x++) {
          var local_tech = getTechnology(local_tech_category[x]);
          
        }
      }
  }
};
