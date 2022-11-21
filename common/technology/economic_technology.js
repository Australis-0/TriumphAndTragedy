//Economic Technology
config.technology.economic_technology = {
  cottage_industry: {
    name: "Cottage Industry",
    icon: "factory",
    description: "The cottage industry, or putting-out system allowed workers to work from home, particularly in the industries of textiles, manufacturing, or agriculture.",
    research_cost: 20,
    year: 1500,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  the_workshop: {
    name: "The Workshop",
    icon: "workers",
    description: "The workshop was a standing improvement over guilds that allowed individual tasks to be conducted more effectively.",
    prerequisite_techs: ["cottage_industry"],
    research_cost: 50,
    year: 1510,
    unlocks: {
      unlock_building: "workshops",
      processing_facilities: 1
    }
  },
  improved_mining_techniques: {
    name: "Improved Mining Techniques",
    icon: "lead",
    description: "By improving our mining techniques, we can afford to produce more and more from the bowels of the earth with less labour, improving overall efficiency.",
    prerequisite_techs: ["cottage_industry"],
    research_cost: 50,
    year: 1510,
    unlocks: {
      unlock_building: ["copper_mines", "iron_mines"],
      rgo_throughput: 0.05,
      resource_extraction: 1
    }
  },
  private_industry: {
    name: "Private Industry",
    icon: "money",
    description: "By handing over both our financial and industrial potential to private industry, we can begin to develop a flourishing economy based on complex systems of trade and banking.",
    prerequisite_techs: ["cottage_industry"],
    research_cost: 50,
    year: 1520,
    unlocks: {
      tax_efficiency: 0.05
    }
  },

  economic_mobility: {
    name: "Economic Mobility",
    icon: "trade",
    description: "Through a primitive free market society, our craftsmen and peasantry will have the ability to slowly migrate between economic classes, forming a sort of new nobility, and spurring economic innovation.",
    prerequisite_techs: ["the_workshop"],
    research_cost: 75,
    unlocks: {
      obsolete_building: "guilds",
      pop_growth_modifier: 0.01
    }
  },
  wood_beam_support: {
    name: "Wood Beam Support",
    icon: "wood",
    description: "By supporting the structural integrity of our mines with wooden beams, we can improve stability and reduce the occurrence of mine accidents or collapses.",
    prerequisite_techs: ["improved_mining_techniques"],
    research_cost: 75,
    year: 1530,
    unlocks: {
      unlock_building: ["coal_mines", "lead_mines"],
      mines: 2
    }
  },
  early_capitalism: {
    name: "Early Capitalism",
    icon: "gold",
    description: "Early capitalism, often revolving around banking, created a new merchant class known as burghers who were primarily responsible for the disposition of capital in a country, and starting up new businesses, especially in trade.",
    prerequisite_techs: ["private_industry"],
    research_cost: 75,
    year: 1525,
    unlocks: {
      tax_efficiency: 0.05
    }
  },

  improved_agriculture: {
    name: "Improved Agriculture",
    icon: "food",
    description: "By improving the quality and management of our irrigation systems, we can help ensure that farmers are receiving the water that they need to maintain crop growth, boosting yields.",
    prerequisite_techs: ["economic_mobility"],
    research_cost: 100,
    year: 1550,
    unlocks: {
      agriculture: 1,
      canals: 1
    }
  },
  wooden_rails: {
    name: "Wooden Rails",
    icon: "paper",
    description: "Using wooden railway systems to cart out heavy loads of stone and ore could improve the efficiency of retrieval from mineral seams and quarries.",
    prerequisite_techs: ["wood_beam_support"],
    research_cost: 100,
    year: 1550,
    unlocks: {
      rgo_throughput: 0.05,
      mines: 1,
      resource_extraction: 1
    }
  },
  banking: {
    name: "Banking",
    icon: "money",
    description: "The early concept of banking revolved not around safely storing money, but by lending money out to debtors who were then required to pay an interest on that loan, as usury slowly became to be seen as less of a social sin over time.",
    prerequisite_techs: ["early_capitalism"],
    research_cost: 100,
    year: 1397,
    unlocks: {
      tax_efficiency: 0.03
    }
  },
  mercantilism: {
    name: "Mercantilism",
    icon: "trade",
    research_cost: 100,
    description: "Mercantilism was an economic theory that stipulated that the world only held finite sources of wealth, and that nations and empires must compete for them in order to become the most prosperous, thereby depriving their fellow nations of sources of wealth.",
    prerequisite_techs: ["early_capitalism"],
    research_cost: 100,
    year: 1620,
    unlocks: {
      production_efficiency: 0.05,
      tax_efficiency: -0.02
    }
  },

  the_scythe: {
    name: "The Scythe",
    icon: "government",
    description: "The scythe is a tool for cutting crops that became developed more and more regularly as new farming techniques spread throughout the Continent in the 15th century.",
    prerequisite_techs: ["improved_agriculture"],
    research_cost: 150,
    year: 1580,
    unlocks: {
      agriculture: 1,
      pop_growth_modifier: 0.02
    }
  },
  water_power: {
    name: "Water Power",
    icon: "factory",
    description: "By utilising the power of water to grind materials such as grain and for other usages such as sawing wood, we can improve production efficiency thoroughly and establish its value in providing rotational motion.",
    prerequisite_techs: ["economic_mobility"],
    research_cost: 150,
    year: 1556,
    unlocks: {
      industry: 2,
      processing_facilities: 1,
      canals: 2
    }
  },
  paper_currency: {
    name: "Paper Currency",
    icon: "paper",
    description: "Although some may object to the usage of paper money as it carries no inert value, it becomes far easier to carry and print than normal coins, and provided that they are backed by something of monetary value, such as gold, there should be no reason why we should not use it.",
    prerequisite_techs: ["banking"],
    research_cost: 150,
    year: 1690,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  stock_market: {
    name: "Stock Market",
    icon: "trade",
    description: "By diversifying investor risk and providing capital for new businesses, we can speed up economic growth and efficiency in our country.",
    prerequisite_techs: ["mercantilism"],
    research_cost: 150,
    year: 1602,
    unlocks: {
      production_efficiency: 0.10
    }
  },

  improved_irrigation: {
    name: "Improved Irrigation",
    icon: "food",
    description: "Improving our irrigation could mean that our nation has more expendable arable land that can be used for the production of food.",
    prerequisite_techs: ["the_scythe", "water_power"],
    research_cost: 200,
    year: 1610,
    unlocks: {
      agriculture: 1
    }
  },
  the_watermill: {
    name: "The Watermill",
    icon: "factory",
    prerequisite_techs: ["water_power"],
    research_cost: 200,
    year: 1643,
    unlocks: {
      unlock_building: "watermills",
      canals: 3
    }
  },
  steel_tools: {
    name: "Steel Tools",
    icon: "steel",
    description: "Steel tools, through their merit as a harder and more durable material than iron, should become the main material upon which our new tools are based, allowing for more efficient mining of iron and harder metals.",
    prerequisite_techs: ["wooden_rails"],
    research_cost: 200,
    year: 1618,
    unlocks: {
      resource_extraction: 4,
      canals: 1,
      construction_speed: -0.05
    }
  },
  banknotes: {
    name: "Banknotes",
    icon: "money",
    description: "Banknotes, initially starting out as I.O.U. scraps issued by more reputable entities, eventually came to be a currency in itself, often backed up by the local government in smaller city-states.",
    prerequisite_techs: ["paper_currency"],
    research_cost: 200,
    year: 1666,
    unlocks: {
      tax_efficiency: 0.03
    }
  },

  four_field_crop_rotation: {
    name: "Four-Field Crop Rotation",
    icon: "provinces",
    description: "With the advent of the First Agricultural Revolution, our noblemen have made a discovery that the fertility of the soil can be maintained via crop rotation, in such a manner so that our fields do not have to go fallow in any year.",
    prerequisite_techs: ["improved_irrigation"],
    research_cost: 250,
    year: 1674,
    unlocks: {
      pop_growth_modifier: 0.03,
      agriculture: 2
    }
  },
  manufactories: {
    name: "Manufactories",
    icon: "factory",
    description: "Manufactories were organised places of work where valuable goods were assembled. The advent of this institution quickly obsoleted the guild.",
    prerequisite_techs: ["the_watermill", "steel_tools"],
    unlocks: {
      unlock_building: "manufactories",
      obsolete_building: "workshops"
    }
  },
  trading_companies: {
    name: "Trading Companies",
    icon: "trade",
    description: "Trading companies were typically private enterprises, often with limited state support, that were allowed to go to far off lands to claim them for their mother country, and bring back exotic goods for a profit.",
    prerequisite_techs: ["stock_market"],
    research_cost: 250,
    year: 1602,
    unlocks: {
      production_efficiency: 0.05,
      shipment_time: -0.05
    }
  },

  land_centralisation: {
    name: "Land Centralisation",
    icon: "provinces",
    description: "Although unpopular amongst the peasantry for the sheer amount of land that land centralisation will take away, it will have a drastic effect on agricultural efficiency, and possibly even begin a population boom.",
    prerequisite_techs: ["four_field_crop_rotation"],
    research_cost: 350,
    year: 1650,
    unlocks: {
      unlock_building: "centralised_farms",
      pop_growth_modifier: 0.05,
      agriculture: -1,
      stability_modifier: -0.10
    }
  },
  ventilating_galleries: {
    name: "Ventilating Galleries",
    icon: "stone",
    description: "The introduction of ventilating galleries to our mines will help provide much needed oxygen to our miners, allowing our mines to go deeper than ever before in search of valuable minerals ...",
    prerequisite_techs: ["the_watermill", "steel_tools"],
    research_cost: 350,
    year: 1720,
    unlocks: {
      unlock_building: ["gold_mines", "sulphur_mines"],
      building_cost: 0.05
    }
  },
  global_trading: {
    name: "Global Trading",
    icon: "taxes",
    description: "As our network of trading ports begin to criss-cross the world, globalisation of trade is becoming increasingly common, and more and more exotic goods are beginning to reach our shores ... goods that our craftsmen could surely learn a lot from.",
    prerequisite_techs: ["banknotes", "trading_companies"],
    research_cost: 350,
    year: 1701,
    unlocks: {
      unlock_building: "ports",
      production_efficiency: 0.05,
      shipment_time: -0.05
    }
  },

  selective_breeding: {
    name: "Selective Breeding",
    icon: "culture",
    description: "Through the usage of selective breeding to grow our livestock as fat as possible, we can improve farming efficiency and output higher meat yields per hectare than ever before.",
    prerequisite_techs: ["land_centralisation"],
    research_cost: 500,
    unlocks: {
      agriculture: 1
    }
  },
  putting_out_system: {
    name: "Putting-out System",
    icon: "development",
    description: "The putting-out system, similar in nature to the cottage industry, allowed centralised businesses to distribute production over a wide range of households, before turning them in. It was primarily used in the fields of manufacturing and textiles.",
    prerequisite_techs: ["manufactories"],
    research_cost: 500,
    year: 1750,
    unlocks: {
      rgo_throughput: 0.10
    }
  },
  centralised_banking: {
    name: "Centralised Banking",
    icon: "money",
    description: "Via the establishment of a central bank, our national government will have more say over economic policy, and will be able to right the ship that is our nation, should the storms of a financial panic come.",
    prerequisite_techs: ["global_trading"],
    research_cost: 500,
    year: 1694,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  megacorporations: {
    name: "Megacorporations",
    icon: "old_scroll",
    description: "By licensing monopolies to certain companies to dominate entire regions of trade, we can improve the trade efficiency of our nation and create loyal vassals subject only to us.",
    prerequisite_techs: ["global_trading"],
    research_cost: 500,
    year: 1740,
    unlocks: {
      ports: 1,
      production_efficiency: 0.05
    }
  },

  improved_transportation: {
    name: "Improved Transportation",
    icon: "actions",
    description: "Improving the quality and quantity of roads in the countryside, as well as building new canals could go a long way in improving the amount of natural resources we gain.",
    prerequisite_techs: ["selective_breeding"],
    research_cost: 650,
    year: 1735,
    unlocks: {
      unlock_building: "plantations",
      rgo_throughput: 0.05,
      construction_speed: -0.05
    }
  },
  mills: {
    name: "Mills",
    icon: "factory",
    description: "Mills, similar to watermills, are used to described improved manufactories capable of translating waterpower into rotational motion for the manufacturing of various products.",
    prerequisite_techs: ["putting_out_system"],
    research_cost: 650,
    year: 1770,
    unlocks: {
      unlock_building: ["ammunition_factories", "textile_mills", "mills"],
      industry: 1,
      obsolete_building: "watermills"
    }
  },
  pig_iron_smelting: {
    name: "Pig Iron Smelting",
    icon: "factory",
    description: "Pig iron, also known as crude iron is the product obtained by smelteries from merely smelting raw iron without adding any carbon. It was used as a intermediary between raw iron and wrought iron, which was used in construction.",
    prerequisite_techs: ["ventilating_galleries"],
    research_cost: 650,
    year: 1783,
    unlocks: {
      building_cost: -0.05,
      mines: 1,
      processing_facilities: 1
    }
  },
  modern_loans_and_bonds: {
    name: "Modern Loans and Bonds",
    icon: "money",
    description: "By keeping good track of the amount of debt that our clients owe us, we can ensure that debt is fairly collected, and that creditors do not take advantage of their position, giving investors and businesses more confidence in our nation's economy.",
    prerequisite_techs: ["centralised_banking"],
    research_cost: 650,
    year: 1711,
    unlocks: {
      tax_efficiency: -0.05,
      building_cost: -0.05
    }
  },
  monetary_exchange: {
    name: "Monetary Exchange",
    icon: "paper",
    description: "Through allowing foreign currencies to be traded between nations, we can raise capital, even from foreign lands to help support our businesses, whereas older means of monetary exchange were more inconvenient, and relied on the trust in the banker.",
    prerequisite_techs: ["megacorporations"],
    research_cost: 650,
    year: 1720,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  rotherham_plough: {
    name: "Rotherham Plough",
    icon: "iron",
    description: "The Rotherham Plough, one of the first great modern tools of agriculture, was used for tilling the soil prior to planting in order to expose the most nutrients for crops. It was typically driven by an ox, and was the first to be produced on a mass scale.",
    prerequisite_techs: ["improved_transportation"],
    research_cost: 750,
    unlocks: {
      pop_growth_modifier: 0.02,
      agriculture: 3
    }
  },
  government_banknotes: {
    name: "Government Banknotes",
    icon: "paper",
    description: "Through the issuing of banknotes ourselves rather than from other banks and private institutions, we can help improve investor confidence and the level of trust that the public holds in us regarding the subject of paper currency.",
    prerequisite_techs: ["modern_loans_and_bonds"],
    research_cost: 750,
    year: 1694,
    unlocks: {
      production_efficiency: 0.02,
      agriculture: 3
    }
  },
  physiocracy: {
    name: "Physiocracy",
    icon: "paper",
    description: "Physiocracy, one of the first economic theories to emerge after mercantilism, was its direct opposite that believed that the wealth of nations derived not from overseas trade, but from the domestic economy, which was primarily agrarian in nature. They became popular during the later half of the 18th century, but never gained much traction outside of it, and is today considered the predecessor to classical economics.",
    prerequisite_techs: ["monetary_exchange"],
    research_cost: 750,
    year: 1727,
    unlocks: {
      production_efficiency: 0.02
    }
  },

  early_steam_engine: {
    name: "Early Steam Engine",
    icon: "factory",
    description: "Although the early steam engine may not have been particularly efficient in deriving power on its own, it was often used to help ventilate mines, leading to miners being able to stay down for longer, and deeper, than ever before.",
    prerequisite_techs: ["mills"],
    research_cost: 900,
    year: 1763,
    unlocks: {
      rgo_throughput: 0.05
    }
  },
  deeper_mineshafts: {
    name: "Deeper Mineshafts",
    icon: "factory",
    description: "By drilling deeper mineshafts, and in some cases, simply vertical mineshafts into the face of the earth, we can expose new mineral seams that may not have been possible before, and with the emerging science of prospection, improve overall resource extraction efficiency.",
    prerequisite_techs: ["pig_iron_smelting"],
    research_cost: 900,
    year: 1765,
    unlocks: {
      unlock_building: "bauxite_mines",
      mines: 2,
      resource_extraction: 2,
      rgo_throughput: 0.10
    }
  },
  bullionism: {
    name: "Bullionism",
    icon: "gold",
    description: "Bullionism, the direct antecedent to the gold and silver standards, was an economic doctrine which held that the value of the currency relied on precious metals, particularly gold, and that nations should store as much of it as possible in order to guarantee the safety and stability of their currencies, although it will take some initial startup capital to secure our gold and silver reserves ...",
    prerequisite_techs: ["government_banknotes"],
    research_cost: 900,
    year: 1627,
    unlocks: {
      tax_efficiency: -0.05
    }
  },
  free_trade_doctrine: {
    name: "Free Trade Doctrine",
    icon: "trade",
    description: "One of the earliest schools of thought to come out of classical economics, the free trade doctrine posited that if all nations began lifting tariffs and severely limiting protectionism, the wealth of a country would benefit as a result, as trade with more nations would become possible.",
    prerequisite_techs: ["physiocracy"],
    research_cost: 900,
    year: 1800,
    unlocks: {
      ports: 1,
      production_efficiency: 0.05
    }
  },

  sodium_nitrate: {
    name: "Sodium Nitrate",
    icon: "paper",
    description: "Sodium nitrate, similar to salt, was a preservative used to keep meats consumable for long periods of time. It was eventually superseded by refrigeration technologies.",
    prerequisite_techs: ["rotherham_plough"],
    research_cost: 1000,
    year: 1820,
    unlocks: {
      unlock_building: "fertiliser_factories",
      pop_growth_modifier: 0.01,
      obsolete_building: "farms"
    }
  },
  factories: {
    name: "Factories",
    icon: "factory",
    description: "With the advent of the economically viable steam engine, rotational motion no longer depended on a country's waterways, but on their coal reserves, as steam could now be easily and accessibly generated from any location, leading to the birth of huge industrial cities that became the forges and arsenals of entire nations.",
    prerequisite_techs: ["early_steam_engine"],
    research_cost: 1000,
    year: 1770,
    unlocks: {
      unlock_building: ["artillery_factories", "concrete_factories", "factories", "machine_parts_factories"],
      unlock_reform: "wage"
    }
  },
  cast_iron_construction: {
    name: "Cast Iron Construction",
    icon: "iron",
    description: "The development of cast iron has allowed structures to be built for cheaper than ever before, whilst maintaining structural integrity. Although relatively brittle, further developments in metallurgy could yield increasingly better results ...",
    prerequisite_techs: ["early_steam_engine"],
    research_cost: 1000,
    year: 1779,
    unlocks: {
      processing_facilities: 1,
      building_cost: -0.03,
      construction_speed: -0.05
    }
  },
  early_classical_theory: {
    name: "Early Classical Theory",
    icon: "paper",
    description: "An umbrella term for a variety of differing opinions on economic thought, early classical theory first proposed the concept of the 'invisible hand', by which markets would be able to regulate themselves, and soon became the prevailing form of economic thought throughout Western capitalist economies in the 19th century.",
    prerequisite_techs: ["free_trade_doctrine"],
    research_cost: 1000,
    year: 1776,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  improved_steam_engine: {
    name: "Improved Steam Engine",
    icon: "technology",
    description: "By reducing the amount of energy lost from the usage of the steam engine, we can create a more efficient mechanism for translating coal and water into the machine needed to power today's factories.",
    prerequisite_techs: ["factories"],
    research_cost: 1200,
    year: 1775,
    unlocks: {
      rgo_throughput: 0.03,
      production_efficiency: 0.02,
      canals: 2,
      obsolete_building: "manufactories"
    }
  },
  wrought_iron_construction: {
    name: "Wrought Iron Construction",
    icon: "iron",
    description: "Wrought iron, or pure iron, was a relatively malleable form of the metal that could be worked into various shapes relatively easily because of its low carbon content, with its main drawback being brittleness.",
    prerequisite_techs: ["cast_iron_construction"],
    research_cost: 1200,
    year: 1784,
    unlocks: {
      processing_facilities: 2,
      construction_speed: -0.10,
      building_cost: -0.03
    }
  },
  gold_standard: {
    name: "Gold Standard",
    icon: "gold",
    description: "The gold standard, which swept the Continent and Great Britain during the 19th century, was an economic term used to describe the backing of paper currency by gold in order to protect the value of the currency from dangers such as debasing. It was largely abandoned after Bretton Woods.",
    prerequisite_techs: ["bullionism"],
    research_cost: 1200,
    year: 1790,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  economic_unions: {
    name: "Economic Unions",
    icon: "trade",
    description: "In areas densely populated by sovereign units, such as Germany or Italy, trade/economic unions became increasingly common, allowing for no customs checks when crossing borders, and for facilitating well-rounded trade free of robber barons.",
    prerequisite_techs: ["early_classical_theory"],
    research_cost: 1200,
    year: 1815,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  guano: {
    name: "Guano",
    icon: "paper",
    description: "Guano, the aggregate excrement accumulated from bird droppings is a valuable fertiliser, and can also be used in the manufacture of explosives and gunpowder.",
    prerequisite_techs: ["sodium_nitrate"],
    research_cost: 1400,
    year: 1802,
    unlocks: {
      pop_growth_modifier: 0.02
    }
  },
  early_steel_factories: {
    name: "Early Steel Factories",
    icon: "steel",
    description: "Early steel factories used industrial blast furnaces in an attempt to produce more steel. But without the invention of the Bessemer Process, steel remained a relatively expensive material as impurities were still hard to remove.",
    prerequisite_techs: ["improved_steam_engine"],
    year: 1720,
    research_cost: 1400,
    unlocks: {
      industry: 1
    }
  },
  silver_standard: {
    name: "Silver Standard",
    icon: "silver",
    description: "Although reserves of gold may not always be available, there remain other precious metals with which we can back up our currency, primarily silver, which economists have suggested may help to provide a more stable backing than mere gold alone.",
    prerequisite_techs: ["improved_steam_engine"],
    research_cost: 1400,
    year: 1848,
    unlocks: {
      tax_efficiency: 0.03
    }
  },
  late_classical_theory: {
    name: "Late Classical Theory",
    icon: "money",
    description: "As the memories of feudalism begin to fade more and more into obscurity, economists are beginning to recognise the market potential held by industrial factories and enterprises, and are beginning to transform the field into a true science.",
    prerequisite_techs: ["economic_unions"],
    research_cost: 1400,
    year: 1830,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  experimental_railways: {
    name: "Experimental Railways",
    icon: "steel",
    description: "Through the usage of railways, we can speed up transport around the country, unlocking potential in areas never quite developed before.",
    prerequisite_techs: ["early_steel_factories", "wrought_iron_construction"],
    research_cost: 1600,
    year: 1829,
    unlocks: {
      unlock_building: "railways",
      extra_building_slots: 1
    }
  },
  shaft_mining: {
    name: "Shaft Mining",
    icon: "wood",
    description: "The development of shafts not only as ventilating galleries, but as the main conduit for the mine itself is changing the field of mining, allowing us to access deeper pockets of minerals than previously deemed possible.",
    prerequisite_techs: ["early_steel_factories", "wrought_iron_construction"],
    research_cost: 1600,
    year: 1840,
    unlocks: {
      unlock_building: "silver_mines",
      mines: 3,
      resource_extraction: 1
    }
  },
  bimetallism: {
    name: "Bimetallism",
    icon: "gold",
    description: "The introduction of bimetallism, an economic theory which postulates that fiscal currency can be backed most effectively through a combination of precious metals, particularly silver and gold, holds promise, and can be adopted as the official policy of our country.",
    prerequisite_techs: ["silver_standard"],
    research_cost: 1600,
    year: 1860,
    unlocks: {
      stability_modifier: 0.05
    }
  },
  forced_trade_agreements: {
    name: "Forced Trade Agreements",
    icon: "trade",
    description: "With improvements in our military technology, we now possess the ability to force open the doors of some ... lesser nations, allowing us to sign treaties extremely favourable to ourselves, and allowing for our businesses to take advantage of their economy.",
    prerequisite_techs: ["late_classical_theory"],
    research_cost: 1600,
    year: 1839,
    unlocks: {
      political_capital_gain: 1
    }
  },

  fertiliser_development: {
    name: "Fertiliser Development",
    icon: "development",
    description: "Synthesising fertiliser from guano could yield a massive boost to agriculture and the more agrarian sectors of our society, as more land can now be turned into arable soil.",
    prerequisite_techs: ["guano"],
    research_cost: 1800,
    year: 1850,
    unlocks: {
      agriculture: 5,
      pop_growth_modifier: -0.04
    }
  },
  iron_railways: {
    name: "Iron Railways",
    icon: "steel",
    description: "The construction of iron railways throughout our country will greatly speed up transport and improve the quality of infrastructure, allowing for more manufactured goods and raw resources to travel throughout.",
    prerequisite_techs: ["experimental_railways"],
    research_cost: 1800,
    year: 1850,
    unlocks: {
      railways: 2,
      rgo_throughput: 0.10
    }
  },
  unequal_treaties: {
    name: "Unequal Treaties",
    icon : "cb",
    description: "Although they may be unequal, by ensuring that they're unequal only for them, and not for us, we can extract more raw resources from our 'spheres of influence', even if those areas are not precisely ours.",
    prerequisite_techs: ["forced_trade_agreements"],
    research_cost: 1800,
    year: 1853,
    unlocks: {
      production_efficiency: 0.03
    }
  },

  coprolite_fertiliser: {
    name: "Coprolite Fertiliser",
    icon: "food",
    description: "Coprolite fertiliser, made from the fossilised excrement of dead animals, helps to enrich the soil on which it is applied, boosting crop yields over the selected area.",
    prerequisite_techs: ["fertiliser_development"],
    research_cost: 2000,
    year: 1850,
    unlocks: {
      pop_growth_modifier: 0.01
    }
  },
  arsenals: {
    name: "Arsenals",
    icon: "land_vehicles",
    description: "Arsenals are vast, sprawling military factories responsible for the production of arms and ammunition, as well as their maintenace and restoration.",
    prerequisite_techs: ["iron_railways"],
    research_cost: 2000,
    year: 1852,
    unlocks: {
      unlock_building: ["arsenals", "small_arms_factories"]
    }
  },
  global_finance: {
    name: "Global Finance",
    icon: "money",
    description: "With the invention of the telegraph, financial transactions can now be made instantaneously, revolutionising the speed at which commerce and business can travel.",
    prerequisite_techs: ["bimetallism"],
    research_cost: 2000,
    year: 1851,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  protectionism: {
    name: "Protectionism",
    icon: "workers",
    description: "By protecting our companies from foreign competitors whilst still in their infancy, we can help nurture a growing domestic industry here at home. Free trade is not always right.",
    prerequisite_techs: ["iron_railways"],
    research_cost: 2000,
    year: 1812,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  seed_drill: {
    name: "Seed Drill",
    icon: "steel",
    description: "Seed drills, agricultural supplements that assist in the planting of seeds, can help boost agricultural efficiency, as up until now, seeds would often be scattered on tilled fields, instead of properly planted.",
    prerequisite_techs: ["coprolite_fertiliser"],
    research_cost: 2500,
    year: 1850,
    unlocks: {
      agriculture: 1
    }
  },
  shift_work: {
    name: "Shift Work",
    icon: "building",
    description: "By making workers work in shifts, we can keep a business operating 24/7, regardless of worker tiredness, as workers can be cycled in and out.",
    prerequisite_techs: ["arsenals"],
    research_cost: 2500,
    year: 1850,
    unlocks: {
      production_efficiency: 0.05,
      construction_speed: -0.10,
      unlock_reform: "workhours",
      obsolete_building: "mills"
    }
  },
  bessemer_process: {
    name: "Bessemer Process",
    icon: "steel",
    description: "The Bessemer Process was the first large-scale economical way of removing impurities from pig iron. Although largely superseded by modern steelmaking techniques, it played a pivotal role in transforming steel into a major industry and construction material.",
    prerequisite_techs: ["shaft_mining"],
    research_cost: 2500,
    year: 1856,
    unlocks: {
      unlock_building: "steelworks",
      obsolete_building: "forgeries"
    }
  },
  laissez_faire_doctrine: {
    name: "Laissez-Faire Doctrine",
    icon: "trade",
    description: "French for 'let it be', proponents of laissez-faire believe that the government should interfere only minimally with the economy in order to let the market regulate themselves.",
    prerequisite_techs: ["protectionism"],
    research_cost: 2500,
    year: 1830,
    unlocks: {
      production_efficiency: 0.05,
      tax_efficiency: -0.05
    }
  },

  assembly_plants: {
    name: "Assembly Plants",
    icon: "land_vehicles",
    description: "Assembly plants rely on assembly lines to speed up production and standardise parts and equipment, with work compartmentalised into a manner where each individual labourer has only one simple task to do.",
    prerequisite_techs: ["shift_work"],
    research_cost: 3000,
    year: 1885,
    unlocks: {
      unlock_building: ["assembly_plants"],
      construction_speed: -0.05,
      obsolete_building: "factories"
    }
  },
  steelworks: {
    name: "Steelworks",
    icon: "steel",
    description: "By subsidising the steel industry, our nation can become self-sustaining in the industry, and perhaps even begin exporting to other nations.",
    prerequisite_techs: ["bessemer_process"],
    research_cost: 3000,
    year: 1861,
    unlocks: {
      processing_facilities: 2
    }
  },
  corporatism: {
    name: "Corporatism",
    icon: "food",
    description: "Through tolerating ... and supporting huge magnates of industry, we can improve industrial efficiency as the number of competitors, and thereby number of entities to placate becomes significantly lessened.",
    prerequisite_techs: ["laissez_faire_doctrine"],
    research_cost: 3000,
    year: 1850,
    unlocks: {
      tax_efficiency: 0.05,
      production_efficiency: 0.05,
      construction_speed: -0.05
    }
  },

  crop_variation: {
    name: "Crop Variation",
    icon: "food",
    description: "By planting varied crops of the same species, we can improve agricultural and nutritional diversity amongst our population, as well as reduce the risk of a blight striking a staple crop.",
    prerequisite_techs: ["seed_drill"],
    research_cost: 3500,
    year: 1892,
    unlocks: {
      agriculture: 2
    }
  },
  refineries: {
    name: "Refineries",
    icon: "petroil",
    description: "The capability to refine petroleum could become extremely valuable in the future, as it is already widely used in terms of lighting, and is a material that promises to have additional uses in the future.",
    prerequisite_techs: ["assembly_plants"],
    research_cost: 3500,
    year: 1859,
    unlocks: {
      unlock_building: ["derricks", "refineries"]
    }
  },
  cheap_coal: {
    name: "Cheap Coal",
    icon: "coal",
    description: "With the advent of more modern resource extraction techniques, the age of cheap coal is upon us, promising a quick solution to our power needs, despite its polluting qualities.",
    prerequisite_techs: ["steelworks"],
    research_cost: 3500,
    year: 1860,
    unlocks: {
      mines: 3,
      railways: 1
    }
  },
  neoclassical_theory: {
    name: "Neoclassical Theory",
    icon: "money",
    description: "Neoclassical theory was an economic school of thought that sought to focus on the supply and demand side of economics.",
    prerequisite_techs: ["laissez_faire_doctrine"],
    research_cost: 3500,
    year: 1900,
    unlocks: {
      tax_efficiency: 0.03
    }
  },

  improved_machinery: {
    name: "Improved Machinery",
    icon: "factory",
    description: "Using more advanced machinery will allow our farmers to farm greater amounts of land than typically possible by hand.",
    prerequisite_techs: ["crop_variation"],
    research_cost: 4000,
    year: 1890,
    unlocks: {
      pop_growth_modifier: 0.01,
      national_manpower: 0.05
    }
  },
  petrol_pipelines: {
    name: "Petrol Pipelines",
    icon: "petroil",
    description: "By relying on the usage of pipelines to transport petroleum instead of the railway companies, petroleum refineries can cut costs and have dedicated infrastructure for transport, reducing vulnerability.",
    prerequisite_techs: ["improved_machinery"],
    research_cost: 4000,
    year: 1870,
    unlocks: {
      petrochemicals: 2
    }
  },
  cheap_iron: {
    name: "Cheap Iron",
    icon: "iron",
    description: "With dedicated infrastructure being devoted to the extraction of iron, our nation can now set up new iron mines in newly prospected locations, an emerging field of science that didn't exist mere decades ago.",
    prerequisite_techs: ["improved_machinery"],
    research_cost: 4000,
    year: 1870,
    unlocks: {
      mines: 3,
      railways: 1,
      construction_speed: -0.05
    }
  },
  state_regulation: {
    name: "State Regulation",
    icon: "building",
    description: "Although a capitalist economy might be the best way forwards for our country, steps should be taken to form a comprehensive net to ensure that our workers don't fall through the cracks. By regulating some of its excesses, we can introduce a mixed economy that might lead to greater social stability.",
    prerequisite_techs: ["improved_machinery"],
    research_cost: 4000,
    year: 1896,
    unlocks: {
      unlock_reform: ["safety_regulations", "unemployment"]
    }
  },
  international_trade_agreements: {
    name: "International Trade Agreements",
    icon: "old_scroll",
    description: "The detailing of exact terms of trade might help lift some of the unease that falls upon our investors and corporations when trading with other countries.",
    prerequisite_techs: ["neoclassical_theory"],
    research_cost: 4000,
    year: 1905,
    unlocks: {
      ports: 1,
      production_efficiency: 0.05
    }
  },
  early_tractors: {
    name: "Early Tractors",
    icon: "food",
    description: "As mechanisation slowly takes over the business of agriculture, the amount of labour that needs to be devoted to it is beginning to decrease sharply. Paired with drastic urbanisation, the future of our country is set to be made in the cities.",
    prerequisite_techs: ["improved_machinery"],
    research_cost: 4000,
    year: 1892,
    unlocks: {
      unlock_building: "modern_farms"
    }
  },

  industrial_complexes: {
    name: "Industrial Complexes",
    icon: "factory",
    description: "Industrial complexes are sprawling behemoths of industry that oftentimes employ tens of thousands of workers. The industrial output generated from them can be deployed for a variety of uses.",
    prerequisite_techs: ["petrol_pipelines", "cheap_iron"],
    research_cost: 4500,
    year: 1914,
    unlocks: {
      unlock_building: ["industrial_complexes", "research_complexes"],
      obsolete_building: "arsenals"
    }
  },
  bank_holidays: {
    name: "Bank Holidays",
    icon: "money",
    description: "By utilising our governmental authority to prevent private citizens from withdrawing from their bank accounts during times of economic crisis, we can prevent the wholesale collapse of entire banks, and bank runs, with the result being increased economic resilience.",
    prerequisite_techs: ["state_regulation"],
    research_cost: 4500,
    year: 1914,
    unlocks: {
      tax_efficiency: 0.03
    }
  },
  economic_responsibility: {
    name: "Economic Responsibility",
    icon: "old_scroll",
    description: "Although self-regulation of the markets seems to be a valid internal theory, it falls flat when put in practice, and there remain various shortfalls for which the public should hold certain entities accountable. By further developing this position, we can help to ensure that businesses in our country do not simply go unchecked by the general public.",
    prerequisite_techs: ["international_trade_agreements"],
    research_cost: 4500,
    year: 1929,
    unlocks: {
      tax_efficiency: -0.02,
      production_efficiency: 0.03
    }
  },

  mass_production: {
    name: "Mass Production",
    icon: "government",
    description: "The improvement of metallurgical production methods in our nation could lead to the more efficient allocation of materials needed to form industrial construction materials.",
    prerequisite_techs: ["petrol_pipelines", "cheap_iron"],
    research_cost: 5000,
    year: 1920,
    unlocks: {
      unlock_building: "flats",
      industry: 1,
      processing_facilities: 2,
      production_efficiency: 0.02,
      construction_speed: -0.05
    }
  },
  advanced_metallurgy: {
    name: "Advanced Metallurgy",
    icon: "government",
    description: "The improvement of metallurgical production methods in our nation could lead to the more efficient allocation of materials needed to form industrial construction materials.",
    prerequisite_techs: ["petrol_pipelines", "cheap_iron"],
    research_cost: 5000,
    year: 1886,
    unlocks: {
      unlock_building: "aluminium_factories",
      processing_facilities: 1
    }
  },
  investment_banks: {
    name: "Investment Banks",
    icon: "money",
    description: "Investment banks allow private citizens to hold money in banks that not only generate interest based on loans, but also offer reliable investment options going forwards, helping our citizens to safely invest in our economy.",
    prerequisite_techs: ["bank_holidays"],
    research_cost: 5000,
    year: 1929,
    unlocks: {
      unlock_reform: "pensions"
    }
  },

  advanced_tractors: {
    name: "Advanced Tractors",
    icon: "factory",
    description: "The improved reliability of new tractors could go a long way in the mechanisation of our country's agricultural sectors, contributing to a boosted crop yield for our farmers.",
    prerequisite_techs: ["mass_production"],
    research_cost: 5500,
    year: 1935,
    unlocks: {
      agriculture: 1,
      obsolete_building: "centralised_farms"
    }
  },
  civilian_industry: {
    name: "Civilian Industry",
    icon: "factory",
    description: "As consumer goods reach higher and higher levels of demand, entire factories and industrial complexes dedicated to their production are beginning to spring up around the country, leading to the growth of an organised consumer market.",
    prerequisite_techs: ["mass_production"],
    research_cost: 5500,
    year: 1920,
    unlocks: {
      unlock_building: ["aeroports", "civilian_industries"],
      processing_facilities: 1,
      construction_speed: -0.10,
      obsolete_building: ["assembly_plants", "industrial_complexes"]
    }
  },
  modern_mining_regulations: {
    name: "Modern Mining Regulations",
    icon: "government_scroll",
    description: "Mining may be a risky business, but the venture doesn't always need to cost miners their lives. By enforcing safety regulations, we can reduce the number of on-site accidents and maimings, and reduce dissatisfaction amongst our population.",
    prerequisite_techs: ["advanced_metallurgy"],
    research_cost: 5500,
    year: 1921,
    unlocks: {
      reform_desire_gain: -0.02,
      production_efficiency: -0.10
    }
  },
  mutual_funds: {
    name: "Mutual Funds",
    icon: "old_scroll",
    description: "Mutual funds are groupings of investments meant to lower risk by diversifying the burden of investment throughout a multitude of investors. They are typically overseen by portfolio managers and are seen as safe areas for private citizens to invest their money.",
    prerequisite_techs: ["investment_banks"],
    research_cost: 5500,
    year: 1933,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  keynesian_economics: {
    name: "Keynesian Economics",
    icon: "money",
    description: "Keynesian economics, first authored by John Maynard Keynes, proposed that government intervention during recessions could help boost consumer spending, leading to the revival of a nation's economy.",
    prerequisite_techs: ["economic_responsibility"],
    research_cost: 5500,
    year: 1936,
    unlocks: {
      tax_efficiency: 0.02,
      production_efficiency: 0.05
    }
  },

  advanced_farming_machinery: {
    name: "Advanced Farming Machinery",
    icon: "food",
    description: "The further advancement of our nation's machinery could reduce the burden of labour on our farmers, and help improve not only the quantity, but also the quality of the food grown within our nation, leading to the possibility of mass exports.",
    prerequisite_techs: ["advanced_tractors"],
    research_cost: 6000,
    year: 1956,
    unlocks: {
      agriculture: 1
    }
  },
  integrated_rail_system: {
    name: "Integrated Rail System",
    icon: "steel",
    description: "The centralisation of our rail system will help get rid of a lot of the 'railwaymania' that clogs up our nation, allowing for neat and organised railways where the trains actually run on time. Although some may criticise it as an overextension of our government, there is no question about its effectiveness.",
    prerequisite_techs: ["civilian_industry"],
    research_cost: 6000,
    year: 1937,
    unlocks: {
      unlock_building: "suburbs",
      railways: 3,
      rgo_throughput: 0.05,
      army_travel_speed: 0.025
    }
  },
  heavy_mining_machinery: {
    name: "Heavy Mining Machinery",
    icon: "lead",
    description: "The introduction of heavy machinery into our mines, although making many a miner unemployed, will also inevitably boost resource extraction efficiency, allowing for ore deposits and mineral seams to be excavated faster.",
    prerequisite_techs: ["modern_mining_regulations"],
    research_cost: 6000,
    year: 1940,
    unlocks: {
      rgo_throughput: 0.05
    }
  },
  econometrics: {
    name: "Econometrics",
    icon: "technology",
    description: "The application of statistical data for the purpose of analysing economic relationships helps our economists visualise the impact that certain policy decisions may have on the state of our economy. Through efficient analysation, we can help avoid many of the shortfalls that other countries have succumbed to in the past.",
    prerequisite_techs: ["mutual_funds", "keynesian_economics"],
    research_cost: 6000,
    year: 1945,
    unlocks: {
      production_efficiency: 0.02
    }
  },

  wartime_industry: {
    name: "Wartime Industry",
    icon: "factory",
    description: "When in a state of total war, it becomes necessary for the state to mobilise and utilise all resources at its disposal to combat the enemy head-on. Every citizen is expected to do their part, and industry is no exception. By setting up factories that will produce equipment for new battalions, we can help shorten training time in the case of an eventual conflict, as equipment will be ready on site.",
    prerequisite_techs: ["integrated_rail_system"],
    research_cost: 6500,
    year: 1939,
    unlocks: {
      unlock_building: "wartime_industries",
      aeroports: 1
    }
  },
  deep_mining: {
    name: "Deep Mining",
    icon: "workers",
    description: "Deep mining, similar to shaft mining, poses numerous problems, but can be solved with the ingenuity of our engineers. Providing increased efficiency as workers no longer have to descend down long corridors, deep mining will allow us to produce the excess in raw resources that our factories desperately need.",
    prerequisite_techs: ["heavy_mining_machinery"],
    research_cost: 6500,
    year: 1942,
    unlocks: {
      rgo_throughput: 0.10
    }
  },
  divergent_economic_thought: {
    name: "Divergent Economic Thought",
    icon: "faculty",
    description: "Although several schools of economics had previously dominated the landscape, economic thought is beginning to shift in a more divergent direction, with variations of these schools coming into play in an attempt to make up each of their shortfalls.",
    prerequisite_techs: ["econometrics"],
    research_cost: 6500,
    year: 1950,
    unlocks: {
      production_efficiency: 0.03
    }
  },

  industrial_farming: {
    name: "Industrial Farms",
    icon: "food",
    description: "Industrial farming, or mass farming brings the organisation and efficiency of the factory to the farm as meat and grains can now be harvested across vast swaths of land, and animals can be crammed and fed for maximum efficiency.",
    prerequisite_techs: ["advanced_farming_machinery", "wartime_industry"],
    research_cost: 7000,
    year: 1960,
    unlocks: {
      unlock_building: "industrial_farms"
    }
  },
  limited_access_roads: {
    name: "Limited Access Roads",
    icon: "old_map",
    description: "Limited-access roads, or dual carriageways, are motorways that restrict access of certain parts of the road to certain vehicles in hope of reducing traffic congestion and gridlock.",
    prerequisite_techs: ["advanced_farming_machinery", "wartime_industry"],
    research_cost: 7000,
    year: 1936,
    unlocks: {
      unlock_building: "motorways",
      motorways: 1,
      army_travel_speed: 0.035
    }
  },
  offshore_drilling: {
    name: "Offshore Drilling",
    icon: "petroil",
    description: "Although not possible until recently, the discovery of several pockets of petroleum underneath the seas has led to the intriguing possibility of drilling offshore, which would be supported by petroil rigs, increasing our self-sustainability when it comes to supplying our nation with the petroil it runs on.",
    prerequisite_techs: ["deep_mining"],
    research_cost: 7000,
    year: 1947,
    unlocks: {
      petrochemicals: 1
    }
  },
  securities: {
    name: "Securities",
    icon: "money",
    description: "Securities are tradeable financial assets, typically bundled as either loans, derivatives, or normal stocks for investors to buy and sell as they please. They became infamous during the Great Recession as 'toxic assets', which referred to homeowner loans, which the homeowner stood almost no chance of paying back after the real estate bubble.",
    prerequisite_techs: ["mutual_funds"],
    research_cost: 7000,
    year: 1960,
    unlocks: {
      tax_efficiency: 0.03
    }
  },
  linear_programming: {
    name: "Linear Programming",
    icon: "taxes",
    description: "Linear programming is a field of mathematics used for planning and optimisation. It rapidly became a part of computer science, and its usage is now critical in several fields of study.",
    prerequisite_techs: ["divergent_economic_thought"],
    research_cost: 7000,
    year: 1947,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  intensive_agriculture: {
    name: "Intensive Agriculture",
    icon: "food",
    description: "The systematic optimisation of agriculture, with the usage of pesticides and herbicides in an attempt to maximise crop yield, is referred to as intensive agriculture, and is the main supplier of modern supermarkets and food supply chains.",
    year: 1960,
    prerequisite_techs: ["industrial_farming"],
    research_cost: 7500,
    unlocks: {
      agriculture: 2
    }
  },
  integrated_motorways: {
    name: "Integrated Motorways",
    icon: "steel",
    description: "The construction of an integrated motorway system underneath our government will help decrease transport time and increase our mobilisation capacity should war ever call for it. Logistics and shipments will also become easier to handle, leading to a boon for our economy.",
    prerequisite_techs: ["limited_access_roads"],
    research_cost: 7500,
    year: 1952,
    unlocks: {
      motorways: 5,
      army_travel_speed: 0.02
    }
  },
  modern_inflation_theory: {
    name: "Modern Inflation Theory",
    icon: "money",
    description: "Although inflation may have always been thought as bad during the era of classical economics, it turns out that there is an ideal rate of inflation that will drive up consumer spending, and ease the worry of investors. What this rate is remains up for debate, but it should be up to our Treasury to keep it relatively low.",
    prerequisite_techs: ["securities"],
    research_cost: 7500,
    year: 1970,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  microeconomics: {
    name: "Microeconomics",
    icon: "old_scroll",
    description: "Microeconomics is the study of price, supply and demand fluctuations at the level of an individual product, good, service, or even household. By analysing the behaviour of end consumers, we can get a better picture of how our economy should be directed.",
    prerequisite_techs: ["linear_programming"],
    research_cost: 7500,
    year: 1969,
    unlocks: {
      production_efficiency: 0.02,
      research_efficiency: 0.03
    }
  },

  mass_complexes: {
    name: "Mass Complexes",
    icon: "factory",
    description: "Sprawling, gritty areas perpetually spewing out smoke, mass industrial complexes are the modern manufactories of our nation, keeping us strong in war, and rich in peace.",
    prerequisite_techs: ["integrated_motorways"],
    research_cost: 8000,
    year: 1950,
    unlocks: {
      processing_facilities: 3
    }
  },
  boring_machines: {
    name: "Boring Machines",
    icon: "steel",
    description: "Boring machines or TBMs are used to help drill tunnels rapidly in areas where the rock hardness does not allow for manual excavation, or sectors where drilling needs to be exacted with precision.",
    prerequisite_techs: ["integrated_motorways"],
    research_cost: 8000,
    unlocks: {
      mines: 3,
      resource_extraction: 1
    }
  },
  bretton_woods: {
    name: "Bretton Woods",
    icon: "money",
    description: "Bretton Woods was an international agreement tying the world's currencies to the U.S. dollar, helping to stabilise exchange rates, and allowing for a lingua franca of currencies by revolutionising finance.",
    prerequisite_techs: ["modern_inflation_theory"],
    research_cost: 8000,
    year: 1945,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  neo_keynesianism: {
    name: "Neo-Keynesianism",
    icon: "old_scroll",
    description: "Although Keynesianism initially had only accounted for macroeconomics, neo-Keynesianism seeks to combine the reasoning of microeconomics and macroeconomics into a single economic school of thought. They were eventually superseded by New Keynesianism.",
    prerequisite_techs: ["microeconomics"],
    research_cost: 8000,
    year: 1950,
    unlocks: {
      production_efficiency: 0.05
    }
  },

  green_revolution: {
    name: "Green Revolution",
    icon: "food",
    description: "The Green Revolution was the rapid improvement of technology in agriculture, rendering the fears of overpopulation obsolete. It utilised selective breeding to create a system of improved crop yields and agricultural outputs, especially in emerging economies with high population growth rates.",
    prerequisite_techs: ["intensive_agriculture"],
    research_cost: 8500,
    year: 1970,
    unlocks: {
      obsolete_building: "modern_farms",
      agriculture: 3
    }
  },
  high_speed_rail: {
    name: "High-Speed Rail",
    icon: "steel",
    description: "High-speed rail, using specialised rolling stock, integrated and straightened tracks, and power cables have enabled faster transport across our nation, reducing shipment times and increasing army transport speed.",
    prerequisite_techs: ["mass_complexes"],
    research_cost: 8500,
    year: 1964,
    unlocks: {
      aeroports: 1,
      railways: 2,
      army_travel_speed: 0.04
    }
  },
  abandonment_of_the_gold_standard: {
    name: "Abandonment of the Gold Standard",
    icon: "gold",
    description: "By abandoning the gold standard and switching to a fiat currency, we can reduce the amount of inflation present in the policy as the worth of the currency will be tied solely to the amount of trust investors hold in our nation.",
    prerequisite_techs: ["bretton_woods"],
    research_cost: 8500,
    year: 1976,
    unlocks: {
      army_upkeep: -0.10,
      tax_efficiency: -0.05
    }
  },
  globalisation: {
    name: "Globalisation",
    icon: "globe",
    description: "The globalisation of trade will play a key role in the logistical supply lines used to manufacture and ship goods on a global scale, with the end result being the consumer paying a lower price for their product, despite pushback over job losses, especially in more developed economies.",
    prerequisite_techs: ["neo_keynesianism"],
    research_cost: 8500,
    year: 1985,
    unlocks: {
      ports: 1,
      production_efficiency: 0.05
    }
  },

  advanced_pesticides: {
    name: "Advanced Pesticides",
    icon: "food",
    description: "Pesticides, although recognised as being harmful for the environment, will also help get rid of pests and parasites that plague our crops, ending the devastating havoc that they wreak upon our agricultural output.",
    prerequisite_techs: ["green_revolution"],
    research_cost: 9000,
    year: 1970,
    unlocks: {
      pop_growth_modifier: 0.02,
      agriculture: 1
    }
  },
  modern_urban_transport: {
    name: "Modern Urban Transport",
    icon: "development",
    description: "By improving inter-city rail links, undergrounds, and avenues, we can improve commute time, leading to greater production efficiency within our urban centres.",
    prerequisite_techs: ["high_speed_rail"],
    research_cost: 9000,
    year: 1980,
    unlocks: {
      unlock_building: "districts",
      aeroports: 2,
      motorways: 3,
      shipment_time: -0.03
    }
  },
  contemporary_mining: {
    name: "Contemporary Mining",
    icon: "government",
    description: "Contemporary mining is a system by which modern methods of resource extraction are used, including the usage of modern prospection techniques and computerised models of drilling and extraction.",
    prerequisite_techs: ["boring_machines"],
    research_cost: 9000,
    year: 1990,
    unlocks: {
      mines: 8,
      resource_extraction: 2
    }
  },
  automated_stock_trading: {
    name: "Automated Stock Trading",
    icon: "development",
    description: "Beginning in the early 80s, it became more and more common for stock firms to introduce algorithmic trading in order to boost reaction time and reduce investment risk. The practice, although not without its own risks as evidenced by flash crashes, continues to this day.",
    prerequisite_techs: ["abandonment_of_the_gold_standard"],
    research_cost: 9000,
    year: 2000,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  emerging_economic_theory: {
    name: "Emerging Economic Theory",
    icon: "technology",
    description: "New modes of economic thinking are beginning to challenge the economic establishment, leading to new policy intiatives and greater flexibility in deciding political directives.",
    prerequisite_techs: ["globalisation"],
    research_cost: 9000,
    year: 2006,
    unlocks: {
      production_efficiency: 0.02
    }
  },

  gmo_crops: {
    name: "GMO Crops",
    icon: "food",
    description: "GMO crops will help improve resistance to blights and parasites, and will in some cases, completely get rid of them, whilst at the same time being capable of growing in more sturdy climes, allowing us to de facto expand the reach of our arable land.",
    prerequisite_techs: ["advanced_pesticides"],
    research_cost: 9500,
    year: 1987,
    unlocks: {
      pop_growth_modifier: 0.01
    }
  },
  production_facilities: {
    name: "Production Facilities",
    icon: "factory",
    description: "Production facilities are typically used to refer to consumer goods factories that produce and distribute market goods of a civilian nature.",
    prerequisite_techs: ["modern_urban_transport"],
    research_cost: 9500,
    year: 1990,
    unlocks: {
      unlock_building: "production_facilities",
      processing_facilities: 1
    }
  },
  liquefied_natural_gas: {
    name: "Liquefied Natural Gas",
    icon: "petroil",
    description: "Natural gas, whilst not entirely friendly to the environment, will be seen as a step in improving the amount of emissions we produce whilst also at the same time boosting our energy efficiency. Although more expensive than petrol, it also holds the promise of being more reliable and being more capable to diversify our sources of energy.",
    prerequisite_techs: ["contemporary_mining"],
    research_cost: 9500,
    year: 1986,
    unlocks: {
      petrochemicals: 1
    }
  },
  governmental_fiscal_stimulus: {
    name: "Governmental Fiscal Stimulus",
    icon: "money",
    description: "In times of recession, it becomes imperative that the government directly inject fiscal stimulus into the economy so as to boost consumer spending, and thereby revive the economy. Although critics believe it to be an overextension of the government, it can give us more leverage as a state to determine how the economy can be brought back to life during times of crisis.",
    prerequisite_techs: ["contemporary_mining"],
    research_cost: 9500,
    year: 2008,
    unlocks: {
      reform_desire_gain: -0.02,
      tax_efficiency: -0.10
    }
  },
  keynesian_resurgence: {
    name: "Keynesian Resurgence",
    icon: "trade",
    description: "In the wake of the Great Recession, economists from across the world have gathered to hammer out new policy initiatives, many of which centred around a Keynesian mode of thought, giving rise to the term 'Keynesian Resurgence'.",
    prerequisite_techs: ["emerging_economic_theory"],
    research_cost: 9500,
    year: 2009,
    unlocks: {
      production_efficiency: 0.03
    }
  },

  new_green_revolution: {
    name: "New Green Revolution",
    icon: "food",
    description: "Although advances in farming have been made, the practice is still seen as being unsustainable going forwards. By contributing research towards a New Green Revolution, we can ensure that better quality food is produced than the food spewed forth from the industrial farms that we currently hold.",
    prerequisite_techs: ["gmo_crops"],
    research_cost: 10000,
    year: 2015,
    unlocks: {
      pop_growth_modifier: 0.05
    }
  },
  hydraulic_fracturing: {
    name: "Hydraulic Fracturing",
    icon: "petroil",
    description: "Fracking, also known as hydraulic fracturing is a method that combined horizontal drilling and the dispersal of fracking fluid into the surroundings to loosen up pockets of petroil and drive them into a central pipeline, where it can then be extracted, allowing for improved petroil extraction techniques, despite its groundwater pollution risk.",
    prerequisite_techs: ["liquefied_natural_gas"],
    research_cost: 10000,
    year: 2013,
    unlocks: {
      petrochemicals: 1
    }
  },
  austerity_controversy: {
    name: "Austerity Controversy",
    icon: "taxes",
    description: "The controversy of austerity, though it has been around for a while, was revived during the Great Recession after many countries witnessed unpopular bailouts which came with the terms of austerity. Deeply unpopular amongst their citizens, it led to significant civil unrest among their populations, and is today recognised as a failure internationally. A better replacement, however, has yet to be seen.",
    prerequisite_techs: ["liquefied_natural_gas"],
    research_cost: 10000,
    year: 2012,
    unlocks: {
      production_efficiency: 0.03,
      tax_efficiency: 0.03
    }
  },

  improved_crop_yields: {
    name: "Improved Crop Yields",
    icon: "food",
    description: "Innovation in farming technology allows for higher yield and more efficient usage of farmland. This would allow for a higher population being sustained.",
    prerequisite_techs: ["new_green_revolution"],
    research_cost: 10500,
    year: 2020,
    unlocks: {
      agriculture: 1
    }
  },
  modern_financial_centres: {
    name: "Modern Financial Centres",
    icon: "taxes",
    description: "Modern financial centres are locations with a high concentration of participants in banking, asset management, insurance or financial markets with venues and supporting services for those activities to take place.",
    prerequisite_techs: ["production_facilities"],
    research_cost: 10500,
    year: 1995,
    unlocks: {
      unlock_building: ["cbds", "modern_financial_centres"],
      processing_facilities: 1
    }
  },
  landfill_mining_and_recycling: {
    name: "Landfill Mining and Recycling",
    icon: "trade",
    description: "Landfill mining and recycling is a process which excavates and processes solid wastes which have previously been landfilled. In the process, mining recovers valuable recyclable materials, a combustible fraction, soil and landfill space.",
    prerequisite_techs: ["hydraulic_fracturing"],
    research_cost: 10500,
    year: 2025,
    unlocks: {
      extra_building_slots: 1
    }
  },
  ai_fund_management: {
    name: "AI Fund Management",
    icon: "money",
    description: "With artificial intelligence responsible for Fund Management, developing, operating, maintaining, upgrading and disposing assets will all be conducted with little human intervention.",
    prerequisite_techs: ["governmental_fiscal_stimulus"],
    research_cost: 10500,
    year: 2021,
    unlocks: {
      tax_efficiency: 0.05
    }
  },
  regulated_capitalism: {
    name: "Regulated Capitalism",
    icon: "old_scroll",
    description: "Regulated Capitalism serves as an alternative to other forms of capitalism in order to shed more light on capitalism as a polymorphous order. It suggests that the operation maintenance and development of the international political economy increasingly depends on administrative rules outside the legislatures and the courts.",
    prerequisite_techs: ["austerity_controversy"],
    research_cost: 10500,
    year: 2025,
    unlocks: {
      political_capital_gain: 2,
      production_efficiency: -0.05
    }
  },

  vertical_farming: {
    name: "Vertical Farming",
    icon: "steel",
    description: "Vertical farming is the practice of growing crops in vertically stacked layers. It often incorporates controlled-environment agriculture, which aims to optimise plant growth, and soilless farming techniques such as hydroponics, aquaponics, and aeroponics.",
    prerequisite_techs: ["improved_crop_yields"],
    research_cost: 11000,
    year: 2030,
    unlocks: {
      unlock_building: "vertical_farms",
      agriculture: 3,
      pop_growth_modifier: -0.08
    }
  },
  ai_hubs: {
    name: "AI Hubs",
    icon: "government",
    description: "The consequences of the Industrial Revolution have been a disaster for the human race. They have finally reached their final form. Welcome to the endgame.",
    prerequisite_techs: ["modern_financial_centres"],
    research_cost: 11000,
    year: 2050,
    unlocks: {
      unlock_building: "ai_hubs",
      industry: 3
    }
  },
  automated_mining: {
    name: "Automated Mining",
    icon: "coal",
    description: "Automated mining involves the removal of human labour from the mining process. It can still require a large amount of human capital. There are two types of automated mining, process and software automation, and the application of robotic technology to mining vehicles and equipment.",
    prerequisite_techs: ["landfill_mining_and_recycling"],
    research_cost: 11000,
    year: 2050,
    unlocks: {
      extra_building_slots: 2
    }
  },
  contemporaneous_economic_thought: {
    name: "Contemporaneous Economic Thought",
    icon: "technology",
    description: "The current state of economic thought covers a diverse range of policy initiatives and sub-movements, all of which claim to provide optimised mandates for our government. By running each of them through detailed economic simulations, we can sort out which ones will work for the economy, and which ones will not.",
    prerequisite_techs: ["regulated_capitalism"],
    research_cost: 11000,
    year: 2025,
    unlocks: {
      research_efficiency: 0.05
    }
  }
};
