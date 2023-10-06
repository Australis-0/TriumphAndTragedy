config.births = {
  limit: {
    occupied: false
  },
  per_education_level: {
    value: -0.007783
  },
  per_percent_staple_goods: {
    has_staple_goods: 0.01,
    value: 0.002349
  },
  add_chance_homelessness: {
    limit: {
      homeless: true
    },
    value: 0.231
  }
};

config.deaths = {
  upper_bound_life_expectancy: {
    per_percent_staple_goods_variety: {
      has_staple_goods: 0.01,
      value: 0.004871
    },
    per_wealth: {
      wealth: 1, //Hard limit for now, add wealth_percentile later
      value: 0.0000001923 //Fully reached at 1 million
    }
  }
};
