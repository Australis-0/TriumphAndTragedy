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
  food_required_per_million: 1, //Note that food requirements in goods/goods.js should also be changed to reflect this number when modding
  money_per_action: 2500, //Assuming taxes were 100%, this is how much a country would earn per action
  resource_base_stock: 100, //How much stock should be set as the default amount in the world market
  rgo_modifier: 0.15, //What should the base RGO modifier be?
  rural_pop_cap: [120000, 140000], //What should the soft cap for population growth in rural provinces be?
  shipment_speed: 50, //How many provinces should a shipment travel per turn as base?
  supply_limit_rgo_modifier: 100, //How much extra supply limit should it take for an extra +1% boost to RGO throughput in the province?
  urbanisation_cost: 25, //Initial Political Capital cost for urbanisation
  urbanisation_cost_percentile_growth: 1.2, //How fast should the cost grow exponentially?
  urban_pop_growth_cap: 1.05, //How fast should urban provinces be able to grow?
  urban_pop_growth_penalty_threshold: 500000, //At what population should the urban population threshold kick in?
  urban_pop_growth_penalty_per_million: -0.03, //-3% growth per million
  
  //Trade and World Market
  resource_init_max_percentile: 0.80, //Maximum percentage of shipment capacity that new countries (for the first 10 turns) can use on buying/selling goods from the World Market
  resource_max_percentile: 0.20, //Maximum percentage of shipment capacity that you can use per turn on buying/selling goods from the World Market
  resource_min_buy_price: 150, //Minimum purchasing price for a resource
  resource_min_sell_price: 100, //Minimum sell price for a resource
  starting_actions: 5, //Base actions per turn, and base starting actions
};
