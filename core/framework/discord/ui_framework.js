module.exports = {
  addSelectMenu: function (arg0_message_obj, arg1_options) {
    //Convert from parameters
    var msg = arg0_message_obj;
    var options = arg1_options;

    /*
      Options field:
      {
        id: "era_select_menu",
        options: [
          {
            label: "Renaissance",
            emoji: config.icons.renaissance,
            description: "1500-1618",
            value: "renaissance",

            effect: setEra("renaissance")
          }
        ],
        placeholder: "No starting era selected"
      }
    */

    //Declare local instance variables
    var select_menu = new Discord.MessageSelectMenu()
      .setCustomId(options.id)
      .setPlaceholder((!options.placeholder) ? `Select an option ..` : options.placeholder);

    //Add options
    for (var i = 0; i < options.options.length; i++) {
      select_menu.addOptions(options.options[i]);

      //Add effect
      selection_effect_map[`${msg.id}-${options.id}-${options.options[i].value}`] = options.options[i].effect;

      if (options.options[i].options)
        selection_effect_map[`${msg.id}-${options.id}-${options.options[i].value}-options`] = options.options[i].options;
    }

    //Add select menu to message
    var new_select_row = new Discord.MessageActionRow()
      .addComponents(select_menu);
    var new_component_array = msg.components;
      new_component_array.push(new_select_row);

    //Edit message
    msg.edit({ components: new_component_array })
  },

  confirmDialogue: function (arg0_message_obj, arg1_contents, arg2_function) {
    //Convert from parameters
    var message_id = arg0_message_obj;
    var contents = arg1_contents;
    var exec_function = arg2_function;

    //Declare local instance variables
    var default_contents = (contents.text) ? contents.text : "Are you sure?";
    var no_contents = (contents.text_no) ? contents.text_no : "Command cancelled.";
    var yes_contents = (contents.text_yes) ? contents.text_yes : "Got it!";

    //Add to interface
    interfaces[message_id.id] = {};
    interfaces[message_id.id].channel = message_id.channel.id;
    interfaces[message_id.id].id = message_id.id;
    interfaces[message_id.id].type = "confirm_dialogue";
    interfaces[message_id.id].user = (contents.user) ? contents.user : undefined;
    interfaces[message_id.id].delete_after = (contents.delete_after) ? contents.delete_after : undefined;
    interfaces[message_id.id].delete_after_delay = (contents.delete_after_delay) ? contents.delete_after_delay : undefined;
    interfaces[message_id.id].execute = exec_function;
    interfaces[message_id.id].no_text = no_contents;
    interfaces[message_id.id].yes_text = yes_contents;

    //Create prompt
    const embed_dialog_prompt = new Discord.MessageEmbed()
      .setColor('#2e292f')
      .setDescription(default_contents);

    //Add checkmark and cancel buttons
    const embed_btn_row_1 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("yes_btn")
          .setLabel("Yes")
          .setStyle("SECONDARY")
          .setEmoji("725550245051760671"),
        new Discord.MessageButton()
          .setCustomId("no_btn")
          .setLabel("No")
          .setStyle("SECONDARY")
          .setEmoji("725550245672517734")
      );

    message_id.edit({ content: config.localisation.blank, embeds: [embed_dialog_prompt], components: [embed_btn_row_1]});
  },

  createPageMenu: function (arg0_message_obj, arg1_options) {
    //Convert from parameters
    var msg = arg0_message_obj;
    var options = arg1_options;

    //Declare local instance variables
    var starting_page = 0;

    starting_page = (options.page) ? options.page : starting_page;
    starting_page = (options.starting_page) ? options.starting_page : starting_page;

    if (options.embed_pages) {
      if (options.user) {
        //Add to interface
        interfaces[msg.id] = {};
        var ui_obj = interfaces[msg.id];

        ui_obj.channel = msg.channel.id;
        ui_obj.type = "page_menu";
        
        ui_obj.debug = (options.debug);
        ui_obj.embed_array = options.embed_pages;
        ui_obj.page = starting_page;
        ui_obj.user = options.user;

        //Create first embed
        if (starting_page == 0) {
          ui_obj.current_emoji_type = "first_page";
          msg.edit({ embeds: [options.embed_pages[starting_page]] }).then((message) => {
            removeAllReactions(msg);
            if (options.embed_pages.length > 1) message.react("➡️");
          });
        } else if (starting_page == options.embed_pages[options.embed_pages.length-1]) {
          ui_obj.current_emoji_type = "in_between";
          msg.edit({ embeds: [options.embed_pages[starting_page]] }).then((message) => {
            removeAllReactions(msg);
            if (options.embed_pages.length > 1) message.react("⬅️");
          });
        } else {
          ui_obj.current_emoji_type = "last_page";
          msg.edit({ embeds: [options.embed_pages[starting_page]] }).then((message) => {
            removeAllReactions(msg);
            if (options.embed_pages.length > 1) message.react("⬅️")
              .then(() => message.react("➡️"));
          });
        }
      } else {
        log.error("createPageMenu() encountered an error: 'user' object was not defined!");
      }
    } else {
      log.error("createPageMenu() encountered an error: 'embed_pages' was not defined!");
    }
  },

  formatEmbed: function (arg0_embed_key, arg1_all_embeds, arg2_page_ending, arg3_options) {
    //Convert from parameters
    var local_embed = arg0_embed_key;
    var all_embeds = arg1_all_embeds;
    var page_ending = arg2_page_ending;
    var options = arg3_options;

    //Modify embed
    if (options.footer)
      (Array.isArray(options.footer)) ?
        local_embed.setFooter(options.footer[all_embeds.length]) :
        local_embed.setFooter(options.footer);
    if (options.set_timestamp) local_embed.setTimestamp();
    if (options.thumbnail)
      (Array.isArray(options.thumbnail)) ?
        local_embed.setThumbnail(options.thumbnail[all_embeds.length]) :
        local_embed.setThumbnail(options.thumbnail);
    if (options.title)
      (Array.isArray(options.title)) ?
        local_embed.setTitle(`**${options.title[all_embeds.length]} ${page_ending}**\n${config.localisation.divider}`) :
        local_embed.setTitle(`**${options.title} ${page_ending}**\n${config.localisation.divider}`);

    if (options.fixed_width)
      local_embed.setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    all_embeds.push(local_embed);
  },

  getGame: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var already_in_game = [false, ""];

    //Check if user already has a game open
    for (var i = 0; i < all_interfaces.length; i++) already_in_game = (interfaces[all_interfaces[i]].type == "game" && interfaces[all_interfaces[i]].user == user_id && !interfaces[all_interfaces[i]].embed_array) ? [true, all_interfaces[i]] : already_in_game;

    //Return statement
    return (already_in_game[0]) ? already_in_game[1] : undefined;
  },

  getGameFromChannelID: function (arg0_channel_id) {
    //Convert from parameters
    var channel_id = arg0_channel_id;

    //Declare local instance variables
    var all_interfaces = Object.keys(interfaces);
    var already_in_game = [false, ""];

    //Check if game interface has channel of channel_id
    for (var i = 0; i < all_interfaces.length; i++) already_in_game = (interfaces[all_interfaces[i]].type == "game" && interfaces[all_interfaces[i]].channel == channel_id) ? [true, all_interfaces[i]] : already_in_game;

    //Return statement
    return (already_in_game[0]) ? already_in_game[1] : undefined;
  },

  getGameObject: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Return statement
    return interfaces[module.exports.getGame(user_id)];
  },

  initialiseControlPanel: function (arg0_game_id, arg1_type) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var panel_type = arg1_type;

    //Declare local instance variables
    var game_obj = interfaces[game_id];

    //Remove all reactions if they exist
    try {
      game_obj.middle_embed.removeAll();
      game_obj.middle_control_panel.removeAll();
      game_obj.bottom_control_panel.removeAll();
    } catch {}

    //Add collector reactions
    try {
      switch (panel_type) {
        case "map":
          game_obj.middle_embed.react("⏫")
            .then(() => { game_obj.middle_embed.react("⬆️"); })
            .then(() => { game_obj.middle_embed.react("785931430215155754"); })
            .then(() => { game_obj.middle_embed.react("716811246556545035"); }) //Political
            .then(() => { game_obj.middle_embed.react("716817688525275257"); }); //Atlas
          game_obj.middle_control_panel.react("⬅️")
            .then(() => { game_obj.middle_control_panel.react("🔘"); } )
            .then(() => { game_obj.middle_control_panel.react("➡️"); } )
            .then(() => { game_obj.middle_control_panel.react("716821194891853826"); } ); //Colonisation
          game_obj.bottom_control_panel.react("⏬")
            .then(() => { game_obj.bottom_control_panel.react("⬇️"); } )
            .then(() => { game_obj.bottom_control_panel.react("785931430407700482"); } )
            .then(() => { game_obj.bottom_control_panel.react("773451853534986241"); }); //Supply

          break;
        default:
          game_obj.middle_embed.react("⏫")
            .then(() => { game_obj.middle_embed.react("⬆️"); })
            .then(() => { game_obj.middle_embed.react("785931430215155754"); });
          game_obj.middle_control_panel.react("⬅️")
            .then(() => { game_obj.middle_control_panel.react("🔘"); } )
            .then(() => { game_obj.middle_control_panel.react("➡️"); } );
          game_obj.bottom_control_panel.react("⏬")
            .then(() => { game_obj.bottom_control_panel.react("⬇️"); } )
            .then(() => { game_obj.bottom_control_panel.react("785931430407700482"); } );

          break;
      }
    } catch {}
  },

  printAlert: function (arg0_game_id, arg1_message, arg2_clear, arg3_never_clear) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var msg = arg1_message;
    var clear_array = arg2_clear;
    var never_clear = arg3_never_clear;

    //Declare local instance variables
    var game_obj = interfaces[game_id];

    //Error trapping
    try {
      //Clear alert array if prompted to do so
      game_obj.alert_array = (clear_array) ? [] : game_obj.alert_array;

      game_obj.alert_array.push(msg);
      game_obj.alert_change = true;

      setTimeout(function(){
        for (var i = 0; i < game_obj.alert_array.length; i++)
          if (game_obj.alert_array[i] == msg && !never_clear)
            game_obj.alert_array.splice(i, 1);

        game_obj.alert_change = true;
      }, 15000);
    } catch {}
  },

  printError: function (arg0_game_id, arg1_message) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var msg = arg1_message;

    printAlert(game_id, ":warning: " + msg);
  },

  removeControlPanel: function (arg0_game_id) {
    //Convert from parameters
    var game_id = arg0_game_id;

    //Declare local instance variables
    var game_obj = interfaces[game_id];

    //Remove map viewer
    if (game_obj.map)
      delete game_obj.map;

    //Remove all reactions
    try {
      game_obj.middle_embed.reactions.removeAll();
    } catch {}
    try {
      game_obj.middle_control_panel.reactions.removeAll();
    } catch {}
    try {
      game_obj.bottom_control_panel.reactions.removeAll();
    } catch {}
  },

  sendPlainEmbed: function (arg0_message_obj, arg1_contents) {
    //Convert from parameters
    var message_id = arg0_message_obj;
    var contents = arg1_contents;

    //Send simple embed if contents are valid
    if (typeof contents == "string" || typeof contents == "number") {
      const embed_simple = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setDescription(contents);

      message_id.channel.send({ embeds: [embed_simple] });
    }
  },

  splitEmbed: function (arg0_array, arg1_options) {
    //Convert from parameters
    var array_string = arg0_array;
    var options = arg1_options;

    //Declare local instance variables
    var all_embeds = [];
    var is_fixed_width = (options.fixed_width);
    var local_array_string = [];
    var maximum_characters_per_embed = (options.maximum_characters) ? options.maximum_characters : 3500;
    var total_page_count = 0;

    //Maximum fields reduction
    if (options.maximum_fields && options.table_width != 2)
      options.maximum_fields--;

    //Error trapping
    try {
      //Split by fields if requested
      if (options.maximum_fields) {
        //Split embeds based on fields
        if (options.fields) {
          var total_page_count = Math.ceil(options.fields.length/options.maximum_fields);

          for (var i = 0; i < total_page_count; i++)
            for (var x = 0; x < options.maximum_fields; x++)
              try {
                var index = i*options.maximum_fields;

                if (options.table_width == 2)
                  if ((x + 1) % 2 == 0)
                    local_array_string.push({ name: '\u200b', value: '\u200b', inline: true });

                local_array_string.push(options.fields[index + x]);

                if (x != 0 || options.fields.length == 1)
                  if (x % (options.maximum_fields - 1) == 0) {
                    //Initialise page embed
                    var local_embed = new Discord.MessageEmbed()
                      .setColor(settings.bot_colour)
                      .setDescription(array_string.join("\n"));

                    //Declare local options variables
                    var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length + 1} of ${parseNumber(total_page_count)}):` : "";

                    formatEmbed(local_embed, all_embeds, page_ending, options);

                    //Add fields
                    for (var y = 0; y < local_array_string.length; y++)
                      local_embed.addFields(local_array_string[y]);

                    local_array_string = [];
                  }
              } catch {}
        }
      } else {
        //Split by lines if maximum_lines argument is specified, but split by characters otherwise
        if (!options.maximum_lines) {
          var current_character_count = 0;

          //Fetch total page count
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);
            current_character_count += array_string[i].length;

            if (i != 0 || array_string.length == 1)
              if (
                current_character_count >= maximum_characters_per_embed || i == array_string.length-1 &&

                //Check to see that string is not empty
                local_array_string.join("\n").length > 0
              ) {
                total_page_count++;
                current_character_count = 0;
                local_array_string = [];
              }
          }

          //Reset variables
          current_character_count = 0;
          local_array_string = [];

          //Split embeds based on characters
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);
            current_character_count += array_string[i].length;

            if (i != 0 || array_string.length == 1)
              if (
                //Check if page requirements are met
                current_character_count >= maximum_characters_per_embed || i == array_string.length-1 &&

                //Check to see that string is not empty
                local_array_string.join("\n").length > 0
              ) {
                //Initialise page embed
                var local_embed = new Discord.MessageEmbed()
                  .setColor("#a98ac7")
                  .setDescription(
                    ((options.description) ?
                      "\n" + options.description.join("\n") :
                      "") +
                    local_array_string.join("\n")
                  );

                //Declare local options variables
                var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length+1} of ${total_page_count}):` : "";

                formatEmbed(local_embed, all_embeds, page_ending, options);
                current_character_count = 0;
                local_array_string = [];
              }
          }
        } else {
          //Split embeds based on lines
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);

            if (i != 0 || array_string.length == 1)
              if (i % options.maximum_lines == 0 || i == array_string.length-1) {
                //Initialise page embed
                var local_embed = new Discord.MessageEmbed()
                  .setColor("#a98ac7")
                  .setDescription(local_array_string.join("\n"));

                //Declare local options variables
                var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length+1} of ${total_page_count}):` : "";

                formatEmbed(local_embed, all_embeds, page_ending, options);
                local_array_string = [];
              }
          }
        }
      }

      //Return statement
      return all_embeds;
    } catch (e) {
      log.error(`Ran into an error whilst parsing embed at splitEmbed(): ${e}`);
      console.log(e);
    }
  }
};
