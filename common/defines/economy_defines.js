config.defines.economy = {
  city_resources: {
    wood: 10,
    stone: 15,
    money: 25000
  }, //Resources needed for founding a new city
  city_unlock_caps: [
    1,
    2,
    3,
    4,
    5,
    6,
    10,
    15,
    20,
    25,
    30,
    40,
    60,
    80,
    105,
    155,
    170,
    195,
    220,
    265,
    280,
    305,
    340,
    395,
    430,
    460,
    500,
    575,
    620,
    650,
    730,
    840,
    950,
    1350,
    1400,
    1425,
    1450,
    1475,
    1500,
    1510,
    1520,
    1530,
    1540,
    1550,
    1600,
    1650,
    1700,
    1750,
    1800,
    1850,
    1900,
    1950,
    2000
  ], //Levels of provinces at which a new city is unlocked. Leave empty for unlimited cities
  construction_turns: 3, //Default number of construction turns per city
  food_required_per_million: 1, //Note that food requirements in goods/goods.js should also be changed to reflect this number when modding
  money_per_action: 2500, //Assuming taxes were 100%, this is how much a country would earn per action
  resource_base_stock: 100, //How much stock should be set as the default amount in the world market
  shipment_speed: 50, //How many provinces should a shipment travel per turn as base?
  supply_limit_rgo_modifier: 100, //How much extra supply limit should it take for an extra +1% boost to RGO throughput in the province?
  urbanisation_cost: 25, //Initial Political Capital cost for urbanisation
  urbanisation_cost_percentile_growth: 1.2, //How fast should the cost grow exponentially?

  //Trade and World Market
  resource_init_max_percentile: 0.80, //Maximum percentage of shipment capacity that new countries (for the first 10 turns) can use on buying/selling goods from the World Market
  resource_max_percentile: 0.20, //Maximum percentage of shipment capacity that you can use per turn on buying/selling goods from the World Market
  resource_min_buy_price: 150, //Minimum purchasing price for a resource
  resource_min_sell_price: 100, //Minimum sell price for a resource
  starting_actions: 5, //Base actions per turn, and base starting actions
};
