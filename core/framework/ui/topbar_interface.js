module.exports = {
  alert_pages: [
    "alerts"
  ],
  budget_pages: [
    "budget"
  ],
  colonisation_pages: [
    "colonisation"
  ],
  country_interface: [
    "country_interface",
    "national_modifiers",
    "view_customisation"
  ],
  diplomacy_pages: [
    "cb_list",
    "diplomacy",
    "ledger",
    "war_list"
  ],
  economy_pages: [
    "building_list",
    "economy",
    "inventory"
  ],
  map_pages: [
    "founding_map",
    "map"
  ],
  military_pages: [
    "army_list",
    "military",
    "reserves",
    "unit_list"
  ],
  politics_pages: [
    "cultures",
    "politics",
    "reforms"
  ],
  population_pages: [
    "population"
  ],
  technology_pages: [
    "technology",
    "research",
    "research_list",
    "research_queue"
  ],
  trade_pages: [
    "auto_trades",
    "exports",
    "imports",
    "trade",
    "world_market"
  ],

  initialiseTopbar: function (arg0_user_id) {
    //Convert from parameters
    var user_id = arg0_user_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var alerts_length = (usr.alerts) ? usr.alerts.length : 0;
    var events_length = (usr.events) ? usr.events.length : 0;

    //Add buttons to top row
    const main_menu_row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("main_menu_btn")
          .setLabel("𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨")
          .setStyle("PRIMARY")
          .setEmoji("716829986266546187"),
        new Discord.MessageButton()
          .setCustomId("map_btn")
          .setLabel(
            (!map_pages.includes(game_obj.page)) ?
            "𝗠𝗔𝗣" :
            " ͟𝗠͟𝗔͟𝗣͟"
          )
          .setStyle("SUCCESS")
          .setEmoji("716821884867444746"),
        new Discord.MessageButton()
          .setCustomId("alerts_btn")
          .setLabel((alerts_length > 0) ?
            `You have ${parseNumber(alerts_length)} alert(s).` :
            `No new alerts.`
          )
          .setStyle("DANGER")
          .setDisabled(alerts_length == 0)
          .setEmoji("798006990638940160"),
        new Discord.MessageButton()
          .setCustomId("events_btn")
          .setLabel((events_length > 0) ?
            `You have ${parseNumber(events_length)} event(s) that need your attention.` :
            `No new events.`
          )
          .setStyle("DANGER")
          .setDisabled(events_length == 0)
          .setEmoji("800548280589221888")
      );
    const country_row_1 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("country_btn")
          .setLabel(
            (!country_interface.includes(game_obj.page)) ?
              "𝐂𝐨𝐮𝐧𝐭𝐫𝐲" :
              " ͟𝐂͟𝐨͟𝐮͟𝐧͟𝐭͟𝐫͟𝐲͟"
          )
          .setStyle(
            (!country_interface.includes(game_obj.page)) ?
              "SECONDARY" :
              "PRIMARY"
          )
          .setEmoji("716811246556545035"),
        new Discord.MessageButton()
          .setCustomId("budget_btn")
          .setLabel(
            (!budget_pages.includes(game_obj.page)) ?
            "𝐁𝐮𝐝𝐠𝐞𝐭" :
            " ͟𝐁͟𝐮͟𝐝͟𝐠͟𝐞͟𝐭͟"
          )
          .setStyle((!["budget"].includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716817688718213192"),
        new Discord.MessageButton()
          .setCustomId("economy_btn")
          .setLabel((!economy_pages.includes(game_obj.page)) ?
            "𝐄𝐜𝐨𝐧𝐨𝐦𝐲" :
            " ͟𝐄͟𝐜͟𝐨͟𝐧͟𝐨͟𝐦͟𝐲͟"
          )
          .setStyle((!economy_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716811992421367869"),
        new Discord.MessageButton()
          .setCustomId("technology_btn")
          .setLabel((!technology_pages.includes(game_obj.page)) ?
            "𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲" :
            " ͟𝐓͟𝐞͟𝐜͟𝐡͟𝐧͟𝐨͟𝐥͟𝐨͟𝐠͟𝐲͟"
          )
          .setStyle((!technology_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716812861514711040"),
        new Discord.MessageButton()
          .setCustomId("politics_btn")
          .setLabel((!politics_pages.includes(game_obj.page)) ?
            "𝐏𝐨𝐥𝐢𝐭𝐢𝐜𝐬" :
            " ͟𝐏͟𝐨͟𝐥͟𝐢͟𝐭͟𝐢͟𝐜͟𝐬͟"
          )
          .setStyle((!politics_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("732730754911436830")
      );
    const country_row_2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("population_btn")
          .setLabel((!population_pages.includes(game_obj.page)) ?
            "𝐏𝐨𝐩𝐮𝐥𝐚𝐭𝐢𝐨𝐧" :
            " ͟𝐏͟𝐨͟𝐩͟𝐮͟𝐥͟𝐚͟𝐭͟𝐢͟𝐨͟𝐧͟"
          )
          .setStyle((!population_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("758424911852470293"),
        new Discord.MessageButton()
          .setCustomId("trade_btn")
          .setLabel((!trade_pages.includes(game_obj.page)) ?
            "𝐓𝐫𝐚𝐝𝐞" :
            " ͟͟͟𝐓͟𝐫͟𝐚͟𝐝͟𝐞͟"
          )
          .setStyle((!trade_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716828677115084812"),
        new Discord.MessageButton()
          .setCustomId("diplomacy_btn")
          .setLabel((!diplomacy_pages.includes(game_obj.page)) ?
            "𝐃𝐢𝐩𝐥𝐨𝐦𝐚𝐜𝐲" :
            " ͟𝐃͟𝐢͟𝐩͟𝐥͟𝐨͟𝐦͟𝐚͟𝐜͟𝐲͟"
          )
          .setStyle((!diplomacy_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716827579323121666"),
        new Discord.MessageButton()
          .setCustomId("colonisation_btn")
          .setLabel((!colonisation_pages.includes(game_obj.page)) ?
            "𝐂𝐨𝐥𝐨𝐧𝐢𝐬𝐚𝐭𝐢𝐨𝐧" :
            " ͟𝐂͟𝐨͟𝐥͟𝐨͟𝐧͟𝐢͟𝐬͟𝐚͟𝐭͟𝐢͟𝐨͟𝐧͟"
          )
          .setStyle((!colonisation_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716821194891853826"),
        new Discord.MessageButton()
          .setCustomId("military_btn")
          .setLabel((!military_pages.includes(game_obj.page)) ?
            "𝐌𝐢𝐥𝐢𝐭𝐚𝐫𝐲" :
            " ͟𝐌͟𝐢͟𝐥͟𝐢͟𝐭͟𝐚͟𝐫͟𝐲͟"
          )
          .setStyle((!military_pages.includes(game_obj.page)) ?
            "SECONDARY" :
            "PRIMARY"
          )
          .setEmoji("716820390474940426")
      );

    //Edit message to include new top row buttons
    try {
      game_obj.header.edit({
        components: []
      }).then(() => {
        game_obj.header.edit({
          components: [
            main_menu_row,
            country_row_1,
            country_row_2
          ]
        });
      });
    } catch {
      setTimeout(reinitialiseGameEmbeds, 1000);

      log.warn(`initialiseTopbar() was unable to function correctly! Reinitialising all game embeds ..`);
    }

    game_obj.header_change = true;
  },

  topbarButtonHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var game_obj = getGameObject(interaction.user);
    var user_id = interaction.user.id;

    switch (interaction.customId) {
      case "main_menu_btn":
        //Print main menu
        printMainMenu(user_id);

        break;
      case "map_btn":
        //Initialise map viewer if map button is pressed
        if (!["founding_map", "map"].includes(game_obj.page)) {
          game_obj.page = "map";
          initialiseMapViewer(getGame(user_id));
        }
        module.exports.initialiseTopbar(user_id);

        break;
      case "alerts_btn":
        if (!alert_pages.includes(game_obj.page)) {
          game_obj.page = "alerts";
          module.exports.initialiseTopbar(user_id);
        }
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printAlerts(user_id),
          user: game_obj.user
        });

        break;
      case "events_btn":
        if (!alert_pages.includes(game_obj.page)) {
          game_obj.page = "events";
          module.exports.initialiseTopbar(user_id);
        }
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printEvents(user_id),
          user: game_obj.user
        });

        break;
      case "budget_btn":
        //Print out budget menu
        if (game_obj.page != "budget") {
          game_obj.page = "budget";
          module.exports.initialiseTopbar(user_id);
        }
        printBudget(user_id);

        break;
      case "colonisation_btn":
        //Print out colonisation menu
        if (game_obj.page != "colonisation") {
          game_obj.page = "colonisation";
          module.exports.initialiseTopbar(user_id);
        }
        printColonisation(user_id);

        break;
      case "country_btn":
        //Print out stats menu
        if (game_obj.page != "country_interface") {
          game_obj.page = "country_interface";
          module.exports.initialiseTopbar(user_id);
        }
        printStats(user_id);

        break;
      case "diplomacy_btn":
        //Print out diplomacy menu
        if (game_obj.page != "diplomacy") {
          game_obj.page = "diplomacy";
          module.exports.initialiseTopbar(user_id);
        }
        printDiplomacy(user_id);

        break;
      case "economy_btn":
        //Print out economy menu
        if (game_obj.page != "economy") {
          game_obj.page = "economy";
          module.exports.initialiseTopbar(user_id);
        }
        printEconomy(user_id);

        break;
      case "military_btn":
        //Print out military menu
        if (game_obj.page != "military") {
          game_obj.page = "military";
          module.exports.initialiseTopbar(user_id);

          setTimeout(function(){
            printMilitary(user_id);
          }, 1500);
        }

        break;
      case "politics_btn":
        //Print out politics menu
        if (game_obj.page != "politics") {
          game_obj.page = "politics";
          module.exports.initialiseTopbar(user_id);
        }
        printPolitics(user_id);

        break;
      case "population_btn":
        //Print out population menu
        if (game_obj.page != "population") {
          game_obj.page = "population";
          module.exports.initialiseTopbar(user_id);
        }
        printPops(user_id);

        break;
      case "technology_btn":
        //Print out tech menu
        if (game_obj.page != "technology") {
          game_obj.page = "technology";
          module.exports.initialiseTopbar(user_id);
        }
        printTechnology(user_id);

        break;
      case "trade_btn":
        //Print out trade menu
        if (game_obj.page != "trade") {
          game_obj.page = "trade";
          module.exports.initialiseTopbar(user_id);
        }
        printTrade(user_id);

        break;
    }
  }
};
