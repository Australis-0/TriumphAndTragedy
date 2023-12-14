module.exports = {
  debugInstantResearch: function (arg0_user, arg1_technology) {
    //Convert from parameters
    var user_id = arg0_user;
    var technology_name = arg1_technology.trim().toLowerCase();

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var technology_obj = getTechnology(technology_name);
    var usr = main.users[actual_id];

    //Check to make sure technology exists
    if (usr) {
      if (technology_obj) {
        instantResearch(user_id, technology_name);

        return [true, `Instantly researched **${(technology_obj.name) ? technology_obj.name : technology_name}** for **${usr.name}**.`];
      } else {
        return [false, `You must specify a valid technology name! **${technology_name}** could not be recognised.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  },

  debugResearchUpTo: function (arg0_user, arg1_knowledge_cost) {
    //Convert from parameters
    var user_id = arg0_user;
    var knowledge_cost = parseInt(arg1_knowledge_cost);

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    //Check that number is valid
    if (usr) {
      if (!isNaN(knowledge_cost)) {
        var research_up_to = researchUpTo(user_id, knowledge_cost);

        //Return statement
        return [true, `Researched **${parseNumber(research_up_to)}** techs up to **${parseNumber(knowledge_cost)}** Knowledge cost for **${usr.name}**.`];
      } else {
        return [false, `You must specify a valid number as the Knowledge cost to research up to.`];
      }
    } else {
      return [false, `The user you have specified does not exist.`];
    }
  }
};
