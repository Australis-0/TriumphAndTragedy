module.exports = {
  initialiseMoveAllArmies: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Concentrate All Armies:`,
      prompts: [
        [`Which province would you like to concentrate all your armies in? Please specify a numeric Province ID.`, "string"]
      ]
    },
    function (arg) {
      module.exports.moveAllArmies(user_id, arg[0].split(" "));
    });
  },

  moveAllArmies: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = getList(arg1_provinces);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var successful_moves = 0;
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if the province even exists
    if (province_obj) {
      if (all_armies.length > 0) {
        //Trim provinces first
        for (var i = 0; i < provinces.length; i++)
          provinces[i] = provinces[i].trim();

        //Move armies
        for (var i = all_armies.length - 1; i >= 0; i--)
          successful_moves = (moveArmy(actual_id, usr.armies[all_armies[i]], provinces)) ? successful_moves + 1 : successful_moves;

        //Update army_list if user is currently viewing it
        if (game_obj.page == "army_list")
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            page: main.interfaces[game_obj.middle_embed.id].page,
            user: game_obj.user
          });

        printAlert(game_obj.id, `You have begun moving **${parseNumber(successful_moves)}**/**${parseNumber(all_armies.length)}** total armies to Province #${provinces[provinces.length - 1]}, wherever possible.`);
      } else {
        printError(game_obj.id, `You can't move around fictitious armies! Consider creating armies and putting soldiers in them first before ordering to coalesce somewhere.`);
      }
    } else {
      printError(game_obj.id, `The province you have specified, **${province_id}**, doesn't even exist!`);
    }
  }
};
