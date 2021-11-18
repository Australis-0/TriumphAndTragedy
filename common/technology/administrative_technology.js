//Administrative Technology
config.technology.administrative_technology = {
  early_colonial_administration: {
    name: "Early Colonial Administration",
    icon: "technology",
    description: "Early colonial administration was typically managed by those deemed capable of managing the colony and easing it into a state of survival. Although not ideal for long-term growth, they were instrumental in growing colonies initially.",
    research_cost: 20,
    year: 1520,
    unlocks: {
      maximum_expeditions: 1
    }
  },

  the_courthouse: {
    name: "The Courthouse",
    icon: "political_capital",
    description: "The courthouse, used to provide rule of law for the common citizenry, is imperative to maintain a semblance of public order in any nation, and will go a long way in cementing our legitimacy over the people as a government.",
    prerequisite_techs: ["early_colonial_administration"],
    research_cost: 50,
    year: 1550,
    unlocks: {
      stability_modifier: 0.05
    }
  },
  cartography: {
    name: "Cartography",
    icon: "old_map",
    description: "The art of map-making is beginning to diverge into a science as cartographic maps are used increasingly for navigation and administration, and the maps it produces are even used to wage battles.",
    prerequisite_techs: ["early_colonial_administration"],
    research_cost: 50,
    year: 1569,
    unlocks: {
      colonist_travel_speed: -0.05
    }
  },

  universities: {
    name: "Universities",
    icon: "knowledge",
    description: "Central locations of learning and beacons of knowledge, universities help guide our country into the future as youth from all over our nation will come to these places to study and further develop emerging fields of research.",
    prerequisite_techs: ["the_courthouse"],
    research_cost: 75,
    year: 1500,
    unlocks: {
      unlock_building: "universities"
    }
  },
  colonial_charters: {
    name: "Colonial Charters",
    icon: "old_map",
    description: "Originally given out as grants of land for colonies, overtime they evolved into having their own separate administration, typically with high degrees of autonomy from their mother country as more and more settlers came to settle in these charters.",
    prerequisite_techs: ["cartography"],
    research_cost: 75,
    year: 1600,
    unlocks: {
      maximum_expeditions: 1
    }
  },

  early_modern_bureaucracy: {
    name: "Early Modern Bureaucracy",
    icon: "government",
    description: "By switching our system of government from one that merely follows the whims of various aristocrats to one that works on a merit-based system, we can begin to enforce an early modern bureaucracy in which all valid candidates are considered of equal worth.",
    prerequisite_techs: ["universities", "colonial_charters"],
    research_cost: 100,
    year: 1600,
    unlocks: {
      building_cost: -0.05,
      unlock_reform: "bureaucracy"
    }
  },

  standardisation_of_units: {
    name: "Standardisation of Units",
    icon: "stability",
    description: "The standardisation of units will help improve governmental efficiency and reduce cheating on the local level, as peasants and serfs will now be aware of what level of tax they have to pay, and whether or not their lord is cheating them by skimming some off the top, or by raising their taxes, leading to excess burdens.",
    prerequisite_techs: ["early_modern_bureaucracy"],
    research_cost: 150,
    year: 1643,
    unlocks: {
      building_cost: -0.05,
      administrative_efficiency: 0.05
    }
  },
  corvee: {
    name: "Corvée",
    icon: "taxes",
    description: "The corvee was a labour tax instituted in France, as well as several other European nations for the express purpose of building up infrastructure, typically for the benefit of the military, although it could also serve other purposes.",
    prerequisite_techs: ["early_modern_bureaucracy"],
    research_cost: 150,
    year: 1620,
    unlocks: {
      national_manpower: 0.05
    }
  },
  religious_tolerance: {
    name: "Religious Tolerance",
    icon: "old_scroll",
    description: "The increase of religious tolerance in our country could help lead to a defusing of tensions between divergent sects of our faith, and reduce civil violence.",
    prerequisite_techs: ["early_modern_bureaucracy"],
    research_cost: 150,
    year: 1648,
    unlocks: {
      stability_modifier: 0.05
    }
  },
  centralisation: {
    name: "Centralisation",
    icon: "provinces",
    description: "Although our state and the central government has long been swayed underneath the power and influence of the various nobles and vassals that comprise our country, through organised systems of placation, we can slowly whittle away their power peacefully, cementing a modern government capable of delegating duties.",
    prerequisite_techs: ["standardisation_of_units"],
    research_cost: 200,
    year: 1643,
    unlocks: {
      enable_centralisation: true
    }
  },
  tax_oversight: {
    name: "Tax Oversight",
    icon: "taxes",
    description: "By overseeing the nobles who are conducting our taxes, we can reduce the burden on the peasants, but also fill up our state coffers rather nicely in the process. Of course they won't be happy, but that's their lot.",
    prerequisite_techs: ["corvee"],
    research_cost: 200,
    year: 1600,
    unlocks: {
      tax_efficiency: 0.03
    }
  },
  diplomatic_code: {
    name: "Diplomatic Code",
    icon: "faculty",
    description: "As thoughts of modernity and civilised expectations begin to sweep around the world, it seems only fair that we should codify our protection of diplomats to promote bilateral relations between us and other countries.",
    prerequisite_techs: ["religious_tolerance"],
    research_cost: 200,
    year: 1648,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  absolutism: {
    name: "Absolutism",
    icon: "government_scroll",
    description: "Although viewed by many as the simple rule of a petty tyrant, absolutism will help increase the unity of our state, eventually leading to a situation in which the authority of nobles will be greatly devolved.",
    prerequisite_techs: ["religious_tolerance"],
    research_cost: 250,
    year: 1654,
    unlocks: {
      ruling_party_support: 0.02
    }
  },
  code_of_laws: {
    name: "Code of Laws",
    icon: "old_scroll",
    description: "By codifying our entire set of laws, we can make it clear to the people what we expect of them and their behaviour, and what practices to avoid, increasing social and national stability. Anything not found in the law is not law at all.",
    prerequisite_techs: ["religious_tolerance"],
    research_cost: 250,
    year: 1660,
    unlocks: {
      unlock_reform: "penal_system"
    }
  },
  laws_of_war: {
    name: "Laws of War",
    icon: "cb",
    description: "By setting some standards for the treatment of enemy belligerents during wartime, we can ensure that our own soldiers are treated, if not well, then at least acceptably.",
    prerequisite_techs: ["religious_tolerance"],
    research_cost: 250,
    year: 1648,
    unlocks: {
      diplomatic_slots: 1
    }
  },
  modern_theocracy: {
    name: "Modern Theocracy",
    icon: "infamy",
    description: "The organisation of a modern theocracy, though challenging, would help in assisting our nation's souls into their afterlife, and would lend us great power over the everyday lives of the average citizen.",
    prerequisite_techs: ["absolutism"],
    research_cost: 350,
    year: 1650,
    unlocks: {
      ruling_party_only: 0.02
    }
  },
  constitutionalism: {
    name: "Constitutionalism",
    icon: "paper",
    description: "The code of laws can be taken a step further into a constitution, severely restricting the power of the king, and opening up new voting rights for the landed gentry and aristocrats that make up this nation. Although the peasants and middle-class in our country may be upset at their own lack of representation ...",
    prerequisite_techs: ["code_of_laws"],
    research_cost: 350,
    unlocks: {
      reform_desire_gain: -0.01
    }
  },

  the_nation_state: {
    name: "The Nation State",
    icon: "globe",
    description: "The modern nation state is a government capable of exercising authority over its demarcated territories whilst at the same time providing services for its people. It is the modern concept of a nation as we know it.",
    prerequisite_techs: ["absolutism", "constitutionalism"],
    research_cost: 500,
    year: 1648,
    unlocks: {
      stability_modifier: 0.05,
      prestige: 20,
      political_capital_gain: 3
    }
  },
  parliament: {
    name: "Parliament",
    icon: "political_capital",
    description: "A legislative body in charge of passing the laws of the land, the concept of a Parliament, even if not instituted, will at least give our citizens the hope that they will be represented someday.",
    prerequisite_techs: ["absolutism", "constitutionalism"],
    research_cost: 500,
    year: 1655,
    unlocks: {
      unlock_reform: "upper_house"
    }
  },

  military_oversight: {
    name: "Military Oversight",
    icon: "manpower",
    description: "Oversight of the military will help reduce the rampant corruption prevalent in our armed forces, and help transform our nation's army into a modern, professional fighting force.",
    prerequisite_techs: ["the_nation_state"],
    research_cost: 650,
    unlocks: {
      army_upkeep: -0.05,
      colonial_power_gain: 0.05
    }
  },
  enlightened_absolutism: {
    name: "Enlightened Absolutism",
    icon: "government_scroll",
    description: "By promising to bring about the reforms of the Enlightenment whilst maintaining an autocracy, we can placate some of the more reform-minded subjects amongst our population, and be seen as a forwards-looking ruler. At least for our time.",
    prerequisite_techs: ["the_nation_state"],
    research_cost: 650,
    year: 1740,
    unlocks: {
      unlock_reform: "slavery",
      constitutional_monarchy: 0.01
    }
  },
  diplomatic_order: {
    name: "Diplomatic Order",
    icon: "faculty",
    description: "As the diplomatic order, at least in the civilised world as we know it, continues to evolve, we should seek to keep our code up to date, and develop the concept of diplomatic immunity further, as well as the recognition of treaties as contractual obligations between nations.",
    prerequisite_techs: ["laws_of_war"],
    research_cost: 650,
    year: 1755,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  colonialism: {
    name: "Colonialism",
    icon: "soldiers",
    description: "The doctrine of expansion for centuries, colonialism often meant acquiring land outside one's own continent and bringing it into their own fold in order to extract more resources and to establish ports in strategic locations for further expansion.",
    prerequisite_techs: ["military_oversight"],
    research_cost: 750,
    year: 1756,
    unlocks: {
      maximum_expeditions: 1
    }
  },
  national_sovereignty: {
    name: "National Sovereignty",
    icon: "provinces",
    description: "Concepts around the national sovereignty of nations and the right to control and determine their own destiny are starting to become more firmly entrenched in the minds of the leaders of many of the world's nations, and as such, we should be careful to 'respect' it as best we can.",
    prerequisite_techs: ["enlightened_absolutism"],
    research_cost: 750,
    year: 1740,
    unlocks: {
      centralisation: 0.05
    }
  },
  landed_gentry: {
    name: "Landed Gentry",
    icon: "faculty",
    description: "In a constitutional monarchy, the landed gentry or those of the wealthy and the aristocracy were among the first to gain access to the vote, leading to further restrictions on the powers of the monarch and further opportunities to pass new legislation.",
    prerequisite_techs: ["parliament"],
    research_cost: 750,
    year: 1750,
    unlocks: {
      unlock_reform: "voting_system"
    }
  },
  balance_of_power: {
    name: "Balance of Power",
    icon: "stability",
    description: "As nations are inevitably concerned about their own self-interest and how far they can advance their own priorities, it becomes important to maintain a balance of power in the region in order to ensure that a single power bloc is not capable of dominating the entire landscape.",
    prerequisite_techs: ["diplomatic_order"],
    research_cost: 750,
    year: 1756,
    unlocks: {
      stability_modifier: -0.05
    }
  },

  colonial_bureaucracy: {
    name: "Colonial Bureaucracy",
    icon: "globe",
    description: "By creating more organised systems for our colonies, we can help to provide more effective governance than ever before, increasing our colonial capacity and allowing for more settlers to emigrate overseas.",
    prerequisite_techs: ["colonialism"],
    research_cost: 900,
    year: 1760,
    unlocks: {
      maximum_expeditions: 1
    }
  },
  organised_postage: {
    name: "Organised Postage",
    icon: "trade",
    description: "The postal system of a country is arguably as important as the roads themselves. The improvement of lines of communication across our nation and empire become increasingly important as they are the conduits upon which our merchants and bureaucracy depend.",
    prerequisite_techs: ["national_sovereignty"],
    research_cost: 900,
    year: 1780,
    unlocks: {
      shipment_capacity: 50
    }
  },
  great_power_status: {
    name: "Great Power Status",
    icon: "prestige",
    description: "By emphasising the qualities of power projection, we can achieve great power status as we subtly influence other nations into doing what we want them to do.",
    prerequisite_techs: ["balance_of_power"],
    research_cost: 900,
    year: 1815,
    unlocks: {
      prestige_gain: 5,
      army_upkeep: -0.05
    }
  },

  divide_and_conquer: {
    name: "Divide and Conquer",
    icon: "infamy",
    description: "Although imperial rule may not always be easy, we can pit the natives against each other in order to lessen the probability of short-term revolt at the risk of increasing long-term violence.",
    prerequisite_techs: ["colonial_bureaucracy"],
    research_cost: 1000,
    year: 1819,
    unlocks: {
      maximum_expeditions: 1
    }
  },
  land_clearance: {
    name: "Land Clearance",
    icon: "provinces",
    description: "Mopping up several parcels of land into a single unified lot can improve efficiency and allow our businessmen greater opportunities when it comes to utilising our natural resources.",
    prerequisite_techs: ["organised_postage"],
    research_cost: 1000,
    year: 1790,
    unlocks: {
      administrative_efficiency: 0.03
    }
  },
  political_thought_and_theory: {
    name: "Political Thought and Theory",
    icon: "old_scroll",
    description: "As consciousness amongst our population begins to rise, and governments become more representative of the people, if not in truth, then at least in theory, political ideologies are beginning to adapt to the beliefs and cultures which they inhabit.",
    prerequisite_techs: ["landed_gentry"],
    research_cost: 1000,
    year: 1789,
    unlocks: {
      political_capital_gain: 2
    }
  },

  early_imperialism: {
    name: "Early Imperialism",
    icon: "taxes",
    description: "Imperialism took colonialism to the next level by proclaiming a civilising mission across multiple continents in order to justify the subjugation of natives in the area. It later became used to refer to the influence colonial masters held over their 'protectorates' and client states.",
    prerequisite_techs: ["divide_and_conquer"],
    research_cost: 1200,
    unlocks: {
      colonial_power_gain: 0.10,
      unlock_unit: "colonists",
      obsolete_unit: "settlers"
    }
  },
  absolute_rulership: {
    name: "Absolute Rulership",
    icon: "government",
    description: "Sometimes the best government is one that has total authority over every aspect of life. At least that's what our leader thinks.",
    prerequisite_techs: ["land_clearance"],
    research_cost: 1200,
    year: 1815,
    unlocks: {
      centralisation: 0.05
    }
  },
  political_standardisation: {
    name: "Political Centralisation",
    icon: "old_scroll",
    description: "The varying aspects of all the political ideologies that were borne forth out of the great revolutions are finally beginning to coalesce into standard ideologies, of which certain tenets are shared between people of different political beliefs.",
    prerequisite_techs: ["political_thought_and_theory"],
    research_cost: 1200,
    year: 1848,
    unlocks: {
      ruling_party_support: 0.01
    }
  },
  coalitionism: {
    name: "Coalitionism",
    icon: "old_map",
    description: "Minority governments, now that they are elected in certain parliamentary democracies, have the duty to form a coalition in order to gain a majority in Parliament, such that they will be capable of passing laws and enacting reforms in an equitable manner for the general public.",
    prerequisite_techs: ["great_power_status"],
    research_cost: 1200,
    year: 1848,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  logical_units: {
    name: "Logical Units",
    icon: "stability",
    description: "Despite the standardisation of our units having already occurred, certain scientists believe that measures should correspond to natural constants, as they believe that these measurements would be more 'logical' and 'natural'. Whether or not we adopt these policy changes, however, is up to us.",
    prerequisite_techs: ["absolute_rulership"],
    research_cost: 1400,
    year: 1791,
    unlocks: {
      unlock_building: "research_labs",
      research_buildings: 1,
      centralisation: 0.05
    }
  },
  the_constitution: {
    name: "The Constitution",
    icon: "old_scroll",
    description: "Although the concept of restricted powers and a code of laws has been around for a while, the time has finally come to update and formalise our constitution into something that will stand the test of time.",
    prerequisite_techs: ["political_standardisation"],
    research_cost: 1400,
    year: 1787,
    unlocks: {
      unlock_building: "political_parties"
    }
  },
  intervention: {
    name: "Intervention",
    icon: "old_scroll",
    description: "Since the first 'bright' intellectuals came up with the concept of 'Bellum Justum', it falls upon us to figure out how to intervene in wars without the ire of our population. Concepts such as mutual defence and false-flag operations provide that casus belli, the reason for war that we so desperately need.",
    prerequisite_techs: ["coalitionism"],
    research_cost: 1400,
    year: 1854,
    unlocks: {
      cb_generation_speed: 0.25
    }
  },

  improved_colonial_administration: {
    name: "Improved Colonial Administration",
    icon: "provinces",
    description: "Through the layout of ethnographic maps and historic provinces, we can help divide our colonial subjects up how we see best fit for their governance.",
    prerequisite_techs: ["early_imperialism"],
    research_cost: 1600,
    year: 1850,
    unlocks: {
      unlock_unit: "magnates",
      obsolete_unit: "colonists",
      colonial_power_gain: 0.05,
      overextension: -0.05
    }
  },
  prussian_constitutionalism: {
    name: "Prussian Constitutionalism",
    icon: "government",
    description: "Originating in the German state of Prussia, Prussian constitutionalism attempts to maintain a balance between complete constitutional monarchy as seen in Britain and an absolute monarchy where the monarch was to do as they saw fit.",
    prerequisite_techs: ["logical_units"],
    research_cost: 1600,
    year: 1850,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  separation_of_powers: {
    name: "Separation of Powers",
    icon: "political_capital",
    description: "In order to maintain a truly free democracy, the various branches of government must be separated in a such a manner that neither one of the branches is capable of holding a monopoly on government power.",
    prerequisite_techs: ["the_constitution"],
    research_cost: 1600,
    year: 1809,
    unlocks: {
      republicanism: 0.05
    }
  },
  modern_diplomatic_institutions: {
    name: "Modern Diplomatic Institutions",
    icon: "faculty",
    description: "Embassies, consulates, diplomatic missions and international agreements are slowly becoming more and more commonplace among the nations of the world, and it is only right that our great nation should take part in them as well.",
    prerequisite_techs: ["intervention"],
    research_cost: 1600,
    year: 1836,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  modern_bureaucracy: {
    name: "Modern Bureaucracy",
    icon: "knowledge",
    description: "The wheels and cogs of our government are beginning to turn as the first dedicated agencies to their service, the postal office and the central bank, are slowly beginning to cement themselves into the everyday vernacular. As our government expands, we must be careful to exercise our control well, lest certain parties increase unrest among our populace.",
    prerequisite_techs: ["prussian_constitutionalism"],
    research_cost: 1800,
    year: 1866,
    unlocks: {
      research_buildings: 1,
      political_capital_gain: 2,
      unlock_reform: "school_system"
    }
  },
  bill_of_rights: {
    name: "Bill of Rights",
    icon: "old_scroll",
    description: "The Bill of Rights guarantees civil rights and liberties to the individual, like freedom of speech, press, and religion. It sets rules for due process of law and reserves all powers not delegated to the Government to the people.",
    prerequisite_techs: ["separation_of_powers"],
    research_cost: 1800,
    year: 1689,
    unlocks: {
      republicanism: 0.05
    }
  },
  sphere_of_influence: {
    name: "Sphere of Influence",
    icon: "old_map",
    description: "A sphere of influence is a spatial region or concept division over which a state has a level of cultural, economic, military, or political exclusivity.",
    prerequisite_techs: ["modern_diplomatic_institutions"],
    research_cost: 1800,
    year: 1895,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  colonial_autonomy: {
    name: "Colonial Autonomy",
    icon: "consciousness",
    description: "Colonial autonomy allows for the existence of colonies with an elected government in which elected rulers were able to make most decisions without referring to the colonial power with nominal control of the colony.",
    prerequisite_techs: ["improved_colonial_administration"],
    research_cost: 2000,
    year: 1850,
    unlocks: {
      colonial_maintenance: -0.05
    }
  },
  instant_communciations: {
    name: "Instant Communications",
    icon: "naval_units",
    description: "The advent of the telegraph has allowed our country to revolutionise communication between not just our administrative entities, but also our finance centres and military as well, allowing for improved administrative efficiency.",
    prerequisite_techs: ["modern_bureaucracy"],
    research_cost: 2000,
    year: 1851,
    unlocks: {
      research_buildings: 1,
      administrative_efficiency: 0.03
    }
  },
  increased_voting_rights: {
    name: "Increased Voting Rights",
    icon: "soldiers",
    description: "People in foreign lands are beginning to demand that they be given more say in political affairs, and as voter suffrage becomes a bigger issue abroad, perhaps it's time to look at our own country as well for consideration.",
    prerequisite_techs: ["bill_of_rights"],
    research_cost: 2000,
    year: 1880,
    unlocks: {
      unlock_reform: ["public_meetings", "political_rights"]
    }
  },
  political_union: {
    name: "Political Union",
    icon: "government",
    description: "A political union, in which all the parts thereof are intertwined either in a loose type of federalism where each state is still technically sovereign, or in a single union that comprises many autonomous regions, can encompass people of different ethnicities and languages by treating them as first-class citizens.",
    prerequisite_techs: ["sphere_of_influence"],
    research_cost: 2000,
    year: 1865,
    unlocks: {
      political_capital_gain: 1
    }
  },

  dominion_status: {
    name: "Dominion Status",
    icon: "government_scroll",
    description: "Overseas colonies are already clamouring for greater say in their external affairs. Granting them Dominion status would be a step in this direction, and would reduce our colonial maintenance expenses significantly.",
    prerequisite_techs: ["colonial_autonomy"],
    research_cost: 2500,
    year: 1901,
    unlocks: {
      colonial_maintenance: -0.10
    }
  },
  timezone_standardisation: {
    name: "Timezone Standardisation",
    icon: "building",
    description: "Timezone Standardisation will allow for the railways to run on time as trains no longer have to be adjusted to a town's local time, improving the speed at which citizens of our nation can travel between cities.",
    prerequisite_techs: ["instant_communciations"],
    research_cost: 2500,
    year: 1880,
    unlocks: {
      administrative_efficiency: 0.03
    }
  },
  revolution_and_counterrevolution: {
    name: "Revolution and Counterrevolution",
    icon: "infamy",
    description: "The advent of republicanism, especially violent one, has shaken the monarchies of the world to their core as more absolutist monarchies have to contend with new republics that threaten to stir up the international order.",
    prerequisite_techs: ["increased_voting_rights"],
    research_cost: 2500,
    year: 1905,
    unlocks: {
      unlock_reform: "vote_franchise"
    }
  },
  international_order: {
    name: "International Order",
    icon: "diplomacy",
    description: "As the position of Great Powers in international politics become more cemented, we must learn to deal with them on the world stage if we wish to compete internationally.",
    prerequisite_techs: ["political_union"],
    research_cost: 2500,
    year: 1910,
    unlocks: {
      influence_gain: 0.05
    }
  },
  military_academies: {
    name: "Military Academies",
    icon: "manpower",
    description: "Establishing professional schools of training where our officers can learn tactics and adapt in wargames will help to greatly improve our current military professionalism.",
    prerequisite_techs: ["dominion_status"],
    research_cost: 3000,
    year: 1880,
    unlocks: {
      army_professionalism: 0.10
    }
  },
  industrial_towns: {
    name: "Industrial Towns",
    icon: "factory",
    description: "The establishment of industrial towns, solely dedicated to the furthering of our nation's industry, will become pivotal in the manufacturing sectors of our nation in the years to come.",
    prerequisite_techs: ["timezone_standardisation"],
    research_cost: 3000,
    year: 1880,
    unlocks: {
      administrative_efficiency: 0.03
    }
  },
  popular_reform: {
    name: "Popular Reform",
    icon: "old_scroll",
    description: "Reforms in democratic states often demanded by the public can be passed in such institutions as Parliament, allowing for reforms to be made on a wide scale.",
    prerequisite_techs: ["timezone_standardisation"],
    research_cost: 3000,
    year: 1895,
    unlocks: {
      constitutional_monarchy: 0.01,
      democracy: 0.01,
      socialism: 0.01,
      unlock_reform: "healthcare"
    }
  },
  humane_treatment: {
    name: "Humane Treatment",
    icon: "revolt",
    description: "Calls to outlaw such subtleties such as torture and arbitrary imprisonment have lead the populations of certain nations to begin calling for the criminalisation of 'cruel and unusual' punishments.",
    prerequisite_techs: ["timezone_standardisation"],
    research_cost: 3000,
    year: 1895,
    unlocks: {
      opinion_modifier: 10
    }
  },

  divergent_political_thought: {
    name: "Divergent Political Thought",
    icon: "knowledge",
    description: "As the spectre of new ideologies begin to take hold over the Continent, our nation's leaders should be careful to keep an eye on the situation to root out various forms of extremism.",
    prerequisite_techs: ["industrial_towns"],
    research_cost: 3500,
    year: 1914,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  universal_suffrage: {
    name: "Universal Suffrage",
    icon: "old_scroll",
    description: "Much like the old Chartist refrain, other nations have begun to take it on themselves to provide universal suffrage to all males, and are also beginning to provide suffrage to females.",
    prerequisite_techs: ["popular_reform"],
    research_cost: 3500,
    year: 1920,
    unlocks: {
      political_capital: 50
    }
  },

  communism: {
    name: "Communism",
    icon: "infamy",
    description: "Socialism is when the government does stuff. And the more stuff they do, the more socialist it gets. And if they do a whole lot of stuff, it's communism.",
    prerequisite_techs: ["divergent_political_thought"],
    research_cost: 4000,
    year: 1870,
    unlocks: {
      unlock_government: "communism"
    }
  },
  mass_politics: {
    name: "Mass Politics",
    icon: "old_scroll",
    description: "The emergence of new ideas and ideologies have piqued the common man's interest in politics, as they increasingly search for new ways of effective governance.",
    prerequisite_techs: ["universal_suffrage"],
    research_cost: 4000,
    year: 1900,
    unlocks: {
      unlock_reform: "press_rights"
    }
  },
  international_trade_agreements: {
    name: "International Trade Agreements",
    icon: "diplomacy",
    description: "Increasingly, with the power projection of the countries that dominate this world, even uncivilised nations have to accept the sovereign immunity of diplomats.",
    prerequisite_techs: ["universal_suffrage"],
    research_cost: 4000,
    year: 1890,
    unlocks: {
      opinion_modifier: 5
    }
  },

  protectorates: {
    name: "Protectorates",
    icon: "old_map",
    description: "Protectorates are de jure nations that are given 'protection' by major colonial powers in exchange for large amounts of influence.",
    prerequisite_techs: ["military_academies"],
    research_cost: 4500,
    year: 1890,
    unlocks: {
      unlock_unit: "administrators",
      obsolete_unit: "magnates",
      colonial_power_gain: 0.05
    }
  },
  fascism: {
    name: "Fascism",
    icon: "land_vehicles",
    description: "Fascism is a doctrine that espouses the racial and national superiority of one's own country, often using political violence and intimidation in order to gain power before launching aggressive military campaigns in pursuit of a nationalist vision.",
    prerequisite_techs: ["communism"],
    research_cost: 4500,
    year: 1923,
    unlocks: {
      unlock_government: "fascism"
    }
  },
  self_determination: {
    name: "Self Determination",
    icon: "knowledge",
    description: "A term Woodrow Wilson invented that doesn't actually mean anything. - Colonial Powers, probably.",
    prerequisite_techs: ["international_diplomatic_immunity"],
    research_cost: 4500,
    year: 1918,
    unlocks: {
      stability_modifier: -0.10,
      political_capital_gain: 2
    }
  },

  home_rule: {
    name: "Home Rule",
    icon: "political_capital",
    description: "Seeking a compromise between direct rule, and complete independence, Home Rule allows for complete independence of the legislature whilst aligned with the foreign policy interests of the mother country.",
    prerequisite_techs: ["protectorates"],
    research_cost: 5000,
    year: 1920,
    unlocks: {
      colonial_maintenance: -0.05
    }
  },
  socialism: {
    name: "Socialism",
    icon: "workers",
    description: "Socialism is a blanket term for a wide range of economic and social systems characterised by social ownership of the means of production and workers' self-management of enterprises.",
    prerequisite_techs: ["fascism"],
    research_cost: 5000,
    year: 1936,
    unlocks: {
      unlock_government: "socialism"
    }
  },
  womens_suffrage: {
    name: "Women's Suffrage",
    icon: "consciousness",
    description: "he right for women to vote and participate in elections is a large step in the right direction in the fight for political equality and social reform, distancing societies from traditional gender roles.",
    prerequisite_techs: ["mass_politics"],
    research_cost: 5000,
    year: 1920,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  geneva_convention: {
    name: "Geneva Convention",
    icon: "diplomacy",
    description: "The Geneva Convention establishes the standard international law for human treatment in war, rules that apply in times of armed conflict that are aimed to protect people who are not included in taking part in hostilities.",
    prerequisite_techs: ["self_determination"],
    research_cost: 5000,
    year: 1929,
    unlocks: {
      infamy_loss: 0.02
    }
  },
  colonial_management: {
    name: "Colonial Management",
    icon: "old_map",
    description: "The vast swaths of land claimed by colonial powers aren't going to govern themselves, and the natives certainly won't be having a say either. Colonial management aims to exploit the resources and population of the colonies in order to maximise profits, with little to no regards for morality.",
    prerequisite_techs: ["home_rule"],
    research_cost: 5500,
    year: 1930,
    unlocks: {
      colonial_power_gain: 0.05
    }
  },

  decentralised_administration: {
    name: "Decentralised Administration",
    icon: "provinces",
    description: "By allowing our various states and provinces to hold a high level of autonomy whilst reserving large amounts of federal power, we can potentially decrease the fiscal and administrative burden placed on local governments.",
    prerequisite_techs: ["socialism"],
    research_cost: 5500,
    year: 1930,
    unlocks: {
      administrative_efficiency: 0.03
    }
  },
  frontier_control: {
    name: "Frontier Control",
    icon: "soldiers",
    description: "Having the power to check those coming in and out of our country will help in reducing the crime rate, as well as for checking for hostile actors who seek to upend our system and traditions.",
    prerequisite_techs: ["geneva_convention"],
    research_cost: 5500,
    year: 1930,
    unlocks: {
      political_capital_gain: 1,
      crime_rate: -0.05
    }
  },

  trusts_and_mandates: {
    name: "Trusts & Mandates",
    icon: "globe",
    description: "Having the power to check those coming in and out of our country will help in reducing the crime rate, as well as for checking for hostile actors who seek to upend our system and traditions.",
    prerequisite_techs: ["colonial_management"],
    research_cost: 6000,
    year: 1919,
    unlocks: {
      unlock_unit: "bureaucrats",
      obsolete_unit: "administrators",
      colonial_maintenance: -0.05
    }
  },
  multi_party_political_systems: {
    name: "Multi-Party Political Systems",
    icon: "government",
    description: "A multi-party political system allows for multiple political parties across the political spectrum to run in elections and have the capability to gain control of government institutions, either separately or in coalition.",
    prerequisite_techs: ["womens_suffrage"],
    research_cost: 6000,
    year: 1923,
    unlocks: {
      constitutional_monarchy: 0.01,
      democracy: 0.01,
      socialism: 0.01
    }
  },
  international_treaties: {
    name: "International Treaties",
    icon: "globe",
    description: "A treaty is a formal and binding agreement entered by sovereign states or international organisations. Treaties express agreements that states use to legally bind themselves.",
    prerequisite_techs: ["frontier_control"],
    research_cost: 6000,
    year: 1880,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  wartime_colonial_administration: {
    name: "Wartime Colonial Administration",
    icon: "infamy",
    description: "A treaty is a formal and binding agreement entered by sovereign states or international organisations. Treaties express agreements that states use to legally bind themselves.",
    prerequisite_techs: ["trusts_and_mandates"],
    research_cost: 6500,
    year: 1914,
    unlocks: {
      colonial_maintenance: 0.15,
      colonial_power: 0.10
    }
  },
  economic_based_ideologies: {
    name: "Economic-based Ideologies",
    icon: "gold",
    description: "Economic-based ideologies such as anarcho-capitalism believe the inherent worth of the economy to act as a tool in moulding the life of the ordinary citizen.",
    prerequis: ["decentralised_administration"],
    research_cost: 6500,
    year: 1950,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  racial_equality: {
    name: "Racial Equality",
    icon: "consciousness",
    description: "Racial equality is when institutions give equal opportunities to people of all races, regardless of physical traits, heritage or skin colour. This would allow for minorities to gain more opportunities in employment, education and politics than ever before.",
    prerequisite_techs: ["multi_party_political_systems"],
    research_cost: 6500,
    year: 1950,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  universal_human_rights: {
    name: "Universal Human Rights",
    icon: "workers",
    description: "The establishment of moral principles and norms that set an international standard for fundamental rights to which a person is inherently entitled simply because he or she is a human being, regardless of age, ethnic origin, location, language, religion, ethnicity or any other status.",
    prerequisite_techs: ["international_treaties"],
    research_cost: 6500,
    year: 1945,
    unlocks: {
      infamy_loss: 0.01
    }
  },

  decolonisation: {
    name: "Decolonisation",
    icon: "diplomacy",
    description: "As the winds of change begin to sweep through our colonies, many believe that our time has come to give our colonies independence. Whilst we will lose our colonies, if we manage it well, we will still hold profound influence over them and we might be able to gain leverage over them in future discussions and negotiations.",
    prerequisite_techs: ["wartime_colonial_administration"],
    research_cost: 7000,
    year: 1961,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  political_responsibility: {
    name: "Political Responsibility",
    icon: "political_capital",
    description: "By holding those in office accountable for their political actions, our government can seek to enforce a meritocracy of sorts that promotes only those deemed capable enough to carry out their duties effectively.",
    prerequisite_techs: ["racial_equality"],
    research_cost: 7000,
    year: 1968,
    unlocks: {
      political_capital_gain: 2
    }
  },
  cold_war: {
    name: "Cold War",
    icon: "infamy",
    description: "New technological innovations, digitalisation and mass markets have come to dominate our country, as we deal with the ideological struggles of the Cold War.",
    prerequisite_techs: ["universal_human_rights"],
    research_cost: 7000,
    year: 1949,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  neo_colonialism: {
    name: "Neo-Colonialism",
    icon: "trade",
    description: "Neo-colonialism is the geopolitical practice of utilising economics, globalisation, cultural imperialism, conditional aid, and other nefarious practices such as spiraling debt obligations that functionally imitate the relationship of traditional colonialism in order to impose dominance over other sovereign states.",
    prerequisite_techs: ["decolonisation"],
    research_cost: 7500,
    year: 1971,
    unlocks: {
      political_capital_gain: 5
    }
  },
  modern_political_theory: {
    name: "Modern Political Theory",
    icon: "political_capital",
    description: "Political science has started to become a more developed field, and the studying of citizen behaviour will allow us to predict future political movements and problems with greater certainty than before.",
    prerequisite_techs: ["decolonisation"],
    research_cost: 7500,
    year: 1971,
    unlocks: {
      political_capital_gain: 5
    }
  },
  containment: {
    name: "Containment",
    icon: "infamy",
    description: "Ideological struggles are popping up all across the world, and it is important that we do not get lost in this whirlwind of chaos. Therefore, we must begin to realise that certain political extremes that pose a danger to our way of life must be curtailled, even if in other countries, and by force if necessary.",
    prerequisite_techs: ["cold_war"],
    research_cost: 7500,
    year: 1950,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  modern_political_theory: {
    name: "Modern Political Theory",
    icon: "knowledge",
    description: "The idea of competency in politics is beginning to hold greater sway over our administration as citizens increasingly come to expect more from their government. Needless to say, they will only be satisfied through provision.",
    prerequisite_techs: ["modern_political_theory"],
    research_cost: 8000,
    year: 1970,
    unlocks: {
      administrative_efficiency: 0.03
    }
  },
  rollback: {
    name: "Rollback",
    icon: "land_vehicles",
    description: "Containment as a policy was limited to simply 'containing' the other's ideology. Problem is, should it spread too far, a different strategy is needed for the region. Rollback, as the name would imply, refers to overthrowing governments friendly to another ideology and replacing them with our own for ensured stability and influence in the region.",
    prerequisite_techs: ["containment"],
    research_cost: 8000,
    year: 1960,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  governmental_digitisation: {
    name: "Governmental Digitisation",
    icon: "government",
    description: "With the internet rapidly permeating into many households in other nations, perhaps it is time to look at our own country and figure out how best to make use of this new technology to maximise effective governance ...",
    prerequisite_techs: ["modern_political_competency"],
    research_cost: 8500,
    year: 1969,
    unlocks: {
      research_buildings: 2,
      administrative_efficiency: 0.05
    }
  },
  lgbtqia_rights: {
    name: "LGBTQIA Rights",
    icon: "government",
    description: "As attitudes in other countries regarding people with different sexual orientations start to shift, it might be time for us to consider our own take on the issue.",
    prerequisite_techs: ["modern_political_competency"],
    research_cost: 8500,
    year: 1969,
    unlocks: {
      unlock_reform: "lgbtqia_rights"
    }
  },
  foreign_aid: {
    name: "Foreign Aid",
    icon: "money",
    description: "Foreign aid is the voluntary transfer of resources from one actor to another. It serves various purposes, such as a sign of diplomatic approval, extending the donor's cultural influence and providing infrastructure needed by the donor for resource extraction from the recipient country.",
    prerequisite_techs: ["rollback"],
    research_cost: 8500,
    year: 1946,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  political_transparency: {
    name: "Political Transparency",
    icon: "knowledge",
    description: "Political transparency gives citizens the right and means to examine the process of decision making within government institutions. This is used as a means of holding public officials accountable and fighting corruption.",
    prerequisite_techs: ["governmental_digitisation"],
    research_cost: 9000,
    year: 1973,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  contemporary_politics: {
    name: "Contemporary Politics",
    icon: "consciousness",
    description: "Politics has become an ever-changing environment where the situations of entire countries and governments can change in a mere matter of months, and as such it remains imperative for us to keep up with the latest issues and to delegate tasks responsibly.",
    prerequisite_techs: ["lgbtqia_rights"],
    research_cost: 9000,
    year: 1975,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  detente: {
    name: "Détente",
    icon: "diplomacy",
    description: "Detente is the relaxation of strained relations, especially political tensions, by communication. The term is often used to refer to a period of general easing of geopolitical tensions between major powers.",
    prerequisite_techs: ["foreign_aid"],
    research_cost: 9000,
    year: 1968,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },

  populism: {
    name: "Populism",
    icon: "culture",
    description: "Populism refers to a range of political stances that emphasises the idea of 'the people', and often seeks to juxtapose this group against a common enemy via negative integration.",
    prerequisite_techs: ["contemporary_politics", "detente"],
    research_cost: 9500,
    year: 1975,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  democratic_order: {
    name: "Democratic Order",
    icon: "revolt",
    description: "As our world becomes ever more global and interconnected, the idea of democracy is beginning to spread beyond those few frontiers and to the rest of the globe as well, and foreign demands that countries respect human rights are becoming more and more commonplace.",
    prerequisite_techs: ["contemporary_politics", "detente"],
    research_cost: 9500,
    year: 1990,
    unlocks: {
      constitutional_monarchy: 0.01,
      democracy: 0.01,
      socialism: 0.01
    }
  },

  increased_digitalisation: {
    name: "Increased Digitalisation",
    icon: "steel",
    description: "Our country's infrastructure has begun to shift more and more from the real world and into the realm of cyberspace, giving us a technological edge over that of other countries. Therefore, we must consider the best way to utilise this technology.",
    prerequisite_techs: ["political_transparency"],
    research_cost: 10000,
    year: 1995,
    unlocks: {
      administrative_efficiency: 0.05
    }
  },
  students_rights: {
    name: "Students' Rights",
    icon: "consciousness",
    description: "The youth in our country (and in some others as well) have been particularly active recently in demanding their own rights, even with pushback from large segments of society.",
    prerequisite_techs: ["populism"],
    research_cost: 10000,
    year: 1990,
    custom_effect_description: "This technology currently has no effect. This may change in future versions."
  },
  citizen_protection: {
    name: "Citizen Protection",
    icon: "faculty",
    description: "Protecting our citizens in foreign countries has become more and more important in an era of asymmetric warfare and hostage diplomacy, as international norms are increasingly being violated.",
    prerequisite_techs: ["democratic_order"],
    research_cost: 10000,
    year: 1980,
    unlocks: {
      political_capital_gain: 1
    }
  },

  cyberstates: {
    name: "Cyberstates",
    icon: "taxes",
    description: "Entire governments have now begun to move their operations online, posing new risks and opportunities as administration becomes ever more efficient.",
    prerequisite_techs: ["increased_digitalisation"],
    research_cost: 10500,
    year: 2005,
    unlocks: {
      administrative_efficiency: 0.05
    }
  },
  minors_rights: {
    name: "Minors' Rights",
    icon: "faculty",
    description: "First the students, now the minors. Increasingly, those under 18 are demanding more rights and the ability to increasingly participate in civic life. Although hugely controversial, especially from older sections of our society, perhaps it is time that we take a stance on the issue.",
    prerequisite_techs: ["students_rights"],
    research_cost: 10500,
    year: 2025,
    unlocks: {
      political_capital_gain: 1,
      stability_modifier: -0.05
    }
  },
  contemporary_international_order: {
    name: "Contemporary International Order",
    icon: "diplomacy",
    description: "The establishment of a worldwide intergovernmental organization aims to maintain international peace, justice, stability and security, while developing friendly and mutually beneficial relations among states to achieve international cooperation.",
    prerequisite_techs: ["citizen_protection"],
    research_cost: 10500,
    year: 2000,
    unlocks: {
      political_capital_gain: 2
    }
  },

  augmented_governmental_management: {
    name: "Augmented Governmental Management",
    icon: "development",
    description: "Through the effective use of information and employing algorithmic governance, we can create a government capable of managing various bureaus and agencies with surgical precision and machine-like efficiency.",
    prerequisite_techs: ["cyberstates"],
    research_cost: 11000,
    year: 2030,
    unlocks: {
      administrative_efficiency: 0.10,
      stability_modifier: 0.05
    }
  }
};
