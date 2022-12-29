module.exports = {
  initialisePrintArmy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var game_obj = getGameObject(user_id);

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View Army:`,
      prompts: [
        [`What is the name of the army you would like to inspect?\n\nType **[Army List]** to view a list of all valid armies.`, "string"]
      ]
    },
    function (arg) {
      var army_obj = getArmy(user_id, arg[0]);
      var army_report = module.exports.printArmy(user_id, arg[0]);

      if (army_report) {
        createPageMenu(game_obj.middle_embed, {
          embed_pages: army_report,
          user: game_obj.user
        });

        game_obj.page = `army_viewer_${army_obj.name}`;
      }
    },
    function (arg) {
      switch (arg) {
        case "army list":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printArmyList(user_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  printArmy: function (arg0_user, arg1_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_unit_names = getAllUnits({ return_names: true });
    var army_obj = getArmy(user_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if army_obj could be found
    if (army_obj) {
      var aeroplane_count = 0;
      var all_embeds = [];
      var all_units = Object.keys(army_obj.units);
      var army_enemies = getArmyEnemies(user_id, army_obj);
      var army_icon = "";
      var army_power = calculateArmyStats(user_id, army_obj);
      var army_size = getArmySize(user_id, army_obj);
      var army_stats = calculateArmyType(user_id, army_obj);
      var army_string = [];
      var army_supply = returnSafeNumber(getOverallSupply(user_id, army_obj), 1);
      var bonus_movement_speed = 1;
      var carrier_capacity_string = "";
      var command_string = [];
      var current_status = "";
      var logistics_string = [];
      var maintenance_obj = getArmyMaintenance(user_id, army_obj);
      var oob_string = [];
      var pure_airplanes = true;
      var pure_submarines = true;
      var production_obj = parseProduction(user_id);
      var province_obj = main.provinces[army_obj.province];

      var all_maintenance_costs = Object.keys(maintenance_obj);

      //Calculate tracker variables
      {
        //Bonus movement speed
        if (army_obj.moving_to?.length > 0) {
          var current_index = army_obj.moving_to.indexOf(army_obj.province);
          bonus_movement_speed = army_obj.distances[0];

          if (army_obj.moving_to[current_index + 1] != 0)
            bonus_movement_speed = bonus_movement_speed/getDistance(army_obj.province, army_obj.moving_to[current_index + 1]);
        }

        //Unit types
        for (var i = 0; i < all_units.length; i++) {
          var local_unit = getUnit(all_units[i]);
          var local_unit_category = getUnitCategoryFromUnit(all_units[i]);
          if (army_icon == "")
            army_icon = config.icons[local_unit_category.icon] + " ";

          //Check for unit types
          if (!local_unit.type)
            pure_submarines = false;

          if (local_unit.type)
            if (!local_unit.type.includes("submarine"))
              pure_submarines = false;

          //Check for aeroplanes
          if (local_unit_category.type == "air")
            aeroplane_count += army_obj.units[all_units[i]];
          else
            pure_airplanes = false;
        }
      }

      //Format Page 1 - army_string
      {
        if (army_stats.carrier_capacity > 0)
          carrier_capacity_string = `(Carrier Capacity: **${parseNumber(aeroplane_count)}**/**${parseNumber(army_stats.carrier_capacity)}**) `;

        //Army status
        if (army_obj.moving_to?.length > 0) {
          current_status = `Currently moving to Province **${army_obj.moving_to[army_obj.moving_to.length - 1]}**. (Arrives in **${parseNumber(getArrivalTime(user_id, army_obj))}** turn(s)).\n\n- Path: ${(game_obj.expanded_army_pathing) ? `${parsePath(army_obj.moving_to, army_obj.distances)} | **[Close]**` : `**${army_obj.moving_to.length}** Province(s) | Total Distance: **${parseNumber(getSum(army_obj.distances))}** infrastructure-adjusted kilometres. | **[Expand]**`}`;
        } else {
          if (army_obj.type != "navy") {
            current_status = `Currently stationed in Province **${army_obj.province}**.`;
          } else {
            if (returnSafeNumber(army_obj.challenged_this_turn) == 0) {
              current_status = `Currently docked in harbour.`;
            } else {
              current_status = (army_obj.challenged_this_turn <= config.defines.combat.blockade_challenge_limit) ?
                `Fighting an enemy blockade! We can engage the enemy **${parseNumber((config.defines.combat.blockade_challenge_limit - army_obj.challenged_this_turn) + 1)}** more time(s) this turn.` :
                `Busy repairing in harbour after fighting off enemy blockades.`;
            }
          }
        }

        //Attrition for current_status
        if (army_obj.taking_attrition)
          current_status += `${(current_status.length > 0) ? `\n- ` : ""}Taking attrition at a rate of ${config.icons.death} **${printPercentage(usr.modifiers.attrition_rate*config.defines.combat.base_attrition_rate)}**!`;

        //Blockade cooldowns
        if (returnSafeNumber(army_obj.blockade_recovery_turns) > 0)
          current_status += `${(current_status.length > 0) ? `\n- ` : ""}Currently recovering from a blockade, will be combat ready in **${parseNumber(army_obj.blockade_recovery_turns)}** turn(s).`;

        //Submarine cooldowns
        if (returnSafeNumber(army_obj.submarine_cooldown) > 0)
          current_status += `${(current_status.length > 0) ? `\n- ` : ""}Currently on cooldown, will be combat ready in **${parseNumber(army_obj.submarine_cooldown)}** turn(s).`;

        //Voluntering status
        if (army_obj.volunteering) {
          var local_war = main.global.wars[army_obj.volunteering[1]];

          var friendly_side = (local_war[`${actual_id}_sent_volunteers`] == "attackers") ? "attacking" : "defending";

          armies_string.push(`${(current_status.length  > 0) ? `\n- ` : ""}Volunteering in the **${local_war.name}** on the ${friendly_side} side!`);
        }

        //Format army_string
        army_string.push(`${carrier_capacity_string}${current_status}`);

        //Format status_string
        var status_string = [];

        if (army_enemies.includes(province_obj.controller)) {
          var required_siege_manpower = Math.ceil(returnSafeNumber(province_obj.pops.population)*config.defines.combat.occupation_requirement);

          if (army_size < required_siege_manpower)
            status_string.push(`You require an additional **${parseNumber(required_siege_manpower - army_size)}** soldier(s) in your army to siege down **${(province_obj.name) ? province_obj.name : `Province ${province_obj.id}`}**!`);
            status_string.push(`- You need at least **${printPercentage(config.defines.common.occupation_requirement, { display_float: true })}** of the local population in an army to siege down a province.`);
        }

        if (status_string.length > 0) {
          army_string.push("");

          for (var i = 0; i < status_string.length; i++)
            army_string.push(status_string[i]);
        }

        army_string.push("");

        //Display modifiers
        if (army_obj.carrier_capacity > 0)
          army_string.push(`${config.icons.aeroplanes} **Aeroplanes** receive a **${printPercentage(config.defines.combat.seaplane_bonus, { base_zero: true, display_prefix: true })}** attack bonus whilst at sea.`);

        //Push buttons
        command_string.push(`**[Rename Army]** | **[Deploy Units]** | ${(all_units.length > 0) ? "**[Relieve Units]** | **[Reorder Units]** | **[Transfer Units]** |" : ""} **[Delete Army]**`);

        var volunteer_string = "";

        if (isVolunteering(user_id))
          volunteer_string = ` | ${(army_obj.volunteering) ? `**[Recall Volunteers]**` : ` **[Send As Volunteers]**`}`;

        if (army_obj.type == "army") {
          command_string.push(`- **[Merge Army]** | **[Move]**${volunteer_string}`);
        } else if (army_obj.type == "navy") {
          var submarine_string = (army_power.pure_submarines) ?
            ` | **[Convoy Raid]** | **[Harbour Raid]** | **[Torpedo Fleet]**` :
            "";
          (!army_obj.is_blockading) ?
            command_string.push(`- **[Blockade]** | **[Challenge Blockade]** ${submarine_string}`) :
            command_string.push(`- **[Lift Blockade]** ${submarine_string}`)
        } else if (army_obj.type == "air") {
          command_string.push(`- **[Merge Army]** | **[Move]** | **[Air Raid]**${volunteer_string}`);
        }

        army_string.push(command_string.join("\n"));
        army_string.push("");
        army_string.push(config.localisation.divider);
        army_string.push("");

        //Display army statistics
        army_string.push(`${config.icons.manpower} Army Size: ${parseNumber(Math.ceil((getArmySize(user_id, army_obj.name)/1000)*100)/100)} ${(all_units.length > 0) ? `(**${printPercentage(army_supply)}** Supply)` : ""}`);
        army_string.push(`${config.icons.provinces} Current Province: **${army_obj.province}** (${config.icons.railways} Supply Limit: **${parseNumber(Math.ceil(getTroopsInProvince(army_obj.province)/1000))}/${parseNumber(returnSafeNumber(province_obj.supply_limit, config.defines.combat.base_supply_limit))}**)`);

        if (bonus_movement_speed != 1)
          army_string.push(`- **${printPercentage(1/bonus_movement_speed, { display_prefix: true })}** Bonus Movement from local infrastructure.`);

        army_string.push("");

        army_string.push(`**Army Statistics:**`);
        army_string.push("");
        army_string.push(`- ${config.icons.attacker} Attack: ${parseNumber(army_power.attack)}`);
        army_string.push(`- ${config.icons.defender} Defence: ${parseNumber(army_power.defence)}`);

        if (all_units.length > 0) {
          var air_range = getAirRange(user_id, army_obj);
          var army_speed = getArmySpeed(user_id, army_obj);

          army_string.push(`- ${config.icons.time} Movement: ${parseNumber(army_speed)}km/h ${(bonus_movement_speed != 1) ? `(${parseNumber(army_speed*(1/bonus_movement_speed))}km/h on current province).` : ""}`);

          //Range only if army is of type air
          if (army_obj.type == "air")
            army_string.push(`- ${config.icons.aeroplanes} Range: ${parseNumber(air_range)} Provinces`);
        }
      }

      //Format Page 2 - oob_string
      {
        //Print commands
        oob_string.push(command_string.join("\n"));
        oob_string.push("");
        oob_string.push(config.localisation.divider);
        oob_string.push("");

        //Print units
        oob_string.push(`**Order of Battle:**`);
        oob_string.push("");

        for (var i = 0; i < all_units.length; i++) {
          var cache_icon = getUnitCategoryFromUnit(all_units[i]).icon;
          var local_icon = (config.icons[cache_icon]) ?
            config.icons[cache_icon] + " " :
            "";
          var unit_obj = getUnit(all_units[i]);

          if (unit_obj.icon)
            local_icon = config.icons[unit_obj.icon];

          oob_string.push(`${local_icon}${(unit_obj.name) ? unit_obj.name : all_units[i]}: ${parseNumber(army_obj.units[all_units[i]])}`);
        }

        if (all_units.length == 0) {
          oob_string.push(`_No units found._`);
          oob_string.push("");
          oob_string.push(`Type **[Deploy Units]** to transfer some over from your reserves.`);
        }
      }

      //Format Page 3 - logistics_string
      if (all_units.length > 0) {
        //Print logistics - Total Maintenance
        logistics_string.push("");
        logistics_string.push(`**Total Maintenance:**`);
        logistics_string.push("");
        logistics_string.push(`Our army is currently **${printPercentage(army_supply)}** supplied.`);
        logistics_string.push("");

        if (all_maintenance_costs.length > 0) {
          for (var i = 0; i < all_maintenance_costs.length; i++) {
            var local_balance = production_obj[all_maintenance_costs[i]];
            var local_balance_string = "";
            var local_good = getGood(all_maintenance_costs[i]);
            var local_maintenance_cost = maintenance_obj[all_maintenance_costs[i]];

            var good_name = (local_good) ?
              (local_good.name) ? local_good.name : all_maintenance_costs[i] :
              parseString(all_maintenance_costs[i]);

            //Format local_balance_string
            var actual_balance = Math.min(local_balance[0], local_balance[1]);

            if (actual_balance == 0)
              actual_balance = Math.max(local_balance[0], local_balance[1]);

            if (local_balance[0] && local_balance[1] < 0) {
              local_balance_string = `(**${parseNumber(actual_balance, { display_prefix: true })}**)`
            } else if (actual_balance != 0) {
              local_balance_string = `(${parseNumber(actual_balance, { display_prefix: true })})`;
            }

            logistics_string.push(`- ${parseNumber(local_maintenance_cost)} ${good_name} ${local_balance_string}`);
          }
        } else {
          logistics_string.push(`_This army requires no upkeep._`);
        }

        logistics_string.push("");
        logistics_string.push(config.localisation.divider);
        logistics_string.push("");
        logistics_string.push(`**Unit Logistics:**`);
        logistics_string.push("");

        //Print logistics - Per Unit - 1st Line - Attack/Defence - (Supply); 2nd Line - Maintenance Costs
        for (var i = 0; i < all_units.length; i++) {
          var local_amount = army_obj.units[all_units[i]];
          var local_category = getUnitCategoryFromUnit(all_units[i]);
          var local_icon = (config.icons[local_category.icon]) ?
            config.icons[local_category.icon] + " " :
            "";
          var local_unit = lookup.all_units[all_units[i]];
          var maintenance_array = [];

          var local_attack = returnSafeNumber(getAttack(user_id, local_unit)*local_amount);
          var local_defence = returnSafeNumber(getDefence(user_id, local_unit)*local_amount);

          if (local_unit.icon)
            local_icon = config.icons[local_unit.icon];

          logistics_string.push(`- ${local_icon}${(local_unit.name) ? local_unit.name : all_units[i]}: ${parseNumber(local_amount)} - ${parseNumber(local_attack)} Attack | ${parseNumber(local_defence)} Defence - (**${printPercentage(usr.modifiers.unit_supply[all_units[i]])}** Supply)`);

          if (local_unit.maintenance) {
            var local_maintenance_costs = Object.keys(local_unit.maintenance);

            //Iterate over local_maintenance_costs
            for (var x = 0; x < local_maintenance_costs.length; x++) {
              var local_good = lookup.all_goods[local_maintenance_costs[x]];
              var local_maintenance_cost = Math.ceil(
                local_unit.maintenance[local_maintenance_costs[x]]
              *(local_amount/returnSafeNumber(local_unit.quantity, 1)));

              if (local_maintenance_costs[x] == "money") {
                maintenance_array.push(`**£${parseNumber(local_maintenance_cost)}**`)
              } else if (local_good) {
                maintenance_array.push(`**${parseNumber(local_maintenance_cost)}** ${(local_good.name) ? local_good.name : local_maintenance_costs[x]}`);
              } else {
                maintenance_array.push(`**${parseNumber(local_maintenance_cost)}** ${parseString(local_maintenance_costs[x])}`);
              }
            }
          }

          logistics_string.push(`• Per turn maintenance: ${maintenance_array.join(", ")}`);

          if (i < all_units.length - 1)
            logistics_string.push(`---`);
        }
      } else {
        logistics_string.push(`_We currently have no units that require any maintenance!_`);
        logistics_string.push("");
        logistics_string.push(`Type **[Deploy Units]** to transfer units from your reserves into this army.`)
      }

      //Tracking embeds
      {
        var page_two_embeds = splitEmbed(oob_string, { fixed_width: true });
        var page_three_embeds = splitEmbed(logistics_string, { fixed_width: true });
      }

      //Page 1 embed
      const embed_army_page_one = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`**[Back] | [Jump To Page] | ${army_icon} ${army_obj.name}, ${usr.name}: (Page 1 of ${1 + page_two_embeds.length + page_three_embeds.length}):**`)
        .setDescription(army_string.join("\n"))
        .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

      //Page 2 embeds
      var page_two_final_embeds = splitEmbed(oob_string, {
        title: `[Back] | [Jump To Page] | ${army_icon} ${army_obj.name}, ${usr.name}:`,
        title_pages: true,
        fixed_width: true,

        added_pages: 1 + page_three_embeds.length,
        page_index: 1
      });

      //Page 3 embeds
      var page_three_final_embeds = splitEmbed(logistics_string, {
        title: `[Back] | [Jump To Page] | ${army_icon} ${army_obj.name}, ${usr.name}:`,
        title_pages: true,
        fixed_width: true,

        added_pages: 1 + page_two_embeds.length,
        page_index: 1 + page_two_embeds.length
      });

      //Push to all_embeds
      all_embeds = [embed_army_page_one];

      for (var i = 0; i < page_two_final_embeds.length; i++)
        all_embeds.push(page_two_final_embeds[i]);
      for (var i = 0; i < page_three_final_embeds.length; i++)
        all_embeds.push(page_three_final_embeds[i]);

      //Return statement
      return all_embeds;
    } else {
      printError(game_obj.id, `No army by the name of **${army_name}** could be found! Check your **[Army List]** for a full list of valid field armies, air wings, and fleets.`);
    }
  },

  printArmyList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Sort user armies
    var all_armies = sortArmies(user_id, game_obj.armies_sorting_mode);
    var armies_string = [];

    //Format armies_string
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];
      var local_icon = "";

      //Find icon
      switch (local_army.type) {
        case "army":
          local_icon = config.icons.active_personnel + " ";

          break;
        case "navy":
          local_icon = config.icons.naval_units + " ";

          break;
        case "air":
          local_icon = config.icons.aeroplanes + " ";

          break;
      }

      armies_string.push(`- ${local_icon}**${local_army.name}** (${local_army.status}, Province #**${local_army.province}**). **[View ${local_army.name}]**`);

      if (local_army.volunteering) {
        var local_war = main.global.wars[local_army.volunteering[1]];

        var friendly_side = (local_war[`${actual_id}_sent_volunteers`] == "attackers") ? "attacking" : "defending";

        armies_string.push(`• Volunteering in the **${local_war.name}** on the ${friendly_side} side!`);
      }
    }

    //Default message if no armies can be found
    if (all_armies.length == 0) {
      armies_string.push("");
      armies_string.push(`_You currently have no armies in active service._`);
      armies_string.push("");
      armies_string.push(`Type **[Create Army]** to start building a military! Make sure you have troops in your reserves, though.`);
    }

    //Button formatting
    var volunteer_string = "";

    if (isVolunteering(user_id)) {
      var has_volunteers = hasVolunteers(user_id);

      volunteer_string = `${(has_volunteers) ? ` | **[Recall Volunteers]** ` : ""} | **[Repatriate Volunteers]** | **[Send Volunteer Armies]**`;
    }

    volunteer_string += ` | **[Send Volunteers]**`;

    //Return statement
    return splitEmbed(armies_string, {
      title: "[Back] | [Jump To Page] | Army List:",
      title_pages: true,
      fixed_width: true,

      description: [
        `**[Create Army]** | **[Delete Army]** | **[Merge Army]** | **[Rename Army]** | **[View Army]**`,
        `- **[Deploy Units]** | **[Transfer Units]** | **[Relieve Units]** | **[Reorder Units]**${volunteer_string}`,
        ``,
        `- Sort by: **[Attrition]** | **[Alphabetical]** | **[Chronological]** | **[Numerical]** | **[Roman]** | **[Size]** | **[Speed]** | **[Strength]** | **[Type]**`,
        ``,
        config.localisation.divider,
        ``,
      ]
    });
  },

  printUnitLedger: function (arg0_user) { //[WIP] - Add more detailed breakdown by deployed/reserves, total manpower in unit type in future
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var player_units = getUnits(user_id);
    var usr = main.users[actual_id];

    var all_units = Object.keys(player_units);

    //Format air_string, army_string, naval_string
    var strings = {
      air: "air",
      land: "army",
      naval: "naval",

      air_string: [],
      army_string: [],
      naval_string: [],
      waste_string: []
    };
    var units_string = [];

    //Iterate over all units and push according to type
    for (var i = 0; i < all_units.length; i++) {
      var local_category = getUnitCategoryFromUnit(all_units[i]);
      var local_unit = getUnit(all_units[i]);
      var local_value = player_units[all_units[i]];
      var local_type = "waste_string";

      try {
        strings[`${strings[local_category.type]}_string`].push(`• ${(local_unit.icon) ? config.icons[local_unit.icon] + " " : ""}**${(local_unit.name) ? local_unit.name : all_units[i]}** - ${parseNumber(local_value)}`);
      } catch {}
    }

    //Combine into units_string
    units_string.push(`__**Air Units:**__`);
    units_string.push("");
    units_string.push(config.localisation.divider);
    units_string.push("");
    (strings.air_string.length > 0) ?
      units_string.push(strings.air_string.join("\n")) :
      units_string.push(`_No units of this type could be found._`);
    units_string.push("");

    units_string.push(`__**Army Units:**__`);
    units_string.push("");
    units_string.push(config.localisation.divider);
    units_string.push("");
    (strings.army_string.length > 0) ?
      units_string.push(strings.army_string.join("\n")) :
      units_string.push(`_No units of this type could be found._`);
    units_string.push("");


    units_string.push(`__**Naval Units:**__`);
    units_string.push("");
    units_string.push(config.localisation.divider);
    units_string.push("");
    (strings.naval_string.length > 0) ?
      units_string.push(strings.naval_string.join("\n")) :
      units_string.push(`_No units of this type could be found._`);

    //Return embed as splitEmbed
    return splitEmbed(units_string, {
      title: "[Back] | [Jump To Page] | Unit Overview:",
      title_pages: true,
      fixed_width: true
    });
  }
};
