config.defines.economy = {
  city_resources: {
    wood: 10,
    stone: 15,
    money: 25000
  }, //Resources needed for founding a new city
  city_unlock_caps: [
    1,
    2,
    5,
    7,
    10,
    15,
    20,
    25,
    30,
    40,
    50,
    60,
    75,
    100,
    150,
    200,
    250,
    300,
    350,
    400,
    450,
    500,
    600,
    700,
    800,
    900,
    1000,
    1250,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000
  ], //Levels of provinces at which a new city is unlocked. Leave empty for unlimited cities
  construction_turns: 3, //Default number of construction turns per city
  default_fulfilment: 0.25, //The default fulfilment for pops with no specified needs on automatic_priority categories
  default_variety: 0.15, //The default variety for pops with no specified needs on automatic_priority categories
  food_required_per_million: 1, //Note that food requirements in goods/goods.js should also be changed to reflect this number when modding
  insolvency_amount: -1000, //At what fiscal liquidity level is a building considered unable to pay its obligations?
  insolvency_turns: 2, //How many turns must a building be insolvent for before closing? Type 0 to disable insolvency
  minimum_liquidity: 100, //The absolute lowest minimum liquidity a building should have, regardless of circumstance
  money_per_action: 2500, //Assuming taxes were 100%, this is how much a country would earn per action
  occupation_pop_growth_penalty: 0.50, //Pop growth is halved during occupation
  reopen_cost: 1000, //The base cost for reopening an insolvent building (i.e. debt costs + stockpile infusion)
  resource_base_stock: 100, //How much stock should be set as the default amount in the world market
  rgo_modifier: 0.15, //What should the base RGO modifier be?
  rural_pop_cap: [120000, 140000], //What should the soft cap for population growth in rural provinces be?
  shipment_speed: 50, //How many provinces should a shipment travel per turn as base?
  starting_money_multiplier: 2, //How many times the money cost of a building should the initial stockpile be worth? Set to 0 to use the fixed amount in config.defines.economy.starting_money_stockpile
  starting_money_stockpile: 1000, //The starting monetary stockpile for a building whose money cost isn't defined
  subsidy_infusion: 1000, //How much money should be infused into the stockpile of an insolvent building if enabled
  supply_limit_rgo_modifier: 100, //How much extra supply limit should it take for an extra +1% boost to RGO throughput in the province?
  urbanisation_cost: 25, //Initial Political Capital cost for urbanisation
  urbanisation_cost_percentile_growth: 1.2, //How fast should the cost grow exponentially?
  urban_pop_growth_cap: [
    [5000000, 0.05],
    [10000000, 0.04],
    [20000000, 0.02],
    [50000000, 0.01],
    [70000000, 0.005],
    [100000000, 0.001]
  ], //At what population levels should growth be capped? Caps only start at the first element: [population, % growth cap]
  urban_pop_maximum_growth_rate: 0.05, //How fast should urban provinces be able to grow at most?
  urban_pop_growth_penalty_threshold: 500000, //At what population should the urban population threshold kick in?
  urban_pop_growth_penalty_per_million: 0.03, //-3% growth per million

  //Goods
  good_categories: {
    giffen: {
      importance: 2.5, //Income elasticity of demand (the total % of a pop's income they are willing to spend on this good)
      marginal_utility: 1, //The marginal utility of each good (AKA the order of consumer wants)

      automatic_priority: 0.20 //How much of a subcategory needs to be comprised of this good before the category is marked with the highest importance
    },
    necessary: {
      importance: 1,
      marginal_utility: 2
    },
    inferior: {
      importance: 0.6,
      marginal_utility: 3
    },
    normal: {
      importance: 0.5,
      marginal_utility: 4
    },
    luxury: {
      importance: 0.25,
      marginal_utility: 6
    },
    veblen: {
      importance: 0.15,
      marginal_utility: 7
    }
  },

  //Pop Behaviour
  cultural_minority_display: 0.20, //The percentage a minority should comprise before being displayed in mainline headers
  job_seeking_range: [0.75, 1], //The range of wages pops seek, where 1 is the building with the highest wage in a province
  strict_job_seeking: false, //Whether pops will refuse to seek jobs lower than a specific % of comparable wages in a province

  //Trade and World Market
  resource_init_max_percentile: 0.80, //Maximum percentage of shipment capacity that new countries (for the first 10 turns) can use on buying/selling goods from the World Market
  resource_max_percentile: 0.20, //Maximum percentage of shipment capacity that you can use per turn on buying/selling goods from the World Market
  resource_min_buy_price: 150, //Minimum purchasing price for a resource
  resource_min_sell_price: 100, //Minimum sell price for a resource
  starting_actions: 5, //Base actions per turn, and base starting actions
};
