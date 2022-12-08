module.exports = {
  mergeWar: function (arg0_user, arg1_war_name, arg2_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var original_war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;
    var merged_war_name = (typeof arg2_war_name != "object") ? arg2_war_name.trim().toLowerCase() : arg2_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var merged_war_obj = (typeof merged_war_name != "object") ? getWar(merged_war_name) : merged_war_name;
    var original_war_obj = (typeof original_war_name != "object") ? getWar(original_war_name) : original_war_name;
    var usr = main.users[actual_id];

    //Check to make sure both wars exist
    if (original_war_obj) {
      if (merged_war_obj) {
        //Check to make sure user is a war leader in both wars
        if (
          (original_war_obj.attackers_war_leader == actual_id || original_war_obj.defenders_war_leader == actual_id) &&
          (merged_war_obj.attackers_war_leader == actual_id || merged_war_obj.defenders_war_leader == actual_id)
        ) {
          //Check to make sure user has enough political capital
          if (usr.modifiers.political_capital >= config.defines.diplomacy.merge_war_cost) {
            var merged_friendly_side = "";
            var merged_opposing_side = "";
            var original_friendly_side = "";
            var original_opposing_side = "";

            if (merged_war_obj.attackers.includes(actual_id)) {
              merged_friendly_side = "attackers";
              merged_opposing_side = "defenders";
            }
            if (merged_war_obj.defenders.includes(actual_id)) {
              merged_friendly_side = "defenders";
              merged_opposing_side = "attackers";
            }
            if (original_war_obj.attackers.includes(actual_id)) {
              original_friendly_side = "attackers";
              original_opposing_side = "defenders";
            }
            if (original_war_obj.defenders.includes(actual_id)) {
              original_friendly_side = "defenders";
              original_opposing_side = "attackers";
            }

            //Push users from merged_war_obj to original_war_obj; any users found on opposing sides will default to their original side in the original_war_obj
            for (var i = 0; i < merged_war_obj[merged_friendly_side].length; i++) {
              var local_id = merged_war_obj[merged_friendly_side][i];

              //Merge casualties
              original_war_obj[`${local_id}_casualties`] = Math.max(
                returnSafeNumber(original_war_obj[`${local_id}_casualties`]),
                returnSafeNumber(merged_war_obj[`${local_id}_casualties`])
              );

              //Merge participiants
              if (!original_war_obj[original_opposing_side].includes(local_id))
                if (!original_war_obj[original_friendly_side].includes(local_id))
                  original_war_obj[original_friendly_side].push(local_id);
            }
            for (var i = 0; i < merged_war_obj[merged_opposing_side].length; i++) {
              var local_id = merged_war_obj[merged_opposing_side][i];

              //Merge casualties
              original_war_obj[`${local_id}_casualties`] = Math.max(
                returnSafeNumber(original_war_obj[`${local_id}_casualties`]),
                returnSafeNumber(merged_war_obj[`${local_id}_casualties`])
              );

              //Merge participants
              if (!original_war_obj[original_opposing_side].includes(local_id))
                if (!original_war_obj[original_friendly_side].includes(local_id))
                  original_war_obj[original_opposing_side].push(local_id);
            }

            //Recalculate wargoals for both sides in original_war_obj by adding wargoals to one another
            var all_attacker_wargoals = Object.keys(merged_war_obj.attackers_wargoals);
            var all_defender_wargoals = Object.keys(merged_war_obj.defenders_wargoals);

            for (var i = 0; i < all_attacker_wargoals.length; i++) {
              var local_value = merged_war_obj.attackers_wargoals[all_attacker_wargoals[i]];

              if (!original_war_obj.attackers_wargoals[all_attacker_wargoals[i]])
                original_war_obj.attackers_wargoals[all_attacker_wargoals[i]] = 0;
              original_war_obj.attackers_wargoals[all_attacker_wargoals[i]] += local_value;
            }
            for (var i = 0; i < all_defender_wargoals.length; i++) {
              var local_value = merged_war_obj.defenders_wargoals[all_defender_wargoals[i]];

              if (!original_war_obj.defenders_wargoals[all_defender_wargoals[i]])
                original_war_obj.defenders_wargoals[all_defender_wargoals[i]] = 0;
              original_war_obj.defenders_wargoals[all_defender_wargoals[i]] += local_value;
            }

            //Recalculate total_casualties for both sides in original_war_obj
            var attacker_casualties = 0;
            var defender_casualties = 0;

            for (var i = 0; i < original_war_obj.attackers.length; i++)
              attacker_casualties += returnSafeNumber(original_war_obj[`${original_war_obj.attackers[i]}_casualties`]);
            for (var i = 0; i < original_war_obj.defenders.length; i++)
              defender_casualties += returnSafeNumber(original_war_obj[`${original_war_obj.defenders[i]}_casualties`]);

            original_war_obj.attacker_total_casualties = attacker_casualties;
            original_war_obj.defender_total_casualties = defender_casualties;

            //Print user feedback
            printAlert(game_obj.id, `We have successfully merged the **${merged_war_obj.name}** into the **${original_war_obj.name}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.merge_war_cost)}** Political Capital. All peace offers from the previous war have been cleared. Warscore will be recalculated next turn.`);

            //Update UI
            if (game_obj.page.startsWith("view_war_")) {
              var viewed_war = game_obj.page.replace("view_war_");

              if (getWar(viewed_war).id == merged_war_obj.id) {
                createPageMenu(game_obj.middle_embed, {
                  embed_pages: printWars(game_obj.user),
                  user: game_obj.user;
                });
                game_obj.page = "war_list";
              } else {
                printWar(user_id, viewed_war);
              }
            }

            //Delete merged_war_obj
            delete main.global.wars[merged_war_obj.id];
          } else {
            printError(game_obj.id, `We do not have enough Political Capital to merge the **${original_war_obj.name}** into the **${merged_war_obj.name}**! Merging wars requires at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.merge_war_cost)}** Political Capital, meaning we need another ${config.icons.political_capital} **${returnSafeNumber(config.defines.diplomacy.merge_war_cost - usr.modifiers.political_capital)}** Political Capital to merge these conflicts.`);
          }
        } else {
          (original_war_obj.attackers_war_leader == actual_id || original_war_obj.defenders_war_leader == actual_id) ?
            printError(game_obj.id, `You must be a war leader in both wars in order to merge these conflicts! You are not a war leader in the **${merged_war_obj.name}**.`) :
            printError(game_obj.id, `You must be a war leader in both wars in order to merge these conflicts! You are not a war leader in the **${original_war_obj.name}**.`);
        }
      } else {
        printError(game_obj.id, `You can't merge nonexistent wars into one another! **${merged_war_name}** could not be found as a valid conflict.`);
      }
    } else {
      printError(game_obj.id, `The conflict you have specified, the **${original_war_name}**, turned out to either be entirely inactive or nonexistent.`);
    }
  }
};
