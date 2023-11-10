config.buildings.industry = {
  name: "Industry",
  order: 9,
  taxable: true,

  ai_hubs: {
    name: "AI Hubs",
    singular: "AI Hub",

    construction_turns: 10,
    cost: {
      steel_beams: 25,
      bricks: 20,
      computers: 20,
      reinforced_concrete: 15,
      electric_gear: 12,
      refined_petroil: 10,
      machine_parts: 10,
      regular_steel: 10,
      cement: 8,
      stainless_steel: 8,
      lifts: 6,
      gold: 3,
      money: 200000
    },
    maintenance: {
      computers: 3,
      electric_gear: 2,
      machine_parts: 2
    },
    manpower_cost: {
      labourers: 25000,
      engineers: 25000,
      scientists: 1000
    },
    produces: {
      actions: [25, 40]
    }
  },
  arsenals: {
    name: "Arsenals",
    singular: "Arsenal",

    construction_turns: 8,
    cost: {
      bricks: 15,
      cement: 8,
      lumber: 7,
      coals: 5,
      glass: 5,
      pig_iron: 5,
      steel_beams: 3,
      money: 10000
    },
    maintenance: {
      stone: 3,
      lumber: 2,
      tools: 1
    },
    manpower_cost: {
      labourers: 35000,
      engineers: 10000
    },
    produces: {
      actions: [10, 12]
    }
  },
  assembly_plants: {
    name: "Assembly Plants",
    singular: "Assembly Plant",

    construction_turns: 8,
    cost: {
      bricks: 10,
      steel_beams: 8,
      machine_parts: 6,
      cement: 5,
      stone: 5,
      refined_petroil: 5,
      lightbulbs: 4,
      lifts: 2,
      money: 20000
    },
    maintenance: {
      machine_parts: 2,
      refined_petroil: 2,
      tools: 2
    },
    manpower_cost: {
      labourers: 45000,
      engineers: 5000
    },
    produces: {
      actions: [12, 15]
    }
  },
  civilian_industries: {
    name: "Civilian Industries",
    singular: "Civilian Industry",

    construction_turns: 6,
    cost: {
      steel_beams: 25,
      bricks: 15,
      stone: 10,
      glass: 10,
      refined_petroil: 10,
      machine_parts: 8,
      lightbulbs: 4,
      lifts: 4,
      money: 65000
    },
    maintenance: {
      regular_steel: 2,
      coals: 1
    },
    manpower_cost: {
      labourers: 40000,
      engineers: 10000
    },
    produces: {
      actions: [20, 25]
    }
  },
  factories: {
    name: "Factories",
    singular: "Factory",

    construction_turns: 6,
    cost: {
      stone: 10,
      bricks: 8,
      coals: 5,
      iron: 5,
      glass: 3,
      cement: 3,
      lamps: 2,
      money: 10000
    },
    maintenance: {
      regular_steel: 2,
      coals: 1
    },
    manpower_cost: {
      labourers: 35000
    },
    produces: {
      actions: [7, 10]
    }
  },
  guilds: {
    name: "Guilds",
    singular: "Guild",

    construction_turns: 3,
    cost: {
      stone: 3,
      wood: 2,
      iron: 2,
      money: 2500
    },
    maintenance: {
      wood: 1
    },
    manpower_cost: {
      artisans: 5000
    },
    produces: {
      actions: 1
    }
  },
  industrial_complexes: {
    name: "Industrial Complexes",
    singular: "Industrial Complex",

    construction_turns: 8,
    cost: {
      bricks: 20,
      refined_petroil: 15,
      steel_beams: 10,
      reinforced_concrete: 10,
      cement: 8,
      regular_steel: 8,
      machine_parts: 5,
      glass: 5,
      common_furniture: 3,
      lifts: 2,
      money: 50000
    },
    maintenance: {
      machine_parts: 3,
      tools: 2
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 5000
    },
    produces: {
      actions: [12, 18]
    }
  },
  manufactories: {
    name: "Manufactories",
    singular: "Manufactory",

    construction_turns: 6,
    cost: {
      bricks: 8,
      stone: 7,
      iron: 5,
      glass: 4,
      lumber: 3,
      tools: 3,
      money: 7500
    },
    maintenance: {
      wood: 3,
      stone: 2
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      artisans: 5000
    },
    produces: {
      actions: [4, 6]
    }
  },
  mills: {
    name: "Mills",
    singular: "Mill",

    construction_turns: 4,
    cost: {
      bricks: 12,
      cement: 8,
      glass: 5,
      common_furniture: 3,
      pig_iron: 3,
      lead: 2,
      money: 8000
    },
    maintenance: {
      stone: 2,
      tools: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 3000,
        labourers: 3000
      }
    },
    produces: {
      actions: [5, 7]
    }
  },
  production_facilities: {
    name: "Production Facilities",
    singular: "Production Facility",

    construction_turns: 6,
    cost: {
      stone: 15,
      refined_petroil: 15,
      steel_beams: 10,
      reinforced_concrete: 8,
      lightbulbs: 6,
      machine_parts: 5,
      regular_steel: 5,
      stainless_steel: 5,
      telephones: 3,
      computers: 2,
      money: 85000
    },
    maintenance: {
      gas: 3,
      refined_petroil: 2,
      machine_parts: 2
    },
    manpower_cost: {
      labourers: 35000,
      engineers: 10000
    },
    produces: {
      actions: [20, 25]
    }
  },
  watermills: {
    name: "Watermills",
    singular: "Watermill",

    construction_turns: 4,
    cost: {
      stone: 5,
      wood: 3,
      lead: 1,
      money: 6500
    },
    maintenance: {
      wood: 2
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      artisans: 1000
    },
    produces: {
      actions: [3, 5]
    }
  },
  wartime_industries: {
    name: "Wartime Industries",
    singular: "Wartime Industry",

    construction_turns: 7,
    cost: {
      reinforced_concrete: 15,
      steel_beams: 15,
      regular_steel: 10,
      refined_petroil: 10,
      machine_parts: 8,
      common_furniture: 4,
      lifts: 4,
      lightbulbs: 4,
      money: 70000
    },
    maintenance: {
      small_arms: 5,
      machine_parts: 3,
      heavy_weaponry: 2,
      refined_petroil: 2,
      explosives: 1
    },
    manpower_cost: {
      labourers: 25000,
      engineers: 10000,
      scientists: 5000,
      officers: 50
    },
    produces: {
      aeroplanes_cp: 20,
      ground_vehicles_cp: 20,
      ground_artillery_cp: 20,
      ground_units_cp: 20,
      naval_units_cp: 20
    }
  },
  workshops: {
    name: "Workshops",
    singular: "Workshop",

    construction_turns: 3,
    cost: {
      stone: 5,
      iron: 3,
      wood: 2,
      lead: 1,
      money: 5000
    },
    maintenance: {
      wood: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      artisans: 1000
    },
    produces: {
      actions: [2, 3]
    }
  }
};
