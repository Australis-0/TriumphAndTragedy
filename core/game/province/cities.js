module.exports = {
  developCity: function (arg0_user, arg1_city_name, arg2_amount, arg3_building_category) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var amount = parseInt(arg2_amount);
    var raw_building_category = arg3_building_category;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_category = getBuildingCategory(raw_building_category, { return_key: true });
    var building_category_obj = getBuildingCategory((building_category) ? building_category : raw_building_name);
    var city_obj = getCity(city_name, { users: user_id });
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if city exists in the first place
    if (building_category_obj) {
      if (city_obj) {
        //Calculate development_cost
        var development_cost = getDevelopmentCost(user_id, city_name, amount);

        if (usr.country_age != 0) {
          if (usr.modifiers.political_capital >= development_cost) {
            if (amount > 0) {
              if (building_category_obj) {
                if (!building_category_obj.disable_slots) {
                  //Effect changes to political_capital and building category development
                  usr.modifiers.political_capital -= development_cost;
                  city_obj.development += amount;
                  city_obj[`${building_category}_building_slots`] += amount;

                  city_obj[`${building_category}_development`] = (city_obj[`${building_category}_development`]) ?
                    city_obj[`${building_category}_development`] + amount :
                    amount;

                  printAlert(game_obj.id, `You have issued **${parseNumber(amount)}** urbanisation edicts for the **${parseNumber(development_cost)}** Political Capital! People have begun flocking to **${city_obj.name}** to start working and constructing new buildings, thereby expanding the overall building cap in the city for **${parseString(building_category).toLowerCase()}**.`);

                  //Update UI
                  if (game_obj.page == `view_city_${city_obj.name}`)
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printCity(game_obj.user, city_obj.name),
                      page: interfaces[game_obj.middle_embed.id].page,
                      user: game_obj.user
                    });
                } else {
                  printError(game_obj.id, `**${parseString(building_category)}** doesn't have any slots to develop!`);
                }
              } else {
                printError(game_obj.id, `You can't issue urbanisation edicts targeting a nonexistent building category!`);
              }
            } else {
              (amount == 0) ?
                printError(game_obj.id, `You can't issue zero urbanisation edicts!`) :
                printError(game_obj.id, `You can't issue negative urbanisation edicts! Who are you anyway, Pol Pot?`);
            }
          } else {
            (development_cost.toString().indexOf("e") != -1) ?
              printError(game_obj.id, `You do not currently have enough Political Capital to issue this many urbanisation edicts! You need **infinite** ${config.icons.political_capital} Political Capital before being able to develop your city further to the extent that you have requested.`) :
              printError(game_obj.id, `You don't have enough Political Capital to issue this many urbanisation edicts! You need another **${parseNumber(development_cost)}** ${config.icons.political_capital} Political Capital before being able to develop your city further to the extent that you have requested.`);
          }
        } else {
          printError(game_obj.id, `You must wait until next turn for your new government to start issuing edicts!`);
        }
      } else {
        printError(game_obj.id, `The city you have specified, **${truncateString(city_name)}**, could not be found anywhere inside of your controlled territories!`);
      }
    } else {
      printError(game_obj.id, `The building category you have specified, **${raw_building_category}**, doesn't exist!`);
    }
  },

  foundCity: function (arg0_user, arg1_province, arg2_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province;
    var city_name = arg2_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_building_categories = Object.keys(config.buildings);
    var all_provinces = getProvinces(user_id);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check whether user has enough resources to found a city
    var all_resource_requirements = Object.keys(config.defines.economy.city_resources);
    var city_resources = config.defines.economy.city_resources;
    var resource_shortages = {};

    for (var i = 0; i < all_resource_requirements.length; i++) {
      var good_amount = getGoodAmount(user_id, all_resource_requirements[i]);

      log.debug(`good_amount for ${all_resource_requirements[i]}`, good_amount);

      var resource_amount = (good_amount != undefined) ?
        good_amount :
        usr[all_resource_requirements[i]];

      if (resource_amount) {
        //Check for user shortage
        if (resource_amount < city_resources[all_resource_requirements[i]])
          resource_shortages[all_resource_requirements[i]] = city_resources[all_resource_requirements[i]] - resource_amount;
      } else {
        log.error(`foundCity() - resource_amount at config.defines.economy - ${all_resource_requirements[i]} returned undefined.`);
      }
    }

    var all_resource_shortages = Object.keys(resource_shortages);
    if (getCitiesCap(user_id) - getCities(user_id).length >= 0) {
      if (all_resource_shortages.length == 0) {
        var local_province = getProvince(province_id);

        //Check if province is valid, province has to be owned
        if (local_province.owner == actual_id && local_province.controller == actual_id) {
          if (local_province.type == "rural") {
            if (!city_name.toLowerCase().startsWith("province")) {
              if (isNaN(city_name)) {
                //Initialise city object, determine capital status first
                //If user has no other cities, set it to their capital

                local_province.city_type = (getCities(user_id).length == 0) ? "capital" : "city";
                local_province.culture = getPrimaryCultures(user_id)[0];
                local_province.name = city_name;
                local_province.type = "urban";

                var population_amount = (local_province.city_type == "capital") ?
                  randomNumber(250000, 1000000) :
                  randomNumber(250000, 800000);

                //Generate city pop object
                generatePops(province_id, {
                  type: "all",
                  amount: population_amount
                });

                //Set city RGO
                local_province.resource = randomElement(getRawGoods({ return_names: true }));

                //Set building objects
                local_province.buildings = [];
                local_province.development = 0;
                local_province.housing = 0;

                //Set building slot capacity per category
                for (var i = 0; i < all_building_categories.length; i++)
                  local_province[`${all_building_categories[i]}_building_slots`] = usr.modifiers[`${all_building_categories[i]}_building_slots`];
                //Increase city_count tracker variable
                usr.city_count++;

                //Subtract resources
                if (local_province.city_type != "capital")
                  for (var i = 0; i < all_resource_requirements.length; i++) {
                    var local_value =  city_resources[all_resource_requirements[i]];

                    if (lookup.all_goods[all_resource_requirements[i]]) {
                      modifyGoodAmount(user_id, all_resource_requirements[i], local_value);
                    } else if (usr[all_resource_requirements[i]]) {
                      usr[all_resource_requirements[i]] -= local_value;
                    }
                  }

                //Update UIs
                if (game_obj.page == "country_interface")
                  printStats(game_obj.user);

                if (game_obj.page == "economy")
                  printEconomy(game_obj.user);

                if (game_obj.page == "provinces_list")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printProvinces(game_obj.user),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });

                if (game_obj.page == "cities_list")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printCities(game_obj.user),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });

                printAlert(game_obj.id, (local_province.city_type == "capital") ?
                  `Capital city founded as **${city_name}** in Province **${province_id}**! Over **${parseNumber(local_province.pops.population)}** inhabitants are now legally residents of the capital city of **${usr.name}**!` :
                  `A new city was founded as **${city_name}** in Province **${province_id}**! Over **${parseNumber(local_province.pops.population)}** inhabitants are now legally residents of the city of **${city_name}** in Province **${province_id}**.`
                );
              } else {
                printError(game_obj.id, `A city name cannot be a number!`);
              }
            } else {
              printError(game_obj.id, `You cannot have a city name that overlaps with the name of an existing province!`);
            }
          } else {
            printError(game_obj.id, `Province **${province_id}** is already an urban province belonging to **${local_province.name}**!`);
          }
        } else {
          var is_occupied = (local_province.owner != local_province.controller);

          //Print actual province controller/occupation status
          (local_province.owner) ?
            printError(game_obj.id, `You don't own Province **${province_id}**!\n\nProvince **${province_id}** is a${(is_occupied) ? "n occupied" : ""} province of the ${main.users[local_province.controller].name} of ${main.global.cultures[local_province.culture].adjective} culture${(is_occupied) ? " that rightfully belongs to " + main.users[local_province.owner].name : ""}.`) :
            printError(game_obj.id, `You don't own Province **${province_id}**!\n\Province **${province_id}** is currently uncolonised.`);
        }
      } else {
        //Resource shortages encountered, print them out
        var shortage_array = [];

        for (var i = 0; i < all_resource_shortages.length; i++) {
          var local_good = getGood(all_resource_shortages[i]);
          var local_icon = "";
          var local_shortage = resource_shortages[all_resource_shortages[i]];

          //Determine icon
          if (!lookup.all_goods[all_resource_shortages[i]]) {
            if (all_resource_shortages[i] == "money")
              local_icon = config.icons.money;
          } else {
            local_icon = (local_good.icon) ? config.icons[local_good.icon] : "";
          }

          shortage_array.push(`- ${local_icon} ${parseNumber(local_shortage)} ${(local_good) ? (local_good.name) ? local_good.name : all_resource_shortages[i] : ""}`);
        }

        printError(game_obj.id, `You don't have resources to found a city! Gather the following resources first:\n\n${shortage_array.join("\n")}`);
      }
    } else {
      printError(game_obj.id, `You don't have enough provinces to found a new city yet!`);
    }
  },

  initialiseFoundCity: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Found A New City:`,
      description: `Type **[View Provinces]** to view a complete list of your current provinces.`,
      prompts: [
        [`Please choose a province in which to found a new city.`, "string"],
        [`What would you like to name your new city?`, "string"]
      ]
    },
    function (arg) {
      foundCity(game_obj.user, arg[0], arg[1]);
    },

    //Command handling
    function (input) {
      var is_command = false;

      switch (input) {
        case "view provinces":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printProvinces(game_obj.user),
            user: game_obj.user
          });
          is_command = true;

          break;
      }

      return is_command;
    });
  },

  initialisePrintCity: function (arg0_user, arg1_game_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var game_obj = interfaces[arg1_game_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: "View A City:",
      prompts: [
        [`What is the name of the city you would like to view?`, "string"]
      ]
    },
    function (arg) {
      createPageMenu(game_obj.middle_embed, {
        embed_pages: printCity(game_obj.user, arg[0]),
        user: game_obj.user
      })
    });
  },

  moveCapital: function (arg0_user, arg1_city_name, arg2_force_move, arg3_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var force_move = arg2_force_move;
    var do_not_display = arg3_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var city_obj = getCity(city_name, { users: user_id });

    if (city_obj) {
      if (usr.modifiers.political_capital >= config.defines.politics.move_capital_cost || force_move) {
        var culture_obj = main.global.cultures[city_obj.culture];

        if (
          culture_obj.primary_culture.includes(actual_id) ||
          culture_obj.accepted_cultures.includes(actual_id) ||
          force_move
        ) {
          //Get rid of old capital
          var all_cities = getCities(user_id, {
            include_hostile_occupations: true
          });

          for (var i = 0; i < all_cities.length; i++)
            if (all_cities[i].city_type == "capital") all_cities[i].city_type = "city";

          //Remove political capital
          usr.modifiers.political_capital -= config.defines.politics.move_capital_cost;

          //Set new capital and print feedback
          city_obj.city_type = "capital";

          if (!do_not_display)
            printAlert(game_obj.id, `You have successfully moved your capital to **${city_obj.name}** for **${config.defines.politics.move_capital_cost}** ${config.icons.political_capital} Political Capital.`);

          //Update UIs
          if (!do_not_display) {
            if (game_obj.page == "country_interface")
              printStats(game_obj.user);

            if (game_obj.page == "economy")
              printEconomy(game_obj.user);

            if (game_obj.page == "provinces_list")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(game_obj.user),
                page: interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });

            if (game_obj.page == "cities_list")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCities(game_obj.user),
                page: interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });
          }
        } else {
          if (!do_not_display)
            printError(game_obj.id, `**${city_obj.name}** must at least be of one of your accepted cultures before you can consider moving your capital there!`);
        }
      } else {
        if (!do_not_display)
          printError(game_obj.id, `You don't have enough ${config.icons.political_capital} Political Capital to move your capital city yet! You need **${parseNumber(config.defines.politics.move_capital_cost - usr.modifiers.political_capital)}** more.`);
      }
    } else {
      if (!do_not_display)
        printError(game_obj.id, `You cannot move your capital to a city that doesn't exist!`);
    }
  },

  renameCity: function (arg0_user, arg1_old_name, arg2_new_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var old_name = arg1_old_name;
    var new_name = arg2_new_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    if (!usr.options.customisation_locked) {
      if (!usr.options.city_names_locked) {
        if (new_name.length <= 100) {
          if (new_name.length > 0) {
            if (isNaN(new_name)) {
              var city_obj = getCity(old_name, { users: actual_id });

              //Set city_obj.name to a new name
              if (city_obj) {
                city_obj.name = new_name;

                printAlert(game_obj.id, `You have renamed **${old_name}** to **${new_name}**!`);

                //Update UIs
                if (game_obj.page == "cities_list")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printCities(game_obj.user),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });

                if (game_obj.page == "country_interface")
                  printStats(game_obj.user);

                if (game_obj.page == "economy")
                  printEconomy(game_obj.user);

                if (game_obj.page == "provinces_list")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printProvinces(game_obj.user),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });

                if (game_obj.page.startsWith("view_city_")) {
                  var viewed_city = game_obj.page.replace("view_city_", "");

                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printCity(game_obj.user, viewed_city),
                    page: interfaces[game_obj.middle_embed.id].page,
                    user: game_obj.user
                  });
                }
              } else {
                printError(game_obj.id, `The city that you have specified is not currently in your possession or doesn't exist!`);
              }
            } else {
              printError(game_obj.id, `You cannot rename a city into a number!`);
            }
          } else {
            printError(game_obj.id, `You cannot have a nameless city!`);
          }
        } else {
          printError(game_obj.id, `Your city name exceeded the maximum character limit of **100** characters!`);
        }
      } else {
        printError(game_obj.id, `Your city names have been locked in place due to moderation action. Ouch.`);
      }
    } else {
      var vassal_obj = getVassal(user_id);

      printError(game_obj.id, `Your overlord, **${main.users[vassal_obj.overlord].name}**, has issued a decree stating that vassals are not allowed to change their city names without prior consent! Petition your overlord first before attempting to change your city name again.`)
    }
  }
};
