module.exports = {
  printAlert: function (arg0_user, arg1_alert) { //[WIP] - Add date string to printAlert()
    //Convert from parameters
    var user_id = arg0_user;
    var alert_obj = arg1_alert;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare alert_string
    var alert_string = [];

    //[WIP] - Add date string instead of just time remaining
    alert_string.push(` - ${config.icons.time} **${parseNumber(alert_obj.duration)}** turn(s) remaining`);

    if (alert_obj.description)
      alert_string.push(alert_obj.description);

      for (var i = 0; i < alert_obj.buttons.length; i++) {
        alert_string.push("");
        alert_string.push(`**[${alert_obj.buttons[i].name}]**`);

        if (!alert_obj.buttons[i].hide_description)
          alert_string.push(`\n${alert_obj.buttons[i].description}`);
      }

    //Format embed
    const alert_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`[Back] ¦ ${alert_obj.title}:`)
      .setThumbnail(alert_obj.thumbnail ? alert_obj.thumbnail : usr.flag)
      .setImage(alert_obj.image ? alert_obj.image : "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(alert_string.join("\n"));

    game_obj.main_embed = alert_embed;
    game_obj.main_change = true;
  },

  printAlerts: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Print first page
    var first_page_string = [];
    first_page_string.push(`**Current Alerts:**`);
    first_page_string.push("");

    //Go through all usr.alerts
    for (var i = 0; i < usr.alerts.length; i++)
      first_page_string.push(`**${i + 1}.** - ${(usr.alerts[i].icon ? config.icons[usr.alerts[i].icon] + " " : "")}${usr.alerts[i].name} (${config.icons.time} ${parseNumber(usr.alerts[i].duration})`);

    //No alert text
    if (usr.alerts.length == 0)
      first_page_string.push(`_You have no current alerts that need attending to!_`);

    //Split embed and push to alert_embeds
    return splitEmbed(first_page_string, {
      title: "[Back] ¦ [Jump To Page] ¦ Alert List:",
      title_pages: true,
      fixed_width: true
    });
  }
};
