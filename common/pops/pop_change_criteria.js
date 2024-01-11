config.births = { //+/-% change from Province Pop OEFR
  limit: {
    occupied: false,
  },
  per_education_level: {
    value: -0.007783
  },
  add_chance_staple_goods: {
    limit: {
      has_staple_goods_less_than: 0.10 //Needs at least 10% staple goods fulfilment to not starve
    },
    value: -10 //They aren't being born now
  },
  add_chance_homelessness: {
    limit: {
      homeless: true
    },
    value: 0.231
  },
  add_chance_urban: {
    limit: {
      province_is_urban: true
    },
    value: -0.11
  },
  add_chance_rural: {
    limit: {
      province_is_rural: true
    },
    value: 0.0316 //Supposed to be a raw TFR modifier but oh well
  }
};
config.births_oefr = {
  tribal: 4.3,
  agriculture: 6.6,
  manufacturing: 5.5,
  services: 1.55,

  //Wealth curve for fertility at Lorenz curve with Gini of 39,4. Data is taken from contemporary US
  wealth_domain: 10000000,
  wealth_deciles: [-1450, 7202, 30475, 82191, 153046, 256334, 408326, 698716, 1325809, 4710310]
};

config.deaths = { //[WIP] - Add age qualifiers to this somewhere
  //Upper bound life expectancy. 15% of people die at this age, with an exponential parabola reaching its apoapsis here
  upper_bound_life_expectancy: {
    per_percent_staple_goods_variety: {
      has_staple_goods: 0.01,
      value: 0.004871
    },
    per_wealth: {
      wealth: 1, //Hard limit for now, add wealth_percentile later
      value: 0.0000001923, //Fully reached at 1 million

      max: 20
    }
  },

  //General dying before life expectancy
  mortality: {
    base_value: 0.01, //1% mortality per turn. Arbitrary figure

    add_chance_famine: {
      limit: {
        has_staple_goods_less_than: 0.10
      },
      value: 0.05 //Arbitrary figure, should be usr.modifiers.famine_penalty
    },
  }
};
