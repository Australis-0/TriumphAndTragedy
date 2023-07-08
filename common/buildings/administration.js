config.buildings.administration = {
  order: 1,

  city_halls: {
    name: "City Halls",
    singular: "City Hall",

    construction_turns: 4,
    cost: {
      lumber: 20,
      bricks: 15,
      common_furniture: 10,
      steel_beams: 10,
      lamps: 5,
      luxury_furniture: 5,
      marble: 5,
      glass: 5,
      money: 20000
    },
    maintenance: {
      money: 500,
      paper: 3,
      ink: 2
    },
    manpower_cost: {
      bureaucrats: 1000
    },
    modifiers: {
      local_production_efficiency: 0.15,
      local_housing: 0.10,
      local_rgo_throughput: 0.05,
      bureaucrats_pop_chance: 0.01,
      districts: 2
    }
  },
  courthouses: {
    name: "Courthouses",
    singular: "Courthouse",

    construction_turns: 3,
    cost: {
      lumber: 15,
      luxury_furniture: 10,
      glass: 10,
      mahogany_lumber: 5,
      lamps: 5,
      marble: 5,
      velvet: 3,
      money: 5000
    },
    maintenance: {
      money: 2500,
      lumber: 5,
      paper: 5,
      lamps: 4,
      ink: 3,
      foods: 2,
      alcohol: 2,
      salt: 2,
      naval_supplies: 1
    },
    manpower_cost: {
      bureaucrats: 500
    },
    modifiers: {
      cultural_integration_speed: 0.20,
      local_manpower: 0.05,
      bureaucrats_pop_chance: 0.01,
      local_corruption: -0.10,
      local_crime_rate: -0.50,
      local_title_strength: -5
    }
  },
  harbourmasters: {
    name: "Harbourmasters",
    singular: "Harbourmaster",
    aliases: ["harbormasters"],

    construction_turns: 4,
    cost: {
      lumber: 20,
      stone: 15,
      bricks: 10,
      common_furniture: 10,
      glass: 5,
      lamps: 5,
      wood: 5,
      steel_beams: 5,
      copper: 3,
      iron: 2,
      money: 10000
    },
    manpower_cost: {
      bureaucrats: 50,
      artisans: 100,
      soldiers: 50
    },
    maintenance: {
      money: 2500,
      lumber: 5,
      paper: 5,
      lamps: 4,
      ink: 3,
      foods: 3,
      alcohol: 2,
      salt: 2,
      naval_supplies: 1
    },
    modifiers: {
      local_military_bonus: 0.20,
      local_stockpiles_bonus: 0.20,
      local_shipment_capacity_bonus: 0.10,
      local_exported_goods_price: 0.05,
      local_imported_goods_price: 0.05,
      local_manpower: 0.05,
      naval_attack: 0.01,
      naval_defence: 0.01,
      local_industry_slots: 3
    }
  },
  local_departments: {
    name: "Local Departments",
    singular: "Local Department",

    construction_turns: 2,
    cost: {
      bricks: 20,
      glass: 20,
      concrete: 15,
      lumber: 15,
      ceramics: 10,
      iron: 10,
      stone: 5,
      lamps: 4,
      bronze: 2,
      brass: 1,
      money: 3500
    },
    manpower_cost: {
      bureaucrats: 1000
    },
    maintenance: {
      money: 1500,
      paper: 5,
      ink: 3,
      lamps: 2,
      leather: 2,
      tools: 2
    },
    modifiers: {
      local_exported_goods_price: 0.10,
      local_stockpiles_bonus: 0.10,
      local_corruption: -0.05,
      workforce_requirement: -0.05
    }
  },
  national_departments: {
    name: "National Departments",
    singular: "National Department",

    construction_turns: 4,
    cost: {
      bricks: 25,
      glass: 20,
      concrete: 15,
      lumber: 15,
      ceramics: 10,
      marble: 10,
      iron: 10,
      lead: 7,
      stone: 5,
      lamps: 4,
      bronze: 2,
      slate: 2,
      chinaware: 2,
      brass: 1,
      money: 20000
    },
    manpower_cost: {
      bureaucrats: 2000
    },
    maintenance: {
      money: 1500,
      paper: 5,
      ink: 3,
      lamps: 2,
      leather: 2,
      tools: 2
    },
    modifiers: {
      national_stockpile: 50,
      money_per_action: 10,
      global_supply_limit: 5,
      political_capital_gain: 2
    }
  },
  mental_institutions: {
    name: "Mental Institutions",
    singular: "Mental Institution",

    construction_turns: 3,
    cost: {
      glass: 20,
      stone: 15,
      bricks: 10,
      iron: 8,
      steel_beams: 5,
      concrete: 5,
      common_furniture: 4,
      telephones: 2,
      computers: 1,
      money: 7000
    },
    maintenance: {
      money: 2500,
      paper: 3,
      ink: 3,
      staple_clothes: 3,
      felt: 2,
      cosmetic_products: 1,
      fabric: 1,
      telephones: 1,
      lightbulbs: 1,
      hormone_medications: 1,
      mood_stabilisers: 1,
      plastics: 1,
      stimulants: 1,
      shampoo: 1,
      soap: 1
    },
    manpower_cost: {
      bureaucrats: 500,
      faculty: 150,
      scientists: 50
    },
    modifiers: {
      mental_health: 0.05,
      local_production_efficiency: -0.02,
      impact_from_mental_health_conditions: -0.10,
      political_capital_gain: -1
    }
  },
  palaces: {
    name: "Palaces",
    singular: "Palace",

    construction_turns: 8,
    cost: {
      marble: 25,
      glass: 20,
      bricks: 20,
      iron: 15,
      lead: 15,
      wood_veneers: 10,
      stone: 10,
      lamps: 9,
      silver: 8,
      lumber: 8,
      bronze: 7,
      luxury_furniture: 7,
      velvet: 5,
      gold: 5,
      brass: 5,
      slate: 4,
      chinaware: 3,
      money: 50000
    },
    maintenance: {
      money: 20000,
      luxury_clothes: 5,
      paper: 4,
      ink: 3,
      tea: 3,
      foods: 3,
      coffee: 2,
      cosmetic_products: 2,
      lumber: 2,
      red_wine: 2,
      soap: 2,
      cheese: 1,
      glasses: 1,
      incense: 1,
      porcelain: 1,
      tools: 1,
      white_wine: 1
    },
    modifiers: {
      local_tax_efficiency: 0.10,
      administrative_efficiency: 0.05,
      local_manpower: 0.05,
      tax_efficiency: 0.02,
      aristocrat_needs: -0.10,
      title_strength: -2
    }
  },
  prisons: {
    name: "Prisons",
    singular: "Prison",

    construction_turns: 4,
    cost: {
      bricks: 20,
      stone: 15,
      iron: 10,
      lead: 8,
      common_furniture: 3,
      lamps: 2,
      brass: 2,
      small_arms: 1,
      ammunition: 1,
      money: 8500
    },
    maintenance: {
      money: 2000,
      bread: 3,
      uniforms: 2,
      soap: 2,
      lumber: 1,
      tools: 1
    },
    manpower_cost: {
      soldiers: 250,
      bureaucrats: 200
    },
    modifiers: {
      law_enforcement_effectiveness: 0.05,
      local_crime_rate: 0.05,
      local_consciousness: -0.15
    }
  },
  state_houses: {
    name: "State Houses",
    singular: "State House",

    construction_turns: 6,
    cost: {
      lumber: 15,
      marble: 10,
      bricks: 8,
      stone: 5,
      wood_veneers: 5,
      luxury_furniture: 4,
      lamps: 2,
      velvet: 2,
      chinaware: 1,
      money: 5000
    },
    maintenance: {
      money: 5000,
      paper: 5,
      ink: 3,
      lamps: 3
    },
    manpower_cost: {
      bureaucrats: 1000,
      aristocrats: 500
    },
    modifiers: {
      local_tax_efficiency: 0.10,
      syphoned_revenue: -0.20,
      syphoned_production: -0.20,
      local_infrastructure_slots: 1,
      state_limit: 1,
      local_title_strength: -20
    },
    produces: {
      bureaucrats: 500
    }
  },
  town_halls: {
    name: "Town Halls",
    singular: "Town Hall",

    construction_turns: 3,
    cost: {
      lumber: 20,
      bricks: 15,
      stone: 10,
      lead: 5,
      glass: 5,
      iron: 5,
      wood_veneers: 5,
      common_furniture: 3,
      lamps: 3,
      money: 2000
    },
    maintenance: {
      money: 2000,
      paper: 3,
      ink: 2,
      lamps: 2
    },
    manpower_cost: {
      artisans: 250,
      bureaucrats: 100
    },
    modifiers: {
      local_happiness: 0.10,
      local_wages: 0.05,
      local_corruption: -0.05,
      amenity_districts: 3
    }
  },
  trade_depots: {
    name: "Trade Depots",
    singular: "Trade Depot",

    construction_turns: 4,
    cost: {
      stone: 15,
      bricks: 10,
      lumber: 8,
      iron: 5,
      money: 1000
    },
    maintenance: {
      money: 1500,
      tools: 3,
      lumber: 2,
      paper: 2,
      ink: 1,
      naval_supplies: 1
    },
    manpower_cost: {
      artisans: 100,
      soldiers: 50
    },
    modifiers: {
      national_stockpile_bonus: 0.05,
      shipment_capacity: 50,
      trading_slots: 1
    }
  },
  trade_unions: {
    name: "Trade Unions",
    singular: "Trade Union",

    construction_turns: 3,
    cost: {
      lumber: 20,
      bricks: 5,
      common_furniture: 5,
      money: 1000
    },
    maintenance: {
      money: 500,
      paper: 2,
      ink: 2,
      lamps: 1,
      tools: 1,
      typewriters: 1,
      coals: 1
    },
    manpower_cost: {
      labourers: 1000,
      artisans: 350
    },
    modifiers: {
      local_consciousness: 0.10,
      local_wages: 0.05,
      local_corruption: 0.01,
      social_mobility: 0.01,
      workforce_requirement: -0.05,
      local_amenities_slots: 1,
      political_capital_gain: -1
    }
  },
  warehouses: {
    name: "Warehouses",
    singular: "Warehouse",

    construction_turns: 2,
    cost: {
      bricks: 10,
      lumber: 10,
      stone: 8,
      iron: 5,
      lead: 3,
      money: 5000
    },
    maintenance: {
      money: 1000,
      tools: 3,
      lumber: 2
    },
    manpower_cost: {
      artisans: 200
    },
    modifiers: {
      local_import_needs: -0.05,
      local_stockpile: 100,
      supply_limit: 10
    }
  }
};
