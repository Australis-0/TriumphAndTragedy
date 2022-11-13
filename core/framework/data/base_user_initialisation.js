//Framework for initialising base user objects. For country objects, please see elsewhere
module.exports = {
  initStartingKit: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var usr = main.users[arg0_user];

    //Declare local instance variables
    var all_starting_keys = Object.keys(config.defines.common.starting_kit);
    var all_users = Object.keys(main.users);
    var starting_kit = config.defines.common.starting_kit;

    //Loop over all keys in starting kit and parse them
    for (var i = 0; i < all_starting_keys.length; i++) {
      var local_name = all_starting_keys[i];
      var local_value = starting_kit[all_starting_keys[i]];

      var local_good = getGood(local_name);
      var local_list = getList(local_value);
      var local_unit = getUnit(local_name);
      var local_unit_name = getUnit(local_name, { return_key: true });

      //Effects handler
      {
        switch (local_name) {
          case "actions":
            usr.actions += (local_list.length >= 2) ?
              randomNumber(local_list[0], local_list[1]) :
              local_list[0];

            break;
          case "money":
            usr.money = (local_list.length == 1) ?
              local_list[0] :
              randomNumber(local_list[0], local_list[1]);

            break;
          case "research_to":
            researchUpTo(user_id, local_value);

            break;
          case "unlock_building":
            for (var x = 0; x < local_list.length; x++)
              usr.available_buildings.push(local_list[x]);

            break;
          case "unlock_government":
            for (var x = 0; x < local_list.length; x++)
              usr.available_governments.push(local_list[x]);

            break;
          case "unlock_unit":
            for (var x = 0; x < local_list.length; x++)
              usr.available_units.push(local_list[x]);

            break;
          case "set_government":
            usr.government = randomElement(local_list);

            break;
          case "set_mobilisation_unit":
            usr.mobilisation.unit_type = local_value;

            break;
          case "set_party_popularity":
            try {
              var government_types = getList(local_value.type);
              var government_popularities = getList(local_value.value);

              for (var x = 0; x < government_types.length; x++)
                usr.politics[government_types[x]].popularity = government_popularities[x];
            } catch {}

            break;
        }
      }

      //Goods handler
      {
        //Check if local_name is of type good or "money"
        if (local_good)
          //Check to see if good has random range or not
          usr.inventory[local_good.id] += (local_list.length >= 2) ?
            randomNumber(local_list[0], local_list[1]) :
            local_list[0];

        if (local_name.money)
          usr.money += (local_list.length) ?
            randomNumber(local_list[0], local_list[1]) :
            local_list[0];
      }

      //Units handler
      {
        //Check if local_name is of type unit
        if (local_unit)
          if (local_name == local_unit_name)
            usr.reserves[local_unit_name] += (local_list.length >= 2) ?
              randomNumber(local_list[0], local_list[1]) :
              local_list[0];
      }
    }

    //Auto-catchup
    {
      var highest_cost = 0;

      for (var i = 0; i < all_users.length; i++) {
        var local_user = main.users[all_users[i]];

        if (local_user.country_age >= 20)
          for (var x = 0; x < local_user.researched_technologies.length; x++) {
            try {
              var technology_cost = returnSafeNumber(getTechnology(local_user.researched_technologies[x]).research_cost);

              highest_cost = Math.max(highest_cost, technology_cost);
            } catch (e) {
              log.error(`${all_users[i]} has an invalid tech when running through ${local_user.researched_technologies[x]}!`);
            }
          }
      }

      if (highest_cost > returnSafeNumber(config.defines.common.research_to))
        researchUpTo(user_id, highest_cost);
    }
  },

  initUser: function (arg0_user) {
    //Convert from parameters
    var already_registered = true;
    var user_id = arg0_user;
    var usr = (main.users[arg0_user]) ? main.users[arg0_user] : undefined;

    //Declare local instance variables
    var all_buildings = getBuildings({ return_names: true });

    //Define user if not already defined
    if (!usr) {
      already_registered = false;

      main.global.user_map[user_id] = user_id;
      main.users[user_id] = {};
      usr = main.users[user_id];
    }

    //Customisation
    if (!usr.name) usr.name = "";
    if (!usr.flag) usr.flag = "https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png";
    if (!usr.colour) usr.colour = generateRandomColour();

    if (!usr.actions) usr.actions = 0;
    if (!usr.money) usr.money = 10000;
    if (!usr.prestige) usr.prestige = 0;
    if (!usr.tax_rate) usr.tax_rate = 0;

    //Define subobjects
    if (!usr.diplomacy) usr.diplomacy = {};
      if (!usr.diplomacy.used_diplomatic_slots) usr.diplomacy.used_diplomatic_slots = 0;

      if (!usr.diplomacy.allies) usr.diplomacy.allies = {};
      if (!usr.diplomacy.guarantees) usr.diplomacy.guarantees = {};
      if (!usr.diplomacy.military_access) usr.diplomacy.military_access = {};
      if (!usr.diplomacy.non_aggression_pacts) usr.diplomacy.non_aggression_pacts = {};
      if (!usr.diplomacy.relations) usr.diplomacy.relations = {};
      if (!usr.diplomacy.rivals) usr.diplomacy.rivals = {};
      if (!usr.diplomacy.vassals) usr.diplomacy.vassals = {};

      //Diplomatic trackers
      if (!usr.diplomacy.casus_belli) usr.diplomacy.casus_belli = [];
      if (!usr.diplomacy.justifications) usr.diplomacy.justifications = [];
      if (!usr.diplomacy.wargoals) usr.diplomacy.wargoals = [];

    if (!usr.modifiers) usr.modifiers = {};
      //Colonisation
      if (!usr.modifiers.colonial_immigration_rate) usr.modifiers.colonial_immigration_rate = 1;
      if (!usr.modifiers.colonial_maintenance) usr.modifiers.colonial_maintenance = 1;
      if (!usr.modifiers.colonial_power_cap) usr.modifiers.colonial_power_cap = 50;
      if (!usr.modifiers.colonial_power_gain) usr.modifiers.colonial_power_gain = 1;

      //Economic
      if (!usr.modifiers.building_cost) usr.modifiers.building_cost = 1;
      if (!usr.modifiers.civilian_actions) usr.modifiers.civilian_actions = 0;
      if (!usr.modifiers.construction_time) usr.modifiers.construction_time = 1;
      if (!usr.modifiers.extra_building_slots) usr.modifiers.extra_building_slots = 0;
      if (!usr.modifiers.isolation) usr.modifiers.isolation = 0.50;
      if (!usr.modifiers.knowledge_investment_limit) usr.modifiers.knowledge_investment_limit = 1;
      if (!usr.modifiers.max_tax) usr.modifiers.max_tax = 0;
      if (!usr.modifiers.maximum_expeditions) usr.modifiers.maximum_expeditions = 1;
      if (!usr.modifiers.maximum_transaction_amount) usr.modifiers.maximum_transaction_amount = config.defines.economy.resource_init_max_percentile;
      if (!usr.modifiers.pop_growth_modifier) usr.modifiers.pop_growth_modifier = 1.0539;
      if (!usr.modifiers.production_efficiency) usr.modifiers.production_efficiency = 1;
      if (!usr.modifiers.research_efficiency) usr.modifiers.research_efficiency = 0.20;
      if (!usr.modifiers.research_slots) usr.modifiers.research_slots = 3;
      if (!usr.modifiers.rgo_throughput) usr.modifiers.rgo_throughput = config.defines.economy.rgo_modifier;
      if (!usr.modifiers.shipment_capacity) usr.modifiers.shipment_capacity = 50;
      if (!usr.modifiers.shipment_time) usr.modifiers.shipment_time = 1;
      if (!usr.modifiers.tax_efficiency) usr.modifiers.tax_efficiency = 0.15;
      var all_building_categories = Object.keys(config.buildings);
      for (var i = 0; i < all_building_categories.length; i++) {
        if (!usr.modifiers[`${all_building_categories[i]}_building_slots`]) usr.modifiers[`${all_building_categories[i]}_building_slots`] = 1;
      }
      for (var i = 0; i < all_buildings.length; i++) {
        if (!usr.modifiers[`${all_buildings[i]}`]) usr.modifiers[`${all_buildings[i]}`] = 0;
      }

      //Military; includes colonisation travel time
      if (!usr.modifiers.ack_ack_effectiveness) usr.modifiers.ack_ack_effectiveness = 1;
      if (!usr.modifiers.air_interception_range) usr.modifiers.air_interception_range = 1;
      if (!usr.modifiers.attrition_rate) usr.modifiers.attrition_rate = 1;
      if (!usr.modifiers.army_professionalism) usr.modifiers.army_professionalism = 1;
      if (!usr.modifiers.army_travel_speed) usr.modifiers.army_travel_speed = 1;
      if (!usr.modifiers.army_upkeep) usr.modifiers.army_upkeep = 1;
      if (!usr.modifiers.blockade_efficiency) usr.modifiers.blockade_efficiency = 0.2;
      if (!usr.modifiers.casualty_reduction) usr.modifiers.casualty_reduction = 1;
      if (!usr.modifiers.colonist_travel_speed) usr.modifiers.colonist_travel_speed = 1;
      if (!usr.modifiers.combat_order) usr.modifiers.combat_order = config.combat_order;
      if (!usr.modifiers.command_power) usr.modifiers.command_power = 0;
      if (!usr.modifiers.command_power_gain) usr.modifiers.command_power_gain = 0;
      if (!usr.modifiers.maximum_manpower) usr.modifiers.maximum_manpower = 1;
      if (!usr.modifiers.mobilisation_impact) usr.modifiers.mobilisation_impact = 1;
      if (!usr.modifiers.mobilisation_size) usr.modifiers.mobilisation_size = 1;
      if (!usr.modifiers.mobilisation_speed) usr.modifiers.mobilisation_speed = 1;
      if (!usr.modifiers.national_manpower) usr.modifiers.national_manpower = 1;
      if (!usr.modifiers.navy_professionalism) usr.modifiers.navy_professionalism = 1;
      if (!usr.modifiers.non_core_manpower) usr.modifiers.non_core_manpower = config.defines.politics.non_core_manpower;
      if (!usr.modifiers.supply_consumption) usr.modifiers.supply_consumption = 1;
      if (!usr.modifiers.training_cost) usr.modifiers.training_cost = 1;
      if (!usr.modifiers.unit_cost) usr.modifiers.unit_cost = 1;
      if (!usr.modifiers.war_exhaustion) usr.modifiers.war_exhaustion = 0;
      if (!usr.modifiers.war_exhaustion_rate) usr.modifiers.war_exhaustion_rate = 0.01;
      var all_unit_categories = Object.keys(config.units);
      for (var i = 0; i < all_unit_categories.length; i++) {
        if (!usr.modifiers[`${all_unit_categories[i]}_attack`]) usr.modifiers[`${all_unit_categories[i]}_attack`] = 1;
        if (!usr.modifiers[`${all_unit_categories[i]}_cp`]) usr.modifiers[`${all_unit_categories[i]}_cp`] = 0;
        if (!usr.modifiers[`${all_unit_categories[i]}_defence`]) usr.modifiers[`${all_unit_categories[i]}_defence`] = 1;
      }

      //Political; includes diplomacy
      if (!usr.modifiers.administrative_efficiency) usr.modifiers.administrative_efficiency = 0.50;
      if (!usr.modifiers.advisor_cost) usr.modifiers.advisor_cost = 1;
      if (!usr.modifiers.cb_generation_speed) usr.modifiers.cb_generation_speed = 1;
      if (!usr.modifiers.centralisation) usr.modifiers.centralisation = 0;
      if (!usr.modifiers.centralisation_gain) usr.modifiers.centralisation_gain = 0;
      if (!usr.modifiers.diplomatic_slots) usr.modifiers.diplomatic_slots = 3;
      if (!usr.modifiers.infamy) usr.modifiers.infamy = 0;
      if (!usr.modifiers.influence) usr.modifiers.influence = 0;
      if (!usr.modifiers.influence_gain) usr.modifiers.influence_gain = 5;
      if (!usr.modifiers.infamy_loss) usr.modifiers.infamy_loss = config.defines.diplomacy.infamy_loss;
      if (!usr.modifiers.jingoism) usr.modifiers.jingoism = 0;
      if (!usr.modifiers.opinion_modifier) usr.modifiers.opinion_modifier = 0;
      if (!usr.modifiers.overextension) usr.modifiers.overextension = 0;
      if (!usr.modifiers.political_capital) usr.modifiers.political_capital = 0;
      if (!usr.modifiers.political_capital_gain) usr.modifiers.political_capital_gain = config.defines.politics.political_capital_gain;
      if (!usr.modifiers.prestige_gain) usr.modifiers.prestige_gain = 0;
      if (!usr.modifiers.reform_desire) usr.modifiers.reform_desire = 0;
      if (!usr.modifiers.reform_desire_gain) usr.modifiers.reform_desire_gain = 0.02;
      if (!usr.modifiers.republicanism) usr.modifiers.republicanism = 0;
      if (!usr.modifiers.rival_slots) usr.modifiers.rival_slots = config.defines.diplomacy.rival_slots;
      if (!usr.modifiers.ruling_party_support) usr.modifiers.ruling_party_support = 0;
      if (!usr.modifiers.stability) usr.modifiers.stability = 0.75;
      if (!usr.modifiers.stability_modifier) usr.modifiers.stability_modifier = 0;

    if (!usr.options) usr.options = {};
      if (!usr.options.allow_ceding) usr.options.allow_ceding = [];
      if (!usr.options.avoid_attrition) usr.options.avoid_attrition = "if possible";
      if (!usr.options.avoid_territorial_violation) usr.options.avoid_territorial_violation = "if possible";
      if (!usr.options.ignore_orders) usr.options.ignore_orders = false;

    if (!usr.politics) usr.politics = {};
      var all_governments = Object.keys(config.governments);
      for (var i = 0; i < all_governments.length; i++) {
        if (!usr.politics[all_governments[i]]) usr.politics[all_governments[i]] = {};
        var local_government = usr.politics[all_governments[i]];

        if (!local_government.popularity) local_government.popularity = 0;

        if (!local_government.discontent) local_government.discontent = 0;
        if (!local_government.drift) local_government.drift = 0.01;
      }

    if (!usr.pops) usr.pops = {};
      if (!usr.pops.accepted_cultures) usr.pops.accepted_cultures = [];
      if (!usr.pops.primary_culture) usr.pops.primary_culture = "";

      if (!usr.pops.assimilations) usr.pops.assimilations = [];
      if (!usr.pops.cultural_integrations) usr.pops.cultural_integrations = [];

      //Declare pop subobjects
      if (!usr.pops.pop_modifiers) usr.pops.pop_modifiers = {};

      //Dynamic pop modifiers/trackers
      var all_pops = Object.keys(config.pops);
      for (var i = 0; i < all_pops.length; i++) {
        if (!usr.pops[all_pops[i]]) usr.pops[all_pops[i]] = 0;
        if (!usr.pops[`${all_pops[i]}_growth_modifier`]) usr.pops[`${all_pops[i]}_growth_modifier`] = 1;
        if (!usr.pops[`used_${all_pops[i]}`]) usr.pops[`used_${all_pops[i]}`] = 0;
      }

    //Empty subobjects
    if (!usr.alerts) usr.alerts = [];
    if (!usr.armies) usr.armies = {};
    if (!usr.army_array) usr.army_array = [];
    if (!usr.auto_trades) usr.auto_trades = {};
    if (!usr.blockaded) usr.blockaded = {};
    if (!usr.client_states) usr.client_states = {};
    if (!usr.cooldowns) usr.cooldowns = {};
    if (!usr.events) usr.events = [];
    if (!usr.expeditions) usr.expeditions = {};
    if (!usr.inventory) usr.inventory = {};
    if (!usr.laws) usr.laws = {};
    if (!usr.mobilisation) usr.mobilisation = {
      unit_type: "none"
    };
    if (!usr.national_modifiers) usr.national_modifiers = {};
    if (!usr.players) usr.players = {};
    if (!usr.researching) usr.researching = [];
    if (!usr.reserves) usr.reserves = {};
    if (!usr.temporary_modifiers) usr.temporary_modifiers = {};
    if (!usr.trades) usr.trades = {};

    //Post-object processing (Goods):
    var all_good_categories = Object.keys(config.goods);
    for (var i = 0; i < all_good_categories.length; i++) {
      var local_category = config.goods[all_good_categories[i]];

      if (all_good_categories[i] != "name") {
        var local_goods = Object.keys(local_category);

        for (var x = 0; x < local_goods.length; x++) {
          var local_good = local_category[local_goods[x]];

          if (!["name", "icon"].includes(local_goods[x])) {
            if (!usr.inventory[local_goods[x]]) usr.inventory[local_goods[x]] = 0;
            if (!usr.modifiers[`${local_goods[x]}_gain`]) usr.modifiers[`${local_goods[x]}_gain`] = 1;
          }
        }
      }
    }

    //Obsoletion variables
    if (!usr.available_buildings) usr.available_buildings = [];
    if (!usr.available_governments) usr.available_governments = [];
    if (!usr.available_reforms) usr.available_reforms = [];
    if (!usr.available_units) usr.available_units = [];

    //Trackers - tracking variables for statistical/display/cooldown purposes
      //Cooldowns
      if (!usr.total_ceded_this_turn) usr.total_ceded_this_turn = 0;
      if (!usr.total_cities_ceded_this_turn) usr.total_cities_ceded_this_turn = 0;

      //Dynamic trackers
      var all_tech_categories = Object.keys(config.technology);
      for (var i = 0; i < all_tech_categories.length; i++) {
        if (!usr[`${all_tech_categories[i]}_researched`])  usr[`${all_tech_categories[i]}_researched`] = 0;
      }

      //Other trackers
      if (!usr.at_war) usr.at_war = [];
      if (!usr.city_cap) usr.city_cap = 1;
      if (!usr.city_count) usr.city_count = 0;
      if (!usr.country_age) usr.country_age = 0;
      if (!usr.coup_this_turn) usr.coup_this_turn = "";
      if (!usr.government) usr.government = "";
      if (!usr.highest_tier) usr.highest_tier = 0;
      if (!usr.id) usr.id = user_id;
      if (!usr.infamy_rgo_throughput) usr.infamy_rgo_throughput = 0;
      if (!usr.infamy_production_efficiency) usr.infamy_production_efficiency = 0;
      if (!usr.last_active_turn) usr.last_active_turn = 0;
      if (!usr.last_election) usr.last_election = 0;
      if (!usr.news) usr.news = {};
      if (!usr.political_capital_gain_modifier) usr.political_capital_gain_modifier = 0;
      if (!usr.political_instability_modifier) usr.political_instability_modifier = 0;
      if (!usr.political_reform_desire_modifier) usr.political_reform_desire_modifier = 0
      if (!usr.population) usr.population = 0;
      if (!usr.previous_option_id) usr.previous_option_id = 0;
      if (!usr.provinces) usr.provinces = 0;
      if (!usr.recent_military_casualties) usr.recent_military_casualties = [];
      if (!usr.recent_civilian_casualties) usr.recent_civilian_casualties = [];
      if (!usr.researched_technologies) usr.researched_technologies = [];
      if (!usr.research_queue) usr.research_queue = [];
      if (!usr.total_cities) usr.total_cities = 0;
      if (!usr.transactions_this_turn) usr.transactions_this_turn = 0;
      if (!usr.triggered_events) usr.triggered_events = {};
      if (!usr.under_construction) usr.under_construction = [];
      if (!usr.vassal_years) usr.vassal_years = 0;

      //Queue
      if (!main.season_started)
        if (!usr.last_queue_check)
          usr.last_queue_check = new Date().getTime();

    //Apply starting kit if not registered
    if (!already_registered) module.exports.initStartingKit(user_id);
  }
};
