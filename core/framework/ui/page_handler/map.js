module.exports = {
  pageHandlerMap: function (arg0_user, arg1_input) {
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

    //Map page handler
    if (game_obj.page == "map") {
      //[(Province ID/Name)]
      var province_obj = getProvince(input);

      if (province_obj)
        createPageMenu(game_obj.alert_embed, {
          embed_pages: printProvince(user_id, arg[0]),
          user: game_obj.user
        });

      //[View Province]
      if (input == "view province")
        initialiseViewProvince(user_id, true);
    }
  }
};
