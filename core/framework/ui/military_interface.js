module.exports = {
  printMilitary: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
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
    var mobilisation_unit = (usr.mobilisation.mobilised_type) ?
      getUnit(usr.mobilisation.mobilised_type) :
      getUnit(usr.mobilisation.unit_type);

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
        1;
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
          mobilised_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}**${parseNumber(local_value)}** mobilised ${((local_pop.name) ? local_pop.name : all_mobilised_pops[i]).toLowerCase()}`);
      }
    }

    total_troop_count_status.push(`${config.icons.soldiers} ${parseNumber(getTotalActiveDuty(actual_id))} soldiers${(mobilised_string.length > 0) ? `, ${parseList(mobilised_string)}` : ""}.`);

    //Format description
    var military_hq_description = [];

    if (at_war) {
      military_hq_description.push(`${config.icons.cb} We are currently involved in a **state of war** with **${parseNumber(enemies.length)}** countries, including ${parseList(enemies)}.`);
      military_hq_description.push(`This entails a grand total of **${parseNumber(attacking_wars + defending_wars)}** wars, **${parseNumber(defending_wars)}** defensive, and **${parseNumber(attacking_wars)}** offensive.`);
      military_hq_description.push("");
    }

    //Print war exhaustion
    var war_exhaustion_rate = config.defines.combat.war_exhaustion_tickdown_rate;
    if (!at_war && !isBlockaded(actual_id))
      if (usr.mobilisation.is_mobilised)
        war_exhaustion_rate -= config.defines.combat.war_exhaustion_mobilisation_rate;

    (usr.modifiers.war_exhaustion == 100 && at_war) ?
      military_hq_description.push(`${config.icons.retreat} We have hit **100%** War Exhaustion, and our enemies may now force us to come to an unconditional surrender!`) :
      military_hq_description.push(`${config.icons.infamy} War Exhaustion: **${printPercentage(usr.modifiers.war_exhaustion)}** ${(!at_war && !isBlockaded(actual_id)) ? `(${printPercentage(Math.abs(war_exhaustion_rate), { display_prefix: true })} per turn)` : ""}`);

    if (returnSafeNumber(usr.blockaded.blockaded_war_exhaustion) > 0)
      military_hq_description.push(`- **${printPercentage(usr.blockaded.blockaded_war_exhaustion, { display_prefix: true })}** War Exhaustion from the ongoing blockade.`);

    //Print infamy
    military_hq_description.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy, { display_float: true })}** (${parseNumber(usr.modifiers.infamy_loss, { display_float: true, display_prefix: true })} per turn)`);

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
      military_status_array.push(`This makes for a combined grand total of ${parseNumber(military_strength.attack + returnSafeNumber(reserves_strength.attack))} Attack and ${parseNumber(military_strength.defence + returnSafeNumber(reserves_strength.defence))} Defence, for a total army strength of ${total_troop_count_status.join("\n")}`);
    } else {
      military_status_array.push(`_We currently have no armies in active service._`);
    }

    military_status_array.push("");

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

    //3rd Field - Overview commands
    var military_overview_commands = [];

    military_overview_commands.push(`- Type **[Army List]** to view a complete list of all your armies.`);
    military_overview_commands.push(`- Type **[Train Units]** to recruit more units into your army.`);
    military_overview_commands.push(`- Type **[Unit Ledger]** to view a ledger of all your units, active or reserved.`);
    military_overview_commands.push(`- Type **[Unit List]** to view a full list of units available for recruitment.`);
    military_overview_commands.push(`- Type **[View Reserves]** to view what units you have in your reserves.`);

    //4th Field - List of options
    var options_array = [];
    var reference_string = {
      "always": "Always",
      "if possible": "If Possible",
      "never": "Never",

      true: "Yes",
      false: "No"
    };

    options_array.push(`We currently have our policy on **[Attrition Avoidance]** set to **${reference_string[usr.options.avoid_attrition]}**.`);
    if (usr.options.avoid_attrition == "always") {
      options_array.push("Our troops will always avoid attrition, and will refuse to move if ordered into a province that will result in deaths from attrition.");
		} else if (usr.options.avoid_attrition == "if possible") {
			options_array.push("Our troops will attempt to avoid attrition whenever possible, but will move into zones of attrition if strictly necessary.");
		} else {
			options_array.push("Our troops will always take the shortest route to a target province, regardless of attrition.");
		}

    options_array.push(`We currently have our policy on **[Territorial Violation]** set to **${reference_string[usr.options.avoid_territorial_violation]}**.`);
    if (usr.options.avoid_territorial_violation == "always") {
			options_array.push("Our troops will always avoid violating the sovereign territory of other countries, and will automatically refuse to move if ordered to pass through one.");
		} else if (usr.options.avoid_territorial_violation == "if possible") {
			options_array.push("Our troops will avoid violating the territory of other countries whenever possible, but may pass through them unprovoked if no alternative routes can be found.");
		} else {
			options_array.push("Our soldiers will march straight from point A to point B, regardless of any country standing in their paths!");
		}

    options_array.push(`We currently have our policy on **[Ignore Orders When Carpet Sieging]** set to **${reference_string[usr.options.ignore_orders]}**.`);
    if (usr.options.ignore_orders) {
			options_array.push("Orders given out by you to carpet siege will always override existing orders of armies if no available armies can be found.");
		} else {
			options_array.push("Only armies without orders or currently stationed will be requistioned for carpet sieging when ordered to.");
		}

    //1 non-inline field, list of QOL commands
    var army_creation_array = [];
    var army_management_array = [];
    var command_list_array = [];
    var global_orders_array = [];
    var mobilisation_array = [];

    command_list_array.push(`Military organisation commands act as power commands allowing you to quickly manage, equip, and deploy your armies, thereby reducing the need for micromanagement, and giving additional tools to players.`);
    command_list_array.push("");
    command_list_array.push(`---`);

    global_orders_array.push(`- **[Carpet Siege]** - Order your troops to siege down an entire nation.`);
    global_orders_array.push(`- **[Garrison Cities]** - Guard all the cities within your country.`);
    global_orders_array.push(`- **[Garrison Provinces]** - Guard all the provinces within your country.`);
    global_orders_array.push(`- **[Delete All Armies]** - Delete all your armies and return all troops and materiel to your reserves.`);
    global_orders_array.push(`- **[Move All]** - Moves all your armies into a single province.`);

    army_creation_array.push(`- **[Create Armies]** - Create multiple armies.`);
    army_creation_array.push(`- **[Delete Armies]** - Delete multiple armies.`);
    army_creation_array.push(`- **[Merge Armies]** - Power-merges several armies into an existing one.`);
    army_creation_array.push(`- **[Rename Armies]** - Renames multiple armies.`);
    army_creation_array.push(`- **[Split Armies]** - Splits off multiple armies from an existing one.`);

    army_management_array.push(`- **[Mass Deploy]** - For deploying troops to armies en masse.`);
    army_management_array.push(`- **[Mass Relieve]** - Relieves units from several armies, putting them back in reserves.`);
    army_management_array.push(`- **[Mass Reorder]** - Reorders units in multiple armies.`);
    army_management_array.push(`- **[Move Armies]** - Moves several armies to a single province.`);

    mobilisation_array.push(`---`);

    if (usr.modifiers.enable_mobilisation && mobilisation_unit)
      if (!usr.mobilisation.is_mobilised)
        if (main.round_count - returnSafeNumber(usr.mobilisation.last_mobilised) > config.defines.combat.mobilisation_cooldown) {
          var available_manpower = getMobilisationPops(user_id).population;
          var unit_obj = getUnit(usr.mobilisation.unit_type);

          (available_manpower > 0) ?
            mobilisation_array.push(`You can mobilise! Type **[Mobilise]** in order to call upon your people to take up arms.\n**${parseNumber(available_manpower)}** ${(unit_obj.name) ? unit_obj.name : usr.mobilisation.unit_name} will be placed in your reserves.`) :
            mobilisation_array.push(`Due to critical manpower shortages on the civilian front, mobilisation isn't available. Try freeing up more workers first!`);
        } else
          mobilisation_array.push(`Your people have demobilised too recently to be willing to be called up for war again. Wait for **${parseNumber(config.defines.combat.mobilisation_cooldown - (main.round_count - returnSafeNumber(usr.mobilisation.last_mobilised)) + 1)}** more turn(s).`);
      else
        if (usr.mobilisation.current_manpower_mobilised < usr.mobilisation.total_manpower_mobilised)
          mobilisation_array.push(`You are currently mobilising, and your advisors estimate that mobilisation will be complete within **${parseNumber(usr.mobilisation.duration)}** turn(s). So far, **${parseNumber(usr.mobilisation.current_manpower_mobilised)}** men out of **${parseNumber(usr.mobilisation.total_manpower_mobilised)}** available reservists have been mobilised.\n\nYou are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`);
        else
          mobilisation_array.push(`You are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`);
    else
      mobilisation_array.push(`Military mobilisation is currently locked, as your people haven't heard of the concept yet.`);

    //2nd page, print out all army orders; sort by number of active orders
    var all_army_orders = Object.keys(army_orders);
    var army_orders_array = [];
    var sorted_army_orders = [];

    for (var i = 0; i < all_army_orders.length; i++)
      sorted_army_orders.push([army_orders[all_army_orders[i]], all_army_orders[i]]);

    //Sort array
    sorted_army_orders.sort((a, b) => b[0] - a[0]);

    //Format army_orders_array
    if (all_armies.length > 0) {
      army_orders_array.push(`We have **${parseNumber(all_armies.length)}** combat formations currently in the field. Of these:`);
      army_orders_array.push("");
    } else {
      army_orders_array.push(`_We don't have any armies in the field currently!_`);
      army_orders_array.push("");
      army_orders_array.push(`- Try creating a new army by typing **[Create Army]**.`);
    }

    for (var i = 0; i < sorted_army_orders.length; i++)
      (i != sorted_army_orders.length - 1 || sorted_army_orders.length == 1) ?
        army_orders_array.push(`- **${parseNumber(sorted_army_orders[i][0])}** are ${sorted_army_orders[i][1]},`) :
        army_orders_array.push(`- and **${parseNumber(sorted_army_orders[i][0])}** are ${sorted_army_orders[i][1]}.`);

    //Create embed object
    const embed_military_hq = new Discord.MessageEmbed()
			.setColor(settings.bot_colour)
			.setTitle(`Military:\n${config.localisation.divider}`)
			.setThumbnail(usr.flag)
			.setDescription(military_hq_description.join("\n"))
			.addFields(
				{ name: "**Military Statistics:**", value: military_status_array.join("\n"), inline: true },
				{ name: "**Recent Casualties:**", value: military_civilian_casualties.join("\n"), inline: true },
        { name: `**Military Overview:**`, value: military_overview_commands.join("\n") },
				{ name: "**Military Options:**", value: options_array.join("\n") },
				{ name: "**Mobilisation:**", value: mobilisation_array.join("\n") }
			)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    const embed_military_organisation = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`Military Organisation Commands:\n${config.localisation.divider}`)
      .setThumbnail(usr.flag)
      .setDescription(command_list_array.join("\n"))
      .addFields(
				{ name: "**Global Orders:**", value: global_orders_array.join("\n") },
				{ name: "**Army Creation:**", value: army_creation_array.join("\n") },
				{ name: "**Army Management:**", value: army_management_array.join("\n") }
      )
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    const embed_military_orders = new Discord.MessageEmbed()
			.setColor(settings.bot_colour)
			.setTitle(`Order Breakdown:\n${config.localisation.divider}`)
			.setThumbnail(usr.flag)
			.setDescription(army_orders_array.join("\n"))
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Edit main embed display
    createPageMenu(game_obj.middle_embed, {
      embed_pages: [embed_military_hq, embed_military_organisation, embed_military_orders],
      user: game_obj.user
    });

    //Return statement
    return [embed_military_hq, embed_military_orders];
  },

  printMilitaryHQ: function (arg0_user) { //[WIP] - Rename to printMilitary() eventually
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_embeds = [];
    var all_users = Object.keys(main.users);
    var army_orders = getArmyOrders(user_id);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

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
    var supply_string = [];

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
        war_description_string.push(`${config.icons.cb} We are currently involved in a **state of war** with **${parseNumber(enemies.length)}** countries, including ${parseList(enemy_display_list)}.`);
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
              mobilisation_array.push(`You can mobilise! Type **[Mobilise]** in order to call upon your people to take up arms.\n**${parseNumber(available_manpower)}** ${(unit_obj.name) ? unit_obj.name : usr.mobilisation.unit_name} will be placed in your reserves.`) :
              mobilisation_array.push(`Due to critical manpower shortages on the civilian front, mobilisation isn't available. Try freeing up more workers first!`);
          } else {
            mobilisation_array.push(`Your people have demobilised too recently to be willing to be called up for war again. Wait for **${parseNumber(config.defines.combat.mobilisation_cooldown - (main.round_count - returnSafeNumber(usr.mobilisation.last_mobilised)) + 1)}** more turn(s).`);
          }
        } else {
          (usr.mobilisation.current_manpower_mobilised < usr.mobilisation.total_manpower_mobilised) ?
            mobilisation_array.push(`You are currently mobilising, and your advisors estimate that mobilisation will be complete within **${parseNumber(usr.mobilisation.duration)}** turn(s). So far, **${parseNumber(usr.mobilisation.current_manpower_mobilised)}** men out of **${parseNumber(usr.mobilisation.total_manpower_mobilised)}** available reservists have been mobilised.\n\nYou are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`) :
            mobilisation_array.push(`You are currently mobilised. Type **[Demobilise]** in order to lay down your arms.`);
        }
      } else {
        mobilisation_array.push(`Military mobilisation is currently locked, as your people haven't heard of the concept yet.`);
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

    //Format Page 4 - Variable processing
    {
    }

    //Format Page 4 - UI
    {
      //Format Page 4 - UI - Battle Plans (+ Separate UI Window) [WIP]

      //Format Page 4 - UI - Order of Battle (+ Separate UI Window)
       var all_army_orders = Object.keys(army_orders);
       var sorted_army_orders = [];

       for (var i = 0; i < all_army_orders.length; i++)
        sorted_army_orders.push([army_orders[all_army_orders[i]].length, all_army_orders[i]]);

      //Sort array
      sorted_army_orders.sort((a, b) => b[0] - a[0]);

      //Format oob_string
      for (var i = 0; i < sorted_army_orders.length; i++)
        if (sorted_army_orders[i][1] == "blockading") {
          var display_blockaded_users = [];

          for (var x = 0; x < all_users.length; x++) {
            var local_user = main.users[all_users[x]];

            if (local_user.blockaded)
              if (local_user.blockaded.is_blockaded)
                for (var y = 0; y < local_user.blockaded.fleets.length; y++)
                  if (local_user.blockaded.fleets[y].id == actual_id)
                    display_blockaded_users.push(`**${local_user.name}**`);
          }

          oob_string.push(`- **${parseNumber(sorted_army_orders[i][0])}** fleets are currently blockading ${display_blockaded_users.join(", ")}`);
        } else {
          (i != sorted_army_orders.length - 1 || sorted_army_orders.length == 1) ?
            oob_string.push(`- **${parseNumber(sorted_army_orders[i][0])}** are ${sorted_army_orders[i][1]},`) :
            oob_string.push(`- and **${parseNumber(sorted_army_orders[i][0])}** are ${sorted_army_orders[i][1]}.`);
        }
    }

    //Format Page 5+ - UI - Summary
    //Format Page 5+ - UI - Supply by Military Branch
    //Format Page 5+ - UI - Supply Needs by Unit
    //Format Page 5+ - UI - Overall Supply Needs - (Deficit/Surplus)

    //Push to all_embeds

    //Select menu
  }
};
