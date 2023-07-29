module.exports = {
  /*
    printPops() - Displays a user's pops countrywide
  */
  printPops: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_fields = [];
    var all_modifiers = getAllModifiers();
    var all_pops = Object.keys(config.pops);
    var all_provinces = getProvinces(user_id);
    var pop_obj = getDemographics(user_id);
    var relevant_pops = getRelevantPops(user_id);

    //Page 1 - Total Pops
    {
      //Initialise pops_string and other formatting variables
      var pops_string = [];
      var rural_pops_string = [];
      var urban_pops_string = [];

      //Format pops_string
      {
        pops_string.push(`**[${(game_obj.display_irrelevant_pops) ? `Display Relevant Pops` : `Display Irrelevant Pops`}]** | **[${(game_obj.display_no_pops) ? `Display Populated Pops` : `Display All Pops`}]**`);

        pops_string.push(`- ${config.icons.culture} **[Culture]** | ${config.icons.population} **[View Provinces]**`);
        pops_string.push("");
        pops_string.push(`__**Population Modifiers:**__`);
        pops_string.push(config.localisation.divider);
        pops_string.push("");

        //Print dynamic population modifiers
        var dynamic_modifiers = {};

        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];

          if (local_pop.per_100k) {
            var local_modifiers = Object.keys(local_pop.per_100k);

            for (var x = 0; x < local_modifiers.length; x++) {
              //Increment by modifier
              (dynamic_modifiers[local_modifiers[x]]) ?
                dynamic_modifiers[local_modifiers[x]] + getPopModifier(user_id, all_pops[i], local_modifiers[x]) :
                getPopModifier(user_id, all_pops[i], local_modifiers[x]);
            }
          }
        }

        var all_current_pop_modifiers = Object.keys(dynamic_modifiers);

        if (dynamic_modifiers.length > 0) {
          for (var i = 0; i < all_current_pop_modifiers.length; i++) {
            if (getModifier(all_current_pop_modifiers[i])) { //Is of type modifier
              var local_modifier = getModifier(all_current_pop_modifiers[i]);

              pops_string.push(`${(local_modifier.icon) ? config.icons[local_modifier.icon] + " " : ""}${(local_modifier.name) ? local_modifier.name : all_current_pop_modifiers[i]}: **${printPercentage(usr.modifiers[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
            } else if (getGood(all_current_pop_modifiers[i])) { //Is of type good
              var local_good = getGood(all_current_pop_modifiers[i]);

              pops_string.push(`${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${(local_good.name) ? local_good.name : all_current_pop_modifiers[i]}: **${parseNumber(getGoodAmount(user_id, all_current_pop_modifiers[i]), { display_prefix: true })}**`);
            } else { //Default catch handler
              pops_string.push(`${all_current_pop_modifiers[i]}: **${parseNumber(usr[all_current_pop_modifiers[i]], { display_prefix: true })}**`);
            }
          }

          //Push end-space formatting
          pops_string.push("");
        }

        //Print static population modifiers
        pops_string.push(`${config.icons.development} Population Growth Modifier: **${printPercentage(usr.modifiers.pop_growth_modifier - 1)}**`);
        pops_string.push("");

        pops_string.push(`**__Total Population:__**`);
        pops_string.push(`---`);

        //Total pops
        //Print dynamic total pops - Total
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        //Print dynamic total pops - Availability
        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];

          //Print linebreak if at least one pop's availability is shown in the UI
          if (local_pop && i == 0)
            pops_string.push("");

          if (local_pop.stats_display)
            pops_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}Available ${(local_pop.name) ? local_pop.name : all_pops[i]}: **${parseNumber(returnSafeNumber(usr.pops[all_pops[i]] - usr.pops["used_" + all_pops[i]]))}**`);
        }

        pops_string.push("");
      }

      //Format urban_pops_string
      {
        urban_pops_string.push("");

        //Print dynamic urban pops
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            urban_pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        urban_pops_string.push("");
      }

      //Format rural_pops_string
      {
        //Rural pops
        rural_pops_string.push("");

        //Print dynamic rural pops
        for (var i = 0; i < all_pops.length; i++) {
          var display_pop = false;
          var local_pop = config.pops[all_pops[i]];
          var local_value = returnSafeNumber(pop_obj[`urban_${all_pops[i]}`]);

          if (relevant_pops.includes(all_pops[i]))
            display_pop = true;
          if (game_obj.display_irrelevant_pops && local_value != 0)
            display_pop = true;
          if (game_obj.display_irrelevant_pops && game_obj.display_no_pops)
            display_pop = true;

          if (display_pop)
            rural_pops_string.push(`- ${parsePop(all_pops[i])}: **${parseNumber(local_value)}**`);
        }

        rural_pops_string.push("");
      }

      //Push formatted fields to all_fields
      var new_fields = [];
      var urban_pops_split_string = splitText(urban_pops_string, { maximum_characters: 1000 });
      var rural_pops_split_string = splitText(rural_pops_string, { maximum_characters: 1000 });

      for (var i = 0; i < urban_pops_split_string.length; i++)
        all_fields.push({
          name: (i == 0) ?
            `${config.icons.development} __Urban Population:__ **${printPercentage(pop_obj.urban_population/pop_obj.population)}**\n-` :
            `${config.icons.development} __Urban Population:__`,
          value: urban_pops_split_string.join("\n"),
          inline: true
        });

      for (var i = 0; i < rural_pops_split_string.length; i++)
        all_fields.push({
          name: (i == 0) ?
            `${config.icons.provinces} __Rural Population:__ **${printPercentage(pop_obj.rural_population/pop_obj.population)}**\n-` :
            `${config.icons.development} __Rural Population:__`,
          value: rural_pops_split_string.join("\n"),
          inline: true
        });

      for (var i = 0; i < all_fields.length; i++) {
        new_fields.push(all_fields[i]);

        if (i != 0 && i % 2 == 0)
          new_fields.push({ name: config.icons.blank, value: config.icons.blank });
      }

      all_fields = new_fields;

      //Remove control panel if one exists
      removeControlPanel(game_obj.id);

      //Edit main embed display
      var population_overview_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**Population:**`)
        .setThumbnail(usr.flag)
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(pops_string.join("\n"))
        .addFields(all_fields);
    }

    //Page 2 - Pop Needs - Total Consumption/Production
    {
    }

    game_obj.main_embed = population_overview_embed;
    game_obj.main_change = true;
  }
};
