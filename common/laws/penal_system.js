config.icons.penal_system = {
  name: "Penal System",

  capital_punishment: {
    name: "Capital Punishment",
    description: "Although some citizens may call it the 'Bloody Code', capital punishment for even the lightest of crimes is the only surefire way to prevent crime from breeding.",

    political_appeasement: {
      absolute_monarchy_discontent: -8,
      fascism_discontent: -8,
      constitutional_monarchy_discontent: -4,
      democracy_discontent: -3,
      socialism_discontent: 4,
      communism_discontent: 3
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.1,
      training_cost: -0.05,
      pop_growth_modifier: -0.03,
      infamy_loss: 0.02
    }
  },
  penal_labour: {
    name: "Penal Labour",
    description: "In order to rehabilitate our prisoners back to society, we shall place them in forced work camps, where they shall contribute towards making valuable products that our society wants and needs.",

    political_appeasement: {
      absolute_monarchy_discontent: -8,
      fascism_discontent: -6,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 1,
      socialism_discontent: 3,
      communism_discontent: 3
    },
    effects: {
      stability_modifier: 0.03,
      reform_desire_gain: 0.05,
      training_cost: -0.02,
      pop_growth_modifier: -0.02,
      infamy_loss: 0.01
    }
  },
  incarceration: {
    name: "Incarceration",
    description: "Simply arresting individuals and throwing them in gaols and prisons is more than enough to stop any wave of crime.",

    political_appeasement: {
      absolute_monarchy_discontent: -2,
      fascism_discontent: -3,
      constitutional_monarchy_discontent: 0,
      democracy_discontent: 0,
      socialism_discontent: 2,
      communism_discontent: 2
    },
    effects: {
      reform_desire_gain: 0.02,
      training_cost: -0.02
    }
  },
  rehabilitation: {
    name: "Rehabilitation",
    description: "By rehabilitating our prisoners, we may be able to reintroduce them back into society, and thereby, the workforce, at a later date when they are deemed safe for release.",

    political_appeasement: {
      absolute_monarchy_discontent: 2,
      fascism_discontent: 1,
      constitutional_monarchy_discontent: 0,
      democracy_discontent: 0,
      socialism_discontent: -5,
      communism_discontent: -5
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: -0.02,
      training_cost: 0.05,
      pop_growth_modifier: 0.04,
      tax_efficiency: 0.03,
      infamy_loss: -0.02
    }
  }
};
