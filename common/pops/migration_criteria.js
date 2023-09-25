config.pop_migration = {
  country_selection: {
    add_chance_superpower: {
      limit: {
        has_rank: "superpower"
      },
      value: 0.10
    },
    add_chance_great_power: {
      limit: {
        has_rank: "great_power"
      },
      value: 0.08
    },
    add_chance_north_america: {
      limit: {
        continent: "north_america"
      },
      value: 0.08
    },
    add_chance_primary_pop_culture: {
      limit: {
        has_primary_culture: true
      },
      value: 0.04
    },
    add_chance_oceania: {
      limit: {
        continent: "oceania"
      },
      value: 0.04
    },
    add_chance_secondary_power: {
      limit: {
        has_rank: "secondary_power"
      },
      value: 0.02
    },
    add_chance_universal_voting: {
      limit: {
        has_universal_voting: true
      },
      value: 0.02
    },
    add_chance_is_accepted: {
      limit: {
        has_accepted_culture: true
      },
      value: 0.02
    },
    per_percent_prestige: {
      prestige: 100,
      max: 0.10,
      value: 0.01
    },
    add_chance_is_vassal: {
      limit: {
        is_vassal: true
      },
      value: 0.015
    },
    add_chance_allied: {
      limit: {
        is_allied: true
      },
      value: 0.01
    },
    add_chance_wealth_voting: {
      limit: {
        has_wealth_voting: true
      },
      value: 0.01
    },
    add_chance_weighted_wealth_voting: {
      limit: {
        has_weighted_wealth_voting: true
      },
      value: 0.01
    },
    add_chance_country_employment: {
      limit: {
        employment_less_than: 0.90
      },
      value: -0.08
    },
    add_chance_is_uncivilised: {
      limit: {
        is_uncivilised: true
      },
      value: -0.10
    }
  },
  province_selection: {
    per_percent_median_wage: {
      median_wage_percentage: 0.01,
      value: 0.01
    },

    add_chance_urban: {
      limit: {
        is_urban: true,
        education_level: 0.40,
        wealth: 6500
      },
      value: 0.60
    },
    add_chance_urban_housing: {
      limit: {
        is_suburb: true,
        is_suburb_of: ["metropolis", "megalopolis"],

        downtown: {
          has_housing: false
        },
        has_housing: true
      },
      value: 0.40
    },
    add_chance_is_capital: {
      limit: {
        is_capital: true
      },
      value: 0.35
    },
    add_chance_average_pop_age: {
      limit: {
        age_radius: 5
      },
      value: 0.20
    },
    add_chance_population_5_million: {
      limit: {
        population: 5000000
      },
      value: 0.20
    },
    add_chance_population_2_5_million: {
      limit: {
        population: 2500000
      },
      value: 0.20
    },
    add_chance_population_1_million: {
      limit: {
        population: 1000000
      },
      value: 0.20
    },
    add_chance_population_500_thousand: {
      limit: {
        population: 500000
      },
      value: 0.20
    },
    add_chance_population_250_thousand: {
      limit: {
        population: 250000
      },
      value: 0.20
    },
    add_chance_population_150_thousand: {
      limit: {
        population: 150000
      },
      value: 0.20
    },
    add_chance_plurality_pop_culture: {
      limit: {
        has_pop_plurality_culture: true
      },
      value: 0.20
    },
    add_chance_currently_colonised: {
      limit: {
        being_colonised: true
      },
      value: 0.15
    },
    per_amenities: {
      amenities: 1,
      value: 0.05,
      max: 0.50
    },
    per_supply_limit: {
      supply_limit: 100,
      value: 0.05,
      max: 0.20
    },
    add_chance_coastal: {
      limit: {
        is_coastal: true
      },
      value: 0.05
    },
    per_terrain_supply_limit: {
      terrain_supply_limit: 0.01,
      value: -0.01
    },
    per_standard_of_living: {
      limit: {
        standard_of_living_less_than: true
      },
      standard_of_living: -0.01,
      value: -0.025
    },
    per_discrimination: {
      discrimination: 0.10,
      value: -0.20
    },
    add_chance_no_amenities: {
      limit: {
        has_amenities: false
      },
      value: -0.25
    },
    add_chance_slavery_allowed: {
      limit: {
        has_slavery: true
      },
      value: -0.40
    },
    add_chance_unemployment: {
      limit: {
        employment_less_than: 0.90
      },
      value: -0.80
    },
    add_chance_no_non_subsistence: {
      limit: {
        has_no_non_subsistence_buildings: true
      },
      value: -1.20
    },
    add_chance_occupied: {
      limit: {
        occupied: true
      },
      value: -2.00
    }
  },

  external_emigration: {
    base_value: 0.15,

    add_chance_occupied: {
      limit: {
        occupied: true
      },
      value: 0.02
    },
    add_chance_staple_goods: {
      limit: {
        has_staple_goods_less_than: 0.50
      },
      value: 0.01
    },
    add_chance_unemployed: {
      limit: {
        is_employed: false
      },
      value: 0.005
    },
    add_chance_militancy_seven: {
      limit: {
        militancy: 7
      },
      value: 0.004
    },
    add_chance_culture_not_accepted: {
      limit: {
        has_accepted_culture: false
      },
      value: 0.0025
    },
    add_chance_militancy_five: {
      limit: {
        militancy: 5
      },
      value: 0.002
    },
    add_chance_homeless: {
      limit: {
        homeless: true
      },
      value: 0.002
    },
    per_discrimination: {
      discrimination: 0.20,
      value: 0.002
    },
    add_chance_political_influence: {
      limit: {
        political_influence_less_than: 0.50,
        has_only_underground: true
      },
      value: 0.002
    },
    per_discontentment: {
      political_discontent: 10,
      value: 0.001
    },
    per_standard_of_living: {
      limit: {
        standard_of_living_less_than: 0.20
      },
      standard_of_living: -0.05,
      value: 0.001
    },
    add_chance_ruling_party: {
      limit: {
        ruling_party: true
      },
      value: -0.0025
    },
    add_chance_living_wage_jobs: {
      limit: {
        living_wage_job_openings: 0
      },
      value: -0.003
    }
  },
  internal_emigration: {
    add_chance_occupied: {
      limit: {
        occupied: true
      },
      value: 0.04
    },
    add_chance_staple_goods: {
      limit: {
        has_staple_goods_less_than: 0.50
      },
      value: 0.02
    },
    add_chance_rural_industrialised: {
      limit: {
        has_industrialised: true,
        is_rural: true
      },
      value: 0.01
    },
    add_chance_homeless: {
      limit: {
        homeless: true
      },
      value: 0.005
    },
    add_chance_luxury_goods: {
      limit: {
        has_luxury_goods_less_than: 0.10
      },
      value: 0.0025
    },
    add_chance_province_life_expectancy: {
      limit: {
        life_expectancy_below_average: true
      },
      value: 0.0025
    },
    per_discrimination: {
      discrimination: 0.20,
      value: 0.002
    },
    add_chance_rural: {
      limit: {
        is_rural: true
      },
      value: 0.001
    },
    add_chance_education_level: {
      limit: {
        education_level_less_than: 0.20
      },
      value: 0.001
    },
    add_chance_living_wage_jobs: {
      limit: {
        living_wage_job_openings: 0
      },
      value: -0.003
    },
    add_chance_colonial: {
      limit: {
        is_colonial: true
      },
      value: -0.05
    }
  }
};
