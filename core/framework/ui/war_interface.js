module.exports = {
  printWar: function (arg0_user, arg1_war_name, arg2_archived_war) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_war_name = arg1_war_name.trim().toLowerCase();
    var is_archived_war = arg2_archived_war;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (!is_archived_war) ? getwar(raw_war_name) : getArchivedWar(raw_war_name);

    //Declare local tracker variables
    var attackers_string = [];
    var attackers_wargoal_string = [];
    var bottom_war_string = [];
    var defenders_string = [];
    var defenders_wargoal_string = [];
    var war_string = [];

    //Check if war_obj exists
    if (war_obj) {
      //Peace treaty buttons
      if (!is_archived_war)
        (!war_obj.peace_treaties[actual_id]) ?
          war_string.push(`**[Sign Peace Treaty]**`) :
          war_string.push(`**[Add Wargoal]** ¦ **[Remove Wargoal]** ¦ **[View Peace Offer]** ¦ **[Send Peace Offer]**`);

      if (is_archived_war)
        war_string.push(`**${getDate(war_obj.starting_date)}** - **${getDate(war_obj.end_date)}**\n`);

      war_string.push(`Attacker Warscore: **${printPercentage(war_obj.attacker_warscore)}** ¦ Defender Warscore: **${printPercentage(war_obj.defender_warscore)}`);
      war_string.push("");
      war_string.push(`**${main.users[attackers_war_leader].name}** is the war leader for the attacking faction, whilst **${main.users[defenders_war_leader].name}** is the war leader for the defending faction.`);
      war_string.push("");

      //Format attacker wargoal string
      for (var i = 0; i < war_obj.wargoals.length; i++)
        attackers_wargoal_string.push(`${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}`);

      //Format attacker description
      attackers_string.push(`Participant Name ¦ Military Casualties`);

      for (var i = 0; i < war_obj.attackers.length; i++) {
        var local_attacker = main.users[war_obj.attackers[i]];

        attackers_string.push(`**${local_attacker.name}** ¦ **${parseNumber(war_obj[war_obj.attackers[i] + "_casualties"])}`);
      }

      //Format defender wargoal string; this is put here for future flexibility
      for (var i = 0; i < war_obj.wargoals.length; i++)
        defenders_wargoal_string.push(`${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}`);

      //Format defender description
      defenders_string.push(`Participant Name ¦ User ¦ Military Casualties`);

      for (var i = 0; i < war_obj.defenders.length; i++) {
        var local_defender = main.users[war_obj.defenders[i]];

        defenders_string.push(`**${local_defender.name}** ¦ **${parseNumber(war_obj[war_obj.defenders[i] + "_casualties"])}`);
      }

      //Bottom war string (Total Casualties)
      bottom_war_string.push(`Total Military Casualties: **${parseNumber(war_obj.attacker_total_casualties + war_obj.defender_total_casualties)}**`);

      //Format embed and display
      var war_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**[Back]** ¦ ${(!is_archived_war) ? "**[Rename War]** ¦ " : ""}__**${war_obj.name.trim()}**__:`)
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

      game_obj.main_embed = war_embed;
      game_obj.main_change = true;
    } else {
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
      wars_string.push(`War Name ¦ Participants ¦ Attacker Warscore - Defender Warscore ¦ Total Casualties`);
      wars_string.push("");

      for (var i = 0; i < all_wars.length; i++) {
        var local_war = main.global.wars[all_wars[i]];
        var number_of_nations = local_war.attackers.length + local_war.defenders.length;
        var total_casualties = local_war.attacker_total_casualties + local_war.defender_total_casualties;

        wars_string.push(`**${local_war.name}** ¦ ${parseNumber(number_of_nations)} ¦ **${parsePercentage(local_war.attacker_warscore)}** - **${parsePercentage(local_war.defender_warscore)}** ¦ ${parseNumber(total_casualties)}`);
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
      wars_string.push(`War Name ¦ Total Casualties`);
      wars_string.push("");

      for (var i = 0; i < all_archived_wars.length; i++) {
        var local_war = main.global.archived_wars[all_archived_wars[i]];
        var total_casualties = local_war.attacker_total_casualties + local_war.defender_total_casualties;

        wars_string.push(`[${local_war.name}] ¦ **${parseNumber(total_casualties)}** ¦ `);
      }
    }

    //Return statement
    return splitEmbed(wars_string, {
      title: "[Back] ¦ War List:",
      title_pages: true,
      fixed_width: true
    });
  }
};
