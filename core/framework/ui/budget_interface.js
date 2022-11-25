module.exports = {
  printBudget: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise budget_string
    var all_cooldowns = Object.keys(usr.cooldowns);
    var budget_string = [];
    var expenditures_string = [];
    var has_syphoned_actions = false;
    var total_production = getProduction(user_id);
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
    var unit_upkeep = getUnitUpkeep(actual_id);

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
          budget_string.push(`- ${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.formal_name) ? local_pop.formal_name : all_pops[i]} Modifier: **${printPercentage(getPopModifier(actual_id, all_pops[i], "tax_efficiency"), { display_prefix: true })}**`);
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

    expenditures_string.push(`__**Expenditures:**__`);
    expenditures_string.push("");

    if (unit_upkeep > 0)
      expenditures_string.push(`- ${(unit_upkeep > 0) ? "-" : "+"}**£${parseNumber(unit_upkeep)}** from unit maintenance.`);
    if (total_maintenance[0] + total_maintenance[1] > 0)
      if (total_maintenance[0] == total_maintenance[1])
        expenditures_string.push(`- ${(total_maintenance[0] > 0) ? "-" : "+"}**£${parseNumber(total_maintenance[0])}** from building maintenance.`);
      else
        expenditures_string.push(`- ${(total_maintenance[0] > 0) ? "-" : "+"}**£${parseNumber(total_maintenance[0])}** - ${(total_maintenance[1] < 0) ? "-" : "+"}**£${parseNumber(total_maintenance[1])}** from building maintenance.`);

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
    }

    budget_string.push(`Your economic advisor estimates that you will gain ${config.icons.money} **${money_string}** in total income next turn.`);
    budget_string.push("");
    budget_string.push(config.localisation.divider);
    budget_string.push("");
    budget_string.push(`__**Economic Policy:**__`);
    budget_string.push("");
    budget_string.push(`Current tax: (**${printPercentage(usr.tax_rate)}**/**${printPercentage(usr.modifiers.max_tax)}**) ${(getIncome(actual_id)[0] < 0) ? "- Consider adjusting your tax rate to gain additional income." : ""}`);
    budget_string.push("");
    budget_string.push(`- **[Set Tax]**`);
    budget_string.push("");
    budget_string.push(`${config.icons.blockade} Blockade status: ${(isBlockaded(actual_id)) ? "you are currently blockaded!" : "you are currently not blockaded."}`);

    //Remove control panel if one exists
    if (game_obj)
      removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const budget_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Budget:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(budget_string.join("\n"));

    if (game_obj) {
      game_obj.main_embed = budget_embed;
      game_obj.main_change = true;
    }

    //Return statement
    return budget_embed;
  }
};
