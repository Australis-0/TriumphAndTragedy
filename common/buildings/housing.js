config.buildings.housing = {
  name: "Housing",
  
  always_display: true,
  disable_slots: true,
  is_housing: true,
  order: 7,

  bungalows: {
    name: "Bungalows",
    singular: "Bungalow",

    construction_turns: 2,
    cost: {
      lumber: 8,
      wood: 5,
      glass: 5,
      common_furniture: 4,
      lamps: 4,
      money: 6500
    },
    houses: 20000,
    ideal_climate: {
      good_for: "tropics"
    },
    maintenance: {
      lumber: 3,
      ceramics: 2,
      glass: 2
    },
    resident_modifiers: {
      standard_of_living: 0.05
    },
    unlimited_slots: true
  },
  commie_blocks: {
    name: "Commie Blocks",
    singular: "Commie Block",

    construction_turns: 4,
    cost: {
      concrete: 25,
      steel_beams: 20,
      lead: 8,
      glass: 5,
      copper: 3,
      money: 8000
    },
    houses: 250000,
    ideal_climate: {
      good_for: "tropics"
    },
    maintenance: {
      reinforced_concrete: 8,
      lightbulbs: 3,
      machine_parts: 2
    },
    resident_modifiers: {
      standard_of_living: -0.20
    },
    unlimited_slots: true
  },
  condominiums: {
    name: "Condominiums",
    singular: "Condominium",

    construction_turns: 5,
    cost: {
      reinforced_concrete: 20,
      glass: 15,
      ceramics: 10,
      electric_gear: 8,
      machine_parts: 6,
      lightbulbs: 6,
      luxury_furniture: 5,
      lifts: 4,
      telephones: 1,
      radios: 1,
      money: 20000
    },
    houses: 80000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      lightbulbs: 2,
      luxury_furniture: 2,
      glass: 2,
      gas: 1
    },
    resident_modifiers: {
      standard_of_living: 0.15
    },
    unlimited_slots: true
  },
  cottages: {
    name: "Cottages",
    singular: "Cottage",

    construction_turns: 3,
    cost: {
      stone: 15,
      lumber: 8,
      glass: 5,
      common_furniture: 3,
      money: 2000
    },
    houses: 30000,
    ideal_climate: {
      good_for: "temperate"
    },
    maintenance: {
      lumber: 3,
      coals: 2
    },
    resident_modifiers: {
      standard_of_living: 0.10
    },
    unlimited_slots: true
  },
  fachwerkhauser: {
    name: "Fachwerkhäuser",
    singular: "Fachwerkhaus",
    aliases: ["fachwerkhauser", "fachwerkhaeuser", "timbered-frame houses", "timber-frame houses", "timbered frame houses", "timber frame houses"],

    construction_turns: 3,
    cost: {
      stone: 10,
      lumber: 8,
      glass: 5,
      ceramics: 5,
      common_furniture: 3,
      money: 2500
    },
    houses: 50000,
    ideal_climate: {
      good_for: "temperate"
    },
    maintenance: {
      lumber: 2,
      coals: 2,
      bricks: 1
    },
    resident_modifiers: {
      standard_of_living: 0.20
    },
    unlimited_slots: true
  },
  flats: {
    name: "Flats",
    singular: "Flat",
    aliases: ["apartments"],

    construction_turns: 4,
    cost: {
      bricks: 15,
      iron: 10,
      ceramics: 8,
      glass: 8,
      cement: 5,
      lead: 5,
      lamps: 4,
      common_furniture: 3,
      money: 6500
    },
    houses: 120000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      bricks: 3,
      concrete: 2,
      stone: 2,
      glass: 1
    },
    resident_modifiers: {
      standard_of_living: -0.10
    },
    unlimited_slots: true
  },
  georgian_blocks: {
    name: "Georgian Blocks",
    singular: "Georgian Block",

    construction_turns: 5,
    cost: {
      bricks: 12,
      limestone: 10,
      glass: 8,
      cement: 5,
      luxury_furniture: 4,
      dyes: 2,
      money: 10000
    },
    houses: 100000,
    ideal_climate: {
      good_for: "temperate"
    },
    maintenance: {
      coals: 2
    },
    resident_modifiers: {
      standard_of_living: 0.10
    },
    unlimited_slots: true
  },
  haussmann_blocks: {
    name: "Haussmann Blocks",
    singular: "Haussmann Block",

    construction_turns: 6,
    cost: {
      limestone: 15,
      ceramics: 12,
      bricks: 10,
      glass: 10,
      iron: 8,
      cement: 5,
      luxury_furniture: 5,
      money: 12500
    },
    houses: 90000,
    ideal_climate: {
      good_for: "temperate"
    },
    maintenance: {
      gas: 1
    },
    resident_modifiers: {
      standard_of_living: 0.35
    },
    unlimited_slots: true
  },
  longhouses: {
    name: "Longhouses",
    singular: "Longhouse",

    construction_turns: 2,
    cost: {
      lumber: 12,
      wood: 10,
      stone: 5,
      money: 2000
    },
    houses: 40000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      coals: 1
    },
    resident_modifiers: {
      standard_of_living: -0.05
    },
    unlimited_slots: true
  },
  neighbourhoods: {
    name: "Neighbourhoods",
    singular: "Neighbourhood",
    aliases: ["neighborhood", "neighborhoods"],
    icon: "neighbourhoods",

    construction_turns: 4,
    cost: {
      lumber: 20,
      ceramics: 15,
      glass: 12,
      concrete: 10,
      machine_parts: 8,
      electric_gear: 6,
      bricks: 5,
      common_furniture: 5,
      copper: 5,
      lightbulbs: 4,
      cement: 3,
      stainless_steel: 2,
      money: 20000
    },
    houses: 100000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      gas: 1
    },
    resident_modifiers: {
      standard_of_living: 0.20
    },
    unlimited_slots: true
  },
  residences: {
    name: "Residences",
    singular: "Residence",

    construction_turns: 3,
    cost: {
      lumber: 10,
      ceramics: 8,
      wood: 6,
      common_furniture: 5,
      glass: 5,
      lamps: 3
    },
    houses: 50000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      gas: 1
    },
    resident_modifiers: {
      standard_of_living: 0.20
    },
    unlimited_slots: true
  },
  rowhouses: {
    name: "Rowhouses",
    singular: "Rowhouse",

    construction_turns: 3,
    cost: {
      bricks: 12,
      glass: 8,
      lumber: 6,
      ceramics: 5,
      lamps: 4,
      common_furniture: 3,
      lead: 2,
      money: 10000
    },
    maintenance: {
      gas: 1
    },
    houses: 60000,
    resident_modifiers: {
      standard_of_living: -0.05
    },
    unlimited_slots: true
  },
  slums: {
    name: "Slums",
    singular: "Slum",

    construction_turns: 1,
    cost: {
      lumber: 8,
      wood: 5,
      money: 500
    },
    houses: 500000,
    ideal_climate: {
      good_for: "tropics"
    },
    maintenance: {
      wood: 1
    },
    resident_modifiers: {
      standard_of_living: -0.50
    },
    unlimited_slots: true
  },
  tenements: {
    name: "Tenements",
    singular: "Tenement",

    construction_turns: 2,
    cost: {
      bricks: 15,
      cement: 5,
      money: 5000
    },
    houses: 200000,
    ideal_climate: {
      good_for: "temperate"
    },
    maintenance: {
      bricks: 2,
      coals: 1
    },
    resident_modifiers: {
      standard_of_living: -0.30
    },
    unlimited_slots: true
  },
  townhomes: {
    name: "Townhomes",
    singular: "Townhome",

    construction_turns: 3,
    cost: {
      bricks: 12,
      lumber: 10,
      cement: 8,
      glass: 8,
      common_furniture: 5,
      money: 12000
    },
    houses: 60000,
    ideal_climate: {
      good_for: ["temperate", "tropics"]
    },
    maintenance: {
      bricks: 3,
      coals: 2
    },
    resident_modifiers: {
      standard_of_living: 0.20
    },
    unlimited_slots: true
  }
};
