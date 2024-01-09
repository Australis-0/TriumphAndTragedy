config.buildings.agriculture = {
  name: "Agriculture",
  order: 2,
  taxable: true,

  beekeepers: {
    name: "Beekeepers",
    singular: "Beekeeper",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      lumber: 5,
      wood: 3,
      money: 500
    },
    manpower_cost: {
      any_pop: {
        peasants: 100,
        farmers: 100
      }
    },
    produces: {
      beeswax: 3
    }
  },
  camphor_plantations: {
    name: "Camphor Plantations",
    singular: "Camphor Plantation",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      lumber: 4,
      wood: 2,
      money: 800
    },
    manpower_cost: {
      any_pop: {
        peasants: 250,
        farmers: 250
      }
    },
    produces: {
      camphor: 3
    }
  },
  carmine_harvesters: {
    name: "Carmine Harvesters",
    singular: "Carmine Harvester",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      wood: 3,
      money: 1200
    },
    manpower_cost: {
      any_pop: {
        peasants: 1000,
        farmers: 1000
      }
    },
    produces: {
      carmine_bugs: 2
    }
  },
  cinnamon_plantations: {
    name: "Cinnamon Plantations",
    singular: "Cinnamon Plantation",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      lumber: 6,
      stone: 5,
      lamps: 2,
      wood: 2,
      common_furniture: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 500,
        farmers: 500
      }
    },
    produces: {
      cinnamon: 2
    }
  },
  clove_plantations: {
    name: "Clove Plantations",
    singular: "Clove Plantation",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      stone: 5,
      lumber: 4,
      lamps: 2,
      wood: 2,
      common_furniture: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 500,
        farmers: 500
      }
    },
    produces: {
      cloves: 2
    }
  },
  farms: {
    name: "Farms",
    singular: "Farm",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      wood: 15,
      stone: 5,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        serfs: 10000,
        farmers: 10000
      }
    },
    produces: {
      production_choice_corn: {
        name: "Corn",
        corn: 7
      },
      production_choice_potatoes: {
        name: "Potatoes",
        potatoes: 8
      },
      production_choice_teff: {
        name: "Teff",
        teff: 2
      },
      production_choice_wheat: {
        name: "Wheat",
        wheat: 5
      },
      production_choice_blue_agaves: {
        name: "Blue Agaves",
        blue_agaves: 4
      },
      production_choice_hops: {
        name: "Hops",
        hops: 3
      },
      production_choice_bell_peppers: {
        name: "Bell Peppers",
        bell_peppers: 4
      },
      production_choice_garlic: {
        name: "Garlic",
        garlic: 5
      },
      production_choice_ginger: {
        name: "Ginger",
        ginger: 4
      },
      production_choice_linseed: {
        name: "Linseed",
        linseed: 4
      },
      production_choice_rapeseed: {
        name: "Rapeseed",
        rapeseed: 3
      }
    }
  },
  fruit_farms: {
    name: "Fruit Farms",
    singular: "Fruit Farm",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      wood: 10,
      stone: 5,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        serfs: 10000,
        farmers: 10000
      }
    },
    produces: {
      production_choice_apples: {
        name: "Apples",
        apples: 6
      },
      production_choice_grapes: {
        name: "Grapes",
        grapes: 5
      },
      production_choice_olives: {
        name: "Olives",
        olives: 4
      },
      production_choice_pumpkins: {
        name: "Pumpkins",
        pumpkins: 2
      },
      production_choice_strawberries: {
        name: "Strawberries",
        strawberries: 5
      },
      production_choice_sunflowers: {
        name: "Sunflowers",
        sunflowers: 3
      },
      production_choice_watermelons: {
        name: "Watermelons",
        watermelons: 5
      }
    }
  },
  honeymakers: {
    name: "Honeymakers",
    singular: "Honeymaker",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      wood: 5,
      stone: 3,
      money: 800
    },
    maintenance: {
      beeswax: 3
    },
    manpower_cost: {
      any_pop:{
        peasants: 5000,
        serfs: 5000,
        farmers: 5000
      }
    },
    produces: {
      honey: 2
    }
  },
  illicit_fields: {
    name: "Illicit Fields",
    singular: "Illicit Field",
    type: "agriculture",

    construction_turns: 1,
    cost: {
      wood: 5,
      stone: 5,
      lamps: 3,
      common_furniture: 2,
      tools: 2,
      glass: 1,
      iron: 1,
      money: 500
    },
    manpower_cost: {
      any_pop: {
        peasants: 25000,
        serfs: 25000,
        farmers: 25000
      }
    },
    produces: {
      production_choice_hemp: {
        name: "Hemp",
        hemp: 2
      },
      production_choice_poppies: {
        name: "Poppies",
        poppies: 3
      }
    }
  },
  indigo_fields: {
    name: "Indigo Fields",
    singular: "Indigo Field",
    type: "agriculture",

    construction_turns: 4,
    cost: {
      stone: 5,
      lumber: 4,
      lamps: 2,
      wood: 2,
      common_furniture: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        farmers: 2000
      }
    },
    produces: {
      indigo: 3
    }
  },
  livestock_farms: {
    name: "Livestock Farms",
    singular: "Livestock Farm",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      lumber: 10,
      iron: 5,
      tools: 3,
      wood: 2,
      lamps: 1,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        serfs: 10000,
        farmers: 10000
      }
    },
    produces: {
      production_choice_eggs: {
        name: "Eggs",
        eggs: 5
      },
      production_choice_leather: {
        name: "Leather",
        leather: 1
      },
      production_choice_milk: {
        name: "Milk",
        milk: 5
      },
      production_choice_feathers: {
        name: "Feathers",
        feathers: 1
      },
      production_choice_beef: {
        name: "Beef",
        beef: 4
      },
      production_choice_chicken: {
        name: "Chicken",
        chicken: 4
      },
      production_choice_cuy: {
        name: "Cuy",
        cuy: 1
      },
      production_choice_duck: {
        name: "Duck",
        duck: 3
      },
      production_choice_goat_meat: {
        name: "Goat Meat",
        goat_meat: 2
      },
      production_choice_mutton: {
        name: "Mutton",
        mutton: 3
      },
      production_choice_pork: {
        name: "Pork",
        pork: 5
      },
      production_choice_rabbit_meat: {
        name: "Rabbit Meat",
        rabbit_meat: 2
      }
    }
  },
  mustard_plantations: {
    name: "Mustard Plantations",
    singular: "Mustard Plantation",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      wood: 5,
      lumber: 3,
      stone: 2,
      common_furniture: 2,
      glass: 1,
      lamps: 1,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 3000,
        serfs: 3000,
        farmers: 3000
      }
    },
    produces: {
      mustard: 3
    }
  },
  nut_farms: {
    name: "Nut Farms",
    singular: "Nut Farm",

    construction_turns: 2,
    cost: {
      lumber: 8,
      wood: 5,
      stone: 3,
      common_furniture: 2,
      lamps: 2,
      tools: 1,
      money: 800
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        serfs: 5000,
        farmers: 5000
      }
    },
    produces: {
      production_choice_peanuts: {
        name: "Peanuts",
        peanuts: 4
      },
      production_choice_walnuts: {
        name: "Walnuts",
        walnuts: 2
      }
    }
  },
  palm_oil_plantations: {
    name: "Palm Oil Plantations",
    singular: "Palm Oil Plantation",
    type: "agriculture",

    construction_turns: 4,
    cost: {
      wood: 20,
      lumber: 15,
      tools: 10,
      lamps: 5,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        serfs: 5000,
        farmers: 5000
      }
    },
    produces: {
      oil_palm_fruit: 3
    }
  },
  pastures: {
    name: "Pastures",
    singular: "Pasture",

    construction_turns: 2,
    cost: {
      wood: 10,
      money: 1200
    },
    manpower_cost: {
      any_pop: {
        peasants: 15000,
        serfs: 15000,
        farmers: 15000
      }
    },
    produces: {
      production_choice_goat_milk: {
        name: "Goat Milk",
        goat_milk: 3
      },
      production_choice_milk: {
        name: "Milk",
        milk: 5
      },
      production_choice_camel_meat: {
        name: "Camel Meat",
        camel_meat: 1
      },
      production_choice_reindeer: {
        name: "Reindeer",
        reindeer: 1
      },
      production_choice_venison: {
        name: "Venison",
        venison: 2
      },
      production_choice_yak: {
        name: "Yak",
        yak: 3
      },
      production_choice_alpaca_wool: {
        name: "Alpaca Wool",
        alpaca_wool: 3
      },
      production_choice_goat_wool: {
        name: "Goat Wool",
        goat_wool: 2
      },
      production_choice_sheep_wool: {
        name: "Sheep Wool",
        sheep_wool: 5
      }
    }
  },
  spice_plantations: {
    name: "Spice Plantations",
    singular: "Spice Plantation",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      stone: 5,
      lumber: 4,
      lamps: 2,
      wood: 2,
      common_furniture: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        farmers: 1500
      }
    },
    produces: {
      production_choice_cardamom: {
        name: "Cardamom",
        cardamom: 2
      },
      production_choice_cayenne: {
        name: "Cayenne",
        cayenne: 2
      },
      production_choice_chilli: {
        name: "Chilli",
        chilli: 2
      },
      production_choice_fennel: {
        name: "Fennel",
        fennel: 2
      },
      production_choice_fenugreek: {
        name: "Fenugreek",
        fenugreek: 3
      },
      production_choice_nutmeg: {
        name: "Nutmeg",
        nutmeg: 2
      },
      production_choice_paprika: {
        name: "Paprika",
        paprika: 4
      },
      production_choice_pepper: {
        name: "Pepper",
        pepper: 5
      }
    }
  },
  tropical_plantations: {
    name: "Tropical Plantations",
    singular: "Tropical Plantation",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      stone: 5,
      lumber: 4,
      iron: 3,
      tools: 3,
      lamps: 2,
      wood: 2,
      common_furniture: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        farmers: 1500
      }
    },
    produces: {
      production_choice_cacao: {
        name: "Cacao",
        cacao: 4
      },
      production_choice_coffee: {
        name: "Coffee",
        coffee_beans: 3
      },
      production_choice_cotton: {
        name: "Cotton",
        cotton: 4
      },
      production_choice_quina: {
        name: "Quina",
        quina: 3
      },
      production_choice_tobacco: {
        name: "Tobacco",
        tobacco: 5
      },
      production_choice_bananas: {
        name: "Bananas",
        bananas: 4
      },
      production_choice_citrus: {
        name: "Citrus",
        citrus: 3
      },
      production_choice_dates: {
        name: "Dates",
        dates: 2
      },
      production_choice_guavas: {
        name: "Guavas",
        guavas: 2
      },
      production_choice_mangoes: {
        name: "Mangoes",
        mangoes: 3
      },
      production_choice_mangosteens: {
        name: "Mangosteens",
        mangosteens: 2
      },
      production_choice_sweet_potatoes: {
        name: "Sweet Potatoes",
        sweet_potatoes: 4
      },
      production_choice_tea_leaves: {
        name: "Tea Leaves",
        tea: 4
      },
      production_choice_yam: {
        name: "Yam",
        yam: 5
      }
    }
  },
  rice_paddies: {
    name: "Rice Paddies",
    singular: "Rice Paddy",
    type: "agriculture",

    construction_turns: 3,
    cost: {
      wood: 5,
      money: 800
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        farmers: 10000,
        serfs: 10000
      }
    },
    produces: {
      rice: 10
    }
  },
  rubber_plantations: {
    name: "Rubber Plantations",
    singular: "Rubber Plantation",
    type: "agriculture",

    construction_turns: 4,
    cost: {
      wood: 10,
      tools: 2,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        farmers: 10000,
        serfs: 10000
      }
    },
    produces: {
      caoutchouc: 3
    }
  },
  sugar_plantations: {
    name: "Sugar Plantations",
    singular: "Sugar Plantation",
    type: "agriculture",

    construction_turns: 4,
    cost: {
      stone: 5,
      lumber: 4,
      wood: 3,
      tools: 2,
      common_furniture: 2,
      lamps: 1,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        farmers: 1500
      }
    },
    produces: {
      sugarcane: 5
    }
  },
  vegetable_fields: {
    name: "Vegetable Fields",
    singular: "Vegetable Field",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      wood: 10,
      stone: 5,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        farmers: 10000,
        serfs: 10000
      }
    },
    produces: {
      production_choice_cabbage: {
        name: "Cabbage",
        cabbage: 5
      },
      production_choice_carrot: {
        name: "Carrot",
        carrot: 4
      },
      production_choice_chicory: {
        name: "Chicory",
        chicory: 2
      },
      production_choice_cucumbers: {
        name: "Cucumbers",
        cucumbers: 3
      },
      production_choice_eggplants: {
        name: "Eggplants",
        eggplants: 3
      },
      production_choice_lettuce: {
        name: "Lettuce",
        lettuce: 5
      },
      production_choice_onions: {
        name: "Onions",
        onions: 5
      },
      production_choice_peas: {
        name: "Peas",
        peas: 4
      },
      production_choice_soybeans: {
        name: "Soybeans",
        soybeans: 3
      },
      production_choice_spinach: {
        name: "Spinach",
        spinach: 4
      },
      production_choice_tomatoes: {
        name: "Tomatoes",
        tomatoes: 6
      },
      production_choice_turnips: {
        name: "Turnips",
        turnips: 7
      }
    }
  },
  woad_harvesters: {
    name: "Woad Harvesters",
    singular: "Woad Harvester",
    type: "agriculture",

    construction_turns: 2,
    cost: {
      wood: 3,
      money: 1200
    },
    manpower_cost: {
      any_pop: {
        peasants: 1000,
        farmers: 1000
      }
    },
    produces: {
      woad: 2
    }
  }
};
