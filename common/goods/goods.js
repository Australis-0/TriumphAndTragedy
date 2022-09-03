config.goods = {
  //Special scope - these goods are entirely hidden from public view
  hidden: {
    knowledge: {
      name: "Knowledge",
      icon: "knowledge",

      doesnt_stack: true,
      research_good: true
    }
  },

  crafting_points: {
    name: "Crafting Points",
    icon: "workers",

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

    bauxite: {
      name: "Bauxite",
      icon: "bauxite",

      buy_price: 1500,
      mine_action_chance: 9
    },
    coal: {
      name: "Coal",
      icon: "coal",

      buy_price: 1000,
      mine_action_chance: 9
    },
    cotton: {
      name: "Cotton",
      icon: "cotton",

      buy_price: 1200
    },
    copper: {
      name: "Copper",
      icon: "copper",

      buy_price: 1800,
      mine_action_chance: 10
    },
    gold: {
      name: "Gold",
      icon: "gold",

      buy_price: 3500,
      mine_action_chance: 2
    },
    iron: {
      name: "Iron",
      icon: "iron",

      buy_price: 2000,
      mine_action_chance: 35
    },
    lead: {
      name: "Lead",
      icon: "lead",

      buy_price: 700,
      mine_action_chance: 20
    },
    meat: {
      name: "Meat",
      icon: "meat",

      buy_price: 600
    },
    silver: {
      name: "Silver",
      icon: "silver",

      buy_price: 2200,
      mine_action_chance: 8
    },
    stone: {
      name: "Stone",
      icon: "stone",

      buy_price: 1500,
      quarry_action_chance: 1
    },
    sulphur: {
      name: "Sulphur",
      icon: "sulphur",

      buy_price: 2500,
      mine_action_chance: 5
    },
    petroil: {
      name: "Petroil",
      icon: "petroil",

      buy_price: 2500
    },
    wheat: {
      name: "Wheat",
      icon: "wheat",

      buy_price: 500
    },
    wood: {
      name: "Wood",
      icon: "wood",

      buy_price: 900,
      chop_action_chance: 1
    }
  },
  processed_goods: {
    name: "Processed Goods",
    icon: "construction_time",

    aluminium: {
      name: "Aluminium",
      aliases: ["aluminum"],
      icon: "aluminium",

      buy_price: 2200
    },
    ammunition: {
      name: "Ammunition",
      aliases: ["ammo"],
      icon: "ammunition",

      buy_price: 1000
    },
    artillery: {
      name: "Artillery",
      aliases: ["arty"],
      icon: "artillery",

      buy_price: 12500
    },
    concrete: {
      name: "Concrete",
      icon: "concrete",

      buy_price: 1100
    },
    fertiliser: {
      name: "Fertiliser",
      aliases: ["fertilizer"],
      icon: "fertiliser",

      buy_price: 2000
    },
    food: {
      name: "Food",
      icon: "food",

      buy_price: 850,

      special_effect: function (usr) {
        //At least 1 food per million is required by the population
        usr.inventory.food -= Math.ceil(usr.population/1000000);

        if (usr.inventory.food < Math.ceil(usr.population/1000000)) {
          usr.has_famine = true;

          killPops(usr.id, {
            type: "all",
            amount: getFaminePenalty(usr.id)
          });
        }
      }
    },
    lumber: {
      name: "Lumber",
      icon: "lumber",

      buy_price: 700
    },
    machine_parts: {
      name: "Machine Parts",
      icon: "machine_parts",

      buy_price: 5500
    },
    refined_petroil: {
      name: "Refined Petroil",
      aliases: ["refined_petrol", "refined_oil"],
      icon: "refined_petroil",

      buy_price: 3000
    },
    small_arms: {
      name: "Small Arms",
      aliases: ["guns"],
      icon: "small_arms",

      buy_price: 1500
    },
    steel: {
      name: "Steel",
      icon: "steel",

      buy_price: 3500
    },
    uniforms: {
      name: "Uniforms",
      aliases: ["military_uniforms"],
      icon: "uniforms",

      buy_price: 1350
    }
  }
};
