config.modifiers = {
  //Diplomatic/Political
  administrative_efficiency: {
    name: "Administrative Efficiency",
    type: "percentage",
    default_value: 0.50,

    minimum: 0,
    maximum: 1
  },
  advisor_cost: {
    name: "Advisor Cost",
    type: "percentage",
    default_value: 1
  },
  cb_generation_speed: {
    name: "CB Generation Speed",
    type: "percentage",
    default_value: 1
  },
  centralisation: {
    name: "Centralisation",
    type: "percentage",

    create_modifier_centralisation_gain: {
      name: "Centralisation Gain",
      type: "percentage",

      no_prefix: true
    }
  },
  colonial_immigration_rate: {
    name: "Colonial Immigration Rate",
    type: "percentage",
    default_value: 1
  },
  colonial_maintenance: {
    name: "Colonial Maintenance",
    type: "percentage",
    default_value: 1
  },
  colonial_power_cap: {
    name: "Colonial Power Capacity",
    type: "integer",
    default_value: 50
  },
  colonial_power_gain: {
    name: "Colonial Power Gain",
    type: "percentage",
    default_value: 1
  },
  colonist_travel_speed: {
    name: "Colonist Travel Speed",
    type: "percentage",
    default_value: 1
  },
  crime_rate: {
    name: "Crime Rate",
    type: "percentage",
    default_value: 0.05
  },
  diplomatic_slots: {
    name: "Diplomatic Slots",
    type: "integer",
    default_value: 3,

    create_capacity_used_diplomatic_slots: {
      name: "Used Diplomatic Slots",
      aliases: ["use_diplomatic_slots"],
      default_value: 0
    }
  },
  infamy: {
    name: "Infamy",
    type: "integer",
    default_value: 0,

    minimum: 0,
    maximum: 15,

    create_modifier_infamy_loss: {
      name: "Infamy Loss",
      default_value: 0.10,
      negative: true
    }
  },
  influence: {
    name: "Influence",
    type: "percentage",
    default_value: 0,

    create_modifier_influence_gain: {
      name: "Influence Gain",
      default_value: 0.05
    }
  },
  jingoism: {
    name: "Jingoism",
    type: "percentage",
    default_value: 0
  },
  maximum_expeditions: {
    name: "Maximum Expeditions",
    type: "integer",
    default_value: 1,

    minimum: 1
  },
  opinion_modifier: {
    name: "Opinion Modifier",
    type: "integer",
    default_value: 0
  },
  overextension_modifier: {
    name: "Overextension",
    type: "percentage",
    default_value: 1,

    minimum: 0.05
  },
  political_capital: {
    name: "Political Capital",
    type: "integer",
    default_value: 0
  },
  political_capital_gain: {
    name: "Political Capital Gain",
    type: "integer",
    default_value: 5,

    minimum: 5
  },
  prestige: {
    name: "Prestige",
    type: "integer",

    create_modifier_prestige_gain: {
      name: "Prestige Gain",
      type: "integer",
      default_value: 5
    }
  },
  reform_desire: {
    name: "Reform Desire",
    type: "percentage",

    minimum: 0,
    maximum: 1,

    create_modifier_reform_desire_gain: {
      name: "Reform Desire Gain",
      type: "percentage",
      default_value: 0.02
    }
  },
  republicanism: {
    name: "Republicanism",
    type: "percentage",
    default_value: 0,

    minimum: 0,
    maximum: 1
  },
  ruling_party_support: {
    name: "Ruling Party Support",
    type: "percentage",
    default_value: 0,

    minimum: 0,
    maximum: 1
  },
  stability: {
    name: "Stability",
    type: "percentage",
    default_value: 1,

    minimum: 0,
    maximum: 1,

    create_modifier_stability_modifier: {
      name: "Stability Modifier",
      type: "percentage",

      no_prefix: true
    }
  },

  //Economic
  building_category_modifiers: {
    all_building_categories: {
      create_modifier_building_slots: {
        name: "BUILDING_CATEGORY_NAME Slots",
        type: "integer",
        default_value: 1
      }
    }
  },
  building_cost: {
    name: "Building Cost",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  civilian_actions: {
    name: "Civilian Actions",
    type: "percentage",
    default_value: 0
  },
  construction_speed: {
    name: "Construction Speed",
    type: "percentage",
    default_value: 1
  },
  extra_building_slots: {
    name: "Extra Building Slots",
    type: "integer",
    default_value: 0
  },
  goods_modifiers: {
    all_good_types: {
      create_modifier_gain: {
        name: "GOOD_NAME Gain",
        type: "percentage",
        default_value: 1
      }
    }
  },
  isolation: {
    name: "Isolation",
    type: "percentage",
    default_value: 0.50,

    minimum: 0,
    maximum: 1
  },
  max_tax: {
    name: "Maximum Tax Rate",
    type: "percentage",
    default_value: 0,

    minimum: 0,
    maximum: 1
  },
  pop_growth_modifier: {
    name: "Pop Growth Modifier",
    type: "percentage",
    default_value: 1.0539,

    minimum: 0.01
  },
  pop_modifiers: {
    all_pop_types: {
      create_modifier_growth_modifier: {
        name: "POP_NAME Growth Modifier",
        type: "percentage",
        default_value: 1
      }
    }
  },
  production_efficiency: {
    name: "Production Efficiency",
    type: "percentage",
    default_value: 1,

    minimum: 0.05
  },
  research_efficiency: {
    name: "Research Efficiency",
    type: "percentage",
    default_value: 1,

    minimum: 0.05,
  },
  research_slots: {
    name: "Research Slots",
    type: "integer",
    default_value: 3,

    minimum: 1
  },
  rgo_throughput: {
    name: "RGO Throughput",
    type: "percentage",
    default_value: 1,

    minimum: 0.05
  },
  shipment_capacity: {
    name: "Shipment Capacity",
    type: "integer",
    default_value: 50,

    minimum: 0
  },
  shipment_time: {
    name: "Shipment Time",
    type: "percentage",
    default_value: 1,

    minimum: 0.05
  },
  tax_efficiency: {
    name: "Tax Efficiency",
    type: "percentage",
    default_value: 1,

    minimum: 0.10
  },

  //Military
  ack_ack_effectiveness: {
    name: "Ack-Ack Effectiveness",
    type: "percentage",
    default_value: 1
  },
  air_range: {
    name: "Air Range",
    type: "percentage",
    default_value: 1
  },
  army_upkeep: {
    name: "Army Upkeep",
    type: "percentage",
    default_value: 1
  },
  army_travel_speed: {
    name: "Army Travel Speed",
    type: "percentage",
    default_value: 1
  },
  attrition_rate: {
    name: "Attrition Rate",
    type: "percentage",
    default_value: 1
  },
  army_professionalism: {
    name: "Army Professionalism",
    type: "percentage",
    default_value: 0.50,

    minimum: 0,
    maximum: 1
  },
  blockade_efficiency: {
    name: "Blockade Efficiency",
    type: "percentage",
    default_value: 1,

    minimum: 0,
    maximum: 1
  },
  casualty_reduction: {
    name: "Casualty Reduction",
    type: "percentage",
    default_value: 1,

    minimum: 0,
    maximum: 1,

    inverse: true
  },
  command_power_gain: {
    name: "Command Power Gain",
    type: "percentage",
    default_value: 1
  },
  knowledge_investment_limit: {
    name: "Knowledge Investment Limit",
    type: "percentage",
    default_value: 1,

    minimum: 0,
    maximum: 4
  },
  manpower_percentage: {
    name: "Manpower Percentage",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  mobilisation_impact: {
    name: "Mobilisation Impact",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  mobilisation_size: {
    name: "Mobilisation Size",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  mobilisation_speed: {
    name: "Mobilisation Speed",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  national_manpower: {
    name: "National Manpower",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  navy_professionalism: {
    name: "Navy Professionalism",
    type: "percentage",
    default_value: 0.50,

    minimum: 0,
    maximum: 1
  },
  non_core_manpower: {
    name: "Non-Core Manpower",
    type: "percentage",
    default_value: config.non_core_manpower
  },
  supply_consumption: {
    name: "Supply Consumption",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  training_cost: {
    name: "Training Cost",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  unit_cost: {
    name: "Unit Cost",
    type: "percentage",
    default_value: 1,

    minimum: 0
  },
  unit_modifiers: {
    all_units: {
      create_modifier_attack: {
        name: "UNIT_NAME Attack",
        type: "percentage",
        default_value: 1
      },
      create_modifier_defence: {
        name: "UNIT_NAME Defence",
        type: "percentage",
        default_value: 1
      }
    }
  },
  war_exhaustion: {
    name: "War Exhaustion",
    type: "percentage",
    default_value: 1,

    minimum: 0,
    maximum: 1,

    create_modifier_war_exhaustion_rate: {
      name: "War Exhaustion Rate",
      type: "percentage",
      default_value: 1,

      minimum: 0.01
    }
  }
};
