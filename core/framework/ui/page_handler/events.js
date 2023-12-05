module.exports = {
  pageHandlerEvents: function (arg0_user, arg1_input) {
    //Convert from parameters
    var arg = arg1_input.split(" ");
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[arg0_user];
    var current_page = 0;
    var game_obj = getGameObject(arg0_user);
    var user_id = arg0_user;
    var usr = main.users[actual_id];

    //Make sure user isn't in a visual prompt
    var in_founding_map = (game_obj.page == "founding_map");
    var in_visual_prompt = interfaces[user_id];

    if (in_visual_prompt)
      in_visual_prompt = (in_visual_prompt.type == "visual_prompt");

    //Events page handler
    if (game_obj.page == "events") {
      //Button Handler
      //[Event ID]
      if (!isNaN(parseInt(input.trim()))) {
        var local_event_id = parseInt(input.trim());

        if (usr.events[local_event_id - 1]) {
          var event_obj = usr.events[local_event_id - 1];

          //Print event and set page
          printEvent(user_id, event_obj);
          game_obj.page = `event_${local_event_id - 1}`;
        }

        return true;
      }

      //[Back]
      if (input == "back") {
        game_obj.page = "country_interface";
        initialiseTopbar(user_id);
        printStats(user_id);

        return true;
      }

      //[Jump To Page]
      if (input == "jump to page") {
        visualPrompt(game_obj.alert_embed, user_id, {
          title: `Jump To Page:`,
          prompts: [
            [`Which page would you like to jump to?`, "number", { min: 1, max: printEvents(game_obj.user).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printEvents(game_obj.user),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });

        return true;
      }

      //[View Event]
      if (input == "view event") {
        initialisePrintEvent(user_id);

        return true;
      }

    } else if (game_obj.page.startsWith("event_")) {
      var current_event_id = parseInt(game_obj.page.replace("event_", ""));
      var event_obj = usr.events[current_event_id];

      //Button Handler
      //[Back]
      if (input == "back") {
        game_obj.page = "events";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printEvents(game_obj.user),
          user: game_obj.user
        });

        return true;
      }

      //Default handler
      if (!event_obj.news_event) {
        var option_obj = getOption(event_obj.id, input);

        //Execute if option is found
        if (option_obj) {
          if (option_obj.effect) {
            option_obj.effect(event_obj.scopes);

            //Send user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${event_obj.name}** by choosing **${option_obj.title}**.`);
          }

          //Delete event key
          usr.events.splice(local_event_id, 1);

          //Go back to the main event screen after resolving
          game_obj.page = "events";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printEvents(game_obj.user),
            user: game_obj.user
          });

          return true;
        }
      } else {
        if (input == "OK") {
          //Send user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved this event.`);

          //Delete events key
          usr.events.splice(local_event_id, 1);

          //Go back to the main events screen after resolving
          game_obj.page = "events";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printEvents(game_obj.user),
            user: game_obj.user
          });

          return true;
        }
      }
    }
  }
};
