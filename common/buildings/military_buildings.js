config.buildings.military_buildings = {
  order: 7,
  ack_ack_guns: {
    name: "Ack-Ack Guns",
    singular: "Ack-Ack Gun",
    aliases: ["aa_guns", "anti_aircraft_guns", "anti_aircraft"],
    icon: "artillery_piece",

    construction_turns: 1,
    cost: {
      steel: 15,
      artillery: 5,
      ammunition: 20,
      money: 15000
    },
    manpower_cost: {
      soldiers: 5000
    }
  },
  air_bases: {
    name: "Air Bases",
    singular: "Air Base",
    icon: "aeroplanes",

    construction_turns: 2,
    cost: {
      steel: 20,
      concrete: 15,
      refined_petroil: 10,
      money: 60000
    },
    manpower_cost: {
      labourers: 70000
    },
    produces: {
      aeroplanes_cp: 20
    }
  },
  artillery_encampments: {
    name: "Artillery Encampments",
    singular: "Artillery Encampment",
    icon: "artillery",

    construction_turns: 2,
    cost: {
      iron: 5,
      stone: 10,
      coal: 5,
      money: 25000
    },
    manpower_cost: {
      labourers: 50000
    },
    produces: {
      ground_artillery_cp: 20
    }
  },
  auto_plants: {
    name: "Auto Plants",
    singular: "Auto Plant",
    icon: "land_vehicles",

    construction_turns: 3,
    cost: {
      steel: 15,
      concrete: 10,
      refined_petroil: 10,
      coal: 5,
      money: 80000
    },
    manpower_cost: {
      labourers: 100000
    },
    produces: {
      ground_vehicles_cp: 20
    }
  },
  barracks: {
    name: "Barracks",
    singular: "Barracks",
    icon: "manpower",

    construction_turns: 2,
    cost: {
      wood: 2,
      iron: 1,
      money: 20000
    },
    manpower_cost: {
      labourers: 70000
    },
    produces: {
      ground_units_cp: 20
    }
  },
  dockyards: {
    name: "Dockyards",
    singular: "Dockyard",
    icon: "naval_units",

    construction_turns: 5,
    cost: {
      lumber: 10,
      iron: 5,
      money: 25000
    },
    manpower_cost: {
      labourers: 80000
    },
    produces: {
      naval_units_cp: 20
    }
  }
};
