config.defines.diplomacy = {
  //Casus Belli and Wargoals
  justify_wargoal_cost: 75, //Amount of PC needed to justify a wargoal
  justify_wargoal_time: 3, //Base number of turns needed to justify a wargoal

  //Common Diplomatic Defines
  alliance_alert_id: "alliance_proposal",
  alliance_relation_threshold: 75, //How high should relations need to be before one can propose an alliance?

  //Diplomatic Actions
  improve_relations_cost: 50, //Amount of PC needed to improve relations
  decrease_relations_cost: 25, //Amount of PC needed to decrease relations

  vassalise_cost: 75, //Amount of PC needed to attempt vassalisation
  annex_cost: 150, //Amount of PC needed to attempt annexation
  form_alliance_cost: 50, //PC cost for forming an alliance
  break_alliance_cost: 50, //PC cost for breaking an alliance
  declare_rival_cost: 50, //PC cost for declaring a rival
  guarantee_independence_cost: 30, //PC cost for guaranteeing independence
  request_military_access_cost: 25, //PC cost for requesting military access
  sign_non_aggression_pact_cost: 25, //PC cost for signing non-aggression pact

  //Rivalries
  rival_slots: 2, //Base amount of rival slots made available to a country at game start
  cede_city_limit: 1, //Amount of provinces containing cities that can be ceded per turn. Counts towards cede_province_limit.
  cede_province_limit: 10, //Amount of provinces that can be ceded per turn
};
