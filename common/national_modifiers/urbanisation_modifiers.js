config.national_modifiers.urbanisation_modifiers = {
  //National modifiers for urbanisation
  agricultural_society: {
    name: "Agricultural Society",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307111105237022/agricultural_society.png",
    icon: "farms",
    description: "With our country being predominantly rural, a large amount of emphasis is still being placed on the production of raw resources - such as food, iron, copper, and wood, at the cost of our nascent industrial base.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile < 0.50 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: 1.00,
      pop_growth_modifier: 0.01,
      production_efficiency: -0.60
    }
  },

  low_urbanisation: {
    name: "Low Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307116889178162/low_urbanisation.png",
    icon: "canals",
    description: "As more and more people have begun moving from their agricultural posts to take up residence in our humble cities, production efficiency has begun to rise at the cost of raw resource production as human capital flight has started to become more noticeable throughout our country.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.50 && urban_pop_percentile < 0.60 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: 0.75,
      production_efficiency: -0.60
    }
  },

  middling_urbanisation: {
    name: "Middling Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307119049252914/middling_urbanisation.png",
    icon: "neighbourhoods",
    description: "Our country has now reached a state of urbanisation where the firm majority of our population are now concentrated in cities, helping forge the tools of industry and commerce as our economy gradually shifts from an agricultural to an industrial one.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.60 && urban_pop_percentile < 0.75 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: 0.50,
      pop_growth_modifier: -0.05,
      production_efficiency: -0.25
    }
  },

  high_urbanisation: {
    name: "High Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307122085937192/very_high_urbanisation.png",
    icon: "suburbs",
    description: "Although much of our citizenry remains in the countryside and raw resource production still makes up the majority of our economy, commercial and industrial interests in cities are beginning to notice that they can take advantage of cheaper labour than before due to the influx of migrants from the countryside, providing a boost to our industry.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.75 && urban_pop_percentile < 0.85 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      research_efficiency: 0.35,
      rgo_throughput: 0.20,
      pop_growth_modifier: -0.10,
      production_efficiency: -0.10,
      tax_efficiency: -0.15
    }
  },

  very_high_urbanisation: {
    name: "Very High Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307115056295957/high_urbanisation.png",
    icon: "flats",
    description: "With the overwhelming majority of our population in cities, raw resource production and the economy of rural areas is beginning to suffer from a demographic imbalance, leading to a tremendous drop in raw resource output.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.85 && urban_pop_percentile < 0.90 &&
        usr.researched_technologies.length >= 150 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -0.60,
      production_efficiency: -0.10,
      research_efficiency: 0.35
    }
  },

  extreme_urbanisation: {
    name: "Extreme Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307113328214096/extreme_urbanisation.png",
    icon: "districts",
    description: "Our country is now extremely urbanised, with over 90% of our population living in cities. People are flocking to join the industry and service sectors of our economies, massively increasing production efficiency at the cost of raw resource production and mining.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.90 && urban_pop_percentile < 0.95 &&
        usr.researched_technologies.length >= 175 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -1.00,
      production_efficiency: 0.50
    }
  },

  a_state_of_cities: {
    name: "A State of Cities",
    image: "https://media.discordapp.net/attachments/829862963485474827/893307109649813544/a_state_of_cities.png",
    icon: "financial_districts",
    description: "With virtually everyone in the country concentrated in the cities, even industry is beginning to suffer as lack of land, congestion, and cheap labour has made our economy less competitive than ever before. The countryside is empty and the fields lay fallow as mass human capital flight takes hold and our nation becomes a globally renowned example in demographic crisis.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile > 0.95 &&
        usr.researched_technologies.length >= 175 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -2.50,
      production_efficiency: -0.50
    }
  },

  //Early Hyperurbanisation Penalties
  early_hyperurbanisation_1: {
    name: "Early Urbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/897184967858217000/early_hyperurbanisation.png",
    icon: "flats",
    description: "Without sufficient resources or technology necessary to sustain such high urban populations, our industry is beginning to lag behind those of other nations as overcrowding and lack of land becomes a serious issue!",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.85 && urban_pop_percentile < 0.90 &&
        usr.researched_technologies.length < 150 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -0.50,
      production_efficiency: -0.50
    }
  },

  early_hyperurbanisation_2: {
    name: "Early Hyperurbanisation",
    image: "https://media.discordapp.net/attachments/829862963485474827/897184967858217000/early_hyperurbanisation.png",
    icon: "flats",
    description: "Without sufficient resources or technology necessary to sustain such high urban populations, our industry is beginning to lag behind those of other nations as overcrowding and lack of land becomes a serious issue! Fires are beginning to overwhelm our meagre fire crews, and on occassion, entire blocks of city have to be blown up to create necessary firebreaks. Disease is also spreading rampant through some of the poorer areas due to poor hygeine and sanitation.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.90 && urban_pop_percentile < 0.95 &&
        usr.researched_technologies.length < 175 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -0.70,
      research_efficiency: -0.60,
      production_efficiency: -0.60,
      pop_growth_modifier: -0.15
    }
  },

  early_hyperurbanisation_3: {
    name: "The Urban Miasma",
    image: "https://media.discordapp.net/attachments/829862963485474827/897184967858217000/early_hyperurbanisation.png",
    icon: "flats",
    description: "With everyone being crowded into urban slums, the fields of the farms fall fallow and disease is rampant. Craftsmen are scurrying to other countries to hide from the grime, the crime, and rivers as pure as the Ganges. No one works in the mines or countryside any longer, and poor peasants that can't afford to leave die on the roadside of plague. Their gravestones will mark their last words (if they are so fortunate): 'Uggghhhhhhhh'.",

    trigger: function (usr) {
      var urban_pop_percentile = usr.demographics.urban_population/usr.demographics.population;

      if (
        urban_pop_percentile >= 0.95 &&
        usr.researched_technologies.length < 175 &&
        usr.provinces > 10
      )
        return true;
    },

    modifiers: {
      rgo_throughput: -3.50,
      production_efficiency: -1.50,
      research_efficiency: -1.00,
      pop_growth_modifier: -0.50
    }
  }
};
