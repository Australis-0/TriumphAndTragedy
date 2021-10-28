//Framework for initialising base user objects. For country objects, please see elsewhere
module.exports = {
  initUser: function (arg0_user) {
    //Convert from parameters
    var already_registered = true;
    var user_id = arg0_user;
    var usr = (main.users[arg0_user]) ? main.users[arg0_user] : undefined;

    //Define user if not already defined
    if (!usr) {
      already_registered = false;

      main.users[arg0_user] = {};
      usr = main.users[arg0_user];
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
      if (!usr.diplomacy.rival_slots) usr.diplomacy.rival_slots = config.rival_slots;

      if (!usr.diplomacy.allies) usr.diplomacy.allies = {};
      if (!usr.diplomacy.guarantees) usr.diplomacy.guarantees = {};
      if (!usr.diplomacy.military_access) usr.diplomacy.military_access = {};
      if (!usr.diplomacy.non_aggression_pacts) usr.diplomacy.non_aggression_pacts = {};
      if (!usr.diplomacy.relations) usr.diplomacy.relations = {};
      if (!usr.diplomacy.rivals) usr.diplomacy.rivals = {};
      if (!usr.diplomacy.vassals) usr.diplomacy.vassals = {};

      //Diplomatic trackers
      if (!usr.diplomacy.casus_belli) usr.diplomacy.casus_belli = {};
      if (!usr.diplomacy.justifications) usr.diplomacy.justifications = {};
      if (!usr.diplomacy.wargoals) usr.diplomacy.wargoals = {};

    if (!usr.inventory) usr.inventory = {};
      var all_goods = Object.keys(config.goods);
      for (var i = 0; i < all_goods.length; i++) {
        if (!usr.inventory[all_goods[i]]) usr.inventory[all_goods[i]] = 0;
      }

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
      if (!usr.modifiers.max_tax) usr.modifiers.max_tax = 0;
      if (!usr.modifiers.maximum_expeditions) usr.modifiers.maximum_expeditions = 1;
      if (!usr.modifiers.pop_growth_modifier) usr.modifiers.pop_growth_modifier = 1.0539;
      if (!usr.modifiers.production_efficiency) usr.modifiers.production_efficiency = 1;
      if (!usr.modifiers.research_efficiency) usr.modifiers.research_efficiency = 0.20;
      if (!usr.modifiers.research_slots) usr.modifiers.research_slots = 3;
      if (!usr.modifiers.rgo_throughput) usr.modifiers.rgo_throughput = config.rgo_modifier;
      if (!usr.modifiers.shipment_capacity) usr.modifiers.shipment_capacity = 50;
      if (!usr.modifiers.shipment_time) usr.modifiers.shipment_time = 1;
      if (!usr.modifiers.tax_efficiency) usr.modifiers.tax_efficiency = 0.15;
      var all_building_categories = Object.keys(config.buildings);
      for (var i = 0; i < all_building_categories.length; i++) {
        if (!usr.modifiers[`${all_building_categories[i]}_building_slots`]) usr.modifiers[`${all_building_categories[i]}_building_slots`] = 1;
      }
      var all_goods = Object.keys(config.goods);
      for (var i = 0; i < all_goods.length; i++) {
        if (!usr.modifiers[`${all_goods[i]}_gain`]) usr.modifiers[`${all_goods[i]}_gain`] = 1;
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
      if (!usr.modifiers.mobilisation_impact) usr.modifiers.mobilisation_impact = 1;
      if (!usr.modifiers.mobilisation_size) usr.modifiers.mobilisation_size = 1;
      if (!usr.modifiers.mobilisation_speed) usr.modifiers.mobilisation_speed = 1;
      if (!usr.modifiers.national_manpower) usr.modifiers.national_manpower = 1;
      if (!usr.modifiers.navy_professionalism) usr.modifiers.navy_professionalism = 1;
      if (!usr.modifiers.non_core_manpower) usr.modifiers.non_core_manpower = config.non_core_manpower;
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
      if (!usr.modifiers.infamy_loss) usr.modifiers.infamy_loss = config.infamy_loss;
      if (!usr.modifiers.jingoism) usr.modifiers.jingoism = 0;
      if (!usr.modifiers.opinion_modifier) usr.modifiers.opinion_modifier = 0;
      if (!usr.modifiers.overextension) usr.modifiers.overextension = 0;
      if (!usr.modifiers.political_capital) usr.modifiers.political_capital = 0;
      if (!usr.modifiers.political_capital_gain) usr.modifiers.political_capital_gain = config.defines.politics.political_capital_gain;
      if (!usr.modifiers.prestige_gain) usr.modifiers.prestige_gain = 0;
      if (!usr.modifiers.reform_desire) usr.modifiers.reform_desire = 0;
      if (!usr.modifiers.reform_desire_gain) usr.modifiers.reform_desire_gain = 0.02;
      if (!usr.modifiers.republicanism) usr.modifiers.republicanism = 0;
      if (!usr.modifiers.ruling_party_support) usr.modifiers.ruling_party_support = 0;
      if (!usr.modifiers.stability) usr.modifiers.stability = 0.75;
      if (!usr.modifiers.stability_modifier) usr.modifiers.stability_modifier = 0;

    if (!usr.options) usr.options = {};
      if (!usr.options.allow_ceding) usr.options.allow_ceding = [];
      if (!usr.options.avoid_attrition) usr.options.avoid_attrition = "if possible";
      if (!usr.options.avoid_territorial_violation) usr.options.avoid_territorial_violation = "if possible";

    if (!usr.politics) usr.politics = {};
      var all_governments = Object.keys(config.governments);
      for (var i = 0; i < all_governments.length; i++) {
        if (!usr.politics[all_governments[i]]) usr.politics[all_governments[i]] = {};
        var local_government = usr.politics[all_governments[i]];

        if (!local_government.popularity) local_government.popularity = 0;

        if (!local_government.discontent) local_government.discontent = 0;
        if (!local_government.drift) local_government.drift = 1;
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
    if (!usr.alerts) usr.alerts = {};
    if (!usr.armies) usr.armies = {};
    if (!usr.auto_trades) usr.auto_trades = {};
    if (!usr.blockaded) usr.blockaded = {};
    if (!usr.events) usr.events = {};
    if (!usr.expeditions) usr.expeditions = {};
    if (!usr.mobilisation) usr.mobilisation = {};
    if (!usr.national_modifiers) usr.national_modifiers = {};
    if (!usr.researching) usr.researching = {};
    if (!usr.reserves) usr.reserves = {};
    if (!usr.temporary_modifiers) usr.temporary_modifiers = {};
    if (!usr.trades) usr.trades = {};
    if (!usr.under_construction) usr.under_construction = {};

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
      if (!usr.blockaded_war_exhaustion) usr.blockaded_war_exhaustion = 0;
      if (!usr.city_cap) usr.city_cap = 0;
      if (!usr.city_count) usr.city_count = 0;
      if (!usr.country_age) usr.country_age = 0;
      if (!usr.highest_tier) usr.highest_tier = 0;
      if (!usr.id) usr.id = user_id;
      if (!usr.infamy_rgo_throughput) usr.infamy_rgo_throughput = 0;
      if (!usr.infamy_production_efficiency) usr.infamy_production_efficiency = 0;
      if (!usr.last_active_turn) usr.last_active_turn = 0;
      if (!usr.last_election) usr.last_election = 0;
      if (!usr.news) usr.news = {};
      if (!usr.political_capital_gain_modifier) usr.political_capital_gain_modifier = 0;
      if (!usr.political_instability_modifier) usr.political_instability_modifier = 0;
      if (!usr.political_reform_desire_modifier) usr.political_reform_desire_modifier = 0;
      if (!usr.previous_option_id) usr.previous_option_id = 0;
      if (!usr.provinces) usr.provinces = 0;
      if (!usr.recent_military_casualties) usr.recent_military_casualties = [];
      if (!usr.recent_civilian_casualties) usr.recent_civilian_casualties = [];
      if (!usr.researched_technologies) usr.researched_technologies = [];
      if (!usr.research_queue) usr.research_queue = [];
      if (!usr.total_cities) usr.total_cities = [];
      if (!usr.triggered_events) usr.triggered_events = {};
      if (!usr.vassal_years) usr.vassal_years = 0;

    //Apply starting kit if not registered [WIP]
    //if (!already_registered) config.starting_kit(user_id);
  }
};
