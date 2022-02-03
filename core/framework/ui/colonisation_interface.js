module.exports = {
  printColonisation: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_unit_names = getAllUnits({ return_names: true });
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var all_expeditions = Object.keys(usr.expeditions);
    var capital_id = getCapital(actual_id);
    var game_obj = getGameObject(user_id);
    var provinces_can_colonise = 0;
    var total_colonial_units = 0;

    //Declare colonisation_string
    var colonisation_string = [];

    //Format embed
    colonisation_string.push(`${config.icons.provinces} **Capital Province:** ${(capital_id) ? capital_id.id : "_No capital set._"}`);
    colonisation_string.push(`${config.icons.colonisation} **Maximum Expedition Limit:** ${parseNumber(usr.modifiers.maximum_expeditions)}`);
    colonisation_string.push(`${config.icons.taxes} **Colonisation Speed:** Your colonists can move at a rate of **${parseNumber(getColonisationSpeed(actual_id))}** province(s) per turn.`);

    colonisation_string.push(config.localisation.divider);
    colonisation_string.push(`**Available Colonial Units:**`);
    colonisation_string.push("");

    //Calculate colonist unit tracker statistics
    for (var i = 0; i < all_unit_names.length; i++) {
      var local_unit = getUnit(all_unit_names[i]);

      //The local unit is a colonial unit if it can colonise provinces
      if (local_unit.colonise_provinces) {
        provinces_can_colonise += returnSafeNumber(usr.reserves[all_unit_names[i]]*local_unit.colonise_provinces);
        total_colonial_units += returnSafeNumber(usr.reserves[all_unit_names[i]]);
      }
    }

    if (provinces_can_colonise == 0) {
      colonisation_string.push(`_You don't have any units capable of colonising!_`);
    } else {
      colonisation_string.push(`You have **${parseNumber(total_colonial_units)}** total units capable of colonising **${parseNumber(provinces_can_colonise)}** province(s).`);
      colonisation_string.push("");
      colonisation_string.push(`**[Reserves]** ¦ **[Settle]** ¦ **[Train Units]**`);
    }

    //Print out ongoing expeditions tab
    colonisation_string.push(config.localisation.divider);
    colonisation_string.push(`**Expeditions:**`);
    colonisation_string.push("");

    if (all_expeditions.length == 0) {
      colonisation_string.push(`_You have no ongoing expeditions._`);
    } else {
      for (var i = 0; i < all_expeditions.length; i++) {
        var local_expedition = usr.expeditions[all_expeditions[i]];
        var local_expedition_unit = getUnit(local_expedition.unit_type);
        var local_expedition_unit_name = (local_expedition_unit.name) ? local_expedition_unit.name.toLowerCase() : local_expedition.unit_type;

        colonisation_string.push(`${config.icons.old_map} Charter #${parseNumber(local_expedition.id)} - **${local_expedition.provinces}**:`);
        (local_expedition.duration > config.defines.colonisation.base_colonisation_turns) ?
          colonisation_string.push(` - The **${local_expedition_unit_name}** will arrive in **${parseNumber(local_expedition.duration - config.defines.colonisation.base_colonisation_turns)}** turn(s). **[Cancel Charter #${local_expedition.id}]**`) :
          colonisation_string.push(` - The **${local_expedition_unit_name}** have arrived! They have begun setting and your advisor estimates that it will take them **${parseNumber(local_expedition.duration)}** more turn(s).`);

        //What provinces do these people want to colonise?
        colonisation_string.push(` - They hope to colonise the province(s) of **${local_expedition.provinces.join(", ")}**.`);
      }
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Edit main embed display
    createPageMenu(game_obj.middle_embed, {
      embed_pages: splitEmbed(colonisation_string, {
        title: "[Back] ¦ [Jump To Page] ¦ Colonisation:",
        title_pages: true,
        fixed_width: true
      }),
      user: game_obj.user
    });
  }
};
