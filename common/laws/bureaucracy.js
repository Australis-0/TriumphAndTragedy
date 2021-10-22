config.reforms.bureaucracy = {
  name: "Bureaucracy",

  gentry: {
    name: "Gentry",
    description: "By restricting our bureaucratic positions to aristocrats only, we can ensure that an entire category of men are raised to adulthood with the sole purpose of serving as competent administrators.",

    political_appeasement: {
      absolute_monarchy_discontent: -15,
      fascism_discontent: 3,
      constitutional_monarchy_discontent: -3,
      democracy_discontent: 5,
      socialism_discontent: 8,
      communism_discontent: 10
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.05,
      tax_efficiency: 0.1,
      political_capital: 3,
      army_upkeep: 0.05,
      building_cost: -0.05,
      training_cost: 0.02,
      research_efficiency: -0.05
    }
  },
  hereditary_bureaucracy: {
    name: "Hereditary Bureaucracy",
    description: "Although our bureaucracy may theoretically be open to anyone, in reality, it is comprised out of the descendants of noble families and those lucky enough to have passed the exams required to become an administrator.",

    political_appeasement: {
      absolute_monarchy_discontent: -12,
      fascism_discontent: 2,
      constitutional_monarchy_discontent: -1,
      democracy_discontent: 4,
      socialism_discontent: 6,
      communism_discontent: 8
    },
    effects: {
      stability_modifier: 0.03,
      reform_desire_gain: 0.03,
      tax_efficiency: -0.05,
      political_capital_gain: 3,
      army_upkeep: -0.02,
      building_cost: 0.05,
      training_cost: 0.02,
      research_efficiency: -0.05
    }
  },
  professional_civil_servants: {
    name: "Professional Civil Servants",
    description: "Professional civil servants are the backbone that lie underneath any great modern state, and should form the backbone of ours too, if we are to create a truly competent bureaucracy.",

    political_appeasement: {
      absolute_monarchy_discontent: 2,
      fascism_discontent: 3,
      constitutional_monarchy_discontent: -5,
      democracy_discontent: -4,
      socialism_discontent: -8,
      communism_discontent: -8
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: -0.02,
      tax_efficiency: 0.1,
      political_capital_gain: 5,
      army_upkeep: -0.05,
      building_cost: -0.05,
      training_cost: -0.02,
      research_efficiency: 0.15
    }
  }
}
