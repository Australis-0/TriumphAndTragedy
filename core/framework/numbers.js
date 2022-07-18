//Functional numbers framework
module.exports = {
  arabicise: function (arg0_number) {
		//Convert from parameters
		var num = arg0_number;

		//Declare instance variables and reference arrays
		var array = num.split(""),
			conversion = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1, m: 1000, d: 500, c: 100, l: 50, x: 10, v: 5, i: 1 },
			total = 0,
			current,
			current_value,
			next,
			next_value;

		//Loop through provided number string
		for (var i = 0; i < array.length; i++) {
			current = array[i];
			current_value = conversion[current];

			next = array[i+1];
			next_value = conversion[next];

			if (current_value < next_value) {
				total -= current_value;
			} else {
				total += current_value;
			}
		}

		//Return statement
		return total;
	},

  deordinalise: function (arg0_string) {
		//Convert from parameters, add reference arrays
		var deordinalised_string = arg0_string;
		var ordinals = ["st", "nd", "rd", "th"];

		//Split up into multiple chunks
		deordinalised_string = (deordinalised_string.includes(" ")) ? deordinalised_string.split(" ") : [deordinalised_string];

		//Remove stray ordinals
		for (var i = 0; i < deordinalised_string.length; i++) {
			for (var x = 0; x < ordinals.length; x++) {
				if (deordinalised_string[i].indexOf(ordinals[x]) == 0) {
					deordinalised_string[i] = deordinalised_string[i].replace(ordinals[x], "");
				}
			}
			if (deordinalised_string[i] == "") {
				deordinalised_string.splice(i, 1);
			}
		}

		//Iterate over to purge ordinals
		for (var i = 0; i < deordinalised_string.length; i++) {
			//Look for ordinal
			var ordinal_found = false;
			for (var x = 0; x < ordinals.length; x++) {
				if (deordinalised_string[i].indexOf(ordinals[x]) != -1) {
					ordinal_found = true;
				}
			}

			var total_ordinal_amount = (ordinal_found) ? 2 : 0;
			var ordinal_percentage = total_ordinal_amount/deordinalised_string[i].length;

			if (ordinal_percentage > 0.50) { //Ordinal makes up majority of string, so delete
				deordinalised_string.splice(i, 1);
			}
		}

		return deordinalised_string.join(" ").trim();
	},

  generateRandomID: function () {
    //Return statement
    return randomNumber(0, 100000000000).toString();
  },

  getAverage: function (arg0_numbers) {
    //Convert from parameters
    var numbers = getList(arg0_numbers);

    //Iterate over numbers array and return average
    var total_sum = 0;

    for (var i = 0; i < numbers.length; i++)
      total_sum += numbers[i];

    //Return statement
    return total_sum/numbers.length;
  },

  getSum: function (arg0_numbers) {
    //Convert from parameters
    var numbers = getList(arg0_numbers);

    //Iterate over numbers array and return sum
    var total_sum = 0;

    for (var i = 0; i < numbers.length; i++)
      total_sum += numbers[i];

    //Return statement
    return total_sum;
  },

  //parseYears() - Returns days/months/years as an object depending on the year amount
  parseYears: function (arg0_number) {
    //Convert from parameters
    var years_elapsed = arg0_number;

    //Declare local instance variables
    var is_leap_year = (
      main.date.year % 4 == 0 &&
      !(main.date.year % 100 == 0 && main.date.year % 400 != 0)
    );
    var time_elapsed = {
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    };

    var days_in_months = (!is_leap_year) ?
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] :
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //Take care of the year field first
    time_elapsed.year = Math.floor(years_elapsed);
    years_elapsed -= Math.floor(years_elapsed);

    //How many days has it been?
    time_elapsed.day = Math.floor(
      years_elapsed*((!is_leap_year) ? 365 : 366)
    );
    years_elapsed -= time_elapsed.day/((!is_leap_year) ? 365 : 366);

    //How many months has it been?
    for (var i = 0; i < days_in_months.length; i++)
      if (time_elapsed.day >= days_in_months[i]) {
        time_elapsed.day -= days_in_months[i];
        time_elapsed.month++;
      }

    //How many hours has it been?
    time_elapsed.hour = years_elapsed*((!is_leap_year) ? 365*24 : 366*24);

    //Return statement
    time_elapsed.days_in_months = days_in_months;
    return time_elapsed;
  },

  /*
    printPercentage() - Formats a string to fit a certain percentage (e.g. 23%), instead of a default decimal number.
    options: {
      base_zero: true/false - Whether to start at a base zero instead of one
      display_prefix: true/false - Whether or not to display a starting prefix
      is_modifier: true/false - Used for parsing negative modifiers
    }
  */
  printPercentage: function (arg0_number, arg1_options) {
    //Convert from parameters
    var number = arg0_number;
    var options = (arg1_options) ? arg1_options : {};

    if (options.base_one)
      number--;

    //Return statement
    return `${(options.display_prefix) ? (
      (number > 1 && !options.base_zero) ||
      (number > 0 && options.base_zero)
    ) ? "+" : "" : ""}${Math.round(number*100)}%`;
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

  romanise: function (arg0_number) {
		//Convert from parameters
		var num = arg0_number;

		//Declare reference array
		var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1, m: 1000, cm: 900, d: 500, cd: 400, c: 100, xc: 90, l: 50, xl: 40, x: 10, ix: 9, v: 5, iv: 4, i: 1},
			roman = "",
			i;

		for (i in lookup) {
			while (num >= lookup[i]) {
				roman += i;
				num -= lookup[i];
			}
		}

		//Return statement
		return roman;
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
