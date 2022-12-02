module.exports = {
  /*
    addPartyPopularity() - Adds a certain amount of popularity to a party whilst making sure that all party popularities add up to 100%.
    options: {
      ideology: "<ideology_name>",
      amount: 0.10
    }
  */
  addPartyPopularity: function (arg0_user, arg1_options) {
    //Convert from parameters
    var user_id = arg0_user;
    var options = arg1_options;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_governments = Object.keys(config.governments);
    var government_name = module.exports.getParty(options.ideology, { return_key: true });
    var government_obj = module.exports.getParty(options.ideology);
    var usr = main.users[actual_id];

    //Check if the specified party actually exists
    if (government_obj) {
      //Adjust everything else to 100%
      var other_party_popularity_sum = 0;
      var simulated_politics = JSON.parse(JSON.stringify(usr.politics));

      //Delete party in question from simulated politics
      delete simulated_politics[government_name];

      //Sum up popularity first
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = usr.politics[all_governments[i]];

        if (all_governments[i] != government_name)
          other_party_popularity_sum += local_government.popularity;
      }

      //Scale after summing
      var all_simulated_parties = Object.keys(simulated_politics);
      var missing_popularity = usr.politics[government_name].popularity;
      var scalar = 1 - options.amount;

      //Now reduce from simulated governments by options.amount, proportionally
      for (var i = 0; i < all_simulated_parties.length; i++) {
        var local_government = simulated_politics[all_simulated_parties[i]];

        local_government.popularity = local_government.popularity*
          (1 - (options.amount/all_simulated_parties.length));
      }

      //Override all .popularity keys in real politics
      for (var i = 0; i < all_simulated_parties.length; i++)
        usr.politics[all_simulated_parties[i]].popularity = simulated_politics[all_simulated_parties[i]].popularity;

      //Add to beginning party
      usr.politics[government_name].popularity += options.amount;

      //Even everything out to 100%
      module.exports.balanceParties(user_id);
    }
  },

  balanceParties: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var all_governments = Object.keys(config.governments);
    var total_party_popularity = 0;
    var usr = main.users[actual_id];

    //Fetch total party popularity
    for (var i = 0; i < all_governments.length; i++)
      total_party_popularity += usr.politics[all_governments[i]].popularity;

    if (total_party_popularity > 1) {
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = usr.politics[all_governments[i]];

        local_government.popularity = local_government.popularity*(1/total_party_popularity);
      }
    }
  },

  /*
    getParty() - Returns a party object/key depending on the options passed.
    options: {
      return_key: true/false - Whether or not to return a key instead of an object. Defaults to false
    }
  */
  getParty: function (arg0_government_name, arg1_options) {
    //Convert from parameters
    var government_name = arg0_government_name.trim().toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_governments = Object.keys(config.governments);
    var government_exists = [false, ""]; //[government_found, government_key/obj];

    //Key search
    {
      //Soft match
      for (var i = 0; i < all_governments.length; i++)
        if (all_governments[i].toLowerCase().indexOf(government_name) != -1)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];

      //Hard match
      for (var i = 0; i < all_governments.length; i++)
        if (all_governments[i].toLowerCase() == government_name)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];
    }

    //Name search
    if (!government_exists[0]) {
      //Soft search
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.name.toLowerCase().indexOf(government_name) != -1)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];
      }

      //Hard search
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.name.toLowerCase() == government_name)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];
      }
    }

    //Adjective search
    if (!government_exists[0]) {
      //Soft search
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.adjective.toLowerCase().indexOf(government_name) != -1)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];
      }

      //Hard search
      for (var i = 0; i < all_governments.length; i++) {
        var local_government = config.governments[all_governments[i]];

        if (local_government.adjective.toLowerCase() == government_name)
          government_exists = [true, (options.return_key) ? all_governments[i] : config.governments[all_governments[i]]];
      }
    }

    //Return statement
    return (government_exists[0]) ? government_exists[1] : undefined;
  },

  getStability: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Declare local instance variables
    var government_stability_modifier = getGovernmentStabilityModifier(user_id);
    var popularity_stability_modifier = usr.politics[usr.government].popularity*0.75;

    //Calculate stability
    return (
      popularity_stability_modifier +
      government_stability_modifier -
      usr.tax_rate -
      usr.modifiers.overextension +
      returnSafeNumber(usr.boosted_stability) +
      usr.modifiers.stability_modifier
    )
  }
};
