config.buildings.resource_extraction = {
  order: 17,

  chalk_mines: {
    name: "Chalk Mines",
    singular: "Chalk Mine",

    construction_turns: 2,
    cost: {
      wood: 8,
      tools: 3,
      money: 3000
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    produces: {
      chalk: 4
    }
  },
  clay_mines: {
    name: "Clay Mines",
    singular: "Clay Mine",

    construction_turns: 3,
    cost: {
      wood: 10,
      tools: 2,
      money: 3500
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    produces: {
      clay: 5
    }
  },
  lumberjacks: {
    name: "Lumberjacks",
    singular: "Lumberjack",

    construction_turns: 2,
    cost: {
      wood: 10,
      stone: 5,
      iron: 5,
      money: 6000
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    produces: {
      production_choice_acacia: {
        name: "Acacia Logging",
        acacia: 3
      },
      production_choice_ash: {
        name: "Ash Logging",
        ash: 3
      },
      production_choice_balsa: {
        name: "Balsa Logging",
        balsa: 2
      },
      production_choice_basswood: {
        name: "Basswood Logging",
        basswood: 1
      },
      production_choice_blackwood: {
        name: "Blackwood Logging",
        blackwood: 1
      },
      production_choice_bloodwood: {
        name: "Bloodwood Logging",
        bloodwood: 1
      },
      production_choice_cedar: {
        name: "Cedar Logging",
        cedar: 3
      },
      production_choice_cherry: {
        name: "Cherry Logging",
        cherry: 3
      },
      production_choice_chestnut: {
        name: "Chestnut Logging",
        chestnut: 4
      },
      production_choice_cottonwood: {
        name: "Cottonwood Logging",
        cottonwood: 1
      },
      production_choice_cypress: {
        name: "Cypress Logging",
        cypress: 4
      },
      production_choice_ebony: {
        name: "Ebony Logging",
        ebony: 1
      },
      production_choice_elm: {
        name: "Elm Logging",
        elm: 4
      },
      production_choice_eucalyptus: {
        name: "Eucalyptus Logging",
        eucalyptus: 6
      },
      production_choice_fir: {
        name: "Fir Logging",
        fir: 5
      },
      production_choice_hickory: {
        name: "Hickory Logging",
        hickory: 5
      },
      production_choice_ironwood: {
        name: "Ironwood Logging",
        ironwood: 3
      },
      production_choice_lacewood: {
        name: "Lacewood Logging",
        lacewood: 2
      },
      production_choice_mahogany: {
        name: "Mahogany Logging",
        mahogany: 3
      },
      production_choice_maple: {
        name: "Maple Logging",
        maple: 4
      },
      production_choice_oak: {
        name: "Oak Logging",
        oak: 6
      },
      production_choice_pine: {
        name: "Pine Logging",
        pine: 5
      },
      production_choice_redwood: {
        name: "Redwood Logging",
        redwood: 4
      },
      production_choice_rosewood: {
        name: "Rosewood Logging",
        rosewood: 3
      },
      production_choice_sandalwood: {
        name: "Sandalwood Logging",
        sandalwood: 1
      },
      production_choice_spruce: {
        name: "Spruce Logging",
        spruce: 4
      },
      production_choice_turpentine: {
        name: "Turpentine Logging",
        turpentine: 2
      },
      production_choice_walnut: {
        name: "Walnut Logging",
        walnut: 2
      },
      production_choice_willow: {
        name: "Willow Logging",
        willow: 2
      }
    }
  },
  quarries: {
    name: "Quarries",
    singular: "Quarry",

    construction_turns: 3,
    cost: {
      wood: 10,
      iron: 5,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        labourers: 10000,
        peasants: 10000
      }
    },
    produces: {
      production_choice_andesite: {
        name: "Andesite Quarrying",
        andesite: 4
      },
      production_choice_basalt: {
        name: "Basalt Quarrying",
        basalt: 3
      },
      production_choice_diorite: {
        name: "Diorite Quarrying",
        diorite: 4
      },
      production_choice_dolomite: {
        name: "Dolomite Quarrying",
        dolomite: 3
      },
      production_choice_fieldstone: {
        name: "Fieldstone Quarrying",
        fieldstone: 5
      },
      production_choice_flagstone: {
        name: "Flagstone Quarrying",
        flagstone: 4
      },
      production_choice_flint: {
        name: "Flint Quarrying",
        flint: 2
      },
      production_choice_granite: {
        name: "Granite Quarrying",
        granite: 2
      },
      production_choice_limestone: {
        name: "Limstone Quarrying",
        limestone: 5
      },
      production_choice_marble: {
        name: "Marble Quarrying",
        marble: 3
      },
      production_choice_sandstone: {
        name: "Sandstone Quarrying",
        sandstone: 3
      },
      production_choice_slate: {
        name: "Slate Quarrying",
        slate: 2
      }
    }
  }
};
