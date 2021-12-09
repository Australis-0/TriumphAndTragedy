module.exports = {
  printTrade: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise trade_string
    var trade_string = [];

    //Format trade_string
    var local_imports = getImports(actual_id);
    var number_of_autotrades = Object.keys(usr.auto_trades).length;
    var capacity_used = getUsedCapacity(actual_id);

    trade_string.push(`**Travel Modifiers:**`);
    trade_string.push("");

    if (isBlockaded(actual_id)) {
      trade_string.push(`${config.icons.blockade} **You are currently blockaded!**`);
      trade_string.push(`Being blockaded means you won't be able to ship or receive goods anymore. You can challenge this blockade by building up a naval fleet.`);
      trade_string.push("");
    }

    trade_string.push(`Base travel time: **${parseNumber(Math.ceil(config.defines.combat.base_transfer_time*usr.modifiers.shipmshipment_time))}** turn(s).`);
    trade_string.push(`Current travel speed: **${parseNumber(Math.ceil(config.defines.combat.shipment_time/usr.modifiers.shipment_time))}** province(s) a turn.`);
    trade_string.push(`Shipment capacity: **${parseNumber(capacity_used)}** out of **${parseNumber(usr.modifiers.shipment_capacity)}** currently in use.`);
    trade_string.push(`- Shipment Time Modifier: **${printPercentage(usr.modifiers.shipment_time)}**`);

    //Import/Export list
    trade_string.push(config.localisation.divider);
    trade_string.push(`**Imports/Exports:**`);
    trade_string.push("");

    (number_of_autotrades > 0) ?
      trade_string.push(`You currently have **${parseNumber(number_of_autotrades)}** ongoing auto-trades. **[Manage Auto-Trades]**`) :
      trade_string.push(`_You currently have no ongoing autotrades._ In order to access the Auto Trade UI, type **[Manage Auto-Trades]**.`);

    trade_string.push("");
    trade_string.push(`${config.icons.taxes} **[Import List]:**`);

    trade_string.push("");

    (local_imports.length > 0) ?
      trade_string.push(`You currently have **${parseNumber(local_imports.length)}** imports in transfer.`) :
      trade_string.push(`_You have no incoming imports._`);

    trade_string.push("");

    //Print imports; may only print up to 10 imports
    for (var i = 0; i < local_imports.length; i++) {
      if (i <= 10) {
        var local_good_icon = (getGood(local_imports[i].good_type).icon) ?
          config.icons[getGood(local_imports[i].good_type).icon] + " " :
          "";
        var local_good_name = (getGood(local_imports[i].good_type).name) ?
          getGood(local_imports[i].good_type).name :
          local_imports[i].good_type;

        import_list.push(`Importing ${local_good_icon}${parseNumber(local_imports[i].amount)} ${local_good_name} from **${main.users[local_imports[i].exporter].name}**.\nThe shipment will arrive in ${local_imports[i].time_remaining}** turn(s).`);
      }
    }

    if (local_imports.length > 10)
      trade_string.push(`+${parseNumber(local_imports.length-10)} more ...`);
  }
};
