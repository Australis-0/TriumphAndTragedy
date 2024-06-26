module.exports = {
  disperseToSubgoods: function (arg0_good, arg1_amount) {
    //Convert from parameters
    var good_name = arg0_good;
    var value = arg1_amount;

    //Declare local instance variables
    var good_key = (typeof good_name != "object") ? getGood(good_name, { return_key: true }) : good_name;
    var return_obj = {};
    var subgoods = lookup.all_subgoods[good_key];

    var good_obj = lookup.all_goods[good_key];

    if (value != 0) {
      //Distribute goods equally across subgood keys
      var amount = Math.floor(value/subgoods.length);
      var remainder = value - (amount*subgoods.length);

      if (good_obj.type == "category") {
        for (var i = 0; i < subgoods.length; i++) {
          modifyValue(return_obj, subgoods[i], returnSafeNumber(amount));

          if (remainder > 0) {
            modifyValue(return_obj, subgoods[i], 1);
            remainder--;
          } else if (remainder < 0) {
            modifyValue(return_obj, subgoods[i], -1);
            remainder++;
          }
        }
      } else {
        modifyValue(return_obj, good_key, amount);
      }
    }

    //Return statement
    return return_obj;
  },

  getAllGoodNamesLowercase: function () {
    //Declare local instance variables
    var all_goods = Object.keys(lookup.all_goods);
    var good_names = [];

    //Iterate over all_goods
    for (var i = 0; i < all_goods.length; i++) {
      var local_good = lookup.all_goods[all_goods[i]];

      if (local_good)
        good_names.push((local_good.name) ? local_good.name.toLowerCase() : all_goods[i]);
    }

    //Return statement
    return good_names;
  },

  getAllProductionChains: function () {
    //Lookup guard clause
    if (!global.lookup) global.lookup = {};

    //Declare local instance variables
    var all_goods = (lookup.all_goods) ? lookup.all_goods : getGoods({ return_object: true });
    var return_object = {};

    var all_good_keys = Object.keys(all_goods);

    //Iterate over all_good_keys
    for (var i = 0; i < all_good_keys.length; i++) {
      log.debug(`(${i}/${all_good_keys.length}) Processing production chain for `, all_good_keys[i]);

      var local_production_chain = getProductionChain("", all_good_keys[i]);

      return_object[all_good_keys[i]] = local_production_chain;
    }

    //Return statement
    return return_object;
  },

  getAllProductionChainsComplexity: function () {
    //Lookup guard clause
    if (!global.lookup) global.lookup = {};

    //Declare local instance variables
    var all_production_chains = (lookup.all_production) ? lookup.all_production : module.exports.getAllProductionChains();
    var return_object = {};

    var all_good_keys = Object.keys(all_production_chains);

    //Iterate over all_good_keys
    for (var i = 0; i < all_good_keys.length; i++) {
      var local_production_chain = all_production_chains[all_good_keys[i]];

      return_object[all_good_keys[i]] = JSON.stringify(local_production_chain).length;
    }

    //Return statement
    return return_object;
  },

  //getAllSubgoods() - Returns an array of subgood keys
  getAllSubgoods: function (arg0_object) {
    //Convert from parameters
    var local_obj = arg0_object;

    //Declare local instance variables
    var all_keys = Object.keys(local_obj);
    var all_subgoods = [];

    //Iterate over all keys to determine
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = local_obj[all_keys[i]];

      if (!all_subgoods.includes(all_keys[i]))
        if (lookup.all_goods[all_keys[i]])
          all_subgoods.push(all_keys[i]);

      //Add recursive criteria
      if (typeof local_value == "object") {
        var local_subgoods = module.exports.getAllSubgoods(local_value);

        for (var x = 0; x < local_subgoods.length; x++)
          all_subgoods.push(local_subgoods[x]);
      }
    }

    //Return statement
    return all_subgoods;
  },

  getAverageNeedsPrice: function (arg0_category_name, arg1_buy_sell) {
    //Convert from parameters
    var category_name = arg0_category_name;
    var buy_sell = (arg1_buy_sell) ? arg1_buy_sell : "buy";

    //Declare local instance variables
    var all_market_goods = Object.keys(main.market);
    var total_category_goods = 0;
    var total_price = 0;

    //Initialise defaults if undefined
    if (!global.lookup) global.lookup = {};
    if (!lookup.all_goods)
      lookup.all_goods = getGoods({ return_object: true });
    if (!lookup.all_good_names)
      lookup.all_good_names = module.exports.getGoods({ return_names: true });

    //Iterate over lookup.all_good_names
    for (var i = 0; i < lookup.all_good_names.length; i++) {
      var local_good = lookup.all_goods[lookup.all_good_names[i]];

      if (local_good.type)
        if (local_good.type == category_name) {
          var local_market_good = main.market[lookup.all_good_names[i]];
          total_category_goods++;

          if (local_market_good)
            if (buy_sell == "buy") {
              total_price += returnSafeNumber(local_market_good.buy_price);
            } else {
              total_price += returnSafeNumber(local_market_good.sell_price);
            }
        }
    }

    //Return statement
    return total_price/total_category_goods;
  },

  //getCategoryPrices() - Returns an object map of category prices
  getCategoryPrices: function (arg0_buy_sell) {
    //Convert from parameters
    var buy_sell = (arg0_buy_sell) ? arg0_buy_sell : "buy";

    //Declare local instance variables
    var category_prices = {};
    var config_obj = config.defines.economy.good_categories;

    var all_categories = Object.keys(config_obj);

    //Iterate over all_categories
    for (var i = 0; i < all_categories.length; i++)
      category_prices[all_categories[i]] = module.exports.getAverageNeedsPrice(all_categories[i], buy_sell);

    //Return statement
    return category_prices;
  },

  /*
    getGood() - Fetches a good's key/object based on its options.
    options: {
      return_key: true/false - Whether or not to return the key instead of the object. False by default.
    }
  */
  getGood: function (arg0_name, arg1_options) {
    //Convert from parameters
    var good_name = (typeof arg0_name != "object") ? arg0_name.toLowerCase() : arg0_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var all_goods = global.lookup.all_goods;
    var good_exists = [false, "", ""]; //[good_exists, good_obj, good_id]

    var local_goods = Object.keys(all_goods);

    //Guard clause for object, money
    if (typeof good_name == "object") return good_name;
    if (good_name == "money") return "money";

    //Check if argument provided is a raw name
    if (all_goods[good_name])
      good_exists = [true, all_goods[good_name], good_name];

    if (!good_exists[0]) {
      //Search by name matches - Soft match first
      for (var x = 0; x < local_goods.length; x++) {
        var local_good = all_goods[local_goods[x]];

        if (!reserved.goods.includes(local_goods[x]))
          if (local_good.name)
            if (local_good.name.toLowerCase().indexOf(good_name) != -1)
              good_exists = [true, local_good, local_goods[x]];
      }

      //Search by name matches - Hard match second
      for (var x = 0; x < local_goods.length; x++) {
        var local_good = all_goods[local_goods[x]];

        if (!reserved.goods.includes(local_goods[x]))
          if (local_good.name)
            if (local_good.name.toLowerCase() == good_name)
              good_exists = [true, local_good, local_goods[x]];
      }

      //Move onto alias searching if good still does not exist based on the name
      if (!good_exists[0]) {
        var hard_alias_found = false;

        //Search by alias matches - Soft match first
        for (var x = 0; x < local_goods.length; x++) {
          var local_good = all_goods[local_goods[x]];

          if (local_good.aliases && !hard_alias_found) {
            //Soft match first
            for (var y = 0; y < local_good.aliases.length; y++)
              if (local_good.aliases[y].toLowerCase().indexOf(good_name) != -1)
                good_exists = [true, local_good, local_goods[x]];

            //Hard match second
            for (var y = 0; y < local_good.aliases.length; y++)
              if (local_good.aliases[y].toLowerCase() == good_name) {
                good_exists = [true, local_good, local_goods[x]];
                hard_alias_found = true;
              }
          }
        }
      }
    }

    //Assign JSON key to .id for ease-of-use
    if (good_exists[0]) good_exists[1].id = good_exists[2];

    //Return statement
    return (good_exists[0]) ?
      (!options.return_key) ? good_exists[1] : good_exists[2] :
    undefined;
  },

  /*
    getGoodAmount() - Fetches a good amount based on its options from a user's inventory.
    options: {
      exclude_categories: true/false, - Whether to exclude categories from the counting. True by default
    }
  */
  getGoodAmount: function (arg0_user, arg1_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var name = arg1_name;
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (!options.exclude_categories) options.exclude_categories = true;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var good_amount = 0;
    var usr = main.users[actual_id];

    //Guard clause if no good is specified
    if (!name) return 0;

    var good_obj = (typeof name == "object") ? name : module.exports.getGood(name);

    //Recursively iterate over subgoods if category
    if (typeof good_obj == "object") {
      var all_good_keys = Object.keys(good_obj);

      if (good_obj.type == "category") {
        if (!options.exclude_categories)
          good_amount += returnSafeNumber(usr.inventory[good_obj.id]);

        for (var i = 0; i < all_good_keys.length; i++) {
          var local_subgood_obj = lookup.all_goods[all_good_keys[i]];

          //Add goods to good_amount
          if (!reserved.goods.includes(all_good_keys[i])) {
            if (local_subgood_obj.type == "category") {
              good_amount += returnSafeNumber(module.exports.getGoodAmount(user_id, local_subgood_obj));
            } else {
              good_amount += returnSafeNumber(usr.inventory[all_good_keys[i]]);
            }
          }
        }
      } else {
        good_amount += returnSafeNumber(usr.inventory[good_obj.id]);
      }
    } else {
      if (usr[name])
        good_amount += returnSafeNumber(usr[name]);
    }

    //Return statement
    return good_amount;
  },

  /*
    getGoodCategory() - Fetches a good's parent category/object based on its options
    options: {
      return_object: true/false - Whether or not to return the object instead of the key. False by default
    }
  */
  getGoodCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var good_name = arg0_name;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var good_key = getGood(good_name, { return_key: true });

    //Iterate over all_good_categories
    for (var i = 0; i < all_good_categories.length; i++)
      if (hasSubgood(config.goods[all_good_categories[i]]))
        return (!options.return_object) ? all_good_categories[i] : config.goods[all_good_categories[i]];
  },

  /*
    getGoods() - Returns an array of all good objects unless specified otherwise.
    options: {
      exclude_categories: []
      exclude_hidden: false/true,
      return_names: false/true,
      return_object: false/true
    }
  */
  getGoods: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var goods_array = [];
    var goods_object = {};

    //Debug printout
    log.debug(`getGoods() invoked from ${module.exports.getGoods.caller.name}()!`);

    //Iterate over all goods categories and push all goods therein to array
    for (var i = 0; i < all_good_categories.length; i++) {
      var local_category = config.goods[all_good_categories[i]];
      var local_goods = Object.keys(local_category);

      //Check if category meets the conditions described in options
      var category_meets_conditions = true;

      try {
        if (options.exclude_categories.includes(all_good_categories[i]))
          category_meets_conditions = false;
      } catch {}
      if (options.exclude_hidden && all_good_categories[i] == "hidden")
        category_meets_conditions = false;

      //If the category meets the conditions, push all the local goods inside of it to goods_array, either with their name, or with their object depending on the options
      if (category_meets_conditions)
        for (var x = 0; x < local_goods.length; x++)
          if (!reserved.goods.includes(local_goods[x])) {
            var local_good = local_category[local_goods[x]];

            //Add parent good
            (options.return_names) ?
              goods_array.push(local_goods[x]) :
              goods_array.push(local_good);

            goods_object[local_goods[x]] = local_good;

            //Recursively add subgoods
            if (local_good.type == "category") {
              var all_subgoods = module.exports.getSubgoods(local_good, options);

              if (Array.isArray(all_subgoods)) {
                for (var y = 0; y < all_subgoods.length; y++)
                  goods_array.push(all_subgoods[y]);
              } else {
                var all_recursive_subgoods = Object.keys(all_subgoods);

                for (var y = 0; y < all_recursive_subgoods.length; y++)
                  goods_object[all_recursive_subgoods[y]] = all_subgoods[all_recursive_subgoods[y]];
              }
            }
          }
    }

    //Return statement
    return (!options.return_object) ? goods_array : goods_object;
  },

  getGoodTypes: function () {
    //Declare local instance variables
    var goods_obj;
    var good_type_obj = {};

    if (global.lookup)
      if (global.lookup.all_goods) goods_obj = lookup.all_goods;
    if (!goods_obj) goods_obj = module.exports.getGoods({ return_object: true });

    var all_goods = Object.keys(goods_obj);

    for (var i = 0; i < all_goods.length; i++) {
      var local_good = goods_obj[all_goods[i]];

      if (local_good.type)
        good_type_obj[all_goods[i]] = local_good.type;
    }

    //Return statement
    return good_type_obj;
  },

  //getGoodsSubgoods() - Returns an object of goods categories to their respective non-category subgoods
  getGoodsSubgoods: function () {
    //Declare local instance variables
    var goods_obj = module.exports.getGoods({ return_object: true });

    var all_goods = Object.keys(goods_obj);
    var subgoods_obj = {};

    //Iterate over all_goods and append getSubgoods()
    for (var i = 0; i < all_goods.length; i++) {
      var local_good = goods_obj[all_goods[i]];

      if (local_good.type == "category") {
        var subgood_array = module.exports.getSubgoods(local_good, { return_names: true });

        subgoods_obj[all_goods[i]] = subgood_array;
      } else {
        subgoods_obj[all_goods[i]] = getList(all_goods[i]);
      }
    }

    //Return statement
    return subgoods_obj;
  },

  /*
    getNeedsCategory() - Returns an object of goods based on the needs category.
    options: {
      pop_type: "soldiers" - Optional. Undefined by default. The pop type to fetch needs objects for
    }
  */
  getNeedsCategory: function (arg0_needs_category, arg1_options) {
    //Convert from parameters
    var needs_category = arg0_needs_category;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_pops = (options.pop_type) ? getList(options.pop_type) : Object.keys(config.pops);
    var goods_obj = {};

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.needs) {
          var all_needs_categories = Object.keys(local_pop.per_100k.needs);

          //luxury_goods, staple_goods, etc.
          for (var x = 0; x < all_needs_categories.length; x++) {
            var local_needs_category = local_pop.per_100k.needs[all_needs_categories[x]];

            var all_needs_groups = Object.keys(local_needs_category);

            for (var y = 0; y < all_needs_groups.length; y++) {
              var local_needs_group = local_needs_category[all_needs_groups[y]];

              var all_group_goods = Object.keys(local_needs_group);

              //Iterate over all_group_goods and push to goods_obj
              for (var z = 0; z < all_group_goods.length; z++)
                goods_obj[all_group_goods[z]] = (lookup.all_goods) ?
                  lookup.all_goods[all_group_goods[z]] :
                  module.exports.getGood(all_group_goods[z]);
            }
          }
        }
    }

    //Return statement
    return goods_obj;
  },

  /*
    getNeedsCategoryPrice() - Fetches the total price of a needs category of goods given a pop type.
    options: {
      sell_price: true/false - Optional. Whether to fetch the sell_price instead of buy_price. False by default
    }
  */
  getNeedsCategoryPrice: function (arg0_pop_type, arg1_needs_category, arg2_options) {
    //Convert from parameters
    var pop_type = arg0_pop_type;
    var needs_category = arg1_needs_category;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var pop_obj = config.pops[pop_type];
    var total_price = 0;

    //Check that pop_obj exists and has needs
    if (pop_obj)
      if (pop_obj.per_100k)
        if (pop_obj.per_100k.needs)
          if (pop_obj.per_100k.needs[needs_category]) {
            //Flatten current object into needs_obj
            var local_obj = pop_obj.per_100k.needs[needs_category];
            var needs_obj = flattenObject(local_obj);

            var all_needs_keys = Object.keys(needs_obj);

            //Iterate over all_needs_keys and sum total_price by market buy value
            for (var i = 0; i < all_needs_keys.length; i++) {
              var local_market_good = main.market[all_needs_keys[i]];
              var local_value = needs_obj[all_needs_keys[i]];

              if (local_market_good)
                total_price += (!options.sell_price) ?
                  local_market_good.buy_price*local_value :
                  local_market_good.sell_price*local_value;
            }
          }

    //Return statement
    return total_price;
  },

  //getRelevantGoods() - Returns an array of good keys considered relevant to a user
  getRelevantGoods: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_building_goods = getAllBuildingGoods(user_id);
    var all_goods = Object.keys(lookup.all_goods);
    var all_pop_goods = getAllPopGoods(user_id);
    var all_unit_goods = getAllUnitGoods(user_id);
    var relevant_goods = [];
    var usr = main.users[actual_id];

    //Merge all_building_goods, all_pop_goods, all_unit_goods
    relevant_goods = mergeArrays(relevant_goods, all_building_goods, all_pop_goods, all_unit_goods);

    //Check whether goods has .relevant flag
    for (var i = 0; i < all_goods.length; i++) {
      var local_good = lookup.all_goods[all_goods[i]];

      if (!relevant_goods.includes(all_goods[i]))
        //.relevant handler
        if (local_good.relevant)
          relevant_goods.push(all_goods[i]);
    }

    //Check whether goods contains subgood that is relevant
    for (var i = 0; i < all_goods.length; i++) {
      var local_good = lookup.all_goods[all_goods[i]];

      if (!relevant_goods.includes(all_goods[i]))
        //Child relevancy handler
        if (module.exports.hasRelevantSubgood(local_good, relevant_goods))
          relevant_goods.push(all_goods[i]);
    }

    //Add non-zero goods in inventory to relevant goods list
    for (var i = 0; i < all_goods.length; i++)
      if (usr.inventory[all_goods[i]] != 0)
        if (!relevant_goods.includes(all_goods[i]))
          relevant_goods.push(all_goods[i]);

    //Return statement
    return relevant_goods;
  },

  getRawGoods: function (arg0_options) {
    //Declare local instance variables
    var all_good_names = module.exports.getGoods({ return_names: true });
    var all_goods = module.exports.getGoods();
    var options = (arg0_options) ? arg0_options : {};
    var raw_goods = [];

    for (var i = 0; i < all_goods.length; i++)
      if (all_goods[i].mine_action_chance || all_goods[i].quarry_action_chance || all_goods[i].chop_action_chance || all_goods[i].is_RGO)
        raw_goods.push((!options.return_names) ? all_goods[i] : all_good_names[i]);

    //Return statement
    return raw_goods;
  },

  /*
    getStapleGoodsPrice() - Fetches the total price of config.defines.economy.staple_goods_categories for a pop type
    options: {
      sell_price: true/false - Optional. Whether to fetch the sell_price instead of buy_price. False by default
    }
  */
  getStapleGoodsPrice: function (arg0_pop_type, arg1_options) {
    //Convert from parameters
    var pop_type = arg0_pop_type;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var staple_goods_categories = config.defines.economy.staple_goods_categories;
    var total_price = 0;

    //Iterate over staple_goods_categories
    for (var i = 0; i < staple_goods_categories.length; i++) {
      var local_price = module.exports.getNeedsCategoryPrice(pop_type, staple_goods_categories[i], options);

      total_price += returnSafeNumber(local_price);
    }

    //Return statement
    return total_price/100000;
  },

  /*
    getSubgoods() - Returns a list of subgoods under a single good as either an object or array
    options: {
      exclude_categories: true/false, - Whether to exclude categories. False by default
      return_names: true/false, - Whether to return good keys instead of good objects. False by default
      return_object: true/false - Whether to return a master object instead of master array. False by default
    }
  */
  getSubgoods: function (arg0_object, arg1_options) {
    //Convert from parameters
    var good_obj = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_subgood_keys = Object.keys(good_obj);
    var goods_array = [];
    var goods_object = {};

    //Iterate over all subgoods
    for (var i = 0; i < all_subgood_keys.length; i++)
      if (!reserved.goods.includes(all_subgood_keys[i])) {
        var local_good = good_obj[all_subgood_keys[i]];
        var push_good = true;

        //Exclude categories if asked for
        if (options.exclude_categories)
          if (local_good.type == "category")
            push_good = false;

        if (push_good) {
          (options.return_names) ?
            goods_array.push(all_subgood_keys[i]) :
            goods_array.push(local_good);

          goods_object[all_subgood_keys[i]] = local_good;
        }

        //Recursively add subgoods, just exclude parent if exclude_categories is true
        if (local_good.type == "category") {
          var recursive_subgoods = module.exports.getSubgoods(local_good, options);

          if (Array.isArray(recursive_subgoods)) {
            for (var x = 0; x < recursive_subgoods.length; x++)
              goods_array.push(recursive_subgoods[x]);
          } else {
            var all_recursive_subgoods = Object.keys(recursive_subgoods);

            for (var x = 0; x < all_recursive_subgoods.length; x++)
              goods_object[all_recursive_subgoods[x]] = recursive_subgoods[all_recursive_subgoods[x]];
          }
        }
      }

    //Return statement
    return (!options.return_object) ? goods_array : goods_object;
  },

  getUnlockedGoods: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var goods_obj = (lookup.all_goods) ? lookup.all_goods : getGoods({ return_object: true });
    var unlocked_goods = [];
    var usr = main.users[actual_id];

    var all_goods = Object.keys(goods_obj);

    //Iterate over all_goods
    if (lookup.all_production) {
      for (var i = 0; i < all_goods.length; i++) {
        //Check if good is unlocked
        var is_good_unlocked = module.exports.isGoodUnlocked(user_id, all_goods[i]);

        if (is_good_unlocked)
          unlocked_goods.push(all_goods[i]);
      }
    } else {
      log.warn(`getUnlockedGoods() - lookup.all_production is not defined!`);
    }

    //Return statement
    return unlocked_goods;
  },

  hasProductionChain: function (arg0_good) {
    //Convert from parameters
    var good_name = arg0_good;

    //Declare local instance variables
    var all_buildings = Object.keys(lookup.all_buildings);
    var good_key = getGood(good_name, { return_key: true });

    //Iterate over all_buildings to see if good_key is in .produces
    for (var i = 0; i < all_buildings.length; i++) {
      var local_config = lookup.all_buildings[all_buildings[i]];

      if (local_config.produces) {
        var flattened_production = flattenObject(local_config.produces);

        if (flattened_production[good_key]) return true;
      }
    }
  },

  hasRelevantSubgood: function (arg0_object, arg1_relevant_goods) {
    //Convert from parameters
    var goods_obj = arg0_object;
    var relevant_goods = (arg1_relevant_goods) ? arg1_relevant_goods : [];

    //Declare local instance variables
    var all_subgood_keys = Object.keys(goods_obj);
    var has_relevant_subgood;

    //Iterate over all_subgood_keys
    for (var i = 0; i < all_subgood_keys.length; i++) {
      //Guard clause if all_subgood_keys[i] is included in relevant_goods
      if (relevant_goods.includes(all_subgood_keys[i]))
        return true;

      //Keep going
      var local_good = goods_obj[all_subgood_keys[i]];

      if (typeof local_good == "object")
        if (local_good.type == "category")
          has_relevant_subgood = module.exports.hasRelevantSubgood(local_good, relevant_goods);
    }

    //Return statement
    return has_relevant_subgood;
  },

  /*
    hasSubgood() - Returns whether a good has a given subgood
    options: {
      return_key: true/false - Whether to return the good key that was found or not
    }
  */
  hasSubgood: function (arg0_object, arg1_good_key, arg2_options) {
    //Convert from parameters
    var goods_obj = arg0_object;
    var raw_good_keys = arg1_good_key;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var all_subgood_keys = Object.keys(goods_obj);
    var good_keys = getList(raw_good_keys);
    var has_subgood;

    //Guard clause if all_subgood_keys[i] is included by good_keys
    for (var i = 0; i < good_keys.length; i++)
      if (all_subgood_keys.includes(good_keys[i])) {
        return (!options.return_key) ? true : good_keys[i];
      }

    //Iterate over all_subgood_keys
    for (var i = 0; i < all_subgood_keys.length; i++) {
      var local_good = goods_obj[all_subgood_keys[i]];

      if (typeof local_good == "object")
        if (local_good.type == "category")
          if (!has_subgood)
            has_subgood = module.exports.hasSubgood(local_good, raw_good_keys, options);
    }

    //Return statement
    return has_subgood;
  },

  isGoodUnlocked: function (arg0_user, arg1_good_key) {
    //Convert from parameters
    var user_id = arg0_user;
    var good_key = arg1_good_key;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var goods_obj = (lookup.all_goods) ? lookup.all_goods : getGoods({ return_object: true });
    var usr = main.users[actual_id];

    var good_obj = goods_obj[good_key];

    //Guard clause if good is category
    if (good_obj)
      if (good_obj.type == "category")
        return false;

    //Check to make sure all_production is defined
    if (lookup.all_production) {
      //Declare local instance variables
      var production_chain_obj = lookup.all_production[good_key];

      if (production_chain_obj) {
        var all_production_chain_goods = Object.keys(production_chain_obj);

        //Iterate over all_production_chain_goods
        for (var i = 0; i < all_production_chain_goods.length; i++) {
          var local_subobj = production_chain_obj[all_production_chain_goods[i]];

          var all_local_buildings = Object.keys(local_subobj);
          var has_unlocked_building = false;

          //Iterate over all_local_buildings to determine if at least one is unlocked
          for (var x = 0; x < all_local_buildings.length; x++)
            if (usr.available_buildings.includes(all_local_buildings[x]))
              has_unlocked_building = true;
          if (all_local_buildings.length == 0)
            has_unlocked_building = true;

          //Guard clause if no unlocked building for prerequisite good
          if (!has_unlocked_building)
            return false;
        }

        //Guard clause if no production chain
        if (all_production_chain_goods.length == 0)
          return false;

        //Return statement if it passed all guard clauses
        return true;
      }
    } else {
      log.warn(`isGoodUnlocked() - lookup.all_production is not defined!`);
    }
  },

  modifyGoodAmount: function (arg0_user, arg1_good_name, arg2_value) {
    //Convert from parameters
    var user_id = arg0_user;
    var good_name = arg1_good_name;
    var value = parseFloat(arg2_value);

    //Declare local instance variables
    var actual_id = (typeof user_id != "object") ? main.global.user_map[user_id] : user_id;
    var raw_good_name;
    var return_obj = {};
    var usr = (typeof actual_id != "object") ? main.users[actual_id] : actual_id;

    //Guard clause for no good change
    if (value == 0) return return_obj;

    //Set good_obj
    if (typeof good_name != "object") {
      raw_good_name = (lookup.all_goods[good_name]) ?
        good_name : getGood(good_name, { return_key: true });
    } else {
      if (good_name.id) {
        raw_good_name = good_name.id;
      } else {
        if (good_name.name)
          raw_good_name = getGood(good_name.name, { return_key: true });
      }
    }

    //Modify inventory value
    if (raw_good_name) {
      var good_obj = lookup.all_goods[raw_good_name];

      if (typeof good_obj == "object") {
        var dispersed_obj = module.exports.disperseToSubgoods(raw_good_name, returnSafeNumber(value));

        var all_dispersed_goods = Object.keys(dispersed_obj);

        //Iterate over all_dispersed_goods
        for (var i = 0; i < all_dispersed_goods.length; i++)
          modifyValue(usr.inventory, all_dispersed_goods[i], dispersed_obj[all_dispersed_goods[i]]);

        return_obj = mergeObjects(return_obj, dispersed_obj);
      } else {
        modifyValue(return_obj, subgoods[i], returnSafeNumber(value));
        modifyValue(usr, raw_good_name, value);
      }
    }

    //Return statement
    return return_obj;
  },

  recalculateInventory: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    for (var i = 0; i < lookup.goods_depth; i++)
      for (var x = 0; x < lookup.all_good_names.length; x++)
        usr.inventory[lookup.all_good_names[x]] = module.exports.getGoodAmount(user_id, lookup.all_good_names[x], {
          exclude_categories: true
        });
  },

  /*
    returnInventorySearchGoods() - Returns an array of good keys from a search query string
    options: {
      return_object: false/true - False by default
    }
  */
  returnInventorySearchGoods: function (arg0_string, arg1_options) {
    //Convert from parameters
    var search_query = arg0_string.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var significance_matrix = {}; //{ <good_key>: <significance_score> };

    //Iterate over all good keys and objects
    for (var i = 0; i < lookup.all_good_names.length; i++) {
      var local_good = lookup.all_goods[lookup.all_good_names[i]];
      var local_significance = 0;

      //Iterate over all reserved.goods keys and check for significance
      for (var x = 0; x < reserved.goods.length; x++)
        if (local_good[reserved.goods[x]]) {
          var local_value_list = getList(local_good[reserved.goods[x]]);

          for (var y = 0; y < local_value_list.length; y++)
            if (typeof local_value_list[y] == "string")
              if (local_value_list[y].trim().toLowerCase().includes(search_query))
                local_significance += search_query.length/local_value_list[y].length;
        }

      //Set local_significance in significance_matrix
      if (local_significance > 0)
        significance_matrix[lookup.all_good_names[i]] = local_significance;
    }

    //Sort significance_matrix
    significance_matrix = sortObject(significance_matrix);

    //Return statement
    return (!options.return_object) ? Object.keys(significance_matrix) : significance_matrix;
  },

  setGoodAmount: function (arg0_user, arg1_good_name, arg2_value) {
    //Convert from parameters
    var user_id = arg0_user;
    var good_name = arg1_good_name;
    var value = parseFloat(arg2_value);

    //Set value
    module.exports.modifyGoodAmount(user_id, good_name,
      (module.exports.getGoodAmount(user_id, good_name)*-1) + value
    );
  }
};
