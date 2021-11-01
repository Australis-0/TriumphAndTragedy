module.exports = {
  //Founds a new city
  foundCity: function (arg0_user, arg1_province, arg2_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province;
    var city_name = arg2_name;

    //Declare local instance variables
    var all_provinces = getProvinces(user_id);
    var usr = main.users[user_id];

    //Check whether user has enough resources to found a city
    var resource_shortages = {};
  }
};
