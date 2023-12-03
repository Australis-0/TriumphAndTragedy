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
};
