module.exports = {
  addResearchQueue: function (arg0_user, arg1_technology_name) { //[WIP] - Remember to update queue UI when a new technology is appended to the queue
    //Convert from parameters
    var user_id = arg0_user;
    var raw_technology_name = arg1_technology_name.toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Declare local tracker variables
    var is_in_queue = false;
    var is_in_research = false;
    var tech_name = getTechnology(raw_technology_name, { return_key: true });
    var tech_obj = getTechnology(raw_technology_name);

    //Check if tech exists first
    if (tech_obj) {
      //Check if tech is already in queue or is being researched; if so, the tech cannot be added onto the queue
      is_in_queue = (usr.research_queue.includes(tech_name));

      for (var i = 0; i < usr.researching.length; i++)
        if (usr.researching[i].technology == tech_name)
          is_in_research = true;

      if (usr.research_queue.length < 20) {
        if (!is_in_queue) {
          if (!is_in_research) {
            usr.research_queue.push(tech_name);

            printAlert(`You have successfully added **${(tech_obj.name) ? tech_obj.name : tech_name}** to your research queue.`);
          } else {
            printError(`You are already researching this item! Therefore, this technology could not be added to your queue.`);
          }
        } else {
          printError(`**${tech_name}** has already been added into your queue! Check your current queue for more information.`);
        }
      } else {
        printError(`You have already hit your maximum queue limit! Consider freeing up space by cancelling one of your queued items.`);
      }
    } else {
      printError(game_obj.id, `The tech you have specified proved as elusive as perpetual motion!`);
    }
  },

  removeResearchQueue: function (arg0_user, arg1_slot) { //[WIP] - Remember to update queue UI when a new technology is appended to the queue
    //Convert from parameters
    var user_id = arg0_user;
    var slot_number = parseInt(arg1_slot) - 1;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var game_obj = getGameObject(user_id);
    var usr = main.users[actual_id];

    //Check if slot_number is actually a valid number or not
    if (!isNaN(slot_number)) {
      if (usr.research_queue[slot_number]) {
        var local_tech_obj = getTechnology(usr.research_queue[slot_number]);

        //Print user feedback when slot is removed from research queue
        printAlert(game_obj.id, `You have removed **${(local_tech_obj.name) ? local_tech_obj.name : usr.research_queue[slot_number]}** from your research queue.`);

        //Remove tech from research queue
        usr.research_queue.splice(slot_number, 1);
      } else {
        printError(game_obj.id, `That slot was not a valid numeric ID! Check your research queue first to see which research orders can be cancelled.`);
      }
    } else {
      printError(game_obj.id, `You must specify a valid numeric ID! Try typing in an actual number next time.`);
    }
  }
};
