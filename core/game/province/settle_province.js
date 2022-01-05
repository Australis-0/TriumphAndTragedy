module.exports = {
  //Generates a new rural province based on province ID and parsed owner tag
  settleProvince: function (arg0_province, arg1_owner) {
    //Convert from parameters
    var province_id = arg0_province;
    var owner_id = arg1_owner;

    //Declare local instance variables
    var province_obj = main.provinces[province_id];
    var usr = main.users[arg1_owner];

    try {
      if (!province_obj.type) {
        //Set province type and culture
        province_obj.owner = owner_id;
        province_obj.controller = owner_id; //Used for occupations and other shenanigans

        province_obj.type = "rural";
        province_obj.culture = usr.culture;

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

        //Add pops to province object
        for (var i = 0; i < all_pop_types.length; i++)
          if (config.pops[all_pop_types[i]].specialised_pop) {
            //Roll the dice for the local pop type
            var local_pop = config.pops[all_pop_types[i]];
            var random_percentage = randomNumber((local_pop.chance*100)/2, (local_pop.chance*100)*2);
            var population_change = Math.ceil(population_cache*(random_percentage/100));

            province_obj.pops[all_pop_types[i]] = population_change;

            //Deduct from cache
            population_cache -= population_change;
          }

        //Partition the remaining pops in the cache between the non-specialised pops
        for (var i = 0; i < all_pop_types.length; i++)
          if (!config.pops[all_pop_types[i]].specialised_pop)
            try {
              province_obj.pops[all_pop_types[i]] = Math.ceil(population_cache*config.pops[all_pop_types[i]].chance);
            } catch (e) {
              log.warn(`settleProvince() - ran into an error whilst generating pops of type ${all_pop_types[i]} in Province ID ${province_id}: ${e}.`);
              console.log(e);
            }

        //Calculate total population of province
        var total_population = 0;
        for (var i = 0; i < all_pop_types.length; i++) {
          total_population += province_obj.pops[all_pop_types[i]];
          usr.pops[all_pop_types[i]] += province_obj.pops[all_pop_types[i]];
        }

        //Set culture and other modifiers/trackers
        province_obj.pops.population = total_population;
        province_obj.culture = usr.pops.primary_culture;
        usr.population += total_population;
        usr.provinces++;

        //Change province colour
        setProvinceColour("political", province_id, usr.colour);
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
