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
    var all_goods = global.lookup.all_goods;
    var good_exists = [false, "", ""]; //[good_exists, good_obj, good_id]

    var local_goods = Object.keys(all_goods);

    //Check if argument provided is a raw name
    if (all_goods[good_name])
      good_exists = [true, all_goods[good_name], good_name];
    if (!good_exists[0]) {
      //Search by name matches - Soft match first
      for (var x = 0; x < local_goods.length; x++) {
        var local_good = all_goods[local_goods[x]];

        if (!reserved.goods.includes(local_goods[x]))
          if (local_good.name)
            if (local_good.name.toLowerCase().indexOf(good_name) != -1)
              good_exists = [true, local_good, local_goods[x]];
      }

      //Search by name matches - Hard match second
      for (var x = 0; x < local_goods.length; x++) {
        var local_good = all_goods[local_goods[x]];

        if (!reserved.goods.includes(local_goods[x]))
          if (local_good.name)
            if (local_good.name.toLowerCase() == good_name)
              good_exists = [true, local_good, local_goods[x]];
      }

      //Move onto alias searching if good still does not exist based on the name
      if (!good_exists[0]) {
        var hard_alias_found = false;

        //Search by alias matches - Soft match first
        for (var x = 0; x < local_goods.length; x++) {
          var local_good = all_goods[local_goods[x]];

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
      return_names: false/true,
      return_object: false/true
    }
  */
  getGoods: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_good_categories = Object.keys(config.goods);
    var goods_array = [];
    var goods_object = {};

    //Debug printout
    log.debug(`getGoods() invoked from ${module.exports.getGoods.caller.name}()!`);

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
          if (!reserved.goods.includes(local_goods[x])) {
            var local_good = local_category[local_goods[x]];

            //Add parent good
            (options.return_names) ?
              goods_array.push(local_goods[x]) :
              goods_array.push(local_good);

            goods_object[local_goods[x]] = local_good;

            //Recursively add subgoods
            if (local_good.type == "category") {
              var all_subgoods = module.exports.getSubgoods(local_good, options);

              if (Array.isArray(all_subgoods)) {
                for (var y = 0; y < all_subgoods.length; y++)
                  goods_array.push(all_subgoods[y]);
              } else {
                var all_recursive_subgoods = Object.keys(all_subgoods);

                for (var y = 0; y < all_recursive_subgoods.length; y++)
                  goods_object[all_recursive_subgoods[y]] = all_subgoods[all_recursive_subgoods[y]];
              }
            }
          }
    }

    //Return statement
    return (!options.return_object) ? goods_array : goods_object;
  },

  getRawGoods: function (arg0_options) {
    //Declare local instance variables
    var all_good_names = module.exports.getGoods({ return_names: true });
    var all_goods = module.exports.getGoods();
    var options = (arg0_options) ? arg0_options : {};
    var raw_goods = [];

    for (var i = 0; i < all_goods.length; i++)
      if (all_goods[i].mine_action_chance || all_goods[i].quarry_action_chance || all_goods[i].chop_action_chance || all_goods[i].is_RGO)
        raw_goods.push((!options.return_names) ? all_goods[i] : all_good_names[i]);

    //Return statement
    return raw_goods;
  },

  getSubgoods: function (arg0_object, arg1_options) {
    //Convert from parameters
    var good_obj = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_subgood_keys = Object.keys(good_obj);
    var goods_array = [];
    var goods_object = {};

    //Iterate over all subgoods
    for (var i = 0; i < all_subgood_keys.length; i++)
      if (!reserved.goods.includes(all_subgood_keys[i])) {
        var local_good = good_obj[all_subgood_keys[i]];
        var push_good = true;

        //Exclude categories if asked for
        if (options.exclude_categories)
          if (local_good.type == "category")
            push_good = false;

        if (push_good) {
          (options.return_names) ?
            goods_array.push(all_subgood_keys[i]) :
            goods_array.push(local_good);

          goods_object[all_subgood_keys[i]] = local_good;
        }

        //Recursively add subgoods, just exclude parent if exclude_categories is true
        if (local_good.type == "category") {
          var recursive_subgoods = module.exports.getSubgoods(local_good, options);

          if (Array.isArray(recursive_subgoods)) {
            for (var x = 0; x < recursive_subgoods.length; x++)
              goods_array.push(recursive_subgoods[x]);
          } else {
            var all_recursive_subgoods = Object.keys(recursive_subgoods);

            for (var x = 0; x < all_recursive_subgoods.length; x++)
              goods_object[all_recursive_subgoods[x]] = recursive_subgoods[all_recursive_subgoods[x]];
          }
        }
      }

    //Return statement
    return (!options.return_object) ? goods_array : goods_object;
  }
};
