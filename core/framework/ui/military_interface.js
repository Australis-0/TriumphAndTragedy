module.exports = {
  printMilitary: function (arg0_user) { //[WIP] - Code bulk of function, add status viewer, print army orders on a second page
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.users[user_id];
    var all_enemies = getEnemies(actual_id);
    var all_wars = Object.keys(main.global.wars);
    var at_war = atWar(actual_id);
    var attacking_wars = 0;
    var defending_wars = 0;
    var enemies = [];
    var game_obj = getGameObject(user_id);
    var military_strength = getMilitaryStrength(actual_id);
    var military_string = [];
    var occupied_provinces = getProvinces(actual_id, { include_hostile_occupations: true }).length - getProvinces(actual_id).length;
    var reserves_strength = getReserveStrength(actual_id);
    var total_troop_count_status = [];
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Compile army report
    var army_orders = {};
    var army_types = {
      air: 0,
      army: 0,
      empty: 0,
      navy: 0
    };

    //Begin compiling a proper list
    for (var i = 0; i < all_armies.length; i++) {
      var local_army = usr.armies[all_armies[i]];

      army_orders[local_army.status] = (army_orders[local_army.status]) ?
        army_orders[local_army.status] + 1 :
        army_orders[local_army.status];
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

    //Format enemies
    for (var i = 0; i < all_enemies.length; i++)
      enemies.push(`**${main.users[all_enemies[i]].name}**`);

    //Format total troop count
    var mobilised_string = [];

    if (usr.mobilisation.is_mobilised) {
      var all_mobilised_pops = Object.keys(usr.mobilisation.mobilised_pops);

      for (var i = 0; i < all_mobilised_pops.length; i++) {
        var local_pop = config.pops[all_mobilised_pops[i]];
        var local_value = usr.mobilisation.mobilised_pops[all_mobilised_pops[i]];

        if (local_value > 0)
          mobilised_string.push(`${(local_pop.icon) ? config.icons[local_pop.icon] + " " : ""}**${parseNumber(local_value)}** mobilised ${((local_pop.name) ? local_pop.name : all_mobilised_pops[i]).toLowerCase()}`);
      }
    }

    total_troop_count_status.push(`${config.icons.soldiers} ${parseNumber(getTotalActiveDuty(actual_id))} soldiers${(mobilised_string.length > 0) ? `, ${parseList(mobilised_string)}` : ""}.`);

    //Format description
    var military_hq_description = [];

    if (at_war) {
      military_hq_description.push(`${config.icons.cb} We are currently involved in a **state of war** with **${parseNumber(enemies.length)}** countries, including ${parseList(enemies)}.`);
      military_hq_description.push(`This entails a grand total of **${parseNumber(attacking_wars + defending_wars)}** wars, **${parseNumber(defending_wars)} defensive, and **${parseNumber(attacking_wars)} offensive.`);
      military_hq_description.push("");
    }

    //Print war exhaustion
    var war_exhaustion_rate = config.defines.combat.war_exhaustion_tickdown_rate;
    if (!at_war && !isBlockaded(actual_id))
      if (usr.mobilisation.is_mobilised)
        war_exhaustion_tickdown_rate -= config.defines.combat.war_exhaustion_mobilisation_rate;

    (usr.modifiers.war_exhaustion == 100 && at_war) ?
      military_hq_description.push(`${config.icons.retreat} We have hit **100%** War Exhaustion, and our enemies may now force us to come to an unconditional surrender!`) :
      military_hq_description.push(`${config.icons.infamy} War Exhaustion: **${printPercentage(usr.modifiers.war_exhaustion)}** ${(!at_war && !isBlockaded(actual_id)) ? `(${printPercentage(Math.abs(war_exhaustion_rate), { display_prefix: true })} per turn)` : ""}`);

    if (returnSafeNumber(usr.blockaded.blockaded_war_exhaustion) > 0)
      military_hq_description.push(`- ${printPercentage(usr.blockaded.blockaded_war_exhaustion, { display_prefix: true })} War Exhaustion from the ongoing blockade.`);

    //Print infamy
    military_hq_description.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy)}** (${parseNumber(usr.modifiers.infamy_loss, { display_prefix: true })} per turn)`);

    //3 inline fields; total number of armies/navies/air wings and AP/DP - military and civilian casualties over the last 10 turns - list of options
		//1st Field - Total number of Armies/Navies/Air Wings, as well as AP/DP
    var military_status_array = [];

    if (all_armies.length > 0) {
      military_status_array.push(`We have **${parseNumber(all_armies.length)}** military units currently in the field. Of these:`);
      military_status_array.push(`- **${parseNumber(army_types.army)}** are land armies,`);
      military_status_array.push(`- **${parseNumber(army_types.navy)}** are navies,`);
      military_status_array.push(`- and **${parseNumber(army_types.air)}** are air wings.`);

      if (army_types.empty > 0)
        military_status_array.push(`\nThe rest, some **${parseNumber(army_types.empty)}** armies, are currently sitting empty.`);

      military_status_array.push("");
      military_status_array.push(`We currently have **${parseNumber(military_strength.attack)}** Attack and **${parseNumber(military_strength.defence)}** Defence deployed in the field.`);
      military_status_array.push(`The rest, some **${parseNumber(returnSafeNumber(reserves_strength.attack))}** Attack and **${parseNumber(returnSafeNumber(reserves_strength.defence))}** Defence are currently in our reserves.`);
      military_status_array.push(`---`);
      military_status_array.push(`This makes for a combined grand total of ${parseNumber(military_strength.attack + returnSafeNumber(reserves_strength.attack))} Attack and ${parseNumber(military_strength.defence + returnSafeNumber(reserves_strength.defence))} Defence, for a total army strength of ${total_troop_count_status.join("\n")}.`);

      military_status_array.push("");
      military_status_array.push(`- Type **[Army List]** to view a complete list of all your armies.`);
    } else {
      military_status_array.push(`_We currently have no armies in active service._`);
    }

    //2nd Field - Casualties counter
    var military_civilian_casualties = [],
      total_civilian_casualties = 0,
      total_military_casualties = 0;

    for (var i = 0; i < usr.recent_civilian_casualties.length; i++)
      total_civilian_casualties += usr.recent_civilian_casualties[i];
    for (var i = 0; i < usr.recent_military_casualties.length; i++)
      total_military_casualties += usr.recent_military_casualties[i];

    military_civilian_casualties.push(`Casualties measured in total taken by attrition, combat, and other causes per turn.`);
    military_civilian_casualties.push("");

    military_civilian_casualties.push(`**Military:**`);
    military_civilian_casualties.push(`---`);

    if (total_military_casualties > 0) {
      for (var i = 0; i < usr.recent_military_casualties.length; i++)
        military_civilian_casualties.push(parseNumber(usr.recent_military_casualties[i]));
      military_civilian_casualties.push(`${config.icons.death} Total Military Casualties: **${parseNumber(total_military_casualties)}**`);
    } else {
      military_civilian_casualties.push(`_We have incurred no military casualties as of late._`);
    }
    military_civilian_casualties.push("");

    military_civilian_casualties.push(`**Civilian:**`);
    military_civilian_casualties.push(`---`);

    if (total_military_casualties > 0) {
      for (var i = 0; i < usr.recent_civilian_casualties.length; i++)
        military_civilian_casualties.push(parseNumber(usr.recent_civilian_casualties[i]));
      military_civilian_casualties.push(`${config.icons.death} Total Civilian Casualties: **${parseNumber(total_civilian_casualties)}**`);
    } else {
      military_civilian_casualties.push(`_We have incurred no civilian casualties as of late._`);
    }

    //3rd Field - List of options
    var options_array = [];
    var reference_string = {
      "always": "Always",
      "if possible": "If Possible",
      "never": "Never",

      true: "Yes",
      false: "No"
    };

    
  }
};
