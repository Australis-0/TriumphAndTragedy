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
      parents: [], - An array of parent elements used for placing relevant flags. Defaults to []
      pop_flags: {}, - The pop selector scope to target. Only applies to pop scope
      pop_types: ["soldiers"], - Optional. The pop types to target as defined in config.pops
      province_id: "6709", - The province ID to target. Only applies to province scope
      scope: "country", "province", "pop", - The scope which to target for the limit. Defaults to "country",
      user_id: "801410420942" - The user ID to target. Only applies to country scope
    }

    Returns: {
      boolean: true/false, - Whether the limit checks were met
      value: 0.045 - Fuzzy logic percentage values for the given modifier
    }
  */
  parseLimit: function (arg0_scope, arg1_options) { //[WIP] - Finish function body
    //Convert from parameters
    var scope = arg0_scope;
    var options = (arg1_options) ? arg1_options : {};

    //Initialise options [WIP]
    if (!options.parents) options.parents = [];
    if (!options.pop_flags) options.pop_flags = {};
    if (!options.scope) options.scope = "country";

    var province_obj = (options.scope == "province" && options.province_id) ?
      main.provinces[options.province_id] : undefined;

    //Declare local instance variables
    var all_keys = Object.keys(scope);
    var meets_conditions = true;
    var pops_in_criteria = [];
    var value = 0;

    //Push to pops_in_criteria
    if (options.pop_types) {
      var local_pop_types_one = getList(options.pop_types);

      for (var i = 0; i < local_pop_types_one.length; i++)
        pops_in_criteria.push(local_pop_types_one[i]);
      if (options.pop_flags.pop_types) {
        var local_pop_types_two = getList(options.pop_flags.pop_types);

        for (var i = 0; i < local_pop_types_two.length; i++)
          if (!pops_in_criteria.includes(local_pop_types_two[i]))
            pops_in_criteria.push(local_pop_types_two[i]);
      }
    }

    //Iterate over all_keys
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = scope[all_keys[i]];

      //Recursive scopes within limit

      //Conditions
      if (all_keys[i] == "base_chance") {
        value += local_value;
      } else if (all_keys[i] == "fully_employed") {
        if (province_obj.pops)
          for (var i = 0; i < pops_in_criteria.length; i++)
            if (province_obj.pops[`used_${pops_in_criteria[i]}`] <= province_obj.pops[pops_in_criteria[i]])
              meets_conditions = false;
      } else if (all_keys[i] == "has_no_building_category") {
        //Check if province scope (if applicable) has building categories
        if (province_obj) {
          var all_building_categories = Object.keys(config.buildings);

          if (province_obj.buildings)
            for (var x = 0; x < province_obj.buildings.length; x++) {
              var local_building_category_key = lookup.building_category[province_obj.buildings[x].id];

              if (local_value.includes(local_building_category_key)) {
                meets_conditions = false;
                break;
              }
            }
        }
      }
    }

    //Return statement
    return [meets_conditions, value];
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
    var all_modifier_keys = Object.keys(modifier_obj);
    var f = "**"; //Formatter
    var h_prefix = (!exclude_bullets) ? bulletPoint(Math.max(options.nesting - 1, 0)) : "";
    var modifier_string = [];
    var prefix = (!exclude_bullets) ? bulletPoint(options.nesting) : "";

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

    //Return statement
    return modifier_string.join("\n");
  },

  /*
    parsePopLimit() - Returns pop tags and objects for a given province depending on the selector. Recursive.
    options: {
      parent_obj: {}, - The object of the initial parent. Optional.
      parents: [], - An array of parent elements used for placing relevant flags. Defaults to [],
       - and_hard
       - any_hard
       - not_hard

       Other scopes:
       - add_chance

      province_id: "4407", - The province ID to target.
      pop_type: "soldiers", - Optional. The pop type to target as defined in config.pops
      value: 0 - Used to pass a base value to the function
    }

    Returns: {
      value: 0.045, - Fuzzy logic percentage values for the given modifier. 0 equals false
      pop_obj: {} - The pop return object for which the boolean was fulfilled and value chance higher than 0
    }
  */
  parsePopLimit: function (arg0_scope, arg1_options) { //[WIP] - Finish function body
    //Convert from parameters
    var scope = arg0_scope;
    var options = (arg1_options) ? arg1_options : {};

    //Initialise options [WIP]
    if (!options.parents) options.parents = [];
    if (!options.pop_flags) options.pop_flags = {};

    //Declare local instance variables
    var all_keys = Object.keys(scope);
    var conditions_met = true;
    var hard_scalar = 1;
    var local_pop_obj = {};
    var parent = options.parents[options.parents.length - 1];
    var pop_scope = (scope) ? scope : selectPops({
      province_id: options.province_id,
      pop_types: [options.pop_type]
    });
    var province_obj = (options.scope == "province" && options.province_id) ?
      main.provinces[options.province_id] : undefined;
    var value = (options.value) ? options.value : 0;

    //Iterate over all_keys
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = scope[all_keys[i]];

      //Scope conditions
      if (parent == "add_chance") { //add_chance scope handler
        if (scope.limit) {
          var all_limit_keys = Object.keys(scope.limit);

          for (var x = 0; x < all_limit_keys.length; x++) {
            var local_subobj = scope.limit[all_limit_keys[x]];

            if (all_limit_keys[x] == "homeless") {
              var homeless_pops = selectPops({
                province_id: options.province_id,
                pop_types: options.pop_type,

                homeless: true
              });

              var local_percentage = homeless_pops.size/province_obj.pops[options.pop_type];
              value += returnSafeNumber(scope.value*local_percentage);
            }
          }
        }
      } else { //Hard limit handler. This defines the pop subscope that meets these conditions for which value is processed
        //Group scopes, any/or, not. AND is the default joiner
        //Reset parents when passing to group subscopes since this is a hard limit
        {
          if (all_keys[i] == "and" || all_keys[i].startsWith("and_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.parent_obj = scope;
            new_options.parents.push("and_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            //Intersect with pop_scope
            pop_scope = mergePopScopes(pop_scope, local_pop_limit.pop_scope);
          }
          if (all_keys[i] == "any" || all_keys[i].startsWith("any_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.parent_obj = scope;
            new_options.parents.push("and_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            //Intersect with pop_scope
            pop_scope = mergePopScopes(pop_scope, local_pop_limit.pop_scope);
          }
          if (all_keys[i] == "not" || all_keys[i].startsWith("not_")) {
            var new_options = JSON.parse(JSON.stringify(options));

            new_options.parent_obj = scope;
            new_options.parents.push("not_hard");

            var local_pop_limit = parsePopLimit(local_value, new_options);

            //Subtract from pop_scope
            pop_scope = subtractObjects(pop_scope, local_pop_limit.pop_scope);
          }
        }

        //Individual hard conditions
        {
          if (parent.startsWith("_hard")) {
            if (all_keys[i] == "wealth") {
              //Fetch wealth scope
              var local_pop_scope = selectPops({
                province_id: options.province_id,
                pop_types: [options.pop_type],

                wealth: local_value
              });

              if (parent.startsWith("any"))
                pop_scope = mergeObjects(pop_scope, local_pop_scope);
              if (parent.startsWith("and") || parent.startsWith("not"))
                pop_scope = mergePopScopes(pop_scope, local_pop_scope);
            }
          }
        }
      }
    }

    //Set value to 0 if conditions not met
    if (!conditions_met) value = 0;

    //Return statement
    return {
      boolean: conditions_met,
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
