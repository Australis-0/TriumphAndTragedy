module.exports = {
  /*
    getGood() - Fetches a good's key/object based on its options.
    options: {
      return_key: true/false - Whether or not to return the key instead of the object. False by default.
    }
  */
  getGood: function (arg0_name, arg1_options) {
    //Convert from parameters
    var good_name = arg0_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var good_exists = [false, "", ""]; //[good_exists, good_obj, good_id]

    for (var i = 0; i < all_good_categories.length; i++) {
      var local_category = config.goods[all_good_categories[i]];
      var local_goods = Object.keys(local_category);

      //Check if argument provided is a raw name
      if (local_category[good_name]) {
        good_exists = [true, local_category[good_name], good_name];
      }
      if (!good_exists[0]) {
        //Search by name matches - Soft match first
        for (var x = 0; x < local_goods.length; x++) {
          var local_good = local_category[local_goods[x]];

          if (!["name", "icon"].includes(local_goods[x]))
            if (local_good.name.toLowerCase().indexOf(good_name) != -1)
              good_exists = [true, local_good, local_goods[x]];
        }

        //Search by name matches - Hard match second
        for (var x = 0; x < local_goods.length; x++) {
          var local_good = local_category[local_goods[x]];

          if (!["name", "icon"].includes(local_goods[x]))
            if (local_good.name.toLowerCase() == good_name)
              good_exists = [true, local_good, local_goods[x]];
        }

        //Move onto alias searching if good still does not exist based on the name
        if (!good_exists[0]) {
          var hard_alias_found = false;

          //Search by alias matches - Soft match first
          for (var x = 0; x < local_goods.length; x++) {
            var local_good = local_category[local_goods[x]];

            if (local_good.aliases && !hard_alias_found) {
              //Soft match first
              for (var y = 0; y < local_good.aliases.length; y++)
                if (local_good.aliases[y].toLowerCase().indexOf(good_name) != -1)
                  good_exists = [true, local_good, local_goods[x]];

              //Hard match second
              for (var y = 0; y < local_good.aliases.length; y++)
                if (local_good.aliases[y].toLowerCase() == good_name) {
                  good_exists = [true, local_good, local_goods[x]];
                  hard_alias_found = true;
                }
            }
          }
        }
      }
    }

    //Assign JSON key to .id for ease-of-use
    if (good_exists[0]) good_exists[1].id = good_exists[2];

    //Return statement
    return (good_exists[0]) ?
      (!options.return_key) ? good_exists[1] : good_exists[2] :
    undefined;
  },

  /*
    getGoods() - Returns an array of all good objects unless specified otherwise.
    options: {
      exclude_categories: []
      exclude_hidden: false/true,
      return_names: false/true
    }
  */
  getGoods: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var goods_array = [];

    //Iterate over all goods categories and push all goods therein to array
    for (var i = 0; i < all_good_categories.length; i++) {
      var local_category = config.goods[all_good_categories[i]];
      var local_goods = Object.keys(local_category);

      //Check if category meets the conditions described in options
      var category_meets_conditions = true;

      try {
        if (options.exclude_categories.includes(all_good_categories[i])) category_meets_conditions = false;
      } catch {}
      if (options.exclude_hidden && all_good_categories[i] == "hidden") category_meets_conditions = false;

      //If the category meets the conditions, push all the local goods inside of it to goods_array, either with their name, or with their object depending on the options
      if (category_meets_conditions)
        for (var x = 0; x < local_goods.length; x++)
          (options.return_names) ?
            goods_array.push(local_goods[x]) :
            goods_array.push(local_category[local_goods[x]]);
    }

    //Return statement
    return goods_array;
  },

  getRawGoods: function (arg0_options) {
    //Declare local instance variables
    var all_good_names = module.exports.getGoods({ return_names: true });
    var all_goods = module.exports.getGoods();
    var options = (arg0_options) ? arg0_options : {};
    var raw_goods = [];

    for (var i = 0; i < all_goods.length; i++)
      if (all_goods[i].mine_action_chance || all_goods[i].quarry_action_chance || all_goods[i].chop_action_chance)
        raw_goods.push((!options.return_names) ? all_goods[i] : all_good_names[i]);

    //Return statement
    return raw_goods;
  }
};
