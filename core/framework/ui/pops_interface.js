module.exports = {
  printPops: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_modifiers = getAllModifiers();
    var all_pops = Object.keys(config.pops);
    var all_provinces = getProvinces(actual_id);
    var rural_pops = {
      population: 0
    };
    var urban_pops = {
      population: 0
    };

    for (var i = 0; i < all_provinces.length; i++)
      for (var x = 0; x < all_pops.length; x++)
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
      rural_pops.population += returnSafeNumber(rural_pops[all_pops[i]]);

    //Calculate total urban population
    for (var i = 0; i < all_pops.length; i++)
      urban_pops.population += returnSafeNumber(urban_pops[all_pops[i]]);

    //Initialise pops_string and other formatting variables
    var pops_string = [];
    var rural_pops_string = [];
    var total_pops_string = [];
    var urban_pops_string = [];

    //Format embed
    pops_string.push(`- ${config.icons.culture} **[Culture]** | ${config.icons.population} **[View Provinces]**`);
    pops_string.push("");

    urban_pops_string.push("");

    //Print dynamic urban pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      urban_pops_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: \n- **${parseNumber(returnSafeNumber(urban_pops[all_pops[i]]))}**`);
    }

    urban_pops_string.push("");

    //Rural pops
    rural_pops_string.push("");

    //Print dynamic rural pops
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      rural_pops_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: \n- **${parseNumber(returnSafeNumber(rural_pops[all_pops[i]]))}**`);
    }

    rural_pops_string.push("");

    //Total pops
    //Print dynamic total pops - Total
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      total_pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}Total ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(usr.pops[all_pops[i]])}**`);
    }

    //Print dynamic total pops - Availability
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      //Print linebreak if at least one pop's availability is shown in the UI
      if (local_pop && i == 0)
        total_pops_string.push("");

      if (local_pop.stats_display)
        total_pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}Available ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(returnSafeNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]]))}**`);
    }

    total_pops_string.push("");
    total_pops_string.push(`__**Population Modifiers:**__`);
    total_pops_string.push(config.localisation.divider);
    total_pops_string.push("");

    //Print dynamic population modifiers
    var dynamic_modifiers = {};

    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k) {
        var local_modifiers = Object.keys(local_pop.per_100k);

        for (var x = 0; x < local_modifiers.length; x++) {
          //Increment by modifier
          (dynamic_modifiers[local_modifiers[x]]) ?
            dynamic_modifiers[local_modifiers[x]] + getPopModifier(actual_id, all_pops[i], local_modifiers[x]) :
            getPopModifier(actual_id, all_pops[i], local_modifiers[x]);
        }
      }
    }

    var all_current_pop_modifiers = Object.keys(dynamic_modifiers);

    if (dynamic_modifiers.length > 0) {
      for (var i = 0; i < all_current_pop_modifiers.length; i++) {
        if (getModifier(all_current_pop_modifiers[i])) { //Is of type modifier
          var local_modifier = getModifier(all_current_pop_modifiers[i]);

          total_pops_string.push(`${(local_modifier.icon) ? config.icons[local_modifier.icon] + " " : ""}${(local_modifier.name) ? local_modifier.name : all_current_pop_modifiers[i]}: **${printPercentage(usr.modifiers[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
        } else if (getGood(all_current_pop_modifiers[i])) { //Is of type good
          var local_good = getGood(all_current_pop_modifiers[i]);

          total_pops_string.push(`${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${(local_good.name) ? local_good.name : all_current_pop_modifiers[i]}: **${parseNumber(usr.inventory[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
        } else { //Default catch handler
          total_pops_string.push(`${all_current_pop_modifiers[i]}: **${parseNumber(usr[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
        }
      }

      //Push end-space formatting
      total_pops_string.push("");
    }

    //Print static population modifiers
    total_pops_string.push(`${config.icons.development} Population Growth Modifier: **${printPercentage(usr.modifiers.pop_growth_modifier-1)}**`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Edit main embed display
    const population_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Population:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(pops_string.join("\n"))
      .addFields(
        { name: `${config.icons.development} __Urban Population:__ **${printPercentage(urban_pops.population/getPopulation(actual_id))}**\n-`, value: urban_pops_string.join("\n"), inline: true },
        { name: `${config.icons.provinces} __Rural Population:__ **${printPercentage(rural_pops.population/getPopulation(actual_id))}**\n-`, value: rural_pops_string.join("\n"), inline: true },
        { name: "__Total Population:__\n━━", value: total_pops_string.join("\n") }
      );

    game_obj.main_embed = population_embed;
    game_obj.main_change = true;
  }
};
