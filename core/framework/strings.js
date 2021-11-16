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
