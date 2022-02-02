module.exports = {
  printCities: function (arg0_user) {
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
    city_string.push(`**Cities:**`);

    if (cities.length != 0) {
      for (var i = 0; i < cities.length; i++) {
        city_string.push(`[View **${cities[i].name}**] ${(cities[i].city_type == "capital") ? " - Capital City" : ""}`);

        //Display occupation status
        if (cities[i].owner != cities[i].controller)
          (cities[i].controller != actual_id) ?
            city_string.push(`- Currently occupied by **${main.users[cities[i].controller].name}**.`) :
            city_string.push(`- This city is currently occupied by us in a war! We won't be able to gain resources from it until it is legally annexed by us.`);

        city_string.push(`- ${config.icons.provinces} Province: ${cities[i].id}`);
        city_string.push(`- ${config.icons.population} Population: ${parseNumber(cities[i].pops.population)}/${parseNumber(cities[i].housing)}`);
        city_string.push(`- RGO: ${(getGood(cities[i].resource).icon) ? config.icons[getGood(cities[i].resource).icon] + " " : ""} ${(getGood(cities[i].resource).name) ? getGood(cities[i].resource).name : cities[i].resource}`);
      }
    } else {
      city_string.push("");
      city_string.push(`_You currently don't have any cities in your possession!_`);
      city_string.push("");
      city_string.push(`_Consider founding a new city to start building up your country._`);
      city_string.push(`- You can found a new city by typing **[Found City]**.`);
    }

    //Return statement
    return splitEmbed(city_string, {
      title: "City List:",
      title_pages: true,
      fixed_width: true
    });
  },

  printCity: function (arg0_user, arg1_name) { //[WIP] - Add under_construction later
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var city_obj = getCity(city_name);

    if (city_obj) {
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

      city_string.push("");
      city_string.push(`**Buildings:**`);
      city_string.push(config.localisation.divider);
      city_string.push("");

      //Display buildings in building categories!
      var all_building_categories = getBuildingCategories();
      var people_housed = 0;

      //Fetch housing amount first
      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = getBuildingCategory(all_building_categories[i]);

        //Iterate over all building objects in array
        var all_buildings_in_category = Object.keys(local_building_category);

        //Fetch housing amount
        for (var x = 0; x < all_buildings_in_category.length; x++)
          for (var y = 0; y < city_obj.buildings.length; y++) {
            var local_building = getBuilding(city_obj.buildings[y].building_type);

            if (local_building.houses)
              people_housed += local_building.houses;
          }
      }

      for (var i = 0; i < all_building_categories.length; i++) {
        var local_building_category = getBuildingCategory(all_building_categories[i]);
        var local_building_slots = getBuildingSlots(actual_id, city_name, all_building_categories[i]);
        var special_string = (local_building_category.is_housing || local_building_category.description) ?
          (local_building_category.is_housing) ?
            `\n • **Current Limit:** ${parseNumber(people_housed)}. Cities cannot grow once they surpass their housing limit. Build more **housing** to increase this limit.` :
            `\n • ${local_building_category.description}`
        : "";

        //Display category and all buildings inside only if the local building category should either always be displayed or buildings are present inside of the building category
        if (local_building_category)
          if (local_building_slots.total_buildings > 0 || local_building_slots.total_buildings_under_construction > 0 || local_building_category.always_display) {
            //Generate and push header to page
            (local_building_slots.available_slots != -1) ?
              city_string.push(`- **${parseString(all_building_categories[i])}:** (${parseNumber(local_building_slots.total_buildings)}/${parseNumber(local_building_slots.total_slots)}) ${special_string}`) :
              city_string.push(` - **${parseString(all_building_categories[i])}:** ${special_string}`);

            //Iterate over all building objects in array
            for (var x = 0; x < all_buildings_in_category.length; x++)
              if (!ignore_building_keys.includes(all_buildings_in_category[x])) {
                var all_buildings = 0;
                var local_building = getBuilding(all_buildings_in_category[x]);
                var local_building_name = (local_building.name) ? local_building.name : all_buildings_in_category[x];
                var local_slots = getBuildingSlots(actual_id, city_name, all_buildings_in_category[x]);

                for (var y = 0; y < city_obj.buildings.length; y++)
                  if (city_obj.buildings[y].building_type == all_buildings_in_category[x])
                    all_buildings++;

                if (all_buildings > 0 || local_slots.total_buildings_under_construction > 0)
                  city_string.push(` - ${local_building_name}: ${parseNumber(all_buildings)}${(local_slots) ? " (" + parseNumber(all_buildings) + "/" + parseNumber(local_slots.total_slots) + ")" : ""} ${(total_buildings_under_construction > 0) ? `(+${parseNumber(local_slots.total_buildings_under_construction)} under construction)` : ""}`);
              }
          }
      }

      //Change game_obj.page
      game_obj.page = `view_city_${city_obj.name}`;

      //Return statement
      return splitEmbed(city_string, {
        title: `${city_obj.name}:`,
        title_pages: true,
        fixed_width: true
      });
    } else {
      printError(game_obj.id, `The city of ${city_name} couldn't be found anywhere in your territory!`);
    }
  }
};
