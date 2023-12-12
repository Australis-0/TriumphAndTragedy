module.exports = {
  debugFreezeTime: function () {
    if (!main.global.freeze_time) {
      main.freeze_time = true;

      return [true, `Froze time.`];
    } else {
      delete main.freeze_time;

      return [true, `Resumed time.`];
    }
  },

  debugFreezeTurns: function () {
    if (!main.global.freeze_turns) {
      main.freeze_turns = true;

      return [true, `Froze turn processing.`];
    } else {
      delete main.freeze_turns;

      return [true, `Resumed turn processing.`];
    }
  },

  debugSetDate: function (arg0_year, arg1_month, arg2_day) {
    //Convert from parameters
    var year = parseInt(arg0_year);
    var month = parseInt(arg1_month);
    var day = parseInt(arg2_day);

    //Declare local instance variables
    var days_in_months = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var local_days_in_months = days_in_months[month];

    if (month > 0 && month <= 12) {
      if (day > 0 && day <= days_in_months) {
        main.date.year = year;
        main.date.month = month;
        main.date.day = day;

        return [true, `You have set the date to ${main.date.day} ${months[main.date.month]} ${main.date.year}`];
      } else {
        return [false, `${day} is not a valid day in ${months[month]}`];
      }
    } else {
      return [false, `There is no ${ordinalise(month)} month!`];
    }
  }
};
