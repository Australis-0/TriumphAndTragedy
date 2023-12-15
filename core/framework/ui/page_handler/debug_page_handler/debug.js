module.exports = {
  pageHandlerDebug: function (arg0_arg) {
    //Convert from parameters
    var arg = arg0_arg;

    //Help command
    {

    }

    //Buildings
    {
      //construct <user> <amount> <building> <province>
      if (arg[0] == "construct")
        if (arg.length >= 5) {
          var user_id = returnMention(arg[1]);

          return debugConstruct(user_id, arg[4], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}construct <user> <amount> <building> <province>`];
        }

      //instant-construct <user> <amount> <building> <province>
      if (arg[0] == "instant-construct")
        if (arg.length >= 5) {
          var user_id = returnMention(arg[1]);

          return debugInstantConstruct(user_id, arg[4], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}instant-construct <user> <amount> <building> <province>`];
        }

      //process-building <user> <building>
      if (arg[0] == "process-building")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugProcessBuilding(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}process-building <user> <building>`];
        }

      //process-buildings <user> <provinces>
      if (arg[0] == "process-buildings")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugProcessBuildings(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}process-buildings <user> <provinces>`];
        }
    }

    //Countries
    {
      //control-country <user> <ot_user>
      if (arg[0] == "control-country")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugControlCountry(user_id, ot_user_id);
        } else {
          return [false, `${settings.prefix}control-country <user> <ot_user>`];
        }

      //create-country <id> <provinces> <name>
      if (arg[0] == "create-country")
        if (arg.length >= 4) {
          return debugCreateCountry(arg[1], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}create-country <id> <provinces> <name>`];
        }

      //delete-country <user>
      if (arg[0] == "delete-country")
        if (arg.length >= 2) {
          return debugDeleteCountry(arg[1]);
        } else {
          return [false, `${settings.prefix}delete-country <user>`];
        }
    }

    //Date
    {
      //freeze-time
      if (arg[0] == "freeze-time")
        return debugFreezeTime();

      //freeze-turns
      if (arg[0] == "freeze-turns")
        return debugFreezeTurns();

      //set-date <year> <month> <day>
      if (arg[0] == "set-date")
        if (arg.length >= 4) {
          return debugSetDate(arg[1], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}set-date <year> <month> <day>`];
        }
    }

    //Diplomacy
    {
      //ally <user> <ot_user>
      if (arg[0] == "ally")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugAlly(user_id, ot_user_id);
        } else {
          return [false, `${settings.prefix}ally <user> <ot_user>`];
        }

      //dissolve-alliance <user> <ot_user>
      if (arg[0] == "dissolve-alliance")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugDissolveAlliance(user_id, ot_user_id);
        } else {
          return [false, `${settings.prefix}dissolve-alliance <user> <ot_user>`];
        }

      //dissolve-non-aggression <user> <ot_user>
      if (arg[0] == "dissolve-non-aggression")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugDissolveNonAggression(user_id, ot_user_id);
        } else {
          return [false, `${settings.prefix}dissolve-non-aggression <user> <ot_user>`];
        }

      //end-war <war_name>
      if (arg[0] == "end-war")
        if (arg.length >= 2) {
          var war_name = arg[1];

          return debugEndWar(war_name);
        } else {
          return [false, `${settings.prefix}end-war <war_name>`];
        }

      //give-cb <user> <ot_user> <cb_name> <turns>
      if (arg[0] == "give-cb")
        if (arg.length >= 5) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugGiveCB(user_id, ot_user_id, arg[3], arg[4]);
        } else {
          return [false, `${settings.prefix}give-cb <user> <ot_user> <cb_name> <turns>`];
        }

      //non-aggression <user> <ot_user> <turns>
      if (arg[0] == "non-aggression")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugNonAggression(user_id, ot_user_id, arg[3]);
        } else {
          return [false, `${settings.prefix}non-aggression <user> <ot_user> <turns>`];
        }

      //set-mutual-relations <user> <ot_user> <value>
      if (arg[0] == "set-mutual-relations")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugSetMutualRelations(user_id, ot_user_id, arg[3]);
        } else {
          return [false, `${settings.prefix}set-mutual-relations <user> <ot_user> <value>`];
        }

      //set-relations <user> <ot_user> <value>
      if (arg[0] == "set-relations")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugSetRelations(user_id, ot_user_id, arg[3]);
        } else {
          return [false, `${settings.prefix}set-relations <user> <ot_user> <value>`];
        }

      //vassalise <user> <ot_user>
      if (arg[0] == "vassalise")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugVassalise(user_id, ot_user_id);
        } else {
          return [false, `${settings.prefix}vassalise <user> <ot_user>`];
        }

      //war <user> <ot_user> <cb_name>
      if (arg[0] == "war")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugWar(user_id, ot_user_id, arg[3]);
        } else {
          return [false, `${settings.prefix}war <user> <ot_user> <cb_name>`];
        }
    }

    //Games
    {
      //clean-games
      if (arg[0] == "clean-games")
        return debugCleanGames();

      //reset-games
      if (arg[0] == "reset-games")
        return debugResetGames();

      //reset-interfaces
      if (arg[0] == "reset-interfaces")
        return debugResetInterfaces();
    }

    //Goods
    {
      //delete <user> <amount> <good>
      if (arg[0] == "delete")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugDelete(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}delete <user> <amount> <good>`];
        }

      //give <user> <amount> <good>
      if (arg[0] == "give")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugGive(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}give <user> <amount> <good>`];
        }
    }

    //Governments
    {
      //change-government <user> <government>
      if (arg[0] == "change-government")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugChangeGovernment(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}change-government <user> <government>`];
        }

      //give-pc <user> <amount>
      if (arg[0] == "give-pc")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugGivePC(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}give-pc <user> <amount>`];
        }
    }

    //Map
    {
      //render-all-maps
      if (arg[0] == "render-all-maps")
        return debugRenderAllMaps();

      //render-map
      if (arg[0] == "render-map")
        if (arg.length >= 2) {
          return debugRenderMap(arg[1]);
        } else {
          return [false, `${settings.prefix}render-map <map>`];
        }
    }

    //Politics
    {
      //add-party-popularity <user> <amount> <ideology>
      if (arg[0] == "add-party-popularity")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugAddPartyPopularity(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}add-party-popularity <user> <amount> <ideology>`];
        }

      //pass-reform <user> <reform>
      if (arg[0] == "pass-reform")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugPassReform(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}pass-reform <user> <reform>`];
        }

      //set-party-popularity <user> <amount> <ideology>
      if (arg[0] == "set-party-popularity")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugSetPartyPopularity(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}set-party-popularity <user> <amount> <ideology>`];
        }
    }

    //Pops
    {
      //add-pops <amount> <pop_types> <province>
      if (arg[0] == "add-pops")
        if (arg.length >= 4) {
          return debugAddPops(arg[1], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}add-pops <amount> <pop_types> <province>`];
        }

      //move-pops <amount> <pop types> <from_province> <to_province>
      if (arg[0] == "move-pops")
        if (arg.length >= 5) {
          return debugMovePops(arg[1], arg[2], arg[3], arg[4]);
        } else {
          return [false, `${settings.prefix}move-pops <amount> <pop_types> <from_province> <to_province>`];
        }

      //remove-pops <amount> <pop types> <province>
      if (arg[0] == "remove-pops")
        if (arg.length >= 4) {
          return debugRemovePops(arg[1], arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}remove-pops <amount> <pop_types> <province>`];
        }

      //reset-pops
      if (arg[0] == "reset-pops")
        return debugResetPops();

      //process-pops <user>
      if (arg[0] == "process-pops")
        if (arg.length >= 2) {
          var user_id = returnMention(arg[1]);

          return debugProcessPops(user_id);
        } else {
          return [false, `${settings.prefix}process-pops <user>`];
        }
    }

    //Provinces
    {
      //settle-province <user> <provinces>
      if (arg[0] == "settle-province")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugSettleProvince(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}settle-province <user> <provinces>`];
        }

      //transfer-provinces <user> <provinces> <ot_user>
      if (arg[0] == "transfer-provinces")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[3]);

          return debugTransferProvinces(user_id, arg[2], ot_user_id);
        } else {
          return [false, `${settings.prefix}transfer-provinces <user> <provinces> <ot_user>`];
        }
    }

    //Research
    {
      //instant-research <user> <technology>
      if (arg[0] == "instant-research")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugInstantResearch(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}instant-research <user> <technology>`];
        }

      //research-up-to <user> <knowledge_cost>
      if (arg[0] == "research-up-to")
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugResearchUpTo(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}research-up-to <knowledge_cost>`];
        }
    }

    //Turns
    {
      //next-global-turn
      if (arg[0] == "next-global-turn")
        return debugNextGlobalTurn();

      //next-turn <user>
      if (arg[0] == "next-turn")
        if (arg.length >= 2) {
          var user_id = returnMention(arg[1]);

          return debugNextTurn(user_id);
        } else {
          return [false, `${settings.prefix}next-turn <user>`];
        }
    }

    //Units
    {
      //remove-units <user> <amount> <unit>
      if (arg[0] == "remove-units")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugRemoveUnits(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}remove-units <user> <amount> <unit>`];
        }

      //spawn-units <user> <amount> <unit>
      if (arg[0] == "spawn-units")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugSpawnUnits(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}spawn-units <user> <amount> <unit>`];
        }

      //teleport-armies <user> <armies> <provinces>
      if (arg[0] == "teleport-armies")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugTeleportArmies(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}teleport-armies <user> <armies> <provinces>`];
        }

      //teleport-army <user> <armies> <province>
      if (arg[0] == "teleport-army")
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);

          return debugTeleportArmy(user_id, arg[2], arg[3]);
        } else {
          return [false, `${settings.prefix}teleport-army <user> <armies> <province>`];
        }
    }
  }
};
