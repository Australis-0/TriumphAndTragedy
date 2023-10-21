module.exports = {
  /*
    getAllReforms() - Fetches an object/key list of all laws.
    options: {
      return_names: true/false - Whether or not to return the keys instead
    }
  */
  getAllReforms: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_reform_categories = Object.keys(config.reforms);
    var all_reforms = [];

    //Iterate over all_reform_categories and push their respectivie included objects into array
    for (var i = 0; i < all_reform_categories.length; i++) {
      var local_reform_category = config.reforms[all_reform_categories[i]];
      var local_reforms = Object.keys(local_reform_category);

      for (var x = 0; x < local_reforms.length; x++)
        if (!reserved.reform_keys.includes(local_reforms[x]))
          all_reforms.push(
            (!options.return_names) ?
              local_reform_category[local_reforms[x]] :
              local_reforms[x]
          );
    }

    //Return statement
    return all_reforms;
  },

  /*
    getReform() - Returns the true object/key of a reform.
    options: {
      return_key: true/false - Whether or not to return the key of the law instead.
    }
  */
  getReform: function (arg0_name, arg1_options) {
    //Convert from parameters
    var reform_name = arg0_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_reform_categories = Object.keys(config.reforms);
    var reform_exists = [false, ""];

    //Reform key, soft match
    for (var i = 0; i < all_reform_categories.length; i++) {
      var local_reform_category = config.reforms[all_reform_categories[i]];
      var local_reforms = Object.keys(local_reform_category);

      for (var x = 0; x < local_reforms.length; x++)
        if (!reserved.reform_keys.includes(local_reforms[x]))
          if (local_reforms[x].toLowerCase().indexOf(reform_name) != -1)
            reform_exists = [true, (!options.return_key) ? local_reform_category[local_reforms[x]] : local_reforms[x]];
    }

    //Reform key, hard match
    for (var i = 0; i < all_reform_categories.length; i++) {
      var local_reform_category = config.reforms[all_reform_categories[i]];
      var local_reforms = Object.keys(local_reform_category);

      for (var x = 0; x < local_reforms.length; x++)
        if (!reserved.reform_keys.includes(local_reforms[x]))
          if (local_reforms[x].toLowerCase() == reform_name)
            reform_exists = [true, (!options.return_key) ? local_reform_category[local_reforms[x]] : local_reforms[x]];
    }

    if (!reform_exists[0]) {
      //Reform name, soft search
      for (var i = 0; i < all_reform_categories.length; i++) {
        var local_reform_category = config.reforms[all_reform_categories[i]];
        var local_reforms = Object.keys(local_reform_category);

        for (var x = 0; x < local_reforms.length; x++)
          if (!reserved.reform_keys.includes(local_reforms[x]))
            if (local_reform_category[local_reforms[x]].name.toLowerCase().indexOf(reform_name) != -1)
              reform_exists = [true, (!options.return_key) ? local_reform_category[local_reforms[x]] : local_reforms[x]];
      }

      //Reform name, hard search
      for (var i = 0; i < all_reform_categories.length; i++) {
        var local_reform_category = config.reforms[all_reform_categories[i]];
        var local_reforms = Object.keys(local_reform_category);

        for (var x = 0; x < local_reforms.length; x++)
          if (!reserved.reform_keys.includes(local_reforms[x]))
            if (local_reform_category[local_reforms[x]].name.toLowerCase() == reform_name)
              reform_exists = [true, (!options.return_key) ? local_reform_category[local_reforms[x]] : local_reforms[x]];
      }
    }

    //Return statement
    return (reform_exists[0]) ? reform_exists[1] : undefined;
  },

  //Returns all reform categories based on order (if it exists)
  getReformCategories: function () {
    //Declare local instance variables
    var all_reform_categories = Object.keys(config.reforms);
    var reform_categories = [];
    var no_order_cache = [];

    //Iterate over all reform categories
    for (var i = 0; i < all_reform_categories.length; i++) {
      var local_reform_category = config.reforms[all_reform_categories[i]];

      //Push to either no_order_cache or reform_categories
      if (local_reform_category.order) {
        if (!reform_categories[local_reform_category.order-1]) {
          reform_categories[local_reform_category.order-1] = all_reform_categories[i];
        } else {
          log.error(`${all_reform_categories[i]} has an invalid order number! .order ${local_reform_category.order-1} is already occupied by ${reform_categories[local_reform_category.order-1]}!\n\nCheck common/laws for more information on resolving this error.`);
        }
      } else {
        no_order_cache.push(all_reform_categories[i]);
      }
    }

    //Push no_order_cache onto end
    for (var i = 0; i < no_order_cache.length; i++)
      reform_categories.push(no_order_cache[i]);

    //Return statement
    return reform_categories;
  },

  /*
    getReformCategory() - Returns back a reform_category object/key based on options.
    options: {
      return_key: true/false - Whether or not to return back the reform category key instead of object. False by default
    }
  */
  getReformCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var reform_category_name = arg0_name.trim().toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_reform_categories = Object.keys(config.reforms);
    var all_processed_reform_categories = [];
    var reform_category_exists = [false, ""]; //[reform_category_exists, reform_category_obj];

    //Initialise all_processed_reform_categories
    for (var i = 0; i < all_reform_categories.length; i++)
      (!config.reforms[all_reform_categories[i]].name) ?
        all_processed_reform_categories.push(parseString(all_reform_categories[i])) :
        all_processed_reform_categories.push(config.reforms[all_reform_categories[i]].name);

    //Fetch config object
    if (config.reforms[reform_category_name]) {
      return (!options.return_key) ? config.reforms[reform_category_name] : reform_category_name;
    } else {
      //If the reform category cannot be found verbatim, start a soft-hard search by parsed strings
      //Soft match first
      for (var i = 0; i < all_processed_reform_categories.length; i++)
        if (all_processed_reform_categories[i].toLowerCase().indexOf(reform_category_name) != -1)
          reform_category_exists = [true, (!options.return_key) ? config.reforms[all_reform_categories[i]] : all_reform_categories[i]];

      //Hard match second
      for (var i = 0; i < all_processed_reform_categories.length; i++)
        if (all_processed_reform_categories[i].toLowerCase() == reform_category_name)
          reform_category_exists = [true, (!options.return_key) ? config.reforms[all_reform_categories[i]] : all_reform_categories[i]];

      //Return statement after soft-hard search
      return (reform_category_exists[0]) ? reform_category_exists[1] : undefined;
    }
  },

  /*
    getReformCategoryFromReform() - Returns back the reform_category object/key based on the specified reform name. Only supports raw reform names
    options: {
      return_key: true/false - Whether or not to return back the reform category key instead of object. False by default
    }
  */
  getReformCategoryFromReform: function (arg0_name, arg1_options) {
    //Convert from parameters
    var reform_name = arg0_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_reform_categories = Object.keys(config.reforms);
    var reform_category_exists = [false, ""]; //[reform_category_exists, category_name];

    for (var i = 0; i < all_reform_categories.length; i++)
      if (Object.keys(config.reforms[all_reform_categories[i]]).includes(reform_name))
        reform_category_exists = [true, (!options.return_key) ? config.reforms[all_reform_categories[i]] : all_reform_categories[i]];

    //Return statement
    return (reform_category_exists[0]) ? reform_category_exists[1] : undefined;
  },

  //getReformsInCategory() - Returns back an array of reform keys inside of a given category based on order.
  getReformsInCategory: function (arg0_name) {
    //Convert from parameters
    var raw_reform_category = arg0_name.trim().toLowerCase();

    //Declare local instance variables
    var no_order_cache = [];
    var reform_category = module.exports.getReformCategory(raw_reform_category);
    var reform_list = [];

    //Only proceed if the reform category actually exists
    if (reform_category) {
      var all_reforms_in_category = Object.keys(reform_category);

      //Iterate over all reforms in category
      for (var i = 0; i < all_reforms_in_category.length; i++) {
        var local_reform = reform_category[all_reforms_in_category[i]];

        //Push to either no_order_cache or reform_list
        if (local_reform.order) {
          if (!reform_list[local_reform.order-1]) {
            reform_list[local_reform.order-1] = all_reforms_in_category[i];
          } else {
            log.error(`${all_reforms_in_category[i]} has an invalid order number! .order ${local_reform.order-1} os already occupied by ${reform_list[local_reform.order-1]}!\n\nCheck common/laws for more information on resolving this error.`);
          }
        } else {
          no_order_cache.push(all_reforms_in_category[i]);
        }
      }

      //Push no_order_cache onto end
      for (var i = 0; i < no_order_cache.length; i++)
        if (!["name", "icon", "order"].includes(no_order_cache[i]))
          reform_list.push(no_order_cache[i]);

      //Return statement
      return reform_list;
    } else {
      log.error(`getReformsInCategory() - The reform category specified, ${raw_reform_category}, is nonexistent!`);
    }
  },

  unlockReform: function (arg0_user, arg1_reform_category_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var reform_category = arg1_reform_category_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var reform_category_name = getReformCategory(reform_category, { return_key: true });
    var reform_category_obj = getReformCategory(reform_category);
    var usr = main.users[actual_id];

    //Current reform is decided based on ruling party
    try {
      var all_reforms_in_category = Object.keys(reform_category_obj);
      var chosen_reform = ["", -1000]; //[current_law, political_appeasement]

      for (var i = 0; i < all_reforms_in_category.length; i++)
        if (!all_reforms_in_category[i].includes("name", "icon", "order")) {
          var local_reform = reform_category_obj[all_reforms_in_category[i]];
          var local_reform_appeasement = 0;

          //Set local_reform_appeasement
          if (local_reform.political_appeasement)
            if (local_reform.political_appeasement[usr.government])
              local_reform_appeasement = local_reform.political_appeasement[usr.government];

          //Check political_appeasement
          chosen_reform = (local_reform_appeasement > chosen_reform[1]) ?
            [all_reforms_in_category[i], local_reform_appeasement] :
            chosen_reform;
        }

      //Unlock current chosen_reform
      var reform_obj = getReform(chosen_reform[0]);

      usr.laws[reform_category_name] = chosen_reform[0];

      //Apply effects
      if (reform_obj.effects)
        applyModifiers(user_id, reform_obj.effects);

      //Push reform to available_reforms
      usr.available_reforms.push(reform_category_name);
    } catch (e) {
      log.error(`unlockReform() ran into an error: ${e} whilst trying to unlock reform category ${reform_category}; raw form: ${arg1_reform_category_name}.`);
      log.info(`Chosen Reform dump:`);
      console.log(chosen_reform);
    }
  }
};
