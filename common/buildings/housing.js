config.buildings.housing = {
  always_display: true,
  disable_slots: true,
  is_housing: true,
  order: 9,

  neighbourhoods: {
    name: "Neighbourhoods",
    singular: "Neighbourhood",
    aliases: ["neighborhood", "neighborhoods"],
    icon: "neighbourhoods",

    construction_turns: 4,
    cost: {
      lumber: 10,
      iron: 6,
      money: 2500
    },
    houses: 500000,
    unlimited_slots: true
  },
  suburbs: {
    name: "Suburbs",
    singular: "Suburb",
    icon: "suburbs",

    construction_turns: 4,
    cost: {
      lumber: 10,
      iron: 6,
      money: 2500
    },
    houses: 100000,
    unlimited_slots: true
  },
  flats: {
    name: "Flats",
    singular: "Flat",
    aliases: ["apartment", "apartments"],
    icon: "flats",

    construction_turns: 4,
    cost: {
      lumber: 20,
      iron: 12,
      money: 5000
    },
    houses: 500000,
    unlimited_slots: true
  },
  districts: {
    name: "Districts",
    singular: "District",
    icon: "districts",

    construction_turns: 8,
    cost: {
      steel: 20,
      iron: 5,
      concrete: 35,
      money: 10000
    },
    houses: 1000000,
    unlimited_slots: true
  },
  cbds: {
    name: "CBDs",
    singular: "Central Business District",
    aliases: ["cbd", "downtown", "downtowns"],
		icon: "financial_districts",

    construction_turns: 10,
    cost: {
      steel: 15,
      iron: 5,
      concrete: 20,
      money: 10000
    },
    produces: {
      money: 5000
    },
    houses: 500000,
    unlimited_slots: true
  }
};
