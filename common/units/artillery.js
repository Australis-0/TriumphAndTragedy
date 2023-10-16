config.units.artillery = {
  name: "Artillery",
  icon: "artillery",
  type: "land",

  branch_name: "Artillery",

  //Mediaeval to Early Modern Artillery
  bombard: {
    name: "Bombards",
    singular: "Bombard",

    attack: 15000,
    defence: 1000,
    manoeuvre: 0,
    movement: 3,
    initiative: 1,

    cost: {
      lead: 5,
      bronze: 3,
      food: 3,
      lumber: 2,
      wood: 1,
      money: 1000,

      ground_artillery_cp: 5
    },
    maintenance: {
      gunpowder: 2,
      lead: 2,
      paper: 2,
      lumber: 1,
      food: 1,

      ground_artillery_cp: 2,
      money: 1200
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 5
  },
  hand_cannons: {
    name: "Hand Cannons",
    singular: "Hand Cannon",

    attack: 35,
    defence: 10,
    manoeuvre: 3,
    movement: 4.59,
    initiative: 3,

    cost: {
      food: 5,
      bronze: 2,
      lead: 1,
      lumber: 1,
      money: 700,

      ground_artillery_cp: 10
    },
    maintenance: {
      iron: 2,
      gunpowder: 1,
      lead: 1,
      lumber: 1,
      food: 1,

      ground_artillery_cp: 4,
      money: 800
    },
    manpower_cost: {
      soldiers: 2000
    },
    quantity: 1000
  },
  long_cannons: {
    name: "Long Cannons",
    singular: "Long Cannon",

    attack: 5000,
    defence: 175,
    manoeuvre: 1,
    movement: 4.83,
    initiative: 4,

    cost: {
      bronze: 5,
      food: 3,
      lead: 3,
      lumber: 2,
      wood: 1,
      money: 1500,

      ground_artillery_cp: 10
    },
    maintenance: {
      gunpowder: 4,
      lead: 2,
      paper: 2,
      iron: 1,
      lumber: 1,
      food: 1,

      ground_artillery_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 2000
    },
    quantity: 20
  },
  field_culverins: {
    name: "Field Culverins",
    singular: "Field Culverin",

    attack: 6000,
    defence: 2000,
    manoeuvre: 1,
    movement: 5.48,
    initiative: 5,

    cost: {
      bronze: 4,
      lumber: 3,
      lead: 3,
      food: 3,
      wood: 1,
      money: 2000,

      ground_artillery_cp: 15
    },
    maintenance: {
      gunpowder: 4,
      iron: 2,
      lead: 2,
      paper: 2,
      lumber: 1,
      food: 1,

      ground_artillery_cp: 8,
      money: 1000
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 20
  },
  demi_cannon: {
    name: "Demi Cannon",

    attack: 6250,
    defence: 150,
    manoeuvre: 1,
    movement: 6.48,
    initiative: 4,

    cost: {
      bronze: 4,
      lumber: 2,
      lead: 2,
      food: 3,
      wood: 1,
      money: 2000,

      ground_artillery_cp: 15
    },
    maintenance: {
      gunpowder: 3,
      iron: 2,
      lead: 2,
      food: 1,
      lumber: 1,
      paper: 1,

      ground_artillery_cp: 9,
      money: 1200
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 20
  },
  field_cannon: {
    name: "Field Cannon",

    attack: 7500,
    defence: 250,
    manoeuvre: 2,
    movement: 5.50,
    initiative: 5,

    cost: {
      food: 5,
      lead: 5,
      sulphur: 5,
      bronze: 4,
      brass: 2,
      regular_steel: 2,
      lumber: 3,
      wood: 1,
      money: 1500,

      ground_artillery_cp: 20
    },
    maintenance: {
      gunpowder: 4,
      lead: 3,
      lumber: 2,
      paper: 2,
      iron: 2,
      food: 1,

      ground_artillery_cp: 12,
      money: 1800
    },
    manpower_cost: {
      soldiers: 650
    },
    quantity: 20
  },
  demi_culverins: {
    name: "Demi-Culverins",
    singular: "Demi-Culverin",

    attack: 6500,
    defence: 500,
    manoeuvre: 3,
    movement: 8.05,
    initiative: 4,

    cost: {
      food: 5,
      lead: 5,
      regular_steel: 5,
      lumber: 3,
      brass: 2,
      bronze: 2,
      wood: 1,
      money: 2000,

      ground_artillery_cp: 20
    },
    maintenance: {
      gunpowder: 3,
      lead: 2,
      lumber: 2,
      iron: 2,
      saltpetre: 2,
      food: 1,
      paper: 1,

      ground_artillery_cp: 10,
      money: 1500
    },
    manpower_cost: {
      soldiers: 600
    },
    quantity: 20
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
      food: 5,
      lead: 5,
      lumber: 2,
      bronze: 1,
      brass: 1,
      wood: 1,
      money: 1000,

      ground_artillery_cp: 5
    },
    maintenance: {
      lead: 3,
      gunpowder: 2,
      lumber: 1,
      iron: 1,
      paper: 1,

      ground_artillery_cp: 6,
      money: 1200
    },
    manpower_cost: {
      soldiers: 100
    },
    quantity: 100
  },
  siege_artillery: {
    name: "Siege Artillery",
    singular: "Siege Cannon",

    attack: 40000,
    defence: 200,
    manoeuvre: 0,
    movement: 2,
    initiative: 2,

    cost: {
      lumber: 8,
      food: 7,
      bronze: 6,
      lead: 5,
      brass: 4,
      regular_steel: 4,
      hemp: 1,
      money: 3500,

      ground_artillery_cp: 20
    },
    maintenance: {
      gunpowder: 6,
      lead: 5,
      iron: 3,
      food: 2,
      lumber: 2,
      paper: 2,

      ground_artillery_cp: 14,
      money: 2000
    },
    manpower_cost: {
      soldiers: 750
    },
    quantity: 5
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
      iron: 3,
      wood: 1,
      food: 1,
      money: 3000,

      ground_artillery_cp: 20
    },
    maintenance: {
      gunpowder: 6,
      wood: 2,
      copper: 1,
      lead: 1,
      food: 1,

      ground_artillery_cp: 4,
      money: 1800
    },
    manpower_cost: {
      soldiers: 100
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
      iron: 3,
      bronze: 2,
      lumber: 2,
      food: 2,
      lead: 1,
      money: 1000,

      ground_artillery_cp: 5
    },
    maintenance: {
      gunpowder: 4,
      paper: 2,
      iron: 2,
      lead: 2,
      lumber: 2,
      food: 1,
      wood: 1,

      ground_artillery_cp: 8,
      money: 1800
    },
    manpower_cost: {
      soldiers: 80
    },
    quantity: 20
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
      regular_steel: 4,
      lead: 2,
      food: 2,
      money: 3000,

      ground_artillery_cp: 20
    },
    maintenance: {
      sulphur: 12,
      wood: 3,
      copper: 1,
      food: 1,

      ground_artillery_cp: 6,
      money: 2200
    },
    manpower_cost: {
      soldiers: 400
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
      artillery_shells: 5,
      food: 5,
      regular_steel: 4,
      lumber: 3,
      paper: 2,
      heavy_weaponry: 1,
      money: 2000,

      ground_artillery_cp: 15
    },
    maintenance: {
      gunpowder: 6,
      lumber: 2,
      lead: 2,
      artillery_shells: 1,
      food: 1,
      uniforms: 1,

      ground_artillery_cp: 8,
      money: 2500
    },
    manpower_cost: {
      soldiers: 20000
    },
    quantity: 100
  },
  rifled_cannons: {
    name: "Rifled Cannons",
    singular: "Rifled Cannon",

    attack: 10000,
    defence: 375,
    manoeuvre: 2,
    movement: 6.44,
    initiative: 4,

    cost: {
      heavy_weaponry: 1,
      lumber: 2,
      artillery_shells: 5,
      machine_parts: 5,
      food: 5,
      money: 2500,

      ground_artillery_cp: 10
    },
    maintenance: {
      lumber: 4,
      artillery_shells: 2,
      lead: 2,
      food: 2,
      regular_steel: 1,
      uniforms: 1,

      ground_artillery_cp: 12,
      money: 2800
    },
    manpower_cost: {
      soldiers: 220
    },
    quantity: 20
  },
  railwayguns: {
    name: "Railwayguns",
    singular: "Railwaygun",

    attack: 500000,
    defence: 100000,
    manoeuvre: 2,
    movement: 9.98,
    initiative: 3,

    cost: {
      artillery_shells: 20,
      refined_petroil: 10,
      food: 8,
      heavy_weaponry: 5,
      machine_parts: 5,
      iron: 5,
      regular_steel: 4,
      cabins: 1,
      locomotives: 1,
      money: 150000,

      ground_artillery_cp: 40
    },
    maintenance: {
      gunpowder: 8,
      artillery_shells: 4,
      refined_petroil: 2,
      machine_parts: 2,
      regular_steel: 2,
      uniforms: 1,

      ground_artillery_cp: 20,
      money: 4000
    },
    manpower_cost: {
      soldiers: 5460
    },
    quantity: 1
  },
  field_artillery: {
    name: "Field Artillery",
    singular: "Field Gun",

    attack: 2500,
    defence: 250,
    manoeuvre: 1,
    movement: 6,
    initiative: 2,

    cost: {
      artillery_shells: 10,
      heavy_weaponry: 1,
      food: 5,
      money: 3000,

      ground_artillery_cp: 10
    },
    maintenance: {
      regular_steel: 3,
      artillery_shells: 2,
      machine_parts: 1,
      sulphur: 1,
      uniforms: 1,

      ground_artillery_cp: 8,
      money: 3500
    },
    manpower_cost: {
      soldiers: 800
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
      artillery_shells: 5,
      machine_parts: 5,
      food: 3,
      heavy_weaponry: 2,
      rubber: 2,
      money: 3000,

      ground_artillery_cp: 10
    },
    maintenance: {
      regular_steel: 3,
      artillery_shells: 3,
      machine_parts: 2,
      copper: 1,
      uniforms: 1,

      ground_artillery_cp: 8,
      money: 3000
    },
    manpower_cost: {
      soldiers: 1100
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
      machine_parts: 8,
      refined_petroil: 5,
      artillery_shells: 5,
      food: 3,
      heavy_weaponry: 3,
      electric_gear: 2,
      lorries: 2,
      chassis: 1,
      money: 3500,

      ground_artillery_cp: 20
    },
    maintenance: {
      refined_petroil: 4,
      regular_steel: 4,
      machine_parts: 4,
      artillery_shells: 4,
      refined_petroil: 2,
      uniforms: 1,

      ground_artillery_cp: 12,
      money: 5000
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 100
  },

  //Modern Artillery Units
  long_range_artillery: {
    name: "Long Range Artillery",

    attack: 10000,
    defence: 100,
    manoeuvre: 50,
    movement: 10.8,
    initiative: 2,

    cost: {
      artillery_shells: 10,
      machine_parts: 8,
      heavy_weaponry: 4,
      food: 3,
      electric_gear: 1,
      money: 5000,

      ground_artillery_cp: 30
    },
    maintenance: {
      artillery_shells: 5,
      machine_parts: 3,
      electric_gear: 1,
      heavy_weaponry: 1,
      refined_petroil: 1,
      chassis: 1,
      uniforms: 1,

      ground_artillery_cp: 12,
      money: 4000
    },
    manpower_cost: {
      soldiers: 1000
    },
    quantity: 50
  },
  modern_howitzers: {
    name: "Modern Howitzers",
    singular: "Modern Howitzer",

    attack: 7000,
    defence: 1000,
    manoeuvre: 1,
    movement: 45.06,
    initiative: 4,

    cost: {
      artillery_shells: 10,
      machine_parts: 8,
      food: 5,
      electric_gear: 4,
      computers: 2,
      heavy_weaponry: 2,
      chassis: 1,
      televisions: 1,
      money: 3500,

      ground_artillery_cp: 10
    },
    maintenance: {
      artillery_shells: 4,
      machine_parts: 2,
      heavy_weaponry: 1,
      refined_petroil: 1,
      uniforms: 1,

      ground_artillery_cp: 10,
      money: 4000
    },
    manpower_cost: {
      soldiers: 800
    },
    quantity: 50
  },
  self_propelled_artillery: {
    name: "SP Artillery",

    attack: 50000,
    defence: 2000,
    manoeuvre: 2,
    movement: 54.7,
    initiative: 1,

    cost: {
      artillery_shells: 15,
      food: 10,
      refined_petroil: 10,
      electric_gear: 6,
      heavy_weaponry: 5,
      machine_parts: 4,
      stainless_steel: 4,
      cameras: 2,
      chassis: 2,
      engines: 2,
      televisions: 1,
      money: 4000,

      ground_units_cp: 20
    },
    maintenance: {
      artillery_shells: 3,
      machine_parts: 2,
      refined_petroil: 2,
      regular_steel: 2,
      computers: 1,
      uniforms: 1,

      ground_artillery_cp: 12,
      money: 4500
    },
    manpower_cost: {
      soldiers: 250
    },
    quantity: 5
  },
  rocket_artillery: {
    name: "Rocket Artillery",

    attack: 54000,
    defence: 10000,
    manoeuvre: 4,
    movement: 60,
    initiative: 2,

    cost: {
      artillery_shells: 10,
      refined_petroil: 5,
      food: 5,
      electric_gear: 4,
      heavy_weaponry: 3,
      machine_parts: 2,
      cameras: 1,
      money: 4000,

      ground_units_cp: 20
    },
    maintenance: {
      artillery_shells: 8,
      machine_parts: 4,
      explosives: 2,
      refined_petroil: 2,
      regular_steel: 2,
      film: 1,
      uniforms: 1,

      ground_artillery_cp: 14,
      money: 6000
    },
    manpower_cost: {
      soldiers: 60
    },
    quantity: 5
  },
  railguns: {
    name: "Railguns",
    singular: "Railgun",

    attack: 135000,
    defence: 25000,
    manoeuvre: 4,
    movement: 45,
    initiative: 2,

    cost: {
      machine_parts: 10,
      refined_petroil: 10,
      electric_gear: 5,
      food: 5,
      heavy_weaponry: 5,
      lasers: 4,
      integrated_circuits: 4,
      computers: 4,
      cameras: 2,
      televisions: 2,
      turbines: 2,
      money: 7000,

      ground_artillery_cp: 40
    },
    maintenance: {
      machine_parts: 6,
      refined_petroil: 4,
      regular_steel: 4,
      copper_wire: 2,
      integrated_circuits: 2,
      electric_gear: 1,
      uniforms: 1,

      ground_artillery_cp: 20,
      money: 8000
    },
    manpower_cost: {
      soldiers: 400
    },
    quantity: 2
  },
  directed_heat_weapons: {
    name: "Directed Heat Weapons",
    singular: "Directed Heat Weapon",

    attack: 27500,
    defence: 10000,
    manoeuvre: 2,
    movement: 80,
    initiative: 5,

    cost: {
      machine_parts: 20,
      regular_steel: 10,
      integrated_circuits: 8,
      lasers: 8,
      heavy_weaponry: 6,
      artillery_shells: 5,
      electric_gear: 5,
      refined_petroil: 5,
      computers: 4,
      turbines: 4,
      food: 3,
      money: 10000,

      ground_artillery_cp: 40
    },
    maintenance: {
      machine_parts: 4,
      copper_wire: 3,
      heavy_weaponry: 2,
      refined_petroil: 2,
      regular_steel: 2,
      uniforms: 1,

      ground_artillery_cp: 10,
      money: 10000
    },
    manpower_cost: {
      soldiers: 80
    },
    quantity: 5
  }
};
