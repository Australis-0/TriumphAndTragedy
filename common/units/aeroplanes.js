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
      lumber: 1,
      coal: 1,
      money: 500,

      aeroplanes_cp: 5
    },
    maintenance: {
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
      coal: 1,
      food: 1,
      money: 1000,

      aeroplanes_cp: 10
    },
    maintenance: {
      coal: 1,

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
      regular_steel: 5,
      lumber: 2,
      coal: 3,
      food: 3,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      ammunition: 2,
      coal: 1,
      machine_parts: 1,
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
      lumber: 2,
      coal: 3,
      food: 3,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      ammunition: 1,
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
      ammunition: 3,
      refined_petroil: 1,
      money: 1250,

      aeroplanes_cp: 15
    },
    maintenance: {
      ammunition: 1,
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
      machine_parts: 4,
      ammunition: 3,
      refined_petroil: 2,
      money: 1500,

      aeroplanes_cp: 15
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      small_arms: 1,
      regular_steel: 1,

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
      lumber: 2,
      small_arms: 3,
      machine_parts: 5,
      ammunition: 3,
      refined_petroil: 3,
      money: 1500,

      aeroplanes_cp: 20,
      money: 900
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      machine_parts: 1,
      small_arms: 1,
      regular_steel: 1,

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
      aluminium: 5,
      lumber: 3,
      small_arms: 3,
      machine_parts: 5,
      small_arms: 5,
      lumber: 3,
      ammunition: 8,
      refined_petroil: 5,
      money: 2500,

      aeroplanes_cp: 25
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      machine_parts: 2,
      small_arms: 1,
      regular_steel: 1,

      aeroplanes_cp: 7,
      money: 1000
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
      machine_parts: 7,
      small_arms: 5,
      lumber: 3,
      ammunition: 8,
      refined_petroil: 5,
      money: 2500,

      aeroplanes_cp: 25
    },
    maintenance: {
      refined_petroil: 3,
      ammunition: 2,
      small_arms: 2,
      aluminium: 1,
      machine_parts: 1,
      regular_steel: 1,
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
      aluminium: 6,
      machine_parts: 10,
      small_arms: 4,
      iron: 3,
      ammunition: 5,
      refined_petroil: 10,
      money: 4000,

      aeroplanes_cp: 30
    },
    maintenance: {
      refined_petroil: 4,
      machine_parts: 3,
      ammunition: 3,
      small_arms: 2,
      aluminium: 1,

      aeroplanes_cp: 10,
      money: 2500
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
      aluminium: 10,
      machine_parts: 8,
      small_arms: 5,
      ammunition: 12,
      copper: 6,
      gold: 2,
      iron: 5,
      money: 4000,

      aeroplanes_cp: 20
    },
    maintenance: {
      refined_petroil: 5,
      machine_parts: 4,
      ammunition: 3,
      small_arms: 2,
      aluminium: 1,

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
      aluminium: 12,
      machine_parts: 15,
      small_arms: 10,
      ammunition: 15,
      copper: 8,
      gold: 3,
      refined_petroil: 5,
      money: 5000,

      aeroplanes_cp: 20
    },
    maintenance: {
      refined_petroil: 6,
      machine_parts: 5,
      ammunition: 4,
      small_arms: 3,
      aluminium: 1,
      gold: 1,

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
      aluminium: 5,
      regular_steel: 5,
      ammunition: 10,
      gold: 4,
      refined_petroil: 2,
      money: 20000,

      aeroplanes_cp: 5
    },
    maintenance: {
      machine_parts: 3,
      small_arms: 1,
      gold: 1,

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
      ammunition: 20,
      machine_parts: 20,
      copper: 10,
      gold: 15,
      ammunition: 20,
      refined_petroil: 4,
      money: 8000,

      aeroplanes_cp: 30
    },
    maintenance: {
      machine_parts: 6,
      refined_petroil: 6,
      ammunition: 5,
      small_arms: 4,
      gold: 2,
      aluminium: 1,

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
      small_arms: 3,
      machine_parts: 6,
      ammunition: 7,
      refined_petroil: 5,
      money: 2500,

      aeroplanes_cp: 20
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      machine_parts: 1,
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
      regular_steel: 2,
      small_arms: 6,
      machine_parts: 8,
      lumber: 5,
      ammunition: 10,
      refined_petroil: 5,
      money: 3000,

      aeroplanes_cp: 25
    },
    maintenance: {
      ammunition: 2,
      refined_petroil: 2,
      machine_parts: 2,
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
      regular_steel: 3,
      small_arms: 8,
      machine_parts: 8,
      ammunition: 15,
      refined_petroil: 7,
      money: 5000,

      aeroplanes_cp: 25
    },
    maintenance: {
      ammunition: 4,
      refined_petroil: 3,
      machine_parts: 3,
      regular_steel: 1,

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
      regular_steel: 5,
      machine_parts: 15,
      copper: 10,
      gold: 10,
      ammunition: 15,
      refined_petroil: 10,
      money: 12000,

      aeroplanes_cp: 50
    },
    maintenance: {
      refined_petroil: 5,
      ammunition: 4,
      machine_parts: 4,
      regular_steel: 1,

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
      regular_steel: 5,
      machine_parts: 15,
      copper: 10,
      gold: 10,
      ammunition: 15,
      refined_petroil: 10,
      money: 12000,

      aeroplanes_cp: 50
    },
    maintenance: {
      refined_petroil: 6,
      machine_parts: 5,
      ammunition: 4,
      aluminium: 2,
      gold: 2,

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
      regular_steel: 7,
      machine_parts: 18,
      copper: 12,
      gold: 5,
      ammunition: 10,
      refined_petroil: 5,
      money: 10000,

      aeroplanes_cp: 50
    },
    maintenance: {
      refined_petroil: 5,
      machine_parts: 5,
      ammunition: 4,
      gold: 3,
      small_arms: 2,

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
      regular_steel: 1,
      small_arms: 1,
      machine_parts: 3,
      refined_petroil: 1,
      money: 1000,

      aeroplanes_cp: 5
    },
    maintenance: {
      refined_petroil: 2,
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
      aluminium: 5,
      regular_steel: 3,
      small_arms: 5,
      machine_parts: 5,
      ammunition: 8,
      refined_petroil: 2,
      money: 3000,

      aeroplanes_cp: 10
    },
    maintenance: {
      refined_petroil: 4,
      ammunition: 4,
      small_arms: 2,
      machine_parts: 2,

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
      aluminium: 7,
      regular_steel: 2,
      small_arms: 6,
      machine_parts: 8,
      ammunition: 8,
      gold: 3,
      refined_petroil: 2,
      money: 3500,

      aeroplanes_cp: 10
    },
    maintenance: {
      machine_parts: 5,
      refined_petroil: 4,
      ammunition: 4,
      small_arms: 4,

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
      ammunition: 5,
      lumber: 3,
      refined_petroil: 3,
      money: 2500,

      aeroplanes_cp: 10
    },
    maintenance: {
      machine_parts: 2,
      ammunition: 2,

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
      ammunition: 3,
      refined_petroil: 3,
      money: 1500,

      aeroplanes_cp: 10
    },
    maintenance: {
      machine_parts: 3,
      ammunition: 2,
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
