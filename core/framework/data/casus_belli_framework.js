module.exports = {
  /*
    getCB() - Fetches a CB key/object depending on the name of the CB
    options: {
      return_key: true/false - Whether or not to return the key of the CB instead of the object. False by default
    }
  */
  getCB: function (arg0_casus_belli_name, arg1_options) {
    //Convert from parameters
    var casus_belli_name = arg0_casus_belli_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables for casus belli
    var all_cbs = Object.keys(config.casus_belli);
    var casus_belli_exists = [false, ""]; //[casus_belli_exists, casus_belli key/obj]

    //Key search
    {
      //Soft search
      for (var i = 0; i < all_cbs.length; i++)
        if (all_cbs[i].toLowerCase().indexOf(casus_belli_name) != -1)
          casus_belli_exists = [true, (!options.return_key) ? config.casus_belli[all_cbs[i]] : all_cbs[i]];

      //Hard search
      for (var i = 0; i < all_cbs.length; i++)
        if (all_cbs[i].toLowerCase() == casus_belli_name)
          casus_belli_exists = [true, (!options.return_key) ? config.casus_belli[all_cbs[i]] : all_cbs[i]];
    }

    //Name search
    if (!casus_belli_exists[0]) {
      //Soft search
      for (var i = 0; i < all_cbs.length; i++) {
        var local_cb = config.casus_belli[all_cbs[i]];

        if (local_cb.name.toLowerCase().indexOf(casus_belli_name) != -1)
          casus_belli_exists = [true, (!options.return_key) ? local_cb : all_cbs[i]];
      }

      //Hard search
      for (var i = 0; i < all_cbs.length; i++) {
        var local_cb = config.casus_belli[all_cbs[i]];

        if (local_cb.name.toLowerCase() == casus_belli_name)
          casus_belli_exists = [true, (!options.return_key) ? local_cb : all_cbs[i]];
      }
    }

    //Return statement
    return (casus_belli_exists[0]) ? casus_belli_exists[1] : undefined;
  },

  /*
    getJustification() - Gets a user justification on another user
    {
      target: actual_id, //Whom the target user of the justification is
      type: "lebensraum", //What type of CB we are looking for

      get_index: true/false //Whether to return the index instead of the element. False by default
    }
  */
  getJustification: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var cb_name = options.type.trim().toLowerCase();
    var has_justification = [false, ""]; //[justification_exists, justification_obj/index]
    var raw_cb_name = module.exports.getCB(cb_name, { return_key: true });
    var usr = main.users[user_id];

    //Check if user has justification
    for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
      var local_justification = usr.diplomacy.justifications[i];

      if (local_justification.type == raw_cb_name && local_justification.target == options.target)
        has_justification = [true, (!options.get_index) ? local_justification : i];
    }

    //Return statement
    return (has_justification[0]) ? has_justification[1] : undefined;
  }
};
