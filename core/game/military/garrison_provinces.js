module.exports = {
  garrisonProvinces: function (arg0_user, arg1_armies) { //[WIP] - Code bulk of function
    //Convert from parameters
    var user_id = arg0_user;
    var army_list = parseArmies(arg1_armies);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_provinces = getProvinces(actual_id, { include_occupations: true });
    var failed_moves = 0;
    var game_obj = getGameObject(user_id);
    var missing_armies = 0;
    var nonexistent_armies = 0;
    var successful_moves = 0;
    var usr = main.users[actual_id];

    if (all_provinces.length > 0) {
      for (var i = 0; i < army_list.length; i++) {
        //Fetch target province index to divide armies evenly
        var target_province_index = 0;

        for (var x = 0; x < all_provinces.length; x++)
          target_province_index = (i % x == 0) ? x : target_province_index;

        console.log(`${army_list[i]} assigned to ${target_province_index}!`);

        try {
          var local_army = getArmy(actual_id, army_list[i]);

          if (local_army) {
            var army_status = moveArmy(actual_id, local_army.name, all_provinces[target_province_index].id);

            if (army_status[0])
              successful_moves++;
            else
              failed_moves++;
          } else {
            nonexistent_armies++;
          }
        } catch {
          missing_armies++;
        }
      }

      //Print out user feedback
      printAlert(game_obj.id, `You have successfully begun sending out **${parseNumber(successful_moves)}** armies to guard your province(s).\n\nOf the **${parseNumber(army_list.length - nonexistent_armies)}** total armies sent out, ${(failed_moves > 0 || missing_armies > 0) ? `**${parseNumber(nonexistent_armies)}** of the armies specified could not be found, and **${parseNumber(failed_moves)}** failed to move to their destinations.` : `all managed to successfully move to their destinations.`} ${(successful_moves < all_provinces.length) ? `**${parseNumber(missing_armies)}** remaining armies are required to be created for the full garrisoning  of all **${parseNumber(all_provinces.length)}** province(s) underneath your control.` : `All **${parseNumber(all_provinces.length)}** province(s) currently under your control will be garrisoned by **${parseNumber(successful_moves)}** armies.`}`);
    } else {
      printError(game_obj.id, `You can't guard imaginary provinces!`);
    }
  },

  initialiseGarrisonProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Garrison Provinces:`,
      prompts: [
        [`Please type out the names of the armies you'd like to garrison your provinces with. They should be distributed evenly between your provinces.\n\nType **[Army List]** to view a list of all valid armies.\nType 'none' to use available armies instead.`, "string"]
      ]
    },
    function (arg) {
      module.exports.garrisonProvinces(user_id, arg[0]);
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
