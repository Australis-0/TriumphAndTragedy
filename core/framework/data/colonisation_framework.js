module.exports = {
  getProvinceExpeditions: function (arg0_province_id) {
    //Convert from parameters
    var province_id = arg0_province_id;

    //Declare local instance variables
    var all_users = Object.keys(main.users);
    var province_obj = main.provinces[province_id];
    var selected_expeditions = [];

    if (province_obj)
      if (!province_obj.controller)
        for (var i = 0; i < all_users.length; i++) {
          var local_user = main.users[all_users[i]];

          var local_expeditions = Object.keys(local_user.expeditions);

          for (var x = 0; x < local_expeditions.length; x++) {
            var local_expedition = local_user.expeditions[local_expeditions[x]];

            if (local_expedition.provinces.includes(province_obj.id))
              selected_expeditions.push(local_expedition);
          }
        }

    //Return statement
    return selected_expeditions;
  }
};
