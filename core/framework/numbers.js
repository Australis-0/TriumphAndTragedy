//Functional numbers framework
module.exports = {
  generateRandomID: function () {
    //Return statement
    return randomNumber(0, 100000000000).toString();
  },

  /*
    printPercentage() - Formats a string to fit a certain percentage (e.g. 23%), instead of a default decimal number.
    options: {
      display_prefix: true/false - Whether or not to display a starting prefix
    }
  */
  printPercentage: function (arg0_number, arg1_options) {
    //Convert from parameters
    var number = arg0_number;
    var options = (arg1_options) ? arg1_options : {};

    //Return statement
    return `${(options.display_prefix) ? (number > 1) ? "+" : "" : ""}${Math.round(number*100)}%`;
  },

  /*
    printRange() - Returns a given range of numbers as a string using [min, max] format.
    array: [
      number_1,
      number_2
    ]
  */
  printRange: function (arg0_array) {
    //Convert from parameters
    var array = arg0_array;

    //Return statement
    return (array[0] == array[1]) ?
      parseNumber(array[0]) :
      `${parseNumber(Math.min(array[0], array[1]))} - ${parseNumber(Math.max(array[0], array[1]))}`;
  },

  randomNumber: function (min, max) {
    //Return statement
  	return Math.round(Math.random() * (max - min) + min);
  },

  returnSafeNumber: function (arg0_operation, arg1_default) {
    //Convert from parameters
    var operation = arg0_operation;
    var default_number = (arg1_default) ? arg1_default : 0;

    //Return statement
    return (!isNaN(operation) && isFinite(operation)) ? operation : default_number;
  },

  splitNumber: function (arg0_number, arg1_parts) {
    //Convert from parameters
    var number = arg0_number;
    var parts = arg1_parts;

    //Return statement
    return [...module.exports.splitNumberParts(number, parts)];
  },

  splitNumberParts: function* (arg0_number, arg1_parts) {
    //Convert from parameters
    var number = arg0_number;
    var parts = arg1_parts;

    //Declare local instance variables
    var sum_parts = 0;

    //Split number randomly
    for (var i = 0; i < parts-1; i++) {
      var part_number = Math.random()*(number-sum_parts);
      yield part_number;
      sum_parts += part_number;
      yield number - sum_parts;
    }
  }
};
