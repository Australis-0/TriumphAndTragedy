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
        var local_tech_icon = (local_tech.icon) ? local_tech.icon + " " : "";
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
        research_string.push(`${local_tech_icon} **${local_tech_name}**`)

        //Push research progress to string
        research_string.push("");
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

  printResearchList: function (arg0_user) { //[WIP] - Needs additional frameworks before effects parser is able to progress
    //Convert from parameters
    var user_id = arg0_user;

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
            prerequisite_techs++;

        if (prerequisite_techs == local_tech.prerequisite_techs.length)
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
            if (usr.researching[y].technology_name == local_tech_category[x])
              researching_status = `__Researching__`;

          for (var y = 0; y < usr.research_queue.length; y++)
            if (usr.research_queue[y].technology_name == local_tech_category[x])
              researching_status = `__Queued (#${y+1})__`;

          if (researching_status == "")
            researching_status = `¦ **[Research ${(local_tech.name) ? local_tech.name : local_tech_category[x]}]**`;

          //Push to tech_string
          tech_string.push(`${gfx_icon}**${(local_tech.name) ? local_tech.name : local_tech_category[x]}**: ${researching_status}`);

          if (local_tech.description)
            tech_string.push(`\n_${local_tech.description}_\n`);

          //Ahead of time penalty calculations (AOT)
          var aot_penalty = 0;
          var ahead_of_time_config = config.defines.technology.ahead_of_time;
          var final_aot_penalty = 1;
          var has_aot_penalty = false;

          for (var y = 0; y < ahead_of_time_config; y++)
            if (main.date.year >= ahead_of_time_config[y][0] && main.date.year < ahead_of_time_config[y][1])
              aot_penalty = 2/ahead_of_time_config[y][2];

          if (local_tech.year) {
            var aot_years = 0;

            if (main.date.year < local_tech.year) {
              has_aot_penalty = true;
              aot_years = local_tech.year - main.date.year;
              final_aot_penalty = (aot_years*aot_penalty) + 1;
            }
            tech_string.push(`- **Year:** ${config.icons.time} ${local_tech.year}`);
          }

          //Calculate total_research_cost
          var total_research_cost = Math.round(local_tech.research_cost*final_aot_penalty);

          tech_string.push(`- **Cost:** ${config.icons.knowledge} ${parseNumber(total_research_cost)}`);
          tech_string.push(`- **Effects:**`);

          //Push modifiers
          var all_modifiers = Object.keys(local_tech.unlocks);

          for (var y = 0; y < all_modifiers.length; y++) {
            var local_modifier = getList(local_tech.unlocks[all_modifiers[y]]);

            switch (all_modifiers[y]) {
              case "obsolete_building":
                for (var z = 0; z < local_modifier.length; z++)
                  tech_string.push(`Obsoletes **${(getBuilding(local_modifier[z]).name) > getBuilding(local_modifier[z]).name : local_modifier[z]}**`);

                break;
              case: "unlock_building":
                for (var z = 0; z < local_modifier.length; z++)
                  tech_string.push(`Unlocks **${(getBuilding(local_modifier[z]).name) ? getBuilding(local_modifier[z]).name : local_modifier[z]}**`);

                break;
              default:
                if (getModifier(all_modifiers[y])) {
                  var modifier_obj = getModifier(all_modifiers[y]);

                  //Fetch local tracker variables
                  var modifier_name = (modifier_obj.name) ? modifier_obj.name : all_modifiers[y];

                  //Push to tech_string
                  (modifier_obj.type == "percentage") ?
                    tech_string.push(`**${printPercentage(local_modifier[0] + 1, { display_prefix: true })}** ${modifier_name}`) :
                    tech_string.push(`**${parseNumber(local_modifier[0], { display_prefix: true })}** ${modifier_name}`);
                }
                break;
            }
          }

          //Print what other technologies the current tech leads to
          var leads_to_array = [];

          for (var y = 0; y < all_techs.length; y++) {
            var local_tech_obj = getTechnology(all_techs[y]);

            if (local_tech_obj.prerequisite_techs)
              if (local_tech_obj.indexOf(local_tech_category[x]))
                leads_to_array.push((local_tech_obj.name) ? local_tech_obj.name : all_techs[y]);
          }

          if (leads_to_array.length > 0)
            tech_string.push(`- **Leads to:** ${leads_to_array.join(", ")}`);

          //Insert newline as margin so that all the techs aren't bunched up next to each other
          tech_string.push("");
        }
      }

    //Return statement
    return splitEmbed(tech_string, {
      title: "Available Technologies:",
      title_pages: true,
      fixed_width: true
    });
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
      research_queue_string.push(`_You must have a research slot that is actively researching something in order for your research queue to become functional! Consider switching over to your **[Research]** tab to begin researching something new. Check your **[Research List]** for a list of available technologies to research.`);
    }

    //Return statement
    return splitEmbed(research_queue_string, {
      title: "Research Queue:",
      title_pages: true,
      fixed_width: true
    });
  }
};
