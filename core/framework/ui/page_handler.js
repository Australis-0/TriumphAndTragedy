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

    //Make sure user isn't in a visual prompt
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    if (!in_visual_prompt) {
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
          if (input == "view alert")
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
            if (button_obj)
              if (button_obj.effect) {
                button_obj.effect(alert_obj.options);

                //Send user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${alert_obj.name}** by choosing **${button_obj.title}**.`);

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
              var city_obj = getCity(city_name, { users: actual_id });

              if (city_obj) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printCity(game_obj.user, city_name),
                  user: game_obj.user
                });

                game_obj.page = `view_city_${city_obj.name}`;
              }
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
              initialiseFoundCity(game_obj.user);

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
          var city_obj = getCity(city_name);

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
                title: `Constructing Building(s) in ${city_obj.name}:`,
                prompts: [
                  [`What would you like to build in your city?\n\nType **[Build List]** for a list of valid buildings.\nType **[Inventory]** to view your inventory.`, "string"],
                  [`How many buildings of this type would you like to begin building?`, "number", { min: 1 }]
                ]
              },
              function (arg) {
                build(user_id, city_obj.name, arg[1], arg[0]);
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
                  case "inventory":
                    printInventory(user_id);
                    return true;

                    break;
                }
              });

              break;
            case "demolish":
              visualPrompt(game_obj.alert_embed, user_id, {
                title: `Demolishing Building(s) in ${city_obj.name}:`,
                prompts: [
                  [`What sort of building would you like to demolish in **${city_obj.name}**?`, "string"],
                  [`How many buildings of this type would you like to get rid of?`, "number", { min: 1 }]
                ]
              },
              function (arg) {
                demolish(user_id, arg[1], arg[0], city_obj.name);
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

            //[Settle]
            if (input == "settle")
              initialiseSettle(user_id);

            //[Settle Starting Provinces]
            if (["settle starting province", "settle starting provinces"].includes(input)) {
              var has_no_provinces = (getProvinces(actual_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

              if (has_no_provinces && !atWar(actual_id))
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

            //[Train Units]
            if (["craft", "train units"].includes(input))
              initialiseCraft(user_id);

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
                      embed_pages: printGovernmentList(actual_id),
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
            case "government list":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printGovernmentList(actual_id),
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
            case "set tax":
              initialiseSetTax(user_id);

              break;
            case "settle starting province":
            case "settle starting provinces":
              var has_no_provinces = (getProvinces(actual_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

              if (has_no_provinces && !atWar(actual_id))
                initialiseSettleStartingProvinces(user_id);

              break;
            case "view customisation":
              printCustomisation(user_id);
              game_obj.page = "view_customisation";

              break;
            case "view national modifiers":
              printNationalModifiers(user_id);
              game_obj.page = "national_modifiers";

              break;
          }

          //[Chop (#)]
          if (input.startsWith("chop ")) {
            var amount_to_chop = parseInt(input.replace("chop ", "").trim());

            mine(actual_id, amount_to_chop, "chop");
          }

          //[Mine (#)]
          if (input.startsWith("mine ")) {
            var amount_to_mine = parseInt(input.replace("mine ", "").trim());

            mine(actual_id, amount_to_mine, "mine");
          }

          //[Quarry (#)]
          if (input.startsWith("quarry ")) {
            var amount_to_quarry = parseInt(input.replace("quarry ", "").trim());

            mine(actual_id, amount_to_quarry, "quarry");
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
          if (input == "set colour")
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

          //[View CB List]
          if (input == "view cb list") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCBs(user_id),
              user: game_obj.user
            });
            game_obj.page = "cb_list";
          }

          //[View Ledger]
          if (input == "view ledger") {
            printLedger(user_id);
            game_obj.page = "ledger";
          }

          //[View Relations]
          if (input == "view relations") {
            initialiseViewDiplomacy(user_id);
          } else if (input.startsWith("view relations ")) {
            var ot_user_id = returnMention(game_obj.page.replace("view relations ", ""));

            viewDiplomacy(user_id, ot_user_id);
            game_obj.page = `diplomacy_view_${main.global.user_map[ot_user_id]}`;
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
          var actual_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            printDiplomacy(user_id);
            game_obj.page = "diplomacy";
          }

          //[Break Alliance]
          if (input == "break alliance")
            breakAlliance(user_id, actual_ot_user_id);

          //[Cancel Justification]
          if (input == "cancel justification")
            initialiseCancelJustification(user_id);

          //[Cancel Military Access]
          if (input == "cancel military access")
            cancelMilitaryAccess(user_id, actual_ot_user_id);

          //[Call Ally]
          if (input == "call ally")
            initialiseCallAlly(user_id, actual_ot_user_id);

          //[Cancel Wargoal]
          if (input == "cancel wargoal")
            initialiseCancelWargoal(user_id);

          //[Declare Rivalry]
          if (input == "declare rivalry")
            rival(user_id, actual_ot_user_id);

          //[Declare War]
          if (input == "declare war")
            initialiseDeclareWar(user_id);

          //[Decrease Relations]
          if (input == "decrease relations")
            decreaseRelations(user_id, actual_ot_user_id);

          //[Demand Annexation]
          if (input == "demand annexation")
            annex(user_id, actual_ot_user_id);

          //[Demand Vassalisation]
          if (input == "demand vassalisation")
            vassalise(user_id, actual_ot_user_id);

          //[End Rivalry]
          if (input == "end rivalry")
            endRivalry(user_id, actual_ot_user_id);

          //[Guarantee Independence]
          if (input == "guarantee independence")
            proclaimGuarantee(user_id, actual_ot_user_id);

          //[Improve Relations]
          if (input == "improve relations")
            improveRelations(user_id, actual_ot_user_id);

          //[Justify Wargoal]
          if (input == "justify wargoal")
            initialiseJustifyWar(user_id);

          //[Request Alliance]
          if (input == "request alliance")
            ally(user_id, actual_ot_user_id);

          //[Request Military Access]
          if (input == "request military access")
            militaryAccess(user_id, actual_ot_user_id);

          //[Revoke Guarantee]
          if (input == "revoke guarantee")
            revokeGuarantee(user_id, actual_ot_user_id);

          //[Revoke Military Access]
          if (input == "revoke military access")
            revokeMilitaryAccess(user_id, actual_ot_user_id);

          //[Sign Non-Aggression Pact]
          if (input == "sign non aggression pact")
            nonAggressionPact(user_id, actual_ot_user_id);

          //[View CBs]
          if (input == "view cbs") {
            game_obj.page = `view_cb_${actual_ot_user_id}`;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCBList(user_id, actual_ot_user_id),
              user: game_obj.user
            });
          }

          //[View Wargoals]
          if (input == "view wargoals") {
            game_obj.page = `view_wargoals_${actual_ot_user_id}`;
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printWargoals(user_id, actual_ot_user_id),
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

          //[View Relations]
          if (input == "view relations") {
            initialiseViewDiplomacy(user_id);
          } else if (input.startsWith("view relations ")) {
            var ot_user_id = returnMention(game_obj.page.replace("view relations ", ""));

            viewDiplomacy(user_id, ot_user_id);
            game_obj.page = `diplomacy_view_${main.global.user_map[ot_user_id]}`;
          }
        }

        if (game_obj.page.startsWith("view_cb_")) {
          var actual_ot_user_id = game_obj.page.replace("view_cb_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            viewDiplomacy(user_id, actual_ot_user_id);
            game_obj.page = `diplomacy_view_${actual_ot_user_id}`;
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printCBs(game_obj.user, actual_ot_user_id).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCBs(game_obj.user, actual_ot_user_id),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Justify Wargoal]
          if (input == "justify wargoal")
            initialiseJustifyWar();

          //Tooltip handler
          printCBTooltip(user_id, actual_ot_user_id, input);
        }

        if (game_obj.page.startsWith("view_war_")) {
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

          //[Add Wargoal]
          if (input == "add wargoal")
            (war_obj.peace_treaties[actual_id]) ?
              initialiseAddWargoal(user_id, war_obj.peace_treaties[actual_id]) :
              printError(game_obj.id, `You don't currently have a peace treaty active for this conflict! Type **[Sign Peace Treaty]** first to create a new peace treaty.`);

          //[Call Ally]
          if (input == "call ally")
            initialiseCallAlly(user_id);

          //[Remove Wargoal]
          if (input == "remove wargoal")
            (war_obj.peace_treaties[actual_id]) ?
              initialiseRemoveWargoal(user_id, war_obj.peace_treaties[actual_id]) :
              printError(game_obj.id, `You don't currently have a peace treaty active for this conflict! Type **[Sign Peace Treaty]** first to create a new peace treaty.`);

          //[Rename War]
          if (input == "rename war")
            initialiseRenameWar(user_id, war_name);

          //[Send Peace Offer]
          if (input == "send peace offer")
            (war_obj.peace_treaties[actual_id]) ?
              sendPeaceTreaty(user_id, war_obj.peace_treaties[actual_id]) :
              printError(game_obj.id, `You don't currently have a peace treaty active for this conflict! Type **[Sign Peace Treaty]** first to create a new peace treaty.`);

          //[Sign Peace Treaty]
          if (input == "sign peace treaty")
            signPeaceTreaty(user_id, war_obj.name);

          //[View Peace Offer]
          if (["view peace offer", "view peace treaty"].includes(input))
            (war_obj.peace_treaties[actual_id]) ?
              modifyPeaceTreaty(user_id, war_obj.peace_treaties[actual_id]) :
              printError(game_obj.id, `You don't currently have a peace treaty active for this conflict! Type **[Sign Peace Treaty]** first to create a new peace treaty.`);
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

        if (game_obj.page.startsWith("view_wargoal_")) {
          var actual_ot_user_id = game_obj.page.replace("view_cb_", "");

          //Button Handler
          //[Back]
          if (input == "back") {
            viewDiplomacy(user_id, actual_ot_user_id);
            game_obj.page = `diplomacy_view_${actual_ot_user_id}`;
          }

          //[Jump To Page]
          if (input == "jump to page")
            visualPrompt(game_obj.alert_embed, user_id, {
              title: `Jump To Page:`,
              prompts: [
                [`Which page would you like jump to?`, "number", { min: 1, max: printWargoals(game_obj.user, actual_ot_user_id).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printWargoals(game_obj.user, actual_ot_user_id),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[Declare War]
          if (input == "declare war")
            initialiseDeclareWar(user_id);

          //Tooltip handler
          printCBTooltip(user_id, actual_ot_user_id, input);
        }

        if (game_obj.page == "war_list") {
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

          //[View Archived War]
          if (input == "view archived war")
            initialisePrintArchivedWar(user_id);

          //[View (War Name)]
          if (input.startsWith("view ")) {
            var war_to_view = input.replace("view ", "");
            var war_report = printWar(user_id, war_to_view, false, true);

            if (war_report) {
              printWar(user_id, war_to_view);
              game_obj.page = `view_war_${war_to_view}`;
            } else {
              var archived_war_report = printWar(user_id, war_to_view, true, true);

              if (archived_war_report) {
                printWar(user_id, war_to_view, true);
                game_obj.page = `view_war_archives_${war_to_view}`;
              }
            }
          }

          //[View War]
          if (input == "view war")
            initialisePrintWar(user_id);

          //[(War Name)]
          var archived_war_report = printWar(user_id, input, true, true);

          if (archived_war_report) {
            printWar(user_id, input, true);
            game_obj.page = `view_war_archives_${war_to_view}`;
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
            case "building list":
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
            case "found city":
              //Make sure that user is actually able to found a city before authorising the command, otherwise print an error
              (usr.city_cap-usr.city_count > 0) ?
                initialiseFoundCity(user_id) :
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

        if (game_obj.page == "inventory") {
          //[Back]
          if (input == "back") {
            printEconomy(user_id);
            game_obj.page = "economy";
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

      //Military page handler
      {
        if (game_obj.page == "army_list") {
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
                [`Which page would you like jump to?`, "number", { min: 1, max: printArmyList(game_obj.user).length }]
              ]
            },
            function (arg) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(game_obj.user),
                page: arg[0] - 1,
                user: game_obj.user
              });
            });

          //[View (Army Name)]
          if (input.startsWith("view ") && !["view army", "view reserves"].includes(input)) {
            var army_to_view = input.replace("view ", "");
            var viewed_army = printArmy(user_id, army_to_view);

            if (viewed_army) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: viewed_army,
                user: game_obj.user
              });
              game_obj.page = `army_viewer_${getArmy(actual_id, army_to_view).name}`;
            } else {
              printError(game_obj.id, `**${army_to_view}** isn't a valid army you can inspect! Take a look at your **[Army List]** first to see which armies you can view.`);
            }
          }
        }

        if (game_obj.page == "army_list" || game_obj.page.startsWith("army_viewer_")) {
          //[Air Raid]
          if (input == "air raid")
            initialiseAirRaid(user_id);

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

        if (game_obj.page.startsWith("army_viewer_", "")) { //[WIP] - Add auto-complete in the future; remember to remove previous order handlers from the top if you do!
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

          //[Convoy Raid]
          if (input == "convoy raid")
            initialiseConvoyRaid(user_id, viewed_army);

          //[Delete Army]
          if (input == "delete army")
            deleteArmyCommand(user_id, viewed_army);

          //[Deploy Units]
          if (input == "deploy units")
            initialiseDeployUnits(user_id, viewed_army);

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

          //[Relieve Units]
          if (input == "relieve units")
            initialiseRelieveUnits(user_id, viewed_army);

          //[Rename Army]
          if (input == "rename army")
            initialiseRenameArmy(user_id, viewed_army);

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

          //[Relieve Units]
          if (input == "relieve units")
            initialiseRelieveUnits(user_id);

          //[Rename Army]
          if (input == "rename army")
            initialiseRenameArmy(user_id);

          //[Split Army]
          if (input == "split army")
            initialiseSplitArmy(user_id);

          //[Split Armies]
          if (input == "split armies")
            initialiseSplitArmies(user_id);

          //[Territorial Violation]
          if (input == "territorial violation")
            initialiseAvoidTerritorialViolation(user_id);

          //[Train Units]
          if (["train units", "craft"].includes(input))
            initialiseCraft(user_id);

          //[Transfer Units]
          if (input == "transfer units")
            initialiseTransferUnits(user_id);

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
          if (input.startsWith("view ") && !["view army", "view reserves"].includes(input)) {
            var army_obj = getArmy(user_id, arg[0]);
            var army_to_view = input.replace("view army ", "");
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
            demobilise(actual_id);

          //[Mobilise]
          if (input == "mobilise")
            mobilise(actual_id);
        }

        if (game_obj.page == "unit_list") {
          //Button handler
          //[Back]
          if (input == "back") {
            printMilitary(user_id);
            game_obj.page = "military";
          }

          //[Craft]
          if (input == "craft")
            initialiseCraft(user_id);

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

            //[View Population]
            if (input == "view population") {
              game_obj.page = "provinces_list";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(game_obj.user),
                user: game_obj.user
              });
            }

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

            //[Set Tax]
            if (input == "set tax")
              initialiseSetTax(user_id);

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
        if (population_pages.includes(game_obj.page)) {
          switch (input) {
            case "culture":
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printCultures(user_id),
                user: game_obj.user
              });
              game_obj.page = "culture";

              break;
            case "view provinces":
              game_obj.page = "provinces_list";
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printProvinces(user_id),
                user: game_obj.user
              });

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
                      embed_pages: printCity(game_obj.user, city_name),
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
            if (["research queue", "view research queue"].includes(input)) {
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printResearchQueue(user_id),
                page: arg[0] - 1,
                user: game_obj.user
              });
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
                });
              });

            //[Research]; [Research (Tech)]
            if (input.startsWith("research ")) {
              var tech_to_research = input.replace("research ", "");

              research(user_id, tech_to_research);
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

            break;
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
            if (input == "cancel auto trade")
              initialiseCancelAutoTrade();

            //[Create Auto Trade]
            if (input == "create auto trade")
              initialiseCreateAutoTrade();

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
                if (["auto-trades", "autotrades", "manage auto-trades", "manage autotrades"].includes(game_obj.page)) {
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
