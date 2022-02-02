module.exports = {
  craft: function (arg0_user, arg1_amount, arg2_unit_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var raw_amount = arg1_amount;
    var unit_amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(unit_name, { return_key: true });
    var unit_obj = getUnit(unit_name);
    var usr = main.users[actual_id];

    //Check if usr, unit_obj exist
    if (usr) {
      if (unit_obj) {
        if (!isNaN(unit_amount)) {
          //Check if unit is unlocked or not
          if (usr.available_units.includes(raw_unit_name)) {
            //Make sure unit_amount is valid
            if (unit_amount >= 1) {
              //Check if user has enough resources to actually conduct training
              var raw_category_name = getUnitCategoryFromUnit(raw_unit_name, { return_key: true });
              var resource_shortages = {};
              var unit_costs = getUnitCost(actual_id, raw_unit_name, { amount: unit_amount });

              //Iterate over all keys in unit_costs and check for prospective shortages
              var all_goods = getGoods({ return_names: true });
              var all_pops = Object.keys(config.pops);
              var all_unit_costs = Object.keys(unit_costs);

              for (var i = 0; i < all_unit_costs.length; i++) {
                var local_cost = unit_costs[all_unit_costs[i]];

                //Check if resource cost is good, pop, or other
                if (all_goods.includes(all_unit_costs[i])) {
                  if (usr.inventory[all_unit_costs[i]] < local_cost)
                    resource_shortages[all_unit_costs[i]] = local_cost - usr.inventory[all_unit_costs[i]];
                } else if (all_pops.includes(all_unit_costs[i])) {
                  var available_pops = usr.pops[all_unit_costs[i]] - usr.pops[`used_${all_unit_costs[i]}`];

                  if (available_pops < local_cost)
                    resource_shortages[all_unit_costs[i]] = local_cost - available_pops;
                } else {
                  if (usr[all_unit_costs[i]] < local_cost)
                    resource_shortages[all_unit_costs[i]] = local_cost - usr[all_unit_costs[i]];
                }
              }

              //Check to see if anything is in resource_shortages. If so, print it out and return an error
              var all_resource_shortages = Object.keys(resource_shortages);

              if (all_resource_shortages.length == 0) {
                //Train units immediately since they have no training time
                var unit_name = (unit_obj.name) ? unit_obj.name : raw_unit_name;
                var unit_quantity = returnSafeNumber(unit_obj.quantity, 1);

                usr.reserves[raw_unit_name] += (unit_amount*unit_quantity);

                //Deduct unit_costs from inventory and other user metrics
                for (var i = 0; i < all_unit_costs.length; i++) {
                  var local_cost = unit_costs[all_unit_costs[i]];

                  //Check if resource cost is good, pop, or other
                  if (all_goods.includes(all_unit_costs[i])) {
                    usr.inventory[all_unit_costs[i]] -= local_cost;
                  } else if (all_pops.includes(all_unit_costs[i])) {
                    usr.pops[`used_${all_unit_costs[i]}`] += local_cost;
                  } else {
                    usr[all_unit_costs[i]] -= local_cost;
                  }
                }

                //Update reserves UI if user is currently on it
                if (game_obj.page == "reserves")
                  createPageMenu(game_obj.middle_embed, {
                    embed_pages: printReserves(user_id),
                    user: game_obj.user
                  });

                //Print alert
                printAlert(game_obj.id, `You have successfully trained **${parseNumber(unit_amount)}** ${(unit_amount == 1) ? "regiment" : "regiments"} of ${unit_name}!`);
              } else {
                //Print out resource shortages
                var shortage_array = [];

                for (var i = 0; i < all_resource_shortages.length; i++) {
                  var local_good = getGood(all_resource_shortages[i]);
                  var local_icon = "";
                  var local_shortage = resource_shortages[all_resource_shortages[i]];

                  //Determine icon
                  if (local_good)
                    local_icon = (local_good.icon) ? config.icons[local_good.icon] : "";
                  if (all_resource_shortages[i] == "money")
                    local_icon = config.icons.money;
                  if (config.pops[all_resource_shortages[i]]) {
                    var local_pop = config.pops[all_resource_shortages[i]];

                    if (local_pop.icon)
                      local_icon = config.icons[local_pop.icon];
                  }

                  console.log(local_icon);

                  shortage_array.push(`- ${local_icon} ${parseNumber(local_shortage)} ${(local_good) ? (local_good.name) ? local_good.name : all_resource_shortages[i] : ""}`);
                }

                printError(game_obj.id, `You don't have enough resources to train **${parseNumber(unit_amount)}** regiment(s) of ${(unit_obj.name) ? unit_obj.name : raw_unit_name}! You still require the following resources:\n\n${shortage_array.join("\n")}`);
              }
            } else if (unit_amount == 0) {
              printError(game_obj.id, `You can't train your units as alternate personalities of yourself. I say this as an alternate personality.`);
            } else {
              printError(game_obj.id, `You can't train negative units!`);
            }
          } else {
            printError(game_obj.id, `The unit you have specified for training is not yet currently unlocked by your nation!`);
          }
        } else {
          printError(game_obj.id, `You must specify an actual number of unit requests to file in for construction! **${raw_amount}** was not recognised as a valid number.`);
        }
      } else {
        printError(game_obj.id, `The unit you have specified does not exist!`);
      }
    } else {
      printError(game_obj.id, `You must have a country before being able to craft units!`);
    }
  },

  initialiseCraft: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Train Units:`,
      prompts: [
        [`What type of unit would you like to build?\n\nCheck your **[Unit List]** for a full list of available units to construct.`, "string"],
        [`How many units would you like to train?`, "number", { min: 1 }]
      ]
    },
    function (arg) {
      module.exports.craft(user_id, arg[1], arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "craft list":
        case "unit list":
          printUnitList(user_id);
          return true;

          break;
      }
    })
  }
};
