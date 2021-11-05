module.exports = {
  printCities: function (arg0_user) { //[WIP] - Add found cities button later if option is available for user
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(actual_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise city_string
    var city_string = [];

    //Format string
    city_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    city_string.push("");
    city_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    city_string.push(config.localisation.divider);
    city_string.push("");
    city_string.push(`**Cities:**`);

    for (var i = 0; i < cities.length; i++) {
      city_string.push(`[View **${cities[i].name}**] - ${(cities[i].city_type == "capital") ? " - Capital City" : ""}`)
      city_string.push(`- ${config.icons.provinces} Province: ${cities[i].id}`);
      city_string.push(`- ${config.icons.population} Population: ${cities[i].pops.population}/${cities[i].housing}`);
      city_string.push(`- RGO: ${(getGood(cities[i].resource).icon) ? config.icons[getGood(cities[i].resource).icon] + " " : ""} ${(getGood(cities[i].resource).name) ? getGood(cities[i].resource).name : cities[i].resource}`);
    }

    return splitEmbed(city_string, {
      title: "City List:",
      title_pages: true
    });
  },

  printCity: function (arg0_user, arg1_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var city_obj = getCity(city_name);
    var rgo_name = (getGood(city_obj.resource).name) ? getGood(city_obj.resource).name : city_obj.resource;
    var rgo_icon = (getGood(city_obj.resource).icon) ? config.icons[getGood(city_obj.resource).icon] + " " : "";

    //Initialise city_string
    var city_string = [];

    //Format string
    city_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    city_string.push("");
    city_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    city_string.push(`Type **[Cities]** to view a full list of all your cities.`);
    city_string.push("");
    city_string.push(config.localisation.divider);
    city_string.push("");
    city_string.push(`City Options: ${(city_obj.city_type != "capital") ? "**[Move Capital]** ¦ " : ""}**[Rename City]**`);
    city_string.push(`Manage Buildings: **[Build]** ¦ **[Demolish]**`);
    city_string.push(`Promote Urbanisation: **[Develop]** - Gain an extra building slot in this city for **${parseNumber(getDevelopmentCost(actual_id, city_name))}** ${config.icons.political_capital} Political Capital.`);
    city_string.push(config.localisation.divider);

    //Print city information
    city_string.push(`**${city_obj.name}:**`);
    city_string.push("");
    city_string.push(`**Province:** ${config.icons.provinces} ${city_obj.id}`);
    city_string.push(`**Population:** ${config.icons.population} ${parseNumber(city_obj.pops.population)}`);
    city_string.push(`**RGO:** ${rgo_icon}${rgo_name}`);
    city_string.push(`- **${(usr.modifiers.rgo_throughput-1 >= 0) ? "+" : ""}${printPercentage(usr.modifiers.rgo_throughput-1)}** modifier to ${rgo_icon}${rgo_name} production in this province.`);
    city_string.push(`**Development:** ${config.icons.development} ${parseNumber(city_obj.development)}`);
  }
};
