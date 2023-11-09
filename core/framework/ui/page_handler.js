module.exports = {
  pageHandler: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Main Menu handler
    {
      //Handle current_page
      if (main.interfaces)
        if (main.interfaces[game_obj.middle_embed.id])
          current_page = returnSafeNumber(main.interfaces[game_obj.middle_embed.id].page);

      if (game_obj.main_menu_embed) {
        //[Resume Game]
        if (input == "resume game")
          closeMainMenu(user_id);

        //[Manage Co-Op]
        if (input == "manage co-op") {
          game_obj.old_page = JSON.parse(JSON.stringify(game_obj.page));
          game_obj.page = "coop_menu";

          printCoopMenu(user_id);
        }

        //[Resign]
        if (input == "resign")
          initialiseResign(user_id);

        //[Exit Game]
        if (["exit game", "quit game"].includes(input))
          clearGame(game_obj.id);

        if (game_obj.page == "coop_menu") {
          //[Back]
          if (input == "back") {
            game_obj.page = JSON.parse(JSON.stringify(game_obj.old_page));
            delete game_obj.old_page;

            printMainMenu(user_id);
          }

          //[Invite Player]
          if (input == "invite player")
            initialiseInvitePlayer(user_id);

          //[Kick Player]
          if (input == "kick player")
            initialiseKickPlayer(user_id);

          //[Kick (Player ID)]
          if (input.startsWith("kick ")) {
            var player_id = input.replace("kick ", "").trim();

            kickPlayer(user_id, parseMention(player_id));
          }

          //[Promote (Player ID)]
          if (input.startsWith("promote ")) {
            var player_id = input.replace("kick ", "").trim();

            promotePlayer(user_id, parseMention(player_id));
          }

          //[Transfer Leadership]
          if (input == "transfer leadership")
            initialiseTransferLeadership(user_id);
        }
      }
    }

    if (
      !in_founding_map && !in_visual_prompt && !game_obj.main_menu_embed &&
      main.season_started
    ) {
      //Global commands
      if (!["edit_peace_offer"].includes(game_obj.page)) {
        //[Build]
        if (!game_obj.page.startsWith("view_city")) {
          if (input == "build")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Construct Buildings:`,
              prompts: [
                [`Which city would you like to build in?\n\nType **[View Cities]** for a complete list of your cities.`, "string"],
                [`How many buildings of this type would you like to begin building?`, "number", { min: 1 }],
                [`What would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.\nType **[Inventory]** to view your inventory.`, "string"]
              ]
            },
            function (arg) {
              build(user_id, arg[0], arg[1], arg[2]);
            },
            function (arg) {
              switch (arg) {
                case "build list":
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printBuildList(user_id),
                    user: game_obj.user
                  });
                  return true;

                  break;
                case "view cities":
                case "cities list":
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printProvinces(game_obj.user),
                    user: game_obj.user
                  });
                  return true;

                  break;
                case "inventory":
                  printInventory(user_id);
                  return true;

                  break;
              }
            });
        }

        //[Building List]
        if (input == "building list") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printBuildList(user_id),
            user: game_obj.user
          });
          game_obj.page = "building_list";
        }

        //[Craft]
        if (["craft", "recruit", "train", "train units"].includes(input))
          initialiseCraft(user_id);

        //[Demolish]
        if (input == "demolish")
          initialiseDemolish(user_id);

        //[Inventory]
        if (["inv", "inventory"].includes(input)) {
          game_obj.page = "inventory";
          printInventory(user_id);
        }

        //[Production]
        if (["production", "resource production"].includes(input)) {
          game_obj.page = "view_production";
          printProduction(user_id);
        }

        //[Settle]
        if (input == "settle")
          initialiseSettle(user_id);

        //[Settle (Provinces)]
        if (input.startsWith("settle ")) {
          var provinces = input.replace("settle ", "").split(" ").split(",");

          for (var i = 0; i < provinces.length; i++)
            provinces[i] = provinces[i].trim();

          //Settle provinces
          settle(user_id, provinces);
        }

        //[Set Tax]
        if (input == "set tax")
          initialiseSetTax(user_id);

        //[Unit List]
        if (input == "unit list") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printUnitList(game_obj.user),
            user: game_obj.user
          });
          game_obj.page = "unit_list";
        }

        //Topbar commands
        {
          if (["exit", "quit", "quit game"].includes(input)) {
            //Create a confirmation dialogue for quitting the game
            returnChannel(game_obj.channel).send("Loading ..").then((msg) => {
              confirmDialogue(msg, {
                text: "**Save and Exit Game**\n\nAre you sure you want to quit the game and return to the main menu?",
                user: game_obj.user,
                delete_after: true
              }, function () {
                clearGame(game_obj.id);
              })
            });
          }

          //[Budget]
          if (input == "budget")
            if (game_obj.page != "budget") {
              game_obj.page = "budget";
              printBudget(user_id);
              initialiseTopbar(user_id);
            }

          //[Colonisation]
          if (["colonisation", "colonization"].includes(input))
            if (game_obj.page != "colonisation") {
              game_obj.page = "colonisation";
              printColonisation(user_id);
              initialiseTopbar(user_id);
            }

          //[Country/Stats/Statistics]
          if (["country", "country interface", "country statistics", "stats", "statistics"].includes(input))
            if (game_obj.page != "country_interface") {
              game_obj.page = "country_interface";
              printStats(user_id);
              initialiseTopbar(user_id);
            }

          //[Diplomacy]
          if (input == "diplomacy")
            if (game_obj.page != "diplomacy") {
              game_obj.page = "diplomacy";
              printDiplomacy(user_id);
              initialiseTopbar(user_id);
            }

          //[Econ/Economy]
          if (["econ", "economic statistics", "economy"].includes(input))
            if (game_obj.page != "economy") {
              game_obj.page = "economy";
              printEconomy(user_id);
              initialiseTopbar(user_id);
            }

          //[Map]
          if (input == "map")
            if (game_obj.page != "map") {
              game_obj.page = "map";
              initialiseMapViewer(getGame(user_id));
              initialiseTopbar(user_id);
            }

          //[Military]
          if (input == "military")
            if (game_obj.page != "military") {
              game_obj.page = "military";
              printMilitary(user_id);
              initialiseTopbar(user_id);
            }

          //[Politics]
          if (input == "politics")
            if (game_obj.page != "politics") {
              game_obj.page = "politics";
              printPolitics(user_id);
              initialiseTopbar(user_id);
            }

          //[Population]
          if (input == "population")
            if (game_obj.page != "population") {
              game_obj.page = "population";
              printPops(user_id);
              initialiseTopbar(user_id);
            }

          //[Technology]
          if (input == "technology")
            if (game_obj.page != "technology") {
              game_obj.page = "technology";
              printTechnology(user_id);
              initialiseTopbar(user_id);
            }

          //[Trade]
          if (input == "trade")
            if (game_obj.page != "trade") {
              game_obj.page = "trade";
              printTrade(user_id);
              initialiseTopbar(user_id);
            }

        }

        //[View (Name)]
        if (input.startsWith("view ")) {
          var view_obj = input.replace("view ", "").trim();

          switch (view_obj) {
            case "archived war":
              initialisePrintArchivedWar(user_id);

              break;
            case "armies":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(user_id),
                user: game_obj.user
              });
              game_obj.page = "army_list";

              break;
            case "building list":
            case "buildings":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printBuildList(user_id),
                user: game_obj.user
              });
              game_obj.page = "building_list";

              break;
            case "casus belli":
            case "cb":
            case "cbs":
            case "cb list":
              if (!game_obj.page.startsWith("diplomacy_view_")) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCBs(user_id),
                  user: game_obj.user
                });
                game_obj.page = "cb_list";
              }

              break;
            case "cities":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "cities_list";

              break;
            case "constructions":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printConstructions(user_id),
                user: game_obj.user
              });
              game_obj.page = "view_constructions";

              break;
            case "client states":
            case "client state proposals":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printClientStateProposals(user_id),
                user: game_obj.user
              });
              game_obj.page = "client_state_proposals";

              break;
            case "culture":
            case "cultures":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCultures(user_id),
                user: game_obj.user
              });
              game_obj.page = "culture";

              break;
            case "government":
            case "governments":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGovernmentList(user_id),
                user: game_obj.user
              });
              game_obj.page = "view_governments";

              break;
            case "ledger":
              printLedger(user_id);
              game_obj.page = "ledger";

              break;
            case "national modifiers":
              printNationalModifiers(user_id);
              game_obj.page = "national_modifiers";

              break;
            case "modifiers":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printModifiers(user_id),
                user: game_obj.user
              });
              game_obj.page = "modifiers_list";

              break;
            case "population":
              game_obj.page = "provinces_list";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(user_id),
                user: game_obj.user
              });

              break;
            case "province":
              if (game_obj.page != "map")
                initialiseViewProvince(user_id);

              break;
            case "provinces":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(user_id),
                user: game_obj.user
              });
              game_obj.page = "provinces_list";

              break;
            case "relations":
              initialiseViewDiplomacy(user_id);

              break;
            case "temporary modifiers":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printTemporaryModifiers(user_id),
                user: game_obj.user
              });
              game_obj.page = "temporary_modifiers_list";

              break;
            case "unit list":
            case "units":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printUnitList(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "unit_list";

              break;
            case "war":
              initialisePrintWar(user_id);

              break;
            case "conflicts":
            case "wars":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printWars(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "war_list";

              break;
            case "world market":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGlobalMarket(user_id),
                user: game_obj.user
              });
              game_obj.page = "world_market";

              break;
            default:
              if (!["view army"].includes(input)) {
                var army_obj = getArmy(user_id, view_obj);
                var city_obj = getCity(view_obj);
                var edit_embed = (game_obj.page != "map") ? game_obj.middle_embed : game_obj.alert_embed;
                var ot_user_id = returnMention(view_obj);
                var province_name = input.replace("view", "").trim()
                  .replace("province", "").trim();

                if (main.provinces[view_obj]) {
                  var local_province = main.provinces[view_obj];

                  createPageMenu(edit_embed, {
                    embed_pages: printProvince(game_obj.user, province_name),
                    user: game_obj.user
                  });
                } else {
                  var army_name_exact_match = false;
                  var city_name_exact_match = false;

                  if (army_obj)
                    if (army_obj.name.trim().toLowerCase() == view_obj)
                      army_name_exact_match = true;
                  if (city_obj)
                    if (city_obj.name.trim().toLowerCase() == view_obj)
                      city_name_exact_match = true;

                  //Army smart display
                  if (army_obj) {
                    if (city_name_exact_match && !army_name_exact_match) {
                      createPageMenu(edit_embed, {
                        embed_pages: printProvince(game_obj.user, city_obj.name),
                        user: game_obj.user
                      });

                      if (game_obj.page != "map")
                        game_obj.page = `view_city_${city_obj.name}`;
                    } else {
                      var viewed_army = printArmy(user_id, army_obj.name);

                      createPageMenu(edit_embed, {
                        embed_pages: viewed_army,
                        user: game_obj.user
                      });

                      if (game_obj.page != "map")
                        game_obj.page = `army_viewer_${army_obj.name}`;
                    }
                  }

                  //City smart display
                  if (city_obj)
                    if (army_name_exact_match && !city_name_exact_match) {
                      var viewed_army = printArmy(user_id, army_obj.name);

                      createPageMenu(edit_embed, {
                        embed_pages: viewed_army,
                        user: game_obj.user
                      });

                      if (game_obj.page != "map")
                        game_obj.page = `army_viewer_${army_obj.name}`;
                    } else {
                      createPageMenu(edit_embed, {
                        embed_pages: printProvince(game_obj.user, city_obj.name),
                        user: game_obj.user
                      });

                      if (game_obj.page != "map")
                        game_obj.page = `view_city_${city_obj.name}`;
                    }

                  //Province smart display
                  if (!city_obj)
                    if (main.provinces[province_name])
                      if (main.provinces[province_name].owner == actual_id)
                        createPageMenu(edit_embed, {
                          embed_pages: printProvince(game_obj.user, province_name),
                          user: game_obj.user
                        });

                  //If none of the above, try war/nation
                  if (!army_obj && !city_obj && game_obj.page != "map")
                    if (main.users[ot_user_id]) {
                      viewDiplomacy(user_id, ot_user_id);
                      game_obj.page = `diplomacy_view_${ot_user_id}`;
                    } else {
                      //Keep wars as last in precedence
                      var war_report = printWar(user_id, view_obj, false, true);

                      if (war_report) {
                        printWar(user_id, view_obj);
                        game_obj.page = `view_war_${view_obj}`;
                      } else {
                        var archived_war_report = printWar(user_id, view_obj, true, true);

                        if (archived_war_report) {
                          printWar(user_id, view_obj, true);
                          game_obj.page = `view_war_archives_${view_obj}`;
                        }
                      }
                    }
                }
              }

              break;
          }
        }
      }

      //Alerts page handler
      {
        if (game_obj.page == "alerts") {
          //Button Handler
          //[Alert ID]
          if (!isNaN(parseInt(input.trim()))) {
            var local_alert_id = parseInt(input.trim());

            if (usr.alerts[local_alert_id - 1]) {
              var alert_obj = usr.alerts[local_alert_id - 1];

              //Print alert and set page
              printUserAlert(user_id, alert_obj);
              game_obj.page = `alert_${local_alert_id - 1}`;
            }
          }

          //[Back]
          if (input == "back") {
            game_obj.page = "country_interface";
            initialiseTopbar(user_id);
            printStats(user_id);
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printAlerts(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printAlerts(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[View Alert]
          if (["view alert", "view_alerts"].includes(input))
            initialisePrintAlert(user_id);

        } else if (game_obj.page.startsWith("alert_")) {
          var current_alert_id = parseInt(game_obj.page.replace("alert_", ""));

          var alert_obj = usr.alerts[current_alert_id];

          //Button Handler
          //[Back]
          if (input == "back") {
            game_obj.page = "alerts";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printAlerts(game_obj.user),
              user: game_obj.user
            });
          }

          //Default handler
          if (!alert_obj.news_alert) {
            var button_obj = getButton(alert_obj.id, input);

            //Execute if button is found
            if (button_obj) {
              if (button_obj.effect) {
                try {
                  button_obj.effect(alert_obj.options);
                } catch (e) {
                  console.log(e);
                }

                //Send user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${alert_obj.name}** by choosing **${button_obj.title}**.`);
              }

              //Delete alert key
              usr.alerts.splice(local_alert_id, 1);

              //Go back to the main alert screen after resolving
              game_obj.page = "alerts";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printAlerts(game_obj.user),
                user: game_obj.user
              });
            }
          } else {
            if (input == "OK") {
              //Send user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully dismissed this alert.`);

              //Delete alert key
              usr.alerts.splice(local_alert_id, 1);

              //Go back to the main alert screen after resolving
              game_obj.page = "alerts";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printAlerts(game_obj.user),
                user: game_obj.user
              });
            }
          }
        }
      }

      //Budget handler
      {
        if (game_obj.page == "budget") {
          //[Edit Tax Code]
          if (["edit taxes", "edit tax code"].includes(input)) {
            game_obj.page = "custom_taxes";
            printCustomTaxes(user_id, 0);
          }

          //[Jump To Page]
          if (input == "jump to page") {
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printBudget(user_id, 0, true).length }]
              ]
            },
            function (arg) {
              printBudget(user_id, arg[0] - 1);
            });
          }

          //[Set Tax]
          if (input == "set tax")
            initialiseSetTax(user_id);
        }

        if (game_obj.page == "custom_taxes") {
          //[Add Tax]
          if (input == "add tax")
            initialiseAddTax(user_id);

          //[Back]
          if (input == "back") {
            game_obj.page = "budget";
            printBudget(user_id);
          }

          //[Jump To Page]
          if (input == "jump to page") {
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printCustomTaxes(user_id, 0, true).length }]
              ]
            },
            function (arg) {
              printCustomTaxes(user_id, arg[0] - 1);
            });
          }

          //[Move Tax]
          if (input == "move tax")
            initialiseMoveTax(user_id);

          //[Remove Tax]
          if (input == "remove tax")
            initialiseRemoveTax(user_id);
        }
      }

      //Buildings/Cities page handler
      {
        if (game_obj.page.startsWith("view_building_")) {
          var building_id = game_obj.page.replace("view_building_", "");
          var local_building = getBuildingByID(building_id);
          var province_id = building_id.split("-")[0];

          //[Back]
          if (input == "back") {
            printProvinceBuildings(user_id, province_id);
            game_obj.page = `view_buildings_${province_id}`;
          }

          //[Change Production Choice]
          if (input == "change production choice")
            initialiseChangeProductionChoice(user_id, local_building);

          //[Demolish]
          if (input == "demolish")
            demolish(user_id, {
              province_id: province_id,

              building_object: local_building
            });

          //[Hide Production Choices]
          if (["hide production choice", "hide production choices"].includes(input)) {
            game_obj.hide_production_choices = true;
            printBuilding(user_id, building_id, current_page);
          }

          //[Jump To Page]
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like to jump to?`, "number", { min: 1, max: printBuilding(game_obj.user, province_id, undefined, { do_not_display: true }).length }]
            ]
          },
          function (arg) {
            printBuilding(user_id, province_id, arg[0]);
          });

          //[Rename Building]
          if (input == "rename building")
            initialiseRenameBuilding(user_id, local_building);

          //[Reopen]
          if (["reopen", "reopen building"].includes(input))
            reopenBuilding(user_id, local_building);

          //[Show Production Choices]
          if (["show production choice", "show production choices"].includes(input)) {
            delete game_obj.hide_production_choices;
            printBuilding(user_id, building_id, current_page);
          }

          //[Subsidise]
          if (["subsidise", "subsidize"].includes(input))
            subsidiseBuilding(user_id, local_building);

          //[Turn Off Subsidies]
          if (input == "turn off subsidies")
            subsidiseBuilding(user_id, local_building, { desubsidise: true });

          //[Switch to (Production Choice)]
          if (input.startsWith("switch to ")) {
            var production_choice_name = input.replace("switch to ", "");
            var change_production_choice = changeProductionChoice(user_id, local_building, production_choice_name);

            (change_production_choice[0]) ?
              printAlert(game_obj.id, change_production_choice[1]) :
              printError(game_obj.id, change_production_choice[1]);
          }
        }

        if (game_obj.page.startsWith("view_buildings_")) {
          var province_id = game_obj.page.replace("view_buildings_", "");

          //[Alphabetical]
          if (input == "alphabetical") {
            game_obj.building_sort = "alphabetical";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Back]
          if (input == "back") {
            game_obj.page = `view_city_${province_id}`;
            printProvince(user_id, province_id);
          }

          //[Cash Reserves]
          if (input == "cash reserves") {
            game_obj.building_sort = "cash_reserves";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Category]
          if (input == "category") {
            game_obj.building_sort = "category";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Chronology]
          if (input == "chronology") {
            game_obj.building_sort = "chronology";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Defund All Buildings]
          if (input == "defund all buildings")
            subsidiseAllBuildings(user_id, {
              province_ids: [province_id],
              desubsidise: true
            });

          //[Employment]
          if (input == "employment") {
            game_obj.building_sort = "employment";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printProvinceBuildings(user_id, province_id, undefined, { do_not_display: true }).length }]
              ]
            },
            function (arg) {
              printProvinceBuildings(game_obj.user, province_id, arg[0] - 1);
            });

          //[Mass Change Production Choice]
          if (input == "mass change production choice")
            initialiseMassChangeProductionChoice(user_id, province_id);

          //[Numeric]
          if (input == "numeric") {
            game_obj.building_sort = "numeric";
            printProvinceBuildings(user_id, province_id, current_page);
          }

          //[Rename Building]
          if (input == "rename building")
            initialiseRenameBuilding(user_id);

          //[Reopen]
          if (input == "reopen")
            initialiseReopenBuilding(user_id);

          //[Subsidise All Buildings]
          if (["subsidise all buildings", "subsidize all buildings"].includes(input))
            subsidiseAllBuildings(user_id, { province_ids: [province_id] });

          //[View Building]
          if (input == "view building")
            initialiseViewBuilding(user_id);

          //[View (Building Name)]
          if (input.startsWith("view building ")) {
            var building_name = input.replace("view building ", "");
            var building_view = viewBuilding(user_id, building_name);

            game_obj.page = `view_building_${building_view.id}`;
          }
        }

        if (game_obj.page.startsWith("view_city")) {
          var city_name = game_obj.page.replace("view_city_", "");
          var city_obj = getCity(city_name);

          switch (input) {
            case "back":
              game_obj.page = "cities_list";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(game_obj.user),
                user: game_obj.user
              });

              break;
            case "build":
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Constructing Building(s) in ${city_obj.name}:`,
                prompts: [
                  [`How many buildings of this type would you like to begin building?`, "number", { min: 1 }],
                  [`What would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.\nType **[Inventory]** to view your inventory.`, "string"]
                ]
              },
              function (arg) {
                build(user_id, city_obj.name, arg[0], arg[1]);
              },
              function (arg) {
                switch (arg) {
                  case "build list":
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printBuildList(user_id),
                      user: game_obj.user
                    });
                    return true;

                    break;
                  case "inventory":
                    printInventory(user_id);
                    return true;

                    break;
                }
              });

              break;
            case "demolish":
              initialiseDemolish(user_id, city_obj.id);

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
            case "hide warnings":
              delete game_obj.show_pop_need_warnings;
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvince(game_obj.user, city_name),
                page: current_page,
                user: game_obj.user
              });

              break;
            case "jump to page":
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like to jump to?`, "number", { min: 1, max: printProvince(game_obj.user, city_name).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printProvince(game_obj.user, city_name),
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

              break;
            case "show warnings":
              game_obj.show_pop_need_warnings = true;
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvince(game_obj.user, city_name),
                page: current_page,
                user: game_obj.user
              });

              break;
            case "view buildings":
              printProvinceBuildings(user_id, city_obj.id);
              game_obj.page = `view_buildings_${city_obj.id}`;

              break;
            case "view demographics":
              printDemographics(user_id, city_name);
              game_obj.page = `view_demographics_${city_name}`;

              break;
          }
        }
      }

      //Colonisation interface page handler
      {
        switch (game_obj.page) {
          case "colonisation":
            //Button handler
            //[Cancel Charter #(Charter ID)]
            if (input.startsWith("cancel charter ")) {
              var charter_to_cancel = input.replace("cancel charter ", "")
                .replace("#", "");

              cancelCharter(user_id, charter_to_cancel);
            } else if (input == "cancel charter") {
              initialiseCancelCharter(user_id);
            }

            //[Jump To Page]
            if (input == "jump to page")
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like jump to?`, "number", { min: 1, max: printColonisation(game_obj.user).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printColonisation(game_obj.user),
                  page: arg[0] - 1,
                  user: game_obj.user
                })
              });

            //[Reserves]
            if (input == "reserves") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printReserves(user_id),
                user: game_obj.user
              });
              game_obj.page = "reserves";
            }

            //[Settle Starting Provinces]
            if (["settle starting province", "settle starting provinces"].includes(input)) {
              var has_no_provinces = (getProvinces(user_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

              if (has_no_provinces && !atWar(user_id))
                initialiseSettleStartingProvinces(user_id);
            }

            break;
          case "reserves":
            //Button handler
            //[Back]
            if (input == "back") {
              printMilitary(user_id);
              game_obj.page = "military";
            }

            //[Create Army]
            if (input == "create army")
              initialiseCreateArmy(user_id);

            //[Disband Units]
            if (input == "disband units")
              initialiseDisbandUnitsCommand(user_id);

            //[Jump To Page]
            if (input == "jump to page")
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like jump to?`, "number", { min: 1, max: printColonisation(game_obj.user).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printColonisation(game_obj.user),
                  page: arg[0] - 1,
                  user: game_obj.user
                });
              });

            //[Unit List]
            if (["craft list", "unit list"].includes(input)) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printUnitList(game_obj.user),
                user: game_obj.user
              });
              game_obj.page = "unit_list";
            }

            break;
          case "unit list":
            //Button handler
            //[Back]
            if (input == "back") {
              printColonisation(user_id);
              game_obj.page = "colonisation";
            }

            break;
        }
      }

      //Country interface page handler
      {
        if (["country_interface"].includes(game_obj.page)) {
          switch (input) {
            case "chop":
              initialiseChop(user_id);

              break;
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
                      embed_pages: printGovernmentList(user_id),
                      user: game_obj.user
                    });
                    return true;

                    break;
                }
              });

              break;
            case "view customisation":
            case "customisation":
              printCustomisation(user_id);
              game_obj.page = "view_customisation";

              break;
            case "global commands":
              printGlobalCommands(user_id);
              game_obj.page = "global_commands";

              break;
            case "government list":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGovernmentList(user_id),
                user: game_obj.user
              });
              game_obj.page = "view_governments";

              break;
            case "mine":
              initialiseMine(user_id);

              break;
            case "quarry":
              initialiseQuarry(user_id);

              break;
            case "set government":
              initialiseSetGovernmentCommand(user_id);

              break;
            case "settle starting province":
            case "settle starting provinces":
              var has_no_provinces = (getProvinces(user_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

              if (has_no_provinces && !atWar(user_id))
                initialiseSettleStartingProvinces(user_id);

              break;
            case "view customisation":
              printCustomisation(user_id);
              game_obj.page = "view_customisation";

              break;
          }

          //[Chop (#)]
          if (input.startsWith("chop ")) {
            var amount_to_chop = parseInt(input.replace("chop ", "").trim());

            mine(user_id, amount_to_chop, "chop");
          }

          //[Mine (#)]
          if (input.startsWith("mine ")) {
            var amount_to_mine = parseInt(input.replace("mine ", "").trim());

            mine(user_id, amount_to_mine, "mine");
          }

          //[Quarry (#)]
          if (input.startsWith("quarry ")) {
            var amount_to_quarry = parseInt(input.replace("quarry ", "").trim());

            mine(user_id, amount_to_quarry, "quarry");
          }
        }

        if (game_obj.page == "global_commands") {
          //[Back]
          if (input == "back") {
            printStats(user_id);
            game_obj.page = "country_interface";
          }
        }

        if (game_obj.page == "national_modifiers") {
          var all_national_modifiers = Object.keys(usr.national_modifiers);

          //[Back]
          if (input == "back") {
            printStats(user_id);
            game_obj.page = "country_interface";
          }

          //[(#ID)]
          if (all_national_modifiers[Math.ceil(parseInt(input)) - 1])
            printNationalModifiers(user_id, input);

          //[View National Modifier]
          if (input == "view national modifier")
            initialisePrintNationalModiifer(user_id);
        }

        if (game_obj.page == "view_customisation") {
          //[Back]
          if (input == "back") {
            if (interfaces[game_obj.middle_embed.id].page == 0) {
              printStats(user_id);
              game_obj.page = "country_interface";
            } else {
              printDiplomacy(user_id);
              game_obj.page = "diplomacy";
            }
          }

          //[Rename Country]
          if (input == "rename country")
            initialiseRenameCountry(user_id);

          //[Rename Culture]
          if (input == "rename culture")
            initialiseRenamePrimaryCulture(user_id);

          //[Rename Culture Adjective]
          if (input == "rename culture adjective")
            initialiseRenameCultureAdjective(user_id);

          //[Set Colour]
          if (["set colour", "set color"].includes(input))
            initialiseSetColour(user_id);

          //[Set Flag]
          if (input == "set flag")
            initialiseSetFlag(user_id);

          //[Set Motto]
          if (input == "set motto")
            initialiseSetMotto(user_id);

          //Vassal customisation
          if (Object.keys(usr.diplomacy.vassals).length > 0) {
            //[Rename Vassal]
            if (input == "rename vassal")
              initialiseRenameVassal(user_id);

            //[Rename Vassal City]
            if (input == "rename vassal city")
              initialiseRenameVassalCity(user_id);

            //[Rename Vassal Culture]
            if (input == "rename vassal culture")
              initialiseRenameVassalCulture(user_id);

            //[Set Vassal Colour]
            if (input == "set vassal colour")
              initialiseSetVassalColour(user_id);

            //[Set Vassal Flag]
            if (input == "set vassal flag")
              initialiseSetVassalFlag(user_id);

            //[Set Vassal Motto]
            if (input == "set vassal motto")
              initialiseSetVassalMotto(user_id);
          }
        }
      }

      //Diplomacy page handler
      {
        if (game_obj.page == "cb_list") {
          var default_keys = ["back", "jump to page"];

          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printCBs(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCBs(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[(Wargoal Name)]
          if (!default_keys.includes(input)) {
            var wargoal_obj = getWargoal(input);

            if (wargoal_obj)
              printAlert(game_obj.id, parseWargoalLocalisation(wargoal_obj).join("\n"));
          }
        }

        if (game_obj.page == "client_state_proposals") {
          //Button Handler
          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Create Client State]
          if (input == "create client state")
            initialiseCreateClientState(user_id);

          //[Delete Client State]
          if (input == "delete client state")
            initialiseDeleteClientState(user_id);

          //[Edit Client State]
          if (input == "edit client state")
            initialiseEditClientState(user_id);

          //[Edit (Client State Name)]
          if (input.startsWith("edit ") && input != "edit client state") {
            var client_state_name = input.replace("edit ", "");
            var client_state_obj = getClientState(user_id, client_state_name);

            if (client_state_obj)
              modifyClientState(user_id, client_state_obj);
          }

          //[Release Client State]
          if (input == "release client state")
            initialiseReleaseClientState(user_id);
        }

        if (game_obj.page == "diplomacy") {
          //Button Handler
          //[Allow Ceding]
          if (input == "allow ceding")
            initialiseAllowCede(user_id);

          //[Cede Province]
          if (input == "cede province")
            initialiseCedeProvince(user_id);

          //[Deny Ceding]
          if (input == "deny ceding")
            initialiseDenyCede(user_id);

          //[Lock Vassal Customisation]
          if (["lock vassal customisation", "lock vassal customization"].includes(input))
            lockVassalCustomisation(user_id, "lock");

          //[Unlock Vassal Customization]
          if (["unlock vassal customisation", "unlock vassal customization"].includes(input))
            lockVassalCustomisation(user_id, "unlock");

          //[Vassal Customisation]
          if (Object.keys(usr.diplomacy.vassals).length > 0)
            if (["vassal customisation", "vassal customization"].includes(input)) {
              printCustomisation(user_id, 1);
              game_obj.page = "view_customisation";
            }

          //[View Relations]
          if (input.startsWith("view relations ")) {
            var ot_user_id = returnMention(game_obj.page.replace("view relations ", ""));

            viewDiplomacy(user_id, ot_user_id);
            game_obj.page = `diplomacy_view_${returnMention(ot_user_id)}`;
          }

          //[War List]
          if (input == "war list") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWars(game_obj.user),
              user: game_obj.user
            });
            game_obj.page = "war_list";
          }
        }

        if (game_obj.page.startsWith("diplomacy_view_")) {
          var ot_user_id = game_obj.page.replace("diplomacy_view_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Break Alliance]
          if (input == "break alliance")
            breakAlliance(user_id, ot_user_id);

          //[Cancel Justification]
          if (input == "cancel justification")
            initialiseCancelJustification(user_id);

          //[Cancel Military Access]
          if (input == "cancel military access")
            cancelMilitaryAccess(user_id, ot_user_id);

          //[Call Ally]
          if (input == "call ally")
            initialiseCallAlly(user_id, ot_user_id);

          //[Cancel Wargoal]
          if (input == "cancel wargoal")
            initialiseCancelWargoal(user_id);

          //[Declare Rivalry]
          if (input == "declare rivalry")
            rival(user_id, ot_user_id);

          //[Declare War]
          if (input == "declare war")
            initialiseDeclareWar(user_id);

          //[Decrease Relations]
          if (input == "decrease relations")
            decreaseRelations(user_id, ot_user_id);

          //[Demand Annexation]
          if (input == "demand annexation")
            annex(user_id, ot_user_id);

          //[Demand Vassalisation]
          if (input == "demand vassalisation")
            vassalise(user_id, ot_user_id);

          //[End Rivalry]
          if (input == "end rivalry")
            endRivalry(user_id, ot_user_id);

          //[Guarantee Independence]
          if (input == "guarantee independence")
            proclaimGuarantee(user_id, ot_user_id);

          //[Liberate]
          if (input == "liberate")
            liberate(user_id, ot_user_id);

          //[Improve Relations]
          if (input == "improve relations")
            improveRelations(user_id, ot_user_id);

          //[Manage Players]
          if (input == "manage players")
            printVassalCoopMenu(user_id, ot_user_id);

          //[Justify Wargoal]
          if (input == "justify wargoal")
            initialiseJustifyWar(user_id);

          //[Request Alliance]
          if (input == "request alliance")
            ally(user_id, ot_user_id);

          //[Request Military Access]
          if (input == "request military access")
            militaryAccess(user_id, ot_user_id);

          //[Revoke Guarantee]
          if (input == "revoke guarantee")
            revokeGuarantee(user_id, ot_user_id);

          //[Revoke Military Access]
          if (input == "revoke military access")
            revokeMilitaryAccess(user_id, ot_user_id);

          //[Sign Non-Aggression Pact]
          if (["sign non-aggression pact", "sign non aggression pact", "non-aggression pact", "non aggression pact"].includes(input))
            nonAggressionPact(user_id, ot_user_id);

          //[View CBs]
          if (input == "view cbs") {
            game_obj.page = `view_cb_${ot_user_id}`;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCBList(user_id, ot_user_id),
              user: game_obj.user
            });
          }

          //[View Wargoals]
          if (input == "view wargoals") {
            game_obj.page = `view_wargoals_${ot_user_id}`;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWargoals(user_id, ot_user_id),
              user: game_obj.user
            });
          }
        }

        if (game_obj.page == "ledger") {
          //Button Handler
          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printLedger(game_obj.user, true).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printLedger(game_obj.user, true),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });
        }

        if (game_obj.page.startsWith("view_cb_")) {
          var ot_user_id = game_obj.page.replace("view_cb_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            viewDiplomacy(user_id, ot_user_id);
            game_obj.page = `diplomacy_view_${ot_user_id}`;
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printCBs(game_obj.user, ot_user_id).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCBs(game_obj.user, ot_user_id),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Justify Wargoal]
          if (input == "justify wargoal")
            initialiseJustifyWar();

          //Tooltip handler
          printCBTooltip(user_id, ot_user_id, input);
        }

        if (game_obj.page.startsWith("view_coop_")) {
          var ot_user_id = game_obj.page.replace("view_coop_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            viewDiplomacy(user_id, ot_user_id);
            game_obj.page = `diplomacy_view_${ot_user_id}`;
          }

          //[Invite Player]
          if (input == "invite player")
            initialiseInviteVassalPlayer(user_id, ot_user_id);

          //[Invite (Username)]
          if (input.startsWith("invite ")) {
            var invited_player = parseMention(input.replace("invite ", "").trim());

            inviteVassalPlayer(user_id, ot_user_id, invited_player);
          }

          //[Liberate]
          if (input == "liberate")
            liberate(user_id, ot_user_id);

          //[Kick Player]
          if (input == "kick player")
            initialiseKickVassalPlayer(user_id, ot_user_id);

          //[Kick (Username)]
          if (input.startsWith("kick ")) {
            var kicked_player = parseMention(input.replace("kick ", "").trim());

            inviteVassalPlayer(user_id, ot_user_id, kicked_player);
          }
        }

        if (game_obj.page.startsWith("view_peace_treaties_")) {
          var war_name = game_obj.page.replace("view_peace_treaties_", "");
          var war_obj = getWar(war_name);

          //[Back]
          if (input == "back") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWar(user_id, war_obj.name),
              user: game_obj.user
            });
            game_obj.page = `view_war_${war_obj.name}`;
          }

          //[Create Peace Offer]
          if (["create peace offer", "create peace treaty", "sign peace offer", "sign peace treaty"].includes(input))
            signPeaceTreaty(user_id, war_obj);

          //[Delete Peace Offer]
          if (["delete peace offer", "delete peace treaty"].includes(input))
            initialiseDeletePeaceTreaty(user_id, war_obj);

          //[Edit Peace Offer]
          if (["edit peace offer", "edit peace treaty"].includes(input))
            initialiseViewPeaceTreaty(user_id, war_obj);

          //[Edit (Peace Offer Name)]
          if (input.startsWith("edit ")) {
            var peace_treaty_to_edit = input.replace("edit ", "");
            var peace_obj = getPeaceTreaty(war_obj, peace_treaty_to_edit);

            if (peace_obj) {
              if (peace_obj.type != "user" || (peace_obj.type == "user" && peace_obj.owner == actual_id)) {
                modifyPeaceTreaty(user_id, peace_obj);
                game_obj.page = "edit_peace_offer";
              }
            } else {
              printError(game_obj.id, `You must specify a valid peace treaty to edit!`);
            }
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printEvents(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printPeaceTreaties(game_obj.user, war_obj),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Rename Peace Offer]
          if (["rename peace offer", "rename peace treaty"].includes(input))
            initialiseRenamePeaceTreaty(user_id, war_obj);
        }

        if (game_obj.page.startsWith("view_wargoal_")) {
          var ot_user_id = game_obj.page.replace("view_cb_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            viewDiplomacy(user_id, actual_ot_user_id);
            game_obj.page = `diplomacy_view_${ot_user_id}`;
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printWargoals(game_obj.user, ot_user_id).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printWargoals(game_obj.user, ot_user_id),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Declare War]
          if (input == "declare war")
            initialiseDeclareWar(user_id);

          //Tooltip handler
          printCBTooltip(user_id, ot_user_id, input);
        }

        if (game_obj.page == "war_list") {
          //[(Archived War Name)]
          var archived_war_report = printWar(user_id, input, true, true);

          if (archived_war_report) {
            printWar(user_id, input, true);
            game_obj.page = `view_war_archives_${input}`;
          }

          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printWars(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printWars(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

        }

        //These go after war list
        if (game_obj.page.startsWith("view_war_")) {
          var default_keys = ["back", "add wargoal", "call ally", "change war leader", "edit peace offer", "remove wargoal", "rename war", "send peace offer", "sign peace treaty", "view peace offer", "view peace treaty"];
          var war_name = game_obj.page.replace("view_war_", "");
          var war_obj = getWar(war_name);

          //[Back]
          if (input == "back") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWars(game_obj.user),
              user: game_obj.user
            });
            game_obj.page = "war_list";
          }

          //[Break Armistice]
          if (input == "break armistice")
            breakArmistice(user_id, war_obj);

          //[Call Ally]
          if (input == "call ally")
            initialiseCallAlly(user_id);

          //[Change War Leader]
          if (input == "change war leader")
            initialiseLeadWar(user_id, war_name);

          //[Intervene In War]
          if (input == "intervene in war")
            initialiseInterveneInWar(user_id, war_obj);

          //[Merge War]
          if (["merge war", "merge wars"].includes(input))
            initialiseMergeWar(user_id, war_obj);

          //[Recall Volunteers]
          if (input == "recall volunteers")
            initialiseRecallVolunteers(user_id, war_obj);

          //[Rename War]
          if (input == "rename war")
            initialiseRenameWar(user_id, war_name);

          //[Repatriate Volunteers]
          if (input == "repatriate volunteers")
            initialiseRepatriateVolunteers(user_id, war_obj);

          //[Propose Armistice]
          if (["armistice", "propose armistice"].includes(input))
            armistice(user_id, war_obj);

          //[Propose Ceasefire]
          if (["ceasefire", "propose ceasefire"].includes(input))
            ceasefire(user_id, war_obj);

          //[Send Volunteer Armies]
          if (input == "send volunteer armies")
            initialiseSendVolunteerArmies(user_id, war_obj);

          //[Send Volunteers]
          if (input == "send volunteers")
            initialiseSendVolunteers(user_id, war_obj);

          //[Surrender]
          if (input == "surrender")
            surrender(user_id);

          //[View Peace Offers]
          if (input == "view peace offers") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printPeaceTreaties(user_id, war_obj.name),
              user: game_obj.user
            });
            game_obj.page = `view_peace_treaties_${war_name}`;
          }

          //[(Wargoal Name)]
          if (!default_keys.includes(input)) {
            var wargoal_obj = getWargoal(input);

            if (wargoal_obj)
              printAlert(game_obj.id, parseWargoalLocalisation(wargoal_obj).join("\n"));
          }
        }

        if (game_obj.page.startsWith("view_war_archives_", "")) {
          var archived_war = game_obj.page.replace("view_war_archives", "");

          //[Back]
          if (input == "back") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWars(game_obj.user),
              user: game_obj.user
            });
            game_obj.page = "war_list";
          }
        }
      }

      //Economy page handler
      {
        if (game_obj.page == "economy") {
          //[Hide Available Pops]
          if (input == "hide available pops") {
            game_obj.hide_building_pops = true;
            printEconomy(user_id);
          }

          //[Show Available Pops]
          if (input == "show available pops") {
            delete game_obj.hide_building_pops;
            printEconomy(user_id);
          }
        }

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
                      embed_pages: printBuildList(user_id),
                      user: game_obj.user
                    });
                    return true;

                    break;
                  case "view cities":
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printProvinces(game_obj.user),
                      user: game_obj.user
                    });
                    return true;

                    break;
                }
              })

              break;
            case "building list":
            case "build list":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printBuildList(user_id),
                user: game_obj.user
              });

              break;
            case "constructions":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printConstructions(user_id),
                user: game_obj.user
              });
              game_obj.page = "view_constructions";

              break;
            case "found city":
              //Make sure that user is actually able to found a city before authorising the command, otherwise print an error
              (usr.city_cap-usr.city_count > 0) ?
                initialiseFoundCity(user_id) :
                printError(game_obj.id, `You don't have enough city slots remaining to found a new city!`);

              break;
            case "industry":
              printIndustry(user_id);
              game_obj.page = "view_industry";

              break;
          }
        }

        if (game_obj.page == "inventory") {
          var all_good_names = getAllGoodNamesLowercase();

          //[Back]
          if (input == "back") {
            printEconomy(user_id);
            game_obj.page = "economy";
          }

          //[Clear]
          if (["clear", "clear search"].includes(input))
            printInventory(user_id, current_page);

          //[(Good Name)] - Tooltip
          goodTooltip(user_id, input);

          //[Hide All Goods]
          if (["hide goods", "hide all goods"].includes(input)) {
            delete game_obj.inventory_show_all_goods;
            printInventory(user_id, current_page);
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printInventory(user_id, undefined, true).length }]
              ]
            },
            function (arg) {
              printInventory(user_id, arg[0] - 1);
            });

          //[Search]
          if (input == "search")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Search Inventory:`,
              prompts: [
                [`What is the name of the good you would like to view?`, "string"]
              ]
            },
            function (arg) {
              printInventory(user_id, undefined, { search_query: arg[0] });
            });

          //[Show All Goods]
          if (input == "show all goods") {
            game_obj.inventory_show_all_goods = true;
            printInventory(user_id, current_page);
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

        if (game_obj.page == "view_industry") {
          //[Alphabetical]
          if (input == "alphabetical") {
            game_obj.building_sort = "alphabetical";
            printIndustry(user_id, current_page);
          }

          //[Back]
          if (input == "back") {
            game_obj.page = "economy";
            printEconomy(user_id);
            initialiseTopbar(user_id);
          }

          //[Cash Reserves]
          if (input == "cash reserves") {
            game_obj.building_sort = "cash_reserves";
            printIndustry(user_id, current_page);
          }

          //[Category]
          if (input == "category") {
            game_obj.building_sort = "category";
            printIndustry(user_id, current_page);
          }

          //[Chronology]
          if (input == "chronology") {
            game_obj.building_sort = "chronology";
            printIndustry(user_id, current_page);
          }

          //[Disable All Subsidies]
          if (input == "disable all subsidies")
            subsidiseAllBuildings(user_id, { desubsidise: true });

          //[Employment]
          if (input == "employment") {
            game_obj.building_sort = "employment";
            printIndustry(user_id, current_page);
          }

          //[Numeric]
          if (input == "numeric") {
            game_obj.building_sort = "numeric";
            printIndustry(user_id, current_page);
          }

          //[Jump To Page]
          if (input == "jump to page") {
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printIndustry(game_obj.user, 0, { do_not_display: true }).length }]
              ]
            },
            function (arg) {
              printIndustry(user_id, arg[0]);
            });
          }

          //[Mass Change Production Choice]
          if (input == "mass change production choice")
            initialiseMassChangeProductionChoice(user_id);

          //[Rename Building]
          if (input == "rename building")
            initialiseRenameBuilding(user_id);

          //[Reopen]
          if (input == "reopen")
            initialiseReopenBuilding(user_id);

          //[Subsidise All Buildings]
          if (["subsidise all buildings", "subsidize all buildings"].includes(input))
            subsidiseAllBuildings(user_id);

          //[View Building]
          if (input == "view building")
            initialiseViewBuilding(user_id);

          //[View (Building Name)]
          if (input.startsWith("view building ")) {
            var building_name = input.replace("view building ", "");
            var building_view = viewBuilding(user_id, building_name);

            game_obj.page = `view_building_${building_view.id}`;
          }
        }

        if (game_obj.page == "view_production") {
          //[Back]
          if (input == "back") {
            game_obj.page = "economy";
            printEconomy(user_id);
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printProduction(game_obj.user, 0, true).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProduction(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              })
            });
        }
      }

      //Events page handler
      {
        if (game_obj.page == "events") {
          //Button Handler
          //[Event ID]
          if (!isNaN(parseInt(input.trim()))) {
            var local_event_id = parseInt(input.trim());

            if (usr.events[local_event_id - 1]) {
              var event_obj = usr.events[local_event_id - 1];

              //Print event and set page
              printEvent(user_id, event_obj);
              game_obj.page = `event_${local_event_id - 1}`;
            }
          }

          //[Back]
          if (input == "back") {
            game_obj.page = "country_interface";
            initialiseTopbar(user_id);
            printStats(user_id);
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printEvents(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printEvents(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[View Event]
          if (input == "view event")
            initialisePrintEvent(user_id);

        } else if (game_obj.page.startsWith("event_")) {
          var current_event_id = parseInt(game_obj.page.replace("event_", ""));

          var event_obj = usr.events[current_event_id];

          //Button Handler
          //[Back]
          if (input == "back") {
            game_obj.page = "events";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printEvents(game_obj.user),
              user: game_obj.user
            });
          }

          //Default handler
          if (!event_obj.news_event) {
            var option_obj = getOption(event_obj.id, input);

            //Execute if option is found
            if (option_obj) {
              if (option_obj.effect) {
                option_obj.effect(event_obj.scopes);

                //Send user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${event_obj.name}** by choosing **${option_obj.title}**.`);
              }

              //Delete event key
              usr.events.splice(local_event_id, 1);

              //Go back to the main event screen after resolving
              game_obj.page = "events";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printEvents(game_obj.user),
                user: game_obj.user
              });
            }
          } else {
            if (input == "OK") {
              //Send user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved this event.`);

              //Delete events key
              usr.events.splice(local_event_id, 1);

              //Go back to the main events screen after resolving
              game_obj.page = "events";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printEvents(game_obj.user),
                user: game_obj.user
              });
            }
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

      //Map page handler
      {
        if (game_obj.page == "map") {
          //[(Province ID/Name)]
          var province_obj = getProvince(input);

          if (province_obj)
            createPageMenu(game_obj.alert_embed, {
              embed_pages: printProvince(user_id, arg[0]),
              user: game_obj.user
            });

          //[View Province]
          if (input == "view province")
            initialiseViewProvince(user_id, true);
        }
      }

      //Military page handler
      {
        if (game_obj.page == "army_list") {
          //[Attrition]
          if (["attrition", "sort by attrition"].includes(input)) {
            game_obj.armies_sorting_mode = "attrition";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Alphabetical]
          if (["alphabetical", "sort by alphabetical"].includes(input)) {
            game_obj.armies_sorting_mode = "alphabetical";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Back]
          if (input == "back") {
            printMilitary(user_id);
            game_obj.page = "military";
          }

          //[Chronological]
          if (["chronological", "sort by chronological"].includes(input)) {
            game_obj.armies_sorting_mode = "chronological";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printArmyList(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(game_obj.user),

                page: current_page,
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Numerical]
          if (["number", "numeric", "numerical", "sort by number", "sort by numeric", "sort by numerical"].includes(input)) {
            game_obj.armies_sorting_mode = "numerical";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Roman]
          if (["roman", "sort by roman"].includes(input)) {
            game_obj.armies_sorting_mode = "roman_numerical";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Size]
          if (["size", "sort by size"].includes(input)) {
            game_obj.armies_sorting_mode = "size";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Speed]
          if (["speed", "sort by speed"].includes(input)) {
            game_obj.armies_sorting_mode = "speed";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Strength]
          if (["strength", "sort by strength"].includes(input)) {
            game_obj.armies_sorting_mode = "strength";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Type]
          if (["type", "sort by type"].includes(input)) {
            game_obj.armies_sorting_mode = "type";
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(game_obj.user),
              page: current_page,
              user: game_obj.user
            });
          }
        }

        if (game_obj.page == "army_list" || game_obj.page.startsWith("army_viewer_")) {
          //[Air Raid]
          if (input == "air raid")
            initialiseAirRaidCommand(user_id);

          //[Back]
          if (game_obj.page == "army_list" && input == "back") {
            printMilitary(user_id);
            game_obj.page = "military";
          }

          //[Blockade]
          if (input == "blockade")
            initialiseBlockade(user_id);

          //[Challenge Blockade]
          if (input == "challenge blockade")
            initialiseChallengeBlockade(user_id);

          //[Change Home Port]
          if (!game_obj.page.startsWith("army_viewer_"))
            if (input == "change home port")
              initialiseChangeHomePort(user_id);

          //[Convoy Raid]
          if (input == "convoy raid")
            initialiseConvoyRaid(user_id);

          //[Delete Army]
          if (input == "delete army")
            initialiseDeleteArmy(user_id);

          //[Deploy Units]
          if (input == "deploy units")
            initialiseDeployUnits(user_id);

          //[Harbour Raid]
          if (input == "harbour raid")
            initialiseHarbourRaid(user_id);

          //[Lift Blockade]
          if (!game_obj.page.startsWith("army_viewer_"))
            if (input == "lift blockade")
              initialiseLiftBlockade(user_id);

          //[Merge Army]
          if (input == "merge army")
            initialiseMergeArmy(user_id);

          //[Move]
          if (input == "move")
            initialiseMoveArmy(user_id);

          //[Relieve Units]
          if (input == "relieve units")
            initialiseRelieveUnits(user_id);

          //[Rename Army]
          if (input == "rename army")
            initialiseRenameArmy(user_id);

          //[Split Army]
          if (input == "split army")
            initialiseSplitArmy(user_id);

          //[Torpedo Fleet]
          if (input == "torpedo fleet")
            initialiseTorpedoFleet(user_id);

          //[Transfer Units]
          if (input == "transfer units")
            initialiseTransferUnits(user_id);
        }

        if (game_obj.page.startsWith("army_viewer_", "")) {
          var viewed_army = game_obj.page.replace("army_viewer_", "");

          //[Air Raid]
          if (input == "air raid")
            initialiseAirRaidCommand(user_id, viewed_army);

          //[Back]
          if (input == "back") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              user: game_obj.user
            });
            game_obj.page = "army_list";
          }

          //[Blockade]
          if (input == "blockade")
            initialiseBlockade(user_id, viewed_army);

          //[Challenge Blockade]
          if (input == "challenge blockade")
            initialiseChallengeBlockade(user_id, viewed_army);

          //[Change Home Port]
          if (input == "change home port")
            initialiseChangeHomePort(user_id, viewed_army);

          //[Close] - Closes pathing info
          if (input == "close") {
            delete game_obj.expanded_army_pathing;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmy(game_obj.user, viewed_army),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Convoy Raid]
          if (input == "convoy raid")
            initialiseConvoyRaid(user_id, viewed_army);

          //[Delete Army]
          if (input == "delete army")
            deleteArmyCommand(user_id, viewed_army);

          //[Deploy Units]
          if (input == "deploy units")
            initialiseDeployUnits(user_id, viewed_army);

          //[Expand] - Expands pathing info
          if (input == "expand") {
            game_obj.expanded_army_pathing = true;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmy(game_obj.user, viewed_army),
              page: current_page,
              user: game_obj.user
            });
          }

          //[Harbour Raid]
          if (input == "harbour raid")
            initialiseHarbourRaid(user_id, viewed_army);

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printArmyList(game_obj.user, viewed_army).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmy(game_obj.user, viewed_army),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Lift Blockade]
          if (input == "lift blockade")
            liftBlockade(user_id, viewed_army);

          //[Merge Army]
          if (input == "merge army")
            initialiseMergeArmy(user_id, viewed_army);

          //[Move]
          if (input == "move")
            initialiseMoveArmy(user_id, viewed_army);

          //[Recall Volunteers]
          if (input == "recall volunteers")
            initialiseRecallVolunteers(user_id, undefined, viewed_army);

          //[Relieve Units]
          if (input == "relieve units")
            initialiseRelieveUnits(user_id, viewed_army);

          //[Rename Army]
          if (input == "rename army")
            initialiseRenameArmy(user_id, viewed_army);

          //[Reorder Units]
          if (input == "reorder units")
            initialiseReorderUnits(user_id, viewed_army);

          //[Send Volunteers]
          if (input == "send as volunteers")
            initialiseSendVolunteerArmies(user_id, undefined, viewed_army);

          //[Split Army]
          if (input == "split army")
            initialiseSplitArmy(user_id, viewed_army);

          //[Torpedo Fleet]
          if (input == "torpedo fleet")
            initialiseTorpedoFleet(user_id, viewed_army);

          //[Transfer Units]
          if (input == "transfer units")
            initialiseTransferUnits(user_id, viewed_army);
        }

        if (military_pages.includes(game_obj.page)) {
          //[Attrition Avoidance]
          if (input == "attrition avoidance")
            initialiseAttritionAvoidance(user_id);

          //[Army List]
          if (game_obj.page != "army_list")
            if (input == "army list") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(user_id),
                user: game_obj.user
              });
              game_obj.page = "army_list";
            }

          //[Carpet Siege]
          if (input == "carpet siege")
            initialiseCarpetSiege(user_id);

          //[Create Armies]
          if (input == "create armies")
            initialiseCreateArmies(user_id);

          //[Create Army]
          if (input == "create army")
            initialiseCreateArmy(user_id);

          //[Delete All Armies]
          if (input == "delete all armies")
            deleteAllArmies(user_id);

          //[Delete Armies]
          if (input == "delete armies")
            initialiseDeleteArmies(user_id);

          //[Delete Army]
          if (input == "delete army")
            initialiseDeleteArmy(user_id);

          //[Deploy Units]
          if (input == "deploy units")
            initialiseDeployUnits(user_id);

          //[Garrison Cities]
          if (input == "garrison cities")
            initialiseGarrisonCities(user_id);

          //[Garrison Provinces]
          if (input == "garrison provinces")
            initialiseGarrisonProvinces(user_id);

          //[Ignore Orders When Carpet Sieging]
          if (input == "ignore orders when carpet sieging")
            initialiseIgnoreOrdersWhenCarpetSieging(user_id);

          //[Mass Deploy]
          if (input == "mass deploy")
            initialiseMassDeploy(user_id);

          //[Mass Relieve]
          if (input == "mass relieve")
            initialiseMassRelieve(user_id);

          //[Mass Reorder]
          if (input == "mass reorder")
            initialiseMassReorder(user_id);

          //[Merge Armies]
          if (input == "merge armies")
            initialiseMergeArmies(user_id);

          //[Merge Army]
          if (input == "merge army")
            initialiseMergeArmy(user_id);

          //[Move All]
          if (input == "move army")
            initialiseMoveArmy(user_id);

          //[Move Armies]
          if (input == "move armies")
            initialiseMoveArmies(user_id);

          //[Recall Volunteers]
          if (!game_obj.page.startsWith("army_viewer_"))
            if (input == "recall volunteers")
              initialiseRecallVolunteers(user_id);

          //[Relieve Units]
          if (input == "relieve units")
            initialiseRelieveUnits(user_id);

          //[Rename Armies]
          if (input == "rename armies")
            initialiseRenameArmies(user_id);

          //[Rename Army]
          if (input == "rename army")
            initialiseRenameArmy(user_id);

          //[Reorder Units]
          if (input == "reorder_units")
            initialiseReorderUnits(user_id);

          //[Repatriate Volunteers]
          if (input == "repatriate volunteers")
            initialiseRepatriateVolunteers(user_id);

          //[Send Volunteer Armies]
          if (input == "send volunteer armies")
            initialiseSendVolunteerArmies(user_id);

          //[Send Volunteers]
          if (input == "send volunteers")
            initialiseSendVolunteers(user_id);

          //[Split Army]
          if (input == "split army")
            initialiseSplitArmy(user_id);

          //[Split Armies]
          if (input == "split armies")
            initialiseSplitArmies(user_id);

          //[Territorial Violation]
          if (input == "territorial violation")
            initialiseAvoidTerritorialViolation(user_id);

          //[Transfer Units]
          if (input == "transfer units")
            initialiseTransferUnits(user_id);

          //[Unit Ledger]
          if (input == "unit ledger") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printUnitLedger(user_id),
              user: game_obj.user
            });

            game_obj.page = "unit_ledger";
          }

          //[Unit List]
          if (["craft list", "unit list"].includes(input)) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printUnitList(game_obj.user),
              user: game_obj.user
            });

            game_obj.page = "unit_list";
          }

          //[View Army]
          if (input == "view army")
            initialisePrintArmy(user_id);

          //[View (Army Name)]
          if (input.startsWith("view ") && !["view armies", "view army", "view reserves"].includes(input)) {
            var army_obj = getArmy(user_id, arg[0]);
            var army_to_view = input.replace("view army ", "").replace("view ", "");
            var army_report = printArmy(user_id, arg[0]);

            if (army_report) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: army_report,
                user: game_obj.user
              });

              game_obj.page = `army_viewer_${army_obj.name}`;
            }
          }

          //[View Reserves]
          if (["reserves", "view reserves"].includes(input)) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printReserves(user_id),
              user: game_obj.user
            });

            game_obj.page = "reserves";
          }
        }

        if (game_obj.page == "military") {
          //[Demobilise]
          if (input == "demobilise")
            demobilise(user_id);

          //[Mobilise]
          if (input == "mobilise")
            mobilise(user_id);
        }

        if (game_obj.page == "unit_ledger") {
          //Button handler
          //[Back]
          if (input == "back") {
            printMilitary(user_id);
            game_obj.page = "military";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printUnitLedger(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printUnitLedger(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });
        }

        if (game_obj.page == "unit_list") {
          //Button handler
          //[Back]
          if (input == "back") {
            printMilitary(user_id);
            game_obj.page = "military";
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printUnitList(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printUnitList(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });
        }
      }

      //Modifiers page handler
      {
        if (game_obj.page == "modifiers_list") {
          //[Back]
          if (input == "back") {
            game_obj.page = "country_interface";
            initialiseTopbar(user_id);
            printStats(user_id);
          }

          //[Jump to Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printModifiers(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printModifiers(game_obj.user, cache[game_obj.middle_embed.id]),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Sort by Alphabetical]
          if (["alphabetical", "sort by alphabetical"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printModifiers(game_obj.user, "alphabetical"),
              user: game_obj.user
            });

          //[Sort by Impact]
          if (["impact", "sort by impact"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printModifiers(game_obj.user, "impact"),
              user: game_obj.user
            });

          //[Sort by Key]
          if (["key", "sort by key"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printModifiers(game_obj.user, "key"),
              user: game_obj.user
            });
        }

        if (game_obj.page == "temporary_modifiers_list") {
          //[Back]
          if (input == "back") {
            game_obj.page = "country_interface";
            initialiseTopbar(user_id);
            printStats(user_id);
          }

          //[Jump to Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printTemporaryModifiers(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printTemporaryModifiers(game_obj.user, cache[game_obj.middle_embed.id]),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Sort by Alphabetical]
          if (["alphabetical", "sort by alphabetical"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printTemporaryModifiers(game_obj.user, "alphabetical"),
              user: game_obj.user
            });

          //[Sort by Chronological]
          if (["chronological", "sort by chronological"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printTemporaryModifiers(game_obj.user, "chronological"),
              user: game_obj.user
            });

          //[Sort by Duration]
          if (["duration", "sort by duration"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printTemporaryModifiers(game_obj.user, "duration"),
              user: game_obj.user
            });

          //[Sort by Impact]
          if (["impact", "sort by impact"].includes(input))
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printTemporaryModifiers(game_obj.user, "impact"),
              user: game_obj.user
            });
        }
      }

      //Politics page handler
      {
        switch (game_obj.page) {
          case "cultures":
          case "culture":
            //Button handler
            //[Add Accepted Culture]
            if (input == "add accepted culture")
              initialiseAddAcceptedCulture(user_id);

            //[Assimilate ALl]
            if (input == "assimilate all")
              initialiseAssimilateAll(user_id);

            //[Back]
            if (input == "back") {
              printPolitics(user_id);
              game_obj.page = "politics";
            }

            //[Jump To Page]
            if (input == "jump to page")
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like to jump to?`, "number", { min: 1, max: printCultures(game_obj.user).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCultures(game_obj.user),
                  page: arg[0] - 1,
                  user: game_obj.user
                });
              });

            //[Remove Accepted Culture]
            if (input == "remove accepted culture")
              initialiseRemoveAcceptedCulture(user_id);

            //[Rename Culture]
            if (input == "rename culture")
              initialiseRenamePrimaryCulture(user_id);

            //[Rename Culture Adjective]
            if (input == "rename culture adjective")
              initialiseRenameCultureAdjective(user_id);

            break;
          case "reforms":
            //Button handler
            //[Back]
            if (input == "back") {
              game_obj.page = "politics";
              printPolitics(game_obj.user);
            }

            //[Enact (Reform Name)]
            if (input.startsWith("enact ")) {
              var law_to_enact = input.replace("enact ", "");
              enactReform(user_id, law_to_enact);
            } else if (input == "enact") {
              initialiseEnactReform(game_obj.user);
            }

            //[Jump To Page]
            if (input == "jump to page")
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like to jump to?`, "number", { min: 1, max: printReforms(game_obj.user).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printReforms(game_obj.user),
                  page: arg[0] - 1,
                  user: game_obj.user
                });
              });

            //[(Reform Name)]
            if (getReform(input))
              printReform(user_id, input);

            break;
          default:
            //Button handler
            //[Coup]
            if (input == "coup")
              initialiseCoup(user_id);

            //[Set Government]
            if (input == "set government")
              initialiseSetGovernmentCommand(user_id);

            //[Support Party]
            if (input == "support party")
              initialiseSupportParty(user_id);

            //[Raise Stability]
            if (input == "raise stability")
              raiseStability(user_id);

            //[View Cultures]
            if (input == "view cultures") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCultures(user_id),
                user: game_obj.user
              });
              game_obj.page = "cultures";
            }

            //[View Reforms]
            if (input == "view reforms") {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printReforms(user_id),
                user: game_obj.user
              });
              game_obj.page = "reforms";
            }

            break;
        }
      }

      //Pops page handler
      {
        if (game_obj.page == "population") {
          //[Display All Pops]
          if (input == "display all pops") {
            game_obj.display_no_pops = true;
            printPops(user_id);
          }

          //[Display Irrelevant Pops]
          if (input == "display irrelevant pops") {
            game_obj.display_irrelevant_pops = true;
            printPops(user_id);
          }

          //[Display Relevant Pops]
          if (input == "display relevant pops") {
            delete game_obj.display_irrelevant_pops;
            printPops(user_id);
          }

          //[Display Populated Pops]
          if (input == "display populated pops") {
            delete game_obj.display_no_pops;
            printPops(user_id);
          }

          //[Display Social Mobility]
          if (input == "display social mobility") {
            delete game_obj.hide_social_mobility;
            printPops(user_id);
          }

          //[Hide Social Mobility]
          if (input == "hide social mobility") {
            game_obj.hide_social_mobility = true;
            printPops(user_id);
          }
        }

        if (game_obj.page.startsWith("view_demographics_")) {
          var province_id = game_obj.page.replace("view_demographics_", "");
          var province_obj = getProvince(province_id);

          if (province_obj)
            province_id = province_obj.id;

          //[Back]
          if (input == "back")
            printProvince(user_id, province_id);

          //[Births]
          if (input == "births")
            printDemographicsLimitTooltip(user_id, province_id, {
              mode: "births"
            });

          //[Deaths]
          if (input == "deaths")
            printDemographicsLimitTooltip(user_id, province_id, {
              mode: "deaths"
            });

          //[Emigration]
          if (input == "emigration")
            printDemographicsLimitTooltip(user_id, province_id, {
              mode: "emigration"
            });

          //[Expand Economic Statistics]
          if (input == "expand economic statistics") {
            delete game_obj.minimise_economic_statistics;
            printDemographics(user_id, province_id, current_page);
          }

          //[Expand Pop Breakdown]
          if (input == "expand pop breakdown") {
            delete game_obj.minimise_pop_breakdown;
            printDemographics(user_id, province_id, current_page);
          }

          //[Expand Profession Breakdown]
          if (input == "expand profession breakdown") {
            delete game_obj.hide_profession_breakdown;
            printDemographics(user_id, province_id, current_page);
          }

          //[Expand Wealth Pools]
          if (input == "expand wealth pools") {
            delete game_obj.minimise_wealth_pools;
            printDemographics(user_id, province_id, current_page);
          }

          //[Hide All Details]
          if (input == "hide all details") {
            game_obj.hide_employers = true;
            game_obj.hide_needs_categories = true;
            game_obj.minimise_economic_statistics = true;
            game_obj.minimise_pop_breakdown = true;
            game_obj.minimise_wealth_pools = true;

            printDemographics(user_id, province_id, current_page);
          }

          //[Hide Employers]
          if (input == "hide employers") {
            game_obj.hide_employers = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Hide Needs Categories]
          if (input == "hide needs categories") {
            game_obj.hide_needs_categories = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Hide Profession Breakdown]
          if (input == "hide profession breakdown") {
            game_obj.hide_profession_breakdown = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Immigration]
          if (input == "immigration")
            printDemographicsLimitTooltip(user_id, province_id, {
              mode: "immigration"
            });

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like to jump to?`, "number", { min: 1, max: printDemographics(user_id, province_id, undefined, true).length }]
              ]
            },
            function (arg) {
              printDemographics(game_obj.user, province_id, arg[0] - 1);
            });

          //[Minimise Economic Statistics]
          if (["minimise economic statistics", "minimize economic statistics"].includes(input)) {
            game_obj.minimise_economic_statistics = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Minimise Pop Breakdown]
          if (["minimise pop breakdown", "minimize pop breakdown", "minimise population breakdown", "minimize population breakdown"].includes(input)) {
            game_obj.minimise_pop_breakdown = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Minimise Wealth Pools]
          if (["minimise wealth pools", "minimize wealth pools", "minimise wealth pool", "minimize wealth pool"].includes(input)) {
            game_obj.minimise_wealth_pools = true;
            printDemographics(user_id, province_id, current_page);
          }

          //[Promotion]
          if (input == "promotion")
            printDemographicsLimitTooltip(user_id, province_id, {
              mode: "promotion"
            });

          //[Show All Details]
          if (input == "show all details") {
            delete game_obj.hide_employers;
            delete game_obj.hide_needs_categories;
            delete game_obj.minimise_economic_statistics;
            delete game_obj.minimise_pop_breakdown;
            delete game_obj.minimise_wealth_pools;

            printDemographics(user_id, province_id, current_page);
          }

          //[Show Employers]
          if (input == "show employers") {
            delete game_obj.hide_employers;
            printDemographics(user_id, province_id, current_page);
          }

          //[Show Needs Categories]
          if (input == "show needs categories") {
            delete game_obj.hide_needs_categories;
            printDemographics(user_id, province_id, current_page);
          }
        }

        if (population_pages.includes(game_obj.page)) {
          switch (input) {
            case "culture":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCultures(user_id),
                user: game_obj.user
              });
              game_obj.page = "culture";

              break;
          }
        }
      }

      //Province page handlers
      {
        if (game_obj.page == "provinces_list") {
          if (input != "view provinces")
            if (arg[0] == "view") {
              if (arg.length > 1) {
                if (arg[1] != "province") {
                  //City view handler
                  var city_name = input.replace("view", "").trim()
                    .replace("province", "").trim();

                  if (getCity(city_name)) {
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printProvince(game_obj.user, city_name),
                      user: game_obj.user
                    });
                  } else if (getProvince(province_name)) {
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printProvince(game_obj.user, city_name),
                      user: game_obj.user
                    });
                  } else {
                    printError(game_obj.id, `**${city_name}** is not a valid city that you can view!`);
                  }
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
            case "assimilate":
              initialiseAssimilate(user_id);

              break;
            case "back":
              game_obj.page = "population";
              printPops(user_id);

              break;
            case "found city":
              initialiseFoundCity(user_id);

              break;
          }
        } else if (game_obj.page.startsWith("view_province_")) {
          var province_name = game_obj.page.replace("view_province_", "");

          switch (input) {
            case "assimilate":
              initialiseAssimilate(user_id);

              break;
            case "back":
              game_obj.page = "provinces_list";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(game_obj.user),
                user: game_obj.user
              });

              break;
            case "display all pops":
              game_obj.display_irrelevant_pops = true;
              game_obj.display_no_pops = true;

              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvince(game_obj.user, province_name),
                page: current_page,
                user: game_obj.user
              });

              break;
            case "display relevant pops":
              delete game_obj.display_irrelevant_pops;
              delete game_obj.display_no_pops;

              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvince(game_obj.user, province_name),
                page: current_page,
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
            case "view demographics":
              printDemographics(user_id, province_name);
              game_obj.page = `view_demographics_${province_name}`;

              break;
          }
        }
      }

      //Technology page handler
      {
        var ignore_research = ["research list", "research possibilities", "research queue"];

        if (game_obj.page == "research") {
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

          //[View Research Queue]
          if (["research queue", "view research queue"].includes(input)) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printResearchQueue(user_id),
              page: arg[0] - 1,
              user: game_obj.user
            });
            game_obj.page = "research_queue";
          }
        }

        if (game_obj.page == "research_list") {
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
              });
            });
        }

        if (game_obj.page == "research_queue") {
          //[Add Technology]
          if (
            input.startsWith("add technology ") ||
            (input.startsWith("add ") && input != "add technology")
          ) {
            var tech_to_add = input
              .replace("add technology ", "")
              .replace("add ", "");

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
          if (
            input.startsWith("remove technology ") ||
            (input.startsWith("remove ") && input != "remove technology")
          ) {
            var tech_to_remove = input.replace("remove technology ", "")
              .replace("remove ", "");

            removeResearchQueue(user_id, tech_to_add);
          } else if (input == "remove technology") {
            initialiseRemoveResearchQueue(user_id);
          }
        }

        if (technology_pages.includes(game_obj.page)) {
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

          //[Research List]; [Research Possibilities]
          if (input == "research possibilities" || input == "research list") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printResearchList(user_id),
              user: game_obj.user
            });
            game_obj.page = "research_list";
          }

          //[Research]
          if (input == "research") {
            initialiseResearch(user_id);
          }

          //[Research (Tech)]
          if (input.startsWith("research ") && !ignore_research.includes(input)) {
            var tech_to_research = input.replace("research ", "");

            research(user_id, tech_to_research);
          }

          //[View Research Queue]
          if (["research queue", "view research queue"].includes(input)) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printResearchQueue(user_id),
              page: arg[0] - 1,
              user: game_obj.user
            });
            game_obj.page = "research_queue";
          }
        }
      }

      //Trade page handler
      {
        switch (game_obj.page) {
          case "auto_trades":
            //Button Handler
            //[Back]
            if (input == "back") {
              game_obj.page = "trade";
              printTrade(user_id);
            }

            //[Cancel Auto Trade]
            if (["cancel auto trade", "cancel auto-trade"].includes(input))
              initialiseCancelAutoTrade(user_id);

            //[Create Auto Trade]
            if (["create auto trade", "create auto-trade"].includes(input))
              initialiseCreateAutoTrade(user_id);

            break;
          case "exports":
            //Button Handler
            //[Back]
            if (input == "back") {
              game_obj.page = "back";
              printTrade(user_id);
            }

            break;
          case "imports":
            //Button Handler
            //[Back]
            if (input == "back") {
              game_obj.page = "back";
              printTrade(user_id);
            }

            break;
          case "world_market":
            //Button Handler
            //[Back]
            if (input == "back") {
              game_obj.page = "trade";
              printTrade(user_id);
            }

            //[Buy (Good)]
            if (input.startsWith("buy ")) {
              var good_name = input.trim().replace("buy ", "");

              initialiseBuy(user_id, good_name);
            } else if (input == "buy") {
              initialiseDumbBuy(user_id);
            }

            //[Jump To Page]
            if (input == "jump to page")
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Jump To Page:`,
                prompts: [
                  [`Which page would you like jump to?`, "number", { min: 1, max: printGlobalMarket(game_obj.user).length }]
                ]
              },
              function (arg) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printGlobalMarket(game_obj.user),
                  page: arg[0] - 1,
                  user: game_obj.user
                });
              });

            //[Sell (Good)]
            if (input.startsWith("sell ")) {
              var good_name = input.trim().replace("sell ", "");

              initialiseSell(user_id, good_name);
            } else if (input == "sell") {
              initialiseDumbSell(user_id);
            }

            break;

          //Default handler for main trade tab
          default:
            if (trade_pages.includes(game_obj.page)) {
              if (game_obj.page == "trade") {
                //Button Handler
                //[Buy (Good)]
                if (input.startsWith("buy ")) {
                  var good_name = input.trim().replace("buy ", "");

                  initialiseBuy(user_id, good_name);
                } else if (input == "buy") {
                  initialiseDumbBuy(user_id);
                }

                //[Export List]
                if (input == "export list") {
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printExports(game_obj.user),
                    user: game_obj.user
                  });
                  game_obj.page = "exports";
                }

                //[Give]
                if (["give", "transfer", "transfer goods"].includes(input))
                  initialiseGive(user_id);

                //[Import List]
                if (input == "import list") {
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printImports(game_obj.user),
                    user: game_obj.user
                  });
                  game_obj.page = "imports";
                }

                //[Manage Auto-Trades]
                if (["auto-trades", "autotrades", "manage auto-trades", "manage autotrades", "manage auto trades"].includes(input)) {
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printAutoTrades(game_obj.user),
                    user: game_obj.user
                  });
                  game_obj.page = "auto_trades";
                }

                //[Sell (Good)]
                if (input.startsWith("sell ")) {
                  var good_name = input.trim().replace("sell ", "");

                  initialiseSell(user_id, good_name);
                } else if (input == "sell") {
                  initialiseDumbSell(user_id);
                }

                //[World Market]
                if (["global market", "world market"].includes(input)) {
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printGlobalMarket(user_id),
                    user: game_obj.user
                  });
                  game_obj.page = "world_market";
                }
              }
            }

            break;
        }
      }
    }
  }
};
