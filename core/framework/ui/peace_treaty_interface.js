module.exports = {
  //[WIP] - closePeaceTreaty() - Closes the peace treaty UI and unloads the cached map
  closePeaceTreaty: function (arg0_user) {

  },

  /*
    [WIP] - modifyPeaceTreaty() - Opens up the map in a separate mapmode for showing annexed provinces, with an in-depth province selector

    Also creates a new peace treaty SVG file - should be deleted when peace treaty is parsed
  */
  modifyPeaceTreaty: function (arg0_user, arg1_war_name, arg2_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name.trim().toLowerCase();
    var peace_treaty_obj = arg2_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var belligerents = [];
    var game_obj = getGameObject(user_id);
    var map_file = `${actual_id}_peace_treaty`;
    var usr = main.users[actual_id];
    var war_obj = getWar(war_name);

    //Cache a new SVG
    loadMap(`${map_file}.svg`, map_file);

    //Shade in the base provinces - but only for the belligerents currently involved in the war
    for (var i = 0; i < war_obj.attackers.length; i++)
      belligerents.push(war_obj.attackers[i]);
    for (var i = 0; i < war_obj.defenders.length; i++)
      belligerents.push(war_obj.defenders[i]);

    for (var i = 0; i < belligerents.length; i++) {
      var local_provinces = getProvinces(belligerents[i], { include_hostile_occupations: true });
      var local_user = main.users[belligerents[i]];

      for (var x = 0; x < local_provinces.length; x++) {
        //Check if province will be annexed (either by retaking cores, or by outright annexation)

        //Check if province owner is proposed for vassalisation

        //Shade in province
        setProvinceColour(map_file, local_provinces[x], local_user.colour);
      }
    }

    //Initialise map viewer
    initialiseMapViewer(game_obj.id, map_file);

    //Visual interface using visualPrompt()

  }
};
