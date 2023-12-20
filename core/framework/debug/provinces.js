module.exports = {
  debugSettleProvince: function (arg0_user, arg1_provinces) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = getList(arg1_provinces.split(" "));

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Iterate over provinces and settle
    if (usr) {
      var settled_provinces = 0;

      for (var i = 0; i < provinces.length; i++) {
        var local_province = getProvince(provinces[i]);

        //Settle province
        if (!provinces[i].owner) {
          settleProvince(user_id, provinces[i]);

          settled_provinces++;
        }
      }

      return [true, `Settled **${parseNumber(settled_provinces)}** province(s) in the name of **${usr.name}**.`];
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugTransferProvinces: function (arg0_user, arg1_provinces, arg2_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var provinces = getList(arg1_provinces);
    var ot_user_id = arg2_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Transfer provinces
    if (usr && ot_user) {
      var ceded_provinces = 0;

      for (var i = 0; i < provinces.length; i++) {
        var local_province = getProvince(provinces[i]);

        if (local_province) {
          transferProvince(user_id, {
            province_id: local_province.id,
            target: actual_ot_user_id
          });

          ceded_provinces++;
        }
      }

      return [true, `You have ceded **${parseNumber(ceded_provinces)}** province(s) from **${usr.name}** to **${ot_user.name}**.`];
    } else {
      return [false, `One of the users you have specified does not exist.`];
    }
  }
};
