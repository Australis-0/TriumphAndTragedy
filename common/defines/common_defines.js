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
  starting_players: 0, //How many players should the game require before it can start? Set to 0 to disable starting queue
  starting_provinces: 1,
  starting_year: 1500, //Should start in 1500 by default

  //Modifies how fast time elapses during a time period. (e.g. [0, 1750, 2] means that time elapses twice as fast between year(s) 0 and 1750)
  time_modifier: [
    [0, 1648, 1],
    [1648, 1750, 0.50],
    [1750, 1914, 0.25],
    [1914, 9999, 1/12]
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
      "beekeepers",
      "camphor_plantations",
      "carmine_harvesters",
      "cinnamon_plantations",
      "farms",
      "fruit_farms",
      "honeymakers",
      "illicit_fields",
      "indigo_fields",
      "livestock_fields",
      "mustard_plantations",
      "nut_farms",
      "pastures",
      "tropical_plantations",
      "vegetable_fields",
      "woad_harvesters",

      "cathedrals",
      "churches",
      "mosques",
      "plazas",
      "pubs",
      "synagogues",
      "temples",

      "furniture_stores",
      "markets",
      "restaurants",

      "libraries",

      "fire_stations",

      "bungalows",
      "cottages",
      "fachwerkhauser",
      "longhouses",
      "residences",
      "rowhouses",
      "slums",
      "townhomes",

      "elephant_hunting_grounds",
      "fisheries",
      "fur_trappers",
      "pearlers",

      "guilds",

      "barracks",
      "castles",
      "city_walls",
      "stockades",

      "arsenic_mines",
      "bitumen_coal_mines",
      "bornite_mines",
      "chalcocite_copper_mines",
      "chalcopyrite_copper_mines",
      "cinnabar_mines",
      "hematite_mines",
      "galena_lead_mines",
      "gold_washers",
      "malachite_copper_mines",
      "magnetite_mines",
      "quartz_mines",
      "ruby_mines",
      "silver_mines",
      "tin_mines",
      "zinc_mines",

      "charcoal_kilns",

      "apothecaries",
      "bakeries",
      "breweries",
      "brick_kilns",
      "candleworks",
      "cheesemakers",
      "distilleries",
      "dye_works",
      "fineries",
      "flour_mills",
      "forgeries",
      "furniture_factories",
      "gem_cutters",
      "glassworks",
      "incense_works",
      "inkworks",
      "jewellers",
      "kiln_works",
      "luxury_furniture_factories",
      "luxury_tailors",
      "malting_works",
      "marquestry_works",
      "meat_packing_plants",
      "molasses_factories",
      "oast_house",
      "oil_manufactories",
      "naval_suppliers",
      "paper_mills",
      "peat_dryers",
      "rendering_works",
      "rice_wineries",
      "salt_works",
      "silk_mills",
      "sleeping_bag_factories",
      "soap_factories",
      "souvenir_factories",
      "railors",
      "tapestry_looms",
      "tea_driers",
      "toolworks",
      "wineries",

      "arsenic_refineries",
      "beryllium_refineries",
      "bronze_factories",
      "coal_kilns",
      "gold_refineries",
      "iron_refineries",
      "ironworks",
      "leadworks",
      "mercuric_refineries",
      "saltpetre_works",
      "silver_refineries",
      "tin_factories",
      "zinc_refineries",

      "chalk_mines",
      "clay_mines",
      "lumberjacks",
      "quarries",

      "great_libraries",
      "scholarhouses"
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
    ],

    conquistadors: [3, 10]
  }
};
