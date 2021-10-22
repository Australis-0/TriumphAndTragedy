config.reforms.lgbtqia_rights = {
  name: "LGBTQIA+ Rights",

  outlawed: {
    name: "Outlawed",
    description: "'Also, you're gay, and they're homophobic, so ...'\n'Firstly, I'm not gay'.\n'Yes, you are'.",

    political_appeasement: {
      absolute_monarchy_discontent: -5,
      fascism_discontent: -7,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 6,
      socialism_discontent: 6,
      communism_discontent: 2
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: 0.02,
      national_manpower: -0.05,
      infamy_loss: -0.01,
      constitutional_monarchy: 0.01,
      fascism: 0.01
    }
  },
  decriminalised: {
    name: "Decriminalised",
    description: "'Well, we've stopped throwing the gays in prison, which has got to be progress, right?'\n* Ugandan telly plays in background *",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -3,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 2,
      socialism_discontent: 3,
      communism_discontent: 1
    },
    effects: {
      stability_modifier: -0.05,
      reform_desire_gain: 0.01,
      constitutional_monarchy: 0.01,
      demoracy: 0.01,
      socialism: 0.01
    }
  },
  accepted: {
    name: "Accepted",
    description: "'At the end of the day, they're our fellow countrymen, and they're not really any different from any of us - we see no reason to exclude them from military service, and we believe that society should treat them as they would any other person'.",

    political_appeasement: {
      absolute_monarchy_discontent: 5,
      fascism_discontent: 6,
      constitutional_monarchy_discontent: -2,
      democracy_discontent: -4,
      socialism_discontent: -5,
      communism_discontent: 2
    },
    effects: {
      stability_modifier: 0.05,
      reform_desire_gain: -0.01,
      national_manpower: 0.05,
      infamy_loss: 0.01,
      constitutional_monarchy: 0.01,
      democracy: 0.02,
      socialism: 0.02
    }
  }
};
