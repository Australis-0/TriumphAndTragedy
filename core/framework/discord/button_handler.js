//Button handler
module.exports = {
  buttonHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;
    var user = interaction.user;

    var msg_id = interaction.message.id;
    var msg_obj = interaction.message;

    //Declare local instance variables
    var clear_components = false;

    if (interaction.isButton()) {
      var ui_obj;
      try {
        ui_obj = (interfaces[msg_id]) ? interfaces[msg_id] : interfaces[getGame(user.id)];
      } catch {}

      if (ui_obj) {
        if (ui_obj.user) {
          //Confirmation dialogue type
          switch (ui_obj.type) {
            case "confirm_dialogue":
              if (interaction.customId == "yes_btn") {
                //Edit embed to yes_text
                const new_embed_dialogue_prompt = new Discord.MessageEmbed()
                  .setColor("#2e292f")
                  .setDescription(ui_obj.yes_text);
                //Edit old message, remove buttons
                msg_obj.edit({ content: config.localisation.blank, embeds: [new_embed_dialogue_prompt], components: [] });
                if (ui_obj.execute) ui_obj.execute();

                //Automatically delete prompt, but only if told to
                deleteCheck(msg_obj);
              } else if (interaction.customId == "no_btn") {
                //Edit embed to no_text
                const new_embed_dialogue_prompt = new Discord.MessageEmbed()
                  .setColor("#2e292f")
                  .setDescription(ui_obj.no_text);
                //Edit old message, remove buttons
                msg_obj.edit({ content: config.localisation.blank, embeds: [new_embed_dialogue_prompt], components: [] });

                //Delete if prompted to
                deleteCheck(msg_obj);
              }
              break;
            case "game":
              //Topbar button handler
              topbarButtonHandler(interaction);
              ui_obj.last_active = new Date().getTime();

              break;
          }

          //Resolve button interaction successfully
          await interaction.update({ components: (clear_components) ? [] : interaction.message.components });
        }
      } else {
        //Update usr.last_queue_check
        if (!main.season_started)
          if (interaction.customId == "stay_in_queue") {
            var usr = main.users[main.global.user_map[user.id]];

            usr.last_queue_check = new Date().getTime();

            try {
              user.send(`You have successfully confirmed your activity. Next check is in **${parseNumber(config.defines.common.activity_check)}** day(s).`);
              await interaction.update({ components: [] });
            } catch (e) {
              console.log(e);
            }
          } else if (interaction.customId == "leave_the_queue") {
            try {
              user.send(`You have left this queue.`);
              await interaction.update({ components: [] });

              returnChannel(settings.alert_channel).send(`<@${user.id}> was dropped from the queue per request!`);
              deleteCountry(user.id);
              reinitialiseGameEmbeds();
            } catch (e) {
              console.log(e);
            }
          }
      }
    }
  }
};
