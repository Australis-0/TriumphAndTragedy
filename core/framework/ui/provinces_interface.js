module.exports = {
  initialisePrintProvince: function (arg0_user, arg1_game_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var game_obj = interfaces[arg1_game_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View A Province:`,
      prompts: [
        [`Which province in would you like to view?`, "string"]
      ]
    },
    function (arg) {
      createPageMenu(game_obj.middle_embed, {
        embed_pages: printProvince(game_obj.user, arg[0]),
        user: game_obj.user
      });
    });
  },

  printProvince: function (arg0_user, arg1_province) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var province_obj = getProvince(province_id);

    if (province_obj) {
      if (province_obj.type != "urban") {
        //Initialise province_string
        var province_string = [];

        //Initialise tracker variables
        var culture_obj = main.global.cultures[province_obj.culture];

        //Format embed
        province_string.push(`**[Back]** | **[Jump To Page]** | **[View]**`);
        province_string.push("");
        province_string.push(`**Ownership:**`);
        province_string.push("");
        province_string.push(`Owned by **${main.users[province_obj.owner].name}**.`);

        //Display occupation status
        if (province_obj.owner != province_obj.controller)
          province_string.push(`- Currently occupied by **${main.users[province_obj.controller].name}** in a war! This province will not be able to produce anything of value until it is either liberated, or the war is over.`);
        if (province_obj.demilitarised)
          if (!atWar(user_id))
            province_string.push(`- Currently demilitarised for **${parseNumber(getDemilitarisedTurns(province_obj.id))}** turn(s)! None of our combat formations can move into this province until then.`);

        province_string.push("");

        //Display supply limit
        (province_obj.supply_limit) ?
          province_string.push(`- ${config.icons.railways} Supply Limit: ${province_obj.supply_limit}`) :
          province_string.push(`- ${config.icons.railways} Supply Limit: ${config.defines.combat.base_supply_limit}`);

        //Display population statistics
        province_string.push("");
        province_string.push(config.localisation.divider);
        province_string.push("");
        province_string.push(`**Population Statistics:**`);
        province_string.push("");

        //Dynamically display all pops
        for (var i = 0; i < all_pops.length; i++)
          province_string.push(`- ${(config.pops[all_pops[i]].icon) ? config.pops[all_pops[i]].icon + " " : ""}${(config.pops[all_pops[i]].name) ? config.pops[all_pops[i]].name : all_pops[i]}: ${parseNumber(province_obj.pops[all_pops[i]])}`);

        //Display total population, culture
        province_string.push(`- ${config.icons.population} Population: ${parseNumber(province_obj.pops.population)}`);
        province_string.push(`- ${config.icons.culture} Culture: ${culture_obj.name}`);

        //Change game_obj.page
        game_obj.page = `view_province_${province_id}`;

        //Return statement
        return splitEmbed(province_string, {
          title: `Viewing ${parseString(province_obj.type)} Province ${province_id}:`,
          title_pages: true,
          fixed_width: true
        });
      } else {
        printCity(user_id, province_obj.name);
      }
    } else {
      printError(game_obj.id, `The province of ${province_id} couldn't be found anywhere in your territory or otherwise!`);
    }
  },

  printProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var accepted_cultures = getAcceptedCultures(user_id);
    var cities = getCities(user_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });
    var provinces = getProvinces(user_id, {
      exclude_cities: true,
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise province_string, fields_list
    var fields_list = [];
    var province_string = [];

    //Format province_string
    province_string.push(`**[Back]** | **[Jump To Page]**`);
    province_string.push("");
    province_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    province_string.push("");

    province_string.push(config.localisation.divider);
    province_string.push(`**Provinces:**`);

    if (cities.length != 0 || provinces.length != 0) {
      //Print cities first
      province_string.push("");
      province_string.push(`__**Cities:**__`);
      province_string.push("");

      if (cities.length != 0) {
        for (var i = 0; i < cities.length; i++) {
          var culture_obj = getCulture(cities[i].culture);
          var local_field = [];

          local_field.push(`**[View ${cities[i].name}]**`);
          local_field.push("");
          local_field.push(`- ${config.icons.population} Population: **${parseNumber(cities[i].pops.population)}**`);

          //Print individual pop statistics
          for (var x = 0; x < all_pops.length; x++)
            local_field.push(`- ${(config.pops[all_pops[x]].icon) ? config.pops[all_pops[x]].icon : ""} ${(config.pops[all_pops[x]].name) ? config.pops[all_pops[x]].name : all_pops[x]}: ${parseNumber(cities[i].pops[all_pops[x]])}`);

          //Print culture
          local_field.push(`- ${config.icons.culture} Culture: ${culture_obj.name}`);

          if (!accepted_cultures.includes(cities[i].culture))
            local_field.push(`- **[Assimilate]**`);

          //Push field to list
          fields_list.push({ name: `__**${cities[i].name}**:__`, value: local_field.join("\n"), inline: true });
        }
      } else {
        (provinces.length > 0) ?
          province_string.push(`_We currently have no cities to speak of! Consider founding a new city by typing _**[Found City]**_._`) :
          province_string.push(`_We are currently without cities or provinces, rendering us nonexistent in all but name._`);
      }

      province_string.push("");
      province_string.push(`${config.localisation.divider}`);

      //Print rural provinces next
      province_string.push("");
      if (provinces.length != 0) {
        for (var i = 0; i < provinces.length; i++) {
          try {
            var culture_obj = getCulture(provinces[i].culture);
            var local_field = [];

            local_field.push(`**[View Province ${provinces[i].id}]**`);
            local_field.push("");
            local_field.push(`- ${config.icons.population} Population: **${parseNumber(provinces[i].pops.population)}**`);

            //Print individual pop statistics again
            for (var x = 0; x < all_pops.length; x++)
              local_field.push(`- ${(config.pops[all_pops[x]].icon) ? config.pops[all_pops[x]].icon : ""} ${(config.pops[all_pops[x]].name) ? config.pops[all_pops[x]].name : all_pops[x]}: ${parseNumber(provinces[i].pops[all_pops[x]])}`);

            //Print culture
            local_field.push(`- ${config.icons.culture} Culture: ${culture_obj.name}`);

            if (!accepted_cultures.includes(provinces[i].culture))
              local_field.push(`- **[Assimilate]**`);

            //Push field to list
            fields_list.push({ name: `__**Province ${provinces[i].id}**:__`, value: local_field.join("\n"), inline: true });
          } catch {}
        }
      } else {
        province_string.push(`_We do not have any rural provinces in our possession._`);
      }
    } else {
      province_string.push(`_You currently don't have any provinces in your possession!_`);
      province_string.push("");
      province_string.push(`_Consider settling or acquiring a new province to start building up your country._`);
    }

    //Return statement
    return (fields_list.length > 0) ?
      splitEmbed(province_string, {
        fields: fields_list,
        fixed_width: true,
        maximum_fields: 12,
        table_width: 2,
        title: "Province List:",
        title_pages: true
      }) :
      splitEmbed(province_string, {
        title: "Province List:",
        title_pages: true
      });
  }
};
