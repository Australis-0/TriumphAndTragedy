config.governments = {
  anarchy: {
    name: "Anarchy",
    adjective: "Anarchists",
    singular: "Anarchist",
    icon: "black_circle",
    is_anarchy: true,
    description: "Anarchists believe in a stateless world ... which is bad news for you, since you're roleplaying a state. Go on, pick a government!",

    effect: {
      can_justify_wars: false,
      disabled_reforms: true,
      has_elections: false,
      maximum_manpower: 1.00,
      maximum_tax_rate: 0.01,
      civilian_actions: 1.00,
      stability_modifier: -0.10,
      famine_penalty: 0.50
    }
  },
  absolute_monarchy: {
    name: "Absolute Monarchy",
    adjective: "Absolute Monarchists",
    singular: "Absolute Monarchist",
    icon: "purple_circle",
    description: "Supporters of absolute monarchy believe in a divinely ordained monarchy that wields absolute power.",

    effect: {
      can_justify_wars: true,
      disabled_reforms: true,
      has_elections: false,
      maximum_manpower: 0.10,
      maximum_tax_rate: 0.65,
      civilian_actions: 0.10,
      reform_desire_gain: -0.1,
      add_expiry_effect: {
        limit: {
          year_is_less_than: 1815
        },
        stability_modifier: 0.20
      }
    }
  },
  constitutional_monarchy: {
    name: "Constitutional Monarchy",
    adjective: "Constitutional Monarchists",
    singular: "Constitutional Monarchist",
    icon: "orange_circle",
    description: "Constitutionalists believe in a figurehead monarchy, with a democratic system of government.",

    effect: {
      can_justify_wars: false,
      has_elections: true,
      maximum_manpower: 0.20,
      maximum_tax_rate: 0.35,
      civilian_actions: 0.35,
      stability_modifier: 0.15,
      famine_penalty: 0.065,
      reform_desire_gain: 0.02
    }
  },
  communism: {
    name: "Communism",
    adjective: "Communists",
    singular: "Communist",
    icon: "red_circle",
    description: "Communism, the Red Hydra: the dictatorship of the proletariat often means the nationalisation of all privately held property.",

    effect: {
      can_justify_wars: true,
      has_elections: false,
      maximum_manpower: 0.35,
      maximum_tax_rate: 0.05,
      civilian_actions: 0.05,
      stability_modifier: -0.05,
      famine_penalty: 0.125,
      reform_desire_gain: 0.01
    }
  },
  socialism: {
    name: "Socialism",
    adjective: "Socialists",
    singular: "Socialist",
    icon: "green_circle",
    description: "Socialism branched out from communism during the first half of the 20th century, and instead argued for a welfare state, usually along democratic lines.",

    effect: {
      can_justify_wars: false,
      has_elections: true,
      maximum_manpower: 0.35,
      maximum_tax_rate: 0.15,
      civilian_actions: 0.20,
      stability_modifier: 0.15,
      famine_penalty: 0.07,
      reform_desire_gain: 0.04
    }
  },
  democracy: {
    name: "Democracy",
    adjective: "Republicans",
    singular: "Republican",
    icon: "blue_circle",
    description: "The concept of democracy often differed throughout history, but eventually came to represent a government by the people.",

    effect: {
      can_justify_wars: false,
      has_elections: true,
      maximum_manpower: 0.25,
      maximum_tax_rate: 0.70,
      civilian_actions: 0.50,
      stability_modifier: 0.15,
      famine_penalty: 0.05,
      reform_desire: 0.03
    }
  },
  fascism: {
    name: "Fascism",
    adjective: "Fascists",
    singular: "Fascist",
    icon: "brown_circle",
    description: "Fascism originally stemmed from ethnic hypernationalism and became emblematic of aggressive militaristic countries.",

    effect: {
      can_justify_wars: true,
      has_elections: false,
      maximum_manpower: 0.10,
      maximum_tax_rate: 0.70,
      civilian_actions: 0.20,
      stability_modifier: 0.10,
      famine_penalty: 0.05,
      reform_desire_gain: -0.05
    }
  }
};
