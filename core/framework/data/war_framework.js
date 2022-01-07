module.exports = {
  generateWarID: function () {
    var local_id;

    //While loop to find ID, just in-case of conflicting random ID's:
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!main.global.wars[local_id]) {
        return local_id;
        break;
      }
    }
  },

  /*
    initialiseWar() - Creates a new war data structure with aggressors and all. Make sure users can't declare war on themselves
    options: {
      attacker: "user_id",
      defender: "ot_user_id"
    }
  */
  initialiseWar: function (arg0_options) { //[WIP] - Format war object properly
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var attacker_id = main.global.user_map[options.attacker];
    var attacker_obj = main.users[attacker_id];
    var defender_id = main.global.user_map[options.defender];
    var defender_obj = main.users[defender_obj];

    //Declare war_obj and format
    var war_id = module.exports.generateWarID();
    var war_obj = {
      name: `${main.global.cultures[getPrimaryCultures(attacker_id)[0]].adjective}-${main.global.cultures[getPrimaryCultures(defender_id)[1]].adjective} War`,
      starting_date: JSON.parse(JSON.stringify(main.date)),
      starting_round: JSON.parse(JSON.stringify(main.round_count)),

      attackers_war_leader: attacker_id,
      defenders_war_leader: defender_id,
      attackers: [attacker_id],
      defenders: [defender_id],

      attacker_total_casualties: 0,
      defender_total_casualties: 0,
      attacker_warscore: 0,
      defender_warscore: 0,

      peace_treaties: {}
    };

    //Automatically call in all vassals on both sides
  }
};
