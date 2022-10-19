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
    var army_obj = getArmy(actual_id, army_name);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if army_obj could be found
    if (army_obj) {
      var aeroplane_count = 0;
      var all_units = Object.keys(army_obj.units);
      var army_icon = "";
      var army_power = calculateArmyStats(actual_id, army_obj.name);
      var army_stats = calculateArmyType(actual_id, army_obj.name);
      var army_string = [];
      var carrier_capacity_string = "";
      var current_status = "";
      var pure_airplanes = true;
      var pure_submarines = true;
      var province_obj = main.provinces[army_obj.province];

      //Calculate tracker variables
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

      //Format current_status
      if (army_stats.carrier_capacity > 0)
        carrier_capacity_string = `(Carrier Capacity: **${parseNumber(aeroplane_count)}**/**${parseNumber(army_stats.carrier_capacity)}**) `;

      //Army status
      if (army_obj.moving_to.length > 0) {
        current_status = `Currently moving to Province **${army_obj.moving_to[army_obj.moving_to.length - 1]}**.`;
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
        current_status += ` Taking attrition at a rate of ${config.icons.death} **${printPercentage(usr.modifiers.attrition_rate*config.defines.combat.base_attrition_rate)}**!`;

      //Blockade cooldowns
      if (returnSafeNumber(army_obj.blockade_recovery_turns) > 0)
        current_status += ` Currently recovering from a blockade, will be combat ready in **${parseNumber(army_obj.blockade_recovery_turns)}** turn(s).`;

      //Submarine cooldowns
      if (returnSafeNumber(army_obj.submarine_cooldown) > 0)
        current_status += ` - Currently on cooldown, will be combat ready in **${parseNumber(army_obj.submarine_cooldown)}** turn(s).`;

      //Format army_string
      army_string.push(`${carrier_capacity_string}${current_status}`);

      //Display modifiers
      if (army_obj.carrier_capacity > 0)
        army_string.push(`${config.icons.aeroplanes} **Aeroplanes** receive a **${printPercentage(config.defines.combat.seaplane_bonus, { base_zero: true, display_prefix: true })}** attack bonus whilst at sea.`);

      //Push buttons
      army_string.push(`**[Rename Army]** | **[Deploy Units]** | ${(all_units.length > 0) ? "**[Relieve Units]** | **[Reorder Units]** | **[Transfer Units]** |" : ""} **[Delete Army]**`);

      if (army_obj.type == "army") {
        army_string.push(`**[Merge Army]** | **[Move]**`);
      } else if (army_obj.type == "navy") { //[WIP] - Work on blockades first, then come back later
        var submarine_string = (army_power.pure_submarines) ?
          ` | **[Convoy Raid]** | **[Harbour Raid]** | **[Torpedo Fleet]**` :
          "";
        (!army_obj.is_blockading) ?
          army_string.push(`**[Blockade]** | **[Challenge Blockade]** ${submarine_string}`) :
          army_string.push(`**[Lift Blockade]** ${submarine_string}`)
      } else if (army_obj.type == "air") {
        army_string.push(`**[Merge Army]** | **[Move]** | **[Air Raid]**`);
      }

      //Display additional statistics
      army_string.push(`${config.icons.manpower} Army Size: ${parseNumber(Math.ceil((getArmySize(actual_id, army_obj.name)/1000)*100)/100)}`);
      army_string.push(`${config.icons.provinces} Current Province: **${army_obj.province}** (${config.icons.railways} Supply Limit: **${parseNumber(Math.ceil(getTroopsInProvince(army_obj.province)/1000))}/${parseNumber(returnSafeNumber(province_obj.supply_limit, config.defines.combat.base_supply_limit))}**)`);
      army_string.push("");

      army_string.push(`**Army Strength:**`);
      army_string.push("");
      army_string.push(`- ${config.icons.attacker} Attack: ${parseNumber(army_power.attack)}`);
      army_string.push(`- ${config.icons.defender} Defence: ${parseNumber(army_power.defence)}`);
      army_string.push("");
      army_string.push(config.localisation.divider);

      //Print units
      army_string.push("");
      army_string.push(`**Order of Battle:**`);
      army_string.push("");

      for (var i = 0; i < all_units.length; i++) {
        var cache_icon = getUnitCategoryFromUnit(all_units[i]).icon;

        var local_icon = (config.icons[cache_icon]) ?
          config.icons[cache_icon] + " " :
          ""
        var unit_obj = getUnit(all_units[i]);

        army_string.push(`${local_icon}${(unit_obj.name) ? unit_obj.name : all_units[i]}: ${parseNumber(army_obj.units[all_units[i]])}`);
      }

      if (all_units.length == 0) {
        army_string.push(`_No units found._`);
        army_string.push("");
        army_string.push(`Type **[Deploy Units]** to transfer some over from your reserves.`);
      }

      //Return statement
      return splitEmbed(army_string, {
        title: `[Back] | [Jump To Page] | ${army_icon} ${army_obj.name}, ${usr.name}:`,
        title_pages: true,
        fixed_width: true
      });
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
    var all_armies = Object.keys(
      Object.fromEntries(
        Object.entries(usr.armies).sort(function (a, b) {
            return (a[1].name.toLowerCase() <  b[1].name.toLowerCase()) ? -1 :
              (a[1].name.toLowerCase() > b[1].name.toLowerCase()) ? 1 : 0;
            }
          )
        )
      );
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
    }

    //Default message if no armies can be found
    if (all_armies.length == 0) {
      armies_string.push("");
      armies_string.push(`_You currently have no armies in active service._`);
      armies_string.push("");
      armies_string.push(`Type **[Create Army]** to start building a military! Make sure you have troops in your reserves, though.`);
    }

    //Return statement
    return splitEmbed(armies_string, {
      title: "[Back] | [Jump To Page] | Army List:",
      title_pages: true,
      fixed_width: true,

      description: [
        `**[Create Army]** | **[Delete Army]** | **[Merge Army]** | **[Rename Army]** | **[View Army]**`,
        `- **[Deploy Units]** | **[Transfer Units]** | **[Relieve Units]** | **[Reorder Units]**`,
        ``,
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
    var player_units = getUnits(actual_id);
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
