module.exports = {
  printPops: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_pops = Object.keys(config.pops);
    var all_provinces = getCountryProvinces(user_id);
    var rural_pops = {
      population: 0
    };
    var urban_pops = {
      population: 0
    };

    for (var i = 0; i < all_provinces.length; i++)
      for (var x = 0; x < all_pops.length; x++) {
        switch (all_provinces[i].type) {
          case "rural":
              rural_pops[all_pops[x]] = (rural_pops[all_pops[x]]) ?
                rural_pops[all_pops[x]] + all_provinces[i].pops[all_pops[x]] :
                all_provinces[i].pops[all_pops[x]];

            break;
          case "urban":
              urban_pops[all_pops[x]] = (urban_pops[all_pops[x]]) ?
                urban_pops[all_pops[x]] + all_provinces[i].pops[all_pops[x]] :
                all_provinces[i].pops[all_pops[x]];

            break;
        }

    //Calculate total rural population
    for (var i = 0; i < all_pops.length; i++)
      rural_pops.population += rural_pops[all_pops[i]];

    //Calculate total urban population
    for (var i = 0; i < all_pops.length; i++)
      urban_pops.population += urban_pops[all_pops[i]];

    //Initialise pops_string
    var pops_string = [];

    //Format embed
    pops_string.push(`**[Back]**`);
    pops_string.push("");
    pops_string.push(`${config.icons.culture} **[Culture]** ¦ ${config.icons.population} **[View Provinces]**`);
    pops_string.push("");
    pops_string.push("**Urban Population:**");
    pops_string.push("");
    pops_string.push(`${config.icons.development} Urban Population: **${printPercentage(urban_pops.population/usr.population)}**`);

    //Print dynamic rural pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      pops_string.push(`- ${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(rural_pops[all_pops[i]])}`);
    }

    pops_string.push("");
    pops_string.push(config.localisation.divider);
    pops_string.push(`**Rural Population:**`);
    pops_string.push("");
    pops_string.push(`${config.icons.provinces} Rural Population: **${printPercentage(rural_pops.population/usr.population)}**`);

    //Print dynamic urban pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      pops_string.push(`- ${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(urban_pops[all_pops[i]])}`);
    }

    pops_string.push("");
    pops_string.push(config.localisation.divider);
    pops_string.push(`**Total Population:**`);
    pops_string.push("");

    //Print dynamic total pops - Total
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      pops_string.push(`- ${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}Total ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(usr.pops[all_pops[i]])}`);
    }

    //Print dynamic total pops - Availability
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.stats_display)
        pops_string.push(`- ${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}Available ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]])}`);
    }

    pops_string.push(`**Population Modifiers:**`);
    pops_string.push("");

    //Print dynamic population modifiers - WIP

    //Print static population modifiers
    pops_string.push(`${config.icons.development} Population Growth Modifier: **${printPercentage(usr.modifiers.pop_growth_modifier-1)}**`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Edit main embed display
    const population_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Population:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(pops_string.join("\n"));

    game_obj.main_embed = population_embed;
    game_obj.main_change = true;
  }
};
