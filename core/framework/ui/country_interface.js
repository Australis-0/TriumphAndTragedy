module.exports = {
  printStats: function (arg0_user) { //WIP
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_cities = [];
    var all_national_modifiers = Object.keys(usr.national_modifiers);
    var all_pops = Object.keys(config.pops);

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
      name_string = (name_array.length > 0) ? name_array[0] : "No cities.";
    }

    if (cities.length > name_array.length) ending_string = `, (+${cities.length-name_array.length} more)`;

    //Format embed
    stats_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    stats_string.push(`<@${user_id}> ¦ _${(usr.motto) ? usr.motto : "No motto set."}_`)
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
    stats_string.push(`${config.icons.development} Cities: (**${usr.city_count}**/**${usr.city_cap}**): ${name_string}${ending_string}`);
    stats_string.push(`${config.icons.population} Population: **${parseNumber(usr.population)}** (Requires **${Math.ceil(usr.population/config.defines.economy.food_required_per_million)}** food per turn)`);

    //Push all pops to stats menu if set to visible
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];
      
      if (local_pop.stats_display)
        stats_string.push(`${(local_pop.icon) ? local_pop.icon : ""} ${(local_pop.name) ? local_pop.name : all_pops[i]}: (**${parseNumber(usr.pops["used_" + all_pops[i]])}**/**${parseNumber(getTotalPopManpower(user_id, all_pops[i]))}**)${(local_pop.military_pop) ? "¦ (**" + Math.ceil(getTotalPopManpower(user_id, all_pops[i], true)*100) + "%** Recruitable Population)" : ""}`);
    }

    stats_string.push(config.localisation.divider);
    stats_string.push("**Economy:**");
    stats_string.push("");
    stats_string.push(`${config.icons.technology} Techs Researched: (**${parseNumber(usr.researched_technologies.length)}**/**${parseNumber(getAllTechnologies().length)}**)`);
    stats_string.push(`${config.icons.money} Money: ${parseNumber(usr.money)}`);
    stats_string.push(config.localisation.divider);
    stats_string.push("");
    stats_string.push(`**Internal Politics:**`);
    try {
      stats_string.push(`${config.icons.government} Government Type: **${(config.governments[usr.government].name) ? config.governments[usr.government].name.toLowerCase() : usr.government}**`);
    } catch {}
    stats_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}** (${(usr.modifiers.political_capital_gain >= 0) ? "+" : ""}${parseNumber(usr.modifiers.political_capital_gain)} per turn)`);

    //Add infamy section later [WIP]

    stats_string.push(config.localisation.divider);
    stats_string.push(`**Actions:**`);
    stats_string.push(`Your actions may be used up to give you raw resources, or kept for taxable income. Each action is worth ${config.icons.money} ${parseNumber(config.defines.economy.money_per_action)} at 100% tax.`);
    stats_string.push(`**${Math.ceil(usr.modifiers.civilian_actions*100)}%** of your actions will be used up by civilians next turn.`);
    stats_string.push("");
    stats_string.push(`${config.icons.actions} Actions: **${parseNumber(usr.actions)}**`)
    stats_string.push(`**[Mine]** ¦ **[Quarry]** ¦ **[Chop]**`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const stats_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**National Overview:**`)
      .setThumbnail(usr.flag)
      .setDescription(stats_string.join("\n"));

    game_obj.main_embed = stats_embed;
    game_obj.main_change = true;
  }
};
