config.buildings.agriculture = {
  order: 2,

  beekeepers: {
    name: "Beekeepers",
    singular: "Beekeeper",

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
        corn: 7
      },
      production_choice_potatoes: {
        potatoes: 8
      },
      production_choice_teff: {
        teff: 2
      },
      production_choice_wheat: {
        wheat: 5
      },
      production_choice_blue_agaves: {
        blue_agaves: 4
      },
      production_choice_hops: {
        hops: 3
      },
      production_bell_peppers: {
        bell_peppers: 4
      },
      production_choice_garlic: {
        garlic: 5
      },
      production_choice_ginger: {
        ginger: 4
      },
      production_choice_linseed: {
        linseed: 4
      },
      production_choice_rapeseed: {
        rapeseed: 3
      }
    }
  },
  fruit_farms: {
    name: "Fruit Farms",
    singular: "Fruit Farm",

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
        apples: 6
      },
      production_choice_grapes: {
        grapes: 5
      },
      production_choice_olives: {
        olives: 4
      },
      production_choice_pumpkins: {
        pumpkins: 2
      },
      production_choice_strawberries: {
        strawberries: 5
      },
      production_choice_sunflowers: {
        sunflowers: 3
      },
      production_choice_watermelons: {
        watermelons: 5
      }
    }
  },
  illicit_fields: {
    name: "Illicit Fields",
    singular: "Illicit Field",

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
        hemp: 2
      },
      production_choice_poppies: {
        poppies: 3
      }
    }
  },
  indigo_fields: {
    name: "Indigo Fields",
    singular: "Indigo Field",

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
        eggs: 5
      },
      production_choice_leather: {
        leather: 1
      },
      production_choice_milk: {
        milk: 5
      },
      production_choice_feathers: {
        feathers: 1
      },
      production_choice_beef: {
        beef: 4
      },
      production_choice_chicken: {
        chicken: 4
      },
      production_choice_cuy: {
        cuy: 1
      },
      production_choice_duck: {
        duck: 3
      },
      production_choice_goat_meat: {
        goat_meat: 2
      },
      production_choice_mutton: {
        mutton: 3
      },
      production_choice_pork: {
        pork: 5
      },
      production_choice_rabbit_meat: {
        rabbit_meat: 2
      }
    }
  },
  mustard_plantations: {
    name: "Mustard Plantations",
    singular: "Mustard Plantation",

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
        peanuts: 4
      },
      production_choice_walnuts: {
        walnuts: 2
      }
    }
  },
  palm_oil_plantations: {
    name: "Palm Oil Plantations",
    singular: "Palm Oil Plantation",

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
        goat_milk: 3
      },
      production_choice_milk: {
        milk: 5
      },
      production_choice_camel_meat: {
        camel_meat: 1
      },
      production_choice_reindeer: {
        reindeer: 1
      },
      production_choice_venison: {
        venison: 2
      },
      production_choice_yak: {
        yak: 3
      },
      production_choice_alpaca_wool: {
        alpaca_wool: 3
      },
      production_choice_goat_wool: {
        goat_wool: 2
      },
      production_choice_sheep_wool: {
        sheep_wool: 5
      }
    }
  },
  spice_plantations: {
    name: "Spice Plantations",
    singular: "Spice Plantation",

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
        cardamom: 2
      },
      production_choice_cayenne: {
        cayenne: 2
      },
      production_choice_chilli: {
        chilli: 2
      },
      production_choice_fennel: {
        fennel: 2
      },
      production_choice_fenugreek: {
        fenugreek: 3
      },
      production_choice_nutmeg: {
        nutmeg: 2
      },
      production_choice_paprika: {
        paprika: 4
      },
      production_choice_pepper: {
        pepper: 5
      }
    }
  },
  tropical_plantations: {
    name: "Tropical Plantations",
    singular: "Tropical Plantation",

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
        cacao: 4
      },
      production_choice_coffee: {
        coffee_beans: 3
      },
      production_choice_quina: {
        quina: 3
      },
      production_choice_tobacco: {
        tobacco: 5
      },
      production_choice_bananas: {
        bananas: 4
      },
      production_choice_citrus: {
        citrus: 3
      },
      production_choice_dates: {
        dates: 2
      },
      production_choice_guavas: {
        guavas: 2
      },
      production_choice_mangoes: {
        mangoes: 3
      },
      production_choice_mangosteens: {
        mangosteens: 2
      },
      production_choice_sweet_potatoes: {
        sweet_potatoes: 4
      },
      production_choice_yam: {
        yam: 5
      }
    }
  },
  vegetable_fields: {
    name: "Vegetable Fields",
    singular: "Vegetable Field",

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
        cabbage: 5
      },
      production_choice_carrot: {
        carrot: 4
      },
      production_choice_chicory: {
        chicory: 2
      },
      production_choice_cucumbers: {
        cucumbers: 3
      },
      production_choice_eggplants: {
        eggplants: 3
      },
      production_choice_lettuce: {
        lettuce: 5
      },
      production_choice_onions: {
        onions: 5
      },
      production_choice_peas: {
        peas: 4
      },
      production_choice_soybeans: {
        soybeans: 3
      },
      production_choice_spinach: {
        spinach: 4
      },
      production_choice_tomatoes: {
        tomatoes: 6
      },
      production_choice_turnips: {
        turnips: 7
      }
    }
  },
  woad_harvesters: {
    name: "Woad Harvesters",
    singular: "Woad Harvester",

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
