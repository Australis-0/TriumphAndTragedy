module.exports = {
  getCountryProvinces: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var all_provinces = Object.keys(main.provinces);
    var all_owned_provinces = [];
    var usr = main.users[arg0_user];

    try {
      for (var i = 0; i < all_provinces.length; i++)
        if (main.provinces[all_provinces[i]].owner == user_id && main.provinces[all_provinces[i]].controller == user_id)
          all_owned_provinces.push(main.provinces[all_provinces[i]]);

      //Return statement
      return all_owned_provinces;
    } catch (e) {
      log.error(`getCountryProvinces() - ran into an error with User ID ${user_id}: ${e}.`)
    }
  }
};
