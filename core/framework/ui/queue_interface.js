module.exports = {
  printQueue: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_mapped_users = Object.keys(main.global.user_map);
    var all_users = Object.keys(main.users);
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialise queue_string
    var queue_string = [];

    //Format queue_string
    queue_string.push(`${config.icons.consciousness} Currently **${parseNumber(all_users.length)}** out of **${parseNumber(config.defines.common.starting_players)}** players necessary to start this season have registered their nations.`);
    queue_string.push(`The season will start once enough players have joined.`);
    queue_string.push("");
    queue_string.push(`---`);
    queue_string.push("");

    for (var i = 0; i < all_mapped_users.length; i++)
      queue_string.push(`<@${all_mapped_users[i]}> - **${main.users[main.global.user_map[all_mapped_users[i]]].name}**`);

    queue_string.push("");
    queue_string.push(`---`);
    queue_string.push("");
    queue_string.push(`_Encourage more players to join if you want this season to start sooner!_`);

    return splitEmbed(queue_string, {
      title: "Current Queue:",
      title_pages: true,
      fixed_width: true
    });
  }
};
