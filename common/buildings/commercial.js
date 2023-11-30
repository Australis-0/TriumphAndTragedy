config.buildings.commercial = { //[WIP] - Add special_effect
  name: "Commercial",
  order: 4,
  taxable: true,

  banks: {
    name: "Banks",
    singular: "Bank",
    type: "services",

    construction_turns: 5,
    cost: {
      iron: 50,
      glass: 30,
      bricks: 25,
      ceramics: 20,
      marble: 15,
      limestone: 10,
      lamps: 8,
      common_furniture: 5,
      money: 35000
    },
    maintenance: {
      money: 5000,
      lamps: 4,
      paper: 3,
      ink: 3,
      iron: 2,
      tools: 2,
      computers: 1,
      gold: 1,
      telephones: 1
    },
    manpower_cost: {
      capitalists: 2000,
      engineers: 1500
    },
    produces: {
      per_100k_upper: {
        pop_class: "upper",

        produces: {
          money: 10000
        }
      },
      per_100k_middle: {
        pop_class: "middle",

        produces: {
          money: 10000
        }
      }
    }
  },
  central_business_districts: {
    name: "Central Business Districts",
    singular: "Central Business District",
    aliases: ["CBD"],
    type: "services",

    construction_turns: 8,
    cost: {
      reinforced_concrete: 35,
      ceramics: 25,
      lumber: 20,
      steel_beams: 20,
      lightbulbs: 10,
      marble: 5,
      electric_gear: 8,
      machine_parts: 5,
      lifts: 5,
      computers: 2,
      wood_veneers: 2
    },
    maintenance: {
      money: 8500,
      machine_parts: 8,
      common_furniture: 5,
      glass: 5,
      computers: 4,
      lumber: 4,
      paper: 3,
      ink: 3,
      electric_gear: 2,
      luxury_furniture: 2,
      typewriters: 2,
      lifts: 1
    },
    manpower_cost: {
      capitalists: 50000,
      engineers: 20000,
      labourers: 5000
    },
    produces: {
      money_per_action: 150
    }
  },
  chemists: {
    name: "Chemists",
    singular: "Chemist",
    aliases: ["pharmacy"],
    type: "services",

    construction_turns: 2,
    cost: {
      bricks: 10,
      lumber: 10,
      stone: 8,
      glass: 5,
      common_furniture: 3,
      money: 7500
    },
    maintenance: {
      money: 500,
      pharmaceuticals: 4,
      traditional_medicines: 1
    },
    manpower_cost: {
      engineers: 10000
    },
    produces: {
      pharmaceuticals_import_price: -0.10
    }
  },
  counting_houses: {
    name: "Counting Houses",
    singular: "Counting House",
    type: "services",

    construction_turns: 4,
    cost: {
      bricks: 15,
      ceramics: 10,
      stone: 10,
      limestone: 5,
      marble: 5,
      glass: 5,
      common_furniture: 3,
      lamps: 2,
      money: 10000
    },
    maintenance: {
      money: 5000,
      paper: 4,
      ink: 4,
      common_furniture: 2,
      lamps: 2
    },
    manpower_cost: {
      artisans: 8000,
      bureaucrats: 5000
    },
    modifiers: {
      local_commercial_bonus: 0.20
    }
  },
  department_stores: {
    name: "Department Stores",
    singular: "Department Store",
    type: "services",

    construction_turns: 4,
    cost: {
      bricks: 35,
      marble: 20,
      iron: 20,
      limestone: 15,
      concrete: 10,
      cement: 10,
      common_furniture: 8,
      stone: 5,
      machine_parts: 5,
      lightbulbs: 3,
      money: 25000
    },
    maintenance: {
      money: 6500,
      furniture: 10,
      cosmetic_products: 8,
      foods: 8,
      clothes: 6,
      lamps: 6,
      glass: 5,
      electric_gear: 5,
      shampoo: 5,
      soap: 5,
      machine_parts: 4,
      lightbulbs: 3,
      copper_wires: 2,
      typewriters: 2,
      computers: 1,
      radios: 1,
      telephones: 1,
      televisions: 1
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 5000
    },
    modifiers: {
      variety_bonus_upper_class: 0.15,
      variety_bonus_middle_class: 0.15
    },
    produces: {
      money: 8500
    }
  },
  furniture_stores: {
    name: "Furniture Stores",
    singular: "Furniture Store",
    type: "services",

    construction_turns: 2,
    cost: {
      lumber: 15,
      bricks: 10,
      common_furniture: 8,
      stone: 5,
      glass: 5,
      money: 9000
    },
    maintenance: {
      money: 700,
      common_furniture: 8,
      luxury_furniture: 2,
      sewing_machines: 2,
      lightbulbs: 1,
      typewriters: 1,
      computers: 1,
      radios: 1,
      telephones: 1,
      televisions: 1
    },
    manpower_cost: {
      labourers: 15000
    },
    modifiers: {
      furniture_export_price: 0.05,
      furniture_import_price: -0.05,
    },
    produces: {
      money: 5000
    }
  },
  malls: {
    name: "Malls",
    singular: "Mall",
    type: "services",

    construction_turns: 3,
    cost: {
      glass: 15,
      bricks: 10,
      ceramics: 10,
      stone: 8,
      lightbulbs: 5,
      common_furniture: 4,
      machine_parts: 2,
      money: 12000
    },
    maintenance: {
      money: 850,
      clothes: 5,
      common_furniture: 3,
      foods: 2,
      chinaware: 1,
      paper: 1,
      wood_veneers: 1
    },
    manpower_cost: {
      labourers: 30000
    },
    produces: {
      money: 3500
    }
  },
  markets: {
    name: "Markets",
    singular: "Market",
    type: "services",

    construction_turns: 2,
    cost: {
      linen: 8,
      lumber: 5,
      stone: 5,
      money: 1500
    },
    maintenance: {
      money: 500,
      foods: 3,
      vegetables: 2,
      fruits: 2,
      animal_products: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 20000,
        farmers: 20000,
        labourers: 20000
      }
    },
    modifiers: {
      local_lower_class_needs: -0.10
    },
    produces: {
      money: 2000
    }
  },
  modern_financial_centres: {
    name: "Modern Financial Centres",
    singular: "Modern Financial Centre",
    aliases: ["modern financial center"],
    type: "services",

    construction_turns: 6,
    cost: {
      glass: 30,
      steel_beams: 25,
      bricks: 20,
      ceramics: 20,
      reinforced_concrete: 20,
      concrete: 15,
      cement: 10,
      marble: 10,
      integrated_circuits: 9,
      electric_gear: 8,
      machine_parts: 8,
      computers: 7,
      telephones: 7,
      televisions: 6,
      plastics: 5,
      brass: 3,
      bronze: 2,
      luxury_furniture: 2,
      wood_veneers: 2,
      money: 50000
    },
    maintenance: {
      money: 5000,
      telephones: 6,
      computers: 5,
      lightbulbs: 4,
      typewriters: 3,
      ink: 3,
      paper: 3,
      electric_gear: 2,
      plastics: 2,
      lifts: 1
    },
    manpower_cost: {
      capitalists: 20000,
      engineers: 15000,
      artisans: 5000,
      labourers: 5000
    },
    modifiers: {
      tax_efficiency: 0.02
    },
    produces: {
      money: 25000
    }
  },
  restaurants: {
    name: "Restaurants",
    singular: "Restaurant",
    type: "services",

    construction_turns: 3,
    cost: {
      lumber: 15,
      bricks: 10,
      stone: 8,
      glass: 6,
      chinaware: 5,
      common_furniture: 3,
      money: 3500
    },
    maintenance: {
      money: 500,
      foods: 3,
      meat: 2,
      vegetables: 2,
      animal_products: 1,
      seasoning: 1,
      sugar: 1
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    modifiers: {
      local_tourism_satisfaction: 0.10,
      local_tax_efficiency: 0.05
    },
    produces: {
      money: 2500
    }
  },
  shopping_centres: {
    name: "Shopping Centres",
    singular: "Shopping Centre",
    aliases: ["shopping center"],
    type: "services",

    construction_turns: 4,
    cost: {
      bricks: 10,
      reinforced_concrete: 8,
      iron: 8,
      ceramics: 8,
      asphalt: 6,
      glass: 5,
      dyes: 2,
      money: 8500
    },
    maintenance: {
      money: 1000,
      foods: 6,
      lamps: 4,
      staple_clothes: 3,
      common_furniture: 3,
      lightbulbs: 2,
      luxury_clothes: 2,
      plastics: 2,
      chinaware: 1,
      cosmetic_products: 1,
      paper: 1,
      soap: 1,
      shampoo: 1
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    produces: {
      per_100k: {
        pop_class: "middle",

        produces: {
          money: 2500
        }
      }
    }
  },
  stock_exchanges: {
    name: "Stock Exchanges",
    singular: "Stock Exchange",
    aliases: ["stock market"],
    type: "services",

    construction_turns: 6,
    cost: {
      iron: 15,
      stone: 10,
      ceramics: 10,
      bricks: 10,
      limestone: 8,
      marble: 8,
      luxury_furniture: 6,
      bronze: 5,
      glass: 5,
      paper: 5,
      ink: 4,
      money: 20000
    },
    maintenance: {
      money: 5000,
      machine_parts: 8,
      common_furniture: 5,
      electric_gear: 6,
      computers: 3,
      telephones: 2
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    modifiers: {
      enable_companies: true,
      enable_stock_trading: true,
      administrative_efficiency: 0.02
    },
    produces: {
      money: 20000
    }
  }
};
