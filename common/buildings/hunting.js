config.buildings.hunting = {
  name: "Hunting",
  order: 8,
  taxable: true,

  elephant_hunting_grounds: {
    name: "Elephant Hunting Grounds",
    singular: "Elephant Hunting Ground",

    construction_turns: 2,
    cost: {
      wood: 4,
      tools: 2,
      small_arms: 1,
      ammunition: 1,
      money: 500
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        labourers: 10000
      }
    },
    produces: {
      ivory: 2
    }
  },
  fisheries: {
    name: "Fisheries",
    singular: "Fishery",

    construction_turns: 2,
    cost: {
      lumber: 5,
      textiles: 4,
      naval_supplies: 4,
      wood: 3,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 20000,
        labourers: 20000
      }
    },
    produces: {
      production_choice_crab: {
        name: "Crab",
        crab: 3
      },
      production_choice_fish: {
        name: "Fish",
        fish: 6
      },
      production_choice_lobster: {
        name: "Lobster",
        lobster: 2
      },
      production_choice_oyster: {
        name: "Oyster",
        oyster: 4
      },
      production_choice_shrimp: {
        name: "Shrimp",
        shrimp: 3
      }
    }
  },
  fur_trappers: {
    name: "Fur Trappers",
    singular: "Fur Trapper",

    construction_turns: 1,
    cost: {
      lumber: 6,
      wood: 4,
      small_arms: 1,
      ammunition: 1,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      furs: 4
    }
  },
  pearlers: {
    name: "Pearlers",
    singular: "Pearler",

    construction_turns: 3,
    cost: {
      lumber: 10,
      wood: 5,
      tools: 5,
      wool: 2,
      money: 1500
    },
    maintenance: {
      oyster: 4
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        labourers: 10000
      }
    },
    produces: {
      pearls: 1
    }
  },
  whaling_stations: {
    name: "Whaling Stations",
    singular: "Whaling Station",

    cosntruction_turns: 4,
    cost: {
      lumber: 8,
      tools: 5,
      wood: 5,
      coals: 3,
      naval_supplies: 2,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 10000,
        labourers: 10000
      }
    },
    produces: {
      whale_oil: 5
    }
  }
};
