module.exports = {
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
  },

  processPurchases: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var economy_defines = config.defines.economy;
    var province_obj = (typeof province_obj != "object") ? main.provinces[province_id] : province_id;

    var all_good_categories = Object.keys(economy_defines.good_categories);
    var debt_goods_chance = economy_defines.debt_goods_chance;
    var resource_production_scalar = economy_defines.resource_production_scalar;

    //Check that province_obj exists
    if (province_obj)
      if (province_obj.pops) {
        var actual_id = province_obj.controller;
        var all_wealth_keys = sortWealthPools(province_obj.id, { mode: "wealth" });
        var usr = main.users[actual_id];

        //Iterate through all wealth pools in province
        for (var i = 0; i < all_wealth_keys.length; i++)
          if (all_wealth_keys[i].startsWith("wealth-")) {
            var local_wealth_pool = province_obj.pops[all_wealth_keys[i]];
            var spending = 0;
            var split_key = all_wealth_keys[i].split("-");
            var pop_type = split_key[3];

            var consumption_scalar = returnSafeNumber(local_wealth_pool.size)/1000;
            var pop_obj = config.pops[pop_type];

            //Make sure .income, .wealth are safe numbers
            local_wealth_pool.income = returnSafeNumber(local_wealth_pool.income);
            local_wealth_pool.wealth = returnSafeNumber(local_wealth_pool.wealth);

            //Check pop_obj.per_100k.needs
            if (pop_obj && local_wealth_pool.income > 0 && local_wealth_pool.size > 0)
              if (pop_obj.per_100k)
                if (pop_obj.per_100k.needs) {
                  var category_buy_order = pop_obj.buy_order;
                  var total_fulfilment = 0;
                  var total_variety = 0;

                  //Reset .inventory_consumption and .received_goods
                  local_wealth_pool.inventory_consumption = {};
                  local_wealth_pool.received_goods = {};

                  for (var x = 0; x < category_buy_order.length; x++) {
                    local_wealth_pool.inventory_consumption[category_buy_order[x]] = {};
                    local_wealth_pool.received_goods[category_buy_order[x]] = {};
                  }

                  if (pop_obj.goods_buy_order)
                    for (var x = 0; x < pop_obj.goods_buy_order.length; x++) {
                      var local_buy_order = pop_obj.goods_buy_order[x];

                      var local_allowance = local_wealth_pool.income*local_buy_order.allowance;
                      var local_inventory_consumption = local_wealth_pool.inventory_consumption[local_buy_order.category];
                      var local_market_good = main.market[local_buy_order.good_type];
                      var local_received_goods = local_wealth_pool.received_goods[local_buy_order.category];
                      var local_value = local_buy_order.amount;

                      //Spend money on good
                      if (local_market_good) {
                        var local_need = local_value*consumption_scalar;

                        var actual_consumption = returnSafeNumber(Math.min(getGoodAmount(user_id, local_buy_order.good_type), local_need));
                        var local_worth = actual_consumption*local_market_good.buy_price;
                        var local_tax = Math.max(local_worth*returnSafeNumber(usr[`${pop_obj.class}_duties_tax`]), 0);

                        //actual_consumption should be positive
                        if (actual_consumption < 0) actual_consumption = 0;

                        //Debt handling; modify actual consumption if in debt
                        if (local_wealth_pool.wealth < 0) {
                          if (actual_consumption == 1) {
                            var has_good = randomNumber(1, debt_goods_chance);

                            if (has_good != 1)
                              actual_consumption = 0;
                          } else if (actual_consumption > 1) {
                            actual_consumption = actual_consumption*(debt_goods_chance[0]/debt_goods_chance[1]);
                          }
                        } else {
                          //Non-debt handler
                          spending += (local_worth + local_tax);
                        }

                        //Buy from market
                        var market_consumption = Math.ceil(actual_consumption*resource_production_scalar);

                        buyMarketGood(local_buy_order.good_type, market_consumption);

                        //Tracker handling; set inventory_consumption; received_goods
                        var inventory_consumption = modifyGoodAmount(usr, local_buy_order.good_type, returnSafeNumber(actual_consumption)*-1);
                        inventory_consumption = multiplyObject(inventory_consumption, -1, false, false);

                        local_wealth_pool.inventory_consumption[local_buy_order.category] = mergeObjects(local_inventory_consumption, inventory_consumption);

                        modifyValue(local_received_goods, local_buy_order.good_type, returnSafeNumber(actual_consumption));

                        //Tax handling
                        if (local_tax > 0)
                          modifyValue(usr.trackers.tax, `${pop_obj.class}-duties_tax`, local_tax);
                      }
                    }

                  //Track spending
                  if (local_wealth_pool.wealth > 0)
                    local_wealth_pool.wealth -= spending;
                  local_wealth_pool.spending = spending;

                  //Update _fulfilment and _variety for each category
                  for (var x = 0; x < category_buy_order.length; x++) {
                    var local_received_goods = local_wealth_pool.received_goods[category_buy_order[x]];

                    var local_fulfilment_obj = getPopNeedsFulfilment(local_received_goods, pop_type, local_wealth_pool.size, {
                      needs_category: category_buy_order[x],
                      return_object: true
                    });
                    total_fulfilment += local_fulfilment_obj.fulfilment;
                    total_variety += local_fulfilment_obj.variety;

                    //Set local fulfilment and variety
                    local_wealth_pool[`${category_buy_order[x]}-fulfilment`] = local_fulfilment_obj.fulfilment;
                    local_wealth_pool[`${category_buy_order[x]}-variety`] = local_fulfilment_obj.variety;
                  }

                  //Clean up received_goods for local_wealth_pool
                  if (local_wealth_pool.received_goods) {
                    var all_received_goods_categories = Object.keys(local_wealth_pool.received_goods);

                    for (var x = 0; x < all_received_goods_categories.length; x++) {
                      var local_category = local_wealth_pool.received_goods[all_received_goods_categories[x]];

                      var all_local_received = Object.keys(local_category);

                      for (var y = 0; y < all_local_received.length; y++) {
                        var local_value = local_category[all_local_received[y]];

                        local_category[all_local_received[y]] = returnSafeNumber(local_value);
                      }
                    }
                  }

                  //Set general fulfilment and variety
                  local_wealth_pool.fulfilment = total_fulfilment/category_buy_order.length;
                  local_wealth_pool.variety = total_variety/category_buy_order.length;
                }
          }
      }
  },

  /*
    processSubsistence() - Processes the subsistence tick for a province.
    options: {
      category_prices: {} - Optimisation parameter. Optional. Specifies mean category prices
    }
  */
  processSubsistence: function (arg0_province_id, arg1_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_buildings = Object.keys(lookup.all_buildings);
    var all_pops = Object.keys(config.pops);
    var average_wage = 0;
    var province_obj = (province_id != "object") ? main.provinces[province_id] : province_id;
    var qualified_pops = [];
    var subsistence_building_key = getSubsistenceBuilding(province_id);
    var subsistence_building_obj = lookup.all_buildings[subsistence_building_key];

    if (subsistence_building_obj) {
      qualified_pops = getSubsistencePops(province_obj.id, subsistence_building_key);

      //Set subsistence object
      province_obj.subsistence = {
        building_type: subsistence_building_key,
        employment: {},
        revenue: 0,
        wage: 0,

        subsistence: true,
        qualified_pops: qualified_pops
      };

      var subsistence_obj = province_obj.subsistence;

      //Set employment to all those unemployed
      for (var i = 0; i < qualified_pops.length; i++) {
        var pop_amount = returnSafeNumber(province_obj.pops[qualified_pops[i]]);
        var used_pops = returnSafeNumber(`used_${province_obj.pops[qualified_pops[i]]}`);

        var unemployed_pops = pop_amount - used_pops;

        if (unemployed_pops > 0) {
          subsistence_obj.employment[qualified_pops[i]] = unemployed_pops;
        } else {
          delete subsistence_obj.employment[qualified_pops[i]];
        }
      }

      //Calculate total revenue
      var employed_pops = getObjectSum(subsistence_obj.employment);
      var total_revenue = 0;

      //Fetch artisan production for province
      var subsistence_production_obj = getSubsistenceProduction(province_obj.id, subsistence_obj);

      //Set subsistence_obj.production; get revenues from production
      subsistence_obj.production = subsistence_production_obj;
      subsistence_obj.revenue = getBuildingRevenue(subsistence_building_obj, { goods: subsistence_obj.production });
      subsistence_obj.wage = subsistence_obj.revenue/employed_pops;

      for (var i = 0; i < qualified_pops.length; i++) {
        var key_name = `wealth-subsistence-${subsistence_building_key}-${qualified_pops[i]}`;
        var local_pop_amount = returnSafeNumber(subsistence_obj.employment[qualified_pops[i]]);

        //Adjust wealth pool
        if (local_pop_amount > 0) {
          var pop_income = subsistence_obj.revenue*(local_pop_amount/employed_pops);

          if (!province_obj.pops[key_name])
            province_obj.pops[key_name] = {
              size: local_pop_amount,
              income: returnSafeNumber(pop_income)
            };
          var local_wealth_pool = province_obj.pops[key_name];

          //Update .size and .income
          local_wealth_pool.size = local_pop_amount;
          local_wealth_pool.income = pop_income;

          //Add .income to .wealth
          modifyValue(local_wealth_pool, "wealth", returnSafeNumber(pop_income));
        } else {
          delete province_obj.pops[key_name];
        }
      }

      //Return statement
      return province_obj.subsistence;
    } else {
      log.warn(`No subsistence building could be found that was applicable to ${province_obj.id}!`);
    }
  }
};
