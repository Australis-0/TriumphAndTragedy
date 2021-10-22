config.reforms.school_system = {
  name: "School System",

  no_school_system: {
    name: "No School System",
    description: "Sometimes the best schooling is homeschooling.",

    political_appeasement: {
      absolute_monarchy_discontent: 2,
      fascism_discontent: -3,
      constitutional_monarchy_discontent: 6,
      democracy_discontent: 6,
      socialism_discontent: 8,
      communism_discontent: 8
    },
    effects: {
      stability_modifier: -0.10,
      pop_growth_modifier: 0.005,
      tax_efficiency: 0.15,
      political_capital_gain: -2,
      research_efficiency: -0.2,
      reform_desire_gain: 0.03
    }
  },
  basic_school_system: {
    name: "Basic School System",
    description: "By giving our nation's children at least basic literacy skills, we can ensure a more competent workforce in the future.",

    political_appeasement: {
      absolute_monarchy_discontent: -1,
      fascism_discontent: -1,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 4,
      socialism_discontent: 7,
      communism_discontent: 7
    },
    effects: {
      stability_modifier: -0.05,
      pop_growth_modifier: 0.04,
      tax_efficiency: 0.1,
      political_capital_gain: -1,
      research_efficiency: -0.15,
      reform_desire_gain: 0.01
    }
  },
  acceptable_school_system: {
    name: "Acceptable School System",
    description: "An acceptable school system will teach our children at least primary education and ensure a basic academic base to build our future research prospects off of.",

    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: 2,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 0,
      socialism_discontent: 3,
      communism_discontent: 4
    },
    effects: {
      pop_growth_modifier: 0.03,
      tax_efficiency: 0.05,
      research_efficiency: -0.06
    }
  },
  good_school_system: {
    name: "Good School System",
    description: "A good school system will not only allow for secondary education for our students, but will also ensure that they can be taught to love our government and support our country ... for some monetary cost, of course.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 3,
      constitutional_monarchy_discontent: -2,
      democracy_discontent: -3,
      socialism_discontent: 2,
      communism_discontent: 2
    },
    effects: {
      stability_modifier: 0.05,
      tax_efficiency: -0.05,
      political_capital_gain: 1,
      research_efficiency: 0.05
    }
  },
  mandatory_schooling: {
    name: "Mandatory Schooling",
    description: "Mandatory schooling will forcibly place our nation's children into a learning environment where we can instill in them values and ideals that reflect those of our nation, and with post-secondary education being made available, a good scientific base to build off of.",

    political_appeasement: {
      absolute_monarchy_discontent: 8,
      fascism_discontent: 5,
      constitutional_monarchy_discontent: -5,
      democracy_discontent: 2,
      socialism_discontent: -8,
      communism_discontent: -8
    },
    effects: {
      stability_modifier: 0.10,
      tax_efficiency: -0.1,
      production_efficiency: 0.05,
      political_capital_gain: 3,
      pop_growth_modifier: -0.05,
      research_efficiency: 0.2
    }
  }
};
