module.exports = {
  /*
    parseLocalisation() - Returns the processed string of a bit of localisation.
    options: {
      scopes: {
        FROM: "actual_id",
        LOCAL: "actual_id",
        TO: "actual_id"
      }
    }
  */
  parseLocalisation: function (arg0_string, arg1_options) {
    //Convert from parameters
    var localisation_string = arg0_string;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_scopes = Object.keys(options.scopes);
    var all_localisation_matches = [];
    var all_localisation_keys = localisation_string.match(/\{(.*?)\}/g);

    try {
      if (all_localisation_keys) {
        //Process all_localisation_matches
        for (var i = 0; i < all_localisation_keys.length; i++) {
          var local_value = all_localisation_keys[i];
          var local_replacement = local_value.replace("{", "").replace("}", "");

          var processed_replacement = "";

          //Replace scopes
          local_replacement = local_replacement.replace(`GLOBAL`, `main.global`);
          local_replacement = local_replacement.replace(`LOCAL`, `options.scopes.LOCAL`);

          for (var x = 0; x < all_scopes.length; x++)
            if (!["GLOBAL", "LOCAL"].includes(all_scopes[x]))
              local_replacement = local_replacement.replace(all_scopes[x], `main.users['${options.scopes[all_scopes[x]]}']`);

          //Evaluate statement, [WIP] - This may pose a security hazard in the future
          processed_replacement = eval(local_replacement);

          //Push processed_replacement to all_localisation_matches
          all_localisation_matches.push(processed_replacement);
        }

        //Replace keys in text with matches
        for (var i = 0; i < all_localisation_keys.length; i++)
          localisation_string = localisation_string.replace(all_localisation_keys[i], all_localisation_matches[i]);
      }
    } catch (e) {
      log.error(`parseLocalisation() - ran into an error: ${e}.`);
      console.log(e);
    }

    //Return statement
    return localisation_string;
  },

  /*
    parseWargoalLocalisation() - Parses tooltip localisation for a wargoal.
    options: {
      disable_prefix: true/false - Whether or not to disable the bullet point in the prefix
    }
  */
  parseWargoalLocalisation: function (arg0_wargoal_type) {
    //Convert from parameters
    var wargoal_type = arg0_wargoal_type;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var prefix = (!options.disable_prefix) ? "• " : "";
    var wargoal_obj = config.wargoals[wargoal_type];
    var wargoal_string = [];

    if (wargoal_obj) {
      var all_wargoal_keys = Object.keys(wargoal_obj);

      //Push wargoal name and description formatting first
      wargoal_string.push(`**${(wargoal_obj.name) ? wargoal_obj.name : wargoal_type}:**`);
      wargoal_string.push("");

      if (wargoal_obj.description) {
        wargoal_string.push(wargoal_obj.description);
        wargoal_string.push("");
      }

      //Push infamy cost
      if (wargoal_obj.infamy) {
        var all_infamy_keys = Object.keys(wargoal_obj.infamy);
        var default_infamy_keys = ["infamy_per_percentage", "infamy_per_province", "maximum_infamy", "minimum_infamy"]
        var infamy_obj = wargoal_obj.infamy;

        wargoal_string.push(`${config.icons.infamy} Infamy: **${(infamy_obj.minimum_infamy) ? parseNumber(infamy_obj.minimum_infamy, { display_float: true }) : 0}**`);

        if (infamy_obj.infamy_per_percentage)
          wargoal_string.push(`- **${parseNumber(infamy_obj.infamy_per_percentage, { display_float: true, display_prefix: true })}** per % demanded.`);
        if (infamy_obj.infamy_per_province)
          wargoal_string.push(`- **${parseNumber(infamy_obj.infamy_per_province, { display_float: true, display_prefix: true })}** per province demanded.`);

        //Additional infamy modifiers
        for (var i = 0; i < all_infamy_keys.length; i++)
          if (!default_infamy_keys.includes(all_infamy_keys[i]))
            if (all_infamy_keys[i].startsWith("infamy_per_")) {
              var infamy_province_type = all_infamy_keys[i].replace("infamy_per_", "");

              wargoal_string.push(`- **${parseNumber(infamy_obj[all_infamy_keys[i]], { display_float: true, display_prefix: true })}** per **${parseString(infamy_province_type)}** province demanded.`);
            }

        //Maximum infamy
        if (infamy_obj.maximum_infamy)
          wargoal_string.push(`- ${config.icons.infamy} Maximum Infamy from adding this wargoal: ${parseNumber(infamy_obj.maximum_infamy, { display_float: true })}`);
      } else {
        wargoal_string.push(`${config.icons.infamy} Infamy: **0**`);
      }

      (wargoal_obj.demand_limit != -1) ?
        wargoal_string.push(`This wargoal can be demanded up to **${parseNumber(returnSafeNumber(wargoal_obj.demand_limit, 1))}** time(s).`) :
        wargoal_string.push(`This wargoal can be demanded as many times as we like.`);
      wargoal_string.push("");

      //Wargoal effects
      if (wargoal_obj.effect) {
        var all_effects = Object.keys(wargoal_obj.effect);

        for (var i = 0; i < all_effects.length; i++)
          switch (all_effects[i]) {
            case "annex_all":
              wargoal_string.push(`${prefix}Allows the complete annexation of a target country.`);

              break;
            case "cut_down_to_size":
              var default_keys = ["can_cut_army_types_down_to_size", "maximum_removal", "minimum_removal", "maximum_turns_demilitarised", "minimum_turns_demilitarised"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              if (local_effect.can_cut_army_types_down_to_size)
                wargoal_string.push(`${prefix}Can cut different army types down to size.`);
              if (local_effect.minimum_removal)
                wargoal_string.push(`${prefix}Can reduce target forces by at least **${printPercentage(local_effect.minimum_removal)}**.`);
              if (local_effect.maximum_removal)
                wargoal_string.push(`${prefix}Reduces target forces by a maximum of **${printPercentage(local_effect.maximum_removal)}**.`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_removal", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}Reduces the target's **${parseString(processed_key[1])}** by a minimum of **${printPercentage(local_value)}**.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}Can reduce the target's **${parseString(processed_key[1])}** by a maximum of **${printPercentage(local_value)}**.`);
                }

              if (local_effect.minimum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a minimum of **${parseNumber(local_effect.minimum_turns_demilitarised)}** turn(s).`);
              if (local_effect.maximum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a maximum of **${parseNumber(local_effect.maximum_turns_demilitarised)}** turn(s).`);

              break;
            case "demilitarisation":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.can_demilitarise_capital) ?
                wargoal_string.push(`${prefix}Can demilitarise target capital.`) :
                wargoal_string.push(`${prefix}Cannot demilitarise target capital.`);

              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}Can demilitarise at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s).`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}Can demilitarise up to **${parseNumber(local_effect.maximum_provinces_allowed)}**`);

              if (local_effect.minimum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a minimum of **${parseNumber(local_effect.minimum_turns_demilitarised)}** turn(s).`);
              if (local_effect.maximum_turns_demilitarised)
                wargoal_string.push(`${prefix}These terms can apply for a maximum of **${parseNumber(local_effect.maximum_turns_demilitarised)}** turn(s).`);

              break;
            case "free_oppressed_people":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              if (local_effect.can_choose_provinces)
                wargoal_string.push(`${prefix}We are allowed to choose the provinces that will be conferred to an oppressed people from the target country.`);
              (local_effect.can_free_accepted_cultures) ?
                wargoal_string.push(`${prefix}We can free accepted, not just non-accepted cultures, from the target.`) :
                wargoal_string.push(`${prefix}We may only free non-accepted cultures from the target.`);
              if (local_effect.minimum_country_population_size)
                wargoal_string.push(`${prefix}Any freed country can have at least **${parseNumber(local_effect.minimum_country_population_size)}** inhabitants.`);
              if (local_effect.minimum_country_province_size)
                wargoal_string.push(`${prefix}Any freed country can have at least **${parseNumber(local_effect.minimum_country_province_size)}** province(s).`);
              if (local_effect.maximum_country_population_size)
                wargoal_string.push(`${prefix}Any freed country may only have **${parseNumber(local_effect.minimum_country_population_size)}** inhabitants at most.`);
              if (local_effect.maximum_country_province_size)
                wargoal_string.push(`${prefix}Any freed country may only have up to **${parseNumber(local_effect.maximum_country_population_size)}** province(s).`);

              break;
            case "install_government":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.can_install_any_government) ?
                wargoal_string.push(`${prefix}Forces a regime change on target to a government of our preference.`) :
                wargoal_string.push(`${prefix}Forces target country to change their regime to our government type.`);

              break;
            case "liberation":
              wargoal_string.push(`${prefix}Allows the liberation of a vassal country or client state.`);

              break;
            case "limited_annexation":
              var default_keys = ["can_take_capital", "maximum_provinces_allowed", "minimum_provinces_allowed", "minimum_percentage_allowed", "maximum_percentage_allowed"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              (local_effect.can_take_capital) ?
                wargoal_string.push(`We may annex the target country's capital.`) :
                wargoal_string.push(`We may not annex the target capital.`);

              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}We can annex at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s) from the target.`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}We may only annex up to **${parseNumber(local_effect.maximum_provinces_allowed)}** from the target.${(local_effect.maximum_provinces_allowed) ? " Supersedes minimum percentage allowed." : ""}`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}We can annex at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the enemy's provinces.${(local_effect.minimum_provinces_allowed) ? " Supersedes minimum provinces allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}We can annex at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the enemy's provinces.${(local_effect.maximum_provinces_allowed) ? " Supersedes maximum provinces allowed." : ""}`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_allowed", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}May take a minimum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} provinces from target.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}May take a maximum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} from target.`);
                }

              break;
            case "puppet":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              if (Object.keys(local_effect).length == 0)
                wargoal_string.push(`${prefix}We may puppet the target country.`);
              if (local_effect.maximum_population)
                wargoal_string.push(`${prefix}We may puppet the target country as long as it has less than **${parseNumber(local_effect.maximum_population)}** inhabitants.`);
              if (local_effect.maximum_provinces)
                wargoal_string.push(`${prefix}We may puppet the target country as long as it has less than **${parseNumber(local_effect.maximum_provinces)}** province(s).`);
              if (local_effect.minimum_turns_puppeted)
                wargoal_string.push(`${prefix}We must puppet the target for a minimum of **${parseNumber(local_effect.minimum_turns_puppeted)}** turn(s).`);
              if (local_effect.maximum_turns_puppeted)
                wargoal_string.push(`${prefix}We may hold the target as a puppet for up to **${parseNumber(local_effect.maximum_turns_puppeted)}** turn(s).`);

              break;
            case "release_client_state":
              var default_keys = ["can_release_client_state", "can_take_capital", "maximum_percentage_allowed", "maximum_population_allowed", "maximum_provinces_allowed", "maximum_turns_allowed", "minimum_percentage_allowed", "minimum_population_allowed", "minimum_provinces_allowed", "minimum_turns_allowed", "requires_capital_city"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              if (local_effect.can_release_client_state)
                wargoal_string.push(`${prefix}We may release client states from the target country.`);
              if (local_effect.can_take_capital)
                wargoal_string.push(`${prefix}The target country's capital may belong to a client state.`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}The client state may hold at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's province(s).${(local_effect.minimum_provinces_allowed) ? " Supersedes minimum provinces allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}The client state may hold up to **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's province(s).${(local_effect.minimum_provinces_allowed) ? " Supersedes maximum provinces allowed." : ""}`);
              if (local_effect.minimum_provinces_allowed)
                wargoal_string.push(`${prefix}The client state may have at least **${parseNumber(local_effect.minimum_provinces_allowed)}** province(s).`);
              if (local_effect.maximum_provinces_allowed)
                wargoal_string.push(`${prefix}The client state may have up to **${parseNumber(local_effect.maximum_provinces_allowed)}** province(s).${(local_effect.minimum_percentage_allowed) ? " Supersedes minimum percentage allowed." : ""}`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("_allowed", "").split("_");

                  if (processed_key[0] == "minimum")
                    wargoal_string.push(`${prefix}May take a minimum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} provinces from target.`);
                  if (processed_key[0] == "maximum")
                    wargoal_string.push(`${prefix}May take a maximum of **${parseNumber(local_value)}** ${parseString(processed_key[1])} from target.`);
                }

              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms must apply for at least **${parseNumber(local_effect.minimum_turns_allowed)}** before being abrogated.`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms may only last up to **${parseNumber(local_effect.maximum_turns_allowed)}** before the client state is returned to its rightful owner.`);

              break;
            case "retake_cores":
              wargoal_string.push(`${prefix}May retake cores for another country from the target.`);

              break;
            case "revoke reparations":
              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}Frees a country of our choice from paying reparations to its economic overlord.`) :
                wargoal_string.push(`${prefix}We will no longer have to pay reparations.`);

              break;
            case "seize_resources":
              var default_keys = ["inherit_actions_maximum", "inherit_actions_minimum", "inherit_money_maximum", "inherit_money_minimum", "seize_inventory_maximum", "seize_inventory_maximum"];
              var local_effect = wargoal_obj.effect[all_effects[i]];
              var local_effects = Object.keys(local_effect);

              (local_effect.custom_recipient) ?
                wargoal_string.push(`The target country will cede their resources to a selected recipient.`) :
                wargoal_string.push(`The target country will cede their resources to us.`);

              if (local_effect.inherit_actions_minimum)
                wargoal_string.push(`${prefix}Recipient can inherit at least **${printPercentage(local_effect.inherit_actions_minimum)}** of the target country's actions.`);
              if (local_effect.inherit_actions_maximum)
                wargoal_string.push(`${prefix}Recipient may inherit up to **${printPercentage(local_effect.inherit_actions_maximum)}** of the target country's actions.`);
              if (local_effect.inherit_money_minimum)
                wargoal_string.push(`${prefix}Recipient can inherit at least **${printPercentage(local_effect.inherit_money_minimum)}** of the target country's monetary reserves.`);
              if (local_effect.inherit_money_maximum)
                wargoal_string.push(`${prefix}Recipient may inherit up to **${printPercentage(local_effect.inherit_money_maximum)}** of the target country's monetary reserves.`);

              //Custom effects
              for (var i = 0; i < local_effects.length; i++)
                if (!default_keys.includes(local_effects[i])) {
                  var local_value = local_effect[local_effects[i]];
                  var processed_key = local_effects[i].replace("seize_", "").split("_");

                  var good_obj = getGood(processed_key[1]);

                  if (good_obj) {
                    if (processed_key[0] == "minimum")
                      wargoal_string.push(`${prefix}May take a minimum of **${printPercentage(local_value)}** of the target's ${(good_obj.name) ? good_obj.name : parseString(processed_key[1])}.`);
                    if (processed_key[0] == "maximum")
                      wargoal_string.push(`${prefix}May take a maximum of **${printPercentage(local_value)}** of the target's ${(good_obj.name) ? good_obj.name : parseString(processed_key[1])}.`);
                  }
                }

              if (local_effect.seize_inventory_minimum)
                wargoal_string.push(`${prefix}The recipient will seize at least **${printPercentage(local_effect.seize_inventory_minimum)}** of the target's goods.`);
              if (local_effect.seize_inventory_maximum)
                wargoal_string.push(`${prefix}The recipient may seize up to **${printPercentage(local_effect.seize_inventory_minimum)}** of the target's goods.`);

              break;
            case "steer_trade":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country may only trade with a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country can only trade with us.`);

              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for at least **${parseNumber(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for **${parseNumber(local_effect.maximum_turns_allowed)}** turn(s) at most.`);

              break;
            case "syphon_actions":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country will cede their actions to a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country will cede their actions to us.`);

              if (local_effect.minimum_number_allowed)
                wargoal_string.push(`${prefix}We may syphon at least **${parseNumber(local_effect.minimum_number_allowed)}** action(s) from the target.`);
              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}We may syphon at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of all produced actions from the target.${(local_effect.minimum_number_allowed) ? " Supersedes minimum number allowed." : ""}`);
              if (local_effect.maximum_number_allowed)
                wargoal_string.push(`${prefix}We may only syphon up to **${parseNumber(local_effect.maximum_number_allowed)}** action(s) from the target.${(local_effect.maximum_number_allowed) ? " Supersedes minimum percentage allowed." : ""}`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}We may syphon up to **${printPercentage(local_effect.maximum_percentage_allowed)}** of the target's action(s).${(local_effect.maximum_number_allowed) ? " Supersedes maximum number allowed." : ""}`);
              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}We will be able to collect actions from the target for at least **${parseNumber(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}We may only collect actions from the target for at least **${parseNumber(local_effect.maximum_turns_allowed)}** turn(s).`);

              break;
            case "war_reparations":
              var local_effect = wargoal_obj.effect[all_effects[i]];

              (local_effect.custom_recipient) ?
                wargoal_string.push(`${prefix}The target country will pay war reparations to a selected recipient.`) :
                wargoal_string.push(`${prefix}The target country must pay us war reparations.`);

              if (local_effect.minimum_percentage_allowed)
                wargoal_string.push(`${prefix}The recipient must collect at least **${printPercentage(local_effect.minimum_percentage_allowed)}** of the target's income.`);
              if (local_effect.maximum_percentage_allowed)
                wargoal_string.push(`${prefix}The recipient may collect up to **${printPercentage(local_effect.maximum_percentage_allowed)}** of the target's income.`);
              if (local_effect.minimum_turns_allowed)
                wargoal_string.push(`${prefix}These terms are binding for at least **${printPercentage(local_effect.minimum_turns_allowed)}** turn(s).`);
              if (local_effect.maximum_turns_allowed)
                wargoal_string.push(`${prefix}These terms may only apply for up to **${printPercentage(local_effect.maximum_turns_allowed)}** turn(s).`);

              break;
          }
      } else {
        wargoal_string.push(`${prefix}White Peace`);
      }
    }
  }
};
