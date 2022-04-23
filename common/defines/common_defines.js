config.defines.common = {
  alert_timeout: 5, //How many turns should alerts last before they timeout?
  default_keys: ["adjacencies", "id"], //List of default province keys
  event_timeout: 5, //How many turns should events last before they timeout?

  activity_check: 3, //How often should the bot checkup on players in the season queue to make sure they're still active? (in days)
  starting_players: 10, //How many players should the game require before it can start? Set to 0 to disable starting queue
  starting_provinces: 1,
  starting_year: 1500,

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
    food: 50,
    research_to: 0,

    magnates: [3, 15],
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
