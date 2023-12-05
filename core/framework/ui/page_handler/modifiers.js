module.exports = {
  pageHandlerModifiers: function (arg0_user, arg1_input) {
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

    //Modifiers page handler
    if (game_obj.page == "modifiers_list") {
      //[Back]
      if (input == "back") {
        game_obj.page = "country_interface";
        initialiseTopbar(user_id);
        printStats(user_id);

        return true;
      }

      //[Jump to Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printModifiers(game_obj.user).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printModifiers(game_obj.user, cache[game_obj.middle_embed.id]),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });

        return true;
      }

      //[Sort by Alphabetical]
      if (["alphabetical", "sort by alphabetical"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printModifiers(game_obj.user, "alphabetical"),
          user: game_obj.user
        });

        return true;
      }

      //[Sort by Impact]
      if (["impact", "sort by impact"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printModifiers(game_obj.user, "impact"),
          user: game_obj.user
        });

        return true;
      }

      //[Sort by Key]
      if (["key", "sort by key"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printModifiers(game_obj.user, "key"),
          user: game_obj.user
        });

        return true;
      }
    }

    if (game_obj.page == "temporary_modifiers_list") {
      //[Back]
      if (input == "back") {
        game_obj.page = "country_interface";
        initialiseTopbar(user_id);
        printStats(user_id);

        return true;
      }

      //[Jump to Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printTemporaryModifiers(game_obj.user).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printTemporaryModifiers(game_obj.user, cache[game_obj.middle_embed.id]),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });

        return true;
      }

      //[Sort by Alphabetical]
      if (["alphabetical", "sort by alphabetical"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printTemporaryModifiers(game_obj.user, "alphabetical"),
          user: game_obj.user
        });

        return true;
      }

      //[Sort by Chronological]
      if (["chronological", "sort by chronological"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printTemporaryModifiers(game_obj.user, "chronological"),
          user: game_obj.user
        });

        return true;
      }

      //[Sort by Duration]
      if (["duration", "sort by duration"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printTemporaryModifiers(game_obj.user, "duration"),
          user: game_obj.user
        });

        return true;
      }

      //[Sort by Impact]
      if (["impact", "sort by impact"].includes(input)) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printTemporaryModifiers(game_obj.user, "impact"),
          user: game_obj.user
        });

        return true;
      }
    }
  }
};
