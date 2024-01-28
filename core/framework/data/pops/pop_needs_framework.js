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
  }
};
