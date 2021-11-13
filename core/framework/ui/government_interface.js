module.exports = {
  printGovernmentList: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var anarchy_name = getGovernment({ return_anarchy: true, return_key: true });
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise government_string
    var government_string = [];

    //Format embed
    government_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    government_string.push("");
    government_string.push("Note: Only governments currently available to you are being shown.");
    government_string.push(`${(usr.government == anarchy_name) ? "**[Set Government]**" : "**[Coup]**"}`);
    government_string.push("");
    government_string.push(config.localisation.divider);
    government_string.push("");

    //Iterate over all available governments for user
    for (var i = 0; i < usr.available_governments.length; i++) {
      var government_name = getGovernment(usr.available_governments[i], { return_key: true });
      var government_obj = getGovernment(usr.available_governments[i]);

      government_string.push(`${(government_obj.icon) ? config.icons[government_obj.icon] + " " : ""} ¦ **${(government_obj.name) ? government_obj.name : government_name}** ¦ ${(government_obj.description) ? government_obj.description : ""}`);
      government_string.push("");

      //Parse all effects
      var all_effects = Object.keys(government_obj.effect);

      for (var x = 0; x < all_effects.length; x++) {
        var local_value = government_obj.effect[all_effects[x]];

        switch (all_effects[x]) {
          case "can_justify_wars":
            government_string.push(`- Capability to declare wars: ${parseBoolean(local_value)}`);

            break;
          case "has_elections":
            government_string.push(`- Has Elections: ${parseBoolean(local_value)}`);

            break;

          //Other keys that belong towards the bottom
          case "civilian_actions":
            government_string.push(`- Civilian Actions: ${parsePercentage(local_value)}`);

            break;
          case "famine_penalty":
            government_string.push(`- Famine Penalty: ${parsePercentage(famine_penalty)}`);

            break;
          case "maximum_manpower":
            government_string.push(`- Maximum Manpower: ${parsePercentage(local_value)}`);

            break;
          case "maximum_tax_rate":
            government_string.push(`- Maximum Tax Rate: ${parsePercentage(local_value)}`);

            break;
          case "reform_desire_gain":
            government_string.push(`- Reform Desire Gain: ${parsePercentage(local_value)}`);

            break;
          case "stability_modifier":
            if (government_obj.effect.add_expiry_effect)
              if (
                government_obj.effect.add_expiry_effect.limit.year_is_less_than ||
                government_obj.effect.add_expiry_effect.limit.year ||
                government_obj.effect.add_expiry_effect.limit.year_is_greater_than
              )
                if (government_obj.effect.add_expiry_effect.stability_modifier)
                  government_string.push(`- Stability Modifier: ${parsePercentage(government_obj.effect.add_expiry_effect.stability_modifier, { display_prefix: true })} ${(government_obj.effect.add_expiry_effect.limit.year_is_less_than) ? " before " + government_obj.effect.add_expiry_effect.limit.year_is_less_than : (government_obj.effect.add_expiry_effect.limit.year) ? " when " + government_obj.effect.add_expiry_effect.limit.year : " after " + government_obj.effect.add_expiry_effect.limit.year_is_greater_than }`)
            government_string.push(`- Stability Modifier: ${parsePercentage(local_value)}`);

            break;
        }
      }
    }

    //Return statement
    return splitEmbed(government_string, {
      title: `**Government List:**`,
      title_pages: true,
      fixed_width: true
    });
  }
};
