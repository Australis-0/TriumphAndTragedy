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

      promotes_to: {
        scholars: {
          base_chance: 0.02,

          limit: {
            education_level: 0.60,
            wealth: 40000,
            wealth_less_than: 250000
          },

          add_chance_libraries: {
            limit: {
              province_has_libraries: true
            },
            value: 0.01
          },
          add_chance_universities: {
            limit: {
              province_has_universities: true
            },
            value: 0.02
          }
        }
      },
      demotes_to: {
        burghers: {
          limit: {
            wealth: 40000
          },

          add_chance_burgher_pops: {
            per_percent: {
              pop_type: "burghers",
              value: 0.01
            }
          }
        },
        clergy: {
          limit: {
            education_level: 0.20
          }
        }
      },

      tax_efficiency: 0.03,
      stability_modifier: 0.05
    },

    promotes_to: {
      scholars: {
        base_chance: 0.02,

        limit: {
          education_level: 0.60,
          wealth: 40000,
          wealth_less_than: 250000
        },

        add_chance_education_01: {
          limit: {
            education_level: 0.80
          },
          value: 0.01
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.02
        }
      }
    },
    demotes_to: {
      burghers: {
        limit: {
          wealth: 40000
        },
        add_chance_burgher_pops: {
          per_percent: {
            pop_type: "burghers",
            value: 0.01
          }
        }
      },
      clergy: {
        limit: {
          education_level: 0.20
        }
      }
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

    promotes_to: {
      burghers: {
        base_chance: 0.02,

        limit: {
          wealth: 10000,
          education_level: 0.20
        },

        add_chance_education_01: {
          limit: {
            education_level: 0.40
          },
          value: 0.01
        },
        add_chance_education_02: {
          limit: {
            education_level: 0.60
          },
          value: 0.01
        },
        add_chance_coastal: {
          limit: {
            province_is_coastal: true
          },
          value: 0.01
        }
      },
      capitalists: {
        base_chance: 0.03,

        limit: {
          wealth: 10000,
          education_level: 0.20,

          has_luxury_goods: true
        },

        add_chance_education_01: {
          limit: {
            education_level: 0.40
          },
          value: 0.01
        },
        add_chance_education_02: {
          limit: {
            education_level: 0.60
          },
          value: 0.01
        },
        add_chance_stock_exchange: {
          limit: {
            province_has_stock_exchanges: true
          },
          value: 0.01
        }
      },
      clergy: {
        base_chance: 0.05,

        limit: {
          is_religious: true
        },

        add_chance_education_01: {
          limit: {
            education_level: 0.20
          },
          value: 0.02
        },
        add_chance_cathedrals: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.02
        },
        add_chance_churches: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.02
        },
        add_chance_mosques: {
          limit: {
            province_has_mosques: true
          },
          value: 0.01
        },
        add_chance_synagogues: {
          limit: {
            province_has_synagogues: true
          },
          value: 0.01
        },
        add_chance_temples: {
          limit: {
            province_has_temples: true
          },
          value: 0.01
        },
        add_chance_education_02: {
          limit: {
            education_level: 0.60
          },
          value: -0.02
        },
        add_chance_clergy_pops: {
          limit: {
            clergy_percentage: 0.10
          },
          value: -0.10
        }
      },
      engineers: {
        base_chance: 0.10,

        limit: {
          education_level: 0.40
        },

        add_chance_education_01: {
          limit: {
            education_level: 0.80
          },
          value: 0.02
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers"
            },
            value: 0.20
          }
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        },
        add_chance_engineer_pops: {
          per_percent: {
            pop_type: "engineers",
            value: 0.01
          }
        }
      }
    },
    demotes_to: {
      farmers: {
        limit: {
          wealth: 500,
          has_industrialised: true,
          wealth_less_than: 5000
        },

        add_chance_rural: {
          limit: {
            province_is_rural: true,
            value: 0.02
          }
        },
        add_chance_farmer_peasant_pops: {
          per_percent_farmers: {
            pop_type: "farmers",
            value: 0.01
          },
          per_percent_peasants: {
            pop_type: "peasants",
            value: 0.01
          }
        },
        add_chance_coastal: {
          limit: {
            province_is_coastal: true
          },
          value: -0.01
        }
      },
      labourers: {
        limit: {
          has_industrialised: true
        },

        add_chance_has_factory: {
          limit: {
            any: {
              province_has_industry: true,
              province_has_petrochemicals: true,
              province_has_processing_facilities: true,
              province_has_refineries: true
            }
          },
          value: 0.02
        },
        add_chance_labourers: {
          per_percent: {
            pop_type: "labourers",
            value: 0.01
          }
        }
      },
      peasants: {
        add_chance_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_peasants: {
          per_percent: {
            pop_type: "peasants",
            value: 0.01
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

    promotes_to: {
      burghers: {
        base_chance: 0.02,

        limit: {
          wealth: 20000
        },

        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          value: 0.01
        }
      },
      capitalists: {
        base_chance: 0.02,

        limit: {
          has_industrialised: true
        },

        add_chance_education: {
          limit: {
            education_level: 0.40
          },
          value: 0.02
        },
        add_chance_stock_exchange: {
          limit: {
            province_has_stock_exchanges: true
          },
          value: 0.01
        },
        add_chance_capitalist_pops: {
          limit: {
            capitalists_percentage: 0.05
          },
          value: -0.10
        }
      }
    },
    demotes_to: {
      clergy: {
        limit: {
          is_religious: true
        },

        add_chance_cathedrals: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.02
        },
        add_chance_churches: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.01
        },
        add_chance_mosques: {
          limit: {
            province_has_mosques: true
          },
          value: 0.01
        },
        add_chance_synagogues: {
          limit: {
            province_has_synagogues: true
          },
          value: 0.01
        },
        add_chance_temples: {
          limit: {
            province_has_temples: true
          },
          value: 0.01
        },
        add_chance_clergy_pops_01: {
          per_percent: {
            pop_type: "clergy",
            value: 0.01
          }
        },
        add_chance_clergy_pops_02: {
          limit: {
            clergy_percentage: 0.10
          },
          value: -0.10
        }
      },
      engineers: {
        limit: {
          has_industrialised: true,
          education_level: 0.40
        },

        add_chance_education: {
          per_education_level: {
            min: 0.40,
            step: 0.20,

            value: 0.02
          }
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers",
              can_afford_staple_goods: true
            },
            value: 0.01
          }
        }
      },
      scholars: {
        limit: {
          education_level: 0.40,
          wealth: 20000
        },

        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.02
        },
        add_chance_botanical_gardens: {
          limit: {
            province_has_botanical_gardens: true
          },
          value: 0.01
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_scholars: {
          per_percent: {
            pop_type: "scholars",
            value: 0.01,
            max: 0.05
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

    promotes_to: {
      aristocrats: {
        base_chance: 0.03,

        limit: {
          wealth: 500000
        },

        add_chance_luxury_goods: {
          limit: {
            has_luxury_goods: true,
            has_luxury_goods_variety: 0.90
          },
          value: 0.05
        },
        add_chance_accepted_culture: {
          limit: {
            has_accepted_culture: true
          },
          value: 0.02
        },
        add_chance_political_influence: {
          per_political_influence: {
            value: 0.002
          }
        },
        add_chance_peasant_serf_pops: {
          per_percent: {
            any_pop: ["peasants", "serfs"],
            value: 0.01,
            max: 0.10
          }
        }
      },
      capitalists: {
        base_chance: 0.05,

        limit: {
          wealth: 40000,
          has_industrialised: true
        },

        add_chance_has_factory: {
          limit: {
            any: {
              province_has_industry: true,
              province_has_petrochemicals: true,
              province_has_processing_facilities: true,
              province_has_refineries: true
            }
          },
          value: 0.05
        },
        add_chance_coastal: {
          limit: {
            province_is_coastal: true
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level: 0.40
          },
          value: 0.02
        },
        add_chance_capitalists: {
          per_percent: {
            pop_type: "capitalists",
            value: 0.01
          }
        },
        add_chance_capitalist_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "capitalists",
              can_afford_staple_goods: true
            },
            value: 0.01
          }
        }
      }
    },
    demotes_to: {
      engineers: {
        limit: {
          has_industrialised: true,
          education_level: 0.40
        },

        add_chance_education: {
          per_education_level: {
            min: 0.40,
            step: 0.20,

            value: 0.02
          }
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        },
        add_chance_engineers: {
          per_percent: {
            pop_type: "engineers",
            value: 0.01
          }
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers",
              can_afford_staple_goods: true
            },
            value: 0.10
          }
        }
      },
      scholars: {
        limit: {
          education_level: 0.40,
          wealth: 20000
        },

        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.02
        },
        add_chance_botanical_gardens: {
          limit: {
            province_has_botanical_gardens: true
          },
          value: 0.01
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_scholars: {
          per_percent: {
            pop_type: "scholars",
            value: 0.01,
            max: 0.05
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

    promotes_to: {
      aristocrats: {
        base_chance: 0.04,

        limit: {
          education_level: 0.20,
          wealth: 100000
        },

        add_chance_national_religion: {
          limit: {
            has_national_religion: true
          },
          value: 0.02
        },
        add_chance_accepted_culture: {
          per_political_influence: {
            value: 0.001
          }
        },
        add_chance_social_conservative: {
          limit: {
            any: {
              is_absolutist: true,
              is_constitutionalist: true,
              is_fascist: true
            }
          },
          value: 0.01
        },
        add_chance_cathedrals: {
          limit: {
            province_has_cathedrals: true
          },
          value: -0.01
        },
        add_chance_temples: {
          limit: {
            province_has_temples: true
          },
          value: -0.01
        },
        add_chance_accepted_culture: {
          limit: {
            has_accepted_culture: false
          },
          value: -0.02
        },
        add_chance_mosques: {
          limit: {
            province_has_mosques: true
          },
          value: -0.02
        },
        add_chance_synagogues: {
          limit: {
            province_has_synagogues: true
          },
          value: -0.02
        }
      },
      bureaucrats: {
        base_chance: 0.03,

        limit: {
          education_level: 0.20,
          wealth: 1000
        },

        add_chance_title: {
          limit: {
            province_is_part_of_title: false
          },
          value: 0.02
        },
        add_chance_bureaucrat_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "bureaucrats",
              can_afford_staple_goods: true
            },
            value: 1
          }
        },
        add_chance_province_title: {
          limit: {
            province_is_part_of_title: true
          },
          value: -0.02
        },
        add_chance_wealth: {
          limit: {
            wealth: 50000
          },
          value: -0.05
        }
      },
      scholars: {
        base_chance: 0.05,

        limit: {
          education_level: 0.40,
          wealth: 2000
        },

        add_chance_centralised: {
          limit: {
            has_centralised: false
          },
          value: 0.02
        },
        add_chance_industrialised: {
          limit: {
            has_industrialised: false
          },
          value: 0.02
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        }
      },
      faculty: {
        base_chance: 0.02,

        limit: {
          has_industrialised: true,
          education_level: 0.60
        },

        add_chance_faculty_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "faculty",
              can_afford_staple_goods: true
            }
          }
        },
        add_chance_faculty_pops: {
          per_percent: {
            pop_type: "faculty",
            value: 0.01,
            max: 0.05
          }
        }
      }
    },
    demotes_to: {
      artisans: {
        limit: {
          has_staple_goods: 0.75
        },

        add_chance_wealth: {
          limit: {
            wealth: 0.02
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          value: 0.02
        },
        add_chance_province_industrialised: {
          limit: {
            province_has_industrialised: true
          },
          value: 0.01
        },
        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.05
          }
        }
      },
      peasants: {
        limit: {
          wealth_less_than: 100
        },

        add_chance_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_peasant_serf_pops: {
          per_percent: {
            any_pop: ["peasants", "serfs"],
            value: 0.01
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

    promotes_to: {
      artisans: {
        base_chance: 0.04,

        limit: {
          has_staple_goods: true,
          has_staple_goods_variety: 0.60,
          wealth: 500
        },

        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          value: 0.02
        },
        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.04
          }
        }
      },
      clergy: {
        base_chance: 0.02,

        limit: {
          wealth: 250
        }
      },
      farmers: {
        base_chance: 0.04,

        limit: {
          wealth: 100
        },

        add_chance_farmer_pops: {
          per_percent: {
            pop_type: "farmers",
            value: 0.01
          }
        }
      },
      labourers: {
        base_chance: 0.08,

        limit: {
          has_industrialised: true
        },

        add_chance_megalopolis: {
          limit: {
            province_has_terrain: "megalopolis"
          },

          value: 0.04
        },
        add_chance_metropolis: {
          limit: {
            province_has_terrain: "metropolis"
          },

          value: 0.03
        },
        add_chance_urban: {
          limit: {
            province_has_terrain: "urban"
          },

          value: 0.02
        },
        add_chance_semi_urban: {
          limit: {
            province_has_terrain: "semi_urban"
          },

          value: 0.01
        },
        add_chance_labourers: {
          per_100k: {
            job_openings: {
              pop_type: "labourers",
              value: 0.10
            }
          }
        },
        add_chance_farmland: {
          limit: {
            province_has_terrain: "farmland"
          },

          value: -0.02
        }
      },
      soldiers: {
        base_chance: 0.03,

        limit: {
          has_standing_army: true,
          province_is_part_of_title: true
        },

        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          base_chance: 0.02
        },
        add_chance_wealth: {
          limit: {
            wealth_less_than: 4000
          },
          base_chance: 0.02
        },
        add_chance_military_building: {
          per_building: {
            has_building_category: "military_buildings",
            value: 0.01
          }
        },
        add_chance_soldiers: {
          per: {
            limit: {
              soldiers_stationed_in_province: 10000
            },
            value: 0.01,
            max: 0.05
          }
        },
        add_chance_mobilised: {
          limit: {
            is_mobilised: true
          },
          value: -0.05
        }
      }
    },
    demotes_to: {
      serfs: {
        base_chance: 0.02,

        limit: {
          has_serfdom: true,
          wealth_less_than: 0,
          education_level_less_than: 0.40
        },

        add_chance_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.20
          },
          value: 0.02
        },
        add_chance_aristocrat_pops: {
          per_percent: {
            pop_type: "aristocrats",
            value: 0.01,
            max: 0.04
          }
        },
        add_chance_debt: {
          limit: {
            wealth_less_than: 0
          },
          per: {
            limit: {
              wealth: -1000
            },
            value: 0.01
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

    promotes_to: {
      faculty: {
        base_chance: 0.04,

        limit: {
          has_industrialised: true
        }
      },
      scientists: {
        base_chance: 0.02,

        limit: {
          has_industrialised: true,
          education_level: 0.60,
          any: {
            province_has_universities: true,
            has_building_category: "research_buildings"
          }
        }
      }
    },
    demotes_to: {
      artisans: {
        limit: {
          has_staple_goods: 0.75
        },

        add_chance_wealth: {
          limit: {
            wealth: 500
          },
          value: 0.02
        },
        add_chance_education_level: {
          limit: {
            education_level: 0.20
          },
          value: 0.02
        },
        add_chance_not_industrialised: {
          limit: {
            province_has_industrialised: false
          },
          value: 0.01
        },
        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.05
          }
        }
      },
      bureaucrats: {
        limit: {
          education_level: 0.20,
          wealth: 1000
        },
        add_chanace_capital: {
          limit: {
            province_is_capital: true
          },
          value: 0.04
        },
        add_chance_education_01: {
          limit: {
            education_level: 0.40
          },
          value: 0.02
        },
        add_chance_education_02: {
          limit: {
            education_level: 0.60
          },
          value: 0.02
        },
        add_chance_urban_terrain: {
          limit: {
            province_has_terrain: ["urban", "metropolis", "megalopolis"]
          },
          value: 0.01
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

    promotes_to: {
      soldiers: {
        base_chance: 0.02,

        limit: {
          has_standing_army: true
        },

        add_chance_industrialised: {
          limit: {
            has_industrialised: true
          },
          value: 0.02
        },
        add_chance_standard_of_living: {
          limit: {
            standard_of_living_less_than: 0.40
          },
          value: 0.01
        },
        add_chance_wealth: {
          limit: {
            wealth: 250
          },
          value: 0.01
        },
        add_chance_soldier_pops: {
          per_percent: {
            pop_type: "soldiers",
            value: 0.01,
            max: 0.05
          }
        }
      }
    },
    demotes_to: {
      slaves: {
        limit: {
          slavery_allowed: true,
          wealth_less_than: 1000
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
    specialised_pop: false,

    promotes_to: {
      peasants: {
        base_chance: 0.01,

        limit: {
          wealth: 250,
          manumittance_allowed: true
        },

        add_chance_accepted_culture: {
          limit: {
            has_accepted_culture: true
          },
          value: 0.02
        },
        add_chance_standard_of_living: {
          limit: {
            standard_of_living: 0.20
          },
          value: 0.01
        }
      }
    }
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

    demotes_to: {
      artisans: {
        limit: {
          has_staple_goods: 0.75
        },

        add_chance_wealth: {
          limit: {
            wealth: 500
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          value: 0.02
        },
        add_chance_province_not_industrialised: {
          limit: {
            province_has_industrialised: false
          },
          value: 0.01
        },
        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.05
          }
        }
      },
      farmers: {
        limit: {
          has_industrialised: true
        },

        add_chance_province_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.20
          },
          value: 0.02
        },
        add_chance_farmer_pops: {
          per_percent: {
            pop_type: "farmers",
            value: 0.01,
            max: 0.05
          }
        }
      },
      engineers: {
        limit: {
          has_industrialised: true,
          education_level: 0.60
        },

        add_chance_wealth: {
          limit: {
            wealth: 1500
          },
          value: 0.02
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers",
              can_afford_staple_goods: true
            },
            value: 0.10
          }
        }
      },
      labourers: {
        limit: {
          has_industrialised: true
        },

        add_chance_urban: {
          limit: {
            province_is_urban: true
          },
          value: 0.02
        },
        add_chance_labourer_pops: {
          per_percent: {
            pop_type: "labourers",
            value: 0.01,
            max: 0.10
          }
        },
        add_chance_labourer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "labourers",
              can_afford_staple_goods: true
            },
            value: 0.01
          }
        }
      },
      peasants: {
        add_chance_province_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.20
          },
          value: 0.02
        },
        add_chance_peasant_pops: {
          per_percent: {
            pop_type: "peasants",
            value: 0.01,
            max: 0.05
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
    industrial_pop: true,
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

    promotes_to: {
      bureaucrats: {
        base_chance: 0.05,

        limit: {
          education_level: 0.20,
          wealth: 5000,
          wealth_less_than: 500000
        },

        add_chance_political_influence: {
          per_political_influence: {
            value: 0.001
          }
        },
        add_chance_bureaucrat_pops: {
          per_percent: {
            pop_type: "bureaucrats",
            value: 0.01,
            max: 0.02
          }
        }
      }
    },
    demotes_to: {
      artisans: {
        base_chance: 0.02,

        limit: {
          wealth_less_than: 40000
        },

        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.05
          }
        }
      },
      engineers: {
        base_chance: 0.04,

        limit: {
          education_level: 0.60,
          wealth_less_than: 40000
        },

        add_chance_education_level: {
          per_education_level: {
            min: 0.60,
            step: 0.20,

            value: 0.02
          }
        },
        add_chance_engineer_pops: {
          per_percent: {
            pop_type: "engineers",
            value: 0.01,
            max: 0.10
          }
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers",
              value: 0.10
            }
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
    industrial_pop: true,
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

    promotes_to: {
      faculty: {
        base_chance: 0.03,

        limit: {
          education_level: 0.40
        },

        add_chance_faculty_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "faculty",
              value: 0.20
            }
          }
        }
      },
      scientists: {
        base_chance: 0.04,

        limit: {
          education_level: 0.60
        },

        add_chance_research_buildings: {
          limit: {
            has_building_category: "research_buildings"
          },
          value: 0.01
        },
        add_chance_universities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        },
        add_chance_scientist_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "scientists",
              value: 0.20
            }
          }
        }
      }
    },
    demotes_to: {
      labourers: {
        add_chance_unemployed: {
          limit: {
            is_employed: false
          },
          value: 0.02
        },
        add_chance_urban: {
          limit: {
            province_has_terrain: ["urban", "metropolis", "megalopolis"]
          },
          value: 0.01
        },
        add_chance_labourer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "labourers",
              value: 0.10
            }
          }
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
    industrial_pop: true,
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

    promotes_to: {
      scientists: {
        base_chance: 0.04,

        limit: {
          education_level: 0.60
        },

        add_chance_employed_at_university: {
          limit: {
            is_employed_at: "universities"
          },
          value: 0.02
        },
        add_chance_education_level: {
          per_education_level: {
            min: 0.60,
            step: 0.10,

            value: 0.01
          }
        },
        add_chance_wealth: {
          limit: {
            wealth: 25000
          },
          value: 0.01
        }
      }
    },
    demotes_to: {
      clergy: {
        limit: {
          is_religious: true
        },

        add_chance_cathedrals: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.02
        },
        add_chance_unemployed: {
          limit: {
            is_employed: false
          },
          value: 0.02
        },
        add_chance_churches: {
          limit: {
            province_has_cathedrals: true
          },
          value: 0.02
        },
        add_chance_mosques: {
          limit: {
            province_has_mosques: true
          },
          value: 0.01
        },
        add_chance_synagogues: {
          limit: {
            province_has_synagogues: true
          },
          value: 0.01
        },
        add_chance_temples: {
          limit: {
            province_has_temples: true
          },
          value: 0.01
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.20
          },
          value: -0.08
        }
      },
      labourers: {
        add_chance_unemployed: {
          limit: {
            is_employed: false
          },
          value: 0.02
        },
        add_chance_urban_terrain: {
          limit: {
            province_has_terrain: ["urban", "metropolis", "megalopolis"]
          },
          value: 0.01
        },
        add_chance_labourer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "labourers",
              value: 0.10
            }
          }
        }
      }
    },

    specialised_pop: true
  },

  farmers: {
    name: "Farmers",
    formal_name: "Agrarians",
    singular: "Farmer",

    chance: 0,
    class: "lower",
    industrial_pop: true,
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

    promotes_to: {
      labourers: {
        base_chance: 0.03,

        limit: {
          has_industrialised: true
        },

        add_chance_wealth: {
          limit: {
            wealth_less_than: 500
          },
          value: 0.04
        },
        add_chance_urban_terrain: {
          limit: {
            province_has_terrain: ["urban", "metropolis", "megalopolis"]
          },
          value: 0.02
        },
        add_chance_labourer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "labourers",
              value: 0.10
            }
          }
        },
        add_chance_education: {
          limit: {
            education_level: 0.20
          },
          value: 0.01
        },
        add_chance_wealth: {
          limit: {
            wealth: 1000
          },
          value: -0.08
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
    industrial_pop: true,
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

    promotes_to: {
      artisans: {
        base_chance: 0.04,

        limit: {
          wealth: 250
        },

        add_chance_art_academies: {
          limit: {
            province_has_art_academies: true
          },
          value: 0.02
        },
        add_chance_libraries: {
          limit: {
            province_has_libraries: true
          },
          value: 0.01
        },
        add_chance_artisan_pops: {
          per_percent: {
            pop_type: "artisans",
            value: 0.01,
            max: 0.10
          }
        }
      },
      engineers: {
        base_chance: 0.06,

        limit: {
          education_level: 0.40,
          province_has: {
            job_openings: {
              pop_type: "engineers"
            }
          }
        },

        add_chance_education: {
          limit: {
            education_level: 0.60
          },
          value: 0.02
        },
        add_chance_unviersities: {
          limit: {
            province_has_universities: true
          },
          value: 0.01
        },
        add_chance_engineer_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "engineers",
              value: 0.01,
              max: 0.04
            }
          }
        },
        add_chance_engineer_pops: {
          per_percent: {
            pop_type: "engineers",
            value: 0.01,
            max: 0.04
          }
        }
      },
      faculty: {
        base_chance: 0.04,

        limit: {
          education_level: 0.30,
          province_has: {
            job_openings: {
              pop_type: "faculty"
            }
          }
        },

        add_chance_education: {
          limit: {
            education_level: 0.40
          },
          value: 0.02
        },
        add_chance_faculty_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "faculty",
              value: 1,
              max: 0.05
            }
          }
        }
      }
    },
    demotes_to: {
      farmers: {
        base_chance: 0.02,

        limit: {
          is_employed: false,
          has_building_category: "agriculture"
        },

        add_chance_province_rural: {
          limit: {
            province_is_rural: true
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.20
          },
          value: 0.01
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
    industrial_pop: true,
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
    industrial_pop: true,
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

    promotes_to: {
      bureaucrats: {
        base_chance: 0.02,

        limit: {
          education_level: 0.40,
          province_has: {
            job_openings: {
              pop_type: "bureaucrats"
            }
          }
        },

        add_chance_unemployed: {
          limit: {
            is_employed: false
          },
          value: 0.02
        },
        add_chance_research_buildings: {
          limit: {
            any: {
              has_no_building_category: "research_buildings",
              building_category_research_buildings: {
                fully_employed: false
              }
            }
          },
          value: 0.01
        }
      }
    },
    demotes_to: {
      engineers: {
        add_chance_unemployed: {
          limit: {
            is_employed: false
          },
          value: 0.02
        },
        add_chance_education: {
          limit: {
            education_level_less_than: 0.80
          },
          value: 0.01
        },
        add_chance_engineer_pops: {
          per_percent: {
            pop_type: "engineers",
            value: 0.01,
            max: 0.04
          }
        }
      },
      faculty: {
        add_chance_education: {
          limit: {
            education_level_less_than: 0.80
          },
          value: 0.01
        },
        add_chance_faculty_job_openings: {
          per_100k: {
            job_openings: {
              pop_type: "faculty",
              can_afford_staple_goods: true,
              value: 0.01,
              max: 0.04
            }
          }
        }
      }
    },

    specialised_pop: true
  }
};
