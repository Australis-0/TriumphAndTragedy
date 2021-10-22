config.pops = {
  aristocrats: {
    name: "Aristocrats",
    singular: "Aristocrat",
    icon: config.icons.aristocrats,

    chance: 0.02,
    max_modifier_limit: {
      tax_efficiency: 0.60,
      stability_efficiency: 0.50
    },
    per_100k: {
      tax_efficiency: 0.03,
      stability_modifier: 0.05
    },
    specialised_pop: true
  },
  faculty: {
    name: "Faculty",
    singular: "Faculty",
    icon: config.icons.faculty,

    chance: 0.10,
    max_modifier_limit: {
      research_efficiency: 0.50
    },
    per_100k: {
      research_efficiency: 0.02,
      knowledge: 10
    },
    specialised_pop: true
  },
  workers: {
    name: "Workers",
    singular: "Worker",
    icon: config.icons.workers,

    chance: 0.73,
    specialised_pop: false
  },
  soldiers: {
    name: "Soldiers",
    singular: "Soldier",
    icon: config.icons.soldiers,

    chance: 0.15,
    specialised_pop: false
  }
};
