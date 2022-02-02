config.buildings.processing_facilities = {
  order: 5,
  aluminium_factories: {
    name: "Aluminium Factories",
    singular: "Aluminium Factory",
    aliases: ["aluminum_factories", "aluminium_factory", "aluminium_refinery", "aluminum_factory"],
    icon: "aluminium_factories",

    cost: {
      steel: 15,
      concrete: 10,
      machine_parts: 10,
      money: 7500
    },
    maintenance: {
      bauxite: 10
    },
    manpower_cost: {
      workers: 40000
    },
    produces: {
      aluminium: 5
    }
  },
  ammunition_factories: {
    name: "Ammunition Factories",
    singular: "Ammunition Factory",
    aliases: ["ammunition_factory"],
    icon: "ammunition_factories",

    cost: {
      iron: 10,
      stone: 10,
      lumber: 5,
      machine_parts: 5,
      money: 5000
    },
    maintenance: {
      sulphur: 2,
      lead: 2,
      coal: 1,
      iron: 1
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      ammunition: 50
    }
  },
  artillery_factories: {
    name: "Artillery Factories",
    singular: "Artillery Factory",
    aliases: ["artillery_factory"],
    icon: "artillery_factories",

    cost: {
      iron: 10,
      stone: 10,
      lumber: 5,
      machine_parts: 5,
      money: 5000
    },
    maintenance: {
      steel: 5
    },
    manpower_cost: {
      workers: 35000
    },
    produces: {
      artillery: 1
    }
  },
  concrete_factories: {
    name: "Concrete Factories",
    singular: "Concrete Factory",
    aliases: ["concrete_factory"],
    icon: "concrete_factories",

    cost: {
      steel: 10,
      stone: 15,
      machine_parts: 5,
      money: 3500
    },
    maintenance: {
      stone: 10
    },
    manpower_cost: {
      workers: 20000
    },
    produces: {
      concrete: 5
    }
  },
  fertiliser_factories: {
    name: "Fertiliser Factories",
    singular: "Fertiliser Factory",
    aliases: ["fertilizer_factories", "fertilizer_factory", "fertilizer_factory"],
    icon: "fertiliser_factories",

    cost: {
      stone: 15,
      lumber: 10,
      iron: 5,
      money: 5000
    },
    maintenance: {
      sulphur: 10
    },
    manpower_cost: {
      workers: 20000
    },
    produces: {
      fertiliser: 5
    }
  },
  forgeries: {
    name: "Forgeries",
    singular: "Forgery",
    icon: "forgeries",

    cost: {
      iron: 5,
      wood: 5,
      stone: 10,
      coal: 10
    },
    maintenance: {
      coal: 1,
      iron: 1
    },
    manpower_cost: {
      workers: 35000
    },
    produces: {
      steel: 1
    }
  },
  food_processing_facilities: {
    name: "Food Processing Facilities",
    singular: "Food Processing Facility",
    aliases: ["food_processing_facility"],
    icon: "food_processing_facilities",

    cost: {
      stone: 5,
      lumber: 5,
      iron: 2,
      money: 1000
    },
    maintenance: {
      meat: 2,
      wheat: 1
    },
    manpower_cost: {
      workers: 10000
    },
    produces: {
      food: 5
    }
  },
  machine_parts_factories: {
    name: "Machine Parts Factories",
    singular: "Machine Parts Factory",
    aliases: ["machine_parts_factory"],
    icon: "machine_parts_factories",

    cost: {
      steel: 5,
      iron: 10,
      stone: 20,
      money: 10000
    },
    maintenance: {
      steel: 1,
      copper: 2
    },
    manpower_cost: {
      workers: 55000
    },
    produces: {
      machine_parts: 5
    }
  },
  sawmills: {
    name: "Sawmills",
    singular: "Sawmill",
    icon: "sawmills",

    cost: {
      wood: 10,
      iron: 5,
      money: 3000
    },
    maintenance: {
      wood: 5
    },
    manpower_cost: {
      workers: 40000
    },
    produces: {
      lumber: 5
    }
  },
  small_arms_factories: {
    name: "Small Arms Factories",
    singular: "Small Arms Factory",
    aliases: ["small_arms_factory"],
    icon: "small_arms_factories",

    cost: {
      stone: 15,
      steel: 5,
      lumber: 10,
      money: 10000
    },
    maintenance: {
      lumber: 2,
      steel: 3
    },
    manpower_cost: {
      workers: 50000
    },
    produces: {
      small_arms: 20
    }
  },
  steelworks: {
    name: "Steelworks",
    singular: "Steelwork",
    icon: "steelworks",

    cost: {
      stone: 20,
      iron: 15,
      money: 15000
    },
    maintenance: {
      coal: 5,
      iron: 5
    },
    manpower_cost: {
      workers: 60000
    },
    produces: {
      steel: 5
    }
  },
  textile_mills: {
    name: "Textile Mills",
    singular: "Textile Mill",
    icon: "textile_mills",

    cost: {
      iron: 20,
      machine_parts: 10,
      money: 7000
    },
    maintenance: {
      cotton: 2
    },
    manpower_cost: {
      workers: 40000
    },
    produces: {
      uniforms: 10
    }
  }
};
