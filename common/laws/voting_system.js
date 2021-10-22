config.reforms.voting_system = {
  name: "Voting System",

  no_voting_system: {
    name: "No Voting System",
    description: "Dictatorship, trollface.",

    political_appeasement: {
      absolute_monarchy_discontent: -10,
      fascism_discontent: -10,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 8,
      socialism_discontent: 8,
      communism_discontent: -10
    },
    effects: {
      stability_modifier: 0.10,
      absolute_monarchy: 0.02,
      fascism: 0.02,
      communism: 0.02,
      reform_desire_gain: 0.05
    }
  },
  first_past_the_post: {
    name: "First Past The Post",
    description: "Reforms to our voting system could greatly change the political landscape of our democracy. First Past the Post, or FPTP, therefore, is the most secure as it is the most widely used.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 5,
      constitutional_monarchy_discontent: -1,
      democracy_discontent: -2,
      socialism_discontent: 3,
      communism_discontent: 5
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.01,
      democracy: 0.05,
      constitutional_monarchy: 0.04,
      socialism: 0.01
    }
  },
  jefferson_method: {
    name: "Jefferson Method",
    description: "By weighting our voting methods, we can ensure that seats to our Lower House are fairly allocated amongst our states.",

    political_appeasement: {
      absolute_monarchy_discontent: 5,
      fascism_discontent: 6,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: -4,
      socialism_discontent: 2,
      communism_discontent: 5
    },
    effects: {
      reform_desire_gain: -0.01,
      democracy: 0.06,
      constitutional_monarchy: 0.04,
      socialism: 0.01
    }
  },
  proportional_representation: {
    name: "Proportional Representation",
    description: "Via proportional representation, we can ensure a wealth and diversity of opinions amongst the enfranchised, if at least nothing else, which can help improve our governmental stability and decrease cynicism.",

    political_appeasement: {
      absolute_monarchy_discontent: 6,
      fascism_discontent: 6,
      constitutional_monarchy_discontent: -2,
      democracy_discontent: -5,
      socialism_discontent: -2,
      communism_discontent: 6
    },
    effects: {
      political_capital_gain: 4,
      reform_desire_gain: -0.03,
      democracy: 0.08,
      constitutional_monarchy: 0.05,
      socialism: 0.03
    }
  }
};
