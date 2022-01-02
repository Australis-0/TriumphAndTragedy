module.exports = {
  /*
    parseLocalisation() - Returns the processed string of a bit of localisation.
    options: {
      scopes: {
        FROM: "actual_id",
        LOCAL: "actual_id",
        TO: "actual_id"
      }
    }
  */
  parseLocalisation: function (arg0_string, arg1_options) {
    //Convert from parameters
    var localisation_string = arg0_string;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_scopes = Object.keys(options.scopes);
    var all_localisation_matches = [];
    var all_localisation_keys = localisation_string.match(/\{(.*?)\}/g);

    try {
      if (all_localisation_keys) {
        //Process all_localisation_matches
        for (var i = 0; i < all_localisation_keys.length; i++) {
          var local_value = all_localisation_keys[i];
          var local_replacement = local_value.replace("{", "").replace("}", "");

          var processed_replacement = "";

          //Replace scopes
          for (var x = 0; x < all_scopes.length; x++)
            local_replacement = local_replacement.replace(all_scopes[x], `main.users['${options.scopes[all_scopes[x]]}']`);

          local_replacement = local_replacement.replace(`GLOBAL`, `main.global`);

          //Evaluate statement, [WIP] - This may pose a security hazard in the future
          processed_replacement = eval(local_replacement);

          //Push processed_replacement to all_localisation_matches
          all_localisation_matches.push(processed_replacement);
        }

        //Replace keys in text with matches
        for (var i = 0; i < all_localisation_keys.length; i++)
          localisation_string = localisation_string.replace(all_localisation_keys[i], all_localisation_matches[i]);
      }
    } catch (e) {
      log.error(`parseLocalisation() - ran into an error: ${e}.`);
      console.log(e);
    }

    //Return statement
    return localisation_string;
  }
};
