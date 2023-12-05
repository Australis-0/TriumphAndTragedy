module.exports = {
  pageHandlerAlerts: function (arg0_user, arg1_input) {
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

    //Alerts page handler
    if (game_obj.page == "alerts") {
      //Button Handler
      //[Alert ID]
      if (!isNaN(parseInt(input.trim()))) {
        var local_alert_id = parseInt(input.trim());

        if (usr.alerts[local_alert_id - 1]) {
          var alert_obj = usr.alerts[local_alert_id - 1];

          //Print alert and set page
          printUserAlert(user_id, alert_obj);
          game_obj.page = `alert_${local_alert_id - 1}`;

          return true;
        }
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
            [`Which page would you like to jump to?`, "number", { min: 1, max: printAlerts(game_obj.user).length }]
          ]
        },
        function (arg) {
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printAlerts(game_obj.user),
            page: arg[0] - 1,
            user: game_obj.user
          });
        });

        return true;
      }

      //[View Alert]
      if (["view alert", "view_alerts"].includes(input)) {
        initialisePrintAlert(user_id);

        return true;
      }

    } else if (game_obj.page.startsWith("alert_")) {
      var current_alert_id = parseInt(game_obj.page.replace("alert_", ""));

      var alert_obj = usr.alerts[current_alert_id];

      //Button Handler
      //[Back]
      if (input == "back") {
        game_obj.page = "alerts";
        createPageMenu(game_obj.middle_embed, {
          embed_pages: printAlerts(game_obj.user),
          user: game_obj.user
        });

        return true;
      }

      //Default handler
      if (!alert_obj.news_alert) {
        var button_obj = getButton(alert_obj.id, input);

        //Execute if button is found
        if (button_obj) {
          if (button_obj.effect) {
            try {
              button_obj.effect(alert_obj.options);
            } catch (e) {
              console.log(e);
            }

            //Send user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully resolved **${alert_obj.name}** by choosing **${button_obj.title}**.`);
          }

          //Delete alert key
          usr.alerts.splice(local_alert_id, 1);

          //Go back to the main alert screen after resolving
          game_obj.page = "alerts";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printAlerts(game_obj.user),
            user: game_obj.user
          });

          return true;
        }
      } else {
        if (input == "OK") {
          //Send user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully dismissed this alert.`);

          //Delete alert key
          usr.alerts.splice(local_alert_id, 1);

          //Go back to the main alert screen after resolving
          game_obj.page = "alerts";
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printAlerts(game_obj.user),
            user: game_obj.user
          });

          return true;
        }
      }
    }
  }
};
