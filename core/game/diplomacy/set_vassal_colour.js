module.exports = {
  initialiseSetVassalColour: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set Vassal Colour:`,
      prompts: [
        [`Whom would you like to change the country colour of? The target country in question must be one of your vassals.\n\nType **[Diplomacy]** to view a full list of all your vassals.`, "mention"],
        [`Please insert the R code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the G code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the B code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }]
      ]
    },
    function (arg) {
      module.exports.setVassalColour(user_id, arg[0], arg[1], arg[2], arg[3]);
    },
    function (arg) {
      switch (arg) {
        case "diplomacy":
          printDiplomacy(user_id);
          return true;

          break;
      }
    });
  },

  setVassalColour: function (arg0_user, arg1_user, arg2_r, arg3_g, arg4_b) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;
    var r = parseInt(arg2_r);
    var g = parseInt(arg3_g);
    var b = parseInt(arg4_b);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var culture_obj = getPrimaryCultures(actual_ot_user_id)[0];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];
    var vassal_obj = getVassal(actual_ot_user_id);

    //Check to see if user is actually a vassal
    if (ot_user) {
      if (vassal_obj) {
        if (vassal_obj.overlord == actual_id) {
          //Set vassal colour
          var change_vassal_colour = setColour(actual_ot_user_id, r, g, b, true, true);

          //Print user feedback
          (change_vassal_colour[0]) ?
            printAlert(game_obj.id, change_vassal_colour[1]) :
            printError(game_obj.id, change_vassal_colour[1]);
        } else {
          printError(game_obj.id, `**${ot_user.name}** might be a vassal, but they certainly aren't _your_ vassal, and that's what matters here.`)
        }
      } else {
        printError(game_obj.id, `The target country of **${ot_user.name}** must be vassalised to begin with before it can be bossed around by someone else!`);
      }
    } else {
      printError(game_obj.id, `No one at the Cartography Office seems to know whom that is! Try specifying a valid country name, or type **[View Ledger]** to view a full list of all diplomatically recognised nations.`);
    }
  }
};
