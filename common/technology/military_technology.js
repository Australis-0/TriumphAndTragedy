//Military Technology
config.technology.military_technology = {
  improved_metallurgy: {
    name: "Improved Metallurgy",
    icon: "lead",
    description: "By increasing the purity and mixture of our compounds and alloys, our craftsmen will be able to forge more powerful weapons as the winds of the Gunpowder Age sweep our continent.",
    research_cost: 20,
    year: 1385,
    unlocks: {
      unlock_building: "artillery_encampments",
      production_efficiency: 0.05,
      artillery_ap: 0.05
    }
  },
  standing_army: {
    name: "Standing Army",
    icon: "manpower",
    description: "The days of calling upon a feudal levee are gone, we should seek to maintain a standing army for our burgeoning state.",
    research_cost: 20,
    year: 1430,
    unlocks: {
      national_manpower: 0.10
    }
  },
  lance_cavalry: {
    name: "Lance Cavalry",
    icon: "soldiers",
    description: "By better equipping our knights with lances, we can wreak devastating havoc when smashing into enemy lines in mass cavalry formations.",
    research_cost: 20,
    year: 1380,
    unlocks: {
      unlock_unit: "lance_cavalry",
      obsolete_unit: "knights",
      training_cost: 0.02
    }
  },
  condottieri: {
    name: "Condottieri",
    icon: "colonisation",
    description: "Condottieri, originating as mercenaries from the Latin Peninsulae, are mercenaries of great renown that can bolster our military quickly in times of war - for a price of course.",
    research_cost: 20,
    year: 1339,
    unlocks: {
      unlock_unit: "condottieri",
      national_manpower: 0.05
    }
  },

  the_bombard: {
    name: "The Bombard",
    icon: "artillery",
    description: "A terrifying new gunpowder weapon, bombards allow us to tear holes in castles and besiege cities with ease.",
    prerequisite_techs: ["improved_metallurgy"],
    research_cost: 50,
    year: 1385,
    unlocks: {
      unlock_unit: "bombard",
      unit_cost: 0.03
    }
  },
  pike_and_square: {
    name: "Pike and Square",
    icon: "active_personnel",
    description: "Pikemen have proven to be our best defence from cavalry amongst our mercenaries -- we should look into new ways of arranging our troops.",
    prerequisite_techs: ["standing_army"],
    research_cost: 50,
    year: 1302,
    unlocks: {
      unlock_unit: "pike_and_square",
      obsolete_unit: "spearmen"
    }
  },
  heavy_cavalry: {
    name: "Heavy Cavalry",
    icon: "soldiers",
    description: "Heavy cavalry are units with armoured horses capable of wielding even the heaviest of infantry weapons.",
    prerequisite_techs: ["lance_cavalry"],
    research_cost: 50,
    year: 1000,
    unlocks: {
      unlock_unit: "heavy_cavalry"
    }
  },

  hand_cannons: {
    name: "Hand Cannons",
    icon: "manpower",
    description: "Hand cannons were a primitive precursor to early modern firearms that had a devastating impact on enemies at the price of a brutally long reload speed.",
    prerequisite_techs: ["the_bombard"],
    research_cost: 75,
    year: 1326,
    unlocks: {
      unlock_unit: "hand_cannons",
      training_cost: -0.02,
      unit_cost: 0.03
    }
  },
  tercio: {
    name: "Tercio",
    icon: "colonisation",
    description: "The Tercio was a pike-and-shot unit highly known for its attacking effectiveness that sought to cover its firearm units with pikemen in order to maintain defensive cohesion.",
    prerequisite_techs: ["improved_metallurgy", "pike_and_square", "heavy_cavalry"],
    research_cost: 75,
    year: 1534,
    unlocks: {
      unlock_unit: "tercio",
      obsolete_unit: "pike_and_square"
    }
  },
  early_modern_mercenaries: {
    name: "Early Modern Mercenaries",
    icon: "infamy",
    description: "Early modern mercenaries, compared to mercenaries of previous eras, typically came from other nations renowned for their fighting skill and professionalism.",
    prerequisite_techs: ["condottieri"],
    research_cost: 75,
    year: 1400,
    unlocks: {
      national_manpower: 0.05,
      army_upkeep: 0.05
    }
  },

  moveable_field_works: {
    name: "Moveable Field Works",
    icon: "artillery_piece",
    description: "Moveable field works allow our arquebusiers on the front to quickly shield themselves from harm by tying their firearm to their shield.",
    prerequisite_techs: ["hand_cannons"],
    research_cost: 100,
    year: 1514,
    unlocks: {
      ground_units_dp: 0.03
    }
  },
  improved_firepower: {
    name: "Improved Firepower",
    icon: "artillery",
    description: "Our military engineers have begun to realise that our artillery units can maximise their firepower by bombarding targets in coordinated strikes. Perhaps we should employ this method to great effect ...",
    prerequisite_techs: ["hand_cannons"],
    research_cost: 100,
    year: 1453,
    unlocks: {
      ground_artillery_dp: 0.05
    }
  },
  the_arquebus: {
    name: "The Arquebus",
    icon: "active_personnel",
    description: "The arquebus, the successor to the hand cannon, was an important milestone in gunpowder warfare, and the first miniaturised firearm that allowed for masses of soldiers to wield it to great effect with minimal training compared to archery.",
    prerequisite_techs: ["hand_cannons"],
    research_cost: 100,
    year: 1465,
    unlocks: {
      unlock_unit: "arquebusiers",
      national_manpower: 0.05,
      obsolete_unit: ["archers", "longbowmen"]
    }
  },
  light_cavalry: {
    name: "Light Cavalry",
    icon: "soldiers",
    description: "Light cavalry, compared to heavier forms of mounted infantry, can perform shock attacks and flank enemies at high speed, although their piercing attack is not quite as effective.",
    prerequisite_techs: ["pike_and_square", "heavy_cavalry"],
    research_cost: 100,
    year: 1300,
    unlocks: {
      unlock_unit: "light_cavalry",
      training_cost: 0.05
    }
  },
  landsknecht: {
    name: "Landsknecht",
    icon: "colonisation",
    description: "Landsknecht, mercenaries originating from the German and Swiss lands, are well known for their brutality in attacking and so make for highly formidable foes in battle.",
    prerequisite_techs: ["early_modern_mercenaries"],
    research_cost: 100,
    year: 1470,
    unlocks: {
      unlock_unit: "landsknecht",
      army_upkeep: 0.10
    }
  },

  scorched_earth: {
    name: "Scorched Earth",
    icon: "cb",
    description: "By embracing scorched earth tactics, we can improve the defensibility of our nation, especially in large, open tracts of land and help prepare for the eventuality when others will use it on our attacking troops.",
    prerequisite_techs: ["moveable_field_works"],
    research_cost: 150,
    year: 1346,
    unlocks: {
      infantry_dp: 0.05,
      war_exhaustion_rate: 0.02
    }
  },
  long_cannon: {
    name: "Long Cannon",
    icon: "artillery",
    description: "The long gun, which could be used either on sea, or on land, became a devastating piece of artillery that could be transported around the battlefield with relative ease. Although lacking protection, it quickly became the mainstay of continental European armies.",
    prerequisite_techs: ["improved_firepower", "moveable_field_works"],
    research_cost: 150,
    year: 1588,
    unlocks: {
      unlock_unit: "long_cannons",
      obsolete_unit: ["bombard", "hand_cannons"],
      artillery_ap: 0.05,
      training_cost: 0.03
    }
  },
  snaplock_infantry: {
    name: "Snaplock Infantry",
    icon: "active_personnel",
    description: "With the recent invention of the snaplock musket, allowing for the striking of gunpowder without external ignition, our troops can now fire at a moderately faster speed than previously, compared to the arquebus.",
    prerequisite_techs: ["the_arquebus"],
    research_cost: 150,
    year: 1540,
    unlocks: {
      unlock_unit: "snaplock_infantry",
      infantry_ap: 0.02
    }
  },
  cuirassiers: {
    name: "Cuirassiers",
    icon: "soldiers",
    description: "Beginning in the 15th century, cuirassiers were mounted cavalry units that began adopting firearms as their primary weapon that were in service up until the beginning of the Great War.",
    prerequisite_techs: ["light_cavalry"],
    research_cost: 150,
    year: 1490,
    unlocks: {
      unlock_unit: "cuirassiers"
    }
  },
  proliferation_of_firearms: {
    name: "Proliferation of Firearms",
    icon: "manpower",
    description: "The widespread proliferation of firearms amongst conventional armies during the 16th and 17th centuries eventually lead to the decline of other forms of combat, and the dominance of the gunpowder weapon.",
    prerequisite_techs: ["scorched_earth"],
    research_cost: 200,
    year: 1611,
    unlocks: {
      infantry_ap: 0.10,
      obsolete_unit: ["swordsmen", "cuirassiers"]
    }
  },
  field_culverins: {
    name: "Field Culverins",
    icon: "artillery",
    description: "Field culverins, used as artillery pieces on the battlefield, were highly mobile pieces of relatively small calibre that were valued for their accuracy and range.",
    prerequisite_techs: ["long_cannon"],
    research_cost: 200,
    year: 1590,
    unlocks: {
      unlock_unit: "field_culverins",
      artillery_ap: 0.05
    }
  },
  snaphance_musket: {
    name: "Snaphance Musket",
    icon: "active_personnel",
    description: "The snaphance musket, or the snaphaunce rather, was a firing mechanism used for muskets similar to the snaplock that increased the reliability of firearms to prevent accidental discharge.",
    prerequisite_techs: ["snaplock_infantry"],
    research_cost: 200,
    year: 1558,
    unlocks: {
      unlock_unit: "snaphaunce_infantry"
    }
  },
  hussars: {
    name: "Hussars",
    icon: "infamy",
    description: "Hussars were famed and well-trained light cavalry whose charges were known for their effectiveness in battle throughout the early modern period.",
    prerequisite_techs: ["cuirassiers"],
    research_cost: 200,
    year: 1485,
    unlocks: {
      unlock_unit: "hussars",
      training_cost: 0.05,
    }
  },
  swiss_guards: {
    name: "Swiss Guards",
    icon: "manpower",
    description: "Swiss Guards, famed for their loyalty and ability to serve as guards for various royal courts, (although later repurposed as regular infantry during the Napoleonic Wars) were some of the last mercenaries from foreign countries to be used.",
    prerequisite_techs: ["cuirassiers"],
    research_cost: 200,
    year: 1490,
    unlocks: {
      unlock_unit: "swiss_guards",
      army_upkeep: 0.03
    }
  },

  sustained_bombardment: {
    name: "Sustained Bombardment",
    icon: "artillery_piece",
    description: "Sustained bombardment is a tactic used to suppress enemy forces by constant, round the clock firing of artillery that can be used to great effect, especially during sieges.",
    prerequisite_techs: ["proliferation_of_firearms", "field_culverins"],
    research_cost: 250,
    year: 1618,
    unlocks: {
      artillery_ap: 0.10
    }
  },
  demi_cannon: {
    name: "Demi-Cannon",
    icon: "artillery",
    description: "The demi-cannon was a medium size cannon used primarily at sea, but also on land, that could fire projectiles weighing up to 32 pounds.",
    prerequisite_techs: ["proliferation_of_firearms", "field_culverins"],
    research_cost: 250,
    year: 1652,
    unlocks: {
      unlock_unit: "demi_cannon",
      naval_ap: 0.05
    }
  },
  matchlock_infantry: {
    name: "Matchlock Infantry",
    icon: "active_personnel",
    description: "Matchlock infantry debuted beginning in the 16th century that featured heavily during the Thirty Years' War, that no longer required an external source of ignition. Unfortunately, upkeep was high as matchlock infantry had to keep their matches constantly burning.",
    prerequisite_techs: ["snaphance_musket"],
    research_cost: 250,
    year: 1411,
    unlocks: {
      unlock_unit: "matchlock_infantry",
      army_upkeep: 0.05
    }
  },
  pike_and_shot: {
    name: "Pike and Shot",
    icon: "colonisation",
    description: "Pike and shot were mixed equipment units that sought to take advantage of the defensiveness of the pike coupled with the offensiveness of early modern firearms in order to maximise damage on the enemy. They were rendered obsolete with the advent of the bayonet.",
    prerequisite_techs: ["the_arquebus", "tercio"],
    research_cost: 250,
    year: 1519,
    unlocks: {
      unlock_unit: "pike_and_shot"
    }
  },

  professional_officers: {
    name: "Professional Officers",
    icon: "aristocrats",
    description: "By hiring professional officers instead of relying on aristocrats in the military, we can increase our military professionalism and the quality of our commanders on the field.",
    prerequisite_techs: ["sustained_bombardment"],
    research_cost: 350,
    year: 1610,
    unlocks: {
      infantry_ap: 0.05,
      infantry_dp: 0.05,
      artillery_ap: 0.05,
      artillery_dp: 0.05,
      training_cost: 0.05
    }
  },
  field_cannon: {
    name: "Field Cannon",
    icon: "artillery_piece",
    description: "Beginning in the Thirty Years' War, field cannon were mobile artillery pieces that began to be protected by a shield for the artillerymen, which decreased their vulnerabilities from attack significantly.",
    prerequisite_techs: ["demi_cannon"],
    research_cost: 350,
    year: 1600,
    unlocks: {
      unlock_unit: "field_cannon",
      artillery_dp: 0.05,
      obsolete_unit: "long_cannons"
    }
  },
  wheellock_musket: {
    name: "Wheellock Musket",
    icon: "small_arms",
    description: "The wheellock was the first self-igniting mechanism for firearms, and reduced maintenance of troops wielding it significantly as the match no longer had to be kept burning 24/7, having been replaced by a friction ignition mechanism instead.",
    prerequisite_techs: ["matchlock_infantry"],
    research_cost: 350,
    year: 1500,
    unlocks: {
      unlock_unit: "wheellock_infantry",
      training_cost: -0.05,
      obsolete_unit: ["matchlock_infantry", "snaphaunce_infantry", "snaplock_infantry", "arquebusiers"]
    }
  },
  primitive_sidearms: {
    name: "Primitive Sidearms",
    icon: "coal",
    description: "Primitive sidearms, such as blunderbusses or pistols, were often used as last resort weapons for close combat by early modern infantry troops, as their reliability long-range could not be counted on.",
    prerequisite_techs: ["matchlock_infantry"],
    research_cost: 350,
    year: 1540,
    unlocks: {
      infantry_dp: 0.05
    }
  },
  dragoons: {
    name: "Dragoons",
    icon: "active_personnel",
    description: "Dragoons were a type of light cavalry mounted unit that used infantry firearms, and often disembarked off their mounts in order to conduct combat. Later on, however, they were trained in swordsmanship and were widely used until the end of World War I.",
    prerequisite_techs: ["pike_and_shot", "hussars"],
    research_cost: 350,
    year: 1620,
    unlocks: {
      unlock_unit: "dragoons"
    }
  },
  foreign_legions: {
    name: "Foreign Legions",
    icon: "government_scroll",
    description: "Gradually, foreign legions such as the Wild Geese of Ireland, volunteer regiments, and regiments granted to other countries that served underneath a different country other than their own gradually came to replace mercenaries and served as the main source of manpower in their stead.",
    prerequisite_techs: ["swiss_guards"],
    research_cost: 350,
    year: 1691,
    unlocks: {
      national_manpower: 0.10,
      non_core_manpower: 0.05,
      obsolete_unit: ["condottieri", "landsknecht", "swiss_guards"]
    }
  },

  professional_army: {
    name: "Professional Army",
    icon: "active_personnel",
    description: "Standing armies began to turn into professional armies, and whereas levies, and occassionally conscripts, had previously been used to fulfil the manpower prerequisites of most nations, the advent of the professional army further cemented the power of state over its vassals.",
    prerequisite_techs: ["professional_officers"],
    research_cost: 500,
    year: 1648,
    unlocks: {
      military_buildings: 1,
      infantry_ap: 0.05,
      infantry_dp: 0.05,
      artillery_ap: 0.05,
      artillery_dp: 0.05,
      army_upkeep: 0.10,
      training_cost: 0.10
    }
  },
  demi_culverins: {
    name: "Demi-Culverins",
    icon: "artillery",
    description: "The demi-culverin, similar to the 'field culverin', was a mobile piece of artillery with improved effectiveness and range used in sieges.",
    prerequisite_techs: ["field_cannon"],
    research_cost: 500,
    year: 1590,
    unlocks: {
      unlock_unit: "demi_culverins"
    }
  },
  flintlock_infantry: {
    name: "Flintlock Infantry",
    icon: "soldiers",
    description: "Flintlock weaponry was an umbrella term describing any firearm using flint as its primary striking mechanism. Due to its widespread accessibility and ease-of-use, it rapidly obsoleted earlier firearm ignition technologies.",
    prerequisite_techs: ["wheellock_musket", "primitive_sidearms"],
    research_cost: 500,
    year: 1630,
    unlocks: {
      unlock_unit: "flintlock_infantry",
      obsolete_unit: ["arquebusiers", "snaplock_infantry", "snaphaunce_infantry", "matchlock_infantry", "wheellock_infantry"]
    }
  },
  the_bayonet: {
    name: "The Bayonet",
    icon: "iron",
    description: "The bayonet drastically improved the defensiveness of musketeers and firearm infantry, as the lack of a standard melee weapon could now be made up for. By affixing bayonets onto the end of their muskets, early modern troops now had the capability to resist cavalry charges.",
    prerequisite_techs: ["wheellock_musket", "primitive_sidearms"],
    research_cost: 500,
    year: 1672,
    unlocks: {
      infantry_dp: 0.10,
      obsolete_unit: ["pike_and_square", "tercio", "pike_and_shot"]
    }
  },
  early_colonial_troops: {
    name: "Early Colonial Troops",
    icon: "old_map",
    description: "Early colonial militia were typically tasked with guarding stockades, forts, and various frontier settlements from attack, and were often coupled with friendly natives for manpower support.",
    prerequisite_techs: ["foreign_legions"],
    research_cost: 500,
    year: 1700,
    unlocks: {
      non_core_manpower: 0.05,
      maximum_expeditions: 1
    }
  },

  regular_conscription: {
    name: "Regular Conscription",
    icon: "old_scroll",
    description: "Regular conscription, or the draft of available conscripts during times of war, was the predecessor to the levee en masse, and allowed early nation-states to rapidly mobilise military assets to use at their disposal.",
    prerequisite_techs: ["professional_army"],
    research_cost: 650,
    year: 1640,
    unlocks: {
      national_manpower: 0.10
    }
  },
  minions: {
    name: "Minions",
    icon: "artillery",
    description: "Minions were small cannons that typically armed merchant trade ships, allowing them to carry extra weight not related to armaments whilst keeping their cargo safe.",
    prerequisite_techs: ["demi_culverins"],
    research_cost: 650,
    year: 1642,
    unlocks: {
      unlock_unit: "minions",
      shipment_time: -0.05
    }
  },
  musketeers: {
    name: "Musketeers",
    icon: "active_personnel",
    description: "Musketeers, the mainstay of line infantry warfare, came about as a result of the advent of the bayonet, and the widescale availability of the flintlock firing mechanism. They boasted a good rate of fire (for the time), and had significant offensive advantages as they could engage enemy units at range, or opt for a bayonet charge.",
    prerequisite_techs: ["flintlock_infantry", "the_bayonet"],
    research_cost: 650,
    year: 1745,
    unlocks: {
      unlock_unit: "musketeers"
    }
  },
  improved_grenades: {
    name: "Improved Grenades",
    icon: "coal",
    description: "Improved reliability for grenades help ensure the safety of the soldier and also unlock further offensive capabilities in which they can be used.",
    prerequisite_techs: ["demi_culverins"],
    research_cost: 650,
    year: 1723,
    unlocks: {
      infantry_ap: 0.05
    }
  },
  trade_company_mercenaries: {
    name: "Trade Company Mercenaries",
    icon: "trade",
    description: "Mercenaries hired by trade companies helped to protect their trading posts and valuable goods in exotic lands from being pillaged or stolen.",
    prerequisite_techs: ["early_colonial_troops"],
    research_cost: 650,
    unlocks: {
      non_core_manpower: 0.05
    }
  },

  siege_artillery: {
    name: "Siege Artillery",
    icon: "artillery_piece",
    description: "Siege artillery were large-calibre artillery pieces with low mobility designed specially for putting cities underneath siege.",
    prerequisite_techs: ["minions"],
    research_cost: 750,
    year: 1775,
    unlocks: {
      unlock_unit: "siege_artillery"
    }
  },
  line_infantry: {
    name: "Line Infantry",
    icon: "manpower",
    description: "Line infantry became the mainstay formations of continental European armies at home and abroad throughout the 18th century as earlier melee infantry classes were quickly outpaced in development, and cavalry became increasingly obsolete.",
    prerequisite_techs: ["musketeers"],
    research_cost: 750,
    year: 1750,
    unlocks: {
      unlock_unit: "line_infantry",
      obsolete_unit: "flintlock_infantry"
    }
  },
  sepoys: {
    name: "Sepoys",
    icon: "active_personnel",
    description: "Sepoys were soldiers of mainly Indian origin that were armed with muskets and helped to server in continental Indian armies and overseas European ones as well.",
    prerequisite_techs: ["trade_company_mercenaries"],
    research_cost: 750,
    year: 1750,
    unlocks: {
      non_core_manpower: 0.05,
      army_upkeep: -0.05,
      maximum_expeditions: 1
    }
  },

  mysorean_rocket: {
    name: "Mysorean Rocket",
    icon: "coal",
    description: "The Mysorean rocket was a key asset of the Mysoreans during the Anglo-Mysore wars, with the weapon being so effective at causing panic amongst advancing infantry that it was later adopted by the British underneath the improved Congreve Rocket.",
    prerequisite_techs: ["siege_artillery"],
    research_cost: 900,
    year: 1780,
    unlocks: {
      unlock_unit: "mysorean_rocket",
      artillery_ap: 0.05
    }
  },
  grenadiers: {
    name: "Grenadiers",
    icon: "manpower",
    description: "Grenadiers, widely used during the Napoleonic Wars and late 18th century warfare, were soldiers that specialised in the throwing of grenades, alongside traditional musket warfare.",
    prerequisite_techs: ["improved_grenades", "line_infantry"],
    research_cost: 900,
    year: 1740,
    unlocks: {
      unlock_unit: "grenadiers"
    }
  },
  early_trenches: {
    name: "Early Trenches",
    icon: "workers",
    description: "Trenches and related earthworks began to first take shape around the time of line battle warfare, with earthworks being able to cover the firing infantry as they were reloading.",
    prerequisite_techs: ["line_infantry"],
    research_cost: 900,
    year: 1754,
    unlocks: {
      infantry_dp: 0.10
    }
  },
  uhlans: {
    name: "Uhlans",
    icon: "soldiers",
    description: "Uhlans were general-purpose cavalry units originating in Poland that eventually saw widespread use by the end of the 19th century as fast, mobile cavalry units that could enforce occupation of a territory quickly.",
    prerequisite_techs: ["dragoons"],
    research_cost: 900,
    year: 1764,
    unlocks: {
      unlock_unit: "uhlans"
    }
  },
  indigenous_troops: {
    name: "Indigenous Troops",
    icon: "trade",
    description: "Indigenous troops were native soldiers that often played key supporting roles in colonial conflicts and were recruited with the promise of steady pay and higher social status.",
    prerequisite_techs: ["sepoys"],
    research_cost: 900,
    year: 1710,
    unlocks: {
      non_core_manpower: 0.03,
      army_upkeep: 0.05
    }
  },

  dream_of_flight: {
    name: "Dream of Flight",
    icon: "aeroplanes",
    description: "Since ancient times, man has dreamed of being able to fly. With modern advances and the discovery of lighter than air elements, the potential to fulfil this dream is more likely than ever ...",
    prerequisite_techs: ["regular_conscription", "mysorean_rocket"],
    research_cost: 1000,
    year: 1753,
    unlocks: {
      unlock_building: ["aeroports", "air_bases"]
    }
  },
  light_infantry: {
    name: "Light Infantry",
    icon: "manpower",
    description: "Light infantry are specialised units that enable fast infiltration behind enemy lines and flanking manoeuvres, despite their light armaments.",
    prerequisite_techs: ["grenadiers"],
    research_cost: 1000,
    year: 1740,
    unlocks: {
      unlock_unit: "light_infantry"
    }
  },
  colonial_garrisons: {
    name: "Colonial garrisons",
    icon: "old_map",
    description: "By relying on colonial and indigenous manpower to defend our outposts, we can lessen the burden and army upkeep of ourselves, and save our manpower for our own purposes.",
    prerequisite_techs: ["indigenous_troops"],
    research_cost: 1000,
    year: 1720,
    unlocks: {
      non_core_manpower: 0.05,
      army_upkeep: -0.08
    }
  },

  conscription_and_mobilisation: {
    name: "Conscription and Mobilisation",
    icon: "building",
    description: "By conducting censuses of all able-bodied men in our country, we can begin to mobilise increasingly large numbers of troops in time of war.",
    prerequisite_techs: ["dream_of_flight"],
    research_cost: 1200,
    year: 1756,
    unlocks: {
      enable_mobilisation: true,
      set_mobilisation_unit: "line_infantry",
      national_manpower: 0.10,
      tax_efficiency: -0.05
    }
  },
  carronade: {
    name: "Carronade",
    icon: "artillery_piece",
    description: "Beginning in the late 18th century, carronades were light cannons that helped protect trade shipments, and could also double as highly mobile artipllery on conventional battlefields.",
    prerequisite_techs: ["mysorean_rocket"],
    research_cost: 1200,
    year: 1770,
    unlocks: {
      unlock_unit: "carronades",
      shipment_time: -0.05
    }
  },
  fusiliers: {
    name: "Fusiliers",
    icon: "soldiers",
    description: "Fusiliers, typically armed with heavy infantry weapons that featured heavily during the Napoleonic Wars, typically referred to a type of elite infantry, and were originally used to guard artillery pieces.",
    prerequisite_techs: ["light_infantry"],
    research_cost: 1200,
    year: 1670,
    unlocks: {
      unlock_unit: "fusiliers",
      artillery_dp: 0.05
    }
  },
  improved_bayonet: {
    name: "Improved Bayonet",
    icon: "lead",
    description: "The defensibility of line infantry improved drastically with the advent of the socket bayonet and improvements in metallurgy and steel refinement.",
    prerequisite_techs: ["early_trenches"],
    research_cost: 1200,
    year: 1715,
    unlocks: {
      infantry_dp: 0.10
    }
  },

  levee_en_masse: {
    name: "Levée en masse",
    icon: "taxes",
    description: "The levee-en-masse, made possible by increasingly organised censuses, allowed entire countries to be mobilised in the span of only a few months, creating armies of unprecedented size.",
    prerequisite_techs: ["conscription_and_mobilisation"],
    research_cost: 1400,
    year: 1793,
    unlocks: {
      unlock_reform: "conscription",
      mobilisation_size: 0.50,
      national_manpower: 0.05,
      mobilisation_speed: 0.05
    }
  },
  congreve_rocket: {
    name: "Congreve Rocket",
    icon: "artillery_piece",
    description: "The Congreve Rocket, named after Sir William Congreve in classic 19th century style, was a British military weapon designed after the Mysorean rockets which contributed to the effective defeat of the British in India twice.",
    prerequisite_techs: ["carronade"],
    research_cost: 1400,
    year: 1804,
    unlocks: {
      unlock_unit: "congreve_rockets",
      obsolete_unit: "mysorean_rockets"
    }
  },
  napoleonic_arms: {
    name: "Napoleonic Arms",
    icon: "active_personnel",
    description: "Napoleonic arms were improved infantry weapons developed during the French Revolutionary Wars and the Napoleonic Wars that allowed for large-scale production to fit and equip armies of millions of men.",
    prerequisite_techs: ["fusiliers", "improved_bayonet"],
    research_cost: 1400,
    year: 1802,
    unlocks: {
      unlock_unit: "napoleonic_infantry",
      army_upkeep: 0.10
    }
  },
  rifled_barrels: {
    name: "Rifled Barrels",
    icon: "iron",
    description: "Beginning in the late 18th century, rifled barrels on muskets allowed infantrymen to shoot with improved accuracy, despite longer loading times as they now had to pound the musketball down the barrel instead of letting it slide.",
    prerequisite_techs: ["fusiliers", "improved_bayonet"],
    research_cost: 1400,
    year: 1754,
    unlocks: {
      infantry_ap: 0.05,
      army_upkeep: 0.10
    }
  },

  nation_in_arms: {
    name: "Nation-in-Arms",
    icon: "manpower",
    description: "With increased nationalism, and the advent of the concept of nations-in-arms, wars could now be fought on truly devastating scales, one that could require all men of fighting age to be drafted.",
    prerequisite_techs: ["levee_en_masse"],
    research_cost: 1600,
    year: 1815,
    unlocks: {
      set_mobilisation_unit: "napoleonic_infantry",
      national_manpower: 0.05,
      mobilisation_speed: 0.1,
      barracks: 1
    }
  },
  rangers: {
    name: "Rangers",
    icon: "provinces",
    description: "Rangers were a late early-modern unit that possessed the mobility of light infantry, and were tasked with hitting behind enemy lines, or manoeuvring through tightly wooded areas.",
    prerequisite_techs: ["napoleonic_arms"],
    research_cost: 1600,
    year: 1755,
    unlocks: {
      unlock_unit: "rangers"
    }
  },
  improved_fortifications: {
    name: "Improved Fortifications",
    icon: "stone",
    description: "With the advent of large-calibre cannon, fortifications now had to be improved and expertly designed by military engineers, and on the field, improvised to maximise the defensive potential of the local garrisons and infantry.",
    prerequisite_techs: ["napoleonic_arms"],
    research_cost: 1600,
    year: 1789,
    unlocks: {
      infantry_dp: 0.05,
      army_upkeep: 0.10
    }
  },
  early_balloons: {
    name: "Early Balloons",
    icon: "diplomacy",
    description: "The Montgolfier hot-air balloon quickly became a sensation in an era where man taking flight was still unthinkable, and many quickly realised the reconaissance potentials of such devices, as enemy troops could now be viewed from far up, and scientific instruments carried high into the air.",
    prerequisite_techs: ["dream_of_flight"],
    research_cost: 1800,
    year: 1783,
    custom_effect_description: "This will lead to further discoveries in the field of aviation ..."
  },
  defeat_in_detail: {
    name: "Defeat-in-Detail",
    icon: "infamy",
    description: "By dispersing our forces unequally and pretending that one of them is comprised of more men and materiel than it really is, we can lure the enemy into distributing their forces equally before shattering them one by one in a tactic known as defeat-in-detail.",
    prerequisite_techs: ["nation_in_arms"],
    research_cost: 1800,
    year: 1796,
    unlocks: {
      infantry_ap: 0.10
    }
  },
  smoothbores: {
    name: "Smoothbores",
    icon: "artillery",
    description: "Smoothbore artillery pieces were some of the first introduced, but saw increased usage during the early 19th century despite decreased accuracy compared to rifled cannons.",
    prerequisite_techs: ["congreve_rocket"],
    research_cost: 1800,
    year: 1836,
    unlocks: {
      unlock_unit: "smoothbores",
      artillery_dp: -0.05,
      obsolete_unit: ["siege_artillery", "congreve_rockets"]
    }
  },
  guards: {
    name: "Guards",
    icon: "manpower",
    description: "Guards were improved heavy infantry used for defensive purposes that eventually became incorporated into regular armies.",
    prerequisite_techs: ["rangers"],
    research_cost: 1800,
    year: 1850,
    unlocks: {
      unlock_unit: "guards",
      army_upkeep: 0.05
    }
  },
  improved_logistics: {
    name: "Improved Logistics",
    icon: "trade",
    description: "By establishing dedicated logistics teams for our armies, we can help ensure that our troops are as well-supplied and clothed as possible.",
    prerequisite_techs: ["rifled_barrels"],
    research_cost: 1800,
    year: 1793,
    unlocks: {
      army_upkeep: -0.10,
      training_cost: -0.05
    }
  },
  mounted_rifles: {
    name: "Mounted Rifles",
    icon: "soldiers",
    description: "Mounted rifles are cavalry units that carry rifled weapons, similar to dragoons that were used up until World War I.",
    prerequisite_techs: ["rifled_barrels"],
    research_cost: 1800,
    year: 1880,
    unlocks: {
      unlock_unit: "mounted_rifles",
      obsolete_unit: "cuirassiers"
    }
  },
  gurkhas: {
    name: "Gurkhas",
    icon: "active_personnel",
    description: "Gurkhas were elite colonial troops from the Himalayas known for their determination and bravery in battle.",
    prerequisite_techs: ["improved_fortifications"],
    research_cost: 1800,
    year: 1816,
    unlocks: {
      non_core_manpower: 0.05
    }
  },

  reconaissance_balloons: {
    name: "Reconaissance Balloons",
    icon: "aeroplanes",
    description: "One would only be wise to realise the potential hiding behind the invention of the hot air balloon, as it could be used for spotting enemy movements from far away, similar to lookout tower, but at a much greater altitude, and with minimal construction cost as it can be transported easily.",
    prerequisite_techs: ["early_balloons"],
    research_cost: 2000,
    year: 1870,
    unlocks: {
      unlock_unit: "reconaissance_balloons"
    }
  },
  rapid_manoeuvre: {
    name: "Rapid Manoeuvre",
    icon: "time",
    description: "By using forced march to its maximum extent and light infantry and cavalry, we can enable our units to manoeuvre rapidly in enemy battlefields and on the map, increasing overall manoeuvrability.",
    prerequisite_techs: ["defeat_in_detail"],
    research_cost: 2000,
    year: 1871,
    unlocks: {
      army_travel_speed: 0.50
    }
  },
  riflemen: {
    name: "Riflemen",
    icon: "manpower",
    description: "With the advent of the rifle and the rifled barrel itself, our troops can now wield much more accurate weaponry by using rifles and cartridges that no longer require the time-consuming reload of the musket.",
    prerequisite_techs: ["guards"],
    research_cost: 2000,
    year: 1840,
    unlocks: {
      unlock_unit: "riflemen",
      obsolete_unit: "riflemen",
      army_upkeep: 0.05
    }
  },
  cavalry_logistics: {
    name: "Cavalry Logistics",
    icon: "trade",
    description: "As our armies now increasingly rely on weaponry and food supplied from home, it would only be wise to expand our cavalry operations to supply too, as horses can now transport goods in large numbers to our frontline troops.",
    prerequisite_techs: ["mounted_rifles"],
    research_cost: 2000,
    year: 1853,
    unlocks: {
      army_travel_speed: 0.35,
      army_upkeep: -0.10
    }
  },
  colonial_elite_officers: {
    name: "Colonial Elite Officers",
    icon: "aristocrats",
    description: "By using home aristocrats to rule over foreign lands in 'complementary service' to the native rulers, we can improve stability in our overseas provinces and areas that might not be so friendly to us otherwise.",
    prerequisite_techs: ["gurkhas"],
    research_cost: 2000,
    year: 1850,
    unlocks: {
      stability_modifier: 0.05,
      tax_efficiency: 0.03
    }
  },

  rifled_cannons: {
    name: "Rifled Cannons",
    icon: "artillery_piece",
    description: "With improved accuracy and ease of loading, rifled cannons soon obsoleted most previous cannons, including smoothbores, which would not be reintroduced until the advent of the Main Battle Tank and fin stabilisers.",
    prerequisite_techs: ["smoothbores"],
    research_cost: 2500,
    unlocks: {
      unlock_unit: "rifled_cannons",
      obsolete_unit: ["smoothbores", "congreve_rocket", "carronades", "mysorean_rockets", "siege_artillery", "minions", "demi_culverins", "field_cannon", "demi_cannon", "field_culverins", "long_cannon"]
    }
  },
  modern_marines: {
    name: "Modern Marines",
    icon: "active_personnel",
    description: "Modern marines, typically soldiers designed specifically for amphibious invasions, usually operate underneath an independent branch of a nation's military and are known for having undergone rigorous training.",
    prerequisite_techs: ["riflemen"],
    research_cost: 2500,
    year: 1880,
    unlocks: {
      unlock_unit: "marines",
      army_upkeep: 0.05
    }
  },

  dirigibles: {
    name: "Dirigibles",
    icon: "aeroplanes",
    description: "Dirigible balloons are lighter than air aircraft that possess the ability to navigate through the air via engines located onboard. The predecessor to zeppelins, they were some of the first aircraft used for military purposes aside from reconaissance.",
    prerequisite_techs: ["reconaissance_balloons"],
    research_cost: 3000,
    unlocks: {
      unlock_unit: "dirigibles"
    }
  },
  railwayguns: {
    name: "Railwayguns",
    icon: "artillery_piece",
    description: "With the improvement of railway technology, railwayguns began to appear throughout early 20th century Europe, and were artillery pieces of massive calibre that could only be moved by rail that possessed the capability to fire at targets over a hundred kilometres away.",
    prerequisite_techs: ["rifled_cannons"],
    research_cost: 3000,
    year: 1862,
    unlocks: {
      unlock_unit: "railwayguns"
    }
  },
  breechloaded_rifles: {
    name: "Breechloaded Rifles",
    icon: "manpower",
    description: "Breechloading rifles are firearms for which the user can simply insert a cartridge in order to reload, in comparison to earlier musket designs, which required a lengthy reloading process, and could only be reloaded as such standing up.",
    prerequisite_techs: ["rifled_cannons"],
    research_cost: 3000,
    year: 1842,
    unlocks: {
      unlock_unit: "breechloaded_infantry",
      obsolete_unit: ["guards", "rangers", "napoleonic_infantry", "fusiliers", "light_infantry", "musketeers", "flintlock_infantry", "wheellock_infantry"]
    }
  },
  railway_logistics: {
    name: "Railway Logistics",
    icon: "coal",
    description: "By using railways to ship goods to our frontline troops, we can reduce expenditures on other slower forms of transport. However, Army Travel Speed will also slow down as railways, if sabotaged by the enemy, must be brought back up to pace and repaired in order to meet logistical needs.",
    prerequisite_techs: ["guards", "improved_logistics"],
    research_cost: 3000,
    year: 1883,
    unlocks: {
      army_travel_speed: -0.25,
      army_upkeep: -0.10
    }
  },
  modern_cavalry: {
    name: "Modern Cavalry",
    icon: "manpower",
    description: "By bringing our cavalry up to date, we can hopefully use it to exploit breakthroughs caused by the infantry and artillery and rapidly enforce occupation of selected territories.",
    prerequisite_techs: ["cavalry_logistics"],
    research_cost: 3000,
    year: 1905,
    unlocks: {
      unlock_unit: "modern_cavalry",
      army_travel_speed: 0.20
    }
  },
  colonial_mobilisation: {
    name: "Colonial Mobilisation",
    icon: "building",
    description: "By improving records not just at home, but overseas, we can bring a colonial army to bear to help its mother nation in times of need.",
    prerequisite_techs: ["colonial_elite_officers"],
    research_cost: 3000,
    year: 1914,
    unlocks: {
      non_core_manpower: 0.10
    }
  },

  zeppelins: {
    name: "Zeppelins",
    icon: "aeroplanes",
    description: "The successor to dirigibles, zeppelins were solid-steel airships capable of bombing cities from great heights.",
    prerequisite_techs: ["dirigibles"],
    research_cost: 3500,
    year: 1893,
    unlocks: {
      unlock_unit: "zeppelins"
    }
  },
  early_railway_mobilisation: {
    name: "Early Railway Mobilisation",
    icon: "coal",
    description: "By planning mobilisation manoeuvres and logistics around railway tracks, we can increase our mobilisation speed and quality of arms as logistical problems will be reduced.",
    prerequisite_techs: ["dirigibles"],
    research_cost: 3500,
    year: 1890,
    unlocks: {
      set_mobilisation_unit: "breechloaded_infantry",
      military_buildings: 1,
      army_upkeep: -0.05,
      mobilisation_speed: 0.05,
      training_cost: -0.05
    }
  },
  field_artillery: {
    name: "Field Artillery",
    icon: "artillery_piece",
    description: "Introducing new field artillery of better quality and larger quantity could have a great impact on the field, especially when manned by professional artillery crews in rear lines.",
    prerequisite_techs: ["railwayguns"],
    research_cost: 3500,
    year: 1897,
    unlocks: {
      unlock_unit: "field_artillery",
      army_upkeep: 0.05,
      obsolete_unit: "rifled_cannons"
    }
  },
  franc_tireurs: {
    name: "Franc-Tireurs",
    icon: "active_personnel",
    description: "Franc-Tireurs, or Francs-Tireurs in French, literally meaning 'free shooters' were guerrilla fighters that operated from the Franco-Prussian War until the end of World War II known for wreaking havoc behind enemy lines by acting as civilian combatants.",
    prerequisite_techs: ["breechloaded_rifles"],
    research_cost: 3500,
    years: 1870,
    custom_effect_description: "Enables **Franc-Tireurs**, a unit that requires virtually only manpower.",
    unlocks: {
      unlock_unit: "franc_tireurs"
    }
  },
  advanced_trenches: {
    name: "Advanced Trenches",
    icon: "colonisation",
    description: "By planning out our trenches rather than building them hastily on the spot, and reinforcing them with wooden support posts, and ensuring right angles to minimise the shock of an artillery explosion or shrapnel, we can maximise defensive effectiveness in battle, especially if trench warfare takes hold ...",
    prerequisite_techs: ["railway_logistics"],
    research_cost: 3500,
    year: 1913,
    unlocks: {
      infantry_dp: 0.15
    }
  },
  miltiary_garrison: {
    name: "Military Garrison",
    icon: "soldiers",
    description: "Utilising overseas military garrisons in order to suppress revolts and maintain public order during times that the native colonial army is serving abroad could have great benefits in the realm of improving stability ...",
    prerequisite_techs: ["railway_logistics"],
    research_cost: 3500,
    year: 1865,
    unlocks: {
      stability_modifier: 0.10,
      barracks: 1
    }
  },

  biplanes: {
    name: "Biplanes",
    icon: "aeroplanes",
    description: "Biplanes, the first heavier than air aircraft to ever have been used was developed in the earlier half of the 20th century and was used en masse for the first time in the Great War for reconaissance, bombing, and dogfighting.",
    prerequisite_techs: ["zeppelins"],
    research_cost: 4000,
    year: 1913,
    unlocks: {
      unlock_unit: "biplanes",
      aeroplanes_dp: 0.05
    }
  },
  great_war_ncos: {
    name: "Great War NCOs",
    icon: "aristocrats",
    description: "NCOs, or non-commissioned officers are officers not commissioned (through military academies and the like), but rather promoted on up through the regular ranks that came to serve great importance in modern warfare.",
    prerequisite_techs: ["early_railway_mobilisation"],
    research_cost: 4000,
    year: 1914,
    unlocks: {
      infantry_ap: 0.05,
      infantry_dp: 0.05,
      artillery_ap: 0.05,
      army_upkeep: -0.05
    }
  },
  logistics_companies: {
    name: "Logistics Companies",
    icon: "trade",
    description: "Logistics companies are detachments of regular divisions in charge of organising and handling the logistical backend needed to keep armies well-supplied and fed.",
    prerequisite_techs: ["advanced_trenches"],
    research_cost: 4000,
    year: 1866,
    unlocks: {
      army_travel_speed: -0.15,
      army_upkeep: -0.10
    }
  },
  motor_war_cars: {
    name: "Motor War Cars",
    icon: "government",
    description: "Motor War Cars were early experimental armoured cars that shielded the driver, and were often armed with machine guns. They were never used in combat.",
    prerequisite_techs: ["modern_cavalry"],
    research_cost: 4000,
    year: 1899,
    unlocks: {
      unlock_building: "auto_plants"
    }
  },

  incendiary_ammunition: {
    name: "Incendiary Ammunition",
    icon: "coal",
    description: "Incendiary ammunition allowed for improved defence of cities as zeppelin bombers no longer held the capability to bomb cities unimpeded.",
    prerequisite_techs: ["biplanes"],
    research_cost: 4500,
    year: 1916,
    unlocks: {
      army_upkeep: 0.05,
      training_cost: 0.05,
      aeroplanes_ap: -0.05,
      aeroplanes_dp: 0.10
    }
  },
  early_bombers: {
    name: "Early Bombers",
    icon: "aeroplanes",
    description: "Early bombers were often large biplanes that could carry a few bombs in their bomb load, and flew relatively low over enemy targets, often without fighter escorts.",
    prerequisite_techs: ["biplanes"],
    research_cost: 4500,
    year: 1912,
    unlocks: {
      unlock_unit: "early_bombers"
    }
  },
  mobilisation_timetables: {
    name: "Mobilisation Timetables",
    icon: "building",
    description: "By planning mobilisations around strict timetables, general mobilisation of the population could now take place with rapidity, and with better arms as logistics had already been sorted out beforehand.",
    prerequisite_techs: ["great_war_ncos"],
    research_cost: 4500,
    year: 1908,
    unlocks: {
      set_mobilisation_unit: "bolt_action_infantry",
      mobilisation_size: 0.50,
      army_travel_speed: 0.65,
      mobilisation_speed: 0.05,
      mobilisation_impact: -0.05
    }
  },
  artillery_howitzers: {
    name: "Artillery Howitzers",
    icon: "artillery_piece",
    description: "Artillery howitzers were conventional artillery pieces used throughout the 20th century that shot projectiles over a long range, despite its short barrel.",
    prerequisite_techs: ["field_artillery"],
    research_cost: 4500,
    year: 1914,
    unlocks: {
      unlock_unit: "artillery_howitzers"
    }
  },
  bolt_action_infantry: {
    name: "Bolt-Action Infantry",
    icon: "active_personnel",
    description: "Bolt-action rifles, known for their ease of use, served as a primary infantry weapon across European Continental armies during the Great War, but are typically used nowadays for guns of larger calibre.",
    prerequisite_techs: ["franc_tireurs", "logistics_companies"],
    research_cost: 4500,
    year: 1888,
    unlocks: {
      unlock_unit: "bolt_action_infantry"
    }
  },
  flamethrower_units: {
    name: "Flamethrower Units",
    icon: "cb",
    description: "Flamethrower units, often used for clearing out enemy trenches and occassional partisans were an effective way to intimidate enemies, despite the danger posed by using one.",
    prerequisite_techs: ["franc_tireurs`", "logistics_companies"],
    research_cost: 4500,
    year: 1901,
    unlocks: {
      infantry_ap: 0.10
    }
  },
  armoured_cars: {
    name: "Armoured Cars",
    icon: "land_vehicles",
    description: "Armoured cars were land-based vehicles that often functioned as mobile strongpoints to protect infantry units and lead in charges, or in rather unsavoury circumstances, to serve as distraction for enemy artillery crews.",
    prerequisite_techs: ["motor_war_cars"],
    research_cost: 4500,
    year: 1914,
    unlocks: {
      unlock_unit: "armoured_cars"
    }
  },
  improved_biplanes: {
    name: "Improved Biplanes",
    icon: "aeroplanes",
    description: "Later improvements in biplanes helped cement its dominance over the earlier observation balloons and dirigibles, eventually itself being replaced by monoplanes in the 1920s and 1930s.",
    prerequisite_techs: ["incendiary_ammunition"],
    research_cost: 5000,
    year: 1916,
    unlocks: {
      unlock_unit: "improved_biplanes"
    }
  },
  trench_warfare: {
    name: "Trench Warfare",
    icon: "soldiers",
    description: "As war increasingly became more total, and armies of millions attempted to outflank armies of millions, perhaps it was only inevitable that war would grind to a halt, and that both sides would be forced to win it only one way - last man standing.",
    prerequisite_techs: ["mobilisation_timetables", "artillery_howitzers"],
    research_cost: 5000,
    year: 1915,
    unlocks: {
      infantry_dp: 0.15
    }
  },
  creeping_barrage: {
    name: "Creeping Barrage",
    icon: "artillery_piece",
    description: "The creeping barrage is an artillery method that requires artillery pieces to be fired with great precision immediately in front of advancing troops so as to clear out enemy fortifications and defences. It was later improved using pre-sighting artillery.",
    prerequisite_techs: ["artillery_howitzers"],
    research_cost: 5000,
    year: 1917,
    unlocks: {
      artillery_ap: 0.05,
      training_cost: 0.10,
      army_upkeep: 0.05
    }
  },
  mg_companies: {
    name: "MG Companies",
    icon: "active_personnel",
    description: "Machine gun companies, or MG companies for short, were companies that were given the special task of operating machine guns in order to improve the defensive capabilities of ordinary infantry in trenches. Ah, the old colonial maxim, 'we have got the Maxim gun, and they do not'. Well, now everyone has them.",
    prerequisite_techs: ["bolt_action_infantry"],
    research_cost: 5000,
    unlocks: {
      unlock_unit: "mg_companies",
      infantry_dp: 0.10
    }
  },
  defence_in_depth: {
    name: "Defence-in-Depth",
    icon: "old_map",
    description: "Defence-in-depth is a military tactic that attempts to stall the attacker by laying out layers of fortifications with the end goal of causing massive amounts of casualties on the opposing end.",
    prerequisite_techs: ["flamethrower_units"],
    research_cost: 5000,
    year: 1916,
    unlocks: {
      infantry_dp: 0.05,
      artillery_dp: 0.05,
      army_upkeep: 0.10,
      army_travel_speed: -0.40
    }
  },
  landship: {
    name: "Landship",
    icon: "land_vehicles",
    description: "The landship was the name given to early tanks whose job was to roll over enemy trenches and smash holes in the lines for advancing infantry. They were often slow and cumbersome, and prone to malfunction.",
    prerequisite_techs: ["flamethrower_units"],
    research_cost: 5000,
    year: 1916,
    unlocks: {
      unlock_unit: "landship"
    }
  },

  monoplane_fighters: {
    name: "Monoplane Fighters",
    icon: "aeroplanes",
    description: "Monoplane fighters, lacking the fragility of earlier biplane fighters were first produced at the end of the First World War, but saw increased service throughout the 20s and 30s as they increasingly obsoleted earlier aircraft.",
    prerequisite_techs: ["improved_biplanes", "early_bombers"],
    research_cost: 5500,
    year: 1915,
    unlocks: {
      unlock_unit: "monoplane_fighters"
    }
  },
  monoplane_bombers: {
    name: "Monoplane Bombers",
    icon: "aeroplanes",
    description: "Monoplane bombers, with extended fuel capacity and an improved bomb bay that could now hold multiple bombs, were capable of flying longer distances, and were first used in combat in the famous German Gotha raids on London.",
    prerequisite_techs: ["improved_biplanes", "early_bombers"],
    research_cost: 5500,
    year: 1917,
    unlocks: {
      unlock_unit: "monoplane_bombers"
    }
  },
  modern_military_doctrine: {
    name: "Modern Military Doctrin",
    icon: "old_map",
    description: "Modern military doctrine, treating tactics and logistics as a science instead of an art, was borne out of the fire of the Great War, and eventually came to domineer the perspective on modern military thought.",
    prerequisite_techs: ["improved_biplanes", "early_bombers", "trench_warfare"],
    research_cost: 5500,
    year: 1918,
    unlocks: {
      military_buildings: 1,
      infantry_ap: 0.10,
      artillery_ap: 0.05,
      aeroplanes_ap: 0.10,
      army_upkeep: -0.05,
      infantry_dp: -0.10,
      mobilisation_impact: -0.15
    }
  },
  mobile_artillery: {
    name: "Mobile Artillery",
    icon: "artillery_piece",
    description: "Mobile artillery guns, often made mobile with the aid of a secondary motorised vehicle could be redeployed to needed sectors of the battlefield with relative speed, allowing for increased coverage with limited resources.",
    prerequisite_techs: ["creeping_barrage"],
    research_cost: 5500,
    year: 1919,
    unlocks: {
      artillery_ap: 0.05,
      army_travel_speed: 0.35
    }
  },
  great_war_infantry: {
    name: "Great War Infantry",
    icon: "soldiers",
    description: "Infantrymen of the Great War were armed with a variety of different weapons, most of which were standard-issue and made by their respective countries. Over the course of the war, this equipment was adapted as new tactics and challenges became increasingly evident.",
    prerequisite_techs: ["mg_companies"],
    research_cost: 5500,
    year: 1915,
    unlocks: {
      unlock_unit: "great_war_infantry",
      obsolete_units: ["riflemen", "breechloaded_infantry"]
    }
  },
  mobile_field_hospitals: {
    name: "Mobile Field Hospitals",
    icon: "infamy",
    description: "During times of war, mobile field hospitals were often the only treatment that wounded soldiers could receive and served to treat serious injuries sustained on the battlefield in hopes of them making a speedy recovery and being able to return to the front.",
    prerequisite_techs: ["defence_in_depth"],
    research_cost: 5500,
    year: 1914,
    unlocks: {
      national_manpower: 0.02,
      army_upkeep: 0.05
    }
  },
  motorised_infantry: {
    name: "Motorised Infantry",
    icon: "land_vehicles",
    description: "Motorised infantry, or infantry travelling on motorised vehicles can help improve Army Travel Speed and keep pace with breakthroughs and advances made by armoured vehicles.",
    prerequisite_techs: ["armoured_cars"],
    research_cost: 5500,
    year: 1918,
    army_travel_speed: 0.50
  },
  light_tank: {
    name: "Light Tank",
    icon: "land_vehicles",
    description: "Light tanks, designed for speed and manoeuvrability, typically played supporting roles for the infantry.",
    prerequisite_techs: ["landship"],
    research_cost: 5500,
    year: 1917,
    unlocks: {
      unlock_unit: "light_tanks"
    }
  },

  superior_firepower: {
    name: "Superior Firepower",
    icon: "artillery",
    description: "Bullets are cheap, men are not. By overwhelming our enemy with artillery, we can ensure minimal casualties when our infantrymen do the mopping.",
    prerequisite_techs: ["modern_military_doctrine"],
    research_cost: 6000,
    unlocks: {
      artillery_ap: 0.10
    }
  },
  ack_ack_guns: {
    name: "Ack-Ack Guns",
    icon: "artillery_piece",
    description: "Ack-ack guns, Archie, anti-aircraft guns, many words are used to describe the same weaponry necessary to shoot down aeroplanes. In order to avoid our civilian centres from being bombed, it is imperative that we manage to protect our cities properly.",
    prerequisite_techs: ["mobile_artillery"],
    research_cost: 6000,
    year: 1915,
    unlocks: {
      unlock_building: "ack_ack_guns"
    }
  },
  shock_troops: {
    name: "Shock Troops",
    icon: "soldiers",
    description: "Shock troops - mobile, elite soldiers specialised in hitting enemy defensive lines hard and fast without fear and scrambling from mound to mound for cover could help revolutionise the war effort by introducing new infantry tactics.",
    prerequisite_techs: ["mobile_artillery"],
    research_cost: 6000,
    year: 1916,
    unlocks: {
      unlock_unit: "shock_troops",
      infantry_ap: 0.10
    }
  },
  chemical_cannisters: {
    name: "Chemical Cannisters",
    icon: "artillery_piece",
    description: "Chemical cannisters, either released on the ground when winds are favourable, or served up as ammunition for our artillery howitzers, is an effective method in getting enemy troops to panic before an advance is made.",
    prerequisite_techs: ["mobile_artillery"],
    research_cost: 6000,
    year: 1915,
    unlocks: {
      infantry_ap: 0.05,
      armour_ap: 0.05
    }
  },
  armoured_personnel_carriers: {
    name: "Armoured Personnel Carriers",
    icon: "land_vehicles",
    description: "Armoured personnel carriers are not only transports designed to carry infantry rapidly, but to carry them whilst being protected. In addition, they come with some light armaments themselves, allowing for a light response to any enemy fire.",
    prerequisite_techs: ["mobile_artillery"],
    research_cost: 6000,
    year: 1917,
    unlocks: {
      unlock_unit: "armoured_personnel_carriers"
    }
  },
  improved_tank_reliability: {
    name: "Improved Tank Reliability",
    icon: "land_vehicles",
    description: "Despite a majority of tanks breaking down on the battlefield each time they are used, they have already shown their worth in combat, and so extra attention to improving their reliability should be made in order to further future advances.",
    prerequisite_techs: ["light_tank"],
    research_cost: 6000,
    year: 1917,
    unlocks: {
      armour_ap: 0.05,
      army_upkeep: 0.05
    }
  },

  propeller_fighters: {
    name: "Propeller Fighters",
    icon: "aeroplanes",
    description: "Propeller fighters, or fighters using the propeller as their main means of propulsion became increasingly common in the years leading up to the outbreak of the Second World War and came to be some of the most widely recognised aircraft, even today.",
    prerequisite_techs: ["monoplane_fighters"],
    research_cost: 6500,
    year: 1932,
    unlocks: {
      unlock_unit: "propeller_fighters"
    }
  },
  interwar_bombers: {
    name: "Interwar Bombers",
    icon: "aeroplanes",
    description: "Interwar bombers, or bombers built during the two decades of peace, increasingly became dominated by monoplane type bombers that held increased cargo capacity for bombs, resulting in more effective air raids as evidenced by the destruction of Guernica.",
    prerequisite_techs: ["monoplane_bombers"],
    research_cost: 6500,
    year: 1935,
    unlocks: {
      unlock_unit: "interwar_bombers",
      aeroplanes_ap: 0.05
    }
  },
  war_of_movement: {
    name: "War of Movement",
    icon: "old_map",
    description: "The war of movement was the beginning of the doctrine known as manoeuvre warfare, and was first employed in the closing days of the First World War in the Hundred Days' Offensive as the Allied armies sought to beat back the German army via shock and disruption.",
    prerequisite_techs: ["superior_firepower"],
    research_cost: 6500,
    year: 1918,
    unlocks: {
      infantry_ap: 0.10,
      artillery_ap: 0.05,
      armour_ap: 0.10,
      army_upkeep: 0.10
    }
  },
  freikorps: {
    name: "Freikorps",
    icon: "soldiers",
    description: "The German Freikorps were post-war volunteer troops often comprised of veterans of the Great War that were said to be the result of difficulty to readjust back to normal civilian life, and helped quash the German Revolution and the Spartacist Uprising. They were also known for their role in the Baltic conflicts.",
    prerequisite_techs: ["shock_troops"],
    research_cost: 650,
    year: 1919,
    unlocks: {
      unlock_unit: "freikorps"
    }
  },
  interwar_tanks: {
    name: "Interwar Tanks",
    icon: "land_vehicles",
    description: "With new experiments being conducted, and the agreement that tanks should be designed around a central turret, interwar tanks became some of the first truly recognisable tanks in service, but continued to face reliability issues.",
    prerequisite_techs: ["improved_tank_reliability"],
    research_cost: 6500,
    year: 1935,
    unlocks: {
      unlock_unit: "interwar_tanks",
      obsolete_unit: "landship"
    }
  },
  fighters: {
    name: "Fighters",
    icon: "aeroplanes",
    description: "At the outbreak of the Second World War, increasingly effective ways to intercept enemy bombers were developed, and the concept of bomber escorts were first suggested, leading to a competition between interception and escort range. The golden age of dogfighting begins ...",
    prerequisite_techs: ["improved_tank_reliability"],
    research_cost: 7000,
    year: 1939,
    unlocks: {
      unlock_unit: "fighters",
      obsolete_unit: ["biplanes", "improved_biplanes"]
    }
  },
  combined_arms_doctrine: {
    name: "Combined Arms Doctrine",
    icon: "old_map",
    description: "Combined arms doctrine is a military theory in which all available assets of a diverse nature at the disposal of an attacking country are employed in mass formations in order to attempt a successful breakthrough.",
    prerequisite_techs: ["war_of_movement"],
    research_cost: 7000,
    year: 1936,
    unlocks: {
      infantry_dp: 0.05,
      infantry_ap: 0.05,
      artillery_ap: 0.05,
      army_travel_speed: 1.00,
      army_upkeep: 0.05,
      training_cost: 0.05,
      air_bases: 1,
      barracks: 1,
      artillery_factories: 1,
      auto_plants: 1
    }
  },
  long_range_artillery: {
    name: "Long-range Artillery",
    icon: "artillery_piece",
    description: "Long-range artillery, used exclusively for bombardment of distant targets, can prove to be a valuable tool when used en masse as a blunt instrument against enemy forces, a blunt instrument that does not require the expenditure of our own manpower.",
    prerequisite_techs: ["ack_ack_guns"],
    research_cost: 7000,
    year: 1938,
    unlocks: {
      unlock_unit: "long_range_artillery",
      obsolete_unit: ["railwayguns", "field_artillery"]
    }
  },
  modern_military_engineering: {
    name: "Modern Military Engineering",
    icon: "steel",
    description: "Modern military engineers should be a flexible and adapatable tool that are always needed, but also always reliable for overcoming adverse situations.",
    prerequisite_techs: ["shock_troops", "chemical_cannisters"],
    research_cost: 7000,
    year: 1940,
    unlocks: {
      infantry_ap: 0.10,
      artillery_ap: 0.05
    }
  },
  half_track: {
    name: "Half-Track",
    icon: "land_vehicles",
    description: "Half-tracks are military vehicles that combine both regular tyred wheels at the front, and tracked wheels at the back for maximum manoeuvrability. They were typically armed with machine guns and carried on board various infantry soldiers.",
    prerequisite_techs: ["armoured_personnel_carriers"],
    research_cost: 7000,
    year: 1938,
    unlocks: {
      unlock_unit: "half_tracks",
      obsolete_unit: ["lance_cavalry", "heavy_cavalry", "light_cavalry", "cuirassiers", "hussars", "dragoons", "uhlans", "mounted_rifles", "modern_cavalry"]
    }
  },
  medium_tank: {
    name: "Medium Tank",
    icon: "land_vehicles",
    description: "The medium tank was the predecessor to the modern main battle tank that sought to keep the manoeuvrability and mobility of light tanks, and the armaments and armour of heavier ones. They tended to form the main bodies of armoured corps.",
    prerequisite_techs: ["interwar_tanks"],
    research_cost: 7000,
    year: 1938,
    unlocks: {
      unlock_unit: "medium_tanks"
    }
  },

  advanced_fighters: {
    name: "Advanced Fighters",
    icon: "aeroplanes",
    description: "Advanced fighters were produced in the latter days of World War II and were primarily built to escort bombers instead of flying solo sorties over enemy airfields.",
    prerequisite_techs: ["fighters"],
    research_cost: 7500,
    year: 1940,
    unlocks: {
      unlock_unit: "advanced_fighters",
      aeroplanes_dp: 0.05
    }
  },
  bombers: {
    name: "Bombers",
    icon: "aeroplanes",
    description: "Strategic bombers meant to target civilian and industrial targets became increasingly common in the Second World War, as warfare reached new heights of totality, and bombs often fell kilometres off-target.",
    prerequisite_techs: ["interwar_bombers"],
    research_cost: 7500,
    year: 1940,
    unlocks: {
      unlock_unit: "bombers"
    }
  },
  mobile_warfare_doctrine: {
    name: "Mobile Warfare Doctrine",
    icon: "land_vehicles",
    description: "Mobile warfare, a variant of manoeuvre warfare, is a military school of thought that believes in the capability of armoured units and aeroplanes to act as the initial instruments on which to acheive a breakthrough of the enemy lines. Thereafter, in order to reduce logistical problems, motorised infantry should be used.",
    prerequisite_techs: ["combined_arms_doctrine"],
    research_cost: 7500,
    year: 1939,
    unlocks: {
      armour_ap: 0.10,
      aeroplanes_ap: 0.05
    }
  },
  modern_howitzers: {
    name: "Modern Howitzers",
    icon: "artillery_piece",
    description: "Modern howitzers typically featured rifled barrels and improved sights as well as longer barrels and are meant to be used in conjunction with motorised units.",
    prerequisite_techs: ["long_range_artillery"],
    research_cost: 7500,
    year: 1938,
    unlocks: {
      unlock_unit: "modern_howitzers"
    }
  },
  paratroopers: {
    name: "Paratroopers",
    icon: "aeroplanes",
    description: "Paratroopers are light infantry units capable of infiltrating behind enemy lines to capture strategic targets, but do not come with much armament themselves, and cannot be used single-handedly to support offensives, as seen in Operation Market Garden.",
    prerequisite_techs: ["freikorps"],
    research_cost: 7500,
    year: 1940,
    unlocks: {
      unlock_unit: "paratroopers",
      infantry_ap: 0.05
    }
  },
  support_companies: {
    name: "Support Companies",
    icon: "trade",
    description: "Support companies are often used to supply modern armies, not just logistically, but with intelligence, anti-aircraft capabilities, and other secondary purposes.",
    prerequisite_techs: ["modern_military_engineering"],
    research_cost: 7500,
    year: 1935,
    unlocks: {
      army_upkeep: -0.15,
      training_cost: 0.05
    }
  },
  heavy_tank: {
    name: "Heavy Tank",
    icon: "land_vehicles",
    description: "The heavy tank is a slow, lumbering vehicle, but is heavily armoured and capable of punching through the armour of any lower tank. They were to be the emperors of the battlefield, the battleships on which generals have so often hinged their offensives in the 20th century.",
    prerequisite_techs: ["medium_tank"],
    research_cost: 7500,
    year: 1921,
    unlocks: {
      unlock_unit: "heavy_tanks",
      armour_ap: 0.05
    }
  },

  extended_air_range: {
    name: "Extended Air Range",
    icon: "petroil",
    description: "With advancements in fuel efficiency, and engines of improved power, fighter escorts can now accompany bombers all the way to their target, resulting in further damages on enemy cities.",
    prerequisite_techs: ["advanced_fighters", "bombers"],
    research_cost: 8000,
    year: 1943,
    unlocks: {
      military_buildings: 1,
      army_travel_speed: 0.25,
      aeroplanes_ap: 0.05
    }
  },
  mass_mobilisation: {
    name: "Mass Mobilisation",
    icon: "old_map",
    description: "As new wars became wars of totality, it became imperative that the now cemented nation-state be able to mobilise its entire population in times of need, regardless of rank, race, or age. With modern military science and pre-prepared general mobilisation lists, larger populations than ever before could be drafted.",
    prerequisite_techs: ["mobile_warfare_doctrine"],
    research_cost: 8000,
    year: 1940,
    unlocks: {
      set_mobilisation_unit: "modern_infantry",
      mobilisation_size: 1.00,
      national_manpower: 0.05,
      non_core_manpower: 0.05,
      mobilisation_speed: -0.10,
      mobilisation_impact: -0.10
    }
  },
  sp_artillery: {
    name: "Self-Propelled Artillery",
    icon: "artillery_piece",
    description: "SP Artillery, or self-propelled artillery is a type of artillery gun that does not rely on the necessity of an external motorised unit to transport it in battle. These vehicles typically come with adequate protection for the driver, and are fully enclosed.",
    prerequisite_techs: ["modern_howitzers"],
    research_cost: 8000,
    year: 1942,
    unlocks: {
      unlock_unit: "self_propelled_artillery"
    }
  },
  special_forces: {
    name: "Special Forces",
    icon: "artillery_piece",
    description: "Special forces, in many ways, the successor to shock troops, were used to fulfil missions that required unconventional methods to acheive the intended objective.",
    prerequisite_techs: ["modern_howitzers"],
    research_cost: 8000,
    year: 1941,
    unlocks: {
      unlock_unit: "special_forces",
      infantry_ap: 0.05,
      obsolete_unit: "shock_troops"
    }
  },
  signal_companies: {
    name: "Signal Companies",
    icon: "checkmark",
    description: "Signal companies are support detachments that allow conventional regiments to communicate with each other more effectively, even without infrastructure, via wireless radio.",
    prerequisite_techs: ["support_companies"],
    research_cost: 8000,
    year: 1940,
    unlocks: {
      army_upkeep: -0.10,
      army_travel_speed: 0.40,
      training_cost: 0.10
    }
  },
  tank_destroyers: {
    name: "Tank Destroyers",
    icon: "land_vehicles",
    description: "Tank destroyers, based off of light tanks, often did not have full enclosure, but had the speed and armaments needed to counter even the heaviest of tanks, and served as mobile anti-tank units.",
    prerequisite_techs: ["heavy_tank"],
    research_cost: 8000,
    year: 1942,
    unlocks: {
      unlock_unit: "tank_destroyers"
    }
  },

  rocket_interceptor: {
    name: "Rocket Interceptor",
    icon: "aeroplanes",
    description: "Rocket interceptors were the first jet-powered aircraft to be used in a military context and were used to shoot down bomber aeroplanes in the closing days of World War II.",
    prerequisite_techs: ["extended_air_range"],
    research_cost: 8500,
    year: 1944,
    unlocks: {
      unlock_unit: "rocket_interceptors"
    }
  },
  strategic_bombers: {
    name: "Strategic Bombers",
    icon: "aeroplanes",
    description: "Strategic bombers are aircraft capable of carrying massive payloads over long distances, typically to drop on civilian targets, but also on military.",
    prerequisite_techs: ["extended_air_range"],
    research_cost: 8500,
    year: 1943,
    unlocks: {
      unlock_unit: "strategic_bombers"
    }
  },
  rocket_artillery: {
    name: "Rocket Artillery",
    icon: "artillery_piece",
    description: "Rocket artillery are a type of motorised artillery capable of firing rockets, eventually being armed with guided missiles that were able to strike targets with increasing accuracy.",
    prerequisite_techs: ["sp_artillery"],
    research_cost: 8500,
    year: 1939,
    unlocks: {
      unlock_unit: "rocket_artillery",
      artillery_ap: 0.05,
      army_upkeep: 0.10
    }
  },
  modern_infantry: {
    name: "Modern Infantry",
    icon: "soldiers",
    description: "Modern infantry are meant to serve in general-purpose environments and storm cities and other dense environments where defensability is more feasible.",
    prerequisite_techs: ["special_forces", "signal_companies"],
    research_cost: 8500,
    year: 1939,
    unlocks: {
      unlock_unit: "modern_infantry",
      obsolete_unit: ["freikorps", "bolt_action_infantry", "great_war_infantry"]
    }
  },
  troop_carriers: {
    name: "Troop Carriers",
    icon: "land_vehicles",
    description: "Troop carriers are motorised units specialising in rapid transport of infantry across vast swaths of terrain, allowing for improved mobility of armies.",
    prerequisite_techs: ["half_track"],
    research_cost: 8500,
    year: 1940,
    unlocks: {
      unlock_unit: "troop_carriers",
      army_travel_speed: 0.35
    }
  },
  improved_medium_tank: {
    name: "Improved Medium Tank",
    icon: "land_vehicles",
    description: "Improved medium tanks, the forerunner to modern tanks, were built with increased precision sighting and armament, such that they were capable of piercing enemy targets from long distances.",
    prerequisite_techs: ["tank_destroyers"],
    research_cost: 8500,
    year: 1943,
    unlocks: {
      unlock_unit: "improved_medium_tanks"
    }
  },

  scout_helicopters: {
    name: "Scout Helicopters",
    icon: "aeroplanes",
    description: "Scout helicopters, typically primtive helicopters with little to no protection, were low-flying vehicles capable of moving rapidly to scout out enemy positions.",
    prerequisite_techs: ["rocket_interceptor"],
    research_cost: 9000,
    year: 1946,
    unlocks: {
      unlock_unit: "scout_helicopters"
    }
  },
  jet_fighters: {
    name: "Jet Fighters",
    icon: "aeroplanes",
    description: "Fighter jets are modern aeroplanes, are fixed-wing aircraft often capable of acheiving of immediate subsonic, or supersonic speed and are built to establish air superiority over a battlefield.",
    prerequisite_techs: ["rocket_interceptor"],
    research_cost: 9000,
    year: 1947,
    unlocks: {
      unlock_unit: "jet_fighters",
      aeroplanes_ap: 0.05
    }
  },
  counterterrorism: {
    name: "Counterterrorism",
    icon: "cb",
    description: "With the rise of attacks on civilian targets during times of peace, efforts must be made to prevent and halt terrorists, especially in high-profile hostage situations, in order to reduce public fear.",
    prerequisite_techs: ["mass_mobilisation"],
    research_cost: 9000,
    year: 1972,
    unlocks: {
      infantry_dp: 0.10
    }
  },
  precision_guidance_systems: {
    name: "Precision Guidance Systems",
    icon: "cb",
    description: "Through the creation of guided missile systems, artillery accuracy on the ground can be drastically improved, allowing for future extensions not just in range, but in the effectiveness of artillery as a whole.",
    prerequisite_techs: ["rocket_artillery"],
    research_cost: 9000,
    year: 1944
  },
  modern_armoured_car: {
    name: "Modern Armoured Car",
    icon: "land_vehicles",
    description: "The modern armoured car often has large armaments with only light armour, allowing them to penetrate heavy tanks. Unlike tank destroyers, however, the majority are fully enclosed and also built to carry personnel.",
    prerequisite_techs: ["troop_carriers"],
    research_cost: 9000,
    year: 1943,
    unlocks: {
      unlock_unit: "modern_armoured_cars",
      obsolete_unit: "armoured_cars"
    }
  },
  modern_tank: {
    name: "Modern Tank",
    icon: "land_vehicles",
    description: "The advent of the moern tank, the immediate forerunner to the MBT, quickly rendered previous tanks obsolete as they featured a direct compromise between armour, armaments, and speed and were able to balance all effectively.",
    prerequisite_techs: ["improved_medium_tank"],
    research_cost: 9000,
    year: 1945,
    unlocks: {
      unlock_unit: "modern_tanks",
      obsolete_unit: ["improved_medium_tanks", "tank_destroyers", "heavy_tanks", "medium_tanks", "interwar_tanks", "light_tanks"]
    }
  },

  multirole_helicopters: {
    name: "Multirole Helicopters",
    icon: "aeroplanes",
    description: "Multirole helicopters, first built during the Vietnam war, were helicopters designed for enemy suppression, airmobile tactics, and logistical purposes.",
    prerequisite_techs: ["scout_helicopters"],
    research_cost: 9500,
    year: 1958,
    unlocks: {
      unlock_unit: "multirole_helicopters",
      obsolete_unit: "scout_helicopters"
    }
  },
  multirole_fighters: {
    name: "Multirole Fighters",
    icon: "aeroplanes",
    description: "Multirole fighters, designed to handle a variety of tasks quickly came to replace earlier fighters as they could now be used for dogfighting purposes, as strike aircraft, or for payload delivery.",
    prerequisite_techs: ["jet_fighters"],
    research_cost: 9500,
    year: 1972,
    unlocks: {
      unlock_unit: "multirole_fighters",
      obsolete_unit: ["rocket_interceptors", "advanced_fighters", "fighters", "propeller_fighters", "monoplane_fighters", "improved_biplanes", "biplanes", "early_bombers", "monoplane_bombers", "interwar_bombers", "bombers", "torpedo_bombers", "naval_bombers"]
    }
  },
  stealth_bombers: {
    name: "Stealth Bombers",
    icon: "aeroplanes",
    description: "Designed to carry massive payloads at high altitudes without fear of being detected, stealth bombers are able to fly over extended durations of time and inflict massive amounts of damage on opponents, despite their cost.",
    prerequisite_techs: ["strategic_bombers"],
    research_cost: 9500,
    year: 1989,
    unlocks: {
      unlock_unit: "stealth_bombers",
      aeroplanes_ap: 0.05
    }
  },
  asymmetric_land_warfare: {
    name: "Asymmetric Land Warfare",
    icon: "old_map",
    description: "Warfare is no longer confined to a singular dimension fought over land by conventional armies, but is now a matter of completely differing tactics and rules of war between different powers, often ending in unconventional warfare.",
    prerequisite_techs: ["counterterrorism"],
    research_cost: 9500,
    year: 1968,
    unlocks: {
      infantry_ap: 0.10,
      armour_ap: 0.05
    }
  },
  combined_arms_infantry: {
    name: "Combined Arms Infantry",
    icon: "manpower",
    description: "By integrating anti-air and anti-tank capabilities into our soldiers, and combining them with other types of equipment such as IFVs and the capability to call in precision airstrikes, we can afford to adopt a combined arms mentality for them.",
    prerequisite_techs: ["modern_infantry"],
    research_cost: 9500,
    year: 1953,
    unlocks: {
      unlock_unit: "combined_arms_infantry",
      army_upkeep: 0.10,
      obsolete_unit: "modern_infantry"
    }
  },
  modern_apc: {
    name: "Modern APC",
    icon: "land_vehicles",
    description: "Modern Armoured Personnel Carriers are typically meant to transport infantry safely whilst providing some form of protective cover from mines and other hazards. This will help improve our army mobility as our fleet of APCs are becoming increasingly outdated and obsolete.",
    prerequisite_techs: ["modern_armoured_car"],
    research_cost: 9500,
    year: 1966,
    unlocks: {
      unlock_unit: "modern_apcs",
      army_travel_speed: 0.60,
      army_upkeep: 0.05,
      obsolete_unit: ["armoured_personnel_carriers", "troop_carriers", "half_tracks"]
    }
  },
  main_battle_tank: {
    name: "Main Battle Tank",
    icon: "land_vehicles",
    description: "The Main Battle Tank (MBT) is a multipurpose unit designed for a variety of roles, including suppressive fire and offensive manoeuvres. Despite their fuel and production costs, they are typically robust units capable of attacking the enemy head-on.",
    prerequisite_techs: ["modern_tank"],
    research_cost: 9500,
    year: 1965,
    unlocks: {
      unlock_unit: "main_battle_tanks",
      army_travel_speed: 0.30,
      army_upkeep: 0.10,
      unit_cost: 0.05
    }
  },

  drones: {
    name: "Drones",
    icon: "aeroplanes",
    description: "Drones, or UAV's, are unmanned aerial vehicles capable of striking deep into enemy territory whilst being remote-controlled from a distance.",
    prerequisite_techs: ["multirole_fighters"],
    research_cost: 10000,
    year: 2001,
    unlocks: {
      unlock_unit: "drones"
    }
  },
  contemporary_armies: {
    name: "Contemporary Armies",
    icon: "artillery_piece",
    description: "The dawn of modern military thought has offered us new tactics regarding the role of infantry in warfare, and the various units appropriate for different types of terrain. By exploiting these advantages, we can gain a significant combat lead over our enemy. Unconventional warfare and hearts and minds are also being explored as well.",
    prerequisite_techs: ["stealth_bombers", "asymmetric_land_warfare", "precision_guidance_systems", "combined_arms_infantry"],
    research_cost: 10000,
    year: 1990,
    unlocks: {
      set_mobilisation_unit: "combined_arms_infantry",
      infantry_dp: 0.05,
      army_travel_speed: 0.20
    }
  },
  contemporary_infantry: {
    name: "Contemporary Infantry",
    icon: "manpower",
    description: "Modern infantry, borrowing from asymmetric warfare, must learn and adapt in order to suppress revolts and insurgencies often driven by unlawful combatants and terrorist organisations. As new threats to our renewed national security continue to present themselves, we must change our military doctrine accordingly.",
    prerequisite_techs: ["asymmetric_land_warfare", "combined_arms_infantry"],
    research_cost: 10000,
    year: 1990,
    unlocks: {
      unlock_unit: "contemporary_infantry"
    }
  },
  modern_support_companies: {
    name: "Modern Support Companies",
    icon: "active_personnel",
    description: "Modern support companies typically carry specialised equipment and are tasked with a wide range of roles in order to overcome any obstacles that a normal infantry battalion might face.",
    prerequisite_techs: ["signal_companies"],
    research_cost: 10000,
    year: 1960,
    unlocks: {
      infantry_ap: 0.15,
      artillery_ap: 0.05
    }
  },
  chobham_armour: {
    name: "Chobham Armour",
    icon: "steel",
    description: "Chobham Armour is a type of composite armour originating in the U.K. that took advantage of the sheer hardness of ceramics to shatter enemy projectiles upon impact. The exact nature of this armour remains classified.",
    prerequisite_techs: ["modern-apc"],
    research_cost: 10000,
    year: 1961,
    unlocks: {
      armour_dp: 0.05
    }
  },
  improved_sights: {
    name: "Improved Sights",
    icon: "government",
    description: "By improving our sights and adding night vision and thermal cameras, we can ensure that our tank crews are adequately equipped to deal with any situation where conventional vision alone is not enough.",
    prerequisite_techs: ["main_battle_tank"],
    research_cost: 10000,
    year: 1980,
    unlocks: {
      armour_ap: 0.10
    }
  },

  modern_helicopters: {
    name: "Modern Helicopters",
    icon: "aeroplanes",
    description: "Modern helicopters equipped with thermal sighting and missiles, are fast and quick aircraft meant for closer battlefield manoeuvres, although they remain distinctly vulnerable to infantry equipment such as MANPADS.",
    prerequisite_techs: ["multirole_helicopters"],
    research_cost: 10500,
    year: 1975,
    unlocks: {
      unlock_unit: "modern_helicopters"
    }
  },
  stealth_fighters: {
    name: "Stealth Fighters",
    icon: "aeroplanes",
    description: "Stealth fighters, designed to dodge radar and travel at supersonic speeds are fifth-generation jet fighters designed to establish aerial supremacy and drop ordnance on approaching targets.",
    prerequisite_techs: ["drones", "stealth_bombers"],
    research_cost: 10500,
    year: 2005,
    unlocks: {
      unlock_unit: "stealth_fighters"
    }
  },
  cyberwarfare: {
    name: "Cyberwarfare",
    icon: "building",
    description: "Cyberwarfare is the militarised use of digital infrastructure with the express purpose of incapacitating an enemy belligerent. Such attacks typically target both civilian and military sectors reliant on electronic mediums.",
    prerequisite_techs: ["contemporary_armies"],
    research_cost: 10500,
    year: 2008,
    unlocks: {
      infantry_ap: 0.10,
      armour_ap: 0.10,
      aeroplanes_ap: 0.10,
      army_upkeep: -0.10
    }
  },
  modern_mbt: {
    name: "Modern MBT",
    icon: "land_vehicles",
    description: "In order to ensure that our tanks are able to remain competitive on the battlefield, we should consider installing upgraded armaments and weaponry onto them to make sure that they retain their edge, lest it be overtaken by other forces.",
    prerequisite_techs: ["chobham_armour", "improved_sights"],
    research_cost: 10500,
    year: 2009,
    unlocks: {
      unlock_unit: "modern_mbts",
      obsolete_unit: ["modern_tanks", "main_battle_tanks"]
    }
  },
  railguns: {
    name: "Railguns",
    icon: "artillery_piece",
    description: "Railguns are pieces of artillery that use electromagneticism to launch kinetic projectiles at speeds of more than 3 kilometres a second. The damage itself relies purely on the shape, velocity and mass of the projectile fired.",
    prerequisite_techs: ["contemporary_armies"],
    research_cost: 10500,
    year: 2020,
    unlocks: {
      unlock_unit: "railguns",
      artillery_ap: 0.05
    }
  },
  cyberwarfare_units: {
    name: "Cyberwarfare Units",
    icon: "manpower",
    description: "By creating entire battalions of organised cadres of hackers and cybersecurity experts, we can hope to inflict maximum damage upon our enemy's military and industrial capacity whilst preserving our own.",
    prerequisite_techs: ["modern_support_companies"],
    research_cost: 10500,
    year: 2010,
    unlocks: {
      army_upkeep: -0.10,
      war_exhaustion_rate: 0.02
    }
  },

  ai_multirole_fighters: {
    name: "AI Multirole Fighters",
    icon: "aeroplanes",
    description: "AI Multirole Fighters are seventh-generational fighter jets capable of attacking targets completely autonomously without any human input whatsoever. As their target recognition systems are highly advanced, they cost significantly more to train and maintain than normal fighter jets.",
    prerequisite_techs: ["stealth_fighters"],
    research_cost: 11000,
    year: 2035,
    unlocks: {
      unlock_unit: "ai_multirole_fighters",
      army_upkeep: 0.05
    }
  },
  ai_bombers: {
    name: "AI Bombers",
    icon: "aeroplanes",
    description: "AI Stealth Bombers are able to identify and attack targets with lightning fast speed and precision, and unlike other earlier UAVs, do not require human control. Despite the innate dangers of using and fielding such weapons, they can give us an unprecedented edge on the battlefield.",
    prerequisite_techs: ["drones", "stealth_bombers"],
    research_cost: 11000,
    year: 2035,
    unlocks: {
      unlock_unit: "ai_bombers",
      aeroplanes_ap: 0.10,
      army_upkeep: 0.05
    }
  },
  directed_heat_weaponry: {
    name: "Directed Heat Weaponry",
    icon: "infamy",
    description: "Directed heat weaponry, long the realm of science fiction has become possible as a non-lethal alternative to conventional weapons, albeit immensely painful. It can be used for internal security purposes, or incapacitating enemy soldiers.",
    prerequisite_techs: ["railguns"],
    research_cost: 11000,
    year: 2019,
    unlocks: {
      unlock_unit: "directed_heat_weapons",
      stability_modifier: 0.05
    }
  },
  augmented_infantry: {
    name: "Augmented Infantry",
    icon: "active_personnel",
    description: "Augmented infantry are units lent a helping hand by cutting edge robots and AI that enable them to conduct missions and possess capabilities that could otherwise have never been held by ordinary infantry units, allowing them to take the offensive.",
    prerequisite_techs: ["contemporary_infantry"],
    research_cost: 11000,
    year: 2040,
    unlocks: {
      unlock_unit: "augmented_infantry"
    }
  },
  multirole_mbt: {
    name: "Multirole MBT",
    icon: "land_vehicles",
    description: "In response to the ever changing dynamics of the battlefield, our tankers should be given the finest weaponry and AI assistance that can be afforded. Our tanks shall now possess anti-aircraft capabilities, and function as mobile artillery when needed - a truly versatile material crucial to forge the victories of tomorrow.",
    prerequisite_techs: ["modern_mbt"],
    research_cost: 11000,
    year: 2030,
    unlocks: {
      unlock_unit: "multirole_mbt",
      ground_vehicles_dp: 0.10
    }
  }
};
