config.defines.combat = {
	anti_aircraft_base_damage: 10000, //How much AP should each AA gun be worth at the start?
	anti_aircraft_building: "ack_ack_guns", //What is the name of the anti-aircraft building?
	anti_aircraft_effectiveness: 1, //How effective should ack-ack be by default? This modifies total AP damage outputted by ack-ack gun buildings
	anti_aircraft_fixed_damage: true, //Should ack-ack damage be fixed or scale with the bomber force?
  base_attrition_rate: 0.10, //What should the base attrition rate be? (percentage)
  base_mobilisation_impact: {
    production_efficiency: -0.30,
    tax_efficiency: -0.25,
    rgo_throughput: -0.10
  }, //Hits to [production_efficiency, tax_efficiency, rgo_throughput]
  base_mobilisation_time: 8, //Amount of turns it should take to fully mobilise
  base_mobilisation_size: 0.05, //Default percentage of worker pops mobilised
  base_supply_limit: 40, //How many thousands of soldiers can a colonised province support by default?
  blockade_challenge_limit: 5, //How many times can a fleet challenge a blockade on the same turn?
	blockade_cooldown: 3, //How many turns should cooldowns in between blockades for the same user be?
	combat_modifiers: ["attack", "defence", "manoeuvre", "movement", "initiative", "range"], //What are the main modifiers/stats for combat units?
	combat_order: ["attack", "defence"], //What should the combat order be by default?
	combat_order_stalemate_tech: "chemical_cannisters", //Which tech should switch the defender and attacker combat order?
	combat_order_switch_tech: "war_of_movement", //What tech should switch the combat order back around?
	cumulative_combat_modifiers: ["attack", "defence"], //Which combat modifiers are cumulative as opposed to per unit?
  infrastructure_range: 3, //What is the radius of provinces that should be affected by constructed infrastructure?
  max_army_creation_limit: 100, //How many armies should users be able to create with a single command? Set to 0 to disable
  max_army_limit: 1000, //What is the maximum amount of armies that a user should be allowed to have? Set to 0 to disable
  mobilisation_cooldown: 3, //Amount of turns before a person can mobilise/demobilise again
  mobilise_unit: "none", //Default unit for mobilisation
	occupation_requirement: 0.005, //What is the percentage of the population a hostile army needs for occupation?
  peacetime_mobilisation_penalty: 0.5, //What should the penalty for peacetime mobilisation be (in infamy)?
	seaplane_bonus: 0.5, //What should the bonus combat modifier whilst at sea be?
	submarine_cooldown: 1, //How many turns should it take for submarines to cooldown from their previous operation? Set to 0 to disable
	unit_upkeep: 1, //How much should 100 units cost per turn?
  war_exhaustion_blockade_limit: 0.20, //What should be the maximum warscore penalty for being blockaded?
  war_exhaustion_blockade_rate: 0.05, //How fast should war exhaustion tick up if user is blockaded?
  war_exhaustion_mobilisation_rate: 0.03, //How fast should war exhaustion tick up if user is mobilised?
  war_exhaustion_tickdown_rate: 0.10, //How fast should war exhaustion tick down if user is not at war?

  //Movement Speed
  colonisation_speed: 2, //Base provinces per turn for colonists
	default_unit_speed: 4.59, //In kmh. Based off Roman marching speeds per hour
  max_colonisation_speed: 25, //Set to 0 to disable, in provinces per turn
  shipment_time: 10, //Transfer speed for shipping goods

  base_transfer_time: 3, //Base turns for all shipments

  //Supply Limit
  access_territory_modifier: 1.5, //(Counts if allied, vassalised, or has military access)
  friendly_territory_modifier: 2, //(Counts only if culture in province is friendly)
  hostile_territory_modifier: 0.5, //Uncolonised territory and enemy land
};
