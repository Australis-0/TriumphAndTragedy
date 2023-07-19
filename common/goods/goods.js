config.goods = { //[WIP] - Redo mine chances, buy/sell prices
  //Special scope - these goods are entirely hidden from public view
  hidden: {
    knowledge: {
      name: "Knowledge",
      icon: "knowledge",

      doesnt_stack: true,
      research_good: true
    }
  },

  //Crafting Points - Represents training capacity for military units
  crafting_points: {
    name: "Crafting Points",
    icon: "labourers",
    type: "category",

    ground_units_cp: {
      name: "Army CP",
      icon: "active_personnel",

      is_cp: true,
      doesnt_stack: true
    },
    ground_artillery_cp: {
      name: "Artillery CP",
      icon: "artillery",

      is_cp: true,
      doesnt_stack: true
    },
    ground_vehicles_cp: {
      name: "Armour CP",
      icon: "land_vehicles",

      is_cp: true,
      doesnt_stack: true
    },
    aeroplanes_cp: {
      name: "Air CP",
      icon: "aeroplanes",

      is_cp: true,
      doesnt_stack: true
    },
    naval_units_cp: {
      name: "Naval CP",
      icon: "naval_units",

      is_cp: true,
      doesnt_stack: true
    }
  },

  raw_resources: {
    name: "Raw Materials",
    icon: "government",
    type: "category",

    animal_products: {
      name: "Animal Products",
      type: "category",

      beeswax: {
        name: "Beeswax"
      },
      eggs: {
        name: "Eggs"
      },
      goat_milk: {
        name: "Goat Milk"
      },
      ivory: {
        name: "Ivory"
      },
      leather: {
        name: "Leather"
      },
      milk: {
        name: "Milk"
      },
      pearls: {
        name: "Pearls"
      },
      whale_oil: {
        name: "Whale Oil"
      }
    },
    caoutchouc: {
      name: "Caoutchouc"
    },
    cotton: {
      name: "Cotton"
    },
    grains: {
      name: "Grains/Starchy Foods",
      type: "category",

      corn: {
        name: "Corn"
      },
      potatoes: {
        name: "Potatoes"
      },
      rice: {
        name: "Rice"
      },
      teff: {
        name: "Teff"
      },
      wheat: {
        name: "Wheat"
      }
    },
    feathers: {
      name: "Feathers"
    },
    fruits: {
      name: "Fruits",
      type: "category",

      apples: {
        name: "Apples"
      },
      grapes: {
        name: "Grapes"
      },
      olives: {
        name: "Olives"
      },
      pumpkins: {
        name: "Pumpkins"
      },
      strawberries: {
        name: "Strawberries"
      },
      sunflowers: {
        name: "Sunflowers"
      },
      watermelons: {
        name: "Watermelons"
      }
    },
    furs: {
      name: "Furs"
    },
    meat: {
      name: "Meat",
      type: "category",

      beef: {
        name: "Beef"
      },
      camel_meat: {
        name: "Camel Meat"
      },
      chicken: {
        name: "Chicken"
      },
      crab: {
        name: "Crab"
      },
      cuy: {
        name: "Cuy"
      },
      duck: {
        name: "Duck"
      },
      fish: {
        name: "Fish"
      },
      goat_meat: {
        name: "Goat Meat"
      },
      lobster: {
        name: "Lobster"
      },
      mutton: {
        name: "Mutton"
      },
      oyster: {
        name: "Oyster"
      },
      pork: {
        name: "Pork"
      },
      rabbit_meat: {
        name: "Rabbit Meat"
      },
      reindeer: {
        name: "Reindeer"
      },
      shrimp: {
        name: "Shrimp"
      },
      venison: {
        name: "Venison"
      },
      yak: {
        name: "Yak"
      }
    },
    nuts: {
      name: "Nuts",
      type: "category",

      peanuts: {
        name: "Peanuts"
      },
      walnuts: {
        name: "Walnuts"
      }
    },
    other_crops: {
      name: "Other Crops",
      type: "category",

      blue_agaves: {
        name: "Blue Agaves"
      },
      hemp: {
        name: "Hemp"
      },
      hops: {
        name: "Hops"
      },
      poppies: {
        name: "Poppies"
      }
    },
    petroil: {
      name: "Petroil"
    },
    raw_dyes: {
      name: "Raw Dyes",
      type: "category",

      carmine_bugs: {
        name: "Carmine Bugs"
      },
      indigo: {
        name: "Indigo"
      },
      woad: {
        name: "Woad"
      }
    },
    raw_minerals: {
      name: "Raw Minerals",
      type: "category",

      acanthite: {
        name: "Acanthite",
        mine_action_chance: 14 //8,314 million tons
      },
      anthracite: {
        name: "Anthracite",
        mine_action_chance: 34 //219 billion tonnes
      },
      arsenopyrite: {
        name: "Arsenopyrite",
        mine_action_chance: 15 //25 million tons
      },
      baryte: {
        name: "Baryte",
        aliases: ["Barite"],
        mine_action_chance: 28 //2 billion tons
      },
      bauxite: {
        name: "Bauxite",
        mine_action_chance: 33 //31 billion tonnes
      },
      beryl: {
        name: "Beryl",
        mine_action_chance: 5 //100 thousand tons
      },
      bitumen: {
        name: "Bitumen",
        mine_action_chance: 29 //10,513 billion tons
      },
      bornite: {
        name: "Bornite",
        mine_action_chance: 20 //90 million tons
      },
      cassiterite: {
        name: "Cassiterite", //155 million tons
        mine_action_chance: 22
      },
      chalcocite: {
        name: "Chalcocite",
        mine_action_chance: 30 //12,5 billion tonnes
      },
      chalcopyrite: {
        name: "Chalcopyrite",
        mine_action_chance: 25 //700 million tonnes
      },
      chromite: {
        name: "Chromite",
        mine_action_chance: 24 //560 million tonnes
      },
      cinnabar: {
        name: "Cinnabar",
        mine_action_chance: 6 //147 thousand tons
      },
      cobaltite: {
        name: "Cobalt",
        mine_action_chance: 16 //25 million tonnes
      },
      coltan: {
        name: "Coltan",
        mine_action_chance: 1 //1 thousand tonnes
      },
      cooperite: {
        name: "Cooperite",
        mine_action_chance: 3 //10 thousand tonnes
      },
      fluorite: {
        name: "Fluorite",
        mine_action_chance: 26 //1 billion tonnes
      },
      galena: {
        name: "Galena",
        mine_action_chance: 19, //85 million tonnes
      },
      hematite: {
        name: "Hematite",
        mine_action_chance: 32, //28,31 billion tons
      },
      ilmenite: {
        name: "Ilmenite",
        mine_action_chance: 23, //160 million tonnes
      },
      kimberlite: {
        name: "Kimberlite",
        mine_action_chance: 17, //26 million tonnes
      },
      lignite: {
        name: "Lignite",
        mine_action_chance: 35, //400 billion tonnes
      },
      magnetite: {
        name: "Magnetite",
        mine_action_chance: 31, //13,8 billion tons
      },
      malachite: {
        name: "Malachite",
        //1 thousand tonnes
        mine_action_chance: 1
      },
      molybdenite: {
        name: "Molybdenite",
        //20 million tonnes
      },
      native_gold: {
        name: "Native Gold",
        type: "category",

        placer_gold: {
          name: "Placer Gold",
          mine_action_chance: 5, //180 tons prod.
        },
        quartz_gold: {
          name: "Quartz Gold",
          mine_action_chance: 7, //244 thousand tonnes
        }
      },
      nitre: {
        name: "Nitre",
        mine_action_chance: 9, //1 million tons
      },
      pentlandite: {
        name: "Pentlandite",
        mine_action_chance: 21, //100 million tonnes
      },
      pyrolusite: {
        name: "Pyrlousite",
        mine_action_chance: 13, //6,4 million tonnes
      },
      quartz_sand: {
        name: "Quartz Sand",
        mine_action_chance: 27, //1,665 billion tonnes
      },
      ruby: {
        name: "Ruby",
        mine_action_chance: 2 //10 thousand tons
      },
      scheelite: {
        name: "Scheelite",
        mine_action_chance: 11, //3 million tons
      },
      sperrylite: {
        name: "Sperrylite",
        mine_action_chance: 8, //900 thousand tons
      },
      sphalerite: {
        name: "Sphalerite",
        mine_action_chance: 12, //5,256 million tonnes
      },
      uraninite: {
        name: "Uraninite",
        mine_action_chance: 10, //1,5 million tons
      },
      wolframite: {
        name: "Wolframite",
        mine_action_chance: 18, //42 million tonnes
      }
    },
    seasoning: {
      name: "Seasoning",
      type: "category",

      bell_peppers: {
        name: "Bell Peppers"
      },
      camphor: {
        name: "Camphor"
      },
      cardamom: {
        name: "Cardamom"
      },
      cayenne: {
        name: "Cayenne"
      },
      chilli: {
        name: "Chilli",
        aliases: ["chili"]
      },
      cinnamon: {
        name: "Cinnamon"
      },
      cloves: {
        name: "Cloves"
      },
      fennel: {
        name: "Fennel"
      },
      fenugreek: {
        name: "Fenugreek"
      },
      garlic: {
        name: "Garlic"
      },
      ginger: {
        name: "Ginger"
      },
      linseed: {
        name: "Linseed"
      },
      mustard: {
        name: "Mustard"
      },
      nutmeg: {
        name: "Nutmeg"
      },
      oil_palm_fruit: {
        name: "Oil Palm Fruit"
      },
      paprika: {
        name: "Paprika"
      },
      pepper: {
        name: "Pepper"
      },
      rapeseed: {
        name: "Rapeseed"
      },
      sugarcane: {
        name: "Sugarcane"
      }
    },
    stone: {
      name: "Stone",
      type: "category",

      andesite: {
        name: "Andesite"
      },
      basalt: {
        name: "Basalt"
      },
      chalk: {
        name: "Chalk"
      },
      clay: {
        name: "Clay"
      },
      diorite: {
        name: "Diorite"
      },
      dolomite: {
        name: "Dolomite"
      },
      fieldstone: {
        name: "Fieldstone"
      },
      flagstone: {
        name: "Flagstone"
      },
      flint: {
        name: "Flint"
      },
      granite: {
        name: "Granite"
      },
      limestone: {
        name: "Limestone"
      },
      marble: {
        name: "Marble"
      },
      sandstone: {
        name: "Sandstone"
      },
      shale: {
        name: "Shale"
      },
      slate: {
        name: "Slate"
      }
    },
    tropical_crops: {
      name: "Tropical Crops",
      type: "category",

      bananas: {
        name: "Bananas"
      },
      citrus: {
        name: "Citrus"
      },
      coffee_beans: {
        name: "Coffee Beans"
      },
      dates: {
        name: "Dates"
      },
      guavas: {
        name: "Guavas"
      },
      mangoes: {
        name: "Mangoes",
        aliases: ["Mangos"]
      },
      mangosteens: {
        name: "Mangosteens"
      },
      sweet_potatoes: {
        name: "Sweet Potatoes"
      },
      yam: {
        name: "Yam"
      }
    },
    vegetables: {
      name: "Vegetables",
      type: "category",

      cabbage: {
        name: "Cabbage"
      },
      carrot: {
        name: "Carrot"
      },
      chicory: {
        name: "Chicory"
      },
      cucumbers: {
        name: "Cucumbers"
      },
      eggplants: {
        name: "Eggplants"
      },
      lettuce: {
        name: "Lettuce"
      },
      onions: {
        name: "Onions"
      },
      peas: {
        name: "Peas"
      },
      soybeans: {
        name: "Soybeans"
      },
      spinach: {
        name: "Spinach"
      },
      tomatoes: {
        name: "Tomatoes"
      },
      turnips: {
        name: "Turnips"
      }
    },
    wood: {
      name: "Wood",
      type: "category",

      acacia: {
        name: "Acacia"
      },
      ash: {
        name: "Ash"
      },
      balsa: {
        name: "Balsa"
      },
      basswood: {
        name: "Basswood"
      },
      blackwood: {
        name: "Blackwood"
      },
      bloodwood: {
        name: "Bloodwood"
      },
      cedar: {
        name: "Cedar"
      },
      cherry: {
        name: "Cherry"
      },
      chestnut: {
        name: "Chestnut"
      },
      cottonwood: {
        name: "Cottonwood"
      },
      cypress: {
        name: "Cypress"
      },
      ebony: {
        name: "Ebony"
      },
      elm: {
        name: "Elm"
      },
      eucalyptus: {
        name: "Eucalyptus"
      },
      fir: {
        name: "Fir"
      },
      hickory: {
        name: "Hickory"
      },
      ironwood: {
        name: "Ironwood"
      },
      lacewood: {
        name: "Lacewood"
      },
      mahogany: {
        name: "Mahogany"
      },
      maple: {
        name: "Maple"
      },
      oak: {
        name: "Oak"
      },
      pine: {
        name: "Pine"
      },
      redwood: {
        name: "Redwood"
      },
      rosewood: {
        name: "Rosewood"
      },
      sandalwood: {
        name: "Sandalwood"
      },
      spruce: {
        name: "Spruce"
      },
      turpentine: {
        name: "Turpentine"
      },
      walnut: {
        name: "Walnut"
      },
      willow: {
        name: "Willow"
      }
    },
    wool: {
      name: "Wool",
      type: "category",

      alpaca_wool: {
        name: "Alpaca Wool"
      },
      goat_wool: {
        name: "Goat Wool"
      },
      sheep_wool: {
        name: "Sheep Wool"
      }
    }
  },

  intermediate_goods: {
    name: "Intermediate Goods",
    type: "category",

    aluminium: {
      name: "Aluminium",
      aliases: ["aluminum"]
    },
    brass: {
      name: "Brass"
    },
    bronze: {
      name: "Bronze"
    },
    cabins: {
      name: "Cabins"
    },
    coals: {
      name: "Coals",
      type: "category",

      bituminous_coal: {
        name: "Bituminous Coal"
      },
      brown_coal: {
        name: "Brown Coal"
      },
      charcoal: {
        name: "Charcoal"
      },
      coal_coke: {
        name: "Coal Coke"
      },
      hard_coal: {
        name: "Hard Coal"
      },
      peat: {
        name: "Peat"
      }
    },
    concrete: {
      name: "Concrete"
    },
    copper_wire: {
      name: "Copper Wire"
    },
    electric_gear: {
      name: "Electric Gear"
    },
    electronics: {
      name: "Electronics",
      type: "category",

      capacitors: {
        name: "Capacitors"
      },
      resistors: {
        name: "Resistors"
      },
      transistors: {
        name: "Transistors"
      }
    },
    engines: {
      name: "Engines"
    },
    explosives: {
      name: "Explosives",
      type: "category",

      anfo: {
        name: "ANFO"
      },
      dynamite: {
        name: "Dynamite"
      },
      plastic_explosives: {
        name: "Plastic Explosives"
      },
      TNT: {
        name: "TNT"
      }
    },
    fabric: {
      name: "Fabric",
      type: "category",

      cloth: {
        name: "Cloth"
      },
      linen: {
        name: "Linen"
      },
      synthetic_fabric: {
        name: "Synthetic Fabric"
      }
    },
    felt: {
      name: "Felt"
    },
    filaments: {
      name: "Filaments"
    },
    flour: {
      name: "Flour"
    },
    glass: {
      name: "Glass"
    },
    gunpowder: {
      name: "Gunpowder"
    },
    industrial_chemicals: {
      name: "Industrial Chemicals",
      type: "category",

      acetic_acid: {
        name: "Acetic Acid"
      },
      acetone: {
        name: "Acetone"
      },
      ammonia: {
        name: "Ammonia"
      },
      argon: {
        name: "Argon"
      },
      benzene: {
        name: "Benzene"
      },
      bromine: {
        name: "Bromine"
      },
      butadiene: {
        name: "Butadiene"
      },
      calcium: {
        name: "Calcium"
      },
      calcium_carbonate: {
        name: "Calcium Carbonate"
      },
      carbon: {
        name: "Carbon"
      },
      chlorine: {
        name: "Chlorine"
      },
      epoxyethane: {
        name: "Epoxyethane"
      },
      ethanol: {
        name: "Ethanol"
      },
      ethylene: {
        name: "Ethylene"
      },
      ethylene_glycol: {
        name: "Ethylene Glycol"
      },
      fluorine: {
        name: "Fluorine"
      },
      formaldehyde: {
        name: "Formaldehyde"
      },
      hydrochloric_acid: {
        name: "Hydrochloric Acid"
      },
      hydrogen: {
        name: "Hydrogen"
      },
      hydrogen_fluoride: {
        name: "Hydrogen Fluoride"
      },
      hydrogen_peroxide: {
        name: "Hydrogen Peroxide"
      },
      iodine: {
        name: "Iodine"
      },
      krypton: {
        name: "Krypton"
      },
      methanol: {
        name: "Methanol"
      },
      methylbenzene: {
        name: "Methylbenzene"
      },
      methyl_tertiary_butyl_ether: {
        name: "Methyl Tertiary-butyl Ether",
        aliases: ["MTBE"]
      },
      neon: {
        name: "Neon"
      },
      nitric_acid: {
        name: "Nitric Acid"
      },
      nitrogen: {
        name: "Nitrogen"
      },
      oxygen: {
        name: "Oxygen"
      },
      phenol: {
        name: "Phenol"
      },
      propylene: {
        name: "Propylene"
      },
      phosphoric_acid: {
        name: "Phosphoric Acid"
      },
      phosphorus: {
        name: "Phosphorus"
      },
      sodium_carbonate: {
        name: "Sodium Carbonate"
      },
      sodium_hydroxide: {
        name: "Sodium Hydroxide"
      },
      sulphur: {
        name: "Sulphur"
      },
      sulphuric_acid: {
        name: "Sulphuric Acid"
      },
      titanium_dioxide: {
        name: "Titanium Dioxide"
      },
      urea: {
        name: "Urea"
      },
      xenon: {
        name: "Xenon"
      }
    },
    integrated_circuits: {
      name: "Integrated Circuits"
    },
    locomotives: {
      name: "Locomotives"
    },
    machine_parts: {
      name: "Machine Parts"
    },
    malt: {
      name: "Malt"
    },
    molasses: {
      name: "Molasses"
    },
    natural_gas: {
      name: "Natural Gas"
    },
    processed_hops: {
      name: "Processed Hops"
    },
    processed_ores: {
      name: "Processed Ores",
      type: "category",

      alumina: {
        name: "Alumina"
      },
      arsenic: {
        name: "Arsenic"
      },
      barium: {
        name: "Barium"
      },
      beryllium: {
        name: "Beryllium"
      },
      chromium: {
        name: "Chromium"
      },
      cobalt: {
        name: "Cobalt"
      },
      copper: {
        name: "Copper"
      },
      gold: {
        name: "Gold"
      },
      ferrochromium: {
        name: "Ferrochromium"
      },
      iron: {
        name: "Iron"
      },
      lead: {
        name: "Lead"
      },
      nickel: {
        name: "Nickel"
      },
      niobium: {
        name: "Niobium"
      },
      manganese: {
        name: "Manganese"
      },
      mercury: {
        name: "Mercury"
      },
      molybdenum: {
        name: "Molybdenum"
      },
      palladium: {
        name: "Palladium"
      },
      pig_iron: {
        name: "Pig Iron"
      },
      platinum: {
        name: "Platinum"
      },
      saltpetre: {
        name: "Saltpetre",
        aliases: ["saltpeter"]
      },
      silicon: {
        name: "Silicon"
      },
      silver: {
        name: "Silver"
      },
      tantalum: {
        name: "Tantalum"
      },
      tin: {
        name: "Tin"
      },
      titanium: {
        name: "Titanium"
      },
      tungsten: {
        name: "Tungsten"
      },
      zinc: {
        name: "Zinc"
      }
    },
    silk: {
      name: "Silk"
    },
    steel: {
      name: "Steel",
      type: "category",

      regular_steel: {
        name: "Regular Steel"
      },
      stainless_steel: {
        name: "Stainless Steel"
      }
    },
    tallow: {
      name: "Tallow"
    },
    turbines: {
      name: "Turbines"
    },
    velvet: {
      name: "Velvet"
    }
  },

  processed_goods: {
    name: "Processed Goods",
    icon: "construction_time",
    type: "category",

    alcohol: {
      name: "Alcohol",
      type: "category",

      beer: {
        name: "Beer"
      },
      gin: {
        name: "Gin"
      },
      schnapps: {
        name: "Schnapps"
      },
      rum: {
        name: "Rum"
      },
      tequila: {
        name: "Tequila"
      },
      tonics: {
        name: "Tonics"
      },
      vodka: {
        name: "Vodka"
      },
      whiskey: {
        name: "Whiskey"
      },
      wine: {
        name: "Wine",
        type: "category",

        champagne: {
          name: "Champagne"
        },
        red_wine: {
          name: "Red Wines",
          type: "category",

          barbera: {
            name: "Barbera"
          },
          cabernet_franc: {
            name: "Cabernet Franc"
          },
          cabernet_sauvignon: {
            name: "Cabernet Sauvignon"
          },
          charbono: {
            name: "Charbono"
          },
          dolcetto: {
            name: "Dolcetto"
          },
          gamay: {
            name: "Gamay"
          },
          grenache: {
            name: "Grenache"
          },
          malbec: {
            name: "Malbec"
          },
          merlot: {
            name: "Merlot"
          },
          mourvedre: {
            name: "Mourvedre"
          },
          nehbyehlas: {
            name: "Nehbyehlas"
          },
          petite_sirah: {
            name: "Petite Sirah"
          },
          pinot_gris: {
            name: "Pinot Gris"
          },
          pinot_noir: {
            name: "Pinot Noir"
          },
          port: {
            name: "Port"
          },
          red_bordeaux: {
            name: "Red Bordeaux"
          },
          sangiovese: {
            name: "Sangiovese"
          },
          syrah: {
            name: "Syrah"
          },
          zinfandel: {
            name: "Zinfandel"
          }
        },
        white_wine: {
          name: "White Wine",
          type: "category",

          chardonnay: {
            name: "Chardonnay"
          },
          gewurztraminer: {
            name: "Gewürztraminer",
            aliases: ["gewurztraminer", "gewuerztraminer"]
          },
          gruner_veltliner: {
            name: "Grüner Veltliner",
            aliases: ["gruner veltliner", "gruener veltliner"]
          },
          malvasia: {
            name: "Malvasia"
          },
          marsanne: {
            name: "Marsanne"
          },
          muscat: {
            name: "Muscat"
          },
          pinot_blanc: {
            name: "Pinot Blanc"
          },
          prosecco: {
            name: "Prosecco"
          },
          riesling: {
            name: "Riesling"
          },
          sauvignon_blanc: {
            name: "Sauvignon Blanc"
          },
          semillon: {
            name: "Sémillon"
          },
          vernaccia: {
            name: "Vernaccia"
          },
          viognier: {
            name: "Viognier"
          },
          white_bordeaux: {
            name: "White Bordeaux"
          }
        }
      },
    },
    ammunition: {
      name: "Ammunition",
      type: "category",

      ap_rounds: {
        name: "AP Rounds"
      },
      artillery_shells: {
        name: "Artillery Shells",
        type: "category",

        delayed_fuse_shells: {
          name: "Delayed-Fuse Shells"
        },
        regular_shells: {
          name: "Regular Shells"
        }
      },
      high_calibre_ammunition: {
        name: "High-calibre Ammunition",
        aliases: ["high-caliber ammunition", "high caliber ammunition", "high calibre ammunition"]
      },
      low_calibre_ammunition: {
        name: "Low-calibre Ammunition",
        aliases: ["low-caliber ammunition", "low caliber ammunition", "low calibre ammunition"]
      },
      sabot_rounds: {
        name: "Sabot Rounds"
      }
    },
    automobiles: {
      name: "Automobiles",
      type: "category",

      cars: {
        name: "Cars"
      },
      humvees: {
        name: "Humvees"
      },
      jeeps: {
        name: "Jeeps"
      },
      lorries: {
        name: "Lorries"
      },
      luxury_cars: {
        name: "Luxury Cars"
      },
      motorbikes: {
        name: "Motorbikes"
      },
      steam_carriages: {
        name: "Steam Carriages"
      },
      tractors: {
        name: "Tractors"
      },
      vans: {
        name: "Vans"
      }
    },
    bicycles: {
      name: "Bicycles"
    },
    bricks: {
      name: "Bricks"
    },
    cameras: {
      name: "Cameras"
    },
    cement: {
      name: "Cement"
    },
    ceramics: {
      name: "Ceramics"
    },
    chassis: {
      name: "Chassis"
    },
    chinaware: {
      name: "Chinaware",
      type: "category",

      bone_china: {
        name: "Bone China"
      },
      china: {
        name: "China"
      },
      doccia_porcelain: {
        name: "Doccia Porcelain"
      },
      lacquerware: {
        name: "Lacquerware"
      },
      porcelain: {
        name: "Porcelain"
      }
    },
    chewing_gum: {
      name: "Chewing Gum"
    },
    chocolate: {
      name: "Chocolate"
    },
    cigars: {
      name: "Cigars"
    },
    cigarettes: {
      name: "Cigarettes"
    },
    clothes: {
      name: "Clothes",
      type: "category",

      luxury_clothes: {
        name: "Luxury Clothes",
        type: "category",

        bowler_hats: {
          name: "Bowler Hats"
        },
        finery: {
          name: "Finery"
        },
        fur_coats: {
          name: "Fur Coats"
        },
        fur_hats: {
          name: "Fur Hats"
        },
        leather_boots: {
          name: "Leather Boots"
        },
        pocketwatches: {
          name: "Pocketwatches",
          aliases: ["pocket watches"]
        },
        tailored_suits: {
          name: "Tailored Suits"
        },
        wristwatches: {
          name: "Wristwatches"
        }
      },
      staple_clothes: {
        name: "Staple Clothes",
        type: "category",

        boots: {
          name: "Boots"
        },
        parkas: {
          name: "Parkas"
        },
        ponchos: {
          name: "Ponchos"
        },
        work_clothes: {
          name: "Work Clothes"
        }
      }
    },
    clay_pipes: {
      name: "Clay Pipes"
    },
    coffee: {
      name: "Coffee"
    },
    computers: {
      name: "Computers"
    },
    cosmetic_products: {
      name: "Cosmetic Products"
    },
    dyes: {
      name: "Dyes"
    },
    enriched_uranium: {
      name: "Enriched Uranium",
      type: "category",

      depleted_uranium: {
        name: "Depleted Uranium"
      },
      uranium: {
        name: "Uranium"
      },
      highly_enriched_uranium: {
        name: "Highly Enriched Uranium",
        aliases: ["HEU"]
      },
      weapons_grade_enriched_uranium: {
        name: "Weapons-Grade Enriched Uranium",
        aliases: ["weapons grade enriched uranium"]
      }
    },
    fertiliser: {
      name: "Fertiliser"
    },
    film: {
      name: "Film"
    },
    foods: {
      name: "Foods",
      type: "category",

      bread: {
        name: "Bread"
      },
      canned_food: {
        name: "Canned Food"
      },
      cheese: {
        name: "Cheese",
        type: "category",
        aliases: ["cheeses"],

        american: {
          name: "American"
        },
        blue: {
          name: "Blue",
          type: "category",

          gorgonzola: {
            name: "Gorgonzola"
          },
          roquefort: {
            name: "Roquefort"
          },
          stilton: {
            name: "Stilton"
          }
        },
        brie: {
          name: "Brie"
        },
        butterkase: {
          name: "Butterkäse",
          aliases: ["butterkase", "butterkaese"]
        },
        cantal: {
          name: "Cantal"
        },
        cascaval: {
          name: "Cascaval"
        },
        cheddar: {
          name: "Cheddar"
        },
        cheshire: {
          name: "Cheshire"
        },
        coulommiers: {
          name: "Coulommiers"
        },
        cream_cheese: {
          name: "Cream Cheese"
        },
        edam: {
          name: "Edam"
        },
        feta: {
          name: "Feta"
        },
        gloucester: {
          name: "Gloucester"
        },
        gouda: {
          name: "Gouda"
        },
        grana_padano: {
          name: "Grana Padano"
        },
        havarti: {
          name: "Havarti"
        },
        jarlsberg: {
          name: "Jarlsberg"
        },
        munster: {
          name: "Munster"
        },
        neufchatel: {
          name: "Neufchatel"
        },
        parmesan: {
          name: "Parmesan"
        },
        pecorino: {
          name: "Pecorino"
        },
        port_salut: {
          name: "Port Salut"
        },
        ricotta: {
          name: "Ricotta"
        },
        swiss: {
          name: "Swiss"
        }
      },
      dried_meat: {
        name: "Dried Meat"
      },
      jam: {
        name: "Jam"
      },
      lemonade: {
        name: "Lemonade"
      },
      pemmican: {
        name: "Pemmican"
      },
      sausages: {
        name: "Sausages"
      },
      soup: {
        name: "Soup"
      },
      stew: {
        name: "Stew"
      },
      syrup: {
        name: "Syrup"
      },
      tortillas: {
        name: "Tortillas"
      }
    },
    furniture: {
      name: "Furniture",
      type: "category",

      common_furniture: {
        name: "Common Furniture"
      },
      luxury_furniture: {
        name: "Luxury Furniture"
      }
    },
    gas: {
      name: "Gas"
    },
    gems: {
      name: "Gems",
      type: "category",

      cut_ruby: {
        name: "Cut Ruby"
      },
      diamond: {
        name: "Diamond"
      },
      jewellery: {
        name: "Jewellery",
        aliases: ["jewelry"]
      }
    },
    glasses: {
      name: "Glasses"
    },
    gramophones: {
      name: "Gramophones"
    },
    heavy_weaponry: {
      name: "Heavy Weaponry"
    },
    honey: {
      name: "Honey"
    },
    illicit_drugs: {
      name: "Illicit Drugs",
      type: "category",

      cannabis: {
        name: "Cannabis",
        aliases: ["weed"]
      },
      carfentanil: {
        name: "Carfentanil",
        aliases: ["carfentanyl"]
      },
      cocaine: {
        name: "Cocaine",
        aliases: ["coke"]
      },
      crack_cocaine: {
        name: "Crack Cocaine"
      },
      fentanyl: {
        name: "Fentanyl",
        aliases: ["fentanil"]
      },
      hashish: {
        name: "Hashish"
      },
      heroin: {
        name: "Heroin"
      },
      methamphetamine: {
        name: "Methamphetamine"
      },
      opium: {
        name: "Opium"
      },
      psychedelics: {
        name: "Psychedelics"
      }
    },
    incense: {
      name: "Incense"
    },
    ink: {
      name: "Ink"
    },
    lamps: {
      name: "Lamps",
      type: "category",

      candles: {
        name: "Candles"
      },
      electric_lamps: {
        name: "Electric Lamps"
      },
      lanterns: {
        name: "Lanterns"
      },
      oil_lamps: {
        name: "Oil Lamps"
      }
    },
    lasers: {
      name: "Lasers"
    },
    lifts: {
      name: "Lifts"
    },
    lightbulbs: {
      name: "Lightbulbs",
      aliases: ["light bulbs"]
    },
    lumber: {
      name: "Lumber",
      type: "category",

      acacia_lumber: {
        name: "Acacia Lumber"
      },
      ash_lumber: {
        name: "Ash Lumber"
      },
      balsa_lumber: {
        name: "Balsa Lumber"
      },
      basswood_lumber: {
        name: "Basswood Lumber"
      },
      blackwood_lumber: {
        name: "Blackwood Lumber"
      },
      bloodwood_lumber: {
        name: "Bloodwood Lumber"
      },
      cedar_lumber: {
        name: "Cedar Lumber"
      },
      cherry_lumber: {
        name: "Cherry Lumber"
      },
      chestut_lumber: {
        name: "Chestnut Lumber"
      },
      cottonwood_lumber: {
        name: "Cottonwood Lumber"
      },
      cypress_lumber: {
        name: "Cypress Lumber"
      },
      ebony_lumber: {
        name: "Ebony Lumber"
      },
      elm_lumber: {
        name: "Elm Lumber"
      },
      eucalyptus_lumber: {
        name: "Eucalyptus Lumber"
      },
      fir_lumber: {
        name: "Fir Lumber"
      },
      hickory_lumber: {
        name: "Hickory Lumber"
      },
      ironwood_lumber: {
        name: "Ironwood Lumber"
      },
      lacewood_lumber: {
        name: "Lacewood Lumber"
      },
      mahogany_lumber: {
        name: "Mahogany Lumber"
      },
      maple_lumber: {
        name: "Maple Lumber"
      },
      oak_lumber: {
        name: "Oak Lumber"
      },
      pine_lumber: {
        name: "Pine Lumber"
      },
      redwood_lumber: {
        name: "Redwood Lumber"
      },
      rosewood_lumber: {
        name: "Rosewood Lumber"
      },
      sandalwood_lumber: {
        name: "Sandalwood Lumber"
      },
      spruce_lumber: {
        name: "Spruce Lumber"
      },
      turpentine_lumber: {
        name: "Turpentine Lumber"
      },
      walnut_lumber: {
        name: "Walnut Lumber"
      },
      willow_lumber: {
        name: "Willow Lumber"
      }
    },
    medicines: {
      name: "Medicines",
      type: "category",

      pharmaceuticals: {
        name: "Pharmaceuticals",
        type: "category",

        antipyretics: {
          name: "Antipyretics"
        },
        analgesics: {
          name: "Analgesics"
        },
        antimalarial_drugs: {
          name: "Antimalarial Drugs"
        },
        antibiotics: {
          name: "Antibiotics"
        },
        antiseptics: {
          name: "Antiseptics"
        },
        contraceptives: {
          name: "Contraceptives"
        },
        hormone_medications: {
          name: "Hormone Medications"
        },
        mood_stabilisers: {
          name: "Mood Stabilisers",
          aliases: ["mood stabilizers"]
        },
        statins: {
          name: "Statins"
        },
        stimulants: {
          name: "Stimulants"
        },
        tranquilisers: {
          name: "Tranquilisers",
          aliases: ["tranquilizers"]
        },
        vaccines: {
          name: "Vaccines"
        }
      },
      traditional_medicines: {
        name: "Traditional Medicines"
      }
    },
    naval_supplies: {
      name: "Naval Supplies"
    },
    olive_oil: {
      name: "Olive Oil"
    },
    paper: {
      name: "Paper"
    },
    plastics: {
      name: "Plastics"
    },
    radios: {
      name: "Radios"
    },
    recording_devices: {
      name: "Recording Devices"
    },
    refined_petroil: {
      name: "Refined Petroil"
    },
    reinforced_concrete: {
      name: "Reinforced Concrete"
    },
    rubber: {
      name: "Rubber"
    },
    salt: {
      name: "Salt"
    },
    sewing_machines: {
      name: "Sewing Machines"
    },
    shampoo: {
      name: "Shampoo"
    },
    sleeping_bags: {
      name: "Sleeping Bags"
    },
    souvenirs: {
      name: "Souvenirs"
    },
    small_arms: {
      name: "Small Arms"
    },
    soap: {
      name: "Soap"
    },
    steel_beams: {
      name: "Steel Beams"
    },
    sugar: {
      name: "Sugar"
    },
    tapestries: {
      name: "Tapestries"
    },
    tea: {
      name: "Tea",
      type: "category",

      black_tea: {
        name: "Black Tea"
      },
      chai_tea: {
        name: "Chai Tea"
      },
      green_tea: {
        name: "Green Tea"
      },
      herbal_tea: {
        name: "Herbal Tea"
      },
      hibiscus_tea: {
        name: "Hibiscus Tea"
      },
      oolong_tea: {
        name: "Oolong Tea"
      },
      puerh_tea: {
        name: "Pu-erh Tea",
        aliases: ["puerh tea", "pu erh tea"]
      },
      white_tea: {
        name: "White Tea"
      }
    },
    telephones: {
      name: "Telephones"
    },
    televisions: {
      name: "Televisions",
      aliases: ["TVs"]
    },
    tools: {
      name: "Tools"
    },
    torpedoes: {
      name: "Torpedoes"
    },
    trains: {
      name: "Trains"
    },
    typewriters: {
      name: "Typewriters"
    },
    tyres: {
      name: "Tyres"
    },
    uniforms: {
      name: "Uniforms"
    },
    violins: {
      name: "Violins"
    },
    wood_veneers: {
      name: "Wood Veneers"
    }
  }
};
