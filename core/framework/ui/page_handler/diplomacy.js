module.exports = {
  pageHandlerDiplomacy: function (arg0_user, arg1_input) {
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

    //Diplomacy page handler
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
};