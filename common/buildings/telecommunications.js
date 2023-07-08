config.buildings.telecommunications = {
  order: 18,

  broadcast_stations: {
    name: "Broadcast Stations",
    singular: "Broadcast Station",

    construction_turns: 4,
    cost: {
      rebar: 8,
      plastics: 5,
      steel_beams: 4,
      electric_gear: 4,
      lightbulbs: 2,
      copper_wire: 2,
      money: 8000
    },
    maintenance: {
      money: 1000,
      steel_beams: 2,
      copper_wire: 1,
      electric_gear: 1,
      computers: 1
    },
    manpower_cost: {
      engineers: 600
    },
    modifiers: {
      communication_bubble: {
        distance: 10,
        value: 0.50
      }
    }
  },
  internet_cables: {
    name: "Internet Cables",
    singular: "Internet Cable",

    construction_turns: 5,
    cost: {
      rubber: 4,
      glass: 3,
      copper_wire: 2,
      rubber: 2,
      electric_gear: 1,
      money: 5000
    },
    maintenance: {
      money: 200,
      radios: 1,
      electric_gear: 1
    },
    manpower_cost: {
      engineers: 100
    },
    modifiers: {
      internet: {
        distance: 3,
        value: 1
      }
    }
  },
  radio_towers: {
    name: "Radio Towers",
    singular: "Radio Tower",

    construction_turns: 3,
    cost: {
      steel_beams: 8,
      electric_gear: 4,
      stainless_steel: 2,
      radios: 2,
      rebar: 2,
      money: 3500
    },
    maintenance: {
      money: 200,
      radios: 1,
      electric_gear: 1
    },
    manpower_cost: {
      engineers: 1000
    },
    modifiers: {
      communication_bubble: {
        distance: 10,
        value: 0.20
      },
      public_communication: {
        distance: 2,
        value: 1
      }
    }
  },
  server_rooms: {
    name: "Server Rooms",
    singular: "Server Room",

    construction_turns: 5,
    cost: {
      glass: 8,
      computers: 5,
      lightbulbs: 4,
      copper_wire: 3,
      stainless_steel: 2,
      money: 15000
    },
    maintenance: {
      money: 2000,
      computers: 5,
      electric_gear: 4
    },
    manpower_cost: {
      engineers: 10000
    },
    modifiers: {
      internet_bandwidth: 100000
    }
  },
  telegraph_offices: {
    name: "Telegraph Offices",
    singular: "Telegraph Office",

    construction_turns: 3,
    cost: {
      copper_wire: 2,
      rubber: 2,
      money: 1000
    },
    maintenance: {
      money: 5000,
      electric_gear: 2,
      lightbulbs: 1
    },
    manpower_cost: {
      engineers: 500
    },
    modifiers: {
      telegraph_bandwidth: 1000
    }
  },
  telecommunication_lines: {
    name: "Telecommunication Lines",
    singular: "Telecommunication Line",

    construction_turns: 2,
    cost: {
      copper_wire: 4,
      rubber: 3,
      plastics: 2,
      electric_gear: 2,
      money: 2000
    },
    maintenance: {
      money: 200,
      copper_wire: 2,
      rubber: 1,
      plastics: 1
    },
    manpower_cost: {
      engineers: 200
    },
    modifiers: {
      communication_bubble: {
        distance: 1,
        value: 1
      }
    }
  },
  television_towers: {
    name: "Television Towers",
    singular: "Television Tower",

    construction_turns: 3,
    cost: {
      steel_beams: 8,
      electric_gear: 6,
      plastics: 5,
      reinforced_concrete: 5,
      copper_wire: 4,
      lightbulbs: 3,
      money: 15000
    },
    maintenance: {
      money: 1000,
      electric_gear: 3,
      plastics: 2,
      steel_beams: 1,
      rebar: 1
    },
    manpower_cost: {
      engineers: 2000
    },
    modifiers: {
      public_communication: {
        distance: 5,
        value: 1
      }
    }
  }
};
