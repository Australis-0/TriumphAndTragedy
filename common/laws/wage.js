config.reforms.wage = {
  name: "Minimum Wage",

  no_minimum_wage: {
    name: "No Minimum Wage",
	  description: "Proponents of no minimum wage believe that countries without a minimum wage will see increased economic growth as smaller businesses can afford to hire more workers.",

    political_appeasement: {
			absolute_monarchy_discontent: -5,
			fascism_discontent: -5,
			constitutional_monarchy_discontent: 2,
			democracy_discontent: 2,
			socialism_discontent: 5,
			communism_discontent: 7
		},
    effects: {
			stability_modifier: -0.05,
			tax_efficiency: -0.03,
			production_efficiency: -0.05,
			research_efficiency: 0.02,
			building_cost: -0.05,
			rgo_throughput: 0.02
		}
 	},
  trinket_minimum_wage: {
  	name: "Trinket Minimum Wage",
  	description: "A trinket minimum wage can be used to help satisfy the workers of this country whilst keeping corporate regulations minimal. However, workers won't be oblivious to this, and trade unions will likely continue to attempt to push for higher minimum wages.",

    political_appeasement: {
  		absolute_monarchy_discontent: -3,
  		fascism_discontent: -3,
  		constitutional_monarchy_discontent: 3,
  		democracy_discontent: 3,
  		socialism_discontent: 2,
  		communism_discontent: 2
		},
    effects: {
  		stability_modifier: -0.03,
  		tax_efficiency: -0.02,
  		production_efficiency: -0.04,
  		research_efficiency: 0.05,
  		building_cost: -0.03,
  		rgo_throughput: 0.02
    }
	},
  low_minimum_wage: {
  	name: "Low Minimum Wage",
  	description: "Low minimum wages wil help reduce worker discontent, but will also be seen as a step towards more regulationist policies in our country.",

    political_appeasement: {
    	absolute_monarchy_discontent: -1,
    	fascism_discontent: -2,
    	constitutional_monarchy_discontent: 0,
    	democracy_discontent: 0,
    	socialism_discontent: 2,
    	communism_discontent: 3
  	},
    effects: {
    	stability_modifier: -0.01,
    	production_efficiency: -0.02
  	}
  },
  acceptable_minimum_wage: {
  	name: "Acceptable Minimum Wage",
  	description: "Acceptable minimum wages, whilst decreasing our support amongst more conservative members of society, is seen as a widely needed reform by trade unions and those on the left of the political spectrum. It is also likely to impact small businesses.",

    political_appeasement: {
  		absolute_monarchy_discontent: 3,
  		fascism_discontent: 2,
  		constitutional_monarchy_discontent: -1,
  		democracy_discontent: -1,
  		socialism_discontent: 4,
  		communism_discontent: 3
		},
    effects: {
  		stability_modifier: 0.02,
  		tax_efficiency: 0.03,
  		production_efficiency: 0.02,
  		research_efficiency: -0.01,
  		building_cost: 0.05,
  		unit_cost: 0.05,
  		training_cost: 0.05,
  		rgo_throughput: -0.03
    }
	},

  good_minimum_wage: {
  	name: "Good Minimum Wage",
  	description: "A good minimum wage, or as critics are calling it, a 'lavish minimum wage', is likely to increase stability and lower discontent on the left, but will also increase building costs and unit upkeep, although tax efficiency will also go up as consumer spending increases.",

    political_appeasement: {
  		absolute_monarchy_discontent: 5,
  		fascism_discontent: 4,
  		constitutional_monarchy_discontent: 2,
  		democracy_discontent: 3,
  		socialism_discontent: -7,
  		communism_discontent: -6
		},
    effects: {
			stability_modifier: 0.05,
			tax_efficiency: 0.05,
			production_efficiency: 0.04,
			research_efficiency: -0.06,
			building_cost: 0.10,
			unit_cost: 0.08,
			training_cost: 0.06,
			rgo_throughput: -0.05
		}
	}
};
