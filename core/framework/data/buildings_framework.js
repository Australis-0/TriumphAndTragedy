module.exports = {
  /*
    getBuildingCategory() - Returns back a building_category object/key based on options
    options: {
      return_key: true/false - Whether or not to return back the building category key instead of object. False by default
    }
  */
  getBuildingCategory: function (arg0_name, arg1_options) {
    //Convert from parameters
    var building_category_name = arg0_name.toLowerCase();

    //Initialise options
    var options = (arg1_options) ? arg1_options : {};
    if (!options.return_key) options.return_key = false;

    //Declare local instance variables
    var all_building_categories = Object.keys(config.buildings);
    var all_processed_building_categories = [];
    var building_category_exists = [false, ""]; //[building_category_exists, building_category_obj];

    //Initialise all_processed_building_categories
    for (var i = 0; i < all_building_categories.length; i++)
      all_processed_building_categories.push(parseString(all_building_categories[i]));

    //Fetch config object
    if (config.buildings[building_category_name]) {
      return (options.return_key) ? config.buildings[building_category_name] : building_category_name;
    } else {
      //If the building category cannot be found verbatim, start a soft-hard search by parsed strings
      //Soft match first
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase().indexOf(building_category_name) != -1)
          building_category_exists = [true, (options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Hard match second
      for (var i = 0; i < all_processed_building_categories.length; i++)
        if (all_processed_building_categories[i].toLowerCase() == building_category_name)
          building_category_name = [true, (options.return_key) ? config.buildings[all_building_categories[i]] : all_building_categories[i]];

      //Return statement after soft-hard search
      return (building_category_name[0]) ? building_category_name[1] : undefined;
    }
  }
};
