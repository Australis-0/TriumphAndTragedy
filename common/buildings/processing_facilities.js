config.buildings.processing_facilities = {
  order: 14,

  apothecaries: {
    name: "Apothecaries",
    singular: "Apothecary",

    construction_turns: 2,
    cost: {
      stone: 7,
      lumber: 5,
      wood: 5,
      woad: 3,
      money: 5500
    },
    maintenance: {
      production_choice_one: {
        tropical_crops: 3
      },
      production_choice_two: {
        other_crops: 5
      }
    },
    manpower_cost: {
      artisans: 200
    },
    produces: {
      production_choice_one: {
        traditional_medicines: 5
      },
      production_choice_two: {
        traditional_medicines: 5
      }
    }
  },
  arms_factories: {
    name: "Arms Factories",
    singular: "Arms Factory",

    construction_turns: 4,
    cost: {
      limestone: 16,
      bricks: 12,
      cement: 8,
      lumber: 8,
      tools: 5,
      steel: 5,
      money: 8000
    },
    maintenance: {
      steel: 3,
      lumber: 2,
      brass: 1,
      machine_parts: 1
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 500
    },
    produces: {
      small_arms: 20
    }
  },
  audio_appliance_factories: {
    name: "Audio Appliance Factories",
    singular: "Audio Appliance Factory",

    construction_turns: 5,
    cost: {
      bricks: 15,
      ceramics: 10,
      cement: 8,
      machine_parts: 8,
      steel_beams: 6,
      lightbulbs: 6,
      filaments: 4,
      glass: 4,
      money: 12000
    },
    maintenance: {
      production_choice_gramophones: {
        brass: 5,
        lumber: 3,
        machine_parts: 3
      },
      production_choice_radios: {
        electric_gear: 6,
        rubber: 5,
        glass: 5,
        copper_wire: 5
      },
      production_choice_recording_devices: {
        copper_wire: 8,
        rubber: 5,
        electric_gear: 5,
        glass: 5,
        filaments: 4,
        brass: 3
      }
    },
    manpower_cost: {
      labourers: 2500,
      engineers: 1000
    },
    produces: {
      production_choice_gramophones: {
        gramophones: 5
      },
      production_choice_radios: {
        radios: 15
      },
      production_choice_recording_devices: {
        recording_devices: 10
      }
    }
  },
  automobile_factories: {
    name: "Automobile Factories",
    singular: "Automobile Factory",

    construction_turns: 6,
    cost: {
      bricks: 20,
      glass: 16,
      ceramics: 16,
      steel_beams: 14,
      machine_parts: 12,
      electric_gear: 10,
      copper_wire: 10,
      reinforced_concrete: 10,
      lightbulbs: 8,
      glass: 5,
      cement: 5,
      money: 20000
    },
    maintenance: {
      production_choice_cars: {
        steel: 8,
        batteries: 5,
        machine_parts: 5,
        rubber: 4,
        tyres: 4,
        aluminium: 3,
        electric_gear: 3,
        filaments: 2,
        leather: 1
      },
      production_choice_humvees: {
        steel: 10,
        batteries: 6,
        machine_parts: 6,
        rubber: 5,
        tyres: 4,
        aluminium: 2,
        electric_gear: 2,
        leather: 2,
        filaments: 1
      },
      production_choice_jeeps: {
        steel: 5,
        rubber: 4,
        tyres: 4,
        machine_parts: 3,
        batteries: 2,
        aluminium: 1,
        electric_gear: 1,
        filaments: 1
      },
      production_choice_lorries: {
        steel: 12,
        rubber: 8,
        tyres: 8,
        batteries: 6,
        machine_parts: 5,
        aluminium: 4,
        electric_gear: 4,
        filaments: 2
      },
      production_choice_luxury_cars: {
        steel: 15,
        batteries: 8,
        electric_gear: 8,
        rubber: 6,
        aluminium: 5,
        chromium: 5,
        leather: 5,
        machine_parts: 5,
        filaments: 4,
        tyres: 4,
        dyes: 3,
        lightbulbs: 2,
        luxury_furniture: 1
      },
      production_choice_motorbikes: {
        steel: 3,
        machine_parts: 3,
        batteries: 2,
        filaments: 2,
        rubber: 2,
        tyres: 2,
        aluminium: 1,
        electric_gear: 1,
        leather: 1
      },
      production_choice_steam_carriages: {
        machine_parts: 8,
        steel: 5,
        rubber: 4,
        tyres: 3,
        filaments: 2,
        tungsten: 1
      },
      production_choice_tractors: {
        steel: 10,
        machine_parts: 8,
        rubber: 6,
        tyres: 4,
        electric_gear: 3,
        aluminium: 1,
        lead: 1
      },
      production_choice_vans: {
        steel: 9,
        batteries: 5,
        machine_parts: 5,
        electric_gear: 4,
        tyres: 4,
        aluminium: 3,
        filaments: 3,
        leather: 2,
        lightbulbs: 1
      }
    },
    manpower_cost: {
      labourers: 20000,
      engineers: 8500
    },
    produces: {
      production_choice_cars: {
        cars: 5
      },
      production_choice_humvees: {
        humvees: 1
      },
      production_choice_jeeps: {
        jeeps: 3
      },
      production_choice_lorries: {
        lorries: 4
      },
      production_choice_luxury_cars: {
        luxury_cars: 1
      },
      production_choice_motorbikes: {
        motorbikes: 6
      },
      production_choice_steam_carriages: {
        steam_carriages: 3
      },
      production_choice_tractors: {
        tractors: 5
      },
      production_choice_vans: {
        vans: 4
      }
    }
  },
  bakeries: {
    name: "Bakeries",
    singular: "Bakery",

    construction_turns: 2,
    cost: {
      lumber: 8,
      bricks: 5,
      stone: 5,
      glass: 3,
      money: 2000
    },
    maintenance: {
      flour: 5,
      wood: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 600,
        labourers: 600
      },
      artisans: 500
    },
    produces: {
      bread: 5
    }
  },
  bicycle_factories: {
    name: "Bicycle Factories",
    singular: "Bicycle Factory",

    construction_turns: 3,
    cost: {
      iron: 12,
      ceramics: 10,
      bricks: 10,
      glass: 9,
      steel_beams: 8,
      machine_parts: 8,
      cement: 6,
      copper_wire: 5,
      money: 5000
    },
    maintenance: {
      rubber: 3,
      steel: 2,
      leather: 1
    },
    manpower_cost: {
      labourers: 2000,
      engineers: 100
    },
    produces: {
      bicycles: 8
    }
  },
  breweries: {
    name: "Breweries",
    singular: "Brewery",

    construction_turns: 4,
    cost: {
      iron: 12,
      bricks: 10,
      lumber: 8,
      copper: 6,
      oak_wood: 6,
      money: 3500
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 500
    }
  },
  brick_kilns: {
    name: "Brick Kilns",
    singular: "Brick Kiln",

    construction_turns: 2,
    cost: {
      stone: 12,
      lumber: 8,
      wood: 6,
      money: 2000
    },
    maintenance: {
      production_choice_beer: {
        processed_hops: 2,
        malt: 2
      },
      production_choice_tonics: {
        gin: 3,
        citrus: 1
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      production_choice_beer: {
        beer: 5
      },
      production_choice_tonics: {
        tonics: 5
      }
    }
  },
  camera_factories: {
    name: "Camera Factories",
    singular: "Camera Factory",

    construction_turns: 4,
    cost: {
      iron: 20,
      machine_parts: 16,
      reinforced_concrete: 15,
      ceramics: 12,
      glass: 8,
      steel_beams: 8,
      regular_steel: 6,
      lightbulbs: 6,
      copper: 5,
      film: 5,
      electric_gear: 4,
      money: 10000
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 200
    }
  },
  candleworks: {
    name: "Candleworks",
    singular: "Candlework",

    construction_turns: 1,
    cost: {
      lumber: 8,
      limestone: 5,
      tallow: 4,
      wood: 4,
      cement: 3,
      money: 1500
    },
    maintenance: {
      machine_parts: 3,
      glass: 3,
      leather: 2,
      steel: 1,
      aluminium: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      cameras: 6
    }
  },
  canneries: {
    name: "Canneries",
    singular: "Cannery",

    construction_turns: 3,
    cost: {
      steel_beams: 12,
      machine_parts: 10,
      regular_steel: 9,
      tin: 8,
      glass: 8,
      lamps: 4,
      lumber: 4,
      money: 7500
    },
    manpower_cost: {
      any_pop: {
        peasants: 8500,
        labourers: 8500
      }
    }
  },
  capacitor_factories: {
    name: "Capacitor Factories",
    singular: "Capacitor Factory",

    construction_turns: 5,
    cost: {
      regular_steel: 12,
      reinforced_concrete: 10,
      glass: 10,
      machine_parts: 8,
      bricks: 8,
      ceramics: 6,
      cement: 5,
      money: 12500
    },
    maintenance: {
      production_choice_canned_food: {
        tin: 3,
        meat: 5
      },
      production_choice_jam: {
        strawberries: 3,
        sugar: 3,
        glass: 2
      }
    },
    manpower_cost: {
      labourers: 8000,
      engineers: 500
    },
    produces: {
      production_choice_canned_food: {
        canned_food: 5
      },
      production_choice_jam: {
        jam: 5
      }
    }
  },
  cement_factories: {
    name: "Cement Factories",
    singular: "Cement Factory",

    construction_turns: 4,
    cost: {
      bricks: 13,
      ceramics: 10,
      lumber: 8,
      steel: 8,
      glass: 5,
      tools: 5,
      money: 5000
    },
    maintenance: {
      limestone: 5,
      calcium_carbonate: 2
    },
    manpower_cost: {
      any_pop: {
        peasants: 4000,
        labourers: 4000
      }
    },
    produces: {
      cement: 5
    }
  },
  cheesemakers: {
    name: "Cheesemakers",
    singular: "Cheesemaker",

    construction_turns: 8,
    cost: {
      lumber: 12,
      oak_wood: 8,
      iron: 6,
      money: 1000
    },
    maintenance: {
      production_choice_american: {
        cheddar: 3,
        milk: 1
      },
      production_choice_gorgonzola: {
        milk: 5
      },
      production_choice_roquefort: {
        milk: 5
      },
      production_choice_stilton: {
        milk: 5
      },
      production_choice_brie: {
        milk: 5
      },
      production_choice_butterkase: {
        milk: 5
      },
      production_choice_cantal: {
        milk: 5
      },
      production_choice_cascaval: {
        milk: 5
      },
      production_choice_cheddar: {
        milk: 5
      },
      production_choice_cheshire: {
        milk: 5
      },
      production_choice_coulommiers: {
        milk: 5
      },
      production_choice_cream_cheese: {
        milk: 7
      },
      production_choice_edam: {
        milk: 5
      },
      production_choice_feta: {
        milk: 5
      },
      production_choice_gloucester: {
        milk: 5
      },
      production_choice_gouda: {
        milk: 5
      },
      production_choice_grana_padano: {
        milk: 5
      },
      production_choice_havarti: {
        milk: 5
      },
      production_choice_jarlsberg: {
        milk: 5
      },
      production_choice_munster: {
        milk: 5
      },
      production_choice_neufchatel: {
        milk: 5
      },
      production_choice_parmesan: {
        milk: 5
      },
      production_choice_pecorino: {
        milk: 5
      },
      production_choice_port_salut: {
        milk: 5
      },
      production_choice_ricotta: {
        milk: 5
      },
      production_choice_swiss: {
        milk: 5
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      production_choice_american: {
        american: 10
      },
      production_choice_gorgonzola: {
        gorgonzola: 4
      },
      production_choice_roquefort: {
        roquefort: 3
      },
      production_choice_stilton: {
        stilton: 5
      },
      production_choice_brie: {
        brie: 5
      },
      production_choice_butterkase: {
        butterkase: 5
      },
      production_choice_cantal: {
        cantal: 2
      },
      production_choice_cascaval: {
        cascaval: 3
      },
      production_choice_cheddar: {
        cheddar: 5
      },
      production_choice_cheshire: {
        cheshire: 4
      },
      production_choice_coulommiers: {
        coulommiers: 5
      },
      production_choice_cream_cheese: {
        cream_cheese: 5
      },
      production_choice_edam: {
        edam: 2
      },
      production_choice_feta: {
        feta: 3
      },
      production_choice_gloucester: {
        gloucester: 1
      },
      production_choice_gouda: {
        gouda: 2
      },
      production_choice_grana_padano: {
        grana_padano: 1
      },
      production_choice_havarti: {
        havarti: 3
      },
      production_choice_jarlsberg: {
        jarlsberg: 2
      },
      production_choice_munster: {
        munster: 4
      },
      production_choice_neufchatel: {
        neufchatel: 4
      },
      production_choice_parmesan: {
        parmesan: 3
      },
      production_choice_pecorino: {
        pecorino: 2
      },
      production_choice_port_salut: {
        port_salut: 2
      },
      production_choice_ricotta: {
        ricotta: 5
      },
      production_choice_swiss: {
        swiss: 4
      }
    }
  },
  chocolatiers: {
    name: "Chocolatiers",
    singular: "Chocolatier",

    construction_turns: 7,
    cost: {
      iron: 8,
      lumber: 6,
      copper: 6,
      mahogany_lumber: 5,
      lamps: 4,
      glass: 4,
      ceramics: 3,
      tools: 2,
      money: 3000
    },
    maintenance: {
      cacao: 5,
      sugar: 4,
      milk: 2,
      olive_oil: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 2500,
        labourers: 2500
      },
      artisans: 350
    },
    produces: {
      chocolate: 6
    }
  },
  cigar_factories: {
    name: "Cigar Factories",
    singular: "Cigar Factory",

    construction_turns: 2,
    cost: {
      lumber: 12,
      bricks: 10,
      glass: 6,
      common_furniture: 5,
      tobacco: 4,
      money: 3500
    },
    maintenance: {
      tobacco: 8
    },
    manpower_cost: {
      any_pop: {
        peasants: 2500,
        labourers: 2500
      },
      artisans: 50
    },
    produces: {
      cigars: 3
    }
  },
  cigarette_factories: {
    name: "Cigarette Factories",
    singular: "Cigarette Factory",

    construction_turns: 3,
    cost: {
      iron: 12,
      machine_parts: 8,
      copper: 6,
      lumber: 6,
      lamps: 4,
      money: 2500
    },
    maintenance: {
      tobacco: 6,
      paper: 2
    },
    manpower_cost: {
      labourers: 7000
    },
    produces: {
      cigarette: 8
    }
  },
  coffee_roasters: {
    name: "Coffee Roasters",
    singular: "Coffee Roaster",

    construction_turns: 2,
    cost: {
      lumber: 12,
      copper: 8,
      iron: 8,
      tools: 5,
      money: 2000
    },
    maintenance: {
      coffee_beans: 5,
      wood: 1
    },
    manpower_cost: {
      labourers: 5000
    },
    produces: {
      coffee: 5
    }
  },
  computer_factories: {
    name: "Computer Factories",
    singular: "Computer Factory",

    construction_turns: 6,
    cost: {
      reinforced_concrete: 25,
      steel_beams: 20,
      machine_parts: 18,
      electric_gear: 18,
      glass: 15,
      ceramics: 12,
      copper_wire: 12,
      glass: 10,
      common_furniture: 8,
      cement: 6,
      bricks: 5,
      stone: 5,
      gold: 2,
      money: 25000
    },
    maintenance: {
      integrated_circuits: 8,
      plastics: 3,
      glass: 2,
      gold: 1,
      copper: 1
    },
    manpower_cost: {
      engineers: 20000,
      labourers: 35000
    },
    produces: {
      computers: 10
    }
  },
  concrete_plants: {
    name: "Concrete Plants",
    singular: "Concrete Plant",

    construction_turns: 4,
    cost: {
      iron: 10,
      ceramics: 9,
      steel_beams: 8,
      machine_parts: 6,
      tools: 5,
      lamps: 5,
      glass: 4,
      money: 8000
    },
    maintenance: {
      stone: 5,
      cement: 1
    },
    manpower_cost: {
      labourers: 10000
    },
    produces: {
      concrete: 10
    }
  },
  cottage_drug_industries: {
    name: "Cottage Drug Industries",
    singular: "Cottage Drug Industry",

    construction_turns: 1,
    cost: {
      lumber: 8,
      glass: 5,
      lamps: 3,
      industrial_chemicals: 2,
      tools: 2,
      money: 500
    },
    maintenance: {
      production_choice_cannabis: {
        hemp: 5
      },
      production_choice_hashish: {
        cannabis: 5
      },
      production_choice_opium: {
        poppies: 3
      }
    },
    manpower_cost: {
      labourers: 20000
    },
    produces: {
      production_choice_cannabis: {
        cannabis: 3
      },
      production_choice_hashish: {
        hashish: 3
      },
      production_choice_opium: {
        opium: 2
      }
    }
  },
  cosmetic_works: {
    name: "Cosmetic Works",
    singular: "Cosmetic Works",

    construction_turns: 3,
    cost: {
      iron: 12,
      lumber: 10,
      tools: 8,
      glass: 6,
      dyes: 4,
      money: 12000
    },
    maintenance: {
      dyes: 6,
      glass: 1,
      soap: 1
    },
    manpower_cost: {
      any_pop: {
        labourers: 15000,
        peasants: 15000
      },
      artisans: 200,
      engineers: 500
    },
    produces: {
      cosmetic_products: 8
    }
  },
  distilleries: {
    name: "Distilleries",
    singular: "Distillery",

    construction_turns: 4,
    cost: {
      iron: 10,
      lumber: 9,
      copper: 8,
      glass: 5,
      brass: 2,
      bronze: 2,
      money: 4500
    },
    maintenance: {
      production_choice_gin: {
        grain: 3,
        citrus: 1
      },
      production_choice_schnapps: {
        potatoes: 5
      },
      production_choice_rum: {
        molasses: 3,
        wheat: 2
      },
      production_choice_tequila: {
        blue_agaves: 3,
        wood: 1
      },
      production_choice_tonics: {
        gin: 3,
        citrus: 1
      },
      production_choice_vodka: {
        grains: 2,
        wood: 1
      },
      production_choice_whiskey: {
        wheat: 3,
        copper: 1,
        malt: 1
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 4000,
        labourers: 4000
      },
      artisans: 200
    },
    produces: {
      production_choice_gin: {
        gin: 7
      },
      production_choice_schnapps: {
        schnapps: 5
      },
      production_choice_rum: {
        rum: 3
      },
      production_choice_tequila: {
        tequila: 5
      },
      production_choice_tonics: {
        tonics: 5
      },
      production_choice_vodka: {
        vodka: 3
      },
      production_choice_whiskey: {
        whiskey: 3
      }
    }
  },
  drug_labs: {
    name: "Drug Labs",
    singular: "Drug Lab",

    construction_turns: 2,
    cost: {
      glass: 8,
      industrial_chemicals: 6,
      machine_parts: 6,
      electric_gear: 4,
      lightbulbs: 4,
      tools: 2,
      money: 1000
    },
    maintenance: {
      production_choice_carfentanil: {
        fentanyl: 5
      },
      production_choice_crack_cocaine: {
        sodium_carbonate: 1,
        cocaine: 1
      },
      production_choice_fentanyl: {
        analgesics: 5
      },
      production_choice_heroin: {
        opium: 5
      },
      production_choice_methamphetamine: {
        chlorine: 2,
        acetone: 1,
        alumina: 1,
        benzene: 1,
        hydrogen_chloride: 1
      },
      production_choice_psychedelics: {
        other_crops: 3,
        industrial_chemicals: 1,
        gas: 1
      }
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 2000
    },
    produces: {
      production_choice_carfentanil: {
        carfentanil: 2
      },
      production_choice_cocaine: {
        cocaine: 2
      },
      production_choice_crack_cocaine: {
        crack_cocaine: 5
      },
      production_choice_fentanyl: {
        fentanyl: 4
      },
      production_choice_hashish: {
        hashish: 3
      },
      production_choice_heroin: {
        heroin: 3
      },
      production_choice_methamphetamine: {
        methamphetamine: 5
      },
      production_choice_psychedelics: {
        psychedelics: 2
      }
    }
  },
  dye_works: {
    name: "Dye Works",
    singular: "Dye Works",

    construction_turns: 3,
    cost: {
      wood: 6,
      woad: 3,
      indigo: 2,
      tools: 1,
      money: 1000
    },
    maintenance: {
      raw_dyes: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 3500,
        labourers: 3500
      }
    },
    produces: {
      dyes: 5
    }
  },
  engine_factories: {
    name: "Engine Factories",
    singular: "Engine Factory",

    construction_turns: 5,
    cost: {
      reinforced_concrete: 16,
      iron: 14,
      ceramics: 12,
      steel_beams: 12,
      machine_parts: 10,
      copper: 8,
      electric_gear: 6,
      lightbulbs: 4,
      common_furniture: 4,
      rubber: 4,
      money: 8500
    },
    maintenance: {
      steel: 5,
      aluminium: 3,
      turbines: 3,
      electric_gear: 2,
      copper_wire: 2
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 750
    },
    produces: {
      engines: 5
    }
  },
  explosive_factories: {
    name: "Explosive Factories",
    singular: "Explosive Factory",

    construction_turns: 4,
    cost: {
      machine_parts: 10,
      copper_wire: 8,
      industrial_chemicals: 8,
      rubber: 6,
      steel_beams: 5,
      glass: 5,
      brass: 5,
      common_furniture: 4,
      lamps: 4,
      money: 10000
    },
    maintenance: {
      production_choice_anfo: {
        refined_petroil: 4,
        ammonia: 3,
        carbon: 2,
        aluminium: 1
      },
      production_choice_dynamite: {
        nitric_acid: 3,
        sulphuric_acid: 3,
        clay: 1
      },
      production_choice_plastic_explosives: {
        nitric_acid: 5,
        gas: 3,
        ammonia: 3,
        formaldehyde: 2,
        bituminous_coal: 1,
        chloride: 1
      },
      production_choice_tnt: {
        methylbenzene: 3,
        nitric_acid: 2,
        sulphuric_acid: 2
      },
      production_choice_gunpowder: {
        sulphur: 2,
        charcoal: 1,
        saltpetre: 1
      },
      production_choice_ap_rounds_one: {
        gunpowder: 5,
        steel: 3,
        tungsten: 3,
        aluminium: 1,
        nickel: 1,
        chromium: 1,
        molybdenum: 1
      },
      production_choice_ap_rounds_two: {
        gunpowder: 5,
        steel: 3,
        tungsten: 3,
        aluminium: 1,
        silicon: 1,
        manganese: 1,
        chromium: 1
      },
      production_choice_delayed_fuse_shells: {
        gunpowder: 5,
        brass: 4,
        paper: 2,
        steel: 1,
        machine_parts: 1
      },
      production_choice_regular_shells: {
        gunpowder: 5,
        iron: 3,
        steel: 1
      },
      production_choice_high_calibre_ammunition: {
        gunpowder: 2,
        lead: 2,
        brass: 2,
        coal: 1,
        iron: 1
      },
      production_choice_low_calibre_ammunition: {
        gunpowder: 2,
        lead: 2,
        coals: 1,
        iron: 1
      },
      production_choice_sabot_rounds_one: {
        gunpowder: 10,
        tungsten: 5,
        steel: 2,
        plastics: 1
      },
      production_choice_sabot_rounds_two: {
        gunpowder: 10,
        tungsten: 5,
        steel: 2,
        plastics: 1,
        depleted_uranium: 1
      },
      production_choice_torpedoes: {
        machine_parts: 8,
        steel: 5,
        explosives: 5,
        electric_gear: 2,
        brass: 2,
        copper: 2
      }
    },
    manpower_cost: {
      labourers: 15000,
      engineers: 300
    },
    produces: {
      production_choice_anfo: {
        anfo: 5
      },
      production_choice_dynamite: {
        dynamite: 3
      },
      production_choice_plastic_explosives: {
        plastic_explosives: 3
      },
      production_choice_tnt: {
        tnt: 5
      },
      production_choice_gunpowder: {
        gunpowder: 5
      },
      production_choice_ap_rounds_one: {
        ap_rounds: 10
      },
      production_choice_ap_rounds_two: {
        ap_rounds: 10
      },
      production_choice_delayed_fuse_shells: {
        delayed_fuse_shells: 5
      },
      production_choice_regular_shells: {
        regular_shells: 15
      },
      production_choice_high_calibre_ammunition: {
        high_calibre_ammunition: 25
      },
      production_choice_low_calibre_ammunition: {
        low_calibre_ammunition: 50
      },
      production_choice_sabot_rounds_one: {
        sabot_rounds: 3
      },
      production_choice_sabot_rounds_two: {
        sabot_rounds: 10
      }
    }
  },
  fabrication_plants: {
    name: "Fabrication Plants",
    singular: "Fabrication Plant",

    construction_turns: 12,
    cost: {
      electric_gear: 20,
      machine_parts: 18,
      reinforced_concrete: 15,
      glass: 14,
      ceramics: 12,
      tools: 10,
      stainless_steel: 9,
      lightbulbs: 8,
      transistors: 5,
      capacity: 5,
      common_furniture: 5,
      money: 40000
    },
    maintenance: {
      transistors: 3,
      resistor_factories: 1,
      capacity: 1,
      copper_wire: 1,
      plastics: 1,
      electric_gear: 1
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        labourers: 5000,
        peasants: 5000
      },
      any_pop_engineers_scholars: {
        engineers: 5000,
        scholars: 5000
      }
    },
    produces: {
      integrated_circuits: 5
    }
  },
  fertiliser_factories: {
    name: "Fertiliser Factories",
    singular: "Fertiliser Factory",
    aliases: ["fertilizer factories", "fertilizer factory"],

    construction_turns: 8,
    cost: {
      bricks: 15,
      machine_parts: 12,
      glass: 10,
      sulphur: 8,
      ammonia: 6,
      cement: 5,
      limestone: 5,
      tools: 5,
      common_furniture: 4,
      lamps: 4,
      money: 12000
    },
    maintenance: {
      ammonia: 5,
      nitric_acid: 2,
      phosphorus: 2,
      urea: 1
    },
    manpower_cost: {
      labourers: 3000,
      engineers: 200
    },
    produces: {
      fertiliser: 5
    }
  },
  filament_works: {
    name: "Filament Works",
    singular: "Filament Works",
    aliases: ["filament factories", "filament factory"],

    construction_turns: 6,
    cost: {
      steel_beams: 14,
      iron: 12,
      reinforced_concrete: 12,
      bricks: 10,
      machine_parts: 10,
      cement: 8,
      lamps: 8,
      rubber: 6,
      copper: 6,
      copper_wire: 6,
      film: 5,
      money: 8000
    },
    maintenance: {
      production_choice_one: {
        paper: 3,
        carbon: 2
      },
      production_choice_two: {
        copper_wire: 1
      }
    },
    manpower: {
      labourers: 2000,
      engineers: 200
    },
    produces: {
      production_choice_one: {
        filaments: 1
      },
      production_choice_two: {
        filaments: 5
      }
    }
  },
  fineries: {
    name: "Fineries",
    singular: "Finery",

    construction_turns: 4,
    cost: {
      lumber: 12,
      wood: 8,
      cloth: 6,
      tools: 3,
      money: 6500
    },
    maintenance: {
      silk: 4
    },
    manpower_cost: {
      artisans: 600,
      any_pop: {
        peasants: 250,
        labourers: 250
      }
    },
    produces: {
      velvet: 2
    }
  },
  flour_mills: {
    name: "Flour Mills",
    singular: "Flour Mill",

    construction_turns: 3,
    cost: {
      stone: 12,
      lumber: 8,
      wood: 6,
      cloth: 3,
      money: 2500
    },
    maintenance: {
      production_choice_one: {
        corn: 4
      },
      production_choice_two: {
        wheat: 5
      },
      production_choice_three: {
        potatoes: 2
      },
      production_choice_four: {
        teff: 3
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 1000,
        labourers: 1000
      }
    },
    produces: {
      production_choice_one: {
        flour: 5
      },
      production_choice_two: {
        flour: 10
      },
      production_choice_three: {
        flour: 3
      },
      production_choice_four: {
        flour: 3
      }
    }
  },
  food_factories: {
    name: "Food Factories",
    singular: "Food Factory",

    construction_turns: 3,
    cost: {
      bricks: 12,
      glass: 10,
      machine_parts: 8,
      tools: 8,
      tin: 7,
      copper: 5,
      common_furniture: 4,
      glass: 3,
      money: 4000
    },
    maintenance: {
      production_choice_lemonade: {
        citrus: 5,
        sugar: 3,
        glass: 2
      },
      production_choice_soup: {
        vegetables: 5,
        tin: 2
      },
      production_choice_stew: {
        vegetables: 5,
        meat: 2,
        tin: 2
      },
      production_choice_syrup: {
        sugar: 3,
        glass: 1
      },
      production_choice_tortillas: {
        flour: 3,
        corn: 2,
        wood: 1
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      production_choice_lemonade: {
        lemonade: 8
      },
      production_choice_soup: {
        soup: 5
      },
      production_choice_stew: {
        stew: 5
      },
      production_choice_tortillas: {
        tortillas: 7
      }
    }
  },
  forgeries: {
    name: "Forgeries",
    singular: "Forgery",

    construction_turns: 3,
    cost: {
      stone: 10,
      coals: 10,
      iron: 8,
      wood: 5,
      money: 3500
    },
    maintenance: {
      pig_iron: 3,
      coals: 3
    },
    manpower_cost: {
      any_pop: {
        peasants: 800,
        labourers: 800
      },
      artisans: 200
    },
    produces: {
      steel: 4
    }
  },
  furniture_factories: {
    name: "Furniture Factories",
    singular: "Furniture Factory",

    construction_turns: 3,
    cost: {
      stone: 10,
      wood: 9,
      lumber: 8,
      tools: 3,
      money: 3000
    },
    maintenance: {
      lumber: 5,
      wool: 1,
      iron: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 500,
        labourers: 500
      },
      artisans: 500
    },
    produces: {
      common_furniture: 7
    }
  },
  gem_cutters: {
    name: "Gem Cutters",
    singular: "Gem Cutter",

    construction_turns: 3,
    cost: {
      stone: 10,
      bricks: 8,
      tools: 6,
      stainless_steel: 4,
      steel: 4,
      lamps: 3,
      money: 5000
    },
    maintenance: {
      ruby: 5
    },
    manpower_cost: {
      artisans: 300
    },
    produces: {
      cut_ruby: 3
    }
  },
  glassworks: {
    name: "Glassworks",
    singular: "Glassworks",

    construction_turns: 4,
    cost: {
      stone: 9,
      bricks: 8,
      tools: 5,
      money: 3000
    },
    maintenance: {
      production_choice_one: {
        coals: 5,
        quartz_sand: 10
      },
      production_choice_two: {
        gas: 3,
        quartz_sand: 10
      },
      production_choice_three: {
        wood: 10,
        quartz_sand: 10
      }
    },
    manpower_cost: {
      artisans: 800
    },
    produces: {
      production_choice_one: {
        glass: 5
      },
      production_choice_two: {
        glass: 5
      },
      production_choice_three: {
        glass: 5
      }
    }
  },
  incense_works: {
    name: "Incense Works",
    singular: "Incense Works",

    construction_turns: 3,
    cost: {
      lumber: 10,
      wood: 8,
      iron: 5,
      money: 2000
    },
    maintenance: {
      production_choice_one: {
        charcoal: 3
      },
      production_choice_two: {
        camphor: 2
      },
      production_choice_three: {
        sandalwood: 1
      }
    },
    manpower_cost: {
      artisans: 800
    },
    produces: {
      production_choice_one: {
        incense: 3
      },
      production_choice_two: {
        incense: 5
      },
      production_choice_three: {
        incense: 6
      }
    }
  },
  inkworks: {
    name: "Inkworks",
    singular: "Inkworks",

    construction_turns: 2,
    cost: {
      lumber: 10,
      wood: 8,
      iron: 5,
      money: 2000
    },
    maintenance: {
      charcoal: 1,
      dyes: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 1400,
        labourers: 1400
      },
      artisans: 200
    },
    produces: {
      ink: 5
    }
  },
  jewellers: {
    name: "Jewellers",
    singular: "Jeweller",

    construction_turns: 4,
    cost: {
      stone: 10,
      bricks: 8,
      tools: 5,
      lamps: 3,
      regular_steel: 2,
      money: 4500
    },
    maintenance: {
      production_choice_one: {
        diamond: 1
      },
      production_choice_two: {
        gold: 1
      },
      production_choice_three: {
        silver: 1
      },
      production_choice_four: {
        platinum: 1
      },
      production_choice_five: {
        palladium: 1
      },
      production_choice_six: {
        cut_ruby: 1
      },
      production_choice_seven: {
        pearls: 1
      }
    },
    manpower_cost: {
      artisans: 250
    },
    produces: {
      production_choice_one: {
        jewellery: 1
      },
      production_choice_two: {
        jewellery: 1
      },
      production_choice_three: {
        jewellery: 1
      },
      production_choice_four: {
        jewellery: 1
      },
      production_choice_five: {
        jewellery: 1
      },
      production_choice_six: {
        jewellery: 1
      },
      production_choice_seven: {
        jewellery: 1
      }
    }
  },
  kiln_works: {
    name: "Kiln Works",
    singular: "Kiln Works",

    construction_turns: 3,
    cost: {
      bricks: 8,
      lumber: 6,
      stone: 4,
      wood: 3,
      lamps: 2,
      tools: 1,
      money: 2000
    },
    maintenance: {
      production_choice_ceramics: {
        clay: 2,
        coals: 2,
        lime: 1
      },
      production_choice_bone_china: {
        calcium: 3,
        clay: 2,
        quartz_sand: 2,
        coals: 1
      },
      production_choice_china: {
        clay: 3,
        calcium: 2,
        quartz_sand: 1,
        dyes: 1,
        coals: 1
      },
      production_choice_doccia_porcelain: {
        clay: 5,
        calcium: 3,
        dyes: 3,
        quartz_sand: 2,
        coals: 1
      },
      production_choice_lacquerware: {
        dyes: 4,
        porcelain: 2,
        wood: 2,
        iron: 1,
        coals: 1
      },
      production_choice_porcelain: {
        clay: 5,
        quartz_sand: 3,
        ceramics: 2,
        calcium: 2,
        dyes: 1,
        coals: 1
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      production_choice_ceramics: {
        ceramics: 3
      },
      production_choice_bone_china: {
        bone_china: 2
      },
      production_choice_china: {
        china: 5
      },
      production_choice_doccia_porcelain: {
        doccia_porcelain: 3
      },
      production_choice_lacquerware: {
        lacquerware: 3
      },
      production_choice_porcelain: {
        porcelain: 6
      }
    }
  },
  laser_factories: {
    name: "Laser Factories",
    singular: "Laser Factory",

    construction_turns: 8,
    cost: {
      reinforced_concrete: 15,
      ceramics: 14,
      glass: 12,
      electric_gear: 10,
      machine_parts: 8,
      copper_wire: 8,
      integrated_circuits: 6,
      capacitors: 5,
      money: 25000
    },
    maintenance: {
      electric_gear: 5,
      glass: 5,
      cut_ruby: 1
    },
    manpower_cost: {
      engineers: 10000
    },
    produces: {
      lasers: 3
    }
  },
  lens_manufactories: {
    name: "Lens Manufactories",
    singular: "Lens Manufactory",

    construction_turns: 6,
    cost: {
      bricks: 15,
      glass: 12,
      ceramics: 10,
      tools: 8,
      coals: 6,
      cement: 6,
      lumber: 5,
      common_furniture: 5,
      money: 20000
    },
    maintenance: {
      glass: 3,
      steel: 1,
      gas: 1
    },
    manpower_cost: {
      engineers: 15000,
      artisans: 5000,
      labourers: 500
    },
    produces: {
      glasses: 5
    }
  },
  lift_factories: {
    name: "Lift Factories",
    singular: "Lift Factory",

    construction_turns: 6,
    cost: {
      steel_beams: 14,
      machine_parts: 12,
      electric_gear: 10,
      glass: 8,
      leather: 6,
      wood_veneers: 6,
      lightbulbs: 5,
      tools: 5,
      money: 18000
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 3500
    }
  },
  lighting_factories: {
    name: "Lighting Factories",
    singular: "Lighting Factory",

    construction_turns: 4,
    cost: {
      bricks: 12,
      machine_parts: 10,
      glass: 8,
      cement: 6,
      copper: 5,
      common_furniture: 5,
      tools: 2,
      money: 12000
    },
    manpower_cost: {
      labourers: 4000,
      engineers: 500
    }
  },
  luxury_furniture_factories: {
    name: "Luxury Furniture Factories",
    singular: "Luxury Furniture Factory",

    construction_turns: 4,
    cost: {
      lumber: 14,
      bricks: 8,
      leather: 8,
      brass: 6,
      bronze: 6,
      mahogany_lumber: 5,
      tools: 5,
      common_furniture: 3,
      cement: 3,
      money: 10000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 1000
    }
  },
  luxury_tailors: {
    name: "Luxury Tailors",
    singular: "Luxury Tailor",

    construction_turns: 5,
    cost: {
      lumber: 15,
      stone: 10,
      textiles: 6,
      tools: 5,
      silk: 4,
      lamps: 4,
      common_furniture: 4,
      money: 8500
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        labourers: 1500
      },
      artisans: 1000
    }
  },
  machine_parts_factories: {
    name: "Machine Parts Factories",
    singular: "Machine Parts Factory",

    construction_turns: 8,
    cost: {
      stone: 20,
      bricks: 18,
      iron: 10,
      cement: 8,
      ceramics: 8,
      steel: 5,
      copper: 5,
      common_furniture: 3,
      money: 20000
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 8500,
        labourers: 8500
      },
      any_pop_engineers_scholars: {
        engineers: 1000,
        scholars: 1000
      }
    }
  },
  malting_works: {
    name: "Malting Works",
    singular: "Malting Works",

    construction_turns: 3,
    cost: {
      wood: 8,
      lumber: 6,
      tools: 2,
      money: 2500
    },
    manpower_cost: {
      any_pop: {
        peasants: 2500,
        labourers: 2500
      }
    }
  },
  marquestry_workshops: {
    name: "Marquestry Workshops",
    singular: "Marquestry Workshop",

    construction_turns: 3,
    cost: {
      lumber: 10,
      wood: 8,
      glass: 5,
      textiles: 3,
      tools: 2,
      money: 6500
    },
    manpower_cost: {
      any_pop: {
        peasants: 500,
        labourers: 500
      },
      artisans: 350
    }
  },
  meat_packing_plants: {
    name: "Meat Packing Plants",
    singular: "Meat Packing Plant",

    construction_turns: 3,
    cost: {
      iron: 12,
      lumber: 8,
      tin: 6,
      tools: 5,
      steel: 5,
      lamps: 2,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 6500,
        labourers: 6500
      }
    }
  },
  molasses_factories: {
    name: "Molasses Factories",
    singular: "Molasses Factory",

    construction_turns: 4,
    cost: {
      lumber: 8,
      wood: 6,
      copper: 5,
      iron: 4,
      glass: 2,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    }
  },
  oast_house: {
    name: "Oast House",
    singular: "Oast House",

    construction_turns: 2,
    cost: {
      wood: 10,
      lumber: 8,
      copper: 3,
      iron: 3,
      glass: 2,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    }
  },
  oil_manufactories: {
    name: "Oil Manufactories",
    singular: "Oil Manufactory",

    construction_turns: 3,
    cost: {
      lumber: 8,
      wood: 6,
      glass: 5,
      iron: 3,
      money: 1800
    },
    manpower_cost: {
      any_pop: {
        peasants: 1200,
        labourers: 1200
      }
    }
  },
  naval_suppliers: {
    name: "Naval Suppliers",
    singular: "Naval Supplier",

    construction_turns: 4,
    cost: {
      lumber: 10,
      tar_coal: 8,
      textiles: 6,
      stone: 6,
      tools: 4,
      tin: 3,
      lamps: 2,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    }
  },
  paper_mills: {
    name: "Paper Mills",
    singular: "Paper Mill",

    construction_turns: 3,
    cost: {
      stone: 8,
      lumber: 5,
      wood: 5,
      money: 1200
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        labourers: 1500
      }
    }
  },
  peat_dryers: {
    name: "Peat Dryers",
    singular: "Peat Dryer",

    construction_turns: 2,
    cost: {
      wood: 3,
      tools: 1,
      money: 500
    },
    manpower_cost: {
      any_pop: {
        peasants: 1200,
        labourers: 1200
      }
    }
  },
  pharmaceuticals: {
    name: "Pharmaceuticals",
    singular: "Pharmaceutical",

    construction_turns: 12,
    cost: {
      machine_parts: 18,
      electric_gear: 16,
      glass: 15,
      ceramics: 12,
      copper: 10,
      iron: 10,
      industrial_chemicals: 9,
      stainless_steel: 8,
      lightbulbs: 6,
      copper_wire: 5,
      gold: 2,
      money: 25000
    },
    manpower_cost: {
      labourers: 15000,
      engineers: 10000
    }
  },
  photographic_film_factories: {
    name: "Photographic Film Factories",
    singular: "Photographic Film Factory",

    construction_turns: 6,
    cost: {
      bricks: 15,
      glass: 14,
      steel_beams: 12,
      silicon: 10,
      lamps: 8,
      tools: 8,
      industrial_chemicals: 5,
      money: 7500
    },
    manpower_cost: {
      labourers: 8000,
      artisans: 500,
      engineers: 200
    }
  },
  rebar_factories: {
    name: "Rebar Factories",
    singular: "Rebar Factory",

    construction_turns: 4,
    cost: {
      glass: 25,
      lumber: 20,
      bricks: 15,
      steel_beams: 15,
      iron: 10,
      stone: 10,
      tools: 5,
      lamps: 5,
      money: 6500
    },
    manpower_cost: {
      labourers: 4500
    }
  },
  rendering_works: {
    name: "Rendering Works",
    singular: "Rendering Works",

    construction_turns: 3,
    cost: {
      bricks: 5,
      lumber: 4,
      steel: 4,
      tools: 2,
      money: 4000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    }
  },
  resistor_factories: {
    name: "Resistor Factories",
    singular: "Resistor Factory",

    construction_turns: 8,
    cost: {
      steel_beams: 12,
      machine_parts: 12,
      bricks: 10,
      glass: 8,
      ceramics: 8,
      silicon: 6,
      copper_wire: 6,
      cement: 5,
      tools: 5,
      gold: 2,
      money: 12000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5500,
        labourers: 5500
      },
      engineers: 2000
    }
  },
  rice_wineries: {
    name: "Rice Wineries",
    singular: "Rice Winery",

    construction_turns: 6,
    cost: {
      lumber: 12,
      wood: 10,
      glass: 3,
      money: 1500
    },
    manpower_cost: {
      any_pop: {
        peasants: 500,
        farmers: 500
      }
    }
  },
  rubber_plants: {
    name: "Rubber Plants",
    singular: "Rubber Plant",

    construction_turns: 6,
    cost: {
      lumber: 8,
      sulphur: 5,
      wood: 5,
      tools: 2,
      money: 8000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        farmers: 5000
      }
    }
  },
  salt_works: {
    name: "Salt Works",
    singular: "Salt Works",

    construction_turns: 2,
    cost: {
      wood: 5,
      lumber: 3,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 4500,
        labourers: 4500
      }
    }
  },
  silk_mills: {
    name: "Silk Mills",
    singular: "Silk Mill",

    construction_turns: 3,
    cost: {
      lumber: 8,
      wood: 6,
      tools: 5,
      lamps: 3,
      money: 4000
    },
    manpower_cost: {
      any_pop: {
        peasants: 1200,
        labourers: 1200
      },
      artisans: 200
    }
  },
  sleeping_bag_factories: {
    name: "Sleeping Bag Factories",
    singular: "Sleeping Bag Factory",
    aliases: ["sleeping bags factories"],

    construction_turns: 3,
    cost: {
      lumber: 12,
      lamps: 5,
      tools: 3,
      money: 3000
    },
    manpower_cost: {
      any_pop: {
        peasants: 3000,
        labourers: 3000
      }
    }
  },
  soap_factories: {
    name: "Soap Factories",
    singular: "Soap Factory",

    construction_turns: 2,
    cost: {
      bricks: 5,
      steel: 4,
      lumber: 4,
      wood: 2,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    }
  },
  souvenir_factories: {
    name: "Souvenir Factories",
    singular: "Souvenir Factory",

    construction_turns: 4,
    cost: {
      bricks: 12,
      glass: 10,
      lumber: 8,
      mahogany_wo : 5,
      lamps: 4,
      tools: 3,
      textiles: 2,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 1200
    }
  },
  sugar_refineries: {
    name: "Sugar Refineries",
    singular: "Sugar Refinery",

    construction_turns: 3,
    cost: {
      iron: 8,
      oak_wood: 5,
      copper: 3,
      stainless_steel: 2,
      money: 6500
    },
    manpower_cost: {
      any_pop: {
        peasants: 3500,
        labourers: 3500
      }
    }
  },
  tailors: {
    name: "Tailors",
    singular: "Tailor",

    construction_turns: 4,
    cost: {
      lumber: 8,
      textiles: 5,
      tools: 2,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 800
    }
  },
  tapestry_looms: {
    name: "Tapestry Looms",
    singular: "Tapestry Loom",

    construction_turns: 4,
    cost: {
      lumber: 6,
      wood: 5,
      tools: 3,
      textiles: 2,
      money: 4000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      artisans: 600
    }
  },
  tea_driers: {
    name: "Tea Driers",
    singular: "Tea Drier",

    construction_turns: 2,
    cost: {
      wood: 5,
      lumber: 3,
      money: 2000
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        farmers: 5000
      }
    }
  },
  telephone_manufacturers: {
    name: "Telephone Manufacturers",
    singular: "Telephone Manufacturer",

    construction_turns: 6,
    cost: {
      bricks: 15,
      steel_beams: 12,
      glass: 12,
      reinforced_concrete: 10,
      lumber: 8,
      copper: 6,
      common_furniture: 5,
      wood_veneers: 4,
      money: 8500
    },
    manpower_cost: {
      labourers: 8500,
      engineers: 3000
    }
  },
  television_factories: {
    name: "Television Factories",
    singular: "Television Factory",
    aliases: ["TV Factories", "TV Factory"],

    construction_turns: 8,
    cost: {
      reinforced_concrete: 15,
      glass: 14,
      lumber: 12,
      machine_parts: 12,
      electric_gear: 12,
      steel_beams: 10,
      stone: 8,
      bricks: 8,
      cement: 6,
      tools: 5,
      money: 12000
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 2000
    }
  },
  textile_mills: {
    name: "Textile Mills",
    singular: "Textile Mill",

    construction_turns: 6,
    cost: {
      lumber: 12,
      stone: 10,
      wood: 8,
      ceramics: 6,
      tools: 5,
      money: 6000
    },
    manpower_cost: {
      any_pop: {
        peasants: 3500,
        labourers: 3500
      }
    }
  },
  toolworks: {
    name: "Toolworks",
    singular: "Toolworks",

    construction_turns: 5,
    cost: {
      lumber: 8,
      stone: 8,
      iron: 5,
      copper: 3,
      wood: 2,
      coals: 2,
      money: 5000
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 500
    }
  },
  train_factories: {
    name: "Train Factories",
    singular: "Train Factory",

    construction_turns: 7,
    cost: {
      iron: 15,
      machine_parts: 12,
      regular_steel: 10,
      bricks: 10,
      cement: 8,
      lumber: 8,
      textiles: 6,
      common_furniture: 5,
      coals: 5,
      copper_wire: 4,
      money: 15000
    },
    manpower_cost: {
      labourers: 6500,
      engineers: 2000
    }
  },
  transistor_manufacturers: {
    name: "Transitor Manufacturers",
    singular: "Transistor Manufacturer",

    construction_turns: 8,
    cost: {
      machine_parts: 10,
      copper_wire: 8,
      tools: 5,
      money: 12500
    },
    manpower_cost: {
      labourers: 6000,
      engineers: 1500
    }
  },
  turbine_manufactories: {
    name: "Turbine Manufactories",
    singular: "Turbine Manufactory",

    construction_turns: 8,
    cost: {
      machine_parts: 12,
      electric_gear: 8,
      steel_beams: 8,
      copper_wire: 6,
      tools: 5,
      money: 14000
    },
    manpower_cost: {
      labourers: 8000,
      engineers: 1000
    }
  },
  tyres_factories: {
    name: "Tyres Factories",
    singular: "Tyre Factory",
    aliases: ["tires factories", "tires factory", "tire factories", "tire factory"],

    construction_turns: 6,
    cost: {
      steel_beams: 16,
      machine_parts: 14,
      stone: 14,
      bricks: 12,
      glass: 10,
      reinforced_concrete: 10,
      tools: 8,
      copper: 5,
      regular_steel: 5,
      lamps: 4,
      money: 8500
    },
    manpower_cost: {
      labourers: 4000,
      engineers: 100
    }
  },
  uniforms_factories: {
    name: "Uniforms Factories",
    singular: "Uniforms Factory",
    aliases: ["uniform factory", "uniform factories"],

    construction_turns: 4,
    cost: {
      lumber: 8,
      stone: 5,
      wood: 5,
      ceramics: 4,
      tools: 3,
      money: 6500
    },
    manpower_cost: {
      any_pop: {
        labourers: 1000,
        peasants: 1000
      },
      artisans: 300
    }
  },
  violin_makers: {
    name: "Violin Makers",
    singular: "Violin Maker",

    construction_turns: 8,
    cost: {
      lumber: 10,
      stone: 10,
      spruce_lumber: 8,
      wood: 6,
      lamps: 5,
      tools: 3,
      money: 3000
    },
    manpower_cost: {
      artisans: 500
    }
  },
  wineries: {
    name: "Wineries",
    singular: "Winery",

    construction_turns: 6,
    cost: {
      lumber: 12,
      oak_wood: 10,
      glass: 4,
      copper: 3,
      money: 6000
    },
    manpower_cost: {
      any_pop: {
        peasants: 350,
        farmers: 350
      },
      artisans: 50
    }
  },
  wire_manufactories: {
    name: "Wire Manufactories",
    singular: "Wire Manufactory",

    construction_turns: 5,
    cost: {
      lumber: 15,
      bricks: 15,
      glass: 12,
      copper_wire: 8,
      tools: 8,
      cement: 6,
      steel_beams: 6,
      lamps: 4,
      money: 10000
    },
    manpower_cost: {
      labourers: 8000
    }
  }
};
