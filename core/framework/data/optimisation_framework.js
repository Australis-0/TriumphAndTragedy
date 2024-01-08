module.exports = {
  initOptimisation: function () {
    global.reserved = {
      buildings: ["aliases", "ideal_climate", "name", "singular", "unlimited_slots"],
      building_category_keys: ["icon", "name", "order", "taxable"],
      building_good_keys: ["cost", "maintenance", "production"],
      goods: ["aliases", "buy_price", "chop_action_chance", "mine_action_chance", "name", "icon", "id", "quarry_action_chance", "sell_price", "type"],
      pop_needs_order: ["staple_goods", "luxury_goods"],
      pop_scope_sum_keys: ["size", "wealth", "tags"],
      production_choice: ["aliases", "name", "icon"],
      reform_keys: ["icon", "name", "order"],
      unit_category_keys: ["branch_name", "icon", "name", "order", "type"],
      unit_good_keys: ["cost", "maintenance"]
    };
    global.lookup = {
      all_buildings: getBuildings({ return_object: true }),
      all_buildings_categories: getBuildingsToCategoryMap(),
      all_event_names: getEvents({ return_names: true }),
      all_events: getEvents(),
      all_good_names: getGoods({ return_names: true }),
      all_good_names_excluding_hidden: getGoods({ exclude_hidden: true, return_names: true }),
      all_goods: getGoods({ return_object: true }),
      all_goods_excluding_hidden: getGoods({ exclude_hidden: true }),
      all_goods_array: getGoods(),
      all_modifiers: getAllModifiers(),
      all_modifier_names: getAllModifiers({ return_names: true }),
      all_national_modifiers: getNationalModifiers(),
      all_national_modifier_names: getNationalModifiers({ return_names: true }),
      all_pop_classes: getPopClasses(),
      all_pop_needs: getAllPopNeeds(),
      all_pop_needs_categories: getAllPopNeedCategories(),
      all_pop_needs_goods: getAllPopCategoriesNeeds(),
      all_subgoods: getGoodsSubgoods(),
      all_units: getAllUnits({ return_object: true }),
      all_unit_names: getAllUnits({ return_names: true }),
      goods_depth: getDepth(config.goods) - 1,
      good_types: getGoodTypes(),

      building_category: getBuildingsToCategoryMap(),

      province_controllers: {},
      province_migration_attraction: {},
      province_owners: {},
      province_troop_strengths: {},

      /* Dynamic tables:
        <user_id>-external_migration_attraction: {},
        <user_id>-migration_attraction: {}
      */
    };

    //Init global check
    if (!main.provinces) initGlobal();

    //Process config
    {
      //Budget processing
      {
        var all_taxes = Object.keys(config.budget.taxes);

        for (var i = 0; i < all_taxes.length; i++) {
          var local_value = config.budget.taxes[all_taxes[i]];

          if (typeof local_value == "object")
            local_value.id = all_taxes[i];
        }
      }

      //Building processing
      {
        //Push lowercase singular to aliases
        var all_building_categories = Object.keys(config.buildings);

        for (var i = 0; i < all_building_categories.length; i++) {
          var local_building_category = config.buildings[all_building_categories[i]];

          var all_buildings_in_category = Object.keys(local_building_category);

          for (var x = 0; x < all_buildings_in_category.length; x++) {
            var local_building = local_building_category[all_buildings_in_category[x]];

            //Set ID
            local_building.id = all_buildings_in_category[x];

            //Set aliases/singular
            if (typeof local_building == "object")
              if (local_building.singular)
                if (!local_building.aliases) {
                  local_building.aliases = [local_building.singular.toLowerCase()];
                } else {
                  local_building.aliases.push(local_building.singular.toLowerCase());
                }
          }
        }
      }

      //Goods processing
      {
        if (config.goods.hidden) {
          var all_hidden_goods = Object.keys(config.goods.hidden);

          for (var i = 0; i < all_hidden_goods.length; i++) {
            var local_good = config.goods.hidden[all_hidden_goods[i]];

            local_good.hidden = true;
          }
        }

        lookup.all_production = getAllProductionChains();
        lookup.all_production_complexity = getAllProductionChainsComplexity();
        lookup.all_production_fraction_complexity = standardiseFraction(lookup.all_production_complexity);
        lookup.all_production_percent_complexity = standardisePercentage(lookup.all_production_complexity);

        lookup.artisan_production_percent = getArtisanProductionPercentage();
      }

      //Market processing
      {
        {
          lookup.category_buy_prices = getCategoryPrices("buy");
          lookup.category_sell_prices = getCategoryPrices("sell");
        }
      }

      //Pop processing
      {
        var all_good_categories = Object.keys(config.defines.economy.good_categories);
        var all_pops = Object.keys(config.pops);

        {
          lookup.all_classes = Object.keys(lookup.all_pop_classes);
          lookup.staple_goods_utilities = getNeedsUtilities({ staple_goods: true });
          lookup.luxury_goods_utilities = getNeedsUtilities();
        }

        getNeedsImportance();

        for (var i = 0; i < lookup.all_pop_needs_categories.length; i++)
          lookup[lookup.all_pop_needs_categories[i]] = getNeedsCategory(lookup.all_pop_needs_categories[i]);

        //Sort buy order categories
        for (var i = 0; i < all_pops.length; i++)
          if (typeof config.pops[all_pops[i]] == "object") {
            var local_pop = config.pops[all_pops[i]];

            if (local_pop.buy_order) {
              for (var x = 0; x < local_pop.buy_order.length; x++) {
                var local_category_order = local_pop[`${local_pop.buy_order[x]}-buy_order`];

                //Sort local_category_order in descending order
                local_category_order.sort((first_needs_group, second_needs_group) => second_needs_group.importance - first_needs_group.importance);
              }

              //Sort goods_buy_order
              if (!local_pop.goods_buy_order) local_pop.goods_buy_order = [];

              for (var x = 0; x < all_good_categories.length; x++) {
                var local_good_category = config.defines.economy.good_categories[all_good_categories[x]];

                var current_allowance_percentage = returnSafeNumber(local_good_category.importance, 1);

                for (var y = 0; y < local_pop.buy_order.length; y++) {
                  var local_buy_order = local_pop[`${local_pop.buy_order[y]}-buy_order`];
                  var local_category = local_pop.per_100k.needs[local_pop.buy_order[y]];

                  for (var z = 0; z < local_buy_order.length; z++) {
                    var local_needs_group = local_pop.per_100k.needs[local_pop.buy_order[y]][local_buy_order[z].name];

                    var all_local_needs = Object.keys(local_needs_group);
                    var local_allowance = current_allowance_percentage/local_pop.buy_order.length;

                    for (var a = 0; a < all_local_needs.length; a++)
                      local_pop.goods_buy_order.push({
                        good_type: all_local_needs[a],
                        category: local_pop.buy_order[y],
                        group: local_buy_order[z],

                        amount: local_needs_group[all_local_needs[a]],
                        allowance: local_allowance/all_local_needs.length
                      });
                  }
                }
              }
            }
          }
      }

      //User processing
      try {
        updateControl();
        updateOwnership();
      } catch (e) {
        log.error(`initOptimisation() - updateControl(), updateOwnership() ran into errors!`);
        console.log(e);
      }

      //Post-user processing - KEEP AT BOTTOM!
      try {
        updateMigrationAttraction();
      } catch (e) {
        log.error(`initOptimisation() - updateMigrationAttraction() ran into errors!`);
        console.log(e);
      }
    }

    //Cache all users
    var guilds = client.guilds.cache.map(guild => guild.id);

    for (var i = 0; i < guilds.length; i++)
      client.guilds.cache.get(guilds[i]).members.fetch();

    //Post-loading optimisation
    setTimeout(function(){
      var all_provinces = Object.keys(main.provinces);

      //Troop strengths
      for (var i = 0; i < all_provinces.length; i++)
        lookup.province_troop_strengths[all_provinces[i]] = returnSafeNumber(getTroopsInProvince(all_provinces[i]));
    }, 2000);
  }
};
