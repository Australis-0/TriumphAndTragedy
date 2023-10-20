//Naval Technology
config.technology.naval_technology = {
  privateering: {
    name: "Privateering",
    icon: "taxes",
    description: "By subsidising our naval income with the loot managed to be scraped off of merchant ships via piracy, and the contracts of naval mercenaries, we can bolster our naval effectiveness ... at a price in infamy, of course.",
    research_cost: 20,
    year: 1533,
    unlocks: {
      tax_efficiency: 0.02,
      infamy_loss: 0.01
    }
  },
  the_caravel: {
    name: "The Caravel",
    icon: "paper",
    description: "Through the development of the triangular sail, the Caravel was one of the first vessels capable of beating upwind, allowing it to travel against the currents of the air and increasingly long distances overseas.",
    research_cost: 20,
    year: 1451,
    unlocks: {
      unlock_building: "dockyards",
      unlock_unit: "caravels",
      colonist_travel_speed: 0.25
    }
  },

  improved_astrolabe: {
    name: "Improved Astrolabe",
    icon: "globe",
    description: "An improved astrolabe will allow our sailors to travel faster at sea and with more precision as improvements in cartography make life easier for mariners.",
    prerequisite_techs: ["the_caravel"],
    research_cost: 50,
    year: 1420,
    unlocks: {
      tax_efficiency: 0.05,
      shipment_time: -0.05
    }
  },
  maritime_cartography: {
    name: "Maritime Cartography",
    icon: "old_map",
    description: "By viewing maps less as pieces of art, and more as navigational instruments, we can help ensure that great care is taken in accurately portraying the discoveries of our explorers, leading to a more reliable voyage for both civilian and military naval traffic.",
    prerequisite_techs: ["the_caravel"],
    research_cost: 50,
    year: 1569,
    unlocks: {
      colonist_travel_speed: 0.50,
      naval_dp: 0.05,
      shipment_time: -0.05,
      unlock_building: "trade_depots"
    }
  },

  backstaff: {
    name: "Backstaff",
    icon: "old_map",
    description: "The backstaff was a navigational instrument that allowed for more accurate observations of solar altitudes, enabling more accurate astrolabe readings.",
    prerequisite_techs: ["improved_astrolabe", "maritime_cartography"],
    research_cost: 75,
    year: 1594,
    unlocks: {
      maximum_expeditions: 1
    }
  },
  the_galleon: {
    name: "The Galleon",
    icon: "naval_units",
    description: "With multiple decks outfitted for cannons, and three or more masts being carried per ship, the galleon quickly became the mainstay of European continental navies, before purpose-built men-of-war were commissioned for European fleets.",
    prerequisite_techs: ["improved_astrolabe", "maritime_cartography"],
    research_cost: 75,
    year: 1534,
    unlocks: {
      unlock_unit: "galleons",
      shipment_time: -0.05
    }
  },

  trading_ports: {
    name: "Trading Ports",
    icon: "trade",
    description: "By establishing and securing ports of trade in foreign lands, we can ensure that our trade is regularly protected and that more shipments can flow between us and any potential colonies.",
    prerequisite_techs: ["improved_astrolabe", "maritime_cartography"],
    research_cost: 100,
    year: 1505,
    unlocks: {
      tax_efficiency: 0.05,
      unlock_building: ["clove_plantations", "palm_oil_plantations", "spice_plantations", "trade_offices", "warehouses"]
    }
  },
  circumnavigation: {
    name: "Circumnavigation",
    icon: "globe",
    description: "Circumnavigating the globe will not only help boost our national prestige, but will enable us to conduct studies of far-away lands and bring back exotic flora and fauna for research.",
    prerequisite_techs: ["the_galleon"],
    research_cost: 100,
    year: 1519,
    unlocks: {
      colonist_travel_speed: 0.25,
      army_travel_speed: 0.05,
      research_efficiency: 0.10,
      shipment_time: -0.05
    }
  },
  armed_merchants: {
    name: "Armed Merchants",
    icon: "artillery",
    description: "Through arming our merchants to the teeth, we can protect our civilian traffic fleet from piracy attacks and privateering from foreign powers.",
    prerequisite_techs: ["trading_ports", "circumnavigation"],
    research_cost: 150,
    year: 1600,
    unlocks: {
      unlock_building: "whaling_stations",
      tax_efficiency: 0.05,
      shipment_time: -0.10
    }
  },

  fleet_in_being: {
    name: "Fleet-in-Being",
    icon: "artillery",
    description: "When put at a disadvantage, we should always afford ourselves the option to hole our fleet up in port so as to always be able to counter the enemy and present a constant threat by drawing their naval resources thin.",
    prerequisite_techs: ["trading_ports", "circumnavigation"],
    research_cost: 200,
    year: 1690,
    unlocks: {
      unlock_building: ["coastal_defences", "naval_bases"],
      naval_ap: 0.10
    }
  },

  impressment: {
    name: "Impressment",
    icon: "taxes",
    description: "By forcing sailors into our navy, we can bolster our manpower and reduce naval training costs, although it may come at a slight cost in stability.",
    prerequisite_techs: ["fleet_in_being"],
    research_cost: 250,
    year: 1664,
    unlocks: {
      unlock_building: "impressment_offices",
      national_manpower: 0.02,
      unit_cost: -0.10,
      training_cost: -0.10,
      stability_modifier: -0.05
    }
  },
  men_of_war: {
    name: "Men-of-War",
    icon: "taxes",
    description: "Men-of-war, outfitted with square rigging and three decks of cannons have increasingly become the premier ships in naval warfare, capable of projecting power across the world. Although expensive, they wield a significant advantage in battle ...",
    prerequisite_techs: ["fleet_in_being"],
    research_cost: 250,
    year: 1580,
    unlocks: {
      unlock_unit: "men_of_war",
      tax_efficiency: -0.05
    }
  },
  mercantile_fleet: {
    name: "Mercantile Fleet",
    icon: "taxes",
    description: "The formation of a centralised mercantile fleet can help boost trade incomes and offer protection from privateers and other pirates, ensuring a relatively sounder investment for the risky prospect that is navigation on the high seas.",
    prerequisite_techs: ["fleet_in_being"],
    research_cost: 250,
    year: 1600,
    unlocks: {
      tax_efficiency: 0.05,
      shipment_time: -0.04
    }
  },
  naval_administration: {
    name: "Naval Administration",
    icon: "development",
    description: "By affording ourselves increased anchorage capacity and dockyards, we can continue to produce ships at a faster rate, provided that the steady flow of resources continues trickling in ...",
    prerequisite_techs: ["impressment"],
    research_cost: 350,
    year: 1546,
    unlocks: {
      dockyards: 1
    }
  },

  naval_autonomy: {
    name: "Naval Autonomy",
    icon: "old_scroll",
    description: "To cement full control over the riches of the New World and Cathay will take a strong navy, one that must be separated from the army as its duties, disciplines and traditions grow ever more distant, allowing for more effective command and administration.",
    prerequisite_techs: ["naval_administration"],
    research_cost: 500,
    year: 1606,
    unlocks: {
      military_buildings: 1,
      naval_ap: 0.05,
      naval_dp: 0.05
    }
  },
  standards_of_ordnance: {
    name: "Standards of Ordnance",
    icon: "coal",
    description: "Standardising the different weights and sizes of ordnance to be brought into cannons could have a huge impact on the battlefield as our cannons can now fire more reliably and safely than before. In addition, logistical burdens will be decreased as ironsmiths will have a more concrete idea of what types of projectiles to make.",
    prerequisite_techs: ["naval_administration"],
    research_cost: 500,
    unlocks: {
      naval_ap: 0.10,
      unit_cost: -0.05
    }
  },
  reflecting_quadrant: {
    name: "Reflecting Quadrant",
    icon: "globe",
    description: "The reflecting quadrant was an important tool of navigation that enabled more effective starsighting, thereby enabling captains to jot down accurate measurements of their current latitude.",
    prerequisite_techs: ["mercantile_fleet"],
    research_cost: 500,
    year: 1618,
    unlocks: {
      colonist_travel_speed: 0.50,
      shipment_time: -0.05
    }
  },

  ships_of_the_line: {
    name: "Ships-of-the-Line",
    icon: "naval_units",
    description: "Ships of the line were diversified naval warships that formed the bulk of European continental navies, and were divided into class based on the number of decks each ship held.",
    prerequisite_techs: ["standards_of_ordnance", "men_of_war"],
    research_cost: 650,
    year: 1650,
    unlocks: {
      unlock_unit: "ships_of_the_line",
      obsolete_unit: ["galleons", "caravels"]
    }
  },
  naval_charting: {
    name: "Naval Charting",
    icon: "old_map",
    description: "Naval charts specialising in bathymetry will help merchants and captains alike to avoid the environmental dangers posed by certain areas.",
    prerequisite_techs: ["reflecting_quadrant"],
    research_cost: 650,
    year: 1665,
    unlocks: {
      colonist_travel_speed: 0.75,
      shipment_time: -0.05
    }
  },

  global_operations: {
    name: "Global Operations",
    icon: "naval_units",
    description: "Ships of the line were diversified naval warships that formed the bulk of European continental navies, and were divided into class based on the number of decks each ship held.",
    prerequisite_techs: ["naval_autonomy"],
    research_cost: 750,
    year: 1701,
    unlocks: {
      dockyards: 1,
      colonist_travel_speed: 0.50
    }
  },
  sextant: {
    name: "Sextant",
    icon: "steel",
    description: "The sextant, first invented in the early 18th century, was a reflective device purpose built for the measurement of angular distance between stellar objects. It can be used to estimate both latitude and longitude, albeit not precisely until the advent of the chronometer.",
    prerequisite_techs: ["ships_of_the_line", "naval_charting"],
    research_cost: 750,
    year: 1731,
    unlocks: {
      shipment_time: -0.05,
      colonist_travel_speed: 0.25
    }
  },

  naval_blockades: {
    name: "Naval Blockades",
    icon: "blockade",
    description: "Although we have not had the capability to enforce this on such a total scale until recently, a naval blockade in theory has existed for a long time, referring to the cutting off of an entire belligerent nation from sources of trade using a naval fleet. Although the logistical costs are immense, so too can the rewards ...",
    prerequisite_techs: ["global_operations"],
    research_cost: 900,
    year: 1754,
    unlocks: {
      enable_blockades: true,
      war_exhaustion_rate: 0.02,
      tax_efficiency: -0.05
    }
  },
  copper_plating: {
    name: "Copper Plating",
    icon: "copper",
    description: "By both waterproofing our ships' hulls with tar, and plating them in copper, we can help prevent rotting wood whilst also obsoleting enemy ramming as they can no longer simply ram through metal as they could with wood. Although, unit cost will invariably rise ...",
    prerequisite_techs: ["sextant"],
    research_cost: 900,
    year: 1778,
    unlocks: {
      naval_dp: 0.10,
      unit_cost: 0.05
    }
  },
  square_rigging: {
    name: "Square Rigging",
    icon: "paper",
    prerequisite_techs: ["sextant"],
    research_cost: 900,
    year: 1750,
    unlocks: {
      colonist_travel_speed: 0.75,
      shipment_time: -0.05,
      training_cost: 0.05
    }
  },

  amphibious_descent: {
    name: "Amphibious Descent",
    icon: "soldiers",
    description: "The purpose of the amphibious descent, or rather amphibious landing, as it is in modern parlance, is to secure the enemy's port facilities in and around a concentrated area so as to be able to secure further shipments of troops.",
    prerequisite_techs: ["naval_blockades"],
    research_cost: 1000,
    year: 1754,
    unlocks: {
      naval_ap: 0.10
    }
  },
  naval_carronade: {
    name: "Naval Carronade",
    icon: "artillery",
    description: "A naval carronade is a light artillery piece meant for transport aboard merchant ships that can be pulled out in times of battle. It became popular during the American War of Independence, and was used throughout the later part of 18th and early 19th centuries.",
    prerequisite_techs: ["standards_of_ordnance"],
    research_cost: 1000,
    year: 1750,
    unlocks: {
      naval_dp: 0.05
    }
  },
  first_rate: {
    name: "First Rate",
    icon: "naval_units",
    description: "A first-rate was the largest type of man-of-war available, capable of carrying up to a hundred guns. Although expensive, they revolutionised the naval battlefield when first launched.",
    prerequisite_techs: ["copper_plating"],
    research_cost: 1000,
    year: 1770,
    unlocks: {
      unlock_unit: "first_rate",
      army_upkeep: 0.05
    }
  },
  discovery_of_magnetic_variation: {
    name: "Discovery of Magnetic Variation",
    icon: "old_scroll",
    description: "The discovery of magnetic variation enabled compass readings to be taken more accurately, with seafarers now realising a difference between true north and magnetic north.",
    prerequisite_techs: ["square_rigging"],
    research_cost: 1000,
    year: 1634,
    unlocks: {
      shipment_time: -0.05
    }
  },

  thirtysix_pounder_long_gun: {
    name: "36-pounder Long Gun",
    icon: "artillery",
    description: "The 36-pounder long-gun was amongst the heaviest artillery pieces carried on seafaring vessels, capable of shore bombardment and naval support of amphibious landings.",
    prerequisite_techs: ["naval_carronade"],
    research_cost: 1200,
    year: 1702,
    unlocks: {
      naval_ap: 0.05
    }
  },
  frigates: {
    name: "Frigates",
    icon: "naval_units",
    description: "Frigates are lower-tier capital ships meant to protect oceangoing trade and military vessels from unconventional attacks. They can also be used in supporting roles.",
    prerequisite_techs: ["first_rate"],
    research_cost: 1200,
    year: 1740,
    unlocks: {
      unlock_unit: "frigates"
    }
  },
  marine_chronometer: {
    name: "Marine Chronometer",
    icon: "government",
    description: "Marine chronometers are devices capable of accurately measuring time, and therefore capable of deducing longitudinal meridians necessary to navigation.",
    prerequisite_techs: ["discovery_of_magnetic_variation"],
    research_cost: 1200,
    year: 1761,
    unlocks: {
      colonist_travel_speed: 0.25,
      shipment_time: -0.05
    }
  },

  naval_doctrine: {
    name: "Naval Doctrine",
    icon: "naval_units",
    description: "By creating official protocols by which our navy should abide and adopting tactics into field manuals, our admirals can be better suited to naval warfare when encountering enemies.",
    prerequisite_techs: ["amphibious_descent"],
    research_cost: 1400,
    year: 1754,
    unlocks: {
      training_cost: -0.10,
      unit_cost: -0.05
    }
  },
  primitive_submarines: {
    name: "Primitive Submarines",
    icon: "naval_units",
    description: "Although no one sure likes being cooped up in a barrel of death that may or may not be rapidly running out of oxygen, submarines of the future may help provide new ways of transforming the naval arena ...",
    prerequisite_techs: ["thirtysix_pounder_long_gun"],
    research_cost: 1400,
    year: 1776,
    custom_effect_description: "This will lead to further advances in naval technology ..."
  },
  paddle_wheel: {
    name: "Paddle Wheel",
    icon: "steel",
    description: "The paddle wheel was a method of propulsion for steamers relying on rotational motion to push forwards a ship. Despite its inherent inefficiencies, it continued being used up until the invention of the propeller.",
    prerequisite_techs: ["marine_chronometer"],
    research_cost: 1400,
    year: 1810,
    unlocks: {
      shipment_time: -0.05
    }
  },

  blockade_running: {
    name: "Blockade Running",
    icon: "infamy",
    description: "Although risky, during times of war, civilian merchant steamers could be used to run blockades, even under neutral banners. This way, we can ensure lower war exhaustion as food shipments, though minimal, may continue.",
    prerequisite_techs: ["naval_doctrine"],
    research_cost: 1600,
    year: 1812,
    unlocks: {
      war_exhaustion_rate: -0.04
    }
  },
  twentyfour_pounder_long_gun: {
    name: "24-pounder Long Gun",
    icon: "artillery",
    description: "The 24-pounder long gun was a piece of naval artillery of medium calibre, typically used for naval combat. It became a mainstay of lighter capital ships before the introduction of rotational turrets.",
    prerequisite_techs: ["primitive_submarines"],
    research_cost: 1600,
    year: 1772,
    unlocks: {
      naval_ap: 0.05
    }
  },
  steamboat: {
    name: "Steamboat",
    icon: "naval_units",
    description: "The first ship to rely completely on steam power, the steamboat used coal as its main means of propulsion, and no longer relied on the wind. Although initially invented as a cviilian trade vessel, there is nothing preventing the nations of the world from militarising its use ...",
    prerequisite_techs: ["thirtysix_pounder_long_gun", "frigates", "paddle_wheel"],
    research_cost: 1600,
    year: 1803,
    unlocks: {
      colonist_travel_speed: 1.00,
      unlock_unit: "steamboats"
    }
  },

  clipper_ship: {
    name: "Clipper Ship",
    icon: "naval_units",
    description: "The last great ship of the Age of Sail, clipper ships were used as naval transports and carried several sails, sometimes in combination with a steam engine, in order to maximise speed.",
    prerequisite_techs: ["steamboat"],
    research_cost: 1800,
    year: 1843,
    unlocks: {
      unlock_unit: "clippers"
    }
  },
  organised_salvo: {
    name: "Organised Salvo",
    icon: "naval_units",
    description: "By bringing our naval guns to bear instead of firing ragged volleys, we can unleash a devastating salvo onto a still unsuspecting enemy, leading to the complete destruction of their ship. Although it may take a while to re-arm, it would surely be more effective than our current modus operandi.",
    prerequisite_techs: ["blockade_running", "twentyfour_pounder_long_gun"],
    research_cost: 2000,
    year: 1861,
    unlocks: {
      naval_ap: 0.05,
      naval_dp: 0.02
    }
  },
  increased_firing_range: {
    name: "Increased Firing Range",
    icon: "artillery",
    description: "With the advent of large-calibre artillery being placed on ships, we can increase our firing range beyond what would normally be possible with broadsides from the Age of Sail.",
    prerequisite_techs: ["blockade_running", "twentyfour_pounder_long_gun"],
    research_cost: 2000,
    year: 1862,
    unlocks: {
      naval_ap: 0.05
    }
  },
  precision_cartography: {
    name: "Precision Cartography",
    icon: "old_map",
    description: "Applying surveying techniques to maritime cartography could result in unparallelled accuracy, even with the storms and waves of the high seas.",
    prerequisite_techs: ["frigates", "paddle_wheel"],
    research_cost: 2000,
    year: 1766,
    unlocks: {
      research_efficiency: 0.03,
      shipment_time: -0.05
    }
  },

  gunboat: {
    name: "Gunboat",
    icon: "naval_units",
    description: "The gunboat is a light ship capable of a high rate of travel, and the first real steamship used exclusively in a military context.",
    prerequisite_techs: ["organised_salvo", "increased_firing_range", "clipper_ship"],
    research_cost: 2500,
    year: 1844,
    unlocks: {
      unlock_unit: "gunboats"
    }
  },
  international_standard_of_maritime_flags: {
    name: "International Standard of Maritime Flags",
    icon: "infamy",
    description: "Through creating an international standard of maritime flags for communication, we can ensure that distress signals can be properly conveyed, and that accidental sinkings in times of war are reduced.",
    prerequisite_techs: ["precision_cartography"],
    research_cost: 2500,
    year: 1857,
    unlocks: {
      tax_efficiency: 0.05
    }
  },

  crossing_the_t: {
    name: "'Crossing the T'",
    icon: "iron",
    description: "Crossing the T is a naval tactic that allows us to position a ship in favour to an enemy belligerent's, by exposing our entire side, whereas only the bow or the rear of the enemy is exposed. Thereby, we can fire an entire broadside, whereas the enemy is only capable of firing their frontal guns.",
    prerequisite_techs: ["organised_salvo", "increased_firing_range"],
    research_cost: 3000,
    year: 1905,
    unlocks: {
      naval_ap: 0.03
    }
  },
  casemates: {
    name: "Casemates",
    icon: "artillery_piece",
    description: "Casemates are protective fortifications for artillery that lessen the vulnerabilities of the gunners inside.",
    prerequisite_techs: ["increased_firing_range"],
    research_cost: 3000,
    year: 1862,
    unlocks: {
      naval_dp: 0.05
    }
  },
  ironclads: {
    name: "Ironclads",
    icon: "naval_units",
    description: "Ironclads are heavy ships-of-the-line that immediately obsoleted ships with wooden hulls, as they were impervious to traditional cannons with their sloped armour.",
    prerequisite_techs: ["gunboat"],
    research_cost: 3000,
    year: 1859,
    unlocks: {
      unlock_unit: "ironclads",
      obsolete_unit: ["clippers", "steamboats", "frigates", "first_rate", "ships_of_the_line", "men_of_war"]
    }
  },

  rotational_turrets: {
    name: "Rotational Turrets",
    icon: "artillery_piece",
    description: "Rotational turrets, fitted into position by gravity, help to increase the various coverage provided by a single gun, allowing for guns of huge calibre as opposed to traditional cannons, which were locked into place.",
    prerequisite_techs: ["casemates"],
    research_cost: 3500,
    year: 1861,
    unlocks: {
      naval_ap: 0.10
    }
  },
  breastwork_monitor: {
    name: "Breastwork Monitor",
    icon: "naval_units",
    description: "The breastwork monitor was an advanced ironclad fitted with rotational turrets. Although initial monitors benefitted from a low profile, as they could not easily be shot at, it also enabled ocean currents to sweep onto the ship and potentially find its way into the hull through openings on its deck. By adding a breastwork to ring the ship, these vulnerabilities can be reduced, as the water would have to splash over the breastworks instead.",
    prerequisite_techs: ["ironclads"],
    research_cost: 3500,
    year: 1861,
    unlocks: {
      unlock_unit: "breastwork_monitors"
    }
  },

  naval_mines: {
    name: "Naval Mines",
    icon: "coal",
    description: "Naval mines, in contrast to fire ships, are a safer way to keep our seas protected, as well as to lay down blockade zones as they can pose a constant hazard even without the active presence of other ships.",
    prerequisite_techs: ["rotational_turrets"],
    research_cost: 4000,
    year: 1854,
    unlocks: {
      army_upkeep: -0.05,
      war_exhaustion_rate: 0.01
    }
  },
  cruisers: {
    name: "Cruisers",
    icon: "naval_units",
    description: "Cruisers are large capital ships tasked with guarding the waters surrounding a primary ship, and sometimes operate independently as flagships on certain missions.",
    prerequisite_techs: ["crossing_the_t", "breastwork_monitor"],
    research_cost: 4000,
    year: 1874,
    unlocks: {
      unlock_unit: "cruisers"
    }
  },
  destroyers: {
    name: "Destroyers",
    icon: "naval_units",
    description: "Destroyers are light escort ships capable of conducting anti-submarine warfare and duties.",
    prerequisite_techs: ["rotational_turrets", "breastwork_monitor"],
    research_cost: 4000,
    year: 1879,
    unlocks: {
      unlock_unit: "destroyers"
    }
  },
  
  torpedo: {
    name: "Torpedo",
    icon: "coal",
    description: "Although the inaccuracies regarding the torpedo and its inherent disadvantages are many, by ironing out some of the more extreme ones (e.g. the circular torpedo), we can introduce it into service for certain naval craft.",
    prerequisite_techs: ["naval_mines"],
    research_cost: 4500,
    year: 1866,
    unlocks: {
      naval_ap: 0.02
    }
  },
  pre_dreadnought: {
    name: "Pre-Dreadnought",
    icon: "naval_units",
    description: "Pre-dreadnoughts, the first true battleships of the modern age made up the capital ships of the premier powers of the world before the invention of the dreadnought, which immediately rendered it obsolete outside of secondary duties.",
    prerequisite_techs: ["cruisers"],
    research_cost: 4500,
    unlocks: {
      unlock_unit: "pre_dreadnoughts"
    }
  },
  wireless_telegraphy: {
    name: "Wireless Telegraphy",
    icon: "building",
    description: "Wireless telegraphy allowed ships at sea to communicate instantaneously over radio for the first time, saving them from accidents, and helping to coordinate manoeuvres.",
    prerequisite_techs: ["international_standard_of_maritime_flags"],
    research_cost: 4500,
    year: 1910,
    unlocks: {
      colonist_travel_speed: -0.10,
      shipment_time: -0.05
    }
  },

  naval_bombardment: {
    name: "Naval Bombardment",
    icon: "infamy",
    description: "Naval bombardment, whilst expensive, can suppress an enemy on the coast if sustained, allowing us to take the area with minimal casualties, ideally.",
    prerequisite_techs: ["crossing_the_t", "rotational_turrets"],
    research_cost: 5000,
    year: 1914,
    unlocks: {
      naval_ap: 0.05
    }
  },
  torpedo_boats: {
    name: "Torpedo Boats",
    icon: "naval_units",
    description: "Torpedo boats are fast and nimble ships capable of launching torpedoes at heavier armoured targets in the hopes of sinking them.",
    prerequisite_techs: ["torpedo"],
    research_cost: 5000,
    year: 1900,
    unlocks: {
      unlock_unit: "torpedo_boats"
    }
  },
  dreadnought: {
    name: "Dreadnought",
    icon: "naval_units",
    description: "The Dreadnought, a true behemoth of the sea, immediately outclassed every other ship that came before it, similar to the ironclad. From that point on, they were relegated to secondary naval duties.",
    prerequisite_techs: ["pre_dreadnought", "wireless_telegraphy"],
    research_cost: 5000,
    year: 1906,
    unlocks: {
      unlock_unit: "dreadnoughts",
      obsolete_unit: ["breastwork_monitors", "ironclads", "gunboats", "clippers", "steamboats", "pre_dreadnoughts"]
    }
  },

  convoy_interception: {
    name: "Convoy Interception",
    icon: "trade",
    description: "By allowing for trade interdiction, we can intercept and sink merchant shipping from underneath the high seas, allowing for a decisive edge over our opponent, even if they hold a monopoly over the surface.",
    prerequisite_techs: ["naval_bombardment"],
    research_cost: 5500,
    year: 1914,
    unlocks: {
      naval_ap: 0.05
    }
  },
  torpedo_guidance_systems: {
    name: "Torpedo Guidance Systems",
    icon: "government",
    description: "Through improving the reliability of torpedoes and allowing an independent guidance system, we can ensure that they will remain steady on course to the target once launched from a submarine, before detonating beneath the ship.",
    prerequisite_techs: ["torpedo_boats"],
    research_cost: 5500,
    year: 1915,
    custom_effect_description: "This will lead to further advancements regarding submarine warfare ..."
  },
  battlecruisers: {
    name: "Battlecruisers",
    icon: "naval_units",
    description: "Battlecruisers, with the armament of a battleship, and the armour of a cruiser, are capital ships that attempt to both improve manoeuvrability and maintain speed.",
    prerequisite_techs: ["dreadnought"],
    research_cost: 5500,
    year: 1896,
    unlocks: {
      unlock_unit: "battlecruisers"
    }
  },
  wireless_radio: {
    name: "Wireless Radio",
    icon: "old_scroll",
    description: "Wireless radio, a step forwards from mere telegraphy, will allow auditory messages to be sent to nearby ships in the vicinity, allowing for improved and faster communication.",
    prerequisite_techs: ["wireless_telegraphy"],
    research_cost: 5500,
    year: 1894,
    unlocks: {
      shipment_time: -0.03
    }
  },

  naval_catapults: {
    name: "Naval Catapults",
    icon: "aeroplanes",
    description: "Naval catapults are mechanisms that allow for the takeoff of aeroplanes from battleships, helping to improve air coverage.",
    prerequisite_techs: ["torpedo_guidance_systems", "battlecruisers"],
    research_cost: 6000,
    year: 1912,
    custom_effect_description: "This will lead to further developments in naval aviation ..."
  },
  submarines: {
    name: "Submarines",
    icon: "naval_units",
    description: "Submarines, ever present beneath the surface offer a completely new method of conducting naval warfare by starving out an opponent through sinking merchant shipping. Although sometimes frowned upon as not precisely ethical, its practical abilities are nearly limitless.",
    research_cost: 6000,
    prerequisite_techs: ["torpedo_guidance_systems", "battlecruisers"],
    unlocks: {
      unlock_unit: "submarines",
      obsolete_unit: "torpedo_boats"
    }
  },
  electric_signalling: {
    name: "Electric Signalling",
    icon: "technology",
    description: "Electric signalling, although initially conceived as a means of last resort, can help reduce the dangers faced by ships at night, and allow ships to see nearby vessels and emergencies.",
    prerequisite_techs: ["wireless_radio"],
    research_cost: 6000,
    year: 1918,
    unlocks: {
      shipment_time: -0.03
    }
  },

  modern_arresting_gear: {
    name: "Modern Arresting Gear",
    icon: "aeroplanes",
    description: "By stopping aeroplanes with a strong steel cord, we can reduce the possibilities of pilots crashing overboard, and reduce aeroplane losses at sea, ultimately driving down unit and training costs.",
    prerequisite_techs: ["naval_catapults", "electric_signalling"],
    research_cost: 6500,
    year: 1931,
    unlocks: {
      army_upkeep: -0.02,
      training_cost: -0.05
    }
  },
  aircarrier: {
    name: "Aircarrier",
    icon: "naval_units",
    description: "The air carrier is a virtual hangar at sea that allows us to take off and land aeroplanes, allowing us to project the power of air into conflict zones by sea where it might not otherwise be possible.",
    prerequisite_techs: ["naval_catapults", "submarines", "electric_signalling"],
    research_cost: 6500,
    year: 1920,
    unlocks: {
      unlock_unit: "air_carriers"
    }
  },

  naval_logistics: {
    name: "Naval Logistics",
    icon: "trade",
    description: "Naval logistics is the concept by which certain storages of food and other provisions aboard ships should be taken into account, as well as facilities for repair.",
    prerequisite_techs: ["convoy_interception"],
    research_cost: 7000,
    year: 1930,
    unlocks: {
      army_upkeep: -0.10,
      dockyards: 1
    }
  },
  battleship: {
    name: "Battleship",
    icon: "naval_units",
    description: "The battleship, the successor to the dreadnought, was by far the heaviest capital unit type to ever be created. They featured huge guns capable of shooting dozens of kilometres either inland or at other oceangoing targets. They died with the sinking of the Prince of Wales and Repulse, as well as Pearl Harbour. They were gradually phased out, and by the end of the Cold War, none remained in active service.",
    prerequisite_techs: ["aircarrier"],
    research_cost: 7000,
    year: 1936,
    unlocks: {
      unlock_unit: "battleships",
      obsolete_unit: "dreadnoughts"
    }
  },

  strike_force: {
    name: "Strike Force",
    icon: "old_map",
    description: "By maintaining a concentrated mass of ships centred around a flagship, we can project naval power into any conflict zone, although it might take a matter of months before such a capability is possible.",
    prerequisite_techs: ["naval_logistics"],
    research_cost: 7500,
    year: 1941,
    unlocks: {
      naval_ap: 0.05
    }
  },
  torpedo_bombers: {
    name: "Torpedo Bombers",
    icon: "aeroplanes",
    description: "Torpedo bombers are aeroplanes that maintain low altitude in order to drop a torpedo, which can then head towards a moving target. They are typically fast and nimble, but are liable to be shot down by ack-ack.",
    prerequisite_techs: ["modern_arresting_gear", "battleship"],
    research_cost: 7500,
    year: 1927,
    unlocks: {
      unlock_unit: "torpedo_bombers"
    }
  },
  aircraft_carrier: {
    name: "Aircraft Carrier",
    icon: "aeroplanes",
    description: "The aircraft carrier is quickly becoming the dominant ship on the high seas, and so our nation should take steps to, if not produce one, at least acknowledge the existence of them and attempt to develop tactics to counter their ascendant rise.",
    prerequisite_techs: ["modern_arresting_gear", "battleship"],
    research_cost: 7500,
    year: 1927,
    unlocks: {
      unlock_unit: "aircraft_carriers",
      obsolete_unit: "air_carrier"
    }
  },
  cavity_magnetron_radar: {
    name: "Cavity Magnetron Radar",
    icon: "government",
    description: "The Cavity Magnetron RADAR was a highly capable British radar that was produced in extremely compact sizes during the Second World War. They were put on board ships and aeroplanes, and helped detect incoming enemy aircraft earlier.",
    prerequisite_techs: ["naval_catapults", "battlecruisers"],
    research_cost: 7500,
    year: 1940,
    unlocks: {
      naval_dp: 0.05
    }
  },

  island_hopping: {
    name: "Island Hopping",
    icon: "provinces",
    description: "Island hopping is the tactic of using each consecutive island as a staging ground for invading the next one, in such a manner that eventually whole island chains are taken by friendly forces, helping lower logistical burdens.",
    prerequisite_techs: ["strike_force"],
    research_cost: 8000,
    year: 1942,
    unlocks: {
      naval_ap: 0.05,
      army_upkeep: -0.02
    }
  },
  naval_bombers: {
    name: "Naval Bombers",
    icon: "aeroplanes",
    description: "Naval bombers are aircraft specifically designed for naval combat that are meant to take off of aircraft carriers and relatively short runways. As such, they do not carry large payloads, but are designed instead to drop them over enemy ships.",
    prerequisite_techs: ["strike_force"],
    research_cost: 8000,
    year: 1936,
    unlocks: {
      unlock_unit: "naval_bombers"
    }
  },
  sonar: {
    name: "SONAR",
    icon: "technology",
    description: "SONAR, a mirror of its above-surface counterpart RADAR, is meant to detect submarines and other threats lurking beneath the oceans. They are also used on submarines for both navigation purposes, and for targeting enemy ships and subs.",
    prerequisite_techs: ["cavity_magnetron_radar"],
    research_cost: 8000,
    year: 1918,
    unlocks: {
      naval_dp: 0.05
    }
  },

  aerial_supremacy: {
    name: "Aerial Supremacy",
    icon: "aeroplanes",
    description: "Aerial supremacy, when ingrained as a naval doctrine, believes that aircraft carriers are the key ships around which naval battles pivot, and that aeroplanes should be used as the main weapons of waging naval warfare, and as a means to quickly project power into a conflict.",
    prerequisite_techs: ["island_hopping"],
    research_cost: 8500,
    year: 1942,
    unlocks: {
      naval_ap: 0.05
    }
  },
  slbms: {
    name: "SLBM's",
    icon: "artillery_piece",
    description: "SLBMs, or Submarine Launched Ballistic Missiles in its expanded form, can be launched from underwater, making detection minimal, and allowing us to strike coastal cities within minutes.",
    prerequisite_techs: ["island_hopping"],
    research_cost: 8500,
    year: 1959,
    unlocks: {
      naval_ap: 0.05
    }
  },
  portable_nuclear_reactor: {
    name: "Portable Nuclear Reactor",
    icon: "coal",
    description: "Portable nuclear reactors are capable of generating tremendous amounts of power for sustained durations of time without the need to refuel, unlike conventional diesel generators.",
    prerequisite_techs: ["island_hopping"],
    research_cost: 8500,
    year: 1954,
    unlocks: {
      naval_dp: 0.05
    }
  },

  nuclear_triad: {
    name: "Nuclear Triad",
    icon: "infamy",
    description: "In order to maintain first-strike capability, our nation must first possess the nuclear triad - namely the ability to deliver nuclear warheads to a recipient nation via strategic bombers, nuclear missiles, and nuclear submarines. Of course, we will have to pay for the extra logistical capacity ...",
    prerequisite_techs: ["aerial_supremacy"],
    research_cost: 9000,
    year: 1960,
    unlocks: {
      dockyards: 1,
      army_upkeep: 0.10
    }
  },
  nuclear_submarine: {
    name: "Nuclear Submarine",
    icon: "naval_units",
    description: "The nuclear submarine is a submersible vehicle that can stay underwater on extended missions for months or potentially even years at a time without need to stop for refueling, as it relies completely on nuclear power.",
    prerequisite_techs: ["aerial_supremacy"],
    research_cost: 9000,
    year: 1955,
    unlocks: {
      unlock_unit: "nuclear_submarines"
    }
  },

  organised_taskforces: {
    name: "Organised Taskforces",
    icon: "naval_units",
    description: "By organising our naval strike groups into task forces centred around a single aircraft carrier, we can quickly move additional forces into a conflict zone in a matter of weeks.",
    prerequisite_techs: ["nuclear_triad"],
    research_cost: 9500,
    unlocks: {
      naval_ap: 0.05
    }
  },
  vtol_aircraft: {
    name: "VTOL Aircraft",
    icon: "aeroplanes",
    description: "VTOL Aircraft, standing for Vertical Take-Off and Landing, are aeroplanes capable of taking off vertically from ship decks, specifically aircraft carriers, or lighter vehicles such as escort carriers or helicopter carriers.",
    prerequisite_techs: ["nuclear_triad"],
    research_cost: 9500,
    year: 1967,
    unlocks: {
      aeroplanes_ap: 0.10
    }
  },
  supercarriers: {
    name: "Supercarriers",
    icon: "naval_units",
    description: "Supercarriers are classified as capital ships, although they should be completely distinct from them, as they are the central assets upon which entire countries depend, and have huge carrier capacities.",
    prerequisite_techs: ["slbms", "portable_nuclear_reactor"],
    research_cost: 9500,
    year: 1955,
    unlocks: {
      unlock_unit: "supercarriers",
      obsolete_unit: "battleships"
    }
  },

  modern_cruisers_and_frigates: {
    name: "Modern Cruisers and Frigates",
    icon: "naval_units",
    description: "By modernising the secondary capital ships of our nation, we will be able to bring them up to date to adapt to ever evolving threats posed by foreign nations.",
    prerequisite_techs: ["supercarriers"],
    research_cost: 10000,
    year: 1981,
    unlocks: {
      unlock_unit: ["modern_cruisers", "modern_frigates"]
    }
  },
  electronic_guidance_systems: {
    name: "Electronic Guidance Systems",
    icon: "technology",
    description: "Electronic guidance systems provide a path for naval ordnance and payloads to be delivered more effectively and in a more concise manner than currently possible with traditional rotational turrets.",
    prerequisite_techs: ["supercarriers"],
    research_cost: 10000,
    year: 1967,
    unlocks: {
      naval_ap: 0.10
    }
  },

  modern_naval_doctrine: {
    name: "Modern Naval Doctrine",
    icon: "globe",
    description: "By focusing our navy either on protecting our shoreline, or projecting our power abroad, we can ensure that it remains a flexible force to be reckoned with far into the future.",
    prerequisite_techs: ["organised_taskforces", "modern_cruisers_and_frigates"],
    research_cost: 10500,
    year: 1980,
    unlocks: {
      naval_ap: 0.05
    }
  },
  rc_autocannon: {
    name: "RC Autocannon",
    icon: "artillery_piece",
    description: "RC Autocannon are anti-aircraft chainguns controlled remotely that allow for improved defence against low-flying aircraft.",
    prerequisite_techs: ["modern_cruisers_and_frigates"],
    research_cost: 10500,
    year: 1976,
    unlocks: {
      naval_dp: 0.05
    }
  },

  asymmetric_naval_warfare: {
    name: "Asymmetric Naval Warfare",
    icon: "back_button",
    description: "By learning to deal with enemies of a more unconventional nature on the high seas, we can protect our merchant fleet from resurgent threats and terrorism.",
    prerequisite_techs: ["modern_naval_doctrine"],
    research_cost: 11000,
    unlocks: {
      naval_ap: 0.05
    }
  },
  electromagnetic_propulsion: {
    name: "Electromagnetic Propulsion",
    icon: "artillery_piece",
    description: "Electromagnetic propulsion will allow for future naval units to feature experimental Gauss Guns, which are capable of accelerating kinetic projectiles to fantastic speeds without the need for a visible heat signature.",
    prerequisite_techs: ["rc_autocannon"],
    research_cost: 11000,
    year: 2030,
    unlocks: {
      naval_ap: 0.15
    }
  },
  railgun_cruisers: {
    name: "Railgun Cruisers",
    icon: "naval_units",
    description: "Railgun cruisers are next-generation, state-of-the-art capital ships that can fire hypersonic projectiles capable of reaching speeds of over 3km/s.",
    prerequisite_techs: ["modern_cruisers_and_frigates", "vtol_aircraft", "organised_taskforces"],
    research_cost: 11000,
    year: 2025,
    unlocks: {
      unlock_unit: "railgun_cruisers"
    }
  }
};
