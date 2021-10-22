config.reforms.conscription = {
  name: "Conscription",

  service_by_requirement: {
    name: "Service by Requirement",
    description: "The only sure way to maximise our manpower is service by requirement, although people may choose to emigrate instead, and all the training is sucking our coffers dry.",

    political_appeasement: {
      absolute_monarchy_discontent: -5,
      fascism_discontent: -15,
      constitutional_monarchy_discontent: 5,
      democracy_discontent: 5,
      socialism_discontent: 7,
      communism_discontent: -5
    },
    effects: {
      stability_modifier: 0.05,
      national_manpower: 0.2,
      training_cost: -0.2,
      tax_efficiency: -0.1,
      pop_growth_modifier: -0.02,
      political_capital_gain: 1,
      mobilisation_speed: 0.15,
      mobilisation_impact: -0.5,
      mobilisation_size: 1,
      fascism: 0.01,
      absolute_monarchy: 0.01
    }
  },
  four_year_draft: {
    name: "Four Year Draft",
    description: "By implementing a four year draft, we can help alleviate the training costs when it finally comes time to mobilise our population for the war effort.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -12,
      constitutional_monarchy_discontent: 4,
      democracy_discontent: 4,
      socialism_discontent: 6,
      communism_discontent: -3
    },
    effects: {
      stability_modifier: 0.03,
      national_manpower: 0.15,
      training_cost: -0.2,
      tax_efficiency: -0.05,
      pop_growth_modifier: -0.02,
      mobilisation_speed: 0.10,
      mobilisation_impact: -0.35,
      mobilisation_size: 0.8,
      fascism: 0.01,
      absolute_monarchy: 0.01
    }
  },
  two_year_draft: {
    name: "Two Year Draft",
    description: "A two year draft will help ensure at least basic training for all males of fighting age in our country at reduced cost.",

    political_appeasement: {
      absolute_monarchy_discontent: -3,
      fascism_discontent: -6,
      constitutional_monarchy_discontent: 3,
      democracy_discontent: 3,
      socialism_discontent: 5,
      communism_discontent: -3
    },
    effects: {
      stability_modifier: 0.01,
      national_manpower: 0.1,
      training_cost: -0.15,
      tax_efficiency: -0.03,
      pop_growth_modifier: -0.01,
      mobilisation_speed: -0.05,
      mobilisation_impact: -0.2,
      mobilisation_size: 0.5,
      fascism: 0.01,
      absolute_monarchy: 0.01
    }
  },
  one_year_draft: {
    name: "One Year Draft",
    description: "A one year draft, whilst not enough for advanced military training, will help reduce future training costs somewhat whilst keeping expenditures and draft dodging minimal.",

    political_appeasement: {
      absolute_monarchy_discontent: -1,
      fascism_discontent: -2,
      constitutional_monarchy_discontent: 2,
      democracy_discontent: 2,
      socialism_discontent: 4,
      communism_discontent: -1
    },
    effects: {
      national_manpower: 0.1,
      training_cost: -0.1,
      tax_efficiency: -0.01,
      pop_growth_modifier: -0.01,
      mobilisation_speed: 0.02,
      mobilisation_impact: -0.05,
      mobilisation_size: 0.2
    }
  },
  no_draft: {
    name: "No Draft",
    description: "Whilst not having a draft implemented in our nation is sure to drive down draft dodging, concerns are growing over whether it could lead to pacifism running rampant amongst our populace.",

    political_appeasement: {
      absolute_monarchy_discontent: 3,
      fascism_discontent: 0,
      constitutional_monarchy_discontent: -3,
      democracy_discontent: -3,
      socialism_discontent: -4,
      communism_discontent: 0
    },
    effects: {
      tax_efficiency: 0.05,
      national_manpower: -0.05,
      pop_growth_modifier: 0.05,
      political_capital_gain: -1,
      mobilisation_speed: 0.1,
      infamy_loss: -0.05,
      democracy: 0.01,
      constitutional_monarchy: 0.01,
      socialism: 0.02
    }
  }
};
