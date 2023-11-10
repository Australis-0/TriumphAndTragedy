module.exports = {
  printBudget: function (arg0_user, arg1_page, arg2_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? arg1_page : 0;
    var do_not_display = arg2_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise budget_string
    var all_cooldowns = Object.keys(usr.cooldowns);
    var all_taxes = Object.keys(usr.custom_taxes);
    var budget_string = [];
    var expenditures_string = [];
    var has_syphoned_actions = false;
    var tax_object = getTotalTaxObject(user_id);
    var total_production = getProduction(user_id);
    var total_tax_pc_cost = 0;
    var total_tax_revenue = 0;
    var user_income = getIncome(user_id, total_production);
    var war_reparations = getWarReparations(user_id, user_income);

    var total_actions_gained_per_turn = [
      config.defines.economy.starting_actions + ((total_production.actions) ? total_production.actions[0] : 0),
      config.defines.economy.starting_actions + ((total_production.actions) ? total_production.actions[1] : 0)
    ].sort(function (a, b) { return a - b });
    var total_maintenance = [
      (total_production.money_upkeep) ? total_production.money_upkeep[0] : 0,
      (total_production.money_upkeep) ? total_production.money_upkeep[1] : 0
    ].sort(function (a, b) { return a - b });
    var unit_upkeep = getUnitUpkeep(user_id);

    //Edit total_maintenance now that it includes unit maintenance
    total_maintenance[0] -= unit_upkeep;
    total_maintenance[1] -= unit_upkeep;

    //Push to budget_string
    budget_string.push(`__**Economic Statistics:**__`);
    budget_string.push("");

    budget_string.push(`${config.icons.government} Tax Efficiency: **${printPercentage(usr.modifiers.tax_efficiency)}**`);
    //Push dynamic tax_efficiency modifiers from pops

    for (var i = 0; i < all_pops.length; i++) {
      var local_pop = config.pops[all_pops[i]];

      if (local_pop.per_100k)
        if (local_pop.per_100k.tax_efficiency)
          budget_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.formal_name) ? local_pop.formal_name : all_pops[i]} Modifier: **${printPercentage(getPopModifier(user_id, all_pops[i], "tax_efficiency"), { display_prefix: true })}**`);
    }

    //Display actions
    budget_string.push("");
    (total_actions_gained_per_turn[0] == total_actions_gained_per_turn[1]) ?
      budget_string.push(`${config.icons.actions} Actions (**${parseNumber(total_actions_gained_per_turn[0], { display_prefix: true })}** per turn)`) :
      budget_string.push(`${config.icons.actions} Actions (**${parseNumber(total_actions_gained_per_turn[0], { display_prefix: true })}**-**${parseNumber(total_actions_gained_per_turn[1])}** per turn)`);

    //Check for has_syphoned_actions
    for (var i = 0; i < all_cooldowns.length; i++)
      if (all_cooldowns[i].includes("syphon_actions"))
        has_syphoned_actions = true;

    if (has_syphoned_actions) {
      var syphoned_actions = [
        getSyphonedActions(user_id, total_actions_gained_per_turn[0]),
        getSyphonedActions(user_id, total_actions_gained_per_turn[1])
      ];

      (syphoned_actions[0] != syphoned_actions[1]) ?
        budget_string.push(`- **${parseNumber(syphoned_actions[0])}** - **${parseNumber(syphoned_actions[1])}** Actions will be diverted to pay off reparations next turn.`) :
        budget_string.push(`- **${parseNumber(syphoned_actions[0])}** Actions will be diverted to pay off reparations next turn.`);
    }

    budget_string.push(`- **${printPercentage(usr.modifiers.civilian_actions)}** of your actions will be used up as ${config.icons.trade} **Civilian Goods** next turn.`);

    budget_string.push("");
    budget_string.push(`Note: Buildings that lack requisite goods or maintenance will not produce anything.`);
    budget_string.push("");

    budget_string.push("");

    //Expenditures
    {
      budget_string.push(`__**Expenditures:**__`);
      budget_string.push("");

      if (unit_upkeep > 0)
        expenditures_string.push(`- ${(unit_upkeep > 0) ? "-" : "+"}**£${parseNumber(unit_upkeep)}** from unit maintenance.`);
      if (total_maintenance[0] + total_maintenance[1] > 0)
        if (total_maintenance[0] == total_maintenance[1]) {
          expenditures_string.push(`- ${(total_maintenance[0] > 0) ? "-" : "+"}**£${parseNumber(total_maintenance[0])}** from building maintenance.`);
        } else {
          expenditures_string.push(`- ${(total_maintenance[0] > 0) ? "-" : "+"}**£${parseNumber(total_maintenance[0])}** - ${(total_maintenance[1] < 0) ? "-" : "+"}**£${parseNumber(total_maintenance[1])}** from building maintenance.`);
        }

      //War reparations
      if (Object.keys(war_reparations).length > 0) {
        var all_war_reparations = Object.keys(war_reparations);

        for (var i = 0; i < all_war_reparations.length; i++) {
          var local_amount = war_reparations[all_war_reparations[i]];
          var local_recipient = main.users[all_war_reparations[i]];

          (local_amount[0] != local_amount[1]) ?
            expenditures_string.push(`- -**£${parseNumber(local_amount[0])}** - -**£${parseNumber(local_amount[1])}** will be paid to **${local_recipient.name}** as war reparations for the next **${parseNumber(local_amount[2])}** turn(s).`) :
            expenditures_string.push(`- -**£${parseNumber(local_amount[0])}** will be paid to **${local_recipient.name}** as war reparations for the next **${parseNumber(local_amount[2])}** turn(s).`);
        }
      }

      var money_string = (user_income[0] != user_income[1]) ?
        `${parseNumber(user_income[0])} - ${parseNumber(user_income[1])}` :
        parseNumber(user_income[0]);

      if (expenditures_string.length > 0) {
        budget_string.push(expenditures_string.join("\n"));
        budget_string.push("");
      } else {
        budget_string.push(`_We currently have no expenditures to speak of._`);
        budget_string.push("");
      }
    }

    //Revenues
    {
      budget_string.push(`__**Revenues:**__`);
      budget_string.push("");
      budget_string.push(`Your economic advisor estimates that you will gain ${config.icons.money} **${money_string}** in total income next turn.`);
      budget_string.push("");
      budget_string.push(config.localisation.divider);
      budget_string.push("");

      //Display total bureaucratic tax cost
      budget_string.push(`__**Bureaucratic Cost:**__`);
      budget_string.push("");

      if (tax_object.revenue != 0 && returnSafeNumber(tax_object.political_capital) != 0) {
        (tax_object.political_capital <= 0) ?
          budget_string.push(`Our current Tax Code costs us ${config.icons.political_capital} **${parseNumber(tax_object.political_capital)}** Political Capital over **${parseNumber(tax_object.instituted_taxes)}** instituted tax(es).`) :
          budget_string.push(`Our current Tax Code costs us nothing in terms of Political Capital over **${parseNumber(tax_object.instituted_taxes)}** instituted tax(es).`);
        budget_string.push(`- We earned ${config.icons.money} **${parseNumber(tax_object.revenue, { display_prefix: true })}** in taxed revenue last turn. It has since been added to our National Treasury.`);
      } else {
        budget_string.push(`Our current Tax Code costs us nothing and earns us nothing. We should probably start taxing our population to give ourselves a budget.`);
      }

      budget_string.push("");
    }

    //Revenues - Format tax code
    {
      budget_string.push(`__**Tax Code:**__`);

      if (getIncome(user_id)[0] < 0) {
        budget_string.push("");
        budget_string.push(`:warning: Consider adjusting your tax rate to gain additional income.`);
      }

      budget_string.push("");
      budget_string.push(`> Estimated tax revenues are based on last turn. This is also how the total income figure is calculated.`);
      budget_string.push("");

      var corporate_suffix_string = (usr.corporate_tax != 0) ?
        ` - ${config.icons.political_capital} ${parseNumber(corporate_tax_cost.political_capital*-1)}PC - ${config.icons.money} ${parseNumber(returnSafeNumber(usr.trackers.tax.corporate_tax), { display_prefix: true })}` : "";
      var corporate_tax_cost = getTaxCost(user_id, `corporate_tax`);

      budget_string.push(`Corporate Income Tax: **${printPercentage(usr.corporate_tax)}**/**${printPercentage(usr.modifiers.corporate_max_tax)}**${corporate_suffix_string}`);
      budget_string.push("");
      budget_string.push(`**Class Taxes:**`);
      budget_string.push("");

      //Income Taxes
      for (var i = 0; i < lookup.all_classes.length; i++) {
        var local_class = lookup.all_classes[i];
        var tax_key = `${local_class}_income_tax`;

        var local_tax = usr[tax_key];
        var local_tax_cost = getTaxCost(user_id, tax_key);
        var suffix_string = (local_tax != 0) ? ` - ${config.icons.political_capital} ${parseNumber(local_tax_cost.political_capital*-1)}PC - ${config.icons.money} ${parseNumber(returnSafeNumber(usr.trackers.tax[tax_key]), { display_prefix: true })}` : "";

        budget_string.push(`- ${parseString(local_class)} Class Income Tax: **${printPercentage(local_tax)}**/${printPercentage(returnSafeNumber(usr.modifiers[`${local_class}_income_max_tax`]))}${suffix_string}`);
      }

      //Duties
      budget_string.push("");
      budget_string.push(`> Duties are taxes levied on pop purchases of consumption goods, similar to sales taxes.`);
      budget_string.push("");

      for (var i = 0; i < lookup.all_classes.length; i++) {
        var local_class = lookup.all_classes[i];
        var tax_key = `${local_class}_duties_tax`;

        var local_tax = usr[tax_key];
        var local_tax_cost = getTaxCost(user_id, tax_key);
        var suffix_string = (local_tax != 0) ? ` - ${config.icons.political_capital} ${parseNumber(local_tax_cost.political_capital*-1)}PC - ${config.icons.money} ${parseNumber(returnSafeNumber(usr.trackers.tax[tax_key]), { display_prefix: true })}` : "";

        budget_string.push(`- ${parseString(local_class)} Duties: **${printPercentage(local_tax)}**/${printPercentage(returnSafeNumber(usr.modifiers[`${local_class}_duties_max_tax`]))}${suffix_string}`);
      }

      budget_string.push("");
      budget_string.push(`We currently have **${(all_taxes.length == 0) ? `no` : parseNumber(all_taxes.length)}** individual taxes levied on our industries.`);
      budget_string.push(`- **[Edit Tax Code]**`);
      budget_string.push("");
      budget_string.push(`- **[Set Tax]**`);
    }

    budget_string.push("");
    budget_string.push(`${config.icons.blockade} Blockade status: ${(isBlockaded(user_id)) ? "you are currently blockaded!" : "you are currently not blockaded."}`);

    //Create embed and edit to message
    var all_embeds = splitEmbed(budget_string, {
      title: `[Back] | [Jump To Page] | Budget:`,
      title_pages: true,
      fixed_width: true
    });

    if (!do_not_display) {
      //Remove control panel if one exists
      if (game_obj)
        removeControlPanel(game_obj.id);

      createPageMenu(game_obj.middle_embed, {
        embed_pages: all_embeds,
        page: page,
        user: game_obj.user
      });
    }

    //Return statement
    return all_embeds;
  },

  printCustomTaxes: function (arg0_user, arg1_page, arg2_do_not_display) {
    //Convert from parameters
    var user_id = arg0_user;
    var page = (arg1_page) ? arg1_page : 0;
    var do_not_display = arg2_do_not_display;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_taxes = Object.keys(usr.custom_taxes);
    var total_production = getProduction(user_id);
    var user_income = getIncome(user_id, total_production);

    //Format tax_string
    var tax_string = [];

    //Print header, buttons first
    tax_string.push(`- **[Add Tax]** | **[Move Tax]** | **[Remove Tax]**`);
    tax_string.push("");
    tax_string.push(`> This is a list of custom nationwide taxes imposed on various industries and buildings in your country. Industry taxes may only be instituted on commercial or industrial buildings.`);
    tax_string.push("");
    tax_string.push(`__**Industry Taxes:**__`);
    tax_string.push("");
    tax_string.push(`> Industry tax caps are determined by your Maximum Tax modifier.`);
    tax_string.push("");
    tax_string.push(`\`#. Tax Name - (Current Rate/Max. Rate) - PC Cost - Last Turn Revenue\``);
    tax_string.push("");
    tax_string.push(config.localisation.divider);
    tax_string.push("");

    //Iterate over all_taxes
    for (var i = 0; i < all_taxes.length; i++) {
      var local_revenue = returnSafeNumber(usr.trackers.tax[all_taxes[i]]);
      var local_tax = usr.custom_taxes[all_taxes[i]];
      var local_tax_cost = getTaxCost(user_id, all_taxes[i], { custom_tax: true });
      var pc_string = (local_tax_cost.political_capital != 0) ?
        `${config.icons.political_capital} ${parseNumber(local_tax_cost.political_capital*-1)}` : "";

      tax_string.push(`${i + 1}. ${parseTaxName(all_taxes[i])} - (**${printPercentage(local_tax)}**/${printPercentage(usr.modifiers.max_tax)}) - ${pc_string} - ${config.icons.money} ${parseNumber(local_revenue, { display_prefix: true })}`);
    }

    //Print total income at bottom
    var money_string = (user_income[0] != user_income[1]) ?
      `${parseNumber(user_income[0])} - ${parseNumber(user_income[1])}` :
      parseNumber(user_income[0]);

    tax_string.push(`Your economic advisor estimates that you will gain ${config.icons.money} **${money_string}** in total income next turn.`);

    //Edit main embed display
    var all_embeds = splitEmbed(tax_string, {
      title: `[Back] | [Jump To Page] | Custom Taxes:`,
      title_pages: true,
      fixed_width: true
    });

    if (!do_not_display) {
      //Remove control panel if one exists
      removeControlPanel(game_obj.id);

      createPageMenu(game_obj.middle_embed, {
        embed_pages: all_embeds,
        page: page,
        user: game_obj.user
      });
    }

    return all_embeds;
  }
};
