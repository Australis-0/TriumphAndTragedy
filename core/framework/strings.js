//String framework commands
module.exports = {
  //Global Strings
  months: [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ],

  //Basic framework functions
  capitaliseWords: function (arg0_string) {
    //Convert from parameters
    var separate_words = arg0_string.split(" ");

    for (var i = 0; i < separate_words.length; i++) {
      separate_words[i] = separate_words[i].charAt(0).toUpperCase();
      separate_words[i].substring(1);
    }

    return separate_words.join(" ");
  },

  cleanStringify: function (arg0_object) {
    //Convert from parameters
    var object = arg0_object;

    if (object && typeof object === 'object') {
      object = copyWithoutCircularReferences([object], object);
    }
    return JSON.stringify(object);

    function copyWithoutCircularReferences(references, object) {
      var cleanObject = {};
      Object.keys(object).forEach(function(key) {
        var value = object[key];
        if (value && typeof value === 'object') {
          if (references.indexOf(value) < 0) {
            references.push(value);
            leanObject[key] = copyWithoutCircularReferences(references, value);
            references.pop();
          } else {
            cleanObject[key] = '###_Circular_###';
          }
        } else if (typeof value !== 'function') {
          cleanObject[key] = value;
        }
      });
      return cleanObject;
    }
  },

  equalsIgnoreCase: function (arg0, arg1) {
    return (arg0.toLowerCase() == arg1.toLowerCase());
  },

  formaliseString: function (arg0_string) {
    //Convert from parameters
    var string = arg0_string;

    //Return statement
    return string.replace(/_/g, " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  },

  getCurrentDate: function () {
    return module.exports.getDate(main.date);
  },

  getDate: function (arg0_date_obj) {
    //Convert from parameters
    var date_obj = arg0_date_obj;

    //Return statement
    return `${module.exports.ordinalise(date_obj.day)} ${module.exports.months[date_obj.month - 1]} ${date_obj.year}, ${Math.round(date_obj.hour).toString().padStart(2, "0")}:00`;
  },

  ordinalise: function (arg0_number) {
    //Convert from parameters
    var i = arg0_number;

    //Declare local instance variables
    var negative_suffix = (i < 0) ? "-" : "";

    i = Math.abs(i);
    var j = i % 10,
      k = i % 100;

    if (j == 1 && k != 11)
      return `${negative_suffix}${i}st`;
    if (j == 2 && k != 12)
      return `${negative_suffix}${i}nd`;
    if (j == 3 && k != 13)
      return `${negative_suffix}${i}rd`;
    return `${negative_suffix}${i}th`;
  },

  parseBoolean: function (arg0_boolean) {
    ///Convert from parameters
    var boolean = arg0_boolean;

    //Return statement
    return (boolean) ? "Yes" : "No";
  },

  parseDate: function (arg0_timestamp) {
    var a = new Date(arg0_timestamp);
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

    return time;
  },

  parseList: function (arg0_list) {
    //Convert from parameters
    var name_array = arg0_list;

    //Declare local tracker variables
    var name_string = "";

    //Modify ending
    if (name_array.length > 2) {
      name_array[name_array.length-1] = `and ${name_array[name_array.length-1]}`;
      name_string = name_array.join(", ");
    } else if (name_array.length == 2) {
      name_array[name_array.length-1] = `and ${name_array[name_array.length-1]}`;
      name_string = name_array.join(" ");
    } else {
      name_string = name_array[0];
    }

    //Return statement
    return name_string;
  },

  parseMapmode: function (arg0_map_mode) {
    //Convert from parameters
    var map_mode = arg0_map_mode;

    //Check for peace treaties
    if (map_mode.includes("_peace_treaty"))
      map_mode = `peace offer`;

    //Return statement
    return map_mode;
  },

  parseMilliseconds: function (arg0_milliseconds) {
    //Convert from parameters
    var duration = arg0_milliseconds;

    //Declare local instance variables
		var milliseconds = parseInt((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		return `${(hours > 0) ? parseNumber(hours) + " hours" : ""}${(minutes > 0) ? ((hours > 0) ? ", " : "") + parseNumber(minutes) + " minutes" : ""}${(seconds > 0) ? ((minutes > 0) ? ", " : "") + parseNumber(seconds) + " seconds" : ""}`;
	},

  /*
    parseNumber() - Formats a number to a string whilst displaying decimal separators (e.g. 1.567,23 instead of 1567.23).
    options: {
      display_prefix: true/false - Whether or not to display a starting prefix
    }
  */
  parseNumber: function (arg0_number, arg1_options) {
    //Convert from parameters
    var number = arg0_number;
    var options = (arg1_options) ? arg1_options : {};

    return (
      (options.display_prefix) ?
        (number > 0) ? "+" : ""
      : ""
    ) + Intl.NumberFormat('de').format(parseInt(number));
  },

  parseString: function (arg0_string) {
    var processed_string = arg0_string;

    return processed_string.split("_").join(" ").replace(/(^| )(\w)/g, s => s.toUpperCase());
  },

  processOrdinalString: function (arg0_string) {
		//Convert from parameters
		var current_string = arg0_string.toString().trim();
		var trim_patterns = [
			[/  /gm, " "],
			[" . ", ". "],
			[/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}) [a-z]*/gm]
		];
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < alphabet.split("").length; i++) {
			trim_patterns.push([` ${alphabet.split("")[i]} `, `${alphabet.split("")[i]} `]);
		}

		//Trim out, well, trim patterns
		for (var i = 0; i < trim_patterns.length; i++) {
			if (trim_patterns[i].length > 1) {
				current_string = current_string.replace(trim_patterns[i][0], trim_patterns[i][1]);
			} else {
				var current_roman_array = current_string.match(trim_patterns[i][0]);
				if (current_roman_array != null) {
					current_string = current_string.replace(current_roman_array[0], current_roman_array[0].split(" ").join(" "));
				}
			}
		}

		//Return statement
		return current_string;
	},

  stripNonNumerics: function (arg0_string) {
    //Convert from parameters
    var processed_string = arg0_string.toString().trim();

    //Return statement
    return processed_string.replace(/\D/g, "");
  },

  truncateString: function (arg0_string, arg1_number, arg2_do_not_show_dots) {
    //Convert from parameters
    var string = arg0_string;
    var number = arg1_number;
    var do_not_show_dots = arg2_do_not_show_dots;

    if (string.length > number) {
      var substring = string.substring(0, number);
      return (!do_not_show_dots) ? substring + " ..." : substring;
    } else {
      return string;
    }
  }
};
