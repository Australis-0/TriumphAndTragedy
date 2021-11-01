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
    var all_resource_requirements = Object.keys(config.defines.economy.city_resources);
    var city_resources = config.defines.economy.city_resources;
    var resource_shortages = {};

    for (var i = 0; i < all_resource_requirements.length; i++) {
      var resource_amount = (usr.inventory[all_resource_requirements[i]]) ?
        usr.inventory[all_resource_requirements[i]] :
        usr[all_resource_requirements[i]];

      if (resource_amount) {
        //Check for user shortage
        if (resource_amount < city_resources[all_resource_requirements[i]])
          resource_shortages[all_resource_requirements[i]] = city_resources[all_resource_requirements[i]] - resource_amount;
      } else {
        log.error(`foundCity() - resource_amount at config.defines.economy - ${all_resource_requirements[i]} returned undefined.`);
      }
    }

    var all_resource_shortages = Object.keys(resource_shortages);
    if (all_resource_shortages.length == 0) {
      
    } else {
      //Resource shortages encountered, print them out
      var shortage_array = [];

      for (var i = 0; i < all_resource_shortages.length; i++) {
        var local_good = getGood(all_resource_shortages[i]);
        var local_icon = "";
        var local_shortage = resource_shortages[all_resource_shortages[i]];

        //Determine icon
        if (!usr.inventory[all_resource_shortages[i]]) {
          if (all_resource_shortages[i] == "money") local_icon = config.icons.money;
        } else {
          local_icon = (local_good.icon) ? config.icons[local_good.icon] : "";
        }

        shortage_array.push(`- ${local_icon} ${parseNumber(local_shortage)} ${(local_good.name) ? local_good.name : all_resource_shortages[i]}`);

        printError(getGame(user_id), `You don't have resources to found a city! Gather the following resources first:\n\n${shortage_array.join("\n")}`);
      }
    }
  }
};