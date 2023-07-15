//Log framework
module.exports = {
  log_prefix: "[Triumph & Tragedy]",
  log: {
    debug: function (arg0_string, arg1_console_string) {
      //Convert from parameters
      var log_string = arg0_string;
      var console_string = arg1_console_string;

      //Console function
      if (settings.debug_mode) {
        console.log(`\x1b[36m${log_prefix} [DEBUG] \x1b[0m${log_string}`);
        if (console_string)
          console.log(console_string);
      }
    },
    error: function (arg0_string) {
      //Convert from parameters
      var log_string = arg0_string;

      //Console function
      console.log(`\x1b[31m${log_prefix} [ERROR] \x1b[91m${log_string}\x1b[0m`);
    },
    info: function (arg0_string) {
      //Convert from parameters
      var log_string = arg0_string;

      //Console function
      console.log(`\x1b[36m${log_prefix} [INFO] \x1b[0m${log_string}`);
    },
    warn: function (arg0_string) {
      //Convert from parameters
      var log_string = arg0_string;

      //Console function
      console.log(`\x1b[33m${log_prefix} [WARN] \x1b[93m${log_string}\x1b[0m`);
    }
  },
};
