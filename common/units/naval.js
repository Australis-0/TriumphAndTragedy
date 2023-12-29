config.units.naval = {
  name: "Naval",
  icon: "naval_units",
  type: "naval",

  branch_name: "Navy",

  //Naval Units
  caravels: {
    name: "Caravels",
    singular: "Caravel",

    attack: 200,
    defence: 500,
    manoeuvre: 8,
    movement: 7.41,
    initiative: 1,

    cost: {
      foods:5,
      lumber: 2,
      iron: 1,
      wool: 1,
      money: 500,
      naval_units_cp: 5
    },
    maintenance: {
      foods: 2,
      citrus: 1,
      iron: 1,
      lumber: 1,
      naval_supplies: 1,
      traditional_medicines: 1,
      wool: 1,
      money: 250,

      naval_units_cp: 2
    },
    manpower_cost: {
      soldiers: 200
    },
    quantity: 5
  },
  galleons: {
    name: "Galleons",
    singular: "Galleon",

    attack: 2500,
    defence: 1250,
    manoeuvre: 2,
    movement: 12.96,
    initiative: 3,

    cost: {
      foods:7,
      lumber: 3,
      iron: 2,
      lead: 2,
      wool: 2,
      money: 1000,

      naval_units_cp: 10
    },
    maintenance: {
      naval_supplies: 3,
      foods:3,
      lead: 2,
      lumber: 2,
      citrus: 1,
      traditional_medicines: 1,
      wool: 1,
      money: 500,

      naval_units_cp: 7
    },
    manpower_cost: {
      soldiers: 500
    },
    quantity: 1
  },
  men_of_war: {
    name: "Men-of-War",
    singular: "Man-of-War",

    attack: 3250,
    defence: 1500,
    manoeuvre: 2,
    movement: 15.74,
    initiative: 4,

    cost: {
      foods:15,
      lumber: 5,
      iron: 3,
      lead: 3,
      wool: 3,
      money: 1500,

      naval_units_cp: 15
    },
    maintenance: {
      foods:4,
      lumber: 3,
      naval_supplies: 3,
      iron: 2,
      lead: 2,
      citrus: 1,
      tonics: 1,
      wool: 1,
      money: 750,

      naval_units_cp: 7
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 1
  },
  ships_of_the_line: {
    name: "Ships-of-the-Line",
    singular: "Ship-of-the-Line",

    attack: 3000,
    defence: 2000,
    manoeuvre: 3,
    movement: 22.22,
    initiative: 4,

    cost: {
      foods:7,
      lumber: 5,
      wool: 5,
      iron: 3,
      lead: 3,
      money: 2000,

      naval_units_cp: 15
    },
    maintenance: {
      naval_supplies: 6,
      foods:5,
      lumber: 4,
      iron: 2,
      lead: 2,
      citrus: 1,
      copper: 1,
      tonics: 1,
      wool: 1,

      money: 1000,
      naval_units_cp: 8
    },
    manpower_cost: {
      soldiers: 1100
    },
    quantity: 1
  },
  first_rates: {
    name: "First Rates",
    singular: "First Rate",

    attack: 4250,
    defence: 1750,
    manoeuvre: 3,
    movement: 26.70,
    initiative: 5,

    cost: {
      foods:6,
      lumber: 7,
      lead: 5,
      wool: 5,
      iron: 3,
      money: 2500,

      naval_units_cp: 20
    },
    maintenance: {
      foods:5,
      lumber: 5,
      naval_supplies: 5,
      lead: 3,
      copper: 2,
      iron: 2,
      citrus: 1,
      tonics: 1,
      wool: 1,

      money: 1250,
      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 850
    },
    quantity: 1
  },
  frigates: {
    name: "Frigates",
    singular: "Frigate",

    attack: 1250,
    defence: 875,
    maneouvre: 4,
    movement: 25.93,
    initiative: 3,

    cost: {
      lumber: 5,
      foods:4,
      lead: 3,
      wool: 3,
      iron: 2,
      money: 1500,

      naval_units_cp: 10
    },
    maintenance: {
      foods:4,
      naval_supplies: 4,
      lumber: 3,
      lead: 2,
      citrus: 1,
      copper: 1,
      iron: 1,
      tonics: 1,
      wool: 1,

      money: 750,
      naval_units_cp: 6
    },
    manpower_cost: {
      soldiers: 630
    },
    quantity: 2
  },

  //1815 - 1910 - Steamships
  steamboats: {
    name: "Steamboats",
    singular: "Steamboat",

    attack: 350,
    defence: 600,
    manoeuvre: 6,
    movement: 6.44,
    initiative: 1,

    cost: {
      foods:5,
      iron: 5,
      lead: 2,
      lumber: 2,
      heavy_weaponry: 1,
      small_arms: 1,
      wool: 2,
      money: 6000,

      naval_units_cp: 10
    },
    maintenance: {
      foods:2,
      coals: 1,
      copper: 1,
      high_calibre_ammunition: 1,
      lead: 1,
      low_calibre_ammunition: 1,
      machine_parts: 1,
      naval_supplies: 1,
      tonics: 1,
      uniforms: 1,

      money: 3000,
      naval_units_cp: 4
    },
    manpower_cost: {
      soldiers: 200
    },
    quantity: 5
  },
  clippers: {
    name: "Clippers",
    singular: "Clipper",

    attack: 150,
    defence: 300,
    manoeuvre: 8,
    movement: 30,
    initiative: 3,

    cost: {
      foods:7,
      wool: 6,
      lumber: 3,
      iron: 1,
      money: 3000,

      naval_units_cp: 5
    },
    maintenance: {
      lumber: 8,
      foods:6,
      lead: 2,
      iron: 2,
      naval_supplies: 2,
      citrus: 1,
      tonics: 1,
      wool: 1,

      money: 1500,
      naval_units_cp: 2
    },
    manpower_cost: {
      soldiers: 4000
    },
    quantity: 5
  },
  gunboats: {
    name: "Gunboats",
    singular: "Gunboat",

    attack: 600,
    defence: 250,
    manoeuvre: 4,
    movement: 25.93,
    initiative: 4,

    cost: {
      foods:6,
      iron: 5,
      uniforms: 5,
      regular_shells: 2,
      wool: 2,
      heavy_weaponry: 1,
      small_arms: 1,
      money: 4000,

      naval_units_cp: 10
    },
    maintenance: {
      regular_steel: 4,
      regular_shells: 2,
      coals: 2,
      foods:2,
      copper: 1,
      heavy_weaponry: 1,
      low_calibre_ammunition: 1,
      machine_parts: 1,
      naval_supplies: 1,
      tonics: 1,
      uniforms: 1,

      money: 2000,
      naval_units_cp: 5
    },
    manpower_cost: {
      soldiers: 200
    },
    quantity: 5
  },
  ironclads: {
    name: "Ironclads",
    singular: "Ironclad",

    attack: 6000,
    defence: 9000,
    manoeuvre: 3,
    movement: 26.50,
    initative: 1,

    cost: {
      iron: 10,
      foods:5,
      machine_parts: 5,
      regular_shells: 5,
      uniforms: 5,
      copper: 4,
      brass: 3,
      heavy_weaponry: 3,
      coals: 3,
      money: 10000,

      naval_units_cp: 20
    },
    maintenance: {
      coals: 4,
      iron: 4,
      foods:2,
      heavy_weaponry: 2,
      regular_shells: 2,
      uniforms: 2,
      copper: 1,
      machine_parts: 1,
      naval_supplies: 2,
      tonics: 1,

      money: 5000,
      naval_units_cp: 8
    },
    manpower_cost: {
      soldiers: 320
    },
    quantity: 1
  },
  breastwork_monitors: {
    name: "Breastwork Monitors",
    singular: "Breastwork Monitor",
    type: ["cruiser"],

    attack: 7500,
    defence: 10000,
    manoeuvre: 3,
    movement: 11.11,
    initiative: 4,

    cost: {
      iron: 12,
      machine_parts: 5,
      heavy_weaponry: 4,
      uniforms: 5,
      regular_shells: 10,
      coals: 3,
      foods:3,
      copper: 2,
      brass: 2,
      money: 11000,

      naval_units_cp: 30
    },
    maintenance: {
      iron: 6,
      coals: 4,
      regular_shells: 4,
      heavy_weaponry: 2,
      foods:2,
      lead: 2,
      uniforms: 2,
      copper: 1,
      machine_parts: 1,
      naval_supplies: 1,
      tonics: 1,

      money: 5500,
      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 136
    },
    quantity: 1
  },

  //1910 - 1945 - Diesel ships
  destroyers: {
    name: "Destroyers",
    singular: "Destroyer",
    type: ["destroyer"],

    attack: 800,
    defence: 1200,
    manoeuvre: 5,
    movement: 65,
    initiative: 4,

    cost: {
      uniforms: 10,
      regular_shells: 10,
      regular_steel: 8,
      foods:5,
      heavy_weaponry: 4,
      lumber: 4,
      common_furniture: 1,
      money: 6000,

      naval_units_cp: 10
    },
    maintenance: {
      refined_petroil: 10,
      explosives: 4,
      torpedoes: 4,
      coals: 3,
      regular_steel: 3,
      regular_shells: 2,
      foods:2,
      lead: 2,
      naval_supplies: 2,
      heavy_weaponry: 1,
      machine_parts: 1,
      pharmaceuticals: 1,
      uniforms: 1,

      money: 3000,
      naval_units_cp: 8
    },
    manpower_cost: {
      soldiers: 230
    },
    quantity: 5
  },
  cruisers: {
    name: "Cruisers",
    singular: "Cruiser",
    type: ["cruiser"],

    attack: 5000,
    defence: 3750,
    manoeuvre: 4,
    movement: 55.56,
    initiative: 5,

    cost: {
      regular_shells: 15,
      regular_steel: 12,
      uniforms: 10,
      lumber: 8,
      copper_wire: 6,
      foods:7,
      heavy_weaponry: 5,
      copper: 4,
      brass: 4,
      glass: 4,
      lead: 3,
      bronze: 2,
      common_furniture: 2,
      money: 15000,

      naval_units_cp: 15
    },
    maintenance: {
      refined_petroil: 20,
      naval_supplies: 7,
      ap_rounds: 5,
      delayed_fuse_shells: 4,
      regular_steel: 4,
      regular_shells: 3,
      heavy_weaponry: 2,
      foods:2,
      lead: 2,
      uniforms: 2,
      machine_parts: 1,
      pharmaceuticals: 1,

      money: 7500,
      naval_units_cp: 12
    },
    manpower_cost: {
      soldiers: 1340
    },
    quantity: 2
  },
  pre_dreadnoughts: {
    name: "Pre-Dreadnoughts",
    singular: "Pre-Dreadnought",

    attack: 10000,
    defence: 17500,
    manoeuvre: 2,
    movement: 37.04,
    initiative: 6,

    cost: {
      regular_shells: 16,
      regular_steel: 15,
      lumber: 8,
      foods:8,
      copper: 6,
      brass: 6,
      machine_parts: 5,
      bronze: 4,
      electric_lamps: 4,
      small_arms: 4,
      glass: 2,
      electric_gear: 2,
      engines: 2,
      common_furniture: 1,
      money: 21000,

      naval_units_cp: 20
    },
    maintenance: {
      refined_petroil: 30,
      ap_rounds: 8,
      delayed_fuse_shells: 8,
      regular_steel: 5,
      regular_shells: 4,
      heavy_weaponry: 2,
      foods:2,
      lead: 2,
      machine_parts: 2,
      naval_supplies: 2,
      uniforms: 2,
      pharmaceuticals: 1,

      money: 10500,
      naval_units_cp: 14
    },
    manpower_cost: {
      soldiers: 392
    },
    quantity: 1
  },
  dreadnoughts: {
    name: "Dreadnoughts",
    singular: "Dreadnought",

    attack: 17500,
    defence: 20000,
    manoeuvre: 1,
    movement: 38.89,
    initiative: 5,

    cost: {
      regular_shells: 20,
      regular_steel: 18,
      small_arms: 12,
      machine_parts: 10,
      foods:9,
      copper: 8,
      copper_wire: 8,
      glass: 7,
      brass: 6,
      bronze: 6,
      electric_gear: 6,
      electric_lamps: 6,
      lumber: 6,
      stainless_steel: 4,
      engines: 4,
      iron: 5,
      common_furniture: 1,
      money: 30000,

      naval_units_cp: 40
    },
    maintenance: {
      refined_petroil: 30,
      ap_rounds: 8,
      delayed_fuse_shells: 8,
      high_calibre_ammunition: 6,
      low_calibre_ammunition: 6,
      regular_steel: 6,
      naval_supplies: 5,
      regular_shells: 4,
      heavy_weaponry: 4,
      lead: 4,
      foods:3,
      machine_parts: 2,
      uniforms: 2,
      pharmaceuticals: 1,
      radios: 1,

      money: 15000,
      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 810
    },
    quantity: 1
  },
  torpedo_boats: {
    name: "Torpedo Boats",
    singular: "Torpedo Boat",

    attack: 2000,
    defence: 50,
    manoeuvre: 6,
    movement: 46.50,
    initiative: 5,

    cost: {
      regular_shells: 5,
      foods:5,
      regular_steel: 3,
      regular_steel: 2,
      common_furniture: 1,
      engines: 1,
      money: 4500,

      naval_units_cp: 5
    },
    maintenance: {
      refined_petroil: 5,
      torpedoes: 4,
      regular_shells: 2,
      machine_parts: 2,
      foods:1,
      lead: 1,
      naval_supplies: 1,
      pharmaceuticals: 1,
      radios: 1,
      uniforms: 1,

      money: 2250,
      naval_units_cp: 5
    },
    manpower_cost: {
      soldiers: 150
    },
    quantity: 5
  },
  battlecruisers: {
    name: "Battlecruisers",
    singular: "Battlecruiser",

    attack: 17500,
    defence: 10000,
    manoeuvre: 4,
    movement: 49.30,
    initiative: 6,

    cost: {
      machine_parts: 10,
      regular_shells: 10,
      foods:7,
      heavy_weaponry: 5,
      regular_steel: 5,
      iron: 4,
      lead: 3,
      common_furniture: 2,
      money: 19500,

      naval_units_cp: 20
    },
    maintenance: {
      refined_petroil: 20,
      naval_supplies: 8,
      regular_shells: 4,
      regular_steel: 4,
      lead: 4,
      heavy_weaponry: 3,
      foods:3,
      uniforms: 3,
      machine_parts: 2,
      pharmaceuticals: 1,
      radios: 1,

      money: 9750,
      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 1430
    },
    quantity: 1
  },
  submarines: {
    name: "Submarines",
    singular: "Submarine",
    type: ["submarine"],

    attack: 17500,
    defence: 500,
    manoeuvre: 8,
    movement: 56,
    initiative: 4,

    cost: {
      foods:8,
      torpedoes: 6,
      machine_parts: 5,
      regular_shells: 5,
      regular_steel: 3,
      small_arms: 2,
      engines: 2,
      copper_wire: 1,
      electric_gear: 1,
      heavy_weaponry: 1,
      common_furniture: 1,
      money: 6000,

      naval_units_cp: 10
    },
    maintenance: {
      refined_petroil: 10,
      artillery_shells: 4,
      delayed_fuse_shells: 4,
      machine_parts: 4,
      torpedoes: 4,
      regular_steel: 4,
      electric_lamps: 2,
      regular_shells: 2,
      foods:2,
      naval_supplies: 2,
      heavy_weaponry: 1,
      pharmaceuticals: 1,
      radios: 1,
      uniforms: 1,

      money: 3000,
      naval_units_cp: 6
    },
    manpower_cost: {
      soldiers: 300
    },
    quantity: 5
  },
  air_carriers: {
    name: "Air Carriers",
    singular: "Air Carrier",
    type: ["aircraft_carrier"],

    attack: 1500,
    carrier_capacity: 20,
    defence: 2000,
    manoeuvre: 2000,
    movement: 28.71,
    initiative: 1,

    cost: {
      regular_steel: 12,
      lumber: 10,
      regular_shells: 10,
      foods:10,
      electric_gear: 8,
      glass: 7,
      electric_lamps: 6,
      small_arms: 5,
      copper_wire: 4,
      engines: 4,
      lifts: 4,
      stainless_steel: 4,
      brass: 3,
      bronze: 3,
      common_furniture: 1,
      money: 18000,

      naval_units_cp: 40
    },
    maintenance: {
      refined_petroil: 20,
      machine_parts: 6,
      high_calibre_ammunition: 4,
      low_calibre_ammunition: 4,
      regular_steel: 4,
      regular_shells: 4,
      foods:4,
      naval_supplies: 3,
      electric_gear: 2,
      heavy_weaponry: 2,
      lead: 2,
      uniforms: 2,
      lightbulbs: 1,
      pharmaceuticals: 1,
      radios: 1,

      money: 9000,
      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 470
    },
    quantity: 1
  },
  battleships: {
    name: "Battleships",
    singular: "Batlteship",

    attack: 25000,
    defence: 37500,
    manoeuvre: 3,
    movement: 61.10,
    initiative: 5,

    cost: {
      regular_steel: 15,
      foods:12,
      small_arms: 10,
      copper_wire: 8,
      heavy_weaponry: 8,
      machine_parts: 7,
      copper: 6,
      engines: 6,
      glass: 6,
      lumber: 5,
      lead: 5,
      brass: 4,
      bronze: 4,
      electric_gear: 4,
      electric_lamps: 4,
      steel_beams: 4,
      common_furniture: 3,
      money: 24000,

      naval_units_cp: 20
    },
    maintenance: {
      refined_petroil: 40,
      ap_rounds: 12,
      delayed_fuse_shells: 12,
      naval_supplies: 11,
      regular_shells: 10,
      regular_shells: 8,
      machine_parts: 6,
      torpedoes: 6,
      electric_gear: 4,
      heavy_weaponry: 4,
      high_calibre_ammunition: 4,
      low_calibre_ammunition: 4,
      foods:4,
      regular_steel: 4,
      uniforms: 4,
      lead: 2,
      pharmaceuticals: 1,
      radios: 1,

      money: 12000,
      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 2065
    },
    quantity: 1
  },
  aircraft_carriers: {
    name: "Aircraft Carriers",
    singular: "Aircraft Carrier",
    type: ["aircraft_carrier"],

    attack: 1200,
    carrier_capacity: 35,
    defence: 2200,
    manoeuvre: 2,
    movement: 61,
    initiative: 1,

    cost: {
      regular_shells: 20,
      regular_steel: 20,
      small_arms: 20,
      lumber: 15,
      electric_gear: 12,
      electric_lamps: 10,
      machine_parts: 10,
      foods:10,
      copper_wire: 8,
      glass: 8,
      lifts: 8,
      engines: 6,
      heavy_weaponry: 5,
      chassis: 4,
      capacitors: 2,
      common_furniture: 3,
      money: 30000,

      naval_units_cp: 40
    },
    maintenance: {
      refined_petroil: 50,
      naval_supplies: 12,
      regular_shells: 6,
      ap_rounds: 4,
      delayed_fuse_shells: 4,
      foods:4,
      lead: 4,
      machine_parts: 4,
      uniforms: 4,
      explosives: 3,
      copper_wire: 2,
      electric_gear: 2,
      electric_lamps: 2,
      heavy_weaponry: 2,
      high_calibre_ammunition: 2,
      low_calibre_ammunition: 2,
      regular_steel: 2,
      capacitors: 1,
      engines: 1,
      lifts: 1,
      pharmaceuticals: 1,
      radios: 1,

      money: 15000,
      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 2220
    },
    quantity: 1
  },

  //1945 - Present - Modern ships
  nuclear_submarines: {
    name: "Nuclear Submarines",
    singular: "Nuclear Submarine",
    type: ["submarine"],

    attack: 112500,
    defence: 2750,
    manoeuvre: 6,
    movement: 82.80,
    initiative: 2,

    cost: {
      machine_parts: 15,
      regular_steel: 15,
      electric_gear: 12,
      enriched_uranium: 12,
      foods:10,
      regular_shells: 10,
      capacitors: 8,
      stainless_steel: 8,
      torpedoes: 8,
      glass: 6,
      resistors: 6,
      turbines: 6,
      heavy_weaponry: 5,
      transistors: 5,
      aluminium: 4,
      electric_lamps: 4,
      low_calibre_ammunition: 4,
      small_arms: 4,
      tools: 3,
      artillery_shells: 2,
      cameras: 2,
      common_furniture: 1,
      money: 45000,

      naval_units_cp: 30
    },
    maintenance: {
      regular_shells: 8,
      enriched_uranium: 6,
      machine_parts: 6,
      lead: 4,
      heavy_weaponry: 2,
      foods:2,
      film: 2,
      regular_steel: 2,
      tools: 2,
      transistors: 2,
      uniforms: 2,
      naval_supplies: 1,
      pharmaceuticals: 1,
      radios: 1,

      money: 22500,
      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 130
    },
    quantity: 1
  },
  supercarriers: {
    name: "Supercarriers",
    singular: "Supercarrier",
    type: ["aircraft_carrier"],

    attack: 2000,
    carrier_capacity: 50,
    defence: 3500,
    manoeuvre: 1,
    movement: 61,
    initiative: 1,

    cost: {
      regular_shells: 25,
      regular_steel: 25,
      electric_gear: 20,
      foods:15,
      machine_parts: 10,
      lifts: 12,
      turbines: 12,
      capacitors: 8,
      stainless_steel: 8,
      televisions: 6,
      resistors: 6,
      furniture: 6,
      heavy_weaponry: 5,
      transistors: 5,
      common_furniture: 4,
      tools: 4,
      cameras: 2,
      money: 45000,

      naval_units_cp: 40
    },
    maintenance: {
      refined_petroil: 60,
      naval_supplies: 18,
      enriched_uranium: 8,
      machine_parts: 8,
      regular_shells: 8,
      foods:6,
      uniforms: 5,
      copper_wire: 4,
      lead: 4,
      heavy_weaponry: 2,
      film: 2,
      regular_steel: 2,
      tools: 2,
      transistors: 2,
      pharmaceuticals: 1,
      radios: 1,

      money: 22500,
      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 3532
    },
    quantity: 1
  },
  modern_cruisers: {
    name: "Modern Cruisers",
    singular: "Modern Cruiser",
    type: ["cruiser"],

    attack: 17500,
    defence: 15000,
    manoeuvre: 4,
    movement: 55.56,
    initiative: 5,

    cost: {
      regular_shells: 20,
      regular_steel: 20,
      foods:10,
      machine_parts: 10,
      copper_wire: 10,
      electric_gear: 8,
      copper: 6,
      stainless_steel: 6,
      electric_lamps: 5,
      integrated_circuits: 5,
      computers: 4,
      heavy_weaponry: 4,
      televisions: 4,
      turbines: 4,
      small_arms: 2,
      cameras: 1,
      common_furniture: 1,
      money: 30000,

      naval_units_cp: 15
    },
    maintenance: {
      refined_petroil: 40,
      regular_shells: 6,
      machine_parts: 6,
      ap_rounds: 4,
      delayed_fuse_shells: 4,
      uniforms: 4,
      explosives: 3,
      heavy_weaponry: 3,
      foods:3,
      naval_supplies: 3,
      copper_wire: 2,
      electric_gear: 2,
      glass: 2,
      lead: 2,
      tools: 2,
      silicon: 2,
      film: 1,
      integrated_circuits: 1,
      pharmaceuticals: 1,
      radios: 1,
      regular_steel: 1,

      money: 15000,
      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 556
    },
    quantity: 1
  },
  modern_frigates: {
    name: "Modern Frigates",
    singular: "Modern Frigate",
    type: ["destroyer"],

    attack: 6250,
    defence: 8750,
    manoeuvre: 5,
    movement: 59.26,
    initiative: 4,

    cost: {
      regular_steel: 15,
      machine_parts: 10,
      regular_shells: 10,
      electric_gear: 8,
      foods:7,
      copper_wire: 5,
      lead: 5,
      electric_lamps: 4,
      explosives: 4,
      computers: 3,
      integrated_circuits: 3,
      glass: 2,
      televisions: 2,
      turbines: 2,
      cameras: 1,
      common_furniture: 1,
      money: 20000,

      naval_units_cp: 10
    },
    maintenance: {
      refined_petroil: 30,
      regular_shells: 4,
      machine_parts: 4,
      foods:3,
      naval_supplies: 3,
      explosives: 2,
      heavy_weaponry: 2,
      lead: 2,
      uniforms: 2,
      electric_gear: 1,
      electric_lamps: 1,
      film: 1,
      integrated_circuits: 1,
      pharmaceuticals: 1,
      radios: 1,
      regular_steel: 1,
      tools: 1,

      money: 10000,
      naval_units_cp: 8
    },
    manpower_cost: {
      soldiers: 420
    },
    quantity: 2
  },
  railgun_cruisers: {
    name: "Railgun Cruisers",
    singular: "Railgun Cruiser",
    type: ["cruiser"],

    attack: 27500,
    defence: 14000,
    manoeuvre: 3,
    movement: 60,
    initiative: 4,

    cost: {
      regular_steel: 25,
      machine_parts: 25,
      foods: 15,
      integrated_circuits: 15,
      stainless_steel: 14,
      computers: 12,
      copper_wire: 10,
      electric_gear: 10,
      brass: 9,
      lasers: 8,
      silicon: 8,
      titanium: 8,
      cameras: 6,
      turbines: 6,
      regular_shells: 5,
      lead: 5,
      engines: 4,
      ferrochromium: 4,
      televisions: 4,
      capacitors: 3,
      transistors: 3,
      radios: 1,
      resistors: 3,
      common_furniture: 1,

      money: 45000,

      naval_units_cp: 20
    },
    maintenance: {
      refined_petroil: 30,
      anfo: 12,
      machine_parts: 12,
      electric_gear: 10,
      computers: 8,
      regular_shells: 8,
      integrated_circuits: 6,
      foods:4,
      heavy_weaponry: 4,
      naval_supplies: 4,
      stainless_steel: 4,
      titanium: 4,
      lead: 3,
      uniforms: 3,
      film: 2,
      televisions: 2,
      lasers: 1,
      pharmaceuticals: 1,
      radios: 1,
      silicon: 1,
      televisions: 1,
      turbines: 1,

      money: 30000,
      naval_units_cp: 14
    },
    manpower_cost: {
      soldiers: 650
    },
    quantity: 1
  }
};
