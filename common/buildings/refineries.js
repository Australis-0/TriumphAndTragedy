config.buildings.refineries = {
  name: "Refineries",
  order: 15,
  taxable: true,

  aluminium_factories: {
    name: "Aluminium Factories",
    singular: "Aluminium Factory",
    aliases: ["alumina factory", "alumina factories", "aluminum factories", "aluminum factory"],
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      regular_steel: 10,
      reinforced_concrete: 8,
      machine_parts: 8,
      cement: 6,
      lightbulbs: 5,
      glass: 5,
      bronze: 3,
      tools: 3,
      money: 4500
    },
    maintenance: {
      alumina: 5
    },
    manpower_cost: {
      labourers: 15000,
      engineers: 800
    },
    produces: {
      aluminium: 4
    }
  },
  aluminium_refineries: {
    name: "Aluminium Refineries",
    singular: "Aluminium Refinery",
    aliases: ["aluminum refineries", "aluminum refineries"],
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      steel_beams: 20,
      reinforced_concrete: 15,
      machine_parts: 12,
      regular_steel: 10,
      cement: 8,
      lightbulbs: 5,
      tools: 4,
      money: 5500
    },
    maintenance: {
      bauxite: 10
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 250
    },
    produces: {
      alumina: 8
    }
  },
  arsenic_refineries: {
    name: "Arsenic Refineries",
    singular: "Arsenic Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 12,
      regular_steel: 8,
      cement: 6,
      concrete: 6,
      limestone: 5,
      tools: 4,
      bronze: 3,
      money: 7000
    },
    maintenance: {
      arsenopyrite: 10
    },
    manpower_cost: {
      labourers: 8000,
      engineers: 200
    },
    produces: {
      arsenic: 5
    }
  },
  barium_refineries: {
    name: "Barium Refineries",
    singular: "Barium Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 10,
      regular_steel: 6,
      cement: 5,
      tools: 5,
      stone: 4,
      copper: 2,
      money: 3500
    },
    maintenance: {
      baryte: 5
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 200
    },
    produces: {
      barium: 4
    }
  },
  beryllium_refineries: {
    name: "Beryllium Refineries",
    singular: "Beryllium Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      stone: 10,
      cement: 5,
      copper: 4,
      lamps: 4,
      leather: 3,
      tools: 3,
      money: 6000
    },
    maintenance: {
      beryl: 2
    },
    manpower_cost: {
      labourers: 4000,
      engineers: 300
    },
    produces: {
      beryllium: 1
    }
  },
  brass_factories: {
    name: "Brass Factories",
    singular: "Brass Factory",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      stone: 12,
      cement: 6,
      copper: 5,
      iron: 5,
      lamps: 3,
      glass: 3,
      tools: 2,
      money: 5500
    },
    maintenance: {
      copper: 10,
      zinc: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      brass: 5
    }
  },
  bronze_factories: {
    name: "Bronze Factories",
    singular: "Bronze Factory",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      stone: 9,
      cement: 6,
      copper: 5,
      iron: 5,
      lamps: 4,
      glass: 4,
      tools: 3,
      money: 4000
    },
    maintenance: {
      copper: 7,
      tin: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      bronze: 6
    }
  },
  centrifuges: {
    name: "Centrifuges",
    singular: "Centrifuge",
    type: "manufacturing",

    cost: {
      stainless_steel: 8,
      iron: 7,
      machine_parts: 6,
      copper_wire: 4,
      electric_gear: 4,
      glass: 2,
      money: 10000
    },
    maintenance: {
      production_choice_heu: {
        uranium: 5
      },
      production_choice_wgeu: {
        highly_enriched_uranium: 5
      }
    },
    manpower_cost: {
      labourers: 10000,
      engineers: 1000
    },
    produces: {
      production_choice_heu: {
        name: "Highly-Enriched Uranium",
        highly_enriched_uranium: 1,
        depleted_uranium: 1
      },
      production_choice_wgeu: {
        name: "Weapons-Grade Enriched Uranium",
        weapons_grade_enriched_uranium: 1
      }
    }
  },
  chromium_refineries: {
    name: "Chromium Refineries",
    singular: "Chromium Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      steel_beams: 10,
      machine_parts: 8,
      regular_steel: 8,
      copper_wire: 6,
      tools: 5,
      lightbulbs: 4,
      glass: 3,
      money: 9000
    },
    maintenance: {
      chromite: 5
    },
    manpower_cost: {
      labourers: 12000,
      engineers: 800
    },
    produces: {
      chromium: 5
    }
  },
  coal_kilns: {
    name: "Coal Kilns",
    singular: "Coal Kiln",
    type: "manufacturing",

    construction_turns: 2,
    cost: {
      stone: 5,
      wood: 4,
      money: 1000
    },
    maintenance: {
      charcoal: 2,
      gas: 1
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        labourers: 1500
      }
    },
    produces: {
      carbon: 10
    }
  },
  coal_washers: {
    name: "Coal Washers",
    singular: "Coal Washer",
    type: "manufacturing",

    construction_turns: 2,
    cost: {
      iron: 10,
      regular_steel: 6,
      lumber: 4,
      tools: 2,
      money: 2000
    },
    maintenance: {
      production_choice_bituminous_coal: {
        bitumen: 5
      },
      production_choice_brown_coal: {
        lignite: 5
      },
      production_choice_hard_coal: {
        anthracite: 5
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      production_choice_bituminous_coal: {
        name: "Bituminous Coal",
        bituminous_coal: 5
      },
      production_choice_brown_coal: {
        name: "Brown Coal",
        brown_coal: 5
      },
      production_choice_hard_coal: {
        name: "Hard Coal",
        hard_coal: 5
      }
    }
  },
  cobalt_refineries: {
    name: "Cobalt Refineries",
    singular: "Cobalt Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      iron: 12,
      lumber: 8,
      tools: 8,
      bricks: 6,
      cement: 4,
      lumber: 4,
      money: 8000
    },
    maintenance: {
      cobaltite: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 6000,
        labourers: 6000
      },
      engineers: 600
    },
    produces: {
      cobalt: 3
    }
  },
  copper_kilns: {
    name: "Copper Kilns",
    singular: "Copper Kiln",
    type: "manufacturing",

    construction_turns: 2,
    cost: {
      wood: 6,
      stone: 5,
      clay: 4,
      flint: 3,
      money: 2000
    },
    maintenance: {
      production_choice_chalcocite: {
        chalcocite: 4,
        wood: 2
      },
      production_choice_chalcopyrite: {
        chalcopyrite: 4,
        wood: 2
      },
      production_choice_malachite: {
        malachite: 4,
        charcoal: 1
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      }
    },
    produces: {
      production_choice_chalcocite: {
        name: "Chalcocite Roasting",
        copper: 2
      },
      production_choice_chalcopyrite: {
        name: "Chalcopyrite Roasting",
        copper: 2
      },
      production_choice_malachite: {
        name: "Malachite Roasting",
        copper: 2
      }
    }
  },
  copper_refineries: {
    name: "Copper Refineries",
    singular: "Copper Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      bricks: 12,
      glass: 8,
      cement: 6,
      lumber: 6,
      tools: 4,
      money: 5000
    },
    maintenance: {
      production_choice_bornite: {
        bornite: 5
      },
      production_choice_chalcocite: {
        chalcocite: 5
      },
      production_choice_chalcopyrite: {
        chalcopyrite: 10
      },
      production_choice_malachite: {
        malachite: 5
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 5000,
        labourers: 5000
      },
      engineers: 600
    },
    produces: {
      production_choice_bornite: {
        name: "Bornite Extraction",
        copper: 3
      },
      production_choice_chalcocite: {
        name: "Chalcocite Flash Smelting",
        copper: 4
      },
      production_choice_chalcopyrite: {
        name: "Chalcopyrite Flash Smelting",
        copper: 3
      },
      production_choice_malachite: {
        name: "Malachite Smelting",
        copper: 3
      }
    }
  },
  diamond_refineries: {
    name: "Diamond Refineries",
    singular: "Diamond Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      regular_steel: 5,
      lumber: 4,
      tools: 4,
      money: 2500
    },
    maintenance: {
      kimberlite: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      diamond: 1
    }
  },
  ferrochromite_refineries: {
    name: "Ferrochromite Refineries",
    singular: "Ferrochromite Refinery",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      iron: 14,
      cement: 8,
      concrete: 8,
      machine_parts: 7,
      tools: 6,
      lamps: 4,
      money: 14000
    },
    maintenance: {
      chromium: 7,
      iron: 3
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 600
    },
    produces: {
      ferrochromium: 5
    }
  },
  gold_refineries: {
    name: "Gold Refineries",
    singular: "Gold Refinery",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      stone: 8,
      tools: 4,
      copper: 4,
      leather: 3,
      iron: 2,
      lamps: 2,
      money: 5500
    },
    maintenance: {
      production_choice_one: {
        placer_gold: 1
      },
      production_choice_two: {
        quartz_gold: 5
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 1500,
        labourers: 1500
      }
    },
    produces: {
      production_choice_one: {
        name: "Placer Gold Refinement",
        gold: 1
      },
      production_choice_two: {
        name: "Quartz Gold Refinement",
        gold: 3
      }
    }
  },
  gum_factories: {
    name: "Gum Factories",
    singular: "Gum Factory",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      regular_steel: 8,
      machine_parts: 6,
      tools: 5,
      stainless_steel: 4,
      rubber: 4,
      glass: 3,
      lamps: 2,
      money: 6000
    },
    maintenance: {
      acetic_acid: 1,
      butadiene: 1,
      ethylene: 1,
      olive_oil: 1,
      sugar: 1
    },
    manpower_cost: {
      labourers: 2000
    },
    produces: {
      chewing_gum: 10
    }
  },
  iron_refineries: {
    name: "Iron Refineries",
    singular: "Iron Refinery",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      stone: 6,
      lumber: 6,
      leather: 4,
      wood: 4,
      money: 1000
    },
    maintenance: {
      iron: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      pig_iron: 5
    }
  },
  ironworks: {
    name: "Ironworks",
    singular: "Ironworks",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      stone: 8,
      lumber: 4,
      leather: 4,
      wood: 3,
      money: 2500
    },
    maintenance: {
      production_choice_one: {
        hematite: 10
      },
      production_choice_two: {
        magnetite: 10
      },
      production_choice_three: {
        pentlandite: 3
      },
      production_choice_four: {
        sphalerite: 50
      },
      production_choice_five: {
        wolframite: 10
      }
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 1500,
        labourers: 1500
      },
      any_pop_artisans_engineers: {
        artisans: 200,
        engineers: 200
      }
    },
    produces: {
      production_choice_one: {
        name: "Iron II Refining",
        iron: 7
      },
      production_choice_two: {
        name: "Iron III Refining",
        iron: 8
      },
      production_choice_three: {
        name: "Pentlandite-Iron Refining",
        iron: 1
      },
      production_choice_four: {
        name: "Sphalerite-Iron Refining",
        iron: 1
      },
      production_choice_five: {
        name: "Wolframite-Iron Refining",
        iron: 1
      }
    }
  },
  leadworks: {
    name: "Leadworks",
    singular: "Leadworks",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 10,
      cement: 6,
      lumber: 5,
      tools: 4,
      lamps: 4,
      iron: 2,
      leather: 2,
      money: 2000
    },
    maintenance: {
      galena: 8
    },
    manpower_cost: {
      any_pop: {
        peasants: 2500,
        labourers: 2500
      }
    },
    produces: {
      lead: 7
    }
  },
  manganese_refineries: {
    name: "Manganese Refineries",
    singular: "Manganese Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      iron: 12,
      bricks: 10,
      cement: 6,
      regular_steel: 6,
      tools: 6,
      lamps: 4,
      money: 5500
    },
    maintenance: {
      production_choice_one: {
        pyrolusite: 5
      },
      production_choice_two: {
        wolframite: 10
      }
    },
    manpower_cost: {
      labourers: 1500,
      engineers: 200
    },
    produces: {
      production_choice_one: {
        name: "Pyrolusite Refining",
        manganese: 3
      },
      production_choice_two: {
        name: "Wolframite Refining",
        manganese: 1
      }
    }
  },
  mercuric_refineries: {
    name: "Mercuric Refineries",
    singular: "Mercuric Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      iron: 16,
      reinforced_concrete: 15,
      cement: 10,
      machine_parts: 8,
      tools: 8,
      lamps: 6,
      electric_gear: 4,
      aluminium: 3,
      money: 8000
    },
    maintenance: {
      cinnabar: 4
    },
    manpower_cost: {
      labourers: 1000,
      engineers: 100
    },
    produces: {
      mercury: 3
    }
  },
  molybdenite_refineries: {
    name: "Molybdenite Refineries",
    singular: "Molybdenite Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      iron: 12,
      limestone: 10,
      machine_parts: 8,
      cement: 8,
      tools: 6,
      lamps: 5,
      lumber: 5,
      money: 8000
    },
    maintenance: {
      molybdenite: 5
    },
    manpower_cost: {
      labourers: 5000,
      any_pop: {
        artisans: 200,
        engineers: 200
      }
    },
    produces: {
      molybdenum: 3
    }
  },
  nickelworks: {
    name: "Nickelworks",
    singular: "Nickelworks",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      bricks: 14,
      cement: 8,
      ceramics: 6,
      lumber: 6,
      tools: 5,
      glass: 3,
      money: 5800
    },
    maintenance: {
      pentlandite: 6
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 4500,
        labourers: 4500
      },
      any_pop_artisans_engineers: {
        artisans: 500,
        engineers: 500
      }
    },
    produces: {
      nickel: 2
    }
  },
  niobic_refineries: {
    name: "Niobic Refineries",
    singular: "Niobic Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      iron: 10,
      steel_beams: 8,
      cement: 6,
      reinforced_concrete: 6,
      tools: 5,
      lamps: 4,
      money: 6000
    },
    maintenance: {
      coltan: 5
    },
    manpower_cost: {
      labourers: 3000,
      engineers: 200
    },
    produces: {
      niobium: 1
    }
  },
  palladium_refineries: {
    name: "Palladium Refineries",
    singular: "Palladium Refinery",
    type: "manufacturing",

    construction_turns: 6,
    cost: {
      iron: 12,
      bricks: 10,
      tools: 8,
      cement: 6,
      machine_parts: 6,
      copper: 5,
      stainless_steel: 5,
      lamps: 4,
      money: 12000
    },
    maintenance: {
      cooperite: 2
    },
    manpower_cost: {
      labourers: 2500,
      any_pop: {
        artisans: 600,
        engineers: 600
      }
    },
    produces: {
      palladium: 1
    }
  },
  platinum_refineries: {
    name: "Platinum Refineries",
    singular: "Platinum Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      bricks: 14,
      stone: 10,
      iron: 8,
      tools: 6,
      pig_iron: 5,
      glass: 4,
      lamps: 4,
      copper: 3,
      money: 10000
    },
    maintenance: {
      sperrylite: 4
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      },
      artisans: 250
    },
    produces: {
      platinum: 2
    }
  },
  saltpetre_works: {
    name: "Saltpetre Works",
    singular: "Saltpetre Works",
    aliases: ["saltpetre factory", "saltpetre factories", "saltpeter works"],
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      steel_beams: 10,
      iron: 9,
      machine_parts: 6,
      tools: 5,
      bronze: 3,
      lamps: 2,
      money: 4000
    },
    maintenance: {
      nitre: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 4000,
        labourers: 4000
      }
    },
    produces: {
      saltpetre: 5
    }
  },
  silicate_factories: {
    name: "Silicate Factories",
    singular: "Silicate Factory",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      wood: 10,
      bricks: 8,
      ceramics: 6,
      cement: 3,
      lumber: 3,
      tools: 2,
      money: 2000
    },
    maintenance: {
      quartz_sand: 10
    },
    manpower_cost: {
      any_pop: {
        peasants: 4000,
        labourers: 4000
      }
    },
    produces: {
      silicon: 9
    }
  },
  silver_refineries: {
    name: "Silver Refineries",
    singular: "Silver Refinery",
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      iron: 12,
      stone: 10,
      regular_steel: 6,
      tools: 4,
      leather: 3,
      money: 3500
    },
    maintenance: {
      acanthite: 5
    },
    manpower_cost: {
      any_pop: {
        peasants: 2000,
        labourers: 2000
      }
    },
    produces: {
      silver: 1
    }
  },
  stainless_steel_factories: {
    name: "Stainless Steel Factories",
    singular: "Stainless Steel Factory",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 12,
      stone: 10,
      cement: 6,
      iron: 6,
      regular_steel: 5,
      tools: 5,
      lamps: 4,
      glass: 2,
      silicon: 2,
      money: 10000
    },
    maintenance: {
      iron: 5,
      carbon: 5,
      ferrochromium: 2
    },
    manpower_cost: {
      labourers: 3000,
      engineers: 500
    },
    produces: {
      stainless_steel: 5
    }
  },
  steel_beams_factories: {
    name: "Steel Beams Factories",
    singular: "Steel Beams Factory",
    aliases: ["steel beam factories", "steel beam factory"],
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      bricks: 10,
      lumber: 8,
      iron: 6,
      tools: 6,
      leather: 4,
      lamps: 2,
      money: 5000
    },
    maintenance: {
      regular_steel: 5,
      coals: 3
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 5000,
        labourers: 5000
      },
      any_pop_artisans_engineers: {
        artisans: 200,
        engineers: 200
      }
    },
    produces: {
      steel_beams: 5
    }
  },
  steelworks: {
    name: "Steelworks",
    singular: "Steelworks",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      stone: 8,
      lumber: 6,
      iron: 6,
      tools: 4,
      leather: 2,
      lamps: 2,
      money: 4000
    },
    maintenance: {
      production_choice_one: {
        pig_iron: 5,
        coal_coke: 5
      },
      production_choice_two: {
        iron: 5,
        coal_coke: 5
      }
    },
    manpower_cost: {
      any_pop_peasants_labourers: {
        peasants: 2000,
        labourers: 2000
      },
      any_pop_artisans_engineers: {
        artisans: 200,
        engineers: 200
      }
    },
    produces: {
      production_choice_one: {
        name: "Open Hearth Process",
        regular_steel: 10
      },
      production_choice_two: {
        name: "Bessemer Process",
        regular_steel: 5
      }
    }
  },
  sulphuric_works: {
    name: "Sulphuric Works",
    singular: "Sulphuric Works",
    aliases: ["sulfuric works", "sulfur works", "sulfuric factory", "sulfur factory"],
    type: "manufacturing",

    construction_turns: 3,
    cost: {
      iron: 5,
      tools: 4,
      bronze: 3,
      lamps: 2,
      money: 3500
    },
    maintenance: {
      production_choice_galena: {
        galena: 8
      },
      production_choice_pentlandite: {
        pentlandite: 3
      }
    },
    manpower_cost: {
      any_pop: {
        peasants: 4000,
        labourers: 4000
      }
    },
    produces: {
      production_choice_galena: {
        sulphur: 1
      },
      production_choice_pentlandite: {
        sulphur: 1
      }
    }
  },
  tantalum_factories: {
    name: "Tantalum Factories",
    singular: "Tantalum Factory",
    type: "manufacturing",

    construction_turns: 6,
    cost: {
      concrete: 12,
      iron: 8,
      lumber: 6,
      regular_steel: 6,
      stone: 4,
      tools: 4,
      lamps: 2,
      money: 8000
    },
    maintenance: {
      coltan: 5
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 500
    },
    produces: {
      tantalum: 2
    }
  },
  tin_factories: {
    name: "Tin Factories",
    singular: "Tin Factory",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      iron: 16,
      lumber: 10,
      bricks: 8,
      glass: 6,
      tools: 6,
      cement: 5,
      common_furniture: 4,
      lamps: 4,
      money: 6000
    },
    maintenance: {
      cassiterite: 4
    },
    manpower_cost: {
      labourers: 2500,
      engineers: 200
    },
    produces: {
      tin: 3
    }
  },
  titanium_refineries: {
    name: "Titanium Refineries",
    singular: "Titanium Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      bricks: 10,
      stone: 10,
      regular_steel: 8,
      machine_parts: 7,
      iron: 6,
      steel_beams: 6,
      lamps: 4,
      money: 12000
    },
    maintenance: {
      cassiterite: 4
    },
    manpower_cost: {
      labourers: 3000,
      engineers: 200
    },
    produces: {
      titanium: 3
    }
  },
  tungsten_refineries: {
    name: "Tungsten Refineries",
    singular: "Tungsten Refinery",
    type: "manufacturing",

    construction_turns: 5,
    cost: {
      stone: 12,
      iron: 12,
      bricks: 10,
      machine_parts: 8,
      cement: 6,
      steel_beams: 4,
      coals: 4,
      money: 6500
    },
    maintenance: {
      production_choice_one: {
        scheelite: 5
      },
      production_choice_two: {
        wolframite: 5
      }
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 400
    },
    produces: {
      production_choice_one: {
        name: "Scheelite-Tungsten Refining",
        tungsten: 3
      },
      production_choice_two: {
        name: "Scheelite-Wolframite Refining",
        tungsten: 3
      }
    }
  },
  uranium_refineries: {
    name: "Uranium Refineries",
    singular: "Uranium Refinery",
    type: "manufacturing",

    construction_turns: 6,
    cost: {
      lumber: 12,
      bricks: 10,
      iron: 8,
      cement: 6,
      tools: 6,
      copper: 4,
      bronze: 3,
      brass: 2,
      money: 8500
    },
    maintenance: {
      uraninite: 5
    },
    manpower_cost: {
      labourers: 5000,
      engineers: 400
    },
    produces: {
      uranium: 5
    }
  },
  zinc_refineries: {
    name: "Zinc Refineries",
    singular: "Zinc Refinery",
    type: "manufacturing",

    construction_turns: 4,
    cost: {
      bricks: 12,
      ceramics: 8,
      regular_steel: 8,
      tools: 6,
      lumber: 6,
      electric_gear: 4,
      machine_parts: 4,
      lightbulbs: 2,
      money: 10000
    },
    maintenance: {
      sphalerite: 6
    },
    manpower_cost: {
      labourers: 4000,
      engineers: 300
    },
    produces: {
      zinc: 4
    }
  }
};
