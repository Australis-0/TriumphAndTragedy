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
    var attacker_volunteers = [];
    var attackers_wargoal_string = [];
    var can_call_allies = false;
    var bottom_war_string = [];
    var defenders_string = [];
    var defender_volunteers = [];
    var defenders_wargoal_string = [];
    var war_string = [];

    //Check if war_obj exists
    if (war_obj) {
      var all_war_keys = Object.keys(war_obj);
      var can_send_volunteers = (!war_obj[`${actual_id}_sent_volunteers`]);
      var cb_obj = getCB(war_obj.cb);

      //Recalculate attacker, defender casualties
      war_obj.attacker_total_casualties = 0;
      war_obj.defender_total_casualties = 0;

      for (var i = 0; i < war_obj.attackers.length; i++)
        war_obj.attacker_total_casualties += returnSafeNumber(war_obj[`${war_obj.attackers[i]}_casualties`]);
      for (var i = 0; i < war_obj.defenders.length; i++)
        war_obj.defender_total_casualties += returnSafeNumber(war_obj[`${war_obj.defenders[i]}_casualties`]);

      //Check if war is active and whether allies can be called in
      if (!is_archived_war)
        for (var i = 0; i < all_allies.length; i++)
          if (hasAlliance(user_id, all_allies[i]))
            if (!(war_obj.attackers.includes(all_allies[i]) || war_obj.defenders.includes(all_allies[i])))
              can_call_allies = true;

      //Peace treaty buttons
      if (!is_archived_war) {
        if (war_obj.attackers.includes(actual_id) || war_obj.defenders.includes(actual_id)) {
          var friendly_side = "";
          var opposing_side = "";

          if (war_obj.attackers.includes(actual_id)) {
            friendly_side = "attackers";
            opposing_side = "defenders";
          }
          if (war_obj.defenders.includes(actual_id)) {
            friendly_side = "defenders";
            opposing_side = "attackers";
          }

          war_string.push((!war_obj.peace_treaties[actual_id]) ?
            `**[Sign Peace Treaty]**` :
            `**[Edit Peace Offer]** | **[Send Peace Offer]**`
          );

          if (can_call_allies)
            war_string.push(`- ${(can_call_allies) ? `**[Call Ally]**` : ""}${(war_obj[friendly_side].length > 1) ? ` | **[Change War Leader]** - ${config.icons.political_capital} ${parseNumber(getWarLeadershipCost(user_id, war_obj))} PC` : ""}`);
        }

        //Intervene in war, volunteer buttons
        war_string.push(`- **[Intervene In War]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.intervene_in_war_cost)} PC | ${(can_send_volunteers) ? `**[Send Volunteers]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.send_volunteer_armies_cost)} PC` : `**[Recall Volunteers]** | **[Repatriate Volunteers]** | **[Send Volunteer Armies]**`}`);
      }

      (is_archived_war) ?
        war_string.push(`**${getDate(war_obj.starting_date)}** - **${getDate(war_obj.end_date)}**\n`) :
        war_string.push(`**${getDate(war_obj.starting_date)}** - Present`);

      war_string.push(`Attacker Warscore: **${printPercentage(war_obj.attacker_warscore)}** | Defender Warscore: **${printPercentage(war_obj.defender_warscore)}**`);
      war_string.push("");

      //Display CB
      war_string.push(`- Casus Belli: ${(cb_obj.icon) ? config.icons[cb_obj.icon] + " " : ""}**${(cb_obj.name) ? cb_obj.name : war_obj.cb}**`);
      war_string.push("");

      try {
        war_string.push(`**${main.users[war_obj.attackers_war_leader].name}** is the war leader for the attacking faction, whilst **${main.users[war_obj.defenders_war_leader].name}** is the war leader for the defending faction.`);
      } catch {}
      war_string.push("");

      //Format attacker wargoal string
      var attacker_wargoals = Object.keys(war_obj.attackers_wargoals);

      for (var i = 0; i < attacker_wargoals.length; i++) {
        var wargoal_obj = getWargoal(attacker_wargoals[i]);

        var demand_limit = returnSafeNumber(wargoal_obj.demand_limit, 1);

        demand_limit = Math.ceil(
          demand_limit*returnSafeNumber(war_obj.attackers_wargoals[attacker_wargoals[i]], 1)
        );

        if (demand_limit > 0)
          attackers_wargoal_string.push(`[${(wargoal_obj.name) ? wargoal_obj.name : attacker_wargoals[i]}] (__${parseNumber(demand_limit)}__)`);
      }

      //Format attacker description
      attackers_string.push(`Participant Name | War Exhaustion | Military Casualties`);
      attackers_string.push("");

      for (var i = 0; i < war_obj.attackers.length; i++) {
        var local_attacker = main.users[war_obj.attackers[i]];

        (!war_obj.attacker_names) ?
          attackers_string.push(`**${(local_attacker) ? local_attacker.name : war_obj.attackers[i]}** | **${printPercentage(local_attacker.modifiers.war_exhaustion)}** | ${parseNumber(returnSafeNumber(war_obj[war_obj.attackers[i] + "_casualties"]))}`) :
          attackers_string.push(`**${war_obj.attacker_names[i]}** | **${printPercentage(local_attacker.modifiers.war_exhaustion)}** | ${parseNumber(returnSafeNumber(war_obj[war_obj.attackers[i] + "_casualties"]))}`);;
      }

      //Format attacker_volunteers
      for (var i = 0; i < all_war_keys.length; i++)
        if (all_war_keys[i].includes("_sent_volunteers")) {
          var local_id = all_war_keys[i].replace("_sent_volunteers", "");
          var local_value = war_obj[all_war_keys[i]];

          if (local_value == "attackers")
            attacker_volunteers.push(`- _${main.users[local_id].name}_`);
        }

      if (attacker_volunteers.length > 0) {
        attackers_string.push("");
        attackers_string.push(`Volunteers:`);
        attackers_string.push("");
        attackers_string.push(defender_volunteers.join("\n"));
      }

      //Format defender wargoal string; this is put here for future flexibility
      var defender_wargoals = Object.keys(war_obj.defenders_wargoals);

      for (var i = 0; i < defender_wargoals.length; i++) {
        var wargoal_obj = getWargoal(defender_wargoals[i]);

        var demand_limit = returnSafeNumber(wargoal_obj.demand_limit, 1);

        demand_limit = Math.ceil(
          demand_limit*returnSafeNumber(war_obj.defenders_wargoals[defender_wargoals[i]], 1)
        );

        if (demand_limit > 0)
          defenders_wargoal_string.push(`[${(wargoal_obj.name) ? wargoal_obj.name : defender_wargoals[i]}] (__${parseNumber(demand_limit)}__)`);
      }

      //Format defender description
      defenders_string.push(`Participant Name | War Exhaustion | Military Casualties`);
      defenders_string.push("");

      for (var i = 0; i < war_obj.defenders.length; i++) {
        var local_defender = main.users[war_obj.defenders[i]];

        (!war_obj.defender_names) ?
          defenders_string.push(`**${(local_defender) ? local_defender.name : war_obj.defenders[i]}** | **${printPercentage(local_defender.modifiers.war_exhaustion)}** | ${parseNumber(returnSafeNumber(war_obj[war_obj.defenders[i] + "_casualties"]))}`) :
          defenders_string.push(`${war_obj.defender_names[i]}** | **${printPercentage(local_defender.modifiers.war_exhaustion)}** | **${parseNumber(returnSafeNumber(war_obj[war_obj.defenders[i] + "_casualties"]))}`);
      }

      //Format defender_volunteers
      for (var i = 0; i < all_war_keys.length; i++)
        if (all_war_keys[i].includes("_sent_volunteers")) {
          var local_id = all_war_keys[i].replace("_sent_volunteers", "");
          var local_value = war_obj[all_war_keys[i]];

          if (local_value == "defenders")
            defender_volunteers.push(`- _${main.users[local_id].name}_`);
        }

      if (defender_volunteers.length > 0) {
        defenders_string.push("");
        defenders_string.push(`Volunteers:`);
        defenders_string.push("");
        defenders_string.push(defender_volunteers.join("\n"));
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
            name: `${config.icons.artillery} Attacker Wargoals:`,
            value: attackers_wargoal_string.join("\n"),
            inline: true,
          },
          {
            name: `${config.icons.active_personnel} Defender Wargoals:`,
            value: attackers_wargoal_string.join("\n"),
            inline: true,
          },
          {
            name: `${config.icons.blank_1}`,
            value: config.icons.blank_1,
          },
          {
            name: `${config.icons.attacker} Attackers:`,
            value: attackers_string.join("\n"),
            inline: true
          },
          {
            name: `${config.icons.defender} Defenders:`,
            value: defenders_string.join("\n"),
            inline: true
          },
          {
            name: `${config.icons.death} Casualties:`,
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

        wars_string.push(`**[${local_war.name}]** | **${parseNumber(total_casualties)}**`);
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
