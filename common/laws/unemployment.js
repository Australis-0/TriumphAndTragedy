config.reforms.unemployment = {
	name: "Unemployment",

	no_subsidies: {
		name: "No Subsidies",
		description: "In order to avoid taxation, we can rely completely on charities to provide aid to those most affected, so as to ease the administrative burden upon ourselves.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: -8,
			constitutional_monarchy_discontent: 5,
			democracy_discontent: 4,
			socialism_discontent: 5,
			communism_discontent: 6
		},
		effects: {
			stability_modifier: -0.05,
			pop_growth_modifier: -0.02,
			reform_desire_gain: 0.05,
			tax_efficiency: 0.1,
			national_manpower: 0.05,
			political_capital_gain: 2
		}
	},

	trinket_subsidies: {
		name: "Trinket Subsidies",
		description: "Trinket subsidies, athough far from an effective solution regarding unemployment, will help alleviate some of the burdens faced by unemployed workers in our country today.",

		political_appeasement: {
			absolute_monarchy_discontent: -2,
			ascism_discontent: -6,
			constitutional_monarchy_discontent: 4,
			democracy_discontent: 3,
			socialism_discontent: 4,
			communism_discontent: 4
		},
		effects: {
			stability_modifier: -0.03,
			pop_growth_modifier: -0.02,
			reform_desire_gain: 0.03,
			tax_efficiency: 0.08,
			national_manpower: 0.02,
			political_capital_gain: 1
		}
	},

	low_subsidies: {
		name: "Low Subsidies",
		description: "Low subsidies, although far from a comprehensive part of a social safety net, will help lift the burden on charities, and lower discontent amongst the general public.",

		political_appeasement: {
			absolute_monarchy_discontent: -1,
			fascism_discontent: -3,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: 1,
			socialism_discontent: 3,
			communism_discontent: 2
		},
		effects: {
			pop_growth_modifier: -0.01,
			reform_desire_gain: 0.01,
			tax_efficiency: 0.04
		}
	},

	extended_subsidies: {
		name: "Extended Subsidies",
		description: "Extended subsidies, although praised by the left as helping those unfortunate enough to be unemployed to get back on their feet, are also said by those on the right to encourage laziness, and may lower our tax efficiency.",

		political_appeasement: {
			absolute_monarchy_discontent: 1,
			fascism_discontent: 2,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: 0,
			socialism_discontent: -2,
			communism_discontent: -3
		},
		effects: {
			stability_modifier: 0.05,
			pop_growth_modifier: 0.02,
			reform_desire_gain: -0.02,
			production_efficiency: -0.05,
			national_manpower: -0.01
		}
	},

	generous_subsidies: {
		name: "Generous Subsidies",
		description: "Generous subsidies, although deeply alleviating burden on the unemployed, will also weigh down our state's coffers and political capital, and is often seen as feeding laziness.",

		political_appeasement: {
			absolute_monarchy_discontent: 2,
			fascism_discontent: 6,
			constitutional_monarchy_discontent: 4,
			democracy_discontent: 3,
			socialism_discontent: -4,
			communism_discontent: -4
		},
		effects: {
			stability_modifier: 0.10,
			pop_growth_modifier: 0.05,
			reform_desire_gain: -0.05,
			production_efficiency: -0.1,
			building_cost: 0.05,
			national_manpower: -0.05
		}
	}
}
