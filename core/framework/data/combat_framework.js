module.exports = {
  calculateCasualties: function (arg0_user, arg1_army_obj, arg2_attacker_roll, arg3_is_reserves) {
    //Convert from parameters
    var user_id = arg0_user;
    var defending_army_obj = arg1_army_obj;
    var attacker_roll = arg2_attacker_roll;
    var is_reserves = arg3_is_reserves;

    //Declare local instance variables
    var total_losses = 0;

    try {
      var defender_units = (!is_reserves) ?
          Object.keys(defending_army_obj.units) :
          Object.keys(defending_army_obj);
      var usr = main.users[user_id];

      //Go through all units to deal damage
      for (var i = 0; i < defender_units.length; i++) {
        if (!isNaN(defending_army_obj.units[defender_units[i]])) {
          var local_unit = getUnit(defender_units[i]);

          var local_defence = returnSafeNumber(local_unit.defence);
          var local_manoeuvre = returnSafeNumber(local_unit.manoeuvre);
          var local_manpower_costs = (local_unit.manpower_cost) ?
            Object.keys(local_unit.manpower_cost) :
            [];
          var manoeuvre_roll = randomNumber(0, 20);
          var unit_loss_rate = 1;

          //Check for MP first
          if (manoeuvre_roll > local_manoeuvre)
            unit_loss_rate = 0.1; //Only 10% of units can be lost if the roll is dodged

          //Deal damage
          for (var x = 0; x < local_manpower_costs.length; x++) {
            //Check to see if local_manpower_cost is of a military pop or not
            var local_value = local_unit.manpower_cost[local_manpower_costs[x]]/returnSafeNumber(local_unit.quantity, 1);
            var pop_obj = config.pops[local_manpower_costs[x]];
            var total_casualties = (!is_reserves) ?
              defending_army_obj.units[defender_units[i]] :
              defending_army_obj[defender_units[i]];

            //Determine unit casualties
            total_casualties = (
              (!is_reserves) ?
                attacker_roll > defending_army_obj.units[defender_units[i]]*local_defence :
                attacker_roll >
                defending_army_obj[defender_units[i]]*local_defence
            ) ?
              Math.ceil(total_casualties*0.5*unit_loss_rate) :
              Math.ceil((attacker_roll/local_defence)*unit_loss_rate);

            //Kill units
            total_losses += module.exports.killUnitPops(user_id, returnSafeNumber(total_casualties), defender_units[i]);
          }

          //Subtract from attacker_roll
          attacker_roll -= (!is_reserves) ?
            defending_army_obj.units[defender_units[i]]*local_defence :
            defending_army_obj[defender_units[i]]*local_defence;

          //Subtract units after attacker roll
          if (!is_reserves)
            defending_army_obj.units[defender_units[i]] -= total_casualties;
          else
            defending_army_obj[defender_units[i]] -= total_casualties;

          if (!is_reserves)
            if (defending_army_obj.units[defender_units[i]] <= 0)
              delete defending_army_obj.units[defender_units[i]];
          else
            if (defending_army_obj[defender_units[i]] <= 0)
              delete defending_army_obj[defender_units[i]];

          attacker_roll = Math.max(attacker_roll, 0);
        } else {
          delete defending_army_obj.units[defender_units[i]];
        }
      }
    } catch {}

    //Return statement
    return total_losses;
  },

  calculateRoll: function (arg0_army_obj) {
    //Convert from parameters
    var army_obj = arg0_army_obj;

    //Declare local instance variables
    var all_units = Object.keys(army_obj.units);
    var current_roll = 0;

    //Loop over all units
    for (var i = 0; i < all_units.length; i++) {
      var unit_obj = getUnit(all_units[i]);

      //Implement minimum AP roll
      var local_attack = returnSafeNumber(unit_obj.attack)*army_obj.units[all_units[i]];
      var local_category = getUnitCategoryFromUnit(all_units[i]);
      var local_initiative = returnSafeNumber(unit_obj.initiative);

      //Check if unit is of type air in a navy
      if (local_category.type == "air")
        if (army_obj.type == "navy")
          local_attack = local_attack*1.5; //+50% boost to aeroplanes at sea

      var local_initiative_roll = randomNumber(0, 20);
      var local_attack_roll = randomNumber(local_attack*(1/3), local_attack);

      current_roll += (local_initiative_roll < local_initiative) ?
        local_attack :
        local_attack*0.1; //Unit only rolls 10% of their AP if initiative roll fails
    }

    //Return statement
    return current_roll;
  },

  initialiseAirRaid: function (arg0_user, arg1_city_name, arg2_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var city_name = arg1_city_name;
    var army_name = arg2_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var army_obj = (typeof army_name != "object") ? getArmy(actual_id, army_name.trim()) : army_name;
    var city_obj = (typeof city_name != "object") ? getCity(city_name.trim()) : city_name;
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (city_obj)
        if (army_obj) {
          var actual_ot_user_id = city_obj.owner;
          var ot_user = main.users[actual_ot_user_id];
          var total_buildings = city_obj.buildings.length;

          //Check for any potential interceptions
          try {
            var potential_interception_provinces = getProvincesInRange(
              city_obj.id,
              Math.ceil(
                config.defines.combat.interception_range*returnSafeNumber(ot_user.modifiers.air_interception_range, 1
                )
              )
            );

            for (var i = 0; i < potential_interception_provinces.length; i++) {
              var defender_armies_in_province = getArmiesInProvince(potential_interception_provinces[i]);

              for (var x = 0; x < defender_armies_in_province.length; x++)
                if (defender_armies_in_province[x].owner == city_obj.controller && defender_armies_in_province.type == "air")
                  module.exports.initialiseBattle(actual_ot_user_id, defender_armies_in_province[x].name, actual_id, army_obj.name);
            }
          } catch {}

          //Calculate largest_wing
          var all_units = Object.keys(army_obj.units);
          var largest_wing = 0;
          var main_unit_ap = 0;
          var old_army_obj = JSON.parse(JSON.stringify(army_obj));
          var old_city_obj = JSON.parse(JSON.stringify(city_obj));

          for (var i = 0; i < all_units.length; i++)
            if (army_obj.units[all_units[i]] > largest_wing) {
              var unit_obj = getUnit(all_units[i]);

              largest_wing = army_obj.units[all_units[i]];
              main_unit_ap = returnSafeNumber(unit_obj.attack);
            }

          //Bombs away!
          if (total_buildings > 0) {
            var all_pops = Object.keys(config.pops);
            var army_stats = calculateArmyStats(actual_id, army_obj, { mode: "air_raid" });
            var city_buildings = [];
            var destroyed_buildings = {};
            var total_casualties = 0;

            //Each ack-ack gun is worth 10x the main_unit_ap, revert to fixed AP damage if valid
            main_unit_ap = (config.defines.combat.anti_aircraft_fixed_damage) ?
              config.defines.combat.anti_aircraft_base_damage/10 :
              main_unit_ap;

            //Attacker rolls, each building has ((defender_ap/building_count)*100) + 500 HP
            var attacker_roll = randomNumber(0, army_stats.attack);
            var defender_attack = getTotalBuildings(city_obj.name, config.defines.combat.anti_aircraft_building)*main_unit_ap*config.defines.combat.anti_aircraft_effectiveness*returnSafeNumber(ot_user.modifiers.ack_ack_effectiveness, 1);
            var defender_defence = ((defender_attack/total_buildings)*100) + 500;

            //Deduct buildings, floored
            var deducted_buildings = Math.min(
              Math.max(
                Math.floor(attacker_roll/defender_defence),
                  total_buildings - 1),
              Math.ceil(total_buildings*0.2)
            );

            //20% destruction cap, population killed = percentage of deducted buildings, soft cap at 120k
            for (var i = 0; i < Math.ceil(total_buildings*0.2); i++)
              destroyBuilding(1, randomElement(city_obj.buildings).building_type, city_obj.id);

            for (var i = 0; i < all_pops.length; i++)
              total_casualties += city_obj.pops[all_pops[i]] - Math.ceil(city_obj.pops[all_pops[i]])*(deducted_buildings/total_buildings);

            total_casualties = (total_casualties > 120000) ?
              randomNumber(110000, 120000) :
              total_casualties;

            for (var i = 0; i < all_pops.length; i++) {
              var local_value = city_obj.pops[all_pops[i]];
              var local_percentage = local_value/city_obj.pops.population;

              local_value -= Math.ceil(total_casualties*local_percentage);
            }

            var attacker_losses = module.exports.calculateCasualties(actual_id, army_obj, randomNumber(0, defender_attack));

            //Process warscore
            var all_wars = Object.keys(main.global.wars);
            var attacker_war_exhaustion = 0;
            var defender_war_exhaustion = 0;

            for (var i = 0; i < all_wars.length; i++) {
              var attacker_side = "neutral";
              var defender_side = "neutral";
              var local_war = main.global.wars[all_wars[i]];

              if (local_war.attackers.includes(actual_id))
                attacker_side = "attacker";
              if (local_war.defenders.includes(actual_id))
                defender_side = "defender";

              if (local_war.attackers.includes(city_obj.controller))
                attacker_side = "attacker";
              if (local_war.defenders.includes(city_obj.controller))
                defender_side = "defender";

              //Add casualties
              local_war[`${attacker_side}_total_casualties`] += Math.ceil(attacker_losses);
              local_war[`${defender_side}_total_casualties`] += Math.ceil(total_casualties);
            }

            if (attacker_losses > 0)
              attacker_war_exhaustion = parseInt(
                (attacker_losses/getTotalActiveDuty(actual_id)).toFixed(2)
              );
            if (total_casualties > 0)
              defender_war_exhaustion = parseInt(
                (total_casualties/getTotalActiveDuty(city_obj.controller)).toFixed(2)
              );

            city_obj.bombed_this_turn = true;

            //Format embed
            {
              var attacker_casualties = [];
              var attacker_string = [];
              var attacker_units = Object.keys(old_army_obj.units);
              var defender_buildings = [];
              var defender_casualties = [];
              var defender_string = [];
              var raid_gif = "";
              var result_string = [];

              //Process attacker casualties
              for (var i = 0; i < attacker_units; i++) {
                var local_category = getUnitCategoryFromUnit(attacker_units[i]);
                var local_unit = getUnit(attacker_units[i]);

                var local_icon = (local_unit.icon) ?
                  config.icons[local_unit.icon] + " " :
                    (local_category.icon) ?
                      config.icons[local_category.icon] + " " :
                      "";

                if (returnSafeNumber(army_obj.units[attacker_units[i]]) < old_army_obj.units[attacker_casualties[i]])
                  attacker_casualties.push(`- ${local_icon}${parseNumber(old_army_obj.units[attacker_casualties[i]] - returnSafeNumber(army_obj.units[attacker_casualties[i]]))} ${(local_unit.name) ? local_unit.name : attacker_units[i]}`);
              }

              //Process defender casualties
              for (var i = 0; i < old_city_obj.buildings.length; i++)
                if (!defender_buildings.includes(old_city_obj.buildings[i].building_type))
                  defender_buildings.push(old_city_obj.buildings[i].building_type);

              for (var i = 0; i < defender_buildings.length; i++) {
                var local_building = getBuilding(defender_buildings[i]);
                var local_category = getBuildingCategoryFromBuilding(defender_buildings[i]);
                var local_icon = (local_building.icon) ?
                  config.icons[local_building.icon] + " " :
                    (local_category.icon) ?
                      config.icons[local_category.icon] + " " :
                      "";
                var old_building_count = getTotalBuildings(old_city_obj.name, defender_buildings[i]);
                var new_building_count = getTotalBuildings(city_obj.name, defender_buildings[i]);

                if (old_building_count < new_building_count)
                  defender_casualties.push(`- ${parseNumber(old_building_count - new_building_count)} ${(local_building.name) ? local_building.name : defender_buildings[i]}`);
              }

              //Process raid GIF
              if (main.date.year < 1936) {
                raid_gif = config.air_raid.great_war;
              } else if (main.date.year >= 1936 && main.date.year < 1950) {
                raid_gif = config.air_raid.world_war_two;
              } else if (main.date.year >= 1950 && main.date.year < 1989) {
                raid_gif = config.air_raid.cold_war;
              } else {
                raid_gif = config.air_raid.modern;
              }

              //Format attacker_string
              attacker_string.push(`**${usr.name}** (${army_obj.name}):`);
              attacker_string.push("");
              attacker_string.push(`**Losses:**`);

              if (attacker_casualties.length > 0) {
                attacker_string.push(attacker_casualties.join("\n"));
                attacker_string.push("");
              }

              attacker_string.push(`${config.icons.death} Casualties: **${parseNumber(attacker_losses)}**`);

              //Format defender_string
              defender_string.push(`**${ot_user.name}** (${city_obj.name}):`);
              defender_string.push("");
              defender_string.push(`**Losses:**`);

              if (defender_casualties.length > 0) {
                defender_string.push(defender_casualties.join("\n"));
                defender_string.push("");
              }

              defender_string.push(`${config.icons.death} Casualties: **${parseNumber(total_casualties)}**`);

              //Results string
              result_string.push(`${config.icons.death} Total Casualties: **${parseNumber(total_casualties + attacker_losses)}**`);
              result_string.push("");
              result_string.push(`**${usr.name}** gained ${config.icons.infamy} **${parseNumber(attacker_war_exhaustion*100, { display_prefix: true })}** war exhaustion.`);
              result_string.push(`**${ot_user.name}** gained ${config.icons.infamy} **${parseNumber(defender_war_exhaustion*100, { display_prefix: true })}** war exhaustion.`);

              //Format embed
              const air_raid_embed = new Discord.MessageEmbed()
                .setColor(settings.bot_colour)
                .setTitle(`**Raid over ${city_obj.name}:**\n${config.localisation.divider}`)
                .addFields(
                  {
                    name: `${config.icons.bombing_attacker} __**Attacker:**__\n━━--\n`,
                    value: attacker_string.join("\n"),
                    inline: true
                  },
                  {
                    name: `${config.icons.bombing_defender} __**Defender:**__\n━━--\n`,
                    value: defender_string.join("\n"),
                    inline: true
                  },
                  {
                    name: `${config.icons.results} __**Results:**__\n━━--\n`,
                    value: result_string.join("\n"),
                  }
                );

              //Send air_raid_embed to both users as an embed alert
              sendEmbedAlert(actual_id, air_raid_embed);
              sendEmbedAlert(city_obj.controller, air_raid_embed);
            }
          }
        }
  },

  initialiseBattle: function (arg0_user, arg1_army_name, arg2_user, arg3_army_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var attacking_army_name = arg1_army_name;
    var ot_user_id = arg2_user;
    var defending_army_name = arg3_army_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id]; //Attacker
    var actual_ot_user_id = main.global.user_map[ot_user_id]; //Defender
    var all_wars = Object.keys(main.global.wars);
    var attacking_army_obj = (typeof attacking_army_name != "object") ?
      getArmy(actual_id, attacking_army_name.trim()) :
      attacking_army_name;
    var defending_army_obj = (typeof defending_army_name != "object") ?
      getArmy(actual_ot_user_id, defending_army_name.trim()) :
      defending_army_name;
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check for the usual
    if (usr)
      if (ot_user)
        if (attacking_army_obj)
          if (defending_army_obj) {
            var battle_type = "";
            var battle_name = "";
            var province_obj = main.provinces[attacking_army_obj.province];

            var province_name = (province_obj.name) ? province_obj.name : province_obj.id;

            //Check for battle type
            if (attacking_army_obj.type == "army" && defending_army_obj.type == "army") {
              battle_type = "land";
            } else if (attacking_army_obj.type == "navy" && defending_army_obj.type == "navy") {
              battle_type = "sea";
            } else {
              battle_type = "air";
            }

            //Get battle name
            switch (battle_type) {
              case "land":
                battle_name = (province_name == province_obj.id) ?
                  `${(province_obj.battle_ordinal) ? ordinalise(province_obj.battle_ordinal) : ""} Battle of ${randomElement(config.localisation.battle_prefixes)} ${province_obj.id}` :
                  `${(province_obj.battle_ordinal) ? ordinalise(province_obj.battle_ordinal) : ""} Battle of ${province_name}`;

                province_obj.battle_ordinal = (province_obj.battle_ordinal) ?
                  province_obj.battle_ordinal + 1 :
                  2;

                break;
              case "sea":
                battle_name = `Battle of ${randomElement(config.localisation.bathymetric_names)}`;

                break;
              case "air":
                battle_name = `Battle of ${ot_user.name}`;

                break;
            }

            //Calculate army stats
            var attacking_army_stats = calculateArmyStats(actual_id, attacking_army_obj);
            var attacker_losses = 0;
            var attacker_stackwiped = false;
            var attacker_understrength = false;
            var attacker_units = Object.keys(attacking_army_obj.units);
            var defending_army_stats = calculateArmyStats(actual_ot_user_id, defending_army_obj);
            var defender_losses = 0;
            var defender_stackwiped = false;
            var defender_understrength = false;
            var defender_units = Object.keys(defending_army_obj.units);

            var old_attacking_army_obj = JSON.parse(JSON.stringify(attacking_army_obj));
            var old_defending_army_obj = JSON.parse(JSON.stringify(defending_army_obj));

            //Check for combat_order
            var combat_order = config.defines.combat.combat_order;

            if (usr.researched_technologies.includes(config.defines.combat.combacombat_order_stalemate_tech))
              combat_order = ["defence", "attack"];

            if (ot_user.researched_technologies.includes(config.defines.combat.ccombat_order_switch_tech))
              combat_order = ["attack", "defence"];

            //Check if one side has less than 5% AP or DP of the other side
            if (battle_type == "land") {
              if (attacking_army_stats.attack < defending_army_stats.attack*0.05 && attacking_army_obj.defence < defending_army_stats.defence*0.05) {
                attacker_understrength = true;

                //50% chance of the attacker being stackwiped
                attacker_stackwiped = (randomNumber(0, 100) <= 50);
              }
              if (defending_army_stats.attack < attacking_army_stats.attack*0.05 && defending_army_stats.defence < defending_army_stats.defence*0.05) {
                defender_stackwiped = true;

                //50% chance of the defender being stackwiped
                defender_stackwiped = (randomNumber(0, 100) <= 50);
              }
            }

            //Begin rolling and subtracting units
            var attacker_casualties;
            var attacker_dice_roll = module.exports.calculateRoll(attacking_army_obj);
            var defender_casualties;
            var defender_dice_roll = module.exports.calculateRoll(defending_army_obj);

            //Wipe any empty armies
            if (attacking_army_obj.type == "empty")
              attacker_stackwiped = true;
            if (defending_army_obj.type == "empty")
              defender_stackwiped = true;

            //Process stackwipes
            if (attacker_stackwiped)
              attacker_casualties = module.exports.calculateCasualties(actual_id, attacking_army_obj, defender_dice_roll);
            if (defender_stackwiped)
              defender_casualties = module.exports.calculateCasualties(actual_id, defending_army_obj, attacker_dice_roll);

            if (!attacker_stackwiped && !defender_stackwiped)
              for (var i = 0; i < combat_order.length; i++)
                if (combat_order[i] == "attack") {
                  defender_casualties = module.exports.calculateCasualties(actual_ot_user_id, defending_army_obj,
                      attacker_dice_roll
                  );
                } else if (combat_order[i] == "defence") {
                  attacker_casualties = module.exports.calculateCasualties(actual_id, attacking_army_obj,
                      defender_dice_roll
                  );
                }

            //Check if army must retreat
            var attacker_retreat = false;
            var attacker_side = "neutral";
            var defender_retreat = false;
            var defender_side = "neutral";
            var new_attacking_army_stats = calculateArmyStats(actual_id, attacking_army_obj);
            var new_defending_army_stats = calculateArmyStats(actual_ot_user_id, defending_army_obj);

            if (
              (
                (new_defending_army_stats.defence < defending_army_obj.defence*0.5 || new_defending_army_stats.defence == 0) &&
                defender_casualties > attacker_casualties
              ) || defender_understrength
            ) {
              defender_retreat = true;

              if (battle_type == "land") {
                defending_army_obj.province = (province_obj.adjacencies) ?
                  randomElement(province_obj.adjacencies) :
                  province_obj.id;

                var army_size_in_province = getTroopsInProvince(defending_army_obj.province);
                var meets_occupation_requirements = (army_size_in_province >= province_obj.pops.population*config.defines.combat.occupation_requirement);

                if (meets_occupation_requirements)
                  province_obj.controller = actual_id;

                setAllProvinceColours(actual_id, attacking_army_obj.province, true);
              } else if (battle_type == "sea") {
                if (defending_army_obj.is_blockading)
                  liftBlockade(actual_id, defending_army_obj.id, true);
              }
            } else if (
              (
                (new_attacking_army_stats.defence < attacking_army_stats.defence*0.5 || new_attacking_army_stats.defence == 0) &&
                attacker_casualties > defender_casualties
              ) || attacker_understrength
            ) {
              attacker_retreat = true;

              if (battle_type == "land")
                attacking_army_obj.province = (province_obj.adjacencies) ?
                  randomElement(province_obj.adjacencies) :
                  province_obj.id;
            }

            //Add warscore, casualties
            var attacking_war_exhaustion = returnSafeNumber(Math.round(
              attacker_casualties/
                (getTotalActiveDuty(actual_id) + returnSafeNumber(usr.mobilisation.current_manpower_mobilised))
            ));
            var defending_war_exhaustion = returnSafeNumber(Math.round(
              defender_casualties/
                (getTotalActiveDuty(actual_ot_user_id) + returnSafeNumber(ot_user.mobilisation.current_manpower_mobilised))
            ));

            attacking_war_exhaustion = Math.min(attacking_war_exhaustion, 0.25);
            attacking_war_exhaustion = Math.max(attacking_war_exhaustion, 0);
            defending_war_exhaustion = Math.min(defending_war_exhaustion, 0.25);
            defending_war_exhaustion = Math.max(defending_war_exhaustion, 0);

            usr.modifiers.war_exhaustion += attacking_war_exhaustion;
            ot_user.modifiers.war_exhaustion += defending_war_exhaustion;

            for (var i = 0; i < all_wars.length; i++) {
              var local_war = main.global.wars[all_wars[i]];

              //Reset involvement
              attacker_side = "neutral";
              defender_side = "neutral";

              //Check involvement
              if (local_war.attackers.includes(actual_id))
                attacker_side = "attacker";
              if (local_war.defenders.includes(actual_id))
                attacker_side = "defender";

              if (local_war.attackers.includes(actual_ot_user_id))
                defender_side = "attacker";
              if (local_war.defenders.includes(actual_id))
                defender_side = "defender";

              if (attacker_side != "neutral") {
                local_war[`${attacker_side}_total_casualties`] += attacker_casualties;
                local_war[`${defender_side}_total_casualties`] += defender_casualties;
                local_war[`${actual_id}_casualties`] += attacker_casualties;
                local_war[`${actual_ot_user_id}_casualties`] += defender_casualties;
              }
            }

            //Delete armies if no units are left in them; stackwipe if retreated army is still in the same province
            if (
              getArmySize(actual_id, attacking_army_obj) == 0 ||
              (
                attacker_retreat && attacking_army_obj.province == defending_army_obj.province
              ) || attacker_stackwiped
            )
              deleteArmy(actual_id, attacking_army_obj.id);

            if (
              getArmySize(actual_ot_user_id, defending_army_obj) == 0 ||
              (
                defender_retreat && defending_army_obj.province == attacking_army_obj.province
              ) || defender_stackwiped
            )
              deleteArmy(actual_ot_user_id, defending_army_obj.id);

            //Declare battle_embed tracker variables
            var attacker_string = [];
            var defender_string = [];
            var result_string = [];

            //Format embed contents - Attacker
            attacker_string.push(`**${usr.name}** (${attacking_army_obj.name}):`);
            attacker_string.push("");
            attacker_string.push(`**Strength:**`);
            attacker_string.push(`${parseNumber(returnSafeNumber(attacking_army_stats.attack))} Attack | ${parseNumber(returnSafeNumber(attacking_army_stats.defence))} Defence`);

            for (var i = 0; i < attacker_units.length; i++) {
              var unit_category = getUnitCategoryFromUnit(attacker_units[i]);
              var unit_obj = getUnit(attacker_units[i]);

              var unit_icon = (unit_obj.icon) ?
                config.icons[unit_obj.icon] + " " :
                  (unit_category.icon) ?
                    config.icons[unit_category.icon] + " " :
                    "";
              var unit_name = (unit_obj.name) ? unit_obj.name : attacker_units[i];

              attacker_string.push(`${unit_icon}${parseNumber(returnSafeNumber(attacking_army_obj.units[attacker_units[i]]))} ${unit_name} ${(returnSafeNumber(attacking_army_obj.units[attacker_units[i]]) < old_attacking_army_obj.units[attacker_units[i]]) ? `(-${parseNumber(Math.ceil(old_attacking_army_obj.units[attacker_units[i]] - returnSafeNumber(attacking_army_obj.units[attacker_units[i]])))})` : ""}`);
            }

            attacker_string.push("");
            attacker_string.push(`${config.icons.death} Casualties: **${parseNumber(attacker_casualties)}**`);

            //Format embed contents - Defender
            defender_string.push(`**${ot_user.name}** (${defending_army_obj.name}):`);
            defender_string.push("");
            defender_string.push(`**Strength:**`);
            defender_string.push(`${parseNumber(defending_army_stats.attack)} Attack | ${parseNumber(defending_army_stats.defence)} Defence`);

            for (var i = 0; i < defender_units.length; i++) {
              var unit_category = getUnitCategoryFromUnit(defender_units[i]);
              var unit_obj = getUnit(defender_units[i]);

              var unit_icon = (unit_obj.icon) ?
                config.icons[unit_obj.icon] + " " :
                  (unit_category.icon) ?
                    config.icons[unit_category.icon] + " " :
                    "";
              var unit_name = (unit_obj.name) ? unit_obj.name : defender_units[i];

              defender_string.push(`${unit_icon}${parseNumber(returnSafeNumber(defending_army_obj.units[defender_units[i]]))} ${unit_name} ${(returnSafeNumber(defending_army_obj.units[defender_units[i]]) < old_defending_army_obj.units[defender_units[i]]) ? `(-${parseNumber(Math.ceil(old_defending_army_obj.units[defender_units[i]] - returnSafeNumber(defending_army_obj.units[defender_units[i]])))})` : ""}`);
            }

            defender_string.push("");
            defender_string.push(`${config.icons.death} Casualties: **${parseNumber(defender_casualties)}**`);

            //Format embed contents - Results
            result_string.push(`**Dice Rolls:** ${usr.name} - ${config.icons.dice} **${parseNumber(returnSafeNumber(attacker_dice_roll))}** | ${ot_user.name} - ${config.icons.dice} **${parseNumber(returnSafeNumber(defender_dice_roll))}**`);
            result_string.push(`${config.icons.death} Total Casualties: **${parseNumber(attacker_casualties + defender_casualties)}**`);

            if (attacker_stackwiped) {
              result_string.push(`${config.icons.retreat} Due to being understrength, the attacking side was completely routed from the battlefield and massacred.`);
              result_string.push(`${config.icons.prestige} **${getPrimaryCultures(actual_ot_user_id, { return_objects: true })[0].adjective} Victory**`);
            } else if (defender_stackwiped) {
              result_string.push(`${config.icons.retreat} Due to being understrength, the defending side was completely routed from the battlefield and massacred.`);
              result_string.push(`${config.icons.prestige} **${getPrimaryCultures(actual_id, { return_objects: true })[0].adjective} Victory**`);
            } else {
              if (defender_retreat) {
                result_string.push(`${config.icons.retreat} Due to heavy losses, the defending side was forced to retreat from the battlefield.`);
                result_string.push(`${config.icons.prestige} **${getPrimaryCultures(actual_id, { return_objects: true })[0].adjective} Victory**`);
              } else if (attacker_retreat) {
                result_string.push(`${config.icons.retreat} Due to heavy losses, the attacking side was forced to retreat from the battlefield.`);
                result_string.push(`${config.icons.prestige} **${getPrimaryCultures(actual_ot_user_id, { return_objects: true })[0].adjective} Victory**`);
              } else {
                result_string.push(`${config.icons.small_arms} Neither side was forced to retreat from the battle, and the fighting rages on!`);
                result_string.push(`${config.icons.prestige} **Stalemate**`);
              }
            }

            result_string.push("");
            result_string.push(`${config.icons.infamy} The defending side gained **${(defending_war_exhaustion*100).toFixed(2)}** war exhaustion, whilst the attacking side gained **${(attacking_war_exhaustion*100).toFixed(2)}** war exhaustion.`);

            //Format battle_embed
            var battle_embed = new Discord.MessageEmbed()
              .setColor(settings.bot_colour)
              .setTitle(`**${battle_name}:\n${config.localisation.divider}**`)
              .addFields(
                {
                  name: `${config.icons.attacker} __**Attacker:**__\n━━--\n`,
                  value: attacker_string.join("\n"),
                  inline: true
                },
                {
                  name: `${config.icons.defender} __**Defender:**__\n━━--\n`,
                  value: defender_string.join("\n"),
                  inline: true
                },
                {
                  name: `${config.icons.attacker} __**Results:**__\n━━--\n`,
                  value: result_string.join("\n")
                },
              );

            //Send battle_embed to both users as an embed alert
            sendEmbedAlert(actual_id, battle_embed, battle_name);
            sendEmbedAlert(actual_ot_user_id, battle_embed, battle_name);
          }
  },

  initialiseSubmarineRaid: function (arg0_user, arg1_army_name, arg2_user, arg3_mode) {
    //Convert from parameters
    var user_id = arg0_user;
    var army_name = arg1_army_name.trim().toLowerCase();
    var ot_user_id = arg2_user;
    var mode = arg3_mode.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var ot_game_obj = getGameObject(ot_user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Check to see if the other user is a thing and army_obj exists
    if (ot_user)
      if (army_obj)
        if (army_obj.type == "navy") {
          //Check to see if the navy contains only submarines
          var army_stats = calculateArmyStats(actual_id, army_obj);

          if (army_stats.pure_submarines)
            if (areAtWar(actual_id, actual_ot_user_id))
              if (returnSafeNumber(army_obj.submarine_cooldown) == 0) {
                var all_defender_armies = Object.keys(ot_user.armies);
                var all_units = Object.keys(army_obj.units);
                var defender_attack = 0;

                for (var i = 0; i < all_defender_armies.length; i++)
                  defender_attack += calculateArmyStats(actual_ot_user_id, ot_user.armies[all_defender_armies[i]], { mode: "submarine_naval_defence" });

                switch (mode) {
                  case "convoy":
                    //Make sure there are convoys to intercept
                    if (Object.keys(usr.trades).length > 0) {
                      //Attacks a random import the user might have
                      var succeed_chance = (army_stats.attack/defender_attack)*0.8 + 0.2; //80% comes from the attacker to defender ratio, 20% base chance
                      var random_chance = randomNumber(0, 100);

                      if (random_chance <= succeed_chance*100) {
                        //50-50 chance of losing a submarine or two
                        var actual_sub_losses = 0;
                        var submarines_lost = randomNumber(0, 2);
                        var total_submarines_lost = JSON.parse(JSON.stringify(submarines_lost));

                        for (var i = 0; i < all_units.length; i++) {
                          if (submarines_lost > 0) {
                            if (army_obj.units[all_units[i]] > submarines_lost) {
                              army_obj.units[all_units[i]] -= submarines_lost;
                              module.exports.killUnitPops(actual_id, submarines_lost, all_units[i]);
                              submarines_lost = 0;
                            } else {
                              submarines_lost -= army_obj.units[all_units[i]];
                              module.exports.killUnitPops(actual_id, submarines_lost, all_units[i]);
                              army_obj.units[all_units[i]] = 0;
                            }
                          }

                          if (army_obj.units[all_units[i]] <= 0)
                            delete army_obj.units[all_units[i]];
                        }
                      }

                      army_obj.submarine_cooldown = config.defines.combat.submarine_cooldown;

                      var export_to_remove = randomElement(Object.keys(usr.trades));
                      var local_export = usr.trades[export_to_remove];
                      var local_export_good = getGood(local_export.good_type);

                      printAlert(game_obj.id, `Your submarines intercepted a shipment of ${parseInt(local_export.amount)} ${(local_export_good.name) ? local_export_good.name : local_export.good_type} to **${main.users[local_export_good.target].name}** at the cost of **${parseNumber(total_submarines_lost)}** of their own.`);

                      //Send submarine embed
                      var submarine_result_embed = new Discord.MessageEmbed()
                        .setColor(settings.bot_colour)
                        .setTitle(`Trade Interdiction - Submarine Report #${generateRandomID()}`)
                        .setDescription(`**${getPrimaryCultures(actual_id, { return_objects: true })[0].name}** submarines intercepted a shipment of ${parseInt(local_export.amount)} ${(local_export_good.name) ? local_export_good.name : local_export.good_type} to **${main.users[local_export_good.target].name}** at the cost of **${parseNumber(total_submarines_lost)}** of their own.`);

                      //Send battle_embed to both users as an embed alert
                      sendEmbedAlert(actual_id, submarine_result_embed);

                      delete usr.trades[export_to_remove];
                    }

                    break;
                  case "naval":
                    //Attacks a random fleet
                    var random_attacker_roll = randomNumber(0, army_stats.attack);

                    var all_ot_armies = Object.keys(ot_user.armies);
                    var all_fleets = [];

                    for (var i = 0; i < all_ot_armies.length; i++) {
                      if (Object.keys(ot_user.armies[all_ot_armies[i]].units).length > 0)
                        all_fleets.push(ot_user.armies[all_ot_armies[i]]);
                    }

                    //Only attack if an enemy fleet can be targeted
                    if (all_fleets.length > 0) {
                      var random_fleet = randomElement(all_fleets);

                      //Calculate defender AP
                      defender_attack = calculateArmyStats(actual_ot_user_id, random_fleet, { mode: "submarine_defence" });

                      var attacker_losses = [];
                      var defender_losses = [];
                      var random_defender_roll = randomNumber(0, defender_attack);

                      //Defender losses go first
                      var old_attacking_fleet = JSON.parse(JSON.stringify(army_obj));
                      var old_defending_fleet = JSON.parse(JSON.stringify(random_fleet));

                      var actual_casualties = module.exports.calculateCasualties(actual_id, army_obj, random_defender_roll);
                      var ot_casualties = module.exports.calculateCasualties(actual_ot_user_id, random_fleet, random_attacker_roll);

                      //Parse losses
                      var old_attacking_units = Object.keys(old_attacking_fleet.units);
                      var old_defending_units = Object.keys(old_defending_fleet.units);

                      //Push losses to array
                      for (var i = 0; i < old_attacking_units.length; i++)
                        if (old_attacking_fleet.units[old_attacking_units[i]] > returnSafeNumber(army_obj.units[old_attacking_units[i]])) {
                          var local_unit = getUnit(old_attacking_units[i]);

                          attacker_losses.push(`${parseNumber(old_attacking_fleet.units[old_attacking_units[i]] - army_obj.units[old_attacking_units[i]])} ${(local_unit.name) ? local_unit.name : old_attacking_units[i]}`);
                        }

                      for (var i = 0; i < old_defending_units.length; i++)
                        if (old_defending_fleet.units[old_defending_units[i]] > returnSafeNumber(random_fleet.units[old_defending_units[i]])) {
                          var local_unit = getUnit(old_attacking_units[i]);

                          defender_losses.push(`${parseNumber(old_attacking_fleet.units[old_defending_units[i]] - army_obj.units[old_defending_units[i]])} ${(local_unit.name) ? local_unit.name : old_defending_units[i]}`);
                        }

                      //Send submarine embed
                      var submarine_result_embed = new Discord.MessageEmbed()
                        .setColor(settings.bot_colour)
                        .setTitle(`Fleet Raid - Submarine Report #${generateRandomID()}`)
                        .setDescription(`We lost ${parseList(defender_losses)} during a submarine attack on the **${random_fleet.name}**.\n\n${usr.name} also lost **${parseList(attacker_losses)}**.`);

                      //Send battle_embed to both users as an embed alert
                      sendEmbedAlert(actual_id, submarine_result_embed);

                      //Return user feedback
                      printAlert(game_obj.id, `${ot_user.name} lost ${parseList(defender_losses)} during a submarine attack on the **${random_fleet.name}**.\n\n${usr.name} also lost **${parseList(attacker_losses)}**.`);

                      army_obj.submarine_cooldown = config.defines.combat.submarine_cooldown;
                    }

                    break;
                  case "reserves":
                    //Recalculate defender_attack
                    defender_attack = 0;

                    for (var i = 0; i < all_defender_armies.length; i++)
                      defender_attack += calculateArmyStats(actual_ot_user_id, ot_user.armies[all_defender_armies[i]], { mode: "submarine_defence" });

                    //Reserves guard themselves
                    var has_naval_reserves = false;
                    var reserves_attack = 0;
                    var reserve_units = Object.keys(ot_user.reserves);

                    //Check to see if user has naval reserves
                    for (var i = 0; i < reserve_units.length; i++) {
                      var local_unit_category = getUnitCategoryFromUnit(reserve_units[i]);

                      if (local_unit_category.type == "naval")
                        has_naval_reserves = true;
                    }

                    //Only commence operation once known user has naval reserves
                    if (has_naval_reserves) {
                      for (var i = 0; i < reserve_units.length; i++) {
                        var unit_obj = getUnit(reserve_units[i]);

                        var default_attack = ot_user.reserves[reserve_units[i]]*
                          returnSafeNumber(unit_obj.attack)*
                          returnSafeNumber(usr.modifiers[`${getUnitCategoryFromUnit(reserve_units[i], { return_key: true })}_attack`], 1);

                        //Check to see if unit_counts according to the current mode
                        var unit_counts = false;
                        var unit_attack_modifier = 1;

                        if (unit_obj.type)
                          if (unit_obj.type.includes("destroyer") || unit_obj.type.includes("helicopter")) {
                            unit_counts = true;
                          } else if (unit_obj.type.includes("cruiser")) {
                            unit_counts = true;
                            unit_attack_modifier = 0.5;
                          }

                        if (unit_counts)
                          reserves_attack += default_attack*unit_attack_modifier;
                      }

                      //Defender losses go first
                      var old_attacking_fleet = JSON.parse(JSON.stringify(army_obj));
                      var old_defending_fleet = JSON.parse(JSON.stringify(ot_user.reserves));

                      var actual_casualties = module.exports.calculateCasualties(actual_id, army_obj, random_defender_roll);
                      var ot_casualties = module.exports.calculateCasualties(actual_ot_user_id, ot_user.reserves, random_attacker_roll, true);

                      //Parse losses
                      var old_attacking_units = Object.keys(old_attacking_fleet.units);
                      var old_defending_units = Object.keys(old_defending_fleet);

                      //Push losses to array
                      for (var i = 0; i < old_attacking_units.length; i++)
                        if (old_attacking_fleet.units[old_attacking_units[i]] > returnSafeNumber(army_obj.units[old_attacking_units[i]])) {
                          var local_unit = getUnit(old_attacking_units[i]);

                          attacker_losses.push(`${parseNumber(old_attacking_fleet.units[old_attacking_units[i]] - army_obj.units[old_attacking_units[i]])} ${(local_unit.name) ? local_unit.name : old_attacking_units[i]}`);
                        }

                      for (var i = 0; i < old_defending_units.length; i++)
                        if (old_defending_fleet[old_defending_units[i]] > returnSafeNumber(ot_user.reserves[old_defending_units[i]])) {
                          var local_unit = getUnit(old_attacking_units[i]);

                          defender_losses.push(`${parseNumber(old_attacking_fleet.units[old_defending_units[i]] - army_obj.units[old_defending_units[i]])} ${(local_unit.name) ? local_unit.name : old_defending_units[i]}`);
                        }

                      army_obj.submarine_cooldown = config.defines.combat.submarine_cooldown;

                      //Send submarine embed
                      var submarine_result_embed = new Discord.MessageEmbed()
                        .setColor(settings.bot_colour)
                        .setTitle(`Harbour Raid - Submarine Report #${generateRandomID()}`)
                        .setDescription(`We lost ${parseList(defender_losses)} during a submarine attack on their reserves.\n\n${usr.name} also lost **${parseList(attacker_losses)}** themselves.`);

                      //Send battle_embed to both users as an embed alert
                      sendEmbedAlert(actual_id, submarine_result_embed);

                      //Print user feedback
                      printAlert(game_obj.id, `${ot_user.name} lost ${parseList(defender_losses)} during a submarine attack on their reserves.\n\n${usr.name} also lost **${parseList(attacker_losses)}** themselves.`);
                    }

                    break;
                }

              }
        }
  },

  //killUnitPops() - Kills unit pops without killing the player unit.
  killUnitPops: function (arg0_user, arg1_amount, arg2_unit_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var amount = Math.ceil(parseInt(arg1_amount));
    var unit_name = arg2_unit_name;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var raw_unit_name = (typeof unit_name != "object") ? getUnit(unit_name, { return_key: true }) : getUnit(unit_name.name, { return_key: true });
    var total_losses = 0;
    var unit_obj = (typeof unit_name != "object") ? getUnit(unit_name.trim().toLowerCase()) : unit_name;
    var usr = main.users[actual_id];

    //Check to make sure that the unit_obj exists
    if (usr)
      if (unit_obj) {
        var local_manpower_costs = (unit_obj.manpower_cost) ?
          Object.keys(unit_obj.manpower_cost) :
          [];

        for (var i = 0; i < local_manpower_costs.length; i++) {
          //Check to see if local_manpower_cost is of a military pop or not
          var local_value = unit_obj.manpower_cost[local_manpower_costs[i]]/returnSafeNumber(unit_obj.quantity, 1);
          var pop_obj = config.pops[local_manpower_costs[i]];

          //Kill off pops; mobilisation handler
          if (usr.mobilisation.is_mobilised) {
            var all_mobilised_pops = Object.keys(usr.mobilisation.mobilised_pops);

            for (var x = 0; x < all_mobilised_pops.length; x++) {
              var local_amount = usr.mobilisation.mobilised_pops[all_mobilised_pops[x]];
              var local_percentage = local_amount/usr.mobilisation.currrent_manpower_mobilised;

              //Begin removing pops based on local percentage
              if (raw_unit_name != usr.mobilisation.mobilised_type) {
                var amount_killed = returnSafeNumber(Math.ceil(local_value/all_mobilised_pops.length)*amount);

                killPops(actual_id, {
                  type: local_manpower_costs[i],
                  amount: amount_killed
                });

                usr.pops[`used_${local_manpower_costs[i]}`] = returnSafeNumber(Math.max(
                  usr.pops[`used_${local_manpower_costs[i]}`] - amount_killed,
                  0
                ));

                total_losses += amount_killed;
              } else {
                var amount_killed = returnSafeNumber(Math.ceil(local_value*local_percentage)*amount);

                killPops(actual_id, {
                  type: local_manpower_costs[i],
                  amount: amount_killed
                });

                total_losses += Math.ceil(amount_killed);
                usr.mobilisation.mobilised_pops[all_mobilised_pops[x]] -= amount_killed;
                usr.mobilisation.current_manpower_mobilised -= amount_killed;
              }
            }
          } else {
            var amount_killed = returnSafeNumber(Math.ceil(local_value)*amount);

            killPops(user_id, {
              type: local_manpower_costs[i],
              amount: amount_killed
            });

            usr.pops[`used_${local_manpower_costs[i]}`] = returnSafeNumber(Math.max(
              usr.pops[`used_${local_manpower_costs[i]}`] - amount_killed,
              0
            ));

            total_losses += Math.ceil(amount_killed);
          }
        }
      }

    //Return statement
    return total_losses;
  }
};
