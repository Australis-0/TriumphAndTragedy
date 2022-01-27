module.exports = {
  //[WIP] - closePeaceTreaty() - Closes the peace treaty UI and unloads the cached map
  closePeaceTreaty: function (arg0_user) {

  },

  initialiseModifyPeaceTreaty: function (arg0_user, arg1_peace_treaty_object) { //[WIP] - Code bulk of function; move createPageMenu() section up here
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Create invisible visualPrompt()
    visualPrompt(game_obj.id, user_id, {
      title: `Editing Peace Offer for **${war_obj.name}**:`,
      do_not_display: true,

      prompts: [
        [`Which of the above actions would you like to take?`, "string"]
      ]
    },
    function (arg) {
      switch (arg[0]) {
        case "add wargoal":
          //Fetch a list of all available wargoals


          //Bring up a dynamic wargoal handler
          visualPrompt(game_obj.id, user_id, {
            title: `Add Wargoal To Peace Treaty:`,

            prompts: [
              [`Which wargoal would you like to add to this peace treaty?`, "string"]
            ]
          });

          break;
        case "back":
          module.exports.closePeaceTreaty(user_id);

          break;
      }
    });
  },

  /*
    [WIP] - modifyPeaceTreaty() - Opens up the map in a separate mapmode for showing annexed provinces, with an in-depth province selector

    Also creates a new peace treaty SVG file - should be deleted when peace treaty is parsed
  */
  modifyPeaceTreaty: function (arg0_user, arg1_war_name, arg2_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var war_name = arg1_war_name.trim().toLowerCase();
    var peace_obj = arg2_peace_treaty_object;

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
        var new_colour = local_user.colour;
        var new_owner = hasProvinceOwnerChange(local_provinces[x].id, peace_obj);

        //Check if province owner is proposed for vassalisation
        if (peace_obj.puppet) {
          var all_demands = Object.keys(peace_obj.puppet);

          for (var y = 0; y < all_demands.length; y++)
            if (all_demands[y] == local_provinces[x].owner) {
              var overlord_obj = main.users[peace_obj.puppet[all_demands[y]].overlord];

              new_colour = [
                Math.max(overlord_obj.colour[0] - 20, 0),
                Math.max(overlord_obj.colour[1] - 20, 0),
                Math.max(overlord_obj.colour[2] - 20, 0),
              ];
            }
        }

        //Check for annexation
        if (new_owner != local_provinces[x].owner)
          new_colour = main.users[new_owner].colour;

        //Shade in province
        setProvinceColour(map_file, local_provinces[x].id, new_colour);
      }
    }

    //Initialise map viewer
    initialiseMapViewer(game_obj.id, map_file);

    //Visual interface using visualPrompt() before creating a page menu
    module.exports.initialiseModifyPeaceTreaty(user_id);

    //Create page menu to view the current peace treaty, add [Add Wargoal] and [Remove Wargoal] buttons to description field
    createPageMenu(game_obj.bottom_embed, {
      embed_pages: splitEmbed(parsePeaceTreatyString(war_obj, peace_obj), {
        title: `[Back] ¦ Editing Peace Offer For **${war_obj.name}**:`,
        description: [
          `---`,
          "",
          `**[Add Wargoal]** ¦ **[Remove Wargoal]**`
        ].join("\n"),
        title_pages: true,
        fixed_width: true
      }),
      user: user_id
    });

    //Visual interface using visualPrompt()
    /*visualPrompt(game_obj.id, user_id, {
      title: `Editing Peace Offer for **${war_obj.name}**:`,
      prompts: [
        [
          [
            `---`,
            ``,
            `**[Add Wargoal]** ¦ **[Remove Wargoal]**`
          ].join("\n"), "string"
        ]
      ]
    });*/
  }
};
