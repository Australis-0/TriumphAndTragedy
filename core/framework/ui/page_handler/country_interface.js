module.exports = {
  pageHandlerCountryInterface: function (arg0_user, arg1_input) {
    //Convert from parameters
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

    //Country interface page handler
    if (["country_interface"].includes(game_obj.page)) {
      switch (input) {
        case "chop":
          initialiseChop(user_id);

          break;
        case "coup":
          visualPrompt(game_obj.alert_embed, user_id, {
            title: `Coup Government:`,
            prompts: [`What would you like to coup your current government to?\n\nType **[Government List]** for a list of valid governments.`, "string"]
          },
          function (arg) {
            coup(user_id, arg[0]);
          },
          function (arg) {
            switch (arg) {
              case "government list":
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printGovernmentList(user_id),
                  user: game_obj.user
                });
                return true;

                break;
            }
          });

          break;
        case "view customisation":
        case "customisation":
          printCustomisation(user_id);
          game_obj.page = "view_customisation";

          break;
        case "global commands":
          printGlobalCommands(user_id);
          game_obj.page = "global_commands";

          break;
        case "government list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printGovernmentList(user_id),
            user: game_obj.user
          });
          game_obj.page = "view_governments";

          break;
        case "mine":
          initialiseMine(user_id);

          break;
        case "quarry":
          initialiseQuarry(user_id);

          break;
        case "set government":
          initialiseSetGovernmentCommand(user_id);

          break;
        case "settle starting province":
        case "settle starting provinces":
          var has_no_provinces = (getProvinces(user_id, { include_hostile_occupations: true, include_occupations: true }).length == 0);

          if (has_no_provinces && !atWar(user_id))
            initialiseSettleStartingProvinces(user_id);

          break;
        case "view customisation":
          printCustomisation(user_id);
          game_obj.page = "view_customisation";

          break;
      }

      //[Chop (#)]
      if (input.startsWith("chop ")) {
        var amount_to_chop = parseInt(input.replace("chop ", "").trim());

        mine(user_id, amount_to_chop, "chop");
      }

      //[Mine (#)]
      if (input.startsWith("mine ")) {
        var amount_to_mine = parseInt(input.replace("mine ", "").trim());

        mine(user_id, amount_to_mine, "mine");
      }

      //[Quarry (#)]
      if (input.startsWith("quarry ")) {
        var amount_to_quarry = parseInt(input.replace("quarry ", "").trim());

        mine(user_id, amount_to_quarry, "quarry");
      }
    }

    if (game_obj.page == "global_commands") {
      //[Back]
      if (input == "back") {
        printStats(user_id);
        game_obj.page = "country_interface";
      }
    }

    if (game_obj.page == "national_modifiers") {
      var all_national_modifiers = Object.keys(usr.national_modifiers);

      //[Back]
      if (input == "back") {
        printStats(user_id);
        game_obj.page = "country_interface";
      }

      //[(#ID)]
      if (all_national_modifiers[Math.ceil(parseInt(input)) - 1])
        printNationalModifiers(user_id, input);

      //[View National Modifier]
      if (input == "view national modifier")
        initialisePrintNationalModiifer(user_id);
    }

    if (game_obj.page == "view_customisation") {
      //[Back]
      if (input == "back") {
        if (interfaces[game_obj.middle_embed.id].page == 0) {
          printStats(user_id);
          game_obj.page = "country_interface";
        } else {
          printDiplomacy(user_id);
          game_obj.page = "diplomacy";
        }
      }

      //[Rename Country]
      if (input == "rename country")
        initialiseRenameCountry(user_id);

      //[Rename Culture]
      if (input == "rename culture")
        initialiseRenamePrimaryCulture(user_id);

      //[Rename Culture Adjective]
      if (input == "rename culture adjective")
        initialiseRenameCultureAdjective(user_id);

      //[Set Colour]
      if (["set colour", "set color"].includes(input))
        initialiseSetColour(user_id);

      //[Set Flag]
      if (input == "set flag")
        initialiseSetFlag(user_id);

      //[Set Motto]
      if (input == "set motto")
        initialiseSetMotto(user_id);

      //Vassal customisation
      if (Object.keys(usr.diplomacy.vassals).length > 0) {
        //[Rename Vassal]
        if (input == "rename vassal")
          initialiseRenameVassal(user_id);

        //[Rename Vassal City]
        if (input == "rename vassal city")
          initialiseRenameVassalCity(user_id);

        //[Rename Vassal Culture]
        if (input == "rename vassal culture")
          initialiseRenameVassalCulture(user_id);

        //[Set Vassal Colour]
        if (input == "set vassal colour")
          initialiseSetVassalColour(user_id);

        //[Set Vassal Flag]
        if (input == "set vassal flag")
          initialiseSetVassalFlag(user_id);

        //[Set Vassal Motto]
        if (input == "set vassal motto")
          initialiseSetVassalMotto(user_id);
      }
    }
  }
};
