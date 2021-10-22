//Arrays framework
module.exports = {
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
