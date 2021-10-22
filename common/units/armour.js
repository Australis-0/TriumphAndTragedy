config.units.armour = {
  name: "Armour",

  //Other Armoured Vehicles
  armoured_cars: {
    name: "Armoured Cars",
    singular: "Armoured Car",

    attack: 1200,
    defence: 2000,
    manoeuvre: 6,
    initiative: 1,

    cost: {
      steel: 3,
      iron: 2,
      refined_petroil: 5,
      small_arms: 5,
      ammunition: 10,
      food: 4,
      money: 2000,

      ground_vehicles_cp: 5
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  armoured_personnel_carriers: {
    name: "Armoured Personnel Carriers",
    singular: "Armoured Personnel Carrier",
    aliases: ["apc", "apcs"],

    attack: 1500,
    defence: 2000,
    manoeuvre: 5,
    initiative: 2,

    cost: {
      steel: 5,
      refined_petroil: 3,
      small_arms: 3,
      ammunition: 5,
      food: 5,
      money: 1500,

      ground_vehicles_cp: 5
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  half_tracks: {
    name: "Half-Tracks",
    singular: "Half-Track",

    attack: 1000,
    defence: 1500,
    manoeuvre: 3,
    initiative: 3,

    cost: {
      steel: 4,
      small_arms: 2,
      refined_petroil: 3,
      ammunition: 5,
      food: 5,
      money: 1000,

      ground_vehicles: 5,
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  troop_carriers: {
    name: "Troop Carriers",
    singular: "Troop Carrier",

    attack: 500,
    defence: 1000,
    manoeuvre: 7,
    initiative: 3,

    cost: {
      steel: 10,
      artillery: 1,
      small_arms: 3,
      ammunition: 5,
      refined_petroil: 5,
      food: 5,
      money: 5000,

      ground_vehicles_cp: 10
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  modern_armoured_cars: {
    name: "Modern Armoured Cars",
    singular: "Modern Armoured Car",

    attack: 2000,
    defence: 3500,
    manoeuvre: 7,
    initiative: 3,

    cost: {
      steel: 10,
      artillery: 1,
      small_arms: 3,
      ammunition: 5,
      refined_petroil: 5,
      food: 5,
      money: 5000,

      ground_vehicles_cp: 10
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  modern_apcs: {
    name: "Modern APCs",
    singular: "Modern APC",

    attack: 1500,
    defence: 4000,
    manoeuvre: 3,
    initiative: 5,

    cost: {
      steel: 10,
      machine_parts: 5,
      small_arms: 2,
      refined_petroil: 5,
      food: 5,
      money: 2500,

      ground_vehicles_cp: 10
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },

  //Ground Vehicles - World War Tanks
  landship: {
    name: "Landship",

    attack: 1800,
    defence: 700,
    manoeuvre: 1,
    initiative: 1,

    cost: {
      steel: 7,
      artillery: 1,
      small_arms: 5,
      machine_parts: 5,
      ammunition: 10,
      refined_petroil: 5,
      food: 5,
      money: 3000,

      ground_vehicles_cp: 20
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  light_tanks: {
    name: "Light Tanks",
    singular: "Light Tank",

    attack: 1200,
    defence: 250,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      steel: 5,
      small_arms: 5,
      ammunition: 5,
      machine_parts: 3,
      refined_petroil: 3,
      food: 4,
      money: 2500,

      ground_vehicles_cp: 10,
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  interwar_tanks: {
    name: "Interwar Tanks",
    singular: "Interwar Tank",

    attack: 1500,
    defence: 300,
    manoeuvre: 2,
    initiative: 3,

    cost: {
      steel: 5,
      artillery: 1,
      small_arms: 5,
      machine_parts: 5,
      ammunition: 10,
      refined_petroil: 7,
      food: 5,
      money: 3000,

      ground_vehicles_cp: 10
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  medium_tanks: {
    name: "Medium Tanks",
    singular: "Medium Tank",

    attack: 1600,
    defence: 800,
    manoeuvre: 1,
    initiative: 5,

    cost: {
      steel: 7,
      artillery: 1,
      small_arms: 2,
      machine_parts: 10,
      ammunition: 7,
      refined_petroil: 5,
      food: 3,
      money: 5000,

      ground_vehicles_cp: 15
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  heavy_tanks: {
    name: "Heavy Tanks",
    singular: "Heavy Tank",

    attack: 2000,
    defence: 1000,
    manoeuvre: 0,
    initiative: 1,

    cost: {
      steel: 12,
      artillery: 3,
      small_arms: 5,
      machine_parts: 12,
      ammunition: 5,
      refined_petroil: 10,
      food: 3,
      money: 8000,

      ground_vehicles_cp: 20
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  tank_destroyers: {
    name: "Tank Destroyers",
    singular: "Tank Destroyer",

    attack: 2500,
    defence: 300,
    manoeuvre: 5,
    initiative: 2,

    cost: {
      steel: 5,
      artillery: 1,
      machine_parts: 5,
      ammunition: 5,
      refined_petroil: 3,
      food: 1,
      money: 3000,

      ground_vehicles_cp: 10
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },

  //Ground Vehicles - Modern Tanks
  improved_medium_tanks: {
    name: "Improved Medium Tanks",
    singular: "Improved Medium Tank",

    attack: 2500,
    defence: 1250,
    manoeuvre: 2,
    initiative: 3,

    cost: {
      steel: 10,
      artillery: 2,
      machine_parts: 10,
      small_arms: 5,
      ammunition: 10,
      refined_petroil: 5,
      food: 3,
      money: 4000,

      ground_vehicles: 15
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  modern_tanks: {
    name: "Modern Tanks",
    singular: "Modern Tank",

    attack: 3000,
    defence: 1000,
    manoeuvre: 1,
    intiiative: 4,

    cost: {
      steel: 15,
      artillery: 3,
      small_arms: 5,
      machine_parts: 15,
      ammunition: 10,
      gold: 5,
      refined_petroil: 5,
      food: 5,
      money: 10000,

      ground_vehicles_cp: 20
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  main_battle_tanks: {
    name: "Main Battle Tanks",
    singular: "Main Battle Tank",

    attack: 3200,
    defence: 1500,
    manoeuvre: 2,
    initiative: 5,

    cost: {
      steel: 15,
      artillery: 3,
      small_arms: 5,
      machine_parts: 15,
      ammunition: 10,
      gold: 3,
      refined_petroil: 5,
      food: 3,
      money: 8000,

      ground_vehicles_cp: 20
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  modern_mbts: {
    name: "Modern MBTs",
    singular: "Modern MBT",

    attack: 4000,
    defence: 2000,
    manoeuvre: 1,
    initiative: 4,

    cost: {
      steel: 15,
      artillery: 3,
      small_arms: 5,
      machine_parts: 15,
      ammunition: 10,
      gold: 5,
      refined_petroil: 5,
      food: 5,
      money: 10000,

      ground_vehicles_cp: 20
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  },
  multirole_mbts: {
    name: "Multirole MBTs",
    singular: "Multirole MBT",

    attack: 5000,
    defence: 2000,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      steel: 20,
      artillery: 3,
      small_arms: 10,
      copper: 10,
      machine_parts: 25,
      ammunition: 15,
      gold: 10,
      iron: 3,
      lead: 5,
      refined_petroil: 7,
      food: 7,
      money: 12000,

      ground_vehicles_cp: 40
    },
    manpower_cost: {
      soldiers: 35000
    },
    quantity: 50
  }
};
