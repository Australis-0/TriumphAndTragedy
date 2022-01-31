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
    var processed_string = arg0_string.split("_");
    for (var i = 0; i < processed_string.length; i++) {
      processed_string[i] = processed_string[i][0].toUpperCase() + processed_string[i].substring(1);
    }
    return processed_string.join(" ");
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
