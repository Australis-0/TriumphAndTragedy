config.buildings.military_buildings = { //[WIP] - Add £ maintenance
  name: "Military Buildings",
  order: 11,

  ack_ack_guns: {
    name: "Ack-Ack Guns",
    singular: "Ack-Ack Gun",
    aliases: ["aa guns", "anti aircraft"],
    icon: "artillery_piece",
    type: "military",

    construction_turns: 1,
    cost: {
      steel_beams: 15,
      machine_parts: 8,
      artillery: 5,
      heavy_weaponry: 3,
      ammunition: 20,
      money: 15000
    },
    maintenance: {
      ammunition: 1
    },
    manpower_cost: {
      soldiers: 2500
    },
    modifiers: {
      air_defence: 10
    }
  },
  air_bases: {
    name: "Air Bases",
    singular: "Air Base",
    icon: "aeroplanes",
    type: "military",

    construction_turns: 2,
    cost: {
      aeroplanes: 8,
      electric_gear: 6,
      coal_tar: 5,
      cement: 3,
      stone: 2,
      money: 60000
    },
    maintenance: {
      coal_tar: 3,
      cement: 1,
      electric_gear: 1,
      engines: 1
    },
    manpower_cost: {
      engineers: 50000,
      labourers: 20000,
      soldiers: 20000
    },
    modifiers: {
      local_air_maintenance: -0.10,
      air_capacity: 50
    },
    produces: {
      aeroplanes_cp: 20
    }
  },
  artillery_encampments: {
    name: "Artillery Encampments",
    singular: "Artillery Encampment",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      lumber: 5,
      explosives: 4,
      lamps: 4,
      artillery: 3,
      dyes: 2,
      uniforms: 2,
      stone: 2,
      money: 25000
    },
    maintenance: {
      brass: 1,
      explosives: 1,
      heavy_weaponry: 1
    },
    manpower_cost: {
      soldiers: 5000
    },
    produces: {
      ground_artillery_cp: 20
    }
  },
  auto_plants: {
    name: "Auto Plants",
    singular: "Auto Plant",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 14,
      regular_steel: 10,
      rubber: 8,
      machine_parts: 8,
      chassis: 4,
      engines: 3,
      money: 15000
    },
    maintenance: {
      regular_steel: 2,
      engines: 1,
      heavy_weaponry: 1,
      rubber: 1
    },
    manpower_cost: {
      soldiers: 5000,
      engineers: 10000,
      labourers: 10000
    },
    produces: {
      ground_vehicles_cp: 20
    }
  },
  barracks: {
    name: "Barracks",
    singular: "Barracks",
    type: "military",

    construction_turns: 3,
    cost: {
      bricks: 12,
      stone: 8,
      lumber: 5,
      tools: 1,
      money: 8000
    },
    maintenance: {
      small_arms: 2,
      ammunition: 1,
      uniforms: 1
    },
    manpower_cost: {
      labourers: 60000,
      soldiers: 15000
    },
    modifiers: {
      local_garrison: 10000
    },
    produces: {
      ground_units_cp: 20
    }
  },
  bastions: {
    name: "Bastions",
    singular: "Bastion",
    type: "military",

    construction_turns: 4,
    cost: {
      stone: 15,
      bricks: 8,
      cement: 5,
      tools: 3,
      artillery: 2,
      lamps: 2,
      money: 12000
    },
    maintenance: {
      stone: 3,
      bricks: 1,
      wood: 1
    },
    manpower_cost: {
      labourers: 20000
    },
    modifiers: {
      local_garrison_maintenance: -0.30
    }
  },
  bunkers: {
    name: "Bunkers",
    singular: "Bunker",
    type: "military",

    construction_turns: 3,
    cost: {
      reinforced_concrete: 15,
      ammunition: 5,
      artillery: 5,
      heavy_weaponry: 3,
      copper_wire: 3,
      money: 18000
    },
    maintenance: {
      reinforced_concrete: 5,
      heavy_weaponry: 1
    },
    manpower_cost: {
      labourers: 35000,
      soldiers: 5000
    },
    modifiers: {
      local_garrison_maintenance: -0.30
    }
  },
  castles: {
    name: "Castles",
    singular: "Castle",
    type: "military",

    construction_turns: 5,
    cost: {
      stone: 15,
      lumber: 10,
      glass: 8,
      bricks: 5,
      wood: 3,
      money: 10000
    },
    maintenance: {
      stone: 3,
      wood: 1
    },
    manpower_cost: {
      labourers: 8000,
      soldiers: 6000
    },
    modifiers: {
      defence_bonus: 0.10,
      local_garrison: 1000
    }
  },
  city_walls: {
    name: "City Walls",
    singular: "City Wall",
    type: "military",

    construction_turns: 4,
    cost: {
      bricks: 12,
      stone: 5,
      money: 1500
    },
    maintenance: {
      stone: 2
    },
    manpower_cost: {
      labourers: 1000
    },
    modifiers: {
      land_defence: 5
    }
  },
  coastal_defences: {
    name: "Coastal Defences",
    singular: "Coastal Defence",
    type: "military",

    construction_turns: 4,
    cost: {
      stone: 8,
      bricks: 5,
      cement: 3,
      artillery: 2,
      explosives: 2,
      money: 3500
    },
    maintenance: {
      heavy_weaponry: 1,
      stone: 1
    },
    manpower_cost: {
      labourers: 3500,
      soldiers: 500
    },
    modifiers: {
      naval_defence: 5
    }
  },
  conscription_centres: {
    name: "Conscription Centres",
    singular: "Conscription Centre",
    aliases: ["conscription center", "selective service", "draft"],
    type: "services",

    construction_turns: 3,
    cost: {
      stone: 12,
      bricks: 8,
      glass: 5,
      paper: 3,
      ink: 3,
      dyes: 2,
      money: 8000
    },
    maintenance: {
      paper: 2,
      ink: 1
    },
    manpower_cost: {
      soldiers: 2000,
      officers: 500
    },
    modifiers: {
      local_manpower: 0.20
    }
  },
  dockyards: {
    name: "Dockyards",
    singular: "Dockyard",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      lumber: 12,
      regular_steel: 8,
      naval_supplies: 5,
      wood: 4,
      copper: 2,
      money: 6500
    },
    maintenance: {
      lumber: 3,
      naval_supplies: 2
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 8000,
        labourers: 8000
      },
      any_pop_artisans_engineers: {
        artisans: 5000,
        engineers: 5000
      }
    },
    modifiers: {
      local_ship_maintenance: -0.10,
      naval_capacity: 10
    }
  },
  fortresses: {
    name: "Fortresses",
    singular: "Fortress",
    type: "military",

    construction_turns: 9,
    cost: {
      stone: 15,
      bricks: 8,
      machine_parts: 5,
      artillery: 4,
      cement: 3,
      common_furniture: 3,
      explosives: 2,
      glass: 2,
      regular_steel: 1,
      money: 15000
    },
    maintenance: {
      bricks: 5,
      stone: 3,
      cement: 2,
      ammunition: 1,
      explsoives: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 8000,
        labourers: 8000
      },
      soldiers: 2500,
      any_pop_artisans_engineers: {
        artisans: 1000,
        engineers: 1000
      }
    },
    modifiers: {
      defence_bonus: 0.30,
      local_garrison: 5000
    }
  },
  forts: {
    name: "Forts",
    singular: "Fort",
    type: "military",

    construction_turns: 7,
    cost: {
      stone: 8,
      bricks: 4,
      artillery: 2,
      cement: 2,
      common_furniture: 2,
      ammunition: 1,
      glass: 1,
      regular_steel: 1,
      money: 10000
    },
    maintenance: {
      stone: 5,
      artillery: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 4000,
        labourers: 4000
      },
      soldiers: 1500,
      any_pop_artisans_engineers: {
        artisans: 700,
        engineers: 700
      }
    },
    modifiers: {
      defence_bonus: 0.15,
      local_garrison: 2500
    }
  },
  impressment_offices: {
    name: "Impressment Offices",
    singular: "Impressment Office",
    type: "military",

    construction_turns: 4,
    cost: {
      stone: 12,
      bricks: 8,
      glass: 5,
      common_furniture: 4,
      ink: 3,
      paper: 3,
      money: 12000
    },
    maintenance: {
      paper: 2,
      ink: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 3500,
        labourers: 3500
      },
      soldiers: 1000,
      officers: 500
    },
    modifiers: {
      local_manpower: 0.05,
      naval_capacity: 5
    }
  },
  military_academies: {
    name: "Military Academies",
    singular: "Military Academy",
    type: "services",

    construction_turns: 6,
    cost: {
      bricks: 15,
      glass: 8,
      lumber: 8,
      common_furniture: 5,
      paper: 3,
      ink: 3,
      clay: 2,
      wood: 2,
      dyes: 1,
      money: 12500
    },
    maintenance: {
      paper: 3,
      ink: 3,
      lumber: 2,
      small_arms: 1,
      ammunition: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 5000,
        labourers: 5000
      },
      soldiers: 3500,
      officers: 2000,
      any_pop_artisans_engineers: {
        artisans: 1000,
        engineers: 1000
      },
      any_pop_scholars_scientists: {
        scholars: 1000,
        scientists: 1000
      }
    },
    modifiers: {
      army_doctrine_spread: 0.10,
      army_corruption: -0.05,
      general_capacity: 2,
      officer_training_capacity: 10000
    }
  },
  military_bases: {
    name: "Military Bases",
    singular: "Military Base",
    type: "military",

    construction_turns: 8,
    cost: {
      lumber: 14,
      bricks: 12,
      glass: 10,
      regular_steel: 8,
      common_furniture: 5,
      electric_gear: 4,
      stainless_steel: 4,
      coal_tar: 3,
      cement: 2,
      lightbulbs: 2,
      lamps: 2,
      heavy_weaponry: 2,
      small_arms: 2,
      ammunition: 2,
      money: 25000
    },
    maintenance: {
      ammunition: 3,
      artillery: 2,
      electric_gear: 2,
      engines: 2,
      machine_parts: 2,
      heavy_weaponry: 2,
      small_arms: 1
    },
    manpower_cost: {
      labourers: 12000,
      soldiers: 5000,
      officers: 500
    },
    modifiers: {
      local_manpower: 0.05,
      local_army_maintenance: -0.05,
      local_air_maintenance: -0.05,
      general_capacity: 1,
      air_capacity: 10,
      local_garrison: 15000
    }
  },
  naval_bases: {
    name: "Naval Bases",
    singular: "Naval Base",
    type: "military",

    construction_turns: 8,
    cost: {
      lumber: 12,
      bricks: 10,
      stone: 8,
      wood: 6,
      naval_supplies: 5,
      electric_gear: 4,
      machine_parts: 3,
      money: 12000
    },
    maintenance: {
      lumber: 3,
      ammunition: 2,
      naval_supplies: 2,
      artillery: 1,
      copper: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 15000,
        labourers: 15000
      },
      soldiers: 3000
    },
    modifiers: {
      admiral_capacity: 1,
      naval_units_cp: 20
    }
  },
  ramparts: {
    name: "Ramparts",
    singular: "Rampart",
    type: "military",

    construction_turns: 2,
    cost: {
      bricks: 6,
      stone: 5,
      cement: 3,
      artillery: 2,
      wood: 2,
      money: 3500
    },
    maintenance: {
      stone: 2,
      wood: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      soldiers: 500
    },
    modifiers: {
      land_defence: 10
    }
  },
  recruitment_offices: {
    name: "Recruitment Offices",
    singular: "Recruitment Office",
    type: "services",

    construction_turns: 5,
    cost: {
      stone: 12,
      bricks: 8,
      glass: 5,
      common_furniture: 4,
      ink: 3,
      paper: 3,
      money: 12000
    },
    maintenance: {
      money: 5000,
      ink: 3,
      paper: 2
    },
    manpower_cost: {
      any_pop: {
        peasants: 3500,
        labourers: 3500
      },
      soldiers: 1000,
      officers: 500
    },
    modifiers: {
      local_manpower: 0.20,
      army_doctrine_spread: 0.01
    }
  },
  sams: {
    name: "SAM's",
    singular: "SAM",
    aliases: ["surface to air missiles", "surface-to-air missiles"],
    type: "military",

    construction_turns: 4,
    cost: {
      steel_beams: 8,
      electric_gear: 6,
      explsoives: 5,
      stainless_steel: 4,
      copper: 3,
      computers: 3,
      copper_wire: 2,
      filaments: 1,
      lightbulbs: 1,
      money: 18000
    },
    maintenance: {
      electric_gear: 1,
      explosives: 1
    },
    manpower_cost: {
      soldiers: 800
    },
    modifiers: {
      air_defence: 50
    }
  },
  star_forts: {
    name: "Star Forts",
    singular: "Star Fort",

    construction_turns: 12,
    cost: {
      stone: 15,
      bricks: 10,
      glass: 8,
      cement: 5,
      lamps: 4,
      artillery: 3,
      copper: 2,
      money: 15000
    },
    maintenance: {
      stone: 3,
      cement: 2,
      artillery: 1,
      heavy_weaponry: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 12500,
        labourers: 12500
      },
      soldiers: 2500
    },
    modifiers: {
      defence_bonus: 0.25,
      local_garrison: 7000
    }
  },
  stockades: {
    name: "Stockades",
    singular: "Stockade",
    type: "military",

    construction_turns: 2,
    cost: {
      wood: 8,
      lumber: 4,
      money: 2500
    },
    manpower_cost: {
      soldiers: 200
    },
    modifiers: {
      defence_bonus: 0.05,
      local_garrison: 5000
    }
  },
  training_fields: {
    name: "Training Fields",
    singular: "Training Field",
    type: "military",

    construction_turns: 3,
    cost: {
      stone: 12,
      bricks: 8,
      glass: 5,
      cement: 4,
      fabric: 3,
      small_arms: 2,
      ammunition: 2,
      brass: 2,
      copper: 2,
      money: 6000
    },
    manpower_cost: {
      soldiers: 1500,
      officers: 800
    },
    modifiers: {
      ground_artillery_cp: 15,
      ground_units_cp: 15
    }
  },
  trenches: {
    name: "Trenches",
    singular: "Trench",
    type: "military",

    construction_turns: 2,
    cost: {
      wood: 8,
      lumber: 4,
      small_arms: 2,
      money: 3500
    },
    manpower_cost: {
      soldiers: 500
    },
    modifiers: {
      local_garrison_maintenance: -0.20,
      land_defence: 15
    }
  }
};
