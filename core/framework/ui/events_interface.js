module.exports = {
  printEvents: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Print first page
    var events_string = [];

    events_string.push(`**Current Events:**`);
    events_string.push("");
    events_string.push(`**[View Event]**`);
    events_string.push("");

    //Go through all usr.events
    for (var i = 0; i < usr.events.length; i++)
      events_string.push(`**${i + 1}.** - ${(usr.events[i].icon) ? config.icons[usr.events[i].icon] + " " : ""}${usr.events[i].name} (${config.icons.time} ${parseNumber(usr.events[i].duration)})`);

    //No event text
    if (usr.events.length == 0)
      events_string.push(`_No current events require your attention!_`);

    //Split embed and push to event_embeds
    return splitEmbed(events_string, {
      title: "[Back] ¦ [Jump To Page] ¦ Event List:",
      title_pages: true,
      fixed_width: true
    });
  },

  printEvent: function (arg0_user, arg1_event) {
    //Convert from parameters
    var user_id = arg0_user;
    var event_obj = arg1_event;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare event string
    var event_embed;
    var event_string = [];

    //Add date string instead of just time remaining
    event_string.push(`---`);
    event_string.push("");
    event_string.push(`- **${getDate(event_obj.date)}**`);
    event_string.push(`- ${config.icons.time} **${parseNumber(event_obj.duration)}** turn(s) remaining`);
    event_string.push("");
    event_string.push(`---`);
    event_string.push("");

    if (event_obj.description)
      event_string.push(event_obj.description);

    for (var i = 0; i < event_obj.options.length; i++) {
      event_string.push("");
      event_string.push(`**[${event_obj.options[i].name}]**`);

      if (!event_obj.options[i].hide_description)
        (event_obj.options[i].description) ?
          event_string.push(`\n${parseLocalisation(event_obj.options[i].description.join("\n• "), { scopes: event_obj.options })}`) :
          event_string.push(`\n${parseLocalisation(event_obj.options[i].description, { scopes: event_obj.options })}`);
    }

    //Format embed
    event_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`[Back] ¦ ${event_obj.name}:`)
      .setThumbnail(event_obj.thumbnail ? event_obj.thumbnail : usr.flag)
      .setImage(event_obj.image ? event_obj.image: "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(event_string.join("\n"));

    //Push embed to game viewer
    game_obj.main_embed = event_embed;
    game_obj.main_change = true;
  }
};
