config.buildings.petrochemicals = {
  order: 6,
  derricks: {
    name: "Derricks",
    singular: "Derrick",
    icon: "<:derricks:772296533320007681>",

    construction_turns: 2,
    cost: {
      wood: 5,
      machine_parts: 3,
      money: 8000
    },
    maintenance: {
      coal: 1
    },
    manpower_cost: {
      workers: 25000
    },
    produces: {
      petroil: 5
    }
  },
  refineries: {
    name: "Refineries",
    singular: "Refinery",
    icon: "<:refinery:772296533152235580>",
    category: "petrochemicals",

    construction_turns: 4,
    cost: {
      steel: 10,
      iron: 15,
      coal: 5,
      money: 8800
    },
    maintenance: {
      petroil: 2
    },
    manpower_cost: {
      workers: 60000
    },
    produces: {
      refined_petroil: 4
    }
  }
};
