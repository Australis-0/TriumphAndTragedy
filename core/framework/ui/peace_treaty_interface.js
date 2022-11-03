module.exports = {
  //closePeaceTreaty() - Closes the peace treaty UI and unloads the cached map
  closePeaceTreaty: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);

    //Close UI
    removeControlPanel(game_obj.id);
    printStats(user_id);
    game_obj.page = "country_interface";

    //Delete map file
    try {
      fs.unlinkSync(`./map/${actual_id}_peace_treaty`);
    } catch {}
  },

  initialiseAddWargoal: function (arg0_user, arg1_peace_treaty_object) { //[WIP] - Custom wargoal UI parser
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_wargoal_array = [];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_countries = [];
    var friendly_side = "";
    var has_error = [false, ""]; //[has_error, error_msg];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];
    var wargoal_array = [];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Add all friendly countries to display
    for (var i = 0; i < war_obj[friendly_side].length; i++)
      friendly_countries.push(`**${main.users[war_obj[friendly_side][i]].name}**`);

    //Fetch a list of all available wargoals
    for (var i = 0; i < war_obj.wargoals.length; i++)
      wargoal_array.push(`${(war_obj.wargoals.length - 1 == i) ? "or ": ""}**${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}**`);
    for (var i = 0; i < war_obj.wargoals.length; i++)
      actual_wargoal_array.push(((config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]).toLowerCase());

    //Initialise visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Add Wargoal To Peace Treaty:`,
      prompts: [
        [`Which wargoal would you like to add to this peace treaty?\n\nPlease type either ${wargoal_array.join(", ")}.\n\nTo go back to viewing this peace treaty, type **[Back]**.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var current_wargoal = arg[0].trim().toLowerCase();
      var local_ui = {
        prompts: []
      };
      var reload_ui = false;
      var wargoal_name = getWargoal(current_wargoal, { return_key: true });
      var wargoal_obj = getWargoal(current_wargoal);

      if (wargoal_obj) {
        //Check if demand_limit has already been reached
        var wargoal_demanded = 0;

        for (var i = 0; i < peace_obj.wargoals.length; i++)
          if (peace_obj.wargoals[i].id == wargoal_name)
            wargoal_demanded++;

        //Parse effects in order to create a visual prompt
        if (wargoal_demanded >= returnSafeNumber(wargoal_obj.demand_limit, 1)) {
          if (wargoal_obj.effect) {
            var all_effects = Object.keys(wargoal_obj.effect);

            for (var i = 0; i < all_effects.length; i++) {
              var local_value = wargoal_obj.effects[all_effects[i]];

              switch (all_effects[i]) {
                case "annex_all":
                  local_ui.prompts.push([`For which country would you like to motion a total annexation request for?\nNote: You can choose any country (even if they are currently at war with you), so long as they are not the same country you are annexing.`, "mention"]);
                  local_ui.prompts.push([`Which enemy country in this conflict would you like to be fully annexed by them?\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var actual_id = main.global.user_map[user_id];
                      var ot_user_id = returnMention(input);
                      var usr = main.users[actual_id];

                      var actual_ot_user_id = main.global.user_map[ot_user_id];

                      //Check to see if enemy country is valid
                      if (!main.global.user_map[actual_ot_user_id])
                        return [false, `The country you have specified for annexation did not exist!`];
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You can't annex a neutral/allied country!`];
                      if (actual_ot_user_id == arg[arg.length - 1])
                        return [false, `You can't have a country annex itself!`];
                    }
                  }]);

                  local_ui.annex_all = true;
                  local_ui.annex_all_prompts = [
                    { index: local_ui.prompts.length - 2, type: "recipient" },
                    { index: local_ui.prompts.length - 1, type: "target" }
                  ];

                  break;
                case "cut_down_to_size":
                  local_ui.prompts.push([`Whom would you like to cut down to size?\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var actual_id = main.global.user_map[user_id];
                      var ot_user_id = returnMention(input);
                      var usr = main.users[actual_id];

                      var actual_ot_user_id = main.global.user_map[ot_user_id];

                      //Check to see if enemy country is valid
                      if (!main.global.user_map[actual_ot_user_id])
                        return [false, `The country you have specified for annexation did not exist!`];
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You can't force a neutral/allied country to cut itself down to size!`];
                    }
                  }]);

                  local_ui.cut_down_to_size_prompts = [
                    { index: local_ui.prompts.length - 1, type: "target" }
                  ];

                  //Cut down to size clause
                  if (local_value.can_cut_army_types_down_to_size) {
                    //If true, only specified army types can be cut down to size, not everything
                    var all_local_effects = Object.keys(local_value);
                    var default_keys = ["can_cut_army_types_down_to_size", "minimum_removal", "maximum_removal", "minimum_turns_demilitarised", "maximum_turns_demilitarised"];
                    var potential_army_types = [];

                    for (var x = 0; x < all_local_effects.length; x++)
                      if (!default_keys.includes(all_local_effects[x])) {
                        var potential_army_type = all_local_effects[x].split("_")[1];

                        if (!potential_army_types.includes(potential_army_type))
                          potential_army_types.push(potential_army_type);
                      }

                    //Push army type prompts to to local_ui.prompts
                    for (var x = 0; x < potential_army_types.length; x++) {
                      local_ui.prompts.push([`By how many percent should the **${parseString(potential_army_types[x])}** of this country be cut down by?`, "number", {
                        min: returnSafeNumber(local_value[`minimum_${potential_army_types[x]}_removal`], 0),
                        max: returnSafeNumber(local_value[`maximum_${potential_army_types[x]}_removal`], 1)
                      }]);

                      local_ui.cut_down_to_size_prompts.push(
                        { index: local_ui.prompts.length - 1, type: `${potential_army_types[x]}_removal` }
                      );
                    }
                  } else {
                    //General cut down on all army types
                    local_ui.prompts.push([`How much should the opposing nation's armed forces be cut down by? (in percent)`, "number", {
                      min: returnSafeNumber(local_value.minimum_removal, 0),
                      max: returnSafeNumber(local_value.maximum_removal, 1)
                    }]);

                    local_ui.cut_down_to_size_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `general_removal` }
                    );
                  }

                  //Demilitarisation clause
                  if (local_value.minimum_turns_demilitarised || local_value.maximum_turns_demilitarised) {
                    local_ui.prompts.push([`For how many turns should the target nation be unable to raise forces?`, "number", {
                      min: returnSafeNumber(local_value.minimum_turns_demilitarised, 0),
                      max: returnSafeNumber(local_value.maximum_turns_demilitarised, 1)
                    }]);

                    local_ui.cut_down_to_size_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `duration` }
                    );
                  }

                  break;
                case "demilitarisation":
                  local_ui.prompts.push([`Which provinces would you like to demilitarise?${(local_value.can_demilitarise_capital) ? " You may not demilitarise capital cities." : ""}\nPlease separate each province with a space like so: '4702 4703 4709'.`, "text", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var actual_id = main.global.user_map[user_id];
                      var ot_user_id = returnMention(input);
                      var provinces = input.trim().split(" ");
                      var usr = main.users[actual_id];

                      //Demilitarisation maximum provinces clause
                      var maximum_provinces = returnSafeNumber(local_value.maximum_provinces_allowed, 1);
                      var minimum_provinces = returnSafeNumber(local_value.minimum_provinces_allowed, 1);

                      if (provinces.length > maximum_provinces)
                        return [false, `You can't demilitarise more than **${parseNumber(maximum_provinces)}**! Remove **${parseNumber(provinces.length - maximum_provinces)}** province(s) to stay below the limit.`];

                      //Make sure all province ID's to be demilitarised are valid
                      for (var i = 0; i < provinces.length; i++)
                        if (!main.provinces[provinces[i]]) {
                          return [false, `**${provinces[i]}** could not be found on the map as a valid province!`];
                        } else {
                          var local_province = main.provinces[provinces[i]];

                          //Check that it belongs to an enemy country or their own country
                          if (!war_obj.enemy_side.includes(local_province.owner) && local_province.owner != actual_id)
                            return [false, `You cannot demilitarise neutral/allied provinces!`];

                          //Check to make sure it doesn't include a capital city
                          if (!local_value.can_demilitarise_capital) {
                            for (var x = 0; x < war_obj.enemy_side.length; x++)
                              try {
                                var local_capital = getCapital(war_obj.enemy_side[x]);

                                if (local_capital.id == provinces[i])
                                  return [false, `You cannot demilitarise Province **${provinces[i]}**, as it remains the capital of **${main.users[war_obj.enemy_side[x]].name}**!`];
                              } catch {}

                            //Check if capital demilitarised is their own
                            try {
                              var local_capital = getCapital(actual_id);

                              if (local_capital.id == provinces[i])
                                return [false, `You can't demilitarise Province **${provinces[i]}**, as it remains your own capital!`];
                            } catch {}
                          }
                        }
                    }
                  }]);

                  local_ui.demilitarisation_prompts = [
                    { index: local_ui.prompts.length - 1, type: `provinces` }
                  ];

                  //Turns clause
                  if (local_value.minimum_turns_allowed || local_value.maximum_turns_allowed) {
                    local_ui.prompts.push([`How many turns should these provinces remain demilitarised for?`, "number", {
                      min: returnSafeNumber(local_value.minimum_turns_allowed, 0),
                      max: returnSafeNumber(local_value.maximum_turns_allowed, 1000)
                    }]);

                    local_ui.demilitarisation_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `duration` }
                    );
                  }

                  break;
                case "free_oppressed_people":
                  var all_cultures = Object.keys(main.global.cultures);
                  var potential_culture_display_list = [];
                  var potential_culture_list = [];

                  local_ui.free_oppressed_people_prompts = [];

                  //Fetch a list of all releasable cultures
                  for (var x = 0; x < all_cultures.length; x++) {
                    var local_culture = main.global.cultures[all_cultures[x]];

                    for (var y = 0; y < war_obj.enemy_side.length; y++) {
                      var local_user = main.users[war_obj.enemy_side[y]];

                      var accepted_cultures = getAcceptedCultures(local_user.id, { exclude_primary_culture: true });
                      var local_provinces = getProvinces(local_user.id, {
                        include_hostile_occupations: true
                      });
                      var primary_cultures = getPrimaryCultures(local_user.id);

                      //Can accepted cultures be released?
                      if (local_value.can_free_accepted_cultures)
                        for (var z = 0; z < accepted_cultures.length; z++)
                          if (!potential_culture_list.includes(accepted_cultures[z]))
                            potential_culture_list.push(accepted_cultures[z]);

                      //Check for unaccepted cultures
                      for (var z = 0; z < local_provinces.length; z++)
                        if (local_provinces[y].culture)
                          if (
                            !accepted_cultures.includes(local_provinces[z].culture) && !primary_cultures.includes(local_provinces[z].culture))
                            if (!potential_culture_list.includes(local_provinces[z].culture))
                              potential_culture_list.push(local_provinces[z].culture);
                    }
                  }

                  //Format potential_culture_display_list
                  for (var x = 0; x < potential_culture_list.length; x++)
                    potential_culture_display_list.push(`**${main.global.cultures[potential_culture_list[x]].name}**`);

                  //Display release culture visual prompt
                  local_ui.prompts.push([`Which culture would you like to release as an independent nation?\n- ${potential_culture_display_list.join("\n- ")}`, "string", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var culture_obj = getCulture(input.trim().toLowerCase());

                      //Check to see if this culture exists
                      if (!culture_obj)
                        return [false, `The culture you have specified, **${input}** could not be found as a valid culture!`];

                      //Check to see if this culture is releasable
                      if (!potential_culture_list.includes(culture_obj.id))
                        return [false, `The **${culture_obj.adjective}** is not a releasable culture! Please refer to the list of potential releasable cultures for more information.`];
                    }
                  }]);

                  local_ui.free_oppressed_people_prompts.push(
                    { index: local_ui.prompts.length - 1, type: `culture` }
                  );

                  //Custom provinces clause
                  if (local_value.can_choose_provinces) {
                    local_ui.prompts.push([`Which provinces should this new state be granted?\nPlease separate each province with a space like so: '4702 4703 4709'.`, "string", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var culture_obj = getCulture(arg[arg.length - 1].trim().toLowerCase());
                        var provinces = input.trim().split(" ");
                        var total_population = 0;

                        //Check province length limit
                        if (local_value.maximum_provinces_allowed)
                          if (provinces.length > local_value.maximum_provinces_allowed)
                            return [false, `You may only demand up to **${parseNumber(local_value.maximum_provinces_allowed)}** for the **${culture_obj.adjective}** culture! Remove **${parseNumber(provinces.length - local_value.maximum_provinces_allowed)}** to meet this limit.`];

                        //Check to see if all provinces are valid
                        for (var i = 0; i < provinces.length; i++)
                          if (!main.provinces[provinces[i]]) {
                            return [false, `**${provinces[i]}** could not be found on the map as a valid province!`];
                          } else {
                            var local_province = main.provinces[provinces[i]];

                            //Make sure all motioned provinces belong to enemies
                            if (!local_province.owner)
                              return [false, `You cannot liberate an uncolonised province! Province **${provinces[i]}** was not owned by anyone.`];
                            if (!war_obj.enemy_side.includes(provinces[i]))
                              return [false, `All motioned provinces, including Province **${provinces[i]}** must belong to the enemy!`];

                            if (local_province.pops)
                              total_population += returnSafeNumber(local_province.pops.population);
                          }

                        //Check province population limit
                        if (local_value.maximum_country_population_size)
                          if (total_population > local_value.maximum_country_population_size)
                            return [false, `A released homeland under this wargoal can only have up to **${parseNumber(local_value.maximum_country_population_size)}** people! Your demand exceeded this amount by **${parseNumber(total_population - local_value.maximum_country_population_size)}** inhabitants. Try removing a few province(s) from your motion to meet this criterion.`];
                      }
                    }]);

                    local_ui.free_oppressed_people_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `provinces` }
                    );
                  } else {
                    //Else, which country should they be released from?
                    local_ui.prompts.push([`Which enemy nation should this culture be released from?`, "mention", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var culture_obj = getCulture(arg[arg.length - 1].trim().toLowerCase());
                        var ot_user_id = returnMention(input);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var ot_user = main.users[actual_ot_user_id];

                        //Fetch a list of potential countries
                        var potential_countries = [];

                        for (var i = 0; i < war_obj.enemy_side.length; i++) {
                          var local_provinces = getProvinces(war_obj.enemy_side[i], { include_hostile_occupations: true });

                          for (var x = 0; x < local_provinces.length; x++)
                            if (local_provinces[x].culture)
                              if (local_provinces[x].culture == culture_obj.id)
                                if (!potential_countries.includes(war_obj.enemy_side[i]))
                                  potential_countries.push(war_obj.enemy_side[i]);
                        }

                        //Check to see if current user is on the list of potential_countries
                        if (!potential_countries.includes(actual_ot_user_id))
                          return [false, `**${ot_user.name}** does not hold any **${culture_obj.adjective}** majority provinces! Please select a different enemy nation to release this culture from.`];
                      }
                    }]);

                    local_ui.free_oppressed_people_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `target` }
                    );
                  }

                  break;
                case "install_government":
                  //Format potential_governments
                  var all_governments = Object.keys(config.governments);
                  var display_potential_governments = [];
                  var potential_governments = [
                    usr.government
                  ];

                  //Check for can_install_any_government
                  if (local_value.can_install_any_government)
                    for (var x = 0; x < all_governments.length; x++)
                      if (!potential_governments.includes(all_governments[x]))
                        potential_governments.push(all_governments[x]);

                  //Format display_potential_governments
                  for (var x = 0; x < potential_governments.length; x++) {
                    var local_government = config.governments[potential_governments[x]];

                    display_potential_governments.push((local_government.name) ? local_government.name : potential_governments[x]);
                  }

                  //User prompt
                  local_ui.prompts.push([`Which enemy nation's government would you like to change? You must specify one of the following nations:\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];

                      //Check to see if the nation specified is actually an enemy nation
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You must specify a user of the enemy faction!`];
                    }
                  }]);

                  //List valid governments
                  local_ui.prompts.push([`Which of the following governments would you like to install in this country?\n- ${display_potential_governments.join("\n- ")}`, "string", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var government_obj = getGovernment(input.trim().toLowerCase());
                      var government_key = getGovernment(input.trim().toLowerCase(), { return_key: true });

                      if (!government_obj)
                        return [false, `The government type you have specified, **${input}**, turned out to be entirely nonexistent!`];
                      if (!potential_governments.includes(government_key))
                        return [false, `You must specify a valid government type to force a regime change to!`];
                    }
                  }]);

                  local_ui.install_government_prompts = [
                    { index: local_ui.prompts.length - 2, type: `target` },
                    { index: local_ui.prompts.length - 1, type: `government` }
                  ];

                  break;
                case "liberation":
                  //Format potential_vassals
                  var display_potential_vassals = [];
                  var potential_vassals = [];

                  //Which of the enemy's vassals should be liberated?
                  for (var x = 0; x < war_obj.enemy_side.length; x++) {
                    var local_country = main.users[war_obj.enemy_side[x]];

                    var all_vassals = Object.keys(usr.diplomacy.vassals);

                    for (var y = 0; y < all_vassals.length; y++)
                      if (!potential_vassals.includes(all_vassals[y]))
                        potential_vassals.push(all_vassals[y]);
                  }

                  //Format display_potential_vassals
                  for (var x = 0; x < potential_vassals.length; x++)
                    display_potential_vassals.push(main.users[potential_vassals[x]].name);

                  //User prompt
                  local_ui.prompts.push([`Which of the following vassals would you like to liberate from the enemy?`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if the liberated user exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, doesn't even exist!`];

                      //Check if actual_ot_user_id is included in potential_vassals
                      if (!potential_vassals.includes(actual_ot_user_id))
                        return [false, `You must choose one of the above vassals to liberate from their oppressors, not just anything!`];
                    }
                  }]);

                  local_ui.liberation_prompts = [
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ];

                  break;
                case "limited_annexation":
                  var all_local_effects = Object.keys(local_value);
                  var default_keys = ["can_take_capital", "free_annexation", "maximum_provinces_allowed", "minimum_provinces_allowed", "maximum_percentage_allowed", "minimum_percentage_allowed"];

                  //Provinces prompt
                  local_ui.prompts.push([`Which provinces would you like to motion an annexation request for?\nPlease separate each province with a space like so: '4702 4703 4709'.`, "string", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var actual_id = main.global.user_map[user_id];
                      var annexed_provinces = {};
                      var province_types_annexed = {};
                      var provinces = input.trim().split(" ");
                      var usr = main.users[actual_id];

                      //Check all provinces to see if they're valid
                      for (var i = 0; i < provinces.length; i++)
                        if (!main.provinces[provinces[i]]) {
                          return [false, `One of the provinces you have specified, Province **${provinces[i]}** proved to be entirely nonexistent!`];
                        } else {
                          var local_province = main.provinces[provinces[i]];

                          //Make sure provinces belong to enemy nations
                          if (!war_obj.enemy_side.includes(local_province.owner))
                            return [false, `Province **${provinces[i]}** wasn't owned by an enemy nation! You may only petition for annexation requests from enemy countries engaged in this war.`];

                          //Capital clause
                          if (!local_value.can_take_capital)
                            for (var x = 0; x < war_obj.enemy_side.length; x++) {
                              var capital_obj = getCapital(war_obj.enemy_side[x]);
                              var local_user = main.users[war_obj.enemy_side[x]];

                              if (capital_obj)
                                if (capital_obj.id == provinces[i])
                                  return [false, `One of the provinces you have specified, Province **${provinces[i]}** was the capital of **${local_user.name}**! You cannot take another country's capital.`];
                            }

                          //Otherwise rack it up
                          if (!annexed_provinces[local_province.owner])
                            annexed_provinces[local_province.owner] = 0;
                          annexed_provinces[local_province.owner]++;

                          if (!province_types_annexed[local_province.type])
                            province_types_annexed[local_province.type] = 0;
                          province_types_annexed[local_province.type]++;
                        }

                      //Free annexation clause
                      var all_targets = Object.keys(annexed_provinces);

                      if (!local_value.free_annexation)
                        if (all_targets.length > 1)
                          return [false, `You may only annex territory from a single nation! You annexed territory from **${parseNumber(all_targets.length)}** countries instead.`];

                      //Check to make sure all enemy countries fit within the limited annexation wargoal
                      for (var i = 0; i < all_targets.length; i++) {
                        var local_user = main.users[all_targets[i]];
                        var provinces_allowed = returnSafeNumber(local_value.minimum_provinces_allowed, 0);

                        //Order of precedence - minimum provinces allowed > minimum % allowed > maximum provinces allowed > maximum % allowed
                        if (local_value.minimum_percentage_allowed)
                          provinces_allowed = Math.ceil(local_user.provinces*local_value.minimum_percentage_allowed);
                        if (local_value.maximum_provinces_allowed)
                          if (provinces_allowed > local_value.maximum_provinces_allowed)
                            provinces_allowed = local_value.maximum_provinces_allowed;
                        if (local_value.maximum_percentage_allowed)
                          if (provinces_allowed > Math.ceil(local_user.provinces*local_value.maximum_percentage_allowed))
                            provinces_allowed = Math.ceil(local_user.provinces*local_value.maximum_percentage_allowed);

                        //Print error if applicable
                        if (annexed_provinces[all_targets[i]] > provinces_allowed)
                          return [false, `You may only annex up to **${parseNumber(provinces_allowed)}** from the country of **${main.users[all_targets[i]].name}**! You tried annexing **${annexed_provinces[all_targets[i]]}** province(s) instead, try removing **${annexed_provinces[all_targets[i]] - provinces_allowed}** province(s) to stay under the limit.`];
                      }

                      //Check for minimum/maximum_<type>_allowed
                      for (var i = 0; i < all_local_effects.length; i++)
                        if (!default_keys.includes(all_local_effects[i])) {
                          var local_type_limit = local_value[all_local_effects[i]];
                          var province_type = all_local_effects[i].split("_")[1];

                          if (province_types_annexed[province_type] > local_type_limit)
                            return [false, `You may only annex up to **${parseNumber(local_type_limit)}** ${parseString(province_type)} province(s)! You tried annexing **${parseNumber(province_types_annexed[province_type])}** instead. Try removing **${parseNumber(province_types_annexed[province_type] - local_type_limit)}** motioned province(s) to stay under the limit.`];
                        }
                    }
                  }]);

                  //User prompt
                  local_ui.prompts.push([`Whom should the recipient of these annexed provinces be? You may specify any country, even if they are currently at war with you, so long as they are not the same country you are annexing land from.`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var actual_id = main.global.user_map[user_id];
                      var ot_user_id = returnMention(input);
                      var provinces = arg[arg.length - 1].trim().split(" ");
                      var usr = main.users[actual_id];

                      var actual_ot_user_id = main.global.user_map[ot_user_id];

                      //Check to see if enemy country is valid
                      if (!main.global.user_map[actual_ot_user_id])
                        return [false, `The country you have specified for annexation did not exist!`];

                      //Check to see if any of the provinces have the same owner as the recipient
                      for (var i = 0; i < provinces.length; i++)
                        try {
                          var local_province = main.provinces[provinces[i]];

                          if (local_province.owner == actual_ot_user_id)
                            return [false, `People can't annex themselves! Specify a valid recipient for these territories, not someone you're annexing land from.`];
                        } catch {}
                    }
                  }]);

                  local_ui.limited_annexation_prompts = [
                    { index: local_ui.prompts.length - 2, type: `provinces` },
                    { index: local_ui.prompts.length - 1, type: `recipient` }
                  ];

                  break;
                case "puppet":
                  //Country to puppet prompt
                  local_ui.prompts.push([`Which enemy nation would you like to puppet? You may choose from the following countries:\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check that target exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, doesn't even exist!`];

                      //Check that target is an enemy
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You may only puppet enemy nations engaged in this conflict.`];

                      //Population clause
                      if (local_value.maximum_population)
                        if (ot_user.population > local_value.maximum_population)
                          return [false, `**${ot_user.name}** has too many inhabitants for you to puppet in its entirety! You may only puppet countries with up to **${parseNumber(local_value.maximum_population)}** inhabitants. ${ot_user.name} exceeded this limit by **${parseNumber(ot_user.population - local_value.maximum_population)}** people.`];

                      //Provinces clause
                      if (local_value.maximum_provinces)
                        if (ot_user.provinces > local_value.maximum_provinces)
                          return [false, `**${ot_user.name}** is too big for you to puppet! You may only puppet countries with up to **${parseNumber(local_value.maximum_provinces)}** province(s), ${ot_user.name} exceeded this amount by **${parseNumber(ot_user.provinces - local_value.maximum_provinces)}** province(s).`];
                    }
                  }]);

                  local_ui.puppet_prompts = [
                    { index: local_ui.prompts.length - 1, type: `vassal_id` }
                  ];

                  //Who should puppet this user?
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Who should be the overlord of this country? You may only select from allied countries:\n- ${friendly_countries.join("\n- ")}`, "mention", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var ot_user_id = returnMention(input);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var ot_user = main.users[actual_ot_user_id];

                        //Check that target exists
                        if (!ot_user)
                          return [false, `The country you have specified, **${input}**, doesn't even exist!`];

                        //Check that target is on the allied side
                        if (!war_obj.friendly_side.includes(actual_ot_user_id))
                          return [false, `Only allied countries may inherit this vassal as an overlord!`];
                      }
                    }]);

                    //Push prompt to puppet_prompts
                    puppet_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `overlord_id` }
                    );
                  }

                  break;
                case "release_client_state": //[WIP]
                  //Name of client state
                  local_ui.prompts.push([`What would you like to name your new client state?`, "string", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var valid_country_name = isValidCountryName(input);

                      if (!valid_country_name[0])
                        return [false, valid_country_name[1]];
                    }
                  }]);

                  local_ui.release_client_state_prompts = [
                    { index: local_ui.prompts.length - 1, type: `client_state_name` }
                  ];

                  //Capital of client state clause
                  if (local_value.requires_capital_city) {
                    local_ui.prompts.push([`What should the capital ID of this client state be? Please specify an Urban Province ID like so: '4702', 'Tokyo'.`, "string", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var city_obj = getCity(input.trim().toLowerCase());

                        //Check to see if city_obj could be found
                        if (!city_obj)
                          return [false, `The city you have specified, **${input}**, proved entirely nonexistent! Please specify a valid Urban Province ID.`];

                        //Check to see that city_obj belongs to an enemy nation
                        if (!war_obj.enemy_side.includes(city_obj.controller))
                          return [false, `The capital city of your new client state must belong to an enemy nation involved in this conflict!`];

                        //Check if client state can_take_capital
                        if (!local_value.can_take_capital)
                          for (var i = 0; i < war_obj.enemy_side.length; i++) {
                            var capital_obj = getCapital(war_obj.enemy_side[i]);

                            if (capital_obj)
                              if (capital_obj.id == city_obj.id)
                                return [false, `You may not set the capital city of an enemy country as the capital of your fledgling client state! Please specify a non-capital city for use.`];
                          }
                      }
                    }]);

                    local_ui.release_client_state_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `client_state_capital` }
                    );
                  }

                  //Provinces of client state clause
                  local_ui.prompts.push([`Which enemy provinces should be ceded to this new client state?\nPlease separate each province with a space like so: '4702 4703 4709'.`, "string", {
                    limit: function (user_id, arg, input) {
                      var annexed_population = {};
                      var annexed_provinces = {};
                      var capital_ids = [];
                      var province_types_annexed = {};
                      var provinces = input.trim().split(" ");

                      //Format capital_ids
                      for (var i = 0; i < war_obj.enemy_side.length; i++) {
                        var capital_obj = getCapital(war_obj.enemy_side[i]);

                        if (capital_obj)
                          capital_ids.push(capital_obj.id);
                      }

                      //Iterate over all provinces and check if they even exist
                      for (var i = 0; i < provinces.length; i++)
                        if (!main.provinces[provinces[i]]) {
                          return [false, `One of the provinces you have specified, Province ID **${provinces[i]}** turned out to be entirely nonexistent!`];
                        } else {
                          var local_province = main.provinces[provinces[i]];

                          //All provinces must belong to enemy nations
                          if (!war_obj.enemy_side.includes(local_province.owner))
                            return [false, `You cannot annex neutral/allied provinces! Province **${provinces[i]}** did not belong to an enemy country involved in this war.`];

                          //Check if client state can_take_capital
                          if (!local_value.can_take_capital)
                            if (capital_ids.includes(provinces[i]))
                              return [false, `**${provinces[i]}** is the capital of an enemy nation! You cannot annex enemy capitals to a client state using this wargoal.`];

                          //Otherwise rack it up
                          if (!annexed_population[local_province.owner])
                            annexed_population[local_province.owner] = 0;
                          annexed_population[local_province.owner] += returnSafeNumber(local_province.pops.population);

                          if (!annexed_provinces[local_province.owner])
                            annexed_provinces[local_province.owner] = 0;
                          annexed_provinces[local_province.owner]++;

                          if (!province_types_annexed[local_province.type])
                            province_types_annexed[local_province.type] = 0;
                          province_types_annexed[local_province.type]++;
                        }

                      //Check to make sure all enemy countries fit within the release client state wargoal
                      for (var i = 0; i < war_obj.enemy_side.length; i++) {
                        var local_user = main.users[war_obj.enemy_side[i]];
                        var provinces_allowed = returnSafeNumber(local_value.minimum_provinces_allowed, 0);

                        //Order of precedence - minimum provinces allowed > minimum % allowed > maximum provinces allowed > maximum % allowed
                        if (local_value.minimum_percentage_allowed)
                          provinces_allowed = Math.ceil(local_user.provinces*local_value.minimum_percentage_allowed);
                        if (local_value.maximum_provinces_allowed)
                          if (provinces_allowed > local_value.maximum_provinces_allowed)
                            provinces_allowed = local_value.maximum_provinces_allowed;
                        if (local_value.maximum_percentage_allowed)
                          if (provinces_allowed > Math.ceil(local_user.provinces*local_value.maximum_percentage_allowed))
                            provinces_allowed = Math.ceil(local_user.provinces*local_value.maximum_percentage_allowed);

                        //Print error if applicable
                        if (annexed_provinces[all_targets[i]] > provinces_allowed)
                          return [false, `Your client state may only annex up to **${parseNumber(provinces_allowed)}** from the country of **${main.users[all_targets[i]].name}**! You tried annexing **${annexed_provinces[all_targets[i]]}** province(s) instead, try removing **${annexed_provinces[all_targets[i]] - provinces_allowed}** province(s) to stay under the limit.`];

                        //Population clause
                        if (local_value.maximum_population_allowed)
                          if (total_population > local_value.maximum_population_allowed)
                            return [false, `**${arg[arg.length - 1]}** may only have up to **${parseNumber(local_value.maximum_population_allowed)}* citizens! This limit was exceeded by **${parseNumber(total_population - local_value.maximum_population_allowed)}** inhabitants.`];
                      }

                      //Check for minimum/maximum_<type>_allowed
                      for (var i = 0; i < all_local_effects.length; i++)
                        if (!default_keys.includes(all_local_effects[i])) {
                          var local_type_limit = local_value[all_local_effects[i]];
                          var province_type = all_local_effects[i].split("_")[1];

                          if (province_types_annexed[province_type] > local_type_limit)
                            return [false, `You may only annex up to **${parseNumber(local_type_limit)}** ${parseString(province_type)} province(s)! You tried annexing **${parseNumber(province_types_annexed[province_type])}** instead. Try removing **${parseNumber(province_types_annexed[province_type] - local_type_limit)}** motioned province(s) to stay under the limit.`];
                        }
                    }
                  }]);

                  local_ui.release_client_state_prompts.push(
                    { index: local_ui.prompts.length - 1, type: `provinces` }
                  );

                  //Client state overlord clause
                  local_ui.prompts.push([`Whom should the overlord of this new client state be? You may choose from a list of allied nations involved in this conflict:\n- ${friendly_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if ot_user even exists
                      if (!ot_user)
                        return [false, `The user you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`];

                      //Check for involvement in the war
                      if (!war_obj.enemy_side.includes(actual_ot_user_id) && !war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `The overlord you have specified for your new client state isn't even involved in this conflict! Please select a new overlord from the above list.`];

                      //Check to see if they're on the allied side
                      if (!war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `You cannot specify an enemy nation as the new overlord of your client state! Please select a new overlord from the above list.`];
                    }
                  }]);

                  local_ui.release_client_state_prompts.push(
                    { index: local_ui.prompts.length - 1, type: `overlord_id` }
                  );

                  break;
                case "retake_cores":
                  //Allied country's cores to retake
                  local_ui.prompts.push([`Which of the following countries' cores would you like to rightfully demand be returned to them?\n- ${friendly_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if ot_user even exists
                      if (!ot_user)
                        return [false, `The user you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`];

                      //Check for involvement in the war
                      if (!war_obj.enemy_side.includes(actual_ot_user_id) && !war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `You cannot retake cores for a completely neutral state! Please select a valid allied country from the above list.`];

                      //Check to see if they're on the allied side
                      if (!war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `You cannot retake cores for an enemy state! Please select a valid country from the above list.`];
                    }
                  }]);

                  //Enemy country to take back provinces from
                  local_ui.prompts.push([`Which enemy nation should be held responsible for returning these core provinces?\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if ot_user even exists
                      if (!ot_user)
                        return [false, `The user you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`];

                      //Check for involvement in the war
                      if (!war_obj.enemy_side.includes(actual_ot_user_id) && !war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `You cannot demand a completely neutral state to return their cores to this country! Please select a valid allied country from the above list.`];

                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You must specify a valid enemy country for them to be able to return their cores! **${input}** was not recognised as a valid country.`];
                    }
                  }]);

                  local_ui.retake_cores_prompts = [
                    { index: local_ui.prompts.length - 2, type: `recipient` },
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ];

                  break;
                case "revoke_reparations":
                  //Allied country's reparations to revoke
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Whom would you like to free from their debt bondage? Please select one of the allied countries below.\n- ${friendly_countries.join("\n- ")}`, "mention", {
                      limit: function (user_id, arg, input) {
                        var ot_user_id = returnMention(input);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var ot_user = main.users[actual_ot_user_id];

                        //Check to see if ot_user even exists
                        if (!ot_user)
                          return [false, `The user you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`];

                        //Check for involvement in the war
                        if (!war_obj.enemy_side.includes(actual_ot_user_id) && !war_obj.friendly_side.includes(actual_ot_user_id))
                          return [false, `You cannot free a completely neutral state from their war reparations! Please select a valid allied country from the above list.`];

                        //Check to see if they're on the friendly_side
                        if (!war_obj.friendly_side.includes(actual_ot_user_id))
                          return [false, `You must specify a valid friendly country to cease debt repayments! **${input}** was not recognised as a valid country.`];
                      }
                    }]);

                    local_ui.revoke_reparations_prompts = [
                      { index: local_ui.prompts.length - 1, type: `target` }
                    ];
                  }

                  break;
                case "seize_resources":
                  var all_local_effects = Object.keys(local_value);
                  var default_keys = ["custom_recipient", "inherit_actions_maximum", "inherit_actions_minimum", "inherit_money_maximum", "inherit_money_minimum", "seize_inventory_maximum", "seize_inventory_minimum"];

                  //Target prompt
                  local_ui.prompts.push([`Whom would you like to seize resources from?\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to make sure that target even exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, didn't even exist! Please select a country from the above list.`];

                      //Check to make sure that target is involved in the war
                      if (!war_obj.enemy_side.includes(actual_ot_user_id) && !war_obj.friendly_side.includes(actual_ot_user_id))
                        return [false, `**${ot_user.name}** isn't even involved in the current conflict! Please select a country from the above list.`];

                      //Check to make sure that target is on the enemy side
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `You can't take stuff from an allied nation in a peace deal like that! Please select a country from the above list.`];
                    }
                  }]);

                  local_ui.seize_resources_prompts = [
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ];

                  //Action prompts
                  if (local_value.inherit_actions_minimum || local_value.inherit_actions_maximum) {
                    local_ui.prompts.push([`What percentage of Actions would you like to seize from the current target? (by percentage)`, "number", {
                      min: returnSafeNumber(local_value.inherit_actions_minimum, 0),
                      max: returnSafeNumber(local_value.inherit_actions_maximum, 100)
                    }]);

                    local_ui.seize_resources_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `inherit_actions` }
                    );
                  }

                  //Inventory prompts
                  if (local_value.seize_inventory_minimum || local_value.seize_inventory_maximum) {
                    local_ui.prompts.push([`How much of the target's inventory stockpiles should be seized by the recipient? (in percentage)`, "number", {
                      min: returnSafeNumber(local_value.seize_inventory_minimum, 0),
                      max: returnSafeNumber(local_value.seize_inventory_maximum, 100)
                    }]);

                    local_ui.seize_resources_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `seize_inventory` }
                    );
                  }

                  //Money prompts
                  if (local_value.inherit_money_minimum || local_value.inherit_money_maximum) {
                    local_ui.prompts.push([`What percentage of fiscal assets should be inherited by the recipient?`, "number", {
                      min: returnSafeNumber(`inherit_money_minimum`, 0),
                      max: returnSafeNumber(`inherit_money_maximum`, 100)
                    }]);

                    local_ui.seize_resources_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `inherit_money` }
                    );
                  }

                  //Goods prompts
                  for (var x = 0; x < all_local_effects.length; x++)
                    if (!default_keys.includes(all_local_effects[x])) {
                      var potential_good_type = all_local_effects[x].split("_")[1];

                      var good_type = getGood(potential_good_type);

                      if (good_type) {
                        local_ui.prompts.push([`What percentage of ${(good_type.name) ? good_type.name : potential_resource_type} would you like to inherit from the target country? (by percentage)`, "number", {
                          min: returnSafeNumber(`minimum_${potential_good_type}_allowed`, 0),
                          max: returnSafeNumber(`maximum_${potential_good_type}_allowed`, 100);
                        }]);

                        local_ui.seize_resources_prompts.push(
                          { index: local_ui.prompts.length - 1, type: `seize_${potential_good_type}` }
                        );
                      }
                    }

                  //Recipient prompt
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Whom should the recipient of these reparations be? You may choose any country.`, "mention"]);

                    local_ui.seize_resources_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `recipient` }
                    );
                  }

                  break;
                case "steer_trade":
                  //Target prompt
                  local_ui.prompts.push([`Which enemy country would you like to force into only being able to trade with you? You may choose one of the following countries:\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if target exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`]

                      //Check to see if target is an enemy
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `**${ot_user.name}** is not currently on the opposing side of this conflict! You can't force neutral/allied countries into trading with you.`];
                    }
                  }]);

                  local_ui.steer_trade_prompts = [
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ];

                  //Recipient prompt
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Whom would you like to be the recipient of this compact? You may choose any nation, so long as it is not the same nation you are forcing to trade.`, "mention", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var ot_user_id = returnMention(input);
                        var target_user_id = returnMention(arg[arg.length - 1]);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var actual_target_id = main.global.user_map[target_user_id];

                        //Check to see if they're the same
                        if (actual_ot_user_id == actual_target_id)
                          return [false, `You can't force a country into trading with itself! Pick another country to force this nation into trading with.`];
                      }
                    }]);

                    local_ui.steer_trade_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `recipient` }
                    );
                  }

                  //Turns prompt
                  if (local_value.minimum_turns_allowed || local_value.maximum_turns_allowed) {
                    local_ui.prompts.push([`For how many turns should this trade agreement be binding?`, "number", {
                      min: returnSafeNumber(local_value.minimum_turns_allowed, 1),
                      max: returnSafeNumber(local_value.maximum_turns_allowed, 100)
                    }]);

                    local_ui.steer_trade_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `duration` }
                    );
                  }

                  break;
                case "syphon_actions":
                  //Target prompt
                  local_ui.prompts.push([`Which enemy nation would you like to syphon actions from? You may choose one of the following countries:\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if target exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`]

                      //Check to see if target is an enemy
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `**${ot_user.name}** is not currently on the opposing side of this conflict! You can't syphon actions from neutral/allied nations.`];
                    }
                  }]);

                  local_ui.syphon_actions_prompts = [
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ];

                  //Recipient prompt
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Which country should be the recipient of these action obligations? You may choose any country, so long as it is not the same country you are syphoning actions from.`, "mention", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var ot_user_id = returnMention(input);
                        var target_user_id = returnMention(arg[arg.length - 1]);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var actual_target_id = main.global.user_map[target_user_id];

                        //Check to see if they're the same
                        if (actual_ot_user_id == actual_target_id)
                          return [false, `You can't syphon a country's actions to themselves! How would that even work?`];
                      }
                    }]);

                    local_ui.syphon_actions_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `recipient` }
                    );
                  }

                  //Amount prompt (number)
                  if (local_value.minimum_number_allowed || local_value.maximum_number_allowed) {
                    local_ui.prompts.push([`How many actions should be syphoned from this country turnly?`, "number", {
                      min: returnSafeNumber(local_value.minimum_number_allowed, 0),
                      max: returnSafeNumber(local_value.maximum_number_allowed, 1000000)
                    }]);

                    local_ui.syphon_actions_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `number` }
                    );
                  }

                  //Amount prompt (percentage), overrides number
                  if (local_value.minimum_percentage_allowed || local_value.maximum_percentage_allowed) {
                    local_ui.prompts.push([`How many percent of this country's actions should be syphoned off per turn? Note that this overrides absolute amounts whenever higher during a given turn.`, "number", {
                      min: returnSafeNumber(local_value.minimum_number_allowed, 0),
                      max: returnSafeNumber(local_value.maximum_number_allowed, 100)
                    }]);

                    local_ui.syphon_actions_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `percentage` }
                    );
                  }

                  //Turns prompt
                  if (local_value.minimum_turns_allowed || local_value.maximum_turns_allowed) {
                    local_ui.prompts.push([`For how many turns should this clause be binding?`, "number", {
                      min: returnSafeNumber(local_value.minimum_turns_allowed, 1),
                      max: returnSafeNumber(local_value.maximum_turns_allowed, 100)
                    }]);

                    local_ui.syphon_actions_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `duration` }
                    );
                  }

                  break;
                case "war_reparations":
                  //Target prompt
                  local_ui.prompts.push([`Whom would you like to force war reparations upon? You may choose one of the following countries:\n- ${enemy_countries.join("\n- ")}`, "mention", {
                    limit: function (user_id, arg, input) {
                      //Declare local instance variables
                      var ot_user_id = returnMention(input);

                      var actual_ot_user_id = main.global.user_map[ot_user_id];
                      var ot_user = main.users[actual_ot_user_id];

                      //Check to see if target exists
                      if (!ot_user)
                        return [false, `The country you have specified, **${input}**, turned out to be entirely nonexistent! Please select from the above list.`]

                      //Check to see if target is an enemy
                      if (!war_obj.enemy_side.includes(actual_ot_user_id))
                        return [false, `**${ot_user.name}** is not currently on the opposing side of this conflict! You can't force neutral/allied countries to pay war reparations`];
                    }
                  }]);

                  local_ui.war_reparations_prompts = [
                    { index: local_ui.prompts.length - 1, type: `target` }
                  ]

                  //Recipient prompt
                  if (local_value.custom_recipient) {
                    local_ui.prompts.push([`Whom should these payments be conferred upon? You may choose any country, so long as it is not the same as the debtor nation.`, "mention", {
                      limit: function (user_id, arg, input) {
                        //Declare local instance variables
                        var ot_user_id = returnMention(input);
                        var target_user_id = returnMention(arg[arg.length - 1]);

                        var actual_ot_user_id = main.global.user_map[ot_user_id];
                        var actual_target_id = main.global.user_map[target_user_id];

                        //Check to see if they're the same
                        if (actual_ot_user_id == actual_target_id)
                          return [false, `You can't have a country pay war reparations to themselves!`];
                      }
                    }]);

                    local_ui.war_reparations_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `recipient` }
                    );
                  }

                  //Turns prompt
                  if (local_value.minimum_turns_allowed || local_value.maximum_turns_allowed) {
                    local_ui.prompts.push([`For how many turns should this be binding?`, "number", {
                      min: returnSafeNumber(local_value.minimum_turns_allowed, 1),
                      max: returnSafeNumber(local_value.maximum_turns_allowed, 100)
                    }]);

                    local_ui.war_reparations_prompts.push(
                      { index: local_ui.prompts.length - 1, type: `duration` }
                    );
                  }

                  break;
              }
            }
          } else {
            //Automatically add wargoal to peace treaty without any additional arguments
          }
        } else {
          //Print error
          printError(game_obj.id, `You have already added the maximum number of **${wargoal_obj.name}** wargoals possible on this peace treaty!`);

          reload_ui = true;
        }
      } else
        switch (current_wargoal) {
          case "back":
            module.exports.modifyPeaceTreaty(user_id, peace_obj, true);

            break;
          default:
            //Print error
            printError(game_obj.id, `**${current_wargoal}** is not a valid wargoal you can add to this conflict!`);
            reload_ui = true;

            break;
        }

      if (reload_ui)
        setTimeout(function(){
          module.exports.initialiseAddWargoal(user_id, peace_obj);
        }, 3000);
    });
  },

  initialiseAnnexAll: function (arg0_user, arg1_peace_treaty_object, arg2_owner_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;
    var owner = arg2_owner_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Full Annexation Request For **${main.users[owner].name}**:`,
      prompts: [
        [`Which enemy country in this conflict would you like to be fully annexed by **${main.users[owner].name}**?\n${enemy_countries.join("\n- ")}\n\nType **[Back]** to add a different annexation request.`, "mention"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      //Check to make sure the enemy country exists and is a belligerent
      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];

        if (war_obj[enemy_side].includes(arg[0])) {
          if (arg[0] != owner) {
            //Check to make sure that this country is not already going to be fully annexed by another user
            if (peace_obj.peace_demands.annexation) {
              var all_demands = Object.keys(peace_obj.peace_demands.annexation);

              for (var i = 0; i < all_demands.length; i++) {
                var local_demand = peace_obj.peace_demands.annexation[all_demands[i]];

                if (local_demand.annex_all)
                  if (local_demand.annex_all.includes(arg[0]))
                    has_error = [true, `**${local_user.name}** is already proposed to be annexed by **${main.users[local_demand.id].name}**! Consider removing this wargoal first before trying again.`];
              }
            }

            if (!has_error[0]) {
              //Add demand
              if (peace_obj.peace_demands.annexation)
                if (peace_obj.peace_demands.annexation[owner])
                  if (peace_obj.peace_demands.annexation[owner].annex_all)
                    peace_obj.peace_demands.annexation[owner].annex_all.push(arg[0]);
                  else
                    peace_obj.peace_demands.annexation[owner].annex_all = [arg[0]];
                else
                  peace_obj.peace_demands.annexation[owner] = {
                    id: owner,
                    annex_all: [arg[0]]
                  };
              else
                peace_obj.peace_demands.annexation = {
                  [owner]: {
                    id: owner,
                    annex_all: [arg[0]]
                  }
                }

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} Your peace delegation has successfully motioned for a full annexation of **${local_user.name}** on behalf of **${main.users[owner].name}**.`);

              //Go back to the starting menu after one second
              setTimeout(function(){
                module.exports.initialiseAddWargoal(user_id, peace_obj);
              }, 1000);
            }
          } else {
            has_error = [true, `You cannot make **${local_user.name}** annex themselves!`];
          }
        } else {
          has_error = [true, `**${local_user.name}** is not currently fighting you in this conflict! Are you sure they aren't fighting you in a different conflict you're currently in?`];
        }
      } else {
        has_error = [true, `The country you are trying to fully absorb into another nation doesn't even exist!`];
      }

      //Error handler
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseAnnexAll(user_id, peace_obj, owner);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseAnnexation(user_id, peace_obj);
          return true;

          break;
      }
    });
  },

  initialiseAnnexation: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Annexation Request:`,
      prompts: [
        [`For which country would you like to motion an annexation request for?\nNote: You can choose any country (even if they are currently at war with you), so long as they are not the same country you are annexing provinces from.\n\nType **[Back]** to add a different wargoal to this peace treaty.`, "mention"],
        [`What type of request would you like to file? Type either 'full annexation' to demand a full annexation, or 'partial annexation' to annex only some provinces off of this country.\n\nType **[Back]** to add a different wargoal to this peace treaty.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      //Check to make sure that the annexing country actually exists
      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];

        //Check to make sure that they are filing a valid request
        switch (arg[1].trim().toLowerCase()) {
          case "back":
            module.exports.modifyPeaceTreaty(user_id, peace_obj, true);

            break;
          case "full annexation":
            //Print user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully filed a motion for the full annexation of a belligerent nation to **${local_user.name}**.`);

            setTimeout(function(){
              module.exports.initialiseAnnexAll(user_id, peace_obj, arg[0]);
            }, 1000);

            break;
          case "partial annexation":
            //Print user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully filed a motion for the partial annexation of a belligerent nation to **${local_user.name}**.`);

            setTimeout(function(){
              module.exports.initialiseDemandProvinces(user_id, peace_obj, arg[0]);
            }, 1000);

            break;
          default:
            has_error = [true, `You must file a valid request for either the 'partial annexation' or 'full annexation' of a belligerent user!`];

            break;
        }
      } else {
        has_error = [true, `The country you are trying to file an annexation request for doesn't even exist!`];
      }

      //Error handler
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseAnnexation(user_id, peace_obj);
        }, 3000);
      }
    });
  },

  initialiseCutDownToSize: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Cut Down To Size:`,
      prompts: [
        [`Which of your enemies would you like to cut down to size? Cutting down to size removes up to **90%** of their military from the equation.\n${enemy_countries.join("\n- ")}\n\nType **[Back]** to go back to the previous wargoal menu.`, "mention"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];

        if (war_obj[enemy_side].includes(arg[0])) {
          if (peace_obj.peace_demands.cut_down_to_size)
            if (peace_obj.peace_demands.cut_down_to_size.includes(arg[0]))
              has_error = [true, `You have already demanded that **${local_user.name}** cut down the size of their armed forces by **90%!** If you wish to remove this wargoal instead, type **[Back]** and then **[Remove Wargoal]**.`];

          if (!has_error[0]) {
            //Set demand
            if (peace_obj.peace_demands.cut_down_to_size)
              peace_obj.peace_demands.cut_down_to_size.push(arg[0]);
            else
              peace_obj.peace_demands.cut_down_to_size = [arg[0]];

            //Print user feedback
            printAlert(game_obj.id, `${config.icons.checkmark} You have successfully demanded that **${local_user.name}** trim down their armed forces by **90%**.`);

            //Go back to the starting menu after one second
            setTimeout(function(){
              module.exports.initialiseAddWargoal(user_id, peace_obj);
            }, 1000);
          }
        } else {
          has_error = [true, `You are not currently at war with **${local_user.name}** in this conflict! Please pick a valid belligerent to cut down to size from.`];
        }
      } else {
        has_error = [true, `You cannot cut a fictional army down to size! Please choose an actual enemy belligerent fighting in the war next time.`];
      }

      //Error handler
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseCutDownToSize(user_id, peace_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.modifyPeaceTreaty(user_id, peace_obj, true);
          return true;

          break;
      }
    });
  },

  initialiseDemandProvinces: function (arg0_user, arg1_peace_treaty_object, arg2_owner_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;
    var owner = arg2_owner_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visualPrompt()
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Demand Provinces:`,
      prompts: [
        [`Which provinces would you like to demand for this nation?\nPlease separate each province with a space like so: '4702 4703 4709'.\n\nType **[Back]** to add a different annexation request instead.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var all_provinces = arg[0].trim().split(" ");
      var has_error = []; //[error_array]
      var local_user = main.users[owner];

      var neutral_provinces = [];
      var nonexistent_provinces = [];
      var same_country = [];

      //Check to make sure that all provinces exist
      for (var i = 0; i < all_provinces.length; i++)
        if (!main.provinces[all_provinces[i]])
          nonexistent_provinces.push(all_provinces[i]);
        else {
          var local_province = main.provinces[all_provinces[i]];

          //Check to see whether the owner of the province is actually a valid enemy
          if (!war_obj[enemy_side].includes(local_province.owner))
            neutral_provinces.push(all_provinces[i]);

          //Check to see if the province is going to the same owner
          if (local_province.owner == owner)
            same_country.push(all_provinces[i]);

          //Check to see whether the province is already included in an existing annexation demand
          if (peace_obj.peace_demands.annexation) {
            var all_demands = Object.keys(peace_obj.peace_demands.annexation);

            for (var x = 0; x < all_demands.length; x++) {
              var local_demand = peace_obj.peace_demands.annexation[all_demands[x]];

              if (local_demand.annex_all)
                if (local_demand.annex_all.includes(local_province.owner))
                  has_error.push(`**${main.users[local_province.owner].name}** is already going to be fully annexed by **${main.users[local_demand.id].name}** in the current peace treaty!`);
            }
          }
        }

      //Check to make sure that user is demanding more than 0 provinces
      if (all_provinces.length == 0)
        has_error.push(`You can't demand zero provinces from an enemy country!`);

      //If no errors are present, set the object to properly demand all provinces from all_provinces
      if (has_error.length + neutral_provinces.length + nonexistent_provinces.length + same_country.length == 0)
        if (peace_obj.peace_demands.annexation)
          if (peace_obj.peace_demands.annexation[owner])
            peace_obj.peace_demands.provinces = unique(all_provinces);
          else
            peace_obj.peace_demands.annexation[owner] = {
              id: owner,
              provinces: unique(all_provinces)
            };
        else
          peace_obj.peace_demands.annexation = {
            [owner]: {
              id: owner,
              provinces: unique(all_provinces)
            }
          };

      //Return user feedback
      printAlert(game_obj.id, `${config.icons.checkmark} You have successfully added an annexation request on the behalf of **${local_user.name}** for the provinces of **${parseList(unique(all_provinces))}**.`);

      //Go back to the starting menu after one second
      setTimeout(function(){
        module.exports.initialiseAddWargoal(user_id, peace_obj);
      }, 1000);

      //Error handler
      if (has_error.length + neutral_provinces.length + nonexistent_provinces.length + same_country.length > 0) {
        printError(game_obj.id, `Your petition to add an annexation request on the behalf of **${local_user.name}** failed for the following reasons:${has_error.join("\n - ")}${(neutral_provinces.length > 0) ? `\n- The following provinces don't even belong to any enemy belligerents! ${neutral_provinces.join(", ")}` : ``}${(nonexistent_provinces.length > 0) ? `\n- Your cartographers are currently puzzling over your maps, as the following provinces don't even exist! ${nonexistent_provinces.join(", ")}` : ``}${(same_country.length > 0) ? `\n- You are currently trying to cede the following provinces to the same country! ${same_country.join(", ")}` : ``}`);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseDemandProvinces(user_id, peace_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseAnnexation(user_id, peace_obj);
          return true;

          break;
      }
    });
  },

  initialiseInstallGovernment: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch friendly_side and enemy_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Install Government:`,
      prompts: [
        [`Whom would you like to force a change of government for? Please mention one of the following belligerent countries:\n${enemy_countries.join("\n- ")}`, "mention"],
        [`Which government type would you like to install in place of their current regime?\n\nType **[Back]** to go back to the main Add Wargoal menu.\nType **[View Governments]** for a full list of available governments.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var government_type = getGovernment(arg[1].trim().toLowerCase());
      var has_error = [false, ""]; //[has_error, error_msg];
      var raw_government_type = getGovernment(arg[1].trim().toLowerCase(), { return_key: true });

      if (government_type) {
        if (main.users[arg[0]]) {
          var local_user = main.users[arg[0]];

          if (war_obj[enemy_side].includes(arg[0])) {
            if (!government_type.is_anarchy) {
              if (usr.available_governments.includes(raw_government_type)) {
                if (!peace_obj.peace_demands.install_government)
                  peace_obj.peace_demands.install_government = {};

                //Set new regime change
                peace_obj.peace_demands.install_government[arg[0]] = {
                  id: arg[0],
                  type: raw_government_type
                };

                //Print user feedback
                printAlert(game_obj.id, `${config.icons.checkmark} You have succcessfully demanded that **${local_user.name}** change their government type to **${(government_type.name) ? government_type.name : arg[1]}**.`);

                //Go back to the starting wargoal menu after one second
                setTimeout(function(){
                  module.exports.initialiseAddWargoal(user_id, peace_obj);
                }, 1000);
              } else {
                has_error = [true, `Your people have never even heard of the concept of **${(government_type.name) ? government_type.name : raw_government_type}** yet, let alone installing it in foreign countries!`];
              }
            } else {
              has_error = [true, `You cannot install anarchy in a foreign country!`];
            }
          } else {
            has_error = [true, `You are not currently at war with **${local_user.name}** in this conflict! Please check for a list of valid belligerents`];
          }
        } else {
          has_error = [true, `The country you are attempting to force a regime change in doesn't even exist!`];
        }
      } else {
        has_error = [true, `The government type you have specified does not exist! Please check your **[View Governments]** list for a full list of valid governments to install.`];
      }

      //Error handling
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseInstallGovernment(user_id, peace_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseAddWargoal(user_id, peace_obj);
          return true;

          break;
        case "view governments":
          createPageMenu(game_obj.middle_embed, {
            embed_pages: printGovernmentList(actual_id),
            user: game_obj.user
          });
          return true;

          break;
      }
    });
  },

  initialiseLiberation: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var has_error = [false, ""]; //[has_error, error_msg];
    var game_obj = getGameObject(user_id);
    var vassal_obj = getVassal(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Check if user is already demanding their liberation
    if (vassal_obj) {
      if (war_obj[enemy_side].includes(vassal_obj.overlord)) {
        if (!peace_obj.peace_demands.liberation) {
          peace_obj.peace_demands.liberation = true;

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully demanded your liberation from your current overlord, **${main.users[vassal_obj.overlord].name}**.`);

          //Go back to the starting menu after one second
          setTimeout(function(){
            module.exports.initialiseAddWargoal(user_id, peace_obj);
          }, 1000);
        } else {
          has_error = [true, `You have already demanded your liberation from your overlord!`];
        }
      } else {
        has_error = [true, `Your current overlord is not fighting against you in this conflict!`];
      }
    } else {
      has_error = [true, `You can't demand liberation from your overlord if you aren't a puppet of anyone!`];
    }

    //Error handler
    if (has_error[0]) {
      printError(game_obj.id, has_error[1]);

      setTimeout(function(){
        module.exports.initialiseAddWargoal(user_id, peace_obj);
      }, 3000);
    }
  },

  initialiseModifyPeaceTreaty: function (arg0_user, arg1_peace_treaty_object, arg2_tooltip) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;
    var tooltip = (arg2_tooltip) ? arg2_tooltip : "";

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];
    var wargoal_array = [];

    //Create invisible visualPrompt()
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Editing Peace Offer for **${war_obj.name}**:`,
      do_not_cancel: true,
      do_not_display: true,

      prompts: [
        [`Which of the above actions would you like to take?`, "string"]
      ]
    },
    function (arg) {
      switch (arg[0]) {
        case "add wargoal":
          //Bring up a dynamic wargoal handler
          module.exports.initialiseAddWargoal(user_id, peace_obj);

          break;
        case "remove wargoal":
          module.exports.initialiseRemoveWargoal(user_id, peace_obj);

          break;
        case "send peace offer":
        case "send peace treaty":
          sendPeaceTreaty(user_id, peace_obj);

          setTimeout(function(){
            //Catch in-case of unconditional warscore
            try {
              module.exports.modifyPeaceTreaty(user_id, peace_obj, true);
            } catch {}
          }, 3000);

          break;
        case "back":
          module.exports.closePeaceTreaty(user_id);

          break;
        default:
          printError(game_obj.id, `You must specify a valid action to take! **${arg[0]}** was not recognised as a valid action.`);

          setTimeout(function(){
            module.exports.modifyPeaceTreaty(user_id, peace_obj, true);
          }, 3000);

          break;
      }
    });
  },

  initialisePeaceOfferScreen: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Initialise page menu showing peace treaty effects
    createPageMenu(game_obj.alert_embed, {
      embed_pages: splitEmbed(parsePeaceTreatyString(war_obj, peace_obj), {
        title: `[Back] | Editing Peace Offer For **${war_obj.name}**:`,
        description: [
          `---`,
          "",
          `**[Add Wargoal]**${(Object.keys(peace_obj.peace_demands).length > 0) ? ` | **[Remove Wargoal]**` : ""} | **[Send Peace Offer]**\n\n`
        ],
        title_pages: true,
        fixed_width: true
      }),
      user: user_id
    });
  },

  initialisePuppet: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_countries = [];
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy/friendly countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);
    for (var i = 0; i < war_obj[friendly_side].length; i++)
      friendly_countries.push(`**${main.users[war_obj[friendly_side][i]].name}**`);

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Puppet A Nation:`,
      prompts: [
        [`Which belligerent nation would you like to assign as a puppet? Please choose one of the following countries:\n${enemy_countries.join("\n- ")}\n\nType **[Back]** to go back to the previous wargoal menu.`, "mention"],
        [`Whom would you like to become their new overlord? Please choose one of the following countries:\n${friendly_countries.join("\n- ")}\n\nType **[Back]** to go back to the previous wargoal menu.`, "mention"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      //Check if user even exists
      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];

        if (war_obj[enemy_side].includes(arg[0])) {
          if (main.users[arg[1]]) {
            var local_overlord = main.users[arg[1]];

            if (war_obj[friendly_side].includes(arg[1])) {
              if (peace_obj.peace_demands.puppet)
                peace_obj.peace_demands.puppet = {
                  [arg[0]]: {
                    id: arg[0],
                    overlord: arg[1]
                  }
                };
              else
                peace_obj.peace_demands.puppet[arg[0]] = {
                  id: arg[0],
                  overlord: arg[1]
                };

              //Print user feedback
              printAlert(game_obj.id, `${config.icons.checkmark} You have successfully mandated that **${local_user.name}** should become the puppet of **${local_overlord.name}** after the end of the war.`);

              //Go back to the starting menu after one second
              setTimeout(function(){
                module.exports.initialiseAddWargoal(user_id, peace_obj);
              }, 1000);
            } else {
              has_error = [true, `You can only give puppets to co-combatants of the conflict you're in, not some random countries!`];
            }
          } else {
            has_error = [true, `The country you are trying to assign as **${local_user.name}**'s overlord doesn't even exist! Please assign a valid co-combatant as their overlord.`];
          }
        } else {
          has_error = [true, `**${local_user.name}** is not currently fighting against you in this war!`];
        }
      } else {
        has_error = [true, `The country you are trying to puppet doesn't even exist! Please choose a valid enemy belligerent next time.`];
      }

      //Error handler
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialisePuppet(user_id, peace_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseAddWargoal(user_id, peace_obj);
          return true;

          break;
      }
    });
  },

  initialiseRemoveAnnexation: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var has_annexation_demands = [];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Initialise enemy_countries
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Add all demanding countries to display
    if (peace_obj.peace_demands.annexation) {
      var all_demands = Object.keys(peace_obj.peace_demands.annexation);

      for (var i = 0; i < all_demands.length; i++)
        has_annexation_demands.push(`**${main.users[all_demands[i]].name}**`);
    }

    //Send visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Remove Annexation Demand:`,
      prompts: [
        [`Which of the following nations would you like to revoke an annexation demand for?${has_annexation_demands.join(", ")}.\n\nType **[Back]** to remove a different wargoal.`, "mention"],
        [`What type of demand would you like to remove from this annexation wargoal? Type either 'partial annexation', 'full annexation', or 'all' to wipe the slate clean.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      //Check to see if the user even exists
      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];
        var wargoal_type = arg[1].trim().toLowerCase();

        if (local_demands.annexation)
          if (local_demands.annexation[arg[0]]) {
            var local_demand = local_demands.annexation[arg[0]];

            //Make sure that the type is valid
            switch (wargoal_type) {
              case "all":
                //Print user feedback
                printAlert(game_obj.id, `${config.icons.cb} You have removed **${local_user.name}**'s claim to any territory of any enemy belligerent in this peace offer!`);

                delete local_demands.annexation[arg[0]];

                if (Object.keys(local_demands.annexation[arg[0]]).length == 1)
                  delete local_demands.annexation[arg[0]];

                if (Object.keys(local_demands.annexation).length == 0)
                  delete local_demands.annexation;

                //Go back to viewing the main removeWargoal() menu after this
                setTimeout(function(){
                  module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
                  module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
                }, 1000);

                break;
              case "full annexation":
                if (local_demand.annex_all) {
                  var full_annex_countries = [];

                  for (var i = 0; i < full_annex_countries.length; i++)
                    full_annex_countries.push(`**${main.users[full_annex_countries[i]].name}**`);

                  visualPrompt(game_obj.alert_embed, user_id, {
                    title: `Revoke Full Annexation`,
                    prompts: [
                      [`Whom would you like to spare from full annexation at the hands of **${local_user.name}**? Please choose one of the following countries: ${full_annex_countries.join(", ")}.\n\nType **[Back]** to remove a different type of annexation demand.`, "mention"]
                    ]
                  },
                  function (subarg) {
                    if (main.users[subarg[0]]) {
                      var target_user = main.users[subarg[0]];

                      if (local_demand.annex_all.includes(subarg[0])) {
                        //Print user feedback
                        printAlert(game_obj.id, `${config.icons.cb} You have successfully removed **${local_user.name}**'s request for the full annexation of **${target_user.name}**.`);

                        removeElement(local_demand.annex_all, subarg[0]);

                        if (local_demand.annex_all.length == 0)
                          delete local_demand.annex_all;

                        if (Object.keys(local_demand).length == 1)
                          delete local_demand;

                        if (Object.keys(local_demands.annexation).length == 0)
                          delete local_demands.annexation;

                        //Go back to viewing the peace treaty to see new changes
                        setTimeout(function(){
                          module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
                          module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
                        }, 1000);
                      } else {
                        has_error = [true, `**${local_user.name}** is not currently demanding the outright annexation of **${target_user.name}**!`];
                      }
                    } else {
                      has_error = [true, `The country you are trying to spare from full annexation doesn't even exist! Please take a second look at the list.`];
                    }
                  },
                  function (subarg) {
                    switch (subarg) {
                      case "back":
                        module.exports.initialiseRemoveAnnexation(user_id, peace_obj);

                        return true;
                        break;
                    }
                  });
                } else {
                  has_error = [true, `**${local_user.name}** isn't currently demanding the full annexation of any other country!`];
                }

                break;
              case "partial annexation":
                if (local_demand.provinces) {
                  //Print user feedback
                  printAlert(game_obj.id, `${config.icons.cb} You have successfully removed **${local_user.name}**'s request for **${parseNumber(local_demand.provinces)}** from the enemy side.`);

                  delete local_demand.provinces;

                  if (Object.keys(local_demand).length == 1)
                    delete local_demand;

                  if (Object.keys(local_demands.annexation).length == 0)
                    delete local_demands.annexation;

                  setTimeout(function(){
                    module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
                    module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
                  }, 1000);
                } else {
                  has_error = [true, `**${local_user.name}** is not currently demanding a partial annexation!`];
                }

                break;
              default:
                has_error = [true, `Please type either 'all', 'full annexation', or 'partial annexation'! **${arg[1]}** could not be recognised as one of these potential demands.`];

                break;
            }
          } else
            has_error = [true, `**${local_user.name}** doesn't have any annexation demands associated with it!`];
        else
          has_error = [true, `I don't even know how you managed to do that, but you can't remove an annexation demand when nobody's demanding one!`];
      } else {
        has_error = [true, `The country you are trying to remove an annexation for isn't even on the map!`];
      }

      //Error handling
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        setTimeout(function(){
          module.exports.initialiseRemoveAnnexation(user_id, peace_obj);
        }, 3000);
      }
    },
    function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialiseRemoveWargoal(user_id, peace_obj);
          return true;

          break;
      }
    });
  },

  initialiseRemoveCutDownToSize: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var has_error = [false, ""]; //[has_error, error_msg];
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Check to make sure that these demands exist in the first place
    if (peace_obj.peace_demands.cut_down_to_size) {
      var all_cut_down_to_size_display = [];

      for (var i = 0; i < peace_obj.peace_demands.cut_down_to_size.length; i++)
        all_cut_down_to_size_display.push(`**${main.users[peace_obj.peace_demands.cut_down_to_size[i]].name}**`);

      //Initialise visualPrompt
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Remove Cut Down To Size Demand:`,
        prompts: [
          [`Which of these countries would you like to drop a cut down to size wargoal against?${all_cut_down_to_size_display.join(", ")}`, "mention"]
        ]
      },
      function (arg) {
        //Check to see if the user even exists
        if (main.users[arg[0]]) {
          var local_user = main.users[arg[0]];

          if (peace_obj.peace_demands.cut_down_to_size.includes(arg[0])) {
            //Print user feedback
            printAlert(game_obj.id, `${config.icons.cb} You have successfully dropped the demand for **${local_user.name}** to cut down the size of their armed forces by **90%**.`);

            //Change data structure
            removeElement(peace_obj.peace_demands.cut_down_to_size, arg[0]);

            if (peace_obj.peace_demands.cut_down_to_size.length == 0)
              delete peace_obj.peace_demands.cut_down_to_size;

            //Wait one second before sending the user back to the peace treaty viewer
            setTimeout(function(){
              module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
              module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
            }, 1000);
          } else {
            has_error = [true, `You aren't currently attempting to force **${local_user.name}** to get rid of their military!`];
          }
        } else {
          has_error = [true, `You can't force a nonexistent nation to cut down their military size!`];
        }
      })
    } else {
      has_error = [true, `You aren't currently demanding that anyone cut their military down to size on the opposing end!`];
    }

    //Error handler
    if (has_error[0]) {
      printError(game_obj.id, has_error[1]);

      setTimeout(function(){
        module.exports.initialiseRemoveCutDownToSize(user_id);
      }, 3000);
    }
  },

  initialiseRemoveInstallGovernment: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    if (peace_obj.peace_demands.install_government) {
      var all_regime_changes = Object.keys(peace_obj.peace_demands.install_government);
      var regime_change_display = [];

      for (var i = 0; i < all_regime_changes.length; i++)
        regime_change_display.push(`**${main.users[all_regime_changes[i]].name}**`);

      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Remove Regime Change:`,
        prompts: [
          `Which of these countries would you like to drop a regime change against? ${regime_change_display.join(", ")}.\n\nType **[Back]** to remove a different peace demand.`, "mention"
        ],
        do_not_cancel: true
      },
      function (subarg) {
        var error_msg = [false, ""]; //[has_error, error_msg];

        if (main.users[subarg[0]]) {
          var local_user = main.users[subarg[0]];

          if (all_regime_changes.includes(subarg[0])) {
            var local_demand = peace_obj.peace_demands.install_government[subarg[0]];

            //Remove regime change, but print user feedback first
            printAlert(game_obj.id, `${config.icons.cb} You have successfully dropped the demand for **${local_user.name}** to change their government type to **${(getGovernment(local_demand.type).name) ? getGovernment(local_demand.type).name : ""}`);

            delete local_demand;

            if (Object.keys(peace_obj.peace_demands.install_government).length == 0)
              delete peace_obj.peace_demands.install_government;

            setTimeout(function(){
              module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
              module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
            }, 1000);
          } else {
            error_msg = [true, `You aren't currently demanding a regime change for **${local_user.name}**!`];
          }
        } else {
          error_msg = [true, `The user you are trying to drop a regime change against doesn't even exist!`];
        }
      },
      function (subarg) {
        switch (subarg) {
          case "back":
            module.exports.initialiseRemoveWargoal(user_id, peace_obj);
            return true;

            break;
        }
      });
    } else {
      error_msg = [true, `You aren't currently forcing any regime changes upon the enemy!`];
    }

    //Error handling
    if (error_msg[0]) {
      printError(game_obj.id, error_msg[1]);

      setTimeout(function(){
        module.exports.initialiseRemoveInstallGovernment(user_id, peace_obj);
      }, 3000);
    }
  },

  initialiseRemovePuppet: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var has_error = [false, ""]; //[has_error, error_msg];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    if (peace_obj.peace_demands.puppet) {
      var all_puppets = Object.keys(peace_obj.peace_demands.puppet);
      var all_puppet_names = [];

      for (var i = 0; i < all_puppets.length; i++)
        all_puppet_names.push(`**${main.users[all_puppets[i]].name}**`);

      //Send visual prompt
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Remove Puppet Wargoal:`,
        prompts: [
          [`Which of the following countries would you like to free from the grips of a potential puppeting?\n${all_puppet_names.join(", ")}\n\nType **[Back]** to remove a different wargoal.`, "mention"]
        ],
        do_not_cancel: true
      },
      function (arg) {
        //Check to see if the user even exists
        if (main.users[arg[0]]) {
          var local_user = main.users[arg[0]];

          if (peace_obj.peace_demands.puppet[arg[0]]) {
            var local_demand = peace_obj.peace_demands.puppet[arg[0]];

            //Print feedback
            printAlert(game_obj.id, `${config.icons.cb} You have successfully dropped a vassalisation request for **${local_user.name}** to become the puppet of **${main.users[local_demand.overlord].name}**.`);

            //Delete puppet request
            delete local_demand;

            if (Object.keys(peace_obj.peace_demands.puppet).length == 0)
              delete peace_obj.peace_demands.puppet;

            //Go back to the main peace treaty screen
            setTimeout(function(){
              module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
              module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
            }, 1000);
          } else {
            has_error = [true, `**${local_user.name}** isn't currently being held hostage for puppeting!`];
          }
        } else {
          has_error = [true, `What sort of nation is that? You can only pick from extant nations, you know.`];
        }
      },
      function (arg) {
        switch (arg) {
          case "back":
            module.exports.initialiseRemoveWargoal(user_id, peace_obj);
            return true;

            break;
        }
      });
    } else {
      has_error = [true, `Your peace offer doesn't currently include any wargoals to puppet anyone!`];
    }

    //Error handling
    if (has_error[0]) {
      printError(game_obj.id, has_error[1]);

      setTimeout(function(){
        module.exports.initialiseRemovePuppet(user_id, peace_obj);
      }, 3000);
    }
  },

  initialiseRemoveWargoal: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_wargoal_array = [];
    var enemy_side = "";
    var friendly_side = "";
    var has_error = [false, ""]; //[has_error, error_msg];
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];
    var wargoal_array = [];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Fetch a list of available wargoals
    for (var i = 0; i < war_obj.wargoals.length; i++)
      wargoal_array.push(`${(war_obj.wargoals.length - 1 == i) ? "or ": ""}**${(config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]}**`);
    for (var i = 0; i < war_obj.wargoals.length; i++)
      actual_wargoal_array.push(((config.localisation[war_obj.wargoals[i]]) ? config.localisation[war_obj.wargoals[i]] : war_obj.wargoals[i]).toLowerCase());

    //Send visual_prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Remove Wargoal From Peace Treaty:`,
      prompts: [
        [`Which type of wargoal would you like to remove from this peace treaty?\n\nPlease type either ${wargoal_array.join(", ")}.\n\nTo go back to viewing this peace treaty, type **[Back]**.`, "string"]
      ],
      do_not_cancel: true
    },
    function (arg) {
      var current_wargoal = arg[0].trim().toLowerCase();

      if (actual_wargoal_array.includes(current_wargoal))
        switch (current_wargoal) {
          //[WIP] - Add wargoal handler so that users can't go around removing empty wargoals
          case "status_quo":
            if (peace_obj.peace_demands.status_quo) {
              delete peace_obj.peace_demands.status_quo;

              printAlert(game_obj.id, `${config.icons.cb} You have successfully removed your demand for the enemy to pay **15%** in war reparations to cocombatant countries.`);

              setTimeout(function(){
                module.exports.initialiseRemoveWargoal(user_id, peace_obj);
              }, 1000);
            } else {
              has_error = [true, `You aren't currently demanding any war reparations from the enemy!`];
            }

            break;
          case "install government":
            module.exports.initialiseInstallGovernment(user_id, peace_obj);

            break;
          case "cut down to size":
            module.exports.initialiseCutDownToSize(user_id, peace_obj);

            break;
          case "liberation":
            if (peace_obj.peace_demands.liberation) {
              var vassal_obj = getVassal(actual_id);

              delete peace_obj.peace_demands.liberation;

              printAlert(game_obj.id, `${config.icons.cb} You are no longer demanding your liberation from your overlord, **${main.users[vassal_obj.overlord].name}**.`);

              setTimeout(function(){
                module.exports.initialiseRemoveWargoal(user_id, peace_obj);
              }, 1000);
            } else {
              has_error = [true, `You aren't currently demanding your liberation from the enemy!`];
            }
          case "retake cores":
            module.exports.initialiseRemoveRetakeCores(user_id, peace_obj);

            break;
          case "annexation":
            module.exports.initialiseRemoveAnnexation(user_id, peace_obj);

            break;
        }
      else
        switch (current_wargoal) {
          case "back":
            module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
            module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);

            break;
          default:
            //Print error
            has_error = [true, `**${current_wargoal}** is not a valid wargoal you can remove from this conflict!`];

            break;
        }

      //Error handler
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        setTimeout(function(){
          module.exports.initialiseRemoveWargoal(user_id, peace_obj);
        }, 3000);
      }
    });
  },

  initialiseRemoveRetakeCores: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_side = "";
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var has_error = [false, ""]; //[has_error, error_msg]
    var war_obj = main.global.wars[peace_obj.war_id];

    //Fetch a list of all enemies
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Check if the user even has this type of wargoal active
    if (peace_obj.peace_demands.retake_cores) {
      var retake_cores = Object.keys(peace_obj.peace_demands.retake_cores);
      var retake_cores_display = [];

      for (var i = 0; i < retake_cores.length; i++)
        retake_cores_display.push(`**${main.users[retake_cores[i]].name}**`);

      //Send visual prompt
      visualPrompt(game_obj.alert_embed, user_id, {
        title: `Revoke Demand To Retake Cores:`,
        prompts: [
          [`Which of the following countries would you like to no longer regain their cores as a result of this peace treaty?\n${retake_cores_display.join(", ")}\n\nType **[Back]** to remove a different wargoal from the eventual peace offer.`, "mention"]
        ],
        do_not_cancel: true
      },
      function (arg) {
        //Check to see if the user even exists
        if (main.users[arg[0]]) {
          var local_user = main.users[arg[0]];

          if (peace_obj.peace_demands.retake_cores.includes(arg[0])) {
            //Print user feedback first
            printAlert(game_obj.id, `${config.icons.cb} You have successfully dropped your demand that **${local_user.name}** regain their cores from the enemy.`);

            //Change data structure
            removeElement(peace_obj.peace_demands.retake_cores, arg[0]);

            if (Object.keys(peace_obj.peace_demands.retake_cores).length == 0)
              delete peace_obj.peace_demands.retake_cores;

            //Send the user back to the peace negotiation screen
            setTimeout(function(){
              module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
              module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
            }, 1000);
          } else {
            has_error = [true, `You aren't currently demanding that **${local_user.name}** receive their core homelands back from the enemy!`];
          }
        } else {
          has_error = [true, `You can't revoke a demand on behalf of a nonexistent nation!`];
        }
      },
      function (arg) {
        switch (arg) {
          case "back":
            module.exports.removeWargoal(user_id, peace_obj);
            return true;

            break;
        }
      })
    } else {
      has_error = [true, `You aren't currently looking for anyone to regain their cores!`];
    }

    //Error handler
    if (has_error[0]) {
      printError(game_obj.id, has_error[1]);

      setTimeout(function(){
        module.exports.initialiseRemoveRetakeCores(user_id, peace_obj);
      }, 3000);
    }
  },

  initialiseRetakeCores: function (arg0_user, arg1_peace_treaty_object) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var enemy_countries = [];
    var enemy_side = "";
    var friendly_countries = [];
    var friendly_side = "";
    var game_obj = getGameObject(user_id);
    var war_obj = main.global.wars[peace_obj.war_id];

    //Determine enemy_side and friendly_side
    if (war_obj.attackers.includes(actual_id)) {
      friendly_side = "attackers";
      enemy_side = "defenders";
    }
    if (war_obj.defenders.includes(actual_id)) {
      friendly_side = "defenders";
      enemy_side = "attackers";
    }

    //Add all enemy/friendly countries to display
    for (var i = 0; i < war_obj[enemy_side].length; i++)
      enemy_countries.push(`**${main.users[war_obj[enemy_side][i]].name}**`);

    //Send visualPrompt()
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Grant Cores:`,
      mention: [`Whom would you like to grant their cores back to? Please type in the name of a valid nation.\n\nThis country does not have to be a nation associated with this current conflict.`, "mention"]
    },
    function (arg) {
      var has_error = [false, ""]; //[has_error, error_msg];

      if (main.users[arg[0]]) {
        var local_user = main.users[arg[0]];

        //Check if user is already intending on giving cores back to this user
        if (peace_obj.peace_demands.retake_cores)
          if (peace_obj.peace_demands.retake_cores.includes(arg[0]))
            has_error = [true, `You have already demanded that **${local_user.name}** get their cores back from enemy belligerents in this war!`];

        if (!has_error[0]) {
          //Add this as a valid demand
          if (peace_obj.peace_demands.retake_cores)
            peace_obj.peace_demands.retake_cores.push(arg[0]);
          else
            peace_obj.peace_demands.retake_cores = [arg[0]];

          //Print user feedback
          printAlert(game_obj.id, `${config.icons.checkmark} You have successfully added a demand that **${local_user.name}** receive their cores back from any enemy belligerents engaged in this current conflict.`);

          //Go back to the starting menu after one second
          setTimeout(function(){
            module.exports.initialiseAddWargoal(user_id, peace_obj);
          }, 1000);
        }
      } else {
        has_error = [true, `You can't grant cores back to a nation that never existed!`];
      }

      //Error handling
      if (has_error[0]) {
        printError(game_obj.id, has_error[1]);

        //Wait 3 seconds before reinitialising prompt
        setTimeout(function(){
          module.exports.initialiseRetakeCores(user_id, peace_obj);
        }, 3000);
      }
    }, function (arg) {
      switch (arg) {
        case "back":
          module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
          module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
          return true;

          break;
      }
    })
  },

  /*
    modifyPeaceTreaty() - Opens up the map in a separate mapmode for showing annexed provinces, with an in-depth province selector

    Also creates a new peace treaty SVG file - should be deleted when peace treaty is parsed
  */
  modifyPeaceTreaty: function (arg0_user, arg1_peace_treaty_object, arg2_change_image) {
    //Convert from parameters
    var user_id = arg0_user;
    var peace_obj = arg1_peace_treaty_object;
    var change_image = arg2_change_image;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var belligerents = [];
    var game_obj = getGameObject(user_id);
    var map_file = `${actual_id}_peace_treaty`;
    var usr = main.users[actual_id];
    var war_obj = main.global.wars[peace_obj.war_id];

    //Cache a new SVG
    if (!change_image)
      loadMap(`${map_file}.svg`, map_file);

    //Shade in the base provinces - but only for the belligerents currently involved in the war
    for (var i = 0; i < war_obj.attackers.length; i++)
      belligerents.push(war_obj.attackers[i]);
    for (var i = 0; i < war_obj.defenders.length; i++)
      belligerents.push(war_obj.defenders[i]);

    for (var i = 0; i < belligerents.length; i++) {
      var local_provinces = getProvinces(belligerents[i], { include_hostile_occupations: true });
      var local_user = main.users[belligerents[i]];

      for (var x = 0; x < local_provinces.length; x++) {
        //Check if province will be annexed (either by retaking cores, or by outright annexation)
        var new_colour = local_user.colour;
        var new_owner = hasProvinceOwnerChange(local_provinces[x].id, peace_obj);

        //Check if province owner is proposed for vassalisation
        if (peace_obj.puppet) {
          var all_demands = Object.keys(peace_obj.puppet);

          for (var y = 0; y < all_demands.length; y++)
            if (all_demands[y] == local_provinces[x].owner) {
              var overlord_obj = main.users[peace_obj.puppet[all_demands[y]].overlord];

              new_colour = [
                Math.min(overlord_obj.colour[0] + 20, 255),
                Math.min(overlord_obj.colour[1] + 20, 255),
                Math.min(overlord_obj.colour[2] + 20, 255),
              ];
            }
        }

        //Check for annexation
        if (new_owner)
          if (new_owner != local_provinces[x].owner)
            new_colour = main.users[new_owner].colour;

        //Shade in province
        setProvinceColour(map_file, local_provinces[x].id, new_colour);
      }
    }

    //Initialise map viewer
    cacheSVG(map_file);

    setTimeout(function(){
      (!change_image) ?
        initialiseMapViewer(game_obj.id, map_file, true) :
        changeImage(game_obj.id, map_file);
    }, 5000);

    //Visual interface using visualPrompt() before creating a page menu
    module.exports.initialiseModifyPeaceTreaty(user_id, peace_obj);
    module.exports.initialisePeaceOfferScreen(user_id, peace_obj);
  }
};
