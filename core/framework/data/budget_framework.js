module.exports = {
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

      if (local_tax.name.toLowerCase().indexOf(tax_name) != -1)
        tax_exists = [true, (!options.return_key) ? local_tax.id : local_tax];
    }

    //Hard match
    for (var i = 0; i < all_taxes.length; i++) {
      var local_tax = config.budget.taxes[all_taxes[i]];

      if (local_tax.name.toLowerCase() == tax_name)
        tax_exists = [true, (!options.return_key) ? local_tax.id : local_tax];
    }

    //If tax still cannot be found by names alone, search by alias
    if (!tax_exists[0]) {
      //Soft match first
      for (var i = 0; i < all_taxes.length; i++) {
        var local_tax = config.budget.taxes[all_taxes[i]];

        for (var x = 0; x < local_tax.aliases.length; x++)
          if (local_tax.aliases.toLowerCase().indexOf(tax_name) != -1)
            tax_exists = [true, (!options.return_key) ? local_tax.id : local_tax];
      }

      //Hard match second
      for (var i = 0; i < all_taxes.length; i++) {
        var local_tax = config.budget.taxes[all_taxes[i]];

        for (var x = 0; x < local_tax.aliases.length; x++)
          if (local_tax.aliases.toLowerCase() == tax_name)
            tax_exists = [true, (!options.return_key) ? local_tax.id : local_tax];
      }
    }

    //Return statement
    return (tax_exists[0]) ? tax_exists[1] : undefined;
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
    var is_building_category = (!building_obj && building_category_obj);
    var usr = main.users[actual_id];

    //Check if this value exceeds max_tax; clamp so it can't go negative
    amount = Math.max(amount, 0);
    amount = Math.min(amount, usr.modifiers.max_tax); //Default maximum for custom taxes

    //Check if building category is valid
    if (is_building_category || building_obj) {
      if (building_obj) {
        //Impose tax on building
        usr.custom_taxes[`${building_id}-tax`] = amount;

        return [true, `**${(building_obj.name) ? building_obj.name : building_name}** tax has been set to **${printPercentage(amount)}**.`];
      } else if (is_building_category) {
        usr.custom_taxes[`${category_id}-category_tax`] = amount;

        return [true, `**${(category_obj.name) ? category_obj.name : category_id}** Industry tax has been set to **${printPercentage(amount)}**.`];
      }
    } else {
      return [false, `No building category/building by the name **${building_name}** could be found!`];
    }
  }
};
