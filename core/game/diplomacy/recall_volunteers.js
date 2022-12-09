module.exports = {
  recallVolunteers: function (arg0_user, arg1_war_name, arg2_side, arg3_armies) { //[WIP] - Update UI
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;
    var armies = parseArmies(arg2_armies);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Check if user is even involved in the war
    if (war_obj) {
      if (war_obj[`${actual_id}_sent_volunteers`]) {
        //Check if user has any armies to recall
        var all_armies = Object.keys(usr.armies);
        var has_participant_army = false;

        for (var i = 0; i < all_armies.length; i++) {
          var local_army = usr.armies[all_armies[i]];

          if (local_army.volunteering)
            if (local_army.volunteering[1] == war_obj.id)
              has_participant_army = true;
        }

        if (has_participant_army) {
          if (armies.length > 0) {
            var nonexistent_armies = 0;
            var recalled_armies = 0;
            var total_recalled = 0;

            for (var i = 0; i < armies.length; i++) {
              var local_army = getArmy(user_id, armies[i]);

              if (local_army) {
                var local_army_size = getArmySize(user_id, local_army);

                delete local_army.volunteering;
                recalled_armies++;
                total_recalled += returnSafeNumber(local_army_size);
              } else {
                nonexistent_armies++;
              }
            }

            //Print user feedback
            if (recalled_armies != 0) {
              (recalled_armies == armies.length) ?
                printAlert(game_obj.id, `${config.icons.checkmark} You have successfully recalled **${parseNumber(armies.length)}** armies from serving as volunteers in the **${war_obj.name}**, or **${parseNumber(total_recalled)}** personnel.`) :
                printAlert(game_obj.id, `${config.icons.checkmark} You have recalled **${parseNumber(recalled_armies)}**/${parseNumber(armies.length)} queried volunteer armies from the theatre(s) of the **${war_obj.name}**.\n\nOf the missing armies, **${parseNumber(nonexistent_armies)}** were entirely nonexistent.`);
            } else {
              printError(game_obj.id, `None of the armies you have specified existed as coherent combat formations!`);
            }
          } else {
            printError(game_obj.id, `You must specify at least one valid army to send back home!`);
          }
        } else {
          printError(game_obj.id, `You currently have no volunteer armies participating in the **${war_obj.name}**!`);
        }
      } else {
        printError(game_obj.id, `You must **[Send Volunteers]** into a war first before being able to recall them!`);
      }
    } else {
      printError(game_obj.id, `The conflict you have specified, **${war_name}**, is either no longer ongoing, or has already ended!`);
    }
  }
};
