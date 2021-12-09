module.exports = {
  give: function (arg0_user, arg1_receiving_user, arg2_amount, arg3_good_type) {
    //Convert from parameters
    var user_id = arg0_user;
    var other_user = arg1_receiving_user;
    var raw_amount = parseInt(arg2_amount);
    var raw_good_name = arg3_good_type.toLowerCase();
    var good_name = getGood(arg3_good_type, { return_key: true });
    var good_obj = getGood(arg3_good_type);
    var amount = parseInt(Math.round(arg1_amount/100));

    //Convert from parameters
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var ot_actual_id = main.global.user_map[other_user];
    var ot_user = main.users[ot_actual_id];
    var usr = main.users[actual_id];

    //Check to make sure that user isn't giving goods to themselves
    if (actual_id != ot_actual_id) {
      if (!isNaN(raw_amount)) {
        if (raw_amount >= 0) {
          if (raw_amount > 0) {
            if (!good_obj.research_good) {
              if (!good_obj.doesnt_stack) {
                if (good_obj) {

                } else if (raw_good_name == "money") {

                } else {
                  printError(game_obj.id, `You may only ship inventory goods or money!`);
                }
              } else {
                printError(game_obj.id, `You can't ship non-stackable items to other players!`);
              }
            } else {
              printError(game_obj.id, `You can't ship knowledge to other players!`);
            }
          } else {
            printError(game_obj.id, `You can't give zero units of something!`);
          }
        } else {
          printError(game_obj.id, `You can't steal from other users like that!`);
        }
      } else {
        printError(game_obj.id, `You must give a valid numeric amount of stuff!`);
      }
    } else {
      printError(game_obj.id, `You can't give stuff to yourself!`);
    }
  }
};
