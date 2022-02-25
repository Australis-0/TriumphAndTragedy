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
    var has_no_provinces = (getProvinces(actual_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);
    var user_income = getIncome(actual_id);

    //Fix negative pops
    {
      for (var i = 0; i < all_pops.length; i++)
        usr.pops[`used_${all_pops[i]}`] = Math.max(usr.pops[`used_${all_pops[i]}`], 0);
    }

    //Initialise stats_string
    var stats_string = [];

    //Fetch city list
    var cities = [];
    var ending_string = "";
    var name_array = [];
    var name_string = "";
    var owned_provinces = getProvinces(actual_id, { include_hostile_occupations: true });
    var usr_provinces = getProvinces(actual_id);

    usr.provinces = owned_provinces.length;

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
          name_array.push(`**${cities[i].name}**`);
        } else {
          name_array.push(cities[i].name);
        }
      }

    if (name_array.length >= 2) {
      name_array[name_array.length-1] = `and ${name_array[name_array.length-1]}`;
      name_string = (name_array.length > 2) ? name_array.join(", ") : name_array.join(" ");
    } else {
      name_string = (name_array.length > 0) ? name_array[0] : "No cities.";
    }

    if (cities.length > name_array.length)
      ending_string = `, (+${cities.length - name_array.length} more)`;

    //Format embed
    stats_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    stats_string.push(`<@${user_id}> ¦ _${(usr.motto) ? usr.motto : "No motto set."}_`);

    if (has_no_provinces && !atWar(actual_id))
      stats_string.push(`\n- Your country doesn't have any provinces currently! Consider typing **[Settle Starting Provinces]** to settle down your peoples.`);

    stats_string.push("");
    stats_string.push(`${config.icons.prestige} Prestige: **${parseNumber(usr.prestige)}** (${(usr.modifiers.prestige_gain > 0) ? "+" : ""}${usr.modifiers.prestige_gain} per turn)`);
    stats_string.push(`${config.icons.provinces} Provinces: **${parseNumber(usr.provinces)}**`);
    stats_string.push("");
    stats_string.push(`**[View Customisation]**`);
    if (all_national_modifiers > 0) {
      stats_string.push("");
      stats_string.push(`You currently have **${parseNumber(all_national_modifiers.length)}** National Modifier(s) active.`);
      stats_string.push(`**[View National Modifiers]**`);
    }
    stats_string.push(config.localisation.divider);
    stats_string.push(`**Population**`);
    stats_string.push("");
    stats_string.push(`${config.icons.development} Cities: (**${parseInt(cities.length)}**/**${parseInt(usr.city_cap)}**): ${name_string}${ending_string}`);
    stats_string.push(`${config.icons.population} Population: **${parseNumber(getPopulation(usr.id))}** (Requires ${config.icons.food} **${Math.ceil((usr.population/1000000)*config.defines.economy.food_required_per_million)}** food per turn)`);

    //Push all pops to stats menu if set to visible
    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.stats_display)
        stats_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""} ${(local_pop.name) ? local_pop.name : all_pops[i]}: (**${parseNumber(usr.pops["used_" + all_pops[i]])}**/**${parseNumber(getTotalPopManpower(actual_id, all_pops[i]))}**)${(local_pop.military_pop) ? " ¦ (**" + printPercentage(getTotalPopManpower(actual_id, all_pops[i], true)) + "** Recruitable Population)" : ""}`);
    }

    stats_string.push(config.localisation.divider);
    stats_string.push("**Economy:**");
    stats_string.push("");
    stats_string.push(`${config.icons.technology} Techs Researched: (**${parseNumber(usr.researched_technologies.length)}**/**${parseNumber(getAllTechnologies().length)}**)`);

    var money_string = (user_income[0] != user_income[1]) ?
      `${parseNumber(user_income[0])} - ${parseNumber(user_income[1])}` :
      parseNumber(user_income[0]);

    stats_string.push(`${config.icons.money} Money: **${parseNumber(usr.money)}** (${config.icons.money} **${money_string}** per turn).`);
    stats_string.push(config.localisation.divider);
    stats_string.push("");
    stats_string.push(`**Internal Politics:**`);
    try {
      stats_string.push(`${config.icons.government} Government Type: **${(config.governments[usr.government].name) ? config.governments[usr.government].name.toLowerCase() : usr.government}**`);

      //Check if country is in anarchy or not
      (config.governments[usr.government].is_anarchy) ?
        stats_string.push(`- Your country is currently in anarchy! Consider using **[Set Government]** to establish an effective government.`) :
        stats_string.push(`- **[Coup]** ¦ **[Government List]**`);
    } catch {}
    stats_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}** (${(usr.modifiers.political_capital_gain >= 0) ? "+" : ""}${parseNumber(usr.modifiers.political_capital_gain)} per turn)`);

    //Add infamy section later
    stats_string.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy)}** (${parseNumber(usr.modifiers.infamy_loss, { display_prefix: true })} per turn)`);
    if (usr.modifiers.infamy > config.defines.infamy_limit)
      stats_string.push(`- Our current level of infamy is costing us **${printPercentage(usr.infamy_rgo_throughput)}** RGO Throughput and **${printPercentage(usr.infamy_production_efficiency)}** Production Eff.`);

    stats_string.push(config.localisation.divider);
    stats_string.push(`**Actions:**`);
    stats_string.push(`Your actions may be used up to give you raw resources, or kept for taxable income. Each action is worth ${config.icons.money} **${parseNumber(config.defines.economy.money_per_action)}** at **100%** tax.`);
    stats_string.push(`- **${Math.ceil(usr.modifiers.civilian_actions*100)}%** of your actions will be used up by civilians next turn.`);
    stats_string.push(`**[Mine]** ¦ **[Quarry]** ¦ **[Chop]**`);
    stats_string.push("");
    stats_string.push(`${config.icons.actions} Actions: **${parseNumber(usr.actions)}**`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const stats_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**National Overview:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(stats_string.join("\n"));

    game_obj.main_embed = stats_embed;
    game_obj.main_change = true;
  }
};
