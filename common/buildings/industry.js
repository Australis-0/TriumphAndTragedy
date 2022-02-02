config.buildings.industry = {
  order: 4,
  guilds: {
    name: "Guilds",
    singular: "Guild",
    icon: "workers",

    construction_turns: 2,
    cost: {
      iron: 2,
      wood: 2,
      stone: 3,
      money: 2500,
    },
    manpower_cost: {
      workers: 65000
    },
    produces: {
      actions: 1
    }
  },
  workshops: {
    name: "Workshops",
    singular: "Workshop",
    aliases: ["shop"],
    icon: "trade",

    construction_turns: 3,
    cost: {
      iron: 3,
      wood: 2,
      lead: 1,
      stone: 5,
      money: 5000
    },
    manpower_cost: {
      workers: 55000
    },
    produces: {
      actions: [2, 3]
    }
  },
  watermills: {
    name: "Watermills",
    singular: "Watermill",
    aliases: ["windmill"],
    icon: "paper",

    construction_turns: 3,
    cost: {
      stone: 5,
      wood: 3,
      lead: 1,
      money: 6500
    },
    manpower_cost: {
      workers: 55000
    },
    produces: {
      actions: [3, 5]
    }
  },
  manufactories: {
    name: "Manufactories",
    singular: "Manufactory",
    aliases: ["manufact", "manufacturing"],
    icon: "development",

    construction_turns: 5,
    cost: {
      stone: 8,
      iron: 5,
      wood: 3,
      money: 7500,
    },
    manpower_cost: {
      workers: 30000
    },
    produces: {
      actions: [4, 6]
    }
  },
  mills: {
    name: "Mills",
    singular: "Mill",
    icon: "government",

    construction_turns: 4,
    cost: {
      stone: 12,
      wood: 5,
      iron: 3,
      lead: 2,
      money: 8000
    },
    manpower_cost: {
      workers: 30000
    },
    produces: {
      actions: [5, 7]
    }
  },
  factories: {
    name: "Factories",
    singular: "Factory",
    icon: "factory",

    construction_turns: 3,
    cost: {
      iron: 5,
      stone: 10,
      wood: 5,
      coal: 5,
      money: 10000
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      actions: [7, 10]
    }
  },
  arsenals: {
    name: "Arsenals",
    singular: "Arsenal",
    icon: "coal",

    construction_turns: 4,
    cost: {
      steel: 3,
      iron: 5,
      stone: 15,
      wood: 7,
      coal: 5,
      money: 10000
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      actions: [10, 12]
    }
  },
  assembly_plants: {
    name: "Assembly Plants",
    singular: "Assembly Plant",
    icon: "artillery_piece",

    construction_turns: 4,
    cost: {
      steel: 10,
      stone: 10,
      petroil: 5,
      money: 20000
    },
    produces: {
      actions: [12, 15]
    }
  },
  industrial_complexes: {
    name: "Industrial Complexes",
    singular: "Industrial Complex",
    aliases: ["industrial_facilities"],
    icon: "actions",

    construction_turns: 5,
    cost: {
      steel: 20,
      stone: 10,
      petroil: 15,
      money: 50000
    },
    manpower_cost: {
      workers: 55000
    },
    produces: {
      actions: [12, 18]
    }
  },
  civilian_industries: {
    name: "Civilian Industries",
    singular: "Civilian Industry",
    aliases: ["civilian_industry"],
    icon: "government_scroll",

    construction_turns: 3,
    cost: {
      steel: 25,
      stone: 15,
      gold: 5,
      petroil: 10,
      money: 65000
    },
    manpower_cost: {
      workers: 55000
    },
    produces: {
      actions: [20, 25]
    }
  },
  wartime_industries: {
    name: "Wartime Industries",
    singular: "Wartime Industry",
    aliases: ["wartime_industry"],
    icon: "land_vehicles",

    construction_turns: 2,
    cost: {
      steel: 25,
      stone: 15,
      gold: 5,
      petroil: 10,
      money: 70000
    },
    manpower_cost: {
      workers: 60000
    },
    produces: {
      aeroplanes_cp: 20,
      ground_units_cp: 20,
      ground_artillery_cp: 20,
      ground_vehicles_cp: 20,
      naval_units_cp: 20
    }
  },
  production_facilities: {
    name: "Production Facilities",
    singular: "Production Facility",
    icon: "building",

    construction_turns: 3,
    cost: {
      steel: 15,
      stone: 5,
      petroil: 5,
      money: 85000
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      actions: [20, 25]
    }
  },
  modern_financial_centres: {
    name: "Modern Financial Centres",
    singular: "Modern Financial Centre",
    icon: "taxes",

    construction_turns: 5,
    cost: {
      steel: 25,
      stone: 30,
      petroil: 15,
      money: 150000
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      actions: [25, 30]
    }
  },
  ai_hubs: {
    name: "AI Hubs",
    singular: "AI Hub",
    icon: "money",

    construction_turns: 7,
    cost: {
      steel: 25,
      gold: 35,
      stone: 30,
      petroil: 25,
      money: 200000
    },
    manpower_cost: {
      workers: 35000
    },
    produces: {
      actions: [25, 40]
    }
  }
};
