config.reforms.political_parties = {
  name: "Political Parties",
  only_underground: {
    name: "Only Underground",
    description: "We shall take every opportunity to crack down on political dissent and impose a one-party state.",

    political_appeasement: {
      absolute_monarchy_discontent: -5,
      fascism_discontent: -10,
      constitutional_monarchy_discontent: 10,
      democracy_discontent: 8,
      socialism_discontent: 9,
      communism_discontent: -8
    },
    effects: {
      stability_modifier: 0.10,
      reform_desire_gain: 0.05,
      political_capital_gain: 5
    }
  },
  harassment: {
    name: "Harassment",
    description: "As domestic and international criticism begins to ramp up, we recognise that it may be necessary to implement some new reforms, although we'll be sure to keep the opposition on a short leash still.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -5,
      constitutional_monarchy_discontent: 8,
      democracy_discontent: 7,
      socialism_discontent: 8,
      communism_discontent: -5
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.03,
      political_capital_gain: 3
    }
  },
  gerrymandering: {
    name: "Gerrymandering",
    description: "'Can we have some more funds for redistricting maps, please?'",

    political_appeasement: {
      absolute_monarchy_discontent: -1,
      fascism_discontent: -2,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 6,
      socialism_discontent: 7,
      communism_discontent: -3
    },
    effects: {
      reform_desire_gain: 0.02,
      political_capital_gain: 2
    }
  },
  non_secret_ballots: {
    name: "Non-Secret Ballots",
    description: "They're secret, just an open secret! Oh, and we're taking notes by the way ...",

    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: 0,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 4,
      socialism_discontent: 5,
      communism_discontent: -1
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.01,
      political_capital_gain: 1
    }
  },
  secret_ballots: {
    name: "Secret Ballots",
    description: "We can only have a free and fair democracy by ensuring that each of our voters are able to vote securely and therefore for the candidate that they feel will serve their job best.",
    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 4,
      constitutional_monarchy_discontent: -7,
      democracy_discontent: -6,
      socialism_discontent: -3,
      communism_discontent: 5
    },
    effects: {
      stability_modifier: -0.10,
      reform_desire_gain: -0.02,
      political_capital_gain: -1,
      constitutional_monarchy: 0.03,
      democracy: 0.03,
      socialism: 0.02
    }
  }
};
