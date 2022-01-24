module.exports = {
  initialiseAttritionAvoidance: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Attrition Avoidance Policy:`,
      prompts: [
        [`What would you like to set our policy on attrition avoidance to?\n\nPlease type either 'always', 'if possible', or 'never'.\n\n'Always' means that units will use the shortest path regardless of attrition, whilst 'if possible' means that they will avoid walking through the province if at all possible, and 'never' means that your armies should never take attrition whilst moving.`, "string"]
      ]
    },
    function (arg) {
      if (["always", "if possible", "never"].includes(arg[0].toLowerCase())) {
        usr.options.avoid_attrition = arg[0].toLowerCase();
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully set your policy on Attrition Avoidance to **${usr.options.avoid_attrition}**.`);
      } else {
        printError(game_obj.id, `You must specify a valid option!`);
        module.exports.initialiseAttritionAvoidance(user_id);
      }
    });
  },

  initialiseAvoidTerritorialViolation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Territorial Violation Policy:`,
      prompts: [
        [`What would you like to set our policy on territorial violation avoidance to?\n\nPlease type either 'always', 'if possible', or 'never'.\n\n'Always' means that units will use the shortest path regardless of territorial violation, whilst 'if possible' means that they will only walk through the given territory if unavoidable, and 'never' means that your armies will no longer be capable of violating the territory of other nations.`, "string"]
      ]
    },
    function (arg) {
      if (["always", "if possible", "never"].includes(arg[0].toLowerCase())) {
        usr.options.avoid_territorial_violation = arg[0].toLowerCase();
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully set your policy on Attrition Avoidance to **${usr.options.avoid_territorial_violation}**.`);
      } else {
        printError(game_obj.id, `You must specify a valid option!`);
        module.exports.initialiseAvoidTerritorialViolation(user_id);
      }
    });
  },

  initialiseIgnoreOrdersWhenCarpetSieging: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Policy On Ignoring Orders When Carpet Sieging:`,
      prompts: [
        [`Should only stationary armies be allowed to participate in general carpet sieges?\n\nPlease type either 'yes' or 'no'.`, "string"]
      ]
    },
    function (arg) {
      if (["yes", "no"].includes(arg[0].toLowerCase())) {
        usr.options.ignore_orders = (arg[0].toLowerCase() == "yes") ? true : false;
        printAlert(game_obj.id, `${config.icons.checkmark} You have successfully set your policy on whether or not to Ignore Orders When Carpet Sieging to **${parseString(usr.options.ignore_orders)}**.`);
      } else {
        printError(game_obj.id, `You must specify a valid option!`);
        module.exports.initialiseIgnoreOrdersWhenCarpetSieging(user_id);
      }
    });
  },
};
