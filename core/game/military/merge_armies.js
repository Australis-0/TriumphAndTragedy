module.exports = {
  initialiseMergeArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Merge Multiple Armies:`,
      prompts: [
        [`Please type out the names of the armies you'd like to merge.\nYou may specify armies like so: 'I.-XX. Division', '1st-20th Division', '86th-79th, 92nd, 94th Field Artillery'.\n\nType **[Army List]** to view a list of all valid armies.`, "string"],
        [`Which army would you like to merge these combat formations into?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
      ]
    },
    function (arg) {
      module.exports.mergeArmies(user_id, arg[0], arg[1]);
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
  },

  mergeArmies: function (arg0_user, arg1_merging_armies, arg2_merged_army) {
    //Convert from parameters
    var user_id = arg0_user;
    var merging_armies_string = arg1_merging_armies.trim();
    var merged_army_string = arg2_merged_army.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(actual_id, merged_army_string);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if user has any armies to begin with
    if (all_armies.length > 0) {
      if (army_obj) {
        var merging_armies_array = parseArmies(merging_armies_string);

        //Begin attempting to merge armies
        for (var i = 0; i < merging_armies_array.length; i++)
          mergeArmy(actual_id, merging_armies_array[i], merged_army_string);

        //How many armies were successfully merged?
        var current_armies = Object.keys(usr.armies).length;
        var successfully_merged = all_armies.length - current_armies;

        //Update army_list if user is currently viewing it
        if (game_obj.page == "army_list")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        //Display user success/error messages
        (all_armies.length == current_armies) ?
          printError(game_obj.id, `Your Military High Command were unable to merge all the specified armies into the **${army_obj.name}**! Make sure to check your spelling and formatting before trying again.`) :
          printAlert(game_obj.id, `You have successfully merged **${parseNumber(successfully_merged)}**/**${parseNumber(merging_armies_array.length)}** total requested armies into the **${army_obj.name}**.`);
      } else {
        printError(game_obj.id, `Your Military High Command were unable to find any military formation by the name of **${merged_army_string}** in your current Order of Battle!\n\nCheck your **[Army List]** for a full list of available combat formations.`);
      }

    } else {
      printError(game_obj.id, `You currently don't have any active armies in service that you can merge! Create some new ones by typing either **[Create Armies]** to create multiple armies, or by typing **[Create Army]** to create an individual army unit.`);
    }
  }
}
