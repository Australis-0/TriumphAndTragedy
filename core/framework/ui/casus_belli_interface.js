module.exports = {
  printCBList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_cbs = Object.keys(config.casus_belli);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare cb_list_string
    var cb_list_string = [];

    //Format cb_list_string
    cb_list_string.push(`Notice: 'Status Quo' includes war reparations.`);
    cb_list_string.push("");

    //Iterate over all CB's and print them out
    for (var i = 0; i < all_cbs.length; i++) {
      var local_cb = config.casus_belli[all_cbs[i]];
      var local_cb_description = (local_cb.description) ? local_cb.description : "";
      var local_cb_icon = (local_cb.icon) ? config.icons[local_cb.icon] + " " : "";
      var local_cb_infamy = returnSafeNumber(local_cb.infamy);
      var local_cb_name = (local_cb.name) ? local_cb.name : all_cbs[i];

      //Format peace_demands_array
      var peace_demands_array = [];

      try {
        for (var x = 0; x < local_cb.peace_demands.length; x++)
          //Check if localisation has anything
          if (config.localisation[local_cb.peace_demands[x]])
            peace_demands_array.push(config.localisation[local_cb.peace_demands[x]]);
      } catch {}

      //Format CB
      cb_list_string.push(`${local_cb_icon}${local_cb_name}`);
      cb_list_string.push(`- ${config.icons.old_scroll} Requirement: ${local_cb_description}`);
      cb_list_string.push(`- ${config.icons.diplomacy} Peace Demands: ${peace_demands_array.join(", ")}`);
      cb_list_string.push(`- ${config.icons.infamy} Infamy: ${parseNumber(local_cb_infamy)}`);
      cb_list_string.push("");
    }

    //Return embed
    return splitEmbed(cb_list_string, {
      title: `List of Casus Belli:`,
      title_pages: true,
      fixed_width: true
    });
  },

  printCBs: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]
    var actual_ot_user_id = main.global.user_map[ot_user_id];;
    var game_obj = getGameObject(user_id);
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
