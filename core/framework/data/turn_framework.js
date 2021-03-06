module.exports = {
  nextBattleTick: function (arg0_new_turn) {
    //Convert from parameters
    var is_new_turn = arg0_new_turn;

    //Declare local instance variables
    var all_armies = getAllArmies();
    var all_users = Object.keys(main.users);
    var all_capitals = {};
    var all_enemies = {};
  	var current_date = new Date().getTime();

    main.global.battle_tick = current_date;
    main.last_backup = current_date;
		writeSave({ file_limit: settings.backup_limit });

    //Clear all combat flags
    for (var i = 0; i < all_armies.length; i++)
      delete all_armies[i].in_combat;

    //Create lookup table of all capitals/enemies
    for (var i = 0; i < all_users.length; i++)
      all_capitals[all_users[i]] = getCapital(all_users[i]);
    for (var i = 0; i < all_users.length; i++)
      all_enemies[all_users[i]] = getEnemies(all_users[i]);

    //Iterate over all armies
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = all_armies[i];
      var local_enemies = all_enemies[local_army.owner];
      var local_user = main.users[local_army.owner];
      var province_obj = main.provinces[local_army.province];
      var speed_sample = [local_army.province];

      //Per turn updates
      if (is_new_turn) {
        //Army cooldowns - KEEP AT TOP!
        delete local_army.challenged_this_turn;
        delete local_army.taking_attrition;

        if (local_army.blockade_recovery_turns) {
          local_army.blockade_recovery_turns--;
          if (local_army.blockade_recovery_turns <= 0)
            delete local_army.blockade_recovery_turns;
        }
        if (local_army.moving_to.length == 0)
          local_army.stationary_turns++;
        else
          local_army.stationary_turns = 0;
        if (local_army.submarine_cooldown) {
          local_army.submarine_cooldown--;
          if (local_army.submarine_cooldown <= 0)
            delete local_army.submarine_cooldown;
        }

        //Army attrition
        if (returnSafeNumber(lookup.province_troop_strengths[local_army.province]) > returnSafeNumber(province_obj.supply_limit)*1000)
          if (local_enemies.length > 0)
            if (local_army.type != "navy") {
              var is_capital = false;

              if (all_capitals[local_army.owner])
                if (local_army.province == all_capitals[local_army.owner].id)
                  is_capital = true;

              //Take attrition at a certain percentage
              if (!is_capital) {
                var local_units = Object.keys(local_army.units);

                for (var x = 0; x < local_units.length; x++) {
                  var lost_units = local_army.units[local_units[x]] - Math.ceil(
                    local_army.units[local_units[x]]*config.defines.combat.base_attrition_rate*local_user.modifiers.attrition_rate
                  );

                  //Subtract attrition casualties
                  local_army.units[local_units[x]] -= lost_units;
                  killUnitPops(local_army.owner, lost_units, lookup.all_units[local_units[x]]);

                  if (local_army.units[local_units[x]] <= 0)
                    delete local_army.units[local_units[x]];

                  //Add tracker variable
                  local_army.taking_attrition = true;
                }
              }
            }

        //Army movement
        if (local_army.moving_to) {
          var current_element = local_army.moving_to.indexOf(local_army.province);
          var current_speed = Math.ceil(config.defines.combat.army_speed*local_user.modifiers.army_travel_speed);

          for (var x = 0; x < current_speed; x++)
            if (local_army.moving_to[x + current_element]) {
              var current_province = local_army.moving_to[x + current_element];

              speed_sample.push(current_province);
              local_army.province = current_province;
            }

          //Clear movement array if army has arrived
          if (local_army.province == local_army.moving_to[local_army.moving_to.length - 1]) {
            local_army.moving_to = [];
            local_army.status = "stationed";
          }
        }
      }

      //Check for hostile users in the same province/colliding provinces
      for (var x = 0; x < all_armies.length; x++)
        if (local_enemies.includes(all_armies[x].owner) && speed_sample.includes(all_armies[x].province))
          if (
            local_army.type != "navy" && all_armies[x].type != "navy" &&
            !(local_army.in_combat || all_armies[x].in_combat)
          ) {
            (local_army.stationary_turns > all_armies[x].stationary_turns) ?
              initialiseBattle(all_armies[x].owner, all_armies[x], local_army.owner, local_army) :
              initialiseBattle(local_army.owner, local_army, all_armies[x].owner, all_armies[x]);

            local_army.in_combat = true;
            all_armies[x].in_combat = true;
          }

      //If army is in a hostile province with an army that has more than 0,5% of the local population, and is not in combat, occupy it
      if (!local_army.in_combat && local_enemies.includes(province_obj.controller))
        if (getArmySize(local_army.owner, local_army) > province_obj.pops.population*config.defines.combat.occupation_requirement) {
          province_obj.controller = local_army.owner;
          setAllProvinceColours(province_obj.controller, province_obj.id, true)
        }
    }
  },

  nextGlobalTurn: function () {
    //Declare local instance variables
    var all_armies = getAllArmies();
    var all_market_goods = Object.keys(main.market);
    var all_provinces = Object.keys(main.provinces);
    var all_users = Object.keys(main.users);
    var all_wars = Object.keys(main.global.wars);

    //Map processing
    {
      if (main.round_count == 1)
        for (var i = 0; i < mapmodes.length; i++)
          forceRender(mapmodes[i]);
      forceRender("supply");
    }

    //Optimisation processing
    {
      lookup.province_troop_strengths = {};

      for (var i = 0; i < all_provinces.length; i++)
        lookup.province_troop_strengths[all_provinces[i]] = getTroopsInProvince(all_provinces[i]);
    }

    //War processing
    {
      //Iterate over all provinces to check occupation risk
      for (var i = 0; i < all_provinces.length; i++) {
        var local_province = main.provinces[all_provinces[i]];

        if (local_province.owner)
          if (local_province.owner != local_province.controller) {
            var amount_of_troops = getTroopsInProvince(all_provinces[i]);
            var revolt_risk = Math.min(1 - (amount_of_troops/(local_province.pops.population/100)), 0.5);
            var revolt_roll = Math.random();

            if (revolt_roll < revolt_risk) {
              local_province.controller = local_province.owner;

              //Render mapmodes for province
              setAllProvinceColours(local_province.owner, all_provinces[i]);
            }
          }
      }

      //Iterate over all wars to process warscore
      for (var i = 0; i < all_wars.length; i++) {
        var local_war = main.global.wars[all_wars[i]];

        var attacker_war_exhaustion = 0;
        var attacker_warscore = 0;
        var defender_war_exhaustion = 0;
        var defender_warscore = 0;
        var fully_sieged_defenders = 0;

        //Initialise variables
        for (var x = 0; x < local_war.attackers.length; x++) {
          var local_user = main.users[local_war.attackers[x]];

          attacker_war_exhaustion += returnSafeNumber(local_user.modifiers.war_exhaustion, 1);
        }
        for (var x = 0; x < local_war.defenders.length; x++) {
          var local_user = main.users[local_war.defenders[x]];

          defender_war_exhaustion += returnSafeNumber(local_user.modifiers.war_exhaustion, 1);
          if (returnSafeNumber(local_user.modifiers.war_exhaustion, 1) == 1)
            fully_sieged_defenders++;
        }

        //Set attacker_warscore; defender_warscore
        local_war.attacker_warscore = Math.min((fully_sieged_defenders != local_war.defenders.length) ?
          0.75*defender_war_exhaustion + (
            0.25*returnSafeNumber(main.users[local_war.defenders_war_leader].modifiers.war_exhaustion, 1)
          ) :
          1
        , 1);
        local_war.defender_warscore = Math.min(
          parseFloat((attacker_war_exhaustion/local_war.attackers.length).toFixed(2)),
        1);
      }
    }

    //World Market Up-Logic
    {
      for (var i = 0; i < all_market_goods.length; i++) {
        var local_market_good = main.market[all_market_goods[i]];

        //Increase buy_price each turn
        if (local_market_good.buy_price < local_market_good.sell_price*1.2)
          local_market_good.buy_price = Math.ceil(local_market_good.buy_price*1.2);

        //Institute minimum good price caps
        local_market_good.buy_price =
          Math.max(local_market_good.buy_price, config.defines.economy.resource_min_buy_price);

        local_market_good.sell_price =
          Math.max(local_market_good.sell_price, config.defines.economy.resource_min_sell_price);
      }
    }

    //Iterate over all users and process their turns
    for (var i = 0; i < all_users.length; i++)
      try {
        nextTurn(all_users[i]);
      } catch (e) {
        console.log(e);
      }

    //World Market Down-Logic
    {
      for (var i = 0; i < all_market_goods.length; i++) {
        var local_market_good = main.market[all_market_goods[i]];

        //If no one cares about a good enough, the prices will come down
        if (
          local_market_good.amount_sold < 5 &&

          //There can't be a shortage of the existing good
          local_market_good.stock >= Math.ceil(
            config.defines.economy.resource_base_stock*0.1
          )
        ) {
          if (local_market_good.buy_price > 100 && local_market_good.sell_price > 100) {
            local_market_good.buy_price = Math.ceil(local_market_good.buy_price*0.95);
            local_market_good.sell_price = Math.ceil(local_market_good.sell_price*0.95);
          }
        } else {
          //Randomly increase the buy_price of the good by anywhere from 3-8%, and decrease the sell_price of the good by anywhere from 3-8%.

          local_market_good.buy_price = Math.ceil(local_market_good.buy_price*
            (randomNumber(103, 108)/100)
          );
          local_market_good.sell_price = Math.ceil(local_market_good.sell_price*
            (randomNumber(92, 97)/100)
          );
        }

        //amount_sold deteriorates each turn to simulate large market demand
        local_market_good.amount_sold = Math.ceil(local_market_good.amount_sold*0.5);
      }
    }

    //Increment global round-count
    main.global.round_count++;
  },

  nextTurn: function (arg0_user, arg1_options) { //[WIP] - Add newspaper section later, subtract political capital by vassal maintenance each turn, war exhaustion handler
    //Convert from parameters
    var user_id = arg0_user;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables; make sure to account for user simulations
    var actual_id = (options.is_simulation) ?
      main.global.user_map[user_id] + "_simulation" :
      main.global.user_map[user_id];
    if (options.is_simulation) {
      user_id += "_simulation";
      main.global.user_map[user_id] = actual_id;

      main.users[actual_id] = JSON.parse(JSON.stringify(main.users[main.global.user_map[user_id.replace("_simulation", "")]]));
    }
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_armies = (usr.armies) ? Object.keys(usr.armies) : [];
    var all_casus_belli = Object.keys(config.casus_belli);
    var all_cities = getCities(actual_id);
    var all_enemies = getEnemies(actual_id);
    var all_events = lookup.all_events;
    var all_expeditions = Object.keys(usr.expeditions);
    var all_goods = lookup.all_goods_array;
    var all_good_names = lookup.all_good_names;
    var all_governments = Object.keys(config.governments);
    var all_non_aggression_pacts = Object.keys(usr.diplomacy.non_aggression_pacts);
    var all_pops = Object.keys(config.pops);
    var all_production = getProduction(actual_id);
    var all_relations = Object.keys(usr.diplomacy.relations);
    var all_temporary_modifiers = Object.keys(usr.temporary_modifiers);
    var all_users = Object.keys(main.users);
    var controlled_provinces = getProvinces(actual_id);
    var is_being_justified_on = isBeingJustifiedOn(actual_id);
    var owned_provinces = getProvinces(actual_id, { include_hostile_occupations: true });

    //Modifier and tracker variable processing
    console.time(`Modifier and tracker variable processing!`);
    try {
      //Generic trackers
      usr.country_age++;
      usr.provinces = owned_provinces.length;

      //Base action gain
      usr.actions += config.defines.economy.starting_actions;

      //City modifiers/trackers
      usr.city_cap = getCitiesCap(actual_id);
      usr.total_cities += getCities(actual_id, { include_hostile_occupations: true }).length;

      //Combat modifiers
      {
        //Blockades
        if (usr.blockaded.blockade_cooldown)
          usr.blockaded.blockade_cooldown--;

        //Civilian/military casualties
        usr.recent_civilian_casualties.push(0);
        usr.recent_military_casualties.push(0);

        if (usr.recent_civilian_casualties.length > 10)
          usr.recent_civilian_casualties.splice(0, 1);
        if (usr.recent_military_casualties.length > 10)
          usr.recent_military_casualties.splice(0, 1);

        //Delete unnecessary keys
        if (usr.blockaded.blockade_cooldown == 0)
          delete usr.blockaded.blockade_cooldown;
      }

      //Diplomatic modifiers
      {
        //Reduce infamy
        usr.modifiers.infamy += usr.modifiers.infamy_loss;

        //Reset tracker variables
        usr.total_ceded_this_turn = 0;
        usr.total_cities_ceded_this_turn = 0;

        //Set infamy caps
        usr.modifiers.infamy = Math.max(usr.modifiers.infamy, 0);
        usr.modifiers.infamy = Math.min(usr.modifiers.infamy, config.defines.diplomacy.absolute_infamy_limit);

        //Infamy limit
        usr.modifiers.rgo_throughput += usr.infamy_rgo_throughput;
        usr.modifiers.production_efficiency += usr.infamy_production_efficiency;

        if (usr.modifiers.infamy > config.defines.diplomacy.infamy_limit) {
          usr.infamy_production_efficiency = usr.modifiers.infamy*0.02; //-2% per infamy
          usr.infamy_rgo_throughput = usr.modifiers.infamy*0.03; //-3% per infamy

          usr.infamy_production_efficiency = Math.max(usr.infamy_production_efficiency, 0);
          usr.infamy_rgo_throughput = Math.max(usr.infamy_rgo_throughput, 0);
        } else {
          usr.infamy_production_efficiency = 0;
          usr.infamy_rgo_throughput = 0;
        }

        //Subtract both infamy_production_efficiency and infamy_rgo_throughput from modifiers
        usr.modifiers.production_efficiency -= returnSafeNumber(usr.infamy_production_efficiency);
        usr.modifiers.rgo_throughput -= returnSafeNumber(usr.infamy_rgo_throughput);

        //Used diplomatic slots
        usr.diplomacy.used_diplomatic_slots = getUsedDiplomaticSlots(actual_id);

        //War exhaustion
        if (all_enemies.length == 0 && !usr.blockaded.is_blockaded && !usr.mobilisation.is_mobilised)
          usr.modifiers.war_exhaustion -= config.defines.combat.war_exhaustion_tickdown_rate;
      }

      //Economic modifiers
      {
        usr.transactions_this_turn = 0;
      }

      //Population modifiers/trackers
      usr.population = getPopulation(actual_id);
      delete usr.has_famine;

      //Stability modifiers/trackers
      if (returnSafeNumber(usr.stability_boost) > 0)
        usr.stability_boost -= 0.01;

      //Temporary modifier handling
      {
        //Iterate over all temporary modifiers
        for (var i = 0; i < all_temporary_modifiers.length; i++) {
          var local_temporary_modifier = usr.temporary_modifiers[all_temporary_modifiers[i]];

          //Reduce temporary_modifier duration if it is over zero
          if (local_temporary_modifier.duration > 0)
            local_temporary_modifier.duration--;

          //If the temporary_modifier's duration is now zero, apply the inverse modifier to the user and delete the key
          if (local_temporary_modifier.duration == 0) {
            applyModifiers(actual_id, {
              [local_temporary_modifier.type]: local_temporary_modifier.value*-1
            });

            delete usr.temporary_modifiers[all_temporary_modifiers[i]];
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Modifier and tracker variable processing!`);

    console.time(`Alert processing!`);
    //Alert processing
    try {
      var alerts_to_remove = [];

      for (var i = 0; i < usr.alerts.length; i++) {
        var ai_chance_sum = 0;
        var ai_chance_ranges = [];

        //Deduct from duration
        if (usr.alerts[i].duration > 0)
          usr.alerts[i].duration--;

        //Check if alert has timed out
        if (usr.alerts[i].duration == 0) {
          var alert_buttons = usr.alerts[i].buttons;

          //Resolve alert by weighted random if AI chance is a thing
          if (alert_buttons)
            if (usr.alerts[i].has_ai_chance) {
              for (var x = 0; x < alert_buttons.length; x++) {
                var current_ai_chance =  returnSafeNumber(alert_buttons[x].ai_chance);

                ai_chance_ranges.push([ai_chance_sum, ai_chance_sum + current_ai_chance, alert_buttons[x].id]);
                ai_chance_sum += current_ai_chance;
              }

              //Roll the dice
              var dice_roll = randomNumber(0, ai_chance_sum);

              //See where the dice roll landed
              for (var x = 0; x < ai_chance_ranges.length; x++)
                if (dice_roll >= ai_chance_ranges[x][0] && dice_roll < ai_chance_ranges[x][1]) {
                  //The dice roll landed here
                  var button_obj = getButton(usr.alerts[i].id, ai_chance_ranges[x][2]);

                  //Execute effect
                  if (button_obj.effect)
                    button_obj.effect(usr.alerts[i].options);
                }
            } else {
              var dice_roll = randomNumber(0, alert_buttons.length - 1);

              //See where the dice roll landed
              var button_obj = getButton(usr.alerts[i].id, alert_buttons[dice_roll].id);

              //Execute effect
              if (button_obj.effect)
                button_obj.effect(usr.alerts[i].options);
            }

          //Push to removal array
          alerts_to_remove.push(i);
        }
      }

      //Remove all alerts in alerts_to_remove
      for (var i = alerts_to_remove.length - 1; i >= 0; i--)
        usr.alerts.splice(alerts_to_remove[i], 1);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Alert processing!`);

    console.time(`Building processing!`);
    //Building processing
    try {
      var all_produced_goods = Object.keys(all_production);

      for (var i = 0; i < all_produced_goods.length; i++) {
        var local_value = all_production[all_produced_goods[i]];

        //Process upkeep
        if (all_produced_goods[i].includes("_upkeep")) {
          if (!all_produced_goods[i].includes("money")) {
            var upkeep_to_process = all_produced_goods[i].replace("_upkeep", "");

            if (usr.inventory[upkeep_to_process] != undefined)
              usr.inventory[upkeep_to_process] -= randomNumber(local_value[0], local_value[1]);
            else
              usr[upkeep_to_process] -= randomNumber(local_value[0], local_value[1]);
          }
        } else if (all_produced_goods[i].includes("_special_effect")) {
          //Process special effects
          var special_effect_to_process = all_produced_goods[i].replace("_special_effect", "");

          var building_obj = getBuilding(special_effect_to_process);

          if (building_obj.special_effect)
            building_obj.special_effect(usr);
        } else {
          //Process goods
          if (usr.inventory[all_produced_goods[i]] != undefined)
            usr.inventory[all_produced_goods[i]] += randomNumber(local_value[0], local_value[1]);
          else
            usr[all_produced_goods[i]] += randomNumber(local_value[0], local_value[1]);
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Building processing!`);

    console.time(`Budget processing!`);
    //Budget processing
    try {
      //Add money based on calculated user income
      var user_income = getIncome(actual_id, all_production);
      usr.money += randomNumber(user_income[0], user_income[1]);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Budget processing!`);

    console.time(`Colonisation processing!`);
    //Colonisation processing
    try {
      if (!options.is_simulation)
        for (var i = 0; i < all_expeditions.length; i++) {
          var local_expedition = usr.expeditions[all_expeditions[i]];

          //Decrease duration
          local_expedition.duration--;

          if (local_expedition.duration < 1) {
            for (var x = 0; x < local_expedition.provinces.length; x++) {
              //Check to see if province already has an owner, if not, settle it
              var local_province = main.provinces[local_expedition.provinces[x]];

              if (!local_province.owner)
                settleProvince(local_expedition.provinces[x], actual_id);
            }

            //Remove expedition key
            delete usr.expeditions[all_expeditions[i]];
          }
        }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Colonisation processing!`);

    console.time(`Construction processing!`);
    //Construction processing
    try {
      for (var i = usr.under_construction.length - 1; i >= 0; i--) {
        usr.under_construction[i].construction_turns--;

        //Check if building(s) are done being built
        if (usr.under_construction[i].construction_turns <= 0) {
          var local_city_obj = getProvince(usr.under_construction[i].province_id);

          if (local_city_obj.buildings)
            //Individual buildings are treated as objects in an array here because this allows for further granularity in the future
            constructBuilding(usr.under_construction[i].building_amount, usr.under_construction[i].building_type, usr.under_construction[i].province_id, i);
        }
      }

      //Remove glitched constructions
      for (var i = usr.under_construction.length - 1; i >= 0; i--)
        if (usr.under_construction[i].construction_turns <= 0)
          usr.under_construction.splice(i, 1);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Construction processing!`);

    console.time(`Diplomacy processing!`);
    //Diplomacy processing
    try {
      if (!options.is_simulation) {
        //Casus Belli
        var cbs_to_remove = [];

        for (var i = 0; i < usr.diplomacy.casus_belli.length; i++) {
          var local_casus_belli = usr.diplomacy.casus_belli[i];

          local_casus_belli.duration--;

          if (local_casus_belli.duration <= 0)
            cbs_to_remove.push(i);
        }

        //Remove all cbs in cbs_to_remove
        for (var i = cbs_to_remove.length - 1; i >= 0; i--)
          usr.diplomacy.casus_belli.splice(cbs_to_remove[i], 1);

        for (var i = 0; i < all_casus_belli.length; i++) {
          var local_cb = config.casus_belli[all_casus_belli[i]];

          if (local_cb.limit)
            for (var x = 0; x < all_users.length; x++)
              if (all_users[x] != actual_id)
                //Make sure user can't have the same CB twice
                try {
                  if (local_cb.limit(usr, main.users[all_users[x]])) {
                    var already_has_this_cb = false;

                    for (var y = 0; y < usr.diplomacy.casus_belli.length; y++) {
                      var local_casus_belli = usr.diplomacy.casus_belli[y];

                      if (
                        local_casus_belli.type == all_casus_belli[i] &&
                        local_casus_belli.target == all_users[x]
                      )
                        already_has_this_cb = true;
                    }

                    if (!already_has_this_cb)
                      usr.diplomacy.casus_belli.push({
                        type: all_casus_belli[i],
                        target: all_users[x],

                        duration: 1
                      });
                  }
                } catch {}
        }

        //Improve/decrease relations
        for (var i = 0; i < all_relations.length; i++) {
          var local_relation = usr.diplomacy.relations[all_relations[i]];

          //Check if improving_to value exists
          if (local_relation.improving_to)
            if (local_relation.improving_to < local_relation.value) {
              var relation_change = (local_relation.improving_to - local_relation.value)/local_relation.duration;

              //Set new relation value
              local_relation.value += relation_change;

              //Cap off at whatever relation_change was, negative/positive
              //Negative handler
              if (
                (relation_change < 0 && local_relation.value < local_relation.improving_to) ||
                (relation_change > 0 && local_relation.value > local_relation.improving_to)
              )
                local_relation.value = local_relation.improving_to;

              //Check if the current value is equal to the improved relation
              if (local_relation.value >= local_relation.improving_to) {
                //Set status to stagnant
                local_relation.status = "stagnant";

                //If so, delete the keys
                delete local_relation.improving_to;
                delete local_relation.duration;
              }

              //Cap it out at -100 and +100
              local_relation.value = Math.max(local_relation.value, -100);
              local_relation.value = Math.min(local_relation.value, 100);
            }
        }

        //Non-aggression pacts
        for (var i = 0; i < all_non_aggression_pacts.length; i++) {
          var local_non_aggression_pact = usr.diplomacy.non_aggression_pacts[i];

          //Decrement duration if greater than zero
          if (local_non_aggression_pact.duration > 0)
            local_non_aggression_pact.duration--;

          //Delete non aggression pact once time runs out
          if (local_non_aggression_pact.duration == 0)
            dissolveNonAggressionPact(actual_id, local_non_aggression_pact.id);
        }

        //Prestige
        {
          usr.prestige = Math.max(0, usr.prestige + usr.modifiers.prestige_gain);
        }

        //Vassalage
        if (getVassal(actual_id))
          usr.vassal_years++;

        //Wargoal justification
        {
          var justifications_to_remove = [];

          for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
            var local_justification = usr.diplomacy.justifications[i];

            local_justification.duration--;

            //Check if justification has finished
            if (local_justification.duration <= 0) {
              //Give wargoal
              usr.diplomacy.wargoals.push({
                type: local_justification.type,
                target: local_justification.target
              });

              //Push to removal array
              justifications_to_remove.push(i);
            }
          }

          //Remove justifications_to_remove from usr.diplomacy.justifications
          for (var i = justifications_to_remove.length - 1; i >= 0; i--)
            usr.diplomacy.justifications.splice(justifications_to_remove[i], 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Diplomacy processing!`);

    console.time(`Events processing!`);
    //Events processing (Mirror of alerts processing)
    try {
      var events_to_remove = [];

      //Event triggers
      for (var i = 0; i < all_events.length; i++)
        //Check if user meets event requirements
        if (all_events[i].trigger)
          if (all_events[i].trigger(usr))
            sendEvent(actual_id, lookup.all_event_names[i], {
              FROM: actual_id,
              TO: actual_id
            });

      //Event resolution
      for (var i = 0; i < usr.events.length; i++) {
        var ai_chance_sum = 0;
        var ai_chance_ranges = [];

        //Deduct from duration
        if (usr.events[i].duration > 0)
          usr.events[i].duration--;

        //Check if event has timed out
        if (usr.events[i].duration == 0) {
          var event_options = usr.events[i].options;

          //Resolve event by weighted random if AI chance is a thing
          if (event_options)
            if (usr.events[i].has_ai_chance) {
              for (var x = 0; x < event_options.length; x++) {
                var current_ai_chance =  (typeof event_options[x].ai_chance == "function") ?
                  returnSafeNumber(event_options[x].ai_chance(usr, usr.events[i].scopes)) :
                  returnSafeNumber(event_options[x].ai_chance);

                ai_chance_ranges.push([ai_chance_sum, ai_chance_sum + current_ai_chance, event_options[x].id]);
                ai_chance_sum += current_ai_chance;
              }

              //Roll the dice
              var dice_roll = randomNumber(0, ai_chance_sum);

              //See where the dice roll landed
              for (var x = 0; x < ai_chance_ranges.length; x++)
                if (dice_roll >= ai_chance_ranges[x][0] && dice_roll < ai_chance_ranges[x][1]) {
                  //The dice roll landed here
                  var option_obj = getButton(usr.events[i].id, ai_chance_ranges[x][2]);

                  //Execute effect
                  if (option_obj.effect)
                    option_obj.effect(usr.events[i].scopes);
                }
            } else {
              var dice_roll = randomNumber(0, event_options.length - 1);

              //See where the dice roll landed
              var option_obj = getOption(usr.events[i].id, event_options[dice_roll].id);

              //Execute effect
              if (option_obj.effect)
                option_obj.effect(usr.events[i].options);
            }

          //Push to removal array
          events_to_remove.push(i);
        }
      }

      //Remove all events in events_to_remove
      for (var i = events_to_remove.length - 1; i >= 0; i--)
        usr.events.splice(events_to_remove[i], 1);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Events processing!`);

    console.time(`Goods processing!`);
    //Goods processing
    try {
      for (var i = 0; i < all_goods.length; i++)
        if (all_goods[i].special_effect)
          all_goods[i].special_effect(usr);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Goods processing!`);

    console.time(`Market processing!`);
    //Market processing
    try {
      //Reduce maximum transaction amount from the Global Market to 20% of total Shipment Capacity after 10 turns, or whatever it is set to in defines
      if (usr.country_age > 10)
        usr.modifiers.maximum_transaction_amount = config.defines.economy.resource_max_percentile;
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Market processing!`);

    console.time(`Military processing!`);
    //Military processing
    try {
      //Mobilisation processing
      {
        if (usr.mobilisation.is_mobilised) {
          //Update local tracker variables
          var new_manpower_mobilised = 0;

          //Mobilise more people if current_manpower_mobilised is not the same as total_manpower_mobilised
          if (usr.mobilisation.current_manpower_mobilised < usr.mobilisation.total_manpower_mobilised)
            new_manpower_mobilised += Math.ceil(
              (usr.mobilisation.total_manpower_mobilised - usr.mobilisation.current_manpower_mobilised)/
                usr.mobilisation.original_duration
            );

          //How to deal with rounding?
          new_manpower_mobilised = Math.min(new_manpower_mobilised, usr.mobilisation.total_manpower_mobilised - usr.mobilisation.current_manpower_mobilised);

          usr.mobilisation.total_manpower_mobilised += new_manpower_mobilised;
          usr.reserves[usr.mobilisation.unit_type] += new_manpower_mobilised;

          //Decrement duration
          if (usr.mobilisation.duration > 0)
            usr.mobilisation.duration--;
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Military processing!`);

    console.time(`Politics processing!`);
    //Politics processing
    try {
      //Political Discontent Modifiers - Keep at top, applies political modifiers
      {
        //Subtract first to level the playing field
        usr.modifiers.political_capital_gain -= usr.political_capital_gain_modifier;
        usr.modifiers.reform_desire_gain -= usr.political_reform_desire_modifier;
        usr.modifiers.stability_modifier -= usr.political_instability_modifier;

        usr.political_capital_gain_modifier = 0;
        usr.political_reform_desire_modifier = 0;
        usr.political_instability_modifier = 0;

        //Negatively impacts stability and political capital gain; only begins impacting if party discontent is over 25.

        for (var i = 0; i < all_governments.length; i++) {
          var government_obj = config.governments[all_governments[i]];
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > 0)
            if (local_government.discontent > 25) {
              usr.political_capital_gain_modifier += -5*local_government.popularity*local_government.discontent;
              usr.political_reform_desire_modifier += 0.2*local_government.popularity*local_government.discontent;
              usr.political_instability_modifier += 35*local_government.popularity*local_government.discontent;
            } else {
              usr.political_capital_gain_modifier += 5*local_government.popularity*local_government.discontent;
              usr.political_reform_desire_modifier += -0.2*local_government.popularity*local_government.discontent;
              usr.political_instability_modifier += -35*local_government.popularity*local_government.discontent;
            }
        }

        //Stability-cap, cap before re-adding
        usr.political_instability_modifier = Math.max(usr.political_instability_modifier, -0.35);
        usr.political_instability_modifier = Math.min(usr.political_instability_modifier, 0.50);

        usr.political_capital_gain_modifier = Math.max(usr.political_capital_gain_modifier, 0);

        //Reapply modifiers
        usr.modifiers.political_capital_gain += usr.political_capital_gain_modifier;
        usr.modifiers.reform_desire_gain += usr.political_reform_desire_modifier;
        usr.modifiers.stability_modifier += usr.political_instability_modifier;

        //Institute cap
        usr.modifiers.political_capital_gain = Math.max(usr.modifiers.political_capital_gain, 5);
        usr.modifiers.political_capital_gain = Math.min(usr.modifiers.political_capital_gain, 200);

        usr.modifiers.reform_desire_gain = Math.max(usr.modifiers.reform_desire_gain, -0.25);
        usr.modifiers.reform_desire_gain = Math.min(usr.modifiers.reform_desire_gain, 0.2);
      }

      //Coup
      if (usr.coup_this_turn != "") {
        usr.tax_rate = 0;
        setGovernment(actual_id, usr.coup_this_turn);

        //Reset coup_this_turn so we don't coup 24/7
        usr.actions = 0;
        usr.coup_this_turn = "";
      }

      //Party drift
      {
        var most_popular_party = [0, ""]; //[percentage, party_name];
        var total_change = 0;

        for (var i = 0; i < all_governments.length; i++) {
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > most_popular_party[0])
            most_popular_party = [local_government.popularity, all_governments[i]];

          if (usr.available_governments.includes(all_governments[i])) {
            total_change += local_government.drift;

            if (local_government.drift)
              addPartyPopularity(actual_id, { ideology: all_governments[i], amount: local_government.drift });
          }
        }

        //Party popularity handler
        if (most_popular_party[1] == "") {
          usr.politics[usr.government].popularity = 1;
          most_popular_party = [1, usr.government];
        }

        var most_popular_party_obj = usr.politics[most_popular_party[1]];

        most_popular_party_obj.popularity = Math.max(most_popular_party_obj.popularity, 0);

        //Reconduct check after processing
        for (var i = 0; i < all_governments.length; i++)
          if (local_government.popularity > most_popular_party[0])
            most_popular_party = [usr.politics[all_governments[i]].popularity, all_governments[i]];

        //Conduct election if more than 5 turns have passed since the last one
        if (main.global.round_count >= usr.last_election + 5) {
          var election_winner = most_popular_party[1];

          if (config.governments[usr.government].effect)
            if (config.governments[usr.government].effect.has_elections)
              setGovernment(actual_id, election_winner);

          //Set last election
          usr.last_election = main.global.round_count;
        }

        //Reset political parties if anarchy
        if (config.governments[usr.government].is_anarchy)
          for (var i = 0; i < all_governments.length; i++)
            if (!config.governments[all_governments[i]].is_anarchy)
              usr.politics[all_governments[i]].popularity = 0;

        usr.politics[usr.government].popularity = 1;
      }

      //Political Capital
      {
        usr.modifiers.political_capital += usr.modifiers.political_capital_gain;

        //Accepted cultures maintenance for political capital
        usr.modifiers.political_capital -= getAcceptedCultures(actual_id).length*config.defines.politics.accepted_culture_maintenance_cost;

        //Round off political_capital
        usr.modifiers.political_capital = Math.round(usr.modifiers.political_capital);
      }

      //Reform Desire
      {
        var total_reform_desire_gain = usr.modifiers.reform_desire_gain;

        for (var i = 0; i < all_governments.length; i++) {
          var government_obj = config.governments[all_governments[i]];
          var local_government = usr.politics[all_governments[i]];

          if (local_government.popularity > 0)
            if (government_obj.effect.reform_desire_gain)
              total_reform_desire_gain += government_obj.effect.reform_desire_gain*local_government.popularity;
        }

        total_reform_desire_gain = Math.min(total_reform_desire_gain, 0.09); //9% cap

        usr.modifiers.reform_desire += total_reform_desire_gain;

        //Cap off reform desire at 0-100%
        usr.modifiers.reform_desire = Math.max(usr.modifiers.reform_desire, 0);
        usr.modifiers.reform_desire = Math.min(usr.modifiers.reform_desire, 1);

        //If no reforms are unlocked, reset reform_desire
        if (usr.available_reforms.length == 0)
          usr.modifiers.reform_desire = 0;

        //Check if reform desire is at 100%, if so, add discontent to all parties with a popularity greater than 0%
        if (usr.modifiers.reform_desire >= 1)
          for (var i = 0; i < all_governments.length; i++) {
            var local_government = usr.politics[all_governments[i]];

            if (local_government.popularity > 0)
              local_government.discontent = Math.min(local_government.discontent + 10, 100);
          }
      }

      //Stability
      {
        var government_stability_modifier = getGovernmentStabilityModifier(actual_id);
        var low_party_popularity = false;
        var popularity_stability_modifier = usr.politics[usr.government].popularity*0.75;

        //Calculate stability
        usr.modifiers.stability = Math.ceil(
          popularity_stability_modifier +
          government_stability_modifier -
          usr.tax_rate -
          usr.modifiers.overextension +
          returnSafeNumber(usr.boosted_stability) +
          usr.modifiers.stability_modifier
        );

        //Cap off stability
        usr.modifiers.stability = Math.min(usr.modifiers.stability, 1);
        usr.modifiers.stability = Math.max(usr.modifiers.stability, 0);

        if (usr.country_age > 10) {
          //Check for dice roll and low party popularity
          var dice_roll = randomNumber(0, 100)/100;

          for (var i = 0; i < all_governments.length; i++)
            if (usr.politics[all_governments[i]].popularity >= config.defines.politics.coup_popularity_threshold)
              if (all_governments[i] != usr.government)
                low_party_popularity = true;

          if (dice_roll > usr.modifiers.stability + config.defines.politics.revolt_threshold) {
            //Fetch list of valid governments to coup to
            var coup_list = JSON.parse(JSON.stringify(usr.available_governments));
            removeElement(coup_list, usr.government);

            if (low_party_popularity)
              if (coup_list.length > 0) {
                var new_government = randomElement(coup_list);

                //Set new government
                setGovernment(actual_id, new_government);

                //Reset actions and tax rate
                usr.actions = 0;
                if (!options.is_simulation)
                  usr.tax_rate = 0;
              }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Politics processing!`);

    console.time(`Pop processing!`);
    //Pop processing
    try {
      //Cultural assimilations
      {
        var assimilations_to_remove = [];
        var cultural_integrations_to_remove = [];

        //Cultural integrations
        for (var i = 0; i < usr.pops.cultural_integrations.length; i++) {
          usr.pops.cultural_integrations[i].duration--;

          if (usr.pops.cultural_integrations[i].duration <= 0) {
            var local_culture = getCulture(usr.pops.cultural_integrations[i].culture_id);

            local_culture.accepted_culture.push(actual_id);
            cultural_integrations_to_remove.push(i);
          }
        }

        //Remove cultural integrations
        for (var i = cultural_integrations_to_remove.length - 1; i >= 0; i--)
          usr.pops.assimilations.splice(cultural_integrations_to_remove[i], 1);

        //Province assimilations
        for (var i = 0; i < usr.pops.assimilations.length; i++) {
          var local_province = getProvince(usr.pops.assimilations[i].province_id);

          usr.pops.assimilations[i].duration--;

          if (usr.pops.assimilations[i].duration <= 0)
            if (local_province.controller == actual_id) {
              local_province.culture = usr.pops.assimilations[i].culture_id;
              assimilations_to_remove.push(i);
            }
        }

        //Remove assimilations
        for (var i = assimilations_to_remove.length - 1; i >= 0; i--)
          usr.pops.assimilations.splice(assimilations_to_remove[i], 1);
      }

      //Population growth
      {
        if (!usr.has_famine)
          for (var i = 0; i < owned_provinces.length; i++)
            if (owned_provinces[i].type == "urban") {
              var scalar = 1;

              if (owned_provinces[i].pops.population > 500000) //-3% per million
                scalar -= Math.ceil(
                  (owned_provinces[i].pops.population - 500000)/1000000
                )*0.03;
              scalar = Math.max(0.775, scalar);

              //Calculate urban pop growth for all pops
              if (owned_provinces[i].housing > owned_provinces[i].pops.population)
                for (var x = 0; x < all_pops.length; x++) {
                  var local_pop_growth =
                    Math.ceil(owned_provinces[i].pops[all_pops[x]]*usr.pops[`${all_pops[x]}_growth_modifier`]*scalar*usr.modifiers.pop_growth_modifier) - owned_provinces[i].pops[all_pops[x]];

                  usr.pops[all_pops[x]] += local_pop_growth;
                  usr.population += local_pop_growth;
                  owned_provinces[i].pops[all_pops[x]] += local_pop_growth;
                  owned_provinces[i].pops.population += local_pop_growth;
                }

            } else {
              //Make sure .pop_cap is a thing
              if (!owned_provinces[i].pop_cap)
                owned_provinces[i].pop_cap = (config.defines.economy.rural_pop_cap) ?
                  randomNumber(config.defines.economy.rural_pop_cap[0], config.defines.economy.rural_pop_cap[1]) :
                  randomNumber(120000, 140000);

              //Calculate rural pop growth for all pops
              for (var x = 0; x < all_pops.length; x++) {
                var local_pop_growth =
                  Math.ceil(owned_provinces[i].pops[all_pops[x]]*usr.pops[`${all_pops[x]}_growth_modifier`]*usr.modifiers.pop_growth_modifier) - owned_provinces[i].pops[all_pops[x]];

                if (owned_provinces[i].pops.population < owned_provinces[i].pop_cap) {
                  usr.pops[all_pops[x]] += local_pop_growth;
                  usr.population += local_pop_growth;
                  owned_provinces[i].pops[all_pops[x]] += local_pop_growth;
                  owned_provinces[i].pops.population += local_pop_growth;
                }
              }
            }
      }

      //Population modifiers
      {
        for (var i = 0; i < all_pops.length; i++) {
          var local_pop = config.pops[all_pops[i]];
          var modifier_scope = {};

          //Remove previous modifiers!
          if (usr.pops[`${all_pops[i]}_cached_modifiers`]) {
            var local_modifier_scope = usr.pops[`${all_pops[i]}_cached_modifiers`];
            var all_previous_modifiers = Object.keys(local_modifier_scope);

            for (var x = 0; x < all_previous_modifiers.length; x++)
              if (usr.modifiers[all_previous_modifiers[x]])
                local_modifier_scope[all_previous_modifiers[x]] =
                  local_modifier_scope[all_previous_modifiers[x]]*-1;
              else
                //Delete to make sure resources and other thingies don't get applied twice!
                delete local_modifier_scope[all_previous_modifiers[x]];

            applyModifiers(actual_id, local_modifier_scope);

            delete usr.pops[`${all_pops[i]}_cached_modifiers`];
          }

          if (local_pop.per_100k) {
            //Add to modifier_scope
            var all_pop_modifiers = Object.keys(local_pop.per_100k);

            for (var x = 0; x < all_pop_modifiers.length; x++)
              modifier_scope[all_pop_modifiers[x]] = (modifier_scope[all_pop_modifiers[x]]) ?
                modifier_scope[all_pop_modifiers[x]] + local_pop.per_100k[all_pop_modifiers[x]]*(usr.pops[all_pops[i]]/100000) :
                local_pop.per_100k[all_pop_modifiers[x]]*(usr.pops[all_pops[i]]/100000);
          }

          if (local_pop.max_modifier_limit) {
            var all_pop_modifiers = Object.keys(local_pop.max_modifier_limit);

            for (var x = 0; x < all_pop_modifiers.length; x++)
              modifier_scope[all_pop_modifiers[x]] =
                Math.min(modifier_scope[all_pop_modifiers[x]], local_pop.max_modifier_limit[all_pop_modifiers[x]]);
          }

          usr.pops[`${all_pops[i]}_cached_modifiers`] = modifier_scope;

          //Apply modifiers
          applyModifiers(actual_id, modifier_scope);
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Pop processing!`);

    console.time(`Resources and RGO processing!`);
    //Resources and RGO
    {
      //Reset all good modifiers first so that local RGO buffs from cities can be applied
      for (var i = 0; i < all_good_names.length; i++)
        usr.modifiers[`${all_good_names[i]}_gain`] = 1;

      for (var i = 0; i < all_cities.length; i++) {
        //Clear city modifiers
        delete all_cities[i].bombed_this_turn;

        usr.modifiers[`${all_cities[i].resource}_gain`] += getCityRGOThroughput(all_cities[i]);
      }
    }
    console.timeEnd(`Resources and RGO processing!`);

    console.time(`Tech processing!`);
    //Technology
    try {
      var emptied_research_slots = 0;

      //Research processing
      {
        //Only process techs if it is a simulation
        if (!options.is_simulation) {
          var knowledge_investment = (usr.researching.length != 1) ?
            config.defines.technology.max_knowledge_investment*usr.modifiers.knowledge_investment_limit :
            1;
          var research_removal_array = [];
          var total_knowledge_gain = getKnowledgeGain(actual_id, all_production.knowledge);
            total_knowledge_gain = randomNumber(total_knowledge_gain[0], total_knowledge_gain[1]);

          for (var i = usr.researching.length - 1; i >= 0; i--) {
            var local_knowledge_gain = Math.floor(total_knowledge_gain/usr.researching.length);
            var max_knowledge_investment = (local_knowledge_gain > usr.researching[i].current_investment) ?
              usr.researching[i].current_investment*knowledge_investment :
              local_knowledge_gain;

            var max_knowledge_investment = (max_knowledge_investment > usr.researching[i].current_investment) ?
              usr.researching[i].current_investment*knowledge_investment :
              Math.floor(total_knowledge_gain/usr.researching.length);

            //Check if tech has finished researching
            if (usr.researching[i].total_research_cost <= usr.researching[i].current_investment + max_knowledge_investment) {
              var local_tech_obj = getTechnology(usr.researching[i].technology);

              //Make sure that tech is not already researched
              if (!usr.researched_technologies.includes(usr.researching[i].technology)) {
                //Technology effect
                usr.researched_technologies.push(usr.researching[i].technology);

                //Parse technology effects
                parseTechnology(actual_id, usr.researching[i].technology);
              }

              //Set highest_tier tracking variable if tech cost exceeds previous highest_tier
              usr.highest_tier = (returnSafeNumber(local_tech_obj.research_cost) > usr.highest_tier) ?
                local_tech_obj.research_cost :
                usr.highest_tier;

              //Empty research slots
              emptied_research_slots++;
              usr.researching.splice(i, 1);
            } else {
              usr.researching[i].current_investment += Math.round(max_knowledge_investment);
            }
          }
        }
      }

      //Research queue processing
      {
        var research_queue_removal_array = [];

        for (var i = 0; i < emptied_research_slots; i++)
          if (!usr.researched_technologies.includes(usr.research_queue[i])) {
            try {
              //Attempt to research everything in queue
              var research_status = research(user_id, usr.research_queue[i], true, true);

              //If research command went through, remove it from the queue
              if (research_status)
                research_queue_removal_array.push(usr.research_queue[i]);
            } catch (e) {
              console.log(e);
            }
          } else {
            research_queue_removal_array.push(usr.research_queue[i]);
          }

        //Remove research_queue_removal_array from research_queue
        for (var i = 0; i < research_queue_removal_array.length; i++)
          removeElement(usr.research_queue, research_queue_removal_array[i]);
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Tech processing!`);

    console.time(`Trade processing!`);
    //Trade
    try {
      //Autotrade processing
      var all_auto_trades = Object.keys(usr.auto_trades);

      for (var i = 0; i < all_auto_trades.length; i++) {
        var local_auto_trade = usr.auto_trades[all_auto_trades[i]];

        //Initiate local shipment to user per turn
        give(
          local_auto_trade.exporter,
          local_auto_trade.target,

          local_auto_trade.amount,
          local_auto_trade.good_type,
          { hide_display: true }
        );
      }

      //Conventional trade processing
      var all_exports = Object.keys(usr.trades);

      for (var i = 0; i < all_exports.length; i++) {
        var local_export = usr.trades[all_exports[i]];

        local_export.duration--;

        //Finish export if no time is left remaining
        if (local_export.duration <= 0) {
          var target_user = main.users[local_export.target];

          //Transfer goods to target
          if (getGood(local_export.good_type))
            target_user.inventory[local_export.good_type] += local_export.amount;
          if (local_export.good_type == "money")
            target_user.money += local_export.amount;

          //Remove local_export
          delete usr.trades[all_exports[i]];
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Trade processing!`);

    console.time(`War exhaustion processing!`);
    //War Exhaustion
    try {
      //Blockades
      if (isBlockaded(actual_id))
        if (usr.blockaded.blockaded_war_exhaustion + config.defines.combat.war_exhaustion_blockade_rate < config.defines.combat.war_exhaustion_blockade_limit) {
          var local_war_exhaustion_rate = (config.defines.combat.war_exhaustion_blockade_limit - usr.blockaded.blockaded_war_exhaustion < config.defines.combat.war_exhaustion_blockade_rate) ?
            config.defines.combat.war_exhaustion_blockade_limit - usr.blockaded.blockaded_war_exhaustion :
            config.defines.combat.war_exhaustion_blockade_rate;

          usr.blockaded.blockaded_war_exhaustion += returnSafeNumber(local_war_exhaustion_rate);
          usr.modifiers.war_exhaustion += returnSafeNumber(local_war_exhaustion_rate);
        }

      //Mobilisation
      if (usr.mobilisation.is_mobilised) {
        usr.modifiers.war_exhaustion += config.defines.combat.war_exhaustion_mobilisation_rate;

        if (!is_being_justified_on && all_enemies.length == 0)
          usr.modifiers.infamy += config.defines.peacetime_mobilisation_penalty;
      }

      //Occupation
      var occupied_provinces = owned_provinces.length - controlled_provinces.length;

      //A full siege of the target user ticks up warscore by 10% per turn
      usr.modifiers.war_exhaustion += parseFloat(((occupied_provinces/owned_provinces.length)*0.1).toFixed(2));
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`War exhaustion processing!`);

    console.time(`Modifier cap processing!`);
    //Modifier cap handlers - KEEP AT BOTTOM!
    {
      usr.modifiers.infamy = Math.min(Math.max(usr.modifiers.infamy, 0), 1);
      usr.modifiers.war_exhaustion = Math.min(Math.max(usr.modifiers.war_exhaustion, 0), 1);

      balanceParties(actual_id);
    }
    console.timeEnd(`Modifier cap processing!`);

    console.time(`Simulation processing!`);
    //Simulation handler
    try {
      if (options.is_simulation) {
        var simulated_results = JSON.parse(JSON.stringify(usr));

        //Restore presimulation state
        delete main.users[actual_id];
        delete main.global.user_map[user_id];

        //Return statement
        return simulated_results;
      }
    } catch (e) {
      console.log(e);
    }
    console.timeEnd(`Simulation processing!`);
  }
}
