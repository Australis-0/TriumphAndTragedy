module.exports = {
  printCities: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(user_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise city_string, fields_list
    var city_string = [];
    var fields_list = [];

    //Format string
    city_string.push(`**[Back]** | **[Jump To Page]** | **[View]**`);
    city_string.push("");
    city_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    city_string.push("");

    //Check if user can found new cities, and if so push dynamic buttons to city_string
    if (usr.city_count < usr.city_cap) {
      city_string.push(`You can found up to **${parseNumber(usr.city_cap-usr.city_count)}** new citie(s) in your territories!`);
      city_string.push("");
      city_string.push(`**[Found City]**`);
      city_string.push("");
    }

    city_string.push(config.localisation.divider);
    city_string.push("");
    city_string.push(`__**Cities:**__`);

    if (cities.length != 0) {
      for (var i = 0; i < cities.length; i++) {
        var local_field = [];

        //Display occupation status
        if (cities[i].owner != cities[i].controller)
          (cities[i].controller != actual_id) ?
            local_field.push(`- Currently occupied by **${main.users[cities[i].controller].name}**.`) :
            local_field.push(`- This city is currently occupied by us in a war! We won't be able to gain resources from it until it is legally annexed by us.`);

        local_field.push(`- ${config.icons.provinces} Province: ${cities[i].id}`);
        local_field.push(`- ${config.icons.population} Population: ${parseNumber(cities[i].pops.population)}/${parseNumber(cities[i].housing)} (**${printPercentage(getCityPopGrowthRate(cities[i]), { base_zero: true, display_prefix: true })}**)`);
        local_field.push(`- RGO: ${(getGood(cities[i].resource).icon) ? config.icons[getGood(cities[i].resource).icon] + " " : ""} ${(getGood(cities[i].resource).name) ? getGood(cities[i].resource).name : cities[i].resource}`);

        //Print culture
        fields_list.push({ name: `[View **${cities[i].name}**] ${(cities[i].city_type == "capital") ? " - Capital City" : ""}`, value: local_field.join("\n"), inline: true });
      }
    } else {
      city_string.push("");
      city_string.push(`_You currently don't have any cities in your possession!_`);
      city_string.push("");
      city_string.push(`_Consider founding a new city to start building up your country._`);
      city_string.push(`- You can found a new city by typing **[Found City]**.`);
    }

    //Return statement
    return (fields_list.length > 0) ?
      splitEmbed(city_string, {
        fields: fields_list,
        fixed_width: true,
        maximum_fields: 12,
        table_width: 2,
        title: "City List:",
        title_pages: true
      }) :
      splitEmbed(city_string, {
        title: "City List:",
        title_pages: true
      });
  }
};
