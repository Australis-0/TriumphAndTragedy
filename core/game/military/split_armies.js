module.exports = {
  splitArmies: function (arg0_user, arg1_original_army_name, arg2_armies) {
    //Convert from parameters
    var user_id = arg0_user;
    var original_army_name = arg1_original_army_name.trim();
    var armies_string = arg2_armies.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, original_army_name);
    var game_obj = getGameObject(user_id);
    var successful_army_creations = 0;
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if user has any armies to begin with
    if (all_armies.length > 0) {
      //Check if original army is valid
      if (army_obj) {
        //Check to see if armies_string is valid or not
        var new_armies = parseArmies(armies_string);
        var successful_army_creations = 0;

        if (new_armies.length > 0) {
          if (new_armies.length <= config.defines.combat.max_army_creation_limit || config.defines.combat.max_army_creation_limit == 0) {
            //Begin splitting off armies until hitting the maximum army limit
            for (var i = 0; i < new_armies.length; i++)
              successful_army_creations = (createArmy(actual_id, new_armies[i], army_obj.province)) ? successful_army_creations + 1 : successful_army_creations;

            //Error/success return message
            (successful_army_creations != 0) ?
              printAlert(game_obj.id, `You have successfully split off **${parseNumber(successful_army_creations)}** armies from the **${army_obj.name}**. ${(successful_army_creations != new_armies) ? `The remaining request of **${parseNumber(new_armies.length - successful_army_creations)}** armies exceeded your maximum army limit of **${parseNumber(config.defines.combat.max_army_limit)}**, and could therefore not be created.` : ""}`) :
              printError(game_obj.id, `No new armies could be split off from the **${army_obj.name}** due to having reached the maximum army limit of **${parseNumber(config.defines.combat.max_army_limit)}**!`);
          } else {
            printError(game_obj.id, `You may only split off up to **${parseNumber(config.defines.combat.max_army_creation_limit)}** armies at once, whilst you specified up to **${parseNumber(new_armies.length)}** armies for immediate creation!`);
          }
        } else {
          printError(game_obj.id, `The armies you have specified could not be created! Please check your formatting and numbering before trying again, or use **[Split Army]** to split off a singular new army.`);
        }
      } else {
        printError(game_obj.id, `The army you have specified, **${original_army_name}**, could not be found! Please check your spelling and spaces before attempting to split off armies from this unit again.\n\nType **[Army List]** to view a complete list of all your current combat formations.`);
      }
    } else {
      printError(game_obj.id, `You currently have no active armies deployed in the field! Try to create a new empty army by typing **[Create Army]** and deploying troops in it before attempting this command again.`);
    }
  }
};
