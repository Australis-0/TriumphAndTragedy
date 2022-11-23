config.units.armour = {
  name: "Armour",
  icon: "land_vehicles",
  type: "land",

  branch_name: "Armour",

  //Other Armoured Vehicles
  armoured_cars: {
    name: "Armoured Cars",
    singular: "Armoured Car",

    attack: 3000,
    defence: 5000,
    manoeuvre: 6,
    movement: 72,
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
    maintenance: {
      refined_petroil: 2,
      steel: 2,
      ammunition: 1,
      machine_parts: 1,

      ground_vehicles_cp: 2,
      money: 800
    },
    manpower_cost: {
      soldiers: 200
    },
    quantity: 20
  },
  armoured_personnel_carriers: {
    name: "Armoured Personnel Carriers",
    singular: "Armoured Personnel Carrier",
    aliases: ["apc", "apcs"],

    attack: 15000,
    defence: 20000,
    manoeuvre: 5,
    movement: 6.9,
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
    maintenance: {
      refined_petroil: 2,
      steel: 1,
      ammunition: 1,
      machine_parts: 1,

      ground_vehicles_cp: 2,
      money: 700
    },
    manpower_cost: {
      soldiers: 250
    },
    quantity: 5
  },
  half_tracks: {
    name: "Half-Tracks",
    singular: "Half-Track",

    attack: 1000,
    defence: 1500,
    manoeuvre: 3,
    movement: 52.5,
    initiative: 3,

    cost: {
      steel: 4,
      small_arms: 2,
      refined_petroil: 3,
      ammunition: 5,
      food: 5,
      money: 1000,

      ground_vehicles_cp: 5,
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      steel: 1,
      small_arms: 1,

      ground_vehicles_cp: 3,
      money: 1200
    },
    manpower_cost: {
      soldiers: 1000
    },
    quantity: 50
  },
  troop_carriers: {
    name: "Troop Carriers",
    singular: "Troop Carrier",

    attack: 500,
    defence: 1000,
    manoeuvre: 7,
    movement: 48,
    initiative: 3,

    cost: {
      steel: 10,
      small_arms: 3,
      ammunition: 5,
      refined_petroil: 5,
      food: 5,
      money: 5000,

      ground_vehicles_cp: 10
    },
    maintenance: {
      machine_parts: 1,
      ammunition: 1,
      small_arms: 1,

      ground_vehicles_cp: 2,
      money: 900
    },
    manpower_cost: {
      soldiers: 450
    },
    quantity: 50
  },
  modern_armoured_cars: {
    name: "Modern Armoured Cars",
    singular: "Modern Armoured Car",

    attack: 2000,
    defence: 3500,
    manoeuvre: 7,
    movement: 93,
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
    maintenance: {
      refined_petroil: 3,
      steel: 2,
      ammunition: 2,
      machine_parts: 2,
      small_arms: 1,

      ground_vehicles_cp: 6,
      money: 2000
    },
    manpower_cost: {
      soldiers: 300
    },
    quantity: 50
  },
  modern_apcs: {
    name: "Modern APCs",
    singular: "Modern APC",

    attack: 1500,
    defence: 4000,
    manoeuvre: 3,
    movement: 67.6,
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
    maintenance: {
      ammunition: 3,
      refined_petroil: 3,
      machine_parts: 2,
      small_arms: 2,
      steel: 1,

      ground_vehicles_cp: 6,
      money: 1800
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 50
  },

  //Ground Vehicles - World War Tanks
  landship: {
    name: "Landship",

    attack: 1800,
    defence: 700,
    manoeuvre: 1,
    movement: 8,
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
    maintenance: {
      refined_petroil: 6,
      machine_parts: 4,
      ammunition: 2,
      steel: 2,
      artillery: 1,

      ground_vehicles_cp: 10,
      money: 1000
    },
    manpower_cost: {
      soldiers: 1000
    },
    quantity: 50
  },
  light_tanks: {
    name: "Light Tanks",
    singular: "Light Tank",

    attack: 1200,
    defence: 250,
    manoeuvre: 3,
    movement: 7,
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
    maintenance: {
      refined_petroil: 4,
      machine_parts: 2,
      ammunition: 2,
      small_arms: 1,

      ground_vehicles_cp: 8,
      money: 900
    },
    manpower_cost: {
      soldiers: 400
    },
    quantity: 50
  },
  interwar_tanks: {
    name: "Interwar Tanks",
    singular: "Interwar Tank",

    attack: 1500,
    defence: 300,
    manoeuvre: 2,
    movement: 40,
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
    maintenance: {
      refined_petroil: 3,
      ammunition: 2,
      machine_parts: 2,
      small_arms: 1,
      steel: 1,

      ground_vehicles_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 50
  },
  medium_tanks: {
    name: "Medium Tanks",
    singular: "Medium Tank",

    attack: 1600,
    defence: 800,
    manoeuvre: 1,
    movement: 42,
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
    maintenance: {
      refined_petroil: 4,
      machine_parts: 2,
      ammunition: 2,
      artillery: 1,
      small_arms: 1,
      steel: 1,

      ground_vehicles_cp: 8,
      money: 1800
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 50
  },
  heavy_tanks: {
    name: "Heavy Tanks",
    singular: "Heavy Tank",

    attack: 5000,
    defence: 2500,
    manoeuvre: 0,
    movement: 38,
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
    maintenance: {
      refined_petroil: 8,
      machine_parts: 4,
      ammunition: 3,
      artillery: 2,
      small_arms: 2,
      steel: 2,

      ground_vehicles_cp: 15,
      money: 2500
    },
    manpower_cost: {
      soldiers: 360
    },
    quantity: 20
  },
  tank_destroyers: {
    name: "Tank Destroyers",
    singular: "Tank Destroyer",

    attack: 3125,
    defence: 375,
    manoeuvre: 5,
    movement: 32,
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
    maintenance: {
      refined_petroil: 3,
      artillery: 1,
      ammunition: 1,

      ground_vehicles_cp: 4,
      money: 2000
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 40
  },

  //Ground Vehicles - Modern Tanks
  improved_medium_tanks: {
    name: "Improved Medium Tanks",
    singular: "Improved Medium Tank",

    attack: 2500,
    defence: 1250,
    manoeuvre: 2,
    movement: 55,
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

      ground_vehicles_cp: 15
    },
    maintenance: {
      refined_petroil: 4,
      machine_parts: 4,
      steel: 3,
      ammunition: 2,
      small_arms: 1,

      ground_vehicles_cp: 12,
      money: 2200
    },
    manpower_cost: {
      soldiers: 750
    },
    quantity: 50
  },
  modern_tanks: {
    name: "Modern Tanks",
    singular: "Modern Tank",

    attack: 6000,
    defence: 2000,
    manoeuvre: 1,
    movement: 34.6,
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
    maintenance: {
      refined_petroil: 6,
      machine_parts: 4,
      ammunition: 4,
      small_arms: 2,
      artillery: 1,
      gold: 1,

      ground_vehicles_cp: 20,
      money: 5000
    },
    manpower_cost: {
      soldiers: 400
    },
    quantity: 25
  },
  main_battle_tanks: {
    name: "Main Battle Tanks",
    singular: "Main Battle Tank",

    attack: 6400,
    defence: 3000,
    manoeuvre: 2,
    movement: 48,
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
    maintenance: {
      refined_petroil: 6,
      machine_parts: 5,
      ammunition: 4,
      small_arms: 2,
      artillery: 1,
      steel: 2,
      gold: 1,

      ground_vehicles_cp: 20,
      money: 6500
    },
    manpower_cost: {
      soldiers: 300
    },
    quantity: 25
  },
  modern_mbts: {
    name: "Modern MBTs",
    singular: "Modern MBT",

    attack: 8000,
    defence: 4000,
    manoeuvre: 1,
    movement: 66.79,
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
    maintenance: {
      refined_petroil: 6,
      machine_parts: 6,
      ammunition: 4,
      gold: 2,
      small_arms: 2,
      artillery: 1,

      ground_vehicles_cp: 22,
      money: 7000
    },
    manpower_cost: {
      soldiers: 400
    },
    quantity: 25
  },
  multirole_mbts: {
    name: "Multirole MBTs",
    singular: "Multirole MBT",

    attack: 12500,
    defence: 5000,
    manoeuvre: 3,
    movement: 70,
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
    maintenance: {
      refined_petroil: 6,
      machine_parts: 6,
      ammunition: 5,
      gold: 4,
      small_arms: 2,
      artillery: 2,

      ground_vehicles_cp: 25,
      money: 8000
    },
    manpower_cost: {
      soldiers: 360
    },
    quantity: 20
  }
};
