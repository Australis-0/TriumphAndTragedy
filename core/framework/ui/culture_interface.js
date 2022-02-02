module.exports = {
  printCultures: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare tracker variables
    var accepted_culture_provinces = getAcceptedCultureProvinces(actual_id);
    var accepted_cultures = getAcceptedCultures(actual_id, { exclude_primary_culture: true });
    var all_accepted_cultures = getAcceptedCultures(actual_id);
    var all_primary_cultures = getPrimaryCultures(actual_id);
    var total_accepted_culture_population = calculateAcceptedCultureTotal(actual_id);
    var sorted_culture_array = getSortedCultures(actual_id);
    var total_unaccepted_population = calculateUnacceptedCultureTotal(actual_id);

    //Initialise culture_string
    var culture_string = [];

    //Format culture_string
    culture_string.push(`${config.icons.culture} Primary Culture(s): **${getCultureNames(all_primary_cultures).join(", ")}**.`);
    (accepted_cultures.length > 0) ?
      culture_string.push(`${config.icons.consciousness} Accepted Culture(s): ${getCultureNames(accepted_cultures).join(", ")}`) :
      culture_string.push(`${config.icons.consciousness} Accepted Culture(s): _We have no accepted cultures apart from our primary culture at this moment._`);
    culture_string.push("");
    culture_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}**`);

    if (usr.provinces - accepted_culture_provinces.length > 0)
      culture_string.push(`${config.icons.population} We have **${parseNumber(usr.provinces - accepted_culture_provinces.length)}** non-accepted provinces with a total population of **${parseNumber(total_unaccepted_population)}**, of which we are receiving just **${printPercentage(usr.modifiers.non_core_manpower)}** of in manpower.`);

    culture_string.push("");
    culture_string.push(config.localisation.divider);
    culture_string.push("");

    for (var i = 0; i < sorted_culture_array.length; i++) {
      var culture_description = "";
      var is_accepted_culture = accepted_cultures.includes(sorted_culture_array[i].id);
      var is_primary_culture = all_primary_cultures.includes(sorted_culture_array[i].id);

      if (is_primary_culture)
        culture_description = `our primary culture. ¦ **[Rename Culture]** ¦ **[Rename Culture Adjective]**`;

      if (!is_primary_culture)
        culture_description = (is_accepted_culture) ?
          `an accepted culture. ¦ **[Remove Accepted Culture]**` :
          `an unaccepted culture. Either assimilate their provinces in **[View Population]**, or add them as an accepted culture for **${parseNumber(config.defines.politics.accepted_culture_cost)}** ${config.icons.political_capital} Political Capital.`;

      culture_string.push(`**${printPercentage(calculateCulturalPercentage(actual_id, sorted_culture_array[i].id))}** of our population, or **${parseNumber(getCultureProvinces(actual_id, sorted_culture_array[i].id).length)}** of our provinces identify as **${getCulture(sorted_culture_array[i].id).adjective}**, ${culture_description}`);
    }

    culture_string.push("");
    culture_string.push(config.localisation.divider);

    //Format cultural integrations
    if (usr.pops.cultural_integrations.length > 0) {
      for (var i = 0; i < usr.cultural_integrations.length; i++)
        culture_string.push(`We are currently integrating **${getCulture(usr.pops.cultural_integrations[i].culture_id).adjective}** culture into our society. Our advisors estimate that it will take **${parseNumber(usr.pops.cultural_integrations[i].duration)}** more turn(s) before they are fully integrated.`);
    } else {
      culture_string.push(`_We are currently not integrating any cultures into our societal fabric._`);
      culture_string.push("");
      culture_string.push(`**[Add Accepted Culture]** for ${config.icons.political_capital} **${parseNumber(config.defines.politics.accepted_culture_cost)}** Political Capital.`);
      culture_string.push("");
      culture_string.push(`**[Assimilate All]** ¦ **[View Population]**`);
    }

    //Return statement
    return splitEmbed(culture_string, {
      title: "[Back] ¦ [Jump To Page] ¦ Culture:",
      title_pages: true,
      fixed_width: true
    });
  }
};
