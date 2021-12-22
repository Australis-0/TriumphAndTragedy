module.exports = {
  cancelResearch: function (arg0_user, arg1_slot) {
    //Convert from parameters
    var user_id = arg0_user;
    var slot_number = parseInt(arg1_slot) - 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if slot ID is a valid number or not
    if (!isNaN(slot_number)) {
      if (usr.researching[slot_number]) {
        var local_tech_obj = getTechnology(usr.researching[slot_number].technology);

        //Print feedback to user
        printAlert(game_obj.id, `You cancelled your current research of **${(local_tech_obj.name) ? local_tech_obj.name : usr.researching[slot_number].technology}** for Slot #**${slot_number}**.`);

        //Cancel the research slot
        usr.researching.splice(slot_number, 1);

        //Update UI
        if (game_obj.page == "research")
          printResearch(user_id);
      } else {
        printError(game_obj.id, `This research slot is either already empty, or you haven't defined the slot as a valid number!`);
      }
    } else {
      printError(game_obj.id, `You must specify a valid Research Slot in order to cancel any research! Check your **[Research]** menu for more information on which slots you can or cannot cancel.`);
    }
  },

  initialiseCancelResearch: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cancel A Research Slot:`,
      description: `Type **[Current Research]** to view a complete list of your current research efforts.`,
      prompts: [
        [`Please choose which research slot you would like to cancel. Remember to specify a numeric ID.`, "number", { min: 0 }],
      ]
    },
    function (arg) {
      cancelResearch(game_obj.user, arg[0]);
    },

    //Command handling
    function (input) {
      var is_command = false;

      switch (input) {
        case "current research":
          printResearch(game_obj.user);
          is_command = true;

        break;
      }

      return is_command;
    });
  },

  initialiseResearch: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Research Technology:`,
      description: `Type **[Research List]** to view a complete list of available technologies for research.`,
      prompts: [
        [`Type the name of a technology you would like to research.`, "string"]
      ]
    },
    function (arg) {
      research(game_obj.user, arg[0]);
    },

    //Command handling
    function (input) {
      var is_command = false;

      switch (input) {
        case "research list":
          printResearchList(game_obj.user);
          is_command = true;

          break;
      }

      return is_command;
    });
  },

  research: function (arg0_user, arg1_technology_name, arg2_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_technology_name = arg1_technology_name.toLowerCase();
    var display = arg2_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_technologies = getAllTechnologies();
    var all_technology_names = getAllTechnologies({ return_names: true });
    var can_research = false;
    var is_in_queue = false;
    var knowledge_gain = getKnowledgeGain(user_id);
    var tech_array_dump = [];
    var tech_name = getTechnology(raw_technology_name, { return_key: true });
    var tech_obj = getTechnology(raw_technology_name);

    //Check whether technology can be researched first before proceeding
    if (tech_obj) {
      //Process tech_array_dump
      for (var i = 0; i < all_technologies.length; i++) {
        var prerequisite_checks = 0;
        var tech_available = false;

        //Increment technologies based on what techs the user has already researched
        if (all_technologies[i].prerequisite_techs) {
          for (var x = 0; x < all_technologies[i].prerequisite_techs.length; x++)
            if (usr.researched_technologies.includes(all_technologies[i].prerequisite_techs[x]))
              prerequisite_checks++;

          //Check if user has fulfilled all prerequisites, or if it is a starting tech
          tech_available = (
            all_technologies[i].prerequisite_techs.length == prerequisite_checks ||
            all_technologies[i].prerequisite_techs.length == 0
          );
        } else {
          tech_available = true;
        }

        //Check if user has already researched tech
        tech_available = (usr.researched_technologies.includes(all_technology_names[i])) ? false : tech_available;

        //Append to tech dump for later categorisation
        if (tech_available)
          tech_array_dump.push(all_technology_names[i]);
      }

      //Check if user can research tech
      can_research = (tech_array_dump.includes(tech_name));

      for (var i = 0; i < usr.researching.length; i++)
        if (usr.researching[i].technology == tech_name)
          can_research = false;

      //Check if technology is in queue
      is_in_queue = (usr.research_queue.includes(tech_name));

      if (is_in_queue)
        can_research = false;

      //Only allow research if research is allowed and can be researched
      if (!is_in_queue) {
        if (can_research) {
          //Check if any spare research slots are available
          if (usr.researching.length < usr.modifiers.research_slots) {
            var knowledge_investment = config.defines.technology.max_knowledge_investment*usr.modifiers.knowledge_investment_limit;

            //Fetch total_research_cost
            var total_research_cost = getTechnologyCost(tech_name);

            if (usr.researching.length == 0)
              knowledge_investment = 1;

            //Make sure that current knowledge_gain stats are applicable for all research slots
            knowledge_gain = [
              Math.round(knowledge_gain[0]/(usr.researching.length + 1)*knowledge_investment),
              Math.round(knowledge_gain[1]/(usr.researching.length + 1)*knowledge_investment)
            ];

            //Format turn_string
            var turn_string = "";

            if (knowledge_gain[0] == 0 && knowledge_gain[1] == 0) {
              turn_string = "**forever**";
            } else if (knowledge_gain[0] == knowledge_gain[1]) {
              turn_string = `**${parseNumber(Math.ceil(total_research_cost/knowledge_gain[0]))}** turn(s)`;
            } else {
              turn_string = `**${parseNumber(Math.ceil(total_research_cost/knowledge_gain[0]))} - ${parseNumber(Math.ceil(total_research_cost/knowledge_gain[1]))}** turn(s)`;
            }

            //Print alert
            if (!display)
              printAlert(game_obj.id, `Your scientists have started research on **${(tech_obj.name) ? tech_obj.name : tech_name}**. Your advisor estimates that it will take them ${turn_string} to complete researching this technology.`);

            usr.researching.push({
              current_investment: 0,
              technology: tech_name,
              total_research_cost: total_research_cost
            });

            //Update UI
            if (game_obj.page == "research")
              printResearch(user_id);

            if (game_obj.page == "research_list")
              printRes

            //Return statement used for research_queue processing
            return true;
          } else {
            if (!display)
              printError(game_obj.id, `Your research slots are already full up! **${(tech_obj.name) ? tech_obj.name : tech_name}** was added to your queue instead. Next time, consider cancelling one of your current research slots, or queue up technologies manually in your **[Research Queue]**.`);
          }
        } else {
          if (!display)
            printError(game_obj.id, `You don't have the necessary prerequisites to research **${(tech_obj.name) ? tech_obj.name : tech_name}** yet!`);
        }
      } else {
        if (!display)
          printError(game_obj.id, `**${(tech_obj.name) ? tech_obj.name : tech_name}** is already in your research queue! Try cancelling it first in your **[Research Queue]** before adding it to your active research.`);
      }
    } else {
      if (!display)
        printError(game_obj.id, `**${raw_technology_name}** proved nonexistent! Try checking your **[Research List]** for a valid list of technologies you can research.`);
    }
  }
};
