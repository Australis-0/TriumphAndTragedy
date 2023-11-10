module.exports = {
  initialiseSetTax: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Initialsie visual prompt
    visualPrompt(game_obj.alert_embed, user_id, {
      title: `Adjust Tax Code:`,
      prompts: [
        [`Please type the name of the tax type you would like your bureaucrats to adjust.`, "string"],
        [`What is the effective percentage you would like to change these taxes to?`, "number", { min: 0, max: 100 }]
      ]
    },
    function (arg) {
      module.exports.setTax(user_id, arg[0], arg[1]/100);
    });
  },

  //setTax() - Tax is set depending on the one fetched in config.budget.taxes
  setTax: function (arg0_user, arg1_tax_type, arg2_amount) {
    //Convert from parameters
    var user_id = arg0_user;
    var tax_type = arg1_tax_type.trim().toLowerCase();
    var amount = arg2_amount;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var local_tax = getTax(tax_type);
    var usr = main.users[actual_id];

    //Fetch local_max_tax
    if (local_tax) {
      var local_max_tax = (local_tax.capacity_id) ?
        returnSafeNumber(usr.modifiers[local_tax.capacity_id], 1) : 1;

      //Clamp tax
      amount = Math.max(amount, 0);
      amount = Math.min(amount, local_max_tax);

      //Set new tax
      usr[local_tax.id] = amount;

      //Print feedback
      (amount != local_max_tax) ?
        printAlert(game_obj.id, `You have set your **${(local_tax.name) ? local_tax.name : local_tax.id}** to **${printPercentage(amount)}**.`) :
        printAlert(game_obj.id, `You have set your **${(local_tax.name) ? local_tax.name : local_tax.id}** to the maximum capacity of **${printPercentage(amount)}**.`);

      //Update UI
      if (game_obj.page == "budget")
        printBudget(user_id, main.interfaces[game_obj.middle_embed.id].page);
    } else {
      printError(game_obj.id, `No tax by the name of **${tax_type}** could be found.`);
    }
  }
};
