//Objects framework
module.exports = {
  divideObject: function (arg0_scope, arg1_amount, arg2_not_recursive, arg3_round) {
    //Convert from parameters
    var scope = arg0_scope;
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
    var scope = arg0_scope;

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys to move keys into current scope
    for (var i = 0; i < all_scope_keys.length; i++) {
      var flattened_subobj = {};
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "object") {
        flattened_subobj = module.exports.flattenObject(scope);

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
    all_scope_keys = Objcet.keys(scope);

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

  multiplyObject: function (arg0_scope, arg1_amount, arg2_not_recursive, arg3_round) {
    //Convert from parameters
    var scope = arg0_scope;
    var amount = arg1_amount;
    var not_recursive = arg2_not_recursive;
    var round = arg3_round;

    //Declare local instance variables
    var all_scope_keys = Object.keys(scope);

    //Iterate over all_scope_keys
    for (var i = 0; i < all_scope_keys.length; i++) {
      var local_subobj = scope[all_scope_keys[i]];

      if (typeof local_subobj == "number")
        local_subobj = (!round) ? local_subobj*amount :
          Math[round](local_subobj*amount);
      if (typeof local_subobj == "object")
        if (!not_recursive)
          local_subobj = module.exports.multiplyObject(local_subobj, amount, not_recursive);
    }

    //Return statement
    return scope;
  }
};
