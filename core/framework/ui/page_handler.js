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

    //Alerts page handler
    {
      if (game_obj.page == "alerts") {
        //Button Handler
        //[Alert ID]
        if (!isNaN(parseInt(input.trim()))) {
          var local_alert_id = parseInt(input.trim());

          if (usr.alerts[local_alert_id]) {
            var alert_obj = usr.alerts[local_alert_id];

            //Print alert and set page
            printAlert(user_id, alert_obj);
            game_obj.page = `alert_${local_alert_id}`;
          }
        }

        //[Back]
        if (input == "back") {
          game_obj.page = "country_interface";
          module.exports.initialiseTopbar(user_id);
          printStats(user_id);
        }

        //[Jump To Page]
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

      } else if (game_obj.page.startsWith("alert_")) {
        var current_alert_id = game_obj.page.replace("alert_", "");

        var alert_obj = usr.alerts[local_alert_id];

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
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${alert_obj.name}** by choosing **${button_obj.name}**.`);

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

    //Colonisation interface page handler
    {
      switch (game_obj.page) {
        case "colonisation":
          //Button handler
          //[Cancel Charter #(Charter ID)]
          if (input.startsWith("cancel charter ")) {
            var charter_to_cancel = input
              .replace("cancel charter ", "")
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
            printReserves(user_id);
            game_obj.page = "reserves";
          }

          //[Settle]
          if (input == "settle")
            initialiseSettle(user_id);

          break;
        case "reserves":
          //Button handler [WIP]
          //[Back]
          if (input == "back") {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printColonisation(game_obj.user),
              user: game_obj.user
            });
            game_obj.page = "colonisation";
          }

          //[Create Army]
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

          //[Train Units]
          if (input == "craft")
            initialiseCraft(user_id);

          //[Unit List]
          if (["craft list", "unit list"].includes(input)) {
            printUnitList(user_id);
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

    //Diplomacy page handler [WIP] - Add peace treaty handler
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

        //[View CB List]
        if (input == "view cb list") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: prinCBList(user_id),
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
        if (input == "war list")
          printWars(user_id);
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
            embed_pages: printCBs(user_id, actual_ot_user_id),
            user: game_obj.user;
          });
        }

        //[View Wargoals]
        if (input == "view wargoals") {
          game_obj.page = `view_wargoals_${actual_ot_user_id}`;
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printWargoals(user_id, actual_ot_user_id),
            user: game_obj.user;
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

    //Politics page handler
    {
      switch (game_obj.page) {
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
            initialiseRemoveAcceptedCulture();

          //[Rename Culture]
          if (input == "rename culture")
            initialiseRenameCulture();

          //[Rename Culture Adjective]
          if (input == "rename culture adjective")
            initialiseRenameCultureAdjective();

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

          break;
        default: //[WIP] - Add remaining buttons
          //Button handler
          //[Coup]
          if (input == "coup")
            initialiseCoup(user_id);

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
                printExports(user_id);
                game_obj.page = "exports";
              }

              //[Import List]
              if (input == "import list") {
                printImports(user_id);
                game_obj.page = "imports";
              }

              //[Manage Auto-Trades]
              if (["auto-trades", "autotrades", "manage auto-trades", "manage autotrades"].includes(game_obj.page)) {
                printAutoTrades(user_id);
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
                printGlobalMarket(user_id);
                game_obj.page = "world_market";
              }
            }
          }

          break;
      }
    }
  }
};
