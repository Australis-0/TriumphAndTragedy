module.exports = {
  pageHandlerBudget: function (arg0_user, arg1_input) {
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

    //Budget handler
    if (game_obj.page == "budget") {
      //[Edit Tax Code]
      if (["edit taxes", "edit tax code"].includes(input)) {
        game_obj.page = "custom_taxes";
        printCustomTaxes(user_id, 0);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printBudget(user_id, 0, true).length }]
          ]
        },
        function (arg) {
          printBudget(user_id, arg[0] - 1);
        });

        return true;
      }

      //[Set Tax]
      if (input == "set tax") {
        initialiseSetTax(user_id);

        return true;
      }
    }

    if (game_obj.page == "custom_taxes") {
      //[Add Tax]
      if (input == "add tax") {
        initialiseAddTax(user_id);

        return true;
      }

      //[Back]
      if (input == "back") {
        game_obj.page = "budget";
        printBudget(user_id);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printCustomTaxes(user_id, 0, true).length }]
          ]
        },
        function (arg) {
          printCustomTaxes(user_id, arg[0] - 1);
        });

        return true;
      }

      //[Move Tax]
      if (input == "move tax") {
        initialiseMoveTax(user_id);

        return true;
      }

      //[Remove Tax]
      if (input == "remove tax") {
        initialiseRemoveTax(user_id);

        return true;
      }
    }
  }
};
