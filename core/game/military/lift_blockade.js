module.exports = {
  liftBlockade: function (arg0_user, arg1_army_name) { //[WIP] - Add to news
    //Convert from parameters
    var user_id = arg0_user;
    var fleet_name = arg1_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = getArmy(fleet_name);
    var game_obj = getGameObject(actual_id);
    var usr = main.users[actual_id];

    //Check if the fleet even exists
    if (army_obj) {
      if (army_obj.is_blockading) {
        //Check to see which user the fleet is blockading
        var all_users = Object.keys(main.users);
        var blockade_index = ["", -1]; //[blockade_obj, blockade_index];

        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          if (local_user.blockaded.fleets)
            for (var x = 0; x < local_user.blockaded.fleets.length; x++)
              if (local_user.blockaded.fleets[x].id == army_obj.id)
                blockade_index = [local_user.blockaded, x];
        }

        //Remove fleet from array
        if (blockade_index[1] != -1) {
          var blockaded_user = JSON.parse(JSON.stringify(main.users[blockade_index[0].id]));

          //Splice from blockade
          blockade_index[0].fleets.splice(blockade_index[1], 1);

          army_obj.blockade_recovery_turns = config.defines.combat.blockade_cooldown;
          army_obj.status = "in harbour";
          delete army_obj.is_blockading;

          //Print user feedback
          if (blockade_index[0].fleets.length >= 1) {
            printAlert(game_obj.id, `You have withdrawn the **${army_obj.name}** from the blockade on **${blockaded_user.name}**.`);
          } else {
            //Delete blockade
            deleteBlockade(blockade_index[0].id);

            printAlert(game_obj.id, `You have ended your blockade on **${blockaded_user.name}**.`);
          }

        }
      } else {
        printError(game_obj.id, `The **${army_obj.name}** isn't currently blockading anyone!`);
      }
    } else {
      printError(game_obj.id, `You can't lift a blockade from a nonexistent navy! That's just not how this works ..`);
    }
  }
};