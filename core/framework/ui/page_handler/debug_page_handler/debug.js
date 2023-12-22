module.exports = {
  pageHandlerDebug: function (arg0_arg, arg1_message) {
    //Convert from parameters
    var arg = arg0_arg;
    var message = arg1_message;

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
      if (["ic", "instant-construct"].includes(arg[0]))
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
          var user_id = parseMention(arg[1]);
          var ot_user_id = returnMention(arg[2]);

          return debugControlCountry(user_id, ot_user_id);
        } else if (arg.length == 2) {
          var user_id = message.author.id;

          var ot_user_id = returnMention(arg[1]);

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
      if (["settle-province", "settle-provinces"].includes(arg[0]))
        if (arg.length >= 3) {
          var user_id = returnMention(arg[1]);

          return debugSettleProvince(user_id, arg[2]);
        } else {
          return [false, `${settings.prefix}settle-province <user> <provinces>`];
        }

      //transfer-provinces <user> <provinces> <ot_user>
      if (["transfer-province", "transfer-provinces"].includes(arg[0]))
        if (arg.length >= 4) {
          var user_id = returnMention(arg[1]);
          var ot_user_id = returnMention(arg[3]);

          return debugTransferProvinces(user_id, arg[2].split(" "), ot_user_id);
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
  },

  //printHelpMenu() - Prints a split embed page menu displaying all debug commands.
  printHelpMenu: function (arg0_message) {
    //Convert from parameters
    var message = arg0_message;

    //Declare local instance variables
    var help_string = [];

    //Format help_string
    {
      help_string.push(`**General Commands:**`);
      help_string.push(`\`${settings.prefix}help\` - Brings up the help menu.`);
      help_string.push("");
      help_string.push(`**Countries:**`);
      help_string.push(`\`${settings.prefix}construct <user> <amount> <building> <province>\` - Begins building construction in a city without material checks.`);
      help_string.push(`\`${settings.prefix}instant-construct <user> <amount> <building> <province>\` - Instantly constructs a building.`);
      help_string.push(`\`${settings.prefix}process-building <user> <building>\` - Processes a building.`);
      help_string.push(`\`${settings.prefix}process-buildings <user> <provinces>\` - Processes buildings in a given province.`);
      help_string.push("");

      help_string.push(`**Countries:**`);
      help_string.push(`\`${settings.prefix}control-country <user> <ot_user>\` - Gives a user control of another country.`);
      help_string.push(`\`${settings.prefix}create-country <id> <provinces> <name>\` - Gives a user control of another country.`);
      help_string.push(`\`${settings.prefix}delete-country <user>\` - Gives a user control of another country.`);
      help_string.push("");

      help_string.push(`**Date:**`);
      help_string.push(`\`${settings.prefix}freeze-time\` - Freezes time.`);
      help_string.push(`\`${settings.prefix}freeze-turns\` - Freezes turn processing.`);
      help_string.push(`\`${settings.prefix}set-date <year> <month> <day>\` - Sets the date.`);
      help_string.push("");

      help_string.push(`**Diplomacy:**`);
      help_string.push(`\`${settings.prefix}ally <user> <ot_user>\` - Sets an alliance between two countries.`);
      help_string.push(`\`${settings.prefix}dissolve-alliance <user> <ot_user>\` - Reoves an alliance.`);
      help_string.push(`\`${settings.prefix}dissolve-non-aggression <user> <ot_user>\` - Removes a non-aggression pact.`);
      help_string.push(`\`${settings.prefix}end-war <war_name>\` - Ends a war in white peace.`);
      help_string.push(`\`${settings.prefix}give-cb <user> <ot_user> <cb_name> <turns>\` - Gives a CB to a country on a target.`);
      help_string.push(`\`${settings.prefix}non-aggression <user> <ot_user> <turns>\` - Sets a non-aggression pact between two countries for a given duration.`);
      help_string.push(`\`${settings.prefix}set-mutual-relations <user> <ot_user> <value>\` - Sets mutual relations for both countries.`);
      help_string.push(`\`${settings.prefix}set-relations <user> <ot_user> <value>\` - Sets the opinion of a country of another country.`);
      help_string.push(`\`${settings.prefix}vassalise <user> <ot_user>\` - Vassalises <user> under <ot_user>.`);
      help_string.push(`\`${settings.prefix}war <user> <ot_user> <cb_name>\` - Declares a war between two countries using a given CB. <user> is the attacker by default.`);
      help_string.push("");

      help_string.push(`**Games:**`);
      help_string.push(`\`${settings.prefix}clean-games\` - Cleans up any abandoned games.`);
      help_string.push(`\`${settings.prefix}reset-games\` - Resets all game instances.`);
      help_string.push(`\`${settings.prefix}reset-interfaces\` - Renders current interfaces inert, kicks everyone back to the lobby.`);
      help_string.push("");

      help_string.push(`**Goods:**`);
      help_string.push(`\`${settings.prefix}delete <user> <amount> <good>\` - Deletes goods/money from a user's inventory.`);
      help_string.push(`\`${settings.prefix}give <user> <amount> <good>\` - Gives a user goods/money.`);
      help_string.push("");

      help_string.push(`**Governments:**`);
      help_string.push(`\`${settings.prefix}change-government <user> <government>\` - Changes a country's government.`);
      help_string.push(`\`${settings.prefix}give-pc <user> <amount>\` - Gives a user Political Capital.`);
      help_string.push("");

      help_string.push(`**Map:**`);
      help_string.push(`\`${settings.prefix}render-all-maps\` - Renders all map SVGs to raster.`);
      help_string.push(`\`${settings.prefix}render-map <map>\` - Caches a current SVG.`);
      help_string.push("");

      help_string.push(`**Politics:**`);
      help_string.push(`\`${settings.prefix}add-party-popularity <user> <amount> <ideology>\` - Adds to a party's popularity by a proportional percentage.`);
      help_string.push(`\`${settings.prefix}pass-reform <user> <reform>\` - Passes a legal reform.`);
      help_string.push(`\`${settings.prefix}set-party-popularity <user> <amount> <ideology>\` - Sets a party's popularity proportionally.`);
      help_string.push("");

      help_string.push(`**Pops:**`);
      help_string.push(`\`${settings.prefix}add-pops <amount> <pop_types> <province>\` - Adds pops to a province.`);
      help_string.push(`\`${settings.prefix}move-pops <amount> <pop_types> <from_province> <to_province>\` - Moves pops between provinces.`);
      help_string.push(`\`${settings.prefix}remove-pops <amount> <pop_types> <province>\` - Removes pops from a province.`);
      help_string.push(`\`${settings.prefix}reset-pops\` - Resets the pops of all provinces back to their default generation scheme.`);
      help_string.push(`\`${settings.prefix}process-pops <user>\` - Processes all pop behaviour in a given country.`);
      help_string.push("");

      help_string.push(`**Provinces:**`);
      help_string.push(`\`${settings.prefix}settle-province <user> <provinces>\` - Settles uncolonised provinces for a given country.`);
      help_string.push(`\`${settings.prefix}transfer-provinces <user> <provinces> <ot_user>\` - Transfers provinces between countries.`);
      help_string.push("");

      help_string.push(`**Research:**`);
      help_string.push(`\`${settings.prefix}instant-research <user> <technology>\` - Instantly researches a technology for a country.`);
      help_string.push(`\`${settings.prefix}research-up-to <user> <knowledge_cost>\` - Researches all techs up to a given tier as defined by knowledge cost.`);
      help_string.push("");

      help_string.push(`**Turns:**`);
      help_string.push(`\`${settings.prefix}next-global-turn\` - Processes an entire game turn.`);
      help_string.push(`\`${settings.prefix}next-turn <user>\` - Processes a turn for a single country.`);
      help_string.push("");

      help_string.push(`**Units:**`);
      help_string.push(`\`${settings.prefix}remove-units <user> <amount> <unit>\` - Removes units from a country's reserves.`);
      help_string.push(`\`${settings.prefix}spawn-units <user> <amount> <unit>\` - Spawns units in a country's reserves.`);
      help_string.push(`\`${settings.prefix}teleport-armies <user> <armies> <provinces>\` - Teleports armies tgo a set of given provinces.`);
      help_string.push(`\`${settings.prefix}teleport-army <user> <armies> <province>\` - Teleports a series of armies to a given province.`);
    }

    //Split embed and return page menu
    var help_array = splitString(help_string.join("\n"), 2800);
    var help_embed_array = splitEmbed(help_array, {
      title: `Admin Commands:`,
      title_pages: true,
      fixed_width: true
    });

    //Send to message.channel
    message.channel.send(config.localisation.blank).then((msg) => {
      createPageMenu(msg, {
        embed_pages: help_embed_array,
        user: message.author.id
      });
    });
  }
};
