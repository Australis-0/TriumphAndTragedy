module.exports = {
  build: function (arg0_user, arg1_city_name, arg2_amount, arg3_building_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var raw_amount = arg2_amount;
    var building_amount = parseInt(arg2_amount);
    var building_name = arg3_building_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuilding(building_name);
    var city_obj = getCity(city_name, { users: actual_id });
    var game_obj = getGameObject(user_id);
    var raw_building_name = getBuilding(building_name, { return_key: true });
    var usr = main.users[actual_id];

    //Check if usr, city_obj, or building_obj exist
    if (usr) {
      if (city_obj) {
        if (building_obj) {
          //Check if building amount specified is a valid number or not
          if (!isNaN(building_amount)) {
            //Check if building is unlocked or not
            if (usr.available_buildings.includes(raw_building_name)) {
              //Fetch raw building category of building
              var raw_category_name = getBuildingCategoryFromBuilding(raw_building_name, { return_key: true });

              //Check if building slots are available for the building
              var building_slots = (building_obj.separate_building_slots) ?
                getBuildingSlots(actual_id, city_name, raw_building_name) :
                getBuildingSlots(actual_id, city_name, raw_category_name);

              if (building_slots.available_slots > 0) {
                if (building_slots.available_slots >= building_amount) {
                  //Check if user has enough resources to construct the specified buildings

                } else {
                  printError(game_obj.id, `**${raw_category_name}** in **${city_obj.name}** does not have enough building slots remaining to construct **${parseString(building_amount)}** new building(s)! Only **${parseString(building_slots.available_slots)}** available building slot(s) for **${raw_category_name}** could be found in **${city_obj.name}**. Consider promoting urbanisation in this province to gain extra building slots, or researching additional technologies.`);
                }
              } else {
                printError(game_obj.id, `**${raw_category_name}** in **${city_obj.name}** does not have any remaining building slots left for you to construct any buildings in! Consider promoting urbanisation in this province in order to gain extra building slots, or researching additional technologies.`);
              }
            } else {
              printError(game_obj.id, `**${(building_obj.name) ? building_obj.name : raw_building_name}** is either obsolete or has not yet currently been unlocked by your nation! Check your building list for a valid list of buildings.`);
            }
          } else {
            printError(game_obj.id, `You must specify a valid number of buildings to construct! ${raw_amount} was not accepted as a valid number.`);
          }
        } else {
          printError(game_obj.id, `The building you have specified, **${building_name}**, does not exist!`);
        }
      } else {
        printError(game_obj.id, `The city you have specified, **${city_name}** proved to be as elusive as El Dorado!`);
      }
    } else {
      printError(game_obj.id, `You must have a registered nation before being able to construct any buildings in your cities!`);
    }
  }
};
