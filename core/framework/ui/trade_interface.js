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
  }
};
