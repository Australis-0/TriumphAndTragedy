config.defines.common = {
  alert_timeout: 5, //How many turns should alerts last before they timeout?
  default_keys: ["adjacencies", "id"], //List of default province keys
  event_timeout: 5, //How many turns should events last before they timeout?

  activity_check: 3, //How often should the bot checkup on players in the season queue to make sure they're still active? (in days)
  enable_choose_countries: true, //Should players be able to pick unclaimed countries?
  enable_custom_countries: true, //Should players be able to create custom countries?
  force_render_on_tick: true, //Whether or not force renders should be processed on ticks
  force_render_on_turn: true, //Whether or not force renders should be processed on turns
  resign_cooldown: 4, //How often should players be able to switch nations? (in turns)
  starting_players: 15, //How many players should the game require before it can start? Set to 0 to disable starting queue
  starting_provinces: 1,
  starting_year: 1500, //Should start in 1500 by default

  //Modifies how fast time elapses during a time period. (e.g. [0, 1750, 2] means that time elapses twice as fast between year(s) 0 and 1750)
  time_modifier: [
    [0, 1750, 2],
    [1750, 1914, 1],
    [1914, 9999, 0.25]
  ],

  starting_kit: {
    set_government: "anarchy",
    set_party_popularity: {
      type: "anarchy",
      value: 1.0
    },
    actions: 10,
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
