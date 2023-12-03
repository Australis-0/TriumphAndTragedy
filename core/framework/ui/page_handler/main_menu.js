module.exports = {
  pageHandlerMainMenu: function (arg0_user, arg1_input) {
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

    //Main Menu handler
    {
      //Handle current_page
      if (main.interfaces)
        if (main.interfaces[game_obj.middle_embed.id])
          current_page = returnSafeNumber(main.interfaces[game_obj.middle_embed.id].page);

      if (game_obj.main_menu_embed) {
        //[Resume Game]
        if (input == "resume game")
          closeMainMenu(user_id);

        //[Manage Co-Op]
        if (input == "manage co-op") {
          game_obj.old_page = JSON.parse(JSON.stringify(game_obj.page));
          game_obj.page = "coop_menu";

          printCoopMenu(user_id);
        }

        //[Resign]
        if (input == "resign")
          initialiseResign(user_id);

        //[Exit Game]
        if (["exit game", "quit game"].includes(input))
          clearGame(game_obj.id);

        if (game_obj.page == "coop_menu") {
          //[Back]
          if (input == "back") {
            game_obj.page = JSON.parse(JSON.stringify(game_obj.old_page));
            delete game_obj.old_page;

            printMainMenu(user_id);
          }

          //[Invite Player]
          if (input == "invite player")
            initialiseInvitePlayer(user_id);

          //[Kick Player]
          if (input == "kick player")
            initialiseKickPlayer(user_id);

          //[Kick (Player ID)]
          if (input.startsWith("kick ")) {
            var player_id = input.replace("kick ", "").trim();

            kickPlayer(user_id, parseMention(player_id));
          }

          //[Promote (Player ID)]
          if (input.startsWith("promote ")) {
            var player_id = input.replace("kick ", "").trim();

            promotePlayer(user_id, parseMention(player_id));
          }

          //[Transfer Leadership]
          if (input == "transfer leadership")
            initialiseTransferLeadership(user_id);
        }
      }
    }
  }
};
