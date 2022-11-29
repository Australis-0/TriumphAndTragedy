module.exports = {
  printMilitary: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_embeds = [];
    var all_users = Object.keys(main.users);
    var army_orders = getArmyOrders(user_id);
    var deficit_goods = getArmyDeficitGoods(user_id);
    var game_obj = getGameObject(user_id);
    var maintenance_obj = getArmyMaintenance(user_id);
    var units_obj = getUnits(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);
    var all_deficit_goods = Object.keys(deficit_goods);
    var all_unit_maintenance_costs = Object.keys(maintenance_obj);
    var all_unit_types = getUnitTypes(user_id);
    var all_units = Object.keys(units_obj);

    //Format strings - Page 1 (Top-down)
    var war_description_string = [];

    var military_statistics_string = [];
    var military_civilian_casualties_string = [];

    var mobilisation_string = [];

    //Format strings - Page 2 (Top-down)
    var military_overview_string = [];
    var military_options_string = [];

    //Format strings - Page 3 (Top-down)
    var military_organisation_string = [];

    var global_orders_string = [];
    var army_creation_string = [];
    var army_management_string = [];

    //Format strings - Page 4 (Top-down)
    var battle_plans_string = [];
    var oob_string = [];

    //Format strings - Page 5+ (Top-down)
    var logistics_string = [];

    //Format Page 1 - Variable processing
    {
      var all_enemies = getEnemies(user_id);
      var all_wars = Object.keys(main.global.wars);
      var attacking_wars = 0;
      var at_war = atWar(user_id);
      var defending_wars = 0;
      var enemy_display_list = [];
      var military_strength = getMilitaryStrength(user_id);
      var reserves_strength = getReserveStrength(user_id);
      var total_civilian_casualties = 0;
      var total_military_casualties = 0;
      var total_troop_count_status = [];

      var all_armies = Object.keys(usr.armies);
      var army_types = {
        air: 0,
        army: 0,
        empty: 0,
        navy: 0
      };
      var mobilisation_unit = (usr.mobilisation.mobilised_type) ?
        getUnit(usr.mobilisation.mobilised_type) :
        getUnit(usr.mobilisation.unit_type);

      //Begin compiling a proper list
      for (var i = 0; i < all_armies.length; i++) {
        var local_army = usr.armies[all_armies[i]];

        army_types[local_army.type]++;
      }

      //Check for attacking; defending wars
      for (var i = 0; i < all_wars.length; i++) {
        var local_war = main.global.wars[all_wars[i]];

        if (local_war.attackers.includes(actual_id))
          attacking_wars++;
        if (local_war.defenders.includes(actual_id))
          defending_wars++;
      }

      //Format enemy_display_list
      for (var i = 0; i < all_enemies.length; i++)
        enemy_display_list.push(`**${main.users[all_enemies[i]].name}**`);

      //Format total_troop_count_status
      var mobilised_string = [];

      if (usr.mobilisation.is_mobilised) {
        var all_mobilised_pops = Object.keys(usr.mobilisation.mobilised_pops);

        for (var i = 0; i < all_mobilised_pops.length; i++) {
          var local_pop = config.pops[all_mobilised_pops[i]];
          var local_value = usr.mobilisation.mobilised_pops[all_mobilised_pops[i]];

          if (local_value > 0)
            mobilised_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}**${parseNumber(local_value)}** mobilised ${((local_pop.name) ? local_pop.name : all_mobilised_pops[i]).toLowerCase()}`);
        }
      }

      total_troop_count_status.push(`${config.icons.soldiers} ${parseNumber(getTotalActiveDuty(actual_id))} soldiers${(mobilised_string.length > 0) ? `, ${parseList(mobilised_string)}` : ""}.`);

      //War Exhaustion
      var war_exhaustion_rate = config.defines.combat.war_exhaustion_tickdown_rate;
      if (!at_war && !isBlockaded(actual_id))
        if (usr.mobilisation.is_mobilised)
          war_exhaustion_rate -= config.defines.combat.war_exhaustion_mobilisation_rate;
    }

    //Format Page 1 - UI
    {
      //Format Page 1 - UI - Wars
      if (at_war) {
        war_description_string.push(`${config.icons.cb} We are currently involved in a **state of war** with **${parseNumber(enemy_display_list.length)}** countries, including ${parseList(enemy_display_list)}.`);
        war_description_string.push(`This entails a grand total of **${parseNumber(attacking_wars + defending_wars)}** wars, **${parseNumber(defending_wars)}** defensive, and **${parseNumber(attacking_wars)}** offensive.`);
        war_description_string.push("");
      }

      //Format Page 1 - UI - War Exhaustion/Infamy
      (usr.modifiers.war_exhaustion == 100 && at_war) ?
        war_description_string.push(`${config.icons.retreat} We have hit **100%** War Exhaustion, and our enemies may now force us to come to an unconditional surrender!`) :
        war_description_string.push(`${config.icons.infamy} War Exhaustion: **${printPercentage(usr.modifiers.war_exhaustion)}** ${(!at_war && !isBlockaded(actual_id)) ? `(${printPercentage(Math.abs(war_exhaustion_rate), { display_prefix: true })} per turn)` : ""}`);

      if (returnSafeNumber(usr.blockaded.blockaded_war_exhaustion) > 0)
        war_description_string.push(`- **${printPercentage(usr.blockaded.blockaded_war_exhaustion, { display_prefix: true })}** War Exhaustion from the ongoing blockade.`);

      //Print infamy
      war_description_string.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy, { display_float: true })}** (${parseNumber(usr.modifiers.infamy_loss, { display_float: true, display_prefix: true })} per turn)`);

      //Format Page 1 - UI - Military Statistics (Field)
      if (all_armies.length > 0) {
        military_statistics_string.push(`We have **${parseNumber(all_armies.length)}** military units currently in the field. Of these:`);
        military_statistics_string.push(`- **${parseNumber(army_types.army)}** are land armies,`);
        military_statistics_string.push(`- **${parseNumber(army_types.navy)}** are navies,`);
        military_statistics_string.push(`- and **${parseNumber(army_types.air)}** are air wings.`);

        if (army_types.empty > 0)
          military_statistics_string.push(`\nThe rest, some **${parseNumber(army_types.empty)}** armies, are currently sitting empty.`);

        military_statistics_string.push("");
        military_statistics_string.push(`We currently have **${parseNumber(military_strength.attack)}** Attack and **${parseNumber(military_strength.defence)}** Defence deployed in the field.`);
        military_statistics_string.push(`The rest, some **${parseNumber(returnSafeNumber(reserves_strength.attack))}** Attack and **${parseNumber(returnSafeNumber(reserves_strength.defence))}** Defence are currently in our reserves.`);
        military_statistics_string.push(config.localisation.divider);
        military_statistics_string.push(`This makes for a combined grand total of ${parseNumber(military_strength.attack + returnSafeNumber(reserves_strength.attack))} Attack and ${parseNumber(military_strength.defence + returnSafeNumber(reserves_strength.defence))} Defence, for a total army strength of ${total_troop_count_status.join("\n")}`);
      } else {
        military_statistics_string.push(`_We currently have no armies in active service._`);
      }

      //Format Page 1 - UI - Recent Casualties (Field)
      for (var i = 0; i < usr.recent_civilian_casualties.length; i++)
        total_civilian_casualties += usr.recent_civilian_casualties[i];
      for (var i = 0; i < usr.recent_military_casualties.length; i++)
        total_military_casualties += usr.recent_military_casualties[i];

      military_civilian_casualties_string.push(`Casualties measured in total taken by attrition, combat, and other causes per turn.`);
      military_civilian_casualties_string.push("");

      military_civilian_casualties_string.push(`**Military:**`);
      military_civilian_casualties_string.push(config.localisation.divider);

      if (total_military_casualties > 0) {
        for (var i = 0; i < usr.recent_military_casualties.length; i++)
          military_civilian_casualties_string.push(parseNumber(usr.recent_military_casualties[i]));
        military_civilian_casualties_string.push(`${config.icons.death} Total Military Casualties: **${parseNumber(total_military_casualties)}**`);
      } else {
        military_civilian_casualties_string.push(`_We have incurred no military casualties as of late._`);
      }
      military_civilian_casualties_string.push("");

      military_civilian_casualties_string.push(`**Civilian:**`);
      military_civilian_casualties_string.push(config.localisation.divider);

      if (total_military_casualties > 0) {
        for (var i = 0; i < usr.recent_civilian_casualties.length; i++)
          military_civilian_casualties_string.push(parseNumber(usr.recent_civilian_casualties[i]));
        military_civilian_casualties_string.push(`${config.icons.death} Total Civilian Casualties: **${parseNumber(total_civilian_casualties)}**`);
      } else {
        military_civilian_casualties_string.push(`_We have incurred no civilian casualties as of late._`);
      }

      //Format Page 1 - UI - Mobilisation
      if (usr.modifiers.enable_mobilisation && mobilisation_unit) {
        if (!usr.mobilisation.is_mobilised) {
          if (main.round_count - returnSafeNumber(usr.mobilisation.last_mobilised) > config.defines.combat.mobilisation_cooldown) {
            var available_manpower = getMobilisationPops(user_id).population;
            var unit_obj = getUnit(usr.mobilisation.unit_type);

            (available_manpower > 0) ?
              mobilisation_string.push(`You can mobilise! Type **[Mobilise]** in order to call upon your people to take up arms.\n**${parseNumber(available_manpower)}** ${(unit_obj.name) ? unit_obj.name : usr.mobilisation.unit_name} will be placed in your reserves.`) :
              mobilisation_string.push(`Due to critical manpower shortages on the civilian front, mobilisation isn't available. Try freeing up more workers first!`);
          } else {
            mobilisation_string.push(`Your people have demobilised too recently to be willing to be called up for war again. Wait for **${parseNumber(config.defines.combat.mobilisation_cooldown - (main.round_count - returnSafeNumber(usr.mobilisation.last_mobilised)) + 1)}** more turn(s).`);
          }
        } else {
          (usr.mobilisation.current_manpower_mobilised < usr.mobilisation.total_manpower_mobilised) ?
            mobilisation_string.push(`You are currently mobilising, and your advisors estimate that mobilisation will be complete within **${parseNumber(usr.mobilisation.duration)}** turn(s). So far, **${parseNumber(usr.mobilisation.current_manpower_mobilised)}** men out of **${parseNumber(usr.mobilisation.total_manpower_mobilised)}** available reservists have been mobilised.\n\nYou are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`) :
            mobilisation_string.push(`You are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`);
        }
      } else {
        mobilisation_string.push(`Military mobilisation is currently locked, as your people haven't heard of the concept yet.`);
      }
    }

    //Format Page 2 - Variable processing
    {
      var options_array = [];
      var reference_string = {
        "always": "Always",
        "if possible": "If Possible",
        "never": "Never",

        true: "Yes",
        false: "No"
      };
    }

    //Format Page 2 - UI
    {
      //Format Page 2 - UI - Military Overview
      military_overview_string.push(`- Type **[Army List]** to view a complete list of all your armies.`);
      military_overview_string.push(`- Type **[Train Units]** to recruit more units into your army.`);
      military_overview_string.push(`- Type **[Unit Ledger]** to view a ledger of all your units, active or reserved.`);
      military_overview_string.push(`- Type **[Unit List]** to view a full list of units available for recruitment.`);
      military_overview_string.push(`- Type **[View Reserves]** to view what units you have in your reserves.`);

      //Format Page 2 - UI - Military Options
      military_options_string.push(`We currently have our policy on **[Attrition Avoidance]** set to **${reference_string[usr.options.avoid_attrition]}**.`);
      if (usr.options.avoid_attrition == "always") {
        military_options_string.push("Our troops will always avoid attrition, and will refuse to move if ordered into a province that will result in deaths from attrition.");
  		} else if (usr.options.avoid_attrition == "if possible") {
  			military_options_string.push("Our troops will attempt to avoid attrition whenever possible, but will move into zones of attrition if strictly necessary.");
  		} else {
  			military_options_string.push("Our troops will always take the shortest route to a target province, regardless of attrition.");
  		}

      military_options_string.push(`We currently have our policy on **[Territorial Violation]** set to **${reference_string[usr.options.avoid_territorial_violation]}**.`);
      if (usr.options.avoid_territorial_violation == "always") {
  			military_options_string.push("Our troops will always avoid violating the sovereign territory of other countries, and will automatically refuse to move if ordered to pass through one.");
  		} else if (usr.options.avoid_territorial_violation == "if possible") {
  			military_options_string.push("Our troops will avoid violating the territory of other countries whenever possible, but may pass through them unprovoked if no alternative routes can be found.");
  		} else {
  			military_options_string.push("Our soldiers will march straight from point A to point B, regardless of any country standing in their paths!");
  		}

      military_options_string.push(`We currently have our policy on **[Ignore Orders When Carpet Sieging]** set to **${reference_string[usr.options.ignore_orders]}**.`);
      if (usr.options.ignore_orders) {
  			military_options_string.push("Orders given out by you to carpet siege will always override existing orders of armies if no available armies can be found.");
  		} else {
  			military_options_string.push("Only armies without orders or currently stationed will be requistioned for carpet sieging when ordered to.");
  		}
    }

    //Format Page 3 - UI
    {
      //Format Page 3 - UI - Summary
      military_organisation_string.push(`Military organisation commands act as power commands allowing you to quickly manage, equip, and deploy your armies, thereby reducing the need for micromanagement, and giving additional tools to players.`);
      military_organisation_string.push("");
      military_organisation_string.push(config.localisation.divider);

      //Format Page 3 - UI - Global Orders
      global_orders_string.push(`- **[Carpet Siege]** - Order your troops to siege down an entire nation.`);
      global_orders_string.push(`- **[Garrison Cities]** - Guard all the cities within your country.`);
      global_orders_string.push(`- **[Garrison Provinces]** - Guard all the provinces within your country.`);
      global_orders_string.push(`- **[Delete All Armies]** - Delete all your armies and return all troops and materiel to your reserves.`);
      global_orders_string.push(`- **[Move All]** - Moves all your armies into a single province.`);

      //Format Page 3 - UI - Army Creation
      army_creation_string.push(`- **[Create Armies]** - Create multiple armies.`);
      army_creation_string.push(`- **[Delete Armies]** - Delete multiple armies.`);
      army_creation_string.push(`- **[Merge Armies]** - Power-merges several armies into an existing one.`);
      army_creation_string.push(`- **[Rename Armies]** - Renames multiple armies.`);
      army_creation_string.push(`- **[Split Armies]** - Splits off multiple armies from an existing one.`);

      //Format Page 3 - UI - Army Management
      army_management_string.push(`- **[Mass Deploy]** - For deploying troops to armies en masse.`);
      army_management_string.push(`- **[Mass Relieve]** - Relieves units from several armies, putting them back in reserves.`);
      army_management_string.push(`- **[Mass Reorder]** - Reorders units in multiple armies.`);
      army_management_string.push(`- **[Move Armies]** - Moves several armies to a single province.`);
    }

    //Format Page 4+ - UI
    {
      //Format Page 4+ - UI - Battle Plans (+ Separate UI Window) [WIP]

      //Format Page 4+ - UI - Order of Battle (+ Separate UI Window)
      var all_army_orders = Object.keys(army_orders);
      var sorted_army_orders = [];

      for (var i = 0; i < all_army_orders.length; i++)
        sorted_army_orders.push([army_orders[all_army_orders[i]].length, all_army_orders[i]]);

      //Sort array
      sorted_army_orders.sort((a, b) => b[0] - a[0]);

      //Format oob_string
      oob_string = printOOB(user_id, true);
    }

    //Format Page 5 - Variable processing
    {
      var supply_localisation = getSupplyLocalisation(user_id);
    }

    //Format Page 5 - UI
    {
      //Format Page 5+ - UI - Summary
      logistics_string.push(`Maintaining an army is an expensive affair. Each turn, we must have enough goods in our **[Inventory]** to pay for the upkeep of a unit, otherwise the unit's **combat efficacy** will begin to drop.`);
      logistics_string.push("");
      logistics_string.push(`Combat efficacy determines the full percentage of Attack and Defence a unit can sustain with the amount of missing supplies correlating to the amount of reduced combat efficacy.`);
      logistics_string.push("");
      logistics_string.push(`Fiscal expenditures account for **${printPercentage(config.defines.combat.fiscal_supply_amount)}** of all total supply.`);

      //Supply/logistics should only display if the user has maintenance issues to care for
      if (all_unit_maintenance_costs.length > 0) {
        logistics_string.push("");

        //Format Page 5+ - UI - Supply by Military Branch
        logistics_string.push(config.localisation.divider);
        logistics_string.push(supply_localisation.supply_localisation);

        logistics_string.push("");
        logistics_string.push(`**Total Maintenance/Deficit:**`);
        logistics_string.push("");

        //Format Page 5+ - UI - Overall Supply Needs - (Deficit/Surplus)
        for (var i = 0; i < all_unit_maintenance_costs.length; i++) {
          var local_deficit = deficit_goods[all_unit_maintenance_costs[i]];
          var local_good = getGood(all_unit_maintenance_costs[i]);
          var local_maintenance_cost = maintenance_obj[all_unit_maintenance_costs[i]];

          var good_name = (local_good) ?
            (local_good.name) ? local_good.name : all_unit_maintenance_costs[i] :
            parseString(all_unit_maintenance_costs[i]);

          logistics_string.push(`- ${parseNumber(local_maintenance_cost)}${(local_deficit) ? ` (**${parseNumber(local_deficit)}**)` : ""} ${good_name}`);
        }

        logistics_string.push("");
        logistics_string.push(config.localisation.divider);
        logistics_string.push("");
        logistics_string.push(`**Per Unit Maintenance:**`);
        logistics_string.push("");

        //Format Page 5+ - UI - Supply Needs by Unit
        for (var i = 0; i < all_unit_types.length; i++) {
          var current_index = 0;
          var valid_units = 0;

          //Fetch valid_units
          for (var x = 0; x < all_units.length; x++) {
            var local_category = getUnitCategoryFromUnit(all_units[x]);
            var local_unit = lookup.all_units[all_units[x]];

            if (local_category.type == all_unit_types[i])
              if (local_unit.maintenance)
                valid_units++;
          }

          //Format units
          for (var x = 0; x < all_units.length; x++) {
            var local_amount = units_obj[all_units[x]];
            var local_category = getUnitCategoryFromUnit(all_units[x]);
            var local_unit = lookup.all_units[all_units[x]];
            var maintenance_array = [];

            //Split newlines by unit type
            if (local_category.type == all_unit_types[i])
              //Go through maintenance, multiply by amount
              if (local_unit.maintenance) {
                //Increment current_index
                current_index++;

                //Parse actual maintenance to string
                var local_maintenance_costs = Object.keys(local_unit.maintenance);

                //Iterate over local_maintenance_costs
                for (var y = 0; y < local_maintenance_costs.length; y++) {
                  var local_good = getGood(local_maintenance_costs[y]);
                  var local_maintenance_cost = Math.ceil(local_unit.maintenance[local_maintenance_costs[y]]*local_amount);

                  if (local_maintenance_costs[y] == "money") {
                    maintenance_array.push(`**£${parseNumber(local_maintenance_cost)}**`)
                  } else if (local_good) {
                    maintenance_array.push(`**${parseNumber(local_maintenance_cost)}** ${(local_good.name) ? local_good.name : local_maintenance_costs[y]}`);
                  } else {
                    maintenance_array.push(`**${parseNumber(local_maintenance_cost)}** ${parseString(local_maintenance_costs[y])}`);
                  }
                }

                //Add to logistics_string
                logistics_string.push(`- Our **${parseNumber(local_amount)}** ${(local_unit.name) ? local_unit.name : all_units[x]} have (**${printPercentage(usr.modifiers.unit_supply[all_units[x]])}** Supply).\n • Per turn maintenance: ${maintenance_array.join(", ")}`);

                if (current_index != valid_units)
                  logistics_string.push(`---`);
              }
          }

          if (valid_units > 0)
            logistics_string.push("");
        }
      } else {
        logistics_string.push(`_We have no units that require maintenance at the present moment._`);
      }
    }

    //Push to all_embeds
    const embed_military_hq_page_one = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`Military:\n${config.localisation.divider}`)
      .setThumbnail(usr.flag)
      .setDescription(war_description_string.join("\n"))
      .addFields(
        { name: "**Military Statistics:**", value: military_statistics_string.join("\n"), inline: true },
        { name: "**Recent Casualties:**", value: military_civilian_casualties_string.join("\n"), inline: true },
        { name: "**Mobilisation:**", value: mobilisation_string.join("\n") }
      )
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    const embed_military_hq_page_two = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`Military Overview and Options:\n${config.localisation.divider}`)
      .setThumbnail(usr.flag)
      .addFields(
        { name: "**Military Overview:**", value: military_overview_string.join("\n") },
        { name: "**Military Options:**", value: military_options_string.join("\n") }
      )
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    const embed_military_hq_page_three = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`Military Organisation Commands:\n${config.localisation.divider}`)
      .setThumbnail(usr.flag)
      .setDescription(military_organisation_string.join("\n"))
      .addFields(
				{ name: "**Global Orders:**", value: global_orders_string.join("\n") },
				{ name: "**Army Creation:**", value: army_creation_string.join("\n") },
				{ name: "**Army Management:**", value: army_management_string.join("\n") }
      )
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    var page_four_index = 3;
    var page_four_embeds = splitEmbed(oob_string, {
      title: `Order of Battle:`,
      title_pages: true,
      fixed_width: true
    });

    var page_five_index = page_four_index + page_four_embeds.length;
    var page_five_embeds = splitEmbed(logistics_string, {
      title: `Logistics and Supply:`,
      title_pages: true,
      fixed_width: true
    });

    //Append to all_embeds
    all_embeds = [embed_military_hq_page_one, embed_military_hq_page_two, embed_military_hq_page_three];

    for (var i = 0; i < page_four_embeds.length; i++)
      all_embeds.push(page_four_embeds[i]);
    for (var i = 0; i < page_five_embeds.length; i++)
      all_embeds.push(page_five_embeds[i]);

    //Select menu
    addSelectMenu(game_obj.header, {
      id: `select_military_hq_tab`,
      options: [
        {
          label: "Military Statistics and Mobilisation",
          emoji: "716828676855169107", //cb
          value: "page_one",

          options: {
            name: "Military Statistics and Mobilisation"
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: all_embeds,
              page: 0,
              user: game_obj.user
            });
          }
        },
        {
          label: "Military Overview/Options",
          emoji: "716828676880334881", //old_scroll
          value: "page_two",

          options: {
            name: "Military Overview/Options"
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: all_embeds,
              page: 1,
              user: game_obj.user
            });
          }
        },
        {
          label: "Military Organisation Commands",
          emoji: "758424911852470293", //consciousness
          value: "page_three",

          options: {
            name: "Military Organisation Commands"
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: all_embeds,
              page: 2,
              user: game_obj.user
            });
          }
        },
        {
          label: "Order of Battle",
          emoji: "798003900027240448", //attacker
          value: "page_four",

          options: {
            name: "Order of Battle"
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: all_embeds,
              page: page_four_index,
              user: game_obj.user
            });
          }
        },
        {
          label: "Logistics and Supply",
          emoji: "771635236403806228", //refined_petroil
          value: "page_five",

          options: {
            name: "Logistics and Supply"
          },

          effect: function (value, options) {
            createPageMenu(game_obj.middle_embed, {
              embed_pages: all_embeds,
              page: page_five_index,
              user: game_obj.user
            });
          }
        }
      ],
      placeholder: `⭭ Select Military HQ Tab ..`
    });

    //Return statement
    createPageMenu(game_obj.middle_embed, {
      embed_pages: all_embeds,
      user: game_obj.user
    });
  },

  printOOB: function (arg0_user, arg1_return_string) {
    //Convert from parameters
    var user_id = arg0_user;
    var return_string = arg1_return_string;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_branches = getUnitBranches();
    var all_embeds = [];
    var all_users = Object.keys(main.users);
    var army_orders = getArmyOrders(user_id);
    var game_obj = getGameObject(user_id);
    var oob_string = [];
    var usr = main.users[actual_id];

    //Dynamically initialise variables
    var all_army_orders = Object.keys(army_orders);
    var orders = {};

    for (var i = 0; i < all_branches.length; i++) {
      orders[`sorted_${all_branches[i]}`] = [];
      orders[`${all_branches[i]}_string`] = [];
    }

    //Fetch orders and sort them by type
    for (var i = 0; i < all_army_orders.length; i++) {
      var branches_assigned_to_order = {};
      var local_order = army_orders[all_army_orders[i]];

      //Iterate through local_order and increment by army type
      for (var x = 0; x < local_order.length; x++)
        if (local_order[x].type != "empty") {
          if (!branches_assigned_to_order[local_order[x].type])
            branches_assigned_to_order[local_order[x].type] = [];
          branches_assigned_to_order[local_order[x].type].push(local_order[x]);
        }

      //Push branches_assigned_to_order to sorted branch array
      all_branch_orders = Object.keys(branches_assigned_to_order);

      for (var x = 0; x < all_branch_orders.length; x++)
        orders[`sorted_${all_branch_orders[x]}`].push([branches_assigned_to_order[all_branch_orders[x]], all_army_orders[i]]);
    }

    //Sort all branch orders; begin working on local strings
    for (var i = 0; i < all_branches.length; i++)
      if (orders[`sorted_${all_branches[i]}`].length > 0) {
        var branch_icon = config.icons[config.branch_icons[all_branches[i]]];
        var local_string = orders[`${all_branches[i]}_string`];
        var sorted_orders = orders[`sorted_${all_branches[i]}`];

        sorted_orders.sort((a, b) => b[0] - a[0]);

        //Iterate through sorted_orders and push their exact orders as well as any relevant details
        for (var x = 0; x < sorted_orders.length; x++) {
          var local_order = army_orders[sorted_orders[x][1]];
          var local_order_armies = []; //Which armies of this type are taking part in the current order?

          for (var y = 0; y < local_order.length; y++)
            if (local_order[y].type == all_branches[i])
              local_order_armies.push(`**${local_order[y].name}**`);

          if (sorted_orders[x][1] == "blockading") {
            var blockaded_users = {};

            //Fetch blockaded users on this branch
            for (var y = 0; y < all_users.length; y++) {
              var local_user = main.users[all_users[y]];

              if (local_user.blockaded)
                if (local_user.blockaded.is_blockaded)
                  for (var z = 0; z < local_user.blockaded.fleets.length; z++)
                    if (local_user.blockaded.fleets[z].id == actual_id) {
                      var local_army = usr.armies[local_user.blockaded.fleets[z].fleet_id];

                      if (local_army.type == all_branches[i]) {
                        if (!blockaded_users[all_users[y]])
                          blockaded_users[all_users[y]] = [];
                        blockaded_users[all_users[y]].push(`**${local_army.name}**`);
                      }
                    }
            }

            //Iterate over all_blockaded_users and push grouped fleet orders to local_string
            var all_blockaded_users = Object.keys(blockaded_users);

            for (var y = 0; y < all_blockaded_users.length; y++) {
              var local_user = main.users[all_blockaded_users[y]];
              var local_value = blockaded_users[all_blockaded_users[y]];

              local_string.push(`- **${parseNumber(local_value.length)}** fleets are currently blockading **${local_user.name}** - (${truncateArray(local_display_value, 20).join(", ")})`);
            }
          } else {
            local_string.push(`- **${parseNumber(local_order_armies.length)}** are ${sorted_orders[x][1]} - (${truncateArray(local_order_armies, 20).join(", ")})`);
          }
        }

        //Each branch should have its own embed_array
        var local_embed_array = splitEmbed(local_string, {
          title: `[Back] | ${(branch_icon) ? branch_icon + " " : ""}List of ${parseString(all_branches[i])} Combat Formations:`,
          title_pages: true,
          fixed_width: true
        });

        //Push local_embed_array to all_embeds
        for (var x = 0; x < local_embed_array.length; x++)
          all_embeds.push(local_embed_array[x]);

        //Push to oob_string
        oob_string.push(`${(branch_icon) ? branch_icon + " " : ""}**List of ${parseString(all_branches[i])} Combat Formations:**`);
        oob_string.push(config.localisation.divider);
        oob_string.push("");
        oob_string.push(local_string.join("\n"));
      }

    //Return statement
    return (!return_string) ? all_embeds : oob_string;
  }
};
