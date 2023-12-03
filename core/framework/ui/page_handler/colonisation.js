module.exports = {
  pageHandlerColonisation: function (arg0_user, arg1_input) {
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

    //Colonisation handler
    switch (game_obj.page) {
      case "colonisation":
        //Button handler
        //[Cancel Charter #(Charter ID)]
        if (input.startsWith("cancel charter ")) {
          var charter_to_cancel = input.replace("cancel charter ", "")
            .replace("#", "");

          cancelCharter(user_id, charter_to_cancel);
        } else if (input == "cancel charter") {
          initialiseCancelCharter(user_id);
        }

        //[Jump To Page]
        if (input == "jump to page")
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like jump to?`, "number", { min: 1, max: printColonisation(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printColonisation(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            })
          });

        //[Reserves]
        if (input == "reserves") {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printReserves(user_id),
            user: game_obj.user
          });
          game_obj.page = "reserves";
        }

        //[Settle Starting Provinces]
        if (["settle starting province", "settle starting provinces"].includes(input)) {
          var has_no_provinces = (getProvinces(user_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

          if (has_no_provinces && !atWar(user_id))
            initialiseSettleStartingProvinces(user_id);
        }

        break;
      case "reserves":
        //Button handler
        //[Back]
        if (input == "back") {
          printMilitary(user_id);
          game_obj.page = "military";
        }

        //[Create Army]
        if (input == "create army")
          initialiseCreateArmy(user_id);

        //[Disband Units]
        if (input == "disband units")
          initialiseDisbandUnitsCommand(user_id);

        //[Jump To Page]
        if (input == "jump to page")
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Jump To Page:`,
            prompts: [
              [`Which page would you like jump to?`, "number", { min: 1, max: printColonisation(game_obj.user).length }]
            ]
          },
          function (arg) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printColonisation(game_obj.user),
              page: arg[0] - 1,
              user: game_obj.user
            });
          });

        //[Unit List]
        if (["craft list", "unit list"].includes(input)) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printUnitList(game_obj.user),
            user: game_obj.user
          });
          game_obj.page = "unit_list";
        }

        break;
      case "unit list":
        //Button handler
        //[Back]
        if (input == "back") {
          printColonisation(user_id);
          game_obj.page = "colonisation";
        }

        break;
    }
  }
};
