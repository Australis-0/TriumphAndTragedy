module.exports = {
  /*
    demolish() - Demolishes a set of buildings and prints an output to a user's game_obj.
    options: {
      province_id: "4407", - The province ID in which to demolish the building
      building_count
      building_count: 2, - Optional. 1 by default. The number of buildings to demolish
      building_type: "lumberjacks", - Optional. building_object will be used if not specified

      building_object: {} - Overrides building_count/building_type
    }
  */
  demolish: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var individual_id = false;

    var actual_id = main.global.user_map[user_id];
    var amount = options.building_count;
    var building_obj;
    var game_obj = getGameObject(user_id);
    var province_id = options.province_id;
    var raw_building_name;
    var usr = main.users[actual_id];

    var province_obj = main.provinces[province_id];

    if (!options.amount) {
      individual_id = true;

      amount = 1;
      building_obj = lookup.all_buildings[options.building_object.building_type];
      raw_building_name = options.building_object.building_type;
    } else {
      building_obj = module.exports.getBuilding(options.building_type);
      raw_building_name = module.exports.getBuilding(options.building_type, { return_key: true });
    }

    //Check for any errors
    if (!isBeingJustifiedOn(user_id)) {
      if (!atWar(user_id)) {
        if (building_obj) {
          if (province_obj) {
            if (province_obj.controller == actual_id) {
              //Check if the city even has that many buildings of that type to demolish in the first place
              var total_buildings = 0;

              for (var i = 0; i < province_obj.buildings.length; i++)
                if (province_obj.buildings[i].building_type == raw_building_name)
                  total_buildings++;

              if (total_buildings >= amount) {
                if (amount > 0) {
                  var demolished_buildings = (individual_id) ? destroyBuildings({
                      province_id: province_obj.id,
                      building_count: amount,
                      building_type: raw_building_name
                    }) : destroyBuildings({
                      province_id: province_obj.id,
                      building_object: options.building_object
                    });

                  //Convert to array
                  var all_freed_pops = Object.keys(demolished_buildings);
                  var freed_pops = [];

                  for (var i = 0; i < all_freed_pops.length; i++) {
                    var local_pop = config.pops[all_freed_pops[i]];

                    freed_pops.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}**${parseNumber(demolished_buildings[all_freed_pops[i]])}** ${(local_pop.name) ? local_pop.name : all_freed_pops[i]}`);
                  }

                  //Update UI
                  if (game_obj.page == `view_city_${province_obj.name}`)
                    createPageMenu(game_obj.middle_embed, {
                      embed_pages: printProvince(game_obj.user, province_obj.name),
                      page: interfaces[game_obj.middle_embed.id].page,
                      user: game_obj.user
                    });

                  //Print user feedback
                  (all_freed_pops.length > 0) ?
                    printAlert(game_obj.id, `${(building_obj.icon) ? config.icons[building_obj.icon] + " " : ""}**${parseNumber(amount)}** ${(building_obj.name) ? building_obj.name : raw_building_name} were demolished. You were refunded ${parseList(freed_pops)}, and **${parseNumber(amount)}** building slots were freed up.`) :
                    printAlert(game_obj.id, `${(building_obj.icon) ? config.icons[building_obj.icon] + " " : ""}**${parseNumber(amount)}** ${(building_obj.name) ? building_obj.name : raw_building_name} were demolished.`);
                } else if (amount == 0) {
                  printError(game_obj.id, `You can't demolish zero **${(building_obj.name) ? building_obj.name : raw_building_name}! How does that make any sense?`);
                } else {
                  printError(game_obj.id, `How do you propose demolishing negative **${(building_obj.name) ? building_obj.name : raw_building_name}, genius?`);
                }
              } else {
                printError(game_obj.id, `You don't have that many **${(building_obj.name) ? building_obj.name : raw_building_name}**! You can only demolish up to **${parseNumber(total_buildings)}** ${(building_obj.name) ? building_obj.name : raw_building_name} in this city.`);
              }
            } else {
              printAlert(game_obj.id, `You can't demolish buildings in a city you don't control!`);
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
  },

  initialiseDemolish: function (arg0_user, arg1_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var province_obj = main.provinces[province_id];
    var usr = main.users[actual_id];

    //Initialise visual prompt
    (province_id) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Demolishing Building(s) in ${(province_obj.name) ? province_obj.name : `Province ${province_id}`}:`,
        prompts: [
          [`How many buildings of this type would you like to get rid of?`, "number", { min: 1 }],
          [`What sort of building would you like to demolish in **${(province_obj.name) ? province_obj.name : province_id}**?`, "string"]
        ]
      },
      function (arg) {
        demolish(user_id, {
          province_id: province_obj.id,

          building_count: arg[0],
          building_type: arg[1]
        });
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Demolish Building(s):`,
        prompts: [
          [`How many building of this type would you like to get rid of?`, "number", { min: 1 }],
          [`What sort of building would you like to demolish?`, "string"],
          [`Which city/province are these buildings currently located?`, "string"]
        ]
      },
      function (arg) {
        var city_obj = getCity(arg[2]);

        demolish(user_id, {
          province_id: city_obj.id,

          building_count: arg[0],
          building_type: arg[1]
        });
      });
  }
};
