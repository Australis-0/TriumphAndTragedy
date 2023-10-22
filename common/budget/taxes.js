config.budget.taxes = {
  //Global taxes
  corporate_tax: {
    name: "Corporate Tax",
    aliases: ["company tax"],

    capacity_id: "max_tax"
  },

  //Duties - These are equivalent to sales taxes
  upper_duties_tax: {
    name: "Upper Duties Tax",
    aliases: ["upper duty tax"],

    capacity_id: "upper_duties_max_tax"
  },
  middle_duties_tax: {
    name: "Middle Duties Tax",
    aliases: ["middle duty tax"],

    capacity_id: "middle_duties_max_tax"
  },
  lower_duties_tax: {
    name: "Lower Duties Tax",
    aliases: ["lower duty tax"],

    capacity_id: "lower_duties_max_tax"
  },

  //Income taxes
  upper_income_tax: {
    name: "Upper Income Tax",

    capacity_id: "upepr_income_max_tax"
  },
  middle_income_tax: {
    name: "Middle Income Tax",

    capacity_id: "middle_duties_max_tax"
  },
  lower_income_tax: {
    name: "Lower Income Tax",

    capacity_id: "lower_duties_max_tax"
  }
};
