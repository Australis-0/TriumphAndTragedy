module.exports = {
  /*
    getAllTechnologies() - Fetches an array of all valid technologies.
    options: {
      return_names: true/false - Whether or not to return the keys of the categories instead of the object.
    }
  */
  getAllTechnologies: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_tech_categories = Object.keys(config.technology);
    var tech_array = [];

    //Iterate over all categories and their respective keys
    for (var i = 0; i < all_tech_categories.length; i++) {
      var local_category = config.technology[all_tech_categories[i]];
      var local_techs = Object.keys(local_category);

      for (var x = 0; x < local_techs.length; x++)
        tech_array.push((!options.return_names) ? local_category[local_techs[x]] : local_techs[x]);
    }

    //Return statement
    return tech_array;
  },

  getKnowledgeGain: function (arg0_user, arg1_knowledge) {
    //Convert from parameters
    var user_id = arg0_user;
    var local_knowledge_production = arg1_knowledge;

    //Declare local tracker variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var pop_knowledge_gain = 0;

    if (!local_knowledge_production) {
      var knowledge_production = getProduction(user_id, "knowledge");

      local_knowledge_production = (knowledge_production) ?
        knowledge_production :
        [0, 0];
    }

    //Fetch pop_knowledge_gain
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.knowledge)
          pop_knowledge_gain += (getTotalPopManpower(user_id, all_pops[i])/100000)*local_pop.per_100k.knowledge;
    }

    //Make sure you can't just gain unlimited knowledge from faculty (hard cap)
    if (pop_knowledge_gain > 500)
      pop_knowledge_gain = 500;

    local_knowledge_production = [
      local_knowledge_production[0] + returnSafeNumber(pop_knowledge_gain),
      local_knowledge_production[1] + returnSafeNumber(pop_knowledge_gain)
    ];

    //Return statement
    return local_knowledge_production;
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
        var local_category = config.technology[all_tech_categories[i]];
        var local_techs = Object.keys(local_category);

        for (var x = 0; x < local_techs.length; x++)
          if (local_techs[x].toLowerCase().indexOf(tech_name) != -1)
            technology_exists = [true, (!options.return_key) ? local_category[local_techs[x]] : local_techs[x]];
      }

      //Key name, hard match
      for (var i = 0; i < all_tech_categories.length; i++) {
        var local_category = config.technology[all_tech_categories[i]];
        var local_techs = Object.keys(local_category);

        for (var x = 0; x < local_techs.length; x++)
          if (local_techs[x].toLowerCase() == tech_name)
            technology_exists = [true, (!options.return_key) ? local_category[local_techs[x]] : local_techs[x]];
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
  },

  /*
    Fetches the object/key of a tech category based on name provided.
    options: {
      return_key: true/false - Defaults to false. Whether or not to return a key instead of the main object
    }
  */
  getTechnologyCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var category_name = arg0_name.toLowerCase().trim().split(" ").join("_");
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_tech_categories = Object.keys(config.technology);
    var category_exists = [false, ""]; //[category_exists, category_name/object];

    //Iterate over all categories and their respective keys
    {
      //Key name, soft match
      for (var i = 0; i < all_tech_categories.length; i++)
        if (all_tech_categories[i].indexOf(category_name) != -1)
          category_exists = [true, (!options.return_key) ? config.technology[all_tech_categories[i]] : all_tech_categories[i]];

      //Key name, hard match
      for (var i = 0; i < all_tech_categories.length; i++)
        if (all_tech_categories[i] == category_name)
          category_exists = [true, (!options.return_key) ? config.technology[all_tech_categories[i]] : all_tech_categories[i]];

      if (!category_exists[0]) {
        //Category name, soft match
        for (var i = 0; i < all_tech_categories.length; i++) {
          var local_category = config.technology[all_tech_categories[i]];

          if (local_category.name)
            if (local_category.name.toLowerCase().trim().indexOf(category_name) != -1)
              category_exists = [true, (!options.return_key) ? config.technology[all_tech_categories[i]] : all_tech_categories[i]];
        }

        //Category name, hard match
        for (var i = 0; i < all_tech_categories.length; i++) {
          var local_category = config.technology[all_tech_categories[i]];

          if (local_category.name)
            if (local_category.name.toLowerCase().trim() == category_name)
              category_exists = [true, (!options.return_key) ? config.technology[all_tech_categories[i]] : all_tech_categories[i]];
        }
      }
    }

    //Return statement
    return (category_exists[0]) ? category_exists[1] : undefined;
  },

  getTechnologyCost: function (arg0_name) {
    //Convert from parameters
    var tech_obj = module.exports.getTechnology(arg0_name);

    //Ahead of time penalty calculations (AOT)
    var aot_penalty = 0;
    var ahead_of_time_config = config.defines.technology.ahead_of_time;
    var final_aot_penalty = 1;
    var has_aot_penalty = false;

    for (var i = 0; i < ahead_of_time_config; i++)
      if (main.date.year >= ahead_of_time_config[i][0] && main.date.year < ahead_of_time_config[i][1])
        aot_penalty = 2/ahead_of_time_config[i][2];

    if (tech_obj.year) {
      var aot_years = 0;

      if (main.date.year < tech_obj.year) {
        has_aot_penalty = true;
        aot_years = tech_obj.year - main.date.year;
        final_aot_penalty = (aot_years*aot_penalty) + 1;
      }
    }

    //Return total research cost
    return Math.round(tech_obj.research_cost*final_aot_penalty);
  },

  instantResearch: function (arg0_user, arg1_technology_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var technology_name = arg1_technology_name.toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var tech_obj = module.exports.getTechnology(technology_name);
    var raw_technology_name = module.exports.getTechnology(technology_name, { return_key: true });
    var usr = main.users[actual_id];

    //Instant research
    if (!usr.researched_technologies.includes(raw_technology_name)) {
      try {
        module.exports.parseTechnology(user_id, raw_technology_name);
        usr.researched_technologies.push(raw_technology_name);
      } catch (e) {
        log.error(`instantResearch() failed whilst trying to research ${technology_name}; raw form ${arg1_technology_name}! ${e}.`);
        console.log(e);
      }
    }
  },

  //parseTechnology() - Parses the technological effects of a given tech for a given user. (Used primarily after the research of a tech has been finished)
  parseTechnology: function (arg0_user, arg1_technology_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_technology_name = arg1_technology_name.toLowerCase();

    //Declare local instance variables
    var tech_obj = module.exports.getTechnology(raw_technology_name);

    //Parse technology for user!
    if (tech_obj.unlocks)
      applyModifiers(user_id, tech_obj.unlocks);
  },

  researchUpTo: function (arg0_user, arg1_technology_cost) {
    //Convert from parameters
    var user_id = arg0_user;
    var technology_cost = Math.ceil(arg1_technology_cost);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_technologies = module.exports.getAllTechnologies();
    var all_technology_names = module.exports.getAllTechnologies({ return_names: true });
    var usr = main.users[actual_id];

    for (var i = 0; i < all_technologies.length; i++)
      if (returnSafeNumber(all_technologies[i].research_cost) <= technology_cost)
        module.exports.instantResearch(user_id, all_technology_names[i]);
  }
};
