config.buildings.amenities = {
  order: 3,

  amusement_parks: {
    name: "Amusement Parks",
    singular: "Amusement Park",

    construction_turns: 6,
    cost: {
      lumber: 20,
      steel_beams: 15,
      machine_parts: 12,
      iron: 10,
      lightbulbs: 8,
      electric_gear: 6,
      locomotives: 5,
      cabins: 5,
      wood: 5,
      bronze: 2,
      brass: 2,
      money: 25000
    },
    maintenance: {
      money: 3500,
      iron: 8,
      machine_parts: 5,
      copper_wire: 4,
      steel_beams: 4,
      lightbulbs: 3,
      refined_petroil: 3,
      tools: 3,
      foods: 2,
      cabins: 1,
      locomotives: 1
    },
    manpower_cost: {
      labourers: 1000,
      engineers: 500,
      artisans: 100
    },
    modifiers: {
      local_happiness_middle_class: 0.10,
      local_happiness_upper_class: 0.10,
      local_tourism_modifier: 0.05,
      local_tax_revenue: 0.02,
      tourism_value: 50,
      cultural_prestige_to_primary_culture: 5
    }
  },
  botanical_gardens: {
    name: "Botanical Gardens",
    singular: "Botanical Garden",

    construction_turns: 8,
    cost: {
      glass: 15,
      machine_parts: 12,
      lightbulbs: 8,
      iron: 8,
      wood: 5,
      ceramics: 3,
      money: 50000
    },
    maintenance: {
      money: 4000,
      glass: 8,
      paper: 5,
      ink: 4,
      lightbulbs: 4,
      machine_parts: 3,
      tools: 2,
      fertiliser: 1
    },
    manpower_cost: {
      engineers: 600,
      scientists: 400,
      labourers: 150,
      artisans: 50
    },
    modifiers: {
      local_tourism_modifier: 0.10,
      education_efficiency: 0.01,
      local_happiness: 0.05,
      tourism_value: 100,
      cultural_prestige_to_primary_culture: 15,
      local_research_slots: 1
    }
  },
  cafes: {
    name: "Cafés",
    singular: "Café",
    aliases: ["cafe"],

    construction_turns: 5,
    cost: {
      bricks: 10,
      common_furniture: 8,
      stone: 5,
      glass: 5,
      lumber: 4,
      iron: 3,
      copper: 2,
      money: 5000
    },
    maintenance: {
      money: 500,
      coffee: 4,
      tea: 3,
      bread: 2,
      cheese: 2,
      chinaware: 1
    },
    manpower_cost: {
      labourers: 300,
      artisans: 150
    },
    modifiers: {
      local_tourism_satisfaction: 0.05,
      local_consciousness: 0.05,
      administrative_research_efficiency: 0.02,
      local_tax_revenue: 0.01,
      tourism_value: 15,
      political_capital_gain: 2
    }
  },
  cathedrals: {
    name: "Cathedrals",
    singular: "Cathedral",
    aliases: ["cathedral"],

    construction_turns: 16,
    cost: {
      limestone: 20,
      stone: 15,
      glass: 15,
      lumber: 10,
      common_furniture: 10,
      iron: 10,
      brass: 8,
      lamps: 8,
      textiles: 5,
      lead: 4,
      gold: 2,
      money: 40000
    },
    maintenance: {
      money: 1500,
      glass: 5,
      lumber: 3,
      incense: 3,
      red_wine: 2,
      tools: 2,
      dyes: 1,
      gems: 1,
      gold: 1,
      silver: 1
    },
    manpower_cost: {
      clergy: 1000,
      artisans: 250
    },
    modifiers: {
      local_tourism_modifier: 0.20,
      local_religion_conversion_speed: 0.15,
      local_tax_revenue: 0.15,
      local_happiness: 0.10,
      clergy_influence: 0.01,
      local_consciousness: -0.10,
      local_clergy_needs: -0.10,
      local_needs: -0.10,
      tourism_value: 100,
      cultural_prestige_to_primary_culture: 20
    }
  },
  churches: {
    name: "Churches",
    singular: "Church",

    construction_turns: 6,
    cost: {
      stone: 12,
      lumber: 8,
      common_furniture: 5,
      glass: 5,
      lead: 3,
      wood: 3,
      money: 5000
    },
    maintenance: {
      money: 250,
      glass: 3,
      chinaware: 1,
      red_wine: 1,
      lumber: 1
    },
    manpower_cost: {
      clergy: 500
    },
    modifiers: {
      variety_bonus_lower_class: 0.10,
      local_happiness: 0.05,
      local_tax_revenue: 0.05,
      local_religion_conversion_speed: 0.01,
      local_consciousness: -0.05,
      local_needs: -0.05,
      local_clergy_needs: -0.10,
      tourism_value: 5
    }
  },
  community_centres: {
    name: "Community Centres",
    singular: "Community Centre",
    aliases: ["community center"],

    construction_turns: 4,
    cost: {
      bricks: 12,
      glass: 8,
      common_furniture: 5,
      iron: 5,
      stone: 5,
      wood_veneers: 4,
      granite: 3,
      velvet: 2,
      linen: 2,
      money: 2500
    },
    maintenance: {
      money: 600,
      tools: 2,
      bicycles: 1,
      computers: 1,
      lightbulbs: 1,
      lumber: 1,
      radios: 1,
      telephones: 1
    },
    manpower_cost: {
      labourers: 1000,
      artisans: 500,
      faculty: 200
    },
    modifiers: {
      local_happiness: 0.10,
      local_tax_revenue: 0.10,
      local_housing: 0.05,
      variety_bonus: 0.05,
      local_consciousness: 0.02,
      local_crime_rate: -0.05,
      local_tourism_modifier: 0.05
    }
  },
  esplanades: {
    name: "Esplanades",
    singular: "Esplanade",

    construction_turns: 5,
    cost: {
      bricks: 10,
      iron: 10,
      limestone: 8,
      lumber: 5,
      common_furniture: 5,
      money: 4000
    },
    maintenance: {
      money: 1500,
      limestone: 3,
      lumber: 2,
      granite: 1
    },
    manpower_cost: {
      artisans: 500
    },
    modifiers: {
      local_amenities_bonus: 0.10,
      local_happiness: 0.05,
      local_tourism_modifier: 0.05,
      physical_health: 0.005,
      cultural_prestige_to_primary_culture: 5,
      tourism_value: 15
    }
  },
  hotels: {
    name: "Hotels",
    singular: "Hotel",

    construction_turns: 4,
    cost: {
      lumber: 15,
      bricks: 10,
      glass: 8,
      luxury_furniture: 6,
      linen: 6,
      common_furniture: 5,
      iron: 4,
      lamps: 4,
      lead: 3,
      ceramics: 2,
      money: 7000
    },
    maintenance: {
      linen: 6,
      lamps: 3,
      lumber: 2,
      alcohol: 1,
      foods: 1,
      velvet: 1,
      wood_veneers: 1
    },
    manpower_cost: {
      workers: 5000,
      artisans: 1000
    },
    modifiers: {
      local_tourism_satisfaction: 0.20,
      local_tourism_modifier: 0.15,
      local_tax_revenue: 0.10,
      cultural_prestige_to_primary_culture: 5,
      tourism_value: 20
    }
  },
  members_clubs: {
    name: "Members Clubs",
    singular: "Member Club",

    construction_turns: 5,
    cost: {
      lumber: 20,
      bricks: 12,
      glass: 10,
      lightbulbs: 8,
      luxury_furniture: 8,
      cement: 5,
      concrete: 5,
      gramophones: 5,
      chinaware: 4,
      automobiles: 2,
      telephones: 2,
      radios: 2,
      money: 8000
    },
    maintenance: {
      money: 800,
      tools: 3,
      glass: 2,
      foods: 2,
      cigars: 2,
      brass: 1,
      violins: 1
    },
    manpower_cost: {
      labourers: 1000,
      artisans: 500,
      faculty: 200
    },
    modifiers: {
      local_investment_chance: 0.50,
      local_market_priority: 0.10,
      tourism_value: 5
    }
  },
  memorials: {
    name: "Memorials",
    singular: "Memorial",

    construction_turns: 6,
    cost: {
      marble: 12,
      stone: 10,
      tools: 8,
      bricks: 5,
      money: 10000
    },
    maintenance: {
      money: 1500,
      marble: 3,
      bronze: 1,
      coals: 1,
      tools: 1
    },
    manpower_cost: {
      workers: 500,
      engineers: 100
    },
    modifiers: {
      local_amenities_bonus: 0.15,
      local_military_bonus: 0.10,
      local_tourism_modifier: 0.10,
      cultural_prestige_to_primary_culture: 10,
      tourism_value: 50
    }
  },
  mosques: {
    name: "Mosques",
    singular: "Mosque",

    construction_turns: 8,
    cost: {
      stone: 8,
      common_furniture: 5,
      sandstone: 4,
      lumber: 3,
      tapestries: 1,
      money: 5000
    },
    maintenance: {
      mutton: 3,
      ceramics: 2,
      incense: 1,
      lumber: 1
    },
    manpower_cost: {
      clergy: 500
    },
    modifiers: {
      variety_bonus_lower_class: 0.10,
      local_happiness: 0.05,
      local_tax_revenue: 0.05,
      local_religion_conversion_speed: 0.01,
      local_consciousness: -0.05,
      local_needs: -0.05,
      local_clergy_needs: -0.10,
      tourism_value: 5
    }
  },
  museums: {
    name: "Museums",
    singular: "Museum",

    construction_turns: 6,
    cost: {
      glass: 20,
      bricks: 12,
      iron: 12,
      stone: 10,
      tools: 10,
      lumber: 8,
      common_furniture: 5,
      marble: 5,
      lead: 3,
      brass: 2,
      bronze: 2,
      money: 15000,
    },
    maintenance: {
      money: 2500,
      glass: 6,
      lumber: 3,
      stone: 3,
      machine_parts: 2,
      argon: 1,
      dyes: 1,
      industrial_chemicals: 1
    },
    manpower_cost: {
      faculty: 5000,
      scientists: 2000,
      engineers: 1000,
      artisans: 500
    },
    modifiers: {
      local_tourism_modifier: 0.15,
      local_education_efficiency: 0.10,
      research_efficiency: 0.01,
      cultural_prestige_to_primary_culture: 20,
      tourism_value: 40,
      local_commercial_slots: 1
    }
  },
  nightclubs: {
    name: "Nightclubs",
    singular: "Nightclub",

    construction_turns: 3,
    cost: {
      glass: 12,
      granite: 8,
      machine_parts: 8,
      electric_gear: 5,
      recording_devices: 5,
      computers: 4,
      mahogany_lumber: 3,
      basalt: 2,
      televisions: 2,
      money: 5000
    },
    maintenance: {
      money: 2000,
      machine_parts: 5,
      recording_devices: 3,
      glass: 2,
      electric_gear: 2
    },
    manpower_cost: {
      workers: 500,
      artisans: 250,
      engineers: 100
    },
    modifiers: {
      local_tax_revenue: 0.10,
      marriage_chance: 0.05,
      local_tourism_modifier: 0.05,
      local_tourism_satisfaction: 0.05,
      local_production_efficiency: -0.03,
      local_physical_health: -0.05,
      tourism_value: 15
    }
  },
  operas: {
    name: "Operas",
    singular: "Opera",

    construction_turns: 7,
    cost: {
      marble: 25,
      lumber: 20,
      glass: 15,
      limestone: 15,
      luxury_furniture: 12,
      wood: 10,
      wood_veneers: 10,
      tools: 8,
      tapestries: 6,
      chalk: 5,
      dyes: 4,
      copper: 4,
      bronze: 4,
      gold: 2,
      money: 25000
    },
    maintenance: {
      money: 4500,
      common_furniture: 5,
      luxury_clothes: 5,
      velvet: 4,
      linen: 3,
      lumber: 3,
      glass: 2,
      electric_gear: 1,
      machine_parts: 1
    },
    manpower_cost: {
      artisans: 10000,
      laboruers: 5000
    },
    modifiers: {
      local_tourism_modifier: 20,
      social_mobility: 0.05,
      cultural_prestige_gain: 0.05,
      cultural_prestige_to_primary_culture: 25,
      tourism_value: 75,
      local_commercial_slots: 1
    }
  },
  parks: {
    name: "Parks",
    singular: "Park",

    construction_turns: 3,
    cost: {
      common_furniture: 8,
      wood: 5,
      money: 2000
    },
    maintenance: {
      money: 1000,
      common_furniture: 1,
      fertiliser: 1,
      iron: 1
    },
    manpower_cost: {
      labourers: 500
    },
    modifiers: {
      physical_health: 0.15,
      local_amenities_bonus: 0.10,
      local_amenities_happiness_bonus: 0.10,
      local_pollution: -0.10,
      tourism_value: 30
    }
  },
  plazas: {
    name: "Plazas",
    singular: "Plaza",

    construction_turns: 4,
    cost: {
      limestone: 12,
      marble: 5,
      bricks: 5,
      common_furniture: 4,
      money: 2500
    },
    maintenance: {
      money: 1000,
      stone: 8,
      limestone: 2,
      cement: 1
    },
    manpower_cost: {
      labourers: 500
    },
    modifiers: {
      local_amenities_bonus: 0.20,
      local_tourism_modifier: 0.05,
      local_pollution: -0.05,
      cultural_prestige_to_primary_culture: 10,
      tourism_value: 35
    }
  },
  post_offices: {
    name: "Post Offices",
    singular: "Post Office",

    construction_turns: 3,
    cost: {
      bricks: 10,
      lumber: 5,
      tools: 4,
      common_furniture: 2,
      glass: 2,
      money: 4000
    },
    maintenance: {
      money: 1500,
      paper: 4,
      ink: 3,
      lamps: 3,
      iron: 1,
      wood: 1
    },
    manpower_cost: {
      labourers: 2500
    },
    modifiers: {
      local_communication_efficiency: 0.25,
      local_tourism_satisfaction: 0.05,
      local_exported_goods_price: 0.05,
      local_imported_goods_price: -0.05,
      tourism_value: 5
    }
  },
  pubs: {
    name: "Pubs",
    singular: "Pub",

    construction_turns: 2,
    cost: {
      lumber: 12,
      stone: 8,
      common_furniture: 5,
      glass: 3,
      brass: 2,
      money: 2500
    },
    maintenance: {
      beer: 3,
      alcohol: 2,
      common_furniture: 2
    },
    manpower_cost: {
      labourers: 1000
    },
    modifiers: {
      local_production_efficiency: 0.05,
      local_consciousness: -0.05,
      local_imported_goods_price: -0.05,
      local_physical_health: -0.05,
      alcohol_needs: -0.20,
      tourism_value: 5
    }
  },
  stadiums: {
    name: "Stadiums",
    singular: "Stadium",

    construction_turns: 6,
    cost: {
      steel_beams: 20,
      common_furniture: 15,
      machine_parts: 15,
      glass: 12,
      steel: 12,
      explosives: 10,
      televisions: 10,
      iron: 10,
      electric_gear: 9,
      glass: 8,
      recording_devices: 8,
      computers: 5,
      luxury_furniture: 5,
      plastics: 5,
      copper_wire: 4,
      telephones: 3,
      money: 100000
    },
    maintenance: {
      common_furniture: 20,
      steel_beams: 15,
      machine_parts: 12,
      lightbulbs: 10,
      lamps: 8,
      foods: 4
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 5000
    },
    modifiers: {
      local_tourism_modifier: 0.25,
      cultural_prestige_to_primary_culture: 15,
      tourism_value: 80
    }
  },
  synagogues: {
    name: "Synagogues",
    singular: "Synagogue",

    construction_turns: 7,
    cost: {
      bricks: 8,
      stone: 5,
      common_furniture: 5,
      lumber: 5,
      paper: 3,
      glass: 2,
      money: 5000
    },
    maintenance: {
      money: 250,
      ceramics: 3,
      paper: 2,
      ink: 2,
      mutton: 1
    },
    manpower_cost: {
      clergy: 500
    },
    produces: {
      variety_bonus_lower_class: 0.10,
      local_happiness: 0.05,
      local_tax_revenue: 0.05,
      local_religion_conversion_speed: 0.01,
      local_consciousness: -0.05,
      local_needs: -0.05,
      local_clergy_needs: -0.10,
      tourism_value: 5
    }
  },
  temples: {
    name: "Temples",
    singular: "Temple",

    construction_turns: 6,
    cost: {
      bricks: 8,
      lumber: 5,
      ceramics: 5,
      common_furniture: 4,
      stone: 3,
      incense: 2,
      money: 5000
    },
    maintenance: {
      money: 250,
      paper: 2,
      gold: 1,
      incense: 1,
      foods: 1
    },
    manpower_cost: {
      clergy: 500
    },
    produces: {
      variety_bonus_lower_class: 0.10,
      local_happiness: 0.05,
      local_tax_revenue: 0.05,
      local_religion_conversion_speed: 0.01,
      local_consciousness: -0.05,
      local_needs: -0.05,
      local_clergy_needs: -0.10,
      tourism_value: 5
    }
  },
  theatres: {
    name: "Theatres",
    singular: "Theatre",

    construction_turns: 6,
    cost: {
      bricks: 12,
      film: 10,
      glass: 10,
      common_furniture: 8,
      cement: 6,
      electric_gear: 5,
      machine_parts: 5,
      iron: 4,
      lead: 3,
      dyes: 2,
      money: 6500
    },
    maintenance: {
      money: 500,
      film: 5,
      common_furniture: 2,
      foods: 2,
      cameras: 1,
      linen: 1
    },
    manpower_cost: {
      labourers: 300,
      engineers: 250,
      artisans: 100
    }
  },
  worlds_fair: {
    name: "World's Fair",
    singular: "World's Fair",
    aliases: ["worlds fairs"],

    construction_turns: 12,
    cost: {
      lumber: 200,
      glass: 120,
      bricks: 100,
      wood_veneers: 100,
      lightbulbs: 80,
      reinforced_concrete: 80,
      cement: 60,
      steel_beams: 50,
      rubber: 50,
      common_furniture: 35,
      iron: 30,
      machine_parts: 20,
      copper_wire: 20,
      luxury_furniture: 20,
      electric_gear: 12,
      cabins: 12,
      film: 10,
      recording_devices: 8,
      trains: 5,
      money: 150000
    },
    maintenance: {
      money: 10000,
      glass: 12,
      machine_parts: 10,
      foods: 8,
      luxury_furniture: 6,
      computers: 5,
      film: 5,
      gems: 3,
      cameras: 2,
      gramophones: 2,
      radios: 2,
      telephones: 2,
      televisions: 2,
      common_furniture: 2,
      red_wine: 2,
      white_wine: 1,
      bone_china: 1,
      clay_pipes: 1,
      doccia_porcelain: 1,
      lacquerware: 1,
      porcelain: 1,
      rice_wine: 1
    },
    manpower_cost: {
      labourers: 20000,
      artisans: 10000,
      engineers: 10000,
      faculty: 5000,
      scientists: 1000,
      soldiers: 1000,
      officers: 500
    },
    modifiers: {
      local_tourism_modifier: 0.50,
      local_education_efficiency: 0.05,
      prestige_per_turn: 10,
      local_tax_revenue: -0.10,
      tourism_value: 500,
      cultural_prestige_to_primary_culture: 200
    }
  },
  zoos: {
    name: "Zoos",
    singular: "Zoo",

    construction_turns: 8,
    cost: {
      lumber: 20,
      bricks: 30,
      iron: 15,
      concrete: 12,
      glass: 12,
      cement: 10,
      stone: 10,
      machine_parts: 8,
      glass: 5,
      money: 20000
    },
    maintenance: {
      money: 6000,
      glass: 5,
      steel_beams: 5,
      foods: 4,
      lumber: 4,
      vegetables: 3,
      ink: 2,
      meat: 2,
      paper: 2,
      machine_parts: 1
    },
    manpower_cost: {
      faculty: 5000,
      scientists: 2000,
      labourers: 1000,
      engineers: 1000
    },
    produces: {
      local_tourism_modifier: 0.10,
      local_education_efficiency: 0.05,
      tourism_value: 60,
      cultural_prestige_to_primary_culture: 10,
      local_commercial_slots: 1
    }
  }
};
