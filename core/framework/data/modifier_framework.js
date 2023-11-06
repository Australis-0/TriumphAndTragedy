module.exports = {
  /*
    addTemporaryModifier() - Creates and adds a new temporary modifier to the user
    options: {
      type: "stability_modifier",
      value: 0.15,
      duration: 5 //How long the target modifier should last for, -1 if permanent
    }
  */
  addTemporaryModifier: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Push temporary modifier to object
    var modifier_id = module.exports.generateTemporaryModifierID(user_id);

    usr.temporary_modifiers[modifier_id] = {
      type: options.type,
      value: options.value,
      duration: (options.duration) ? (options.duration) : -1
    };

    //Immediately apply the current modifiers to user
    module.exports.applyModifiers(user_id, {
      [options.type]: options.value
    });
  },

  /*
    applyModifiers() - Applies a given scope object in terms of modifiers.
    flags: {
      province_id: "4407" - The Province ID the scope is currently targeting
    }
  */
  applyModifiers: function (arg0_user, arg1_scope, arg2_flags) {
    //Convert from parameters
    var user_id = arg0_user;
    var modifiers = arg1_scope;
    var flags = (arg2_flags) ? arg2_flags : {};

    //Declare local instance variables
    try {
      var actual_id = main.global.user_map[user_id];
      var all_modifiers = Object.keys(modifiers);
      var usr = main.users[actual_id];

      //Begin parsing
      for (var i = 0; i < all_modifiers.length; i++) {
        var effect_value = getList(modifiers[all_modifiers[i]]);
        var local_value = modifiers[all_modifiers[i]];

        if (all_modifiers[i] == "enable_blockades") {
          usr.modifiers.enable_blockades = effect_value[0];
        } else if (all_modifiers[i] == "enable_mobilisation") {
          usr.modifiers.enable_mobilisation = effect_value[0];
        } else if (all_modiifers[i] == "obsolete_building") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_buildings = removeElement(usr.available_buildings, effect_value[x]);
        } else if (all_modifiers[i] == "obsolete_government") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_governments = removeElement(usr.available_governments, effect_value[x]);
        } else if (all_modifiers[i] == "obsolete_reform") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_reforms = removeElement(usr.available_reforms, effect_value[x]);
        } else if (all_modifiers[i] == "obsolete_unit") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_units = removeElement(usr.available_units, effect_value[x]);
        } else if (all_modifiers[i] == "set_mobilisation_unit") {
          usr.mobilisation.unit_type = effect_value[0];
        } else if (all_modifiers[i] == "unlock_building") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_buildings.push(effect_value[x]);
        } else if (all_modifiers[i] == "unlock_government") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_governments.push(effect_value[x]);
        } else if (all_modifiers[i] == "unlock_reform") {
          for (var x = 0; x < effect_value.length; x++)
            unlockReform(user_id, effect_value[x]);
        } else if (all_modifiers[i] == "unlock_unit") {
          for (var x = 0; x < effect_value.length; x++)
            usr.available_units.push(effect_value[x]);
        } else {
          //Default case handling
          var is_government = Object.keys(config.governments).includes(all_modifiers[i]);

          if (is_government) {
            usr.politics[all_modifiers[i]].drift += local_value;
          } else {
            if (lookup.all_goods[all_modifiers[i]] != undefined) {
              modifyGoodAmount(user_id, all_modifiers[i], local_value);
            } else {
              if (!flags.province_id) { //Country scope
                //Building slots
                if (usr.modifiers[`${all_modifiers[i]}_building_slots`] != undefined) {
                  usr.modifiers[`${all_modifiers[i]}_building_slots`] += local_value;
                } else if (lookup.all_goods[all_modifiers[i]]) {
                  (effect_value.length == 1) ?
                    modifyGoodAmount(user_id, all_modifiers[i], effect_value[0]) :
                    modifyGoodAmount(user_id, all_modifiers[i], randomNumber(effect_value[0], effect_value[1]));
                } else if (usr.modifiers[all_modifiers[i]]) {
                  //Default country handler
                  usr.modifiers[all_modifiers[i]] += (effect_value.length == 1) ?
                    effect_value[0] : randomNumber(effect_value[0], effect_value[1]);
                }
              } else if (flags.province_id) { //Province scope
                var province_obj = main.provinces[flags.province_id];

                //Education modifiers
                if (!options.passive)
                  if (all_modifiers[i].startsWith("education_level_") || all_modifiers[i] == "education_level")
                    modifyEducationLevel({
                      province_id: flags.province_id,

                      min: local_value.min,
                      max: local_value.max,
                      capacity: local_value.capacity,
                      value: local_value.value
                    });
              }
            }
          }
        }
      }

      //Return statement
      return usr.modifiers;
    } catch (e) {
      log.error(`applyModifiers() ran into an error:`);
      console.log(e);
      log.info(`Unparsed Modifier Dump:`);
      console.log(modifiers);
      log.info(`Parsed Modifier Dump:`);
      console.log(all_modifiers);
    }
  },

  //applyModifiersToObject() - Takes a scope and returns the scope with the modifiers applied to it
  applyModifiersToObject: function (arg0_scope, arg1_modifiers, arg2_flags) {
    //Convert from parameters
    var scope = arg0_scope;
    var modifiers = (arg1_modifiers) ? arg1_modifiers : {};
    var parents = (arg2_flags) ? arg2_flags : [];

    //Declare local instance variables
    var all_modifier_keys = Object.keys(modifiers);
    var all_obj_keys = Object.keys(scope);

    //Iterate over all_obj_keys
    for (var i = 0; i < all_obj_keys.length; i++) {
      var local_subobj = scope[all_obj_keys[i]];

      //Goods handler
      if (lookup.all_goods[all_obj_keys[i]]) {
        var is_raw_production = module.exports.getFlag(parents, "has_maintenance");
        var local_good = lookup.all_goods[all_obj_keys[i]];

        //Check if production_efficiency is applicable
        if (modifiers.production_efficiency && !is_raw_production)
          local_subobj = local_subobj*modifiers.production_efficiency;
        //Check if rgo_throughput is applicable
        if (modifiers.rgo_throughput && is_raw_production)
          local_subobj = local_subobj*modifiers.rgo_throughput;
      } else {
        var new_parents = JSON.parse(JSON.stringify(parents));
        new_parents.push({ key: all_obj_keys[i] });

        //Scopes
        if (all_obj_keys[i] == "produces") {
          local_subobj = module.exports.applyModifiersToObject(local_subobj, modifiers, new_parents);
        }

        //Effects
        if (all_obj_keys[i] == "construction_turns")
          if (modifiers.construction_time)
            local_subobj = local_subobj*modifiers.construction_time;
      }
    }

    //Return statement
    return scope;
  },

  generateGlobalCooldownID: function (arg0_formatter) {
    //Convert from parameters
    var formatter = (arg0_formatter) ? `${arg0_formatter}-` : "";

    //Declare local instance variables
    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's
    while (true) {
      local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!main.global.cooldowns[`${formatter}${local_id}`]) {
        return local_id;
        break;
      }
    }
  },

  generateTemporaryModifierID: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!usr.temporary_modifiers)
        usr.temporary_modifiers = {};

      if (!usr.temporary_modifiers[local_id]) {
        return local_id;
        break;
      }
    }
  },

  generateUserCooldownID: function (arg0_user, arg1_formatter) {
    //Convert from parameters
    var user_id = arg0_user;
    var formatter = (arg1_formatter) ? `${arg1_formatter}-` : "";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var local_id;
    var usr = main.users[actual_id];

    //While loop to find ID, just in-case of conflicting random ID's
    while (true) {
      local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!usr.cooldowns[`${formatter}${local_id}`]) {
        return local_id;
        break;
      }
    }
  },

  /*
    getAllModifiers() - Returns either an object or key list of all available modifiers.
    options: {
      return_names: true/false - Whether or not to return modifier keys instead of objects
    }
  */
  getAllModifiers: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var modifier_dump = [];

    //Iterate through all modifier keys, 1st layer
    var all_modifiers = Object.keys(config.modifiers);

    for (var i = 0; i < all_modifiers.length; i++) {
      var local_modifier = config.modifiers[all_modifiers[i]];
      //Push base modifier
      (!options.return_names) ?
        modifier_dump.push(local_modifier) :
        modifier_dump.push(all_modifiers[i]);

      //Iterate over all submodifier keys if they exist (2nd layer)
      var all_modifier_keys = Object.keys(local_modifier);

      for (var x = 0; x < all_modifier_keys.length; x++)
        if (all_modifier_keys[x].startsWith("create_modifier_"))
          (!options.return_names) ?
            modifier_dump.push(local_modifier[all_modifier_keys[x]]) :
            modifier_dump.push(all_modifier_keys[x]);
    }

    //Return statement
    return modifier_dump;
  },

  getFlag: function (arg0_flags, arg1_flag, arg2_substring) {
    //Convert from parameters
    var flags = arg0_flags;
    var flag = arg1_flag;
    var substring = arg2_substring;

    //Declare local instance variables
    for (var i = 0; i < flags.length; i++)
      if (flags[i][flag])
        return flags[i][flag];
  },

  getGovernmentStabilityModifier: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var government_stability_modifier = 0;
    var ruling_government_obj = config.governments[usr.government];

    if (ruling_government_obj.effect.stability_modifier)
      government_stability_modifier = ruling_government_obj.effect.stability_modifier;

    if (ruling_government_obj.effect.add_expiry_effect)
      if (ruling_government_obj.effect.add_expiry_effect.stability_modifier)
        if (ruling_government_obj.effect.add_expiry_effect.limit.year_is_less_than) {
          if (main.date.year < ruling_government_obj.effect.add_expiry_effect.limit.year_is_less_than)
            government_stability_modifier = ruling_government_obj.effect.add_expiry_effect.stability_modifier;
        } else if (ruling_government_obj.effect.add_expiry_effect.limit.year_is_greater_than) {
          if (main.date.year > ruling_government_obj.effect.add_expiry_effect.limit.year_is_greater_than)
            government_stability_modifier = ruling_government_obj.effect.add_expiry_effect.stability_modifier;
        }

    //Return statement
    return government_stability_modifier;
  },

  /*
    getModifier() - Gets either the modifier object or key.
    options: {
      return_key: true/false - Whether or not to return the modifier key
    }
  */
  getModifier: function (arg0_modifier_name, arg1_options) {
    //Convert from parameters
    var modifier_name = arg0_modifier_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_modifiers = Object.keys(config.modifiers);
    var modifier_exists = [false, ""]; //[modifier_exists, modifier_key/object]

    //1st-level Modifier processing
    {
      {
        //Key, soft match
        for (var i = 0; i < all_modifiers.length; i++)
          if (all_modifiers[i].toLowerCase().indexOf(modifier_name) != -1)
            modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];

        //Key, hard match
        for (var i = 0; i < all_modifiers.length; i++)
          if (all_modifiers[i].toLowerCase() == modifier_name)
            modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
      }

      if (!modifier_exists[0]) {
        //Name, soft match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];

          if (local_modifier.name)
            if (local_modifier.name.toLowerCase().indexOf(modifier_name) != -1)
              modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
        }

        //Name, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];

          if (local_modifier.name)
            if (local_modifier.name.toLowerCase() == modifier_name)
              modifier_exists = [true, (!options.return_key) ? config.modifiers[all_modifiers[i]] : all_modifiers[i]];
        }
      }
    }

    //2nd-level Submodifier processing
    {
      {
        //Key, soft match
        if (!modifier_exists[0])
          for (var i = 0; i < all_modifiers.length; i++) {
            var local_modifier = config.modifiers[all_modifiers[i]];
            var local_modifier_keys = Object.keys(local_modifier);

            for (var x = 0; x < local_modifier_keys.length; x++)
              if (local_modifier_keys[x].startsWith("create_modifier_"))
                if (local_modifier_keys[x].replace("create_modifier_", "").indexOf(modifier_name) != -1)
                  modifier_exists = [true, (!options.return_key) ? local_modifier[local_modifier_keys[x]] : local_modifier_keys[x]];
          }

        //Key, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++)
            if (local_modifier_keys[x].startsWith("create_modifier_"))
              if (local_modifier_keys[x].replace("create_modifier_", "") == modifier_name)
                modifier_exists = [true, (!options.return_key) ? local_modifier[local_modifier_keys[x]] : local_modifier_keys[x]];
        }
      }

      //Name, soft match
      if (!modifier_exists[0]) {
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++) {
            if (local_modifier_keys[x].startsWith("create_modifier_")) {
              var local_submodifier = local_modifier[local_modifier_keys[x]];

              if (local_submodifier.name.indexOf(modifier_name) != -1)
                modifier_exists = [true, (!options.return_key) ? local_submodifier : local_modifier_keys[x]];
            }
          }
        }

        //Name, hard match
        for (var i = 0; i < all_modifiers.length; i++) {
          var local_modifier = config.modifiers[all_modifiers[i]];
          var local_modifier_keys = Object.keys(local_modifier);

          for (var x = 0; x < local_modifier_keys.length; x++) {
            if (local_modifier_keys[x].startsWith("create_modifier_")) {
              var local_submodifier = local_modifier[local_modifier_keys[x]];

              if (local_submodifier.name.toLowerCase() == modifier_name)
                modifier_exists = [true, (!options.return_key) ? local_submodifier : local_modifier_keys[x]];
            }
          }
        }
      }
    }

    //Return statement
    return (modifier_exists[0]) ? modifier_exists[1] : undefined;
  },

  /*
    parseLimit() - Determines whether a limit resolves to true/false from the given scope. Not recursive.
    options: {
      parent_obj: {}, - The object of the initial parent. Optional.
      parents: [], - An array of parent elements used for placing relevant flags. Defaults to [],
       - and_hard
       - any_hard
       - not_hard

       Other scopes:
       - add_chance

      scope: ["country"/"province", "<user_id>"/"<province_id>"] - The scope which to target for the limit. Defaults to "country"
    }

    Returns: {
      localisation_string: [], - The localisation string for this current limit scope

      value: 0.045, - Base value for initial scope
      failed_checks: 0, - Used for hard non-fuzzy conditions such as has_industrialised
      selectors: [], - ["<scope_name>", "<scope_id>", value] - A list of selectors for which values are added onto
    }
  */
  parseLimit: function (arg0_scope, arg1_options) { //[WIP] - Finish function body
    //Convert from parameters
    var scope = arg0_scope;
    var options = (arg1_options) ? arg1_options : {};

    //Initialise options
    if (!options.nesting) options.nesting = 1;
    if (!options.parent_obj) options.parent_obj = {};
    if (!options.parents) options.parents = [];

    //Declare local instance variables
    var all_keys = Object.keys(scope);
    var all_pops = Object.keys(config.pops);
    var failed_checks = 0;
    var localisation_string = [];
    var parent = options.parents[options.parents.length - 1];
    var province_obj = (options.scope[0] == "province") ? main.provinces[options.scope[1]] : undefined;
    var selectors = [];
    var usr = (province_obj) ? main.users[province_obj.controller] : main.users[options.scope[1]];
    var value = 0;

    //Undefined handlers
    if (!parent) parent = "";

    //Declare scalars for iterative scopes
    {
      //per_building scalars (pb)
      {
        //Declare local scalars
        var pb_buildings_scalar = 1;
        var pb_building_category_scalar = 1;
      }

      //per_percent scalars (pp)
      {
        //Declare local scalars
        var pp_demotion_scalar = 1;
        var pp_education_scalar = 1;
        var pp_employment_scalar = 1;
        var pp_enslaved_scalar = 1;
        var pp_living_wage_job_openings_scalar = 1;
        var pp_promotion_scalar = 1;
        var pp_pop_percent_scalar = 1;
      }

      //per scalars
      {
        //Declare local scalars
        var p_available_housing_scalar = 1;
        var p_building_categories_scalar = 1;
        var p_living_wage_job_openings_scalar = 1;
        var p_population_scalar = 1;
        var p_prestige_scalar = 1;
        var p_soldiers_in_province_scalar = 1;
        var p_supply_limit_scalar = 1;
      }
    }

    //Iterate over all_keys
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = scope[all_keys[i]];

      //Scope conditions
      if (parent == "add_chance" && all_keys[i] == "limit") { //Add chance scope handler
        var new_options = JSON.parse(JSON.stringify(options));

        new_options.nesting++;
        new_options.parent_obj = scope;
        new_options.parents.push("add_chance_limit");

        var limit_pop_scope = module.exports.parseLimit(local_value, new_options);

        if (limit_pop_scope.failed_checks > 0) {
          failed_checks++;
        } else {
          value += scope.value;
        }

        localisation_string.push(`${bulletPoint(options.nesting)}Limit:`);
        localisation_string = appendArrays(localisation_string, limit_pop_scope.localisation_string);
      } else { //Hard limit handler. This defines further iterative subscopes and chance modifiers
        //Group scopes, any/or, not. AND is the default joiner
        //Reset parents when passing to group subscopes since this is a hard limit
        {
          if (all_keys[i] == "and" || all_keys[i].startsWith("and_")) {
            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("and_hard");

            var limit_scope = module.exports.parseLimit(local_value, new_options);

            //Check conditions
            if (!limit_scope.failed_checks > 0) {
              failed_checks++;
            } else {
              value += limit_scope.value;
            }

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(limit_scope.failed_checks == 0)}ALL of the following:`);
            localisation_string = appendArrays(localisation_string, limit_scope.localisation_string);
          }
          if (all_keys[i] == "any" || all_keys[i].startsWith("any_")) {
            var subscope_length = Object.keys(local_value).length;

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("any_hard");

            var limit_scope = module.exports.parseLimit(local_value, new_options);

            //Check conditions
            if (!(limit_scope.failed_checks >= subscope_length)) {
              failed_checks++;
            } else {
              value += limit_scope.value;
            }

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(!(limit_scope.failed_checks >= subscope_length))}ANY of the following:`);
            localisation_string = appendArrays(localisation_string, limit_scope.localisation_string);
          }
          if (all_keys[i] == "not" || all_keys[i].startsWith("not_")) {
            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("not_hard");

            var limit_scope = module.exports.parseLimit(local_value, new_options);

            //Check conditions
            if (limit_scope.failed_checks == 0)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(limit_scope.failed_checks == 0)}NOT all of the following:`);
            localisation_string = appendArrays(localisation_string, limit_scope.localisation_string);
          }
        }

        //Other scopes - [WIP] - Finish function body
        if (all_keys[i] == "add_chance" || all_keys[i].startsWith("add_chance_")) {
          var new_options = JSON.parse(JSON.stringify(options));

          new_options.nesting++;
          new_options.parent_obj = scope;
          new_options.parents.push("add_chance");

          var limit_scope = module.exports.parseLimit(local_value, new_options);

          if (limit_scope.failed_checks == 0)
            value += scope.value;
          localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(limit_scope.failed_checks == 0)}${parseNumber(scope.value, { display_float: true, display_prefix: true })} score from:`);
        } else if (!(all_keys[i] == "per" || all_keys[i].startsWith("per_"))) {
          //Individual conditions - not iterative scope
          if (all_keys[i] == "available_housing") {
            var available_housing = returnSafeNumber(province_obj.housing) - province_obj.pops.population;

            if (available_housing < local_value)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(available_housing >= local_value)}Has >=${parseNumber(local_value)} housing stock`);
          } if (all_keys[i] == "available_housing_less_than") {
            var available_housing = returnSafeNumber(province_obj.housing) - province_obj.pops.population;

            if (available_housing >= local_value)
              failed_checks++;
            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(available_housing < local_value)}Has <${parseNumber(local_value)} housing stock`);
          } if (all_keys[i] == "being_colonised") {
            var province_expeditions = getProvinceExpeditions(province_obj.id);

            if (province_expeditions.length == 0) {
              if (local_value == true) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is being colonised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is being colonised`);
              }
            } else {
              if (local_value == false) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is not being colonised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is not being colonised`);
              }
            }
          } if (all_keys[i] == "demotion_chance") {
            var local_demotion_chance = getDemotionChance(province_obj.id);

            if (local_demotion_chance < local_value)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(local_demotion_chance >= local_value)}Pop demotion chance >=${printPercentage(local_value)}`);
          } if (all_keys[i] == "demotion_chance_less_than") {
            var local_demotion_chance = getDemotionChance(province_obj.id);

            if (local_demotion_chance >= local_value)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(local_demotion_chance < local_value)}Pop demotion chance <${printPercentage(local_value)}`);
          } if (all_keys[i] == "employment") {
            var province_employment = getProvinceEmployment(province_obj.id);

            if (province_employment < local_value)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(province_employment >= local_value)}Province employment >=${printPercentage(local_value)}`);
          } if (all_keys[i] == "employment_less_than") {
            var province_employment = getProvinceEmployment(province_obj.id);

            if (province_employment >= local_value)
              failed_checks++;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(province_employment < local_value)}Province employment <${printPercentage(local_value)}`);
          } if (all_keys[i] == "has_housing") {
            var province_has_housing = returnSafeNumber(province_obj.housing) - province_obj.pops.population;

            if (local_value == true) {
              if (province_has_housing <= 0) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has available housing`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has available housing`);
              }
            } else if (local_value == false) {
              if (province_has_housing > 0) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no available housing`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has available housing`);
              }
            }
          } if (all_keys[i] == "has_no_non_subsistence_buildings") {
            var has_non_subsistence_buildings = hasNonSubsistenceBuildings(province_obj.id);

            if (local_value == true) {
              if (has_non_subsistence_buildings) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no non-subsistence buildings`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no non-subsistence buildings`);
              }
            } else if (local_value == false) {
              if (!has_non_subsistence_buildings) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has non-subsistence buildings`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has non-subsistence buildings`);
              }
            }
          } if (all_keys[i] == "no_jobs") {
            var has_jobs = false;

            if (province_obj.buildings)
              for (var x = 0; x < province_obj.buildings.length; x++) {
                var local_building = province_obj.buildings[x];
                var local_building_keys = Object.keys(local_building);

                for (var y = 0; y < local_building_keys.length; y++)
                  if (local_building_keys[y].endsWith("_positions"))
                    if (local_building[local_building_keys[y]] > 0)
                      has_jobs = true;
              }

            if (!has_jobs) {
              if (local_value == true) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no jobs`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no jobs`);
              }
            } else {
              if (local_value == false) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has jobs`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no jobs`);
              }
            }
          } if (all_keys[i] == "occupied") {
            if (local_value == true)
              if (province_obj.controller == province_obj.owner) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is occupied`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is occupied`);
              }
            if (local_value == false)
              if (province_obj.controller != province_obj.owner) {
                failed_checks++;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is not occupied`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is not occupied`);
              }
          } if (all_keys[i] == "prestige") {
            if (usr)
              if (usr.modifiers)
                if (usr.modifiers.prestige <= local_value) {
                  failed_checks++;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Prestige is greater than ${parseNumber(local_value)}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Prestige is greater than ${parseNumber(local_value)}`);
                }
          } if (all_keys[i] == "prestige_less_than") {
            if (usr)
              if (usr.modifiers)
                if (usr.modifiers.prestige > local_value) {
                  failed_checks++;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Prestige is less than ${parseNumber(local_value)}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Prestige is less than ${parseNumber(local_value)}`);
                }
          } if (all_keys[i] == "supply_limit") {
            if (province_obj.supply_limit < local_value) {
              failed_checks++;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Supply limit is >=${parseNumber(local_value)}`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Supply limit is >=${parseNumber(local_value)}`);
            }
          } if (all_keys[i] == "wealth") {
            var province_wealth = getProvinceWealth(province_obj.id);

            if (province_wealth < local_value) {
              failed_checks++;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province wealth is >=${parseNumber(local_value)}`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province wealth is >=${parseNumber(local_value)}`);
            }
          } if (all_keys[i] == "wealth_less_than") {
            var province_wealth = getProvinceWealth(province_obj.id);

            if (province_wealth >= local_value) {
              failed_checks++;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province wealth is <${parseNumber(local_value)}`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province wealth is <${parseNumber(local_value)}`);
            }
          }
        } else {
          //Individual conditions - iterative scope
          if (parent == "per_building" || parent.startsWith("per_building_")) {
            if (all_keys[i] == "has_building") {
              var building_count = 0;

              if (province_obj.buildings)
                for (var x = 0; x < province_obj.buildings.length; x++)
                  if (province_obj.buildings[x].building_type == local_value)
                    building_cost++;
              pb_buildings_scalar = building_count;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pb_buildings_scalar, true)}${parseNumber(pb_buildings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(pb_buildings_scalar)} buildings`);
            } if (all_keys[i] == "has_building_category") {
              var local_building_category = config.buildings[local_value];
              var local_category_count = 0;

              if (local_building_category)
                if (province_obj.buildings)
                  for (var x = 0; x < province_obj.buildings.length; x++)
                    if (local_building_category[province_obj.buildings[x].building_type])
                      local_category_count++;
              pb_building_category_scalar = local_category_count;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pb_building_category_scalar, true)}${parseNumber(pb_building_category_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(pb_building_category_scalar)} ${(local_building_category.name) ? local_building_category.name : local_value} buildings`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var per_scalar = pb_buildings_scalar*pb_building_category_scalar;

              if (scope.base) {
                value += returnSafeNumber(scope.base);

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base, true)}${parseNumber(scope.base, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*per_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.value, true)}Total score: ${parseNumber(scope.value, { display_float: true, display_prefix: true })}`);
              }
            }
          } else if (parent == "per_percent" || parent.startsWith("per_percent")) {
            //Declare hyperlocal scalars and trackers
            var local_max = Math.min(returnSafeNumber(scope.max), 1);
            var local_min = Math.max(returnSafeNumber(scope.min), 0);

            //General set boolean processing
            if (all_keys[i] == "demotion_chance") {
              var total_demotion_chance = 0;

              for (var x = 0; x < all_pops.length; x++)
                if (province_obj.pops[`${all_pops[x]}-demotion`])
                  total_demotion_chance += returnSafeNumber(province_obj.pops[`${all_pops[x]}-demotion`]);

              pp_demotion_scalar = returnSafeNumber(total_demotion_chance/all_pops.length, 1); //Average it out
              if (pp_demotion_scalar != 1)
                pp_demotion_scalar = pp_demotion_scalar/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_demotion_scalar, true)}${parseNumber(pp_demotion_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(total_demotion_chance)} total demotion chance, unweighted`);
            } if (all_keys[i] == "education_level") {
              var education_percentage = getProvinceEducationLevel(province_obj.id);
              pp_education_scalar = education_percentage/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_education_scalar, true)}${parseNumber(pp_education_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(education_percentage)} Education Level`);
            } if (all_keys[i] == "employment") {
              var employment_percentage = getProvinceEmployment(province_obj.id);
              pp_employment_scalar = employment_percentage/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_employment_scalar, true)}${parseNumber(pp_employment_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(employment_percentage)} employment`);
            } if (all_keys[i] == "enslaved") {
              var enslaved_percentage = getProvinceEnslavedPercentage(province_obj.id);
              pp_enslaved_scalar = enslaved_percentage/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_enslaved_scalar, true)}${parseNumber(pp_enslaved_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(enslaved_percentage)} enslaved population`);
            } if (all_keys[i] == "living_wage_job_openings") {
              var total_living_wage_openings = 0;

              for (var x = 0; x < all_pops.length; x++) {
                var living_wage_job_openings = getJobOpenings(province_obj.id, all_pops[x], { living_wage: true });

                total_living_wage_openings += returnSafeNumber(living_wage_job_openings);
              }

              pp_living_wage_job_openings_scalar = returnSafeNumber((total_living_wage_openings/province_obj.pops.population)/local_value);

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_living_wage_job_openings_scalar, true)}${parseNumber(pp_living_wage_job_openings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_living_wage_openings)} wage job openings`);
            } if (all_keys[i] == "promotion_chance") {
              var total_promotion_chance = 0;

              for (var x = 0; x < all_pops.length; x++)
                if (province_obj.pops[`${all_pops[x]}-promotion`])
                  total_promotion_chance += returnSafeNumber(province_obj.pops[`${all_pops[x]}-promotion`]);

              pp_promotion_scalar = returnSafeNumber(total_promotion_chance/all_pops.length, 1); //Average it out
              if (pp_promotion_scalar != 1)
                pp_promotion_scalar = pp_promotion_scalar/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_promotion_scalar, true)}${parseNumber(pp_promotion_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(total_promotion_chance)} total promotion chance, unweighted`);
            } if (config.pops[all_keys[i]]) { //<pop_name>
              var local_pop = config.pops[all_keys[i]];
              var local_pop_names = [];
              var total_applicable_pops = 0;

              if (typeof local_pop == "object") {
                pp_pop_percent_scalar += (returnSafeNumber(province_obj.pops[all_keys[i]])/province_obj.pops.population)/local_value;
                total_applicable_pops += province_obj.pops[all_keys[i]];

                local_pop_names.push((local_pop.name) ? local_pop.name : all_keys[i]);
              }

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_pop_percent_scalar, true)}${parseNumber(pp_pop_percent_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(total_applicable_pops/province_obj.pops.population)} ${local_pop_names.join(", ")} population`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var percentage_scalar = (pp_demotion_scalar*pp_education_scalar*pp_employment_scalar*pp_enpp_enslaved_scalar*pp_living_wage_job_openings_scalar*pp_promotion_scalar*pp_pop_percent_scalar);

              //Apply max to percentage_scalar
              percentage_scalar = Math.min(percentage_scalar, local_max);
              percentage_scalar = Math.max(percentage_scalar, local_min);

              if (scope.base) {
                value += returnSafeNumber(scope.base);

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base, true)}${parseNumber(scope.base, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*percentage_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(per_value, true)}Total score: ${parseNumber(per_value, { display_float: true, display_prefix: true })}`);
              }
            }
          } else {
            //Regular per scope
            if (all_keys[i] == "available_housing") {
              var province_housing = returnSafeNumber(province_obj.housing) - province_obj.pops.population;

              p_available_housing_scalar = province_housing/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_available_housing_scalar, true)}${parseNumber(p_available_housing_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(province_housing)} available housing`);
            } if (config.buildings[all_keys[i]]) { //<building_category>
              var local_building_category = config.buildings[all_keys[i]];
              var total_category_buildings = 0;

              if (province_obj.buildings)
                for (var x = 0; x < province_obj.buildings.length; x++)
                  if (local_building_category[province_obj.buildings[x].building_type])
                    total_category_buildings++;

              p_building_categories_scalar += total_category_buildings/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_building_categories_scalar, true)}${parseNumber(p_building_categories_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_category_buildings)} ${(local_building_category.name) ? local_building_category.name : all_keys[i]} buildings`);
            } if (all_keys[i] == "living_wage_job_openings") {
              var living_wage_job_openings = 0;

              for (var x = 0; x < all_pops.length; x++)
                living_wage_job_openings += getJobOpenings(province_obj.id, all_pops[x], { living_wage: true });

              p_living_wage_job_openings_scalar = (living_wage_job_openings/local_value);
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_living_wage_job_openings_scalar, true)}${parseNumber(p_living_wage_job_openings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(living_wage_job_openings)} living wage job openings`);
            } if (all_keys[i] == "population") {
              p_population_scalar = province_obj.pops.population/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_population_scalar, true)}${parseNumber(p_population_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(province_obj.pops.population)} inhabitants`);
            } if (all_keys[i] == "prestige") {
              p_prestige_scalar = usr.modifiers.prestige/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_prestige_scalar, true)}${parseNumber(p_prestige_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(usr.modifiers.prestige)} prestige`);
            } if (all_keys[i] == "soldiers_stationed_in_province") {
              var soldiers_in_province = lookup.province_troop_strengths[province_obj.id];
              p_soldiers_in_province_scalar = soldiers_in_province/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_soldiers_in_province_scalar, true)}${parseNumber(p_soldiers_in_province_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(soldiers_in_province)} soldiers stationed in province`);
            } if (all_keys[i] == "supply_limit") {
              var province_supply_limit = returnSafeNumber(province_obj.supply_limit, config.defines.combat.base_supply_limit);

              p_supply_limit_scalar = province_supply_limit/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_supply_limit_scalar, true)}${parseNumber(p_supply_limit_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(province_supply_limit)} supply limit`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var per_scalar = p_available_housing_scalar*p_building_categories_scalar*p_living_wage_job_openings_scalar*p_population_scalar*p_prestige_scalar*p_soldiers_in_province_scalar*p_supply_limit_scalar;

              if (scope.base) {
                value += returnSafeNumber(scope.base);
                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base, true)}${parseNumber(scope.base, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*per_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(per_value, true)}Total score: ${parseNumber(per_value, { display_float: true, display_prefix: true })}`);
              }
            }
          }
        }
      }
    }

    //Dserialise selectors if no parents; add base selector to top
    if (options.parents.length == 0) {
      var all_selector_keys = Object.keys(selectors);
      var new_selectors = [];

      for (var i = 0; i < all_selector_keys.length; i++)
        new_selectors.push([all_selector_keys[i], selectors[all_selector_keys[i]]]);

      selectors = new_selectors;

      //Push top layer to selectors as well
      selectors.unshift([options.scope[0], options.scope[1], value]);

      //Get rid of selectors with 0 values
      for (var i = selectors.length - 1; i >= 0; i--)
        if (selectors[i][2] == 0)
          selectors.splice(i, 1);
    }

    //Return statement
    return {
      localisation_string: localisation_string,
      value: value,

      failed_checks: failed_checks,
      selectors: selectors
    };
  },

  //Parses modifiers to a string
  /*
    options: {
      formatter: "", - Any MD formatting when parsing strings
      nesting: 0, - How much bullet points should be nested when formatting
      no_formatting: true/false - Whether MD formatting should be excluded. False by default
    }
  */
  parseModifiers: function (arg0_modifier_obj, arg1_exclude_bullets, arg2_base_zero, arg3_base_one, arg4_options) {
    //Convert from parameters
    var modifier_obj = arg0_modifier_obj;
    var exclude_bullets = arg1_exclude_bullets;
    var base_zero = arg2_base_zero;
    var base_one = arg3_base_one;
    var options = (arg4_options) ? arg4_options : { nesting: 0 };

    //Declare local instance variables
    var f = "**"; //Formatter
    var h_prefix = (!exclude_bullets) ? bulletPoint(Math.max(options.nesting - 1, 0)) : "";
    var modifier_string = [];
    var prefix = (!exclude_bullets) ? bulletPoint(options.nesting) : "";

    if (modifier_obj) {
      var all_modifier_keys = Object.keys(modifier_obj);

      //Set formatter
      if (options.formatter)
        f = options.formatter;
      if (options.no_formatting)
        f = "";

      //Format modifier_string
      for (var i = 0; i < all_modifier_keys.length; i++) {
        var local_modifier = module.exports.getModifier(all_modifier_keys[i]);
        var local_modifier_name;
        var local_value = getList(modifier_obj[all_modifier_keys[i]]);

        //Fetch local_modifier_name
        if (local_modifier) {
          local_modifier_name = (local_modifier.name) ? local_modifier.name : all_modifier_keys[i];
        } else {
          //Substantiate dummy local_modifier variables if not found
          local_modifier = { name: "" };

          if (config.governments[all_modifier_keys[i]]) {
            var local_government = config.governments[all_modifier_keys[i]];

            local_modifier_name = `${local_government.name} Popularity`;
          } else if (all_modifier_keys[i].includes("_ap")) {
            local_modifier_name = parseString(all_modifier_keys[i].replace("_ap", " Attack"));
          } else if (all_modifier_keys[i].includes("_dp")) {
            local_modifier_name = parseString(all_modifier_keys[i].replace("_dp", " Defence"));
          } else {
            local_modifier_name = parseString(all_modifier_keys[i]);
          }
        }

        //Good handling
        if (lookup.all_goods[all_modifier_keys[i]]) {
          var good_obj = lookup.all_goods[all_modifier_keys[i]];

          if (local_value.length == 1) {
            modifier_string.push(`${prefix}${f}${parseNumber(local_value[0])}${f} ${(good_obj.name) ? good_obj.name : all_modifier_keys[i]}`);
          } else {
            modifier_string.push(`${prefix}${f}${parseNumber(local_value[0])} - ${parseNumber(local_value[1])}${f} ${(good_obj.name) ? good_obj.name : all_modifier_keys[i]}`);
          }
        } else if (all_modifier_keys[i] == "money") { //Money handler
          (local_value.length == 1) ?
            modifier_string.push(`${prefix}£${parseNumber(local_value[0])}`) :
            modifier_string.push(`${prefix}£${parseNumber(local_value[0])} - ${parseNumber(local_value[1])}`);
        } else if (config.pops[all_modifier_keys[i]]) { //Pops handling
          var pop_obj = config.pops[all_modifier_keys[i]];

          var local_pop_name = (pop_obj.name) ? pop_obj.name : all_modifier_keys[i];

          (local_value.length == 1) ?
            modifier_string.push(`${prefix}${parseNumber(local_value[0])} ${local_pop_name}`) :
            modifier_string.push(`${prefix}${parseNumber(local_value[0])} - ${parseNumber(local_value[1])} ${local_pop_name}`);
        } else {
          if (local_modifier.type == "integer") {
            var prefix_displayed = true;

            if (["political_capital"].includes(local_modifier.type))
              prefix_displayed = false;

            //Parse modifier as integer
            modifier_string.push(`${prefix}${f}${parseNumber(local_value[0], { display_prefix: prefix_displayed })}${f} ${local_modifier_name}`);
          } else {
            //Effects/scopes parsing
            if (all_modifier_keys[i] == "any_pop" || all_modifier_keys[i].startsWith("any_pop_")) {
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              modifier_string.push(`${h_prefix}Any Pop:`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "construction_turns") {
              modifier_string.push(`${prefix}Construction Time: ${f}${parseNumber(local_value[0])}${f} Turn(s)`);
            } else if (all_modifier_keys[i] == "cost") {
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              modifier_string.push(`${h_prefix}Cost:`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "enable_centralisation") {
              modifier_string.push((local_value[0]) ? `Enables Centralisation` : `Disables Centralisation`);
            } else if (all_modifier_keys[i] == "houses") {
              modifier_string.push(`${h_prefix}Houses ${f}${parseNumber(local_value[0])}${f}`);
            } else if (all_modifier_keys[i] == "infamy_loss") {
              modifier_string.push(`${prefix}${f}${printPercentage(local_value[0], { display_prefix: true, base_zero: true })}${f} ${local_modifier_name}`);
            } else if (all_modifier_keys[i] == "maintenance") {
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              modifier_string.push(`${h_prefix}Maintenance:`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "maximum") {
              modifier_string.push(`${h_prefix}Maximum: ${parseNumber(local_value[0])}`);
            } else if (all_modifier_keys[i] == "manpower_cost") {
              var local_obj = local_value[0];

              var local_keys = Object.keys(local_obj);

              for (var x = 0; x < local_keys.length; x++) {
                var local_subobj = local_obj[local_keys[x]];

                modifier_string.push(`${h_prefix}Manpower:`);
                //Recursive scopes
                if (local_keys[x] == "any_pop" || local_keys[i].startsWith("any_pop_")) {
                  var new_options = JSON.parse(JSON.stringify(options));
                  new_options.nesting++;

                  modifier_string.push(
                    module.exports.parseModifiers(local_subobj, exclude_bullets, base_zero, base_one, new_options)
                  );
                }

                //Effects
                if (config.pops[local_keys[x]]) {
                  var pop_obj = config.pops[local_keys[x]];

                  modifier_string.push(` ${prefix}${f}${parseNumber(local_subobj)}${f} ${(pop_obj.name) ? pop_obj.name : local_keys[x]}`);
                }
              }
            } else if (all_modifier_keys[i] == "obsolete_building") {
              var building_names = [];
              for (var x = 0; x < local_value.length; x++)
                building_names.push(
                  (getBuilding(local_value[x])) ?
                    getBuilding(local_value[x]).name :
                    local_value[x]
                )

              modifier_string.push(`${prefix}Obsoletes ${f}${building_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "obsolete_government") {
              var government_names = [];
              for (var x = 0; x < local_value.length; x++)
                government_names.push(
                  (config.governments[local_value[x]]) ?
                    (config.governments[local_value[x]].name) ?
                      config.governments[local_value[x]].name :
                      local_value[x] :
                    local_value[x]
                )

              modifier_string.push(`${prefix}Obsoletes ${f}${government_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "obsolete_reform") {
              var reform_names = [];
              for (var x = 0; x < local_value.length; x++)
                government_names.push(
                  (config.reforms[local_value[x]]) ?
                      (config.reforms[local_value[x]].name) ?
                        config.reforms[local_value[x]].name :
                        local_value[x] :
                    local_value[x]
                );

              modifier_string.push(`${prefix}Obsoletes ${f}${reform_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "obsolete_unit") {
              var unit_names = [];
              for (var x = 0; x < local_value.length; x++)
                unit_names.push(
                  (getUnit(local_value[x])) ?
                      (getUnit(local_value[x]).name) ?
                        getUnit(local_value[x]).name :
                        local_value[x] :
                    local_value[x]
                );

              modifier_string.push(`${prefix}Obsoletes ${f}${unit_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "produces") {
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              modifier_string.push(`${h_prefix}Produces:`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "production_choice" || all_modifier_keys[i].startsWith("production_choice_")) {
              var new_options = JSON.parse(JSON.stringify(options));
              var production_choice_name = parseString(all_modifier_keys[i].replace("production_choice_", ""));
              new_options.nesting++;

              modifier_string.push(`${prefix}${production_choice_name} (PC)`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "reform_desire_gain") {
              modifier_string.push(`${prefix}${f}${printPercentage(local_value[0], { base_zero: true })}${f} Reform Desire Gain`);
            } else if (all_modifier_keys[i] == "resident_modifiers") {
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              modifier_string.push(`Resident Modifiers:`);
              modifier_string.push(
                module.exports.parseModifiers(local_value[0], exclude_bullets, base_zero, base_one, new_options)
              );
            } else if (all_modifier_keys[i] == "stability_modifier") {
              modifier_string.push(`${prefix}${f}${printPercentage(local_value[0], { base_zero: true })}${f} Stability Modifier`);
            } else if (all_modifier_keys[i] == "unlock_building") {
              var building_names = [];
              for (var x = 0; x < local_value.length; x++)
                building_names.push(
                  (getBuilding(local_value[x])) ?
                      (getBuilding(local_value[x]).name) ?
                        getBuilding(local_value[x]).name :
                        local_value[x] :
                    local_value[x]
                );

              modifier_string.push(`${prefix}Enables ${f}${building_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "unlock_government") {
              var government_names = [];
              for (var x = 0; x < local_value.length; x++)
                government_names.push(
                  (getGovernment(local_value[x])) ?
                      (getGovernment(local_value[x]).name) ?
                        getGovernment(local_value[x]).name :
                        local_value[x]:
                    local_value[x]
                );

              modifier_string.push(`${prefix}Unlocks ${f}${government_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "unlock_reform") {
              var reform_names = [];
              for (var x = 0; x < local_value.length; x++)
                reform_names.push(
                  (config.reforms[local_value[x]]) ?
                      (config.reforms[local_value[x]].name) ?
                        config.reforms[local_value[x]].name :
                        local_value[x] :
                    local_value[x]
                );

              modifier_string.push(`${prefix}Unlocks ${f}${reform_names.join(", ")}${f}`);
            } else if (all_modifier_keys[i] == "unlock_unit") {
              var unit_names = [];
              for (var x = 0; x < local_value.length; x++)
                unit_names.push(
                  (getUnit(local_value[x])) ?
                    (getUnit(local_value[x])) ?
                      getUnit(local_value[x]).name :
                      local_value[x] :
                    local_value[x]
                );

              modifier_string.push(`${prefix}Enables ${f}${unit_names.join(", ")}${f}`);
            } else {
              //Default modifiers
              if (
                !reserved.buildings.includes(all_modifier_keys[i])
              ) {
                (local_modifier.type == "percentage" || (local_value[0] > -1 && local_value[0] < 1)) ?
                  modifier_string.push(`${prefix}${f}${printPercentage(local_value[0], { display_prefix: true, base_zero: base_zero, base_one: base_one })}${f} ${local_modifier_name}`) :
                  modifier_string.push(`${prefix}${f}${parseNumber(local_value[0], { display_prefix: true, base_zero: base_zero, base_one: base_one })}${f} ${local_modifier_name}`);
              }
            }
          }
        }
      }
    }

    //Return statement
    return modifier_string.join("\n");
  },

  /*
    parsePopLimit() - Returns pop tags and objects for a given province depending on the selector. Recursive. May return more than the total pop type of a province, Math.min() bound in this case.
    options: {
      flags: {
        scope: ["province", "4709"] - Defines the current scoped object.
      },
      nesting: 1, - The current depth level that things are being parsed at. 1 by default.
      parent_obj: {}, - The object of the initial parent. Optional.
      parents: [], - An array of parent elements used for placing relevant flags. Defaults to [],
       - and_hard
       - any_hard
       - not_hard

       Other scopes:
       - add_chance

      province_id: "4407", - The province ID to target.
      pop_type: "soldiers", - Optional. The pop type to target as defined in config.pops
      pop_scope: {}, - Optional. Optimisation parameter. Current pop_scope to work with
      value: 0 - Used to pass a base value to the function
    }

    Returns: {
      localisation_string: [], - The localisation string returned as an array
      value: 0.045, - Base value for pop scope

      boolean: true/false, - Used for hard non-fuzzy conditions such as has_industrialised
      selectors: [], - [pop_scope, value] - A list of selectors for which values are added onto

      pop_scope: {} - The pop return object for which the boolean was fulfilled and value chance higher than 0
    }
  */
  parsePopLimit: function (arg0_scope, arg1_options) { //[WIP] - Finish function body, standardise to ot_province
    //Convert from parameters
    var scope = arg0_scope;
    var options = (arg1_options) ? arg1_options : {};

    //Initialise options
    if (!options.flags) options.flags = {
      scope: (!options.province_id) ? [undefined, undefined] : ["province", options.province_id]
    };
    if (!options.nesting) options.nesting = 1;
    if (!options.parents) options.parents = [];
    if (!options.pop_flags) options.pop_flags = {};

    //Declare local instance variables
    var all_keys = Object.keys(scope);
    var local_pop_obj = {};
    var localisation_string = [];
    var parent = options.parents[options.parents.length - 1];
    var pop_plurality_culture = ["", 0];
    var pop_scope = (options.pop_scope) ? options.pop_scope : selectPops({
      province_id: options.province_id,
      pop_types: [options.pop_type]
    });
    var province_obj = (options.flags.scope[0] == "province" && options.province_id) ?
      main.provinces[options.province_id] : undefined;
    var selectors = {};
    var value = (options.value) ? options.value : 0;

    var ot_province;
    var ot_user;

    //Insurance for variables
    if (!parent) parent = "";

    //Initialise scope variables
    {
      if (options.flags.scope[0] == "country") {
        ot_user = main.users[options.flags.scope[1]];
      } else if (options.flags.scope[0] == "province") {
        ot_user = main.users[main.provinces[options.flags.scope[1]].controller];
        ot_province = main.provinces[options.flags.scope[1]];
      }

      if (!ot_province) ot_province = province_obj;
      if (!ot_user) ot_user = main.users[province_obj.controller];
    }


    //Initialise pop optimisation tags
    var all_pop_tags_keys = Object.keys(pop_scope.tags);

    for (var i = 0; i < all_pop_tags_keys.length; i++)
      if (all_pop_tags_keys[i].startsWith("culture-")) {
        var local_value = pop_scope.tags[all_pop_tags_keys[i]];

        if (local_value > pop_plurality_culture[1])
          pop_plurality_culture = [all_pop_tags_keys[i].replace("culture-", ""), local_value];
      }

    //Declare scalars for iterative scopes
    {
      //per_100k scalars (p1)
      {
        //Declare local scalars
        var p1_job_openings_scalar = 1;
        var p1_pop_class_scalar = 1;
        var p1_pop_type_scalar = 1;
      }

      //per_building scalars (pb)
      {
        //Declare local scalars
        var pb_buildings_scalar = 1;
        var pb_building_category_scalar = 1;
      }

      //per_percent scalars (pp)
      {
        //Declare local scalars/trackers
        var target_pop_scope = [];

        var pp_demotion_scalar = 1;
        var pp_employment_scalar = 1;
        var pp_enslaved_scalar = 1;
        var pp_living_wage_job_openings_scalar = 1;
        var pp_median_wage_percentage_scalar = 1;
        var pp_promotion_scalar = 1;
        var pp_pop_percent_scalar = 1;
      }

      //per sclars (p)
      {
        //Declare local scalars
        var p_available_housing_scalar = 1;
        var p_building_categories_scalar = 1;
        var p_living_wage_job_openings_scalar = 1;
        var p_population_scalar = 1;
        var p_prestige_scalar = 1;
        var p_soldiers_in_province_scalar = 1;
        var p_supply_limit_scalar = 1;
      }
    }

    //Iterate over all_keys
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = scope[all_keys[i]];

      //Scope conditions
      if (parent == "add_chance" && all_keys[i] == "limit") { //add_chance scope handler
        var new_options = JSON.parse(JSON.stringify(options));
        var new_pop_scope = JSON.parse(JSON.stringify(pop_scope));

        new_options.nesting++;
        new_options.parent_obj = scope;
        new_options.pop_scope = pop_scope;
        new_options.parents.push("add_chance_limit");

        var limit_pop_scope = module.exports.parsePopLimit(local_value, new_options);
        var local_pop_scope = limit_pop_scope.pop_scope;

        var local_percentage = local_pop_scope.size/province_obj.pops[options.pop_type];

        if (limit_pop_scope.boolean)
          value += scope.value;

        localisation_string.push(`${bulletPoint(options.nesting)}Limit:`);
        localisation_string = appendArrays(localisation_string, limit_pop_scope.localisation_string);
      } else { //Hard limit handler. This defines the pop subscope that meets these conditions for which value is processed
        //Group scopes, any/or, not. AND is the default joiner
        //Reset parents when passing to group subscopes since this is a hard limit
        {
          if (all_keys[i] == "and" || all_keys[i].startsWith("and_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("and_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_limit.pop_scope.size, true)}ALL of the following:`);
            localisation_string = appendArrays(localisation_string, local_pop_limit.localisation_string);

            //Intersect with pop_scope
            pop_scope = mergePopScopes(pop_scope, local_pop_limit.pop_scope);
          }
          if (all_keys[i] == "any" || all_keys[i].startsWith("any_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("any_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_limit.pop_scope.size, true)}ANY of the following:`);
            localisation_string = appendArrays(localisation_string, local_pop_limit.localisation_string);

            //Intersect with pop_scope
            pop_scope = mergePopScopes(pop_scope, local_pop_limit.pop_scope);
          }
          if (all_keys[i] == "not" || all_keys[i].startsWith("not_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("not_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_limit.pop_scope.size*-1, true)}NOT all of the following:`);

            //Subtract from pop_scope
            pop_scope = subtractObjects(pop_scope, local_pop_limit.pop_scope);
          }
        }

        //Other scopes
        {
          if (all_keys[i] == "add_chance" || all_keys[i].startsWith("add_chance_")) {
            var new_options = JSON.parse(JSON.stringify(options));
            var new_pop_scope = JSON.parse(JSON.stringify(pop_scope));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push("add_chance");
            new_options.pop_scope = pop_scope;

            var local_pop_scope = module.exports.parsePopLimit(local_value, new_options);
            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_scope.pop_scope.size, true)}${printPercentage(local_value.value, { display_float: true, display_prefix: true })} chance for ${parseNumber(local_pop_scope.pop_scope.size)} people from:`);
            localisation_string = appendArrays(localisation_string, local_pop_scope.localisation_string);

            if (local_pop_scope.pop_scope.size > 0)
              modifyValue(selectors, JSON.stringify(pop_scope), returnSafeNumber(local_value.value));
          } else if (all_keys[i].startsWith("building_category_") && typeof local_value == "object") {
            var new_options = JSON.parse(JSON.stringify(options));
            var new_pop_scope = JSON.parse(JSON.stringify(pop_scope));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push(all_keys[i]);
            new_options.pop_scope = pop_scope;

            var local_pop_scope = module.exports.parsePopLimit(local_value, new_options);
            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_scope.value)}${printPercentage(local_pop_scope.value, { display_float: true })} chance for ${parseNumber(local_pop_scope.pop_scope.size)} people from:`);
            localisation_string = appendArrays(localisation_string, local_pop_scope.localisation_string);

            //Merge selectors from per scope
            modifyValue(selectors, JSON.stringify(pop_scope), returnSafeNumber(local_pop_scope.value));
          } else if (all_keys[i] == "per" || all_keys[i].startsWith("per_")) {
            var new_options = JSON.parse(JSON.stringify(options));
            var new_pop_scope = JSON.parse(JSON.stringify(pop_scope));

            new_options.nesting++;
            new_options.parent_obj = scope;
            new_options.parents.push(all_keys[i]);
            new_options.pop_scope = pop_scope;

            var local_pop_scope = module.exports.parsePopLimit(local_value, new_options);
            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(local_pop_scope.pop_scope.size, true)}${printPercentage(local_value.value, { display_float: true, display_prefix: true })} chance for ${parseNumber(local_pop_scope.pop_scope.size)} people from:`);

            console.log(`Local pop scope for ${all_keys[i]}:`, local_pop_scope);
            localisation_string = appendArrays(localisation_string, local_pop_scope.localisation_string);

            //Merge selectors from per scope
            modifyValue(selectors, JSON.stringify(pop_scope), returnSafeNumber(local_pop_scope.value));
          }
        }

        //Individual conditions - not iterative scope
        if (!(parent == "per" || parent.startsWith("per_"))) {
          if (all_keys[i] == "available_housing") {
            if (ot_province) {
              var available_housing = returnSafeNumber(ot_province.housing) - ot_province.pops.population;

              if (available_housing < local_value)
                empty_scope = true;

              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(available_housing >= local_value)}Available Housing is >=${parseNumber(local_value)}`);
            }
          } if (all_keys[i] == "available_housing_less_than") {
            if (ot_province) {
              var available_housing = returnSafeNumber(ot_province.housing) - ot_province.pops.population;

              if (available_housing >= local_value)
                empty_scope = true;

              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(available_housing < local_value)}Available Housing is <${parseNumber(local_value)}`)
            }
          } if (all_keys[i] == "base_value") {
            value += local_value;

            localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}${printPercentage(local_value, { display_float: true, display_prefix: true })} Base Value`);
          } if (all_keys[i] == "being_colonised" || all_keys[i] == "being_settled") {
            var province_expeditions = getProvinceExpeditions(ot_province.id);

            if (province_expeditions.length == 0) {
              if (local_value == true) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is being colonised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is being colonised`);
              }
            } else {
              if (local_value == false) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is not being colonised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is not being colonised`);
              }
            }
          } if (all_keys[i].startsWith("can_afford_")) {
            //Fetch can afford scope
            var local_goods_category = all_keys[i].replace("can_afford_", "");
            var needs_category_price = getNeedsCategoryPrice(options.pop_type, local_goods_category);

            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              [(local_value == true) ? "income" : "income_less_than"]: needs_category_price/100000
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} people can afford ${config.localisation[local_goods_category]}`);
          } if (all_keys[i] == "demotion_chance") {
            if (province_obj.trackers) {
              var local_demotion_chance = getDemotionChance(ot_province.id, options.pop_type);

              if (local_demotion_chance < local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has >=${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has >=${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
              }
            } else {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has >=${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
            }
          } if (all_keys[i] == "demotion_chance_less_than") {
            if (province_obj.trackers) {
              var local_demotion_chance = getDemotionChance(ot_province.id, options.pop_type);

              if (local_demotion_chance >= local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has <${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has <${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
              }
            } else {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has <${printPercentage(local_value)} demotion chance for ${parsePop(options.pop_type, true)}`);
            }
          } if (all_keys[i] == "education_level") {
            //Fetch education level scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              education_level: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} people have an Education level >=${printPercentage(local_value)}`);
          } if (all_keys[i] == "education_level_less_than") {
            //Fetch education level less than scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              education_level_less_than: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} people have an Education level <${printPercentage(local_value)}`);
          } if (all_keys[i] == "employment") {
            var province_employment = getProvinceEmployment(ot_province.id, options.pop_type);

            if (province_employment < local_value) {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province employment is >=${printPercentage(local_value)}`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province employment is >=${printPercentage(local_value)}`);
            }
          } if (all_keys[i] == "employment_less_than") {
            var province_employment = getProvinceEmployment(ot_province.id, options.pop_type);

            if (province_employment >= local_value) {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province employment is <${printPercentage(local_value)}`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province employment is <${printPercentage(local_value)}`);
            }
          } if (all_keys[i] == "fully_employed") {
            var local_building_category_key = parent.replace("building_category_", "");

            if (config.buildings[local_building_category_key]) {
              var meets_conditions = true;
              var local_building_category = config.buildings[local_building_category_key];

              //Iterate over all buildings in province and check if each building is fully employed
              if (province_obj.buildings)
                for (var x = 0; x < province_obj.buildings.length; x++)
                  if (province_obj.buildings[x].employment) {
                    var local_building = province_obj.buildings[x];

                    if (local_building_category.includes(local_building.building_type)) {
                      var remaining_positions = getBuildingRemainingPositions(local_building);

                      if (remaining_positions > 0) {
                        if (local_value == true) {
                          empty_scope = true;
                          meets_conditions = false;
                        }
                      } else if (remaining_positions <= 0) {
                        if (local_value == false) {
                          empty_scope = true;
                          meets_conditions = false;
                        }
                      }
                    }
                  }

              (meets_conditions) ?
                localisation_string.push(`${bulletPoint(options.nesting)})}${booleanCheck(meets_conditions)}${(local_building_category.name) ? local_building_category.name : local_building_category_key} is fully employed`) :
                localisation_string.push(`${bulletPoint(options.nesting)})}${booleanCheck(meets_conditions)}${(local_building_category.name) ? local_building_category.name : local_building_category_key} is not fully employed`);
            }
          } if (all_keys[i] == "has_accepted_culture") {
            //Fetch has_accepted_culture scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              has_accepted_culture: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} are of an accepted culture`);
          } if (all_keys[i].startsWith("has_")) { //has_<goods_category>
            var local_needs_category = all_keys[i].replace("has_", "");
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              [all_keys[i]]: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            if (lookup.all_pop_needs_categories[local_needs_category])
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} have >=${printPercentage(local_value)} ${config.localisation[local_needs_category]} fulfilment`);
          } if (all_keys[i].startsWith("has_")) { //has_<goods_category>_less_than
            var local_needs_category = all_keys[i].replace("has_", "").replace("_less_than", "");

            if (lookup.all_pop_needs_categories[local_needs_category]) {
              var local_pop_scope = selectPops({
                province_id: ot_province.id,
                pop_types: [options.pop_type],

                [all_keys[i]]: local_value
              });

              pop_scope = (parent.startsWith("any")) ?
                mergeObjects(pop_scope, local_pop_scope) :
                mergePopScopes(pop_scope, local_pop_scope); //and, not, default

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size)}${parseNumber(pop_scope.size)} have <${printPercentage(local_value)} ${config.localisation[local_needs_category]} fulfilment`);
            }
          } if (all_keys[i] == "has_housing") {
            var province_has_housing = returnSafeNumber(ot_province.housing) - ot_province.pops.population;

            if (local_value == true) {
              if (province_has_housing <= 0) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has available housing`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has available housing`);
              }
            } else if (local_value == false) {
              if (province_has_housing > 0) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no available housing`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no available housing`);
              }
            }
          } if (all_keys[i].startsWith("has_") && all_keys[i].includes("_variety")) { //has_<goods_category>_variety
            var local_goods_category = all_keys[i].replace("has_", "").replace("_variety", "");
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              [all_keys[i]]: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            if (lookup.all_pop_needs_categories[local_goods_category])
              if (pop_scope.size > 0) {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has >=${printPercentage(local_value)} ${config.localisation[local_goods_category]} variety`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has >=${printPercentage(local_value)} ${config.localisation[local_goods_category]} variety`);
              }
          } if (all_keys[i] == "has_" && all_keys[i].includes("_variety_less_than")) { //has_<goods_category>_variety_less_than
            var local_goods_category = all_keys[i].replace("has_", "").replace("_variety_less_than", "");
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              [all_keys[i]]: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            if (lookup.all_pop_needs_categories[local_goods_category])
              if (pop_scope.size > 0) {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has <${printPercentage(local_value)} ${config.localisation[local_goods_category]} variety`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has <${printPercentage(local_value)} ${config.localisation[local_goods_category]} variety`);
              }
          } if (all_keys[i] == "has_no_non_subsistence_buildings") {
            var has_non_subsistence_buildings = hasNonSubsistenceBuildings(ot_province.id);

            if (local_value == true) {
              if (has_non_subsistence_buildings) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has non-subsistence buildings`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has non subsistence buildings`);
              }
            } else if (local_value == false) {
              if (!has_non_subsistence_buildings) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Has no non-subsistence buildings`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Has no non-subsistence buildings`);
              }
            }
          } if (all_keys[i] == "has_pop_plurality_culture") {
            //Whether the pop's plurality culture is a plurality in the current province scope
            if (ot_province.pops) {
              var plurality_ot_culture = getMajorityCulture(ot_province.id, { return_key: true });

              if (local_value == true) {
                if (plurality_ot_culture != pop_plurality_culture[0]) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop is of province plurality culture`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop is of province plurality culture`);
                }
              } else if (local_value == false) {
                if (plurality_ot_culture == pop_plurality_culture[0]) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop is not of province plurality culture`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop is not of province plurality culture`);
                }
              }
            }
          } if (all_keys[i] == "has_primary_culture") {
            //Whether the pop's plurality culture is a primary culture of the controller of the current province scope
            if (ot_province.pops) {
              var is_primary_culture = false;
              var local_culture = main.global.cultures[pop_plurality_culture[0]];

              if (local_culture)
                is_primary_culture = (local_culture.primary_culture.includes(ot_province.controller));

              if (local_value == true) {
                if (!is_primary_culture) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop is of national primary culture`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop is of national primary culture`);
                }
              } else if (local_value == false) {
                if (is_primary_culture) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop is not of national primary culture`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop is not of national primary culture`);
                }
              }
            }
          } if (all_keys[i] == "has_standing_army") {
            if (local_value == true) {
              if (!hasStandingArmy(province_obj.controller)) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province controller has a Standing Army`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province controller has a Standing Army`);
              }
            } else if (local_value == false) {
              if (hasStandingArmy(province_obj.controller)) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province controller has no Standing Army`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province controller has no Standing Army`);
              }
            }
          } if (all_keys[i] == "homeless") {
            //Fetch homeless scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              homeless: true
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)}${parseNumber(pop_scope.size)} people are homeless`);
          } if (all_keys[i] == "income") {
            //Fetch income scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              income: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)}${parseNumber(pop_scope.size)} people have >=${parseNumber(local_value)} income`);
          } if (all_keys[i] == "income_less_than") {
            //Fetch income less than scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              income_less_than: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)}${parseNumber(pop_scope.size)} people have <${parseNumber(local_value)} income`);
          } if (all_keys[i] == "is_allied") {
            var has_alliance;

            if (scope[0] == "country") {
              has_alliance = hasAlliance(user_id, scope[1]);
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(has_alliance)}Is allied with the current scope`);
            } else if (scope[0] == "province") {
              has_alliance = hasAlliance(user_id, main.provinces[scope[1]].controller);
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(has_alliance)}Controller of province is allied with the current scope`);
            }

            if (!has_alliance) {
              if (local_value == true)
                empty_scope = true;
            } else {
              if (local_value == false)
                empty_scope = true;
            }
          } if (all_keys[i] == "is_employed") {
            //Fetch is employed scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              employed: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)} people are employed`);
          } if (all_keys[i] == "is_employed_at") {
            //Fetch employment buildings scope
            var building_ids = getList(local_value);
            var building_names = [];
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              building_ids: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            //Fetch building_names
            for (var i = 0; i < building_ids.length; i++) {
              var building_obj = getBuildingByID(building_ids[i]);
              building_names.push(building_obj.name);
            }

            if (building_names.length > 0)
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)} are employed at ${building_names.join(", ")}`);
          } if (all_keys[i].startsWith("is_")) { //is_<government_type>
            //Check to make sure this is a valid government type
            var government_type = all_keys[i].replace("is_", "");

            if (config.governments[government_type]) {
              var is_government_type = (usr.government == government_type);

              if (local_value == true) {
                if (!is_government_type) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Government type is ${(config.governments.name) ? config.governments.name : government_type}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Government type is ${(config.governments.name) ? config.governments.name : government_type}`);
                }
              } else if (local_value == false) {
                if (is_government_type) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Government type is not ${(config.governments.name) ? config.governments.name : government_type}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Government type is not ${(config.governments.name) ? config.governments.name : government_type}`);
                }
              }
            }
          } if (all_keys[i] == "is_mobilised") {
            var is_mobilised = (usr.mobilisation.is_mobilised);

            if (local_value == true) {
              if (!is_mobilised) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is mobilised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is mobilised`);
              }
            } else if (local_value == false) {
              if (is_mobilised) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is not mobilised`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is not mobilised`);
              }
            }
          } if (all_keys[i] == "is_vassal") {
            var has_overlord;

            if (scope[0] == "country") {
              has_overlord = getVassal(scope[1]);
            } else if (scope[0] == "province") {
              has_overlord = getVassal(main.provinces[scope[1]].controller);
            }

            if (!has_overlord) {
              if (local_value == true) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is vassal`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is vassal`);
              }
            } else {
              if (local_value == false) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Is not a vassal`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Is not a vassal`);
              }
            }
          } if (all_keys[i] == "median_wage_percentage") {
            if (ot_province.id != options.province_id) {
              var current_median_wage = getMedianWage(options.province_id);
              var ot_median_wage = getMedianWage(ot_province.id);

              var median_wage_percentage = (ot_median_wage/current_median_wage) - 1;

              if (median_wage_percentage < local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Other province has a >=${printPercentage(local_value)} higher median wage`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Other province has a >=${printPercentage(local_value)} higher median wage`);
              }
            }
          } if (all_keys[i] == "median_wage_percentage_less_than") {
            if (ot_province.id != options.province_id) {
              var current_median_wage = getMedianWage(options.province_id);
              var ot_median_wage = getMedianWage(ot_province.id);

              var median_wage_percentage = (ot_median_wage/current_median_wage) - 1;

              if (median_wage_percentage >= local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Other province has a <${printPercentage(local_value)} higher median wage`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Other province has a <${printPercentage(local_value)} higher median wage`);
              }
            }
          } if (all_keys[i] == "no_jobs") {
            //Fetch no_jobs scope
            var has_jobs = false;

            if (ot_province.buildings)
              for (var x = 0; x < ot_province.buildings.length; x++)
                if (ot_province.buildings[x][`${options.pop_type}_positions`] > 0)
                  has_jobs = true;

            if (local_value == true) {
              if (has_jobs) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)} Province has no jobs`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)} Province has no jobs`);
              }
            } else {
              if (!has_jobs) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)} Province has available jobs`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)} Province has available jobs`);
              }
            }
          } if (all_keys[i] == "occupied") {
            if (local_value == true)
              if (ot_province.controller != ot_province.owner) {
                pop_scope = [parent.startsWith("any") ? "mergeObjects" : "mergePopScopes"](pop_scopes, selectPops({
                  province_id: ot_province.id,
                  pop_types: [options.pop_type]
                }));
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)} Province is occupied`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)} Province is occupied`);
              }
            if (local_value == false)
              if (ot_province.controller == ot_province.owner) {
                pop_scope = [parent.startsWith("any") ? "mergeObjects" : "mergePopScopes"](pop_scopes, selectPops({
                  province_id: ot_province.id,
                  pop_types: [options.pop_type]
                }));
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)} Province is not occupied`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)} Province is not occupied`);
              }
          } if (all_keys[i].includes("_percentage")) { //<pop>_percentage
            var pop_name = all_keys[i].replace("_percentage", "");

            if (config.pops[pop_name]) {
              var local_pop = config.pops[pop_name];

              if (returnSafeNumber(province_obj.pops[pop_name])/province_obj.pops.population < local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}>=${printPercentage(local_value)} ${(local_pop.name) ? local_pop.name : pop_name} in province`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}>=${printPercentage(local_value)} ${(local_pop.name) ? local_pop.name : pop_name} in province`);
              }
            }
          } if (all_keys[i].includes("_percentage_less_than")) { //<pop>_percentage_less_than
            var pop_name = all_keys[i].replace("_percentage_less_than", "");

            if (config.pops[pop_name]) {
              var local_pop = config.pops[pop_name];

              if (returnSafeNumber(province_obj.pops[pop_name])/province_obj.pops.population >= local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}<${printPercentage(local_value)} ${(local_pop.name) ? local_pop.name : pop_name} in province`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}<${printPercentage(local_value)} ${(local_pop.name) ? local_pop.name : pop_name} in province`);
              }
            }
          } if (all_keys[i] == "population") {
            if (ot_province)
              if (ot_province.pops)
                if (ot_province.pops.population < local_value) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province population is >=${parseNumber(local_value)}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province population is >=${parseNumber(local_value)}`);
                }
          } if (all_keys[i] == "population_less_than") {
            if (ot_province)
              if (ot_province.pops)
                if (ot_province.pops.population >= local_value) {
                  empty_scope = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province population is <${parseNumber(local_value)}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province population is <${parseNumber(local_value)}`);
                }
          } if (all_keys[i] == "prestige") {
            if (ot_user)
              if (ot_user.modifiers.prestige < local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Prestige is at least ${parseNumber(local_value)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Prestige is at least ${parseNumber(local_value)}`);
              }
          } if (all_keys[i] == "prestige_less_than") {
            if (ot_user)
              if (ot_user.modifiers.prestige >= local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Prestige is less than ${parseNumber(local_value)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Prestige is less than ${parseNumber(local_value)}`);
              }
          } if (all_keys[i] == "promotion_chance") {
            if (province_obj.trackers) {
              var local_promotion_chance = getPromotionChance(ot_province.id, options.pop_type);

              if (local_promotion_chance < local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop promotion chance is greater than ${printPercentage(local_value)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop promotion chance is greater than ${printPercentage(local_value)}`);
              }
            } else {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop promotion chance is greater than ${printPercentage(local_value)}`);
            }
          } if (all_keys[i] == "promotion_chance_less_than") {
            if (province_obj.trackers) {
              var local_promotion_chance = getPromotionChance(ot_province.id, options.pop_type);

              if (local_promotion_chance >= local_value) {
                empty_scope = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop promotion chance is less than ${printPercentage(local_value)}`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Pop promotion chance is less than ${printPercentage(local_value)}`);
              }
            } else {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Pop promotion chance is less than ${printPercentage(local_value)}`);
            }
          } if (all_keys[i].startsWith("province_has_")) { //province_has_<building>
            var local_building_name = all_keys[i].replace("province_has_", "");
            var pop_scope_empty = false;
            var province_has_building = false;

            var local_building_obj = config.buildings[local_building_name];

            //Check to make sure this is a valid building type
            if (lookup.all_buildings[local_building_name]) {
              if (province_obj.buildings)
                for (var x = 0; x < province_obj.buildings.length; x++)
                  if (province_obj.buildings[x].building_type == local_building_name)
                    province_has_building = true;

              if (local_value == true) {
                if (!province_has_building) {
                  pop_scope_empty = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has ${(local_building_obj.name) ? local_building_obj.name : local_building_name}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has ${(local_building_obj.name) ? local_building_obj.name : local_building_name}`);
                }
              } else if (local_value == false) {
                if (province_has_building) {
                  pop_scope_empty = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no ${(local_building_obj.name) ? local_building_obj.name : local_building_name}`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no ${(local_building_obj.name) ? local_building_obj.name : local_building_name}`);
                }
              }

              if (pop_scope_empty)
                empty_scope = true;
            }
          } if (all_keys[i].startsWith("province_has_")) { //province_has_<building_category>
            var local_building_category_name = all_keys[i].replace("province_has_", "");
            var pop_scope_empty = false;
            var province_has_building = false;

            //Check to make sure this is a valid building category
            if (config.buildings[local_building_category_name]) {
              var local_building_category = config.buildings[local_building_category_name];

              var all_local_building_category_keys = Object.keys(local_building_category);

              if (province_obj.buildings)
                for (var x = 0; x < province_obj.buildings.length; x++)
                  if (all_local_building_category_keys.includes(province_obj.buildings[x]))
                    province_has_building = true;

              if (local_value == true) {
                if (!province_has_building) {
                  pop_scope_empty = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has ${(local_building_category.name) ? local_building_category.name : local_building_category_name} buildings`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has ${(local_building_category.name) ? local_building_category.name : local_building_category_name} buildings`);
                }
              } else if (local_value == false) {
                if (province_has_building) {
                  pop_scope_empty = true;
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province has no ${(local_building_category.name) ? local_building_category.name : local_building_category_name} buildings`);
                } else {
                  localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province has no ${(local_building_category.name) ? local_building_category.name : local_building_category_name} buildings`);
                }
              }

              if (pop_scope_empty)
                empty_scope = true;
            }
          } if (all_keys[i].startsWith("province_is_capital") || all_keys[i] == "is_capital") {
            var is_capital = (province_obj.city_type == "capital");
            var pop_scope_empty = false;

            if (local_value == true) {
              if (!is_capital) {
                pop_scope_empty = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is capital`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is capital`);
              }
            } else if (local_value == false) {
              if (is_capital) {
                pop_scope_empty = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is not a capital`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is not a capital`);
              }
            }

            if (pop_scope_empty)
              empty_scope = true;
          } if (all_keys[i].startsWith("province_is_rural") || all_keys[i] == "is_rural") {
            var is_rural = (province_obj.type != "urban");
            var pop_scope_empty = true;

            if (local_value = true) {
              if (!is_rural) {
                pop_scope_empty = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is rural`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is rural`);
              }
            } else if (local_value == false) {
              if (is_rural) {
                pop_scope_empty = true;
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}Province is not rural`);
              } else {
                localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}Province is not rural`);
              }
            }

            if (pop_scope_empty)
              empty_scope = true;
          } if (all_keys[i] == "soldiers_stationed_in_province") {
            if (lookup.province_troop_strengths[ot_province.id] < local_value) {
              empty_scope = true;
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(false)}>=${parseNumber(local_value)} troops stationed in province`);
            } else {
              localisation_string.push(`${bulletPoint(options.nesting)}${booleanCheck(true)}>=${parseNumber(local_value)} troops stationed in province`);
            }
          } if (all_keys[i] == "wealth") {
            //Fetch wealth scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              wealth: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)}people with more than £${local_wealth} in assets`);
          } if (all_keys[i] == "wealth_less_than") {
            //Fetch wealth_less_than scope
            var local_pop_scope = selectPops({
              province_id: ot_province.id,
              pop_types: [options.pop_type],

              wealth_less_than: local_value
            });

            pop_scope = (parent.startsWith("any")) ?
              mergeObjects(pop_scope, local_pop_scope) :
              mergePopScopes(pop_scope, local_pop_scope); //and, not, default

            localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pop_scope.size, true)}people with less than £${local_wealth} in assets`);
          }
        } else {
          //Individual conditions - iterative scope
          if (parent == "per_100k" || parent.startsWith("per_100k_")) {
            var local_max = Math.min(returnSafeNumber(scope.max), 1);
            var local_min = Math.max(returnSafeNumber(scope.min), 0);

            if (all_keys[i] == "job_openings") {
              var local_pop_types = (local_value.pop_type) ? getList(local_value.pop_type) : options.pop_type;
              var total_positions = getTotalPositions(ot_province.id, local_pop_types);
              p1_job_openings_scalar = total_positions/100000;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p1_job_openings_scalar)}${parseNumber(p1_job_openings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_positions)} job openings`);
            } if (all_keys[i] == "pop_class") {
              var local_class_names = [];
              var local_classes = getList(local_value);
              var total_class_population = 0;

              //Iterate over local_classes and get population
              for (var x = 0; x < local_classes.length; x++) {
                if (lookup.all_pop_classes[local_classes[x]])
                  for (var y = 0; y < lookup.all_pop_classes[local_classes[x]].length; y++) {
                    var local_pop_name = lookup.all_pop_classes[local_classes[x]][y];

                    total_class_population += returnSafeNumber(ot_province.pops[local_pop_name]);
                  }

                local_class_names.push((config.localisation[local_classes[x]]) ? config.localisation[local_classes[x]] : local_classes[x]);
              }
              p1_pop_class_scalar = total_class_population/100000;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p1_pop_class_scalar)}${parseNumber(p1_pop_class_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_class_population)} people in the ${local_class_names.join(", ")} Classes`);
            } if (all_keys[i] == "pop_type") {
              var local_pops = getList(local_value);
              var total_local_population = 0;

              //Iterate over local_pops and get population
              for (var x = 0; x < local_pops.length; x++)
                total_local_population += returnSafeNumber(ot_province.pops[local_pops[x]]);
              p1_pop_type_scalar = total_local_population/100000;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p1_pop_type_scalar)}${parseNumber(p1_pop_type_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_local_population)} inhabitants`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var per_scalar = p1_job_openings_scalar*p1_pop_class_scalar*p1_pop_type_scalar;

              if (scope.base_value) {
                value += returnSafeNumber(scope.base_value);

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base_value, true)}${parseNumber(scope.base_value, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*per_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(per_value, true)}Total score: ${parseNumber(per_value, { display_float: true, display_prefix: true })}`);
              }
            }
          } if (parent == "per_building" || parent.startsWith("per_building_")) {
            if (all_keys[i] == "has_building") {
              var building_count = 0;

              if (province_obj.buildings)
                for (var x = 0; x < ot_province.buildings.length; x++)
                  if (ot_province.buildings[x].building_type == local_value)
                    building_count++;
              pb_buildings_scalar = building_count;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pb_buildings_scalar, true)}${parseNumber(pb_buildings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(building_cost)} local buildings`);
            } if (all_keys[i] == "has_building_category") {
              var local_building_category = config.buildings[local_value];
              var local_category_count = 0;

              if (local_building_category)
                if (ot_province.buildings)
                  for (var x = 0; x < ot_province.buildings.length; x++)
                    if (local_building_category[ot_province.buildings[x].building_type])
                      local_category_count++;
              pb_building_category_scalar = local_category_count;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pb_building_category_scalar, true)}${parseNumber(pb_building_category_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(local_category_count)} from building category`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var per_scalar = pb_buildings_scalar*pb_building_category_scalar;

              if (scope.base) {
                value += returnSafeNumber(scope.base);

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base_value, true)}${parseNumber(scope.base_value, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*per_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(per_value, true)}Total score: ${parseNumber(per_value, { display_float: true, display_prefix: true })}`);
              }
            }
          } else if (parent == "per_education_level" || parent.startsWith("per_education_level_")) {
            //Only process scope once
            if (i == all_keys.length - 1) {
              var local_min = Math.max(scope.min, 0);
              var local_max = Math.min(scope.max, 1);
              var local_step = (scope.step) ? scope.step : 0.01;
              var total_applicable_pops = 0;

              for (var x = 0; x < 100; x++) { //Break iteration after 100 times (max step)
                var current_level = local_min + (local_step*x)/100;

                if (current_level <= local_max) {
                  var local_pop_scope = selectPops({
                    province_id: ot_province.id,
                    pop_scope: pop_scope,
                    pop_types: [options.pop_type],

                    education_level: {
                      min: current_level
                    }
                  });

                  //Add to selectors
                  modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                  total_applicable_pops += local_pop_scope.size;

                  //Break if no longer applicable
                  if (local_pop_scope.size == 0)
                    break;
                  //Error handler
                  if (x == 100)
                    log.debug(`[ERROR] Handler within per_education_level scope - iterative broke.`);
                }
              }

              //Add value since this is the last key
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}Total educated pops applied to scope: ${parseNumber(total_applicable_pops)}, with ${parseNumber(scope.value, { display_float: true, display_prefix: true })} score per ${printPercentage(local_step)} Education Level`);

              if (scope.base) {
                value += returnSafeNumber(scope.base);

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base, true)}${parseNumber(scope.base, { display_float: true, display_prefix: true })} score from base value`);
              }
            }
          } else if (parent == "per_percent" || parent.startsWith("per_percent_")) { //[WIP] - Finish iterative scope
            //Declare local scalars and trackers
            var local_max = Math.min(returnSafeNumber(scope.max), 1);
            var local_min = Math.max(returnSafeNumber(scope.min), 0);
            var pop_names = [];

            //Initial scope processing - KEEP AT TOP!
            if (i == 0) {
              var has_custom_pop_scope = (scope.any_pop || scope.pop_type);

              if (has_custom_pop_scope) {
                if (scope.any_pop)
                  target_pop_scope = mergeArrays(target_pop_scope, getList(scope.any_pop));
                if (scope.pop_type)
                  target_pop_scope = mergeArrays(target_pop_scope, getList(scope.pop_type));
              } else {
                target_pop_scope = [options.pop_type];
              }

              for (var x = 0; x < target_pop_scope.length; x++) {
                var local_pop = config.pops[target_pop_scope[x]];

                if (local_pop)
                  pop_names.push((local_pop.name) ? local_pop.name : target_pop_scope[x]);
              }
            }

            //pp_pop_percent_scalar processing
            {
              for (var x = 0; x < target_pop_scope.length; x++) {
                var local_percentage = returnSafeNumber(province_obj.pops.population[target_pop_scope[x]]/province_obj.pops.population);

                pp_pop_percent_scalar += local_percentage;
              }

              if (pop_names.length > 0)
                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_pop_percent_scalar, true)}${parseNumber(pp_pop_percent_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(pp_pop_percent_scalar)} ${pop_names.join(", ")} pops in province`);
            }

            //General set boolean processing
            if (all_keys[i] == "demotion_chance") {
              var total_demotion_chance = 0;

              for (var x = 0; x < target_pop_scope.length; x++)
                if (province_obj.pops[`${target_pop_scope[x]}-demotion`])
                  total_demotion_chance += returnSafeNumber(province_obj.pops[`${target_pop_scope[x]}-demotion`]);

              pp_demotion_scalar = returnSafeNumber(total_demotion_chance/target_pop_scope.length, 1); //Average it out
              pp_demotion_scalar = pp_demotion_scalar/local_value; //Local value amplification

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_demotion_scalar, true)}${parseNumber(pp_demotion_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(pp_demotion_scalar)} demotion chance`);
            } if (all_keys[i] == "education_level") {
              var total_applicable_pops = 0;

              for (var x = 0; x < 100; x++) { //Break iteration after 100 times (max step)
                var current_level = local_min + x/100;

                if (current_level <= local_max) {
                  var local_pop_scope = selectPops({
                    province_id: ot_province.id,
                    pop_scope: pop_scope,
                    pop_types: target_pop_scope,

                    education_level: {
                      min: current_level
                    }
                  });

                  //Add to selectors
                  modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                  total_applicable_pops += local_pop_scope.size;

                  //Break if no longer applicable
                  if (local_pop_scope.size == 0)
                    break;
                  //Error handler
                  if (x == 100)
                    log.debug(`[ERROR] Handler within per_percent.education_level scope - iterative broke.`);
                }
              }

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}Total educated pops applied to scope: ${parseNumber(total_applicable_pops, true)}Total educated pops applied to scope: ${parseNumber(total_applicable_pops)}, with ${parseNumber(scope.value, { display_float: true, display_prefix: true })} score`);
            } if (all_keys[i] == "employment") {
              var employment_percentage = getProvinceEmployment(ot_province.id, options.pop_type);
              pp_employment_scalar = employment_percentage/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${printNumber(pp_employment_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(employment_percentage)} employment`);
            } if (all_keys[i] == "enslaved") {
              var enslaved_percentage = getProvinceEnslavedPercentage(ot_province.id);
              pp_enslaved_scalar = enslaved_percentage/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${printNumber(pp_enslaved_scalar, { display_float: true, display_prefix: true })} score from ${printPercentage(enslaved_percentage)} enslaved population`);
            } if (all_keys[i].startsWith("has_")) { //has_<needs_category>
              var target_category_name = all_keys[i].replace("has_", "");
              var total_applicable_pops = 0;

              var is_needs_category = (lookup.all_pop_needs_categories[target_category_name]);

              if (is_needs_category) {
                for (var x = 0; x < target_pop_scope.length; x++) {
                  for (var y = 0; y < 100; y++) { //Break iteration after 100 times (max step)
                    var current_level = local_min + (local_value*y);

                    if (current_level <= local_max) {
                      var local_pop_scope = selectPops({
                        province_id: ot_province.id,
                        pop_scope: pop_scope,
                        pop_types: [target_pop_scope[x]],

                        [all_keys[i]]: current_level
                      });

                      //Add to selectors
                      modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                      total_applicable_pops += local_pop_scope.size;

                      //Break if no longer applicable
                      if (local_pop_scope.size == 0)
                        break;
                      //Error handler
                      if (y == 100)
                        log.debug(`[ERROR] Handler within per_percent.has_<needs_category> scope - iterative broke.`);
                    }
                  }
                }

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}${printNumber(scope.value, { display_float: true, display_prefix: true })} score per ${printPercentage(0.01)} ${config.localisation[target_category_name]} fulfilment`);
              }
            } if (all_keys[i].startsWith("has_")) { //has_<needs_category>_variety
              var target_category_name = all_keys[i].replace("has_", "").replace("_variety", "");

              var is_needs_category = (lookup.all_pop_needs_categories[target_category_name]);

              if (is_needs_category) {
                for (var x = 0; x < target_pop_scope.length; x++) {
                  for (var y = 0; y < 100; y++) { //Break iteration after 100 times (max step)
                    var current_level = local_min + (local_value*y);

                    if (current_level <= local_max) {
                      var local_pop_scope = selectPops({
                        province_id: ot_province.id,
                        pop_scope: pop_scope,
                        pop_types: [target_pop_scope[x]],

                        [all_keys[i]]: current_level
                      });

                      //Add to selectors
                      modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);

                      //Break if no longer applicable
                      if (local_pop_scope.size == 0)
                        break;
                      //Error handler
                      if (y == 100)
                        log.debug(`[ERROR] Handler within per_percent.has_<needs_category> scope - iterative broke.`);
                    }
                  }
                }

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}${printNumber(scope.value, { display_float: true, display_prefix: true })} score per ${printPercentage(0.01)} ${config.localisation[target_category]} variety`);
              }
            } if (all_keys[i] == "has_pop_plurality_culture") {
              var total_applicable_pops = 0;

              for (var x = 0; x < target_pop_scope.length; x++) {
                var local_pop_scope = selectPops({
                  province_id: ot_province.id,
                  pop_scope: pop_scope,
                  pop_types: [target_pop_scope[x]],

                  culture: [pop_plurality_culture[0]]
                });

                if (local_pop_scope.size > 0)
                  modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                total_applicable_pops += local_pop_scope.size;
              }

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}${printNumber(scope.value, { display_float: true, display_prefix: true })} score from ${printPercentage(total_applicable_pops/province_obj.pops.population)} plurality culture`);
            } if (all_keys[i] == "has_primary_culture") {
              var primary_cultures = getPrimaryCultures(ot_province.controller);
              var total_applicable_pops = 0;

              for (var x = 0; x < target_pop_scope.length; x++) {
                var local_pop_scope = selectPops({
                  province_id: ot_province.id,
                  pop_scope: pop_scope,
                  pop_types: [target_pop_scope[x]],

                  culture: primary_cultures
                });

                if (local_pop_scope.size > 0)
                  modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                total_applicable_pops += local_pop_scope.size;
              }

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.value, true)}${printNumber(scope.value, { display_float: true, display_prefix: true })} score for ${printPercentage(total_applicable_pops/province_obj.pops.population)} of controller primary culture`);
            } if (all_keys[i] == "living_wage_job_openings") {
              var total_living_wage_openings = 0;

              for (var x = 0; x < target_pop_scope.length; x++) {
                var living_wage_job_openings = getJobOpenings(ot_province.id, target_pop_scope[x], { living_wage: true });

                total_living_wage_openings += returnSafeNumber(living_wage_job_openings);
              }

              pp_living_wage_job_openings_scalar = returnSafeNumber(total_living_wage_openings/local_value);

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_living_wage_job_openings_scalar, true)}${printNumber(pp_living_wage_job_openings_scalar, { display_float: true, display_prefix: true })} score for ${printNumber(total_living_wage_openings)} living wage job openings`);
            } if (all_keys[i] == "median_wage_percentage") {
              if (options.province_id != ot_province.id) {
                var current_median_wage = getTotalMedianWage(options.province_id, target_pop_scope);
                var ot_median_wage = getTotalMedianWage(ot_province.id, target_pop_scope);

                var median_wage_difference = ((returnSafeNumber(current_median_wage)/returnSafeNumber(ot_median_wage)) - 1);
                pp_median_wage_percentage_scalar = median_wage_difference/local_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_median_wage_percentage_scalar, true)}${printNumber(pp_median_wage_percentage_scalar, { display_float: true, display_prefix: true })} score for ${printPercentage(median_wage_difference)} median wage difference`);
              }
            } if (all_keys[i] == "promotion_chance") {
              var total_promotion_chance = 0;

              for (var x = 0; x < target_pop_scope.length; x++)
                if (province_obj.pops[`${target_pop_scope[x]}-promotion`])
                  total_promotion_chance += returnSafeNumber(province_obj.pops[`${target_pop_scope[x]}-promotion`]);

              pp_promotion_scalar = returnSafeNumber(total_promotion_chance/target_pop_scope.length, 1); //Average it out
              pp_promotion_scalar = pp_promotion_scalar/local_value; //Local value amplification

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(pp_promotion_scalar, true)}${printNumber(pp_promotion_scalar, { display_float: true, display_prefix: true })} score for ${printPercentage(total_promotion_chance)} total promotion chance over all pops, non-weighted`);
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var percentage_scalar = (pp_demotion_scalar*pp_living_wage_job_openings_scalar*pp_promotion_scalar*pp_pop_percent_scalar);

              //Apply min, max to percentage_scalar
              percentage_scalar = Math.min(percentage_scalar, local_max);
              percentage_scalar = Math.max(percentage_scalar, local_min);

              if (scope.base) {
                var base_scalar = Math.min(per_scalar, 1);
                value += returnSafeNumber(scope.base)*base_scalar;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(scope.base, true)}${parseNumber(scope.base, { display_float: true, display_prefix: true })} score from base value`);
              }
              if (scope.value) {
                var per_value = returnSafeNumber(scope.value)*percentage_scalar;
                value += per_value;

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(per_value, true)}Total score: ${parseNumber(per_value, { display_float: true, display_prefix: true })}`);
              }
            }
          } else {
            if (all_keys[i] == "available_housing") {
              var province_housing = returnSafeNumber(ot_province.housing) - ot_province.pops.population;

              p_available_housing_scalar = province_housing/local_value;
              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_available_housing_scalar, true)}${parseNumber(p_available_housing_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(province_housing)} available housing`);
            } if (config.buildings[all_keys[i]]) { //<building_category>
              //Iterate over ot_province.buildings and check
              var local_building_category = config.buildings[all_keys[i]];
              var total_category_buildings = 0;

              if (ot_province.buildings)
                for (var x = 0; x < ot_province.buildings.length; x++)
                  if (local_building_category[ot_province.buildings[x].building_type])
                    total_category_buildings++;

              p_building_categories_scalar += total_category_buildings/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_building_categories_scalar, true)}${parseNumber(p_building_categories_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(total_category_buildings)} ${(local_building_category.name) ? local_building_category.name : all_keys[i]} buildings in scope`);
            } if (all_keys[i] == "living_wage_job_openings") {
              var living_wage_job_openings = getJobOpenings(ot_province.id, options.pop_type, { living_wage: true });
              p_living_wage_job_openings_scalar = (living_wage_job_openings/local_value);

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_living_wage_job_openings_scalar, true)}${parseNumber(p_living_wage_job_openings_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(living_wage_job_openings)} living wage job openings`);
            } if (all_keys[i] == "population") {
              p_population_scalar = ot_province.pops.population/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_population_scalar, true)}${parseNumber(p_population_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(ot_province.pops.population)} inhabitants`);
            } if (all_keys[i] == "prestige") {
              p_prestige_scalar = ot_user.modifiers.prestige/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_prestige_scalar, true)}${parseNumber(p_prestige_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(ot_user.modifiers.prestige)} prestige`);
            } if (all_keys[i] == "soldiers_stationed_in_province") {
              var soldiers_in_province = lookup.province_troop_strengths[ot_province.id];
              p_soldiers_in_province_scalar = soldiers_in_province/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_soldiers_in_province_scalar, true)}${parseNumber(p_soldiers_in_province_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(soldiers_in_province)} soldiers stationed in province`);
            } if (all_keys[i] == "supply_limit") {
              p_supply_limit_scalar = returnSafeNumber(ot_province.supply_limit, config.defines.combat.base_supply_limit)/local_value;

              localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(p_supply_limit_scalar, true)}${parseNumber(p_supply_limit_scalar, { display_float: true, display_prefix: true })} score from ${parseNumber(ot_province.supply_limit)} supply limit`);
            } if (all_keys[i] == "wealth") {
              if (scope.value) {
                var total_applicable_pops = 0;

                for (var x = 0; x < 1000; x++) { //Break iteration after 1000 times
                  var local_pop_scope = selectPops({
                    province_id: ot_province.id,
                    pop_scope: pop_scope,
                    pop_types: [options.pop_type],

                    wealth: local_value*(x + 1)
                  });

                  //Add to selectors
                  modifyValue(selectors, JSON.stringify(local_pop_scope), scope.value);
                  total_applicable_pops += local_pop_scope.size;

                  //Break if no longer applicable
                  if (local_pop_scope.size == 0)
                    break;
                  //Error handler
                  if (x == 1000)
                    log.debug(`[ERROR] wealth selector within general per scope - iterative broke.`);
                }

                localisation_string.push(`${bulletPoint(options.nesting)}${numberCheck(total_applicable_pops, true)}Applied to ${parseNumber(total_applicable_pops)} pops. ${parseNumber(options.value, { display_float: true, display_prefix: true })} score per £${parseNumber(local_value)} wealth`);
              }
            }

            //Add value once last key in object is processed
            if (i == all_keys.length - 1) {
              var per_scalar = p_available_housing_scalar*p_building_categories_scalar*p_living_wage_job_openings_scalar*p_soldiers_in_province_scalar*p_population_scalar*p_prestige_scalar*p_supply_limit_scalar;

              if (scope.base) {
                var base_scalar = Math.min(per_scalar, 1);
                value += returnSafeNumber(scope.base)*base_scalar;
              }
              if (scope.value)
                value += returnSafeNumber(scope.value)*per_scalar;
            }
          }
        }

        //Empty scope handler
        if (empty_scope) {
          pop_scope = selectPops({
            province_id: ot_province.id,
            pop_types: [options.pop_type],

            empty: true
          });
          break;
        }
      }
    }

    //Deserialise selectors if no parents
    if (options.parents.length == 0) {
      var all_selector_keys = Object.keys(selectors);
      var new_selectors = [];

      for (var i = 0; i < all_selector_keys.length; i++)
        new_selectors.push([JSON.parse(all_selector_keys[i]), selectors[all_selector_keys[i]]]);

      selectors = new_selectors;

      //Push top-layer to selectors as well
      selectors.unshift([pop_scope, value]);
    }

    //Set value to 0 if conditions not met
    if (pop_scope.size == 0) value = 0;

    //Get rid of selectors that don't target valid scopes
    for (var i = selectors.length - 1; i >= 0; i--)
      if (selectors[i][0].size <= 0 || selectors[i][1] == 0 || isNaN(selectors[i][1]))
        selectors.splice(i, 1);

    var empty_scope = (selectors.length == 0);

    //Return statement
    return {
      localisation_string: localisation_string,

      boolean: empty_scope,
      selectors: selectors,
      value: value,

      pop_scope: pop_scope
    }
  },

  parseStabilityModifier: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var all_temporary_modifiers = Object.keys(usr.temporary_modifiers);

    //Declare stability_string
    var stability_string = [];

    //Same variable calculation from turn_framework.js
    var government_stability_modifier = module.exports.getGovernmentStabilityModifier(user_id);
    var popularity_stability_modifier = usr.politics[usr.government].popularity*0.75;
    var temporary_stability_modifier = 0;

    //Print out all individual modifiers first
    if (government_stability_modifier != 0)
      stability_string.push(`• **${printPercentage(government_stability_modifier, { display_prefix: true })}** due to ${config.governments[usr.government].name} being in power.`);
    if (usr.tax_rate > 0)
      stability_string.push(`• **${printPercentage(usr.tax_rate*-1, { display_prefix: true })}** from current tax rate.`);
    if (returnSafeNumber(usr.boosted_stability) > 0)
      stability_string.push(`• **${printPercentage(usr.boosted_stability, { display_prefix: true })}** from boosted stability. (**-1%** per turn).`);
    if (usr.modifiers.overextension != 0)
      stability_string.push(`• **${printPercentage(usr.modifiers.overextension, { display_prefix: true })}** from overextension.`);

    //Print base stability
    stability_string.push(`• **${printPercentage(usr.modifiers.stability_modifier, { display_prefix: true })}** base stability modifier.`);

    //Print temporary modifiers
    for (var i = 0; i < all_temporary_modifiers.length; i++) {
      var local_modifier = usr.temporary_modifiers[all_temporary_modifiers[i]];

      if (local_modifier.type == "stability_modifier")
        temporary_stability_modifier += local_modifier.value;
    }

    if (temporary_stability_modifier != 0)
      stability_string.push(`• **${printPercentage(temporary_stability_modifier, { display_prefix: true })}** from temporary modifiers.`);

    //Return statement
    return stability_string.join("\n");
  }
};
