module.exports = {
  /*
    give() - Executes a give command by attempting to start a shipment of a certain number of goods to a target player.
    options: {
      hide_display: true/false - Whether or not to hide the display of the give command.
    }
  */
  give: function (arg0_user, arg1_receiving_user, arg2_amount, arg3_good_type, arg4_options) { //[WIP] - Update exports menu if user is currently in it
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_receiving_user;
    var raw_amount = parseInt(Math.ceil(arg2_amount));
    var raw_good_name = arg3_good_type.toLowerCase();
    var good_name = getGood(arg3_good_type, { return_key: true });
    var good_obj = getGood(arg3_good_type);
    var options = (arg4_options) ? arg4_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var ot_user_actual_id = returnMention(ot_user_id);
    var ot_user = main.users[ot_user_actual_id];
    var trade_display_whitelist = [];
    var trade_whitelist = getTradeWhitelist(user_id);
    var usr = main.users[actual_id];

    if (raw_good_name == "money")
      good_obj = {};

    //Render trade_display_whitelist
    for (var i = 0; i < trade_whitelist.length; i++)
      trade_display_whitelist.push(`**${main.users[trade_whitelist[i]].name}**`);

    //Check to make sure that user isn't giving goods to themselves
    if (ot_user) {
      if (actual_id != ot_user_actual_id) {
        if (!isNaN(raw_amount)) {
          if (raw_amount >= 0) {
            if (raw_amount > 0) {
              if (!good_obj.research_good) {
                if (!good_obj.doesnt_stack) {
                  if (!isBlockaded(user_id)) {
                    if (!isBlockaded(ot_user_actual_id)) {
                      //Check if user has enough shipment capacity
                      if (getShipmentCapacity(user_id) >= raw_amount || raw_good_name == "money") {
                        //Check if user has enough items to actually carry this out
                        if (
                          (raw_good_name == "money" && usr.money >= raw_amount) ||
                          (good_obj && getGoodAmount(user_id, good_name) >= raw_amount)
                        ) {
                          if (trade_whitelist.includes(ot_user_actual_id)) {
                            try {
                              //Fetch user variables
                              var distance = moveTo(getCapital(user_id).id, getCapital(ot_user_actual_id).id).length;
                              var amount_of_turns = Math.ceil(
                                config.defines.combat.base_transfer_time + (
                                  distance/config.defines.combat.shipment_time
                                )*usr.modifiers.shipment_time
                              );
                              var trade_id = generateTradeID(user_id, ot_user_actual_id);

                              if (good_obj || raw_good_name == "money") {
                                //Deduct goods from inventory first
                                if (good_obj)
                                  modifyGoodAmount(user_id, good_name, raw_amount);
                                if (raw_good_name)
                                  usr.money -= raw_amount;

                                //Append to trade object
                                usr.trades[trade_id] = {
                                  target: ot_user_id,
                                  exporter: actual_id,

                                  amount: raw_amount,
                                  good_type: (raw_good_name == "money") ?
                                    "money" :
                                    good_name,

                                  duration: amount_of_turns
                                };

                                var local_good_icon = (raw_good_name == "money") ?
                                  config.icons.money + " " :
                                  (getGood(good_name)) ?
                                    config.icons[getGood(good_name).icon] + " " :
                                    "";
                                var local_good_name;
                                try {
                                  local_good_name = (getGood(good_name)) ?
                                    getGood(good_name).name :
                                    good_name;
                                } catch {
                                  local_good_name = "Money";
                                }

                                if (!options.hide_display)
                                  printAlert(game_obj.id, `Your transports have begun to ship ${parseNumber(raw_amount)} ${local_good_icon}${local_good_name} to **${ot_user.name}**. They will arrive in **${parseNumber(amount_of_turns)}** turn(s).`);
                              } else {
                                if (!options.hide_display)
                                  printError(game_obj.id, `You may only ship inventory goods or money!`);
                              }
                            } catch {
                              if (!options.hide_display)
                                printError(game_obj.id, `**${ot_user.name}** does ot have a capital city capable of storing these items! Wait until they found a capital city first.`);
                            }
                          } else {
                            if (!options.hide_display)
                              printError(game_obj.id, `Our trade is currently being steered by the following countries! We are only allowed to trade with them.\n\n- ${trade_display_whitelist.join("\n- ")}`);
                          }
                        } else {
                          if (!options.hide_display)
                            printError(game_obj.id, `You were unable to ship these goods due to a shortage of items.`);
                        }
                      } else {
                        if (!options.hide_display)
                          printError(game_obj.id, `You don't have enough Shipment Capacity to transport this many items! You currently have **${parseNumber(getShipmentCapacity(user_id))}** remaining Shipment Capacity out of **${parseNumber(usr.modifiers.shipment_capacity)}** total, allowing you to only ship up to that many items.`);
                      }
                    } else {
                      if (!options.hide_display)
                        printError(game_obj.id, `You can't ship items to blockaded countries like that!`);
                    }
                  } else {
                    if (!options.hide_display)
                      printError(game_obj.id, `You can't give stuff to other users whilst under a blockade!`);
                  }
                } else {
                  if (!options.hide_display)
                    printError(game_obj.id, `You can't ship non-stackable items to other players!`);
                }
              } else {
                if (!options.hide_display)
                  printError(game_obj.id, `You can't ship knowledge to other players!`);
              }
            } else {
              if (!options.hide_display)
                printError(game_obj.id, `You can't give zero units of something!`);
            }
          } else {
            if (!options.hide_display)
              printError(game_obj.id, `You can't steal from other users like that!`);
          }
        } else {
          if (!options.hide_display)
            printError(game_obj.id, `You must give a valid numeric amount of stuff!`);
        }
      } else {
        if (!options.hide_display)
          printError(game_obj.id, `You can't give stuff to yourself!`);
      }
    } else {
      if (!options.hide_display)
        printError(game_obj.id, `The receiving country you have specified turned out to be nonexistent!`);
    }
  },

  initialiseGive: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Export Goods:`,
      prompts: [
        [`Which resource would you like to export?\n\nCheck your **[Inventory]** for a full list of your current goods.`, "string"],
        [`How many units of this good would you like to start transferring?`, "number", { min: 1 }],
        [`Whom would you like to give these goods to?\n\Type **[View Ledger]** for a full list of countries.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.give(user_id, arg[2], arg[1], arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "inventory":
          printInventory(user_id);
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
