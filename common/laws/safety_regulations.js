config.reforms.safety_regulations = {
	name: "Safety Regulations",

	no_safety_regulations: {
		name: "No Safety Regulations",
		description: "Although dangerous, critics of safety regulation believe that increased regulationism will reduce the ability of the free markets to allocate their own funds most efficiently.",

		political_appeasement: {
			absolute_monarchy_discontent: -5,
			fascism_discontent: -6,
			constitutional_monarchy_discontent: 4,
			democracy_discontent: 5,
			socialism_discontent: 7,
			communism_discontent: 6
		},
		effects: {
			stability_modifier: -0.05,
			pop_growth_modifier: -0.01,
			reform_desire_gain: 0.05,
			production_efficiency: 0.05,
			building_cost: -0.1,
			tax_efficiency: -0.02
		}
	},
	minimal_safety_regulations: {
		name: "Minimal Safety Regulations",
		description: "Minimal safety regulations, whilst not protecting from all accidents, will hopefully help those on the job to avoid the most serious of injuries that may maim them for life.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: -4,
			constitutional_monarchy_discontent: 3,
			democracy_discontent: 4,
			socialism_discontent: 5,
			communism_discontent: 5
		},
		effects: {
			stability_modifier: -0.02,
			pop_growth_modifier: -0.005,
			reform_desire_gain: 0.04,
			production_efficiency: 0.02,
			building_cost: -0.05
		}
	},
	limited_safety_regulations: {
		name: "Limited Safety Regulations",
		description: "Limited safety regulations will prevent most injures on-site and will help reduce the burden on charities and workers compensation. However, production efficiency will take a modest hit.",

		political_appeasement: {
			absolute_monarchy_discontent: -2,
			fascism_discontent: -1,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: 2,
			socialism_discontent: 3,
			communism_discontent: 4
		},
		effects: {
			reform_desire_gain: 0.02,
			production_efficiency: 0.01,
			tax_efficiency: 0.01
		}
	},
	acceptable_safety_regulations: {
		name: "Acceptable Safety Regulations",
		description: "Acceptable safety regulations are hailed by trade unions as a step towards a comprehensive social safety net, but companies are beginning to fear the overarching role that government is beginning to play in regulation.",

		political_appeasement: {
			absolute_monarchy_discontent: 2,
			fascism_discontent: 4,
			constitutional_monarchy_discontent: -4,
			democracy_discontent: -5,
			socialism_discontent: 1,
			communism_discontent: 1
		},
		effects: {
			stability_modifier: 0.02,
			production_efficiency: -0.02,
			pop_growth_modifier: 0.02,
			reform_desire_gain:-0.02,
			building_cost: 0.1,
			tax_efficiency: 0.04
		}
	},
	excellent_safety_regulations: {
		name: "Excellent Safety Regulations",
		description: "Excellent safety regulations, although widely seen as a gross overreach of power by conservatives and even moderates, is a way to help ensure minimal casualties amongst the workforce, and will help appease those on the left.",

		political_appeasement: {
			absolute_monarchy_discontent: 5,
			fascism_discontent: 6,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: 2,
			socialism_discontent: -7,
			communism_discontent: -7
		},
		effects: {
			stability_modifier: 0.05,
			production_efficiency: -0.05,
			pop_growth_modifier: 0.01,
			reform_desire_gain: -0.05,
			building_cost: 0.15,
			tax_efficiency: 0.1
		}
	}
}
