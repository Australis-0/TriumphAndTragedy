module.exports = {
  printResearch: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var knowledge_gain = getKnowledgeGain(user_id);

    //Initialise research_string
    var research_string = [];

    research_string.push(`**[Back]**`);
    research_string.push("");
    research_string.push(`${config.icons.technology} Research Slots: (**${parseNumber(usr.researching.length)}**/${parseNumber(usr.modifiers.research_slots)}):`);
    research_string.push(`**[View Research Queue]**`);
    research_string.push("");

    if (usr.researching.length > 0) {
      for (var i = 0; i < usr.researching.length; i++) {
        var local_knowledge_per_turn = [
          Math.ceil(knowledge_gain[0]/usr.researching.length), //minimum local knowledge gain
          Math.ceil(knowledge_gain[1]/usr.researching.length)  //maximum local knowledge gain
        ];
        var local_tech = getTechnology(usr.researching[i].technology);
        var local_tech_icon = (local_tech.icon) ? config.icons[local_tech.icon] + " " : "";
        var local_tech_name = (local_tech.name) ? local_tech.name : "";

        //Apply knowledge_investment mechanic
        var knowledge_investment_modifier = (usr.researching.length != 1) ?
          config.defines.technology.max_knowledge_investment*usr.modifiers.knowledge_investment_limit :
          1;

        if (local_knowledge_per_turn[0] > usr.researching[i].total_research_cost*knowledge_investment_modifier)
          local_knowledge_per_turn[0] = Math.round(usr.researching[i].total_research_cost*knowledge_investment_modifier);
        if (local_knowledge_per_turn[1] > usr.researching[i].total_research_cost*knowledge_investment_modifier)
          local_knowledge_per_turn[1] = usr.researching[i].total_research_cost*knowledge_investment_modifier;

        //Declare local tracker variables
        var turn_count = [
          Math.ceil(
            (usr.researching[i].total_research_cost - usr.researching[i].current_investment)/local_knowledge_per_turn[0]
          ),
          Math.ceil(
            (usr.researching[i].total_research_cost - usr.researching[i].current_investment)/local_knowledge_per_turn[1]
          )
        ];
        var turn_string = "";

        if (local_knowledge_per_turn[0] == 0 && local_knowledge_per_turn[1] == 0) {
          turn_string = `**infinite**`;
        } else if (turn_count[0] == turn_count[1]) {
          turn_string = `**${parseNumber(turn_count[0])}**`;
        } else {
          turn_string = `**${parseNumber(turn_count[0])} - ${parseNumber(turn_count[1])}**: **[Cancel Research]**`;
        }

        //Push tech summary to string
        research_string.push(`#**${i + 1}**. ${local_tech_icon} **${local_tech_name}** ¦ **[Cancel Research]**`)

        //Push research progress to string
        research_string.push(`---`);
        research_string.push(`You have invested **${parseNumber(usr.researching[i].current_investment)}/${parseNumber(usr.researching[i].total_research_cost)}** ${config.icons.government} Knowledge into this technology.`);
        research_string.push(`Your advisors estimate that it will take ${turn_string} turn(s) to finish researching this technology.`);
        research_string.push("");
      }
    } else {
      research_string.push(`_Nothing is currently being researched._`);
      research_string.push("");
      research_string.push(`For a valid list of technologies, check out your **[Research List]**.`);
    }

    //Declare research_embed
    const research_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Research:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(research_string.join("\n"));

    game_obj.main_embed = research_embed;
    game_obj.main_change = true;
  },

  /*
    printResearchList() - Prints out a research list for a given user based on available techs.
    options: {
      return_names: true/false - Whether or not to return the keys of the tech instead of a displayable embed.
    }
  */
  printResearchList: function (arg0_user, arg1_options) { //[WIP] - Needs additional frameworks before effects parser is able to progress
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_tech_categories = Object.keys(config.technology);
    var all_techs = getAllTechnologies({ return_names: true });
    var tech_array_dump = [];
    var processed_tech_categories = {};

    //Initialise tech_string
    var tech_string = [];

    //Initialise processed_tech_categories
    for (var i = 0; i < all_tech_categories.length; i++)
      processed_tech_categories[all_tech_categories[i]] = [];

    //Check which techs are available or not
    for (var i = 0; i < all_techs.length; i++) {
      var local_tech = getTechnology(all_techs[i]);
      var tech_available = false;

      //Check for prerequisite_techs. If no prerequisite_techs are available, the tech is automatically available unless the user has already researched it
      if (local_tech.prerequisite_techs) {
        var prerequisite_checks = 0;

        for (var x = 0; x < local_tech.prerequisite_techs.length; x++)
          if (usr.researched_technologies.includes(local_tech.prerequisite_techs[x]))
            prerequisite_checks++;

        if (prerequisite_checks == local_tech.prerequisite_techs.length)
          tech_available = true;
      } else {
        //No prerequisite_techs were found, so it must be a starting tech
        tech_available = true;
      }

      //Check if user has already researched tech
      if (usr.researched_technologies.includes(all_techs[i]))
        tech_available = false;

      //If the technology is available, push to tech_array_dump
      if (tech_available) tech_array_dump.push(all_techs[i]);
    }

    //Sort the current tech_array_dump into processed_tech_categories
    for (var i = 0; i < all_tech_categories.length; i++) {
      var local_category_techs = Object.keys(config.technology[all_tech_categories[i]]);

      for (var x = 0; x < tech_array_dump.length; x++)
        if (local_category_techs.includes(tech_array_dump[x]))
          processed_tech_categories[all_tech_categories[i]].push(tech_array_dump[x]);
    }

    //Format string
    tech_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    tech_string.push("");

    //Begin assembling the tech array by getting all valid tech categories
    for (var i = 0; i < all_tech_categories.length; i++)
      if (processed_tech_categories[all_tech_categories[i]].length > 0) {
        var local_tech_category = processed_tech_categories[all_tech_categories[i]];

        //Format header
        tech_string.push(`${config.icons.technology} **${parseString(all_tech_categories[i])}:**`);
        tech_string.push(config.localisation.divider);
        tech_string.push("");

        for (var x = 0; x < local_tech_category.length; x++) {
          var local_tech = getTechnology(local_tech_category[x]);

          var gfx_icon = (local_tech.icon) ? config.icons[local_tech.icon] + " " : "";
          var researching_status = "";

          for (var y = 0; y < usr.researching.length; y++)
            if (usr.researching[y].technology == local_tech_category[x])
              researching_status = `__Researching__`;

          if (usr.research_queue.includes(local_tech_category[x]))
            researching_status = `__Queued (#${usr.research_queue.indexOf(local_tech_category[x])+1})__`;

          if (researching_status == "")
            researching_status = `¦ **[Research ${(local_tech.name) ? local_tech.name : local_tech_category[x]}]**`;

          //Push to tech_string
          tech_string.push(`${gfx_icon}**${(local_tech.name) ? local_tech.name : local_tech_category[x]}**: ${researching_status}`);

          if (local_tech.description)
            tech_string.push(`\n_${local_tech.description}_\n`);

          tech_string.push(`- **Cost:** ${config.icons.knowledge} ${parseNumber(getTechnologyCost(local_tech_category[x]))}`);
          tech_string.push(`- **Effects:**`);

          //Push modifiers, but only if the tech unlocks something first
          if (local_tech.unlocks) {
            var all_modifiers = Object.keys(local_tech.unlocks);

            for (var y = 0; y < all_modifiers.length; y++) {
              var local_modifier = getList(local_tech.unlocks[all_modifiers[y]]);

              switch (all_modifiers[y]) {
                case "obsolete_building":
                  for (var z = 0; z < local_modifier.length; z++)
                    tech_string.push(`Obsoletes **${((getBuilding(local_modifier[z]).name) > getBuilding(local_modifier[z]).name) ? getBuilding(local_modifier[z]).name : local_modifier[z]}**`);

                  break;
                case "unlock_building":
                  for (var z = 0; z < local_modifier.length; z++)
                    tech_string.push(`Unlocks **${((getBuilding(local_modifier[z]).name) > getBuilding(local_modifier[z]).name) ? getBuilding(local_modifier[z]).name : local_modifier[z]}**`);

                  break;
                default:
                  if (getModifier(all_modifiers[y])) {
                    var modifier_obj = getModifier(all_modifiers[y]);

                    //Fetch local tracker variables
                    var modifier_name = (modifier_obj.name) ? modifier_obj.name : all_modifiers[y];

                    //Push to tech_string
                    (modifier_obj.type == "percentage") ?
                      //Percentage is true, but is it negative or positive?
                      (local_modifier[0] < 0) ?
                        tech_string.push(` • **${printPercentage(local_modifier[0] - 1, { display_prefix: true, base_zero: true })}** ${modifier_name}`) :
                        tech_string.push(` • **${printPercentage(local_modifier[0], { display_prefix: true, base_zero: true })}** ${modifier_name}`) :
                      tech_string.push(` • **${parseNumber(local_modifier[0], { display_prefix: true })}** ${modifier_name}`);
                  }
                  break;
              }
            }
          } else {
            if (local_tech.custom_effect_description)
              tech_string.push(`_${local_tech.custom_effect_description}_`);
          }

          //Print what other technologies the current tech leads to
          var leads_to_array = [];

          for (var y = 0; y < all_techs.length; y++) {
            var local_tech_obj = getTechnology(all_techs[y]);

            if (local_tech_obj.prerequisite_techs)
              if (local_tech_obj.prerequisite_techs.includes(local_tech_category[x]))
                leads_to_array.push((local_tech_obj.name) ? local_tech_obj.name : all_techs[y]);
          }

          if (leads_to_array.length > 0)
            tech_string.push(`- **Leads to:** ${leads_to_array.join(", ")}`);

          //Insert newline as margin so that all the techs aren't bunched up next to each other
          tech_string.push("");
        }
      }

    //Return statement
    return (!options.return_names) ?
      splitEmbed(tech_string, {
        title: "Available Technologies:",
        title_pages: true,
        fixed_width: true
      }) :
      tech_array_dump;
  },

  printResearchQueue: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise research_queue_string
    var research_queue_string = [];

    tech_string.push(`**[Back]**`);
    tech_string.push("");

    research_queue_string.push(`Your current ${config.icons.building} **Research Queue** allows for the consecutive research of multiple technologies, even whilst asleep. As soon as a technology is researched, any valid technologies in the research queue will take its spot. You must have at least one active research slot for the Research Queue to work, and you may only queue up to **20** technologies.`);
    research_queue_string.push("");
    research_queue_string.push(`You currently have **${usr.research_queue.length}** items in your research queue.`);

    research_queue_string.push("");
    research_queue_string.push("---");
    research_queue_string.push("");
    (usr.research_queue.length < 20) ?
      research_queue_string.push(`**[Add Technology]** ¦ **[Remove Technology]**`) :
      research_queue_string.push(`**[Remove Technology]**`);
    if (usr.research_queue.length >= 20)
      research_queue_string.push(`\nYour **Research Queue** is currently full up! Considering removing a technology from your research queue if you wish to queue up something else.`);

    research_queue_string.push("");
    research_queue_string.push("---");
    research_queue_string.push("");

    if (usr.researching.length > 0) {
      if (usr.research_queue.length != 0) {
        for (var i = 0; i < usr.research_queue.length; i++) {
          var local_tech_obj = getTechnology(usr.research_queue[i]);
          var raw_technology_name = getTechnology(usr.research_queue[i], { return_key: true });

          var tech_icon = (local_tech_obj.icon) ? config.icons[local_tech_obj.icon] + "  ": "";
          var tech_name = (local_tech_obj.name) ? local_tech_obj.name : raw_technology_name;

          research_queue_string.push(`**${parseNumber(i + 1)}.** ${tech_icon} ${tech_name}`);
        }
      } else {
        research_queue_string.push(`_You currently have nothing queued up._`);
      }
    } else {
      research_queue_string.push(`_You must have a research slot that is actively researching something in order for your research queue to become functional! Consider switching over to your **[Current Research]** tab to begin researching something new. Check your **[Research List]** for a list of available technologies to research.`);
    }

    //Return statement
    return splitEmbed(research_queue_string, {
      title: "Research Queue:",
      title_pages: true,
      fixed_width: true
    });
  },

  printTechnology: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_technologies = getAllTechnologies();
    var all_tech_categories = Object.keys(config.technology);
    var knowledge_gain = getKnowledgeGain(user_id);
    var tech_array_dump = module.exports.printResearchList(actual_id, { return_names: true });

    //Declare tech_string
    var tech_string = [];

    //Format tech_string
    tech_string.push(`**Technological Advancement:**`);
    tech_string.push("");
    tech_string.push(`${config.icons.government} Current Tech Count: (**${parseNumber(usr.researched_technologies.length)}**/${parseNumber(all_technologies.length)})`);
    tech_string.push("");
    tech_string.push(`**[Research Possibilities]**:`);
    tech_string.push(config.localisation.divider);
    tech_string.push("");

    //Iterate over all categories and print how many techs in each have been researched
    for (var i = 0; i < all_tech_categories.length; i++) {
      var local_tech_category = config.technology[all_tech_categories[i]];
      var local_tech_category_icon = (local_tech_category.icon) ? config.icons[local_tech_category.icon] + " " : "";
      var local_tech_category_name = (local_tech_category.name) ? local_tech_category_name : parseString(all_tech_categories[i]);
      var researched_technologies_in_category = 0;
      var total_technologies_in_category = Object.keys(local_tech_category).length;

      var all_techs_in_category = Object.keys(local_tech_category);

      for (var x = 0; x < all_techs_in_category.length; x++)
        if (!["name", "icon", "description"].includes(all_techs_in_category[x])) {
          if (usr.researched_technologies.includes(all_techs_in_category[x]))
            researched_technologies_in_category++;
        } else {
          total_technologies_in_category--;
        }

      //Print to tech_string
      tech_string.push(` - ${local_tech_category_icon}${local_tech_category_name} Research Progress: (**${parseNumber(researched_technologies_in_category)}**/${parseNumber(total_technologies_in_category)})`);
    }

    tech_string.push("");
    tech_string.push(`${config.icons.technology} Knowledge Gain Per Turn: ${(Math.min(knowledge_gain[0], knowledge_gain[1]) > 0) ? "+" : ""}**${printRange(knowledge_gain)}**`);

    //Print tech research options
    for (var i = 0; i < tech_array_dump.length; i++)
      if (i < 5) {
        var local_tech_obj = getTechnology(tech_array_dump[i]);
        var local_tech_cost = getTechnologyCost(tech_array_dump[i]);

        var local_tech_name = (local_tech_obj.name) ? local_tech_obj.name : tech_array_dump[i];

        tech_string.push(`- ${(local_tech_obj.icon) ? config.icons[local_tech_obj.icon] + " " : ""}${local_tech_name} (${config.icons.knowledge} **${parseNumber(local_tech_cost)}**) **[Research ${local_tech_name}]**`);
      } else {
        if (i == 6)
          tech_string.push(`+${parseNumber(tech_array_dump.length - 5)} more ...`);
      }
    if (tech_array_dump.length == 0)
      tech_string.push(`_No available techs for research could be found._`);

    //Format research status
    tech_string.push("");
    tech_string.push(`**[Current Research]**:`);
    tech_string.push(config.localisation.divider);

    if (usr.researching.length > 0) {
      for (var i = 0; i < usr.researching.length; i++) {
        var local_tech_obj = getTechnology(usr.researching[i].technology);

        var local_tech_icon = (local_tech_obj.icon) ? config.icons[local_tech_obj.icon] + " " : "";
        var local_tech_name = (local_tech_obj.name) ? local_tech_obj.name : usr.researching[i].technology;

        tech_string.push(`**[Cancel Research]**`);
        tech_string.push(`**${i + 1}.** Currently researching ${local_tech_icon}**${local_tech_name}**.`);
        tech_string.push(`- Research Progress: **${parseNumber(usr.researching[i].current_investment)}/${parseNumber(usr.researching[i].total_research_cost)}**`);
        tech_string.push("");
      }
    } else {
      tech_string.push(`_You currently aren't researching anything!_`);
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const technology_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Technology:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(tech_string.join("\n"));

    game_obj.main_embed = technology_embed;
    game_obj.main_change = true;
  }
};
