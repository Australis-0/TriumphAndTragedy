module.exports = {
  initOptimisation: function () {
    global.lookup = {
      all_buildings: getBuildings({ return_object: true }),
      all_event_names: getEvents({ return_names: true }),
      all_events: getEvents(),
      all_good_names: getGoods({ return_names: true }),
      all_goods: getGoods({ return_object: true }),
      all_goods_array: getGoods(),
      all_units: getAllUnits({ return_object: true }),

      province_troop_strengths: {}
    };

    //Cache all users
    var guilds = client.guilds.cache.map(guild => guild.id);

    for (var i = 0; i < guilds.length; i++)
      client.guilds.cache.get(guilds[i]).members.fetch();
  }
};
