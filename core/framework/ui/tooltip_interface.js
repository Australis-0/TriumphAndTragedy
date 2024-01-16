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
  },

  viewProductionTooltip: function (arg0_user, arg1_input) {
    //Convert from parameters
    var user_id = arg0_user;
    var input = arg1_input;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //[Artisan Production]
    if (input == "artisan production") {
      //Format tooltip_string
      var artisan_pops = [];
      var tooltip_string = [];

      tooltip_string.push(`**Subsistence Artisan Production:**`);
      tooltip_string.push("");
      tooltip_string.push(`_All unemployed Artisan Pops are automatically assigned to Subsistence industries, producing non-RGO Pop Needs for themselves to buy._`);
      tooltip_string.push("");

      for (var i = 0; i < lookup.artisan_pops.length; i++)
        artisan_pops.push(parsePop(lookup.artisan_pops[i]));

      tooltip_string.push(`- Artisan pop(s): ${(lookup.artisan_pops.length > 0) ? artisan_pops.join(", ") : `_No artisan pops._`}`);
      tooltip_string.push("");
      tooltip_string.push(`- Artisans produce **1** Good per **${parseNumber(config.defines.economy.artisan_per_production)}** Artisans, factoring in good Complexity.`);
      tooltip_string.push(` - This number scales with the Artisan population. It takes an extra **${parseNumber(config.defines.economy.artisan_per_production_scale)}** Artisans to produce **1** Good per **${parseNumber(1000)}** Subsistence Artisans.`);
      tooltip_string.push(` - Artisans can only produce the goods you can.`);
      tooltip_string.push(` - Artisans not employed in Subsistence will not produce Subsistence resources.`);
      tooltip_string.push(` - Complexity is calculated using the length of a production chain. The longest is set to 100%, and all other good Complexities are fractionally scaled to it.`);
      tooltip_string.push(`- Urban artisan production is rounded up, whereas rural artisan production is rounded down.`);

      printAlert(game_obj.id, tooltip_string.join("\n"));
    }

    //[RGO Production]
    if (input == "rgo production") {
      //Format tooltip_string
      var non_artisan_pops = [];
      var tooltip_string = [];

      tooltip_string.push(`**Subsistence RGO Production:**`);
      tooltip_string.push("");
      tooltip_string.push(`**RGOs**_, also known as_ **Resource Gathering Operations**_, are raw resources that are worked by pops in Subsistence. All Non-Artisan Pops not in Formal Employment are immediately assigned to Subsistence._`);
      tooltip_string.push("");
      tooltip_string.push(`_All RGO Throughput, including buildings dealing with RGOs are scaled by a country's_ **RGO Throughput** _modifier._`);
      tooltip_string.push("");

      for (var i = 0; i < all_pops.length; i++)
        if (!lookup.artisan_pops.includes(all_pops[i]))
          non_artisan_pops.push(parsePop(all_pops[i]));

      tooltip_string.push(`- Non-Artisan pop(s): ${(non_artisan_pops.length > 0) ? non_artisan_pops.join(", ") : `No non-artisan pops._`}`);
      tooltip_string.push(`- Current RGO Throughput Modifier: **${printPercentage(usr.modifiers.rgo_throughput, { base_one: true })}**`);
      tooltip_string.push("");
      tooltip_string.push(`- Non-Artisans produce **1** Good per **${parseNumber(config.defines.rgo_per_production)}** Non-Artisans, factoring in RGO Rarity and RGO Throughput.`);
      tooltip_string.push(` - Rarity is determined by the initial buy price of a good.`);
      tooltip_string.push(` - RGOs are defined by the natural Resource of a given Province.`);

      printAlert(game_obj.id, tooltip_string.join("\n"));
    }
  },
};
