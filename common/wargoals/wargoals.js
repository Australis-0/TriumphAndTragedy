config.wargoals = {
  complete_annexation: {
    name: "Complete Annexation",
    description: "Allows the complete annexation of another country.",

    demand_limit: 1,
    infamy: {
      infamy_per_province: 0.05,

      minimum_infamy: 5,
      maximum_infamy: 15
    },

    effect: {
      annex_all: true
    }
  },

  cut_down_to_size: {
    name: "Cut Down To Size",
    description: "Cuts the target country's military down to size. Target may not raise armies for a limited amount of time.",

    demand_limit: 1,
    infamy: {
      infamy_per_percentage: 0.01
    },

    effect: {
      cut_down_to_size: {
        minimum_removal: 0.10,
        maximum_removal: 0.90,
        maximum_turns_demilitarised: 10
      }
    }
  },

  demilitarise_region: {
    name: "Demilitarise Region",
    description: "Demilitarises a target region, not including their capital. Target armies may not move into this area for a limited time.",

    demand_limit: 1,
    infamy: {
      infamy_per_province: 0.05,

      minimum_infamy: 1
    },

    effect: {
      demilitarisation: {
        can_demilitarise_capital: false,
        maximum_provinces_allowed: 35,
        maximum_turns_allowed: 15
      }
    }
  },

  establish_trading_posts: {
    name: "Establish Trading Posts",
    description: "We shall establish trading posts in the target's area amounting to a small limited annexation.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 2
    },

    effect: {
      limited_annexation: {
        can_take_capital: false,
        minimum_provinces_allowed: 3,
        maximum_provinces_allowed: 5
      }
    }
  },

  feudal_conquest: {
    name: "Feudal Conquest",
    description: "Usurp a fief from another ruler.",

    demand_limit: 1,
    infamy: {
      infamy_per_province: 0.05,
      minimum_infamy: 1,
      maximum_infamy: 5
    },

    effect: {
      limited_annexation: {
        can_take_capital: true,
        minimum_provinces_allowed: 20,
        maximum_percentage_allowed: 0.50
      }
    }
  },

  force_tribute: {
    name: "Force Tribute",
    description: "Forces the target to become a tributary for up to 50 turns.",

    demand_limit: 1,
    infamy: {
      infamy_per_percentage: 0.01,

      minimum_infamy: 1.5
    },

    effect: {
      war_reparations: {
        maximum_percentage_allowed: 0.50,
        maximum_turns_allowed: 50
      }
    }
  },

  free_oppressed_people: {
    name: "Free Oppressed People",
    description: "Frees a non-accepted culture from their oppressive overlord by granting them a new state.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 2
    },

    effect: {
      free_oppressed_people: {
        can_free_accepted_cultures: false
      }
    }
  },

  free_people: {
    name: "Free People",
    description: "Grants a target culture a new state (includes accepted cultures).",

    demand_limit: 1,
    infamy: {
      infamy_per_province: 0.05,

      minimum_infamy: 2.5
    },

    effect: {
      free_oppressed_people: {
        can_choose_provinces: true,
        can_free_accepted_cultures: true,
        maximum_country_population_size: 80000000
      }
    }
  },

  install_government: {
    name: "Install Government",
    description: "Imposes a government of our choosing upon the target.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 1
    },

    effect: {
      install_government: {
        can_install_any_government: true
      }
    }
  },

  lebensraum: {
    name: "Lebensraum",
    description: "Conquers whatever territory we can hold from the target.",

    demand_limit: -1, //Unlimited demands
    infamy: {
      infamy_per_province: 0.05,

      minimum_infamy: 5
    },

    effect: {
      annex_all: true
    }
  },

  liberation: {
    name: "Liberation",
    description: "Liberates a vassal from the grasp of their overlord.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 1
    },

    effect: {
      liberation: true
    }
  },

  limited_annexation: {
    name: "Limited Annexation",
    description: "Annexes a portion of the target country.",

    demand_limit: 1,
    infamy: {
      infamy_per_province: 0.03,

      minimum_infamy: 1,
      maximum_infamy: 5
    },

    effect: {
      limited_annexation: {
        can_take_capital: true,
        minimum_provinces_allowed: 8,
        minimum_percentage_allowed: 0.20,
        maximum_provinces_allowed: 50
      }
    }
  },

  puppet: {
    name: "Puppet",
    description: "Turns a target country into your vassal.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 3
    },

    effect: {
      puppet: {
        minimum_turns_puppeted: 25
      }
    }
  },

  seize_stockpiles: {
    name: "Seize Stockpiles",
    description: "Seizes a target country's inventory.",

    demand_limit: 1,
    infamy: {
      infamy_per_percentage: 0.035,

      minimum_infamy: 1
    },

    effect: {
      seize_resources: {
        custom_recipient: true,
        inherit_actions_maximum: 1,
        seize_inventory_maximum: 1
      }
    }
  },

  steer_trade: {
    name: "Seize Trade",
    description: "Forces a country into trading only with us for at least 20 turns.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 2
    },

    effect: {
      steer_trade: {
        custom_recipient: false,
        maximum_turns_allowed: 20
      }
    }
  },

  raid: {
    name: "Raid",
    description: "Loots an enemy country's stockpiles for ourselves.",

    demand_limit: 1,
    infamy: {
      minimum_infamy: 1
    },

    effect: {
      seize_resources: {
        custom_recipient: false,
        seize_inventory_maximum: 0.50
      },
      war_reparations: {
        maximum_percentage_allowed: 0.50,
        maximum_turns_allowed: 50
      }
    }
  },

  release_client_state: {

  },

  revoke_war_reparations: {

  },

  take_treaty_port: {

  },

  war_indemnities: {

  },

  war_reparations: {

  }
};
