config.pop_mobility = {
  demotion: {
    limit: {
      not: {
        wealth: 40000,
        has_luxury_goods: true
      },
      occupied: false
    },

    add_chance_homeless: {
      limit: {
        homeless: false
      },
      value: 0.05
    },
    add_chance_wealth: {
      limit: {
        wealth_less_than: 0
      },
      value: 0.01
    },
    per_percent_staple_goods_deficit: {
      base: 0.10,
      min: 0,
      max: 1,
      value: -0.01,

      has_staple_goods: 0.10
    },
    add_chance_imprisoned: {
      limit: {
        imprisoned: true
      },
      value: 0.005
    },
    per_wealth: {
      base: 0.005,
      wealth: -5000,
      value: 0.005
    },
    per_percent_promotion_chance: {
      max: 0,
      value: 0.005,

      promotion_chance: -0.10
    },
    per_percent_enslaved_pops: {
      enslaved: 0.02,
      value: -0.001
    },
    per_percent_living_wage_openings: {
      living_wage_job_openings: 0.10,
      value: -0.005
    },
    per_percent_living_standard: {
      living_standard: 0.10,
      value: -0.01
    },
    add_chance_employed: {
      limit: {
        employed: true
      },
      value: -0.02
    }
  },
  promotion: { //[WIP] - Promotion scope
    limit: {
      has_staple_goods: true,
      has_staple_goods_variety: 0.40,
      wealth: 0,
      enslaved: false,
      imprisoned: false,
      homeless: false,
      occupied: false
    }
  }
};
