config.buildings.emergency_services = {
  clinics: {
    name: "Clinics",
    singular: "Clinic",

    construction_turns: 2,
    cost: {
      tools: 8,
      bricks: 5,
      glass: 3,
      common_furniture: 2,
      lumber: 2,
      money: 3500
    },
    maintenance: {
      money: 800,
      tools: 4,
      medicine: 3,
      common_furniture: 1,
      computers: 1,
      foods: 1,
      glass: 1,
      paper: 1,
      ink: 1
    },
    manpower_cost: {
      any_pop_artisans_engineers: {
        artisans: 500,
        engineers: 500
      },
      any_pop_peasants_labourers: {
        peasants: 500,
        labourers: 500
      }
    },
    modifiers: {
      physical_health_negative_effects_modifier: -0.25,
      infant_mortality: -0.15,
      hospital_capacity: 1000
    }
  },
  fire_departments: {
    name: "Fire Departments",
    singular: "Fire Department",

    construction_turns: 4,
    cost: {
      bricks: 15,
      lamps: 8,
      glass: 5,
      tools: 5,
      uniforms: 4,
      steel: 2,
      money: 5000
    },
    maintenance: {
      money: 1200,
      industrial_chemicals: 3,
      uniforms: 4,
      tools: 4,
      machine_parts: 3,
      lorries: 2,
      paper: 2,
      ink: 2,
      aeroplanes: 1,
      cameras: 1,
      computers: 1,
      explosives: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    modifiers: {
      fire_suppression: 0.20,
      housing_maintenance: -0.15
    }
  },
  fire_stations: {
    name: "Fire Stations",
    singular: "Fire Station",

    construction_turns: 3,
    cost: {
      bricks: 8,
      stone: 5,
      glass: 5,
      tools: 4,
      uniforms: 2,
      iron: 2,
      money: 2000
    },
    maintenance: {
      money: 600,
      tools: 5,
      lorries: 2,
      uniforms: 2
    },
    manpower_cost: {
      any_pop: {
        peasants: 1000,
        labourers: 1000
      }
    },
    modifiers: {
      fire_suppression: 0.10,
      housing_maintenance: -0.10,
      great_fire_chance: -0.20
    }
  },
  hospitals: {
    name: "Hospitals",
    singular: "Hospital",

    construction_turns: 3,
    cost: {
      stone: 20,
      concrete: 15,
      tools: 12,
      glass: 10,
      lumber: 10,
      common_furniture: 8,
      lamps: 6,
      cement: 5,
      wood_veneers: 5,
      uniforms: 3,
      money: 8500
    },
    maintenance: {
      money: 3500,
      medicine: 5,
      tools: 5,
      lamps: 4,
      paper: 3,
      computers: 2,
      glass: 2,
      ink: 2,
      foods: 1
    },
    manpower_cost: {
      engineers: 2000,
      scientists: 1000
    },
    modifiers: {
      physical_health_negative_effects_modifier: -0.50,
      infant_mortality: -0.20,
      hospital_capacity: 5000,
      icu_capacity: 2000
    }
  },
  police_departments: {
    name: "Police Departments",
    singular: "Police Department",

    construction_turns: 4,
    cost: {
      bricks: 20,
      iron: 15,
      lumber: 12,
      tools: 8,
      ammunition: 7,
      glass: 5,
      small_arms: 5,
      lamps: 4,
      ceramics: 3,
      uniforms: 3,
      money: 10000
    },
    maintenance: {
      money: 2000,
      automobiles: 5,
      uniforms: 4,
      tools: 4,
      paper: 3,
      ink: 3,
      ammunition: 3,
      small_arms: 2,
      computers: 1,
      typewriters: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 10000,
        labourers: 10000
      },
      any_pop_artisans_engineers: {
        artisans: 2500,
        engineers: 2500
      }
    },
    modifiers: {
      local_revolt_suppression: 0.35,
      local_corruption: 0.10,
      local_crime_rate: -0.20,
      political_capital_gain: -1
    }
  },
  police_stations: {
    name: "Police Stations",
    singular: "Police Station",

    construction_turns: 3,
    cost: {
      bricks: 10,
      lumber: 8,
      stone: 5,
      glass: 5,
      ammunition: 3,
      small_arms: 3,
      uniforms: 2,
      money: 5000
    },
    maintenance: {
      money: 1000,
      tools: 3,
      automobiles: 2,
      uniforms: 2,
      telephones: 2,
      paper: 1,
      ink: 1,
      ammunition: 1,
      small_arms: 1,
      computers: 1,
      typewriters: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 2500,
        labourers: 2500
      }
    },
    modifiers: {
      local_revolt_suppression: 0.20,
      local_crime_rate: 0.10,
      local_corruption: 0.05,
      political_capital_gain: -1
    }
  },
  sanatoriums: {
    name: "Sanatoriums",
    singular: "Sanatorium",

    construction_turns: 6,
    cost: {
      bricks: 20,
      ceramics: 15,
      glass: 12,
      marble: 10,
      limestone: 10,
      lamps: 8,
      iron: 8,
      cement: 8,
      tools: 8,
      common_furniture: 7,
      concrete: 5,
      lead: 5,
      machine_parts: 5,
      luxury_furniture: 3,
      wood_veneers: 2,
      money: 12000
    },
    maintenance: {
      money: 1500,
      foods: 3,
      medicine: 2,
      tools: 2
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 2000,
        labourers: 2000
      },
      any_pop_scholars_scientists: {
        scholars: 1000,
        scientists: 1000
      }
    }
  }
};
