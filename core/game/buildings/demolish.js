module.exports = {
  demolish: function (arg0_user, arg1_amount, arg2_building_name, arg3_city_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var building_name = arg2_building_name.trim().toLowerCase();
    var city_name = arg3_city_name.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var building_obj = getBuilding(building_name);
    var city_obj = getCity(city_name, { users: [actual_id] });
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check for any errors
    if (!isBeingJustifiedOn(actual_id)) {
      if (!atWar(actual_id)) {
        if (building_obj) {
          if (city_obj) {
            //Check if the city even has that many buildings of that type to demolish in the first place
            var raw_building_name = getBuilding(building_name, { return_key: true });
            var total_buildings = 0;

            for (var i = 0; i < city_obj.buildings.length; i++)
              if (city_obj.buiildings[i].building_type == raw_building_name)
                total_buildings++;

            if (total_buildings < amount) {
              if (amount > 0) {
                var demolished_buildings = destroyBuilding(amount, raw_building_name, city_obj.id);

                //Convert to array
                var all_freed_pops = Object.keys(demolished_buildings);
                var freed_pops = [];

                for (var i = 0; i < all_freed_pops.length; i++) {
                  var local_pop = config.pops[all_freed_pops[i]];

                  freed_pops.push(`**${parseNumber(demolished_buildings[all_freed_pops[i]])}** ${(local_pop.name) ? local_pop.name : all_freed_pops[i]}`);
                }

                //Print user feedback
                (all_freed_pops.length > 0)
                  printAlert(game_obj.id, `${parseNumber(amount)} ${(building_obj.name) ? building_obj.name : raw_building_name} were demolished. You were refunded ${parseList(freed_pops)}, and **${amount}** building slots were freed up.`) :
                  printAlert(game_obj.id, `${parseNumber(amount)} ${(building_obj.name) ? building_obj.name : raw_building_name} were demolished.`);
              } else if (amount == 0) {
                printError(game_obj.id, `You can't demolish zero **${(building_obj.name) ? building_obj.name : raw_building_name}! How does that make any sense?`);
              } else {
                printError(game_obj.id, `How do you propose demolishing negative **${(building_obj.name) ? building_obj.name : raw_building_name}, genius?`);
              }
            } else {
              printError(game_obj.id, `You don't have that many **${(building_obj.name) ? building_obj.name : raw_building_name}**! You can only demolish up to **${parseNumber(total_buildings)}** ${(building_obj.name) ? building_obj.name : raw_building_name} in this city.`);
            }
          } else {
            printError(game_obj.id, `The city you have specified proved as elusive as El Dorado!`);
          }
        } else {
          printError(game_obj.id, `The type of building you have specified, **${building_name}**, does not exist!`);
        }
      } else {
        printError(game_obj.id, `You can't demolish buildings whilst at war! You need them all for the war effort.`);
      }
    } else {
      printError(game_obj.id, `You can't demolish buildings whilst being justified on!`);
    }
  }
};
