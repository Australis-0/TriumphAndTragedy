config.reforms.political_rights = {
  name: "Political Rights",

  restricted_rights: {
    name: "Restricted Rights",
    description: "Political rights are best in small doses. And I mean small, alright.",

    political_appeasement: {
      absolute_monarchy_discontent: -5,
      fascism_discontent: -4,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 5,
      socialism_discontent: 4,
      communism_discontent: -3
    },
    effects: {
      stability_modifier: 0.05,
      political_capital_gain: 1,
      reform_desire: 0.02,
      national_manpower: 0.05,
      unit_cost: 0.05,
      extra_building_slots: -1
    }
  },
  cultural_rights: {
    name: "Cultural Rights",
    description: "By enshrining the rights of at least some cultural minorities in our country, we may be able to ensure long-term stability and draw those not of our primary culture to our side, if nothing else.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: 1,
      constitutional_monarchy_discontent: -2,
      democracy_discontent: -3,
      socialism_discontent: 3,
      communism_discontent: -3
    },
    effects: {
      stability_modifier: 0.07,
      political_capital_gain: 2,
      reform_desire_gain: -0.05,
      national_manpower: -0.02,
      unit_cost: 0.02,
      extra_building_slots: 1
    }
  },
  all_allowed_rights: {
    name: "All Allowed Rights",
    description: "All of our citizens shall be equal in this country, and enshrining that view point in none other than the public consciousness will help to solidify our nation's varicose reputation as a melting pot of cultures.",

    political_appeasement: {
      absolute_monarchy_discontent: 1,
      fascism_discontent: 5,
      constitutional_monarchy_discontent: -5,
      democracy_discontent: -4,
      socialism_discontent: -6,
      communism_discontent: -1
    },
    effects: {
      stability_modifier: 0.10,
      political_capital_gain: 3,
      reform_desire_gain: -0.1,
      national_manpower: 0.05,
      training_cost: 0.05,
      unit_cost: 0.05,
      extra_building_slots: 3
    }
  }
};
