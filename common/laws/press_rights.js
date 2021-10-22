config.reforms.press_rights = {
  name: "Press Rights",

  state_press_only: {
    name: "State Press Only",
    description: "You know, it's a real shame private broadcasting networks have a tendency to not accept all our rubbish propaganda. Now, the solution here is obvious: nationalising all of them and merging them into our very own state broadcaster. I'm sure you wouldn't disagree, would you, Minister?",

    political_appeasement: {
      absolute_monarchy_discontent: -4,
      fascism_discontent: -8,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 4,
      socialism_discontent: 6,
      communism_discontent: -10
    },
    effects: {
      stability_modifier: 0.10,
      reform_desire_gain: -0.05,
      tax_efficiency: -0.1,
      research_efficiency: -0.1,
      building_cost: -0.05,
      pop_growth_modifier: 0.02,
      rgo_throughput: 0.05
    }
  },
  censored_press: {
    name: "Censored Press",
    description: "Although no one likes restrictions, they're necessary to prevent wartime secrets from leaking out, or even critical coverage of our government when we could afford it least. Therefore, some press needs to be censored.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -7,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 3,
      socialism_discontent: 5,
      communism_discontent: -9
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: -0.03,
      tax_efficiency: -0.13,
      research_efficiency: -0.05,
      building_cost: -0.04,
      pop_growth_modifier: 0.03,
      rgo_throughput: 0.04
    }
  },
  harassed_press: {
    name: "Harassed Press",
    description: "That's just another hit job from the Fake News Media. Ah, here's another beauty ... and besides, no one could even see that 'Press' vest at that protest you were going to. This is the media my opponents want, can you believe it? It's so sad.",

    political_appeasement: {
      absolute_monarchy_discontent: -2,
      fascism_discontent: -3,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 1,
      socialism_discontent: 4,
      communism_discontent: -2
    },
    effects: {
      reform_desire_gain: 0.01,
      research_efficiency: -0.08,
      building_cost: -0.02,
      pop_growth_modifier: 0.01,
      democracy: 0.02
    }
  },
  free_press: {
    name: "Free Press",
    description: "Democracy relies on a free and open press to be able to inform voters, not only of geopolitical affairs, but also of affairs in their local constituencies as well.",
    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 5,
      constitutional_monarchy_discontent: -1,
      democracy_discontent: -2,
      socialism_discontent: -2,
      communism_discontent: 6
    },
    effects: {
      reform_desire_gain: 0.03,
      research_efficiency: 0.1,
      democracy: 0.04
    }
  }
};
