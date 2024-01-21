module.exports = {
  /*
    getActualPopFulfilment() - Gets actual pop fulfilment for the stated scope as a weighted average by wealth pool.
    options: {
      province_id: "4709", - The province ID which to target
      pop_type: "soldiers", - The pop type for which to fetch fulfilment/variety for

      good_scope: "staple_goods"/"chocolate" - Optional. Defaults to all. Individual goods are calculated with received_goods per category per wealth pool.
    }
  */
  getActualPopFulfilment: function (arg0_options) { //[WIP] - Add subsidy and subsistence calculations later
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var fulfilment = 0;
    var province_id = options.province_id;
    var province_obj = main.provinces[province_id];
    var total_fulfilment = 0;
    var total_variety = 0;
    var variety = 0;

    if (province_obj.pops) {
      var all_pop_keys = Object.keys(province_obj.pops);
      var is_good = (lookup.all_goods[options.good_scope]);
      var local_population = 0;

      for (var i = 0; i < all_pop_keys.length; i++)
        if (all_pop_keys[i].startsWith("wealth-")) {
          var local_wealth_pool = province_obj.pops[all_pop_keys[i]];
          var split_wealth_key = all_pop_keys[i].split("-");

          var pop_type = split_wealth_key[3];

          if (pop_type == options.pop_type) {
            local_population += returnSafeNumber(local_wealth_pool.size);

            var has_needs = false;
            var pop_obj = config.pops[pop_type];
            var total_goods = 0;
            var total_subgoods_fulfilled = 0;

            if (pop_obj.per_100k)
              if (pop_obj.per_100k.needs) has_needs = true;

            if (local_wealth_pool)
              if (has_needs) {
                //Make sure .size is being calculated correctly
                local_wealth_pool.size = returnSafeNumber(local_wealth_pool.size);

                if (is_good) {
                  var local_subgoods = lookup.all_subgoods[options.good_scope];
                  var per_100k_need = 0;

                  if (local_wealth_pool.received_goods)
                    for (var x = 0; x < pop_obj.buy_order.length; x++) {
                      var local_needs_category = pop_obj.per_100k.needs[pop_obj.buy_order[x]];
                      var local_received_goods = local_wealth_pool.received_goods[pop_obj.buy_order[x]];

                      if (local_received_goods)
                        for (var y = 0; y < local_subgoods.length; y++)
                          if (local_received_goods[local_subgoods[y]]) {
                            var local_value = local_received_goods[local_subgoods[y]];

                            total_goods += returnSafeNumber(local_value);
                            if (local_value > 0) total_subgoods_fulfilled++;

                            per_100k_need += returnSafeNumber(local_needs_category[local_subgoods[y]]);
                          }
                    }

                  //Set total_goods for individual goods scope
                  if (total_goods == 0 && lookup.all_goods[options.good_scope])
                    total_goods = 1;

                  var actual_need = returnSafeNumber(per_100k_need*(local_wealth_pool.size/100000));

                  //Set total_fulfilment; total_variety
                  total_fulfilment += returnSafeNumber(Math.min(local_wealth_pool.size*(total_goods/actual_need), 1));

                  total_variety += returnSafeNumber(Math.min(local_wealth_pool.size*(total_subgoods_fulfilled/local_subgoods.length), 1));
                } else if (pop_obj.buy_order.includes(options.good_scope)) {
                  total_fulfilment += local_wealth_pool.size*returnSafeNumber(local_wealth_pool[`${options.good_scope}-fulfilment`]);
                  total_variety += local_wealth_pool.size*returnSafeNumber(local_wealth_pool[`${options.good_scope}-variety`]);
                } else {
                  //All handler
                  total_fulfilment += local_wealth_pool.size*returnSafeNumber(local_wealth_pool.fulfilment);
                  total_variety += local_wealth_pool.size*returnSafeNumber(local_wealth_pool.variety);
                }
              } else {
                total_fulfilment += local_wealth_pool.size*config.defines.economy.default_fulfilment;
                total_variety += local_wealth_pool.size*config.defines.economy.default_variety;
              }
          }
        }

      //Set fulfilment; variety
      fulfilment = total_fulfilment/local_population;
      variety = total_variety/local_population;

      //Return statement
      return {
        fulfilment: returnSafeNumber(fulfilment),
        variety: returnSafeNumber(variety)
      };
    }
  },

  getAllPopCategoriesNeeds: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var pop_needs_goods = {};

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.needs) {
          var all_local_needs_categories = Object.keys(local_pop.per_100k.needs);

          for (var x = 0; x < all_local_needs_categories.length; x++) {
            var local_needs_category = local_pop.per_100k.needs[all_local_needs_categories[x]];

            if (!pop_needs_goods[all_local_needs_categories[x]])
              pop_needs_goods[all_local_needs_categories[x]] = [];

            //Flatten local object
            var local_array = pop_needs_goods[all_local_needs_categories[x]];
            var local_needs = flattenObject(local_needs_category);

            var all_local_needs = Object.keys(local_needs);

            //Iterate over all_local_needs
            for (var y = 0; y < all_local_needs.length; y++)
              if (!local_array.includes(all_local_needs[y]))
                local_array.push(all_local_needs[y]);
          }
        }
    }

    //Return statement
    return pop_needs_goods;
  },

  //getAllPopGoods() - Returns an array of all good keys demanded or produced by pop types w/ more than 0 people
  getAllPopGoods: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pop_goods = [];
    var relevant_pops = getRelevantPops(user_id);
    var usr = main.users[actual_id];

    //Iterate over relevant_pops and recursively parse objects and subobjects for goods
    for (var i = 0; i < relevant_pops.length; i++) {
      var local_pop = config.pops[relevant_pops[i]];

      //max_modifier_limit
      if (local_pop.max_modifier_limit) {
        var max_modifier_limit_keys = Object.keys(local_pop.max_modifier_limit);

        for (var x = 0; x < max_modifier_limit_keys.length; x++)
          if (!all_pop_goods.includes(max_modifier_limit_keys[x]))
            if (lookup.all_goods[max_modifier_limit_keys[x]])
              all_pop_goods.push(max_modifier_limit_keys[x]);
      }

      //per_100k handler
      if (local_pop.per_100k) {
        var all_relevant_subgoods = getAllSubgoods(local_pop.per_100k);

        for (var x = 0; x < all_relevant_subgoods.length; x++)
          if (!all_pop_goods.includes(all_relevant_subgoods[x]))
            all_pop_goods.push(all_relevant_subgoods[x]);
      }
    }

    //Return statement
    return all_pop_goods;
  },

  //getAllPopNeedCategories() - Returns a list of pop need categories such as luxury_goods, staple_goods, etc.
  getAllPopNeedCategories: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var pop_categories = [];

    //Iterate over all_pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.needs) {
          var all_local_needs_categories = Object.keys(local_pop.per_100k.needs);

          for (var x = 0; x < all_local_needs_categories.length; x++)
            if (!pop_categories.includes(all_local_needs_categories[x]))
              pop_categories.push(all_local_needs_categories[x]);
        }
    }

    //Return statement
    return pop_categories;
  },

  //getAllPopNeeds() - Returns an object of all flattened pop needs
  getAllPopNeeds: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var all_pop_needs_obj = {};

    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.needs)
          all_pop_needs_obj[all_pops[i]] = flattenObject(local_pop.per_100k.needs);
    }

    return all_pop_needs_obj;
  },

  /*
    getArtisanProduction() - Fetches artisan production for a given province and pop type.
    options: {
      return_float: true/false - Optional. Whether to disable rounding. False by default.
    }
  */
  getArtisanProduction: function (arg0_province, arg1_pop_type, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province;
    var pop_type = arg1_pop_type;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var return_object = {};

    //Check if province_obj has pops
    if (province_obj)
      if (province_obj.pops) {
        var user_id = province_obj.owner;
        var usr = main.users[province_obj.owner];

        //Check artisan employment
        var artisan_amount = returnSafeNumber(province_obj.pops[pop_type]);
        var artisan_production_obj = (usr.artisan_production) ? usr.artisan_production : getUserArtisanProduction(user_id);
        var artisan_per_production = returnSafeNumber(config.defines.economy.artisan_per_production, 10000);
        var artisan_per_production_scale = returnSafeNumber(config.defines.economy.artisan_per_production_scale, 750);
        var used_artisans = returnSafeNumber(province_obj.pops[`used_${pop_type}`]);

        var all_artisan_goods = Object.keys(artisan_production_obj);
        var unemployed_artisans = artisan_amount - used_artisans;

        if (unemployed_artisans > 0) {
          //Linear scaling inefficiency for artisans
          if (unemployed_artisans >= 1000)
            artisan_per_production = artisan_per_production + Math.ceil((unemployed_artisans/1000)*artisan_per_production_scale);

          var artisan_production_capacity = unemployed_artisans/artisan_per_production;

          //Iterate over all_artisan_goods
          for (var i = 0; i < all_artisan_goods.length; i++) {
            var local_value = artisan_production_obj[all_artisan_goods[i]];

            var local_production_amount = local_value*artisan_production_capacity;

            //Urban/rural rounding handler
            var local_rounded_amount = (province_obj.type == "urban") ? Math.ceil(local_production_amount) : Math.floor(local_production_amount);

            return_object[all_artisan_goods[i]] = (!options.return_float) ?
              local_rounded_amount : local_production_amount;
          }
        }
      }

    //Return statement
    return return_object;
  },

  getArtisanProductionPercentage: function () {
    //Declare local instance variables
    var all_pop_needs_categories = (lookup.all_pop_needs_categories) ? lookup.all_pop_needs_categories : getAllPopNeedCategories();
    var production_complexity = lookup.all_production_complexity;
    var production_complexity_obj = {};

    if (production_complexity) {
      //Iterate over all_pop_needs_categories
      for (var i = 0; i < all_pop_needs_categories.length; i++) {
        var local_needs_category = lookup.all_pop_needs_goods[all_pop_needs_categories[i]];

        //Iterate over local_needs_category and add to production_complexity_obj
        if (local_needs_category)
          for (var x = 0; x < local_needs_category.length; x++) {
            var local_production_complexity = production_complexity[local_needs_category[x]];

            production_complexity_obj[local_needs_category[x]] = local_production_complexity;
          }
      }

      //Standardise to fraction and invert
      production_complexity_obj = standardisePercentage(standardiseFraction(production_complexity_obj));

      //Return statement
      return production_complexity_obj;
    } else {
      log.warn(`getArtisanProductionPercentage() - lookup.all_production_complexity is not defined!`);
    }
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
          } catch {
            needs_obj = {};
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

  getProvinceRGOThroughput: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var artisan_amount = 0;
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var rgo_production = {};

    //Iterate over lookup.artisan_pops to determine artisan_amount
    if (province_obj.subsistence) {
      var subsistence_obj = province_obj.subsistence;

      var employed_pops = getObjectSum(subsistence_obj.employment);

      for (var i = 0; i < lookup.artisan_pops.length; i++)
        artisan_amount += returnSafeNumber(subsistence_obj.employment[lookup.artisan_pops[i]]);

      //Fetch RGO Production
      if (province_obj.resource) {
        var good_obj = lookup.all_goods[province_obj.resource];
        var non_artisan_amount = employed_pops - artisan_amount;
        var usr = main.users[province_obj.owner];

        //It takes good_obj.buy_price*config.defines.economy.rgo_per_production people to produce 1 good. (This is not the market price, but the base buy_price)
        var rgo_per_production = returnSafeNumber(good_obj.buy_price, 1)*config.defines.economy.rgo_per_production;

        var rgo_amount = (non_artisan_amount/rgo_per_production)*returnSafeNumber(usr.modifiers.rgo_throughput, 1);

        modifyValue(rgo_production, province_obj.resource, Math.ceil(rgo_amount));
      }
    }

    //Return statement
    return rgo_production;
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
  },

  /*
    processEmployment() - Processes the job market for a given pop type in a province
    options: {
      sorted_wage_obj: {}, - Optimisation parameter. The sorted wage object for the province.
      unemployed_pops: 3194 - Optimisation parameter. The total number of unemployed pops sitting in this province
    }
  */
  processEmployment: function (arg0_province_id, arg1_type, arg2_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var pop_type = arg1_type;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var building_map = getBuildingMap(province_id);
    var province_obj = main.provinces[province_id];
    var unemployed_pops = (options.unemployed_pops) ? options.unemployed_pops : getUnemployedPops(province_id, pop_type);

    //All unemployed pops are looking for a job
    if (province_obj)
      if (province_obj.buildings) {
        var building_wages = (options.sorted_wage_obj) ? options.sorted_wage_obj : getBuildingWages(province_id, pop_type);

        //Iterate over all_building_wages and select the range from the top of the current number of keys
        var all_building_wages = Object.keys(building_wages);
        var end_index = all_building_wages.length - 1;
        var is_strict = config.defines.economy.strict_job_seeking;
        var job_seeking_range = config.defines.economy.job_seeking_range;

        var valid_building_range = [
          Math.floor(end_index*job_seeking_range[0]),
          Math.ceil(end_index*job_seeking_range[1])
        ];
        valid_building_range.sort(function (a, b) { return a - b });

        var actual_valid_building_range = (is_strict) ? valid_building_range[0] : 0;

        //Make sure that valid_building_range exists for the target pops searching for jobs
        if (valid_building_range[0] != -1 && valid_building_range[1] != -1)
          for (var i = valid_building_range[1]; i >= actual_valid_building_range; i--) {
            var building_id = all_building_wages[i];
            var local_building = province_obj.buildings[building_map[building_id]];
            var local_key = `wealth-${building_id}-${pop_type}`;

            //Declare wealth pool if it doesn't exist
            if (!province_obj.pops[local_key])
              province_obj.pops[local_key] = {};
            var local_wealth_pool = province_obj.pops[local_key];

            //If they're currently hiring, take all the workers you can according to random_chance_roll. If positions max out, the unemployed_pops figure rolls over
            if (local_building)
              if (local_building[`${pop_type}_positions`]) {
                var random_chance_roll = Math.random();
                var random_hirees = Math.floor(unemployed_pops*random_chance_roll);

                if (unemployed_pops > 0) {
                  var available_positions = returnSafeNumber(local_building[`${pop_type}_positions`]);

                  if (available_positions > random_hirees) {
                    modifyValue(local_building.employment, pop_type, random_hirees);
                    modifyValue(local_wealth_pool, "size", random_hirees);

                    modifyValue(local_building, `${pop_type}_positions`, random_hirees*-1);

                    unemployed_pops -= random_hirees;
                  } else {
                    modifyValue(local_building.employment, pop_type, available_positions, true);
                    modifyValue(local_wealth_pool, "size", available_positions);
                    unemployed_pops -= available_positions;

                    //Delete local_building[`${pop_type}_positions`] since all the positions have been hired
                    delete local_building[`${pop_type}_positions`];
                  }
                }
              }
          }
      }
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

                  //Pop purchase logic
                  {
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
                  }

                  //Post-purchase trackers: Spending, fulfilment/variety
                  {
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
  },

  /*
    sortWealthPools() - Sorts wealth pool objects in province,
    options: {
      mode: "income"/"pop_type"/"size"/"wealth", - Optional. "size" by default
      return_object: true/false - Whether to return wealth pools as a single object. Returns keys by default
    }
  */
  sortWealthPools: function (arg0_province_id, arg1_options) {
    //Convert from parameters
    var province_id = arg0_province_id;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var mode = (options.mode) ? options.mode : "size";
    var province_obj = (typeof province_id != "object") ? main.provinces[province_id] : province_id;
    var return_obj = {};
    var subsistence_obj = {};

    //Iterate over province_obj.pops for wealth pools
    if (province_obj.pops) {
      var all_pops = Object.keys(config.pops);
      var all_pop_keys = Object.keys(province_obj.pops);
      var regular_wealth_pools = [];

      //Subsistence pools go up top
      for (var i = 0; i < all_pop_keys.length; i++)
        if (all_pop_keys[i].startsWith("wealth-")) {
          var local_value = province_obj.pops[all_pop_keys[i]];

          if (all_pop_keys[i].includes("subsistence")) {
            local_value.key = all_pop_keys[i];
            subsistence_obj[all_pop_keys[i]] = local_value;
          } else {
            //Non-subsistence handling
            var split_key = all_pop_keys[i].split("-");
            var pop_type = split_key[3];

            local_value.key = all_pop_keys[i];
            local_value.pop_type = pop_type;

            regular_wealth_pools.push(local_value);
          }
        }

      //Sort wealth pools by mode in descending order
      if (mode == "income") {
        regular_wealth_pools.sort((a, b) => b.income - a.income);
      } else if (mode == "size") {
        regular_wealth_pools.sort((a, b) => b.size - a.size);
      } else if (mode == "pop_type") {
        regular_wealth_pools.sort((a, b) => b.pop_type - a.pop_type);
      } else if (mode == "wealth") {
        regular_wealth_pools.sort((a, b) => b.wealth - a.wealth);
      }

      //Append regular_wealth_pools/new_wealth_pools to subsistence_obj as a sorted_wealth_pools_obj
      var sorted_wealth_pools_obj = {};

      for (var i = 0; i < regular_wealth_pools.length; i++) {
        var local_value = regular_wealth_pools[i];

        sorted_wealth_pools_obj[local_value.key] = local_value;
        var local_wealth_pool = sorted_wealth_pools_obj[local_value.key];

        delete local_wealth_pool.key;
        delete local_wealth_pool.pop_type;
      }

      return_obj = mergeObjects(subsistence_obj, sorted_wealth_pools_obj);

      //Return statements
      return (!options.return_object) ? Object.keys(return_obj) : return_obj;
    }
  },

  updateMigrationAttraction: function () {
    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_users = Object.keys(main.users);
    var dynamic_tables = {};
    var migration_attraction = {};

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      if (local_province.controller) {
        var local_migration_attraction = parsePopLimit(config.pop_migration.province_selection, {
          province_id: all_provinces[i],
          ignore_pop_size: true
        });

        if (local_migration_attraction.value != 0)
          modifyValue(migration_attraction, all_provinces[i], returnSafeNumber(local_migration_attraction.value));
      }
    }

    migration_attraction = sortObject(migration_attraction);
    var all_migration_attraction = Object.keys(migration_attraction);

    //Dynamic Tables - Internal Migration - [REVISIT] - This could be refactored in the future to make more sense
    {
      //Iterate over all_users to fetch internal migration attraction
      for (var i = 0; i < all_users.length; i++) {
        dynamic_tables[`${all_users[i]}-migration_attraction`] = {};
        dynamic_tables[`${all_users[i]}-external_migration_attraction`] = {};
      }

      //Iterate over all_migration_attraction; append each province dependent on control to dynamic_tables
      for (var i = 0; i < all_migration_attraction.length; i++) {
        var local_province = main.provinces[all_migration_attraction[i]];
        var local_value = migration_attraction[all_migration_attraction[i]];

        if (local_province.controller)
          dynamic_tables[`${local_province.controller}-migration_attraction`][local_province.id] = local_value;
      }

      //Standardise everything in dynamic_tables to 100%
      for (var i = 0; i < all_users.length; i++) {
        var local_key = `${all_users[i]}-migration_attraction`;
        var local_value = dynamic_tables[local_key];

        dynamic_tables[local_key] = sortObject(local_value);
        var new_dynamic_table = dynamic_tables[local_key];

        //Truncate dynamic tables at config.defines.economy.migration_provinces
        var all_internal_keys = Object.keys(new_dynamic_table);

        if (all_internal_keys.length > config.defines.economy.migration_provinces)
          for (var x = config.defines.economy.migration_provinces; x < all_internal_keys.length; x++)
            delete dynamic_tables[local_key][all_internal_keys[x]];

        //Add dynamic tables to lookup
        lookup[local_key] = dynamic_tables[local_key];
      }
    }

    //Dynamic Tables - External Migration
    {
      for (var i = 0; i < all_users.length; i++) {
        var key_name = `${all_users[i]}-external_migration_attraction`;
        var province_count = 0;

        //Iterate over all_migration_attraction
        for (var x = 0; x < all_migration_attraction.length; x++) {
          var local_province = main.provinces[all_migration_attraction[x]];
          var local_value = migration_attraction[all_migration_attraction[x]];

          //Upper bound guard clause
          if (province_count >= config.defines.economy.migration_provinces)
            break;
          if (local_province.controller != all_users[i]) {
            dynamic_tables[key_name][local_province.id] = local_value;
            province_count++;
          }
        }

        //Standardise percentage for local dynamic table, add to lookup
        lookup[key_name] = standardisePercentage(dynamic_tables[key_name]);
      }
    }

    //Truncate migration_attraction at config.defines.economy.migration_provinces
    if (all_migration_attraction.length > config.defines.economy.migration_provinces)
      for (var i = config.defines.economy.migration_provinces; i < all_migration_attraction.length; i++)
        delete migration_attraction[all_migration_attraction[i]];

    migration_attraction = standardisePercentage(migration_attraction);
    lookup.province_migration_attraction = migration_attraction;

    //Return statement
    return migration_attraction;
  }
};
