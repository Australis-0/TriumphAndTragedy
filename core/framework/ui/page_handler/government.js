module.exports = {
  pageHandlerGovernment: function (arg0_user, arg1_input) {
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

    //Government page handler
    if (game_obj.page == "view_governments") {
      switch (input) {
        case "back":
          printStats(user_id);
          game_obj.page = "country_interface";

          break;
        case "jump to page":
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like jump to?`, "number", { min: 1, max: printGovernmentList(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printGovernmentList(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            })
          });

          break;
      }
    }
  }
};
