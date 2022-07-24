config.units.infantry = {
  name: "Infantry",
  icon: "active_personnel",
  type: "land",

  //Early Game Infantry Units
  skirmishers: {
    name: "Skirmishers",
    singular: "Skirmisher",

    attack: 1,
    defence: 3,
    manoeuvre: 2,
    initiative: 1,

    cost: {
      wood: 1,
      iron: 1,
      food: 2,
      money: 500,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  spearmen: {
    name: "Spearmen",
    singular: "Spearman",

    attack: 2,
    defence: 1,
    manoeuvre: 1,
    initiative: 2,

    cost: {
      wood: 2,
      iron: 1,
      food: 2,
      money: 700,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  swordsmen: {
    name: "Swordsmen",
    singular: "Swordsman",

    attack: 3,
    defence: 2,
    manoeuvre: 0,
    initiative: 3,

    cost: {
      wood: 1,
      iron: 2,
      food: 3,
      money: 1000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  knights: {
    name: "Knights",
    singular: "Knight",

    attack: 5,
    defence: 1,
    manoeuvre: 2,
    initative: 2,

    cost: {
      iron: 3,
      food: 5,
      money: 2500,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  archers: {
    name: "Archers",
    singular: "Archer",

    attack: 2,
    defence: 1,
    manoeuvre: 1,
    initative: 3,

    cost: {
      lumber: 2,
      food: 3,
      money: 1000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  longbowmen: {
    name: "Longbowmen",
    singular: "Longbowman",

    attack: 3,
    defence: 1,
    manoeuvre: 1,
    initiative: 2,

    cost: {
      lumber: 3,
      food: 4,
      money: 2000,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  pike_and_square: {
    name: "Pike and Square",
    singular: "Pikeman",

    attack: 1,
    defence: 3,
    manoeuvre: 1,
    initiative: 2,

    cost: {
      wood: 1,
      iron: 2,
      food: 3,
      money: 850,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  tercio: {
    name: "Tercio",

    attack: 6,
    defence: 4,
    manoeuvre: 1,
    initiative: 2,

    cost: {
      wood: 1,
      iron: 5,
      lead: 2,
      food: 3,
      money: 2500,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },

  //Early Modern Ranged Units
  arquebusiers: {
    name: "Arquebusiers",
    singular: "Arquebusier",

    attack: 4,
    defence: 1,
    manoeuvre: 2,
    initative: 2,

    quantity: 10000,
    cost: {
      lumber: 3,
      iron: 1,
      lead: 1,
      food: 2,
      money: 1500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  snaplock_infantry: {
    name: "Snaplock Infantry",

    attack: 5,
    defence: 1,
    manoeuvre: 2,
    initiative: 2,

    quantity: 10000,
    cost: {
      lumber: 3,
      iron: 2,
      lead: 3,
      food: 2,
      money: 1500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  snaphaunce_infantry: {
    name: "Snaphaunce Infantry",

    attack: 5,
    defence: 2,
    manoeuvre: 3,
    initiative: 3,

    cost: {
      lumber: 4,
      iron: 2,
      lead: 3,
      food: 2,
      money: 1500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  matchlock_infantry: {
    name: "Matchlock Infantry",
    singular: "Matchlock Infantryman",

    attack: 6,
    defence: 2,
    manoeuvre: 2,
    initiative: 3,

    cost: {
      lumber: 4,
      iron: 2,
      lead: 5,
      food: 3,
      money: 2000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  wheellock_infantry: {
    name: "Wheellock Infantry",
    name: "Wheellock Infantryman",

    attack: 6,
    defence: 3,
    manoeuvre: 1,
    initiative: 4,

    cost: {
      lumber: 5,
      iron: 2,
      lead: 5,
      food: 3,
      money: 2000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  flintlock_infantry: {
    name: "Flintlock Infantry",
    singular: "Flintlock Infantryman",

    attack: 10,
    defence: 2,
    manoeuvre: 1,
    initiative: 5,

    cost: {
      lumber: 5,
      iron: 3,
      lead: 5,
      food: 3,
      money: 1500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  musketeers: {
    name: "Musketeers",
    singular: "Musketeer",

    attack: 12,
    defence: 5,
    manoeuvre: 1,
    initiative: 5,

    cost: {
      lumber: 5,
      iron: 3,
      lead: 4,
      food: 4,
      money: 1000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  line_infantry: {
    name: "Line Infantry",
    singular: "Line Infantryman",

    attack: 15,
    defence: 4,
    manoeuvre: 0,
    initiative: 5,

    cost: {
      lumber: 5,
      uniforms: 5,
      iron: 3,
      ammunition: 5,
      food: 2,
      money: 1000,

      ground_units_cp: 10,
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  fusiliers: {
    name: "Fusiliers",
    singular: "Fusilier",

    attack: 18,
    defence: 6,
    manoeuvre: 1,
    initiative: 6,

    cost: {
      lumber: 5,
      uniforms: 10,
      iron: 2,
      ammunition: 10,
      food: 4,
      money: 3500,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  napoleonic_infantry: {
    name: "Napoleonic Infantry",
    singular: "Napoleonic Infantryman",

    attack: 10,
    defence: 3,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      lumber: 5,
      uniforms: 5,
      iron: 1,
      ammunition: 5,
      food: 2,
      money: 1000,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  light_infantry: {
    name: "Light Infantry",
    singular: "Light Infantryman",

    attack: 5,
    defence: 1,
    manoeuvre: 5,
    initiative: 6,

    cost: {
      lumber: 3,
      uniforms: 5,
      iron: 1,
      ammunition: 3,
      food: 1,
      money: 1000,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  rangers: {
    name: "Rangers",
    singular: "Ranger",

    attack: 7,
    defence: 3,
    manoeuvre: 6,
    initiative: 5,

    cost: {
      lumbe: 10,
      ammunition: 5,
      food: 4,
      money: 1500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  guards: {
    name: "Guards",
    singular: "Guard",

    attack: 20,
    defence: 5,
    manoeuvre: 2,
    initiative: 4,

    cost: {
      lumber: 15,
      uniforms: 10,
      iron: 2,
      ammunition: 10,
      food: 5,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  riflemen: {
    name: "Riflemen",
    singular: "Rifleman",

    attack: 14,
    defence: 10,
    manoeuvre: 3,
    initiative: 3,

    cost: {
      lumber: 10,
      uniforms: 5,
      iron: 5,
      ammunition: 5,
      food: 3,
      money: 2000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  marines: {
    name: "Marines",
    singular: "Marine",

    attack: 20,
    defence: 3,
    manoeuvre: 5,
    initiative: 1,

    cost: {
      lumber: 15,
      uniforms: 10,
      iron: 5,
      ammunition: 5,
      food: 5,
      money: 3000,

      ground_units_cp: 15
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  breechloaded_infantry: {
    name: "Breechloaded Infantry",

    attack: 18,
    defence: 20,
    manoeuvre: 2,
    initiative: 5,

    cost: {
      lumber: 5,
      uniforms: 5,
      steel: 5,
      ammunition: 5,
      food: 3,
      money: 3000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },

  //Great War Ranged Infantry Units
  franc_tireurs: {
    name: "Franc-Tireurs",
    singular: "Franc-Tireur",

    attack: 1,
    defence: 3,
    manoeuvre: 6,
    initiative: 1,

    cost: {
      wood: 1
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  bolt_action_infantry: {
    name: "Bolt-Action Infantry",

    attack: 12,
    defence: 20,
    manoeuvre: 7,
    initiative: 4,

    cost: {
      small_arms: 10,
      steel: 2,
      ammunition: 5,
      food: 2,
      money: 2500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  mg_companies: {
    name: "MG Companies",
    singular: "Machine Gunner",

    attack: 35,
    defence: 5,
    manoeuvre: 1,
    initiative: 4,

    cost: {
      small_arms: 20,
      ammunition: 10,
      lumber: 2,
      food: 5,
      money: 10000,

      ground_units_cp: 20,
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  great_war_infantry: {
    name: "Great War Infantry",
    singular: "Great War Soldier",

    attack: 10,
    defence: 25,
    manoeuvre: 5,
    initiative: 5,

    cost: {
      small_arms: 5,
      ammunition: 5,
      food: 3,
      money: 2000,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  shock_troops: {
    name: "Shock Troops",
    singular: "Shock Troop",

    attack: 20,
    defence: 5,
    manoeuvre: 6,
    initiative: 6,

    cost: {
      small_arms: 10,
      lumber: 10,
      steel: 5,
      ammunition: 10,
      food: 6,
      money: 5000,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },

  //Modern Ranged Infantry Units
  freikorps: {
    name: "Freikorps",
    singular: "Freiwilliger",

    attack: 12,
    defence: 5,
    manoeuvre: 2,
    initiative: 5,

    cost: {
      small_arms: 5,
      wood: 5,
      steel: 2,
      refined_petroil: 1,
      food: 2,
      money: 1500,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  motorised_infantry: {
    name: "Motorised Infantry",
    aliases: ["motorized_infantry"],

    attack: 15,
    defence: 5,
    manoeuvre: 5,
    initiative: 7,

    cost: {
      small_arms: 10,
      steel: 10,
      refined_petroil: 5,
      food: 4,
      money: 2500,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  paratroopers: {
    name: "Paratroopers",

    attack: 5,
    defence: 3,
    manoeuvre: 8,
    initiative: 6,

    quantity: 10000,
    cost: {
      small_arms: 5,
      artillery: 1,
      lumber: 5,
      refined_petroil: 5,
      food: 5,
      money: 5000,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  special_forces: {
    name: "Special Forces",

    attack: 25,
    defence: 3,
    manoeuvre: 8,
    initiative: 8,

    cost: {
      small_arms: 10,
      artillery: 1,
      steel: 5,
      ammunition: 15,
      refined_petroil: 5,
      food: 10,
      money: 20000,

      ground_units_cp: 40
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  modern_infantry: {
    name: "Modern Infantry",

    attack: 20,
    defence: 35,
    manoeuvre: 4,
    initiative: 5,

    cost: {
      small_arms: 5,
      ammunition: 10,
      uniforms: 5,
      steel: 5,
      food: 3,
      money: 3500,

      ground_units_cp: 5
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  combined_arms_infantry: {
    name: "Combined Arms Infantry",

    attack: 25,
    defence: 50,
    manoeuvre: 3,
    initiative: 5,

    cost: {
      small_arms: 10,
      ammunition: 10,
      uniforms: 5,
      artillery: 1,
      steel: 8,
      refined_petroil: 5,
      food: 3,
      money: 5000,

      ground_units_cp: 10
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  contemporary_infantry: {
    name: "Contemporary Infantry",

    attack: 30,
    defence: 65,
    manoeuvre: 3,
    initiative: 4,

    cost: {
      small_arms: 15,
      ammunition: 10,
      machine_parts: 10,
      uniforms: 5,
      gold: 1,
      food: 5,
      money: 5500,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  augmented_infantry: {
    name: "Augmented Infantry",

    attack: 40,
    defence: 15,
    manoeuvre: 1,
    initiative: 9,

    cost: {
      small_arms: 15,
      ammunition: 10,
      artillery: 3,
      machine_parts: 15,
      gold: 5,
      food: 10,
      money: 7000,

      ground_units_cp: 40
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  }
};
