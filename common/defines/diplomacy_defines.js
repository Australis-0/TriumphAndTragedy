config.defines.diplomacy = {
  //Casus Belli and Wargoals
  justify_wargoal_cost: 75, //Amount of PC needed to justify a wargoal
  justify_wargoal_time: 3, //Base number of turns needed to justify a wargoal

  //Common Diplomatic Defines
  absolute_infamy_limit: 100, //What is the highest infamy can go?
  alliance_alert_id: "alliance_proposal", //What alert should popup when an alliance is proposed?
  alliance_break_alert_id: "alliance_broken", //What alert should popup when an alliance is broken?
  alliance_relation_threshold: 75, //How high should relations need to be before one can propose an alliance?
  annex_alert_id: "the_coming_integration", //Which alert should be printed out when an annexation request is declared?
  call_to_arms_alert_id: "call_to_arms", //Which alert should be triggered when a call to arms is made?
  guarantee_alert_id: "the_promise_we_made", //Which alert should popup to call in guarantors when a war breaks out?
  infamy_annex_cost: 3, //How much infamy should an annexation request cost?
  infamy_liberation: -5, //How much infamy should overlords lose from liberating a vassal state?
  infamy_limit: 20, //Total infamy before containment CB kicks in, and bad effects
  infamy_loss: -0.05, //Per turn
  infamy_vassal_invite_player: -2, //Infamy loss for inviting the first player onto a vassal country (assuming they accept)
  infamy_vassal_kick_player: 2.5, //Infamy for kicking a player off a client state
  infamy_vassal_province_transfer: 0.50, //Infamy scaling for transferring provinces to vassals
  liberation_alert_id: "we_are_free", //What alert should popup when a vassal is voluntarily liberated by its overlord?
  military_access_cancellation_alert_id: "access_cancelled", //Which alert should popup when military access to another country is cancelled?
  military_access_request_alert_id: "other_armies_our_soil", //Which alert should popup for the target user when military access is being requested of them?
  non_aggression_pact_request_alert_id: "a_guaranteed_peace", //Which alert should popup when a user is requesting a non-aggression pact?
  peace_offer_alert_id: "an_offer_to_lay_down_arms", //Which alert should popup when a user is asked to accept peace terms?
  peacetime_blockade_penalty: 5, //How much infamy should a nation-state get if they blockade another country during peacetime?
  proclaim_guarantee_alert_id: "a_guarantee_for_our_nation", //What alert should popup for the target user when someone is guaranteeing their independence?
  relation_change_speed: 10, //Maximum amount relations can change by per turn
  revoke_guarantee_alert_id: "guarantee_broken", //What alert should popup when a guarantee of independence is revoked?
  rival_cancellation_alert_id: "the_coming_thaw", //Determines which alert should be triggered when rivals seek mutual reconciliation
  rival_declaration_alert_id: "rival_declared", //Determines which alert should be triggered for the target nation when a rivalry begins
  rival_relations_threshold: 50, //How high is too high in terms of relations for countries to be rivals?
  unconditional_peace_alert_id: "the_national_disaster", //What is the alert that should popup when a user must accept an unconditional peace?
  vassalisation_request_alert_id: "the_option_to_submit", //What alert should be sent to the target of a vassalisation request?
  vassal_maintenance_cost: 0.2, //What is the factor by which vassals should cost PC?
  war_leader_bid_strength: 0.8, //What share of military strength compared to the current war leader is necessary for a country to take it over?

  //Diplomatic Actions
  improve_relations_cost: 50, //Amount of PC needed to improve relations
  decrease_relations_cost: 25, //Amount of PC needed to decrease relations

  annex_cost: 150, //Amount of PC needed to attempt annexation
  break_alliance_cost: 50, //PC cost for breaking an alliance
  declare_rival_cost: 50, //PC cost for declaring a rival
  form_alliance_cost: 50, //PC cost for forming an alliance
  guarantee_independence_cost: 30, //PC cost for guaranteeing independence
  request_military_access_cost: 25, //PC cost for requesting military access
  sign_non_aggression_pact_cost: 25, //PC cost for signing non-aggression pact
  vassalise_cost: 75, //Amount of PC needed to attempt vassalisation
  war_leader_bid_cost: 50, //Amount of PC needed to attempt to become the war leader
  war_leader_bid_penalty_cost: 50, //PC penalty per war leader change in a conflict

  //Rivalries
  rival_slots: 2, //Base amount of rival slots made available to a country at game start
  cede_city_limit: 1, //Amount of provinces containing cities that can be ceded per turn. Counts towards cede_province_limit.
  cede_province_limit: 10, //Amount of provinces that can be ceded per turn
};
