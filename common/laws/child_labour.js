config.reforms.child_labour = {
  name: "Child Labour",

  child_labour_encouraged: {
    name: "Child Labour Encouraged",
    description: "By encouraging our children to work in the factories, we can instill in them a valuable work ethic that will surely be of great use to us in the future ... although some of them will inevitably be injured in the process.",

    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: -2,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 4,
      socialism_discontent: 5,
      communism_discontent: 4
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.03,
      tax_efficiency: 0.05,
      production_efficiency: 0.05,
      building_cost: -0.05,
      training_cost: -0.05,
      pop_growth_modifier: -0.05,
      research_efficiency: -0.05
    }
  },
  child_labour_legal: {
    name: "Child Labour Legal",
    description: "Although the moral efficacy of using child labour might be questionable, it sure is a boon to our businesses, and so we should only socially encourage parents to withdraw their children from unsafe working conditions.",

    political_appeasement: {
      absolute_monarchy_discontent: -2,
      fascism_discontent: -1,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 3,
      socialism_discontent: 4,
      communism_discontent: 3
    },
    effects: {
      stability_modifier: -0.02,
      reform_desire_gain: 0.02,
      tax_efficiency: 0.06,
      production_efficiency: 0.04,
      building_cost: -0.03,
      training_cost: -0.03,
      pop_growth_modifier: -0.02,
      research_efficiency: -0.04
    }
  },
  child_labour_discouraged: {
    name: "Child Labour Discouraged",
    description: "It might also be wise to start public information campaigns about the dangers of child labour in order to prevent even more parents from sending their children to the mills where they could be injured or worse in an effort to preserve our population, even with the maluses it may come with.",

    political_appeasement: {
      absolute_monarchy_discontent: -2,
      fascism_discontent: -1,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 3,
      socialism_discontent: 4,
      communism_discontent: 3
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.03,
      tax_efficiency: 0.03,
      production_efficiency: 0.02,
      research_efficiency: -0.04,
      national_manpower: 0.02
    }
  },
  child_labour_restricted: {
    name: "Child Labour Restricted",
    description: "By beginning to restrict child labour only to 'safe jobs', we can help reduce the epidemic of maiming and lost limbs that abound amongst our young.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 1,
      constitutional_monarchy_discontent: -1,
      democracy_discontent: -1,
      socialism_discontent: 3,
      communism_discontent: 2
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.01,
      tax_efficiency: 0.01,
      production_efficiency: 0.02,
      research_efficiency: -0.03,
      pop_growth_modifier: 0.01,
      national_manpower: 0.05
    }
  },
  child_labour_illegal: {
    name: "Child Labour Illegal",
    description: "Criminalising the usage of child labour, whilst damaging for our economy in the short term, could provide a population and academic base to build off of when combined with mandatory schooling.",

    political_appeasement: {
      absolute_monarchy_discontent: 4,
      fascism_discontent: 2,
      constitutional_monarchy_discontent: -3,
      democracy_discontent: -2,
      socialism_discontent: -3,
      communism_discontent: -4
    },
    effects: {
      stability_modifier: 0.07,
      research_efficiency: 0.1,
      pop_growth_modifier: 0.05,
      national_manpower: 0.07
    }
  }
};
