config.reforms.pensions = {
	name: "Pensions",

	no_pensions: {
		name: "No Pensions",
		description: "Although pensions might sure sound nice, few people ever consider how much money it would actually cost us, and does it look like the public want austerity?",

		political_appeasement: {
			absolute_monarchy_discontent: -5,
			fascism_discontent: -4,
			constitutional_monarchy_discontent: 5,
			democracy_discontent: 4,
			socialism_discontent: 7,
			communism_discontent: 7
		},
		effects: {
			stability_modifier: -0.03,
			pop_growth_modifier: 0.02,
			reform_desire_gain: 0.02,
			tax_efficiency: 0.07,
			political_capital_gain: 4,
			building_cost: -0.1,
			training_cost: -0.1,
			production_efficiency: -0.05
		}
	},

	trinket_pensions: {
		name: "Trinket Pensions",
		description: "Trinket pensions will give our workforce something to look forwards to in the future when they retire, even if not much. Unfortunately, it would seem that the pension amount is proportional to incentive.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: 1,
			constitutional_monarchy_discontent: 4,
			democracy_discontent: 3,
			socialism_discontent: 5,
			communism_discontent: 5
		},
		effects: {
			stability_modifier: -0.01,
			pop_growth_modifier: 0.04,
			reform_desire_gain: 0.02,
			tax_efficiency: 0.05,
			political_capital_gain: 3,
			building_cost: -0.05,
			training_cost: -0.05,
			production_efficiency: -0.02
		}
	},

	low_pensions: {
		name: "Low Pensions",
		description: "Low pensions, whilst still offering flexibility for our state budget, will also help to incentivise workers and help decrease discontent in our country. However, some in our government are beginning to grow worried whether our state can handle all these expenses ...",

		political_appeasement: {
			absolute_monarchy_discontent: -2,
			fascism_discontent: -1,
			constitutional_monarchy_discontent: 2,
			democracy_discontent: 2,
			socialism_discontent: 4,
			communism_discontent: 3
		},
		effects: {
			pop_growth_modifier: 0.05,
			tax_efficiency: 0.01,
			political_capital_gain: 1
		}
	},

	acceptable_pensions: {
		name: "Acceptable Pensions",
		description: "Acceptable pensions, a.k.a. enough for most of our elderly to live off of, is substantially more accepted by society, but also places a substantial burden on our administrative functions and our workforce.",

		political_appeasement: {
			absolute_monarchy_discontent: 2,
			fascism_discontent: -2,
			constitutional_monarchy_discontent: -5,
			democracy_discontent: -5,
			socialism_discontent: -2,
			communism_discontent: -3
		},
		effects: {
			stability_modifier: 0.05,
			pop_growth_modifier: 0.07,
			reform_desire_gain: -0.02,
			tax_efficiency: -0.05,
			political_capital_gain: -1,
			building_cost: 0.05,
			training_cost: 0.05,
			production_efficiency: 0.05
		}
	},

	good_pensions: {
		name: "Good Pensions",
		description: "Good pensions, whilst placing a heavy burden on our existent workforce and lowering the state budget significantly will serve as a paragon of stability and incentive, although it will alienate those on the right and even some moderates.",

		political_appeasement: {
			absolute_monarchy_discontent: 5,
			fascism_discontent: 4,
			constitutional_monarchy_discontent: 3,
			democracy_discontent: 4,
			socialism_discontent: -8,
			communism_discontent: -10
		},
		effects: {
			stability_modifier: 0.10,
			pop_growth_modifier: 0.1,
			reform_desire_gain: -0.05,
			tax_efficiency: -0.1,
			political_capital_gain: -2,
			building_cost: 0.1,
			training_cost: 0.1,
			production_efficiency: 0.2
		}
	}
}
