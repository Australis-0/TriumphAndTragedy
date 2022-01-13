module.exports = {
  printArmy: function (arg0_user, arg1_army_name) { //[WIP] - Finish bulk of function
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_unit_names = getAllUnits({ return_names: true });
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if army_obj could be found
    if (army_obj) {
      var all_units = Object.keys(army_obj.units);
      var army_icon = "";
      var army_string = [];

      //Format army_string
      for (var i = 0; i < all_units.length; i++)
        if (army_icon == "")
          army_icon = config.icons[getUnitCategoryFromUnit(all_units[i]).icon];


    } else {
      printError(game_obj.id, `No army by the name of **${army_name}** could be found! Check your **[Army List]** for a full list of valid field armies, air wings, and fleets.`);
    }
  },

  printArmyList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);
    var armies_string = [];

    //Format armies_string
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];
      var local_icon = "";

      //Find icon
      switch (local_army.type) {
        case "army":
          local_icon = config.icons.active_personnel + " ";

          break;
        case "navy":
          local_icon = config.icons.naval_units + " ";

          break;
        case "air":
          local_icon = config.icons.aeroplanes + " ";

          break;
      }

      armies_string.push(`- ${local_icon}**${local_army.name}** (${local_army.status}, Province #**${local_army.province}**). **[View ${local_army.name}]**`);
    }

    //Default message if no armies can be found
    if (all_armies.length > 0) {
      armies_string.push("");
      armies_string.push(`_You currently have no armies in active service._`);
      armies_string.push("");
      armies_string.push(`Type **[Create Army]** to start building a military! Make sure you have troops in your reserves, though.`);
    }

    //Return statement
    return splitEmbed(armies_string, {
      title: "[Back] ¦ [Jump To Page] ¦ Army List:",
      title_pages: true,
      fixed_width: true,

      description: [
        `**[Create Army]** ¦ **[Delete Army]** ¦ **[Merge Army]** ¦ **[View Army]**`,
        `**[Deploy Units]** ¦ **[Transfer Units]** ¦ **[Relieve Units]**`
      ]
    });
  }
};
