module.exports = {
  initialiseViewDiplomacy: function (arg0_user, arg1_do_not_change_page) {
    //Convert from parameters
    var user_id = arg0_user;
    var do_not_change_page = arg1_do_not_change_page;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `View Diplomatic Relations:`,
      prompts: [
        [`Which country would you like to view your diplomatic relations with?\n\nType **[View Ledger]** to view a list of valid nations.`, "mention"]
      ]
    },
    function (arg) {
      module.exports.viewDiplomacy(user_id, arg[0]);
      if (!do_not_change_page)
        game_obj.page = `diplomacy_view_${main.global.user_map[arg[0]]}`;
    },
    function (arg) {
      switch (arg) {
        case "view ledger":
          module.exports.printLedger(user_id);
          return true;

          break;
      }
    });
  },

  printDiplomacy: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_good_names = getGoods({ return_names: true });
    var all_pops = Object.keys(config.pops);
    var all_wars = Object.keys(main.global.wars);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var accepted_cultures = getAcceptedCultures(actual_id, { exclude_primary_culture: true });
    var all_vassals = Object.keys(usr.diplomacy.vassals);
    var defensive_wars = 0;
    var enemies = [];
    var offensive_wars = 0;
    var vassal_obj = usr.diplomacy.vassals;

    //Initialise war trackers
    for (var i = 0; i < all_wars.length; i++) {
      var local_war = main.global.wars[all_wars[i]];

      if (local_war.attackers.includes(actual_id)) {
        for (var x = 0; x < local_war.defenders.length; x++)
          enemies.push(main.users[local_war.defenders[x]].name);

        offensive_wars++;
      }

      if (local_war.defenders.includes(actual_id)) {
        for (var x = 0; x < local_war.attackers.length; x++)
          enemies.push(main.users[local_war.attackers[x]].name);

        defensive_wars++;
      }
    }

    //Declare diplomacy_string
    var diplomacy_string = [];

    //War indicator
    (offensive_wars + defensive_wars > 0) ?
      diplomacy_string.push(`${config.icons.land_vehicles} You are currently **at war** with ${parseList(enemies)} in **${parseNumber(offensive_wars)}** wars of aggression, and **${parseNumber(defensive_wars)}** defensive wars.\n- **[View War]** - View statistics on a current conflict.\n`) :
      diplomacy_string.push(`${config.icons.diplomacy} _You are currently at peace._`);

    //Format diplomacy_string
    diplomacy_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}** (${parseNumber(usr.modifiers.political_capital_gain, { display_prefix: true })} per turn)`);

    //Check if user has any vassals or accepted cultures dragging down their gain per turn
    if (all_vassals.length > 0) {
      diplomacy_string.push(`Our **${parseNumber(all_vassals.length)}** vassal(s) are costing us **${parseNumber(getVassalMaintenance(actual_id))}** Political Capital per turn.`);

      for (var i = 0; i < all_vassals.length; i++)
        diplomacy_string.push(`- **${main.users[vassal_obj[all_vassals[i]].id].name}**`);
    }
    if (accepted_cultures.length > 0)
      diplomacy_string.push(`Our **${parseNumber(accepted_cultures.length)}** accepted culture(s) are costing us **${parseNumber(accepted_cultures.length*config.defines.politics.accepted_culture_maintenance_cost)}** Political Capital per turn.`);

    diplomacy_string.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy, { display_float: true })}** (${parseNumber(usr.modifiers.infamy_loss, { display_float: true, display_prefix: true })} per turn)`);

    diplomacy_string.push("");
    diplomacy_string.push(`- **[View CB List]** | **[War List]**`);
    diplomacy_string.push("");
    diplomacy_string.push(config.localisation.divider);
    diplomacy_string.push("");
    diplomacy_string.push(`- **[View Ledger]** | **[View Relations]**`);
    diplomacy_string.push(`- **[Cede Province]** | **[Allow Ceding]** | **[Deny Ceding]**`);
    if (Object.keys(usr.diplomacy.vassals).length > 0) {
      diplomacy_string.push("");
      (!usr.options.vassal_customisation_locked) ?
        diplomacy_string.push(`- **[Lock Vassal Customisation]** | **[Vassal Customisation]**`) :
        diplomacy_string.push(`- **[Unlock Vassal Customisation]** | **[Vassal Customisation]**`);
    }
    diplomacy_string.push("");

    //Cede list
    var allow_cede_names = [];

    for (var i = 0; i < usr.options.allow_ceding.length; i++)
      allow_cede_names.push(`**${main.users[usr.options.allow_ceding[i]].name}**`);

    (usr.options.allow_ceding.length > 0) ?
      diplomacy_string.push(`You currently allow ${allow_cede_names.join(", ")} to cede their provinces to you.`) :
      diplomacy_string.push(`_You are currently not allowing anyone to cede their provinces to you._`);

    //Add sorted ledger of top 10 countries by score
    diplomacy_string.push("");
    diplomacy_string.push("`Name | Score | Army Size | Provinces | Population | Technology`");
    diplomacy_string.push("");

    var sorted_users = getSortedUsers();

    for (var i = 0; i < sorted_users.length; i++) {
      var local_user = main.users[sorted_users[i]];

      if (i < 10)
        diplomacy_string.push(`**${local_user.name}** | ${parseNumber(getScore(sorted_users[i]))} | ${parseNumber(getTotalActiveDuty(sorted_users[i]))} | ${parseNumber(local_user.provinces)} | ${parseNumber(local_user.population)} | ${parseNumber(local_user.researched_technologies.length)}`)
    }

    if (sorted_users.length > 10)
      diplomacy_string.push(`+${parseNumber(sorted_users.length - 10)} more ..`);

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const diplomacy_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Diplomacy:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(diplomacy_string.join("\n"));

    game_obj.main_embed = diplomacy_embed;
    game_obj.main_change = true;
  },

  printLedger: function (arg0_user, arg1_return_split_embed) {
    //Convert from parameters
    var user_id = arg0_user;
    var return_split_embed = arg1_return_split_embed;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[user_id];

    //Declare local instance variables
    var ledger_string = [];
    var sorted_user_array = getSortedUsers();
    var tech_sum = getAllTechnologies().length;

    //Run through sorted_user_array, appending to ledger_string
    ledger_string.push("");

    for (var i = 0; i < sorted_user_array.length; i++) {
      var local_score = getScore(sorted_user_array[i]);
      var local_user = main.users[sorted_user_array[i]];

      //Name, Score, Provinces, Population, Military, Money, Tech
      ledger_string.push("");
      ledger_string.push(`**${local_user.name}**:`);
      ledger_string.push("---");
      ledger_string.push(`- ${config.icons.prestige} Score: **${parseNumber(local_score)}**`);
      ledger_string.push(`- ${config.icons.provinces} Provinces: **${parseNumber(local_user.provinces)}**`);
      ledger_string.push(`- ${config.icons.population} Population: ${parseNumber(local_user.population)}`);
      ledger_string.push(`- ${config.icons.soldiers} Active Soldiers: ${parseNumber(getTotalActiveDuty(sorted_user_array[i]))}`);
      ledger_string.push(`- ${config.icons.money} Money: ${parseNumber(local_user.money)}`);
      ledger_string.push(`- ${config.icons.technology} Techs Researched: (**${parseNumber(local_user.researched_technologies.length)}**/**${parseNumber(tech_sum)}**)`);
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    var split_ledger = splitEmbed(ledger_string, {
      title: "[Back] | [Jump To Page] | Diplomatic Ledger:",
      description: [
        `**[View Relations]**`,
        config.localisation.divider,
      ],
      title_pages: true,
      fixed_width: true
    });

    //Edit main embed display
    if (!return_split_embed)
      createPageMenu(game_obj.middle_embed, {
        embed_pages: split_ledger,
        user: game_obj.user
      });

    if (return_split_embed)
      return split_ledger;
  },

  viewDiplomacy: function (arg0_user, arg1_user) {
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[actual_id];

    //Declare diplomacy_view_string
    var diplomacy_view_embeds = [];
    var diplomacy_view_string = [];
    var stats_string = []; //Used for viewing country stats

    //Declare and initialise local tracker variables
    var all_pops = Object.keys(config.pops);
    var all_user_keys = Object.keys(main.global.user_map);
    var all_wars = Object.keys(main.global.wars);
    var capital_obj = getCapital(actual_ot_user_id);
    var current_ot_user_relations = getRelations(actual_ot_user_id, actual_id);
    var current_user_relations = getRelations(actual_id, actual_ot_user_id);
    var government_obj = config.governments[ot_user.government];
    var user_keys = [];
    var user_provinces = getProvinces(actual_ot_user_id, { include_occupations: true });

    //Diplomatic Actions page
    {
      //Diplomatic relation variables
      var allies_array = [];
      var can_call_ally = [];
      var have_military_access_array = getMilitaryAccesses(actual_ot_user_id);
      var guaranteed_array = [];
      var guarantors_array = [];
      var justifying_wargoals = [];
      var military_access_array = [];
      var non_aggression_pact_array = [];
      var rivals_array = [];
      var vassal_array = [];
      var vassal_obj = getVassal(actual_ot_user_id);

      //Initialise diplomatic relation variables
      var all_allies = Object.keys(ot_user.diplomacy.allies);
      var all_guarantees = Object.keys(ot_user.diplomacy.guarantees);
      var all_guarantors = getGuarantees(actual_ot_user_id);
      var all_military_accesses = Object.keys(ot_user.diplomacy.military_access);
      var all_non_aggression_pacts = Object.keys(ot_user.diplomacy.non_aggression_pacts);
      var all_rivals = Object.keys(ot_user.diplomacy.rivals);
      var all_vassals = Object.keys(ot_user.diplomacy.vassals);

      //Alliances
      for (var i = 0; i < all_allies.length; i++)
        if (hasAlliance(actual_ot_user_id, all_allies[i]))
          allies_array.push(main.users[all_allies[i]].name);

      //Call Ally
      if (hasAlliance(actual_id, actual_ot_user_id))
        for (var i = 0; i < all_wars.length; i++) {
          var local_war = main.global.wars[all_wars[i]];

          if (local_war.attackers.includes(actual_id) || local_war.defenders.includes(actual_id))
            if (!(local_war.attackers.includes(actual_ot_user_id) || local_war.defenders.includes(actual_ot_user_id)))
              can_call_ally.push(`**${local_war.name}**`);
        }

      //Guarantees
      for (var i = 0; i < all_guarantees.length; i++)
        if (hasGuarantee(actual_ot_user_id, all_guarantees[i]))
          guaranteed_array.push(main.users[all_guarantees[i]].name);

      //Guarantors
      for (var i = 0; i < all_guarantors.length; i++)
        guarantors_array.push(main.users[all_guarantors[i].guarantor].name);

      //Military Accesses
      for (var i = 0; i < all_military_accesses.length; i++)
        if (hasMilitaryAccess(actual_ot_user_id, all_military_accesses[i]))
          military_access_array.push(main.users[all_military_accesses[i]].name);

      //Non-aggression Pacts
      for (var i = 0; i < all_non_aggression_pacts.length; i++)
        if (hasNonAggressionPact(actual_ot_user_id, all_non_aggression_pacts[i]))
          non_aggression_pact_array.push(main.users[all_non_aggression_pacts[i]].name);

      //Rivalries
      for (var i = 0; i < all_rivals.length; i++)
        if (hasRivalry(actual_ot_user_id, all_rivals[i]))
          rivals_array.push(main.users[all_rivals[i]].name);

      //Vassals
      for (var i = 0; i < all_vassals.length; i++)
        if (ot_user.diplomacy.vassals[all_vassals[i]].overlord == actual_id)
          vassal_array.push(main.users[all_vassals[i]].name);

      //User variables
      for (var i = 0; i < all_user_keys.length; i++)
        if (main.global.user_map[all_user_keys[i]] == actual_ot_user_id)
          if (!all_user_keys[i].includes("-"))
            user_keys.push(`<@${all_user_keys[i]}>`);

      //Wargoal justifications
      for (var i = 0; i < usr.diplomacy.justifications.length; i++) {
        var local_justification = usr.diplomacy.justifications[i];

        if (local_justification.target == ot_user_id) {
          var cb_obj = getCB(local_justification.type);

          justifying_wargoals.push(`**${(cb_obj.name) ? cb_obj.name.toLowerCase() : local_justification.type}**`);
        }
      }

      //Push main statistics
      diplomacy_view_string.push(`**${ot_user.name}** | ${parseList(user_keys)}`);
      diplomacy_view_string.push(`${config.icons.political_capital} Government: **${(government_obj.name) ? government_obj.name : ot_user.government}**`);
      diplomacy_view_string.push(`${config.icons.provinces} Provinces: ${parseNumber(user_provinces.length)} (${(capital_obj) ? (capital_obj.id) ? `Capital ID: Province ${capital_obj.id}` : `No set capital` : `No set capital`})`);
      diplomacy_view_string.push(`${config.icons.population} Population: **${parseNumber(ot_user.population)}**`);
      diplomacy_view_string.push(`${config.icons.technology} Techs Researched: **${parseNumber(ot_user.researched_technologies.length)}**`);
      diplomacy_view_string.push("");
      diplomacy_view_string.push(config.localisation.divider);
      diplomacy_view_string.push("");

      //Diplomatic statistics
      diplomacy_view_string.push(`${config.icons.faculty} Diplomatic Slots: (**${parseNumber(ot_user.diplomacy.used_diplomatic_slots)}**/**${parseNumber(ot_user.modifiers.diplomatic_slots)}**)`);
      diplomacy_view_string.push(`${config.icons.infamy} Infamy: **${parseNumber(ot_user.modifiers.infamy)}**`);
      diplomacy_view_string.push("");

      //Push relations
      var current_relations_string = "";
      var ot_user_relations_string = "";

      //Set current status string for both current_relations_string and ot_user_relations_string
      if (current_user_relations[1].status == "increasing") {
        current_relations_string = `(Improving to **${parseNumber(current_user_relations[1].improving_to, { display_prefix: true })}** in **${parseNumber(current_user_relations[1].duration)}** turn(s)).`;
      } else if (current_user_relations[1].status == "decreasing") {
        current_relations_string = `(Decreasing to **${parseNumber(current_user_relations[1].improving_to, { display_prefix: true })}** in **${parseNumber(current_user_relations[1].duration)}** turn(s)).`;
      }

      if (current_ot_user_relations[1].status == "increasing") {
        ot_user_relations_string = `(Improving to **${parseNumber(current_ot_user_relations[1].improving_to, { display_prefix: true })}** in **${parseNumber(current_ot_user_relations[1].duration)}** turn(s)).`;
      } else if (current_ot_user_relations[1].status == "decreasing") {
        ot_user_relations_string = `(Decreasing to **${parseNumber(current_ot_user_relations[1].improving_to, { display_prefix: true })}** in **${parseNumber(current_ot_user_relations[1].duration)}** turn(s)).`;
      }

      //Push relational status to diplomacy_view_string
      diplomacy_view_string.push(`Our relations with them: **${parseNumber(current_user_relations[0], { display_prefix: true })}** ${current_relations_string}`);
      diplomacy_view_string.push(`Their relations with us: **${parseNumber(current_ot_user_relations[0], { display_prefix: true })}** ${ot_user_relations_string}`);

      //Other info
      diplomacy_view_string.push("");

      if (allies_array.length > 0)
        diplomacy_view_string.push(`The following nations are allied to **${ot_user.name}**: ${parseList(allies_array)}.`);
      if (vassal_array.length > 0)
        diplomacy_view_string.push(`The following nations are vassals to **${ot_user.name}**: ${parseList(vassal_array)}.`);
      if (rivals_array.length > 0)
        diplomacy_view_string.push(`The following nations are rivals of **${ot_user.name}**: ${parseList(rivals_array)}.`);
      if (guaranteed_array.length > 0)
        diplomacy_view_string.push(`**${ot_user.name}** is currently guaranteeing the independence of: ${parseList(guaranteed_array)}.`);
      if (guarantors_array.length > 0)
        diplomacy_view_string.push(`The following nations are currently guaranteeing the independence of **${ot_user.name}**: ${parseList(guarantors_array)}.`);
      if (military_access_array.length > 0)
        diplomacy_view_string.push(`The following nations have military access through **${ot_user.name}**: ${parseList(military_access_array)}.`);

      if (non_aggression_pact_array.length > 0)
        diplomacy_view_string.push(`The following nations have a non-aggression pact with **${ot_user.name}**: ${parseList(non_aggression_pact_array)}.`);
      if (hasNonAggressionPact(actual_id, actual_ot_user_id))
        diplomacy_view_string.push(`- You currently have a non-aggression pact with this country for the next **${parseNumber(usr.diplomacy.non_aggression_pacts[actual_ot_user_id].duration)}** turn(s).`);

      if (vassal_obj)
        diplomacy_view_string.push(`**${ot_user.name}** is a vassal of **${main.users[vassal_obj.overlord].name}**.`);

      //Diplomatic actions
      diplomacy_view_string.push(config.localisation.divider);
      diplomacy_view_string.push("");
      diplomacy_view_string.push(`**Diplomatic Actions:**`);
      diplomacy_view_string.push("");

      if (actual_id != actual_ot_user_id) {
        if (!isJustifying(actual_id, actual_ot_user_id)) {
          if (!hasWargoal(actual_id, actual_ot_user_id)) {
            diplomacy_view_string.push(`> **[Justify Wargoal]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.justify_wargoal_cost)} PC`);
            diplomacy_view_string.push(`> - **[View CBs]**`);
          } else {
            diplomacy_view_string.push(`> **[Declare War]**`);
            diplomacy_view_string.push(`> - **[Cancel Wargoal]**`);
            diplomacy_view_string.push(`> - **[View Wargoals]**`);
          }
        } else {
          diplomacy_view_string.push(`> We are currently justifying ${(justifying_wargoals.length > 1) ? "wars of" : "a war of"} ${justifying_wargoals.join(", ")} against this nation.`);
          diplomacy_view_string.push("> ");
          diplomacy_view_string.push(`> **[Cancel Justification]**`);
        }

        if (can_call_ally.length > 0)
          diplomacy_view_string.push(`> **[Call Ally]** - We can currently call this ally into the following conflicts: ${can_call_ally.join(", ")}`);

        diplomacy_view_string.push(`> **[Improve Relations]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.improve_relations_cost)} PC`);
        diplomacy_view_string.push(`> **[Decrease Relations]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.decrease_relations_cost)} PC`);
        diplomacy_view_string.push("> ");

        (hasAlliance(actual_id, actual_ot_user_id)) ?
          diplomacy_view_string.push(`> **[Break Alliance]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.break_alliance_cost)} PC`) :
          diplomacy_view_string.push(`> **[Request Alliance]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.form_alliance_cost)} PC`);

        (hasRivalry(actual_id, actual_ot_user_id)) ?
          diplomacy_view_string.push(`> **[End Rivalry]**`) :
          diplomacy_view_string.push(`> **[Declare Rivalry]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.declare_rival_cost)} PC`);

        (hasGuarantee(actual_id, actual_ot_user_id)) ?
          diplomacy_view_string.push(`> **[Revoke Guarantee]**`) :
          diplomacy_view_string.push(`> **[Guarantee Independence]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.guarantee_independence_cost)} PC`);

        if (hasMilitaryAccess(actual_ot_user_id, actual_id))
          diplomacy_view_string.push(`> **[Revoke Military Access]**`);

        if (hasMilitaryAccess(actual_id, actual_ot_user_id))
          diplomacy_view_string.push(`> **[Cancel Military Access]**`);

        if (!hasMilitaryAccess(actual_id, actual_ot_user_id))
          diplomacy_view_string.push(`> **[Request Military Access]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.request_military_access_cost)} PC`);

        if (!hasNonAggressionPact(actual_id, actual_ot_user_id))
          diplomacy_view_string.push(`> **[Sign Non-Aggression Pact]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.sign_non_aggression_pact_cost)} PC`);

        if (vassal_obj) {
          if (vassal_obj.overlord == actual_id) {
            diplomacy_view_string.push("> ");
            diplomacy_view_string.push(config.localisation.divider);
            diplomacy_view_string.push("> ");
            diplomacy_view_string.push(`> **Subject Actions:**`);
            diplomacy_view_string.push("> ");
            diplomacy_view_string.push(`> **[Liberate]**`);
            diplomacy_view_string.push(`> **[Demand Annexation]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.annex_cost)} PC`);
          }
        } else {
          diplomacy_view_string.push(`> **[Demand Vassalisation]** - ${config.icons.political_capital} ${parseNumber(config.defines.diplomacy.vassalise_cost)} PC`);
        }
      } else {
        diplomacy_view_string.push(`> _You can't conduct diplomatic relations with yourself!_`);
      }
    }

    //Statistics page
    {
      //Fetch city list
      var cities = [];
      var ending_string = "";
      var name_array = [];
      var name_string = "";
      var usr_provinces = getProvinces(actual_ot_user_id);

      //Append cities to list
      for (var i = 0; i < usr_provinces.length; i++)
        if (usr_provinces[i].type == "urban") {
          var local_city = usr_provinces[i];
          cities.push({
            name: local_city.name,
            population: local_city.population,
            type: local_city.city_type //Capital or regular city
          });
        }

      //Sort cities by population
      cities.sort(function (a, b) {
        return b.population - a.population;
      });

      var capital_included = false;
      for (var i = 0; i < cities.length; i++)
        if (i < 15) {
          if (cities[i].type == "capital") {
            capital_included = true;
            name_array.push(`**${cities[i].name}**`);
          } else {
            name_array.push(cities[i].name);
          }
        }

      if (name_array.length >= 2) {
        name_array[name_array.length-1] = `and ${name_array[name_array.length-1]}`;
        name_string = (name_array.length > 2) ? name_array.join(", ") : name_array.join(" ");
      } else {
        name_string = (name_array.length > 0) ? name_array[0] : "No cities.";
      }

      if (cities.length > name_array.length)
        ending_string = `, (+${cities.length-name_array.length} more)`;

      //Begin formatting stats_string
      stats_string.push(`**${ot_user.name}** | ${parseList(user_keys)}`);
      stats_string.push(`${config.icons.political_capital} Government: **${(government_obj.name) ? government_obj.name : ot_user.government}**`);
      stats_string.push(`${config.icons.provinces} Provinces: ${parseNumber(user_provinces.length)} (${(capital_obj) ? (capital_obj.id) ? `Capital ID: Province ${capital_obj.id}` : `No set capital` : `No set capital`})`);
      stats_string.push(`${config.icons.population} Population: **${parseNumber(ot_user.population)}**`);
      stats_string.push(`${config.icons.technology} Techs Researched: **${parseNumber(ot_user.researched_technologies.length)}**`);
      stats_string.push("");
      stats_string.push(config.localisation.divider);
      stats_string.push("");

      //Push main statistics: cities, number of workers; money, political capital; infamy, war exhaustion, number of soldiers
      stats_string.push(`**Economic Statistsics:**`);
      stats_string.push("");

      stats_string.push(`${config.icons.development} Cities: (**${parseNumber(getCitiesCap(actual_ot_user_id))}**/**${parseNumber(cities.length)}**): ${name_string}`);

      //Civilian pops display
      for (var i = 0; i < all_pops.length; i++) {
        var local_pop = config.pops[all_pops[i]];

        if (local_pop.stats_display && !local_pop.military_pop)
          stats_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: (**${parseNumber(ot_user.pops["used_" + all_pops[i]])}**/**${parseNumber(getTotalPopManpower(actual_ot_user_id, all_pops[i]))}**)`);
      }

      stats_string.push("");
      stats_string.push(`${config.icons.money} Money: **${parseNumber(ot_user.money)}**`);
      stats_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(ot_user.modifiers.political_capital)}**`);

      stats_string.push("");
      stats_string.push(`**Military Statistics:**`);
      stats_string.push("");

      stats_string.push(`${config.icons.infamy} Infamy: **${parseNumber(ot_user.modifiers.infamy)}** (${parseNumber(ot_user.modifiers.infamy_loss, { display_float: true, display_prefix: true })} per turn)`);
      stats_string.push(`${config.icons.infamy} War Exhaustion: **${printPercentage(ot_user.modifiers.war_exhaustion)}**`);
      stats_string.push("");

      //Military pops display
      for (var i = 0; i < all_pops.length; i++) {
        var local_pop = config.pops[all_pops[i]];

        if (local_pop.stats_display && local_pop.military_pop)
          stats_string.push(`${(local_pop.icon) ? local_pop.icon + " " : ""}${(local_pop.name) ? local_pop.name : all_pops[i]}: (**${parseNumber(ot_user.pops["used_" + all_pops[i]])}**/**${parseNumber(getTotalPopManpower(actual_ot_user_id, all_pops[i]))}**) | (**${printPercentage(getTotalPopManpower(actual_ot_user_id, all_pops[i], true))}** Recruitable Population)`);
      }
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Format both diplomatic actions and statistics page to embeds
    const diplomacy_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`[Back] | **Diplomatic Overview:**`)
      .setThumbnail(ot_user.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(diplomacy_view_string.join("\n"));

    const stats_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`[Back] | **Diplomatic Overview:**`)
      .setThumbnail(ot_user.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(stats_string.join("\n"));

    createPageMenu(game_obj.middle_embed, {
      embed_pages: [diplomacy_embed, stats_embed],
      user: game_obj.user
    });
  }
};
