config.buildings.infrastructure = {
  disable_slots: true,
  order: 10,

  aerodromes: {
    name: "Aerodromes",
    singular: "Aerodrome",

    construction_turns: 4,
    cost: {
      stone: 12,
      cement: 8,
      reinforced_concrete: 5,
      glass: 4,
      common_furniture: 3,
      electric_gear: 2,
      machine_parts: 2,
      aeroplanes: 1,
      money: 8000
    },
    maintenance: {
      money: 4500,
      stone: 1,
      cement: 1,
      coal_tar: 1,
      aeroplanes: 1
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 10000
    },
    maximum: 5,
    modifiers: {
      domestic_infrastructure: 0.10,
      international_infrastructure: 0.10,
      aeroplane_capacity: 15,
      tourism_value: 20,
      air_travel_capacity: 25000
    },
    separate_building_slots: true,
    supply_limit: 5
  },
  airstrips: {
    name: "Airstrips",
    singular: "Airstrip",

    construction_turns: 4,
    cost: {
      bricks: 10,
      cement: 8,
      asphalt: 8,
      concrete: 5,
      coal_tar: 5,
      common_furniture: 4,
      lightbulbs: 4,
      lamps: 3,
      aeroplanes: 2,
      glass: 2,
      electric_gear: 2,
      machine_parts: 2,
      money: 10500
    },
    maintenance: {
      money: 5000,
      stone: 2,
      cement: 1,
      coal_tar: 1,
      aeroplanes: 1
    },
    manpower_cost: {
      labourers: 15000,
      engineers: 5000
    },
    maximum: 5,
    modifiers: {
      domestic_infrastructure: 0.35,
      aeroplane_capacity: 20,
      tourism_value: 25,
      air_travel_capacity: 100000
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  bus_depots: {
    name: "Bus Depots",
    singular: "Bus Depot",

    construction_turns: 3,
    cost: {
      bricks: 12,
      asphalt: 10,
      glass: 8,
      machine_parts: 8,
      electric_gear: 5,
      batteries: 3,
      concrete: 3,
      cement: 2,
      money: 8000
    },
    maintenance: {
      money: 10000,
      bricks: 2,
      electric_gear: 1,
      vans: 1
    },
    manpower_cost: {
      labourers: 30000,
      engineers: 2500
    },
    maximum: 4,
    modifiers: {
      public_transit: 0.50,
      regional_infrastructure: 0.10
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  bus_stops: {
    name: "Bus Stops",
    singular: "Bus Stop",

    construction_turns: 1,
    cost: {
      glass: 8,
      regular_steel: 2,
      money: 1500
    },
    maintenance: {
      money: 200,
      glass: 1,
      refined_petroil: 1
    },
    manpower_cost: {
      labourers: 10
    },
    maximum: 20,
    modifiers: {
      public_transit_capacity: 20000,
      regional_transit_capacity: 30000
    },
    separate_building_slots: true,
    supply_limit: 5
  },
  cargo_ports: {
    name: "Cargo Ports",
    singular: "Cargo Port",

    construction_turns: 8,
    cost: {
      bricks: 20,
      reinforced_concrete: 15,
      stone: 10,
      lumber: 10,
      naval_supplies: 5,
      regular_steel: 4,
      electric_gear: 3,
      copper: 2,
      cement: 2,
      money: 5000
    },
    maintenance: {
      money: 15000,
      stone: 5,
      cement: 4,
      steel_beams: 3,
      naval_supplies: 3
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 2000
    },
    maximum: 5,
    modifiers: {
      international_infrastructure: 0.50
    },
    separate_building_slots: true,
    supply_limit: 15
  },
  clipper_shipyards: {
    name: "Clipper Shipyards",
    singular: "Clipper Shipyard",

    construction_turns: 5,
    cost: {
      lumber: 10,
      stone: 8,
      bricks: 6,
      iron: 5,
      naval_supplies: 3,
      money: 8000
    },
    maintenance: {
      money: 2000,
      lumber: 8,
      naval_supplies: 4
    },
    manpower_cost: {
      any_pop_labourers_peasants: {
        labourers: 25000,
        peasants: 25000
      },
      any_pop_artisans_engineers: {
        artisans: 5000,
        engineers: 5000
      }
    },
    maximum: 4,
    modifiers: {
      naval_capacity: 5,
    },
    produces: {
      naval_units_cp: 10,
      merchant_cp: 20
    },
    separate_building_slots: true
  },
  commuter_piers: {
    name: "Commuter Piers",
    singular: "Commuter Pier",

    construction_turns: 4,
    cost: {
      wood: 10,
      lumber: 8,
      stone: 5,
      money: 4000
    },
    maintenance: {
      money: 1000,
      reinforced_concrete: 2,
      refined_petroil: 1
    },
    manpower_cost: {
      labourers: 5000
    },
    maximum: 3,
    modifiers: {
      regional_infrastructure: 0.50,
      regional_transit_capacity: 50000,
      public_transit_capacity: 20000
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  docks: {
    name: "Docks",
    singular: "Dock",

    construction_turns: 6,
    cost: {
      lumber: 8,
      refined_concrete: 6,
      wood: 5,
      naval_supplies: 4,
      stone: 4,
      money: 7500
    },
    maintenance: {
      money: 3500,
      stone: 8,
      lumber: 5,
      naval_supplies: 3
    },
    manpower_cost: {
      any_pop: {
        labourers: 20000,
        peasants: 20000
      }
    },
    maximum: 6,
    modifiers: {
      shipment_capacity: 35,
      naval_capacity: 50
    },
    separate_building_slots: true,
    supply_limit: 20
  },
  drydocks: {
    name: "Drydocks",
    singular: "Drydock",

    construction_turns: 6,
    cost: {
      lumber: 15,
      stone: 10,
      bricks: 8,
      cement: 6,
      naval_supplies: 5,
      wood: 5,
      money: 8000
    },
    maintenance: {
      money: 2000,
      lumber: 3,
      steel: 2
    },
    manpower_cost: {
      any_pop_labourers_peasants: {
        labourers: 30000,
        peasants: 30000
      },
      any_pop_artisans_engineers: {
        artisans: 2000,
        engineers: 2000
      }
    },
    modifiers: {
      ship_health_per_turn: 0.05,
      naval_capacity: 10,
      naval_units_cp: 25
    },
    maximum: 4,
    separate_building_slots: true,
    supply_limit: 5
  },
  fuel_stations: {
    name: "Fuel Stations",
    singular: "Fuel Station",

    construction_turns: 2,
    cost: {
      steel: 4,
      iron: 3,
      asphalt: 2,
      bricks: 2,
      electric_gear: 1,
      glass: 1,
      machine_parts: 1,
      money: 4000
    },
    maintenance: {
      money: 350,
      refined_petroil: 4
    },
    manpower_cost: {
      labourers: 5000
    },
    modifiers: {
      regional_infrastructure: 0.25
    },
    separate_building_slots: true,
    supply_limit: 1
  },
  gas_pipelines: {
    name: "Gas Pipelines",
    singular: "Gas Pipeline",

    construction_turns: 3,
    cost: {
      steel: 8,
      machine_parts: 4,
      money: 8500
    },
    maintenance: {
      money: 5000,
      gas: 8
    },
    maximum: 10,
    modifiers: {
      gas_capacity: 100000
    },
    separate_building_slots: true
  },
  high_speed_rail: {
    name: "High-Speed Rail",
    singular: "High-Speed Railway",
    aliases: ["high speed rail"],

    construction_turns: 8,
    cost: {
      steel_beams: 15,
      electric_gear: 12,
      reinforced_concrete: 12,
      stone: 10,
      machine_parts: 8,
      lightbulbs: 4,
      glass: 4,
      stainless_steel: 3,
      computers: 2,
      radios: 1,
      money: 20000
    },
    maintenance: {
      money: 15000,
      electric_gear: 3,
      machine_parts: 3,
      trains: 1
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 8000
    },
    maximum: 5,
    modifiers: {
      domestic_infrastructure: 0.65,
      regional_infrastructure: 0.70,
      domestic_transit_capacity: 500000
    },
    supply_limit: 30
  },
  loading_wharfs: {
    name: "Loading Wharfs",
    singular: "Loading Wharf",

    construction_turns: 4,
    cost: {
      lumber: 20,
      bricks: 18,
      stone: 15,
      wood: 8,
      naval_supplies: 5,
      steel: 3,
      copper: 2,
      textiles: 1,
      money: 6500
    },
    maintenance: {
      money: 4000,
      machine_parts: 2,
      lumber: 2,
      naval_supplies: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 10000,
        labourers: 10000
      },
      any_pop_artisans_engineers: {
        artisans: 2000,
        engineers: 2000
      }
    },
    maximum: 4,
    modifiers: {
      international_infrastructure: 0.20,
      naval_capacity: 15
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  lng_terminals: {
    name: "LNG Terminals",
    singular: "LNG Terminal",

    construction_turns: 6,
    cost: {
      steel: 10,
      electric_gear: 6,
      lead: 4,
      copper_wire: 4,
      machine_parts: 3,
      computers: 2,
      money: 15000
    },
    maintenance: {
      money: 6000,
      steel: 2,
      electric_gear: 1,
      lead: 1
    },
    manpower_cost: {
      labourers: 12000,
      engineers: 7500
    },
    maximum: 4,
    modifiers: {
      gas_capacity: 70000
    },
    separate_building_slots: true
  },
  metro_lines: {
    name: "Metro Lines",
    singular: "Metro Line",

    construction_turns: 6,
    cost: {
      steel_beams: 12,
      steel: 10,
      reinforced_concrete: 10,
      bricks: 8,
      machine_parts: 6,
      stone: 6,
      lightbulbs: 4,
      cement: 3,
      money: 8000
    },
    maintenance: {
      money: 6500,
      steel_beams: 1,
      trains: 1
    },
    manpower_cost: {
      engineers: 5000,
      labourers: 8000
    },
    maximum: 8,
    modifiers: {
      public_transit: 0.80
    },
    separate_building_slots: true
  },
  metro_stops: {
    name: "Metro Stops",
    singular: "Metro Stop",

    construction_turns: 3,
    cost: {
      bricks: 8,
      steel_beams: 5,
      lightbulbs: 4,
      glass: 3,
      machine_parts: 2,
      concrete: 2,
      cement: 2,
      money: 3500
    },
    maintenance: {
      money: 800,
      lamps: 2,
      lightbulbs: 1,
      machine_parts: 1,
      steel_beams: 1
    },
    manpower_cost: {
      labourers: 2000
    },
    maximum: 24,
    modifiers: {
      regional_infrastructure: 0.20,
      public_transit_capacity: 100000
    },
    supply_limit: 2,
    separate_building_slots: true
  },
  motorways: {
    name: "Motorways",
    singular: "Motorway",
    aliases: ["autobahn", "highway"],

    construction_turns: 6,
    cost: {
      asphalt: 16,
      reinforced_concrete: 12,
      concrete: 8,
      dyes: 4,
      steel_beams: 4,
      money: 5000
    },
    maintenance: {
      money: 2500,
      asphalt: 3,
      reinforced_concrete: 1
    },
    manpower_cost: {
      labourers: 20000
    },
    maximum: 10,
    modifiers: {
      regional_transit_capacity: 150000
    },
    separate_building_slots: true,
    supply_limit: 30
  },
  international_aeroports: {
    name: "International Aeroports",
    singular: "International Aeroport",
    aliases: ["international airports"],

    construction_turns: 12,
    cost: {
      bricks: 20,
      stone: 18,
      steel_beams: 15,
      coal_tar: 12,
      cement: 10,
      steel: 10,
      concrete: 8,
      lightbulbs: 8,
      common_furniture: 6,
      aeroplanes: 5,
      machine_parts: 5,
      luxury_furniture: 4,
      electric_gear: 4,
      money: 50000
    },
    maintenance: {
      money: 10000,
      asphalt: 4,
      machine_parts: 4,
      electric_gear: 3,
      aeroplanes: 2,
      cement: 2,
      lightbulbs: 2,
      concrete: 1
    },
    manpower_cost: {
      labourers: 35000,
      engineers: 20000,
      faculty: 2000
    },
    maximum: 3,
    modifiers: {
      international_infrastructure: 0.50,
      domestic_infrastructure: 0.50,
      aeroplane_capacity: 50,
      tourism_value: 100,
      air_travel_capacity: 1000000
    },
    separate_building_slots: true,
    supply_limit: 50
  },
  piers: {
    name: "Piers",
    singular: "Pier",

    construction_turns: 6,
    cost: {
      bricks: 10,
      steel: 8,
      stone: 8,
      lumber: 8,
      cement: 6,
      wood: 4,
      naval_supplies: 4,
      money: 8000
    },
    maintenance: {
      money: 2000,
      bricks: 3,
      lumber: 2,
      stone: 2,
      cement: 1,
      naval_supplies: 1
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      },
      soldiers: 500
    },
    maximum: 6,
    modifiers: {
      international_infrastructure: 0.10,
      shipment_capacity: 50,
      naval_capacity: 20
    },
    separate_building_slots: true,
    supply_limit: 30
  },
  ports: {
    name: "Ports",
    singular: "Port",

    construction_turns: 8,
    cost: {
      bricks: 10,
      steel: 8,
      stone: 8,
      lumber: 8,
      cement: 6,
      wood: 4,
      naval_supplies: 4,
      money: 8000
    },
    maintenance: {
      money: 2000,
      bricks: 3,
      lumber: 2,
      stone: 2,
      cement: 1,
      naval_supplies: 1
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      },
      soldiers: 500
    },
    maximum: 5,
    modifiers: {
      international_infrastructure: 0.10,
      shipment_capacity: 50,
      naval_capacity: 20
    },
    separate_building_slots: true,
    supply_limit: 30
  },
  public_moorings: {
    name: "Public moorings",
    singular: "Public Mooring",

    construction_turns: 4,
    cost: {
      bricks: 12,
      glass: 8,
      lumber: 8,
      concrete: 6,
      wood: 6,
      lamps: 4,
      money: 12000
    },
    maintenance: {
      money: 3000,
      concrete: 2,
      glass: 1,
      refined_petroil: 1
    },
    manpower_cost: {
      labourers: 8000,
      artisans: 2000
    },
    maximum: 2,
    modifiers: {
      local_tourism_modifier: 0.05,
      tourism_value: 20
    },
    separate_building_slots: true,
    supply_limit: 5
  },
  railways: {
    name: "Railways",
    singular: "Railway",

    construction_turns: 3,
    cost: {
      steel_beams: 10,
      steel: 8,
      stone: 5,
      wood: 5,
      machine_parts: 5,
      lamps: 2,
      monye: 8000
    },
    maintenance: {
      money: 800,
      steel_beams: 1,
      wood: 1
    },
    manpower_cost: {
      labourers: 2000
    },
    maximum: 10,
    modifiers: {
      shipment_capacity: 50,
      regional_transit_capacity: 200000
    },
    separate_building_slots: true,
    supply_limit: 20
  },
  regional_aeroports: {
    name: "Regional Aeroports",
    singular: "Regional Aeroport",
    aliases: ["regional airport"],

    construction_turns: 4,
    cost: {
      bricks: 10,
      cement: 8,
      asphalt: 8,
      concrete: 5,
      coal_tar: 5,
      common_furniture: 4,
      lightbulbs: 4,
      lamps: 3,
      aeroplanes: 2,
      glass: 2,
      electric_gear: 2,
      machine_parts: 2,
      money: 10500
    },
    maintenance: {
      money: 4500,
      asphalt: 2,
      aeroplanes: 1,
      cement: 1
    },
    manpower_cost: {
      labourers: 15000,
      engineers: 5000
    },
    maximum: 5,
    modifiers: {
      domestic_infrastructure: 0.35,
      air_travel_capacity: 200000
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  repair_cranes: {
    name: "Repair Cranes",
    singular: "Repair Crane",

    construction_turns: 2,
    cost: {
      steel_beams: 8,
      machine_parts: 5,
      concrete: 5,
      electric_gear: 1,
      lightbulbs: 1,
      money: 15000
    },
    maintenance: {
      money: 1350,
      machine_parts: 1,
      steel_beams: 1
    },
    manpower_cost: {
      labourers: 2500,
      engineers: 1000
    },
    maximum: 2,
    modifiers: {
      ship_health_per_turn: 0.10,
      housing_maintenance: -0.20,
      local_ship_maintenance: -0.20
    },
    separate_building_slots: true
  },
  seawalls: {
    name: "Seawalls",
    singular: "Seawall",

    construction_turns: 2,
    cost: {
      stone: 10,
      bricks: 5,
      money: 4000
    },
    maintenance: {
      money: 2000,
      stone: 5,
      bricks: 2
    },
    manpower_cost: {
      labourers: 3500
    },
    maximum: 5,
    maintenance: {
      money: 2000,
      stone: 5,
      bricks: 2
    },
    modifiers: {
      naval_defence: 0.50,
      local_defence: 0.15
    },
    separate_building_slots: true
  },
  shipyards: {
    name: "Shipyards",
    singular: "Shipyard",

    construction_turns: 6,
    cost: {
      reinforced_concrete: 20,
      bricks: 18,
      lumber: 12,
      machine_parts: 10,
      electric_gear: 10,
      stainless_steel: 8,
      wood: 8,
      naval_supplies: 5,
      iron: 4,
      copper: 3,
      money: 20000
    },
    maintenance: {
      money: 6500,
      lumber: 6,
      steel_beams: 4,
      iron: 3,
      copper: 2,
      naval_supplies: 2
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 8000
    },
    maximum: 2,
    produces: {
      merchant_cp: 80
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  steam_shipyards: {
    name: "Steam Shipyards",
    singular: "Steam Shipyard",

    construction_turns: 7,
    cost: {
      reinforced_concrete: 10,
      lumber: 10,
      bricks: 9,
      iron: 8,
      copper: 6,
      machine_parts: 5,
      naval_supplies: 5,
      lamps: 4,
      stainless_steel: 2,
      money: 14000
    },
    maintenance: {
      money: 8000,
      lumber: 5,
      steel_beams: 3,
      iron: 2,
      coals: 2,
      naval_supplies: 2
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 12000
    },
    maximum: 2,
    produces: {
      naval_units_cp: 25,
      merchant_cp: 50
    },
    separate_building_slots: true,
    supply_limit: 15
  },
  tractor_barns: {
    name: "Tractor Barns",
    singular: "Tractor Barn",

    construction_turns: 2,
    cost: {
      bricks: 8,
      steel: 4,
      tractors: 2,
      asphalt: 2,
      money: 2000
    },
    maintenance: {
      money: 1000,
      refined_petroil: 2,
      electric_gear: 1,
      tractors: 1
    },
    manpower_cost: {
      labourers: 15000
    },
    maximum: 8,
    modifiers: {
      local_agriculture_bonus: 0.20
    },
    separate_building_slots: true,
    supply_limit: 2
  },
  train_depots: {
    name: "Train Depots",
    singular: "Train Depot",

    construction_turns: 4,
    cost: {
      bricks: 20,
      glass: 12,
      concrete: 10,
      steel_beams: 10,
      cement: 8,
      steel: 8,
      iron: 8,
      machine_parts: 6,
      lamps: 5,
      common_furniture: 4,
      luxury_furniture: 4,
      dyes: 3,
      stone: 2,
      wood: 2,
      money: 15000
    },
    maintenance: {
      money: 6000,
      bricks: 5,
      steel_beams: 2,
      trains: 2,
      machine_parts: 1
    },
    manpower_cost: {
      labourers: 35000,
      engineers: 5000
    },
    maximum: 4,
    modifiers: {
      local_tram_lines_bonus: 0.50,
      regional_transit_capacity: 50000,
      domestic_transit_capacity: 100000
    },
    separate_building_slots: true,
    supply_limit: 20
  },
  tram_lines: {
    name: "Tram Lines",
    singular: "Tram Line",

    construction_turns: 4,
    cost: {
      steel_beams: 8,
      copper_wire: 4,
      rubber: 3,
      lamps: 2,
      trains: 2,
      machine_parts: 1,
      money: 8000
    },
    maintenance: {
      money: 1000,
      steel_beams: 2,
      copper_wire: 1,
      trains: 1
    },
    manpower_cost: {
      labourers: 3500,
      engineers: 500
    },
    maximum: 8,
    modifiers: {
      public_transit_capacity: 100000
    },
    separate_building_slots: true,
    supply_limit: 5
  }
};
