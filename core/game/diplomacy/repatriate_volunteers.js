module.exports = {
  initialiseRepatriateVolunteers: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Repatriate Volunteer Forces From War:`,
      prompts: [
        [`Which armed conflict would you like to withdraw your volunteer forces from?\n\nType **[Diplomacy]** for a full list of current military interventions.`, "string"]
      ]
    },
    function (arg) {
      module.exports.repatriateVolunteers(user_id, arg[0]);
    },
    function (arg) {
      switch (arg) {
        case "diplomacy":
          printDiplomacy(user_id);
          return true;

          break;
      }
    });
  },

  repatriateVolunteers: function (arg0_user, arg1_war_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = (typeof arg1_war_name != "object") ? arg1_war_name.trim().toLowerCase() : arg1_war_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = (typeof war_name != "object") ? getWar(war_name) : war_name;

    //Check if user is even involved in the war
    if (war_obj) {
      if (war_obj[`${actual_id}_sent_volunteers`]) {
        var all_armies = Object.keys(usr.armies);
        var friendly_side = JSON.parse(JSON.stringify(war_obj[`${actual_side}_sent_volunteers`]));
        var repatriated_armies = 0;

        //Delete involvement in war
        delete war_obj[`${actual_id}_sent_volunteers`];

        //Delete .volunteering from all volunteer armies engaged in this war
        for (var i = 0; i < all_armies.length; i++) {
          var local_army = usr.armies[all_armies[i]];

          if (local_army.volunteering)
            if (local_army.volunteering[1] == war_obj.id) {
              delete local_army.volunteering;
              repatriated_armies++;
            }
        }

        //Print user feedback
        printAlert(game_obj.id, `We have withdrawn **${parseNumber(repatriated_armies)}** volunteer armies from the ${friendly_side}' side of **${war_obj.name}**, and they will no longer participate in combat actions.${(config.defines.diplomacy.send_volunteer_armies_maintenance_cost) ? `\n\n${config.icons.political_capital} **${parseNumber(config.defines.diplomacy.send_volunteer_armies_maintenance_cost)}** Political Capital will be freed up each turn.` : ""}`);

        //Update UI's
        if (game_obj.page == "diplomacy")
          printDiplomacy(user_id);

        if (game_obj.page == "military")
          printMilitary(user_id, interfaces[game_obj.middle_embed.id].page);

        if (game_obj.page == "politics")
          printPolitics(user_id);

        if (game_obj.page.startsWith("view_war_")) {
          var war_name = game_obj.page.replace("view_war_", "");

          printWar(user_id, war_name);
        }

      } else {
        printError(game_obj.id, `You must have committed volunteers to the **${war_obj.name}** in the first place in order to repatriate them!`);
      }
    } else {
      printError(game_obj.id, `You can't repatriate your volunteers from a nonexistent conflict!`);
    }
  }
};
