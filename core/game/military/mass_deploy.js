module.exports = {
  massDeploy: function (arg0_user, arg1_armies, arg2_amount, arg3_unit_name) {
    //Convert from parameters
    var user_id = arg0_user;
    var armies_string = arg1_armies.trim();
    var raw_unit_amount = arg2_amount;
    var raw_unit_type = arg3_unit_name.trim();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var raw_unit_name = getUnit(raw_unit_type, { return_key: true });
    var unit_amount = Math.ceil(parseInt(raw_unit_amount));
    var unit_obj = getUnit(raw_unit_type);
    var usr = main.users[actual_id];

    var all_armies = Object.keys(usr.armies);

    //Check to see if user has any armies to begin with
    if (all_armies.length > 0) {
      if (!isNaN(unit_amount)) {
        if (unit_obj) {
          var deploy_in_armies = parseArmies(armies_string);

          if (deploy_in_armies.length > 0) {
            //Get old number of units in reserves, and compare it to the new number to see how many units have been successfully deployed
            var old_unit_count = JSON.parse(JSON.stringify(returnSafeNumber(usr.reserves[raw_unit_name])));

            for (var i = 0; i < deploy_in_armies.length; i++)
              deployUnits(actual_id, unit_amount, raw_unit_name, deploy_in_armies[i]);

            var new_unit_count = old_unit_count - returnSafeNumber(usr.reserves[raw_unit_name]);
            var successful_deployments = old_unit_count - new_unit_count;

            //Return success/error messages
            (successful_deployments != 0) ?
              printAlert(game_obj.id, `You have successfully deployed up to **${parseNumber(successful_deployments)}** ${(unit_obj.name) ? unit_obj.name : raw_unit_name} in **${parseNumber(deploy_in_armies.length)}** armies.`) :
              printError(game_obj.id, `The armies you have specified could not be found! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
          } else {
            printError(game_obj.id, `The names you have specified could not turn up any valid armies! Please double-check your spelling and type **[Army List]** for a full list of your armies.`);
          }
        } else {
          printError(game_obj.id, `**${raw_unit_type}** could not be recognised as a valid unit type! Type **[View Reserves]** for a list of units you can deploy.`);
        }
      } else {
        printError(game_obj.id, `Please enter a valid number of units! **${raw_unit_amount}** was not recognised as a valid number.`);
      }
    } else {
      printError(game_obj.id, `You don't even have any armies to deploy units in! Try creating a new army by typing **[Create Army]**, or create multiple armies at once by typing **[Create Armies]**.`);
    }
  }
};
