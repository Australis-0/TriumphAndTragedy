config.reforms.healthcare = {
	name: "Healthcare",

	no_healthcare: {
		name: "No Healthcare",
		description: "It's the American way!",

		political_appeasement: {
			absolute_monarchy_discontent: -10,
			fascism_discontent: 1,
			constitutional_monarchy_discontent: 6,
			democracy_discontent: 1,
			socialism_discontent: 8,
			communism_discontent: 6
		},

		effects: {
			stability_modifier: -0.05,
			pop_growth_modifier: -0.05,
			reform_desire_gain: 0.05,
			tax_efficiency: 0.15
		}
	},
	trinket_healthcare: {
		name: "Trinket Healthcare",
		description: "If we can't afford to set up even the most rudimentary of healthcare services, at least we can put some 'nurses' in our schools and call it a day!",

		political_appeasement: {
			absolute_monarchy_discontent: -8,
			fascism_discontent: -1,
			constitutional_monarchy_discontent: 5,
			democracy_discontent: -1,
			socialism_discontent: 7,
			communism_discontent: 6
		},
		effects: {
			stability_modifier: -0.02,
			pop_growth_modifier: -0.04,
			reform_desire_gain: 0.04,
			tax_efficiency: 0.12
		}
	},
	low_healthcare: {
		name: "Low Healthcare",
		description: "By providing rudimentary services to the general public, and making the healthcare system free for those in emergency situations only, we can at least trim down some of the excess casualties.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: -1,
			constitutional_monarchy_discontent: 2,
			democracy_discontent: -3,
			socialism_discontent: 6,
			communism_discontent: 5
		},
		effects: {
			pop_growth_modifier: -0.02,
			reform_desire_gain: 0.02,
			tax_efficiency: 0.05
		}
	},
	acceptable_healthcare: {
		name: "Acceptable Healthcare",
		description: "Don't socialise my healthcare!",

		political_appeasement: {
			absolute_monarchy_discontent: 3,
			fascism_discontent: 2,
			constitutional_monarchy_discontent: 0,
			democracy_discontent: -3,
			socialism_discontent: 3,
			communism_discontent: 2
		},
		effects: {
			stability_modifier: 0.05,
			pop_growth_modifier: 0.02,
			tax_efficiency: -0.02
		}
	},
	good_healthcare: {
		name: "Good Healthcare",
		description: "By making our nation a world model for healthcare, we can avoid the worst of public health crises and ensure stability for those in our nation at the cost of the taxpayer.",

		political_appeasement: {
			absolute_monarchy_discontent: 4,
			fascism_discontent: 2,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: -3,
			socialism_discontent: -6,
			communism_discontent: -6
		},
		effects: {
			stability_modifier: 0.10,
			pop_growth_modifier: 0.05,
			tax_efficiency: -0.05,
			reform_desire_gain: -0.02,
			political_capital_gain: -1
		}
	}
};
