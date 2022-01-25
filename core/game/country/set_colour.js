module.exports = {
  initialiseSetColour: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Set National Colour:`,
      prompts: [
        [`Please insert the R code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the G code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }],
        [`Please insert the B code of your colour.\n\nOnly RGB values between 20-175 and 185-255 are accepted.`, "number", { min: 20, max: 255 }]
      ]
    },
    function (arg) {
      module.exports.setColour(user_id, arg[0], arg[1], arg[2]);
    });
  },

  setColour: function (arg0_user, arg1_r, arg2_g, arg3_b, arg4_vassal, arg5_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var r = parseInt(arg1_r);
    var g = parseInt(arg2_g);
    var b = parseInt(arg3_b);
    var is_vassal = arg4_vassal;
    var do_not_display = arg5_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_users = Object.keys(main.users);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check to make sure that colour is valid
    if (!usr.colour_locked) {
      if (!usr.options.customisation_locked || (usr.options.customisation_locked && is_vassal)) {
        if (r >= 20 && g >= 20 && b >= 20) {
          if (!((r > 175 && r < 185) || (g > 175 && g < 185) || (b > 175 && b < 185))) {
            var colour_taken = [false, ""]; //[colour_taken, user_name]

            for (var i = 0; i < all_users.length; i++)
              if (
                main.users[all_users[i]].colour.every(item => [r, g, b].includes(item)) && [r, g, b].every(item => main.users[all_users[i]].colour.includes(item))
              )
                colour_taken = [true, main.users[all_users[i]].name];

              if (!colour_taken[0]) {
                var all_provinces = getProvinces(actual_id, { include_occupations: true });

                //Set colour
                usr.colour = [r, g, b];

                if (!do_not_display)
                  printAlert(game_obj.id, `You have set ${(is_vassal) ? `vassal's` : `your`} RGB colour to **${usr.colour.join(", ")}**.`);
                if (is_vassal)
                  return [true, `You have set ${(is_vassal) ? `vassal's` : `your`} RGB colour to **${usr.colour.join(", ")}**.`];

                for (var i = 0; i < all_provinces.length; i++)
                  if (all_provinces[i].owner == all_provinces[i].controller)
                    setProvinceColour("political", all_provinces[i], usr.colour);
                  else
                    setProvinceColour("political", all_provinces[i], [Math.min(usr.colour[0] - 20, 0), Math.min(usr.colour[1] - 20, 0), Math.min(usr.colour[2] - 20, 0)]);
              } else {
                if (!do_not_display)
                  printError(game_obj.id, `The colour you have specified, **${r}**, **${g}**, **${b}**, has already been taken by **${colour_taken[1]}**! Please pick a different colour.`);
                if (is_vassal)
                  return [false, `The colour you have specified, **${r}**, **${g}**, **${b}**, has already been taken by **${colour_taken[1]}**! Please pick a different colour.`]
              }
          } else {
            if (!do_not_display)
              printError(game_obj.id, `Only RGB values between 20-175 and 185-255 are accepted!`);
            if (is_vassal)
              return [false, `Only RGB values between 20-175 and 185-255 are accepted!`]
          }
        } else {
          if (!do_not_display)
            printError(game_obj.id, `Only RGB values between 20-175 and 185-255 are accepted!`);
          if (is_vassal)
            return [false, `Only RGB values between 20-175 and 185-255 are accepted!`];
        }
      } else {
        if (!do_not_display)
          printError(game_obj.id, `Your colour has been locked in place by your vassal overlord, and thus you were unable to change it!`);
        return [false, `Your colour has been locked in place by your vassal overlord, and thus you were unable to change it!`];
      }
    } else {
      if (!do_not_display)
        printError(game_obj.id, `Your colour has been locked into place by moderator action. You are unable to change your colour.`);
      return [false, `Your colour has been locked into place by moderator action. You are unable to change your colour.`];
    }
  }
};
