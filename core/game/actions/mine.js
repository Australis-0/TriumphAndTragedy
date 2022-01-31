module.exports = {
  initialiseMine: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Mine:`,
      prompts: [
        [`How many times would you like to mine?`, "number", { min: 1, max: usr.actions }]
      ]
    },
    function (arg) {
      module.exports.mine(actual_id, arg[0], "mine");
    });
  },

  mine: function (arg0_user, arg1_actions, arg2_mode) {
    //Convert from parameters
    var user_id = arg0_user;
    var actions = Math.ceil(arg1_actions);
    var mode = arg2_mode.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_resource_names = getGoods({ return_names: true });
    var all_resources = getGoods();
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check for any potenetial errors
    if (!isNaN(actions)) {
      if (usr.actions == 0) //Zero actions guard clause
        actions = 0;
      if (actions > 0) {
        var no_energy = (usr.actions < actions);

        actions = Math.min(actions, usr.actions);

        //Initialise chance arrays
        var mine_chances = [];
        var mined_resources = {};
        var output_string = [];
        var remaining_actions = JSON.parse(JSON.stringify(actions));
        var resource_gain_display = [];
        var total_mine_chance = 0;

        for (var i = 0; i < all_resources.length; i++)
          if (all_resources[i][`${mode}_action_chance`]) {
            mine_chances.push([all_resources[i][`${mode}_action_chance`], all_resource_names[i]]);
            total_mine_chance += all_resources[i][`${mode}_action_chance`];
          }

        for (var i = 0; i < mine_chances.length; i++)
          mine_chances[i][0] = mine_chances[i][0]/total_mine_chance;

        //Distribute actions; this is guaranteed to only execute 1-2 times
        while (remaining_actions > 0) {
          var current_element = randomElement(mine_chances);

          var amount_taken = Math.min(
            remaining_actions,
            Math.ceil((randomNumber(80, 120)/100)*current_element[0]*actions)
          );
          mined_resources[current_element[1]] = (mined_resources[current_element[1]]) ?
            mined_resources[current_element[1]] + amount_taken*5 :
            amount_taken*5;

          //Add to inventory; subtract from remaining_actions
          usr.inventory[current_element[1]] += amount_taken*5;
          remaining_actions -= amount_taken;

          usr.actions = usr.actions - actions;

          //Update stats/budget menu if user is on it
          if (game_obj.page == "country_interface")
            printStats(user_id);
          if (game_obj.page == "budget")
            printBudget(user_id);
        }

        //Format resource_gain_display
        var all_resources_gained = Object.keys(mined_resources);

        for (var i = 0; i < all_resources_gained.length; i++) {
          var local_good = getGood(all_resources_gained[i]);
          var local_value = mined_resources[all_resources_gained[i]];

          resource_gain_display.push(`${parseNumber(local_value)} ${(local_good.icon) ? config.icons[local_good.icon] : ""} ${(local_good.name) ? local_good.name : all_resources_gained[i]}`);
        }

        //Print out feedback
        output_string.push(`${(config.localisation[mode]) ? config.localisation[mode] : "You dug up"} ${parseList(resource_gain_display)}.`);

        if (no_energy)
          output_string.push(`${(config.localisation[mode + "_no_energy"]) ? config.localisation[mode + "_no_energy"] : "Your miners were too exhausted to continue mining!\nYou then proceeded to run out of actions."}`);

        //Print user alert
        printAlert(game_obj.id, output_string.join("\n"));

        //Return statement
        return mined_resources;
      } else if (actions == 0) {
        printError(game_obj.id, `${(config.localisation[mode + "_no_energy"]) ? config.localisation[mode + "_no_energy"] : "Your miners were too exhausted to continue mining!"}`)
      } else {
        printError(game_obj.id, `What?`);
      }
    } else {
      printError(game_obj.id, `${(config.localisation[mode + "_invalid_actions"]) ? config.localisation[mode + "_invalid_actions"] : "You have entered an invalid number of actions to mine with!"}`);
    }
  }
};
