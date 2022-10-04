module.exports = {
  liftBlockade: function (arg0_user, arg1_army_name, arg2_do_not_display) { //[WIP] - Add to news
    //Convert from parameters
    var user_id = arg0_user;
    var fleet_name = arg1_army_name.trim();
    var do_not_display = arg2_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, fleet_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if the fleet even exists
    if (army_obj) {
      if (army_obj.type == "navy") {
        if (army_obj.is_blockading) {
          //Check to see which user the fleet is blockading
          var all_users = Object.keys(main.users);
          var blockade_index = ["", -1]; //[blockade_obj, blockade_index];

          for (var i = 0; i < all_users.length; i++) {
            var local_user = main.users[all_users[i]];

            if (local_user.blockaded)
              if (local_user.blockaded.fleets)
                for (var x = 0; x < local_user.blockaded.fleets.length; x++)
                  if (local_user.blockaded.fleets[x].fleet_id == army_obj.id)
                    blockade_index = [main.users[all_users[i]].blockaded, x];
          }

          //Remove fleet from array
          if (blockade_index[1] != -1) {
            var blockaded_user = JSON.parse(JSON.stringify(main.users[blockade_index[0].id]));

            //Splice from blockade
            blockade_index[0].fleets.splice(blockade_index[1], 1);

            army_obj.blockade_recovery_turns = config.defines.combat.blockade_cooldown;
            army_obj.status = "in harbour";
            delete army_obj.is_blockading;

            //Print user feedback
            if (blockade_index[0].fleets.length >= 1) {
              if (!do_not_display)
                printAlert(game_obj.id, `You have withdrawn the **${army_obj.name}** from the blockade on **${blockaded_user.name}**.`);
            } else {
              //Delete blockade
              deleteBlockade(blockade_index[0].id);

              if (!do_not_display)
                printAlert(game_obj.id, `You have ended your blockade on **${blockaded_user.name}**.`);
            }

            //Update army_list if user is currently viewing it
            if (game_obj.page == "army_list")
              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmyList(user_id),
                page: main.interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });
            //Update army page
            if (game_obj.page.includes("army_viewer_")) {
              var army_to_view = game_obj.page.replace("army_viewer_", "");

              createPageMenu(game_obj.middle_embed, {
                embed_pages: printArmy(user_id, army_to_view),
                page: interfaces[game_obj.middle_embed.id].page,
                user: game_obj.user
              });
            }
          }
        } else {
          if (do_not_display)
            printError(game_obj.id, `The **${army_obj.name}** isn't currently blockading anyone!`);
        }
      } else {
        printError(game_obj.id, `You can't enforce air/land blockades!`);
      }
    } else {
      if (!do_not_display)
        printError(game_obj.id, `You can't lift a blockade from a nonexistent navy! That's just not how this works ..`);
    }
  },

  initialiseLiftBlockade: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Lift Blockade:`,
      prompts: [
        [`Which fleet would you like to issue orders for lifting a blockade to?\n\nType **[Army List]** for a valid list of all fleets.`, "string"]
      ]
    },
    function (arg) {
      module.exports.liftBlockade(user_id, arg[0]);
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
      }
    });
  }
};
