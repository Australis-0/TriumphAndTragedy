module.exports = {
  carpetSiege: function (arg0_user, arg1_user, arg2_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var army_list = (arg2_armies && arg2_armies != "none") ?
      parseArmies(arg2_armies) : [];

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Make sure user is actually at war before carpet sieging
    if (areAtWar(user_id, ot_user_id)) {
      //Declare local instance variables, 2nd layer
      var all_armies = Object.keys(usr.armies);
      var failed_moves = 0;
      var missing_armies = 0;
      var nonexistent_armies = 0;
      var occupation_target_list = [];
      var ot_user_provinces = getProvinces(ot_user_id, { include_occupations: true });
      var successful_moves = 0;
      var targets_to_remove = [];

      //Add all provinces first
      for (var i = 0; i < ot_user_provinces.length; i++)
        occupation_target_list.push(ot_user_provinces[i].id);

      //Deselect provinces going to be occupied by other armies
      for (var i = 0; i < all_armies.length; i++) {
        var local_army = usr.armies[all_armies[i]];

        for (var x = 0; x < occupation_target_list.length; x++)
          if (local_army.moving_to[local_army.moving_to.length - 1] == occupation_target_list[x])
            occupation_target_list.splice(x, 1);
      }

      //Get acceptable armies as array
      var acceptable_armies = (army_list.length > 0) ? army_list : [];

      if (acceptable_armies.length == 0)
        //Acceptable armies are immediately just whatever land armies are not currently busy and have actual troops in them
        for (var i = 0; i < all_armies.length; i++) {
          var local_army = usr.armies[all_armies[i]];

          if (local_army.type == "army" && Object.keys(local_army.units).length > 0)
            if (usr.options.ignore_orders || local_army.order == "stationed")
              acceptable_armies.push(local_army);
        }

      //Begin moving armies
      for (var i = 0; i < occupation_target_list.length; i++)
        try {
          var local_army = getArmy(user_id, acceptable_armies[i]);

          if (local_army) {
            var army_status = moveArmy(user_id, local_army, occupation_target_list[i]);

            if (army_status)
              successful_moves++;
            else
              failed_moves++;

            targets_to_remove.push(occupation_target_list[i]);
          } else {
            nonexistent_armies++;
          }
        } catch (e) {
          log.error(`carpetSiege() failed with occupation target ${occupation_target_list[i]}: ${e}`);
          console.log(e);

          missing_armies++;
        }

      //Remove targets_to_remove from occupation_target_list
      for (var i = 0; i < targets_to_remove.length; i++)
        removeElement(occupation_target_list, targets_to_remove[i]);

      var required_armies = occupation_target_list.length - (all_armies.length - successful_moves - failed_moves);

      //Update army_list if user is currently viewing it
      if (game_obj.page == "army_list")
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printArmyList(user_id),
          page: main.interfaces[game_obj.middle_embed.id].page,
          user: game_obj.user
        });

      //Print out error/success message
      printAlert(game_obj.id, `You have successfully begun sending out **${parseNumber(successful_moves)}** armies to occupy **${ot_user.name}**.\n\nOf the **${parseNumber(successful_moves)}** total armies sent out, ${(failed_moves > 0 || missing_armies > 0) ? `**${parseNumber(nonexistent_armies)}** of the armies specified could not be found, and **${parseNumber(acceptable_armies.length - successful_moves)}** failed to move to their destinations.` : `all managed to successfully move to their destinations.`} ${(occupation_target_list.length > 0) ? `**${parseNumber(missing_armies)}** remaining armies are required to be created for the full occupation of **${ot_user.name}** out of **${parseNumber(ot_user.provinces)}** total.` : `**${ot_user.name}** will be fully occupied when all units arrive at their destination.`}`);
    } else {
      printAlert(game_obj.id, `You are not currently in a state of war with **${ot_user.name}**! **[Declare War]** first before trying to siege their entire country.`);
    }
  },

  initialiseCarpetSiege: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Carpet Siege:`,
      prompts: [
        [`Whom would you like to fully occupy?\n\nType **[View Ledger]** to view a ledger of all valid nations.`, "mention"],
        [`Which armies would you like to manually assign, if any?\n\nType **[Army List]** to view a list of all valid armies.\nType 'none' to use available armies instead.`, "string"]
      ]
    },
    function (arg) {
      module.exports.carpetSiege(user_id, arg[0], arg[1]);
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
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    });
  }
};
