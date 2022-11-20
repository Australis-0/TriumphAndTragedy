config.units.artillery = {
  name: "Artillery",
  icon: "artillery",
  type: "land",

  branch_name: "Artillery",

  //Mediaeval to Early Modern Artillery
  bombard: {
    name: "Bombards",
    singular: "Bombard",

    attack: 750,
    defence: 50,
    manoeuvre: 0,
    movement: 3,
    initiative: 1,

    cost: {
      iron: 3,
      lead: 5,
      food: 3,
      money: 1000,

      ground_artillery_cp: 5
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  hand_cannons: {
    name: "Hand Cannons",
    singular: "Hand Cannon",

    attack: 350,
    defence: 100,
    manoeuvre: 3,
    movement: 4.59,
    initiative: 3,

    cost: {
      iron: 2,
      lead: 1,
      food: 5,
      money: 700,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  long_cannons: {
    name: "Long Cannons",
    singular: "Long Cannon",

    attack: 1000,
    defence: 35,
    manoeuvre: 1,
    movement: 4.83,
    initiative: 4,

    cost: {
      iron: 5,
      lumber: 2,
      lead: 3,
      food: 3,
      money: 1500,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  field_culverins: {
    name: "Field Culverins",
    singular: "Field Culverin",

    attack: 1200,
    defence: 400,
    manoeuvre: 1,
    movement: 5.48,
    initiative: 5,

    cost: {
      iron: 4,
      lumber: 3,
      lead: 3,
      food: 3,
      money: 2000,

      ground_artillery_cp: 15
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  demi_cannon: {
    name: "Demi Cannon",

    attack: 1250,
    defence: 30,
    manoeuvre: 1,
    movement: 6.48,
    initiative: 4,

    cost: {
      iron: 4,
      lumber: 2,
      lead: 2,
      food: 3,
      money: 2000,

      ground_artillery_cp: 15
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  field_cannon: {
    name: "Field Cannon",

    attack: 1500,
    defence: 50,
    manoeuvre: 2,
    movement: 5.50,
    initiative: 5,

    cost: {
      steel: 5,
      lumber: 3,
      lead: 5,
      sulphur: 5,
      food: 5,
      money: 1500,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  demi_culverins: {
    name: "Demi-Culverins",
    singular: "Demi-Culverin",

    attack: 1300,
    defence: 100,
    manoeuvre: 3,
    movement: 8.05,
    initiative: 4,

    cost: {
      steel: 5,
      lumber: 3,
      lead: 5,
      sulphur: 5,
      food: 5,
      money: 2000,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  minions: {
    name: "Minions",
    singular: "Minion",

    attack: 500,
    defence: 600,
    manoeuvre: 5,
    movement: 8.05,
    initiative: 5,

    cost: {
      steel: 2,
      lumber: 2,
      lead: 5,
      sulphur: 2,
      food: 5,
      money: 1000,

      ground_artillery_cp: 5
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  siege_artillery: {
    name: "Siege Artillery",
    singular: "Siege Cannon",

    attack: 2000,
    defence: 10,
    manoeuvre: 0,
    movement: 2,
    initiative: 2,

    cost: {
      steel: 8,
      lead: 5,
      sulphur: 10,
      food: 7,
      money: 3500,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  mysorean_rockets: {
    name: "Mysorean Rockets",
    singular: "Mysorean Rocket",

    attack: 450,
    defence: 20,
    manoeuvre: 8,
    movement: 7.24,
    initiative: 2,

    cost: {
      steel: 2,
      lead: 1,
      lumber: 1,
      food: 1,
      money: 3000,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  carronades: {
    name: "Carronades",
    singular: "Carronade",

    attack: 500,
    defence: 200,
    manoeuvre: 2,
    movement: 5.63,
    initiative: 5,

    cost: {
      lumber: 2,
      iron: 3,
      lead: 1,
      food: 2,
      money: 1000,

      ground_artillery_cp: 5
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  congreve_rockets: {
    name: "Congreve Rockets",
    singular: "Congreve Rocket",

    attack: 600,
    defence: 20,
    manoeuvre: 8,
    movement: 12.87,
    initiative: 3,

    cost: {
      lumber: 2,
      steel: 4,
      lead: 2,
      food: 2,
      money: 3000,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  smoothbores: {
    name: "Smoothbores",
    singular: "Smoothbore",

    attack: 1700,
    defence: 50,
    manoeuvre: 3,
    movement: 4.83,
    initiative: 3,

    cost: {
      artillery: 1,
      lumber: 3,
      ammunition: 5,
      food: 5,
      money: 2000,

      ground_artillery_cp: 15
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  rifled_cannons: {
    name: "Rifled Cannons",
    singular: "Rifled Cannon",

    attack: 2000,
    defence: 75,
    manoeuvre: 2,
    movement: 6.44,
    initiative: 4,

    cost: {
      artillery: 1,
      lumber: 2,
      ammunition: 5,
      machine_parts: 5,
      food: 5,
      money: 2500,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  railwayguns: {
    name: "Railwayguns",
    singular: "Railwaygun",

    attack: 5000,
    defence: 1000,
    manoeuvre: 2,
    movement: 9.98,
    initiative: 3,

    cost: {
      artillery: 5,
      refined_petroil: 10,
      ammunition: 20,
      machine_parts: 5,
      iron: 5,
      food: 20,
      money: 150000,

      ground_artillery_cp: 40
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  field_artillery: {
    name: "Field Artillery",
    singular: "Field Gun",

    attack: 2500,
    defence: 250,
    manoeuvre: 1,
    initiative: 2,

    cost: {
      artillery: 1,
      ammunition: 10,
      food: 5,
      money: 3000,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  artillery_howitzers: {
    name: "Artillery Howitzers",
    singular: "Artillery Howitzer",

    attack: 3500,
    defence: 300,
    manoeuvre: 0,
    movement: 32.19,
    initiative: 3,

    cost: {
      artillery: 2,
      ammunition: 5,
      machine_parts: 5,
      food: 3,
      money: 3000,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  mobile_artillery: {
    name: "Mobile Artillery",

    attack: 2000,
    defence: 50,
    manoeuvre: 5,
    movement: 40.23,
    initiative: 4,

    cost: {
      artillery: 3,
      refined_petroil: 5,
      ammunition: 5,
      machine_parts: 10,
      food: 3,
      money: 3500,

      ground_artillery_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },

  //Modern Artillery Units
  long_range_artillery: {
    name: "Long Range Artillery",

    attack: 5000,
    defence: 50,
    manoeuvre: 50,
    movement: 10.8,
    initiative: 2,

    cost: {
      artillery: 4,
      ammunition: 10,
      gold: 1,
      machine_parts: 10,
      food: 3,
      money: 5000,

      ground_artillery_cp: 30
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  modern_howitzers: {
    name: "Modern Howitzers",
    singular: "Modern Howitzer",

    attack: 3500,
    defence: 500,
    manoeuvre: 1,
    movement: 45.06,
    initiative: 4,

    cost: {
      artillery: 2,
      ammunition: 10,
      machine_parts: 15,
      food: 5,
      money: 3500,

      ground_artillery_cp: 10
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  self_propelled_artillery: {
    name: "SP Artillery",

    attack: 2500,
    defence: 100,
    manoeuvre: 2,
    movement: 54.7,
    initiative: 1,

    cost: {
      artillery: 5,
      refined_petroil: 10,
      ammunition: 15,
      machine_parts: 10,
      food: 10,
      money: 4000,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  rocket_artillery: {
    name: "Rocket Artillery",

    attack: 2700,
    defence: 500,
    manoeuvre: 4,
    movement: 60,
    initiative: 2,

    cost: {
      artillery: 3,
      refined_petroil: 5,
      ammunition: 10,
      food: 5,
      money: 4000,

      ground_units_cp: 20
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  railguns: {
    name: "Railguns",
    singular: "Railgun",

    attack: 2700,
    defence: 500,
    manoeuvre: 4,
    movement: 45,
    initiative: 2,

    cost: {
      artillery: 5,
      machine_parts: 20,
      ammunition: 15,
      refined_petroil: 10,
      food: 5,
      money: 7000,

      ground_artillery_cp: 40
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  directed_heat_weapons: {
    name: "Directed Heat Weapons",
    singular: "Directed Heat Weapon",

    attack: 5500,
    defence: 500,
    manoeuvre: 2,
    movement: 80,
    initiative: 5,

    cost: {
      artillery: 6,
      machine_parts: 25,
      ammunition: 5,
      steel: 10,
      refined_petroil: 5,
      food: 3,
      money: 10000,

      ground_artillery_cp: 40
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  }
};
