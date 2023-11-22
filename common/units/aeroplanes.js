config.units.aeroplanes = {
  name: "Aeroplanes",
  icon: "aeroplanes",
  type: "air",

  branch_name: "Air Force",

  //Air Units - Pre-WW1
  reconaissance_balloons: {
    name: "Reconaissance Balloons",
    singular: "Reconaissance Balloon",

    attack: 20,
    defence: 200,
    manoeuvre: 8,
    movement: 14.48,
    initiative: 1,
    range: 6,

    cost: {
      lumber: 2,
      fabric: 2,
      coals: 1,
      money: 500,

      aeroplanes_cp: 5
    },
    maintenance: {
      tonics: 1,
      wood: 1,

      aeroplanes_cp: 2,
      money: 200
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 20
  },
  dirigibles: {
    name: "Dirigibles",
    singular: "Dirigible",

    attack: 60,
    defence: 250,
    manoeuvre: 6,
    movement: 56.33,
    initiative: 2,
    range: 8,

    cost: {
      lumber: 3,
      fabric: 2,
      hydrogen: 2,
      coals: 1,
      foods:1,
      money: 1000,

      aeroplanes_cp: 10
    },
    maintenance: {
      coals: 1,
      hydrogen: 1,
      tonics: 1,

      aeroplanes_cp: 4,
      money: 500
    },
    manpower_cost: {
      soldiers: 500
    },
    quantity: 20
  },
  zeppelins: {
    name: "Zeppelins",
    singular: "Zeppelin",
    type: ["can_bomb"],

    attack: 2000,
    defence: 1400,
    manoeuvre: 6,
    movement: 32,
    initiative: 3,
    range: 60,

    cost: {
      fabric: 6,
      regular_steel: 5,
      hydrogen: 3,
      steel_beams: 2,
      lumber: 2,
      coals: 3,
      foods:3,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      ammunition: 2,
      coals: 1,
      machine_parts: 1,
      tonics: 1,
      wood: 1,

      aeroplanes_cp: 20,
      money: 1000
    },
    manpower_cost: {
      soldiers: 720
    },
    quantity: 5
  },

  //Air Units - Early Fighters
  biplanes: {
    name: "Biplanes",
    singular: "Biplane",

    attack: 500,
    defence: 900,
    manoeuvre: 6,
    movement: 120.70,
    initiative: 3,
    range: 12,

    cost: {
      regular_steel: 5,
      fabric: 3,
      coals: 3,
      foods:3,
      lumber: 2,
      machine_parts: 1,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      ammunition: 1,
      pharmaceuticals: 1,
      refined_petroil: 1,

      aeroplanes_cp: 5,
      money: 500
    },
    manpower_cost: {
      soldiers: 250
    },
    quantity: 20
  },
  improved_biplanes: {
    name: "Improved Biplanes",
    singular: "Improved Biplane",

    attack: 550,
    defence: 1100,
    manoeuvre: 3,
    movement: 186.68,
    initiative: 3,
    range: 16,

    cost: {
      regular_steel: 5,
      lumber: 5,
      small_arms: 2,
      machine_parts: 2,
      low_calibre_ammunition: 3,
      refined_petroil: 1,
      money: 1250,

      aeroplanes_cp: 15
    },
    maintenance: {
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      refined_petroil: 1,
      regular_steel: 1,

      aeroplanes_cp: 6,
      money: 600
    },
    manpower_cost: {
      soldiers: 500
    },
    quantity: 20
  },
  monoplane_fighters: {
    name: "Monoplane Fighters",
    singular: "Monoplane Fighter",

    attack: 550,
    defence: 1100,
    manoeuvre: 4,
    movement: 209.22,
    initiative: 3,
    range: 18,

    cost: {
      regular_steel: 7,
      lumber: 3,
      small_arms: 3,
      machine_parts: 3,
      low_calibre_ammunition: 3,
      refined_petroil: 2,
      rubber: 2,
      electric_gear: 1,
      glass: 1,
      money: 1500,

      aeroplanes_cp: 15
    },
    maintenance: {
      low_calibre_ammunition: 2,
      refined_petroil: 2,
      pharmaceuticals: 1,
      regular_steel: 1,
      small_arms: 1,

      aeroplanes_cp: 5,
      money: 850
    },
    manpower_cost: {
      soldiers: 1340
    },
    quantity: 20
  },
  propeller_fighters: {
    name: "Propeller Fighters",
    singular: "Propeller Fighter",

    attack: 600,
    defence: 1500,
    manoeuvre: 5,
    movement: 593.85,
    initiative: 3,
    range: 20,

    cost: {
      regular_steel: 5,
      machine_parts: 4,
      low_calibre_ammunition: 3,
      lumber: 2,
      small_arms: 3,
      refined_petroil: 3,
      rubber: 2,
      electric_gear: 1,
      glass: 1,
      money: 1500,

      aeroplanes_cp: 20,
      money: 900
    },
    maintenance: {
      low_calibre_ammunition: 2,
      refined_petroil: 2,
      machine_parts: 1,
      pharmaceuticals: 1,
      regular_steel: 1,
      small_arms: 1,

      aeroplanes_cp: 7
    },
    manpower_cost: {
      soldiers: 1340
    },
    quantity: 20
  },

  //Air Units - Fighter Aeroplanes
  fighters: {
    name: "Fighters",
    singular: "Fighter",

    attack: 600,
    defence: 1800,
    manoeuvre: 5,
    movement: 518.21,
    initiative: 3,
    range: 25,

    cost: {
      low_calibre_ammunition: 8,
      aluminium: 5,
      refined_petroil: 5,
      machine_parts: 4,
      rubber: 4,
      lumber: 3,
      small_arms: 3,
      lumber: 3,
      glass: 2,
      electric_gear: 1,
      radios: 1,
      money: 2500,

      aeroplanes_cp: 25
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      machine_parts: 2,
      high_calibre_ammunition: 1,
      pharmaceuticals: 1,
      regular_steel: 1,
      rubber: 1,
      small_arms: 1,

      money: 1000,
      aeroplanes_cp: 7
    },
    manpower_cost: {
      soldiers: 2360
    },
    quantity: 20
  },
  advanced_fighters: {
    name: "Advanced Fighters",
    singular: "Advanced Fighter",

    attack: 700,
    defence: 2000,
    movement: 593.85,
    manoeuvre: 6,
    initiative: 2,
    range: 25,

    cost: {
      aluminium: 10,
      low_calibre_ammunition: 8,
      machine_parts: 7,
      refined_petroil: 5,
      small_arms: 5,
      rubber: 4,
      glass: 2,
      lumber: 3,
      radios: 2,
      money: 2500,

      aeroplanes_cp: 25
    },
    maintenance: {
      refined_petroil: 3,
      low_calibre_ammunition: 2,
      small_arms: 2,
      aluminium: 1,
      high_calibre_ammunition: 1,
      machine_parts: 1,
      pharmaceuticals: 1,
      regular_steel: 1,
      rubber: 1,
      money: 1350,

      aeroplanes_cp: 8
    },
    manpower_cost: {
      soldiers: 2360
    },
    quantity: 20
  },
  rocket_interceptors: {
    name: "Rocket Interceptors",
    singular: "Rocket Interceptor",

    attack: 550,
    defence: 2200,
    movement: 962.388,
    manoeuvre: 7,
    initiative: 1,
    range: 10,

    cost: {
      machine_parts: 10,
      refined_petroil: 10,
      aluminium: 6,
      rubber: 6,
      small_arms: 4,
      low_calibre_ammunition: 5,
      glass: 2,
      stainless_steel: 2,
      turbines: 2,
      electric_gear: 1,
      turbines: 1,
      money: 4000,

      aeroplanes_cp: 30
    },
    maintenance: {
      refined_petroil: 4,
      machine_parts: 3,
      low_calibre_ammunition: 3,
      small_arms: 2,
      aluminium: 1,
      pharmaceuticals: 1,
      rubber: 1,
      money: 2500,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 2500
    },
    quantity: 20
  },
  jet_fighters: {
    name: "Jet Fighters",
    singular: "Jet Fighter",
    type: ["can_bomb"],

    attack: 850,
    defence: 2500,
    manoeuvre: 6,
    movement: 2414,
    initiative: 5,
    range: 40,

    cost: {
      high_calibre_ammunition: 8,
      aluminium: 10,
      machine_parts: 8,
      ferrochromium: 6,
      small_arms: 5,
      low_calibre_ammunition: 4,
      capacitors: 4,
      glass: 4,
      rubber: 4,
      radios: 4,
      resistors: 2,
      stainless_steel: 2,
      turbines: 2,

      money: 4000,
      aeroplanes_cp: 20
    },
    maintenance: {
      refined_petroil: 5,
      machine_parts: 3,
      high_calibre_ammunition: 2,
      small_arms: 2,
      electric_gear: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      resistors: 1,
      rubber: 1,

      aeroplanes_cp: 12,
      money: 2000
    },
    manpower_cost: {
      soldiers: 1200
    },
    quantity: 20
  },
  multirole_fighters: {
    name: "Multirole Fighters",
    singular: "Multirole Fighter",
    type: ["can_bomb"],

    attack: 1000,
    defence: 3000,
    manoeuvre: 6,
    movement: 1482,
    initiative: 4,
    range: 50,

    cost: {
      ammunition: 15,
      machine_parts: 15,
      aluminium: 12,
      small_arms: 10,
      copper_wire: 8,
      glass: 6,
      rubber: 6,
      refined_petroil: 5,
      integrated_circuits: 4,
      gold: 3,
      cameras: 2,
      turbines: 2,
      radios: 2,
      heavy_weaponry: 1,
      lasers: 1,
      money: 5000,

      aeroplanes_cp: 20
    },
    maintenance: {
      refined_petroil: 6,
      machine_parts: 5,
      high_calibre_ammunition: 4,
      heavy_weaponry: 2,
      low_calibre_ammunition: 2,
      small_arms: 3,
      film: 2,
      silicon: 2,
      copper_wire: 1,
      explosives: 1,
      integrated_circuits: 1,
      pharmaceuticals: 1,
      rubber: 1,

      aeroplanes_cp: 15,
      money: 4000
    },
    manpower_cost: {
      soldiers: 1360
    },
    quantity: 20
  },
  drones: {
    name: "Drones",
    singular: "Drone",
    type: ["can_bomb"],

    attack: 1200,
    defence: 50,
    manoeuvre: 2,
    movement: 482.80,
    initiative: 5,
    range: 50,

    cost: {
      low_calibre_ammunition: 10,
      aluminium: 5,
      stainless_steel: 5,
      glass: 4,
      high_calibre_ammunition: 4,
      integrated_circuits: 4,
      cameras: 2,
      computers: 2,
      radios: 1,
      refined_petroil: 2,
      regular_steel: 2,
      rubber: 2,
      lasers: 1,
      money: 20000,

      aeroplanes_cp: 5
    },
    maintenance: {
      electric_gear: 3,
      film: 2,
      high_calibre_ammunition: 1,
      integrated_circuits: 1,
      low_calibre_ammunition: 1,
      rubber: 1,
      small_arms: 1,

      aeroplanes_cp: 10,
      money: 3000
    },
    manpower_cost: {
      soldiers: 100
    },
    quantity: 20
  },
  stealth_fighters: {
    name: "Stealth Fighters",
    singular: "Stealth Fighter",
    type: ["can_bomb"],

    attack: 1100,
    defnece: 3200,
    manoeuvre: 8,
    movement: 1931.21,
    initiative: 3,
    range: 50,

    cost: {
      high_calibre_ammunition: 20,
      low_calibre_ammunition: 20,
      copper_wire: 10,
      integrated_circuits: 15,
      computers: 12,
      machine_parts: 8,
      glass: 6,
      rubber: 6,
      refined_petroil: 4,
      turbines: 4,
      lasers: 2,
      money: 8000,

      aeroplanes_cp: 30
    },
    maintenance: {
      refined_petroil: 6,
      high_calibre_ammunition: 5,
      low_calibre_ammunition: 4,
      electric_gear: 4,
      small_arms: 4,
      integrated_circuits: 2,
      aluminium: 1,
      gold: 1,
      pharmaceuticals: 1,
      rubber: 1,

      aeroplanes_cp: 20,
      money: 4500
    },
    manpower_cost: {
      soldiers: 1360
    },
    quantity: 20
  },

  //Air Units - Bombers
  early_bombers: {
    name: "Early Bombers",
    singular: "Early Bomber",
    type: ["can_bomb"],

    attack: 900,
    defence: 50,
    manoeuvre: 1,
    movement: 173.81,
    initiative: 2,
    range: 6,

    cost: {
      regular_steel: 10,
      lumber: 8,
      fabric: 6,
      high_calibre_ammunition: 7,
      machine_parts: 6,
      small_arms: 3,
      refined_petroil: 5,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      high_calibre_ammunition: 2,
      explosives: 2,
      refined_petroil: 2,
      machine_parts: 1,
      pharmaceuticals: 1,
      regular_steel: 1,

      aeroplanes_cp: 4,
      money: 800
    },
    manpower_cost: {
      soldiers: 320
    },
    quantity: 20
  },
  interwar_bombers: {
    name: "Interwar Bombers",
    singular: "Interwar Bomber",
    type: ["can_bomb"],

    attack: 1250,
    defence: 150,
    manoeuvre: 2,
    movement: 260.71,
    initiative: 3,
    range: 20,

    cost: {
      aluminium: 12,
      high_calibre_ammunition: 10,
      machine_parts: 8,
      small_arms: 6,
      lumber: 5,
      refined_petroil: 5,
      low_calibre_ammunition: 4,
      glass: 2,
      regular_steel: 2,
      cameras: 1,
      money: 3000,

      aeroplanes_cp: 25
    },
    maintenance: {
      explosives: 4,
      high_calibre_ammunition: 2,
      refined_petroil: 2,
      machine_parts: 2,
      film: 1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      regular_steel: 1,

      aeroplanes_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 400
    },
    quantity: 20
  },
  bombers: {
    name: "Bombers",
    singular: "Bomber",
    type: ["can_bomb"],

    attack: 1500,
    defence: 250,
    manoeuvre: 2,
    movement: 437.74,
    initiative: 3,
    range: 30,

    cost: {
      aluminium: 15,
      high_calibre_ammunition: 15,
      small_arms: 8,
      refined_petroil: 7,
      electric_gear: 4,
      glass: 4,
      machine_parts: 4,
      rubber: 4,
      regular_steel: 3,
      cameras: 2,
      money: 5000,

      aeroplanes_cp: 25
    },
    maintenance: {
      explosives: 6,
      high_calibre_ammunition: 4,
      refined_petroil: 3,
      machine_parts: 3,
      film: 2,
      pharmaceuticals: 1,
      radios: 2,
      regular_steel: 1,
      rubber: 1,

      aeroplanes_cp: 8,
      money: 1800
    },
    manpower_cost: {
      soldiers: 840
    },
    quantity: 20
  },
  strategic_bombers: {
    name: "Strategic Bombers",
    singular: "Strategic Bomber",
    type: ["can_bomb"],

    attack: 1700,
    defence: 500,
    manoeuvre: 2,
    movement: 960,
    initiative: 5,
    range: 80,

    cost: {
      aluminium: 25,
      high_calibre_ammunition: 15,
      machine_parts: 15,
      copper_wire: 10,
      electric_gear: 10,
      refined_petroil: 10,
      glass: 6,
      regular_steel: 5,
      cameras: 4,
      rubber: 4,
      radios: 2,
      turbines: 4,
      money: 12000,

      aeroplanes_cp: 50
    },
    maintenance: {
      explosives: 8,
      refined_petroil: 5,
      ammunition: 4,
      machine_parts: 4,
      film: 4,
      electric_gear: 1,
      pharmaceuticals: 1,
      regular_steel: 1,
      rubber: 1,

      aeroplanes_cp: 12,
      money: 2500
    },
    manpower_cost: {
      soldiers: 840
    },
    quantity: 20
  },
  stealth_bombers: {
    name: "Stealth Bombers",
    singular: "Stealth Bomber",
    type: ["can_bomb"],

    attack: 2500,
    defence: 700,
    manoeuvre: 5,
    movement: 1010.67,
    initiative: 4,
    range: 100,

    cost: {
      aluminium: 25,
      high_calibre_ammunition: 15,
      machine_parts: 15,
      copper_wire: 10,
      electric_gear: 10,
      refined_petroil: 10,
      cameras: 8,
      glass: 8,
      rubber: 6,
      regular_steel: 5,
      lasers: 4,
      radios: 3,
      turbines: 4,
      money: 12000,

      aeroplanes_cp: 50
    },
    maintenance: {
      film: 8,
      refined_petroil: 6,
      machine_parts: 5,
      high_calibre_ammunition: 4,
      aluminium: 2,
      electric_gear: 2,
      pharmaceuticals: 1,
      rubber: 1,

      aeroplanes_cp: 20,
      money: 4000
    },
    manpower_cost: {
      soldiers: 1600
    },
    quantity: 20
  },
  ai_bombers: {
    name: "AI Bombers",
    singular: "AI Bomber",
    type: ["can_bomb"],

    attack: 2800,
    defence: 1000,
    manoeuvre: 5,
    movement: 999.40,
    initiative: 6,
    range: 120,

    cost: {
      aluminium: 20,
      machine_parts: 18,
      integrated_circuits: 14,
      cameras: 12,
      copper_wire: 12,
      ammunition: 10,
      computers: 8,
      glass: 8,
      stainless_steel: 8,
      regular_steel: 7,
      rubber: 6,
      electric_gear: 5,
      refined_petroil: 5,
      lasers: 4,
      turbines: 4,
      money: 10000,

      aeroplanes_cp: 50
    },
    maintenance: {
      refined_petroil: 5,
      machine_parts: 5,
      high_calibre_ammunition: 4,
      electric_gear: 3,
      small_arms: 2,
      computers: 1,
      pharmaceuticals: 1,
      rubber: 1,

      aeroplanes_cp: 15,
      money: 8000
    },
    manpower_cost: {
      soldiers: 100
    },
    quantity: 20
  },

  //Air Units Helicopters
  scout_helicopters: {
    name: "Scout Helicopters",
    singular: "Scout Helicopter",
    type: ["helicopter"],

    attack: 200,
    defence: 50,
    manoeuvre: 50,
    movement: 281.64,
    initiative: 1,
    range: 3,

    cost: {
      aluminium: 3,
      machine_parts: 3,
      electric_gear: 1,
      regular_steel: 1,
      small_arms: 1,
      cameras: 1,
      radios: 1,
      refined_petroil: 1,
      money: 1000,

      aeroplanes_cp: 5
    },
    maintenance: {
      refined_petroil: 2,
      film: 1,
      pharmaceuticals: 1,
      machine_parts: 1,

      aeroplanes_cp: 8,
      money: 600
    },
    manpower_cost: {
      soldiers: 160
    },
    quantity: 20
  },
  multirole_helicopters: {
    name: "Multirole Helicopters",
    singular: "Multirole Helicopter",
    type: ["helicopter"],

    attack: 1400,
    defence: 150,
    manoeuvre: 5,
    movement: 204,
    initiative: 3,
    range: 10,

    cost: {
      low_calibre_ammunition: 8,
      aluminium: 5,
      small_arms: 5,
      machine_parts: 5,
      electric_gear: 4,
      regular_steel: 3,
      cameras: 2,
      glass: 2,
      radios: 2,
      refined_petroil: 2,
      stainless_steel: 2,
      money: 3000,

      aeroplanes_cp: 10
    },
    maintenance: {
      refined_petroil: 4,
      low_calibre_ammunition: 4,
      small_arms: 2,
      machine_parts: 2,
      explosives: 1,
      film: 1,
      pharmaceuticals: 1,

      aeroplanes_cp: 10,
      money: 1200
    },
    manpower_cost: {
      soldiers: 680
    },
    quantity: 20
  },
  modern_helicopters: {
    name: "Modern Helicopters",
    singular: "Modern Helicopter",
    type: ["helicopter"],

    attack: 1800,
    defence: 300,
    manoeuvre: 6,
    movement: 365.32,
    initiative: 3,
    range: 20,

    cost: {
      high_calibre_ammunition: 8,
      integrated_circuits: 8,
      aluminium: 7,
      stainless_steel: 4,
      small_arms: 6,
      glass: 4,
      low_calibre_ammunition: 4,
      machine_parts: 4,
      electric_gear: 4,
      gold: 3,
      computers: 2,
      radios: 2,
      refined_petroil: 2,
      regular_steel: 2,
      rubber: 2,
      televisions: 1,
      turbines: 1,
      money: 3500,

      aeroplanes_cp: 10
    },
    maintenance: {
      high_calibre_ammunition: 4,
      refined_petroil: 4,
      small_arms: 4,
      machine_parts: 3,
      electric_gear: 2,
      integrated_circuits: 2,
      low_calibre_ammunition: 2,
      pharmaceuticals: 1,

      aeroplanes_cp: 12,
      money: 2000
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 20
  },

  //Other Air Units
  torpedo_bombers: {
    name: "Torpedo Bombers",
    singular: "Torpedo Bomber",

    attack: 2700,
    defence: 500,
    manoeuvre: 4,
    movement: 90,
    initiative: 5,
    range: 5,

    cost: {
      aluminium: 5,
      low_calibre_ammunition: 5,
      fabric: 4,
      lumber: 3,
      refined_petroil: 3,
      radios: 1,
      regular_steel: 1,
      money: 2500,

      aeroplanes_cp: 10
    },
    maintenance: {
      refined_petroil: 4,
      machine_parts: 2,
      torpedoes: 2,
      pharmaceuticals: 1,

      aeroplanes_cp: 8,
      money: 750
    },
    manpower_cost: {
      soldiers: 1000
    }
  },
  naval_bombers: {
    name: "Naval Bombers",
    singular: "Naval Bomber",

    attack: 2000,
    defence: 550,
    manoeuvre: 7,
    movement: 410.38,
    initiative: 3,
    range: 8,

    cost: {
      aluminium: 6,
      lumber: 2,
      low_calibre_ammunition: 3,
      refined_petroil: 3,
      rubber: 2,
      regular_steel: 1,
      money: 1500,

      aeroplanes_cp: 10
    },
    maintenance: {
      explosives: 4,
      refined_petroil: 4,
      machine_parts: 3,
      low_calibre_ammunition: 2,
      pharmaceuticals: 1,
      radios: 1,
      rubber: 1,
      small_arms: 1,

      aeroplanes_cp: 10,
      money: 900
    },
    manpower_cost: {
      soldiers: 1000
    },
    quantity: 20
  }
};
