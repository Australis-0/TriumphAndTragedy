config.reforms.workhours = {
	name: "Maximum Workhours",
	unlimited_work_day: {
		name: "Unlimited Work Day",
		description: "No one enjoys this schedule, but proponents of laissez-faire believe that markets will self-adjust working hours, as workers choose which jobs to work at. However, critics point out that all workplaces have similar working hours.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: -1,
			constitutional_monarchy_discontent: 5,
			democracy_discontent: 6,
			socialism_discontent: 8,
			communism_discontent: 8
		},
		effects: {
			stability_modifier: -0.07,
			tax_efficiency: -0.05,
			production_efficiency: 0.2,
			research_efficiency: -0.1,
			reform_desire_gain: 0.05,
			rgo_throughput: 0.1
		}
	},
	fourteen_hour_work_day: {
		name: "14 Hour Work Day",
		description: "The introduction of a limited work day was hailed as a good first step, but regulationists are still concerned, and laissez-faire economists believe the government is meddling too much in private business.",

		political_appeasement: {
			absolute_monarchy_discontent: -2,
			fascism_discontent: -2,
			constitutional_monarchy_discontent: 3,
			democracy_discontent: 3,
			socialism_discontent: 1,
			communism_discontent: 1
		},
		effects: {
			stability_modifier: -0.05,
			tax_efficiency: -0.02,
			production_efficiency: 0.1,
			reform_desire_gain: 0.02,
			rgo_throughput: 0.05
		}
	},
	twelve_hour_work_day: {
		name: "12 Hour Work Day",
		description: "A 12-hour workday, whilst currently seen as acceptable, is likely to fail to placate workers in the long-term, and laissez-faire economists are increasingly claiming that our policies go overboard.",

		political_appeasement: {
			absolute_monarchy_discontent: -3,
			fascism_discontent: -2,
			constitutional_monarchy_discontent: 2,
			democracy_discontent: 5,
			socialism_discontent: 3,
			communism_discontent: 2
		},
		effects: {
			stability_modifier: -0.03,
			research_efficiency: 0.05,
			production_efficiency: 0.1,
			reform_desire_gain: 0.01,
			rgo_throughput: 0.05
		}
	},
	ten_hour_work_day: {
		name: "10 Hour Work Day",
		description: "A 10-hour workday is likely to meet the relatively modern standards that our workers are now demanding for their workday, but also to upset deregulationists.",

		political_appeasement: {
			absolute_monarchy_discontent: 2,
			fascism_discontent: 3,
			constitutional_monarchy_discontent: 1,
			democracy_discontent: 1,
			socialism_discontent: -4,
			communism_discontent: -3
		},
		effects: {
			research_efficiency: 0.1,
			production_efficiency: 0.05,
			rgo_throughput: 0.05
		}
	},
	eight_hour_work_day: {
		name: "8 Hour Work Day",
		description: "A comfortable eight hour workday is likely to allow leisure time for our workers, and therefore, will also increase consumer spending, especially when coupled with better minimum wages. Critics, however, point out that it will lower our production efficiency.",

		political_appeasement: {
			absolute_monarchy_discontent: 7,
			fascism_discontent: 5,
			constitutional_monarchy_discontent: 2,
			democracy_discontent: 3,
			socialism_discontent: -8,
			communism_discontent: -5
		},
		effects: {
			stability_modifier: 0.05,
			research_efficiency: 0.15,
			tax_efficiency: 0.03,
			production_efficiency: -0.05,
			rgo_throughput: -0.05
		}
	}
}
