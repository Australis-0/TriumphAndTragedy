module.exports = {
  improveRelations: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = returnMention(ot_user_id);
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check if ot_user exists
    if (ot_user) {
      if (actual_id != actual_ot_user_id) {
        if (usr.modifiers.political_capital >= config.defines.diplomacy.improve_relations_cost) {
          //Check if user already has maximum relations with target country
          var current_relations = getRelations(user_id, ot_user_id);

          if (current_relations[0] < 100) {
            //Check if user is already improving their opinion of the target country
            if (current_relations.status != "improving") {
              //Subtract political capital and begin improving relations
              usr.modifiers.political_capital -= config.defines.diplomacy.decrease_relations_cost;

              modifyRelations(user_id, {
                target: ot_user_id,
                value: 50,
                duration: 5
              });

              //Status updater
              if (game_obj.page.startsWith("diplomacy_view_")) {
                var current_ot_user_id = game_obj.page.replace("diplomacy_view_", "");

                if (current_ot_user_id == actual_ot_user_id)
                  viewDiplomacy(user_id, current_ot_user_id);
              }

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have begun to improve your relations with **${ot_user.name}** to **${Math.min(current_relations[0] + 50, 100)}** for ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.improve_relations_cost)}** Political Capital.`);
            } else {
              printError(game_obj.id, `You are already currently improving your relations with **${ot_user.name}**! They will finish improving to **${parseNumber(current_relations.improving_to, { display_prefix: true })}** in **${parseNumber(current_relations.duration)}** turn(s).`);
            }
          } else {
            printError(game_obj.id, `You already have maximum **+100** Relations with **${ot_user.name}**!`);
          }
        } else {
          printError(game_obj.id, `You need ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.improve_relations_cost - usr.modifiers.political_capital)}** more Political Capital to improve relations with **${usr.name}**!`);
        }
      } else {
        printError(game_obj.id, `You can't improve relations with yourself, you narcissist!`);
      }
    } else {
      printError(game_obj.id, `The other country you have specified doesn't even exist!`);
    }
  },

  initialiseImproveRelations: function (arg0_user) {
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Improve Relations:`,
      prompts: [
        [`Which country would you like to improve relations with?\n\nType **[View Ledger]** to a view a ledger of all valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.improveRelations(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          printLedger(user_id);
          return true;

          break;
      }
    })
  }
};
