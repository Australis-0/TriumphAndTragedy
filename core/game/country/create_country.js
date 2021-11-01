module.exports = {
  foundCountry: function (arg0_user, arg1_name) { //[WIP]
    //Convert from parameters
    var user_id = arg0_user;
    var country_name = arg1_name;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);
    var just_registered = (!main.users[user_id]);

    if (just_registered) {
      //Initialise user data
      var usr = initCountry(user_id, country_name);

      //Send message affirming successful registration if in game
      if (usr && game_obj) {
        printAlert(game_obj.id, `You have successfully founded the nation of **${country_name}**!`);

        setTimeout(function(){
          initialiseSettleStartingProvinces(user_id);
        }, settings.visual_prompt_delay);
      } else {
        printError(game_obj.alert_embed, `The previous country name you tried to name your people, **${country_name}**, was already taken by another player!`);

        setTimeout(function(){
          module.exports.initialiseFoundCountry(user_id);
        }, settings.visual_prompt_delay);
      }

      //Set valid user map (this can be used later on for co-op and AI tags):
      main.global.user_map[user_id] = user_id;
    }
  },

  initCountry: function (arg0_user, arg1_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var country_name = arg1_name;

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var country_name_taken = false;
    var processed_country_name = formaliseString(country_name);

    //Check to see if country name is already taken
    for (var i = 0; i < all_users.length; i++)
      country_name_taken = (processed_country_name == main.users[all_users[i]].name) ? true : country_name_taken;

    //Initialise user data
    if (!country_name_taken) {
      initUser(user_id);
      var usr = main.users[user_id];

      //Set name of country
      usr.name = processed_country_name;

      return usr;
    }
  },

  initialiseFoundCountry: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Reinitialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: "Creating A New Nation ..",
      prompts: [
        [`What would you like to name your country?`, "string"]
      ]
    },
    function (arg) {
      foundCountry(user_id, arg[0]);
      console.log(arg);
    });
  }
};
