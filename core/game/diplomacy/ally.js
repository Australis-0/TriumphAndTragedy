module.exports = {
  ally: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if other user exists
    if (ot_user) {
      if (usr.modifiers.political_capital >= config.defines.diplomacy.form_alliance_cost) {
        //Check if ally is yourself, already an ally, or a rival
        if (!hasAlliance(actual_id, actual_ot_user_id)) {
          if (!hasRivalry(actual_id, actual_ot_user_id)) {
            if (actual_id != actual_ot_user_id) {
              //Check if an alliance is already pending
              var alliance_is_pending = false;
              var ot_user_has_alliance_pending = false;

              //Check if current user has a pending alliance
              if (usr.diplomacy.allies[actual_ot_user_id])
                if (usr.diplomacy.allies[actual_ot_user_id].status == "pending")
                  alliance_is_pending = true;

              //Check if ot_user has a pending alliance
              if (ot_user.diplomacy.allies[actual_id])
                if (ot_user.diplomacy.allies[actual_id].status == "pending")
                  ot_user_has_alliance_pending = true;

              if (!alliance_is_pending) {
                if (!ot_user_has_alliance_pending) {
                  //Check if relations are high enough
                  if (getRelations(actual_id, actual_ot_user_id)[0] >= config.defines.diplomacy.alliance_relation_threshold) {
                    if (usr.diplomacy.used_diplomatic_slots < usr.modifiers.diplomatic_slots) {
                      if (!getVassal(actual_id)) {
                        if (!getVassal(actual_ot_user_id)) {
                          //Pending alliances take 1 diplomatic slot and cost PC
                          usr.diplomacy.used_diplomatic_slots++;
                          usr.modifiers.political_capital -= config.defines.diplomacy.form_alliance_cost;

                          //Send diplomatic alert to other user
                          sendAlert(actual_ot_user_id, config.defines.diplomacy.alliance_alert_id, {
                            FROM: actual_id,
                            TO: actual_ot_user_id
                          });

                          //Declare pending alliance object
                          usr.diplomacy.allies[actual_ot_user_id] = {
                            id: actual_id,
                            status: "pending"
                          };
                          ot_user.diplomacy.allies[actual_id] = {
                            id: actual_id,
                            status: "pending"
                          };

                          //Print out user feedback
                          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully sent an alliance proposal to **${ot_user.name}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.form_alliance_cost)}** Political Capital. It should now appear in their alerts screen.`);
                        } else {
                          printError(game_obj.id, `You cannot ally the vassals of other countries!`);
                        }
                      } else {
                        printError(game_obj.id, `You cannot propose/accept alliances from other countries as a vassal of your overlord!`);
                      }
                    } else {
                      printError(game_obj.id, `You do not have enough diplomatic slots remaining to propose an alliance!`);
                    }
                  } else {
                    printError(game_obj.id, `You must have at least **${parseNumber(config.defines.diplomacy.alliance_relation_threshold, { display_prefix: true })}** Relations with **${ot_user.name}** in order to propose an alliance!`);
                  }
                } else {
                  printError(game_obj.id, `**${ot_user.name}** already has an alliance pending with you! Accept their alliance request in your Alerts screen to ally with them.`);
                }
              } else {
                printError(game_obj.id, `You already have an alliance request pending with **${ot_user.name}**!`);
              }
            } else {
              printError(game_obj.id, `You can't ally yourself!`);
            }
          } else {
            printError(game_obj.id, `You can't ally a rival!`);
          }
        } else {
          printError(game_obj.id, `You already have an alliance with **${ot_user.name}**!`);
        }
      } else {
        printError(game_obj.id, `You don't have enough Political Capital to propose an alliance! You must have at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.form_alliance_cost - usr.modifiers.political_capital)}** more Political Capital in order to form an alliance.`);
      }
    } else {
      printError(game_obj.id, `The country you are trying to conduct diplomatic relationships with does not exist!`);
    }
  },

  initialiseAlly: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Propose An Alliance:`,
      prompts: [
        [`Whom would you like to propose an alliance to?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.ally(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    });
  }
};
