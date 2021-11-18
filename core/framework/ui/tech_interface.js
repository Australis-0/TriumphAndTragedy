module.exports = {
  printResearchList: function (arg0_user) { //[WIP] - Needs modifier_framework.js before progressing
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

          var gfx_icon = (local_tech.icon) ? config.icons[local_tech.icon] + " " : "";
          var researching_status = "";

          for (var y = 0; y < usr.researching.length; y++)
            if (usr.researching[y].technology_name == local_tech_category[x])
              researching_status = `__Researching__`;

          for (var y = 0; y < usr.research_queue.length; y++)
            if (usr.research_queue[y].technology_name == local_tech_category[x])
              researching_status = `__Queued (#${y+1})__`;

          if (researching_status == "")
            researching_status = `¦ **[Research ${(local_tech.name) ? local_tech.name : local_tech_category[x]}]**`;

          //Push to tech_string
          tech_string.push(`${gfx_icon}**${(local_tech.name) ? local_tech.name : local_tech_category[x]}**: ${researching_status}`);

          if (local_tech.description)
            tech_string.push(`\n_${local_tech.description}_\n`);

          //Ahead of time penalty calculations (AOT)
          var aot_penalty = 0;
          var ahead_of_time_config = config.defines.technology.ahead_of_time;
          var final_aot_penalty = 1;
          var has_aot_penalty = false;

          for (var y = 0; y < ahead_of_time_config; y++)
            if (main.date.year >= ahead_of_time_config[y][0] && main.date.year < ahead_of_time_config[y][1])
              aot_penalty = 2/ahead_of_time_config[y][2];

          if (local_tech.year) {
            var aot_years = 0;

            if (main.date.year < local_tech.year) {
              has_aot_penalty = true;
              aot_years = local_tech.year - main.date.year;
              final_aot_penalty = (aot_years*aot_penalty) + 1;
            }
            tech_string.push(`- **Year:** ${config.icons.time} ${local_tech.year}`);
          }

          //Calculate total_research_cost
          var total_research_cost = Math.round(local_tech.research_cost*final_aot_penalty);

          tech_string.push(`- **Cost:** ${config.icons.knowledge} ${parseNumber(total_research_cost)}`);
          tech_string.push(`- **Effects:**`);

          //Push modifiers
        }
      }
  }
};
