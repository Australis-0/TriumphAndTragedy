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
      var production_chain_localisation = getProductionChainLocalisation(user_id, good_key, { display_icons: true });

      if (!local_good.hidden && !config.defines.economy.view_special_goods) {
        var config_obj = lookup.all_goods[good_key];
        var localisation_string = [];

        //Push general good statistics
        if (config_obj) {
          if (config_obj.icon)
            localisation_string.push(`# ${config.icons[config_obj.icon]}`);
          localisation_string.push(`### Good Info:`);
          localisation_string.push(`- Name: ${(config_obj.name) ? config_obj.name : config_obj.id} (ID: ${config_obj.id})`);
          if (config_obj.type)
            localisation_string.push(`- Good Type: ${parseString(config_obj.type)}`);

          if (config_obj.type == "category") {
            var all_subgoods = lookup.all_subgoods[good_key];

            if (all_subgoods) {
              localisation_string.push(`- Subgoods:`);

              for (var i = 0; i < all_subgoods.length; i++) {
                var local_good = lookup.all_goods[all_subgoods[i]];

                localisation_string.push(` - ${(local_good.icon) ? config.icons[local_good.icon] + " " : ""}${(local_good.name) ? local_good.name : local_good.id}`);
              }
            }
          }

          if (config_obj.is_cp)
            localisation_string.push(`- Crafting Point.`);
          if (config_obj.doesnt_stack)
            localisation_string.push(`- Good does not stack.`);
          if (config_obj.research_good)
            localisation_string.push(`- Research Good.`);
        }

        //Push market price if it exists
        var local_market_good = main.market[good_key];

        if (!local_market_good)
          localisation_string.push("");
        if (local_market_good) {
          localisation_string.push("");
          localisation_string.push(config.localisation.divider);
          localisation_string.push(`### Market:`);
          localisation_string.push(`${config.icons.trade} Stock: ${parseNumber(local_market_good.stock)} | ${config.icons.taxes} Demand: ${parseNumber(local_market_good.demand)}`);
          localisation_string.push(`- Buy Price: £${parseNumber(local_market_good.buy_price)} | Sell Price: **£${parseNumber(local_market_good.sell_price)}**`);
        }
        if (module.exports.hasGoodTooltip(good_key)) {
          localisation_string.push("");
          localisation_string.push(config.localisation.divider);
          localisation_string.push("");
          localisation_string.push(production_chain_localisation.join("\n"));
        }

        //Join localisation_string
        localisation_string = localisation_string.join("\n");

        printAlert(game_obj.id, localisation_string);
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
