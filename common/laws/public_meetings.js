config.reforms.public_meetings = {
  name: "Public Meetings",

  meetings_not_allowed: {
    name: "Meetings Not Allowed",
    description: "Although freedom of assembly might sure sound nice, few contemplate the potential loss of stability that our state could suffer from implementing it, and fewer still the administrative burden that it would place amongst our governors. Therefore, we should restrict it.",

    political_appeasement: {
      absolute_monarchy_discontent: -7,
      fascism_discontent: -5,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 4,
      socialism_discontent: 6,
      communism_discontent: 5
    },
    effects: {
      political_capital_gain: 3,
      stability_modifier: 0.10,
      reform_desire_gain: 0.05,
      production_efficiency: 0.05,
      rgo_throughput: 0.05,
      training_cost: 0.1
    }
  },
  some_meetings_tolerated: {
    name: "Some Meetings Tolerated",
    description: "As the number of unsanctioned and thereby illegal protests grow, we might be forced to tolerate some of the larger ones, as a brutal massacre would rile the population against us.",

    political_appeasement: {
      absolute_monarchy_discontent: -4,
      fascism_discontent: 1,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 3,
      socialism_discontent: 5,
      communism_discontent: 5
    },
    effects: {
      political_capital_gain: 1,
      stability_modifier: -0.05,
      reform_desire_gain: 0.07,
      production_efficiency: 0.02,
      rgo_throughput: 0.03,
      training_cost: 0.15
    }
  },
  meetings_allowed: {
    name: "Meetings Allowed",
    description: "In order to maintain a truly democratic society, we must allow freedom of assembly in public in order to safeguard our freedoms and ensure that each of our citizens has a voice.",
    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: 2,
      constitutional_monarchy_discontent: -4,
      democracy_discontent: -6,
      socialism_discontent: -5,
      communism_discontent: 7
    },
    effects: {
      reform_desire_gain: 0.02,
      production_efficiency: -0.05,
      rgo_throughput: -0.02,
      democracy: 0.03,
      constitutional_monarchy: 0.03,
      socialism: 0.01
    }
  }
};
