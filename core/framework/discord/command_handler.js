module.exports = {
  clearPrompt: function (arg0_user, arg1_game_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var game_id = arg1_game_id;

    delete interfaces[user_id];
    interfaces[game_id].alert_change = true;
  },

  commandHandler: function (arg0_game_id, arg1_input) {
    //Convert from parameters
    var game_id = arg0_game_id;
    var input = arg1_input;

    //Declare local instance variables
    var game_obj = interfaces[game_id];
    var local_input = input.toLowerCase();

    //Visual prompt processing
    if (interfaces[game_id].user)
      if (interfaces[interfaces[game_id].user])
        if (interfaces[interfaces[game_id].user].type == "visual_prompt")
          try {
            //Declare local instance variables
            var is_command = false;
            var local_prompt = interfaces[interfaces[game_id].user];
            var current_step = local_prompt.answers.length;

            //Check for command function first
            if (local_prompt.command_function)
              is_command = local_prompt.command_function(input.toLowerCase());

            //If the phrase typed in is not a valid command, continue on
            if (!is_command) {
              //Check if prompt has been cancelled
              if (input == "back" && !local_prompt.do_not_cancel) {
                (current_step > 0) ?
                  local_prompt.answers.pop() :
                    module.exports.clearPrompt(game_obj.user, game_id),
                    printAlert(game_id, `${config.icons.cancel} You have cancelled the current command.`);
              } else if (input == "cancel" && !local_prompt.do_not_cancel) {
                module.exports.clearPrompt(game_obj.user, game_id);
                printAlert(game_id, `${config.icons.cancel} You have cancelled the current command.`);
              } else {
                try {
                  //Check if new answer is valid or not for the current prompt
                  if (local_prompt.prompts[current_step][1] == "number") {
                    //Check to make sure that the input is actually a number
                    if (!isNaN(parseInt(input))) {
                      var satisfies_requirements = [true, ""];

                      if (local_prompt.prompts[current_step].length > 2) {
                        //Minimum check
                        if (local_prompt.prompts[current_step][2].min)
                          if (parseInt(input) < local_prompt.prompts[current_step][2].min)
                            satisfies_requirements = [false, `The lowest number you can specify for this command is ${local_prompt.prompts[current_step][2].min}!`];
                        //Maximum check
                        if (local_prompt.prompts[current_step][2].max)
                          if (parseInt(input) > local_prompt.prompts[current_step][2].max)
                            satisfies_requirements = [false, `The highest number you can specify for this command is ${local_prompt.prompts[current_step][2].max}!`];
                      }

                      if (satisfies_requirements[0]) local_prompt.answers.push(parseInt(input));
                    } else {
                      satisfies_requirements = [false, `You must input a valid number for this command! ${input} is not a valid number.`];
                    }
                  } else if (local_prompt.prompts[current_step][1] == "string") {
                    local_prompt.answers.push(input);
                  } else if (local_prompt.prompts[current_step][1] == "mention") {
                    var parsed_mention = parseMention(input);

                    if (parsed_mention) {
                      local_prompt.answers.push(parsed_mention);
                    } else {
                      satisfies_requirements = [false, `You must type out a valid nation name or ping a valid user! ${input} was not a valid nation/user.`];
                    }
                  } else {
                    log.error(`The argument type ${local_prompt.prompts[current_step][1]} specified with the visual prompt at User ID ${user_id} does not exist!`);
                  }
                } catch {}
              }
            }

            //Keep at end, execute the function and delete the key only if all prompts have been filled out so far.
            if (local_prompt.answers.length == local_prompt.prompts.length) {
              if (local_prompt.evaluate_function) {
                try {
                  local_prompt.evaluate_function(local_prompt.answers);
                } catch (e) {
                  console.log(e);
                }
              } else {
                log.error(`local_prompt.evaluate_function() turned out to be nonexistent! See below for a full log of the local_prompt object:`);
                console.log(local_prompt);
              }

              //Print final text or reset alert array to what it was before
              if (local_prompt.final_text) {
                printAlert(game_id, local_prompt.final_text);
              } else {
                game_obj.alert_change = true;
              }

              //Clear it from the interface!
              delete interfaces[interfaces[game_id].user];
            }

            //Update visual prompt
            if (local_prompt)
              if (!local_prompt.do_not_display)
                local_prompt.message.edit({
                  embeds: [
                    updateVisualPrompt({
                      title: local_prompt.title,
                      show_steps: local_prompt.show_steps,
                      answers: local_prompt.answers,
                      prompts: local_prompt.prompts,
                      satisfies_requirements: satisfies_requirements,

                      colour: local_prompt.colour,
                      description: local_prompt.description
                    })
                  ]
                });
          } catch (e) {
            log.error(`commandHandler() - visual_prompt ran into an error: ${e}`);
            console.log(e);
          }

    //Traditional commands - Make sure this goes after visual prompt processing!
    {
      switch (game_obj.page) {
        case "inventory":
          if (local_input == "back") {
            game_obj.page = "economy";
            printEconomy(game_obj.user);
          }

          break;
        default:
          pageHandler(game_obj.user, local_input);

          break;
      }
    }
  },

  splitCommandLine: function (commandLine) {
		var spaceMarker = '<SP>';

		while (commandLine.indexOf(spaceMarker) > -1) spaceMarker += '@';

		var noSpacesInQuotes = commandLine.replace(/"([^"]*)"?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker);
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/“([^"]*)“?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker);
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/“([^"]*)”?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker) ;
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/”([^"]*)“?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker) ;
		});
		var mangledParamArray = noSpacesInQuotes.split(/ +/) ;
		var paramArray = mangledParamArray.map((mangledParam) => {
			return mangledParam.replace(RegExp(spaceMarker, 'g'), ' ') ;
		});

		return paramArray;
	},

  updateVisualPrompt: function (arg0_options) {
    //Convert from parameters
    var options = arg0_options;

    //Use ternary operators to decide on the defaults for each value if not provided.
    var step_suffix = `(Step ${options.answers.length+1} of ${options.prompts.length})`;
    var embed_colour = (options.colour) ? RGBToHex(options.colour) : settings.bot_colour;
      embed_colour = eval("0x" + embed_colour.replace("#", ""));
    var embed_title = (options.title) ? options.title : "Command Prompt:";
    var local_fields = [];

    var local_desc = (options.description) ? options.description : "";
    var show_error = "";

    if (options.satisfies_requirements)
      show_error = (!options.satisfies_requirements[0]) ? ":warning: " + options.satisfies_requirements[1] : "";

    var information_prompt_suffix = "";

    //Regular error trapping
    try {
      information_prompt_suffix = !(show_error.length == 0 && local_desc.length == 0) ? "\n\n" : "";
    } catch {}

    var information_prompt = (!options.do_not_cancel) ? information_prompt_suffix + "To go back, type `back`. To cancel the command entirely, type `cancel`." : "";

    for (var i = 0; i < options.prompts.length; i++) local_fields.push({
      name: options.prompts[i][0],
      value: (options.answers[i]) ? options.answers[i].toString() : "-"
    });

    var visual_prompt_embed = {
      color: embed_colour,
      title: `${embed_title} ${(options.show_steps) ? step_suffix : ""}`,
      description: `${local_desc} ${show_error} ${information_prompt}`,
      image: {
        url: (options.image) ? options.image : "https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png",
      },
      fields: local_fields
    };

    return visual_prompt_embed;
  },

  visualPrompt: function (arg0_message_obj, arg1_user, arg2_options, arg3_function, arg4_function) {
    //Convert from parameters
    var message_obj = arg0_message_obj;
    var usr = arg1_user;
    var options = arg2_options;
    var exec_function = arg3_function;
    var cmd_function = arg4_function;

    //Declare local isntance variables
    var game_id;
    var game_obj;
    var all_games = Object.keys(interfaces);

    //Fetch game object
    for (var i = 0; i < all_games.length; i++)
      if (interfaces[all_games[i]].alert_embed)
        if (interfaces[all_games[i]].alert_embed.id == message_obj.id) {
          game_id = all_games[i];
          game_obj = interfaces[all_games[i]];
        }

    //Append to interfaces as type visual_prompt
    interfaces[usr] = {};
    var visual_prompt = interfaces[usr];
    visual_prompt.type = "visual_prompt";
    if (!options.title) visual_prompt = options.title;
    visual_prompt.message = message_obj;
    visual_prompt.answers = [];
    visual_prompt.prompts = options.prompts;
    visual_prompt.evaluate_function = exec_function;
    visual_prompt.command_function = cmd_function;
    visual_prompt.prompt_embed = {};

    //Other parameters
    visual_prompt.colour = options.colour;
    visual_prompt.description = options.description;
    visual_prompt.do_not_cancel = options.do_not_cancel;
    visual_prompt.do_not_display = options.do_not_display;
    visual_prompt.title = options.title;
    visual_prompt.show_steps = (options.show_steps == false) ? false : true;

    //Update visual prompt message
    if (!options.do_not_display)
      try {
        message_obj.edit({
          embeds: [
            updateVisualPrompt({
              title: options.title,
              answers: [],
              prompts: options.prompts,
              satisfies_requirements: [true, ""],
              show_steps: visual_prompt.show_steps,

              colour: options.colour,
              description: options.description,
              image: options.image,

              do_not_cancel: options.do_not_cancel
            })
          ]
        });
      } catch {
        log.error(`updateVisualPrompt() ran into an error whilst attempting to create a new visual prompt! .. Reinitialising all game embeds to call again!`);

        reinitialiseGameEmbeds();

        setTimeout(function(){
          var game_obj = getGameObject(usr);

          module.exports.visualPrompt(game_obj.alert_embed, game_obj.user, options, exec_function, cmd_function);
        }, 3000);
      }
  }
};
