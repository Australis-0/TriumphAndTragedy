config.pops = { //[WIP] - Rework chances, icons
  //Pre-Industrial Revolution Pops [Pre-1815]
  aristocrats: {
    name: "Aristocrats",
    formal_name: "Aristocracy",
    singular: "Aristocrat",
    icon: "aristocrats",

    chance: 0.02,
    class: "upper",
    max_modifier_limit: {
      tax_efficiency: 0.60,
      stability_modifier: 0.50
    },
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            tea: 6,
            wine: 5,
            sugar: 5,
            cigars: 3,
            chocolate: 2,
            foods: 2,
            olive_oil: 2,
            whiskey: 1
          },
          furnishings: {
            automobiles: 10,
            lightbulbs: 7,
            aeroplanes: 5,
            cosmetic_products: 5,
            lumber: 5,
            luxury_furniture: 5,
            radios: 5,
            chinaware: 4,
            glass: 4,
            marble: 3,
            tapestries: 3,
            televisions: 3,
            gramophones: 2,
            recording_devices: 2,
            wood_veneers: 2,
            ammunition: 1,
            computers: 1,
            honey: 1,
            sewing_machines: 1,
            sleeping_bags: 1,
            small_arms: 1,
            typewriters: 1,
            violins: 1
          },
          personal: {
            refined_petroil: 5,
            cameras: 4,
            silk: 3,
            soap: 3,
            luxury_clothes: 2,
            souvenirs: 2,
            tyres: 2,
            dyes: 1,
            film: 1,
            jewellery: 1
          }
        },
        staple_goods: {
          basics: {
            lamps: 3,
            wood: 3,
            coals: 2,
            leather: 2,
            medicines: 2,
            paper: 2,
            staple_clothes: 2,
            glasses: 1
          },
          food: {
            meat: 4,
            milk: 3,
            salt: 3,
            grains: 2,
            fruit: 2,
            seasoning: 2,
            tropical_crops: 1,
            tropical_fruit: 1,
            vegetables: 1
          }
        }
      },

      tax_efficiency: 0.03,
      stability_modifier: 0.05
    },
    specialised_pop: true
  },

  artisans: {
    name: "Artisans",
    formal_name: "Artisanry",
    singular: "Artisan",

    artisan_pop: true,
    chance: 0,
    class: "middle",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            foods: 3,
            tobacco: 3,
            sugar: 3,
            alcohol: 2,
            chocolate: 2,
            coffee: 2,
            seasoning: 2,
            tea: 2,
            chewing_gum: 1,
            flour: 1,
            fruit: 1,
            olive_oil: 1,
            tropical_fruit: 1
          },
          furnishings: {
            furniture: 5,
            bicycles: 3,
            felt: 2,
            glass: 2,
            plastics: 2,
            recording_devices: 2,
            tapestries: 2,
            velvet: 2,
            wood_veneers: 2,
            automobiles: 1,
            computers: 1,
            gramophones: 1,
            radios: 1,
            sewing_machines: 1,
            telephones: 1,
            televisions: 1,
            typewriters: 1
          },
          personal: {
            leather_boots: 4,
            work_clothes: 4,
            tailored_suits: 3,
            bowler_hats: 2,
            cameras: 2,
            lamps: 2,
            soap: 2,
            cigars: 1,
            cigarettes: 1,
            clay_pipes: 1,
            cosmetic_products: 1,
            glasses: 1,
            violins: 1,
            wristwatches: 1
          }
        },
        staple_goods: {
          basics: {
            stone: 5,
            tools: 5,
            coals: 3,
            leather: 3,
            wood: 2,
            medicines: 1,
            staple_clothes: 1
          },
          food: {
            grains: 2,
            meeat: 2,
            milk: 2,
            vegetables: 2,
            salt: 1
          }
        }
      }
    },
    specialised_pop: false
  },

  bureaucrats: {
    name: "Bureaucrats",
    formal_name: "Bureaucracy",
    singular: "Bureaucrat",

    chance: 0,
    class: "middle",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            alcohol: 3,
            coffee: 3,
            foods: 3,
            chocolate: 2,
            sugar: 2,
            chewing_gum: 1,
            olive_oil: 1,
            seasoning: 1,
            tea: 1
          },
          furnishings: {
            furniture: 3,
            ceramics: 2,
            lumber: 2,
            luxury_clothes: 2,
            plastics: 2,
            bicycles: 1,
            chinaware: 1,
            clay_pipes: 1,
            small_arms: 1,
            tapestries: 1,
            televisions: 1,
            wood_veneers: 1
          },
          personal: {
            film: 2,
            ammunition: 1,
            cosmetic_products: 1,
            cigars: 1,
            incense: 1,
            lightbulbs: 1,
            souvenirs: 1,
            violins: 1
          }
        },
        staple_goods: {
          basics: {
            paper: 5,
            ink: 4,
            computers: 3,
            cameras: 2,
            telephones: 2,
            typewriters: 2,
            dyes: 1,
            film: 1,
            glasses: 1,
            machine_parts: 1,
            medicines: 1,
            tools: 1,
            wool: 1
          },
          food: {
            grains: 2,
            meat: 2,
            milk: 2,
            vegetables: 2,
            flour: 1,
            fruit: 1,
            salt: 1,
            tropical_crops: 1
          }
        }
      }
    },
    specialised_pop: true
  },

  burghers: {
    name: "Burghers",
    formal_name: "Bourgeois",
    singular: "Burgher",

    chance: 0,
    class: "middle",
    investor_pop: true,
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            wine: 4,
            cigars: 3,
            sugar: 3,
            tea: 3,
            chocolate: 2,
            foods: 2,
            olive_oil: 2,
            whiskey: 1
          },
          furnishings: {
            cosmetic_products: 5,
            lumber: 5,
            luxury_furniture: 5,
            chinaware: 4,
            glass: 4,
            marble: 3,
            tapestries: 3,
            wood_veneers: 2,
            ammunition: 1,
            honey: 1,
            sewing_machines: 1,
            sleeping_bags: 1,
            small_arms: 1,
            violins: 1
          },
          personal: {
            silk: 3,
            soap: 3,
            luxury_clothes: 2,
            souvenirs: 2,
            dyes: 1,
            jewellery: 1
          }
        },
        staple_chores: {
          basics: {
            paper: 5,
            ink: 3,
            lamps: 3,
            wood: 3,
            coals: 2,
            leather: 2,
            medicines: 2,
            paper: 2,
            staple_clothes: 2,
            glasses: 1
          },
          food: {
            meat: 4,
            milk: 3,
            grains: 2,
            fruit: 2,
            seasoning: 2,
            tropical_crops: 1,
            tropical_fruit: 1,
            vegetables: 1
          }
        }
      }
    },
    specialised_pop: true
  },

  clergy: {
    name: "Clergy",
    formal_name: "Clergy",
    singular: "Clergyman",

    chance: 0,
    class: "middle",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            liquor: 5,
            coffee: 2,
            foods: 2,
            sugar: 2,
            tea: 2,
            flour: 1,
            milk: 1,
            olive_oil: 1,
            seasoning: 1
          },
          furnishings: {
            common_furniture: 2,
            radios: 2,
            automobiles: 1,
            ceramics: 1,
            chinaware: 1,
            coal: 1,
            glass: 1,
            lightbulbs: 1,
            telephones: 1,
            televisions: 1,
            wood_veneers: 1,
            violins: 1
          },
          personal: {
            regular_clothes: 3,
            soap: 2,
            cameras: 1,
            glasses: 1,
            refined_petroil: 1,
            shampoo: 1,
            tools: 1
          }
        },
        staple_goods: {
          basics: {
            lamps: 3,
            paper: 3,
            ink: 2,
            medicines: 2,
            coals: 2,
            tailored_suits: 1,
            tonics: 1,
            wine: 1,
            wool: 1
          },
          food: {
            vegetables: 3,
            grains: 3,
            meat: 2,
            fruit: 1,
            salt: 1
          }
        }
      }
    },
    specialised_pop: true
  },

  peasants: {
    name: "Peasants",
    formal_name: "Peasantry",
    singular: "Peasant",

    chance: 0,
    class: "lower",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            alcohol: 2,
            flour: 1,
            foods: 1,
            salt: 1
          },
          furnishings: {
            lamps: 2,
            furniture: 1
          },
          personal: {
            fertiliser: 2,
            incense: 1,
            paper: 1,
            staple_clothes: 1
          }
        },
        staple_goods: {
          basics: {
            work_clothes: 2,
            medicines: 1,
            tools: 1,
            wool: 1
          },
          food: {
            grains: 3,
            vegetables: 3,
            fruit: 1,
            meat: 1,
            salt: 1
          }
        }
      }
    },
    specialised_pop: false
  },

  scholars: {
    name: "Scholars",
    formal_name: "Academia",
    singular: "Scholar",

    chance: 0,
    class: "upper",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            tea: 5,
            seasoning: 3,
            sugar: 3,
            wine: 3,
            coffee: 2,
            foods: 2,
            milk: 2,
            olive_oil: 1
          },
          furnishings: {
            lumber: 3,
            luxury_furniture: 3,
            ceramics: 2,
            fabric: 2,
            wood_veneers: 2,
            chinaware: 1,
            lightbulbs: 1
          }
        },
        staple_goods: {
          basics: {
            paper: 5,
            ink: 4,
            lamps: 4,
            tools: 4,
            work_clothes: 2,
            medicines: 1
          },
          food: {
            bread: 3,
            meat: 3,
            vegetables: 2,
            fruit: 2,
            salt: 2,
            animal_products: 1
          }
        }
      }
    },
    specialised_pop: true
  },

  serfs: {
    name: "Serfs",
    formal_name: "Serfdom",
    singular: "Serf",

    chance: 0,
    class: "lower",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            alcohol: 3,
            foods: 1,
            salt: 1
          },
          furnishings: {
            common_furniture: 1,
            lamps: 1
          },
          personal: {
            fertiliser: 1,
            staple_clothes: 1
          }
        },
        staple_goods: {
          basics: {
            work_clothes: 2,
            tools: 1
          },
          food: {
            vegetables: 2,
            grains: 1,
            fruit: 1,
            meat: 1,
            salt: 1,
            wool: 1
          }
        }
      }
    },
    specialised_pop: false
  },

  slaves: {
    name: "Slaves",
    formal_name: "Slaves",
    singular: "Slave",

    chance: 0,
    class: "lower",
    slave_pop: true,
    specialised_pop: false
  },

  soldiers: {
    name: "Soldiers",
    formal_name: "Soldiery",
    singular: "Soldier",
    icon: "soldiers",

    chance: 0.15,
    class: "lower",
    military_pop: true,
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            foods: 3,
            tea: 3,
            chocolate: 2,
            liquor: 2,
            coffee: 1,
            nuts: 1,
            olive_oil: 1,
            other_crops: 1
          },
          furnishings: {
            stone: 5,
            lumber: 3,
            staple_clothes: 3,
            common_furniture: 2,
            ink: 2,
            marble: 2,
            paper: 2,
            automobiles: 1,
            cabins: 1,
            computers: 1,
            felt: 1,
            granite: 1,
            lamps: 1,
            locomotives: 1,
            radios: 1,
            telephones: 1,
            televisions: 1
          },
          personal: {
            furs: 2,
            jewellery: 2,
            cameras: 1,
            cigars: 1,
            film: 1,
            sleeping_bags: 1,
            souvenirs: 1,
            refined_petroil: 1
          }
        },
        staple_goods: {
          basics: {
            coals: 2,
            medicines: 2,
            ammunition: 1,
            cigarettes: 1,
            small_arms: 1,
            soap: 1,
            tools: 1,
            uniforms: 1
          },
          food: {
            meat: 3,
            bread: 2,
            vegetables: 1,
            fruit: 1,
            grains: 1,
            milk: 1,
            salt: 1
          }
        }
      }
    },
    specialised_pop: false,
    stats_display: true
  },

  //Post-Industrial Revolution [After 1815]

  capitalists: {
    name: "Capitalists",
    formal_name: "Capitalists",
    singular: "Capitalist",

    chance: 0,
    class: "upper",
    inherits: "burghers",
    investor_pop: true,
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            tea: 5,
            seasoning: 4,
            sugar: 4,
            cheese: 3,
            cigars: 3,
            red_wine: 1,
            milk: 1,
            olive_oil: 1,
            white_wine: 1
          },
          furnishings: {
            automobiles: 5,
            lumber: 5,
            leather_shoes: 4,
            luxury_furniture: 4,
            tapestries: 3,
            velvet: 3,
            bicycles: 2,
            bowler_hats: 2,
            chinaware: 2,
            glass: 2,
            lightbulbs: 2,
            silk: 2,
            tailored_suits: 2,
            tyres: 2,
            wood_veneers: 2,
            naval_supplies: 1,
            small_arms: 1
          },
          personal: {
            refined_petroil: 5,
            cameras: 2,
            natural_gas: 2,
            aeroplanes: 1,
            ammunition: 1,
            violins: 1
          }
        },
        staple_goods: {
          basics: {
            coals: 3,
            lamps: 3,
            common_furniture: 2,
            computers: 2,
            ink: 2,
            typewriters: 2,
            automobiles: 1,
            radios: 1,
            telephones: 1,
            televisions: 1
          },
          food: {
            meat: 4,
            grains: 3,
            fruit: 3,
            bread: 2,
            salt: 2,
            vegetables: 2,
            fish: 1,
            foods: 1,
            milk: 1
          }
        }
      }
    },
    specialised_pop: true
  },

  engineers: {
    name: "Engineers",
    formal_name: "Engineers",
    singular: "Engineer",

    chance: 0,
    class: "middle",
    per_100k: {
      luxury_goods: {
        food: {
          tea: 3,
          alcohol: 2,
          canned_food: 2,
          chocolate: 2,
          canned_food: 1,
          cheese: 1,
          chewing_gum: 1
        },
        furnishings: {
          common_furniture: 3,
          chinaware: 2,
          velvet: 2,
          automobiles: 1,
          sleeping_bags: 1,
          tailored_suits: 1
        },
        personal: {
          leather_boots: 2,
          cameras: 1,
          cigars: 1,
          clay_pipes: 1,
          cosmetic_products: 1,
          glasses: 1,
          gramophones: 1,
          film: 1,
          jewellery: 1,
          radios: 1,
          recording_devices: 1,
          refined_petroil: 1,
          televisions: 1
        }
      },
      staple_goods: {
        basics: {
          paper: 3,
          tools: 3,
          computers: 2,
          ink: 2,
          lamps: 2,
          machine_parts: 2,
          medicines: 2,
          clothes: 1,
          natural_gas: 1,
          telephones: 1,
          typewriters: 1
        },
        food: {
          grains: 3,
          meat: 2,
          vegetables: 2,
          fruit: 1,
          fish: 1,
          milk: 1,
          salt: 1,
          seasoning: 1
        }
      }
    },
    specialised_pop: false
  },

  faculty: {
    name: "Faculty",
    formal_name: "Faculty",
    singular: "Faculty",
    icon: "faculty",

    chance: 0.10,
    class: "middle",
    inherits: "scholars",
    max_modifier_limit: {
      research_efficiency: 0.50
    },
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            coffee: 4,
            foods: 3,
            canned_food: 1,
            honey: 1,
            olive_oil: 1
          },
          furnishings: {
            common_furniture: 5,
            glass: 4,
            chinaware: 2,
            lightbulbs: 2,
            wood_veneers: 2,
            automobiles: 1,
            bicycles: 1,
            ceramics: 1,
            luxury_furniture: 1,
            velvet: 1
          },
          personal: {
            boots: 2,
            cigarettes: 2,
            film: 2,
            tyres: 2,
            cameras: 1,
            clay_pipes: 1,
            cosmetic_products: 1,
            gramophones: 1,
            incense: 1,
            jewellery: 1,
            tailored_suits: 1,
            work_clothes: 1
          }
        },
        staple_goods: {
          basics: {
            paper: 4,
            ink: 4,
            lamps: 3,
            tools: 3,
            computers: 2,
            typewriters: 2,
            chalk: 1,
            glasses: 1,
            industrial_chemicals: 1,
            natural_gas: 1,
            recording_devices: 1,
            telephones: 1,
            televisions: 1
          },
          food: {
            vegetables: 3,
            grains: 2,
            fruit: 2,
            meat: 2,
            seasoning: 2,
            tropical_fruit: 2,
            fish: 1,
            milk: 1,
            nuts: 1,
            salt: 1
          }
        }
      },

      research_efficiency: 0.02,
      knowledge: 10
    },
    specialised_pop: true
  },

  farmers: {
    name: "Farmers",
    formal_name: "Agrarians",
    singular: "Farmer",

    chance: 0,
    class: "lower",
    inherits: ["peasants", "serfs"],
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            foods: 3,
            liquor: 2,
            sugar: 2,
            canned_food: 1,
            coffee: 1,
            fish: 1,
            honey: 1,
            nuts: 1,
            olive_oil: 1,
            seasoning: 1,
            tea: 1,
            tropical_fruit: 1
          },
          furnishings: {
            common_furniture: 3,
            aeroplanes: 1,
            automobiles: 1,
            bicycles: 1,
            gramophones: 1,
            radios: 1,
            velvet: 1
          },
          personal: {
            staple_clothes: 2,
            cameras: 1,
            cigarette: 1,
            computers: 1,
            film: 1,
            jewellery: 1,
            recording_devices: 1
          }
        },
        staple_goods: {
          basics: {
            tools: 5,
            fertiliser: 5,
            lumber: 3,
            refined_petroil: 3,
            lamps: 2,
            tractors: 2,
            ammunition: 1,
            industrial_chemicals: 1,
            ink: 1,
            paper: 1,
            small_arms: 1,
            telephones: 1,
            typewriters: 1
          },
          food: {
            grains: 2,
            vegetables: 2,
            fruit: 1,
            meat: 1
          }
        }
      }
    },
    specialised_pop: false
  },

  labourers: {
    name: "Labourers",
    formal_name: "Proletariat",
    singular: "Labourer",
    icon: "labourers",

    chance: 0.73,
    class: "lower",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            liquor: 3,
            coffee: 2,
            foods: 2,
            sugar: 2,
            tea: 2,
            honey: 1,
            nuts: 1,
            olive_oil: 1,
            seasoning: 1,
            tea: 1,
            tropical_crops: 1,
            tropical_fruit: 1
          },
          furnishings: {
            common_furniture: 2,
            lightbulbs: 2,
            automobiles: 1,
            bicycles: 1,
            computers: 1,
            plastics: 1,
            radios: 1,
            telephones: 1,
            televisions: 1
          },
          personal: {
            staple_clothes: 3,
            film: 2,
            cameras: 1,
            luxury_clothes: 1,
            jewellery: 1,
            recording_devices: 1,
            shampoo: 1,
            soap: 1
          }
        },
        staple_goods: {
          basics: {
            tools: 4,
            industrial_chemicals: 2,
            lamps: 2,
            work_clothes: 2,
            paper: 1,
            typewriters: 1
          },
          food: {
            canned_food: 2,
            meat: 2,
            bread: 1,
            fish: 1,
            fruit: 1,
            grains: 1,
            salt: 1,
            vegetables: 1
          }
        }
      }
    },
    specialised_pop: false,
    stats_display: true
  },

  officers: { //Disabled until Last Man Standing
    name: "Officers",
    formal_name: "Officer Corps",
    singular: "Officer",
    disabled: true,

    chance: 0,
    class: "middle",
    per_100k: {
      needs: {
        luxury_goods: {
          food: {
            coffee: 5,
            tea: 4,
            red_wine: 2,
            salt: 2,
            chewing_gum: 1,
            chocolate: 1,
            rice_wine: 1,
            white_wine: 1,
            tonics: 1
          },
          furnishings: {
            automobiles: 3,
            aeroplanes: 2,
            luxury_furniture: 2,
            bicycles: 1,
            gramophones: 1,
            plastics: 1,
            radios: 1,
            sewing_machines: 1,
            sleeping_bags: 1,
            small_arms: 1,
            tapestries: 1
          },
          personal: {
            cigars: 3,
            cosmetic_products: 2,
            film: 2,
            pharmaceuticals: 2,
            shampoo: 2,
            soap: 2,
            tobacco: 2,
            ammunition: 1,
            cameras: 1,
            clay_pipes: 1,
            glass: 1,
            incense: 1,
            jewellery: 1,
            silk: 1,
            souvenirs: 1,
            tools: 1,
            wristwatches: 1
          }
        },
        staple_goods: {
          basics: {
            paper: 5,
            ink: 3,
            lamps: 3,
            computers: 2,
            leather_boots: 2,
            luxury_clothes: 2,
            radios: 2,
            tools: 2,
            telephones: 2,
            uniforms: 2,
            chalk: 1,
            ethanol: 1,
            glasses: 1,
            pocketwatches: 1,
            slate: 1,
            televisions: 1,
            typewriters: 1
          },
          food: {
            bread: 3,
            canned_food: 2,
            grains: 2,
            liquor: 2,
            meat: 2,
            tropical_fruit: 2,
            cheese: 1,
            fish: 1,
            fruit: 1,
            sugar: 1,
            vegetables: 1
          }
        }
      }
    },
    military_pop: true,
    specialised_pop: false
  },

  scientists: {
    name: "Scientists",
    formal_name: "Scientific Community",
    singular: "Scientist",

    chance: 0,
    class: "middle",
    per_100k: {
      luxury_goods: {
        food: {
          coffee: 4,
          foods: 3,
          tea: 2,
          canned_food: 1,
          honey: 1,
          olive_oil: 1
        },
        furnishings: {
          common_furniture: 5,
          glass: 4,
          chinaware: 2,
          lightbulbs: 2,
          wood_veneers: 2,
          automobiles: 1,
          bicycles: 1,
          ceramics: 1,
          luxury_furniture: 1,
          velvet: 1
        },
        personal: {
          boots: 2,
          cigarettes: 2,
          film: 2,
          tyres: 2,
          cameras: 1,
          clay_pipes: 1,
          cosmetic_products: 1,
          gramophones: 1,
          incense: 1,
          jewellery: 1,
          shampoo: 1,
          soap: 1,
          tailored_suits: 1,
          work_clothes: 1
        }
      },
      staple_goods: {
        basics: {
          paper: 4,
          ink: 4,
          lamps: 3,
          tools: 3,
          computers: 2,
          typewriters: 2,
          chalk: 1,
          glasses: 1,
          industrial_chemicals: 1,
          natural_gas: 1,
          recording_devices: 1,
          telephones: 1,
          televisions: 1
        },
        food: {
          vegetables: 3,
          grains: 2,
          fruit: 2,
          meat: 2,
          seasoning: 2,
          tropical_fruit: 2,
          fish: 1,
          milk: 1,
          nuts: 1,
          salt: 1
        }
      }
    },
    specialised_pop: true
  }
};
