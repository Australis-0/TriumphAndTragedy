//Arrays framework
module.exports = {
  findDuplicates: function (arg0_array) {
    //Convert from parameters
    var array = arg0_array;

    //Declare local instance variables
    var local_duplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index)

    //Return statement
    return [... new Set(local_duplicates(array))];
  },

  hasDuplicate: function (arg0_array, arg1_element) {
    //Convert from parameters
    var array = arg0_array;
    var element = arg1_element;

    //Declare local instance variables
    var element_count = 0;

    for (var i = 0; i < array.length; i++)
      if (element == array[i]) element_count++;

    //Return statement
    return (element_count > 0);
  },

  getList: function (arg0_array) {
    //Convert from parameters
    var list = arg0_array;

    //Return statement
    return (Array.isArray(list)) ? list : [list];
  }

  randomElement: function (arg0_array) {
    //Convert from parameters
    var array = arg0_array;

    //Return statement
    return array[Math.floor(Math.random()*array.length)];
  },

  removeElement: function (arg0_array, arg1_element) {
    //Convert from parameters
    var array = arg0_array;
    var element = arg1_element;

    //Declare local instance variables and splice element
    try {
      var local_index = array.indexOf(element);
      if (local_index != -1) array.splice(local_index, 1);
    } catch {}

    //Return statement
    return array;
  },

  shuffleArray: function (arg0_array) {
    //Convert from parameters
    var array = arg0_array;

    //Declare local instance variables
    var shuffled_array = array;
    var current_index = array.length,
      temporary_value,
      random_index;

    //Shufle array (Fisher-Yates)
    while (0 != current_index) {
      random_index = Math.floor(Math.random()*current_index);
      current_index--;
      temporary_value = shuffled_array[current_index];
      shuffled_array[current_index] = shuffled_array[random_index];
      shuffled_array[random_index] = temporary_value;
    }

    //Return statement
    return shuffled_array;
  }
};
