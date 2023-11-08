module.exports = {
  //Generates a new rural province based on province ID and parsed owner tag
  settleProvince: function (arg0_user_id, arg1_province) { //[WIP] - Change to use createPops()
    //Convert from parameters
    var user_id = arg0_user_id;
    var province_id = arg1_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    try {
      if (!province_obj.type) {
        var primary_culture = getPrimaryCultures(user_id)[0];

        //Set province type and culture
        province_obj.owner = actual_id;
        province_obj.controller = actual_id; //Used for occupations and other shenanigans

        province_obj.type = "rural";

        //Generate pops
        var all_pop_types = Object.keys(config.pops);
        var population_cache = randomNumber(
          (config.defines.initial_rural_population_minimum) ?
            config.defines.initial_rural_population_minimum :
            30000,
          (config.defines.initial_rural_population_maximum) ?
            config.defines.initial_rural_population_maximum :
            50000
        );
        province_obj.pops = {};
        province_obj.trackers = {};

        //Add pops to province object
        for (var i = 0; i < all_pop_types.length; i++)
          if (config.pops[all_pop_types[i]].specialised_pop) {
            //Roll the dice for the local pop type
            var local_pop = config.pops[all_pop_types[i]];
            var random_percentage = randomNumber((local_pop.chance*100)/2, (local_pop.chance*100)*2);
            var population_change = Math.ceil(population_cache*(random_percentage/100));

            createPops(province_id, {
              type: all_pop_types[i],
              amount: population_change
            });

            //Deduct from cache
            population_cache -= population_change;
          }

        //Partition the remaining pops in the cache between the non-specialised pops
        for (var i = 0; i < all_pop_types.length; i++)
          if (!config.pops[all_pop_types[i]].specialised_pop)
            try {
              var population_change = Math.ceil(population_cache*config.pops[all_pop_types[i]].chance);

              createPops(province_id, {
                type: all_pop_types[i],
                amount: population_change
              });
            } catch (e) {
              log.warn(`settleProvince() - ran into an error whilst generating pops of type ${all_pop_types[i]} in Province ID ${province_id}: ${e}.`);
              console.log(e);
            }

        //Calculate total population of province
        var total_population = 0;
        for (var i = 0; i < all_pop_types.length; i++) {
          total_population += returnSafeNumber(province_obj.pops[all_pop_types[i]]);
          usr.pops[all_pop_types[i]] += returnSafeNumber(province_obj.pops[all_pop_types[i]]);
        }

        //Set culture and other modifiers/trackers
        province_obj.pops.population = total_population;
        usr.population += total_population;
        usr.provinces++;

        //Change province colour
        setAllProvinceColours(user_id, province_id);
      } else {
        log.warn(`settleProvince() - ran into an error whilst generating Province ID ${province_id}: Province already had a province type.`);
        console.log(e);
      }
    } catch (e) {
      log.warn(`Could not generate Province ID ${province_id}: ${e}.`);
      console.log(e);
    }
  }
};
