module.exports = {
  pageHandlerTechnology: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Technology handler
    var ignore_research = ["research list", "research possibilities", "research queue"];

    if (game_obj.page == "research") {
      //[Back]
      if (input == "back") {
        printTechnology(user_id);
        game_obj.page = "technology";
      }

      //[Cancel Research]
      if (input.startsWith("cancel research ")) {
        var slot_to_cancel = parseInt(input.replace("cancel research ", ""));

        cancelResearch(user_id, slot_to_cancel);
      } else if (input == "cancel research") {
        initialiseCancelResearch(user_id);
      }

      //[View Research Queue]
      if (["research queue", "view research queue"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printResearchQueue(user_id),
          page: arg[0] - 1,
          user: game_obj.user
        });
        game_obj.page = "research_queue";
      }
    }

    if (game_obj.page == "research_list") {
      //[Back]
      if (input == "back") {
        printTechnology(user_id);
        game_obj.page = "technology";
      }

      //[Jump To Page]
      if (input == "jump to page")
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like jump to?`, "number", { min: 1, max: printResearchList(game_obj.user).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printResearchList(game_obj.user),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });
    }

    if (game_obj.page == "research_queue") {
      //[Add Technology]
      if (
        input.startsWith("add technology ") ||
        (input.startsWith("add ") && input != "add technology")
      ) {
        var tech_to_add = input
          .replace("add technology ", "")
          .replace("add ", "");

        addResearchQueue(user_id, tech_to_add);
      } else if (input == "add technology") {
        initialiseAddResearchQueue(user_id);
      }

      //[Back]
      if (input == "back") {
        printTechnology(user_id);
        game_obj.page = "technology";
      }

      //[Current Research]
      if (input == "current research") {
        printResearch(user_id);
        game_obj.page = "research";
      }

      //[Remove Technology]
      if (
        input.startsWith("remove technology ") ||
        (input.startsWith("remove ") && input != "remove technology")
      ) {
        var tech_to_remove = input.replace("remove technology ", "")
          .replace("remove ", "");

        removeResearchQueue(user_id, tech_to_add);
      } else if (input == "remove technology") {
        initialiseRemoveResearchQueue(user_id);
      }
    }

    if (technology_pages.includes(game_obj.page)) {
      //[Cancel Research]
      if (input.startsWith("cancel research ")) {
        var slot_to_cancel = parseInt(input.replace("cancel research ", ""));

        cancelResearch(user_id, slot_to_cancel);
      } else if (input == "cancel research") {
        initialiseCancelResearch(user_id);
      }

      //[Current Research]
      if (input == "current research") {
        printResearch(user_id);
        game_obj.page = "research";
      }

      //[Research List]; [Research Possibilities]
      if (input == "research possibilities" || input == "research list") {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printResearchList(user_id),
          user: game_obj.user
        });
        game_obj.page = "research_list";
      }

      //[Research]
      if (input == "research") {
        initialiseResearch(user_id);
      }

      //[Research (Tech)]
      if (input.startsWith("research ") && !ignore_research.includes(input)) {
        var tech_to_research = input.replace("research ", "");

        research(user_id, tech_to_research);
      }

      //[View Research Queue]
      if (["research queue", "view research queue"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printResearchQueue(user_id),
          page: arg[0] - 1,
          user: game_obj.user
        });
        game_obj.page = "research_queue";
      }
    }
  }
};
