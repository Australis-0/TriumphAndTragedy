config.buildings.agriculture = {
  order: 1,
  farms: {
    name: "Farms",
    singular: "Farm",
    icon: "<:farms:772296532275757087>",

    construction_turns: 1,
    cost: {
      wood: 15,
      stone: 5,
      money: 2000
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      wheat: 2,
      meat: 1
    }
  },
  centralised_farms: {
    name: "Farms",
    singular: "Centralised Farm",
    icon: "<:centralised_farms:773289015839162368>",

    construction_turns: 2,
    cost: {
      lumber: 10,
      iron: 5,
      sulphur: 5,
      money: 4000
    },
    manpower_cost: {
      workers: 25000
    },
    produces: {
      wheat: 3,
      meat: 2
    }
  },
  modern_farms: {
    name: "Modern Farms",
    singular: "Modern Farm",
    icon: "<:modern_farms:773289015415668746>",

    construction_turns: 2,
    cost: {
      steel: 10,
      machine_parts: 5,
      lumber: 5,
      stone: 5,
      money: 10000
    },
    manpower_cost: {
      workers: 25000
    },
    produces: {
      fertiliser: 2,
      refined_petroil: 1
    }
  },
  industrial_farms: {
    name: "Industrial Farms",
    singular: "Industrial Farm",
    icon: "<:industrial_farms:773289015440834611>",

    construction_turns: 3,
    cost: {
      steel: 15,
      concrete: 10,
      machine_parts: 10,
      lumber: 5,
      money: 15000
    },
    maintenance: {
      fertiliser: 3,
      refined_petroil: 2
    },
    manpower_cost: {
      workers: 15000
    },
    produces: {
      wheat: 5,
      meat: 5
    }
  },
  vertical_farms: {
    name: "Vertical Farms",
    singular: "Vertical Farm",
    icon: "<:vertical_farms:773289015440572467>",

    construction_turns: 5,
    cost: {
      steel: 20,
      concrete: 10,
      machine_parts: 15,
      gold: 3,
      money: 20000
    },
    maintenance: {
      machine_parts: 2
    },
    manpower_cost: {
      workers: 10000
    },
    produces: {
      wheat: 10,
      meat: 5
    }
  },
  pastures: {
    name: "Pastures",
    singular: "Pasture",
    icon: "<:pastures:772296532648132638>",

    construction_turns: 1,
    cost: {
      wood: 10,
      money: 1200
    },
    manpower_cost: {
      workers: 15000
    },
    pastures: {
      meat: 2
    }
  },
  fisheries: {
    name: "Fisheries",
    singular: "Fishery",
    icon: "<:fisheries:771983852373409793>",

    construction_turns: 1,
    cost: {
      wood: 5,
      iron: 5,
      money: 400
    },
    manpower_cost: {
      workers: 35000
    },
    produces: {
      meat: 3
    }
  },
  plantations: {
    name: "Plantations",
    singular: "Plantation",
    icon: "<:plantations:772296532883013643>",

    construction_turns: 2,
    cost: {
      wood: 15,
      stone: 5,
      money: 5000
    },
    manpower_cost: {
      workers: 25000
    },
    produces: {
      cotton: 15
    }
  }
};
