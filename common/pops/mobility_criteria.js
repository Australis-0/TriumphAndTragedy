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
  promotion: {
    limit: {
      has_staple_goods: true,
      has_staple_goods_variety: 0.40,
      wealth: 0,
      enslaved: false,
      imprisoned: false,
      homeless: false,
      occupied: false
    },
    add_chance_luxury_goods: {
      limit: {
        has_luxury_goods: true,
        has_luxury_goods_variety: 0.20
      },
      value: 0.01
    },
    add_chance_luxury_goods_2: {
      limit: {
        has_luxury_goods: true,
        has_luxury_goods_variety: 0.50
      },
      value: 0.005
    },
    per_wealth: {
      max: 0.25,

      wealth: 10000,
      value: 0.005
    },
    per_percent_education_level: {
      education_level: 0.10,
      value: 0.002
    },
    per_percent_enslaved_pops: {
      enslaved: 0.02,
      value: -0.001
    },
    add_chance_militancy: {
      militancy: 5,
      value: -0.005
    },
    add_chance_militancy_2: {
      militancy: 10,
      value: -0.005
    },
    add_chance_mental_health_1: {
      mental_health_less_than: 0.20,
      value: -0.005
    },
    per_percent_discrimination: {
      discrimination: 0.10,
      value: -0.005
    },
    add_chance_happiness: {
      happiness_less_than: 0.30,
      value: -0.01
    },
    add_chance_mental_health_2: {
      mental_health_less_than: 0.50,
      value: -0.01
    },
    per_percent_crime: {
      crime: 0.05,
      value: -0.01
    },
    add_chance_not_accepted: {
      limit: {
        has_accepted_culture: false
      },
      value: -0.025
    },
    add_chance_education_03: {
      limit: {
        education_level_less_than: 0.20
      },
      value: -0.04
    },
    add_chance_mental_health_3: {
      limit: {
        mental_health_less_than: 0.10
      },
      value: -0.05
    },
    add_chance_no_jobs: {
      limit: {
        no_jobs: true
      },
      value: -0.05
    }
  }
};
