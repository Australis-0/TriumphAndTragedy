module.exports = {
  printStats: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_cities = [];
    var all_national_modifiers = Object.keys(usr.national_modifiers);

    //Initialise stats_string
    var stats_string = [];

    //Fetch city list
    var cities = [];
    var ending_string = "";
    var name_array = [];
    var name_string = "";
    var usr_provinces = getCountryProvinces(actual_id);

    //Append cities to list
    for (var i = 0; i < usr_provinces.length; i++)
      if (usr_provinces[i].type == "urban") {
        var local_city = usr_provinces[i];
        cities.push({
          name: local_city.name,
          population: local_city.population,
          type: local_city.city_type //Capital or regular city
        });
      }

    //Sort cities by population
    cities.sort(function (a, b) {
      return b.population - a.population;
    });

    var capital_included = false;
    for (var i = 0; i < cities.length; i++)
      if (i < 15) {
        if (cities[i].type == "capital") {
          capital_included = true;
          name_array.push(`**${local_city.name}**`);
        }
        name_array.push(local_city.name);
      }

    if (name_array.length >= 2) {
      name_array[name_array.length-1] = `and ${name_array[name_array.length-1]}`;
      name_string = (name_array.length > 2) ? name_array.join(", ") : name_array.join(" ");
    } else {
      name_string = name_array[0];
    }

    if (cities.length > name_array.length) ending_string = `, (+${cities.length-name_array.length} more)`;

    //Format embed
    stats_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    stats_string.push(`<@${user_id}> ¦ _${(usr.motto) ? usr.motto : "_No motto set._"}_`)
    stats_string.push("");
    stats_string.push(`${config.icons.prestige} Prestige: **${parseNumber(usr.prestige)}** (${(usr.modifiers.prestige_gain > 0) ? "+" : ""}${usr.modifiers.prestige_gain} per turn)`);
    stats_string.push(`${config.icons.provinces} Provinces: **${parseNumber(usr.provinces)}**`);
    stats_string.push("");
    stats_string.push(`**[Customisation]**`);
    if (all_national_modifiers > 0) {
      stats_string.push("");
      stats_string.push(`You currently have **${parseNumber(all_national_modifiers.length)}** National Modifier(s) active.`);
      stats_string.push(`**[View National Modifiers]**`);
    }
    stats_string.push(config.localisation.divider);
    stats_string.push(`**Population**`);
    stats_string.push("");
    stats_string.push(`${config.icons.development} Cities: (**${usr.city_count}**/**${usr.city_cap}): ${name_string}${ending_string}`);
    stats_string.push(`${config.icons.population} Population: **${parseNumber(usr.population)}** (Requires **${Math.ceil(usr.population/1000000)}** food per turn)`);
    
  }
};
