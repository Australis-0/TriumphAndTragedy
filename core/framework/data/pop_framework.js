module.exports = {
  getFaminePenalty: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var usr = main.users[user_id];

    //Declare local instance variables
    var government_obj = config.governments[usr.government];
    var famine_penalty = (government_obj.effect.famine_penalty) ? government_obj.effect.famine_penalty : 0.1;

    //Return statement
    return Math.ceil(usr.population*famine_penalty);
  },

  getMilitaryPops: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var military_pop_types = [];

    for (var i = 0; i < all_pops.length; i++)
      if (config.pops[all_pops[i]].military_pop)
        military_pop_types.push(all_pops[i]);

    //Return statement
    return military_pop_types;
  },

  getTotalPopManpower: function (arg0_user, arg1_type, arg2_raw_modifier) { //WIP
    //Convert from parameters
    var user_id = arg0_user;
    var usr = main.users[user_id];
    var pop_type = arg1_type;
    var raw_modifier = arg2_raw_modifier;

    //Declare local instance variables
    var pop_obj = config.pops[pop_type];
    var availability_modifier = (pop_obj.military_pop) ?
      usr.modifiers.national_manpower
      : 1;

    //Return statement
    return (!raw_modifier) ? Math.ceil(usr.pops[pop_type]*availability_modifier) : availability_modifier;
  },

  getPopulation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var usr = main.users[user_id];

    //Declare local instance variables
    var all_pops = Object.keys(config.pops);
    var total_population = 0;

    //Fetch total population
    for (var i = 0; i < all_pops.length; i++)
      total_population += usr.pops[all_pops[i]];

    //Return statement
    return total_population;
  },

  killPops: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = arg1_options;

    //Declare local instance variables
    var decimation_obj = {};
    var pop_types = getList(options.type);
    var remaining_population = options.amount;

    //Parse 'all' argument as well
    pop_types = (pop_types.includes("all")) ? Object.keys(config.pops) : pop_types;

    //Assign decimation_array to decimation_obj
    var decimation_array = splitNumberParts(1, pop_types.length);

    for (var i = 0; i < pop_types.length; i++)
      decimation_obj[pop_types[i]] = decimation_array[i];

    //Begin subtracting pops
    for (var i = 0; i < pop_types.length; i++)
      removePops(user_id, Math.ceil(decimation_obj[pop_types[i]]*remaining_population), pop_types[i]);
  },

  parsePops: function () {
    //Declare local instance variables
    var all_pops = Object.keys(config.pops);

    //Process pop objects
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      //Set icon values
      if (local_pop.icon) local_pop.icon = config.icons[local_pop.icon];
    }
  },

  removePops: function (arg0_user, arg1_amount, arg2_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var usr = main.users[user_id];
    var amount = arg1_amount;
    var remaining_population = returnSafeNumber(amount);
    var pop_type = arg2_type;

    //Declare local instance variables
    var shuffled_provinces = shuffleArray(getProvinces(user_id));

    //Begin subtracting
    for (var i = 0; i < shuffled_provinces.length; i++)
      if (remaining_population > 0)
        if (shuffled_provinces[i].pops[pop_type] >= remaining_population) {
          shuffled_provinces[i].pops[pop_type] -= remaining_population;
          remaining_population = 0;
        } else {
          shuffled_provinces[i].pops[pop_type] = 0;
          remaining_population -= shuffled_provinces[i].pops[pop_type];
        }

    //Append to either recent_civilian_casualties or recent_military_casualties depending on pop type
    (getMilitaryPops().includes(pop_type)) ?
      usr.recent_military_casualties[usr.recent_military_casualties.length-1] += returnSafeNumber(amount) :
      usr.recent_civilian_casualties[usr.recent_civilian_casualties.length-1] += returnSafeNumber(amount);
  }
};
