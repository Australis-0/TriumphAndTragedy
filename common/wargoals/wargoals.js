config.wargoals = {
  /*
    Wargoal format:

    wargoal: {
      name: "Complete Annexation",
      description: "Allows the complete annexation of another country.",

      demand_limit: 1, - How many demands of this type can be made on the enemy? This is 1 by default. Can be overriden in cb_types.js
      infamy: {
        infamy_per_percentage: 0.01 - This is used for percentage-based wargoals such as war_indemnities or annexation
        infamy_per_province: 0.1,
        infamy_per_<type>: 0.5, - e.g. 'infamy_per_urban: 0.5'

        minimum_infamy: 2,
        maximum_infamy: 10
      },

      effect: {
        annex_all: true/false,
        cut_down_to_size: {
          can_cut_army_types_down_to_size: true/false,
          minimum_removal: 0.10, - How much of the enemy's forces should be removed?
          maximum_removal: 0.50, - How much of the enemy's forces should the user be allowed to remove?
          minimum_<type>_removal: -, - e.g. 'minimum_navy_removal: 0.5'
          maximum_<type>_removal: -, - e.g. 'maximum_navy_removal: 0.5'
          minimum_turns_demilitarised: 5, - Should the user be prevented from raising armies for a minimum number of turns?
          maximum_turns_demilitarised: 10 - What about a maximum?
        },
        demilitarisation: {
          can_demilitarise_capital: true/false,
          minimum_provinces_allowed: -,
          maximum_provinces_allowed: -,
          minimum_turns_allowed: -,
          maximum_turns_allowed: -
        },
        free_oppressed_people: {
          can_choose_provinces: true/false, - Whether the user adding this wargoal should be allowed to choose the provinces of the client state
          can_free_accepted_cultures: true/false,

          minimum_country_population_size: -,
          maximum_country_population_size: -,
          minimum_country_province_size: -,
          maximum_country_province_size: 50, - Should there be a limit on how big of a country can be released using this wargoal? These arguments apply to can_choose_provinces as well
        },
        install_government: {
          can_only_install_friendly_governments: true/false
          can_install_any_government: true/false - Takes precedence over can_only_install_friendly_governments
        },
        liberation: true/false - Should this wargoal allow for the liberation of a vassal state?
        limited_annexation: {
          can_take_capital: true/false,
          minimum_provinces_allowed: 5, - Should there be a minimum on how much the player can annex?
          maximum_provinces_allowed: 20, - Should there be a maximum on how much the player can annex?
          minimum_<type>_allowed: -, - e.g. 'minimum_urban_allowed: 2'; how many provinces of this terrain type must be annexed minimum
          maximum_<type>_allowed: -,
          minimum_percentage_allowed: 0.20, - How much of the enemy's country should the user be allowed to take?
          maximum_percentage_allowed: -
        },
        puppet: {
          maximum_population: 50000000, - The user cannot puppet nations above this population
          maximum_provinces: 100 - The user cannot puppet nations above this province count
          minimum_turns_puppeted: 5, - Should there be a minimum on how many turns a user can be puppeted?
          maximum_turns_puppeted: 10 - What about a maximum
        },
        release_client_state: {
          can_release_client_state: true/false,
          can_take_capital: true/false,
          minimum_percentage_allowed: -,
          maximum_percentage_allowed: -,
          minimum_population_allowed: -,
          maximum_population_allowed: -,
          minimum_provinces_allowed: -,
          maximum_provinces_allowed: -,
          minimum_<type>_allowed: -,
          maximum_<type>_allowed: -,
          minimum_turns_allowed: -,
          maximum_turns_allowed: -,
          requires_capital_city: true/false - Whether or not the client state requires a capital city
        },
        retake_cores: true/false, - Returns culture cores of a country
        seize_resources: {
          custom_recipient: true/false, - Whom the resources will be syphoned towards
          inherit_actions_minimum: -,
          inherit_actions_maximum: -,
          inherit_money_minimum: -,
          inherit_money_maximum: -,
          seize_<good>_minimum: -, - e.g. 'seize_iron_maximum: 0.5'
          seize_<good>_maximum: -,
          seize_inventory_minimum: 0.10, - Percentage argument
          seize_inventory_maximum: 0.90,
        },
        steer_trade: {
          custom_recipient: true/false, - Whether or not the enemy will only be able to trade with this country (whom is up for the user to decide)
          minimum_turns_allowed: 5,
          maximum_turns_allowed: 10
        },
        syphon_actions: {
          custom_recipient: true/false, - Whom the actions will be syphoned towards
          minimum_number_allowed: -,
          maximum_number_allowed: -,
          minimum_percentage_allowed: -,
          maximum_percentage_allowed: -,
          minimum_turns_allowed: -,
          maximum_turns_allowed: -
        },
        war_reparations: {
          custom_recipient: true/false, - Whom the war reparations will be paid to
          minimum_percentage_allowed: -,
          maximum_percentage_allowed: -,
          minimum_turns_allowed: -,
          maximum_turns_allowed: -
        }
      }
    }
  */

  complete_annexation: {
    name: "Complete Annexation",
    infamy: 10,

  }
};
