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
        icon: "beeswax",
        buy_price: 50
      },
      eggs: {
        name: "Eggs",
        icon: "eggs",
        buy_price: 10
      },
      goat_milk: {
        name: "Goat Milk",
        icon: "goat_milk",
        buy_price: 100
      },
      ivory: {
        name: "Ivory",
        icon: "ivory",
        buy_price: 100000
      },
      leather: {
        name: "Leather",
        icon: "leather",
        buy_price: 100
      },
      milk: {
        name: "Milk",
        icon: "milk",
        buy_price: 80
      },
      pearls: {
        name: "Pearls",
        icon: "pearls",
        buy_price: 50000
      },
      whale_oil: {
        name: "Whale Oil",
        icon: "whale_oil",
        buy_price: 2000
      }
    },
    caoutchouc: {
      name: "Caoutchouc",
      icon: "caoutchouc",
      buy_price: 5000
    },
    cotton: {
      name: "Cotton",
      icon: "cotton",
      buy_price: 1000
    },
    grains: {
      name: "Grains/Starchy Foods",
      type: "category",

      corn: {
        name: "Corn",
        icon: "corn",
        buy_price: 500
      },
      potatoes: {
        name: "Potatoes",
        icon: "potatoes",
        buy_price: 50
      },
      rice: {
        name: "Rice",
        icon: "rice",
        buy_price: 200
      },
      teff: {
        name: "Teff",
        icon: "teff",
        buy_price: 300
      },
      wheat: {
        name: "Wheat",
        icon: "wheat",
        buy_price: 400
      }
    },
    feathers: {
      name: "Feathers",
      icon: "feathers",
      buy_price: 50
    },
    fruits: {
      name: "Fruits",
      type: "category",

      apples: {
        name: "Apples",
        icon: "apples",
        buy_price: 150
      },
      grapes: {
        name: "Grapes",
        icon: "grapes",
        buy_price: 300
      },
      olives: {
        name: "Olives",
        icon: "olives",
        buy_price: 250
      },
      pumpkins: {
        name: "Pumpkins",
        icon: "pumpkins",
        buy_price: 100
      },
      strawberries: {
        name: "Strawberries",
        icon: "strawberries",
        buy_price: 200
      },
      sunflowers: {
        name: "Sunflowers",
        icon: "sunflowers",
        buy_price: 50
      },
      watermelons: {
        name: "Watermelons",
        icon: "watermelons",
        buy_price: 100
      }
    },
    furs: {
      name: "Furs",
      icon: "furs",
      buy_price: 1500
    },
    meat: {
      name: "Meat",
      type: "category",

      beef: {
        name: "Beef",
        icon: "beef",
        buy_price: 300
      },
      camel_meat: {
        name: "Camel Meat",
        icon: "camel_meat",
        buy_price: 350
      },
      chicken: {
        name: "Chicken",
        icon: "chicken",
        buy_price: 250
      },
      crab: {
        name: "Crab",
        icon: "crab",
        buy_price: 400
      },
      cuy: {
        name: "Cuy",
        icon: "cuy",
        buy_price: 150
      },
      duck: {
        name: "Duck",
        icon: "duck",
        buy_price: 300
      },
      fish: {
        name: "Fish",
        icon: "fish",
        buy_price: 200
      },
      goat_meat: {
        name: "Goat Meat",
        icon: "goat_meat",
        buy_price: 250
      },
      lobster: {
        name: "Lobster",
        icon: "lobster",
        buy_price: 500
      },
      mutton: {
        name: "Mutton",
        icon: "mutton",
        buy_price: 300
      },
      oyster: {
        name: "Oyster",
        icon: "oyster",
        buy_price: 200
      },
      pork: {
        name: "Pork",
        icon: "pork",
        buy_price: 200
      },
      rabbit_meat: {
        name: "Rabbit Meat",
        icon: "rabbit_meat",
        buy_price: 250
      },
      reindeer: {
        name: "Reindeer",
        icon: "reindeer",
        buy_price: 650
      },
      shrimp: {
        name: "Shrimp",
        icon: "shrimp",
        buy_price: 400
      },
      venison: {
        name: "Venison",
        icon: "venison",
        buy_price: 350
      },
      yak: {
        name: "Yak",
        icon: "yak",
        buy_price: 400
      }
    },
    nuts: {
      name: "Nuts",
      type: "category",

      peanuts: {
        name: "Peanuts",
        icon: "peanuts",
        buy_price: 100
      },
      walnuts: {
        name: "Walnuts",
        icon: "walnuts",
        buy_price: 150
      }
    },
    other_crops: {
      name: "Other Crops",
      type: "category",

      blue_agaves: {
        name: "Blue Agaves",
        icon: "blue_agaves",
        buy_price: 200
      },
      hemp: {
        name: "Hemp",
        icon: "hemp",
        buy_price: 120
      },
      hops: {
        name: "Hops",
        icon: "hops",
        buy_price: 180
      },
      poppies: {
        name: "Poppies",
        icon: "poppies",
        buy_price: 230
      }
    },
    petroil: {
      name: "Petroil",
      icon: "petroil",
      buy_price: 1250
    },
    raw_dyes: {
      name: "Raw Dyes",
      type: "category",

      carmine_bugs: {
        name: "Carmine Bugs",
        icon: "carmine_bugs",
        buy_price: 1000
      },
      indigo: {
        name: "Indigo",
        icon: "indigo",
        buy_price: 400
      },
      woad: {
        name: "Woad",
        icon: "woad",
        buy_price: 300
      }
    },
    raw_minerals: {
      name: "Raw Minerals",
      type: "category",

      acanthite: {
        name: "Acanthite",
        icon: "acanthite",
        mine_action_chance: 14, //8,314 million tons
        buy_price: 2500
      },
      anthracite: {
        name: "Anthracite",
        icon: "anthracite",
        mine_action_chance: 34, //219 billion tonnes
        buy_price: 300
      },
      arsenopyrite: {
        name: "Arsenopyrite",
        icon: "arsenopyrite",
        mine_action_chance: 15, //25 million tons
        buy_price: 1800
      },
      baryte: {
        name: "Baryte",
        aliases: ["Barite"],
        icon: "baryte",
        mine_action_chance: 28, //2 billion tons
        buy_price: 100
      },
      bauxite: {
        name: "Bauxite",
        icon: "bauxite",
        mine_action_chance: 33, //31 billion tonnes
        buy_price: 150
      },
      beryl: {
        name: "Beryl",
        icon: "beryl",
        mine_action_chance: 5, //100 thousand tons
        buy_price: 500
      },
      bitumen: {
        name: "Bitumen",
        icon: "bitumen",
        mine_action_chance: 29, //10,513 billion tons
        buy_price: 80
      },
      bornite: {
        name: "Bornite",
        icon: "bornite",
        mine_action_chance: 20, //90 million tons
        buy_price: 2000
      },
      cassiterite: {
        name: "Cassiterite",
        icon: "cassiterite",
        mine_action_chance: 22, //155 million tons
        buy_price: 800
      },
      chalcocite: {
        name: "Chalcocite",
        icon: "chalcocite",
        mine_action_chance: 30, //12,5 billion tonnes
        buy_price: 2100
      },
      chalcopyrite: {
        name: "Chalcopyrite",
        icon: "chalcopyrite",
        mine_action_chance: 25, //700 million tonnes
        buy_price: 1200
      },
      chromite: {
        name: "Chromite",
        icon: "chromite",
        mine_action_chance: 24, //560 million tonnes
        buy_price: 400
      },
      cinnabar: {
        name: "Cinnabar",
        icon: "cinnabar",
        mine_action_chance: 6, //147 thousand tons
        buy_price: 1800
      },
      cobaltite: {
        name: "Cobalt",
        icon: "cobalt",
        mine_action_chance: 16, //25 million tonnes
        buy_price: 3000
      },
      coltan: {
        name: "Coltan",
        icon: "coltan",
        mine_action_chance: 1, //1 thousand tonnes
        buy_price: 4500
      },
      cooperite: {
        name: "Cooperite",
        icon: "cooperite",
        mine_action_chance: 3, //10 thousand tonnes
        buy_price: 2400
      },
      fluorite: {
        name: "Fluorite",
        icon: "fluorite",
        mine_action_chance: 26, //1 billion tonnes
        buy_price: 500
      },
      galena: {
        name: "Galena",
        icon: "galena",
        mine_action_chance: 19, //85 million tonnes
        buy_price: 800
      },
      hematite: {
        name: "Hematite",
        icon: "hematite",
        mine_action_chance: 32, //28,31 billion tons
        buy_price: 100
      },
      ilmenite: {
        name: "Ilmenite",
        icon: "ilmenite",
        mine_action_chance: 23, //160 million tonnes
        buy_price: 150
      },
      kimberlite: {
        name: "Kimberlite",
        icon: "kimberlite",
        mine_action_chance: 17, //26 million tonnes
        buy_price: 2000
      },
      lignite: {
        name: "Lignite",
        icon: "lignite",
        mine_action_chance: 35, //400 billion tonnes
        buy_price: 50
      },
      magnetite: {
        name: "Magnetite",
        icon: "magnetite",
        mine_action_chance: 31, //13,8 billion tons
        buy_price: 120
      },
      malachite: {
        name: "Malachite",
        icon: "malachite",
        mine_action_chance: 1, //1 thousand tonnes
        buy_price: 900
      },
      molybdenite: {
        name: "Molybdenite",
        icon: "molybdenite",
        mine_action_chance: 4, //20 million tonnes
        buy_price: 2500
      },
      native_gold: {
        name: "Native Gold",
        type: "category",

        placer_gold: {
          name: "Placer Gold",
          icon: "placer_gold",
          mine_action_chance: 5, //180 tons prod.
          buy_price: 5600
        },
        quartz_gold: {
          name: "Quartz Gold",
          icon: "quartz_gold",
          mine_action_chance: 7, //244 thousand tonnes
          buy_price: 5000
        }
      },
      nitre: {
        name: "Nitre",
        icon: "nitre",
        mine_action_chance: 9, //1 million tons
        buy_price: 50
      },
      pentlandite: {
        name: "Pentlandite",
        icon: "pentlandite",
        mine_action_chance: 21, //100 million tonnes
        buy_price: 1800
      },
      pyrolusite: {
        name: "Pyrlousite",
        icon: "pyrolusite",
        mine_action_chance: 13, //6,4 million tonnes
        buy_price: 400
      },
      quartz_sand: {
        name: "Quartz Sand",
        icon: "quartz_sand",
        mine_action_chance: 27, //1,665 billion tonnes
        buy_price: 50
      },
      ruby: {
        name: "Ruby",
        icon: "ruby",
        mine_action_chance: 2, //10 thousand tons
        buy_price: 5000
      },
      scheelite: {
        name: "Scheelite",
        icon: "scheelite",
        mine_action_chance: 11, //3 million tons
        buy_price: 800
      },
      sperrylite: {
        name: "Sperrylite",
        icon: "sperrylite",
        mine_action_chance: 8, //900 thousand tons
        buy_price: 3000
      },
      sphalerite: {
        name: "Sphalerite",
        icon: "sphalerite",
        mine_action_chance: 12, //5,256 million tonnes
        buy_price: 900
      },
      uraninite: {
        name: "Uraninite",
        icon: "uraninite",
        mine_action_chance: 10, //1,5 million tons
        buy_price: 1800
      },
      wolframite: {
        name: "Wolframite",
        icon: "wolframite",
        mine_action_chance: 18, //42 million tonnes
        buy_price: 1000
      }
    },
    seasoning: {
      name: "Seasoning",
      type: "category",

      bell_peppers: {
        name: "Bell Peppers",
        icon: "bell_peppers",
        buy_price: 80
      },
      camphor: {
        name: "Camphor",
        icon: "camphor",
        buy_price: 2500
      },
      cardamom: {
        name: "Cardamom",
        icon: "cardamom",
        buy_price: 3000
      },
      cayenne: {
        name: "Cayenne",
        icon: "cayenne",
        buy_price: 100
      },
      chilli: {
        name: "Chilli",
        icon: "chilli",
        aliases: ["chili"],
        buy_price: 90
      },
      cinnamon: {
        name: "Cinnamon",
        icon: "cinnamon",
        buy_price: 2200
      },
      cloves: {
        name: "Cloves",
        icon: "cloves",
        buy_price: 1800
      },
      fennel: {
        name: "Fennel",
        icon: "fennel",
        buy_price: 1500
      },
      fenugreek: {
        name: "Fenugreek",
        icon: "fenugreek",
        buy_price: 1200
      },
      garlic: {
        name: "Garlic",
        icon: "garlic",
        buy_price: 800
      },
      ginger: {
        name: "Ginger",
        icon: "ginger",
        buy_price: 1300
      },
      linseed: {
        name: "Linseed",
        icon: "linseed",
        buy_price: 100
      },
      mustard: {
        name: "Mustard",
        icon: "mustard",
        buy_price: 400
      },
      nutmeg: {
        name: "Nutmeg",
        icon: "nutmeg",
        buy_price: 2500
      },
      oil_palm_fruit: {
        name: "Oil Palm Fruit",
        icon: "oil_palm_fruit",
        buy_price: 1200
      },
      paprika: {
        name: "Paprika",
        icon: "paprika",
        buy_price: 150
      },
      pepper: {
        name: "Pepper",
        icon: "pepper",
        buy_price: 2800
      },
      rapeseed: {
        name: "Rapeseed",
        icon: "rapeseed",
        buy_price: 200
      },
      sugarcane: {
        name: "Sugarcane",
        icon: "sugarcane",
        buy_price: 300
      }
    },
    stone: {
      name: "Stone",
      type: "category",

      andesite: {
        name: "Andesite",
        icon: "andesite",
        quarry_action_chance: 4,
        buy_price: 50
      },
      basalt: {
        name: "Basalt",
        icon: "basalt",
        quarry_action_chance: 6,
        buy_price: 60
      },
      chalk: {
        name: "Chalk",
        icon: "chalk",
        quarry_action_chance: 2,
        buy_price: 30
      },
      clay: {
        name: "Clay",
        icon: "clay",
        quarry_action_chance: 6,
        buy_price: 20
      },
      diorite: {
        name: "Diorite",
        icon: "diorite",
        quarry_action_chance: 3,
        buy_price: 40
      },
      dolomite: {
        name: "Dolomite",
        icon: "dolomite",
        quarry_action_chance: 3,
        buy_price: 70
      },
      fieldstone: {
        name: "Fieldstone",
        icon: "fieldstone",
        quarry_action_chance: 2,
        buy_price: 25
      },
      flagstone: {
        name: "Flagstone",
        icon: "flagstone",
        quarry_action_chance: 1,
        buy_price: 25
      },
      flint: {
        name: "Flint",
        icon: "flint",
        quarry_action_chance: 2,
        buy_price: 40
      },
      granite: {
        name: "Granite",
        icon: "granite",
        quarry_action_chance: 6,
        buy_price: 50
      },
      limestone: {
        name: "Limestone",
        icon: "limestone",
        quarry_action_chance: 7,
        buy_price: 30
      },
      marble: {
        name: "Marble",
        icon: "marble",
        quarry_action_chance: 4,
        buy_price: 80
      },
      sandstone: {
        name: "Sandstone",
        icon: "sandstone",
        quarry_action_chance: 8,
        buy_price: 40
      },
      shale: {
        name: "Shale",
        icon: "shale",
        quarry_action_chance: 8,
        buy_price: 20
      },
      slate: {
        name: "Slate",
        icon: "slate",
        quarry_action_chance: 5,
        buy_price: 45
      }
    },
    tropical_crops: {
      name: "Tropical Crops",
      type: "category",

      bananas: {
        name: "Bananas",
        icon: "bananas",
        buy_price: 50
      },
      citrus: {
        name: "Citrus",
        icon: "citrus",
        buy_price: 70
      },
      coffee_beans: {
        name: "Coffee Beans",
        icon: "coffee_beans",
        buy_price: 300
      },
      dates: {
        name: "Dates",
        icon: "dates",
        buy_price: 100
      },
      guavas: {
        name: "Guavas",
        icon: "guavas",
        buy_price: 80
      },
      mangoes: {
        name: "Mangoes",
        aliases: ["Mangos"],
        icon: "mangoes",
        buy_price: 120
      },
      mangosteens: {
        name: "Mangosteens",
        icon: "mangosteens",
        buy_price: 200
      },
      sweet_potatoes: {
        name: "Sweet Potatoes",
        icon: "sweet_potatoes",
        buy_price: 60
      },
      yam: {
        name: "Yam",
        icon: "yams",
        buy_price: 70
      }
    },
    vegetables: {
      name: "Vegetables",
      type: "category",

      cabbage: {
        name: "Cabbage",
        icon: "cabbage",
        buy_price: 40
      },
      carrot: {
        name: "Carrot",
        icon: "carrot",
        buy_price: 30
      },
      chicory: {
        name: "Chicory",
        icon: "chicory",
        buy_price: 50
      },
      cucumbers: {
        name: "Cucumbers",
        icon: "cucumbers",
        buy_price: 35
      },
      eggplants: {
        name: "Eggplants",
        icon: "eggplants",
        buy_price: 45
      },
      lettuce: {
        name: "Lettuce",
        icon: "lettuce",
        buy_price: 55
      },
      onions: {
        name: "Onions",
        icon: "onions",
        buy_price: 25
      },
      peas: {
        name: "Peas",
        icon: "peas",
        buy_price: 40
      },
      soybeans: {
        name: "Soybeans",
        icon: "soybeans",
        buy_price: 70
      },
      spinach: {
        name: "Spinach",
        icon: "spinach",
        buy_price: 50
      },
      tomatoes: {
        name: "Tomatoes",
        icon: "tomatoes",
        buy_price: 65
      },
      turnips: {
        name: "Turnips",
        icon: "turnips",
        buy_price: 30
      }
    },
    wood: {
      name: "Wood",
      type: "category",

      acacia: {
        name: "Acacia",
        icon: "acacia",
        chop_action_chance: 6,
        buy_price: 80
      },
      ash: {
        name: "Ash",
        icon: "ash",
        chop_action_chance: 6,
        buy_price: 90
      },
      balsa: {
        name: "Balsa",
        icon: "balsa",
        chop_action_chance: 3,
        buy_price: 100
      },
      basswood: {
        name: "Basswood",
        icon: "basswood",
        chop_action_chance: 4,
        buy_price: 110
      },
      blackwood: {
        name: "Blackwood",
        icon: "blackwood",
        chop_action_chance: 3,
        buy_price: 120
      },
      bloodwood: {
        name: "Bloodwood",
        icon: "bloodwood",
        chop_action_chance: 2,
        buy_price: 130
      },
      cedar: {
        name: "Cedar",
        icon: "cedar",
        chop_action_chance: 7,
        buy_price: 140
      },
      cherry: {
        name: "Cherry",
        icon: "cherry",
        chop_action_chance: 5,
        buy_price: 150
      },
      chestnut: {
        name: "Chestnut",
        icon: "chestnut",
        chop_action_chance: 4,
        buy_price: 160
      },
      cottonwood: {
        name: "Cottonwood",
        icon: "cottonwood",
        chop_action_chance: 3,
        buy_price: 100
      },
      cypress: {
        name: "Cypress",
        icon: "cypress",
        chop_action_chance: 6,
        buy_price: 120
      },
      ebony: {
        name: "Ebony",
        icon: "ebony",
        chop_action_chance: 2,
        buy_price: 250
      },
      elm: {
        name: "Elm",
        icon: "elm",
        chop_action_chance: 4,
        buy_price: 140
      },
      eucalyptus: {
        name: "Eucalyptus",
        icon: "eucalyptus",
        chop_action_chance: 8,
        buy_price: 110
      },
      fir: {
        name: "Fir",
        icon: "fir",
        chop_action_chance: 5,
        buy_price: 120
      },
      hickory: {
        name: "Hickory",
        icon: "hickory",
        chop_action_chance: 4,
        buy_price: 130
      },
      ironwood: {
        name: "Ironwood",
        icon: "ironwood",
        chop_action_chance: 2,
        buy_price: 220
      },
      lacewood: {
        name: "Lacewood",
        icon: "lacewood",
        chop_action_chance: 1,
        buy_price: 170
      },
      mahogany: {
        name: "Mahogany",
        icon: "mahogany",
        chop_action_chance: 5,
        buy_price: 180
      },
      maple: {
        name: "Maple",
        icon: "maple",
        chop_action_chance: 6,
        buy_price: 160
      },
      oak: {
        name: "Oak",
        icon: "oak",
        chop_action_chance: 8,
        buy_price: 150
      },
      pine: {
        name: "Pine",
        icon: "pine",
        chop_action_chance: 8,
        buy_price: 90
      },
      redwood: {
        name: "Redwood",
        icon: "redwood",
        chop_action_chance: 7,
        buy_price: 130
      },
      rosewood: {
        name: "Rosewood",
        icon: "rosewood",
        chop_action_chance: 3,
        buy_price: 200
      },
      sandalwood: {
        name: "Sandalwood",
        icon: "sandalwood",
        chop_action_chance: 2,
        buy_price: 210
      },
      spruce: {
        name: "Spruce",
        icon: "spruce",
        chop_action_chance: 7,
        buy_price: 100
      },
      turpentine: {
        name: "Turpentine",
        icon: "turpentine",
        chop_action_chance: 1,
        buy_price: 100
      },
      walnut: {
        name: "Walnut",
        icon: "walnut",
        chop_action_chance: 5,
        buy_price: 190
      },
      willow: {
        name: "Willow",
        icon: "willow",
        chop_action_chance: 6,
        buy_price: 80
      }
    },
    wool: {
      name: "Wool",
      type: "category",

      alpaca_wool: {
        name: "Alpaca Wool",
        icon: "alpaca_wool",
        buy_price: 120
      },
      goat_wool: {
        name: "Goat Wool",
        icon: "goat_wool",
        buy_price: 100
      },
      sheep_wool: {
        name: "Sheep Wool",
        icon: "sheep_wool",
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
      icon: "aluminium",
      buy_price: 2000
    },
    brass: {
      name: "Brass",
      icon: "brass",
      buy_price: 2500
    },
    bronze: {
      name: "Bronze",
      icon: "bronze",
      buy_price: 2300
    },
    cabins: {
      name: "Cabins",
      icon: "cabins",
      buy_price: 3000
    },
    coals: {
      name: "Coals",
      type: "category",

      bituminous_coal: {
        name: "Bituminous Coal",
        icon: "bituminous_coal",
        buy_price: 70
      },
      brown_coal: {
        name: "Brown Coal",
        icon: "brown_coal",
        buy_price: 50
      },
      charcoal: {
        name: "Charcoal",
        icon: "charcoal",
        buy_price: 100
      },
      coal_coke: {
        name: "Coal Coke",
        icon: "coal_coke",
        buy_price: 120
      },
      hard_coal: {
        name: "Hard Coal",
        icon: "hard_coal",
        buy_price: 80
      },
      peat: {
        name: "Peat",
        icon: "peat",
        buy_price: 40
      }
    },
    concrete: {
      name: "Concrete",
      icon: "concrete",
      buy_price: 100
    },
    copper_wire: {
      name: "Copper Wire",
      icon: "copper_wire",
      buy_price: 3000
    },
    electric_gear: {
      name: "Electric Gear",
      icon: "electric_gear",
      buy_price: 2500
    },
    electronics: {
      name: "Electronics",
      type: "category",

      capacitors: {
        name: "Capacitors",
        icon: "capacitors",
        buy_price: 4000
      },
      resistors: {
        name: "Resistors",
        icon: "resistors",
        buy_price: 3500
      },
      transistors: {
        name: "Transistors",
        icon: "transistors",
        buy_price: 5000
      }
    },
    engines: {
      name: "Engines",
      icon: "engines",
      buy_price: 3000
    },
    explosives: {
      name: "Explosives",
      type: "category",

      anfo: {
        name: "ANFO",
        icon: "anfo",
        buy_price: 800
      },
      dynamite: {
        name: "Dynamite",
        icon: "dynamite",
        buy_price: 2500
      },
      plastic_explosives: {
        name: "Plastic Explosives",
        icon: "plastic_explosives",
        buy_price: 3500
      },
      TNT: {
        name: "TNT",
        icon: "tnt",
        buy_price: 4000
      }
    },
    fabric: {
      name: "Fabric",
      type: "category",

      cloth: {
        name: "Cloth",
        icon: "cloth",
        buy_price: 90
      },
      linen: {
        name: "Linen",
        icon: "linen",
        buy_price: 110
      },
      synthetic_fabric: {
        name: "Synthetic Fabric",
        icon: "synthetic_fabric",
        buy_price: 120
      }
    },
    felt: {
      name: "Felt",
      icon: "felt",
      buy_price: 80
    },
    filaments: {
      name: "Filaments",
      icon: "filaments",
      buy_price: 150
    },
    flour: {
      name: "Flour",
      icon: "flour",
      buy_price: 40
    },
    glass: {
      name: "Glass",
      icon: "glass",
      buy_price: 100
    },
    gunpowder: {
      name: "Gunpowder",
      icon: "gunpowder",
      buy_price: 300
    },
    industrial_chemicals: {
      name: "Industrial Chemicals",
      type: "category",

      acetic_acid: {
        name: "Acetic Acid",
        icon: "acetic_acid",
        buy_price: 2000
      },
      acetone: {
        name: "Acetone",
        icon: "acetone",
        buy_price: 1800
      },
      ammonia: {
        name: "Ammonia",
        icon: "ammonia",
        buy_price: 1200
      },
      argon: {
        name: "Argon",
        icon: "argon",
        buy_price: 5000
      },
      benzene: {
        name: "Benzene",
        icon: "benzene",
        buy_price: 2500
      },
      bromine: {
        name: "Bromine",
        icon: "bromine",
        buy_price: 2800
      },
      butadiene: {
        name: "Butadiene",
        icon: "butadiene",
        buy_price: 3200
      },
      calcium: {
        name: "Calcium",
        icon: "calcium",
        buy_price: 800
      },
      calcium_carbonate: {
        name: "Calcium Carbonate",
        icon: "calcium_carbonate",
        buy_price: 900
      },
      carbon: {
        name: "Carbon",
        icon: "carbon",
        buy_price: 1000
      },
      chlorine: {
        name: "Chlorine",
        icon: "chlorine",
        buy_price: 2200
      },
      epoxyethane: {
        name: "Epoxyethane",
        icon: "epoxyethane",
        buy_price: 3500
      },
      ethanol: {
        name: "Ethanol",
        icon: "ethanol",
        buy_price: 1800
      },
      ethylene: {
        name: "Ethylene",
        icon: "ethylene",
        buy_price: 2500
      },
      ethylene_glycol: {
        name: "Ethylene Glycol",
        icon: "ethylene_glycol",
        buy_price: 2700
      },
      fluorine: {
        name: "Fluorine",
        icon: "fluorine",
        buy_price: 4000
      },
      formaldehyde: {
        name: "Formaldehyde",
        icon: "formaldehyde",
        buy_price: 3000
      },
      hydrochloric_acid: {
        name: "Hydrochloric Acid",
        icon: "hydrochloric_acid",
        buy_price: 2200
      },
      hydrogen: {
        name: "Hydrogen",
        icon: "hydrogen",
        buy_price: 1500
      },
      hydrogen_fluoride: {
        name: "Hydrogen Fluoride",
        icon: "hydrogen_fluoride",
        buy_price: 3800
      },
      hydrogen_peroxide: {
        name: "Hydrogen Peroxide",
        icon: "hydrogen_peroxide",
        buy_price: 2600
      },
      iodine: {
        name: "Iodine",
        icon: "iodine",
        buy_price: 3200
      },
      krypton: {
        name: "Krypton",
        icon: "krypton",
        buy_price: 5000
      },
      methanol: {
        name: "Methanol",
        icon: "methanol",
        buy_price: 1900
      },
      methylbenzene: {
        name: "Methylbenzene",
        icon: "methylbenzene",
        buy_price: 2400
      },
      methyl_tertiary_butyl_ether: {
        name: "Methyl Tertiary-butyl Ether",
        icon: "methyl_tertiary_butyl_ether",
        aliases: ["MTBE"],
        buy_price: 3000
      },
      neon: {
        name: "Neon",
        icon: "neon",
        buy_price: 4500
      },
      nitric_acid: {
        name: "Nitric Acid",
        icon: "nitric_acid",
        buy_price: 2800
      },
      nitrogen: {
        name: "Nitrogen",
        icon: "nitrogen",
        buy_price: 800
      },
      oxygen: {
        name: "Oxygen",
        icon: "oxygen",
        buy_price: 700
      },
      phenol: {
        name: "Phenol",
        icon: "phenol",
        buy_price: 2700
      },
      propylene: {
        name: "Propylene",
        icon: "propylene",
        buy_price: 2800
      },
      phosphoric_acid: {
        name: "Phosphoric Acid",
        icon: "phosphoric_acid",
        buy_price: 2100
      },
      phosphorus: {
        name: "Phosphorus",
        icon: "phosphorus",
        buy_price: 1200
      },
      sodium_carbonate: {
        name: "Sodium Carbonate",
        icon: "sodium_carbonate",
        buy_price: 900
      },
      sodium_hydroxide: {
        name: "Sodium Hydroxide",
        icon: "sodium_hydroxide",
        buy_price: 1000
      },
      sulphur: {
        name: "Sulphur",
        icon: "sulphur",
        buy_price: 600
      },
      sulphuric_acid: {
        name: "Sulphuric Acid",
        icon: "sulphuric_acid",
        buy_price: 2200
      },
      titanium_dioxide: {
        name: "Titanium Dioxide",
        icon: "titanium_dioxide",
        buy_price: 1800
      },
      urea: {
        name: "Urea",
        icon: "urea",
        buy_price: 1100
      },
      xenon: {
        name: "Xenon",
        icon: "xenon",
        buy_price: 5000
      }
    },
    integrated_circuits: {
      name: "Integrated Circuits",
      icon: "integrated_circuits",
      buy_price: 6000
    },
    locomotives: {
      name: "Locomotives",
      icon: "locomotives",
      buy_price: 3500
    },
    machine_parts: {
      name: "Machine Parts",
      icon: "machine_parts",
      buy_price: 2500
    },
    malt: {
      name: "Malt",
      icon: "malt",
      buy_price: 100
    },
    molasses: {
      name: "Molasses",
      icon: "molasses",
      buy_price: 80
    },
    natural_gas: {
      name: "Natural Gas",
      icon: "natural_gas",
      buy_price: 200
    },
    processed_hops: {
      name: "Processed Hops",
      icon: "processed_hops",
      buy_price: 250
    },
    processed_ores: {
      name: "Processed Ores",
      type: "category",

      alumina: {
        name: "Alumina",
        icon: "alumina",
        buy_price: 1800
      },
      arsenic: {
        name: "Arsenic",
        icon: "arsenic",
        buy_price: 2800
      },
      barium: {
        name: "Barium",
        icon: "barium",
        buy_price: 2200
      },
      beryllium: {
        name: "Beryllium",
        icon: "beryllium",
        buy_price: 3500
      },
      chromium: {
        name: "Chromium",
        icon: "chromium",
        buy_price: 2700
      },
      cobalt: {
        name: "Cobalt",
        icon: "cobalt",
        buy_price: 3200
      },
      copper: {
        name: "Copper",
        icon: "copper",
        buy_price: 2800
      },
      gold: {
        name: "Gold",
        icon: "gold",
        buy_price: 5000
      },
      ferrochromium: {
        name: "Ferrochromium",
        icon: "ferrochromium",
        buy_price: 3000
      },
      iron: {
        name: "Iron",
        icon: "iron",
        buy_price: 1200
      },
      lead: {
        name: "Lead",
        icon: "lead",
        buy_price: 2400
      },
      nickel: {
        name: "Nickel",
        icon: "nickel",
        buy_price: 3000
      },
      niobium: {
        name: "Niobium",
        icon: "niobium",
        buy_price: 3800
      },
      manganese: {
        name: "Manganese",
        icon: "manganese",
        buy_price: 1600
      },
      mercury: {
        name: "Mercury",
        icon: "mercury",
        buy_price: 4000
      },
      molybdenum: {
        name: "Molybdenum",
        icon: "molybdenum",
        buy_price: 3200
      },
      palladium: {
        name: "Palladium",
        icon: "palladium",
        buy_price: 4500
      },
      pig_iron: {
        name: "Pig Iron",
        icon: "pig_iron",
        buy_price: 1400
      },
      platinum: {
        name: "Platinum",
        icon: "platinum",
        buy_price: 4800
      },
      saltpetre: {
        name: "Saltpetre",
        aliases: ["saltpeter"],
        icon: "saltpetre",
        buy_price: 1000
      },
      silicon: {
        name: "Silicon",
        icon: "silicon",
        buy_price: 2200
      },
      silver: {
        name: "Silver",
        icon: "silver",
        buy_price: 3500
      },
      tantalum: {
        name: "Tantalum",
        icon: "tantalum",
        buy_price: 4000
      },
      tin: {
        name: "Tin",
        icon: "tin",
        buy_price: 1800
      },
      titanium: {
        name: "Titanium",
        icon: "titanium",
        buy_price: 3500
      },
      tungsten: {
        name: "Tungsten",
        icon: "tungsten",
        buy_price: 3700
      },
      zinc: {
        name: "Zinc",
        icon: "zinc",
        buy_price: 1600
      }
    },
    silk: {
      name: "Silk",
      icon: "silk",
      buy_price: 2000
    },
    steel: {
      name: "Steel",
      type: "category",

      regular_steel: {
        name: "Regular Steel",
        icon: "regular_steel",
        buy_price: 1400
      },
      stainless_steel: {
        name: "Stainless Steel",
        icon: "stainless_steel",
        buy_price: 2200
      }
    },
    tallow: {
      name: "Tallow",
      icon: "tallow",
      buy_price: 50
    },
    turbines: {
      name: "Turbines",
      icon: "turbines",
      buy_price: 3000
    },
    velvet: {
      name: "Velvet",
      icon: "velvet",
      buy_price: 1800
    }
  },

  processed_goods: {
    name: "Processed Goods",
    icon: "construction_time",
    type: "category",

    aeroplanes: {
      name: "Aeroplanes",
      icon: "aeroplanes",
      buy_price: 7800
    },
    alcohol: {
      name: "Alcohol",
      type: "category",

      beer: {
        name: "Beer",
        icon: "beer",
        buy_price: 60
      },
      gin: {
        name: "Gin",
        icon: "gin",
        buy_price: 150
      },
      schnapps: {
        name: "Schnapps",
        icon: "schnapps",
        buy_price: 120
      },
      rum: {
        name: "Rum",
        icon: "rum",
        buy_price: 180
      },
      tequila: {
        name: "Tequila",
        icon: "tequila",
        buy_price: 200
      },
      tonics: {
        name: "Tonics",
        icon: "tonics",
        buy_price: 100
      },
      vodka: {
        name: "Vodka",
        icon: "vodka",
        buy_price: 160
      },
      whiskey: {
        name: "Whiskey",
        icon: "whiskey",
        buy_price: 250
      },
      wine: {
        name: "Wine",
        type: "category",

        champagne: {
          name: "Champagne",
          icon: "champagne",
          buy_price: 400
        },
        red_wine: {
          name: "Red Wines",
          type: "category",

          barbera: {
            name: "Barbera",
            icon: "barbera",
            buy_price: 2200
          },
          cabernet_franc: {
            name: "Cabernet Franc",
            icon: "cabernet_franc",
            buy_price: 2400
          },
          cabernet_sauvignon: {
            name: "Cabernet Sauvignon",
            icon: "cabernet_sauvignon",
            buy_price: 2600
          },
          charbono: {
            name: "Charbono",
            icon: "charbono",
            buy_price: 2000
          },
          dolcetto: {
            name: "Dolcetto",
            icon: "dolcetto",
            buy_price: 1800
          },
          gamay: {
            name: "Gamay",
            icon: "gamay",
            buy_price: 2100
          },
          grenache: {
            name: "Grenache",
            icon: "grenache",
            buy_price: 2300
          },
          malbec: {
            name: "Malbec",
            icon: "malbec",
            buy_price: 2400
          },
          merlot: {
            name: "Merlot",
            icon: "merlot",
            buy_price: 2500
          },
          mourvedre: {
            name: "Mourvedre",
            icon: "mourvedre",
            buy_price: 2300
          },
          nehbyehlas: {
            name: "Nehbyehlas",
            icon: "nehbyehlas",
            buy_price: 2800
          },
          petite_sirah: {
            name: "Petite Sirah",
            icon: "petite_sirah",
            buy_price: 2600
          },
          pinot_gris: {
            name: "Pinot Gris",
            icon: "pinot_gris",
            buy_price: 2200
          },
          pinot_noir: {
            name: "Pinot Noir",
            icon: "pinot_noir",
            buy_price: 2800
          },
          port: {
            name: "Port",
            icon: "port",
            buy_price: 3000
          },
          red_bordeaux: {
            name: "Red Bordeaux",
            icon: "red_bordeaux",
            buy_price: 3200
          },
          sangiovese: {
            name: "Sangiovese",
            icon: "sangiovese",
            buy_price: 2600
          },
          syrah: {
            name: "Syrah",
            icon: "syrah",
            buy_price: 2700
          },
          zinfandel: {
            name: "Zinfandel",
            icon: "zinfandel",
            buy_price: 2400
          }
        },
        white_wine: {
          name: "White Wine",
          type: "category",

          chardonnay: {
            name: "Chardonnay",
            icon: "chardonnay",
            buy_price: 2500
          },
          gewurztraminer: {
            name: "Gewürztraminer",
            aliases: ["gewurztraminer", "gewuerztraminer"],
            icon: "gewurztraminer",
            buy_price: 2300
          },
          gruner_veltliner: {
            name: "Grüner Veltliner",
            aliases: ["gruner veltliner", "gruener veltliner"],
            icon: "gruner_veltliner",
            buy_price: 2200
          },
          malvasia: {
            name: "Malvasia",
            icon: "malvasia",
            buy_price: 2100
          },
          marsanne: {
            name: "Marsanne",
            icon: "marsanne",
            buy_price: 2400
          },
          muscat: {
            name: "Muscat",
            icon: "muscat",
            buy_price: 2500
          },
          pinot_blanc: {
            name: "Pinot Blanc",
            icon: "pinot_blanc",
            buy_price: 2200
          },
          prosecco: {
            name: "Prosecco",
            icon: "prosecco",
            buy_price: 2500
          },
          riesling: {
            name: "Riesling",
            icon: "riesling",
            buy_price: 2400
          },
          sauvignon_blanc: {
            name: "Sauvignon Blanc",
            icon: "sauvignon_blanc",
            buy_price: 2500
          },
          semillon: {
            name: "Sémillon",
            icon: "semillon",
            buy_price: 2300
          },
          vernaccia: {
            name: "Vernaccia",
            icon: "vernaccia",
            buy_price: 2100
          },
          viognier: {
            name: "Viognier",
            icon: "viognier",
            buy_price: 2600
          },
          white_bordeaux: {
            name: "White Bordeaux",
            icon: "white_bordeaux",
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
        icon: "ap_rounds",
        buy_price: 3000
      },
      artillery_shells: {
        name: "Artillery Shells",
        type: "category",

        delayed_fuse_shells: {
          name: "Delayed-Fuse Shells",
          icon: "delayed_fuse_shells",
          buy_price: 2500
        },
        regular_shells: {
          name: "Regular Shells",
          icon: "regular_shells",
          buy_price: 2000
        }
      },
      high_calibre_ammunition: {
        name: "High-calibre Ammunition",
        aliases: ["high-caliber ammunition", "high caliber ammunition", "high calibre ammunition"],
        icon: "high_calibre_ammunition",
        buy_price: 2800
      },
      low_calibre_ammunition: {
        name: "Low-calibre Ammunition",
        aliases: ["low-caliber ammunition", "low caliber ammunition", "low calibre ammunition"],
        icon: "low_calibre_ammunition",
        buy_price: 2200
      },
      sabot_rounds: {
        name: "Sabot Rounds",
        icon: "sabot_rounds",
        buy_price: 3200
      }
    },
    automobiles: {
      name: "Automobiles",
      type: "category",

      cars: {
        name: "Cars",
        icon: "cars",
        buy_price: 3500
      },
      humvees: {
        name: "Humvees",
        icon: "humvees",
        buy_price: 5000
      },
      jeeps: {
        name: "Jeeps",
        icon: "jeeps",
        buy_price: 3000
      },
      lorries: {
        name: "Lorries",
        icon: "lorries",
        buy_price: 4000
      },
      luxury_cars: {
        name: "Luxury Cars",
        icon: "luxury_cars",
        buy_price: 6000
      },
      motorbikes: {
        name: "Motorbikes",
        icon: "motorbikes",
        buy_price: 1500
      },
      steam_carriages: {
        name: "Steam Carriages",
        buy_price: 4500
      },
      tractors: {
        name: "Tractors",
        icon: "tractors",
        buy_price: 4000
      },
      vans: {
        name: "Vans",
        icon: "vans",
        buy_price: 2500
      }
    },
    bicycles: {
      name: "Bicycles",
      icon: "bicycles",
      buy_price: 300
    },
    bricks: {
      name: "Bricks",
      icon: "bricks",
      buy_price: 200
    },
    cameras: {
      name: "Cameras",
      icon: "cameras",
      buy_price: 12000
    },
    cement: {
      name: "Cement",
      icon: "cement",
      buy_price: 300
    },
    ceramics: {
      name: "Ceramics",
      icon: "ceramics",
      buy_price: 2500
    },
    chassis: {
      name: "Chassis",
      icon: "chassis",
      buy_price: 1200
    },
    chinaware: {
      name: "Chinaware",
      type: "category",

      bone_china: {
        name: "Bone China",
        icon: "bone_china",
        buy_price: 3500
      },
      china: {
        name: "China",
        icon: "china",
        buy_price: 3000
      },
      doccia_porcelain: {
        name: "Doccia Porcelain",
        icon: "doccia_porcelain",
        buy_price: 4000
      },
      lacquerware: {
        name: "Lacquerware",
        icon: "lacquerware",
        buy_price: 2800
      },
      porcelain: {
        name: "Porcelain",
        icon: "porcelain",
        buy_price: 3200
      }
    },
    chewing_gum: {
      name: "Chewing Gum",
      icon: "chewing_gum",
      buy_price: 100
    },
    chocolate: {
      name: "Chocolate",
      icon: "chocolate",
      buy_price: 4500
    },
    cigars: {
      name: "Cigars",
      icon: "cigars",
      buy_price: 2500
    },
    cigarettes: {
      name: "Cigarettes",
      icon: "cigarettes",
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
          icon: "bowler_hats",
          buy_price: 1600
        },
        finery: {
          name: "Finery",
          icon: "finery",
          buy_price: 3000
        },
        fur_coats: {
          name: "Fur Coats",
          icon: "fur_coats",
          buy_price: 6000
        },
        fur_hats: {
          name: "Fur Hats",
          icon: "fur_hats",
          buy_price: 2000
        },
        leather_boots: {
          name: "Leather Boots",
          icon: "leather_boots",
          buy_price: 2400
        },
        pocketwatches: {
          name: "Pocketwatches",
          aliases: ["pocket watches"],
          icon: "pocketwatches",
          buy_price: 4000
        },
        tailored_suits: {
          name: "Tailored Suits",
          icon: "tailored_suits",
          buy_price: 5000
        },
        wristwatches: {
          name: "Wristwatches",
          icon: "wristwatches",
          buy_price: 3600
        }
      },
      staple_clothes: {
        name: "Staple Clothes",
        type: "category",

        boots: {
          name: "Boots",
          icon: "boots",
          buy_price: 1600
        },
        parkas: {
          name: "Parkas",
          icon: "parkas",
          buy_price: 2000
        },
        ponchos: {
          name: "Ponchos",
          icon: "ponchos",
          buy_price: 1400
        },
        work_clothes: {
          name: "Work Clothes",
          icon: "work_clothes",
          buy_price: 1000
        }
      }
    },
    clay_pipes: {
      name: "Clay Pipes",
      icon: "clay_pipes",
      buy_price: 800
    },
    coffee: {
      name: "Coffee",
      icon: "coffee",
      buy_price: 3300
    },
    computers: {
      name: "Computers",
      icon: "computers",
      buy_price: 40000
    },
    cosmetic_products: {
      name: "Cosmetic Products",
      icon: "cosmetic_products",
      buy_price: 1600
    },
    dyes: {
      name: "Dyes",
      icon: "dyes",
      buy_price: 60
    },
    enriched_uranium: {
      name: "Enriched Uranium",
      type: "category",

      depleted_uranium: {
        name: "Depleted Uranium",
        icon: "depleted_uranium",
        buy_price: 2500
      },
      uranium: {
        name: "Uranium",
        icon: "uranium",
        buy_price: 3000
      },
      highly_enriched_uranium: {
        name: "Highly Enriched Uranium",
        icon: "highly_enriched_uranium",
        aliases: ["HEU"],
        buy_price: 5000
      },
      weapons_grade_enriched_uranium: {
        name: "Weapons-Grade Enriched Uranium",
        aliases: ["weapons grade enriched uranium"],
        icon: "weapons_grade_enriched_uranium",
        buy_price: 8000
      }
    },
    fertiliser: {
      name: "Fertiliser",
      icon: "fertiliser",
      buy_price: 100
    },
    film: {
      name: "Film",
      icon: "film",
      buy_price: 60
    },
    foods: {
      name: "Foods",
      type: "category",

      bread: {
        name: "Bread",
        icon: "bread",
        buy_price: 30
      },
      canned_food: {
        name: "Canned Food",
        icon: "canned_food",
        buy_price: 50
      },
      cheese: {
        name: "Cheese",
        type: "category",
        aliases: ["cheeses"],

        american: {
          name: "American",
          icon: "american",
          buy_price: 120
        },
        blue: {
          name: "Blue",
          type: "category",

          gorgonzola: {
            name: "Gorgonzola",
            icon: "gorgonzola",
            buy_price: 180
          },
          roquefort: {
            name: "Roquefort",
            icon: "roquefort",
            buy_price: 200
          },
          stilton: {
            name: "Stilton",
            icon: "stilton",
            buy_price: 160
          }
        },
        brie: {
          name: "Brie",
          icon: "brie",
          buy_price: 140
        },
        butterkase: {
          name: "Butterkäse",
          aliases: ["butterkase", "butterkaese"],
          icon: "butterkase",
          buy_price: 150
        },
        cantal: {
          name: "Cantal",
          icon: "cantal",
          buy_price: 130
        },
        cascaval: {
          name: "Cascaval",
          icon: "cascaval",
          buy_price: 100
        },
        cheddar: {
          name: "Cheddar",
          icon: "cheddar",
          buy_price: 140
        },
        cheshire: {
          name: "Cheshire",
          icon: "cheshire",
          buy_price: 120
        },
        coulommiers: {
          name: "Coulommiers",
          icon: "coulommiers",
          buy_price: 110
        },
        cream_cheese: {
          name: "Cream Cheese",
          icon: "cream_cheese",
          buy_price: 100
        },
        edam: {
          name: "Edam",
          icon: "edam",
          buy_price: 130
        },
        feta: {
          name: "Feta",
          icon: "feta",
          buy_price: 120
        },
        gloucester: {
          name: "Gloucester",
          icon: "gloucester",
          buy_price: 140
        },
        gouda: {
          name: "Gouda",
          icon: "gouda",
          buy_price: 130
        },
        grana_padano: {
          name: "Grana Padano",
          icon: "grana_padano",
          buy_price: 150
        },
        havarti: {
          name: "Havarti",
          icon: "havarti",
          buy_price: 140
        },
        jarlsberg: {
          name: "Jarlsberg",
          icon: "jarlsberg",
          buy_price: 130
        },
        munster: {
          name: "Munster",
          icon: "munster",
          buy_price: 140
        },
        neufchatel: {
          name: "Neufchatel",
          icon: "neufchatel",
          buy_price: 100
        },
        parmesan: {
          name: "Parmesan",
          icon: "parmesan",
          buy_price: 150
        },
        pecorino: {
          name: "Pecorino",
          icon: "pecorino",
          buy_price: 140
        },
        port_salut: {
          name: "Port Salut",
          icon: "port_salut",
          buy_price: 120
        },
        ricotta: {
          name: "Ricotta",
          icon: "ricotta",
          buy_price: 110
        },
        swiss: {
          name: "Swiss",
          icon: "swiss",
          buy_price: 130
        }
      },
      dried_meat: {
        name: "Dried Meat",
        icon: "dried_meat",
        buy_price: 80
      },
      jam: {
        name: "Jam",
        icon: "jam",
        buy_price: 60
      },
      lemonade: {
        name: "Lemonade",
        icon: "lemonade",
        buy_price: 40
      },
      pemmican: {
        name: "Pemmican",
        icon: "pemmican",
        buy_price: 100
      },
      sausages: {
        name: "Sausages",
        icon: "sausages",
        buy_price: 80
      },
      soup: {
        name: "Soup",
        icon: "soup",
        buy_price: 60
      },
      stew: {
        name: "Stew",
        icon: "stew",
        buy_price: 70
      },
      syrup: {
        name: "Syrup",
        icon: "syrup",
        buy_price: 50
      },
      tortillas: {
        name: "Tortillas",
        icon: "tortillas",
        buy_price: 60
      }
    },
    furniture: {
      name: "Furniture",
      type: "category",

      common_furniture: {
        name: "Common Furniture",
        icon: "common_furniture",
        buy_price: 1000
      },
      luxury_furniture: {
        name: "Luxury Furniture",
        icon: "luxury_furniture",
        buy_price: 5000
      }
    },
    gas: {
      name: "Gas",
      icon: "gas",
      buy_price: 2000
    },
    gems: {
      name: "Gems",
      type: "category",

      cut_ruby: {
        name: "Cut Ruby",
        icon: "cut_ruby",
        buy_price: 15000
      },
      diamond: {
        name: "Diamond",
        icon: "diamond",
        buy_price: 30000
      },
      jewellery: {
        name: "Jewellery",
        aliases: ["jewelry"],
        icon: "jewellery",
        buy_price: 25000
      }
    },
    glasses: {
      name: "Glasses",
      icon: "glasses",
      buy_price: 3000
    },
    gramophones: {
      name: "Gramophones",
      icon: "gramophones",
      buy_price: 6500
    },
    heavy_weaponry: {
      name: "Heavy Weaponry",
      icon: "heavy_weaponry",
      buy_price: 10000
    },
    honey: {
      name: "Honey",
      icon: "honey",
      buy_price: 500
    },
    illicit_drugs: {
      name: "Illicit Drugs",
      type: "category",

      cannabis: {
        name: "Cannabis",
        aliases: ["weed"],
        icon: "cannabis",
        buy_price: 1000
      },
      carfentanil: {
        name: "Carfentanil",
        aliases: ["carfentanyl"],
        icon: "carfentanil",
        buy_price: 10000
      },
      cocaine: {
        name: "Cocaine",
        aliases: ["coke"],
        icon: "cocaine",
        buy_price: 5000
      },
      crack_cocaine: {
        name: "Crack Cocaine",
        icon: "crack_cocaine",
        buy_price: 2500
      },
      fentanyl: {
        name: "Fentanyl",
        aliases: ["fentanil"],
        icon: "fentanyl",
        buy_price: 20000
      },
      hashish: {
        name: "Hashish",
        icon: "hashish",
        buy_price: 4000
      },
      heroin: {
        name: "Heroin",
        icon: "heroin",
        buy_price: 6500
      },
      methamphetamine: {
        name: "Methamphetamine",
        icon: "methamphetamine",
        buy_price: 7500
      },
      opium: {
        name: "Opium",
        icon: "opium",
        buy_price: 5000
      },
      psychedelics: {
        name: "Psychedelics",
        icon: "psychedelics",
        buy_price: 10000
      }
    },
    incense: {
      name: "Incense",
      icon: "incense",
      buy_price: 5000
    },
    ink: {
      name: "Ink",
      icon: "ink",
      buy_price: 3000
    },
    lamps: {
      name: "Lamps",
      type: "category",

      candles: {
        name: "Candles",
        icon: "candles",
        buy_price: 2000
      },
      electric_lamps: {
        name: "Electric Lamps",
        icon: "electric_lamps",
        buy_price: 1000
      },
      lanterns: {
        name: "Lanterns",
        icon: "lanterns",
        buy_price: 1000
      },
      oil_lamps: {
        name: "Oil Lamps",
        icon: "oil_lamps",
        buy_price: 1500
      }
    },
    lasers: {
      name: "Lasers",
      icon: "lasers",
      buy_price: 8000
    },
    lifts: {
      name: "Lifts",
      icon: "lifts",
      buy_price: 8500
    },
    lightbulbs: {
      name: "Lightbulbs",
      aliases: ["light bulbs"],
      icon: "lightbulbs",
      buy_price: 4000
    },
    lumber: {
      name: "Lumber",
      type: "category",

      acacia_lumber: {
        name: "Acacia Lumber",
        icon: "acacia_lumber",
        buy_price: 500
      },
      ash_lumber: {
        name: "Ash Lumber",
        icon: "ash_lumber",
        buy_price: 600
      },
      balsa_lumber: {
        name: "Balsa Lumber",
        icon: "balsa_lumber",
        buy_price: 200
      },
      basswood_lumber: {
        name: "Basswood Lumber",
        icon: "basswood_lumber",
        buy_price: 400
      },
      blackwood_lumber: {
        name: "Blackwood Lumber",
        icon: "blackwood_lumber",
        buy_price: 800
      },
      bloodwood_lumber: {
        name: "Bloodwood Lumber",
        icon: "bloodwood_lumber",
        buy_price: 700
      },
      cedar_lumber: {
        name: "Cedar Lumber",
        icon: "cedar_lumber",
        buy_price: 600
      },
      cherry_lumber: {
        name: "Cherry Lumber",
        icon: "cherry_lumber",
        buy_price: 750
      },
      chestut_lumber: {
        name: "Chestnut Lumber",
        icon: "chestnut_lumber",
        buy_price: 700
      },
      cottonwood_lumber: {
        name: "Cottonwood Lumber",
        icon: "cottonwood_lumber",
        buy_price: 300
      },
      cypress_lumber: {
        name: "Cypress Lumber",
        icon: "cypress_lumber",
        buy_price: 650
      },
      ebony_lumber: {
        name: "Ebony Lumber",
        icon: "ebony_lumber",
        buy_price: 1200
      },
      elm_lumber: {
        name: "Elm Lumber",
        icon: "elm_lumber",
        buy_price: 500
      },
      eucalyptus_lumber: {
        name: "Eucalyptus Lumber",
        icon: "eucalyptus_lumber",
        buy_price: 550
      },
      fir_lumber: {
        name: "Fir Lumber",
        icon: "fir_lumber",
        buy_price: 450
      },
      hickory_lumber: {
        name: "Hickory Lumber",
        icon: "hickory_lumber",
        buy_price: 650
      },
      ironwood_lumber: {
        name: "Ironwood Lumber",
        icon: "ironwood_lumber",
        buy_price: 1000
      },
      lacewood_lumber: {
        name: "Lacewood Lumber",
        icon: "lacewood_lumber",
        buy_price: 900
      },
      mahogany_lumber: {
        name: "Mahogany Lumber",
        icon: "mahogany_lumber",
        buy_price: 800
      },
      maple_lumber: {
        name: "Maple Lumber",
        icon: "maple_lumber",
        buy_price: 600
      },
      oak_lumber: {
        name: "Oak Lumber",
        icon: "oak_lumber",
        buy_price: 700
      },
      pine_lumber: {
        name: "Pine Lumber",
        icon: "pine_lumber",
        buy_price: 400
      },
      redwood_lumber: {
        name: "Redwood Lumber",
        icon: "redwood_lumber",
        buy_price: 550
      },
      rosewood_lumber: {
        name: "Rosewood Lumber",
        icon: "rosewood_lumber",
        buy_price: 1100
      },
      sandalwood_lumber: {
        name: "Sandalwood Lumber",
        icon: "sandalwood_lumber",
        buy_price: 1500
      },
      spruce_lumber: {
        name: "Spruce Lumber",
        icon: "spruce_lumber",
        buy_price: 450
      },
      turpentine_lumber: {
        name: "Turpentine Lumber",
        icon: "turpentine_lumber",
        buy_price: 350
      },
      walnut_lumber: {
        name: "Walnut Lumber",
        icon: "walnut_lumber",
        buy_price: 900
      },
      willow_lumber: {
        name: "Willow Lumber",
        icon: "willow_lumber",
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
          icon: "antipyretics",
          buy_price: 5000
        },
        analgesics: {
          name: "Analgesics",
          icon: "analgesics",
          buy_price: 6000
        },
        antimalarial_drugs: {
          name: "Antimalarial Drugs",
          icon: "antimalarial_drugs",
          buy_price: 15000
        },
        antibiotics: {
          name: "Antibiotics",
          icon: "antibiotics",
          buy_price: 20000
        },
        antiseptics: {
          name: "Antiseptics",
          icon: "antiseptics",
          buy_price: 5000
        },
        contraceptives: {
          name: "Contraceptives",
          icon: "contraceptives",
          buy_price: 10000
        },
        hormone_medications: {
          name: "Hormone Medications",
          icon: "hormone_medications",
          buy_price: 30000
        },
        mood_stabilisers: {
          name: "Mood Stabilisers",
          aliases: ["mood stabilizers"],
          icon: "mood_stabilisers",
          buy_price: 25000
        },
        statins: {
          name: "Statins",
          icon: "statins",
          buy_price: 18000
        },
        stimulants: {
          name: "Stimulants",
          icon: "stimulants",
          buy_price: 22000
        },
        tranquilisers: {
          name: "Tranquilisers",
          aliases: ["tranquilizers"],
          icon: "tranquilisers",
          buy_price: 18000
        },
        vaccines: {
          name: "Vaccines",
          icon: "vaccines",
          buy_price: 20000
        }
      },
      traditional_medicines: {
        name: "Traditional Medicines",
        icon: "traditional_medicines",
        buy_price: 5500
      }
    },
    naval_supplies: {
      name: "Naval Supplies",
      icon: "naval_supplies",
      buy_price: 10000
    },
    olive_oil: {
      name: "Olive Oil",
      icon: "olive_oil",
      buy_price: 1500
    },
    paper: {
      name: "Paper",
      icon: "paper",
      buy_price: 500
    },
    plastics: {
      name: "Plastics",
      icon: "plastics",
      buy_price: 2350
    },
    radios: {
      name: "Radios",
      icon: "radios",
      buy_price: 16000
    },
    recording_devices: {
      name: "Recording Devices",
      icon: "recording_devices",
      buy_price: 12000
    },
    refined_petroil: {
      name: "Refined Petroil",
      icon: "refined_petroil",
      buy_price: 1200
    },
    reinforced_concrete: {
      name: "Reinforced Concrete",
      icon: "reinforced_concrete",
      buy_price: 1800
    },
    rubber: {
      name: "Rubber",
      icon: "rubber",
      buy_price: 1500
    },
    salt: {
      name: "Salt",
      icon: "salt",
      buy_price: 4000
    },
    sewing_machines: {
      name: "Sewing Machines",
      icon: "sewing_machines",
      buy_price: 8000
    },
    shampoo: {
      name: "Shampoo",
      icon: "shampoo",
      buy_price: 4500
    },
    sleeping_bags: {
      name: "Sleeping Bags",
      icon: "sleeping_bags",
      buy_price: 1000
    },
    souvenirs: {
      name: "Souvenirs",
      icon: "souvenirs",
      buy_price: 3500
    },
    small_arms: {
      name: "Small Arms",
      icon: "small_arms",
      buy_price: 4500
    },
    soap: {
      name: "Soap",
      icon: "soap",
      buy_price: 2200
    },
    steel_beams: {
      name: "Steel Beams",
      icon: "steel_beams",
      buy_price: 1600
    },
    sugar: {
      name: "Sugar",
      icon: "sugar",
      buy_price: 500
    },
    tapestries: {
      name: "Tapestries",
      icon: "tapestries",
      buy_price: 750
    },
    tea: {
      name: "Tea",
      type: "category",

      black_tea: {
        name: "Black Tea",
        icon: "black_tea",
        buy_price: 2000
      },
      chai_tea: {
        name: "Chai Tea",
        icon: "chai_tea",
        buy_price: 2500
      },
      green_tea: {
        name: "Green Tea",
        icon: "green_tea",
        buy_price: 3000
      },
      herbal_tea: {
        name: "Herbal Tea",
        icon: "herbal_tea",
        buy_price: 2500
      },
      hibiscus_tea: {
        name: "Hibiscus Tea",
        icon: "hibiscus_tea",
        buy_price: 3500
      },
      oolong_tea: {
        name: "Oolong Tea",
        icon: "oolong_tea",
        buy_price: 4000
      },
      puerh_tea: {
        name: "Pu-erh Tea",
        aliases: ["puerh tea", "pu erh tea"],
        icon: "pu_erh_tea",
        buy_price: 5000
      },
      white_tea: {
        name: "White Tea",
        icon: "white_tea",
        buy_price: 4500
      }
    },
    telephones: {
      name: "Telephones",
      icon: "telephones",
      buy_price: 6000
    },
    televisions: {
      name: "Televisions",
      aliases: ["TVs"],
      icon: "televisions",
      buy_price: 12000
    },
    tools: {
      name: "Tools",
      icon: "tools",
      buy_price: 4000
    },
    torpedoes: {
      name: "Torpedoes",
      icon: "torpedoes",
      buy_price: 10000
    },
    trains: {
      name: "Trains",
      icon: "trains",
      buy_price: 12500
    },
    typewriters: {
      name: "Typewriters",
      icon: "typewriters",
      buy_price: 8000
    },
    tyres: {
      name: "Tyres",
      icon: "tyres",
      buy_price: 2000
    },
    uniforms: {
      name: "Uniforms",
      icon: "uniforms",
      buy_price: 2000
    },
    violins: {
      name: "Violins",
      icon: "violins",
      buy_price: 3500
    },
    wood_veneers: {
      name: "Wood Veneers",
      icon: "wood_veneers",
      buy_price: 400
    }
  }
};
