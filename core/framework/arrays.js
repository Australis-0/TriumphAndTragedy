//Arrays framework
module.exports = {
  randomElement: function (arg0_array) {
    //Convert from parameters
    var array = arg0_element;

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
  }
};
