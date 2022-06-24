module.exports = {
  initialisePrintAlert: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View Alert:`,
      prompts: [
        [`What is the ID/name of the alert you would like to view?\n\nType **[View Alerts]** to view a full list of your alerts.`, "string"]
      ]
    },
    function (arg) {
      var has_alert = [false, ""]; //[has_alert, alert_index];
      var requested_alert = arg[0].trim().toLowerCase();

      if (!isNaN(parseInt(arg[0])))
        if (usr.alerts[parseInt(arg[0]) - 1])
          has_alert = [true, parseInt(arg[0]) - 1];

      //Name search
      if (!has_alert[0]) {
        //Soft match
        for (var i = 0; i < usr.alerts.length; i++)
          if (usr.alerts[i].name.toLowerCase().indexOf(requested_alert) != -1)
            has_alert = [true, i];

        //Hard match
        for (var i = 0; i < usr.alerts.length; i++)
          if (usr.alerts[i].name.toLowerCase() == requested_alert)
            has_alert = [true, i];
      }

      if (has_alert[0]) {
        module.exports.printUserAlert(user_id, usr.alerts[has_alert[1]]);
        game_obj.page = `alert_${has_alert[1]}`;
      } else {
        printError(game_obj.id, `The alert you have specified, **${arg[0]}**, is not an alert you currently have to deal with!`);
      }
    },
    function (arg) {
      switch (arg) {
        case "view alerts":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: module.exports.printAlerts(game_obj.user),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  printAlerts: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Print first page
    var alerts_string = [];

    alerts_string.push(`**Current Alerts:**`);
    alerts_string.push("");
    alerts_string.push(`**[View Alert]**`);
    alerts_string.push("");

    //Go through all usr.alerts
    for (var i = 0; i < usr.alerts.length; i++)
      alerts_string.push(`**${i + 1}.** - ${(usr.alerts[i].icon ? config.icons[usr.alerts[i].icon] + " " : "")}${usr.alerts[i].name} (${config.icons.time} ${parseNumber(usr.alerts[i].duration)})`);

    //No alert text
    if (usr.alerts.length == 0)
      alerts_string.push(`_You have no current alerts that need attending to!_`);

    //Split embed and push to alert_embeds
    return splitEmbed(alerts_string, {
      title: "[Back] | [Jump To Page] | Alert List:",
      title_pages: true,
      fixed_width: true
    });
  },

  printUserAlert: function (arg0_user, arg1_alert) {
    //Convert from parameters
    var user_id = arg0_user;
    var alert_obj = arg1_alert;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare alert_string
    var alert_embed;
    var alert_string = [];

    //Add date string instead of just time remaining
    if (!alert_obj.news_alert) {
      alert_string.push(`---`);
      alert_string.push("");
      alert_string.push(` - **${getDate(alert_obj.date)}**`);
      alert_string.push(` - ${config.icons.time} **${parseNumber(alert_obj.duration)}** turn(s) remaining`);
      alert_string.push("");
      alert_string.push(`---`);
      alert_string.push("");

      if (alert_obj.description)
        alert_string.push(alert_obj.description);

      for (var i = 0; i < alert_obj.buttons.length; i++) {
        alert_string.push("");
        alert_string.push(`**[${alert_obj.buttons[i].name}]**`);

        if (!alert_obj.buttons[i].hide_description)
          if (alert_obj.buttons[i].description)
            (Array.isArray(alert_obj.buttons[i].description)) ?
              alert_string.push(`\n${parseLocalisation(alert_obj.buttons[i].description.join("\n• "), { scopes: alert_obj.options })}`) :
              alert_string.push(`\n${parseLocalisation(alert_obj.buttons[i].description, { scopes: alert_obj.options })}`);
      }

      //Format embed
      alert_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`[Back] | ${alert_obj.name}:`)
        .setThumbnail(alert_obj.thumbnail ? alert_obj.thumbnail : usr.flag)
        .setImage(alert_obj.image ? alert_obj.image : "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
        .setDescription(alert_string.join("\n"));
    } else {
      alert_embed = alert_obj.embed;
    }

    //Push embed to game viewer
    game_obj.main_embed = alert_embed;
    game_obj.main_change = true;
  }
};
