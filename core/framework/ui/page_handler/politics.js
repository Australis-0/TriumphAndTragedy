module.exports = {
  pageHandlerPolitics: function (arg0_user, arg1_input) {
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

    //Politics page handler
    switch (game_obj.page) {
      case "cultures":
      case "culture":
        //Button handler
        //[Add Accepted Culture]
        if (input == "add accepted culture")
          initialiseAddAcceptedCulture(user_id);

        //[Assimilate ALl]
        if (input == "assimilate all")
          initialiseAssimilateAll(user_id);

        //[Back]
        if (input == "back") {
          printPolitics(user_id);
          game_obj.page = "politics";
        }

        //[Jump To Page]
        if (input == "jump to page")
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like to jump to?`, "number", { min: 1, max: printCultures(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printCultures(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            });
          });

        //[Remove Accepted Culture]
        if (input == "remove accepted culture")
          initialiseRemoveAcceptedCulture(user_id);

        //[Rename Culture]
        if (input == "rename culture")
          initialiseRenamePrimaryCulture(user_id);

        //[Rename Culture Adjective]
        if (input == "rename culture adjective")
          initialiseRenameCultureAdjective(user_id);

        break;
      case "reforms":
        //Button handler
        //[Back]
        if (input == "back") {
          game_obj.page = "politics";
          printPolitics(game_obj.user);
        }

        //[Enact (Reform Name)]
        if (input.startsWith("enact ")) {
          var law_to_enact = input.replace("enact ", "");
          enactReform(user_id, law_to_enact);
        } else if (input == "enact") {
          initialiseEnactReform(game_obj.user);
        }

        //[Jump To Page]
        if (input == "jump to page")
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like to jump to?`, "number", { min: 1, max: printReforms(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printReforms(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            });
          });

        //[(Reform Name)]
        if (getReform(input))
          printReform(user_id, input);

        break;
      default:
        //Button handler
        //[Coup]
        if (input == "coup")
          initialiseCoup(user_id);

        //[Set Government]
        if (input == "set government")
          initialiseSetGovernmentCommand(user_id);

        //[Support Party]
        if (input == "support party")
          initialiseSupportParty(user_id);

        //[Raise Stability]
        if (input == "raise stability")
          raiseStability(user_id);

        //[View Cultures]
        if (input == "view cultures") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printCultures(user_id),
            user: game_obj.user
          });
          game_obj.page = "cultures";
        }

        //[View Reforms]
        if (input == "view reforms") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printReforms(user_id),
            user: game_obj.user
          });
          game_obj.page = "reforms";
        }

        break;
    }
  }
};
