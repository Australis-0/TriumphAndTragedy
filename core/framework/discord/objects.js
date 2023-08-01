//Objects framework
module.exports = {
  divideObject: function (arg0_scope, arg1_amount, arg2_not_recursive, arg3_round) {
    //Convert from parameters
    var scope = JSON.parse(JSON.stringify(arg0_scope));
    var amount = arg1_amount;
    var not_recursive = arg2_not_recursive;
    var round = arg3_round;

    //Declare local instance variables
    var multiplier = 1/amount;

    //Return statement
    return module.exports.multiplyObject(scope, multiplier, not_recursive, round);
  },

  //flattenObject() - Moves all keys into the first nesting
  flattenObject: function (arg0_scope) {
    //Convert from parameters
    var scope = JSON.parse(JSON.stringify(arg0_scope)); //Deep copy or bad things happen

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys to move keys into current scope
    for (var i = 0; i < all_scope_keys.length; i++) {
      var flattened_subobj = {};
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "object") {
        flattened_subobj = module.exports.flattenObject(local_subobj);

        var all_flattened_keys = Object.keys(flattened_subobj);

        for (var x = 0; x < all_flattened_keys.length; x++)
          if (!scope[all_flattened_keys[x]]) {
            scope[all_flattened_keys[x]] = flattened_subobj[all_flattened_keys[x]];
          } else {
            scope[all_flattened_keys[x]] += flattened_subobj[all_flattened_keys[x]];
          }
      } else if (typeof local_subobj == "number") {
        if (!scope[all_scope_keys[i]]) {
          scope[all_scope_keys[i]] = local_subobj;
        } else {
          scope[all_scope_keys[i]] += local_subobj;
        }
      } else {
        scope[all_scope_keys[i]] = local_subobj;
      }
    }

    //Delete any remanent typeof object in the current scope
    all_scope_keys = Object.keys(scope);

    for (var i = 0; i < all_scope_keys.length; i++)
      if (typeof scope[all_scope_keys[i]] == "object")
        delete scope[all_scope_keys[i]];

    //Return statement
    return scope;
  },

  getSubobject: function (arg0_scope, arg1_key, arg2_restrict_search) {
    //Convert from parameters
    var scope = arg0_scope;
    var key = arg1_key;
    var restrict_search = arg2_restrict_search;

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Process key
    if (!Array.isArray(key))
      key = getList(key.split("."));

    //Iterate over all_scope_keys
    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_subobj = scope[all_scope_keys[i]];

      if (all_scope_keys[i] == key[key.length - 1]) {
        //Guard clause
        return local_subobj;
        break;
      } else if (typeof local_subobj == "object") {
        var explore_object = false;
        var new_key = JSON.parse(JSON.stringify(key));
        if (key.length > 1)
          restrict_search = true;

        if (restrict_search && all_scope_keys[i] == key[0]) {
          new_key.splice(0, 1);
          explore_object = true;
        }
        if (!restrict_search) explore_object = true;

        //Restrict search for certain arguments
        if (explore_object) {
          var has_subobj = module.exports.getSubobject(local_subobj, new_key, restrict_search);

          if (has_subobj) {
            //Return statement
            return has_subobj;
            break;
          }
        }
      }
    }
  },

  /*
    getSubobjectKeys() - Returns a list of subobject keys from the current scope
    options: {
      exclude_keys: [], - A list of keys to exclude
      include_objects: true/false, - Whether or not to include object keys
      only_objects: true/false - Whether to only include objects
    }
  */
  getSubobjectKeys: function (arg0_scope, arg1_options) {
    //Convert from parameters
    var scope = arg0_scope;
    var options = (arg1_options) ? arg1_options : {};

    if (!options.exclude_keys) options.exclude_keys = [];

    //Declare local instance variables
    var all_keys = [];
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys
    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "object") {
        var all_subkeys = module.exports.getSubobjectKeys(local_subobj, options);

        if (options.include_objects || options.only_objects)
          if (!options.exclude_keys.includes(all_scope_keys[i]))
            all_keys.push(all_scope_keys[i]);

        for (var x = 0; x < all_subkeys.length; x++)
          if (!options.exclude_keys.includes(all_subkeys[x]))
            all_keys.push(all_subkeys[x]);
      } else {
        if (!options.only_objects)
          if (!options.exclude_keys.includes(all_scope_keys[i]))
            all_keys.push(all_scope_keys[i]);
      }
    }

    //Return statement
    return all_keys;
  },

  mergeObjects: function (arg0_scope, arg1_scope) {
    //Convert from parameters
    var merged_obj = JSON.parse(JSON.stringify(arg0_scope));
    var merge_obj = JSON.parse(JSON.stringify(arg1_scope));

    //Declare local instance variables
    var all_merge_keys = Object.keys(merge_obj);

    for (var i = 0; i < all_merge_keys.length; i++) {
      var local_value = merge_obj[all_merge_keys[i]];

      if (typeof local_value == "number") {
        if (merged_obj[all_merge_keys[i]]) {
          merged_obj[all_merge_keys[i]] = merged_obj[all_merge_keys[i]] + local_value; //Add numbers together
        } else {
          merged_obj[all_merge_keys[i]] = local_value;
        }
      } else {
        merged_obj[all_merge_keys[i]] = local_value;
      }
    }

    //Return statement
    return merged_obj;
  },

  multiplyObject: function (arg0_scope, arg1_amount, arg2_not_recursive, arg3_round) {
    //Convert from parameters
    var scope = JSON.parse(JSON.stringify(arg0_scope));
    var amount = arg1_amount;
    var not_recursive = arg2_not_recursive;
    var round = (arg3_round) ? arg3_round : "ceil";

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys
    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "number")
        scope[all_scope_keys[i]] = (!round) ? local_subobj*amount :
          Math[round](local_subobj*amount);
      if (typeof local_subobj == "object")
        if (!not_recursive)
          scope[all_scope_keys[i]] = module.exports.multiplyObject(local_subobj, amount, not_recursive, round);
    }

    //Return statement
    return scope;
  },

  removeZeroes: function (arg0_scope) {
    //Convert from parameters
    var scope = JSON.parse(JSON.stringify(arg0_scope));

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys
    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "number")
        if (local_subobj == 0)
          delete scope[all_scope_keys[i]];
      if (typeof local_subobj == "object")
        scope[all_scope_keys[i]] = module.exports.removeZeroes(local_subobj);
    }

    //Return statement
    return scope;
  }
};
