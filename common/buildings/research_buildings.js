config.buildings.research_buildings = {
  order: 8,
  schools: {
    name: "Schools",
    singular: "School",
    icon: "<:knowledge:716797747193446441>",

    construction_turns: 2,
    cost: {
      wood: 5,
      stone: 5,
      money: 5000
    },
    maintenance: {
      money: 500
    },
    manpower_cost: {
      faculty: 5000
    },
    produces: {
      knowledge: 10
    }
  },
  libraries: {
    name: "Libraries",
    singular: "Library",
    icon: "<:old_scroll:716828676880334881>",

    construction_turns: 4,
    cost: {
      lumber: 5,
      stone: 10,
      money: 7000
    },
    maintenance: {
      money: 1500
    },
    manpower_cost: {
      faculty: 10000
    },
    produces: {
      knowledge: 20
    }
  },
  universities: {
    name: "Universities",
    singular: "University",
    icon: "<:faculty:732730754911436830>",

    construction_turns: 8,
    cost: {
      lumber: 10,
      stone: 15,
      money: 15000
    },
    maintenance: {
      money: 15000
    },
    manpower_cost: {
      faculty: 25000
    },
    produces: {
      knowledge: 50
    }
  },
  research_labs: {
    name: "Research Labs",
    singular: "Research Lab",
    icon: "<:government:716817688693047306>",

    construction_turns: 10,
    cost: {
      steel: 25,
      concrete: 10,
      refined_petroil: 5,
      gold: 5,
      lead: 5
    },
    maintenance: {
      money: 7500
    },
    manpower_cost: {
      faculty: 7500
    },
    produces: {
      knowledge: 100
    }
  },
  research_complexes: {
    name: "Research Complexes",
    singular: "Research Complex",
    icon: "<:technology:716812861514711040>",

    construction_turns: 10,
    cost: {
      steel: 35,
      concrete: 20,
      gold: 15,
      refined_petroil: 10,
      lead: 5
    },
    maintenance: {
      money: 15000
    },
    manpower_cost: {
      faculty: 35000
    },
    produces: {
      knowledge: 250
    }
  }
};
