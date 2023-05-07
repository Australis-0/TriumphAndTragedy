config.buildings.infrastructure = {
  disable_slots: true,
  order: 10,

  canals: {
    name: "Canals",
    singular: "Canal",
    icon: "canals",

    cost: {
      stone: 15,
      lumber: 5,
      steel: 3,
      money: 5000
    },
    manpower_cost: {
      labourers: 1000
    },
    maximum: 10,
    modifiers: {
      rgo_throughput: 0.01,
      shipment_capacity: 5
    },
    separate_building_slots: true,
    supply_limit: 10
  },
  ports: {
    name: "Ports",
    singular: "Port",
    icon: "ports",

    cost: {
      stone: 30,
      lumber: 20,
      iron: 15,
      money: 10000
    },
    maximum: 5,
    manpower_cost: {
      labourers: 5000
    },
    modifiers: {
      isolation: -0.05,
      shipment_capacity: 50
    },
    separate_building_slots: true,
    supply_limit: 100,
  },
  railways: {
    name: "Railways",
    singular: "Railway",
    aliases: ["railroad"],
    icon: "railways",

    cost: {
      steel: 10,
      lumber: 10,
      stone: 5,
      machine_parts: 5,
      money: 8000
    },
    maximum: 10,
    manpower_cost: {
      labourers: 2000
    },
    modifiers: {
      isolation: -0.05,
      shipment_capacity: 50
    },
    separate_building_slots: true,
    supply_limit: 50
  },
  motorways: {
    name: "Motorways",
    singular: "Motorway",
    aliases: ["highway", "interstate"],
    icon: "motorways",

    cost: {
      concrete: 20,
      stone: 10,
      machine_parts: 5,
      money: 8000
    },
    maximum: 10,
    manpower_cost: {
      labourers: 2000
    },
    modifiers: {
      isolation: -0.10,
      shipment_capacity: 10
    },
    separate_building_slots: true,
    supply_limit: 30
  },
  aeroports: {
    name: "Aeroports",
    singular: "Aeroport",
    aliases: ["airport", "airports"],
    icon: "aeroports",

    construction_turns: 5,
    cost: {
      concrete: 20,
      steel: 20,
      aluminium: 15,
      machine_parts: 10,
      money: 20000
    },
    maximum: 5,
    modifiers: {
      pop_growth_modifier: 0.0001
    },
    produces: {
      money: 3000
    },
    separate_building_slots: true,
    supply_limit: 15
  }
};
