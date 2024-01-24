module.exports = {
  /*
    changeProductionChoice() - Changes the production choice of an individual building.
    options: {
      has_base_production_choice: true/false, - Whether the building has a base production choice. Optimisation parameter.
      production_choice_key: "one" - The raw production choice key to specify. Optimisation parameter.
    }
  */
  changeProductionChoice: function (arg0_user, arg1_building, arg2_production_choice_name, arg3_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_obj = arg1_building;
    var production_choice_name = arg2_production_choice_name;
    var options = (arg3_options) ? arg3_options : {};

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var base_production_choice = options.has_base_production_choice; //Optimisation parameter
    var game_obj = getGameObject(user_id);
    var op_production_choice_key = options.production_choice_key; //Optimisation parameter
    var return_message = [false, ""];
    var usr = main.users[actual_id];

    //Change production choice
    if (building_obj) {
      var config_obj = getBuilding(building_obj.building_type);
      var has_base_production_choice = (base_production_choice) ?
        base_production_choice : hasBaseProductionChoice(building_obj.building_type);
      var production_choice_key = (op_production_choice_key) ?
        op_production_choice_key : getBuildingProductionChoice(building_obj.building_type, production_choice_name);

      if (
        production_choice_key ||
        production_choice_name.trim().toLowerCase() == "base"
      ) {
        //Switch production_choice
        if (production_choice_name.trim().toLowerCase() == "base") {
          delete building_obj.production_choice; //Base production choice doesn't need to be specified

          return_message = [true, `You have set the Production Choice for **${(building_obj.name) ? building_obj.name : building_obj.id}** to its default.`];
        } else {
          building_obj.production_choice = production_choice_key;

          return_message = [true, `You have set the Production Choice for **${(building_obj.name) ? building_obj.name : building_obj.id}** to **${parseProductionChoice(building_obj.building_type, production_choice_key)}**.`];
        }

        //Refresh UI
        if (game_obj.page.startsWith("view_building_"))
          printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
        if (game_obj.page.startsWith("view_buildings_"))
          printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
        if (game_obj.page == "view_industry")
          printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
      } else {
        return_message = [false, `The production choice **${production_choice_name}** doesn't exist for **${(config_obj.name) ? config_obj.name : building_obj.building_type}!**!`];
      }
    } else {
      return_message = [false, `The building specified couldn't be found!`];
    }

    //Return statement
    return return_message;
  },

  initialiseChangeProductionChoice: function (arg0_user, arg1_building_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var building_obj = arg1_building_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    (building_obj) ?
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Changing Production Choice for ${(building_obj.name) ? building_obj.name : building_obj.building_type}:`,
        prompts: [
          [`What is the name of the Production Choice you would like to change this building to? Type 'base' to specify the default production method if available.`, "string"]
        ]
      },
      function (arg) {
        var change_production_choice = module.exports.changeProductionChoice(user_id, building_obj, arg[0]);

        (change_production_choice[0]) ?
          printAlert(game_obj.id, change_production_choice[1]) :
          printError(game_obj.id, change_production_choice[1]);
      }) :
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Change Building Production Choice:`,
        prompts: [
          [`What is the name of the building you would like to change Production Choices for?`, "string"],
          [`Which Production Choice would you like to change this building to? Type 'base' to specify the default production method if available.`, "string"]
        ]
      },
      function (arg) {
        var building_obj = getBuildingByName(user_id, arg[0]);

        if (building_obj) {
          var change_production_choice = module.exports.changeProductionChoice(user_id, building_obj, arg[1]);

          (change_production_choice[0]) ?
            printAlert(game_obj.id, change_production_choice[1]) :
            printError(game_obj.id, change_production_choice[1]);
        } else {
          printError(game_obj.id, `The building you have specified, **${building_obj.name}** doesn't exist in any city of yours!`);
        }
      })
  },

  initialiseMassChangeProductionChoice: function (arg0_user, arg1_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise visual prompt
    if (province_id) {
      var province_obj = main.provinces[province_id];

      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Mass Change Production Choice(s) in ${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}:`,
        prompts: [
          [`How many buildings should have their Production Choice changed?`, "number", { min: 1 }],
          [`What is the name of the target building type?`, "string"],
          [`Which production choice should they be geared towards? Type 'base' to use the default production choice where applicable.`, "string"]
        ]
      },
      function (arg) {
        var config_obj = getBuilding(arg[1]);

        if (config_obj) {
          var mass_change_production_choice = module.exports.massChangeProductionChoice(user_id, arg[2], {
            amount: arg[0],
            building_type: config_obj.id,
            province_ids: [province_obj.id]
          });

          (mass_change_production_choice[0]) ?
            printAlert(game_obj.id, mass_change_production_choice[1]) :
            printError(game_obj.id, mass_change_production_choice[1]);
        } else {
          printError(game_obj.id, `The building type you have specified, **${arg[1]}** doesn't exist!`);
        }
      });
    } else {
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Mass Change Building Production Choice(s):`,
        prompts: [
          [`How many buildings should have their Production Choice changed?`, "number", { min: 1 }],
          [`What is the name of the target building type?`, "string"],
          [`Which province(s) would you like this mass change to target? Please list them by name or Province ID, separated by spaces. Type 'none' to target your entire country instead.`, "string"],
          [`Which production choice should they be geared towards? Type 'base' to use the default production choice where applicable.`, "string"]
        ]
      },
      function (arg) {
        var config_obj = getBuilding(arg[1]);
        var province_ids = [];

        //Parse province_ids from arg[2]
        if (arg[2].toLowerCase() != "none") {
          var provinces = arg[2].split(" ");

          for (var i = 0; i < provinces.length; i++) {
            var local_province = getProvince(provinces[i]);

            if (local_province) province_ids.push(local_province.id);
          }

          if (province_ids.length > 0) {
            var mass_change_production_choice = module.exports.massChangeProductionChoice(user_id, arg[3], {
              amount: arg[0],
              building_type: config_obj.id,
              province_ids: province_ids
            });

            (mass_change_production_choice[0]) ?
              printAlert(game_obj.id, mass_change_production_choice[1]) :
              printError(game_obj.id, mass_change_production_choice[1]);
          } else {
            printError(game_obj.id, `None of the province(s) you have specified could be found! Please use valid province name(s) or ID's.`);
          }
        } else {
          var mass_change_production_choice = module.exports.massChangeProductionChoice(user_id, arg[3], {
            amount: arg[0],
            building_type: arg[1],
          });

          (mass_change_production_choice[0]) ?
            printAlert(game_obj.id, mass_change_production_choice[1]) :
            printError(game_obj.id, mass_change_production_choice[1]);
        }
      });
    }
  },

  /*
    massChangeProductionChoice() - Switches all buildings of a given type and amount to a specified production method in either a province or country scope. Returns amount of buildings whose production methods have been successfully changed.

    options: {
      amount: 15, - The amount of buildings of a type to change to a production method
      building_type: "lumberjacks", - The building type to target
      province_ids: ["4707", "4708"], - The province IDs in which to target changes. If not specified, default to country scope
    }
  */
  massChangeProductionChoice: function (arg0_user, arg1_production_choice_name, arg2_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var production_choice_name = arg1_production_choice_name.trim().toLowerCase();
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var province_ids = (options.province_ids) ?
      getList(options.province_ids) : getProvinces(user_id, { return_keys: true });
    var remaining_amount = JSON.parse(JSON.stringify(returnSafeNumber(options.amount)));

    //Iterate over all province_ids
    if (remaining_amount > 0) {
      var config_obj = getBuilding(options.building_type);

      if (!config_obj)
        return [false, `There is no building of the type **${options.building_type}**!`];

      var has_base_production_choice = hasBaseProductionChoice(options.building_type);
      var production_choice_key = getBuildingProductionChoice(options.building_type, production_choice_name);
      var switched_buildings = 0; //How many total buildings have been switched to this production choice

      if (production_choice_key) {
        var province_names = [];
        var unnamed_provinces = 0;

        for (var i = 0; i < province_ids.length; i++) {
          var local_province = main.province[province_ids];

          //Iterate over all buildings in local_province to try and change them
          if (local_province.buildings)
            for (var x = 0; x < local_province.buildings.length; x++) {
              var local_building = local_province.buildings[x];

              if (remaining_amount > 0)
                if (local_building.building_type == options.building_type) {
                  var switched_building = module.exports.changeProductionChoice(user_id, local_building, production_choice_key, {
                    has_base_production_choice: has_base_production_choice,
                    production_choice_key: production_choice_key
                  });

                  if (switched_building[0]) {
                    remaining_amount--;
                    switched_buildings++;

                    //Push to province_names/unnamed_provinces
                    if (local_province.name) {
                      province_names.push(`**${local_province.name}**`);
                    } else {
                      unnamed_provinces++;
                    }
                  }
                }
            }
        }

        //Return user feedback
        if (switched_buildings == 0) {
          return [true, `No **${(config_obj.name) ? config_obj.name : options.building_type}** building(s) could be successfully switched over to the Production Choice **${production_choice_name}**.`];
        } else {
          if (options.province_ids) {
            var province_string = `${(province_names.length > 0) ? `**${province_names.join(", ")}** ` : ""}${(unnamed_provinces > 0) ? ` and **${parseNumber(unnamed_provinces)}** province(s)` : ""}`;

            return [true, `**${parseNumber(switched_buildings)}**/${parseNumber(options.amount)} ${(config_obj.name) ? config_obj.name : options.building_type} were successfully switched over to **${parseProductionChoice(options.building_type, production_choice_key)}** in ${province_string}.`];
          } else {
            return [true, `**${parseNumber(switched_buildings)}**/${parseNumber(options.amount)} ${(config_obj.name) ? config_obj.name : options.building_type} were successfully switched over to **${parseProductionChoice(options.building_type, production_choice_key)}** nationwide.`];
          }

          //Refresh UI
          if (game_obj.page.startsWith("view_building_"))
            printBuilding(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
          if (game_obj.page.startsWith("view_buildings_"))
            printProvinceBuildings(user_id, building_obj, main.interfaces[game_obj.middle_embed.id].page);
          if (game_obj.page == "view_industry")
            printIndustry(user_id, main.interfaces[game_obj.middle_embed.id].page);
        }
      } else {
        return [false, `The production choice specified for ${(config_obj.name) ? config_obj.name : options.building_type}, **${production_choice_name}**, isn't valid!`];
      }
    } else if (remaining_amount == 0) {
      return [false, `You cannot switch the production methods of zero buildings!`];
    } else {
      return [false, `You cannot switch the production methods of neagtive buildings!`];
    }
  }
};
