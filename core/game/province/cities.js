module.exports = {
  foundCity: function (arg0_user, arg1_province, arg2_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province;
    var city_name = arg2_name;

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
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
      var local_province = getProvince(province_id);

      //Check if province is valid, province has to be owned
      if (local_province.owner == user_id && local_province.controller == user_id) {
        if (local_province.type == "rural") {
          //Initialise city object, determine capital status first
          //If user has no other cities, set it to their capital

          local_province.city_type = (getCities(user_id).length == 0) ? "capital" : "city";
          var population_amount = (local_province.city_type == "capital") ?
            randomNumber(250000, 1000000) :
            randomNumber(250000, 800000);

          //Generate city pop object
          generatePops(province_id, {
            type: "all",
            amount: population_amount
          });

          //Set city RGO
          local_province.resource = randomElement(getRawGoods({ return_names: true })).id;

          //Set building objects
          local_province.buildings = {};
          local_province.development = 0;
          local_province.housing = 0;

          //Set building slot capacity per category
          for (var i = 0; i < all_building_categories.length; i++)
            local_province[`${all_building_categories[i]}_building_slots`] = usr.modifiers[`${all_building_categories[i]}_building_slots`];

          printAlert(getGame(user_id), (local_province.city_type == "capital") ?
            `Capital city founded as **${city_name}** in Province **${province_id}**! Over **${parseNumber(local_province.pops.population)}** are now legally residents of the capital city of **${usr.name}**!` :
            `A new city was founded as **${city_name}** in Province **${province_id}**! Over **${parseNumber(local_province.pops.population)}** are now legally residents of the city of **${city_name}** in Province **${province_id}**.`
          );
        } else {
          printError(getGame(user_id), `Province **${province_id}** is already an urban province belonging to **${local_province.name}**!`);
        }
      } else {
        var is_occupied = (local_province.owner != local_province.controller);

        //Print actual province controller/occupation status
        printError(getGame(user_id), `You don't own Province **${province_id}**!\n\nProvince **${province_id}** is a${(is_occupied) ? "n occupied" : ""} province of the ${main.users[local_province.controller].name} of ${local_province.culture} culture${(is_occupied) ? " that rightfully belongs to " + main.users[local_province.owner].name : ""}.`);
      }
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
  },

  renameCity: function (arg0_user, arg1_old_name, arg2_new_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var old_name = arg1_old_name;
    var new_name = arg2_new_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

  }
};
