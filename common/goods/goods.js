config.goods = { //WIP, REFACTOR
  //Special scope - these goods are entirely hidden from public view
  hidden: {
    knowledge: {
      name: "Knowledge",
      icon: config.icons.knowledge,

      doesnt_stack: true,
      research_good: true
    }
  },

  crafting_points: {
    name: "Crafting Points",
    ground_units_cp: {
      name: "Army CP",
      icon: config.icons.active_personnel,

      doesnt_stack: true
    },
    ground_artillery_cp: {
      name: "Artillery CP",
      icon: config.icons.artillery,

      doesnt_stack: true
    },
    ground_vehicles_cp: {
      name: "Armour CP",
      icon: config.icons.land_vehicles,

      doesnt_stack: true
    },
    aeroplanes_cp: {
      name: "Air CP",
      icon: config.icons.aeroplanes,

      doesnt_stack: true
    },
    naval_units_cp: {
      name: "Naval CP",
      icon: config.icons.naval_units,

      doesnt_stack: true
    }
  },

  raw_resources: {
    name: "Raw Materials",
    bauxite: {
      name: "Bauxite",
      icon: config.icons.bauxite,

      buy_price: 1500,
      mine_action_chance: 9
    },
    coal: {
      name: "Coal",
      icon: config.icons.coal,

      buy_price: 1000,
      mine_action_chance: 9
    },
    cotton: {
      name: "Cotton",
      icon: config.icons.cotton,

      buy_price: 1200
    },
    copper: {
      name: "Copper",
      icon: config.icons.copper,

      buy_price: 1800,
      mine_action_chance: 10
    },
    gold: {
      name: "Gold",
      icon: config.icons.gold,

      buy_price: 3500,
      mine_action_chance: 2
    },
    iron: {
      name: "Iron",
      icon: config.icons.iron,

      buy_price: 2000,
      mine_action_chance: 35
    },
    lead: {
      name: "Lead",
      icon: config.icons.lead,

      buy_price: 700,
      mine_action_chance: 20
    },
    meat: {
      name: "Meat",
      icon: config.icons.meat,

      buy_price: 600
    },
    silver: {
      name: "Silver",
      icon: config.icons.silver,

      buy_price: 2200,
      mine_action_chance: 8
    },
    stone: {
      name: "Stone",
      icon: config.icons.stone,

      buy_price: 1500,
      quarry_action_chance: 1
    },
    sulphur: {
      name: "Sulphur",
      icon: config.icons.sulphur,

      buy_price: 2500,
      mine_action_chance: 5
    },
    petroil: {
      name: "Petroil",
      icon: config.icons.petroil,

      buy_price: 2500
    },
    wheat: {
      name: "Wheat",
      icon: config.icons.wheat,

      buy_price: 500
    },
    wood: {
      name: "Wood",
      icon: config.icons.wood,

      buy_price: 900,
      chop_action_chance: 1
    }
  },
  processed_goods: {
    name: "Processed Goods",
    aluminium: {
      name: "Aluminium",
      aliases: ["aluminum"],
      icon: config.icons.aluminium,

      buy_price: 2200
    },
    ammunition: {
      name: "Ammunition",
      aliases: ["ammo"],
      icon: config.icons.ammunition,

      buy_price: 1000
    },
    artillery: {
      name: "Artillery",
      aliases: ["arty"],
      icon: config.icons.artillery,

      buy_price: 12500
    },
    concrete: {
      name: "Concrete",
      icon: config.icons.concrete,

      buy_price: 1100
    },
    fertiliser: {
      name: "Fertiliser",
      aliases: ["fertilizer"],
      icon: config.icons.fertiliser,

      buy_price: 2000
    },
    food: {
      name: "Food",
      icon: config.icons.food,

      buy_price: 850,

      //At least 1 food per million is required by the population
      pop_demand: {
        required_by: "all",
        type: "basic_need",

        if_shortage: {
          limit: {
            good_required_per_population: 1000000
          },
          decrease_population_by: "FAMINE_IMPACT"
        }
      }
    },
    lumber: {
      name: "Lumber",
      icon: config.icons.lumber,

      buy_price: 700
    },
    machine_parts: {
      name: "Machine Parts",
      icon: config.icons.machine_parts,

      buy_price: 5500
    },
    refined_petroil: {
      name: "Refined Petroil",
      aliases: ["refined_petrol", "refined_oil"],
      icon: config.icons.refined_petroil,

      buy_price: 3000
    },
    small_arms: {
      name: "Small Arms",
      aliases: ["guns"],
      icon: config.icons.small_arms,

      buy_price: 1500
    },
    steel: {
      name: "Steel",
      icon: config.icons.steel,

      buy_price: 3500
    },
    uniforms: {
      name: "Uniforms",
      aliases: ["military_uniforms"],
      icon: config.icons.uniforms,

      buy_price: 1350
    }
  }
};
