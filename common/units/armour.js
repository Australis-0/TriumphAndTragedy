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
      low_calibre_ammunition: 10,
      refined_petroil: 5,
      small_arms: 5,
      foods:4,
      rubber: 4,
      steam_carriages: 4,
      regular_steel: 3,
      machine_parts: 2,
      chassis: 1,
      money: 2000,

      ground_vehicles_cp: 5
    },
    maintenance: {
      foods:2,
      refined_petroil: 2,
      regular_steel: 2,
      low_calibre_ammunition: 1,
      machine_parts: 1,
      pharmaceuticals: 1,
      rubber: 1,

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
      foods:5,
      low_calibre_ammunition: 5,
      regular_steel: 5,
      refined_petroil: 3,
      small_arms: 3,
      money: 1500,

      ground_vehicles_cp: 5
    },
    maintenance: {
      steam_carriages: 4,
      refined_petroil: 3,
      foods:2,
      regular_steel: 1,
      low_calibre_ammunition: 1,
      machine_parts: 1,
      pharmaceuticals: 1,

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
      foods:5,
      low_calibre_ammunition: 5,
      regular_steel: 4,
      refined_petroil: 3,
      chassis: 2,
      small_arms: 2,
      tractors: 1,
      money: 1000,

      ground_vehicles_cp: 5,
    },
    maintenance: {
      refined_petroil: 4,
      foods:2,
      low_calibre_ammunition: 2,
      pharmaceuticals: 1,
      radios: 1,
      regular_steel: 1,
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
      foods:5,
      low_calibre_ammunition: 5,
      refined_petroil: 5,
      small_arms: 3,
      chassis: 1,
      money: 5000,

      ground_vehicles_cp: 10
    },
    maintenance: {
      foods:2,
      refined_petroil: 2,
      machine_parts: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
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
      high_calibre_ammunition: 5,
      refined_petroil: 5,
      foods:5,
      low_calibre_ammunition: 4,
      cars: 4,
      small_arms: 3,
      heavy_weaponry: 1,
      televisions: 1,
      money: 5000,

      ground_vehicles_cp: 10
    },
    maintenance: {
      refined_petroil: 4,
      foods:2,
      high_calibre_ammunition: 2,
      regular_steel: 2,
      machine_parts: 2,
      computers: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      radios: 1,
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
      stainless_steel: 6,
      foods:5,
      refined_petroil: 5,
      regular_steel: 4,
      chassis: 4,
      machine_parts: 3,
      electric_gear: 2,
      small_arms: 2,
      turbines: 2,
      televisions: 1,
      money: 2500,

      ground_vehicles_cp: 10
    },
    maintenance: {
      refined_petroil: 4,
      low_calibre_ammunition: 3,
      ap_rounds: 2,
      foods:2,
      machine_parts: 2,
      sabot_rounds: 2,
      small_arms: 2,
      computers: 1,
      high_calibre_ammunition: 1,
      pharmaceuticals: 1,
      radios: 1,
      regular_steel: 1,

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
      low_calibre_ammunition: 6,
      machine_parts: 5,
      refined_petroil: 5,
      small_arms: 5,
      foods:5,
      chassis: 4,
      delayed_fuse_shells: 4,
      engines: 2,
      tractors: 2,
      heavy_weaponry: 1,
      money: 3000,

      ground_vehicles_cp: 20
    },
    maintenance: {
      refined_petroil: 6,
      machine_parts: 4,
      delayed_fuse_shells: 2,
      foods:2,
      regular_steel: 2,
      engines: 1,
      pharmaceuticals: 1,

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
      regular_steel: 5,
      low_calibre_ammunition: 5,
      foods:4,
      high_calibre_ammunition: 3,
      machine_parts: 3,
      refined_petroil: 3,
      heavy_weaponry: 2,
      small_arms: 2,
      engines: 2,
      tractors: 2,
      money: 2500,

      ground_vehicles_cp: 10,
    },
    maintenance: {
      refined_petroil: 5,
      foods:2,
      machine_parts: 2,
      low_calibre_ammunition: 2,
      engines: 1,
      high_calibre_ammunition: 1,
      pharmaceuticals: 1,
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
      refined_petroil: 7,
      small_arms: 5,
      regular_steel: 5,
      machine_parts: 5,
      foods:5,
      engines: 4,
      high_calibre_ammunition: 4,
      low_calibre_ammunition: 4,
      chassis: 2,
      heavy_weaponry: 2,
      money: 3000,

      ground_vehicles_cp: 10
    },
    maintenance: {
      refined_petroil: 5,
      delayed_fuse_shells: 2,
      foods:2,
      high_calibre_ammunition: 2,
      low_calibre_ammunition: 2,
      machine_parts: 2,
      pharmaceuticals: 1,
      regular_steel: 1,
      small_arms: 1,

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
      machine_parts: 10,
      regular_steel: 7,
      refined_petroil: 5,
      chassis: 4,
      ap_rounds: 4,
      engines: 4,
      electric_gear: 3,
      foods:3,
      heavy_weaponry: 2,
      high_calibre_ammunition: 2,
      low_calibre_ammunition: 2,
      small_arms: 2,
      radios: 2,
      money: 5000,

      ground_vehicles_cp: 15
    },
    maintenance: {
      refined_petroil: 6,
      ap_rounds: 2,
      delayed_fuse_shells: 2,
      foods:2,
      machine_parts: 2,
      sabot_rounds: 2,
      high_calibre_ammunition: 2,
      copper_wire: 1,
      electric_gear: 1,
      low_calibre_ammunition: 1,
      heavy_weaponry: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
      stainless_steel: 1,
      small_arms: 1,

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
      regular_steel: 12,
      refined_petroil: 10,
      machine_parts: 8,
      engines: 6,
      small_arms: 5,
      chassis: 4,
      electric_gear: 4,
      heavy_weaponry: 3,
      foods:3,
      low_calibre_ammunition: 3,
      copper_wire: 2,
      high_calibre_ammunition: 2,
      rubber: 2,
      radios: 2,
      money: 8000,

      ground_vehicles_cp: 20
    },
    maintenance: {
      refined_petroil: 8,
      machine_parts: 4,
      ap_rounds: 4,
      sabot_rounds: 4,
      machine_parts: 3,
      copper_wire: 2,
      delayed_fuse_shells: 2,
      foods:2,
      heavy_weaponry: 2,
      high_calibre_ammunition: 2,
      low_calibre_ammunition: 2,
      regular_steel: 2,
      small_arms: 2,
      pharmaceuticals: 1,
      plastic_explosives: 1,

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
      low_calibre_ammunition: 5,
      machine_parts: 5,
      regular_steel: 5,
      refined_petroil: 3,
      heavy_weaponry: 1,
      foods:1,
      tractors: 1,
      radios: 1,
      money: 3000,

      ground_vehicles_cp: 10
    },
    maintenance: {
      refined_petroil: 5,
      ap_rounds: 2,
      foods:2,
      delayed_fuse_shells: 1,
      heavy_weaponry: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
      sabot_rounds: 1,

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
      machine_parts: 10,
      regular_steel: 8,
      ap_rounds: 5,
      small_arms: 5,
      refined_petroil: 5,
      chassis: 4,
      low_calibre_ammunition: 4,
      foods:3,
      engines: 2,
      heavy_weaponry: 2,
      radios: 2,
      money: 4000,

      ground_vehicles_cp: 15
    },
    maintenance: {
      refined_petroil: 6,
      machine_parts: 4,
      regular_steel: 3,
      ap_rounds: 2,
      foods:2,
      low_calibre_ammunition: 2,
      sabot_rounds: 2,
      delayed_fuse_shells: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
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
      machine_parts: 10,
      ap_rounds: 8,
      regular_steel: 8,
      electric_gear: 8,
      foods:5,
      refined_petroil: 5,
      small_arms: 5,
      capacitors: 4,
      electric_gear: 4,
      high_calibre_ammunition: 4,
      resistors: 4,
      radios: 4,
      copper_wire: 3,
      heavy_weaponry: 3,
      low_calibre_ammunition: 2,
      glass: 2,
      cameras: 1,
      money: 10000,

      ground_vehicles_cp: 20
    },
    maintenance: {
      refined_petroil: 8,
      machine_parts: 4,
      low_calibre_ammunition: 4,
      sabot_rounds: 4,
      delayed_fuse_shells: 2,
      foods:2,
      high_calibre_ammunition: 2,
      ap_rounds: 2,
      electric_gear: 2,
      small_arms: 2,
      heavy_weaponry: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
      capacitors: 1,
      copper_wire: 1,
      film: 1,

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
      regular_steel: 15,
      machine_parts: 8,
      small_arms: 5,
      electric_gear: 6,
      refined_petroil: 5,
      chassis: 4,
      copper_wire: 4,
      heavy_weaponry: 3,
      radios: 3,
      foods:3,
      cameras: 2,
      glass: 2,
      high_calibre_ammunition: 2,
      lightbulbs: 2,
      low_calibre_ammunition: 2,
      televisions: 2,
      turbines: 2,
      money: 8000,

      ground_vehicles_cp: 20
    },
    maintenance: {
      refined_petroil: 8,
      ap_rounds: 4,
      machine_parts: 3,
      computers: 2,
      delayed_fuse_shells: 2,
      film: 2,
      foods:2,
      electric_gear: 2,
      regular_steel: 2,
      sabot_rounds: 2,
      heavy_weaponry: 1,
      high_calibre_ammunition: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
      small_arms: 1,
      transistors: 1,

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
      regular_steel: 12,
      electric_gear: 8,
      refined_petroil: 8,
      machine_parts: 6,
      foods:5,
      integrated_circuits: 5,
      small_arms: 5,
      ap_rounds: 4,
      chassis: 4,
      computers: 4,
      high_calibre_ammunition: 4,
      cameras: 3,
      heavy_weaponry: 3,
      low_calibre_ammunition: 2,
      radios: 2,
      sabot_rounds: 2,
      televisions: 2,
      turbines: 2,
      glass: 2,
      lasers: 1,
      money: 10000,

      ground_vehicles_cp: 20
    },
    maintenance: {
      refined_petroil: 8,
      ap_rounds: 4,
      machine_parts: 4,
      sabot_rounds: 4,
      delayed_fuse_shells: 2,
      high_calibre_ammunition: 2,
      low_calibre_ammunition: 2,
      integrated_circuits: 2,
      computers: 1,
      copper_wire: 2,
      electric_gear: 2,
      foods:2,
      heavy_weaponry: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,

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
      regular_steel: 20,
      electric_gear: 15,
      copper_wire: 10,
      machine_parts: 10,
      small_arms: 8,
      foods:7,
      refined_petroil: 7,
      ap_rounds: 4,
      computers: 4,
      integrated_circuits: 4,
      radios: 4,
      sabot_rounds: 4,
      heavy_weaponry: 3,
      stainless_steel: 3,
      cameras: 2,
      high_calibre_ammunition: 2,
      lasers: 2,
      televisions: 2,
      money: 12000,

      ground_vehicles_cp: 40
    },
    maintenance: {
      refined_petroil: 8,
      high_calibre_ammunition: 5,
      machine_parts: 4,
      ap_rounds: 2,
      delayed_fuse_shells: 2,
      electric_gear: 2,
      foods:2,
      sabot_rounds: 2,
      integrated_circuits: 2,
      small_arms: 2,
      heavy_weaponry: 2,
      computers: 1,
      pharmaceuticals: 1,
      plastic_explosives: 1,
      rubber: 1,

      ground_vehicles_cp: 25,
      money: 8000
    },
    manpower_cost: {
      soldiers: 360
    },
    quantity: 20
  }
};
