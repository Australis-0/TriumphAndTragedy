module.exports = {
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
    var step_suffix = `(Step ${options.answers.length+1} of ${options.prompts.length+1})`;
    var embed_colour = (options.colour) ? RGBToHex(options.colour) : settings.bot_colour;
      embed_colour = eval("0x" + embed_colour.replace("#", ""));
    var embed_title = (options.title) ? options.title : "Command Prompt:";
    var local_fields = [];

    var local_desc = (options.description) ? options.description : "";
    var show_error = (!options.satisfies_requirements[0]) ? ":warning: " + options.satisfies_requirements[1] : "";

    var information_prompt_suffix = !(show_error.length == 0 && local_desc.length == 0) ? "\n\n" : "";
    var information_prompt = information_prompt_suffix + "To go back, type `back`. To cancel the command entirely, type `cancel`.";

    for (var i = 0; i < options.prompts.length; i++) local_fields.push({
      name: options.prompts[i][0],
      value: (options.answers[i]) ? options.answers[i] : "-"
    });

    var visual_prompt_embed = {
      color: embed_colour,
      title: embed_title,
      description: `${local_desc} ${show_error} ${information_prompt}`,
      fields: local_fields
    };

    return visual_prompt_embed;
  },

  visualPrompt: function (arg0_message_obj, arg1_user, arg2_options, arg3_function) {
    //Convert from parameters
    var message_obj = arg0_message_obj;
    var usr = arg1_user;
    var options = arg2_options;
    var exec_function = arg3_function;

    //Declare local isntance variables
    var game_id;
    var game_obj;
    var all_games = Object.keys(interfaces);

    //Fetch game object
    for (var i = 0; i < all_games.length; i++) {
      if (interfaces[all_games[i]].alert_embed) {
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
    visual_prompt.prompt_embed = {};

    //Update visual prompt message
    message_obj.edit({
      embed: updateVisualPrompt({
        title: options.title,
        answers: [],
        prompts: options.prompts,
        satisfies_requirements: [true, ""]
      })
    });
  }
};
