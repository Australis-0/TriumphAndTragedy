module.exports = {
  printCities: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(usr.cities, {
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
  }
};
