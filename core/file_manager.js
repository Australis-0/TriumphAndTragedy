module.exports = {
  import: function (arg0_require_obj) {
    //Convert from parameters
    const local_library = require(arg0_require_obj);

    //Add to global namespace
    var all_properties_in_library = Object.keys(local_library);
    for (var i = 0; i < all_properties_in_library.length; i++) {
      global[all_properties_in_library[i]] = local_library[all_properties_in_library[i]];
    }
  }
};
