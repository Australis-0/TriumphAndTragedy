module.exports = {
  initialisePrintArchivedWar: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View War Archives:`,
      prompts: [
        [`Which archived conflict would you wish to analyse?\n\nType **[War List]** to a view a full list of all ongoing and archived conflicts.`, "string"]
      ]
    },
    function (arg) {
      var archived_war_to_display = module.exports.printWar(user_id, arg[0], true);

      if (archived_war_to_display)
        game_obj.page = `view_war_archives_${arg[0]}`;
    },
    function (arg) {
      switch (arg) {
        case "war list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printWars(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  initialisePrintWar: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View War:`,
      prompts: [
        [`What is the name of the war you want to view a report on?\n\nType **[War List]** to a view a full list of all ongoing and archived conflicts.`, "string"]
      ]
    },
    function (arg) {
      var war_to_display = module.exports.printWar(user_id, arg[0]);

      if (war_to_display)
        game_obj.page = `view_war_${arg[0]}`;
    },
    function (arg) {
      switch (arg) {
        case "war list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printWars(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  printWar: function (arg0_user, arg1_war_name, arg2_archived_war, arg3_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_war_name = arg1_war_name.trim().toLowerCase();
    var is_archived_war = arg2_archived_war;
    var do_not_display = arg3_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (!is_archived_war) ? getWar(raw_war_name) : getArchivedWar(raw_war_name);

    //Declare local tracker variables
    var all_allies = Object.keys(usr.diplomacy.allies);
    var attackers_string = [];
    var attackers_wargoal_string = [];
    var can_call_allies = false;
    var bottom_war_string = [];
    var defenders_string = [];
    var defenders_wargoal_string = [];
    var war_string = [];

    //Check if war_obj exists
    if (war_obj) {
      if (!is_archived_war)
        for (var i = 0; i < all_allies.length; i++)
          if (hasAlliance(actual_id, all_allies[i]))
            if (!(war_obj.attackers.includes(all_allies[i]) || war_obj.defenders.includes(all_allies[i])))
              can_call_allies = true;

      //Peace treaty buttons
      if (!is_archived_war)
        (!war_obj.peace_treaties[actual_id]) ?
          war_string.push(`**[Sign Peace Treaty]**${(can_call_allies.length > 0) ? "\n**[Call Ally]**" : ""}`) :
          war_string.push(`**[Add Wargoal]** | **[Remove Wargoal]** | **[View Peace Offer]** | **[Send Peace Offer]**${(can_call_allies.length > 0) ? "\n**[Call Ally]**" : ""}`);

      if (is_archived_war)
        war_string.push(`**${getDate(war_obj.starting_date)}** - **${getDate(war_obj.end_date)}**\n`);

      war_string.push(`Attacker Warscore: **${printPercentage(war_obj.attacker_warscore)}** | Defender Warscore: **${printPercentage(war_obj.defender_warscore)}**`);
      war_string.push("");
      try {
        war_string.push(`**${main.users[war_obj.attackers_war_leader].name}** is the war leader for the attacking faction, whilst **${main.users[war_obj.defenders_war_leader].name}** is the war leader for the defending faction.`);
      } catch {}
      war_string.push("");

      //Format attacker wargoal string
      for (var i = 0; i < war_obj.wargoals.length; i++)
        attackers_wargoal_string.push(`${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}`);

      //Format attacker description
      attackers_string.push(`Participant Name | Military Casualties`);
      attackers_string.push("");

      for (var i = 0; i < war_obj.attackers.length; i++) {
        var local_attacker = main.users[war_obj.attackers[i]];

        attackers_string.push(`**${local_attacker.name}** | **${parseNumber(war_obj[war_obj.attackers[i] + "_casualties"])}**`);
      }

      //Format defender wargoal string; this is put here for future flexibility
      for (var i = 0; i < war_obj.wargoals.length; i++)
        defenders_wargoal_string.push(`${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}`);

      //Format defender description
      defenders_string.push(`Participant Name | User | Military Casualties`);
      defenders_string.push("");

      for (var i = 0; i < war_obj.defenders.length; i++) {
        var local_defender = main.users[war_obj.defenders[i]];

        defenders_string.push(`**${local_defender.name}** | **${parseNumber(war_obj[war_obj.defenders[i] + "_casualties"])}**`);
      }

      //Bottom war string (Total Casualties)
      bottom_war_string.push(`Total Military Casualties: **${parseNumber(war_obj.attacker_total_casualties + war_obj.defender_total_casualties)}**`);

      //Format embed and display
      var war_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**[Back]** | ${(!is_archived_war) ? "**[Rename War]** | " : ""}__**${war_obj.name.trim()}**__:`)
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(war_string.join("\n"))
        .addFields(
          {
            name: "Attacker Wargoals:",
            value: attackers_wargoal_string.join("\n"),
            inline: true,
          },
          {
            name: "Defender Wargoals:",
            value: attackers_wargoal_string.join("\n"),
            inline: true,
          },
          {
            name: `${config.icons.blank_1}`,
            value: config.icons.blank_1,
          },
          {
            name: "Attackers:",
            value: attackers_string.join("\n"),
            inline: true
          },
          {
            name: "Defenders:",
            value: defenders_string.join("\n"),
            inline: true
          },
          {
            name: `Casualties:`,
            value: bottom_war_string.join("\n")
          }
        );

      if (!do_not_display) {
        game_obj.main_embed = war_embed;
        game_obj.main_change = true;
      }

      return war_embed;
    } else {
      if (!do_not_display)
        printError(game_obj.id, `The war you have specified, **${raw_war_name}** is either no longer ongoing, or does not exist!`);
    }
  },

  printWars: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_archived_wars = Object.keys(main.global.archived_wars);
    var all_wars = Object.keys(main.global.wars);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare wars_string
    var wars_string = [];

    //Format embed
    if (all_wars.length > 0) {
      wars_string.push(`War Name | Participants | Attacker Warscore - Defender Warscore | Total Casualties`);
      wars_string.push("");

      for (var i = 0; i < all_wars.length; i++) {
        var local_war = main.global.wars[all_wars[i]];
        var number_of_nations = local_war.attackers.length + local_war.defenders.length;
        var total_casualties = local_war.attacker_total_casualties + local_war.defender_total_casualties;

        wars_string.push(`**${local_war.name}** | ${parseNumber(number_of_nations)} | **${printPercentage(local_war.attacker_warscore)}** - **${printPercentage(local_war.defender_warscore)}** | ${parseNumber(total_casualties)}`);
        wars_string.push(`- **[View ${local_war.name}]**`);
      }
    } else {
      wars_string.push(`_There are currently no ongoing conflicts._`);
    }

    wars_string.push("");
    wars_string.push(config.localisation.divider);
    wars_string.push("");
    wars_string.push(`**Archived Conflicts:**`);
    wars_string.push("");

    if (all_archived_wars.length > 0) {
      wars_string.push(`War Name | Total Casualties`);
      wars_string.push("");

      for (var i = 0; i < all_archived_wars.length; i++) {
        var local_war = main.global.archived_wars[all_archived_wars[i]];
        var total_casualties = local_war.attacker_total_casualties + local_war.defender_total_casualties;

        wars_string.push(`[${local_war.name}] | **${parseNumber(total_casualties)}** | `);
      }
    }

    //Return statement
    return splitEmbed(wars_string, {
      title: "[Back] | War List:",
      description: [
        `**[View Archived War]** | **[View War]**`,
        "",
        config.localisation.divider,
        ""
      ],
      title_pages: true,
      fixed_width: true
    });
  }
};
