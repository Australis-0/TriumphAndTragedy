config.buildings.education = { //[WIP] - Add special_effect
  name: "Education",
  order: 5,

  art_academies: {
    name: "Art Academies",
    singular: "Art Academy",
    type: "services",

    construction_turns: 5,
    cost: {
      bricks: 20,
      glass: 12,
      stone: 12,
      limestone: 10,
      lumber: 10,
      dyes: 8,
      common_furniture: 5,
      granite: 5,
      gold: 3,
      money: 15000
    },
    maintenance: {
      money: 1500,
      bricks: 20,
      limestone: 10,
      glass: 8,
      lamps: 6,
      marble: 5,
      paper: 4,
      dyes: 3,
      ink: 3,
      common_furniture: 2,
      computers: 2,
      gold: 2,
      tools: 2
    },
    manpower_cost: {
      any_pop: {
        scholars: 2500,
        faculty: 2500
      }
    },
    modifiers: {
      cultural_research_efficiency: 0.20,
      artisans_pop_chance: 0.02
    }
  },
  community_colleges: {
    name: "Community Colleges",
    singular: "Community College",
    aliases: ["cc"],
    type: "services",

    construction_turns: 6,
    cost: {
      bricks: 25,
      iron: 20,
      steel_beams: 15,
      glass: 13,
      lumber: 10,
      machine_parts: 5,
      common_furniture: 5,
      slate: 5,
      chalk: 3,
      money: 9000
    },
    maintenance: {
      money: 1000,
      lamps: 5,
      paper: 5,
      ink: 4,
      computers: 3,
      typewriters: 2,
      chalk: 1,
      slate: 1,
      telephones: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 3500,
        faculty: 3500
      },
      artisans: 1000
    },
    produces: {
      education_level: {
        min: 0.60,
        max: 0.75,

        capacity: 80000,
        rate_per_year: 0.10
      }
    }
  },
  libraries: {
    name: "Libraries",
    singular: "Library",
    type: "services",

    construction_turns: 4,
    cost: {
      lumber: 15,
      paper: 12,
      stone: 8,
      glass: 5,
      common_furniture: 5,
      textiles: 3,
      money: 3500
    },
    maintenance: {
      money: 500,
      paper: 6,
      common_furniture: 4
    },
    manpower_cost: {
      any_pop: {
        scholars: 5000,
        faculty: 5000
      }
    },
    produces: {
      education_level: {
        max: 0.20,

        capacity: 50000,
        rate_per_year: 0.04
      }
    }
  },
  primary_schools: {
    name: "Primary Schools",
    singular: "Primary School",
    type: "services",

    construction_turns: 3,
    cost: {
      bricks: 10,
      lumber: 8,
      glass: 5,
      common_furniture: 5,
      glass: 3,
      slate: 2,
      money: 3000
    },
    maintenance: {
      money: 300,
      paper: 3,
      ink: 3,
      slate: 2,
      chalk: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 1000,
        faculty: 1000
      }
    },
    produces: {
      education_level_literacy: {
        max: 0.20,

        capacity: 100000,
        rate_per_year: 0.04
      },
      education_level_primary_education: {
        min: 0.20,
        max: 0.40,

        capacity: 100000,
        rate_per_year: 0.04
      }
    }
  },
  schoolhouses: {
    name: "Schoolhouses",
    singular: "Schoolhouse",
    type: "services",

    construction_turns: 2,
    cost: {
      lumber: 8,
      wood: 3,
      common_furniture: 2,
      slate: 2,
      glass: 1,
      money: 500
    },
    maintenance: {
      money: 100,
      paper: 1,
      slate: 1,
      chalk: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 100,
        faculty: 100
      }
    },
    produces: {
      education_level_literacy: {
        max: 0.20,

        capacity: 10000,
        rate_per_year: 0.04
      },
      education_level_primary_education: {
        min: 0.20,
        max: 0.40,

        capacity: 10000,
        rate_per_year: 0.04
      }
    }
  },
  secondary_schools: {
    name: "Secondary Schools",
    singular: "Secondary School",
    type: "services",

    construction_turns: 5,
    cost: {
      bricks: 15,
      stone: 12,
      lumber: 10,
      paper: 8,
      wood: 5,
      common_furniture: 5,
      glass: 5,
      slate: 2,
      money: 8500
    },
    maintenance: {
      money: 800,
      paper: 2,
      ink: 2,
      slate: 2,
      chalk: 1,
      computers: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 5000,
        faculty: 5000
      }
    },
    produces: {
      education_level: {
        min: 0.30,
        max: 0.60,

        capacity: 100000,
        rate: 0.04
      }
    }
  },
  universities: {
    name: "Universities",
    singular: "University",
    type: "services",

    construction_turns: 8,
    cost: {
      bricks: 20,
      iron: 15,
      stone: 15,
      glass: 8,
      paper: 8,
      common_furniture: 5,
      ink: 5,
      slate: 5,
      slate: 4,
      chalk: 3,
      dyes: 2,
      money: 20000
    },
    maintenance: {
      money: 4000,
      lamps: 3,
      foods: 2,
      ink: 2,
      paper: 2,
      slate: 2,
      chalk: 2,
      electric_gear: 1,
      machine_parts: 1
    },
    manpower_cost: {
      any_pop: {
        scholars: 15000,
        faculty: 15000
      },
      scientists: 1000
    },
    produces: {
      faculty: 2000,
      scientists: 1000,

      education_level: {
        min: 0.60,
        max: 1,

        capacity: 50000,
        rate: 0.10
      }
    }
  }
};
