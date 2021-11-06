module.exports = {
  printProvinces: function (arg0_user) { //[WIP]
    //TODO: Print cities first before rural provinces
    //TODO: Print provinces
    //TODO: Implement UI in pops tab

    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var cities = getCities(actual_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });
    var provinces = getProvinces(actual_id, {
      include_hostile_occupations: true,
      include_occupations: true
    });

    //Initialise province_string
    var province_string = [];

    //Format province_string
    province_string.push(`**[Back]** ¦ **[Jump To Page]**`);
    province_string.push("");
    province_string.push(`${config.icons.globe} Country: **${usr.name}**`);
    province_string.push("");

    province_string.push(config.localisation.divider);
    province_string.push(`**Provinces:**`);

    if (provinces.length != 0) {

    } else {
      province_string.push(`_You currently don't have any provinces in your possession!_`);
      province_string.push("");
      province_string.push(`_Consider settling or acquiring a new province to start building up your country._`);
    }
  }
};
