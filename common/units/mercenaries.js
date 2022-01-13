config.units.mercenaries = {
  name: "Mercenaries",
  icon: "active_personnel",
  type: "land",

  //Mercenaries
  condottieri: {
    name: "Condottieri",

    attack: 2,
    defence: 5,
    manoeuvre: 3,
    initiative: 1,

    cost: {
      money: 4000
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  early_modern_mercenaries: {
    name: "Early Modern Mercenaries",
    singular: "Early Modern Mercenary",

    attack: 4,
    defence: 2,
    manoeuvre: 0,
    initiative: 2,

    cost: {
      money: 6500
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  landsknecht: {
    name: "Landsknecht",

    attack: 7,
    defence: 3,
    manoeuvre: 1,
    initiative: 1,

    cost: {
      money: 7000
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  },
  swiss_guards: {
    name: "Swiss Guards",
    singular: "Swiss Guard",

    attack: 2,
    defence: 6,
    manoeuvre: 3,
    initiative: 2,

    cost: {
      money: 7000,
    },
    manpower_cost: {
      soldiers: 10000
    },
    quantity: 10000
  }
};
