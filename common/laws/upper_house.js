config.reforms.upper_house = {
  name: "Upper House",

  ruling_party_only: {
    name: "Ruling Party Only",
    description: "Why have an upper house when you can simply be a dictatorship?",

    political_appeasement: {
      absolute_monarchy_discontent: -8,
      fascism_discontent: -10,
      constitutional_monarchy_discontent: 8,
      democracy_discontent: 8,
      socialism_discontent: 5,
      communism_discontent: -10
    },
    effects: {
      stability_modifier: 0.15,
      reform_desire_gain: 0.05,
      political_capital_gain: 5
    }
  },
  appointed: {
    name: "Appointed",
    description: "By simply appointing the upper house of our legislature, we can ensure that only the Acts which suit our own interest pass Parliament.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -2,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 7,
      socialism_discontent: 5,
      communism_discontent: -2
    },
    effects: {
      stability_modifier: 0.10,
      reform_desire_gain: 0.03,
      political_capital_gain: 3,
      constitutional_monarchy: 0.02
    }
  },
  two_per_state: {
    name: "Two Per State",
    description: "We can prevent the inevitable outcome of the 'tyranny of the majority' in a completely democratic society by giving each state an equal say.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 2,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: -3,
      socialism_discontent: 2,
      communism_discontent: 3
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: -0.01,
      political_capital_gain: -1,
      constitutional_monarchy: 0.03,
      democracy: 0.02,
      socialism: 0.01
    }
  },
  based_on_population: {
    name: "Based on Population",
    description: "Although many on the right are against this proposal, our government believes that only votes based on population will ensure a fair result.",
    political_appeasement: {
      absolute_monarchy_discontent: 5,
      fascism_discontent: 4,
      constitutional_monarchy_discontent: -5,
      democracy_discontent: -2,
      socialism_discontent: -3,
      communism_discontent: 4
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: -0.01,
      political_capital_gain: -1,
      constitutional_monarchy: 0.03,
      democracy: 0.02,
      socialism: 0.01
    }
  }
};
