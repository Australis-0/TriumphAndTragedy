config.buildings.subsistence = {
  hidden: true,

  //Urban subsistence
  urban_subsistence: {
    name: "Informal Markets",
    singular: "Informal Market",
    subsistence_building: true,

    allowed_classes: ["lower", "middle"],
    limit: {
      terrain_category: "urban"
    },
    wages: {
      affordability: "giffen-mean" //Spliced by - so that categories can use _
    }
  },

  //Rural subsistence
  rural_subsistence: {
    name: "Subsistence Agriculture",
    singular: "Subsistence Farm",

    allowed_classes: ["lower", "middle"],
    limit: {
      terrain_category: "rural"
    },
    wages: {
      affordability: "giffen-mean"
    }
  }
};