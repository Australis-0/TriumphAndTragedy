config.buildings.resource_extraction = {
  order: 2,
  quarries: {
    name: "Quarries",
    singular: "Quarry",
    icon: "quarries",

    construction_turns: 2,
    cost: {
      wood: 10,
      iron: 5,
      money: 2500
    },
    manpower_cost: {
      workers: 40000
    },
    produces: {
      stone: 10
    }
  },
  lumberjacks: {
    name: "Lumberjacks",
    singular: "Lumberjack",
    icon: "wood",

    construction_turns: 2,
    cost: {
      wood: 10,
      stone: 5,
      iron: 5,
      money: 6000
    },
    manpower_cost: {
      workers: 40000
    },
    produces: {
      wood: 20
    }
  }
}
