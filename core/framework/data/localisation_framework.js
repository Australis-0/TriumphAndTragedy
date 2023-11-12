module.exports = {
  booleanCheck: function (arg0_boolean) {
    //Convert from parameters
    var boolean = arg0_boolean;

    //Return statement
    return (boolean) ? `${config.icons.checkmark} ` : `${config.icons.cancel} `;
  },

  getBuildingLocalisation: function (arg0_building_id, arg1_nesting) {
    //Convert from parameters
    var building_id = arg0_building_id;
    var nesting = returnSafeNumber(arg1_nesting);

    //Declare local instance variables
    var building_string = [];
    var local_building = (typeof building_id != "object") ? getBuildingByID(building_id) : building_id;

    if (local_building) {
      var province_id = local_building.id.split("-")[0];
      var province_obj = main.provinces[province_id];

      if (province_obj) {
        var actual_id = main.global.user_map[user_id];
        var building_obj = lookup.all_buildings[local_building.building_type];
        var usr = main.users[actual_id];

        //Push building name and display ID; current national owner
        var employment_string = "";
        var f = "__";
        var money_stockpile_string = "";
        var production_choice_string = "";

        //Set formatter
        if (building_obj.insolvent) f = `~~`;

        if (building_obj.manpower_cost)
          employment_string = `- ${getBuildingEmploymentStringLocalisation(local_building, building_obj.manpower_cost)}`;
        if (local_building.stockpile)
          if (local_building.stockpile.money)
            money_stockpile_string = ` | ${config.icons.money} ${parseNumber(local_building.stockpile.money)}`;
        if (building_obj.produces)
          production_choice_string = ` - ${module.exports.parseProductionChoice(local_building.building_type, local_building.production_choice)}`;

        //Print string
        building_string.push(`${bulletPoint(nesting)}${f}${(local_building.name) ? local_building.name : building_obj.name}${f}${money_stockpile_string}${employment_string}${production_choice_string}${(local_building.subsidised) ? config.icons.money : ""}`);
        building_string.push(`${bulletPoint(nesting + 1)}**[View ${(local_building.name) ? local_building.name : local_building.id}]**`);
      }
    }

    //Return statement
    return building_string;
  },

  getBuildingEmploymentLocalisation: function (arg0_building_obj, arg1_manpower_obj, arg2_options) {
    //Convert from parameters
    var local_building = arg0_building_obj;
    var manpower_obj = arg1_manpower_obj;
    var options = (arg2_options) ? arg2_options : {};

    if (!options.nesting) options.nesting = 0;

    //Declare local instance variables
    var all_manpower_keys = Object.keys(manpower_obj);
    var employment_string = [];

    //Iterate over all_manpower_keys
    for (var i = 0; i < all_manpower_keys.length; i++) {
      var local_subobj = manpower_obj[all_manpower_keys[i]];

      if (all_manpower_keys[i] == "any_pop" || all_manpower_keys[i].startsWith("any_pop_")) {
        var all_subobj_keys = Object.keys(local_subobj);
        var employment_substring = [];

        employment_string.push(`${bulletPoint(options.nesting)} Any Pop:`);
        
        for (var x = 0; x < all_subobj_keys.length; x++) {
          var local_manpower_obj = local_subobj[all_subobj_keys[x]];

          if (config.pops[all_subobj_keys[x]]) {
            var local_pop = config.pops[all_subobj_keys[x]];
            var local_wage = local_building[`${all_subobj_keys[x]}_wage`];
            var wage_string = "";

            if (local_wage)
              wage_string = ` | (${config.icons.money} ${parseNumber(local_wage, { display_float: true })} per turn)`;

            employment_string.push(`${bulletPoint(options.nesting + 1)}${parsePop(all_subobj_keys[x])}: ${returnSafeNumber(local_building.employment[all_subobj_keys[x]])}/${returnSafeNumber(local_manpower_obj)}${wage_string}`);
          } else {
            if (all_subobj_keys[x] == "any_pop" || all_subobj_keys[x].startsWith("any_pop_")) {
              var local_subobj_value = local_subobj[all_subobj_keys[x]];

              //Iterate over nesting and pass local_subobj_value into manpower_obj
              var new_options = JSON.parse(JSON.stringify(options));
              new_options.nesting++;

              var local_nested_employment_string = module.exports.getBuildingEmploymentLocalisation(local_building, local_subobj_value, new_options);

              //Push local_nested_employment_string to employment_string
              for (var y = 0; y < local_nested_employment_string.length; y++)
                employment_string.push(local_nested_employment_string[y]);
            }
          }
        }
      } else {
        if (config.pops[all_manpower_keys[i]]) {
          var local_pop = config.pops[all_manpower_keys[i]];
          var local_wage = local_building[`${all_manpower_keys[i]}_wage`];
          var wage_string = "";

          if (local_wage)
            wage_string = ` | (${config.icons.money} ${parseNumber(local_wage, { display_float: true })} per turn)`;

          employment_string.push(`${bulletPoint(options.nesting)}${parsePop(all_manpower_keys[i])}: ${returnSafeNumber(local_building.employment[all_manpower_keys[i]])}/${returnSafeNumber(local_subobj)}${wage_string}`);
        }
      }
    }

    //Return statement
    return employment_string;
  },

  /*
    getBuildingEmploymentLocalisation() - Formats employment criteria as a single nested string
    options: {
      parent: "any_pop",
      any_pop_fulfilment: 0, - How many pops have currently fulfiled the current scope
      any_pop_total: 70 - How many pops are required to fulfil the current any_pop scope
    }
  */
  getBuildingEmploymentStringLocalisation: function (arg0_building_obj, arg1_manpower_obj, arg2_options) {
    //Convert from parameters
    var local_building = arg0_building_obj;
    var manpower_obj = arg1_manpower_obj;
    var options = (arg2_options) ? arg2_options : {};

    if (!options.employment) options.employment = JSON.parse(JSON.stringify(local_building.employment));

    //Declare local instance variables
    var all_manpower_keys = Object.keys(manpower_obj);
    var any_pop_scope = (options.parent == "any_pop");
    var any_pop_string = [];
    var employment_string = [];

    //Determine options.amny_pop_total if applicable
    if (any_pop_scope) {
      var total_pop_count = 0;
      var total_pop_numbers = 0;

      for (var i = 0; i < all_manpower_keys.length; i++) {
        var local_subobj = manpower_obj[all_manpower_keys[i]];

        if (typeof local_subobj == "number") {
          total_pop_count += local_subobj;
          total_pop_numbers++;
        }
      }

      modifyValue(options, "any_pop_total", Math.ceil(total_pop_count/total_pop_numbers));
    }

    //Iterate over all_manpower_keys
    for (var i = 0; i < all_manpower_keys.length; i++) {
      var change_remaining;
      var local_pop = config.pops[all_manpower_keys[i]];
      var local_subobj = manpower_obj[all_manpower_keys[i]];
      var local_value = returnSafeNumber(options.employment[all_manpower_keys[i]]);

      if (local_pop) {
        //Add local_value to options.any_pop_fulfilment if any_pop_scope
        if (any_pop_scope) {
          change_remaining = options.any_pop_total - returnSafeNumber(options.any_pop_fulfilment);

          any_pop_string.push(`${(local_pop.icon) ? local_pop.icon : ""}`);

          if (change_remaining > 0)
            if (options.employment[all_manpower_keys[i]]) {
              var local_employment = returnSafeNumber(options.employment[all_manpower_keys[i]]);
              var local_employment_change = Math.min(local_employment, change_remaining);

              modifyValue(options, "any_pop_fulfilment", local_employment_change);
              options.employment[all_manpower_keys[i]] -= local_employment_change;
            }
        } else {
          change_remaining = Math.max(local_subobj - local_value, 0);

          //Regular x/y employment string
          employment_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${parseNumber(local_value)}/${parseNumber(local_subobj)}`);

          if (change_remaining > 0)
            if (options.employment[all_manpower_keys[i]])
              options.employment[all_manpower_keys[i]] -= change_remaining;
        }
      } else {
        //Recursively call function
        if (all_manpower_keys[i] == "any_pop" || all_manpower_keys[i].startsWith("any_pop_")) {
          var new_options = JSON.parse(JSON.stringify(options));
          new_options.nested = true;
          new_options.parent = "any_pop";

          var subobj_employment = module.exports.getBuildingEmploymentStringLocalisation(local_building, local_subobj, new_options);

          employment_string.push(`(${subobj_employment.string})`);
          options.employment = subobj_employment.employment;
        }
      }
    }

    //Push any_pop_string to end of employment_string
    if (any_pop_scope)
      employment_string.push(`(Any of: ${any_pop_string.join("/")}: ${parseNumber(options.any_pop_fulfilment)}/${parseNumber(options.any_pop_total)})`);

    //Return something different if not nested
    return (!options.nested) ? `${employment_string.join(", ")}` : {
      string: `${employment_string.join(", ")}`,
      employment: options.employment
    };
  },

  getPeaceDemandsLocalisation: function (arg0_cb_name) {
    //Convert from parameters
    var cb_name = (typeof arg0_cb_name != "object") ? arg0_cb_name.trim().toLowerCase() : arg0_cb_name;

    //Declare local instance variables
    var attacker_peace_demands_string = [];
    var cb_obj = (typeof cb_name != "object") ? getCB(cb_name) : cb_name;
    var defender_peace_demands_string = [];
    var peace_demands = getPeaceDemands(cb_obj);

    //Parse peace_demands
    if (peace_demands) {
      var all_attacker_peace_demands = Object.keys(peace_demands.attackers);
      var all_defender_peace_demands = Object.keys(peace_demands.defenders);

      for (var i = 0; i < all_attacker_peace_demands.length; i++) {
        var local_value = peace_demands.attackers[all_attacker_peace_demands[i]];
        var local_wargoal = getWargoal(all_attacker_peace_demands[i]);

        attacker_peace_demands_string.push(`[${(local_wargoal.name) ? local_wargoal.name : all_attacker_peace_demands[i]}] (__${parseNumber(local_value)}__)`);
      }
      for (var i = 0; i < all_defender_peace_demands.length; i++) {
        var local_value = peace_demands.defenders[all_defender_peace_demands[i]];
        var local_wargoal = getWargoal(all_defender_peace_demands[i]);

        defender_peace_demands_string.push(`[${(local_wargoal.name) ? local_wargoal.name : all_defender_peace_demands[i]}] (__${parseNumber(local_value)}__)`);
      }

      //Set to _None_ for both fields if no valid peace demands could be found
      if (attacker_peace_demands_string.length == 0)
        attacker_peace_demands_string.push(`_None_`);
      if (defender_peace_demands_string.length == 0)
        defender_peace_demands_string.push(`_None_`);
    }

    //Return statement
    return {
      attacker_peace_demands_string: attacker_peace_demands_string,
      defender_peace_demands_string: defender_peace_demands_string
    };
  },

  getPoliticalCapitalLocalisation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var accepted_cultures = getAcceptedCultures(user_id, { exclude_primary_culture: true });
    var actual_id = main.global.user_map[user_id];
    var all_mapped_users = Object.keys(main.global.user_map);
    var pc_string = [];
    var usr = main.users[actual_id];

    var all_vassals = excludeClientStates(Object.keys(usr.diplomacy.vassals));
    var total_volunteers = getTotalVolunteers(user_id);
    var volunteer_wars = getVolunteerWars(user_id);

    //Format pc_string
    if (all_vassals.length > 0) {
      pc_string.push(`- Our **${parseNumber(all_vassals.length)}** vassal(s) are costing us **${parseNumber(getVassalMaintenance(user_id))}** Political Capital per turn.`);

      for (var i = 0; i < all_vassals.length; i++) {
        var local_vassal = main.users[all_vassals[i]];
        var local_vassal_display_players = [];

        //Iterate over all_mapped_users, push users to local_vassal_display_players
        for (var i = 0; i < all_mapped_users.length; i++)
          if (main.global.user_map[all_mapped_users[i]] == all_vassals[i])
            if (client.users.cache.find(user => user.id == all_mapped_users[i]))
              local_vassal_display_players.push(`<@${all_mapped_users[i]}>`);

        try {
          pc_string.push(`• **${local_vassal.name}** - ${(local_vassal_display_players.length > 0) ? parseList(local_vassal_display_players) : `_No Player_`}`);
        } catch {}
      }
    }

    if (volunteer_wars.length > 0) {
      //Format war_display_list
      var war_display_list = [];

      for (var i = 0; i < volunteer_wars.length; i++) {
        var local_war = main.global.wars[volunteer_wars[i]];

        war_display_list.push(`• **${local_war.name}** on the **${local_war[`${actual_id}_sent_volunteers`]}**' side.`);
      }

      //Push to pc_string
      pc_string.push(`- We have **${parseNumber(total_volunteers)}** volunteers serving in **${parseNumber(volunteer_wars.length)}** war(s), including the following:`);
      pc_string.push("");

      for (var i = 0; i < war_display_list.length; i++)
        pc_string.push(war_display_list[i]);

      pc_string.push(`- Our interventions currently cost us **${parseNumber(getVolunteerMaintenance(user_id))}** Political Capital per turn.`);
    }

    if (accepted_cultures.length > 0)
      pc_string.push(`- Our **${parseNumber(accepted_cultures.length)}** accepted culture(s) are costing us **${parseNumber(accepted_cultures.length*config.defines.politics.accepted_culture_maintenance_cost)}** Political Capital per turn.`);

    //Return statement
    return pc_string;
  },

  /*
    getProductionChainLocalisation() - Returns a formatted nested array string representing the full production chain of a good. Recursive function
    options: {
      display_icons: true/false - Whether to display good/building icons. False by default.
      nesting: 0, - The current nesting to display
      original_good: "", - The original good that the function was invoked for
      production_chain_obj: {}, - Optimisation parameter. Passes current production_chain_obj
      parents: [], - The current parent categories of the current good
      used_goods: [] - The goods already used
    }
  */
  getProductionChainLocalisation: function (arg0_user, arg1_good, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var good_type = arg1_good;
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (!options.nesting) options.nesting = 0;
    if (!options.original_good) options.original_good = good_type;
    if (!options.parents) options.parents = 0;
    if (!options.used_goods) options.used_goods = [];

    //Declare local instance variables
    var production_chain_obj;
    var production_chain_string = [];

    if (!options.production_chain_obj) {
      production_chain_obj = getProductionChain(user_id, good_type);
      options.production_chain_obj = production_chain_obj;
    } else {
      production_chain_obj = options.production_chain_obj;
    }

    if (production_chain_obj) {
      var all_goods = Object.keys(production_chain_obj);
      var old_nesting = JSON.parse(JSON.stringify(options.nesting));

      for (var i = 0; i < all_goods.length; i++) {
        var good_obj = lookup.all_goods[all_goods[i]];
        var local_good = production_chain_obj[all_goods[i]];
        var n = (all_goods[i] != options.original_good) ? 1 : 0;

        //Display header
        if (all_goods[i] == options.original_good) {
          production_chain_string.push(`Buildings __underlined__. Base production choices marked as Base (Prod. Choice).`);
          production_chain_string.push("");
        }

        options.nesting = old_nesting;

        //Display good_type first
        if (!options.used_goods.includes(all_goods[i])) {
          options.used_goods.push(good_type);

          if (good_obj.type != "category") {
            var all_buildings = Object.keys(local_good);

            if (all_buildings.length > 0 || good_obj.type == "category") {
              var f = (good_obj.type == "category") ? `**` : "";

              if (good_obj.type == "category")
                production_chain_string.push("");
              production_chain_string.push(`${bulletPoint(options.nesting + n)}${f}${parseGood(all_goods[i], "**", !options.display_icons)}${f}`);
            }

            for (var x = 0; x < all_buildings.length; x++) {
              var building_obj = lookup.all_buildings[all_buildings[x]];
              var local_building = local_good[all_buildings[x]];

              production_chain_string.push(`${bulletPoint(options.nesting + 1 + n)}${(building_obj.icon) ? config.icons[building_obj.icon] + " " : ""}__${(building_obj.name) ? building_obj.name : all_buildings[x]}__`);

              //Push production choices
              var all_production_choices = Object.keys(local_building);

              for (var y = 0; y < all_production_choices.length; y++) {
                var local_production_choice = local_building[all_production_choices[y]];
                var maintenance = [];
                var production = [];
                var production_choice_name = parseString(all_production_choices[y]);

                var local_goods = Object.keys(local_production_choice);

                //Push goods to maintenance/production array
                for (var z = 0; z < local_goods.length; z++) {
                  var local_value = local_production_choice[local_goods[z]];

                  if (local_value < 0) {
                    maintenance.push(`${parseGood(local_goods[z], "", !options.display_icons, `${parseNumber(local_value*-1)} `)}`);
                  } else if (local_value > 0) {
                    production.push(`${parseGood(local_goods[z], "", !options.display_icons, `${parseNumber(local_value)} `)}`);
                  }
                }

                //Push maintenance/production to production_chain_string
                var production_choice_string = (maintenance.length > 0 && production.length > 0) ?
                  `${maintenance.join(", ")} ➛ ${production.join(", ")}` :
                  `${production.join(", ")}`;

                production_chain_string.push(`${bulletPoint(options.nesting + 2 + n)}${production_choice_name} (Prod. Choice) - ${production_choice_string}`);
              }
            }

            delete options.production_chain_obj[good_type];
          } else {
            //Push nested recursive strings to production_chain_string
            options.nesting++;

            var subgood_production_chain_string = module.exports.getProductionChainLocalisation(user_id, all_goods[i], options);

            for (var x = 0; x < subgood_production_chain_string.length; x++)
              production_chain_string.push(` ${subgood_production_chain_string[x]}`);
          }
        }
      }
    }

    //Return statement
    return production_chain_string;
  },

  /*
    getProductionLocalisation() - Returns an array string of total building production
    options: {
      exclude_bullets: true/false, - Whether to exclude bullets or not
      display_icons: true/false, - Whether good icons should be displayed or not
      formatter: "**", - The markdown formatter to use for good numbers
      no_formatting: true/false - Whether formatting should be disabled or not
    }
  */
  getProductionLocalisation: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var formatter = "";
    var production_obj = getProductionObject(user_id);
    var resource_production_string = [];
    var usr = main.users[actual_id];

    var all_production_keys = Object.keys(production_obj);

    formatter = (options.formatter) ? options.formatter : "**";
    if (options.no_formatting)
      formatter = "";

    //Iterate over all_produced_goods to push to resource_production_string
    for (var i = 0; i < all_production_keys.length; i++) {
      var local_good = lookup.all_goods[all_production_keys[i]];
      var local_value = production_obj[all_production_keys[i]];

      if (!all_production_keys[i].includes("_upkeep"))
        if (all_production_keys[i] != "money") {
          resource_production_string.push(`${(!options.exclude_bullets) ? "- " : ""}**${(local_value[0] == local_value[1]) ? parseNumber(local_value[0]) : parseNumber(local_value[0]) + " - " + parseNumber(local_value[1])}** ${(options.display_icons) ? module.exports.parseGood(local_good) : all_production_keys[i]}.`);
        } else {
          resource_production_string.push(`${(!options.exclude_bullets) ? "- " : ""}**${(local_value[0] == local_value[1]) ? parseNumber(local_value[0]) : parseNumber(local_value[0]) + " - " + parseNumber(local_value[1])}** Money`);
        }
    }

    //Return statement
    return resource_production_string;
  },

  getProvinceColonisationLocalisation: function (arg0_province) {
    //Convert from parameters
    var province_id = arg0_province.trim().toLowerCase();

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var localisation_string = [];
    var province_obj = getProvince(province_id);

    if (province_obj)
      if (province_obj.controller) {
        localisation_string.push(`Already controlled by **${main.users[province_obj.controller].name}**.`);
      } else {
        var has_colonisation = false;

        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          var local_expeditions = Object.keys(local_user.expeditions);

          for (var x = 0; x < local_expeditions.length; x++) {
            var local_expedition = local_user.expeditions[local_expeditions[x]];

            if (local_expedition.provinces.includes(province_obj.id)) {
              //Format localisation_string
              (!has_colonisation) ?
                localisation_string.push(`**${local_user.name}** will colonise this province in **${parseNumber(local_expedition.duration)}** turn(s).`) :
                localisation_string.push(`- **${local_user.name}** is attempting to colonise this province. The settlers will arrive in **${parseNumber(local_expedition.duration)}** turn(s).`);

              //Set has_colonisation flag to true
              has_colonisation = true;
            }
          }
        }
      }

    //Return statement
    return localisation_string;
  },

  getSupplyLocalisation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_unit_categories = Object.keys(config.units);
    var deficit_goods = getArmyDeficitGoods(user_id);
    var deficit_localisation = [];
    var local_obj = {};
    var supply_localisation = [];
    var usr = main.users[actual_id];

    var all_deficit_goods = Object.keys(deficit_goods);

    //Iterate over all categories
    for (var i = 0; i < all_unit_categories.length; i++) {
      var local_category = config.units[all_unit_categories[i]];
      var local_category_supply = getUnitCategorySupplies(user_id, all_unit_categories[i]);
      var supply_level_localisation = config.localisation.supply_modifiers;

      if (local_category_supply)
        supply_localisation.push(`- Our **${local_category.branch_name}** are currently ${supply_level_localisation[Math.floor(local_category_supply*10) - 1]}, with an average combat strength of **${printPercentage(local_category_supply)}**.`);
    }

    local_obj.supply_localisation = supply_localisation.join("\n");

    //Add deficit_localisation, truncate at 20 elements
    for (var i = 0; i < all_deficit_goods.length; i++) {
      var local_good = lookup.all_goods[all_deficit_goods[i]];
      var local_value = deficit_goods[all_deficit_goods[i]];

      if (i < 20)
        deficit_localisation.push(`${(local_good) ? local_good.name : all_deficit_goods[i]} (${(local_value[0] == local_value[1]) ? `**${parseNumber(local_value[0])}**` : `${parseNumber(Math.min(local_value[0], local_value[1]))}`})`);
    }

    local_obj.deficit_localisation = (deficit_localisation.length > 0) ?
      `We are currently lacking the following goods necessary to keep our army supplied!\n\n- ${deficit_localisation.join(", ")}` :
      `_We currently have no deficit goods._`;

    //Other trackers
    local_obj.overall_supply = printPercentage(usr.trackers.overall_supply);

    //Return statement
    return local_obj;
  },

  numberCheck: function (arg0_number, arg1_negative_positive) {
    //Convert from parameters
    var number = arg0_number;
    var negative_positive = arg1_negative_positive; //Whether this is a negative/positive scheme

    //Return statements
    if (!negative_positive) {
      if (number != 0)
        return `${config.icons.checkmark} `;
      if (number == 0)
        return `${config.icons.cancel} `;
    } else {
      return (number > 0) ? `${config.icons.checkmark} ` : `${config.icons.cancel} `;
    }
  },

  /*
    parseCultures() - Returns culture string from province culture object standardised to 100%.
    options: {
      exclude_formatting: true/false - Whether to format the string
    }
  */
  parseCultures: function (arg0_culture_obj, arg1_options) {
    //Convert from parameters
    var culture_obj = arg0_culture_obj;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_cultures = Object.keys(culture_obj);
    var f = (!options.exclude_formatting) ? `**` : "";
    var localisation_string = [];
    var others_percentage = 0;

    //Iterate over all_cultures
    for (var i = 0; i < all_cultures.length; i++) {
      var lf = (i == 0) ? f : ""; //Local formatting for largest culture group
      var local_culture = main.global.cultures[all_cultures[i]];
      var local_value = culture_obj[all_cultures[i]];

      if (local_value > 0.01) {
        localisation_string.push(`${lf}${printPercentage(local_value)}${lf} ${(local_culture.name) ? local_culture.name : all_cultures[i]}`);
      } else {
        others_percentage += local_value;
      }
    }

    if (others_percentage > 0)
      localisation_string.push(`${printPercentage(others_percentage)} Other`);

    //Return string
    return localisation_string.join(", ");
  },

  parseGood: function (arg0_good_name, arg1_formatting, arg2_exclude_icon, arg3_string) {
    //Convert from parameters
    var good_name = arg0_good_name;
    var formatting = arg1_formatting;
    var exclude_icon = arg2_exclude_icon;
    var string = (arg3_string) ? arg3_string : "";

    //Declare local instance variables
    var formatter = "";
    var good_icon = "";
    var good_obj = (typeof good_name == "object") ? good_name : getGood(good_name);
    var good_string = "";

    var good_key = (typeof good_name == "object") ?
      getGood(good_obj.name, { return_key: true }) :
      getGood(good_name, { return_key: true });

    if (good_obj) {
      if (good_obj.icon)
        good_icon = (config.icons[good_obj.icon] && !exclude_icon) ? `${config.icons[good_obj.icon]} ` : "";
      if (good_obj.name)
        good_string = good_obj.name;
    }

    //Set formatter
    if (formatting == "bold")
      formatter = "**";
    if (formatting == "italic")
      formatter = "_";
    if (formatting == "underline")
      formatter = "__";

    //Return statement
    return `${good_icon}${string}${formatter}${(good_string) ? good_string : good_key}${formatter}`;
  },

  /*
    parseGoods() - Returns an array string of a goods object passed to it
    options: {
      exclude_bullets: true/false, - Whether to exclude bullets or not
      no_formatting: true/false - Whether to format strings or not
    }
  */
  parseGoods: function (arg0_goods, arg1_options) {
    //Convert from parameters
    var goods_obj = arg0_goods;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_good_keys = Object.keys(goods_obj);
    var f = (!options.no_formatting) ? `**` : "";
    var goods_string = [];
    var prefix = (!options.exclude_bullets) ? `- ` : "";

    //Iterate over all_good_keys and parseGood() with local value
    for (var i = 0; i < all_good_keys.length; i++) {
      var local_good = lookup.all_goods[all_good_keys[i]];
      var local_value = goods_obj[all_good_keys[i]];

      if (local_good) {
        goods_string.push(`${prefix}${module.exports.parseGood(all_good_keys[i], "", false, `${f}${printRange(local_value)}${f} `)}`);
      } else if (all_good_keys[i] == "money") {
        goods_string.push(`${prefix}${config.icons.money} ${f}${printRange(local_value)}${f}`);
      } else {
        goods_string.push(`${prefix}${f}${printRange(local_value)}${f} ${all_good_keys[i]}`);
      }
    }

    //Return statement
    return goods_string;
  },

  /*
    parseLocalisation() - Returns the processed string of a bit of localisation.
    options: {
      scopes: {
        FROM: "actual_id",
        LOCAL: "actual_id",
        TO: "actual_id"
      }
    }
  */
  parseLocalisation: function (arg0_string, arg1_options) {
    //Convert from parameters
    var localisation_string = arg0_string;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_scopes = Object.keys(options.scopes);
    var all_localisation_matches = [];
    var all_localisation_keys = localisation_string.match(/\{(.*?)\}/g);

    try {
      if (all_localisation_keys) {
        //Process all_localisation_matches
        for (var i = 0; i < all_localisation_keys.length; i++) {
          var local_value = all_localisation_keys[i];
          var local_replacement = local_value.replace("{", "").replace("}", "");

          var processed_replacement = "";

          //Replace scopes
          local_replacement = local_replacement.replace(`GLOBAL`, `main.global`);
          local_replacement = local_replacement.replace(`LOCAL`, `options.scopes.LOCAL`);

          for (var x = 0; x < all_scopes.length; x++)
            if (!["GLOBAL", "LOCAL"].includes(all_scopes[x]))
              local_replacement = local_replacement.replace(all_scopes[x], `main.users['${options.scopes[all_scopes[x]]}']`);

          //Evaluate statement, [WIP] - This may pose a security hazard in the future
          processed_replacement = eval(local_replacement);

          //Push processed_replacement to all_localisation_matches
          all_localisation_matches.push(processed_replacement);
        }

        //Replace keys in text with matches
        for (var i = 0; i < all_localisation_keys.length; i++)
          localisation_string = localisation_string.replace(all_localisation_keys[i], all_localisation_matches[i]);
      }
    } catch (e) {
      log.error(`parseLocalisation() - ran into an error: ${e}.`);
      console.log(e);
    }

    //Return statement
    return localisation_string;
  },

  parsePath: function (arg0_provinces, arg1_distances, arg2_limit) {
    //Convert from parameters
    var provinces = getList(arg0_provinces);
    var distances = (arg1_distances) ? getList(arg1_distances) : undefined;
    var limit = (arg2_limit) ? parseInt(arg2_limit) : 1000;

    //Declare local instance variables
    var path_string = [];

    for (var i = 0; i < provinces.length; i++) {
      var local_province = main.provinces[provinces[i]];
      var path_string_length = 0;

      for (var x = 0; x < path_string.length; x++)
        path_string_length += path_string[x].length;

      if (path_string_length < limit || (provinces.length - path_string.length <= 1)) {
        path_string.push(`${(local_province.name) ? `(#${provinces[i]}) **${local_province.name}**` : provinces[i]}${(distances) ? ` (${parseNumber(distances[i])})` : ""}`);
      } else {
        var remainder_distance = 0;
        var remainder_provinces = provinces.length - path_string.length - 1;

        if (distances)
          for (var x = i; x < distances.length - 1; x++)
            remainder_distance += parseInt(distances[x]);

        //Push truncated string
        path_string.push(`+${parseNumber(remainder_provinces)} more ${(distances) ?  `(${parseNumber(remainder_distance)})` : ""}`);

        //Push final province
        path_string.push(`${(local_province.name) ? `(#${provinces[provinces.length - 1]}) **${local_province.name}**` : provinces[provinces.length - 1]}${(distances) ? ` (${parseNumber(distances[provinces.length - 1])})` : ""}`);

        break;
      }
    }

    //Join array
    path_string = path_string.join(" ➛ ");

    //Total distance if applicable
    if (distances) {
      var total_distance = getSum(distances);

      path_string += ` | Total Distance: **${parseNumber(total_distance)}** infrastructure-adjusted kilometres.`;
    }

    //Return string
    return path_string;
  },

  parsePeaceTreatyInfamyLocalisation: function (arg0_war_obj, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_obj = arg0_war_obj;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var infamy_obj = getPeaceTreatyInfamy(war_obj, peace_obj);
    var infamy_string = [];

    var all_infamy_keys = Object.keys(infamy_obj);

    //Format infamy_string
    for (var i = 0; i < all_infamy_keys.length; i++) {
      var local_amount = infamy_obj[all_infamy_keys[i]];
      var local_user = main.users[all_infamy_keys[i]];

      infamy_string.push(`- **${local_user.name}** will gain ${config.icons.infamy} **${parseNumber(local_amount, { display_float: true })}** Infamy.`);
    }

    //Return statement
    return infamy_string;
  },

  parsePeaceTreatyLocalisation: function (arg0_war_obj, arg1_peace_treaty_object) {
    //Convert from parameters
    var war_obj = arg0_war_obj;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var all_participants = [];
    var friendly_side = "";
    var opposing_side = "";
    var peace_string = [];
    var sorted_wargoals = [];
    var wargoals_demanded = {};

    //Fetch friendly side
    if (war_obj.attackers.includes(peace_obj.owner)) {
      friendly_side = "attackers";
      opposing_side = "defenders";
    }
    if (war_obj.defenders.includes(peace_obj.owner)) {
      friendly_side = "defenders";
      opposing_side = "attackers";
    }

    //Print target requirement if applicable
    if (hasPeaceTreatyTargetRequirement(war_obj, peace_obj)) {
      var has_no_target = true;

      if (peace_obj.target)
        if (war_obj[opposing_side].includes(peace_obj.target))
          if (main.users[peace_obj.target])
            has_no_target = false;

      peace_string.push(`Proposal Target: ${(has_no_target) ? `_None_` : `**${main.users[peace_obj.target].name}**`}`);

      (has_no_target) ?
        peace_string.push(`- This peace proposal must be targeted at someone on the other side that is not the enemy war leader in order to be valid! You cannot send this peace proposal until this matter has been resolved.\n\nType **[Change Target]** to resolve this issue.`) :
        peace_string.push(`- This proposal is a separate peace offer for a single country. Only wargoals regarding this country or its vassals can be enforced if it signed.\n\n- :warning: Any overboard requests that cannot be enforced will still count towards infamy! Imagine if Germany suddenly announced it planned to annex the entirety of Britain after the Russians surrendered.`);

      peace_string.push("");
      peace_string.push(config.localisation.divider);
      peace_string.push("");
    } else if (peace_obj.type == "user") {
      peace_string.push(`This peace proposal is being negotiated from a position of inferiority as we are not the current war leader. It will be proposed to the entire enemy side and will result in a negotiated settlement.`);
      peace_string.push("");
      peace_string.push(config.localisation.divider);
      peace_string.push("");
    }

    //Print warscore budgets
    peace_string.push(`**Warscore Budgets:**`);
    peace_string.push("");
    peace_string.push(config.localisation.divider);
    peace_string.push("");

    //Print all plenipotentiary warscore capacities first
    for (var i = 0; i < war_obj[friendly_side].length; i++)
      try {
        var local_capacity = getWarscoreCapacity(war_obj, peace_obj, war_obj[friendly_side][i]);
        var local_spent_capacity = getSpentWarscore(war_obj, peace_obj, war_obj[friendly_side][i]);
        var local_user = main.users[war_obj[friendly_side][i]];

        peace_string.push(`- **${local_user.name}** - Warscore Budget: (${parseNumber(local_spent_capacity)}/**${parseNumber(local_capacity)}**)`);

        if (local_spent_capacity > local_capacity) {
          var local_undercapacity = local_spent_capacity - local_capacity;

          peace_string.push(`- This nation is **${parseNumber(local_undercapacity)}** infamy over their warscore capacity, and some of their wargoals will need to be dropped or scaled down for the peace offer to be valid.`);
        }
      } catch (e) {
        log.warn(`Error occurred whilst parsing peace treaty localisation!`);
        console.log(e);
      }

    peace_string.push("");
    peace_string.push(config.localisation.divider);
    peace_string.push("");

    //Fetch wargoals_demanded
    for (var i = 0; i < peace_obj.wargoals.length; i++) {
      var local_wargoal_id = peace_obj.wargoals[i].id;

      //Increment wargoals_demanded field
      wargoals_demanded[local_wargoal_id] = (wargoals_demanded[local_wargoal_id]) ?
        wargoals_demanded[local_wargoal_id] + 1 :
        1;
    }

    //Parse through all demands to sort by ID's
    for (var i = 0; i < peace_obj.wargoals.length; i++)
      sorted_wargoals.push(peace_obj.wargoals[i].id);

    //Unique sorted_wargoals, then .sort()
    sorted_wargoals = unique(sorted_wargoals).sort();

    //Print all sorted_wargoals to the first page
    for (var i = 0; i < sorted_wargoals.length; i++) {
      var wargoal_id = sorted_wargoals[i];
      var wargoal_obj = getWargoal(wargoal_id);

      var demand_limit = returnSafeNumber(wargoal_obj.demand_limit, 1);

      //Get actual demand_limit from war_obj.[friendly_side]_wargoals
      demand_limit = Math.ceil(
        demand_limit*returnSafeNumber(war_obj[`${friendly_side}_wargoals`][wargoal_id], 1)
      );

      peace_string.push(`**${(wargoal_obj.name) ? wargoal_obj.name : wargoal_id}** - (**${parseNumber(returnSafeNumber(wargoals_demanded[wargoal_id]))}**/${parseNumber(demand_limit)} demanded)`);
    }

    if (peace_obj.wargoals.length > 0) {
      peace_string.push("");

      var infamy_localisation = module.exports.parsePeaceTreatyInfamyLocalisation(war_obj, peace_obj);

      if (infamy_localisation.length > 0) {
        peace_string.push(infamy_localisation.join("\n"));
        peace_string.push("");
      }

      peace_string.push(config.localisation.divider);
      peace_string.push("");

      //Second page terms
      for (var i = 0; i < sorted_wargoals.length; i++)
        for (var x = 0; x < peace_obj.wargoals.length; x++)
          if (peace_obj.wargoals[x].id == sorted_wargoals[i])
            if (peace_obj.wargoals[x].effect) {
              var all_effects = Object.keys(peace_obj.wargoals[x].effect);
              var wargoal_id = peace_obj.wargoals[x].id;
              var wargoal_number = 0;
              var wargoal_obj = getWargoal(wargoal_id);

              var demand_limit = returnSafeNumber(wargoal_obj.demand_limit, 1);

              //Get actual demand_limit from war_obj.[friendly_side]_wargoals
              demand_limit = Math.ceil(
                demand_limit*returnSafeNumber(war_obj[`${friendly_side}_wargoals`][wargoal_id], 1)
              );

              //Fetch wargoal_number
              for (var y = 0; y < x; y++)
                if (peace_obj.wargoals[y].id == sorted_wargoals[i])
                  wargoal_number++;

              //Push wargoal name and (wargoals demanded/wargoals limit) to string
              peace_string.push(`• __${(wargoal_obj.name) ? wargoal_obj.name : wargoal_id} #${wargoal_number}__:`);
              peace_string.push("");
              peace_string.push(`- Plenipotentiary: **${main.users[peace_obj.wargoals[x].owner].name}**`);

              //Push infamy
              peace_string.push(`\n- ${parseWargoalInfamyLocalisation(user_id, war_obj, peace_obj.wargoals[y]).join("\n- ")}`);

              peace_string.push("");

              for (var y = 0; y < all_effects.length; y++) try {
                var local_value = peace_obj.wargoals[x].effect[all_effects[y]];

                switch (all_effects[y]) {
                  case "annex_all":
                    //Check for all total annexation cues
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_recipient = main.users[local_value[all_local_effects[z]]];
                      var local_target = main.users[all_local_effects[z]];

                      //Push formatted string
                      peace_string.push(`- **${local_target.name}** will be completely annexed by **${local_recipient.name}**.`);
                    }

                    break;
                  case "annexation":
                    //Check for all limited annexation demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_effect = local_value[all_local_effects[z]];
                      var local_recipient = main.users[all_local_effects[z]];

                      //Push formatted string
                      peace_string.push(`- **${local_recipient.name}** will receive the province(s) of **${local_effect.provinces.join(", ")}**.`);
                    }

                    break;
                  case "cut_down_to_size":
                    //Check for all cut_down_to_size demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_clauses = Object.keys(local_value[all_local_effects[z]]);
                      var local_target = main.users[all_local_effects[z]];
                      var target_obj = local_value[all_local_effects[z]];

                      for (var a = 0; a < local_clauses.length; a++) {
                        var local_clause = target_obj[local_clauses[a]];

                        if (local_clauses[a].includes("_removal"))
                          peace_string.push(`- **${local_target.name}** must disband **${printPercentage(local_clause)}** of their **${parseString(local_clauses[a].replace("_removal", ""))}**.`);
                        if (local_clauses[a] == "turns")
                          peace_string.push(`- **${local_target.name}** will be prohibited from raising combat forces for **${parseNumber(local_clause)}** turn(s).`);
                      }
                    }

                    break;
                  case "demilitarisation":
                    //Push to peace string
                    if (local_value.demilitarised_provinces)
                      peace_string.push(`- The province(s) of **${local_value.demilitarised_provinces.join(", ")}** will be demilitarised${(local_value.turns) ? ` for the next **${parseNumber(local_value.turns)}** turn(s).` : ` in perpetuity.`}`);

                    break;
                  case "free_oppressed_people":
                    //Check for all free_oppressed_people demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_clauses = Object.keys(local_value[all_local_effects[z]]);
                      var local_target = main.users[all_local_effects[z]];
                      var target_obj = local_value[all_local_effects[z]];

                      for (var a = 0; a < local_clauses.length; a++) {
                        var local_clause = target_obj[local_clauses[a]];

                        var culture_obj = main.global.cultures[local_clauses[a]];

                        //Push to formatted string
                        if (culture_obj)
                          peace_string.push(`- The **${culture_obj.name}** culture will be released as an independent nation from **${local_target.name}**, along with the province(s) of **${local_clause.provinces.join(", ")}**.`);
                      }
                    }

                    break;
                  case "install_government":
                    //Check for all install_government demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_target = main.users[all_local_effects[z]];
                      var target_obj = local_value[all_local_effects[z]];

                      //Push to peace string
                      var government_id = getGovernment(target_obj.government_type, { return_key: true });
                      var government_obj = getGovernment(target_obj.government_type);

                      peace_string.push(`- **${local_target.name}** will be forced to change their government type to **${(government_obj.name) ? government_obj.name : government_id}**.`);
                    }

                    break;
                  case "liberation":
                    //Iterate over all liberation demands
                    for (var z = 0; z < local_value.length; z++)
                      peace_string.push(`- **${main.users[local_value[z]].name}** will be released from their overlord.`);

                    break;
                  case "puppet":
                    //Check for all puppet demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_recipient = main.users[local_value[all_local_effects[z]]];
                      var local_target = main.users[all_local_effects[z]];

                      //Push formatted string
                      peace_string.push(`- **${local_target.name}** will be vassalised by **${local_recipient.name}**`);
                    }

                    break;
                  case "release_client_state":
                    //Check for all client state demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_effect = local_value[all_local_effects[z]];

                      //Push formatted string
                      peace_string.push(`- **${(local_effect.name) ? local_effect.name : all_local_effects[z]}** will become a client state underneath the supervision of **${main.users[local_effect.overlord].name}**. They will hold the following province(s) upon secession. **${local_effect.provinces.join(", ")}**.`);
                    }

                    break;
                  case "retake_cores":
                    //Check for all retake_core demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_effect = local_value[all_local_effects[z]];
                      var recipient_array = [];

                      //Push formatted string
                      for (var a = 0; a < local_effect.length; a++)
                        recipient_array.push(`**${main.users[local_effect[a]].name}**'s`);

                        peace_string.push(`- **${main.users[all_local_effects[z]].name}** will return all of ${recipient_array.join(", ")} core provinces to their rightful owners.`);
                    }

                    break;
                  case "revoke_reparations":
                    //Push to peace_string
                    for (var z = 0; z < local_value.length; z++)
                      peace_string.push(`- **${main.users[local_value[z]].name}** will stop paying any reparations to the enemy side.`);

                    break;
                  case "seize_resources":
                    //Check for all seize_resources demands
                    for (var z = 0; z < local_value.length; z++) {
                      var local_clauses = Object.keys(local_value[z]);
                      var resource_demands = [];

                      //Iterate over all local keys
                      for (var a = 0; a < local_clauses.length; a++) {
                        var local_clause = local_value[z][local_clauses[a]];

                        if (local_clauses[a] == "inherit_actions")
                          resource_demands.push(`**${printPercentage(local_clause)}** of their current actions`);
                        if (local_clauses[a] == "inherit_money")
                          resource_demands.push(`**${printPercentage(local_clause)}** of their fiscal reserves`);
                        if (local_clauses[a].includes("seize_"))
                          resource_demands.push(`**${printPercentage(local_clause)}** of their **${parseString(local_clauses[a].replace("seize_", ""))}** stockpile`);

                        //Push formatted string
                        peace_string.push(`- **${main.users[local_value[z].debtor].name}** will cede ${resource_demands.join(", ")} to **${main.users[local_value[z].owner].name}**.`);
                      }
                    }

                    break;
                  case "steer_trade":
                    //Check for all steer_trade demands
                    var all_local_effects = Object.keys(local_value);

                    //Push to peace_string
                    for (var z = 0; z < all_local_effects.length; z++) {
                      var local_effect = local_value[all_local_effects[z]];
                      var local_recipient = main.users[local_effect.overlord];
                      var local_target = main.users[all_local_effects[z]];

                      //Push to formatted string
                      peace_string.push(`- **${local_target.name}** will only be able to trade with **${local_recipient.name}**${(local_effect.turns) ? ` for the next **${parseNumber(local_effect.turns)}** turn(s).` : `.`}`);
                    }

                    break;
                  case "syphon_actions":
                    //Check for all syphon_actions demands
                    for (var z = 0; z < local_value.length; z++) {
                      //Push formatted string
                      (local_value[z].amount && local_value[z].percentage_amount) ?
                        peace_string.push(`- **${main.users[local_value[z].owner].name}** will syphon either **${parseNumber(local_value[z].amount)}** or **${printPercentage(local_value[z].percentage_amount)}** of  **${main.users[local_value[z].debtor].name}'s actions each turn, whichever one is higher.`) :
                        (local_value[z].amount) ?
                          peace_string.push(`**${main.users[local_value[z].owner].name} will syphon **${parseNumber(local_value[z].amount)}** action(s) from **${main.users[local_value[z].debtor].name}** each turn.`) :
                          peace_string.push(`**${main.users[local_value[z].owner].name}** will syphon **${printPercentage(local_value[z].percentage_amount)}** of **${main.users[local_value[z].debtor].name}**'s actions each turn.`);
                    }

                    break;
                  case "war_reparations":
                    //Check for all war_reparations demands
                    for (var z = 0; z < local_value.length; z++)
                      //Push formatted string
                      peace_string.push(`**${main.users[local_value[z].debtor].name}** will have to pay **${printPercentage(local_value[z].percentage_amount)}** of their income to **${main.users[local_value[z].owner].name}**${(local_value[z].turns) ? ` for the next **${parseNumber(local_value[z].turns)}** turns.` : `.`}`);

                    break;
                }
              } catch {}

              peace_string.push("");
            }
    } else {
      peace_string.push(`• White Peace`);
    }

    //Return statement
    return peace_string;
  },

  parsePeaceTreatyWargoalLocalisation: function (arg0_user, arg1_war_obj, arg2_wargoal_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = arg1_war_obj;
    var wargoal_obj = arg2_wargoal_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var peace_treaty_simulation = createPeaceTreaty(user_id, war_obj, true);
    var usr = main.users[actual_id];

    //Push current wargoal
    peace_treaty_simulation.wargoals.push(wargoal_obj);

    //Return localisation
    var wargoal_localisation = module.exports.parsePeaceTreatyLocalisation(war_obj, peace_treaty_simulation);

    //Return statement
    return (wargoal_localisation) ? wargoal_localisation : [];
  },

  parsePop: function (arg0_pop_name, arg1_exclude_icons) {
    //Convert from parameters
    var pop_type = arg0_pop_name;
    var exclude_icons = arg1_exclude_icons;

    //Declare local instance variables
    var pop_obj = (typeof pop_type == "object") ? pop_type : config.pops[pop_type];

    var pop_icon_string = `${(pop_obj.icon) ? pop_obj.icon + " " : ""}`;

    //Return statement
    return `${(!exclude_icons) ? pop_icon_string : ""}${(pop_obj.name) ? pop_obj.name : pop_type}`;
  },

  parseProductionChoice: function (arg0_building_type, arg1_production_choice) {
    //Convert from parameters
    var building_type = arg0_building_type;
    var production_choice_name = arg1_production_choice;

    //Declare local instance variables
    var config_obj = lookup.all_buildings[building_type];
    var production_choice_string = "";

    if (config_obj)
      if (config_obj.produces) {
        if (production_choice_name) {
          var local_production_choice = config_obj.produces[`production_choice_${production_choice_name}`];

          production_choice_string = (local_production_choice) ?
            `${(local_production_choice.icon) ? local_production_choice.icon + " " : ""}${(local_production_choice.name) ? local_production_choice.name : local_production_choice_key}` :
            `Base (Prod. Method)`;
        } else {
          production_choice_string = `Base (Prod. Method)`;
        }
      } else {
        production_choice_string = `No Production`;
      }

    //Return statement
    return production_choice_string;
  },

  parseProductionChoiceOutputs: function (arg0_goods, arg1_exclude_icons) {
    //Convert from parameters
    var goods_obj = arg0_goods;
    var exclude_icons = arg1_exclude_icons;

    //Declare local instance variables
    var all_good_keys = Object.keys(goods_obj);
    var maintenance_array = [];
    var production_array = [];
    var production_choice_string = "";

    //Iterate over all_good_keys
    for (var i = 0; i < all_good_keys.length; i++) {
      var local_value = goods_obj[all_good_keys[i]];

      //Check if this is a good
      if (lookup.all_goods[all_good_keys[i]]) {
        if (local_value < 0) {
          maintenance_array.push(`${parseGood(all_good_keys[i], "", exclude_icons, `${parseNumber(local_value*-1)} `)}`);
        } else if (local_value > 0) {
          production_array.push(`${parseGood(all_good_keys[i], "", exclude_icons, `${parseNumber(local_value)} `)}`);
        }
      } else {
        //Money handler
        if (all_good_keys[i] == "money")
          if (local_value < 0) {
            maintenance_array.push(`${config.icons.money} ${parseNumber(local_value*-1)}`);
          } else if (local_value > 0) {
            production_array.push(`${config.icons.money} ${parseNumber(local_value)}`);
          }
      }
    }

    //Format inputs/outputs
    if (maintenance_array.length > 0 && production_array.length > 0) {
      production_choice_string = `${maintenance_array.join(", ")} ➛ ${production_array.join(", ")}`;
    } else if (production_array.length > 0) {
      production_choice_string = `${production_array.join(", ")}`;
    } else if (maintenance_array.length > 0) {
      production_choice_string = `${maintenance_array.join(", ")} ➛ _Nothing_`;
    }

    //Return statement
    return production_choice_string;
  },

  parseProvince: function (arg0_province) {
    //Convert from parameters
    var province_name = arg0_province;

    //Declare local instance variables
    var province_obj = (typeof province_name != "object") ? getProvince(province_name) : province_name;
    var province_string = "";

    if (province_obj)
      if (province_obj.name) {
        province_string = province_obj.name;
      } else {
        province_string = `Province ${province_obj.id}`;
      }

    //Return statement
    return province_string;
  },

  //parseProvinceCulture() - Returns a header string displaying significant cultures in a province
  parseProvinceCulture: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var culture_obj = getProvinceCulture(province_id);
    var culture_string = [];
    var other_percentage = 0;

    if (culture_obj) {
      var all_cultures = Object.keys(culture_obj);

      //Iterate over all_cultures and print percentage if above defines
      for (var i = 0; i < all_cultures.length; i++) {
        var local_culture = main.global.cultures[all_cultures[i]];
        var local_value = culture_obj[all_cultures[i]];

        if (local_value >= config.defines.economy.cultural_minority_display) {
          culture_string.push(`${local_culture.name} (${printPercentage(local_value)})`);
        } else {
          other_percentage += local_value;
        }
      }

      if (other_percentage > 0)
        culture_string.push(`Other (${printPercentage(other_percentage)})`);
    } else {
      culture_string.push("None");
    }

    //Return statement
    return culture_string.join(", ");
  },

  parseProvinces: function (arg0_provinces, arg1_options) {
    //Convert from parameters
    var provinces = getList(arg0_provinces);
    var options = (arg1_options) ? arg1_options : {
      display_cities: true,
      display_prefix: true,
      limit: 100
    };

    //Declare local instance variables
    var current_province_count = 0;
    var local_province_string = [];
    var provinces_string = [];

    //Split provinces based on limit n of provinces
    for (var i = 0; i < provinces.length; i++) {
      var local_province = main.provinces[provinces[i]];

      if (local_province) {
        local_province_string.push(`${(local_province.name && options.display_cities) ? `(#${provinces[i]}) **${local_province.name}**` : provinces[i]}`);

        current_province_count++;
      }

      //Check to see if new array should be pushed to provinces_string
      if (
        (current_province_count >= options.limit || i == provinces.length - 1)
        && local_province_string.length > 0
      ) {
        provinces_string.push(`${(options.display_prefix) ? `- ` : ""}${local_province_string.join(", ")}`);

        current_province_count = 0;
        local_province_string = [];
      }
    }

    //Return statement
    return provinces_string;
  },

  parseTaxName: function (arg0_tax_key, arg1_do_not_format) {
    //Convert from parameters
    var tax_key = arg0_tax_key;
    var do_not_format = arg1_do_not_format;

    //Declare local instance variables
    var split_key = tax_key.split("-");

    if (split_key[1] == "category_tax") {
      var category_obj = config.buildings[split_key[0]];

      return (!do_not_format) ?
        `**${(category_obj.name) ? category_obj.name : split_key[0]}** Industry taxes` :
        `${(category_obj.name) ? category_obj.name : split_key[0]} Industry Tax`;
    } else {
      var building_obj = getBuilding(split_key[0]);

      return (!do_not_format) ?
        `**${(building_obj.name) ? building_obj.name : split_key[0]}** taxes` :
        `${(building_obj.name) ? building_obj.name : split_key[0]} Tax`;
    }
  },

  parseWargoalInfamyLocalisation: function (arg0_user, arg1_war_obj, arg2_wargoal_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = arg1_war_obj;
    var wargoal_obj = arg2_wargoal_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];

    var peace_treaty_simulation = createPeaceTreaty(user_id, war_obj, true);
    var usr = main.users[actual_id];

    //Push current wargoal
    peace_treaty_simulation.wargoals.push(wargoal_obj);

    //Get current infamy
    var infamy_obj = getPeaceTreatyInfamy(war_obj, peace_treaty_simulation);
    var infamy_string = [];

    var all_infamy_keys = Object.keys(infamy_obj);

    //Format infamy_string
    for (var i = 0; i < all_infamy_keys.length; i++) {
      var local_amount = infamy_obj[all_infamy_keys[i]];
      var local_user = main.users[all_infamy_keys[i]];

      infamy_string.push(`${local_user.name} gains ${config.icons.infamy} **${parseNumber(local_amount, { display_float: true, display_prefix: true })}** Infamy.`);
    }

    //Return statement
    return infamy_string;
  },

  /*
    parseWargoalLocalisation() - Parses tooltip localisation for a wargoal.
    options: {
      disable_prefix: true/false - Whether or not to disable the bullet point in the prefix
    }
  */
  parseWargoalLocalisation: function (arg0_wargoal_type, arg1_options) {
    //Convert from parameters
    var wargoal_type = arg0_wargoal_type;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var prefix = (!options.disable_prefix) ? "• " : "";
    var wargoal_obj = (typeof wargoal_type != "object") ? config.wargoals[wargoal_type] : wargoal_type;
    var wargoal_string = [];

    if (wargoal_obj) {
      var all_wargoal_keys = Object.keys(wargoal_obj);

      //Push wargoal name and description formatting first
      wargoal_string.push(`**${(wargoal_obj.name) ? wargoal_obj.name : wargoal_type}:**`);
      wargoal_string.push("");

      if (wargoal_obj.description) {
        wargoal_string.push(wargoal_obj.description);
        wargoal_string.push("");
      }

      //Push infamy cost
      if (wargoal_obj.infamy) {
        var all_infamy_keys = Object.keys(wargoal_obj.infamy);
        var default_infamy_keys = ["infamy_per_percentage", "infamy_per_province", "maximum_infamy", "minimum_infamy"]
        var infamy_obj = wargoal_obj.infamy;

        wargoal_string.push(`${config.icons.infamy} Infamy: **${(infamy_obj.minimum_infamy) ? parseNumber(infamy_obj.minimum_infamy, { display_float: true }) : 0}**`);

        if (infamy_obj.infamy_per_percentage)
          wargoal_string.push(`- **${parseNumber(infamy_obj.infamy_per_percentage, { display_float: true, display_prefix: true })}** per percent demanded.`);
        if (infamy_obj.infamy_per_province)
          wargoal_string.push(`- **${parseNumber(infamy_obj.infamy_per_province, { display_float: true, display_prefix: true })}** per province demanded.`);

        //Additional infamy modifiers
        for (var i = 0; i < all_infamy_keys.length; i++)
          if (!default_infamy_keys.includes(all_infamy_keys[i]))
            if (all_infamy_keys[i].startsWith("infamy_per_")) {
              var infamy_province_type = all_infamy_keys[i].replace("infamy_per_", "");

              wargoal_string.push(`- **${parseNumber(infamy_obj[all_infamy_keys[i]], { display_float: true, display_prefix: true })}** per **${parseString(infamy_province_type)}** province demanded.`);
            }

        //Maximum infamy
        if (infamy_obj.maximum_infamy)
          wargoal_string.push(`- ${config.icons.infamy} Maximum Infamy from adding this wargoal: ${parseNumber(infamy_obj.maximum_infamy, { display_float: true })}`);
      } else {
        wargoal_string.push(`${config.icons.infamy} Infamy: **0**`);
      }

      wargoal_string.push("");

      (wargoal_obj.demand_limit != -1) ?
        wargoal_string.push(`This wargoal can be demanded up to **${parseNumber(returnSafeNumber(wargoal_obj.demand_limit, 1))}** time(s).`) :
        wargoal_string.push(`This wargoal can be demanded as many times as we like.`);

      wargoal_string.push("");

      //Wargoal effects
      if (wargoal_obj.effect) {
        var all_effects = Object.keys(wargoal_obj.effect);

        for (var i = 0; i < all_effects.length; i++)
          switch (all_effects[i]) {
            case "annex_all":
              wargoal_string.push(`${prefix}Allows the complete annexation of a target country.`);

              break;
            case "cut_down_to_size":
              var default_keys = ["can_cut_army_types_down_to_size", "maximum_removal", "minimum_removal", "maximum_turns_demilitarised", "minimum_turns_demilitarised"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              if (local_effect.can_cut_army_types_down_to_size)
                wargoal_string.push(`${prefix}Can cut different army types down to size.`);
              if (local_effect.minimum_removal)
                wargoal_string.push(`${prefix}Can reduce target forces by at least **${printPercentage(local_effect.minimum_removal)}**.`);
              if (local_effect.maximum_removal)
                wargoal_string.push(`${prefix}Reduces target forces by a maximum of **${printPercentage(local_effect.maximum_removal)}**.`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_removal", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}Reduces the target's **${parseString(processed_key[1])}** by a minimum of **${printPercentage(local_value)}**.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}Can reduce the target's **${parseString(processed_key[1])}** by a maximum of **${printPercentage(local_value)}**.`);
                }

              if (local_effect.minimum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a minimum of **${parseNumber(local_effect.minimum_turns_demilitarised)}** turn(s).`);
              if (local_effect.maximum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a maximum of **${parseNumber(local_effect.maximum_turns_demilitarised)}** turn(s).`);

              break;
            case "demilitarisation":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.can_demilitarise_capital) ?
                wargoal_string.push(`${prefix}Can demilitarise target capital.`) :
                wargoal_string.push(`${prefix}Cannot demilitarise target capital.`);

              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}Can demilitarise at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s).`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}Can demilitarise up to **${parseNumber(local_effect.maximum_provinces_allowed)}** province(s).`);

              if (local_effect.minimum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a minimum of **${parseNumber(local_effect.minimum_turns_demilitarised)}** turn(s).`);
              if (local_effect.maximum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a maximum of **${parseNumber(local_effect.maximum_turns_demilitarised)}** turn(s).`);

              break;
            case "free_oppressed_people":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              if (local_effect.can_choose_provinces)
                wargoal_string.push(`${prefix}We are allowed to choose the provinces that will be conferred to an oppressed people from the target country.`);
              (local_effect.can_free_accepted_cultures) ?
                wargoal_string.push(`${prefix}We can free accepted, not just non-accepted cultures, from the target.`) :
                wargoal_string.push(`${prefix}We may only free non-accepted cultures from the target.`);
              if (local_effect.minimum_country_population_size)
                wargoal_string.push(`${prefix}Any freed country can have at least **${parseNumber(local_effect.minimum_country_population_size)}** inhabitants.`);
              if (local_effect.minimum_country_province_size)
                wargoal_string.push(`${prefix}Any freed country can have at least **${parseNumber(local_effect.minimum_country_province_size)}** province(s).`);
              if (local_effect.maximum_country_population_size)
                wargoal_string.push(`${prefix}Any freed country may only have **${parseNumber(local_effect.minimum_country_population_size)}** inhabitants at most.`);
              if (local_effect.maximum_country_province_size)
                wargoal_string.push(`${prefix}Any freed country may only have up to **${parseNumber(local_effect.maximum_country_population_size)}** province(s).`);

              break;
            case "install_government":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.can_install_any_government) ?
                wargoal_string.push(`${prefix}Forces a regime change on target to a government of our preference.`) :
                wargoal_string.push(`${prefix}Forces target country to change their regime to our government type.`);

              break;
            case "liberation":
              wargoal_string.push(`${prefix}Allows the liberation of a vassal country or client state.`);

              break;
            case "limited_annexation":
              var default_keys = ["can_take_capital", "maximum_provinces_allowed", "minimum_provinces_allowed", "minimum_percentage_allowed", "maximum_percentage_allowed"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              (local_effect.can_take_capital) ?
                wargoal_string.push(`We may annex the target country's capital.`) :
                wargoal_string.push(`We may not annex the target capital.`);

              (local_effect.free_annexation) ?
                wargoal_string.push(`We may annex territory from multiple countries.`) :
                wargoal_string.push(`We may only annex territory from the same country.`);

              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}We can annex at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s) from the target.`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}We may only annex up to **${parseNumber(local_effect.maximum_provinces_allowed)}** province(s) from the target.${(local_effect.maximum_provinces_allowed) ? " Supersedes minimum percentage allowed." : ""}`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}We can annex at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the enemy's provinces.${(local_effect.minimum_provinces_allowed) ? " Supersedes minimum provinces allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}We can annex at most **${printPercentage(local_effect.minimum_percentage_allowed)}** of the enemy's provinces.${(local_effect.maximum_provinces_allowed) ? " Supersedes maximum provinces allowed." : ""}`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_allowed", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}May take a minimum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} provinces from target.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}May take a maximum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} from target.`);
                }

              break;
            case "puppet":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              if (Object.keys(local_effect).length == 0)
                wargoal_string.push(`${prefix}We may puppet the target country.`);
              if (local_effect.custom_recipient)
                wargoal_string.push(`${prefix}We may choose an overlord for the target country.`)
              if (local_effect.maximum_population)
                wargoal_string.push(`${prefix}We may puppet the target country as long as it has less than **${parseNumber(local_effect.maximum_population)}** inhabitants.`);
              if (local_effect.maximum_provinces)
                wargoal_string.push(`${prefix}We may puppet the target country as long as it has less than **${parseNumber(local_effect.maximum_provinces)}** province(s).`);
              if (local_effect.minimum_turns_puppeted)
                wargoal_string.push(`${prefix}We must puppet the target for a minimum of **${parseNumber(local_effect.minimum_turns_puppeted)}** turn(s).`);
              if (local_effect.maximum_turns_puppeted)
                wargoal_string.push(`${prefix}We may hold the target as a puppet for up to **${parseNumber(local_effect.maximum_turns_puppeted)}** turn(s).`);

              break;
            case "release_client_state":
              var default_keys = ["can_release_client_state", "can_take_capital", "maximum_percentage_allowed", "maximum_population_allowed", "maximum_provinces_allowed", "maximum_turns_allowed", "minimum_percentage_allowed", "minimum_population_allowed", "minimum_provinces_allowed", "minimum_turns_allowed", "requires_capital_city"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              if (local_effect.can_release_client_state)
                wargoal_string.push(`${prefix}We may release client states from the target country.`);
              if (local_effect.can_take_capital)
                wargoal_string.push(`${prefix}The target country's capital may belong to a client state.`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}The client state may hold at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's province(s).${(local_effect.minimum_provinces_allowed) ? " Supersedes minimum provinces allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}The client state may hold up to **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's province(s).${(local_effect.minimum_provinces_allowed) ? " Supersedes maximum provinces allowed." : ""}`);
              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}The client state may have at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s).`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}The client state may have up to **${parseNumber(local_effect.maximum_provinces_allowed)}** province(s).${(local_effect.minimum_percentage_allowed) ? " Supersedes minimum percentage allowed." : ""}`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_allowed", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}May take a minimum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} provinces from target.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}May take a maximum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} from target.`);
                }

              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms must apply for at least **${parseNumber(local_effect.minimum_turns_allowed)}** before being abrogated.`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms may only last up to **${parseNumber(local_effect.maximum_turns_allowed)}** before the client state is returned to its rightful owner.`);

              break;
            case "retake_cores":
              wargoal_string.push(`${prefix}May retake cores for another country from the target.`);

              break;
            case "revoke_reparations":
              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}Frees a country of our choice from paying reparations to its economic overlord.`) :
                wargoal_string.push(`${prefix}We will no longer have to pay reparations.`);

              break;
            case "seize_resources":
              var default_keys = ["inherit_actions_maximum", "inherit_actions_minimum", "inherit_money_maximum", "inherit_money_minimum", "seize_inventory_maximum", "seize_inventory_maximum"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              (local_effect.custom_recipient) ?
                wargoal_string.push(`The target country will cede their resources to a selected recipient.`) :
                wargoal_string.push(`The target country will cede their resources to us.`);

              if (local_effect.inherit_actions_minimum)
                wargoal_string.push(`${prefix}Recipient can inherit at least **${printPercentage(local_effect.inherit_actions_minimum)}** of the target country's actions.`);
              if (local_effect.inherit_actions_maximum)
                wargoal_string.push(`${prefix}Recipient may inherit up to **${printPercentage(local_effect.inherit_actions_maximum)}** of the target country's actions.`);
              if (local_effect.inherit_money_minimum)
                wargoal_string.push(`${prefix}Recipient can inherit at least **${printPercentage(local_effect.inherit_money_minimum)}** of the target country's monetary reserves.`);
              if (local_effect.inherit_money_maximum)
                wargoal_string.push(`${prefix}Recipient may inherit up to **${printPercentage(local_effect.inherit_money_maximum)}** of the target country's monetary reserves.`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("seize_", "").split("_");

                  var good_obj = getGood(processed_key[1]);

                  if (good_obj) {
                    if (processed_key[0] == "minimum")
                      wargoal_string.push(`${prefix}May take a minimum of **${printPercentage(local_value)}** of the target's ${(good_obj.name) ? good_obj.name : parseString(processed_key[1])}.`);
                    if (processed_key[0] == "maximum")
                      wargoal_string.push(`${prefix}May take a maximum of **${printPercentage(local_value)}** of the target's ${(good_obj.name) ? good_obj.name : parseString(processed_key[1])}.`);
                  }
                }

              if (local_effect.seize_inventory_minimum)
                wargoal_string.push(`${prefix}The recipient will seize at least **${printPercentage(local_effect.seize_inventory_minimum)}** of the target's goods.`);
              if (local_effect.seize_inventory_maximum)
                wargoal_string.push(`${prefix}The recipient may seize up to **${printPercentage(local_effect.seize_inventory_maximum)}** of the target's goods.`);

              break;
            case "steer_trade":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country may only trade with a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country can only trade with us.`);

              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for at least **${parseNumber(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for **${parseNumber(local_effect.maximum_turns_allowed)}** turn(s) at most.`);

              break;
            case "syphon_actions":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country will cede their actions to a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country will cede their actions to us.`);

              if (local_effect.minimum_number_allowed)
                wargoal_string.push(`${prefix}We may syphon at least **${parseNumber(local_effect.minimum_number_allowed)}** action(s) from the target.`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}We may syphon at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of all produced actions from the target.${(local_effect.minimum_number_allowed) ? " Supersedes minimum number allowed." : ""}`);
              if (local_effect.maximum_number_allowed)
                wargoal_string.push(`${prefix}We may only syphon up to **${parseNumber(local_effect.maximum_number_allowed)}** action(s) from the target.${(local_effect.maximum_number_allowed) ? " Supersedes minimum percentage allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}We may syphon up to **${printPercentage(local_effect.maximum_percentage_allowed)}** of the target's action(s).${(local_effect.maximum_number_allowed) ? " Supersedes maximum number allowed." : ""}`);
              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}We will be able to collect actions from the target for at least **${parseNumber(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}We may only collect actions from the target for at least **${parseNumber(local_effect.maximum_turns_allowed)}** turn(s).`);

              break;
            case "war_reparations":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country will pay war reparations to a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country must pay us war reparations.`);

              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}The recipient must collect at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's income.`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}The recipient may collect up to **${printPercentage(local_effect.maximum_percentage_allowed)}** of the target's income.`);
              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for at least **${parseNumber(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms may only apply for up to **${parseNumber(local_effect.maximum_turns_allowed)}** turn(s).`);

              break;
          }
      } else {
        wargoal_string.push(`${prefix}White Peace`);
      }

      wargoal_string.push("");

      //Return statement
      return wargoal_string;
    }
  }
};
