module.exports = {
  printProvinces: function (arg0_user) { //[WIP]
    //TODO: Print cities first before rural provinces
    //TODO: Print provinces
    //TODO: Implement UI in pops tab

    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(actual_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });
    var provinces = getProvinces(actual_id, {
      exclude_cities: true,
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise province_string
    var province_string = [];

    //Format province_string
    province_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    province_string.push("");
    province_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    province_string.push("");

    province_string.push(config.localisation.divider);
    province_string.push(`**Provinces:**`);

    if (cities.length != 0 || provinces.length != 0) {
      //Print cities first
      province_string.push("");
      province_string.push(`**Cities:**`);
      province_string.push("");
      if (cities.length != 0) {
        for (var i = 0; i < cities.length; i++) {
          province_string.push(`**${cities[i].name}**:`);
          province_string.push(`**[View ${cities[i].name}]**`);
          province_string.push("");
          province_string.push(`- ${config.icons.population} Population: **${parseNumber(cities[i].pops.population)}**`);

          //Print individual pop statistics
          for (var x = 0; x < all_pops.length; x++)
            province_string.push(`- ${(config.pops[all_pops[i]].icon) ? config.pops[all_pops[i]].icon : ""} ${(config.pops[all_pops[i]].name) ? config.pops[all_pops[i]].name : all_pops[i]}: ${parseNumber(cities[i].pops[all_pops[i]])}`);
        }

        //Print culture
        province_string.push(`- ${config.icons.culture} Culture: ${cities[i].culture}`);
      } else {
        (provinces.length > 0) ?
          province_string.push(`_We currently have no cities to speak of! Consider founding a new city by typing **[Found City]**._`) :
          province_string.push(`_We are currently without cities or provinces, rendering us nonexistent in all but name._`);
      }
      province_string.push("");
      province_string.push(`${config.localisation.divider}`);

      //Print rural provinces next
      province_string.push("");
      if (provinces.length != 0) {
        for (var i = 0; i < provinces.length; i++) {
          province_string.push(`**Province ${provinces[i].id}**:`);
          province_string.push(`**[View Province ${provinces[i].id}]**`);
          province_string.push(`- ${config.icons.population} Population: **${parseNumber(cities[i].pops.population)}**`);

          //Print individual pop statistics again
          for (var x = 0; x < all_pops.length; x++)
            province_string.push(`- ${(config.pops[all_pops[i]].icon) ? config.pops[all_pops[i]].icon : ""} ${(config.pops[all_pops[i]].name) ? config.pops[all_pops[i]].name : all_pops[i]}: ${parseNumber(cities[i].pops[all_pops[i]])}`);
        }

        //Print culture
        province_string.push(`- ${config.icons.culture} Culture: ${cities[i].culture}`);
      } else {
        province_string.push(`_We do not have any rural provinces in our possession._`);
      }
    } else {
      province_string.push(`_You currently don't have any provinces in your possession!_`);
      province_string.push("");
      province_string.push(`_Consider settling or acquiring a new province to start building up your country._`);
    }

    //Return statement
    return splitEmbed(province_string, {
      title: "Province List:",
      title_pages: true,
      fixed_width: true
    });
  }
};
