module.exports = {
  /*
    getActualPopFulfilment() - Gets actual pop fulfilment for the stated scope as a weighted average by wealth pool.
    options: {
      province_id: "4709", - The province ID which to target
      pop_type: "soldiers", - The pop type for which to fetch fulfilment/variety for
      wealth_pool_key: "", - Optional. The wealth pool key to specify when restricting fulfilment/variety calculations

      good_scope: "staple_goods"/"chocolate" - Optional. Defaults to all. Individual goods are calculated with received_goods per category per wealth pool.
    }
  */
  getActualPopFulfilment: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var pop_obj = config.pops[options.pop_type];
    var pop_type = options.pop_type;
    var province_id = options.province_id;
    var province_obj = main.provinces[province_id];
    var total_population = 0;

    var total_fulfilment = 0;
    var total_variety = 0;

    if (province_obj.pops) {
      var all_pop_keys = (!options.wealth_pool_key) ? Object.keys(province_obj.pops) : [options.wealth_pool_key];
      var flattened_needs = {};

      try {
         flattened_needs = flattenObject(pop_obj.per_100k.needs);
      } catch {}

      for (var i = 0; i < all_pop_keys.length; i++)
        if (all_pop_keys[i].startsWith("wealth-")) {
          var local_wealth_pool = province_obj.pops[all_pop_keys[i]];
          var split_wealth_key = all_pop_keys[i].split("-");

          var local_scalar = local_wealth_pool.size/100000;
          var pop_type = split_wealth_key[3];

          if (pop_type == options.pop_type) {
            total_population += local_wealth_pool.size;

            //General fulfilment/variety handling
            if (!options.good_scope) {
              total_fulfilment += local_wealth_pool.size*returnSafeNumber(local_wealth_pool.fulfilment);
              total_variety += local_wealth_pool.size*returnSafeNumber(local_wealth_pool.variety);
            } else {
              var is_good = (lookup.all_goods[options.good_scope]);
              var split_scope_key = options.good_scope.split(".");

              //Category level parsing
              if (!is_good) {
                if (split_scope_key.length == 1) {
                  total_fulfilment += local_wealth_pool.size*returnSafeNumber(local_wealth_pool[`${options.good_scope}-fulfilment`]);
                  total_variety += local_wealth_pool.size*returnSafeNumber(local_wealth_pool[`${options.good_scope}-variety`]);
                } else if (split_scope_key.length >= 2) {
                  //Group level parsing
                  if (local_wealth_pool.received_goods) {
                    var local_received_goods_obj = local_wealth_pool.received_goods[split_scope_key[0]];

                    if (local_received_goods_obj) {
                      var local_received_goods = JSON.parse(JSON.stringify(local_received_goods_obj));
                      var local_scope = multiplyObject(getNeedsScope(pop_type, options.good_scope), local_scalar);

                      var local_fulfilment = getInternalFulfilment(local_received_goods, local_scope);

                      total_fulfilment += local_wealth_pool.size*local_fulfilment.fulfilment;
                      total_variety += local_wealth_pool.size*local_fulfilment.variety;
                    }
                  }
                }
              } else {
                //Single good processing
                var local_need = returnSafeNumber(flattened_needs[options.good_scope])*local_scalar;

                if (local_wealth_pool.received_goods) {
                  var received_goods = flattenObject(local_wealth_pool.received_goods);

                  var local_fulfilment = getNeedsFulfilment(received_goods, local_need, options.good_scope);

                  total_fulfilment += local_wealth_pool.size*local_fulfilment.fulfilment;
                  total_variety += local_wealth_pool.size*local_fulfilment.variety;
                }
              }
            }
          }
        }
    }

    //Return statement
    return {
      fulfilment: (total_population > 0) ? total_fulfilment/total_population : 0,
      variety: (total_population > 0) ? total_variety/total_population : 0,
    };
  },

  //getInternalFulfilment() - Recursively fetches .fulfilment and .variety
  /*
    Returns: {
      fulfilment: 0.67,
      variety: 0.13,

      removed_goods: {
        lumber: 2 - The total amount of goods consumed by fulfilment calcs
      }
    }
  */
  getInternalFulfilment: function (arg0_goods, arg1_scope) {
    //Convert from parameters
    var goods = arg0_goods;
    var scope = arg1_scope;

    //Declare local instance variables
    var removed_goods = {};
    var total_fulfilment = 0;
    var total_variety = 0;

    //Iterate over all_scope_keys
    var all_scope_keys = Object.keys(scope);

    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_amount = returnSafeNumber(goods[all_scope_keys[i]]);
      var local_value = scope[all_scope_keys[i]];

      if (typeof local_value == "number") {
        var local_fulfilment = module.exports.getNeedsFulfilment(goods, local_amount, all_scope_keys[i]);

        total_fulfilment += local_fulfilment.fulfilment;
        total_variety += local_fulfilment.variety;

        //Remove local_fulfilment.removed_goods from goods
        var all_removed_goods = Object.keys(local_fulfilment.removed_goods);

        for (var x = 0; x < all_removed_goods.length; x++) {
          var local_removed_amount = local_fulfilment.removed_goods[all_removed_goods[x]];

          modifyValue(goods, all_removed_goods[x], local_removed_amount*-1, true);
          modifyValue(removed_goods, all_removed_goods[x], local_removed_amount);
        }
      } else if (typeof local_value == "object") {
        var new_goods = JSON.parse(JSON.stringify(goods));

        var local_fulfilment = module.exports.getNeedsFulfilment(new_goods, local_value);

        total_fulfilment += local_fulfilment.fulfilment;
        total_variety += local_fulfilment.variety;

        //Remove local_fulfilment.removed_goods from goods
        var all_removed_goods = Object.keys(local_fulfilment.removed_goods);

        for (var x = 0; x < all_removed_goods.length; x++) {
          var local_removed_amount = local_fulfilment.removed_goods[all_removed_goods[x]];

          modifyValue(goods, all_removed_goods[x], local_removed_amount*-1, true);
          modifyValue(removed_goods, all_removed_goods[x], local_removed_amount);
        }
      }
    }

    var fulfilment = Math.min(Math.max(total_fulfilment/all_scope_keys.length, 0), 1);
    var variety = Math.min(Math.max(total_variety/all_scope_keys.length, 0), 1);

    //Return statement
    return {
      fulfilment: fulfilment,
      variety: variety,

      removed_goods: removed_goods
    };
  },

  getNeedsFulfilment: function (arg0_goods, arg1_amount, arg2_good) {
    //Convert from parameters
    var goods = arg0_goods;
    var amount = arg1_amount;
    var good_type = arg2_good;

    //Declare local instance variables
    var fulfilment = 0;
    var good_obj = lookup.all_goods[good_type];
    var removed_goods = {};
    var variety = 0;

    if (good_obj) {
      var subgoods_fulfilled = 0;
      var local_subgoods = lookup.all_subgoods[good_type];
      var per_100k_need = 0;
      var total_received = 0;

      if (good_obj.type == "category")
        local_subgoods.push(good_type);

      for (var i = 0; i < local_subgoods.length; i++) {
        var local_received_amount = returnSafeNumber(goods[local_subgoods[i]]);

        if (local_received_amount > 0)
          subgoods_fulfilled++;
        total_received += local_received_amount;
      }

      fulfilment = Math.min(Math.max(total_received/unzero(amount, 1), 0), 1);
      variety = Math.min(Math.max(total_received/local_subgoods.length, 0), 1);

      //Calculate removed_goods
      var removed_goods_scalar = amount/total_received;

      for (var i = 0; i < local_subgoods.length; i++) {
        var local_received_amount = returnSafeNumber(goods[local_subgoods[i]]);
        var local_removed_amount = local_received_amount*removed_goods_scalar;

        if (local_received_amount > 0)
          modifyValue(removed_goods, local_subgoods[i], local_removed_amount);
      }
    }

    //Return statement
    return {
      fulfilment: fulfilment,
      variety: variety,

      removed_goods: removed_goods
    };
  },

  getNeedsScope: function (arg0_pop_type, arg1_key) {
    //Convert from parameters
    var pop_type = arg0_pop_type;
    var key = arg1_key;

    //Declare local instance variables
    var pop_obj = config.pops[pop_type];
    var return_object;
    var split_key = key.split(".");

    if (pop_obj.per_100k)
      if (pop_obj.per_100k.needs) {
        var pop_needs = pop_obj.per_100k.needs;

        //Conventional category/group/need processing
        if (split_key.length == 1) {
          return_object = pop_needs[split_key[0]];
        } else if (split_key.length == 2) {
          return_object = pop_needs[split_key[0]][split_key[1]];
        } else if (split_key.length == 3) {
          var local_value = pop_needs[split_key[0]][split_key[1]][split_key[2]];

          return_object = { [split_key[2]]: local_value };
        }

        //Find subobject
        if (!return_object) {
          var local_subobj = getSubobject(pop_obj.per_100k.needs, key);

          return_object = { [key]: local_subobj };
        }
      }

    //Return statement
    return return_object;
  },

  /*
    getPopNeeds() - Fetches generic pop needs for a given pop type
    options: {
      province_id: "4407" - Uses wealth pools to account for rounding issues
    }
  */
  getPopNeeds: function (arg0_type, arg1_amount, arg2_needs_category, arg3_options) {
    //Convert from parameters
    var pop_type = arg0_type;
    var amount = (arg1_amount != undefined) ? parseInt(arg1_amount) : 100000; //per_100k is the default needs scope
    var needs_category = arg2_needs_category;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var goods_obj = {};
    var needs_obj = (typeof needs_category != "object" && needs_category) ? needs_category.trim().toLowerCase() : undefined;
    var pop_obj = config.pops[pop_type];
    var wealth_pools_amount = 0;

    //Fetch needs_obj recursively
    if (pop_obj)
      if (pop_obj.per_100k)
        if (pop_obj.per_100k.needs)
          try {
            needs_obj = (needs_category) ? JSON.parse(JSON.stringify(
              getSubobject(pop_obj.per_100k.needs, needs_category)
            )) : JSON.parse(JSON.stringify(pop_obj.per_100k.needs));

            //Fetch wealth_pools_amount
            if (options.province_id) {
              var province_obj = main.provinces[options.province_id];

              if (province_obj)
                if (province_obj.pops) {
                  var all_pop_keys = Object.keys(province_obj.pops);

                  for (var i = 0; i < all_pop_keys.length; i++)
                    if (all_pop_keys[i].startsWith("wealth-")) {
                      var local_pop_type = all_pop_keys[i].split("-")[2];

                      if (local_pop_type == pop_type)
                        wealth_pools_amount++;
                    }
                }
            }
          } catch (e) {
            needs_obj = {};
            console.log(pop_type, e);
          }

    //Multiply everything in needs_obj by a given amount
    needs_obj = removeZeroes(multiplyObject(needs_obj, amount/100000, false, "ceil"));

    //Account for rounding errors
    needs_obj = addObject(needs_obj, wealth_pools_amount);

    return needs_obj;
  },

  /*
    getPopNeedsFulfilment() - Returns the total fulfilment of a set of pop needs.
    options: {
      needs_category: "food", - Which needs category to return fulfilment/variety for. Defaults to all
      return_object: true/false, - Whether to return the variety of goods and fulfilment used as a single object: { fulfilment: (Number), variety: (Number) }
      restrict_goods: ["food", "bread"], - Goods to restrict calculations to
      return_variety: true/false - Whether or not to return the variety of goods used in fulfilment instead of total fulfilment
    }
  */
  getPopNeedsFulfilment: function (arg0_goods, arg1_type, arg2_amount, arg3_options) {
    //Convert from parameters
    var goods_obj = arg0_goods; //These are the goods fulfilment is calculated against
    var pop_type = arg1_type;
    var amount = (arg2_amount) ? parseInt(arg2_amount) : 100000;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var all_goods = Object.keys(goods_obj);
    var allowed_goods = (!options.restrict_goods) ? lookup.all_good_names : getList(options.restrict_goods);
    var multiplier = amount/100000;
    var pop_obj = config.pops[pop_type];
    var total_fulfilment = 0;
    var total_variety = 0;

    //Make sure pop has needs to begin with
    if (pop_obj)
      if (pop_obj.per_100k)
        if (pop_obj.per_100k.needs) {
          var all_needs_groups = Object.keys(pop_obj.per_100k.needs).reverse();
          var is_needs_category = false;

          if (!options.needs_category) is_needs_category = true;
          if (pop_obj.per_100k.needs[options.needs_category]) {
            all_needs_groups = [options.needs_category];
            is_needs_category = true;
          }

          //Iterate through all_needs_keys in needs_obj and figure out its total fulfilment
          if (is_needs_category) {
            //all_needs_groups are things like "luxury_goods" in this boolean
            for (var i = 0; i < all_needs_groups.length; i++) {
              var divide_goods_obj = {}; //Total amount of categories that need a certain good key
              var local_needs_group = pop_obj.per_100k.needs[all_needs_groups[i]];

              var fulfilment_array = [];
              var variety_array = [];

              var all_local_needs_categories = Object.keys(local_needs_group);
              var total_need_groups = all_local_needs_categories.length;

              //Remove total_need_groups
              for (var x = 0; x < all_local_needs_categories.length; x++) {
                var has_subgood = false;

                var local_needs_category = local_needs_group[all_local_needs_categories[x]];

                if (!options.restrict_goods) has_subgood = true;
                if (options.restrict_goods)
                  for (var y = 0; y < options.restrict_goods.length; y++)
                    if (local_needs_category[options.restrict_goods[y]])
                      has_subgood = true;

                if (!has_subgood)
                  total_need_groups--;
              }

              //Parse local fulfilment and variety for each
              for (var x = 0; x < all_local_needs_categories.length; x++) {
                var has_subgood = false;

                //These are now objects like staple_goods.basics
                var local_needs_category = local_needs_group[all_local_needs_categories[x]];

                var all_local_goods = Object.keys(local_needs_category);
                var percent_fulfilled = 0;
                var percent_variety = 0;
                var total_goods = 0;

                if (!options.restrict_goods) has_subgood = true;
                if (options.restrict_goods)
                  for (var y = 0; y < options.restrict_goods.length; y++)
                    if (local_needs_category[options.restrict_goods[y]])
                      has_subgood = true;

                //Calculate total_goods
                for (var y = 0; y < all_local_goods.length; y++) {
                  var local_value = local_needs_category[all_local_goods[y]];

                  if (allowed_goods.includes(all_local_goods[y]))
                    total_goods += returnSafeNumber(local_value*multiplier);
                }

                //Iterate over all_local_goods to check for fulfilment; subtract resultant goods_obj[all_local_goods[y]] from goods_obj
                for (var y = 0; y < all_local_goods.length; y++)
                  if (allowed_goods.includes(all_local_goods[y])) {
                    var local_good = lookup.all_goods[all_local_goods[y]];

                    var local_allowance = returnSafeNumber(goods_obj[all_local_goods[y]]);
                    var local_goods_amount = (!options.restrict_goods) ? all_local_goods.length : options.restrict_goods.length;
                    var local_value = local_needs_category[all_local_goods[y]]*multiplier;

                    //Calculate current_fulfillment
                    var current_fulfillment = local_allowance/local_value;

                    percent_fulfilled += current_fulfillment*(local_value/total_goods);

                    //Subtract from goods_obj[all_local_goods[y]]
                    goods_obj[all_local_goods[y]] = Math.max(goods_obj[all_local_goods[y]] - local_value, 0);

                    //Special variety parsing logic for local_good.type 'category'
                    if (local_good.type == "category") {
                      var all_subgood_keys = getSubobjectKeys(local_good, { exclude_keys: reserved.goods, only_objects: true });

                      for (var z = 0; z < all_subgood_keys.length; z++) {
                        var local_subgood = lookup.all_goods[all_subgood_keys[z]];

                        if (local_subgood) {
                          var local_subgood_allowance = goods_obj[all_subgood_keys[z]];

                          if (local_subgood_allowance > 0)
                            percent_variety += returnSafeNumber(1/all_subgood_keys.length);
                        }
                      }

                      //If percent_variety is 0, but this current_fulfillment is > 0, then assume local variety to be 100% for this good since it was bought as a category
                      if (percent_variety <= 0 && current_fulfillment > 0)
                        percent_variety += 1/local_goods_amount;
                    } else {
                      //Current variety handler for individual goods
                      if (local_allowance > 0)
                        percent_variety += 1/local_goods_amount;
                    }
                  }

                //Push percent_fulfilled, percent_variety to fulfilment_array, variety_array
                if (has_subgood) {
                  fulfilment_array.push(Math.min(percent_fulfilled, 1));
                  variety_array.push(Math.min(percent_variety, 1));
                }
              }
              total_fulfilment += returnSafeNumber(getAverage(fulfilment_array)*(1/total_need_groups));
              total_variety += returnSafeNumber(getAverage(variety_array)*(1/total_need_groups));
            }
          } else {
            //This is a junior category such as .luxury_goods.food, treat it as such
            var needs_obj = getPopNeeds(pop_type, amount, options.needs_category); //Already pre-multiplied
            var total_goods = 0;

            if (needs_obj) {
              //Calculate total_goods
              var all_needs_keys = Object.keys(needs_obj);
              var needs_amount = (!options.restrict_goods) ? all_needs_keys.length : options.restrict_goods.length;

              for (var i = 0; i < all_needs_keys.length; i++)
                if (allowed_goods.includes(all_needs_keys[i]))
                  total_goods += returnSafeNumber(needs_obj[all_needs_keys[i]]);

              //Calculate total_fulfilment and total_variety
              for (var i = 0; i < all_needs_keys.length; i++)
                if (allowed_goods.includes(all_needs_keys[i])) {
                  var local_allowance = returnSafeNumber(goods_obj[all_needs_keys[i]]);
                  var local_value = needs_obj[all_needs_keys[i]];

                  //Add to total_fulfilment; total_variety
                  total_fulfilment += Math.min((local_allowance/local_value)*(1/needs_amount));

                  if (local_allowance > 0)
                    total_variety += 1/needs_amount;

                  //Subtract from goods_obj[all_needs_keys[i]];
                  if (local_allowance >= Math.ceil(local_value)) {
                    goods_obj[all_needs_keys[i]] -= Math.ceil(local_value);
                  } else {
                    goods_obj[all_needs_keys[i]] = 0;
                  }
                }
            }
          }
        }

    //Return statement
    if (!options.return_object) {
      return (!options.return_variety) ? total_fulfilment : total_variety;
    } else {
      return {
        fulfilment: total_fulfilment,
        variety: total_variety
      };
    }
  },

  getTotalPopConsumption: function (arg0_user, arg1_mode) {
    //Convert from parameters
    var user_id = arg0_user;
    var mode = arg1_mode; //"staple_goods", "luxury_goods"

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var consumption_obj = {};
    var usr = main.users[actual_id];

    //Iterate over all_pops for user and merge with consumption_obj
    for (var i = 0; i < all_pops.length; i++)
      try {
        var local_pop = config.pops[all_pops[i]];

        if (local_pop.per_100k)
          if (local_pop.per_100k.needs) {
            var total_pop_amount = returnSafeNumber(usr.pops[all_pops[i]]);
            var total_pop_needs = getPopNeeds(all_pops[i], total_pop_amount, mode);

            consumption_obj = mergeObjects(consumption_obj, total_pop_needs);
          }
      } catch (e) {
        log.warn(`${all_pops[i]} ran into an error whilst trying to fetch consumption_obj!`);
        console.log(e);
      }

    //Return statement
    return flattenObject(consumption_obj);
  },

  getUserPopConsumption: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var consumption_obj = {};
    var usr = main.users[actual_id];

    if (usr) {
      var user_provinces = getProvinces(user_id, { include_occupations: true });

      //Iterate over user_provinces
      for (var i = 0; i < user_provinces.length; i++) {
        var local_province = user_provinces[i];

        if (local_province.pops) {
          var all_pop_keys = Object.keys(local_province.pops);

          //Iterate over all_pop_keys for wealth pools
          for (var x = 0; x < all_pop_keys.length; x++) {
            var local_value = local_province.pops[all_pop_keys[x]];

            if (all_pop_keys[x].includes("wealth-")) {
              if (local_value.inventory_consumption) {
                var all_inventory_keys = Object.keys(local_value.inventory_consumption);

                //Iterate over all_inventory_keys
                for (var y = 0; y < all_inventory_keys.length; y++)
                  consumption_obj = mergeObjects(consumption_obj, local_value.inventory_consumption[all_inventory_keys[y]]);
              }
            }
          }
        }
      }
    }

    //Iterate over consumption_obj for rounding
    var all_consumption_keys = Object.keys(consumption_obj);

    for (var i = 0; i < all_consumption_keys.length; i++) {
      var local_value = consumption_obj[all_consumption_keys[i]];

      consumption_obj[all_consumption_keys[i]] = Math.ceil(local_value);
      if (local_value <= 0)
        delete consumption_obj[all_consumption_keys[i]];
    }

    //Return statement
    return consumption_obj;
  }
};
