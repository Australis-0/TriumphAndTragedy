module.exports = {
  pageHandler: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Budget page handler
    {
      if (budget_pages.includes(game_obj.page)) {
        switch (input) {
          case "set tax":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Set Tax:`,
              prompts: [
                [`What is the percentage of tax you would like to set for your citizenry?`, "number", { min: 0, max: Math.ceil(usr.modifiers.max_tax*100) }]
              ]
            },
            function (arg) {
              setTax(user_id, arg[0]);
            });

            break;
        }
      }
    }

    //Cities page handler
    {
      if (game_obj.page == "cities_list") {
        if (arg[0] == "view") {
          if (arg.length > 1) {
            //Process city_name by removing initial argument and print city
            var city_name = input.replace("view", "").trim();
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCity(game_obj.user, city_name),
              user: game_obj.user
            });
          } else {
            initialisePrintCity(game_obj.user, game_obj.id);
          }
        }

        switch (input) {
          case "back":
            game_obj.page = "economy";
            printEconomy(user_id);

            break;
          case "found city":
            initialiseFoundCity(game_obj.user, game_obj.id);

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printCities(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCities(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });
        }
      } else if (game_obj.page.startsWith("view_city")) {
        var city_name = game_obj.page.replace("view_city_", "");

        switch (input) {
          case "back":
            game_obj.page = "cities_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCities(game_obj.user),
              user: game_obj.user
            });

            break;
          case "build":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Constructing Building(s) in ${getCity(city_name).name}:`,
              prompts: [
                [`What would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.`, "string"],
                [`How many buildings of this type would you like to begin building?`, "number", { min: 0 }]
              ]
            },
            function (arg) {
              build(user_id, getCity(city_name).name, arg[1], arg[0]);
            },
            function (arg) {
              switch (arg) {
                case "build list":
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printBuildList(actual_id),
                    user: game_obj.user
                  });
                  return true;

                  break;
              }
            });

            break;
          case "develop":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Develop A Building Category in ${getCity(city_name).name}:`,
              prompts: [
                [`Which building category would you like to develop in this city?`, "string"],
                [`How many urbanisation edicts would you like to issue for this category?`, "number", { min: 0 }]
              ]
            },
            function (arg) {
              developCity(game_obj.user, city_name, arg[1], arg[0]);
            });

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printCity(game_obj.user, city_name).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCity(game_obj.user, city_name),
                page: arg[0] - 1,
                user: game_obj.user
              })
            });

            break;
          case "move capital":
            moveCapital(game_obj.user, city_name);

            break;
          case "rename city":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Rename ${getCity(city_name).name}:`,
              prompts: [
                [`What would you like to rename the City of ${getCity(city_name).name} to?`, "string"]
              ]
            },
            function (arg) {
              renameCity(game_obj.user, city_name, arg[0]);
            });
        }
      }
    }

    //Country interface page handler
    {
      if (["country_interface"].includes(game_obj.page)) {
        switch (input) {
          case "coup":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Coup Government:`,
              prompts: [`What would you like to coup your current government to?\n\nType **[Government List]** for a list of valid governments.`, "string"]
            },
            function (arg) {
              coup(user_id, arg[0]);
            },
            function (arg) {
              switch (arg) {
                case "government list":
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printGovernmentList(actual_id),
                    user: game_obj.user
                  });
                  return true;

                  break;
              }
            });

            break;
          case "government list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printGovernmentList(actual_id),
              user: game_obj.user
            });
            game_obj.page = "view_governments";

            break;
          case "set government":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Set Government:`,
              prompts: [
                [`What would you like to set your current government to?\n\nType **[Government List]** for a list of valid governments.`, "string"]
              ]
            },
            function (arg) {
              setGovernmentCommand(user_id, arg[0]);
            },
            function (arg) {
              switch (arg) {
                case "government list":
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printGovernmentList(actual_id),
                    user: game_obj.user
                  });
                  return true;

                  break;
              }
            });

            break;
        }
      }
    }

    //Economy page handler
    {
      if (economy_pages.includes(game_obj.page)) {
      switch (input) {
        case "build":
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Building Construction Menu:`,
            prompts: [
              [`What type of building would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.`, "string"],
              [`How many buildings of this type would you like to begin building?`, "number", { min: 0 }],
              [`Which city would you like to build these new buildings in?\n\nType **[View Cities]** for a list of valid cities.`, "string"]
            ]
          },
          function (arg) {
            build(user_id, arg[2], arg[1], arg[0]);
          },
          function (arg) {
            switch (arg) {
              case "build list":
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printBuildList(actual_id),
                  user: game_obj.user
                });
                return true;

                break;
              case "view cities":
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCities(game_obj.user),
                  user: game_obj.user
                });
                return true;

                break;
            }
          })

          break;
        case "build list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printBuildList(actual_id),
            user: game_obj.user
          });

          break;
        case "constructions":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printConstructions(actual_id),
            user: game_obj.user
          });
          game_obj.page = "view_constructions";

          break;
        case "found_city":
          //Make sure that user is actually able to found a city before authorising the command, otherwise print an error
          (usr.city_cap-usr.city_count > 0) ?
            initialiseFoundCity(user_id, game_obj.id) :
            printError(game_obj.id, `You don't have enough city slots remaining to found a new city!`);

          break;
        case "inventory":
          game_obj.page = "inventory";
          printInventory(user_id);

          break;
        case "view cities":
          game_obj.page = "cities_list";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCities(game_obj.user),
            user: game_obj.user
          });

          break;
        }
      }
      if (game_obj.page == "view_constructions") {
        switch (input) {
          case "back":
            game_obj.page = "economy";
            printEconomy(user_id);

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printConstructions(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printConstructions(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

            break;
        }
      }
    }

    //Government page handler
    {
      if (game_obj.page == "view_governments") {
        switch (input) {
          case "back":
            printStats(user_id);
            game_obj.page = "country_interface";

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printGovernmentList(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGovernmentList(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              })
            });

            break;
        }
      }
    }

    //Pops page handler
    {
      if (population_pages.includes(game_obj.page)) {
        switch (input) {
          case "view provinces":
            game_obj.page = "provinces_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(game_obj.user),
              user: game_obj.user
            });

            break;
        }
      }
    }

    //Province page handlers
    {
      if (game_obj.page == "provinces_list") {
        if (arg[0] == "view") {
          if (arg.length > 1) {
            if (arg[1] != "province") {
              //City view handler
              var city_name = input.replace("view", "").trim();

              (getCity(city_name)) ?
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCity(game_obj.user, city_name),
                  user: game_obj.user
                }) :
                printError(game_obj.id, `**${city_name}** is not a valid city that you can view!`);
            } else {
              //Province view handler [WIP]
              var province_name = input.replace("view", "").trim()
                .replace("province", "").trim();

              (getProvince(province_name)) ?
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, province_name),
                  user: game_obj.user
                }) :
                printError(game_obj.id, `**${province_name}** is not a valid province that you can view!`);
            }
          } else {
            initialisePrintProvince(user_id, game_obj.id);
          }
        }

        switch (input) {
          case "back":
            game_obj.page = "population";
            printPops(user_id);

            break;
        }
      } else if (game_obj.page.startsWith("view_province_")) {
        var province_name = game_obj.page.replace("view_province_", "");

        switch (input) {
          case "back":
            game_obj.page = "provinces_list";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(game_obj.user),
              user: game_obj.user
            });

            break;
          case "jump to page":
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printProvince(game_obj.user, province_name).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvince(game_obj.user, province_name),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

            break;
        }
      }
    }

    //Technology page handler
    {
      switch (game_obj.page) {
        case "research":
          //Button handler
          //[Back]
          if (input == "back") {
            printTechnology(user_id);
            game_obj.page = "technology";
          }

          //[Cancel Research]
          if (input.startsWith("cancel research ")) {
            var slot_to_cancel = parseInt(input.replace("cancel research ", ""));

            cancelResearch(user_id, slot_to_cancel);
          } else if (input == "cancel research") {
            initialiseCancelResearch(user_id);
          }

          //[Research List]
          if (input == "research list") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printResearchList(actual_id),
              user: game_obj.user
            });
            game_obj.page = "research_list";
          }

          //[View Research Queue]
          if (input == "view research queue") {
            printResearchQueue(user_id);
            game_obj.page = "research_queue";
          }

          break;
        case "research_list":
          //Button handler
          //[Back]
          if (input == "back") {
            printTechnology(user_id);
            game_obj.page = "technology";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printResearchList(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printResearchList(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              })
            });

          //[Research]; [Research (Tech)]
          if (input.startsWith("research ")) {
            var tech_to_research = input.replace("research ", "");
          } else if (input == "research") {
            initialiseResearch(user_id);
          }

          break;
        case "research_queue":
          //Button handler
          //[Add Technology]
          if (input.startsWith("add technology ")) {
            var tech_to_add = input.replace("add technology ", "");

            addResearchQueue(user_id, tech_to_add);
          } else if (input == "add technology") {
            initialiseAddResearchQueue(user_id);
          }

          //[Back]
          if (input == "back") {
            printTechnology(user_id);
            game_obj.page = "technology";
          }

          //[Current Research]
          if (input == "current research") {
            printResearch(user_id);
            game_obj.page = "research";
          }

          //[Remove Technology]
          if (input.startsWith("remove technology ")) {
            var tech_to_remove = input.replace("remove technology ", "");

            removeResearchQueue(user_id, tech_to_add);
          } else if (input == "remove technology") {
            initialiseRemoveResearchQueue(user_id);
          }

          //[Research]
          if (input == "research")
            initialiseResearch(user_id);

          //[Research List]; [Research (Tech)]
          if (input == "research list") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printResearchList(actual_id),
              user: game_obj.user
            });
            game_obj.page = "research_list";
          } else if (input.startsWith("research ")) {
            var tech_to_research = input.replace("research ", "");

            research(user_id, tech_to_research);
          }

          break;

        //Default handler for main technology tab
        default:
          if (technology_pages.includes(game_obj.page)) {
            //Button Handler
            //[Cancel Research]
            if (input.startsWith("cancel research ")) {
              var slot_to_cancel = parseInt(input.replace("cancel research ", ""));

              cancelResearch(user_id, slot_to_cancel);
            } else if (input == "cancel research") {
              initialiseCancelResearch(user_id);
            }

            //[Current Research]
            if (input == "current research") {
              printResearch(user_id);
              game_obj.page = "research";
            }

            //[Research Possibilities]; [Research (Tech)]
            if (input == "research possibilities" || input == "research list") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printResearchList(actual_id),
                user: game_obj.user
              });
              game_obj.page = "research_list";
            } else if (input.startsWith("research ")) {
              var tech_to_research = input.replace("research ", "");

              research(user_id, tech_to_research);
            } else if (input == "research") {
              initialiseResearch(user_id);
            }
          }

          break;
      }
    }
  }
};
