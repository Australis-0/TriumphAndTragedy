module.exports = {
  getTimeModifier: function () {
    //Declare local instance variables
    var time_modifiers = config.defines.common.time_modifier;
    var current_time_modifier = 1;

    //Fetch current_time_modifier
    for (var i = 0; i < time_modifiers.length; i++)
      if (main.date.year >= time_modifiers[i][0] && main.date.year < time_modifiers[i][1])
        current_time_modifier = time_modifiers[i][2];

    //Return statement
    return current_time_modifier;
  },

  getTurnHours: function () {
    //Declare local instance variables
    var time_modifier = module.exports.getTimeModifier();
    var total_hours = 0;

    var processed_time = module.exports.parseYears(time_modifier);

    //Return total number of hours
    if (processed_time.year > 0)
      for (var i = 0; i < processed_time.year; i++) {
        var current_year = main.date.year + i;
        var is_leap_year = module.exports.isLeapYear(current_year);

        total_hours += (!is_leap_year) ?
          365*24 : 366*24;
      }

    //Get month hours
    if (processed_time.month > 0)
      for (var i = 0; i < processed_time.month; i++) {
        var current_month = (main.date.month - 1 + i) % 12;
        var days_in_month = processed_time.days_in_months[current_month];

        total_hours += returnSafeNumber(days_in_month*24);
      }

    //Get day/hours
    total_hours += processed_time.day*24;
    total_hours += processed_time.hour;

    //Return statement
    return total_hours;
  },

  isLeapYear: function (arg0_year) {
    //Convert from parameters
    var year = arg0_year;

    //Return statement
    return (
      year % 4 == 0 &&
      !(year % 100 == 0 && year % 400 != 0)
    );
  },

  //parseYears() - Returns days/months/years as an object depending on the year amount
  parseYears: function (arg0_number) {
    //Convert from parameters
    var years_elapsed = arg0_number;

    //Declare local instance variables
    var is_leap_year = module.exports.isLeapYear(main.date.year);
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
};
