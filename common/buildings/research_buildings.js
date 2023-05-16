config.buildings.research_buildings = {
  order: 16,

  archivists: {
    name: "Archivists",
    singular: "Archivist",

    construction_turns: 4,
    cost: {
      bricks: 8,
      limestone: 6,
      glass: 5,
      common_furniture: 3,
      paper: 2,
      ink: 2,
      money: 30000
    },
    maintenance: {
      money: 12000,
      lightbulbs: 2,
      paper: 2,
      ink: 2,
      computers: 1,
      dyes: 1,
      tools: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 2000,
        scientists: 2000
      },
      faculty: 1000
    },
    modifiers: {
      cultural_research_efficiency: 0.05,
      administrative_research_efficiency: 0.02
    },
    produces: {
      knowledge: 75
    }
  },
  biolabs: {
    name: "Biolabs",
    singular: "Biolab",

    construction_turns: 8,
    cost: {
      glass: 15,
      reinforced_concrete: 12,
      stainless_steel: 8,
      stone: 8,
      industrial_chemicals: 5,
      pharmaceuticals: 4,
      paper: 4,
      ink: 3,
      dyes: 2,
      money: 60000
    },
    maintenance: {
      money: 20000,
      lightbulbs: 4,
      industrial_chemicals: 3,
      electric_gear: 2,
      machine_parts: 2,
      computers: 1,
      glass: 1,
      pharmaceuticals: 1,
      tools: 1,
      traditional_medicines: 1,
      typewriters: 1
    },
    manpower_cost: {
      scientists: 4000,
      engineers: 2000
    },
    modifiers: {
      medical_research_efficiency: 0.15
    }
  },
  experimental_facilities: {
    name: "Experimental Facilities",
    singular: "Experimental Facility",

    construction_turns: 10,
    cost: {
      bricks: 12,
      limestone: 10,
      cement: 8,
      glass: 6,
      reinforced_concrete: 5,
      stainless_steel: 5,
      luxury_furniture: 4,
      paper: 3,
      ink: 3,
      copper_wire: 3,
      filaments: 2,
      lightbulbs: 2,
      computers: 2,
      money: 45000
    },
    maintenance: {
      money: 12500,
      paper: 2,
      ink: 2,
      industrial_chemicals: 2,
      tools: 2,
      glass: 1,
      computers: 1,
      typewriters: 1
    },
    manpower_cost: {
      scientists: 3500,
      engineers: 2000,
      faculty: 1000
    },
    produces: {
      knowledge: 350
    }
  },
  great_libraries: {
    name: "Great Libraries",
    singular: "Great Library",

    construction_turns: 8,
    cost: {
      lumber: 15,
      stone: 8,
      paper: 5,
      ink: 5,
      wood: 4,
      money: 4000
    },
    maintenance: {
      money: 2000,
      lamps: 3,
      paper: 2,
      ink: 2,
      tools: 2,
      computers: 1,
      dyes: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 2000,
        scientists: 2000
      }
    },
    produces: {
      knowledge: 100
    }
  },
  publishing_houses: {
    name: "Publishing Houses",
    singular: "Publishing House",

    construction_turns: 6,
    cost: {
      lumber: 8,
      bricks: 6,
      glass: 6,
      lead: 5,
      ink: 3,
      paper: 3,
      dyes: 2,
      money: 2000
    },
    maintenance: {
      money: 350,
      ink: 5,
      electric_gear: 2,
      copper: 2,
      limestone: 2,
      lead: 1,
      lumber: 1,
      machine_parts: 1,
      computers: 1,
      tools: 1,
      typewriters: 1
    },
    manpower_cost: {
      any_pop: {
        artisans: 5000,
        engineers: 5000
      }
    },
    produces: {
      any_pop: {
        faculty: 5000,
        scholars: 5000
      }
    }
  },
  research_complexes: {
    name: "Research Complexes",
    singular: "Research Complex",

    construction_turns: 16,
    cost: {
      bricks: 14,
      lumber: 12,
      reinforced_concrete: 10,
      glass: 10,
      machine_parts: 8,
      stainless_steel: 8,
      electric_gear: 6,
      cement: 5,
      copper_wire: 4,
      filaments: 3,
      lightbulbs: 3,
      computers: 2,
      telephones: 2,
      radios: 1,
      batteries: 1,
      engines: 1,
      money: 50000
    },
    maintenance: {
      money: 10000,
      glass: 5,
      computers: 3,
      tools: 3,
      industrial_chemicals: 2,
      machine_parts: 2,
      paper: 2,
      ink: 2,
      aeroplane: 1,
      automobiles: 1,
      lumber: 1
    },
    manpower_cost: {
      scientists: 10000
    },
    produces: {
      research_efficiency: 0.10
    }
  },
  research_institutes: {
    name: "Research Institutes",
    singular: "Research Institute",

    construction_turns: 12,
    cost: {
      bricks: 12,
      stone: 10,
      glass: 8,
      lumber: 8,
      electric_gear: 6,
      machine_parts: 5,
      lightbulbs: 3,
      paper: 2,
      ink: 2,
      luxury_furniture: 2,
      batteries: 1,
      money: 35000
    },
    maintenance: {
      money: 5000,
      paper: 3,
      ink: 3,
      computers: 2,
      glass: 2,
      tools: 2,
      aeroplanes: 1,
      automobiles: 1,
      industrial_chemicals: 1,
      lumber: 1,
      animal_products: 1,
      typewriters: 1,
      radios: 1,
      telephones: 1,
      recording_devices: 1
    },
    manpower_cost: {
      scientists: 8000,
      faculty: 2000
    },
    produces: {
      knowledge: 500
    }
  },
  research_labs: {
    name: "Research labs",
    singular: "Research Lab",

    construction_turns: 8,
    cost: {
      bricks: 8,
      stone: 7,
      glass: 6,
      lunber: 6,
      electric_gear: 4,
      paper: 2,
      ink: 2,
      common_furniture: 2,
      money: 20000
    },
    maintenance: {
      money: 1000,
      glass: 3,
      computers: 2,
      industrial_chemicals: 2,
      tools: 2,
      explosives: 1,
      fertiliser: 1,
      pharmaceuticals: 1,
      recording_devices: 1,
      animal_products: 1
    },
    manpower_cost: {
      scientists: 5000,
      faculty: 1000
    },
    produces: {
      knowledge: 250
    }
  },
  scholarhouses: {
    name: "Scholarhouses",
    singular: "Scholarhouse",

    construction_turns: 4,
    cost: {
      lumber: 8,
      stone: 4,
      common_furniture: 2,
      money: 5000
    },
    maintenance: {
      money: 500,
      paper: 2,
      ink: 2,
      lamps: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 2000,
        faculty: 2000
      }
    },
    produces: {
      knowledge: 50
    }
  }
};
