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

  printProvince: function (arg0_user, arg1_province) { //[WIP] - Work on supply limit calculation during diplomacy update
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
      //Initialise province_string
      var province_string = [];

      //Format embed
      province_string.push(`**[Back]** ¦ **[Jump To Page]**`);
      province_string.push("");
      province_string.push(`**Ownership:**`);
      province_string.push("");
      province_string.push(`Owned by **${main.users[province_obj.owner].name}**.`);

      //Display occupation status
      if (province_obj.owner != province_obj.controller)
        province_string.push(`- Currently occupied by **${main.users[province_obj.controller].name}** in a war! This province will not be able to produce anything of value until it is either liberated, or the war is over.`);

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
      province_string.push(`- ${config.icons.population} Population: ${parseNumbre(province_obj.pops.population)}`);
      province_string.push(`- ${config.icons.culture} Culture: ${province_obj.culture}`);

      //Change game_obj.page
      game_obj.page = `view_province_${province_id}`;

      //Return statement
      return splitEmbed(province_string, {
        title: `Viewing ${parseString(province_obj.type)} Province ${province_id}:`,
        title_pages: true,
        fixed_width: true
      });
    } else {
      printError(game_obj.id, `The province of ${province_id} couldn't be found anywhere in your territory or otherwise!`);
    }
  },

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
    var accepted_cultures = getAcceptedCultures(actual_id);
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
            province_string.push(`- ${(config.pops[all_pops[x]].icon) ? config.pops[all_pops[x]].icon : ""} ${(config.pops[all_pops[x]].name) ? config.pops[all_pops[x]].name : all_pops[x]}: ${parseNumber(cities[i].pops[all_pops[x]])}`);

          //Print culture
          province_string.push(`- ${config.icons.culture} Culture: ${cities[i].culture}`);

          if (!accepted_cultures.includes(cities[i].culture))
            province_string.push(`- **[Assimilate]**`);
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
            province_string.push(`**Province ${provinces[i].id}**:`);
            province_string.push(`**[View Province ${provinces[i].id}]**`);
            province_string.push("");
            province_string.push(`- ${config.icons.population} Population: **${parseNumber(provinces[i].pops.population)}**`);

            //Print individual pop statistics again
            for (var x = 0; x < all_pops.length; x++)
              province_string.push(`- ${(config.pops[all_pops[x]].icon) ? config.pops[all_pops[x]].icon : ""} ${(config.pops[all_pops[x]].name) ? config.pops[all_pops[x]].name : all_pops[x]}: ${parseNumber(provinces[i].pops[all_pops[x]])}`);

            //Print culture
            province_string.push(`- ${config.icons.culture} Culture: ${provinces[i].culture}`);

            if (!accepted_cultures.includes(provinces[i].culture))
              province_string.push(`- **[Assimilate]**`);
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
    return splitEmbed(province_string, {
      title: "Province List:",
      title_pages: true,
      fixed_width: true
    });
  }
};
