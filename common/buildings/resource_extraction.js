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
        acacia: 3
      },
      production_choice_ash: {
        ash: 3
      },
      production_choice_balsa: {
        balsa: 3
      },
      production_choice_basswood: {
        basswood: 3
      },
      production_choice_blackwood: {
        blackwood: 3
      },
      production_choice_bloodwood: {
        bloodwood: 3
      },
      production_choice_cedar: {
        cedar: 3
      },
      production_choice_cherry: {
        cherry: 3
      },
      production_choice_chestnut: {
        chestnut: 3
      },
      production_choice_cottonwood: {
        cottonwood: 3
      },
      production_choice_cypress: {
        cypress: 3
      },
      production_choice_ebony: {
        ebony: 3
      },
      production_choice_elm: {
        elm: 3
      },
      production_choice_eucalyptus: {
        eucalyptus: 3
      },
      production_choice_fir: {
        fir: 3
      },
      production_choice_hickory: {
        hickory: 3
      },
      production_choice_ironwood: {
        ironwood: 3
      },
      production_choice_lacewood: {
        lacewood: 3
      },
      production_choice_mahogany: {
        mahogany: 3
      },
      production_choice_maple: {
        maple: 3
      },
      production_choice_oak: {
        oak: 3
      },
      production_choice_pine: {
        pine: 3
      },
      production_choice_redwood: {
        redwood: 3
      },
      production_choice_rosewood: {
        rosewood: 3
      },
      production_choice_sandalwood: {
        sandalwood: 3
      },
      production_choice_spruce: {
        spruce: 3
      },
      production_choice_turpentine: {
        turpentine: 3
      },
      production_choice_walnut: {
        walnut: 3
      },
      production_choice_willow: {
        willow: 3
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
        andesite: 4
      },
      production_choice_basalt: {
        basalt: 3
      },
      production_choice_diorite: {
        diorite: 4
      },
      production_choice_dolomite: {
        dolomite: 3
      },
      production_choice_fieldstone: {
        fieldstone: 5
      },
      production_choice_flagstone: {
        flagstone: 4
      },
      production_choice_flint: {
        flint: 2
      },
      production_choice_granite: {
        granite: 2
      },
      production_choice_limestone: {
        limestone: 5
      },
      production_choice_marble: {
        marble: 3
      },
      production_choice_sandstone: {
        sandstone: 3
      },
      production_choice_slate: {
        slate: 2
      }
    }
  }
};
