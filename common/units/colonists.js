config.units.colonists = {
  name: "Colonists",
  icon: "colonisation",
  type: "reserves",

  branch_name: "Colonials",

  //Colonial Units
  conquistadors: {
    name: "Conquistadors",
    singular: "Conquistador",

    movement: 7.41,

    cost: {
      food: 5,
      iron: 3,
      lead: 2,
      wood: 1,
      money: 2500
    },
    maintenance: {
      money: 500
    },
    manpower_cost: {
      soldiers: 1000
    },
    colonise_provinces: 1,
    quantity: 1
  },
  settlers: {
    name: "Settlers",
    singular: "Settler",

    movement: 12.97,

    cost: {
      food: 10,
      iron: 5,
      wood: 3,
      lead: 2,
      money: 5000
    },
    maintenance: {
      money: 1000
    },
    manpower_cost: {
      soldiers: 2500
    },
    colonise_provinces: 3,
    quantity: 1
  },
  magistrates: {
    name: "Magistrates",
    singular: "Magistrate",

    movement: 14,

    cost: {
      food: 20,
      iron: 10,
      wood: 10,
      lead: 5,
      gold: 5,
      money: 6500
    },
    maintenance: {
      money: 2000
    },
    manpower_cost: {
      soldiers: 5000
    },
    colonise_provinces: 5,
    quantity: 1
  },
  colonists: {
    name: "Colonists",
    singular: "Colonist",

    movement: 30,

    cost: {
      food: 40,
      wood: 20,
      iron: 15,
      lead: 7,
      gold: 5,
      money: 7500
    },
    maintenance: {
      money: 2500
    },
    manpower_cost: {
      soldiers: 4000
    },
    colonise_provinces: 7,
    quantity: 1
  },
  magnates: {
    name: "Magnates",
    singular: "Magnate",

    movement: 20.37,

    cost: {
      food: 50,
      wood: 25,
      lead: 10,
      regular_steel: 10,
      gold: 5,
      money: 7500
    },
    maintenance: {
      money: 5000
    },
    manpower_cost: {
      soldiers: 7000
    },
    colonise_provinces: 9,
    quantity: 1
  },
  administrators: {
    name: "Administrators",
    singular: "Administrator",

    movement: 42.60,

    cost: {
      food: 100,
      regular_steel: 20,
      lead: 20,
      paper: 10,
      petroil: 10,
      wood: 10,
      money: 10000
    },
    maintenance: {
      money: 7500
    },
    manpower_cost: {
      soldiers: 10000
    },
    colonise_provinces: 12,
    quantity: 1
  },
  bureaucrats: {
    name: "Bureaucrats",
    singular: "Bureaucrat",

    movement: 900,

    cost: {
      food: 150,
      lead: 50,
      regular_steel: 30,
      wood: 30,
      paper: 20,
      petroil: 15,
      iron: 5,
      money: 20000
    },
    maintenance: {
      money: 10000
    },
    manpower_cost: {
      soldiers: 20000
    },
    colonise_provinces: 15,
    quantity: 1
  }
};
