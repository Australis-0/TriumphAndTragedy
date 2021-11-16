module.exports = {
  budget_pages: [
    "budget"
  ],
  economy_pages: [
    "economy",
    "inventory"
  ],
  map_pages: [
    "founding_map",
    "map"
  ],
  population_pages: [
    "population"
  ],

  initialiseTopbar: function (arg0_user_id) {
    //Convert from parameters
    var user_id = arg0_user_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var total_alerts = Object.keys(usr.alerts).length;
    var total_events = Object.keys(usr.events).length;

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
          .setLabel(`You have ${parseNumber(total_alerts)} alert(s).`)
          .setStyle("DANGER")
          .setDisabled(total_alerts == 0)
          .setEmoji("798006990638940160"),
        new Discord.MessageButton()
          .setCustomId("events_btn")
          .setLabel((total_events > 0) ?
            `You have ${parseNumber(total_events)} event(s) that need your attention.` :
            `No new events.`
          )
          .setStyle("DANGER")
          .setDisabled(total_events == 0)
          .setEmoji("800548280589221888")
      );
    const country_row_1 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("country_btn")
          .setLabel(
            (!["country_interface"].includes(game_obj.page)) ?
              "𝐂𝐨𝐮𝐧𝐭𝐫𝐲" :
              " ͟𝐂͟𝐨͟𝐮͟𝐧͟𝐭͟𝐫͟𝐲͟"
          )
          .setStyle(
            (!["country_interface"].includes(game_obj.page)) ?
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
          .setLabel("𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲")
          .setStyle("SECONDARY")
          .setEmoji("716812861514711040"),
        new Discord.MessageButton()
          .setCustomId("politics_btn")
          .setLabel("𝐏𝐨𝐥𝐢𝐭𝐢𝐜𝐬")
          .setStyle("SECONDARY")
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
          .setLabel("𝐓𝐫𝐚𝐝𝐞")
          .setStyle("SECONDARY")
          .setEmoji("716828677115084812"),
        new Discord.MessageButton()
          .setCustomId("diplomacy_btn")
          .setLabel("𝐃𝐢𝐩𝐥𝐨𝐦𝐚𝐜𝐲")
          .setStyle("SECONDARY")
          .setEmoji("716827579323121666"),
        new Discord.MessageButton()
          .setCustomId("colonisation_btn")
          .setLabel("𝐂𝐨𝐥𝐨𝐧𝐢𝐬𝐚𝐭𝐢𝐨𝐧")
          .setStyle("SECONDARY")
          .setEmoji("716821194891853826"),
        new Discord.MessageButton()
          .setCustomId("military_btn")
          .setLabel("𝐌𝐢𝐥𝐢𝐭𝐚𝐫𝐲")
          .setStyle("SECONDARY")
          .setEmoji("716820390474940426")
      );

    //Edit message to include new top row buttons
    game_obj.header.edit({
      content: config.localisation.blank,
      components: []
    }).then(() => {
      game_obj.header.edit({
        content: config.localisation.blank,
        components: [
          main_menu_row,
          country_row_1,
          country_row_2
        ]
      });
    });

    game_obj.header_change = true;
  },

  topbarButtonHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var game_obj = getGameObject(interaction.user);
    var user_id = interaction.user.id;

    switch (interaction.customId) {
      case "map_btn":
        //Initialise map viewer if map button is pressed
        if (!["founding_map", "map"].includes(game_obj.page)) {
          game_obj.page = "map";
          initialiseMapViewer(getGame(user_id));
        }
        module.exports.initialiseTopbar(user_id);

        break;
      case "budget_btn":
        //Print out budget menu
        if (game_obj.page != "budget") {
          game_obj.page = "budget";
          module.exports.initialiseTopbar(user_id);
        }
        printBudget(user_id);

        break;
      case "country_btn":
        //Print out stats menu
        if (game_obj.page != "country_interface") {
          game_obj.page = "country_interface";
          module.exports.initialiseTopbar(user_id);
        }
        printStats(user_id);

        break;
      case "economy_btn":
        //Print out economy menu
        if (game_obj.page != "economy") {
          game_obj.page = "economy";
          module.exports.initialiseTopbar(user_id);
        }
        printEconomy(user_id);

        break;
      case "population_btn":
        //Print out population menu
        if (game_obj.page != "population") {
          game_obj.page = "population";
          module.exports.initialiseTopbar(user_id);
        }
        printPops(user_id);

        break;
    }
  }
};
