module.exports = {
  printPolitics: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_governments = Object.keys(config.governments);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare politics_string
    var politics_string = [];
    var ruling_government_obj = config.governments[usr.government];
    var simulation = nextTurn(actual_id, { is_simulation: true });
    var total_reform_desire_gain = 0;

    //Initialise tracker variables
    for (var i = 0; i < all_governments.length; i++) {
      var local_government = config.governments[all_governments[i]];

      if (local_government.effect.reform_desire_gain)
        total_reform_desire_gain += local_government.effect.reform_desire_gain*usr.politics[all_governments[i]].popularity;
    }

    total_reform_desire_gain = Math.min(total_reform_desire_gain, 0.15);


    //Format politics_string
    politics_string.push(`**Ruling Government:**`);
    politics_string.push("");
    politics_string.push(`${config.icons.government} Government Type: **${ruling_government_obj.name}**`);
    politics_string.push(`${config.icons.political_capital} Political Capital: **${parseNumber(usr.modifiers.political_capital)}** (${parseNumber(usr.modifiers.political_capital_gain, { display_prefix: true })} per turn)`);
    politics_string.push("");
    politics_string.push(`**[Coup ${config.icons.political_capital} ${parseNumber(config.defines.politics.coup_cost)}]** ¦ **[Support Party ${config.icons.political_capital} ${parseNumber(config.defines.politics.support_cost)}]** ¦ **[View Cultures]**${(usr.available_reforms.length > 0) ? ` ¦ **[View Reforms]**` : ""}`);

    if (usr.available_reforms.length > 0) {
      politics_string.push("");
      politics_string.push(`${config.icons.consciousness} Reform Desire: **${printPercentage(usr.modifiers.reform_desire, { display_prefix: true })}** (${printPercentage(total_reform_desire_gain, { display_prefix: true })} per turn). Pass Reforms to lower **Reform Desire**.`);
      politics_string.push("");
    }

    //Print out discontentment per party
    for (var i = 0; i < all_governments.length; i++)
      if (usr.politics[all_governments[i]].popularity > 0) {
        var local_government = config.governments[all_governments[i]];
        var local_party = usr.politics[all_governments[i]];

        var discontentment_array = ["pleased", "satisfied", "dissatisfied", "discontented", "unhappy", "outraged", "repulsed", "disgusted", "ready to revolt"];
        var discontented_stage = Math.min(local_party.discontent/8, discontentment_array.length - 1);
        discontented_stage = Math.max(discontented_stage, 0);
        var discontented_string = discontentment_array[discontented_stage];

        politics_string.push(`${printPercentage(local_party.popularity)} of your pop. are ${local_government.adjective.toLowerCase()}. They are **${discontented_string}** (${parseNumber(Math.floor(local_party.discontent))}) with the state of our nation.`);
      }

    //Print stability
    politics_string.push("");
    politics_string.push(config.localisation.divider);
    politics_string.push("");
    politics_string.push(`**Stability:**`);
    politics_string.push("");
    politics_string.push(`**[Raise Stability]** by **${printPercentage(config.deefines.politics.stability_boost)}** for **${parseNumber(config.defines.politics.stability_cost)} ${config.icons.political_capital} Political Capital.`);
    politics_string.push(`**[Set Tax]**`);
    politics_string.push("");

    politics_string.push(parseStabilityModifier(actual_id));

    //Print calculated stability
    politics_string.push("");
    politics_string.push(config.localisation.divider);
    politics_string.push("");
    politics_string.push(`**Calculated Stability:**`);
    politics_string.push("");
    politics_string.push(`${config.icons.stability} Calculated Stability: **${printPercentage(simulation.modifiers.stability)}**`);
    politics_string.push(`${config.icons.stability} Current Stability: **${printPercentage(usr.modifiers.stability)}`);

    if (simulation.modifiers.stability < config.defines.politics.revolt_threshold && usr.country_age > 10) {
      var low_party_popularity = false;

      for (var i = 0; i < all_governments.length; i++)
        if (usr.politics[all_governments[i]].popularity >= 0.30)
          low_party_popularity = true;

      if (low_party_popularity) {
        politics_string.push(config.localisation.divider);
        politics_string.push(`You have a ${config.icons.revolt} **revolt risk** of **${printPercentage(config.defines.politics.revolt_threshold - simulation.modifiers.stability)}**!`);
      }
    }

    //Remove control panel if one exists
    removeControlPanel(game_obj.id);

    //Create embed and edit to message
    const politics_embed = new Discord.MessageEmbed()
      .setColor(settings.bot_colour)
      .setTitle(`**Politics:**`)
      .setThumbnail(usr.flag)
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png")
      .setDescription(politics_string.join("\n"));

    game_obj.main_embed = politics_embed;
    game_obj.main_change = true;
  }
}
