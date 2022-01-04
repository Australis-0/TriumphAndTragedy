config.defines.diplomacy = {
  //Casus Belli and Wargoals
  justify_wargoal_cost: 75, //Amount of PC needed to justify a wargoal
  justify_wargoal_time: 3, //Base number of turns needed to justify a wargoal

  //Common Diplomatic Defines
  absolute_infamy_limit: 15, //What is the highest infamy can go?
  alliance_alert_id: "alliance_proposal", //What alert should popup when an alliance is proposed?
  alliance_break_alert_id: "alliance_broken", //What alert should popup when an alliance is broken?
  alliance_relation_threshold: 75, //How high should relations need to be before one can propose an alliance?
  infamy_limit: 8, //Total infamy before containment CB kicks in, and bad effects
  infamy_loss: -0.05, //Per turn
  liberation_alert_id: "we_are_free", //What alert should popup when a vassal is voluntarily liberated by its overlord?
  military_access_cancellation_alert_id: "access_cancelled", //Which alert should popup when military access to another country is cancelled?
  military_access_request_alert_id: "other_armies_our_soil", //Which alert should popup for the target user when military access is being requested of them?
  non_aggression_pact_request_alert_id: "a_guaranteed_peace", //Which alert should popup when a user is requesting a non-aggression pact?
  proclaim_guarantee_alert_id: "a_guarantee_for_our_nation", //What alert should popup for the target user when someone is guaranteeing their independence?
  relation_change_speed: 10, //Maximum amount relations can change by per turn
  revoke_guarantee_alert_id: "guarantee_broken", //What alert should popup when a guarantee of independence is revoked?
  rival_cancellation_alert_id: "the_coming_thaw", //Determines which alert should be triggered when rivals seek mutual reconciliation
  rival_declaration_alert_id: "rival_declared", //Determines which alert should be triggered for the target nation when a rivalry begins
  rival_relations_threshold: 50, //How high is too high in terms of relations for countries to be rivals?
  vassalisation_request_alert_id: "the_option_to_submit", //What alert should be sent to the target of a vassalisation request?
  vassal_maintenance_cost: 0.2, //What is the factor by which vassals should cost PC?

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
