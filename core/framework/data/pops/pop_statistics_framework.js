module.exports = {

  getCityPopGrowth: function (arg0_name, arg1_options) {
    //Convert from parameters
    var city_name = arg0_name;
    var options = (arg1_options) ? arg1_options : { pop_type: "all" };

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var total_growth = 0;
    var usr = main.users[city_obj.controller];

    //Calcualte total growth
    if (options.pop_type == "all") {
      for (var i = 0; i < all_pops.length; i++)
        total_growth += Math.ceil(
          city_obj.pops[all_pops[i]]*
          getCityPopGrowthRate(city_obj, { pop_type: all_pops[i] })
        );
    } else {
      total_growth = Math.ceil(
        city_obj.pops[options.pop_type]*
        getCityPopGrowthRate(city_obj, { pop_type: options.pop_type })
      );
    }

    //Return statement
    return total_growth;
  },

  /*
    getCityPopGrowthRate() - Returns the decimal percentage growth of a given city.
    options: {
      pop_type: "workers" - The pop type to calculate growth for. Defaults to 'all'
    }
  */
  getCityPopGrowthRate: function (arg0_name, arg1_options) {
    //Convert from parameters
    var city_name = arg0_name;
    var options = (arg1_options) ? arg1_options : { pop_type: "all" };

    //Declare local instance variables
    var city_obj = (typeof city_name != "object") ? getCity(city_name) : city_name;
    var scalar = 1;
    var usr = main.users[city_obj.controller];

    var local_growth_modifier = (options.pop_type != "all") ?
      usr.pops[`${options.pop_type}_growth_modifier`] : 1;

    //Local pop growth logic
    {
      //Calculate scalar
      if (city_obj.pops.population > config.defines.economy.urban_pop_growth_penalty_threshold) //-3% per million
        scalar -= Math.ceil(
          (city_obj.pops.population - config.defines.economy.urban_pop_growth_penalty_threshold)/1000000
        )*config.defines.economy.urban_pop_growth_penalty_per_million;

      //Calculate urban pop growth rate for chosen pop
      var local_pop_growth_rate = (
        local_growth_modifier*
        scalar*
        usr.modifiers.pop_growth_modifier
      );

      //Set local pop growth cap from economy defines
      var urban_growth_cap;
      for (var y = 0; y < config.defines.economy.urban_pop_growth_cap.length; y++) {
        var local_element = config.defines.economy.urban_pop_growth_cap[y];

        if (city_obj.pops.population >= local_element[0])
          urban_growth_cap = local_element[1];
      }

      if (urban_growth_cap)
        local_pop_growth_rate = Math.min(local_pop_growth_rate, urban_growth_cap);

      //Cap to maximum
      if (config.defines.economy.urban_pop_maximum_growth_rate)
        local_pop_growth_rate = Math.min(local_pop_growth_rate, config.defines.economy.urban_pop_maximum_growth_rate);

      //Occupation penalty
      if (city_obj.controller != city_obj.owner)
        local_pop_growth_rate = local_pop_growth_rate*config.defines.economy.occupation_pop_growth_penalty;

      //Make sure population can't drop by more than 100%
      if (local_pop_growth_rate < -1)
        local_pop_growth_rate = local_pop_growth_rate % 1;
    }

    //Return statement
    return local_pop_growth_rate;
  },

  getDemographics: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var pop_trackers = {};
    var provinces = getProvinces(user_id, { include_occupations: true });
    var total_population = 0;
    var usr = main.users[actual_id];

    //Iterate over provinces to fetch pop_trackers
    for (var i = 0; i < provinces.length; i++)
      if (provinces[i].pops) {
        var local_population = 0;

        for (var x = 0; x < all_pops.length; x++) {
          var local_value = returnSafeNumber(provinces[i].pops[all_pops[x]]);

          //Pops and used pops
          modifyValue(pop_trackers, all_pops[x], local_value);
          modifyValue(pop_trackers, `used_${all_pops[x]}`, returnSafeNumber(provinces[i].pops[`used_${all_pops[x]}`]));

          //Rural/urban statistics
          modifyValue(pop_trackers, `${provinces[i].type}_${all_pops[x]}`, local_value);
          local_population += returnSafeNumber(local_value);
        }

        modifyValue(pop_trackers, `${provinces[i].type}_population`, local_population);

        //Add to total population; update province population
        provinces[i].pops.population = local_population;
        total_population += local_population;
      }

    //Set global trackers
    pop_trackers.population = total_population;

    //Reset pops and used pops on usr.pops
    for (var i = 0; i < all_pops.length; i++) {
      delete usr.pops[all_pops[i]];
      delete usr.pops[`used_${all_pops[i]}`];

      delete usr.pops[`rural_${all_pops[i]}`];
      delete usr.pops[`urban_${all_pops[i]}`];
    }

    delete usr.pops.rural_population;
    delete usr.pops.urban_population;

    delete usr.pops.population;

    //Merge objects
    usr.pops = mergeObjects(usr.pops, pop_trackers);
    usr.population = returnSafeNumber(total_population);

    //Return statement
    return usr.pops;
  },

  getDemotionChance: function (arg0_province_id, arg1_pop_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var demotion_chance = 0;
    var province_obj = main.provinces[province_id];

    if (province_obj.trackers) {
      var all_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_trackers.length; i++) {
        var local_value = province_obj.trackers[all_trackers[i]];

        if (all_trackers[i].startsWith(`demote-${pop_type}`))
          demotion_chance += local_value;
      }
    }

    //Return statement
    return demotion_chance;
  },

  //getEmploymentPercentages() - Returns employment percentages for a pop type by building in a province
  getEmploymentPercentages: function (arg0_province_id, arg1_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_type;

    //Declare local instance variables
    var employment_obj = {};
    var employed_pops = 0;
    var province_obj = main.provinces[province_id];

    if (province_obj.buildings) {
      var all_pop_keys = Object.keys(province_obj.pops);

      for (var i = 0; i < all_pop_keys.length; i++)
        if (all_pop_keys[i].startsWith("wealth-")) {
          var split_wealth_key = all_pop_keys[i].split("-");

          var building_id = `${split_wealth_key[1]}-${split_wealth_key[2]}`;
          var local_pop_type = split_wealth_key[3];
          var local_wealth_pool = province_obj.pops[all_pop_keys[i]];

          if (local_pop_type == pop_type) {
            employment_obj[building_id] = local_wealth_pool.size;
            employed_pops += local_wealth_pool.size;
          }
        }

      //Adjust to percentage of employed_pops
      var all_employment_keys = Object.keys(employment_obj);

      for (var i = 0; i < all_employment_keys.length; i++) {
        var local_value = employment_obj[all_employment_keys[i]];

        employment_obj[all_employment_keys[i]] = local_value/employed_pops;
      }
    }

    //Return statement
    return sortObject(employment_obj);
  },

  getFaminePenalty: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var government_obj = config.governments[usr.government];
    var famine_penalty = (government_obj.effect.famine_penalty) ? government_obj.effect.famine_penalty : 0.1;
    var usr = main.users[actual_id];

    //Return statement
    return Math.ceil(usr.population*famine_penalty);
  },

  /*
    getJobOpenings() - Fetches the total number of job openings for a pop type in a province based on specified criteria.
    options: {
      income: 15, - What the wage of this job should be >= to
      living_wage: true/false - Whether this is enough for the pop to afford config.defines.economy.staple_goods_categories
    }
  */
  getJobOpenings: function (arg0_province_id, arg1_pop_type, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var total_openings = 0;

    if (province_obj)
      if (province_obj.buildings)
        for (var i = 0; i < province_obj.buildings.length; i++) {
          var local_building = province_obj.buildings[i];
          var local_positions = local_building[`${pop_type}_positions`];
          var local_wage = local_building[`${pop_type}_wage`];
          var meets_conditions = true;

          if (local_wage < returnSafeNumber(options.income))
            meets_conditions = false;
          if (options.living_wage) {
            var living_wage = getStapleGoodsPrice(pop_type);

            if (local_wage < living_wage)
              meets_conditions = false;
          }

          if (meets_conditions)
            total_openings += returnSafeNumber(province_obj.buildings[i][`${pop_type}_positions`]);
        }

    //Return statement
    return total_openings;
  },

  getMilitaryPops: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var military_pop_types = [];

    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].military_pop)
        military_pop_types.push(all_pops[i]);

    //Return statement
    return military_pop_types;
  },

  getNeedsCategoryTotalUtility: function (arg0_needs_category) {
    //Convert from parameters
    var needs_category = arg0_needs_category;

    //Declare local instance variables
    var all_needs_category_keys = Object.keys(needs_category);
    var total_utility = 0;

    if (!lookup.good_types)
      lookup.good_types = getGoodTypes();

    //Iterate over all_needs_category_keys
    for (var i = 0; i < all_needs_category_keys.length; i++) {
      var local_subobj = needs_category[all_needs_category_keys[i]];

      if (typeof local_subobj == "object") {
        var all_group_goods = Object.keys(local_subobj);

        for (var x = 0; x < all_group_goods.length; x++) {
          var local_define = config.defines.economy.good_categories[lookup.good_types[all_group_goods[x]]];
          var local_value = local_subobj[all_group_goods[x]];

          if (local_define)
            total_utility += local_define.marginal_utility*local_value;
        }
      }
    }

    //Return statement
    return total_utility;
  },

  //Updates config.pops with a new needs_importance object for buying order reference
  getNeedsImportance: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var defines_obj = config.defines.economy.good_categories;

    //Iterate over all pops and subcategories
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.needs) {
          var local_needs = local_pop.per_100k.needs;
          local_pop.needs_importance = {};

          var all_local_needs_categories = Object.keys(local_needs);
          var needs_importance = local_pop.needs_importance;

          for (var x = 0; x < all_local_needs_categories.length; x++) {
            var local_needs_category = local_needs[all_local_needs_categories[x]];
            var local_needs_obj = {};

            var all_local_needs_subcategories = Object.keys(local_needs_category);

            for (var y = 0; y < all_local_needs_subcategories.length; y++) {
              var local_needs_group = local_needs_category[all_local_needs_subcategories[y]];

              var all_local_needs = Object.keys(local_needs_group);
              var auto_priority = false;
              var total_importance = 0;
              var total_marginal_utility = 0;
              var type_count = {}; //Counts the number of goods of each type for automatic_priority setting

              for (var z = 0; z < all_local_needs.length; z++) {
                var local_good = lookup.all_goods[all_local_needs[z]];

                if (local_good)
                  if (local_good.type) {
                    var local_define = defines_obj[local_good.type];

                    if (local_define) {
                      //Add to total_importance and total_marginal_utility
                      total_importance += (local_define.importance != "unlimited") ?
                        returnSafeNumber(local_define.importance) : 99999;
                      total_marginal_utility += returnSafeNumber(local_define.marginal_utility);

                      modifyValue(type_count, local_good.type, 1);
                    }
                  }
              }

              //Average total_importance and total_marginal_utility, check for automatic_priority percentage
              var all_types = Object.keys(type_count);
              var average_importance = total_importance/all_local_needs.length;
              var average_marginal_utility = total_marginal_utility/all_local_needs.length;

              for (var z = 0; z < all_types.length; z++) {
                var local_define = defines_obj[all_types[z]];
                var local_value = type_count[all_types[z]];

                if (local_define)
                  if (local_value >= returnSafeNumber(local_define.automatic_priority))
                    auto_priority = true;
              }

              //Format local_needs_obj[all_local_needs_subcategories[y]]
              var local_needs_group = {
                importance: average_importance,
                marginal_utility: average_marginal_utility
              };

              if (auto_priority) local_needs_group.automatic_priority = true;
              local_needs_obj[all_local_needs_subcategories[y]] = local_needs_group;
            }

            //Set needs_importance object for pop
            local_pop.needs_importance[all_local_needs_categories[x]] = local_needs_obj;
          }

          //Iterate over all_local_needs_categories again to create a .buy_order array for categories
          var category_importances = [];

          for (var x = 0; x < all_local_needs_categories.length; x++) {
            var actual_importances = [];
            var local_needs_category = local_needs[all_local_needs_categories[x]];

            var actual_importance_array = [];
            var importance_array = []; //This will be sorted in descending order
            var total_importance = 0;

            var all_local_needs_subcategories = Object.keys(local_needs_category);

            for (var y = 0; y < all_local_needs_subcategories.length; y++) {
              var local_importance = local_pop.needs_importance[all_local_needs_categories[x]][all_local_needs_subcategories[y]];

              var local_actual_importance = (local_importance.automatic_priority) ?
                returnSafeNumber(local_importance.importance) : 99999;

              importance_array.push({ name: all_local_needs_subcategories[y], importance: local_actual_importance });
              total_importance += local_actual_importance;
            }

            //Sort importance_array
            importance_array.sort((a, b) => { b.importance - a.importance });

            for (var y = 0; y < importance_array.length; y++)
              actual_importance_array.push(importance_array[y]);
            local_pop[`${all_local_needs_categories[x]}-buy_order`] = actual_importance_array;

            category_importances.push({
              name: all_local_needs_categories[x],
              importance: total_importance/all_local_needs_subcategories.length
            });
          }

          //Sort category_importances
          category_importances.sort((a, b) => { b.importance - a.importance });

          for (var x = 0; x < category_importances.length; x++)
            actual_importances.push(category_importances[x].name);

          if (!local_pop.buy_order)
            local_pop.buy_order = actual_importances;
        }
    }
  },

  /*
    getNeedsTotalUtility() - Gets the total utility of a pop type.
    options: {
      staple_goods: true/false - Whether to restrict the scope to staple goods. All non-staple goods by default
    }
  */
  getNeedsTotalUtility: function (arg0_pop_type, arg1_options) {
    //Convert from parameters
    var pop_type = arg0_pop_type;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var pop_obj = config.pops[pop_type];
    var total_utility = 0;

    //Check if pop_obj.per_100k.needs exists
    if (pop_obj)
      if (pop_obj.per_100k)
        if (pop_obj.per_100k.needs) {
          var all_needs_categories = Object.keys(pop_obj.per_100k.needs);

          //Iterate over all_needs_categories
          for (var i = 0; i < all_needs_categories.length; i++) {
            var is_staple = (config.defines.economy.staple_goods_categories.includes(all_needs_categories[i]));
            var local_value = pop_obj.per_100k.needs[all_needs_categories[i]];

            if (options.staple_goods) {
              if (is_staple)
                total_utility += getNeedsCategoryTotalUtility(local_value);
            } else {
              if (!is_staple)
                total_utility += getNeedsCategoryTotalUtility(local_value);
            }
          }
        }

    //Return statement
    return total_utility;
  },

  /*
    getNeedsUtilities() - Generates a total utility map of all pops for the relevant needs supercategory.
    options: {
      staple_goods: true/false - Whether to restrict the scope to staple-goods. All non-staple goods by default
    }
  */
  getNeedsUtilities: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var utility_obj = {};

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++)
      modifyValue(utility_obj, all_pops[i], getNeedsTotalUtility(all_pops[i], options));

    //Return statement
    return utility_obj;
  },

  /*
    getPopChange() - Fetches the total last turn change in pop type size.
    options: {
      birth_obj: (Object), - Optional. Optimisation parameter
      death_obj: (Object), - Optional. Optimisation parameter
      demotion_obj: (Object), - Optional. Optimisation parameter
      emigration_obj: (Object), - Optional. Optimisation parameter
      immigration_obj: (Object), - Optional. Optimisation parameter
      promotion_obj: (Object) - Optional. Optimisation parameter
    }
  */
  getPopChange: function (arg0_province_id, arg1_pop_type, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (!options.birth_obj) options.birth_obj = getProvinceBirths(province_id);
    if (!options.death_obj) options.death_obj = getProvinceDeaths(province_id);
    if (!options.demotion_obj) options.demotion_obj = getProvinceDemotion(province_id);
    if (!options.emigration_obj) options.emigration_obj = getProvinceEmigration(province_id);
    if (!options.immigration_obj) options.immigration_obj = getProvinceImmigration(province_id);
    if (!options.promotion_obj) options.promotion_obj = getProvincePromotion(province_id);

    //Declare local instance variables
    var pop_change = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    //Modify pop_change
    pop_change = returnSafeNumber(options.birth_obj[pop_type]) + returnSafeNumber(options.immigration_obj[pop_type]) + returnSafeNumber(options.promotion_obj[pop_type]) - returnSafeNumber(options.death_obj[pop_type]) - returnSafeNumber(options.demotion_obj[pop_type]) - returnSafeNumber(options.emigration_obj[pop_type]);

    //Return statement
    return pop_change;
  },

  getPopMigration: function (arg0_province_id, arg1_pop_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    var external_migration_table = lookup[`${province_obj.controller}-external_migration_attraction`];
    var internal_migration_table = lookup[`${province_obj.controller}-migration_attraction`];

    var all_external_provinces = Object.keys(external_migration_table);
    var all_internal_provinces = Object.keys(internal_migration_table);

    console.log(internal_migration_table);
    console.log(external_migration_table);

    //Return statement
  },

  /*
    getPopMobility() - Returns statistical last turn pop mobility for a province.
    Returns: {
      promotion: { total: 24390 },
      demotion: { total: 4102 },

      change: 2148 - Total change in pop (as driven by social mobility)
    }
  */
  getPopMobility: function (arg0_province_id, arg1_pop_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var total_demoted = 0;
    var total_promoted = 0;
    var return_obj = {
      promotion: {},
      demotion: {}
    };

    if (province_obj)
      if (province_obj.trackers) {
        var all_province_trackers = Object.keys(province_obj.trackers);

        for (var i = 0; i < all_province_trackers.length; i++) {
          var local_value = province_obj.trackers[all_province_trackers[i]];
          var split_key = all_province_trackers[i].split("-");

          if (split_key[0] == "demote")
            if (split_key[1] == pop_type) {
              modifyValue(return_obj.demotion, split_key[2], local_value);
              total_demoted += local_value;
            }
          if (split_key[0] == "promote")
            if (split_key[2] == pop_type) {
              modifyValue(return_obj.promotion, split_key[1], local_value);
              total_promoted += local_value;
            }
        }

        return_obj.demotion.total = total_demoted;
        return_obj.promotion.total = total_promoted;
      }

    //Set return_obj.change
    return_obj.change = total_promoted - total_demoted;

    //Return statement
    return return_obj;
  },

  /*
    getPopJobBreakdown() - Returns a breakdown of job percentages by type.

    Returns: {
      tribal: 0,
      agriculture: 0,
      manufacturing: 0,
      services: 0,
      ..
    }
  */
  getPopJobBreakdown: function (arg0_province_id, arg1_pop_type) { //[WIP] - Finish function body
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var job_breakdown_obj = {};
    var pop_obj = config.pops[pop_type];
    var province_obj = (typeof province_id != "object") ? getProvince(province_id) : province_id;

    //Iterate over all province buildings
    if (province_obj) {
      if (province_obj.buildings)
        for (var i = 0; i < province_obj.buildings.length; i++) {
          var local_building = province_obj.buildings[i];
          var local_config = lookup.all_buildings[local_building.building_type];

          if (local_building.employment)
            if (local_building.employment[pop_type]) {
              var local_value = returnSafeNumber(local_building.employment[pop_type]);

              if (local_config.type)
                modifyValue(job_breakdown_obj, local_config.type, local_value);
            }
        }

      //Subsistence handler
      if (province_obj.subsistence) {
        var subsistence_obj = province_obj.subsistence;

        var subsistence_building_obj = lookup.all_buildings[subsistence_obj.building_type];

        if (subsistence_building_obj) {
          var local_value = returnSafeNumber(subsistence_obj.employment[pop_type]);

          if (subsistence_building_obj.type)
            modifyValue(job_breakdown_obj, subsistence_building_obj.type, local_value);
        }
      }
    }


    //Return statement
    return standardisePercentage(job_breakdown_obj);
  },

  /*
    getPopOEFR() - Gets the OEFR for a pop type in a province.
    options: {
      job_breakdown_obj: {}, - Optional. Optimisation parameter for job breakdowns
      pop_wealth: 12422 - Optional. Optimisation parameter.
    }
  */
  getPopOEFR: function (arg0_province_id, arg1_pop_type, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var job_breakdown_obj = (options.job_breakdown_obj) ?
      options.job_breakdown_obj : getPopJobBreakdown(province_id, pop_type);
    var oefr = 0;
    var pop_obj = config.pops[pop_type];

    var all_job_breakdown_keys = Object.keys(job_breakdown_obj);

    //Iterate over all_job_breakdown_keys
    for (var i = 0; i < all_job_breakdown_keys.length; i++) {
      var local_oefr = returnSafeNumber(config.births_oefr[all_job_breakdown_keys[i]]);
      var local_value = job_breakdown_obj[all_job_breakdown_keys[i]];

      oefr += local_oefr*local_value;
    }

    //Return statement
    return returnSafeNumber(oefr);
  },

  getPopWealth: function (arg0_province_id, arg1_pop_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var pop_obj = config.pops[pop_type];
    var province_obj = (typeof province_id != "object") ? getProvince(province_id) : province_id;
    var total_wealth = 0;

    //Check to make sure province exists
    if (province_obj)
      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);

        //Iterate over all_pop_keys
        for (var i = 0; i < all_pop_keys.length; i++) {
          var local_value = province_obj.pops[all_pop_keys[i]];

          if (all_pop_keys[i].startsWith("wealth-")) {
            var split_key = all_pop_keys[i].split("-");

            var local_pop_type = split_wealth_key[3];

            //Add to total_wealth
            if (local_pop_type == pop_type)
              total_wealth += returnSafeNumber(local_value.wealth);
          }
        }
      }

    //Return statement
    return total_wealth;
  },

  getPopulation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Update pops
    getDemographics(user_id);

    //Return statement
    return usr.pops.population;
  },

  getPromotionChance: function (arg0_province_id, arg1_pop_type) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var promotion_chance = 0;
    var province_obj = main.provinces[province_id];

    if (province_obj.trackers) {
      var all_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_trackers.length; i++) {
        var local_value = province_obj.trackers[all_trackers[i]];

        if (all_trackers[i].startsWith(`promote-${pop_type}`))
          promotion_chance += local_value;
      }
    }

    //Return statement
    return promotion_chance;
  },

  //getProvinceBirthRate() - General modifier on births, not actually the true province birth rate
  getProvinceBirthRate: function (arg0_user, arg1_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var births = {}; //Split by pop type
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var total_fertility = 0;
    var usr = main.users[actual_id];

    //Famine guard clause
    if (usr.has_famine)
      return {};

    //Check if province exists and for urban/rural growth dichotomy
    if (province_obj)
      if (province_obj.controller == province_obj.owner)
        for (var i = 0; i < all_pops.length; i++)
          if (province_obj.type == "urban") {
            var local_pop_growth = getCityPopGrowth(province_obj, { pop_type: all_pops[i] });

            modifyValue(births, all_pops[i], returnSafeNumber(local_pop_growth/province_obj.pops.population) + 1);
            total_fertility += (local_pop_growth/province_obj.pops.population) + 1;
          } else {
            if (!province_obj.pop_cap)
              province_obj.pop_cap = (config.defines.economy.rural_pop_cap) ?
                randomNumber(config.defines.economy.rural_pop_cap[0], config.defines.economy.rural_pop_cap[1]) :
                randomNumber(120000, 140000);

            //Calculate rural pop growth for all pops
            if (province_obj.pops.population < province_obj.pop_cap)
              for (var i = 0; i < all_pops.length; i++) {
                var local_pop_growth = Math.ceil(province_obj.pops[all_pops[i]]*usr.pops[`${all_pops[i]}_growth_modifier`]*usr.modifiers.pop_growth_modifier) - province_obj.pops[all_pops[i]];

                modifyValue(births, all_pops[i], (local_pop_growth/province_obj.pops.population) + 1);
              }
          }

    //Return statement
    return births;
  },

  //getProvinceBirths() - Returns last turn province births by pop type
  getProvinceBirths: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var birth_obj = {};
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var total_births = 0;

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++)
      if (province_obj.trackers[`birth-${all_pops[i]}`]) {
        var local_value = returnSafeNumber(province_obj.trackers[`birth-${all_pops[i]}`]);

        modifyValue(birth_obj, all_pops[i], local_value);
        total_births += local_value;
      }

    //Format birth_obj
    birth_obj.total = total_births;

    //Return statement
    return birth_obj;
  },

  //getProvinceDeaths() - Returns last turn province deaths by pop type
  getProvinceDeaths: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var death_obj = {};
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var total_deaths = 0;

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++)
      if (province_obj.trackers[`death-${all_pops[i]}`]) {
        var local_value = returnSafeNumber(province_obj.trackers[`death-${all_pops[i]}`]);

        modifyValue(death_obj, all_pops[i], local_value);
        total_deaths += local_value;
      }

    //Format death_obj
    death_obj.total = total_deaths;

    //Return statement
    return death_obj;
  },

  getProvinceDemotion: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var demotion_obj = {};
    var demotion_total = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    //Iterate over trackers
    if (province_obj.trackers) {
      var all_province_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_province_trackers.length; i++)
        if (all_province_trackers[i].startsWith("demote-")) {
          var local_value = province_obj.trackers[all_province_trackers[i]];
          var split_key = all_province_trackers[i].split("-");

          modifyValue(demotion_obj, `${split_key[1]}-${split_key[2]}`, local_value);
          demotion_total += local_value;
        }
    }

    //Format demotion_obj
    demotion_obj.total = demotion_total;

    //Return statement
    return demotion_obj;
  },

  /*
    getProvinceEducation() - Returns province education level object by percentage.
    options: {
      return_sum: true/false - Optional. Whether to return sum totals for each education level instead of percentages. False by default
    }
  */
  getProvinceEducation: function (arg0_province_id, arg1_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var educated_total = 0;
    var education_obj = {};
    var province_obj = main.provinces[province_id];

    if (province_obj)
      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);

        for (var i = 0; i < all_pop_keys.length; i++)
          if (all_pop_keys[i].startsWith("el_")) {
            var local_education_level = parseInt(all_pop_keys[i].replace("el_", ""));
            var local_value = province_obj.pops[all_pop_keys[i]];

            if (!isNaN(local_education_level)) {
              modifyValue(education_obj, local_education_level, local_value);
              educated_total += local_value;
            }
          }

        modifyValue(education_obj, "0", province_obj.pops.population - educated_total, true);
      }

    //Standardise to percentage
    if (!options.return_sum)
      education_obj = standardisePercentage(education_obj, province_obj.pops.population);

    //Return statement
    return education_obj;
  },

  getProvinceEducationLevel: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var weighted_total = 0;

    if (province_obj)
      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);

        for (var i = 0; i < all_pop_keys.length; i++)
          if (all_pop_keys[i].startsWith("el_")) {
            var local_education_level = parseInt(all_pop_keys[i].replace("el_", ""));
            var local_value = province_obj.pops[all_pop_keys[i]];

            if (!isNaN(local_education_level))
              weighted_total += (local_education_level/100)*local_value;
          }
      }

    //Return statement
    return weighted_total/province_obj.pops.population;
  },

  getProvinceEmigration: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var emigration_obj = {};
    var emigration_total = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    //Iterate over trackers
    if (province_obj.trackers) {
      var all_province_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_province_trackers.length; i++)
        if (all_province_trackers[i].startsWith("emigration-")) {
          var local_value = province_obj.trackers[all_province_trackers[i]];
          var split_key = all_province_trackers[i].split("-");

          modifyValue(emigration_obj, split_key[1], local_value);
          emigration_total += local_value;
        }
    }

    //Format emigration_obj
    emigration_obj.total = emigration_total;

    //Return statement
    return emigration_obj;
  },

  getProvinceEnslavedPercentage: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var enslaved_population = 0;
    var province_obj = main.provinces[province_id];

    //Iterate over all_pops and check for .slave_pop
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (typeof local_pop == "object")
        if (local_pop.slave_pop)
          enslaved_population += returnSafeNumber(province_obj.pops[all_pops[i]]);
    }

    return enslaved_population/province_obj.pops.population;
  },

  //getProvinceEmployees() - Returns the total number of employed pops in a province
  getProvinceEmployees: function (arg0_province_id, arg1_pop_types) { //[WIP] - Finish province employment
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_types = (arg1_pop_types) ? getList(arg1_pop_types) : Object.keys(config.pops);

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var total_employed = 0;

    //Iterate over pop_types to count total_employed
    if (province_obj.pops)
      for (var i = 0; i < pop_types.length; i++) {
        //Make sure province_obj.pops[`used_${pop_types[i]}`] actually exists
        if (!province_obj.pops[`used_${pop_types[i]}`]) {
          var used_pops = 0;

          //Iterate over all province buildings to determine used pops
          if (province_obj.buildings)
            for (var x = 0; x < province_obj.buildings.length; x++) {
              var local_building = province_obj.buildings[x];

              if (local_building.employment)
                used_pops += returnSafeNumber(local_building.employment[pop_types[i]]);
            }

          province_obj.pops[`used_${pop_types[i]}`] = used_pops;
        }


        total_employed += returnSafeNumber(province_obj.pops[`used_${pop_types[i]}`]);
      }

    //Return statement
    return total_employed;
  },

  //getProvinceEmployment() - Returns the overall % of employed pops in a province
  getProvinceEmployment: function (arg0_province_id, arg1_pop_types) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_types = (arg1_pop_types) ? getList(arg1_pop_types) : Object.keys(config.pops);

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var total_employed = getProvinceEmployees(province_id, pop_types);

    //Return statement
    return (province_obj.pops) ? total_employed/province_obj.pops.population : 0;
  },

  getProvinceFertileWomen: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var fertile_women = 0;
    var province_obj = (typeof province_id != "object") ? getProvince(province_id) : province_id;

    //Check to make sure province has pop
    if (province_obj)
      if (province_obj.pops) {
        //Iterate over all pop keys
        var all_pop_keys = Object.keys(province_obj.pops);

        for (var i = 0; i < all_pop_keys.length; i++) {
          var local_value = province_obj.pops[all_pop_keys[i]];

          if (all_pop_keys[i].startsWith("b_")) {
            var age = main.date.year - parseInt(all_pop_keys[i].replace("b_", ""));

            if (age >= config.defines.economy.fertility_age_lower_bound && age <= config.defines.economy.fertility_age_upper_bound)
              fertile_women += returnSafeNumber(Math.floor(local_value/2)); //Only half this population is usually female [REVISIT] - In future adjust this to gender
          }
        }
      }

    //Return statement
    return fertile_women;
  },

  getProvinceImmigration: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var immigration_obj = {};
    var immigration_total = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    //Iterate over trackers
    if (province_obj.trackers) {
      var all_province_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_province_trackers.length; i++)
        if (all_province_trackers[i].startsWith("immigration-")) {
          var local_value = province_obj.trackers[all_province_trackers[i]];
          var split_key = all_province_trackers[i].split("-");

          modifyValue(immigration_obj, split_key[1], local_value);
          immigration_total += local_value;
        }
    }

    //Format immigration_obj
    immigration_obj.total = immigration_total;

    //Return statement
    return immigration_obj;
  },

  getProvincePopulation: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var province_population = 0;

    //Iterate over all_pops
    if (province_obj)
      if (province_obj.pops)
        for (var i = 0; i < all_pops.length; i++)
          province_population += returnSafeNumber(province_obj.pops[all_pops[i]]);

    //Return statement
    return province_population;
  },

  getProvincePromotion: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var promotion_obj = {};
    var promotion_total = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;

    //Iterate over trackers
    if (province_obj.trackers) {
      var all_province_trackers = Object.keys(province_obj.trackers);

      for (var i = 0; i < all_province_trackers.length; i++)
        if (all_province_trackers[i].startsWith("promote-")) {
          var local_value = province_obj.trackers[all_province_trackers[i]];
          var split_key = all_province_trackers[i].split("-");

          modifyValue(promotion_obj, `${split_key[1]}-${split_key[2]}`, local_value);
          promotion_total += local_value;
        }
    }

    //Format promotion_obj
    promotion_obj.total = promotion_total;

    //Return statement
    return promotion_obj;
  },

  getProvinceSOL: function (arg0_province_id, arg1_pop_types) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_types = (arg1_pop_types) ? getList(arg1_pop_types) : Object.keys(config.pops);

    //Declare local instance variables
    var pop_scope = selectPops({
      province_id: province_id,
      pop_types: pop_types
    });
    var sol = getSOL(pop_scope);

    //Return statement
    return sol;
  },

  getProvinceWealth: function (arg0_province_id, arg1_pop_types) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_types = (arg1_pop_types) ? getList(arg1_pop_types) : Object.keys(config.pops);

    //Declare local instance variables
    var wealth = 0;
    var province_obj = main.provinces[province_id];

    if (province_obj)
      if (province_obj.pops) {
        var all_pop_keys = Object.keys(province_obj.pops);

        for (var i = 0; i < all_pop_keys.length; i++)
          if (all_pop_keys[i].startsWith("wealth-")) {
            var split_wealth_key = all_pop_keys[i].split("-");

            if (pop_types.includes(split_wealth_key[3])) {
              var local_wealth_pool = province_obj.pops[all_pop_keys[i]];

              wealth += returnSafeNumber(local_wealth_pool.wealth);
            }
          }
      }

    //Return statement
    return wealth;
  },

  //getSOL() - Fetches total standard of living for a pop based on the total utility of the fulfilled needs of pops +50% other factors (standardised to 0-100%)
  getSOL: function (arg0_pop_scope) { //[WIP] - Finish function body
    //Convert from parameters
    var pop_scope = arg0_pop_scope;

    //Declare local instance variables
    var all_pop_scope_keys = Object.keys(pop_scope);
    var other_utility = 0; //Housing, etc.
    var province_obj = main.provinces[pop_scope.province_id];
    var total_luxury_categories = 0;
    var total_luxury_utility = 0;
    var total_staple_categories = 0;
    var total_staple_utility = 0;

    //Declare local scalars
    var housing_scalar = returnSafeNumber(province_obj.housing)/province_obj.pops.population; //[WIP] - Revisit in future

    //Iterate over all_pop_scope_keys
    for (var i = 0; i < all_pop_scope_keys.length; i++)
      if (all_pop_scope_keys[i].endsWith("-fulfilment")) {
        var local_category_name = all_pop_scope_keys[i].replace("-fulfilment", "");
        var local_value = pop_scope[all_pop_scope_keys[i]];

        var is_staple = (config.defines.economy.staple_goods_categories.includes(local_category_name));

        if (is_staple) {
          total_staple_categories++;
          total_staple_utility += local_value;
        } else {
          total_luxury_categories++;
          total_luxury_utility += local_value;
        }
      }

    total_staple_utility = total_staple_utility/total_staple_categories;
    total_luxury_utility = total_luxury_utility/total_luxury_categories;

    other_utility = housing_scalar;

    //Return statement
    return total_staple_utility*config.defines.economy.staple_sol +
      total_luxury_utility*config.defines.economy.luxury_sol +
      other_utility*config.defines.economy.other_sol;
  },

  getTotalActiveDuty: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var total_active_duty = 0;
    var usr = main.users[actual_id];

    //Fetch total active duty
    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].military_pop)
        total_active_duty += usr.pops[`used_${all_pops[i]}`];

    //Return statement
    return total_active_duty;
  },

  getTotalArtisanProduction: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var artisan_production_obj = {};
    var user_provinces = getProvinces(user_id, { include_occupations: true });
    var usr = main.users[actual_id];

    //Iterate over lookup.artisan_pops
    for (var i = 0; i < user_provinces.length; i++)
      for (var x = 0; x < lookup.artisan_pops.length; x++)
        artisan_production_obj = mergeObjects(artisan_production_obj,
          getArtisanProduction(user_provinces[i].id, lookup.artisan_pops[x])
        );

    //Return statement
    return artisan_production_obj;
  },

  getTotalPopManpower: function (arg0_user, arg1_type, arg2_raw_modifier) {
    //Convert from parameters
    var user_id = arg0_user;
    var pop_type = arg1_type;
    var raw_modifier = arg2_raw_modifier;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var pop_obj = config.pops[pop_type];
    var usr = main.users[actual_id];

    var availability_modifier = (pop_obj.military_pop) ?
      usr.modifiers.maximum_manpower*usr.modifiers.national_manpower
      : 1;

    //Return statement
    return (!raw_modifier) ? Math.ceil(usr.pops[pop_type]*availability_modifier) : availability_modifier;
  },

  //getTotalPopMobility() - Fetches total pop mobility statistics for an entire country's controlled provinces
  getTotalPopMobility: function (arg0_user, arg1_pop_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var pop_type = arg1_pop_type;

    //Declare local instance variables
    var controlled_provinces = getProvinces(user_id, { include_occupations: true });
    var return_obj = {};

    //Iterate over controlled_provinces
    for (var i = 0; i < controlled_provinces.length; i++)
      return_obj = mergeObjects(return_obj, getPopMobility(controlled_provinces[i].id, pop_type));

    //Return statement
    return return_obj;
  },

  getTotalRGOProduction: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var rgo_production_obj = {};
    var user_provinces = getProvinces(user_id, { include_occupations: true });
    var usr = main.users[actual_id];

    //Iterate over all user_provinces
    for (var i = 0; i < user_provinces.length; i++)
      rgo_production_obj = mergeObjects(rgo_production_obj, getProvinceRGOThroughput(user_provinces[i].id));

    //Return statement
    return rgo_production_obj;
  },

  //getUnemployedPops() - Returns the total unemployed pops of a given type in a province
  getUnemployedPops: function (arg0_province_id, arg1_type, arg2_no_subsistence) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_type;
    var no_subsistence = arg2_no_subsistence;

    //Declare local instance variables
    var employed_pops = 0;
    var province_obj = main.provinces[province_id];

    var all_pop_keys = Object.keys(province_obj.pops);

    //Iterate over all_pop_keeps for wealth_ pools
    for (var i = 0; i < all_pop_keys.length; i++)
      if (all_pop_keys[i].startsWith("wealth-") && !all_pop_keys[i].includes("-subsistence-")) {
        var split_wealth_key = all_pop_keys[i].split("-");

        var local_pop_type = split_wealth_key[3];

        if (local_pop_type == pop_type) {
          var local_wealth_pool = province_obj.pops[all_pop_keys[i]];
          var meets_conditions = true;

          if (no_subsistence && local_wealth_pool.subsistence)
            meets_conditions = false;

          if (meets_conditions)
            employed_pops += returnSafeNumber(local_wealth_pool.size);
        }
      }

    //Return statement
    return returnSafeNumber(province_obj.pops[pop_type] - employed_pops);
  },

  getUserArtisanProduction: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var return_object = {};
    var usr = main.users[actual_id];

    if (usr) {
      //Check for available goods
      var available_goods = getUnlockedGoods(user_id);

      if (lookup.artisan_production_fraction) {
        //Iterate over available_goods
        for (var i = 0; i < available_goods.length; i++)
          if (lookup.artisan_production_fraction[available_goods[i]])
            return_object[available_goods[i]] = lookup.artisan_production_fraction[available_goods[i]];

        return_object = standardisePercentage(return_object);

        //Return statement
        return return_object;
      } else {
        log.warn(`getUserArtisanProduction() - lookup.artisan_production_fraction is not defined!`);
      }
    }

    //Return statement
    return return_object;
  },
};
