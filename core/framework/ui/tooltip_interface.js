module.exports = {
  hasGoodTooltip: function (arg0_good) {
    //Convert from parameters
    var good_type = arg0_good;

    //Declare local instance variables
    var all_buildings = Object.keys(lookup.all_buildings);
    var good_obj = getGood(good_type);

    //Check if any building has a production method for this good
    for (var i = 0; i < all_buildings.length; i++) {
      var local_building = lookup.all_buildings[all_buildings[i]];
      var all_good_keys = Object.keys(local_building);

      if (local_building.produces) {
        var has_subobject = getSubobject(local_building.produces, good_type);

        if (has_subobject) {
          return true;
          break;
        }
      }
    }
  },

  goodTooltip: function (arg0_user, arg1_input) {
    //Convert from parameters
    var user_id = arg0_user;
    var input = arg1_input;

    //Declare local instance variables
    var all_good_names = getAllGoodNamesLowercase();
    var game_obj = getGameObject(user_id);

    //[(Good Name)] - Tooltip
    if (all_good_names.includes(input.trim().toLowerCase())) {
      var good_key = getGood(input.trim().toLowerCase(), { return_key: true });
      var local_good = lookup.all_goods[good_key];

      if (!local_good.hidden && !config.defines.economy.view_special_goods) {
        if (module.exports.hasGoodTooltip(good_key)) {
          var localisation_string = getProductionChainLocalisation(user_id, good_key, { display_icons: true }).join("\n");

          printAlert(game_obj.id, localisation_string);
        } else {
          printError(game_obj.id, `No production chain(s) for ${parseGood(good_key)} could be found!`);
        }
      } else {
        printError(game_obj.id, `You cannot view the production chains of special goods.`);
      }
    }
  }
};
