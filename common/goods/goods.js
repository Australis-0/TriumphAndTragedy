config.goods = { //[WIP] - Redo mine chances, buy/sell prices
  //Special scope - these goods are entirely hidden from public view
  hidden: {
    knowledge: {
      name: "Knowledge",
      icon: "knowledge",

      doesnt_stack: true,
      research_good: true
    }
  },

  //Crafting Points - Represents training capacity for military units
  crafting_points: {
    name: "Crafting Points",
    icon: "labourers",
    type: "category",

    ground_units_cp: {
      name: "Army CP",
      icon: "active_personnel",

      is_cp: true,
      doesnt_stack: true
    },
    ground_artillery_cp: {
      name: "Artillery CP",
      icon: "artillery",

      is_cp: true,
      doesnt_stack: true
    },
    ground_vehicles_cp: {
      name: "Armour CP",
      icon: "land_vehicles",

      is_cp: true,
      doesnt_stack: true
    },
    aeroplanes_cp: {
      name: "Air CP",
      icon: "aeroplanes",

      is_cp: true,
      doesnt_stack: true
    },
    naval_units_cp: {
      name: "Naval CP",
      icon: "naval_units",

      is_cp: true,
      doesnt_stack: true
    }
  },

  raw_resources: {
    name: "Raw Materials",
    icon: "government",
    type: "category",

    animal_products: {
      name: "Animal Products",
      type: "category",

      beeswax: {
        name: "Beeswax",
        buy_price: 50
      },
      eggs: {
        name: "Eggs",
        buy_price: 10
      },
      goat_milk: {
        name: "Goat Milk",
        buy_price: 100
      },
      ivory: {
        name: "Ivory",
        buy_price: 100000
      },
      leather: {
        name: "Leather",
        buy_price: 100
      },
      milk: {
        name: "Milk",
        buy_price: 80
      },
      pearls: {
        name: "Pearls",
        buy_price: 50000
      },
      whale_oil: {
        name: "Whale Oil",
        buy_price: 2000
      }
    },
    caoutchouc: {
      name: "Caoutchouc",
      buy_price: 5000
    },
    cotton: {
      name: "Cotton",
      buy_price: 1000
    },
    grains: {
      name: "Grains/Starchy Foods",
      type: "category",

      corn: {
        name: "Corn",
        buy_price: 500
      },
      potatoes: {
        name: "Potatoes",
        buy_price: 50
      },
      rice: {
        name: "Rice",
        buy_price: 200
      },
      teff: {
        name: "Teff",
        buy_price: 300
      },
      wheat: {
        name: "Wheat",
        buy_price: 400
      }
    },
    feathers: {
      name: "Feathers"
    },
    fruits: {
      name: "Fruits",
      type: "category",

      apples: {
        name: "Apples",
        buy_price: 150
      },
      grapes: {
        name: "Grapes",
        buy_price: 300
      },
      olives: {
        name: "Olives",
        buy_price: 250
      },
      pumpkins: {
        name: "Pumpkins",
        buy_price: 100
      },
      strawberries: {
        name: "Strawberries",
        buy_price: 200
      },
      sunflowers: {
        name: "Sunflowers",
        buy_price: 50
      },
      watermelons: {
        name: "Watermelons",
        buy_price: 100
      }
    },
    furs: {
      name: "Furs",
      buy_price: 1500
    },
    meat: {
      name: "Meat",
      type: "category",

      beef: {
        name: "Beef",
        buy_price: 300
      },
      camel_meat: {
        name: "Camel Meat",
        buy_price: 350
      },
      chicken: {
        name: "Chicken",
        buy_price: 250
      },
      crab: {
        name: "Crab",
        buy_price: 400
      },
      cuy: {
        name: "Cuy",
        buy_price: 150
      },
      duck: {
        name: "Duck",
        buy_price: 300
      },
      fish: {
        name: "Fish",
        buy_price: 200
      },
      goat_meat: {
        name: "Goat Meat",
        buy_price: 250
      },
      lobster: {
        name: "Lobster",
        buy_price: 500
      },
      mutton: {
        name: "Mutton",
        buy_price: 300
      },
      oyster: {
        name: "Oyster",
        buy_price: 200
      },
      pork: {
        name: "Pork",
        buy_price: 200
      },
      rabbit_meat: {
        name: "Rabbit Meat",
        buy_price: 250
      },
      reindeer: {
        name: "Reindeer",
        buy_price: 650
      },
      shrimp: {
        name: "Shrimp",
        buy_price: 400
      },
      venison: {
        name: "Venison",
        buy_price: 350
      },
      yak: {
        name: "Yak",
        buy_price: 400
      }
    },
    nuts: {
      name: "Nuts",
      type: "category",

      peanuts: {
        name: "Peanuts",
        buy_price: 100
      },
      walnuts: {
        name: "Walnuts",
        buy_price: 150
      }
    },
    other_crops: {
      name: "Other Crops",
      type: "category",

      blue_agaves: {
        name: "Blue Agaves",
        buy_price: 200
      },
      hemp: {
        name: "Hemp",
        buy_price: 120
      },
      hops: {
        name: "Hops",
        buy_price: 180
      },
      poppies: {
        name: "Poppies",
        buy_price: 230
      }
    },
    petroil: {
      name: "Petroil",
      buy_price: 1250
    },
    raw_dyes: {
      name: "Raw Dyes",
      type: "category",

      carmine_bugs: {
        name: "Carmine Bugs",
        buy_price: 1000
      },
      indigo: {
        name: "Indigo",
        buy_price: 400
      },
      woad: {
        name: "Woad",
        buy_price: 300
      }
    },
    raw_minerals: {
      name: "Raw Minerals",
      type: "category",

      acanthite: {
        name: "Acanthite",
        mine_action_chance: 14, //8,314 million tons
        buy_price: 2500
      },
      anthracite: {
        name: "Anthracite",
        mine_action_chance: 34, //219 billion tonnes
        buy_price: 300
      },
      arsenopyrite: {
        name: "Arsenopyrite",
        mine_action_chance: 15, //25 million tons
        buy_price: 1800
      },
      baryte: {
        name: "Baryte",
        aliases: ["Barite"],
        mine_action_chance: 28, //2 billion tons
        buy_price: 100
      },
      bauxite: {
        name: "Bauxite",
        mine_action_chance: 33, //31 billion tonnes
        buy_price: 150
      },
      beryl: {
        name: "Beryl",
        mine_action_chance: 5, //100 thousand tons
        buy_price: 500
      },
      bitumen: {
        name: "Bitumen",
        mine_action_chance: 29, //10,513 billion tons
        buy_price: 80
      },
      bornite: {
        name: "Bornite",
        mine_action_chance: 20, //90 million tons
        buy_price: 2000
      },
      cassiterite: {
        name: "Cassiterite",
        mine_action_chance: 22, //155 million tons
        buy_price: 800
      },
      chalcocite: {
        name: "Chalcocite",
        mine_action_chance: 30, //12,5 billion tonnes
        buy_price: 2100
      },
      chalcopyrite: {
        name: "Chalcopyrite",
        mine_action_chance: 25, //700 million tonnes
        buy_price: 1200
      },
      chromite: {
        name: "Chromite",
        mine_action_chance: 24, //560 million tonnes
        buy_price: 400
      },
      cinnabar: {
        name: "Cinnabar",
        mine_action_chance: 6, //147 thousand tons
        buy_price: 1800
      },
      cobaltite: {
        name: "Cobalt",
        mine_action_chance: 16, //25 million tonnes
        buy_price: 3000
      },
      coltan: {
        name: "Coltan",
        mine_action_chance: 1, //1 thousand tonnes
        buy_price: 4500
      },
      cooperite: {
        name: "Cooperite",
        mine_action_chance: 3, //10 thousand tonnes
        buy_price: 2400
      },
      fluorite: {
        name: "Fluorite",
        mine_action_chance: 26, //1 billion tonnes
        buy_price: 500
      },
      galena: {
        name: "Galena",
        mine_action_chance: 19, //85 million tonnes
        buy_price: 800
      },
      hematite: {
        name: "Hematite",
        mine_action_chance: 32, //28,31 billion tons
        buy_price: 100
      },
      ilmenite: {
        name: "Ilmenite",
        mine_action_chance: 23, //160 million tonnes
        buy_price: 150
      },
      kimberlite: {
        name: "Kimberlite",
        mine_action_chance: 17, //26 million tonnes
        buy_price: 2000
      },
      lignite: {
        name: "Lignite",
        mine_action_chance: 35, //400 billion tonnes
        buy_price: 50
      },
      magnetite: {
        name: "Magnetite",
        mine_action_chance: 31, //13,8 billion tons
        buy_price: 120
      },
      malachite: {
        name: "Malachite",
        mine_action_chance: 1, //1 thousand tonnes
        buy_price: 900
      },
      molybdenite: {
        name: "Molybdenite",
        mine_action_chance: 4, //20 million tonnes
        buy_price: 2500
      },
      native_gold: {
        name: "Native Gold",
        type: "category",

        placer_gold: {
          name: "Placer Gold",
          mine_action_chance: 5, //180 tons prod.
          buy_price: 5600
        },
        quartz_gold: {
          name: "Quartz Gold",
          mine_action_chance: 7, //244 thousand tonnes
          buy_price: 5000
        }
      },
      nitre: {
        name: "Nitre",
        mine_action_chance: 9, //1 million tons
        buy_price: 50
      },
      pentlandite: {
        name: "Pentlandite",
        mine_action_chance: 21, //100 million tonnes
        buy_price: 1800
      },
      pyrolusite: {
        name: "Pyrlousite",
        mine_action_chance: 13, //6,4 million tonnes
        buy_price: 400
      },
      quartz_sand: {
        name: "Quartz Sand",
        mine_action_chance: 27, //1,665 billion tonnes
        buy_price: 50
      },
      ruby: {
        name: "Ruby",
        mine_action_chance: 2, //10 thousand tons
        buy_price: 5000
      },
      scheelite: {
        name: "Scheelite",
        mine_action_chance: 11, //3 million tons
        buy_price: 800
      },
      sperrylite: {
        name: "Sperrylite",
        mine_action_chance: 8, //900 thousand tons
        buy_price: 3000
      },
      sphalerite: {
        name: "Sphalerite",
        mine_action_chance: 12, //5,256 million tonnes
        buy_price: 900
      },
      uraninite: {
        name: "Uraninite",
        mine_action_chance: 10, //1,5 million tons
        buy_price: 1800
      },
      wolframite: {
        name: "Wolframite",
        mine_action_chance: 18, //42 million tonnes
        buy_price: 1000
      }
    },
    seasoning: {
      name: "Seasoning",
      type: "category",

      bell_peppers: {
        name: "Bell Peppers",
        buy_price: 80
      },
      camphor: {
        name: "Camphor",
        buy_price: 2500
      },
      cardamom: {
        name: "Cardamom",
        buy_price: 3000
      },
      cayenne: {
        name: "Cayenne",
        buy_price: 100
      },
      chilli: {
        name: "Chilli",
        aliases: ["chili"],
        buy_price: 90
      },
      cinnamon: {
        name: "Cinnamon",
        buy_price: 2200
      },
      cloves: {
        name: "Cloves",
        buy_price: 1800
      },
      fennel: {
        name: "Fennel",
        buy_price: 1500
      },
      fenugreek: {
        name: "Fenugreek",
        buy_price: 1200
      },
      garlic: {
        name: "Garlic",
        buy_price: 800
      },
      ginger: {
        name: "Ginger",
        buy_price: 1300
      },
      linseed: {
        name: "Linseed",
        buy_price: 100
      },
      mustard: {
        name: "Mustard",
        buy_price: 400
      },
      nutmeg: {
        name: "Nutmeg",
        buy_price: 2500
      },
      oil_palm_fruit: {
        name: "Oil Palm Fruit",
        buy_price: 1200
      },
      paprika: {
        name: "Paprika",
        buy_price: 150
      },
      pepper: {
        name: "Pepper",
        buy_price: 2800
      },
      rapeseed: {
        name: "Rapeseed",
        buy_price: 200
      },
      sugarcane: {
        name: "Sugarcane",
        buy_price: 300
      }
    },
    stone: {
      name: "Stone",
      type: "category",

      andesite: {
        name: "Andesite",
        quarry_action_chance: 4,
        buy_price: 50
      },
      basalt: {
        name: "Basalt",
        quarry_action_chance: 6,
        buy_price: 60
      },
      chalk: {
        name: "Chalk",
        quarry_action_chance: 2,
        buy_price: 30
      },
      clay: {
        name: "Clay",
        quarry_action_chance: 6,
        buy_price: 20
      },
      diorite: {
        name: "Diorite",
        quarry_action_chance: 3,
        buy_price: 40
      },
      dolomite: {
        name: "Dolomite",
        quarry_action_chance: 3,
        buy_price: 70
      },
      fieldstone: {
        name: "Fieldstone",
        quarry_action_chance: 2,
        buy_price: 25
      },
      flagstone: {
        name: "Flagstone",
        quarry_action_chance: 1,
        buy_price: 25
      },
      flint: {
        name: "Flint",
        quarry_action_chance: 2,
        buy_price: 40
      },
      granite: {
        name: "Granite",
        quarry_action_chance: 6,
        buy_price: 50
      },
      limestone: {
        name: "Limestone",
        quarry_action_chance: 7,
        buy_price: 30
      },
      marble: {
        name: "Marble",
        quarry_action_chance: 4,
        buy_price: 80
      },
      sandstone: {
        name: "Sandstone",
        quarry_action_chance: 8,
        buy_price: 40
      },
      shale: {
        name: "Shale",
        quarry_action_chance: 8,
        buy_price: 20
      },
      slate: {
        name: "Slate",
        quarry_action_chance: 5,
        buy_price: 45
      }
    },
    tropical_crops: {
      name: "Tropical Crops",
      type: "category",

      bananas: {
        name: "Bananas",
        buy_price: 50
      },
      citrus: {
        name: "Citrus",
        buy_price: 70
      },
      coffee_beans: {
        name: "Coffee Beans",
        buy_price: 300
      },
      dates: {
        name: "Dates",
        buy_price: 100
      },
      guavas: {
        name: "Guavas",
        buy_price: 80
      },
      mangoes: {
        name: "Mangoes",
        aliases: ["Mangos"],
        buy_price: 120
      },
      mangosteens: {
        name: "Mangosteens",
        buy_price: 200
      },
      sweet_potatoes: {
        name: "Sweet Potatoes",
        buy_price: 60
      },
      yam: {
        name: "Yam",
        buy_price: 70
      }
    },
    vegetables: {
      name: "Vegetables",
      type: "category",

      cabbage: {
        name: "Cabbage",
        buy_price: 40
      },
      carrot: {
        name: "Carrot",
        buy_price: 30
      },
      chicory: {
        name: "Chicory",
        buy_price: 50
      },
      cucumbers: {
        name: "Cucumbers",
        buy_price: 35
      },
      eggplants: {
        name: "Eggplants",
        buy_price: 45
      },
      lettuce: {
        name: "Lettuce",
        buy_price: 55
      },
      onions: {
        name: "Onions",
        buy_price: 25
      },
      peas: {
        name: "Peas",
        buy_price: 40
      },
      soybeans: {
        name: "Soybeans",
        buy_price: 70
      },
      spinach: {
        name: "Spinach",
        buy_price: 50
      },
      tomatoes: {
        name: "Tomatoes",
        buy_price: 65
      },
      turnips: {
        name: "Turnips",
        buy_price: 30
      }
    },
    wood: {
      name: "Wood",
      type: "category",

      acacia: {
        name: "Acacia",
        chop_action_chance: 6,
        buy_price: 80
      },
      ash: {
        name: "Ash",
        chop_action_chance: 6,
        buy_price: 90
      },
      balsa: {
        name: "Balsa",
        chop_action_chance: 3,
        buy_price: 100
      },
      basswood: {
        name: "Basswood",
        chop_action_chance: 4,
        buy_price: 110
      },
      blackwood: {
        name: "Blackwood",
        chop_action_chance: 3,
        buy_price: 120
      },
      bloodwood: {
        name: "Bloodwood",
        chop_action_chance: 2,
        buy_price: 130
      },
      cedar: {
        name: "Cedar",
        chop_action_chance: 7,
        buy_price: 140
      },
      cherry: {
        name: "Cherry",
        chop_action_chance: 5,
        buy_price: 150
      },
      chestnut: {
        name: "Chestnut",
        chop_action_chance: 4,
        buy_price: 160
      },
      cottonwood: {
        name: "Cottonwood",
        chop_action_chance: 3,
        buy_price: 100
      },
      cypress: {
        name: "Cypress",
        chop_action_chance: 6,
        buy_price: 120
      },
      ebony: {
        name: "Ebony",
        chop_action_chance: 2,
        buy_price: 250
      },
      elm: {
        name: "Elm",
        chop_action_chance: 4,
        buy_price: 140
      },
      eucalyptus: {
        name: "Eucalyptus",
        chop_action_chance: 8,
        buy_price: 110
      },
      fir: {
        name: "Fir",
        chop_action_chance: 5,
        buy_price: 120
      },
      hickory: {
        name: "Hickory",
        chop_action_chance: 4,
        buy_price: 130
      },
      ironwood: {
        name: "Ironwood",
        chop_action_chance: 2,
        buy_price: 220
      },
      lacewood: {
        name: "Lacewood",
        chop_action_chance: 1,
        buy_price: 170
      },
      mahogany: {
        name: "Mahogany",
        chop_action_chance: 5,
        buy_price: 180
      },
      maple: {
        name: "Maple",
        chop_action_chance: 6,
        buy_price: 160
      },
      oak: {
        name: "Oak",
        chop_action_chance: 8,
        buy_price: 150
      },
      pine: {
        name: "Pine",
        chop_action_chance: 8,
        buy_price: 90
      },
      redwood: {
        name: "Redwood",
        chop_action_chance: 7,
        buy_price: 130
      },
      rosewood: {
        name: "Rosewood",
        chop_action_chance: 3,
        buy_price: 200
      },
      sandalwood: {
        name: "Sandalwood",
        chop_action_chance: 2,
        buy_price: 210
      },
      spruce: {
        name: "Spruce",
        chop_action_chance: 7,
        buy_price: 100
      },
      turpentine: {
        name: "Turpentine",
        chop_action_chance: 1,
        buy_price: 100
      },
      walnut: {
        name: "Walnut",
        chop_action_chance: 5,
        buy_price: 190
      },
      willow: {
        name: "Willow",
        chop_action_chance: 6,
        buy_price: 80
      }
    },
    wool: {
      name: "Wool",
      type: "category",

      alpaca_wool: {
        name: "Alpaca Wool",
        buy_price: 120
      },
      goat_wool: {
        name: "Goat Wool",
        buy_price: 100
      },
      sheep_wool: {
        name: "Sheep Wool",
        buy_price: 80
      }
    }
  },

  intermediate_goods: {
    name: "Intermediate Goods",
    type: "category",

    aluminium: {
      name: "Aluminium",
      aliases: ["aluminum"],
      buy_price: 2000
    },
    brass: {
      name: "Brass",
      buy_price: 2500
    },
    bronze: {
      name: "Bronze",
      buy_price: 2300
    },
    cabins: {
      name: "Cabins",
      buy_price: 3000
    },
    coals: {
      name: "Coals",
      type: "category",

      bituminous_coal: {
        name: "Bituminous Coal",
        buy_price: 70
      },
      brown_coal: {
        name: "Brown Coal",
        buy_price: 50
      },
      charcoal: {
        name: "Charcoal",
        buy_price: 100
      },
      coal_coke: {
        name: "Coal Coke",
        buy_price: 120
      },
      hard_coal: {
        name: "Hard Coal",
        buy_price: 80
      },
      peat: {
        name: "Peat",
        buy_price: 40
      }
    },
    concrete: {
      name: "Concrete",
      buy_price: 100
    },
    copper_wire: {
      name: "Copper Wire",
      buy_price: 3000
    },
    electric_gear: {
      name: "Electric Gear",
      buy_price: 2500
    },
    electronics: {
      name: "Electronics",
      type: "category",

      capacitors: {
        name: "Capacitors",
        buy_price: 4000
      },
      resistors: {
        name: "Resistors",
        buy_price: 3500
      },
      transistors: {
        name: "Transistors",
        buy_price: 5000
      }
    },
    engines: {
      name: "Engines",
      buy_price: 3000
    },
    explosives: {
      name: "Explosives",
      type: "category",

      anfo: {
        name: "ANFO",
        buy_price: 800
      },
      dynamite: {
        name: "Dynamite",
        buy_price: 2500
      },
      plastic_explosives: {
        name: "Plastic Explosives",
        buy_price: 3500
      },
      TNT: {
        name: "TNT",
        buy_price: 4000
      }
    },
    fabric: {
      name: "Fabric",
      type: "category",

      cloth: {
        name: "Cloth",
        buy_price: 90
      },
      linen: {
        name: "Linen",
        buy_price: 110
      },
      synthetic_fabric: {
        name: "Synthetic Fabric",
        buy_price: 120
      }
    },
    felt: {
      name: "Felt",
      buy_price: 80
    },
    filaments: {
      name: "Filaments",
      buy_price: 150
    },
    flour: {
      name: "Flour",
      buy_price: 40
    },
    glass: {
      name: "Glass",
      buy_price: 100
    },
    gunpowder: {
      name: "Gunpowder",
      buy_price: 300
    },
    industrial_chemicals: {
      name: "Industrial Chemicals",
      type: "category",

      acetic_acid: {
        name: "Acetic Acid",
        buy_price: 2000
      },
      acetone: {
        name: "Acetone",
        buy_price: 1800
      },
      ammonia: {
        name: "Ammonia",
        buy_price: 1200
      },
      argon: {
        name: "Argon",
        buy_price: 5000
      },
      benzene: {
        name: "Benzene",
        buy_price: 2500
      },
      bromine: {
        name: "Bromine",
        buy_price: 2800
      },
      butadiene: {
        name: "Butadiene",
        buy_price: 3200
      },
      calcium: {
        name: "Calcium",
        buy_price: 800
      },
      calcium_carbonate: {
        name: "Calcium Carbonate",
        buy_price: 900
      },
      carbon: {
        name: "Carbon",
        buy_price: 1000
      },
      chlorine: {
        name: "Chlorine",
        buy_price: 2200
      },
      epoxyethane: {
        name: "Epoxyethane",
        buy_price: 3500
      },
      ethanol: {
        name: "Ethanol",
        buy_price: 1800
      },
      ethylene: {
        name: "Ethylene",
        buy_price: 2500
      },
      ethylene_glycol: {
        name: "Ethylene Glycol",
        buy_price: 2700
      },
      fluorine: {
        name: "Fluorine",
        buy_price: 4000
      },
      formaldehyde: {
        name: "Formaldehyde",
        buy_price: 3000
      },
      hydrochloric_acid: {
        name: "Hydrochloric Acid",
        buy_price: 2200
      },
      hydrogen: {
        name: "Hydrogen",
        buy_price: 1500
      },
      hydrogen_fluoride: {
        name: "Hydrogen Fluoride",
        buy_price: 3800
      },
      hydrogen_peroxide: {
        name: "Hydrogen Peroxide",
        buy_price: 2600
      },
      iodine: {
        name: "Iodine",
        buy_price: 3200
      },
      krypton: {
        name: "Krypton",
        buy_price: 5000
      },
      methanol: {
        name: "Methanol",
        buy_price: 1900
      },
      methylbenzene: {
        name: "Methylbenzene",
        buy_price: 2400
      },
      methyl_tertiary_butyl_ether: {
        name: "Methyl Tertiary-butyl Ether",
        aliases: ["MTBE"],
        buy_price: 3000
      },
      neon: {
        name: "Neon",
        buy_price: 4500
      },
      nitric_acid: {
        name: "Nitric Acid",
        buy_price: 2800
      },
      nitrogen: {
        name: "Nitrogen",
        buy_price: 800
      },
      oxygen: {
        name: "Oxygen",
        buy_price: 700
      },
      phenol: {
        name: "Phenol",
        buy_price: 2700
      },
      propylene: {
        name: "Propylene",
        buy_price: 2800
      },
      phosphoric_acid: {
        name: "Phosphoric Acid",
        buy_price: 2100
      },
      phosphorus: {
        name: "Phosphorus",
        buy_price: 1200
      },
      sodium_carbonate: {
        name: "Sodium Carbonate",
        buy_price: 900
      },
      sodium_hydroxide: {
        name: "Sodium Hydroxide",
        buy_price: 1000
      },
      sulphur: {
        name: "Sulphur",
        buy_price: 600
      },
      sulphuric_acid: {
        name: "Sulphuric Acid",
        buy_price: 2200
      },
      titanium_dioxide: {
        name: "Titanium Dioxide",
        buy_price: 1800
      },
      urea: {
        name: "Urea",
        buy_price: 1100
      },
      xenon: {
        name: "Xenon",
        buy_price: 5000
      }
    },
    integrated_circuits: {
      name: "Integrated Circuits",
      buy_price: 6000
    },
    locomotives: {
      name: "Locomotives",
      buy_price: 3500
    },
    machine_parts: {
      name: "Machine Parts",
      buy_price: 2500
    },
    malt: {
      name: "Malt",
      buy_price: 100
    },
    molasses: {
      name: "Molasses",
      buy_price: 80
    },
    natural_gas: {
      name: "Natural Gas",
      buy_price: 200
    },
    processed_hops: {
      name: "Processed Hops",
      buy_price: 250
    },
    processed_ores: {
      name: "Processed Ores",
      type: "category",

      alumina: {
        name: "Alumina",
        buy_price: 1800
      },
      arsenic: {
        name: "Arsenic",
        buy_price: 2800
      },
      barium: {
        name: "Barium",
        buy_price: 2200
      },
      beryllium: {
        name: "Beryllium",
        buy_price: 3500
      },
      chromium: {
        name: "Chromium",
        buy_price: 2700
      },
      cobalt: {
        name: "Cobalt",
        buy_price: 3200
      },
      copper: {
        name: "Copper",
        buy_price: 2800
      },
      gold: {
        name: "Gold",
        buy_price: 5000
      },
      ferrochromium: {
        name: "Ferrochromium",
        buy_price: 3000
      },
      iron: {
        name: "Iron",
        buy_price: 1200
      },
      lead: {
        name: "Lead",
        buy_price: 2400
      },
      nickel: {
        name: "Nickel",
        buy_price: 3000
      },
      niobium: {
        name: "Niobium",
        buy_price: 3800
      },
      manganese: {
        name: "Manganese",
        buy_price: 1600
      },
      mercury: {
        name: "Mercury",
        buy_price: 4000
      },
      molybdenum: {
        name: "Molybdenum",
        buy_price: 3200
      },
      palladium: {
        name: "Palladium",
        buy_price: 4500
      },
      pig_iron: {
        name: "Pig Iron",
        buy_price: 1400
      },
      platinum: {
        name: "Platinum",
        buy_price: 4800
      },
      saltpetre: {
        name: "Saltpetre",
        aliases: ["saltpeter"],
        buy_price: 1000
      },
      silicon: {
        name: "Silicon",
        buy_price: 2200
      },
      silver: {
        name: "Silver",
        buy_price: 3500
      },
      tantalum: {
        name: "Tantalum",
        buy_price: 4000
      },
      tin: {
        name: "Tin",
        buy_price: 1800
      },
      titanium: {
        name: "Titanium",
        buy_price: 3500
      },
      tungsten: {
        name: "Tungsten",
        buy_price: 3700
      },
      zinc: {
        name: "Zinc",
        buy_price: 1600
      }
    },
    silk: {
      name: "Silk",
      buy_price: 2000
    },
    steel: {
      name: "Steel",
      type: "category",

      regular_steel: {
        name: "Regular Steel",
        buy_price: 1400
      },
      stainless_steel: {
        name: "Stainless Steel",
        buy_price: 2200
      }
    },
    tallow: {
      name: "Tallow",
      buy_price: 50
    },
    turbines: {
      name: "Turbines",
      buy_price: 3000
    },
    velvet: {
      name: "Velvet",
      buy_price: 1800
    }
  },

  processed_goods: {
    name: "Processed Goods",
    icon: "construction_time",
    type: "category",

    alcohol: {
      name: "Alcohol",
      type: "category",

      beer: {
        name: "Beer",
        buy_price: 60
      },
      gin: {
        name: "Gin",
        buy_price: 150
      },
      schnapps: {
        name: "Schnapps",
        buy_price: 120
      },
      rum: {
        name: "Rum",
        buy_price: 180
      },
      tequila: {
        name: "Tequila",
        buy_price: 200
      },
      tonics: {
        name: "Tonics",
        buy_price: 100
      },
      vodka: {
        name: "Vodka",
        buy_price: 160
      },
      whiskey: {
        name: "Whiskey",
        buy_price: 250
      },
      wine: {
        name: "Wine",
        type: "category",

        champagne: {
          name: "Champagne",
          buy_price: 400
        },
        red_wine: {
          name: "Red Wines",
          type: "category",

          barbera: {
            name: "Barbera",
            buy_price: 2200
          },
          cabernet_franc: {
            name: "Cabernet Franc",
            buy_price: 2400
          },
          cabernet_sauvignon: {
            name: "Cabernet Sauvignon",
            buy_price: 2600
          },
          charbono: {
            name: "Charbono",
            buy_price: 2000
          },
          dolcetto: {
            name: "Dolcetto",
            buy_price: 1800
          },
          gamay: {
            name: "Gamay",
            buy_price: 2100
          },
          grenache: {
            name: "Grenache",
            buy_price: 2300
          },
          malbec: {
            name: "Malbec",
            buy_price: 2400
          },
          merlot: {
            name: "Merlot",
            buy_price: 2500
          },
          mourvedre: {
            name: "Mourvedre",
            buy_price: 2300
          },
          nehbyehlas: {
            name: "Nehbyehlas",
            buy_price: 2800
          },
          petite_sirah: {
            name: "Petite Sirah",
            buy_price: 2600
          },
          pinot_gris: {
            name: "Pinot Gris",
            buy_price: 2200
          },
          pinot_noir: {
            name: "Pinot Noir",
            buy_price: 2800
          },
          port: {
            name: "Port",
            buy_price: 3000
          },
          red_bordeaux: {
            name: "Red Bordeaux",
            buy_price: 3200
          },
          sangiovese: {
            name: "Sangiovese",
            buy_price: 2600
          },
          syrah: {
            name: "Syrah",
            buy_price: 2700
          },
          zinfandel: {
            name: "Zinfandel",
            buy_price: 2400
          }
        },
        white_wine: {
          name: "White Wine",
          type: "category",

          chardonnay: {
            name: "Chardonnay",
            buy_price: 2500
          },
          gewurztraminer: {
            name: "Gewürztraminer",
            aliases: ["gewurztraminer", "gewuerztraminer"],
            buy_price: 2300
          },
          gruner_veltliner: {
            name: "Grüner Veltliner",
            aliases: ["gruner veltliner", "gruener veltliner"],
            buy_price: 2200
          },
          malvasia: {
            name: "Malvasia",
            buy_price: 2100
          },
          marsanne: {
            name: "Marsanne",
            buy_price: 2400
          },
          muscat: {
            name: "Muscat",
            buy_price: 2500
          },
          pinot_blanc: {
            name: "Pinot Blanc",
            buy_price: 2200
          },
          prosecco: {
            name: "Prosecco",
            buy_price: 2500
          },
          riesling: {
            name: "Riesling",
            buy_price: 2400
          },
          sauvignon_blanc: {
            name: "Sauvignon Blanc",
            buy_price: 2500
          },
          semillon: {
            name: "Sémillon",
            buy_price: 2300
          },
          vernaccia: {
            name: "Vernaccia",
            buy_price: 2100
          },
          viognier: {
            name: "Viognier",
            buy_price: 2600
          },
          white_bordeaux: {
            name: "White Bordeaux",
            buy_price: 2800
          }
        }
      },
    },
    ammunition: {
      name: "Ammunition",
      type: "category",

      ap_rounds: {
        name: "AP Rounds",
        buy_price: 3000
      },
      artillery_shells: {
        name: "Artillery Shells",
        type: "category",

        delayed_fuse_shells: {
          name: "Delayed-Fuse Shells",
          buy_price: 2500
        },
        regular_shells: {
          name: "Regular Shells",
          buy_price: 2000
        }
      },
      high_calibre_ammunition: {
        name: "High-calibre Ammunition",
        aliases: ["high-caliber ammunition", "high caliber ammunition", "high calibre ammunition"],
        buy_price: 2800
      },
      low_calibre_ammunition: {
        name: "Low-calibre Ammunition",
        aliases: ["low-caliber ammunition", "low caliber ammunition", "low calibre ammunition"],
        buy_price: 2200
      },
      sabot_rounds: {
        name: "Sabot Rounds",
        buy_price: 3200
      }
    },
    automobiles: {
      name: "Automobiles",
      type: "category",

      cars: {
        name: "Cars",
        buy_price: 3500
      },
      humvees: {
        name: "Humvees",
        buy_price: 5000
      },
      jeeps: {
        name: "Jeeps",
        buy_price: 3000
      },
      lorries: {
        name: "Lorries",
        buy_price: 4000
      },
      luxury_cars: {
        name: "Luxury Cars",
        buy_price: 6000
      },
      motorbikes: {
        name: "Motorbikes",
        buy_price: 1500
      },
      steam_carriages: {
        name: "Steam Carriages",
        buy_price: 4500
      },
      tractors: {
        name: "Tractors",
        buy_price: 4000
      },
      vans: {
        name: "Vans",
        buy_price: 2500
      }
    },
    bicycles: {
      name: "Bicycles",
      buy_price: 300
    },
    bricks: {
      name: "Bricks",
      buy_price: 200
    },
    cameras: {
      name: "Cameras",
      buy_price: 12000
    },
    cement: {
      name: "Cement",
      buy_price: 300
    },
    ceramics: {
      name: "Ceramics",
      buy_price: 2500
    },
    chassis: {
      name: "Chassis",
      buy_price: 1200
    },
    chinaware: {
      name: "Chinaware",
      type: "category",

      bone_china: {
        name: "Bone China",
        buy_price: 3500
      },
      china: {
        name: "China",
        buy_price: 3000
      },
      doccia_porcelain: {
        name: "Doccia Porcelain",
        buy_price: 4000
      },
      lacquerware: {
        name: "Lacquerware",
        buy_price: 2800
      },
      porcelain: {
        name: "Porcelain",
        buy_price: 3200
      }
    },
    chewing_gum: {
      name: "Chewing Gum",
      buy_price: 100
    },
    chocolate: {
      name: "Chocolate",
      buy_price: 4500
    },
    cigars: {
      name: "Cigars",
      buy_price: 2500
    },
    cigarettes: {
      name: "Cigarettes",
      buy_price: 300
    },
    clothes: {
      name: "Clothes",
      type: "category",

      luxury_clothes: {
        name: "Luxury Clothes",
        type: "category",

        bowler_hats: {
          name: "Bowler Hats",
          buy_price: 1600
        },
        finery: {
          name: "Finery",
          buy_price: 3000
        },
        fur_coats: {
          name: "Fur Coats",
          buy_price: 6000
        },
        fur_hats: {
          name: "Fur Hats",
          buy_price: 2000
        },
        leather_boots: {
          name: "Leather Boots",
          buy_price: 2400
        },
        pocketwatches: {
          name: "Pocketwatches",
          aliases: ["pocket watches"],
          buy_price: 4000
        },
        tailored_suits: {
          name: "Tailored Suits",
          buy_price: 5000
        },
        wristwatches: {
          name: "Wristwatches",
          buy_price: 3600
        }
      },
      staple_clothes: {
        name: "Staple Clothes",
        type: "category",

        boots: {
          name: "Boots",
          buy_price: 1600
        },
        parkas: {
          name: "Parkas",
          buy_price: 2000
        },
        ponchos: {
          name: "Ponchos",
          buy_price: 1400
        },
        work_clothes: {
          name: "Work Clothes",
          buy_price: 1000
        }
      }
    },
    clay_pipes: {
      name: "Clay Pipes",
      buy_price: 800
    },
    coffee: {
      name: "Coffee",
      buy_price: 3300
    },
    computers: {
      name: "Computers",
      buy_price: 40000
    },
    cosmetic_products: {
      name: "Cosmetic Products",
      buy_price: 1600
    },
    dyes: {
      name: "Dyes",
      buy_price: 60
    },
    enriched_uranium: {
      name: "Enriched Uranium",
      type: "category",

      depleted_uranium: {
        name: "Depleted Uranium",
        buy_price: 2500
      },
      uranium: {
        name: "Uranium",
        buy_price: 3000
      },
      highly_enriched_uranium: {
        name: "Highly Enriched Uranium",
        aliases: ["HEU"],
        buy_price: 5000
      },
      weapons_grade_enriched_uranium: {
        name: "Weapons-Grade Enriched Uranium",
        aliases: ["weapons grade enriched uranium"],
        buy_price: 8000
      }
    },
    fertiliser: {
      name: "Fertiliser",
      buy_price: 100
    },
    film: {
      name: "Film",
      buy_price: 60
    },
    foods: {
      name: "Foods",
      type: "category",

      bread: {
        name: "Bread",
        buy_price: 30
      },
      canned_food: {
        name: "Canned Food",
        buy_price: 50
      },
      cheese: {
        name: "Cheese",
        type: "category",
        aliases: ["cheeses"],

        american: {
          name: "American",
          buy_price: 120
        },
        blue: {
          name: "Blue",
          type: "category",

          gorgonzola: {
            name: "Gorgonzola",
            buy_price: 180
          },
          roquefort: {
            name: "Roquefort",
            buy_price: 200
          },
          stilton: {
            name: "Stilton",
            buy_price: 160
          }
        },
        brie: {
          name: "Brie",
          buy_price: 140
        },
        butterkase: {
          name: "Butterkäse",
          aliases: ["butterkase", "butterkaese"],
          buy_price: 150
        },
        cantal: {
          name: "Cantal",
          buy_price: 130
        },
        cascaval: {
          name: "Cascaval",
          buy_price: 100
        },
        cheddar: {
          name: "Cheddar",
          buy_price: 140
        },
        cheshire: {
          name: "Cheshire",
          buy_price: 120
        },
        coulommiers: {
          name: "Coulommiers",
          buy_price: 110
        },
        cream_cheese: {
          name: "Cream Cheese",
          buy_price: 100
        },
        edam: {
          name: "Edam",
          buy_price: 130
        },
        feta: {
          name: "Feta",
          buy_price: 120
        },
        gloucester: {
          name: "Gloucester",
          buy_price: 140
        },
        gouda: {
          name: "Gouda",
          buy_price: 130
        },
        grana_padano: {
          name: "Grana Padano",
          buy_price: 150
        },
        havarti: {
          name: "Havarti",
          buy_price: 140
        },
        jarlsberg: {
          name: "Jarlsberg",
          buy_price: 130
        },
        munster: {
          name: "Munster",
          buy_price: 140
        },
        neufchatel: {
          name: "Neufchatel",
          buy_price: 100
        },
        parmesan: {
          name: "Parmesan",
          buy_price: 150
        },
        pecorino: {
          name: "Pecorino",
          buy_price: 140
        },
        port_salut: {
          name: "Port Salut",
          buy_price: 120
        },
        ricotta: {
          name: "Ricotta",
          buy_price: 110
        },
        swiss: {
          name: "Swiss",
          buy_price: 130
        }
      },
      dried_meat: {
        name: "Dried Meat",
        buy_price: 80
      },
      jam: {
        name: "Jam",
        buy_price: 60
      },
      lemonade: {
        name: "Lemonade",
        buy_price: 40
      },
      pemmican: {
        name: "Pemmican",
        buy_price: 100
      },
      sausages: {
        name: "Sausages",
        buy_price: 80
      },
      soup: {
        name: "Soup",
        buy_price: 60
      },
      stew: {
        name: "Stew",
        buy_price: 70
      },
      syrup: {
        name: "Syrup",
        buy_price: 50
      },
      tortillas: {
        name: "Tortillas",
        buy_price: 60
      }
    },
    furniture: {
      name: "Furniture",
      type: "category",

      common_furniture: {
        name: "Common Furniture",
        buy_price: 1000
      },
      luxury_furniture: {
        name: "Luxury Furniture",
        buy_price: 5000
      }
    },
    gas: {
      name: "Gas",
      buy_price: 2000
    },
    gems: {
      name: "Gems",
      type: "category",

      cut_ruby: {
        name: "Cut Ruby",
        buy_price: 15000
      },
      diamond: {
        name: "Diamond",
        buy_price: 30000
      },
      jewellery: {
        name: "Jewellery",
        aliases: ["jewelry"],
        buy_price: 25000
      }
    },
    glasses: {
      name: "Glasses",
      buy_price: 3000
    },
    gramophones: {
      name: "Gramophones",
      buy_price: 6500
    },
    heavy_weaponry: {
      name: "Heavy Weaponry",
      buy_price: 10000
    },
    honey: {
      name: "Honey",
      buy_price: 500
    },
    illicit_drugs: {
      name: "Illicit Drugs",
      type: "category",

      cannabis: {
        name: "Cannabis",
        aliases: ["weed"],
        buy_price: 1000
      },
      carfentanil: {
        name: "Carfentanil",
        aliases: ["carfentanyl"],
        buy_price: 10000
      },
      cocaine: {
        name: "Cocaine",
        aliases: ["coke"],
        buy_price: 5000
      },
      crack_cocaine: {
        name: "Crack Cocaine",
        buy_price: 2500
      },
      fentanyl: {
        name: "Fentanyl",
        aliases: ["fentanil"],
        buy_price: 20000
      },
      hashish: {
        name: "Hashish",
        buy_price: 4000
      },
      heroin: {
        name: "Heroin",
        buy_price: 6500
      },
      methamphetamine: {
        name: "Methamphetamine",
        buy_price: 7500
      },
      opium: {
        name: "Opium",
        buy_price: 5000
      },
      psychedelics: {
        name: "Psychedelics",
        buy_price: 10000
      }
    },
    incense: {
      name: "Incense",
      buy_price: 5000
    },
    ink: {
      name: "Ink",
      buy_price: 3000
    },
    lamps: {
      name: "Lamps",
      type: "category",

      candles: {
        name: "Candles",
        buy_price: 2000
      },
      electric_lamps: {
        name: "Electric Lamps",
        buy_price: 1000
      },
      lanterns: {
        name: "Lanterns",
        buy_price: 1000
      },
      oil_lamps: {
        name: "Oil Lamps",
        buy_price: 1500
      }
    },
    lasers: {
      name: "Lasers",
      buy_price: 8000
    },
    lifts: {
      name: "Lifts",
      buy_price: 8500
    },
    lightbulbs: {
      name: "Lightbulbs",
      aliases: ["light bulbs"],
      buy_price: 4000
    },
    lumber: {
      name: "Lumber",
      type: "category",

      acacia_lumber: {
        name: "Acacia Lumber",
        buy_price: 500
      },
      ash_lumber: {
        name: "Ash Lumber",
        buy_price: 600
      },
      balsa_lumber: {
        name: "Balsa Lumber",
        buy_price: 200
      },
      basswood_lumber: {
        name: "Basswood Lumber",
        buy_price: 400
      },
      blackwood_lumber: {
        name: "Blackwood Lumber",
        buy_price: 800
      },
      bloodwood_lumber: {
        name: "Bloodwood Lumber",
        buy_price: 700
      },
      cedar_lumber: {
        name: "Cedar Lumber",
        buy_price: 600
      },
      cherry_lumber: {
        name: "Cherry Lumber",
        buy_price: 750
      },
      chestut_lumber: {
        name: "Chestnut Lumber",
        buy_price: 700
      },
      cottonwood_lumber: {
        name: "Cottonwood Lumber",
        buy_price: 300
      },
      cypress_lumber: {
        name: "Cypress Lumber",
        buy_price: 650
      },
      ebony_lumber: {
        name: "Ebony Lumber",
        buy_price: 1200
      },
      elm_lumber: {
        name: "Elm Lumber",
        buy_price: 500
      },
      eucalyptus_lumber: {
        name: "Eucalyptus Lumber",
        buy_price: 550
      },
      fir_lumber: {
        name: "Fir Lumber",
        buy_price: 450
      },
      hickory_lumber: {
        name: "Hickory Lumber",
        buy_price: 650
      },
      ironwood_lumber: {
        name: "Ironwood Lumber",
        buy_price: 1000
      },
      lacewood_lumber: {
        name: "Lacewood Lumber",
        buy_price: 900
      },
      mahogany_lumber: {
        name: "Mahogany Lumber",
        buy_price: 800
      },
      maple_lumber: {
        name: "Maple Lumber",
        buy_price: 600
      },
      oak_lumber: {
        name: "Oak Lumber",
        buy_price: 700
      },
      pine_lumber: {
        name: "Pine Lumber",
        buy_price: 400
      },
      redwood_lumber: {
        name: "Redwood Lumber",
        buy_price: 550
      },
      rosewood_lumber: {
        name: "Rosewood Lumber",
        buy_price: 1100
      },
      sandalwood_lumber: {
        name: "Sandalwood Lumber",
        buy_price: 1500
      },
      spruce_lumber: {
        name: "Spruce Lumber",
        buy_price: 450
      },
      turpentine_lumber: {
        name: "Turpentine Lumber",
        buy_price: 350
      },
      walnut_lumber: {
        name: "Walnut Lumber",
        buy_price: 900
      },
      willow_lumber: {
        name: "Willow Lumber",
        buy_price: 400
      }
    },
    medicines: {
      name: "Medicines",
      type: "category",

      pharmaceuticals: {
        name: "Pharmaceuticals",
        type: "category",

        antipyretics: {
          name: "Antipyretics",
          buy_price: 5000
        },
        analgesics: {
          name: "Analgesics",
          buy_price: 6000
        },
        antimalarial_drugs: {
          name: "Antimalarial Drugs",
          buy_price: 15000
        },
        antibiotics: {
          name: "Antibiotics",
          buy_price: 20000
        },
        antiseptics: {
          name: "Antiseptics",
          buy_price: 5000
        },
        contraceptives: {
          name: "Contraceptives",
          buy_price: 10000
        },
        hormone_medications: {
          name: "Hormone Medications",
          buy_price: 30000
        },
        mood_stabilisers: {
          name: "Mood Stabilisers",
          aliases: ["mood stabilizers"],
          buy_price: 25000
        },
        statins: {
          name: "Statins",
          buy_price: 18000
        },
        stimulants: {
          name: "Stimulants",
          buy_price: 22000
        },
        tranquilisers: {
          name: "Tranquilisers",
          aliases: ["tranquilizers"],
          buy_price: 18000
        },
        vaccines: {
          name: "Vaccines",
          buy_price: 20000
        }
      },
      traditional_medicines: {
        name: "Traditional Medicines",
        buy_price: 5500
      }
    },
    naval_supplies: {
      name: "Naval Supplies",
      buy_price: 10000
    },
    olive_oil: {
      name: "Olive Oil",
      buy_price: 1500
    },
    paper: {
      name: "Paper",
      buy_price: 500
    },
    plastics: {
      name: "Plastics",
      buy_price: 2350
    },
    radios: {
      name: "Radios",
      buy_price: 16000
    },
    recording_devices: {
      name: "Recording Devices",
      buy_price: 12000
    },
    refined_petroil: {
      name: "Refined Petroil",
      buy_price: 1200
    },
    reinforced_concrete: {
      name: "Reinforced Concrete",
      buy_price: 1800
    },
    rubber: {
      name: "Rubber",
      buy_price: 1500
    },
    salt: {
      name: "Salt",
      buy_price: 4000
    },
    sewing_machines: {
      name: "Sewing Machines",
      buy_price: 8000
    },
    shampoo: {
      name: "Shampoo",
      buy_price: 4500
    },
    sleeping_bags: {
      name: "Sleeping Bags",
      buy_price: 1000
    },
    souvenirs: {
      name: "Souvenirs",
      buy_price: 3500
    },
    small_arms: {
      name: "Small Arms",
      buy_price: 4500
    },
    soap: {
      name: "Soap",
      buy_price: 2200
    },
    steel_beams: {
      name: "Steel Beams",
      buy_price: 1600
    },
    sugar: {
      name: "Sugar",
      buy_price: 500
    },
    tapestries: {
      name: "Tapestries",
      buy_price: 750
    },
    tea: {
      name: "Tea",
      type: "category",

      black_tea: {
        name: "Black Tea",
        buy_price: 2000
      },
      chai_tea: {
        name: "Chai Tea",
        buy_price: 2500
      },
      green_tea: {
        name: "Green Tea",
        buy_price: 3000
      },
      herbal_tea: {
        name: "Herbal Tea",
        buy_price: 2500
      },
      hibiscus_tea: {
        name: "Hibiscus Tea",
        buy_price: 3500
      },
      oolong_tea: {
        name: "Oolong Tea",
        buy_price: 4000
      },
      puerh_tea: {
        name: "Pu-erh Tea",
        aliases: ["puerh tea", "pu erh tea"],
        buy_price: 5000
      },
      white_tea: {
        name: "White Tea",
        buy_price: 4500
      }
    },
    telephones: {
      name: "Telephones",
      buy_price: 6000
    },
    televisions: {
      name: "Televisions",
      aliases: ["TVs"],
      buy_price: 12000
    },
    tools: {
      name: "Tools",
      buy_price: 4000
    },
    torpedoes: {
      name: "Torpedoes",
      buy_price: 10000
    },
    trains: {
      name: "Trains",
      buy_price: 12500
    },
    typewriters: {
      name: "Typewriters",
      buy_price: 8000
    },
    tyres: {
      name: "Tyres",
      buy_price: 2000
    },
    uniforms: {
      name: "Uniforms",
      buy_price: 2000
    },
    violins: {
      name: "Violins",
      buy_price: 3500
    },
    wood_veneers: {
      name: "Wood Veneers",
      buy_price: 400
    }
  }
};
