config.reforms.slavery = {
  name: "Slavery",

  upheld: {
    name: "Upheld",
    description: "Everyone knows that slavery is necessary for the continued existence of our state, and not only is it necessary, but it is the ethical choice to make, as anyone who's ever read the Curse of Ham would know.",

    political_appeasement: {
      absolute_monarchy_discontent: -2,
      fascism_discontent: -9,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 4,
      socialism_discontent: 8,
      communism_discontent: 10
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.1,
      infamy_loss: 0.02,
      tax_efficiency: -0.1,
      production_efficiency: -0.5,
      rgo_throughput: 0.1,
      national_manpower: -0.1,
      building_cost: -0.2,
      research_efficiency: -0.2
    }
  },
  allowed: {
    name: "Allowed",
    description: "Whilst we won't go as far as to openly promote the morality of slavery, we will simply allow it in order to allow the continuation of the flow of raw resources to our industry, no matter the cost.",

    political_appeasement: {
      absolute_monarchy_discontent: -1,
      fascism_discontent: -8,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 5,
      socialism_discontent: 7,
      communism_discontent: 9
    },
    effects: {
      stability_modifier: -0.08,
      reform_desire_gain: 0.12,
      tax_efficiency: -0.08,
      production_efficiency: -0.45,
      rgo_throughput: 0.1,
      national_manpower: -0.1,
      building_cost: -0.15,
      research_efficiency: -0.15
    }
  },
  freedom_of_womb: {
    name: "Freedom of Womb",
    description: "As slavery leaves a moral mark on our society, we should seek to phase it out gradually to ensure that the slaveholders in our country don't get too upset ...",

    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: 3,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 3,
      socialism_discontent: 6,
      communism_discontent: 8
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.05,
      tax_efficiency: -0.05,
      production_efficiency: -0.35,
      rgo_throughput: 0.1,
      national_manpower: -0.05,
      building_cost: -0.1,
      research_efficiency: -0.1
    }
  },
  partial_abolition: {
    name: "Partial Abolition",
    description: "Partial abolition refers to the plan by which we will gradually phase out slavery in this country and transition to a free society.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 5,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 1,
      socialism_discontent: 4,
      communism_discontent: 6
    },
    effects: {
      reform_desire_gain: 0.02,
      tax_efficiency: -0.05,
      production_efficiency: -0.20,
      rgo_throughput: 0.05,
      building_cost: -0.05,
      research_efficiency: -0.1
    }
  },
  abolished: {
    name: "Abolished",
    description: "Slavery should be outlawed everywhere. 'Am I not a man and also a brother?'",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 6,
      constitutional_monarchy_discontent: -3,
      democracy_discontent: -4,
      socialism_discontent: -5,
      communism_discontent: -5
    },
    effects: {
      national_manpower: 0.1,
      rgo_throughput: 0.05,
      research_efficiency: 0.1
    }
  }
};
