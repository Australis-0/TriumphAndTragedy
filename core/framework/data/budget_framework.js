module.exports = {
  //getForeignAidObject() - Fetches foreign aid by returning a map of User IDs to amount being sent
  getForeignAidObject: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var foreign_aid_obj = {};
    var usr = main.users[actual_id];

    var all_auto_trades = Object.keys(usr.auto_trades);

    for (var i = 0; i < all_auto_trades.length; i++) {
      var local_auto_trade = usr.auto_trades[all_auto_trades[i]];

      if (local_auto_trade.good_type == "money")
        modifyValue(foreign_aid_obj, local_auto_trade.target, local_auto_trade.amount);
    }

    //Return statement
    return foreign_aid_obj;
  },

  //Fetches user income before production costs
  /*
    getIncome() - Fetches user income before production costs
    options: {
      return_actual_income: true/false, - Optional. Whether to return the actual income. False by default

      include_subsidies: true/false, - Optional. Whether to include building subsidies. False by default
      exclude_war_reparations: true/false - Optional. Whether to exclude war reparations. False by default
    }
  */
  getIncome: function (arg0_user, arg1_production, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_production = arg1_production;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var calculated_income = 0;
    var tax_obj = getTotalTaxObject(user_id);
    var usr = (typeof user_id != "object") ? main.users[actual_id] : user_id;

    //options.return_actual_income guard clause
    if (options.return_actual_income) {
      var user_expenditures = getTotalExpenditure(user_id);
      var user_revenue = getTotalRevenue(user_id);

      //Return statement
      return [
        user_revenue[0] - user_expenditures[0],
        user_revenue[1] - user_expenditures[1]
      ];
    }

    //Safeguard virtual_user arguments
    if (typeof user_id == "object")
      user_id = usr.id;

    //Declare local tracker variables
    var civilian_actions = Math.ceil(usr.actions*usr.modifiers.civilian_actions);

    //Regular error trapping just in case!
    try {
      var total_production = (!raw_production) ? getProduction(user_id) : raw_production;

      //Maintenance Costs (Buildings, Units)
      {
        var total_maintenance = [
          (total_production.money_upkeep) ? total_production.money_upkeep[0] : 0,
          (total_production.money_upkeep) ? total_production.money_upkeep[1] : 0
        ].sort(function (a, b) { return a - b });

        //Total revenue
        calculated_income = module.exports.getRevenue(user_id, total_production);

        //Unit upkeep costs
        calculated_income = [
          calculated_income[0] - getUnitUpkeep(user_id),
          calculated_income[1] - getUnitUpkeep(user_id)
        ];
      }

      //War Reparations
      {
        if (!options.exclude_war_reparations) {
          var war_reparations = getWarReparations(user_id, [
            calculated_income - total_maintenance[0],
            calculated_income - total_maintenance[1]
          ]);

          var all_war_reparations = Object.keys(war_reparations);

          for (var i = 0; i < all_war_reparations.length; i++) {
            var local_amount = war_reparations[all_war_reparations[i]];
            var local_recipient = main.users[all_war_reparations[i]];

            total_maintenance[0] += local_amount;
            total_maintenance[1] += local_amount;
          }
        }
      }

      //Subsidies
      {
        if (options.include_subsidies) {
          var user_subsidies = getTotalSubsidies(user_id);

          calculated_income[0] += returnSafeNumber(user_subsidies);
          calculated_income[1] += returnSafeNumber(user_subsidies);
        }
      }

      //Taxes (Last turn)
      {
        //Add everything in usr.trackers.tax to income
        var tax_revenue = returnSafeNumber(tax_obj.revenue);

        calculated_income[0] += tax_revenue;
        calculated_income[1] += tax_revenue;
      }

      return [
        calculated_income[0] - total_maintenance[1],
        calculated_income[1] - total_maintenance[0]
      ];
    } catch (e) {
      log.error(`getIncome() ran into an error whilst processing User ID: ${user_id}: ${e}.`);
      console.log(e);
    }
  },

  getRevenue: function (arg0_user, arg1_production) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_production = arg1_production;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var calculated_revenues = [0, 0];
    var usr = (typeof user_id != "object") ? main.users[actual_id] : user_id;

    //Safeguard virtual_user arguments
    if (typeof user_id == "object")
      user_id = usr.id;

    //Declare local tracker variables
    var civilian_actions = Math.ceil(usr.actions*usr.modifiers.civilian_actions);

    try {
      var total_production = (!raw_production) ? getProduction(user_id) : raw_production;

      //Add actions
      var gained_actions = (total_production.actions) ?
        total_production.actions : [0, 0];

      for (var i = 0; i < gained_actions.length; i++)
        calculated_revenues[i] = Math.ceil(
            ((usr.actions + gained_actions[i]) - civilian_actions)
          *config.defines.economy.money_per_action
          *usr.corporate_tax
          *usr.modifiers.tax_efficiency
        );

      //Return statement
      return calculated_revenues;
    } catch (e) {
      log.error(`getIncome() ran into an error whilst processing User ID: ${user_id}: ${e}.`);
      console.log(e);
    }
  },

  /*
    getTax() - Returns a tax object/key based on options.
    options: {
      return_key: true/false - Whether to return a key or object. False by default
    }
  */
  getTax: function (arg0_tax_name, arg1_options) {
    //Convert from parameters
    var tax_name = arg0_tax_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_taxes = Object.keys(config.budget.taxes);
    var tax_exists = [false, ""];

    //Guard clause for verbatim key
    if (config.budget.taxes[tax_name])
      return (!options.return_key) ? config.budget.taxes[tax_name] : tax_name;

    //Soft match
    for (var i = 0; i < all_taxes.length; i++) {
      var local_tax = config.budget.taxes[all_taxes[i]];

      if (local_tax.name)
        if (local_tax.name.toLowerCase().indexOf(tax_name) != -1)
          tax_exists = [true, (!options.return_key) ? local_tax : local_tax.id];
    }

    //Hard match
    for (var i = 0; i < all_taxes.length; i++) {
      var local_tax = config.budget.taxes[all_taxes[i]];

      if (local_tax.name)
        if (local_tax.name.toLowerCase() == tax_name)
          tax_exists = [true, (!options.return_key) ? local_tax : local_tax.id];
    }

    //If tax still cannot be found by names alone, search by alias
    if (!tax_exists[0]) {
      //Soft match first
      for (var i = 0; i < all_taxes.length; i++) {
        var local_tax = config.budget.taxes[all_taxes[i]];

        if (local_tax.aliases)
          for (var x = 0; x < local_tax.aliases.length; x++)
            if (local_tax.aliases[x].toLowerCase().indexOf(tax_name) != -1)
              tax_exists = [true, (!options.return_key) ? local_tax : local_tax.id];
      }

      //Hard match second
      for (var i = 0; i < all_taxes.length; i++) {
        var local_tax = config.budget.taxes[all_taxes[i]];

        if (local_tax.aliases)
          for (var x = 0; x < local_tax.aliases.length; x++)
            if (local_tax.aliases[x].toLowerCase() == tax_name)
              tax_exists = [true, (!options.return_key) ? local_tax : local_tax.id];
      }
    }

    //Return statement
    return (tax_exists[0]) ? tax_exists[1] : undefined;
  },

  /*
    getTaxCost() - Returns the cost of a user's tax, whether custom or not.
    options: {
      custom_tax: true/false - Whether the tax imposed is custom or not
    },

    Returns: {
      political_capital: 15 - Cost in terms of Political Capital per turn. Ceilinged. Cannot go negative.
    }
  */
  getTaxCost: function (arg0_user, arg1_tax_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var tax_name = arg1_tax_name;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var base_tax_pc_cost = config.defines.economy.base_tax_pc_cost;
    var tax_cost = {};
    var usr = (typeof user_id != "object") ? main.users[actual_id] : user_id;

    //Dual handler for custom_tax
    if (options.custom_tax) {
      if (usr.custom_taxes[tax_name]) {
        var base_pc_cost = usr.custom_taxes[tax_name]*100;
        var building_share = 0; //Check building share as a scalar to pc_cost
        var custom_tax_level = usr.custom_taxes[tax_name];
        var pc_cost = base_pc_cost*(1/usr.modifiers.tax_efficiency);

        //Fetch building_share; by category/building amount if applicable
        if (tax_name.endsWith("-category_tax")) {
          building_share = getBuildingCategoryShare(user_id, tax_name.replace("-category_tax", ""));
        } else if (tax_name.endsWith("-tax")) { //Building tax handler
          building_share = getBuildingShare(user_id, tax_name.replace("-tax", ""));
        }

        pc_cost = pc_cost*building_share;
      }
    } else {
      var tax_obj = module.exports.getTax(tax_name);

      var base_pc_cost = base_tax_pc_cost*(usr[tax_obj.id]*100);
      var pc_cost = base_pc_cost*Math.max(1/usr.modifiers.tax_efficiency, 1); //If tax efficiency is over 100%, decrease PC cost

      tax_cost.political_capital = Math.ceil(pc_cost);
    }

    //Error-proof this in case of null
    if (!tax_cost.political_capital)
      tax_cost.political_capital = 0;

    //Return statement
    return tax_cost;
  },

  /*
    getTotalExpenditure() - Fetches the total expenditures of a certain user.
    options: {
      production_obj: production_obj, - Optional. Optimisation parameter
      return_object: true/false - Optional. Whether to return an object or not. False by default
    }
  */
  getTotalExpenditure: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var user_production = (!options.production_obj) ? getProductionObject(user_id) : options.production_obj;
    var usr = main.users[actual_id];

    //Auto-Trades
    var all_auto_trades = Object.keys(usr.auto_trades);
    var auto_trade_expenses = 0;

    for (var i = 0; i < all_auto_trades.length; i++) {
      var local_auto_trade = usr.auto_trades[all_auto_trades[i]];

      if (local_auto_trade.good_type == "money")
        auto_trade_expenses += local_auto_trade.amount;
    }

    auto_trade_expenses = [auto_trade_expenses, auto_trade_expenses];

    //Building Maintenance
    var building_expenses = 0;

    if (user_production.money_upkeep)
      building_expenses = user_production.money_upkeep;

    //Building Reopen Costs/Subsidies
    var total_subsidies = getTotalSubsidies(user_id);
    total_subsidies = [total_subsidies, total_subsidies];

    //Unit Maintenance
    var unit_upkeep = getUnitUpkeep(user_id);
    unit_upkeep = [unit_upkeep, unit_upkeep];

    //War Reparations
    var war_reparations = getWarReparations(user_id);
    var war_reparations_total = [0, 0];

    var all_war_reparations = Object.keys(war_reparations);

    for (var i = 0; i < all_war_reparations.length; i++) {
      var local_war_reparation = war_reparations[all_war_reparations[i]];

      war_reparations_total = modifyRange(war_reparations_total, [local_war_reparation[0], local_war_reparation[1]]);
    }

    war_reparations = war_reparations_total;

    //Calculate expenditures
    var expenditures = [0, 0];

    expenditures = modifyRange(expenditures, auto_trade_expenses);
    expenditures = modifyRange(expenditures, building_expenses);
    expenditures = modifyRange(expenditures, total_subsidies);
    expenditures = modifyRange(expenditures, unit_upkeep);
    expenditures = modifyRange(expenditures, war_reparations);

    //Return statement
    return (!options.return_object) ? expenditures : {
      expenditures: expenditures,

      auto_trade_expenses: auto_trade_expenses,
      building_expenses: building_expenses,
      subsidies: total_subsidies,
      war_reparations: war_reparations
    };
  },

  /*
    getTotalRevenue() - Fetches the total revenue of a certain user.
    options: {
      production_obj: production_obj, - Optional. Optimisation parameter
      return_object: true/false - Optional. Whether to return an object or not. False by default
    }
  */
  getTotalRevenue: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var user_production = (!options.production_obj) ? getProductionObject(user_id) : options.production_obj;
    var usr = main.users[actual_id];

    var building_production = [0, 0];
    var import_revenue = [0, 0];
    var revenue = [0, 0];

    //Building production
    if (user_production.money)
      building_production = modifyRange(building_production, user_production.money);

    //Imports
    for (var i = 0; i < all_users.length; i++) {
      var local_user = main.users[all_users[i]];

      var all_exports = Object.keys(local_user.trades);

      for (var x = 0; x < all_exports.length; x++) {
        var local_export = local_user.trades[all_exports[x]];

        if (local_export.good_type)
          if (local_export.good_type == "money")
            if (local_export.target == actual_id && local_export.duration <= 1)
              import_revenue = modifyRange(import_revenue, local_export.amount);
      }
    }

    //Tax Income
    var tax_revenue = getObjectSum(usr.trackers.tax);
    tax_revenue = [tax_revenue, tax_revenue];

    //Calculate revenue
    revenue = modifyRange(revenue, building_production);
    revenue = modifyRange(revenue, import_revenue);
    revenue = modifyRange(revenue, tax_revenue);

    //Return statement
    return (!options.return_object) ? revenue : {
      revenue: revenue,

      building_revenue: building_production,
      import_revenue: import_revenue,
      tax_revenue: tax_revenue
    };
  },

  /*
    getTotalTaxObject() - Returns an object of all relevant trackers to taxes.
    Returns: {
      political_capital: 15, - The amount of political capital expended.
      revenue: 0 - The amount of total tax revenue.
    }
  */
  getTotalTaxObject: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var tax_object = {};
    var usr = (typeof user_id != "object") ? main.users[actual_id] : user_id;

    var all_taxes = Object.keys(config.budget.taxes);
    var all_custom_taxes = Object.keys(usr.custom_taxes);

    //Iterate over all_taxes. These are conventional taxes
    for (var i = 0; i < all_taxes.length; i++) {
      var local_revenue = returnSafeNumber(usr.trackers.tax[all_taxes[i]]);
      var local_tax = usr[all_taxes[i]];
      var local_tax_cost = module.exports.getTaxCost(user_id, all_taxes[i]);

      modifyValue(tax_object, "revenue", local_revenue);
      tax_object = mergeObjects(tax_object, local_tax_cost);

      if (local_tax != 0)
        modifyValue(tax_object, "instituted_taxes", 1);
    }

    //Iterate over all_custom_taxes
    for (var i = 0; i < all_custom_taxes.length; i++) {
      var local_revenue = returnSafeNumber(usr.trackers.tax[all_taxes[i]]);
      var local_tax = usr.custom_taxes[all_custom_taxes[i]];
      var local_tax_cost = module.exports.getTaxCost(user_id, all_taxes[i], { custom_tax: true });

      modifyValue(tax_object, "revenue", local_revenue);
      tax_object = mergeObjects(tax_object, local_tax_cost);

      if (local_tax != 0)
        modifyValue(tax_object, "instituted_taxes", 1);
    }

    //Error-proof this in case of null
    if (!tax_object.instituted_taxes) tax_object.instituted_taxes = 0;
    if (!tax_object.revenue) tax_object.revenue = 0;

    //Return statement
    return tax_object;
  },

  /*
    moveCustomTax() - Reorders taxes in a tax object.
    options: {
      direction: "up"/"down", - Whether taxes are reordered up or down
      amount: 3 - How many positions of try and reorganise units by
    }
  */
  moveCustomTax: function (arg0_user, arg1_tax_id, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var index = parseInt(arg1_tax_id) - 1;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_taxes = Object.keys(usr.custom_taxes);
    var current_taxes = usr.custom_taxes;

    //Guard clauses
    if (all_taxes.length == 0)
      return [false, `You have no custom industry taxes set to reorganise!`];
    if (isNaN(index))
      return [false, `The index specified must be a valid number!`];

    //Check with index
    if (index > 0) {
      if (all_taxes[index]) {
        var new_taxes = {};
        var split_key = all_taxes[index].split("-");

        //Move element in current_taxes; up is towards index 0, down is towards last index
        var new_index = (options.direction == "up") ?
          Math.max(index - options.amount, 0) :
          Math.min(index + options.amount, all_taxes.length - 1);

        all_taxes = moveElement(all_taxes, index, new_index);

        //Begin parsing taxes
        for (var i = 0; i < all_taxes.length; i++)
          new_taxes[all_taxes[i]] = current_taxes[all_taxes[i]];

        //Set taxes
        usr.custom_taxes = new_taxes;

        //Update UI
        if (game_obj.page == "custom_taxes")
          printCustomTaxes(user_id, main.interfaces[game_obj.middle_embed.id].page);

        return [true, `${parseTaxName(new_taxes[new_index])} were moved to the **${ordinalise(new_index + 1)}** section of the Tax Code.`];
      } else {
        return [false, `No industry or building tax could be found indexed with this ID.`];
      }
    } else {
      return [false, `There are no taxes with negative ID's!`];
    }
  },

  removeCustomTax: function (arg0_user, arg1_index) {
    //Convert from parameters
    var user_id = arg0_user;
    var index = parseInt(arg1_index);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_taxes = Object.keys(usr.custom_taxes);

    //Guard clause
    if (all_taxes.length == 0)
      return [false, `You have no custom industry taxes set to remove!`];

    //Check with index
    if (index > 0) {
      if (all_taxes[index]) {
        var old_tax_id = JSON.parse(JSON.stringify(all_taxes[index]));

        delete usr.custom_taxes[all_taxes[index]];

        //Update UI
        if (game_obj.page == "custom_taxes")
          printCustomTaxes(user_id, main.interfaces[game_obj.middle_embed.id].page);

        return [true, `${parseTaxName(old_tax_id)} have been abolished.`];
      } else {
        return [false, `No industry or building tax could be found indexed with this ID.`];
      }
    } else {
      return [false, `There are no taxes with negative ID's!`];
    }
  },

  setCustomTax: function (arg0_user, arg1_building_name, arg2_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_name = arg1_building_name;
    var amount = returnSafeNumber(arg2_amount);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_id = getBuilding(building_name, { return_key: true });
    var building_obj = getBuilding(building_name);
    var category_id = getBuildingCategory(building_name, { return_key: true });
    var category_obj = getBuildingCategory(building_name);
    var game_obj = getGameObject(user_id);
    var is_building_category = (category_obj);
    var usr = main.users[actual_id];

    //Check if this value exceeds max_tax; clamp so it can't go negative
    amount = Math.max(amount, 0);
    amount = Math.min(amount, usr.modifiers.max_tax); //Default maximum for custom taxes

    //Check if building category is valid
    if (is_building_category || building_obj) {
      var category_obj = (is_building_category) ?
        category_obj : config.buildings[lookup.all_buildings_categories[building_obj.id]];

      //Check if category_obj is taxable
      if (category_obj.taxable) {
        if (building_obj && !category_obj) {
          //Impose tax on building
          usr.custom_taxes[`${building_id}-tax`] = amount;

          //Update UI
          if (game_obj.page == "custom_taxes")
            printCustomTaxes(user_id, main.interfaces[game_obj.middle_embed.id].page);

          return [true, `**${(building_obj.name) ? building_obj.name : building_name}** tax has been set to **${printPercentage(amount)}**.`];
        } else if (category_obj) {
          usr.custom_taxes[`${category_id}-category_tax`] = amount;

          //Update UI
          if (game_obj.page == "custom_taxes")
            printCustomTaxes(user_id, main.interfaces[game_obj.middle_embed.id].page);

          return [true, `**${(category_obj.name) ? category_obj.name : category_id}** Industry tax has been set to **${printPercentage(amount)}**.`];
        }
      } else {
        return [false, `The **${(category_obj.name) ? category_obj.name : lookup.all_buildings_categories[building_obj.id]}** category isn't taxable!`];
      }
    } else {
      return [false, `No building category/building by the name **${building_name}** could be found!`];
    }
  }
};
