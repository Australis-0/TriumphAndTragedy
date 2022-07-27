config.units.naval = {
  name: "Naval",
  icon: "naval_units",
  type: "naval",

  //Naval Units
  caravels: {
    name: "Caravels",
    singular: "Caravel",

    attack: 200,
    defence: 500,
    manoeuvre: 8,
    initiative: 1,

    cost: {
      lumber: 2,
      iron: 1,
      food: 5,
      money: 500,
      naval_units_cp: 5
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  galleons: {
    name: "Galleons",
    singular: "Galleon",

    attack: 500,
    defence: 250,
    manoeuvre: 2,
    initiative: 3,

    cost: {
      lumber: 3,
      iron: 2,
      lead: 2,
      food: 7,
      money: 1000,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  men_of_war: {
    name: "Men-of-War",
    singular: "Man-of-War",

    attack: 650,
    defence: 300,
    manoeuvre: 2,
    initiative: 4,

    cost: {
      lumber: 5,
      iron: 3,
      lead: 3,
      food: 7,
      food: 15,
      money: 1500,

      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  ships_of_the_line: {
    name: "Ships-of-the-Line",
    singular: "Ship-of-the-Line",

    attack: 600,
    defence: 400,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      lumber: 5,
      iron: 3,
      lead: 3,
      food: 7,
      money: 2000,

      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  first_rates: {
    name: "First Rates",
    singular: "First Rate",

    attack: 850,
    defence: 350,
    manoeuvre: 3,
    initiative: 5,

    cost: {
      lumber: 7,
      iron: 3,
      lead: 5,
      food: 6,
      money: 2500,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  frigates: {
    name: "Frigates",
    singular: "Frigate",

    attack: 500,
    defence: 350,
    maneouvre: 4,
    initiative: 3,

    cost: {
      lumber: 5,
      iron: 2,
      lead: 3,
      food: 4,
      money: 1500,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  steamboats: {
    name: "Steamboats",
    singular: "Steamboat",

    attack: 350,
    defence: 600,
    manoeuvre: 6,
    initiative: 1,

    cost: {
      lumber: 2,
      artillery: 1,
      iron: 5,
      lead: 2,
      food: 5,
      money: 3000,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  clippers: {
    name: "Clippers",
    singular: "Clipper",

    attack: 150,
    defence: 300,
    manoeuvre: 8,
    initiative: 3,

    cost: {
      lumber: 3,
      iron: 1,
      food: 7,
      money: 1500,

      naval_units_cp: 5
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  gunboats: {
    name: "Gunboats",
    singular: "Gunboat",

    attack: 600,
    defence: 250,
    manoeuvre: 4,
    initiative: 4,

    cost: {
      iron: 5,
      artillery: 1,
      uniforms: 5,
      ammunition: 2,
      food: 6,
      money: 2000,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  ironclads: {
    name: "Ironclads",
    singular: "Ironclad",

    attack: 1200,
    defence: 1800,
    manoeuvre: 3,
    initative: 1,

    cost: {
      iron: 10,
      artillery: 3,
      uniforms: 5,
      ammunition: 5,
      coal: 3,
      food: 5,
      money: 5000,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 1
  },
  breastwork_monitors: {
    name: "Breastwork Monitors",
    singular: "Breastwork Monitor",
    type: ["cruiser"],

    attack: 1500,
    defence: 2000,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      iron: 12,
      artillery: 4,
      uniforms: 5,
      ammunition: 10,
      coal: 3,
      food: 3,
      money: 5500,

      naval_units_cp: 30
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  destroyers: {
    name: "Destroyers",
    singular: "Destroyer",
    type: ["destroyer"],

    attack: 800,
    defence: 1200,
    manoeuvre: 5,
    initiative: 4,

    cost: {
      steel: 8,
      artillery: 4,
      uniforms: 10,
      ammunition: 10,
      refined_petroil: 3,
      food: 5,
      money: 3000,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  cruisers: {
    name: "Cruisers",
    singular: "Cruiser",
    type: ["cruiser"],

    attack: 2000,
    defence: 1500,
    manoeuvre: 4,
    initiative: 5,

    cost: {
      steel: 12,
      artillery: 5,
      uniforms: 10,
      ammunition: 15,
      refined_petroil: 5,
      food: 7,

      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  pre_dreadnoughts: {
    name: "Pre-Dreadnoughts",
    singular: "Pre-Dreadnought",

    attack: 2000,
    defence: 3500,
    manoeuvre: 2,
    initiative: 6,

    cost: {
      steel: 15,
      machine_parts: 5,
      ammunition: 16,
      refined_petroil: 5,
      food: 8,
      money: 7000,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  dreadnoughts: {
    name: "Dreadnoughts",
    singular: "Dreadnought",

    attack: 3500,
    defence: 4000,
    manoeuvre: 1,
    initiative: 5,

    cost: {
      steel: 18,
      machine_parts: 10,
      ammunition: 20,
      iron: 5,
      refined_petroil: 5,
      food: 9,
      money: 10000,

      naval_units_cp: 40
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  torpedo_boats: {
    name: "Torpedo Boats",
    singular: "Torpedo Boat",

    attack: 2000,
    defence: 50,
    manoeuvre: 6,
    initiative: 5,

    cost: {
      steel: 3,
      iron: 2,
      ammunition: 5,
      refined_petroil: 3,
      food: 5,
      money: 1500,

      naval_units_cp: 5
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  battlecruisers: {
    name: "Battlecruisers",
    singular: "Battlecruiser",

    attack: 3500,
    defence: 2000,
    manoeuvre: 4,
    initiative: 6,

    cost: {
      steel: 5,
      artillery: 5,
      machine_parts: 10,
      ammunition: 10,
      iron: 4,
      lead: 3,
      refined_petroil: 7,
      food: 7,
      money: 6500,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  submarines: {
    name: "Submarines",
    singular: "Submarine",
    type: ["submarine"],

    attack: 17500,
    defence: 500,
    manoeuvre: 8,
    initiative: 4,

    cost: {
      steel: 3,
      machine_parts: 5,
      artillery: 1,
      small_arms: 2,
      ammunition: 5,
      petroil: 3,
      food: 8,
      money: 2000,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
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
    initiative: 1,

    cost: {
      steel: 12,
      small_arms: 5,
      lumber: 10,
      ammunition: 10,
      refined_petroil: 10,
      food: 10,
      money: 9000,

      naval_units_cp: 40
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 1
  },
  battleships: {
    name: "Battleships",
    singular: "Batlteship",

    attack: 5000,
    defence: 7500,
    manoeuvre: 3,
    initiative: 5,

    cost: {
      steel: 15,
      machine_parts: 7,
      artillery: 8,
      small_arms: 10,
      lumber: 5,
      lead: 5,
      refined_petroil: 7,
      food: 12,
      money: 8000,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  aircraft_carriers: {
    name: "Aircraft Carriers",
    singular: "Aircraft Carrier",
    type: ["aircraft_carrier"],

    attack: 1200,
    carrier_capacity: 35,
    defence: 2200,
    manoeuvre: 2,
    initiative: 1,

    cost: {
      steel: 20,
      lumber: 15,
      machine_parts: 10,
      artillery: 5,
      small_arms: 20,
      ammunition: 20,
      gold: 1,
      refined_petroil: 10,
      food: 10,
      money: 10000,

      naval_units_cp: 40
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 1
  },
  nuclear_submarines: {
    name: "Nuclear Submarines",
    singular: "Nuclear Submarine",
    type: ["submarine"],

    attack: 22500,
    defence: 550,
    manoeuvre: 6,
    initiative: 2,

    cost: {
      steel: 15,
      artillery: 5,
      machine_parts: 15,
      ammunition: 10,
      gold: 3,
      refined_petroil: 7,
      food: 10,
      money: 5000,

      naval_units_cp: 30
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  supercarriers: {
    name: "Supercarriers",
    singular: "Supercarrier",
    type: ["aircraft_carrier"],

    attack: 2000,
    carrier_capacity: 50,
    defence: 3500,
    manoeuvre: 1,
    initiative: 1,

    cost: {
      steel: 25,
      artillery: 5,
      machine_parts: 10,
      ammunition: 25,
      gold: 10,
      refined_petroil: 10,
      food: 15,
      money: 15000,

      naval_units_cp: 40
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 1
  },
  modern_cruisers: {
    name: "Modern Cruisers",
    singular: "Modern Cruiser",
    type: ["cruiser"],

    attack: 3500,
    defence: 3000,
    manoeuvre: 4,
    initiative: 5,

    cost: {
      steel: 20,
      artillery: 4,
      machine_parts: 10,
      ammunition: 20,
      gold: 5,
      copper: 10,
      refined_petroil: 7,
      food: 10,
      money: 5000,

      naval_units_cp: 15
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  modern_frigates: {
    name: "Modern Frigates",
    singular: "Modern Frigate",
    type: ["destroyer"],

    attack: 2500,
    defence: 3500,
    manoeuvre: 5,
    initiative: 4,

    cost: {
      steel: 15,
      machine_parts: 15,
      ammunition: 10,
      gold: 3,
      lead: 5,
      refined_petroil: 5,
      food: 7,
      money: 3500,

      naval_units_cp: 10
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  },
  railgun_cruisers: {
    name: "Railgun Cruisers",
    singular: "Railgun Cruiser",
    type: ["cruiser"],

    attack: 5500,
    defence: 2800,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      steel: 25,
      machine_parts: 25,
      ammunition: 5,
      gold: 15,
      copper: 10,
      lead: 5,
      refined_petroil: 10,
      food: 15,
      money: 15000,

      naval_units_cp: 20
    },
    manpower_cost: {
      soldiers: 50000
    },
    quantity: 5
  }
};
