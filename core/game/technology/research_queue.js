module.exports = {
  addResearchQueue: function (arg0_user, arg1_technology_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_technology_name = arg1_technology_name.toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var is_in_queue = false;
    var is_in_research = false;
    var tech_name = getTechnology(raw_technology_name, { return_key: true });
    var tech_obj = getTechnology(raw_technology_name);

    //Check if tech exists first
    if (tech_obj) {
      //Check if tech is already in queue or is being researched; if so, the tech cannot be added onto the queue
      is_in_queue = (usr.research_queue.includes(tech_name));

      for (var i = 0; i < usr.researching.length; i++)
        if (usr.researching[i].technology == tech_name)
          is_in_research = true;

      if (usr.research_queue.length < 20) {
        if (!is_in_queue) {
          if (!is_in_research) {
            usr.research_queue.push(tech_name);

            //UI updater
            if (game_obj.page == "research_queue")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printResearchList(actual_id),
                page: interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });

            //Print user feedback
            printAlert(`You have successfully added **${(tech_obj.name) ? tech_obj.name : tech_name}** to your research queue.`);
          } else {
            printError(`You are already researching this item! Therefore, this technology could not be added to your queue.`);
          }
        } else {
          printError(`**${tech_name}** has already been added into your queue! Check your current queue for more information.`);
        }
      } else {
        printError(`You have already hit your maximum queue limit! Consider freeing up space by cancelling one of your queued items.`);
      }
    } else {
      printError(game_obj.id, `The tech you have specified proved as elusive as perpetual motion!`);
    }
  },

  initialiseAddResearchQueue: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);

    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Add Tech To Research Queue:`,
      description: `Type **[Research List]** to a view complete list of currently researchable technologies.`,
      prompts: [
        [`Please type out the name of the technology you would like to add to your **Research Queue**.`, "string"],
      ]
    },
    function (arg) {
      addResearchQueue(game_obj.user, arg[0]);
    },

    //Command handling
    function (input) {
      var is_command = false;

      switch (input) {
        case "research list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printResearchList(actual_id),
            user: game_obj.user
          });
          is_command = true;

        break;
      }

      return is_command;
    });
  },

  initialiseRemoveResearchQueue: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Remove Tech From Research Queue:`,
      description: `Type **[Research Queue]** to view your current research queue.`,
      prompts: [
        [`Which Resesarch Queue slot would you like to remove? Please specify a valid number.`, "number", { min: 1, max: 20 }],
      ]
    },
    function (arg) {
      removeResearchQueue(game_obj.user, arg[0]);
    },

    //Command handling
    function (input) {
      var is_command = false;

      switch (input) {
        case "research queue":
          printResearchQueue(game_obj.user);
          is_command = true;

        break;
      }

      return is_command;
    });
  },

  removeResearchQueue: function (arg0_user, arg1_slot) {
    //Convert from parameters
    var user_id = arg0_user;
    var slot_number = parseInt(arg1_slot) - 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if slot_number is actually a valid number or not
    if (!isNaN(slot_number)) {
      if (usr.research_queue[slot_number]) {
        var local_tech_obj = getTechnology(usr.research_queue[slot_number]);

        //UI updater
        if (game_obj.page == "research_queue")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printResearchList(actual_id),
            page: interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        //Print user feedback when slot is removed from research queue
        printAlert(game_obj.id, `You have removed **${(local_tech_obj.name) ? local_tech_obj.name : usr.research_queue[slot_number]}** from your research queue.`);

        //Remove tech from research queue
        usr.research_queue.splice(slot_number, 1);
      } else {
        printError(game_obj.id, `That slot was not a valid numeric ID! Check your research queue first to see which research orders can be cancelled.`);
      }
    } else {
      printError(game_obj.id, `You must specify a valid numeric ID! Try typing in an actual number next time.`);
    }
  }
};
