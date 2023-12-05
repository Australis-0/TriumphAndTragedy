module.exports = {
  pageHandlerMilitary: function (arg0_user, arg1_input) {
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

    //Military page handler
    if (game_obj.page == "army_list") {
      //[Attrition]
      if (["attrition", "sort by attrition"].includes(input)) {
        game_obj.armies_sorting_mode = "attrition";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Alphabetical]
      if (["alphabetical", "sort by alphabetical"].includes(input)) {
        game_obj.armies_sorting_mode = "alphabetical";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Back]
      if (input == "back") {
        printMilitary(user_id);
        game_obj.page = "military";

        return true;
      }

      //[Chronological]
      if (["chronological", "sort by chronological"].includes(input)) {
        game_obj.armies_sorting_mode = "chronological";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
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

        return true;
      }

      //[Numerical]
      if (["number", "numeric", "numerical", "sort by number", "sort by numeric", "sort by numerical"].includes(input)) {
        game_obj.armies_sorting_mode = "numerical";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Roman]
      if (["roman", "sort by roman"].includes(input)) {
        game_obj.armies_sorting_mode = "roman_numerical";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Size]
      if (["size", "sort by size"].includes(input)) {
        game_obj.armies_sorting_mode = "size";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Speed]
      if (["speed", "sort by speed"].includes(input)) {
        game_obj.armies_sorting_mode = "speed";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Strength]
      if (["strength", "sort by strength"].includes(input)) {
        game_obj.armies_sorting_mode = "strength";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Type]
      if (["type", "sort by type"].includes(input)) {
        game_obj.armies_sorting_mode = "type";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(game_obj.user),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }
    }

    if (game_obj.page == "army_list" || game_obj.page.startsWith("army_viewer_")) {
      //[Air Raid]
      if (input == "air raid") {
        initialiseAirRaidCommand(user_id);

        return true;
      }

      //[Back]
      if (game_obj.page == "army_list" && input == "back") {
        printMilitary(user_id);
        game_obj.page = "military";

        return true;
      }

      //[Blockade]
      if (input == "blockade") {
        initialiseBlockade(user_id);

        return true;
      }

      //[Challenge Blockade]
      if (input == "challenge blockade") {
        initialiseChallengeBlockade(user_id);

        return true;
      }

      //[Change Home Port]
      if (!game_obj.page.startsWith("army_viewer_"))
        if (input == "change home port") {
          initialiseChangeHomePort(user_id);

          return true;
        }

      //[Convoy Raid]
      if (input == "convoy raid") {
        initialiseConvoyRaid(user_id);

        return true;
      }

      //[Delete Army]
      if (input == "delete army") {
        initialiseDeleteArmy(user_id);

        return true;
      }

      //[Deploy Units]
      if (input == "deploy units") {
        initialiseDeployUnits(user_id);

        return true;
      }

      //[Harbour Raid]
      if (input == "harbour raid") {
        initialiseHarbourRaid(user_id);

        return true;
      }

      //[Lift Blockade]
      if (!game_obj.page.startsWith("army_viewer_"))
        if (input == "lift blockade") {
          initialiseLiftBlockade(user_id);

          return true;
        }

      //[Merge Army]
      if (input == "merge army") {
        initialiseMergeArmy(user_id);

        return true;
      }

      //[Move]
      if (input == "move") {
        initialiseMoveArmy(user_id);

        return true;
      }

      //[Relieve Units]
      if (input == "relieve units") {
        initialiseRelieveUnits(user_id);

        return true;
      }

      //[Rename Army]
      if (input == "rename army") {
        initialiseRenameArmy(user_id);

        return true;
      }

      //[Split Army]
      if (input == "split army") {
        initialiseSplitArmy(user_id);

        return true;
      }

      //[Torpedo Fleet]
      if (input == "torpedo fleet") {
        initialiseTorpedoFleet(user_id);

        return true;
      }

      //[Transfer Units]
      if (input == "transfer units") {
        initialiseTransferUnits(user_id);

        return true;
      }
    }

    if (game_obj.page.startsWith("army_viewer_", "")) {
      var viewed_army = game_obj.page.replace("army_viewer_", "");

      //[Air Raid]
      if (input == "air raid") {
        initialiseAirRaidCommand(user_id, viewed_army);

        return true;
      }

      //[Back]
      if (input == "back") {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(user_id),
          user: game_obj.user
        });
        game_obj.page = "army_list";

        return true;
      }

      //[Blockade]
      if (input == "blockade") {
        initialiseBlockade(user_id, viewed_army);

        return true;
      }

      //[Challenge Blockade]
      if (input == "challenge blockade") {
        initialiseChallengeBlockade(user_id, viewed_army);

        return true;
      }

      //[Change Home Port]
      if (input == "change home port") {
        initialiseChangeHomePort(user_id, viewed_army);

        return true;
      }

      //[Close] - Closes pathing info
      if (input == "close") {
        delete game_obj.expanded_army_pathing;
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmy(game_obj.user, viewed_army),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Convoy Raid]
      if (input == "convoy raid") {
        initialiseConvoyRaid(user_id, viewed_army);

        return true;
      }

      //[Delete Army]
      if (input == "delete army") {
        deleteArmyCommand(user_id, viewed_army);

        return true;
      }

      //[Deploy Units]
      if (input == "deploy units") {
        initialiseDeployUnits(user_id, viewed_army);

        return true;
      }

      //[Expand] - Expands pathing info
      if (input == "expand") {
        game_obj.expanded_army_pathing = true;
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmy(game_obj.user, viewed_army),
          page: current_page,
          user: game_obj.user
        });

        return true;
      }

      //[Harbour Raid]
      if (input == "harbour raid") {
        initialiseHarbourRaid(user_id, viewed_army);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
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

        return true;
      }

      //[Lift Blockade]
      if (input == "lift blockade") {
        liftBlockade(user_id, viewed_army);

        return true;
      }

      //[Merge Army]
      if (input == "merge army") {
        initialiseMergeArmy(user_id, viewed_army);

        return true;
      }

      //[Move]
      if (input == "move") {
        initialiseMoveArmy(user_id, viewed_army);

        return true;
      }

      //[Recall Volunteers]
      if (input == "recall volunteers") {
        initialiseRecallVolunteers(user_id, undefined, viewed_army);

        return true;
      }

      //[Relieve Units]
      if (input == "relieve units") {
        initialiseRelieveUnits(user_id, viewed_army);

        return true;
      }

      //[Rename Army]
      if (input == "rename army") {
        initialiseRenameArmy(user_id, viewed_army);

        return true;
      }

      //[Reorder Units]
      if (input == "reorder units") {
        initialiseReorderUnits(user_id, viewed_army);

        return true;
      }

      //[Send Volunteers]
      if (input == "send as volunteers") {
        initialiseSendVolunteerArmies(user_id, undefined, viewed_army);

        return true;
      }

      //[Split Army]
      if (input == "split army") {
        initialiseSplitArmy(user_id, viewed_army);

        return true;
      }

      //[Torpedo Fleet]
      if (input == "torpedo fleet") {
        initialiseTorpedoFleet(user_id, viewed_army);

        return true;
      }

      //[Transfer Units]
      if (input == "transfer units") {
        initialiseTransferUnits(user_id, viewed_army);

        return true;
      }
    }

    if (military_pages.includes(game_obj.page)) {
      //[Attrition Avoidance]
      if (input == "attrition avoidance") {
        initialiseAttritionAvoidance(user_id);

        return true;
      }

      //[Army List]
      if (game_obj.page != "army_list")
        if (input == "army list") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            user: game_obj.user
          });
          game_obj.page = "army_list";

          return true;
        }

      //[Carpet Siege]
      if (input == "carpet siege") {
        initialiseCarpetSiege(user_id);

        return true;
      }

      //[Create Armies]
      if (input == "create armies") {
        initialiseCreateArmies(user_id);

        return true;
      }

      //[Create Army]
      if (input == "create army") {
        initialiseCreateArmy(user_id);

        return true;
      }

      //[Delete All Armies]
      if (input == "delete all armies") {
        deleteAllArmies(user_id);

        return true;
      }

      //[Delete Armies]
      if (input == "delete armies") {
        initialiseDeleteArmies(user_id);

        return true;
      }

      //[Delete Army]
      if (input == "delete army") {
        initialiseDeleteArmy(user_id);

        return true;
      }

      //[Deploy Units]
      if (input == "deploy units") {
        initialiseDeployUnits(user_id);

        return true;
      }

      //[Garrison Cities]
      if (input == "garrison cities") {
        initialiseGarrisonCities(user_id);

        return true;
      }

      //[Garrison Provinces]
      if (input == "garrison provinces") {
        initialiseGarrisonProvinces(user_id);

        return true;
      }

      //[Ignore Orders When Carpet Sieging]
      if (input == "ignore orders when carpet sieging") {
        initialiseIgnoreOrdersWhenCarpetSieging(user_id);

        return true;
      }

      //[Mass Deploy]
      if (input == "mass deploy") {
        initialiseMassDeploy(user_id);

        return true;
      }

      //[Mass Relieve]
      if (input == "mass relieve") {
        initialiseMassRelieve(user_id);

        return true;
      }

      //[Mass Reorder]
      if (input == "mass reorder") {
        initialiseMassReorder(user_id);

        return true;
      }

      //[Merge Armies]
      if (input == "merge armies") {
        initialiseMergeArmies(user_id);

        return true;
      }

      //[Merge Army]
      if (input == "merge army") {
        initialiseMergeArmy(user_id);

        return true;
      }

      //[Move All]
      if (input == "move army") {
        initialiseMoveArmy(user_id);

        return true;
      }

      //[Move Armies]
      if (input == "move armies") {
        initialiseMoveArmies(user_id);

        return true;
      }

      //[Recall Volunteers]
      if (!game_obj.page.startsWith("army_viewer_"))
        if (input == "recall volunteers") {
          initialiseRecallVolunteers(user_id);

          return true;
        }

      //[Relieve Units]
      if (input == "relieve units") {
        initialiseRelieveUnits(user_id);

        return true;
      }

      //[Rename Armies]
      if (input == "rename armies") {
        initialiseRenameArmies(user_id);

        return true;
      }

      //[Rename Army]
      if (input == "rename army") {
        initialiseRenameArmy(user_id);

        return true;
      }

      //[Reorder Units]
      if (input == "reorder_units") {
        initialiseReorderUnits(user_id);

        return true;
      }

      //[Repatriate Volunteers]
      if (input == "repatriate volunteers") {
        initialiseRepatriateVolunteers(user_id);

        return true;
      }

      //[Send Volunteer Armies]
      if (input == "send volunteer armies") {
        initialiseSendVolunteerArmies(user_id);

        return true;
      }

      //[Send Volunteers]
      if (input == "send volunteers") {
        initialiseSendVolunteers(user_id);

        return true;
      }

      //[Split Army]
      if (input == "split army") {
        initialiseSplitArmy(user_id);

        return true;
      }

      //[Split Armies]
      if (input == "split armies") {
        initialiseSplitArmies(user_id);

        return true;
      }

      //[Territorial Violation]
      if (input == "territorial violation") {
        initialiseAvoidTerritorialViolation(user_id);

        return true;
      }

      //[Transfer Units]
      if (input == "transfer units") {
        initialiseTransferUnits(user_id);

        return true;
      }

      //[Unit Ledger]
      if (input == "unit ledger") {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printUnitLedger(user_id),
          user: game_obj.user
        });

        game_obj.page = "unit_ledger";

        return true;
      }

      //[Unit List]
      if (["craft list", "unit list"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printUnitList(game_obj.user),
          user: game_obj.user
        });

        game_obj.page = "unit_list";

        return true;
      }

      //[View Army]
      if (input == "view army") {
        initialisePrintArmy(user_id);

        return true;
      }

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

          return true;
        }
      }

      //[View Reserves]
      if (["reserves", "view reserves"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printReserves(user_id),
          user: game_obj.user
        });

        game_obj.page = "reserves";

        return true;
      }
    }

    if (game_obj.page == "military") {
      //[Demobilise]
      if (input == "demobilise") {
        demobilise(user_id);

        return true;
      }

      //[Mobilise]
      if (input == "mobilise") {
        mobilise(user_id);

        return true;
      }
    }

    if (game_obj.page == "unit_ledger") {
      //Button handler
      //[Back]
      if (input == "back") {
        printMilitary(user_id);
        game_obj.page = "military";

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
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

        return true;
      }
    }

    if (game_obj.page == "unit_list") {
      //Button handler
      //[Back]
      if (input == "back") {
        printMilitary(user_id);
        game_obj.page = "military";

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
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

        return true;
      }
    }
  }
};
