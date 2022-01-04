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

  viewDiplomacy: function (arg0_user, arg1_user) { //[WIP] - Create bulk of function
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
  }
};
