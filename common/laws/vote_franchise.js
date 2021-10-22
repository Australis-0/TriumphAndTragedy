config.reforms.vote_franchise = {
  name: "Vote Franchise",

  no_voting: {
    name: "No Voting",
    description: "Why have a democracy?",

    political_appeasement: {
      absolute_monarchy_discontent: -10,
      fascism_discontent: -10,
      constitutional_monarchy_discontent: 7,
      democracy_discontent: 8,
      socialism_discontent: 6,
      communism_discontent: -10
    },
    effects: {
      stability_modifier: 0.05,
      political_capital_gain: 2,
      army_upkeep: 0.05,
      reform_desire_gain: 0.05,
      infamy_loss: 0.04,
      absolute_monarchy: 0.01,
      fascism: 0.01,
      communism: 0.01
    }
  },
  only_landed: {
    name: "Only Landed",
    description: "We should make it so that only the landed gentry and those of high intelligence in our country are allowed to vote, as the common people simply can't be trusted to elect their own leaders.",

    political_appeasement: {
      absolute_monarchy_discontent: -8,
      fascism_discontent: -3,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 7,
      socialism_discontent: 5,
      communism_discontent: -7
    },
    effects: {
      stability_modifier: 0.02,
      political_capital_gain: 1,
      reform_desire_gain: 0.04,
      infamy_loss: 0.03,
      absolute_monarchy: 0.01,
      constitutional_monarchy: 0.01
    }
  },
  weighted_wealth: {
    name: "Weighted Wealth",
    description: "Only those who own land and are of the majority ethnicity should be allowed to vote in this country, and greater emphasis should be placed on the aristocracy.",

    political_appeasement: {
      absolute_monarchy_discontent: -6,
      fascism_discontent: -1,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 5,
      socialism_discontent: 4,
      communism_discontent: -3
    },
    effects: {
      stability_modifier: 0.03,
      political_capital_gain: 1,
      reform_desire_gain: 0.05,
      infamy_loss: 0.02,
      absolute_monarchy: 0.01,
      constitutional_monarchy: 0.01,
      democracy: 0.01
    }
  },
  wealth: {
    name: "Wealth",
    description: "Any landowing gentleman in this realm should be given the vote.",

    political_appeasement: {
      absolute_monarchy_discontent: -5,
      fascism_discontent: 0,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 3,
      socialism_discontent: 3,
      communism_discontent: -5
    },
    effects: {
      stability_modifier: 0.01,
      reform_desire_gain: 0.03,
      tax_efficiency: 0.05,
      absolute_monarchy: 0.01,
      constitutional_monarchy: 0.01,
      democracy: 0.02
    }
  },
  universal: {
    name: "Universal",
    description: "One man, one vote.",

    political_appeasement: {
      absolute_monarchy_discontent: 5,
      fascism_discontent: 4,
      constitutional_monarchy_discontent: 0,
      democracy_discontent: 0,
      socialism_discontent: 2,
      communism_discontent: 4
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: -0.04,
      infamy_loss: -0.05,
      tax_efficiency: 0.1,
      constitutional_monarchy: 0.02,
      democracy: 0.05,
      socialism: 0.02
    }
  }
};
