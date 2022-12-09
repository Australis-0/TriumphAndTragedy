module.exports = {
  initialiseInterveneInWar: function (arg0_user, arg1_war_obj) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_obj = (typeof arg1_war_obj != "object") ? arg1_war_obj.trim().toLowerCase() : arg1_war_obj;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    (war_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Intervene in the ${war_obj.name}:`,
        prompts: [
          [`Which side would you like to intervene on? Please type either 'attacking' or 'defending'.`, "string"]
        ]
      },
      function (arg) {
        module.exports.interveneInWar(user_id, war_obj, arg[0]);
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Intervene in War:`,
        prompts: [
          [`Which war would you like to intervene in?\n\nType **[View Wars]** to view a list of all valid ongoing wars. You cannot already be in the target war.`, "string"],
          [`Which side would you like to intervene on? Please type either 'attacking' or 'defending'.`, "string"]
        ]
      },
      function (arg) {
        module.exports.interveneInWar(user_id, arg[0], arg[1]);
      });
  },

  interveneInWar: function (arg0_user, arg1_war_name, arg2_side) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;
    var side = arg2_side.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;
    var usr = main.users[actual_id];

    //Check if war exists
    if (war_obj) {
      //Check if user has enough political capital
      if (usr.modifiers.political_capital >= config.defines.diplomacy.intervene_in_war_cost) {
        //Check if war has been going on for long enough
        if (main.round_count - war_obj.starting_round >= config.defines.diplomacy.minimum_intervene_in_war_duration) {
          //Check if user is already involved in the war
          var involved_side = "";

          if (war_obj.attackers.includes(actual_id))
            involved_side = "attacking";
          if (war_obj.defenders.includes(actual_id))
            invovled_side = "defending";

          if (involved_side == "") {
            //Check if side is valid
            var friendly_side = "";

            if (["attacking", "attacker", "attackers", "aggressor", "aggressors", "offensive"].includes(side))
              friendly_side = "attackers";
            if (["defending", "defender", "defenders", "attacked", "defensive"].includes(side))
              friendly_side = "defenders";

            if (friendly_side != "") {
              //Subtract political capital; modify war_obj
              usr.modifiers.political_capital -= config.defines.diplomacy.intervene_in_war_cost;

              joinWar(user_id, friendly_side, war_obj);

              //Print user feedback
              printAlert(game_obj.id, `You have entered the **${war_obj.name}** on the **${(friendly_side == "attackers") ? "attacking" : "defending"}** side.`);

              //Update UI
              if (game_obj.page.startsWith("view_war_")) {
                var war_name = game_obj.page.replace("view_war_", "");

                printWar(user_id, war_name);
              }
            } else {
              printError(game_obj.id, `You must intervene on a valid side in this conflict! **${side}** was not recognised as a valid side. Try typing 'attacking' or 'defending' instead.`);
            }
          } else {
            printError(game_obj.id, `You are already involved in the **${war_obj.name}** on the **${involved_side}** side!`);
          }
        } else {
          printError(game_obj.id, `The **${war_obj.name}** has only been going on for **${parseNumber(main.round_count - war_obj.starting_round)}** turn(s)! Wars must go on for at least **${parseNumber(config.defines.diplomacy.minimum_intervene_in_war_duration)}** before non-combatants are allowed to intervene.`);
        }
      } else {
        printError(game_obj.id, `You don't have enough Political Capital to intervene in the **${war_obj.name}**! You require at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.intervene_in_war_cost)}** Political Capital to do so, meaning you require at least ${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.intervene_in_war_cost - usr.modifiers.political_capital)}** more Political Capital.`);
      }
    } else {
      printError(game_obj.id, `You can't intervene in a nonexistent conflict! **${war_name}** has either already ended, or never happened.`);
    }
  }
};
