config.units.aeroplanes = {
  name: "Aeroplanes",
  icon: "aeroplanes",
  type: "air",

  //Air Units - Pre-WW1
  reconaissance_balloons: {
    name: "Reconaissance Balloons",
    singular: "Reconaissance Balloon",

    attack: 20,
    defence: 200,
    manoeuvre: 8,
    movement: 14.48,
    initiative: 1,

    cost: {
      lumber: 1,
      coal: 1,
      money: 500,

      aeroplanes_cp: 5
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      lumber: 3,
      coal: 1,
      food: 1,
      money: 1000,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 25000
    },
    quantity: 20
  },
  zeppelins: {
    name: "Zeppelins",
    singular: "Zeppelin",
    type: ["can_bomb"],

    attack: 500,
    defence: 350,
    manoeuvre: 6,
    movement: 32,
    initiative: 3,

    cost: {
      steel: 5,
      lumber: 2,
      coal: 3,
      food: 3,
      money: 2500,

      aeroplanes_cp: 20
    },
    manpower_cost: {
      soldiers: 25000
    },
    quantity: 20
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

    cost: {
      steel: 5,
      lumber: 2,
      coal: 3,
      food: 3,
      money: 2500,

      aeroplanes_cp: 20
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      steel: 5,
      lumber: 5,
      small_arms: 2,
      machine_parts: 2,
      ammunition: 3,
      refined_petroil: 1,
      money: 1250,

      aeroplanes_cp: 15
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      steel: 7,
      lumber: 3,
      small_arms: 3,
      machine_parts: 4,
      ammunition: 3,
      refined_petroil: 2,
      money: 1500,

      aeroplanes_cp: 15
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      steel: 5,
      lumber: 2,
      small_arms: 3,
      machine_parts: 5,
      ammunition: 3,
      refined_petroil: 3,
      money: 1500,

      aeroplanes_cp: 20
    },
    manpower_cost: {
      soldiers: 25000
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
    manpower_cost: {
      soldiers: 25000
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
    manpower_cost: {
      soldiers: 25000
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
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 10,
      machine_parts: 8,
      small_arms: 5,
      ammunition: 12,
      copper: 6,
      gold: 2,
      iron: 5,
      money: 4000,

      aeroplanes_ap: 20
    },
    manpower_cost: {
      soldiers: 25000
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
    manpower_cost: {
      soldiers: 25000
    },
    quantity: 20
  },
  drones: {
    name: "Drones",
    singular: "Drone",

    attack: 1200,
    defence: 50,
    manoeuvre: 2,
    movement: 482.80,
    initiative: 5,

    cost: {
      aluminium: 5,
      steel: 5,
      ammunition: 10,
      gold: 4,
      refined_petroil: 2,
      money: 10000,

      aeroplanes_cp: 5
    },
    manpower_cost: {
      soldiers: 25000
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
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      steel: 10,
      lumber: 8,
      small_arms: 3,
      machine_parts: 6,
      ammunition: 7,
      refined_petroil: 5,
      money: 2500,

      aeroplanes_cp: 20
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 12,
      steel: 2,
      small_arms: 6,
      machine_parts: 8,
      lumber: 5,
      ammunition: 10,
      refined_petroil: 5,
      money: 3000,

      aeroplanes_cp: 25
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 15,
      steel: 3,
      small_arms: 8,
      machine_parts: 8,
      ammunition: 15,
      refined_petroil: 7,
      money: 5000,

      aeroplanes_cp: 25
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 25,
      steel: 5,
      machine_parts: 15,
      copper: 10,
      gold: 10,
      ammunition: 15,
      refined_petroil: 10,
      money: 12000,

      aeroplanes_cp: 50
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 25,
      steel: 5,
      machine_parts: 15,
      copper: 10,
      gold: 10,
      ammunition: 15,
      refined_petroil: 10,
      money: 12000,

      aeroplanes_cp: 50
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 20,
      steel: 7,
      machine_parts: 18,
      copper: 12,
      gold: 5,
      ammunition: 10,
      refined_petroil: 5,
      money: 10000,

      aeroplanes_cp: 50
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 3,
      steel: 1,
      small_arms: 1,
      machine_parts: 3,
      refined_petroil: 1,
      money: 1000,

      aeroplanes_cp: 5
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 5,
      steel: 3,
      small_arms: 5,
      machine_parts: 5,
      ammunition: 8,
      refined_petroil: 2,
      money: 3000,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 7,
      steel: 2,
      small_arms: 6,
      machine_parts: 8,
      ammunition: 8,
      gold: 3,
      refined_petroil: 2,
      money: 3500,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 5,
      ammunition: 5,
      lumber: 3,
      refined_petroil: 3,
      money: 2500,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 25000
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

    cost: {
      aluminium: 6,
      lumber: 2,
      ammunition: 3,
      refined_petroil: 3,
      money: 1500,

      aeroplanes_cp: 10
    },
    manpower_cost: {
      soldiers: 25000
    },
    quantity: 20
  }
};
