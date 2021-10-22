config.reforms.trade_unions = {
  name: "Trade Unions",

  illegal: {
    name: "Illegal",
    description: "Our factory owners and businessmen could do better without the Red Hydra lurking around the corners ready to threaten them with strikes for not raising wages to ludicrous levels.",

    political_appeasement: {
      absolute_monarchy_discontent: -4,
      fascism_discontent: -5,
      constitutional_monarchy_discontent: -2,
      democracy_discontent: -1,
      socialism_discontent: 8,
      communism_discontent: 8
    },
    effects: {
      stability_modifier: -0.05,
      tax_efficiency: 0.05,
      rgo_throughput: 0.02,
      production_efficiency: 0.1,
      political_capital_gain: 2,
      extra_building_slots: 3,
      reform_desire_gain: 0.03
    }
  },
  guilds: {
    name: "Guilds",
    description: "Although we should allow some organised labour, further concessions to the unions could lead to more strikes and unrest across our country. 'Give them an inch, and they want a mile'.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -4,
      constitutional_monarchy_discontent: -1,
      democracy_discontent: -1,
      socialism_discontent: 6,
      communism_discontent: 7
    },
    effects: {
      stability_modifier: -0.02,
      tax_efficiency: 0.03,
      rgo_throughput: 0.01,
      production_efficiency: 0.05,
      political_capital_gain: 1,
      extra_building_slots: 2,
      reform_desire_gain: 0.02
    }
  },
  state_controlled: {
    name: "State Controlled",
    description: "State-controlled unions are a good way to make sure that unions stay friendly and don't strike during times critical to our nation. Or so the line of reasoning goes.",

    political_appeasement: {
      absolute_monarchy_discontent: -4,
      fascism_discontent: -6,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 0,
      socialism_discontent: 5,
      communism_discontent: 5
    },
    effects: {
      stability_modifier: 0.05,
      tax_efficiency: 0.05,
      rgo_throughput: 0.1,
      production_efficiency: 0.1,
      political_capital_gain: 2,
      extra_building_slots: 2,
      reform_desire_gain: 0.04
    }
  },
  non_socialist_allowed: {
    name: "Non-Socialist Allowed",
    description: "If we strike before the Red Hydra can grow its first head, we won't have to worry about the rest.",
    political_appeasement: {
      absolute_monarchy_discontent: 2,
      fascism_discontent: 3,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 0,
      socialism_discontent: 4,
      communism_discontent: 5
    },
    effects: {
      stability_modifier: -0.05,
      tax_efficiency: -0.05,
      rgo_throughput: -0.05,
      production_efficiency: 0.1,
      political_capital_gain: 1,
      extra_building_slots: 1,
      reform_desire_gain: 0.01
    }
  },
  all_allowed: {
    name: "All Allowed",
    description: "Organised labour should have a seat at the table, and militia should not be sent in to machine gun down strikers as violence involving socialist trade unions has recently come to a head.",

    political_appeasement: {
      absolute_monarchy_discontent: 5,
      fascism_discontent: 8,
      constitutional_monarchy_discontent: 1,
      democracy_discontent: 2,
      socialism_discontent: -9,
      communism_discontent: -10
    },
    effects: {
      stability_modifier: -0.10,
      tax_efficiency: -0.1,
      rgo_throughput: -0.1,
      production_efficiency: -0.05,
      political_capital_gain: 1,
      extra_building_slots: 5,
      reform_desire_gain: -0.05,
      socialism: 0.02,
      communism: 0.02
    }
  }
};
