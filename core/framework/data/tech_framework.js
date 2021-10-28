module.exports = {
  getAllTechnologies: function () {
    //Declare local instance variables
    var all_tech_categories = Object.keys(config.technology);
    var tech_array = [];

    //Iterate over all categories and their respective keys
    for (var i = 0; i < all_tech_categories; i++) {
      var local_category = config.technology[all_tech_categories[i]];
      var local_techs = Object.keys(local_category);

      for (var x = 0; x < local_techs.length; x++)
        tech_array.push(local_category[local_techs[x]]);
    }

    //Return statement
    return tech_array;
  }
};
