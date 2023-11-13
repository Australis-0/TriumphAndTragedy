config.units.cavalry = {
  name: "Cavalry",
  icon: "manpower",
  type: "land",

  branch_name: "Cavalry",

  //Cavalry Units
  lance_cavalry: {
    name: "Lance Cavalry",
    singular: "Lancer",

    attack: 75,
    defence: 25,
    manoeuvre: 3,
    movement: 12.87,
    initiative: 3,

    cost: {
      foods:3,
      iron: 3,
      wood: 1,
      money: 500,

      ground_units_cp: 10
    },
    maintenance: {
      foods:1,
      iron: 1,
      traditional_medicines: 1,
      wood: 1,

      ground_units_cp: 4,
      money: 600
    },
    manpower_cost: {
      soldiers: 1200
    },
    quantity: 800
  },
  heavy_cavalry: {
    name: "Heavy Cavalry",
    singular: "Cataphract",

    attack: 85,
    defence: 50,
    manoeuvre: 1,
    movement: 11.27,
    initiative: 4,

    cost: {
      foods:4,
      lumber: 2,
      regular_steel: 2,
      tools: 1,
      traditional_medicines: 1,
      money: 1000,

      ground_units_cp: 20
    },
    maintenance: {
      lumber: 1,
      foods:1,
      regular_steel: 1,

      ground_units_cp: 6,
      money: 800
    },
    manpower_cost: {
      soldiers: 900
    },
    quantity: 600
  },
  light_cavalry: {
    name: "Light Cavalry",
    singular: "Light Cavalryman",

    attack: 65,
    defence: 15,
    manoeuvre: 5,
    movement: 16.09,
    initiative: 6,

    cost: {
      wood: 1,
      iron: 1,
      foods:2,
      money: 250,

      ground_units_cp: 10
    },
    maintenance: {
      wood: 2,
      foods:1,
      iron: 1,
      traditional_medicines: 1,

      ground_units_cp: 5,
      money: 750
    },
    manpower_cost: {
      soldiers: 1200
    },
    quantity: 800
  },
  cuirassiers: {
    name: "Cuirassiers",
    singular: "Cuirassier",

    attack: 125,
    defence: 50,
    manoeuvre: 2,
    movement: 10.06,
    initiative: 5,

    cost: {
      iron: 6,
      foods:4,
      wood: 3,
      small_arms: 2,
      lead: 1,
      uniforms: 1,
      money: 1500,

      ground_units_cp: 10
    },
    maintenance: {
      gunpowder: 2,
      iron: 2,
      foods:1,
      lead: 1,
      traditional_medicines: 1,

      ground_units_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 900
    },
    quantity: 400
  },
  hussars: {
    name: "Hussars",
    singular: "Hussar",

    attack: 250,
    defence: 75,
    manoeuvre: 1,
    movement: 12.87,
    initiative: 6,

    cost: {
      foods:6,
      lumber: 5,
      lead: 3,
      regular_steel: 2,
      uniforms: 1,
      money: 2000,

      ground_units_cp: 20
    },
    maintenance: {
      gunpowder: 3,
      lumber: 2,
      foods:1,
      lead: 1,
      regular_steel: 1,
      tonics: 1,

      ground_units_cp: 8,
      money: 1500
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 400
  },
  dragoons: {
    name: "Dragoons",
    singular: "Dragoon",

    attack: 135,
    defence: 65,
    manoeuvre: 5,
    movement: 12.07,
    initiative: 5,

    cost: {
      foods:3,
      lumber: 1,
      iron: 1,
      lead: 1,
      small_arms: 1,
      uniforms: 1,
      money: 1000,

      ground_units_cp: 15
    },
    maintenance: {
      gunpowder: 2,
      lumber: 2,
      iron: 2,
      foods:1,
      lead: 1,
      regular_steel: 1,
      tonics: 1,

      ground_units_cp: 6,
      money: 1250
    },
    manpower_cost: {
      soldiers: 950
    },
    quantity: 600
  },
  uhlans: {
    name: "Uhlans",
    singular: "Uhlan",

    attack: 50,
    defence: 25,
    manoeuvre: 6,
    movement: 19.31,
    initiative: 4,

    cost: {
      low_calibre_ammunition: 5,
      foods:3,
      lumber: 2,
      small_arms: 2,
      regular_steel: 1,
      uniforms: 1,
      money: 800,

      ground_units_cp: 5
    },
    maintenance: {
      foods:1,
      iron: 1,
      low_calibre_ammunition: 1,
      lumber: 1,
      small_arms: 1,
      tonics: 1,
      uniforms: 1,

      ground_units_cp: 8,
      money: 800
    },
    manpower_cost: {
      soldiers: 1800
    },
    quantity: 1200
  },
  mounted_rifles: {
    name: "Mounted Rifles",
    singular: "Mounted Rifle",

    attack: 30,
    defence: 15,
    manoeuvre: 5,
    movement: 16.09,
    initiative: 2,

    cost: {
      foods:5,
      small_arms: 5,
      uniforms: 5,
      low_calibre_ammunition: 3,
      money: 2000,

      ground_units_cp: 10
    },
    maintenance: {
      small_arms: 2,
      uniforms: 2,
      low_calibre_ammunition: 1,
      lumber: 1,
      foods:1,
      pharmaceuticals: 1,

      ground_units_cp: 10,
      money: 1200
    },
    manpower_cost: {
      soldiers: 6800
    },
    quantity: 3400
  },
  modern_cavalry: {
    name: "Modern Cavalry",

    attack: 670,
    defence: 250,
    manoeuvre: 6,
    movement: 82.23,
    initiative: 1,

    cost: {
      foods:7,
      ap_rounds: 5,
      low_calibre_ammunition: 5,
      regular_steel: 5,
      heavy_weaponry: 5,
      humvees: 4,
      chassis: 2,
      refined_petroil: 2,
      money: 3000,

      ground_units_cp: 20
    },
    maintenance: {
      refined_petroil: 4,
      electric_gear: 2,
      machine_parts: 2,
      regular_steel: 2,
      small_arms: 2,
      foods:1,
      low_calibre_ammunition: 1,
      pharmaceuticals: 1,
      uniforms: 1,

      ground_units_cp: 6,
      money: 2500
    },
    manpower_cost: {
      soldiers: 6500
    },
    quantity: 120
  }
};
