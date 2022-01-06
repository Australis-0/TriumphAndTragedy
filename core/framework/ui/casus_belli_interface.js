module.exports = {
  printCBs: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]
    var actual_ot_user_id = main.global.user_map[ot_user_id];;
    var game_obj = getGameObject(actual_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_cbs = Object.keys(config.casus_belli);
    var casus_belli_string = [];
    var has_casus_belli_on_target = false;

    //Check if at least one casus belli is valid for the target user
    for (var i = 0; i < usr.diplomacy.casus_belli.length; i++) {
      var local_cb = usr.diplomacy.casus_belli[i];

      if (local_cb.target == actual_id)
        has_casus_belli_on_target = true;
    }

    //Check for all CB's that the target user has
    if (has_casus_belli_on_target) {
      casus_belli_string.push(`**[Justify Wargoal]**`);
      casus_belli_string.push("");
      casus_belli_string.push(config.localisation.divider);
      casus_belli_string.push("");
      casus_belli_string.push(`Valid CB's:`);
      casus_belli_string.push("");

      for (var i = 0; i < usr.diplomacy.casus_belli.length; i++) {
        var local_cb = usr.diplomacy.casus_belli[i];

        //Check if local_cb is on actual_ot_user_id
        if (local_cb.target == actual_ot_user_id) {
          var cb_obj = getCB(local_cb.type);
          var raw_cb_name = getCB(local_cb.type, { return_key: true });

          //Push to casus_belli_string
          casus_belli_string.push(`**${(cb_obj.name) ? cb_obj.name : raw_cb_name}**`);
        }
      }
    } else {
      casus_belli_string.push(`_We have no valid CB's on this user as of yet._`);
    }

    //Return embed
    return splitEmbed(casus_belli_string, {
      title: `CB List on ${ot_user.name}:`,
      title_pages: true,
      fixed_width: true
    });
  },

  printWargoals: function (arg0_user, arg1_user) {
    
  }
};
