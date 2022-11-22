config.units.cavalry = {
  name: "Cavalry",
  icon: "manpower",
  type: "land",

  branch_name: "Cavalry",

  //Cavalry Units
  lance_cavalry: {
    name: "Lance Cavalry",
    singular: "Lancer",

    attack: 6,
    defence: 2,
    manoeuvre: 3,
    movement: 12.87,
    initiative: 3,

    cost: {
      wood: 1,
      iron: 3,
      food: 3,
      money: 500,

      ground_units_cp: 10
    },
    maintenance: {
      wood: 1,
      food: 1,
      iron: 1,

      ground_units_cp: 4,
      money: 600
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  heavy_cavalry: {
    name: "Heavy Cavalry",
    singular: "Cataphract",

    attack: 5,
    defence: 3,
    manoeuvre: 1,
    movement: 11.27,
    initiative: 4,

    cost: {
      lumber: 2,
      steel: 2,
      food: 4,
      money: 1000,

      ground_units_cp: 20
    },
    maintenance: {
      lumber: 1,
      food: 1,
      iron: 1,

      ground_units_cp: 6,
      money: 800
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  light_cavalry: {
    name: "Light Cavalry",
    singular: "Light Cavalryman",

    attack: 5,
    defence: 1,
    manoeuvre: 5,
    movement: 16.09,
    initiative: 6,

    cost: {
      wood: 1,
      iron: 1,
      food: 2,
      money: 250,

      ground_units_cp: 10
    },
    maintenance: {
      wood: 2,
      food: 1,
      iron: 1,

      ground_units_cp: 5,
      money: 750
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  cuirassiers: {
    name: "Cuirassiers",
    singular: "Cuirassier",

    attack: 5,
    defence: 2,
    manoeuvre: 2,
    movement: 10.06,
    initiative: 5,

    cost: {
      wood: 3,
      iron: 6,
      lead: 1,
      food: 4,
      money: 1500,

      ground_units_cp: 10
    },
    maintenance: {
      iron: 2,
      food: 1,
      lead: 1,

      ground_units_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  hussars: {
    name: "Hussars",
    singular: "Hussar",

    attack: 10,
    defence: 3,
    manoeuvre: 1,
    movement: 12.87,
    initiative: 6,

    cost: {
      lumber: 5,
      steel: 2,
      lead: 3,
      food: 6,
      money: 2000,

      ground_units_cp: 20
    },
    maintenance: {
      lumber: 2,
      food: 1,
      lead: 1,
      steel: 1,

      ground_units_cp: 8,
      money: 1500
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  dragoons: {
    name: "Dragoons",
    singular: "Dragoon",

    attack: 8,
    defence: 4,
    manoeuvre: 5,
    movement: 12.07,
    initiative: 5,

    cost: {
      lumber: 1,
      iron: 1,
      lead: 1,
      food: 3,
      money: 1000,

      ground_units_cp: 15
    },
    maintenance: {
      lumber: 2,
      iron: 2,
      food: 1,
      lead: 1,
      steel: 1,

      ground_units_cp: 6,
      money: 1250
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  uhlans: {
    name: "Uhlans",
    singular: "Uhlan",

    attack: 6,
    defence: 3,
    manoeuvre: 6,
    movement: 19.31,
    initiative: 4,

    cost: {
      lumber: 2,
      ammunition: 5,
      steel: 1,
      food: 3,
      money: 800,

      ground_units_cp: 5
    },
    maintenance: {
      ammunition: 1,
      iron: 1,
      lumber: 1,
      small_arms: 1,
      uniforms: 1,
      food: 1,

      ground_units_cp: 8,
      money: 800
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  mounted_rifles: {
    name: "Mounted Rifles",
    singular: "Mounted Rifle",

    attack: 10,
    defence: 5,
    manoeuvre: 5,
    movement: 16.09,
    initiative: 2,

    cost: {
      small_arms: 5,
      uniforms: 5,
      ammunition: 3,
      food: 5,
      money: 2000,

      ground_units_cp: 10
    },
    maintenance: {
      small_arms: 2,
      uniforms: 2,
      ammunition: 1,
      lumber: 1,
      food: 1,

      ground_units_cp: 10,
      money: 1200
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  modern_cavalry: {
    name: "Modern Cavalry",

    attack: 8,
    defence: 3,
    manoeuvre: 6,
    movement: 82.23,
    initiative: 1,

    cost: {
      steel: 5,
      artillery: 5,
      ammunition: 10,
      refined_petroil: 2,
      food: 7,
      money: 3000,

      ground_units_cp: 20
    },
    maintenance: {
      machine_parts: 4,
      refined_petroil: 4,
      steel: 2,
      small_arms: 2,
      uniforms: 1,
      ammunition: 1,
      food: 1,

      ground_units_cp: 6,
      money: 2500
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  }
};
