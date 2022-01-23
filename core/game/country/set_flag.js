module.exports = {
  setFlag: function (arg0_user, arg1_flag_url) {
    //Convert from parameters
    var user_id = arg0_user;
    var flag_url = arg1_flag_url.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check to see if flag is valid
    if (!usr.options.flag_locked) {
      if (!usr.options.customisation_locked) {
        if (flag_url.length >= 0) {
          if ([".png", ".jpg", ".jpeg"].includes(flag_url)) {
            if (!flag_url.includes("file:")) {
              usr.flag = flag_url;

              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully changed your nation's standard! It should now start appearing in your National Interface.`);
            } else {
              printError(game_obj.id, `Please copy/paste a valid image URL instead of a local file address!`);
            }
          } else {
            printError(game_obj.id, `Your flag must be in .png, .jpg, or .jpeg form! Only URL's are accepted.`);
          }
        } else {
          printError(game_obj.id, `You must specify a valid URL to change your flag to!`);
        }
      } else {
        printError(game_obj.id, `Our overlord has issued a diktat saying that we may not change our standard without prior assent!`);
      }
    } else {
      printError(game_obj.id, `You have been barred from changing your flag by moderators. Please try again later.`)
    }
  },

  initialiseSetFlag: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Change National Standard:`,
      prompts: [
        [`What would you like to change your current standard to?\n\nPlease enter a valid image URL.`, "string"]
      ]
    },
    function (arg) {
      module.exports.setFlag(user_id, arg[0]);
    });
  }
};
