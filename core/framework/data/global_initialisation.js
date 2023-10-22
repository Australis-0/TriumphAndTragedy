//Initialise global variables at start
module.exports = {
  initGlobal: function () {
    //Declare local tracker variables
    var all_good_names = lookup.all_good_names_excluding_hidden;
    var all_goods = lookup.all_goods_excluding_hidden;
    var all_main_keys = Object.keys(main);

    //Stub objects
    if (!main.users) main.users = {};

    //Bugfixes
    {
      //Compressed data fix
      {
        //No clue why it does this
        for (var i = 0; i < all_main_keys.length; i++)
          if (all_main_keys[i].endsWith("users") && all_main_keys[i] != "users") {
            main.users = main[all_main_keys[i]];
            delete main[all_main_keys[i]];
          }
      }
      //Undefined user fix
      {
        var all_users = Object.keys(main.users);

        for (var i = 0; i < all_users.length; i++)
          if (!main.global.user_map[all_users[i]])
            main.global.user_map[all_users[i]] = all_users[i];
      }
    }

    //Force render all maps
    if (!main.global)
      for (var i = 0; i < mapmodes.length; i++)
        cacheSVG(mapmodes[i]);

    //Declare objects
    if (!main.global) main.global = {};
      if (!main.global.archived_wars) main.global.archived_wars = {};
      if (!main.global.cooldowns) main.global.cooldowns = {}; //Used for timed effects
      if (!main.global.cultures) main.global.cultures = {};
      if (!main.global.user_map) main.global.user_map = {};
      if (!main.global.wars) main.global.wars = {};
    if (!main.interfaces) main.interfaces = {};
    if (!main.provinces) main.provinces = JSON.parse(fs.readFileSync(`./map/provinces.js`, "utf8").toString());

    //Date trackers
    if (!main.date) main.date = {};
      if (!main.date.year) main.date.year = (config.defines.common.starting_year) ? config.defines.common.starting_year : 1500;
      if (!main.date.month) main.date.month = (config.defines.common.starting_month) ? config.defines.common.starting_month : 1;
      if (!main.date.day) main.date.day = (config.defines.common.starting_day) ? config.defines.common.starting_day : 1;
      if (!main.date.hour) main.date.hour = 0;
    if (!main.round_count) main.round_count = 0;
    if (!main.tick_count) main.tick_count = 0;

    //Market trackers - Initialise buy price/sell price/stock
    if (!main.market) main.market = {};
      for (var i = 0; i < all_goods.length; i++)
        if (!main.market[all_good_names[i]])
          if (all_goods[i].buy_price || all_goods[i].sell_price) {
            var local_good_name = all_good_names[i];

            //Initialise good object
            main.market[local_good_name] = {
              demand: 0, //Used as a tracker variable; reset each turn

              buy_price: (all_goods[i].buy_price) ?
                all_goods[i].buy_price :
                all_goods[i].sell_price*2,
              sell_price: (all_goods[i].sell_price) ?
                all_goods[i].sell_price :
                all_goods[i].buy_price*0.5,
              stock: (all_goods[i].stock) ?
                all_goods[i].stock :
                config.defines.economy.resource_base_stock
            };
          }

    //Queue trackers
    if (main.season_started == undefined) main.season_started =
      (returnSafeNumber(config.defines.common.starting_players) == 0);

    //Declare tracker variables
    if (!main.last_backup) main.last_backup = new Date().getTime();
    if (!main.last_queue_check) main.last_queue_check = new Date().getTime();
    if (!main.last_turn) main.last_turn = new Date().getTime();

    //Fix province adjacency_distances, ID's
    var all_provinces = Object.keys(main.provinces);

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = main.provinces[all_provinces[i]];

      local_province.id = all_provinces[i];

      if (local_province.adjacencies)
        if (!local_province.adjacency_distances) {
          local_province.adjacency_distances = [];

          for (var x = 0; x < local_province.adjacencies.length; x++)
            local_province.adjacency_distances.push(
              getDistance(all_provinces[i], local_province.adjacencies[x])
            );
        }
    }
  }
};
