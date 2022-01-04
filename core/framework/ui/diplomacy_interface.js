module.exports = {
  //[WIP] - All three of these need to be done before we can move onto CB's and wargoals!
  printDiplomacy: function (arg0_user) { //[WIP] - At war
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_good_names = getGoods({ return_names: true });
    var all_pops = Object.keys(config.pops);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var accepted_cultures = getAcceptedCultures(actual_id, { exclude_primary_culture: true });

    //Declare diplomacy_string
    var diplomacy_string = [];

    //Format diplomacy_string
    diplomacy_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}** (${parseNumber(usr.modifiers.political_capital_gain, { display_prefix: true })} per turn)`);

    //Check if user has any vassals or accepted cultures dragging down their gain per turn
    if (Object.keys(usr.vassals).length > 0)
      diplomacy_string.push(`Our **${parseNumber(Object.keys(usr.vassals).length)}** vassal(s) are costing us **${parseNumber(getVassalMaintenance(actual_id))}** Political Capital per turn.`);
    if (accepted_cultures.length > 0)
      diplomacy_string.push(`Our **${parseNumber(accepted_cultures.length)}** accepted culture(s) are costing us **${parseNumber(accepted_cultures*config.defines.politics.accepted_culture_maintenance_cost)}** Political Capital per turn.`);

    diplomacy_string.push(`${config.icons.infamy} Infamy: **${parseNumber(usr.modifiers.infamy)}** (${parseNumber(usr.modifiers.infamy_loss, { display_prefix: true })} per turn)`);

    //[WIP] - Insert At War status here

    diplomacy_string.push("");
    diplomacy_string.push(`**[War List]**`);
    diplomacy_string.push("");
    diplomacy_string.push(config.localisation.divider);
    diplomacy_string.push("");
    diplomacy_string.push(`**[View Ledger]** ¦ **[View Relations]**`);
    diplomacy_string.push(`**[Cede Province]** ¦ **[Allow Ceding]** ¦ **[Deny Ceding]**`);
    diplomacy_string.push("");

    //Cede list
    var allow_cede_names = [];

    for (var i = 0; i < usr.options.allow_ceding.length; i++)
      allow_cede_names.push(`**${main.users[usr.options.allow_ceding[i]].name}**`);

    (usr.options.allow_ceding.length > 0) ?
      diplomacy_string.push(`You currently allow ${allow_cede_names.join(", ")} to cede their provinces to you.`) :
      diplomacy_string.push(`_You are currently not allowing anyone to cede their provinces to you.`);

    //[WIP] - Add sorted ledger of top 10 countries by score

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

  printLedger: function (arg0_user) { //[WIP] - Add getScore() function later

  },

  viewDiplomacy: function (arg0_user, arg1_user) { //[WIP] - Create bulk of function; push war status to fore if found to be valid
    //Convert from parameters
    var user_id = arg0_user;
    var ot_user_id = arg1_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var actual_ot_user_id = main.global.user_map[ot_user_id];
    var game_obj = getGameObject(user_id);
    var ot_user = main.users[actual_ot_user_id];
    var usr = main.users[user_id];

    //Declare diplomacy_view_string
    var diplomacy_view_string = [];
    var stats_string = []; //Used for viewing country stats

    //Declare and initialise local tracker variables
    var all_user_keys = Object.keys(main.global.user_map);
    var capital_obj = getCapital(actual_ot_user_id);
    var current_ot_user_relations = getRelations(actual_ot_user_id, actual_id);
    var current_user_relations = getRelations(actual_id, actual_ot_user_id);
    var government_obj = config.governments[ot_user.government];
    var user_keys = [];
    var user_provinces = getProvinces(actual_ot_user_id, { include_occupations: true });

    //Diplomatic relation variables
    var allies_array = [];
    var have_military_access_array = getMilitaryAccesses(actual_ot_user_id);
    var guaranteed_array = [];
    var guarantors_array = [];
    var military_access_array = [];
    var non_aggression_pact_array = [];
    var rivals_array = [];
    var vassal_array = [];
    var vassal_obj = getVassal(actual_ot_user_id);

    //Initialise diplomatic relation variables
    var all_allies = Object.keys(ot_user.diplomacy.allies);
    var all_guarantees = Object.keys(ot_user.diplomacy.guarantees);
    var all_guarantors = getGuarantees(user_id);
    var all_military_accesses = Object.keys(ot_user.diplomacy.military_access);
    var all_non_aggression_pacts = Object.keys(ot_user.diplomacy.non_aggression_pacts);
    var all_rivals = Object.keys(ot_user.diplomacy.rivals);
    var all_vassals = Object.keys(ot_user.diplomacy.vassals);

    //Alliances
    for (var i = 0; i < all_allies.length; i++)
      if (hasAlliance(actual_ot_user_id, all_allies[i]))
        allies_array.push(main.users[all_allies[i]].name);

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
        user_keys.push(`<@${all_user_keys[i]}>`);

    //Push main statistics
    diplomacy_view_string.push(`**${ot_user.name}** ¦ ${parseList(user_keys)}`);
    diplomacy_view_string.push(`${config.icons.political_capital} Government: **${(government_obj.name) ? government_obj.name : ot_user.government}**`);
    diplomacy_view_string.push(`${config.icons.provinces} Provinces: ${parseNumber(user_provinces.length)} (${(capital_obj.id) ? `Capital ID: Province ${capital_obj.id}` : `No set capital`})`);
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
    if (current_user_relations[1].status == "improving") {
      current_relations_string = `(Improving to ${parseNumber(current_user_relations[1].improving_to, { display_prefix: true })} in ${parseNumber(current_user_relations[1].duration)} turn(s)).`;
    } else if (current_user_relations[1].status == "decreasing") {
      current_relations_string = `(Decreasing to ${parseNumber(current_user_relations[1].improving_to, { display_prefix: true })} in ${parseNumber(current_user_relations[1].duration)} turn(s)).`;
    }

    if (current_ot_user_relations[1].status == "improving") {
      ot_user_relations_string = `(Improving to ${parseNumber(current_ot_user_relations[1].improving_to, { display_prefix: true })} in ${parseNumber(current_ot_user_relations[1].duration)} turn(s)).`;
    } else if (current_ot_user_relations[1].status == "decreasing") {
      ot_user_relations_string = `(Decreasing to ${parseNumber(current_ot_user_relations[1].improving_to, { display_prefix: true })} in ${parseNumber(current_ot_user_relations[1].duration)} turn(s)).`;
    }

    //Push relational status to diplomacy_view_string
    diplomacy_view_string.push(`Our relations with them: **${parseNumber(current_user_relations[0], { display_prefix: true })}** ${current_relations_string}`);
    diplomacy_view_string.push(`Their relations with us: **${parseNumber(current_ot_user_relations[0], { display_prefix: true })}** ${current_relations_string}`);

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
  }
};
