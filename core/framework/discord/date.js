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
};
