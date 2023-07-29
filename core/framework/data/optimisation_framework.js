module.exports = {
  initOptimisation: function () {
    global.reserved = {
      buildings: ["aliases", "ideal_climate", "name", "singular", "unlimited_slots"],
      building_good_keys: ["cost", "maintenance", "production"],
      goods: ["aliases", "name", "icon", "id", "type"],
      pop_needs_order: ["staple_goods", "luxury_goods"],
      unit_good_keys: ["cost", "maintenance"]
    };
    global.lookup = {
      all_buildings: getBuildings({ return_object: true }),
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
      all_pop_needs: getAllPopNeeds(),
      all_units: getAllUnits({ return_object: true }),
      all_unit_names: getAllUnits({ return_names: true }),

      building_category: getBuildingsToCategoryMap(),

      province_troop_strengths: {}
    };

    //Process config
    {
      //Building processing
      //Push lowercase singular to aliases
      var all_building_categories = Object.keys(config.buildings);

      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = config.buildings[all_building_categories[i]];

        var all_buildings_in_category = Object.keys(local_building_category);

        for (var x = 0; x < all_buildings_in_category.length; x++) {
          var local_building = local_building_category[all_buildings_in_category[x]];

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
