module.exports = {
  initialiseChangeHomePort: function (arg0_user, arg1_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    (!army_name) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Change Home Port:`,
        prompts: [
          [`Which fleet would you like to relocate?\n\nType **[Army List]** to view a list of all combat formations.`, "string"],
          [`Where would you like the selected fleet to sail to and establish as a home port?\n\nType **[Province List]** to view a list of all your provinces. You may also choose provinces controlled either by allies, or that you have military access to.`, "string"]
        ]
      },
      function (arg) {
        var change_home_port = changeHomePort(user_id, arg[0], arg[1]);

        //Print feedback; update UI
        if (change_home_port[0]) {
          printAlert(game_obj.id, change_home_port[1]);

          //Update UI
          if (game_obj.page == "army_list")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          if (game_obj.page.includes("army_viewer_")) {
            var army_to_view = game_obj.page.replace("army_viewer_", "");

            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmy(user_id, army_to_view),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          }
        } else {
          printError(game_obj.id, change_home_port[1]);
        }
      },
      function (arg) {
        switch (arg) {
          case "army list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              user: game_obj.user
            });
            return true;

            break;
          case "province list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(user_id),
              user: game_obj.user
            });
            return true;

            break;
        }
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Change Home Port of the ${army_name}:`,
        prompts: [
          [`Which home port would you like to relocate the **${army_name}** to?\n\nType **[Province List]** to view a list of all your provinces.`, "string"]
        ]
      },
      function (arg) {
        var change_home_port(user_id, army_name, arg[0]);

        //Print feedback; update UI
        if (change_home_port[0]) {
          printAlert(game_obj.id, change_home_port[1]);

          //Update UI
          if (game_obj.page == "army_list")
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmyList(user_id),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          if (game_obj.page.includes("army_viewer_")) {
            var army_to_view = game_obj.page.replace("army_viewer_", "");

            createPageMenu(game_obj.middle_embed, {
              embed_pages: printArmy(user_id, army_to_view),
              page: main.interfaces[game_obj.middle_embed.id].page,
              user: game_obj.user
            });
          }
        } else {
          printError(game_obj.id, change_home_port[1]);
        }
      },
      function (arg) {
        switch (arg) {
          case "province list":
            createPageMenu(game_obj.middle_embed, {
              embed_pages: printProvinces(user_id),
              user: game_obj.user
            });
            return true;

            break;
        }
      });
  }
};
