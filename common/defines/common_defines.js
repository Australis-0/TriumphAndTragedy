config.defines.common = {
  starting_year: 1815,

  starting_kit: {
    set_government: "anarchy",
    set_party_popularity: {
      type: "anarchy",
      value: 1.0
    },
    actions: 50,
    set_mobilisation_unit: "none",
    money: 50000,
    wood: 10,
    stone: 15,
    machine_parts: 50,
    food: 50,

    magnates: "RANDOM_3,15",
    unlock_building: [
      "guilds",
      "farms",
      "pastures",
      "fisheries",
      "quarries",
      "lumberjacks",
      "forgeries",
      "food_processing_facilities",
      "sawmills",
      "neighbourhoods",
      "barracks",
      "dockyards",
      "schools",
      "libraries",
      "canals"
    ],
    unlock_unit: [
      "skirmishers",
      "spearmen",
      "swordsmen",
      "knights",
      "archers",
      "longbowmen",
      "conquistadors"
    ],
    unlock_government: [
      "absolute_monarchy",
      "constitutional_monarchy",
      "democracy"
    ]
  }
};
