module.exports = {
  checkActivityInQueue: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var user = client.users.cache.find(user => user.id.toString() == user_id);

    //Initialise check_string
    var check_string = [];

    check_string.push(`To keep your place in the queue, and your nation from automatically deleted, press the big 'I'm still here' button in green on the left. To leave the queue, press the red button on the right.`);

    const activity_check_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Keep Your Place In The Queue!**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(check_string.join("\n"));
    const confirmation_row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("stay_in_queue")
          .setLabel("I'm still here!")
          .setStyle("SUCCESS")
          .setEmoji("725550245051760671"),
        new Discord.MessageButton()
          .setCustomId("leave_the_queue")
          .setLabel("Leave")
          .setStyle("DANGER")
          .setEmoji("716829986266546187")
      )

    //Automatically drop them from the queue if they can't be reached
    var drop_from_queue = false;

    try {
      if (user != undefined)
        user.send({ embeds: [activity_check_embed], components: [confirmation_row] });
      else
        drop_from_queue = true;
    } catch (e) {
      drop_from_queue = true;
    }

    if (drop_from_queue) {
      deleteCountry(user_id);
      returnChannel(settings.alert_channel).send(`<@${user_id}> was dropped from the queue as they couldn't be reached. Please enable DM's from this server so that we can make sure you're still active!`);
    }
  }
};
