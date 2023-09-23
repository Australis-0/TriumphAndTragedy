module.exports = {
  betaFunction: function (arg0_x, arg1_y) {
    //Convert from parameters
    var x = arg0_x;
    var y = arg1_y;

    //Declare local instance variables
    var intervals = 100; //Magic number for Riemann interval approximations
    var interval_width = 1.0/intervals;
    var sum = 0;

    //Guard clauses
    if (x <= 0 || y <= 0) return 0;

    //Iterate over Riemann intervals
    for (var i = 0; i < intervals; i++) {
      var local_t = i * interval_width;
      sum += Math.pow(local_t, x - 1) * Math.pow(1 - local_t, y - 1);
    }

    //Return statement; apply trapezoidal rule integration
    return (interval_width / 2)*
      (Math.pow(0, x - 1)*Math.pow(1, y - 1) + Math.pow(1, x - 1)*Math.pow(0, y - 1) + 2*sum);
  },

  gammaFunction: function (arg0_x) {
    //Convert from parameters
    var x = arg0_x;

    //Declare local instance variables
    var g = 7; //Lanczos coefficient g
    var p = [ //Lanczos coefficient set p
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7,
    ];

    //Guard clause
    if (x < 0.5)
      return Math.PI/(Math.sin(Math.PI*x)*module.exports.gammaFunction(1 - x));

    x--;
    var lanczos_coeff = p[0];
    var lanczos_t = x + g + 0.5;

    //Iterate through p starting from the second coefficient (1st is initialised)
    for (var i = 0; i < p.length; i++)
      lanczos_coeff += p[i]/(x + i);

    //Return statement; calculate gamma function from Lanczos formula
    return Math.sqrt(2*Math.PI)*Math.pow(lanczos_t, x + 0.5)*Math.exp(-lanczos_t)*lanczos_coeff;
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

  getCDF: function (arg0_pdf, arg1_min, arg2_max, arg3_intervals) {
    //Convert from parameters
    var pdf = arg0_pdf;
    var min = arg1_min;
    var max = arg2_max;
    var intervals = (arg3_intervals) ? arg3_intervals : Math.abs(max - min);

    //Declare local instance variables
    var sum = 0;
    var width = (max - min)/intervals;

    //Iterate over intervals
    for (var i = 0; i <= intervals; i++) {
      var x = min + i*width;
      var pdf_value = pdf(x);

      //Midpoint Riemann integration
      sum += (i == 0 || i == intervals) ?
        pdf_value/2 :
        pdf_value;
    }

    //Return statement
    return sum*width;
  },

  getLogarithmic: function (arg0_number, arg1_min, arg2_max, arg3_steepness) {
    //Convert from parameters
    var number = parseInt(arg0_number);
    var min = Math.min(parseInt(arg1_min), 1);
    var max = Math.max(parseInt(arg2_max), 1);
    var steepness = (arg3_steepness) ? parseInt(arg3_steepness) : 1;

    //Position will be between 0 and 100
    var min_position = 0;
    var max_position = 100;

    //Calculate steepness - abs # > %
    max = Math.max(Math.pow(max, steepness - (number/max)*(steepness - 1)), 1);

    //The result should be between min and max
    var min_value = Math.log(min);
    var max_value = Math.log(max);

    //Make sure number can't go lower than min
    if (number < min)
      number = min;

    //Calculate adjustment factor
    var scale = (max_value - min_value)/(max_position - min_position);

    //Return statement
    return Math.round(
      (Math.log(number) - min_value)/scale + min_position
    );
  },

  getLogarithmicScale: function (arg0_number, arg1_min, arg2_max, arg3_steepness) {
    //Convert from parameters
    var number = parseInt(arg0_number);
    var min = Math.min(parseInt(arg1_min), 1);
    var max = Math.max(parseInt(arg2_max), 1);
    var steepness = (arg3_steepness) ? parseInt(arg3_steepness) : 1;

    //Position will be between 0 and 100
    var min_position = 0;
    var max_position = 100;

    //Calculate steepness - (number/max) is flawed - % > abs #
    number = number*(1/(steepness - 1)); //Adjust to steepness first
    number = number/Math.min(steepness - 1, 1);

    max = Math.max(
      Math.pow(max, steepness - (number/100)*(steepness - 1))
    , 1);

    //The result should be between min and max
    var min_value = Math.log(min);
    var max_value = Math.log(max);

    //Make sure number can't go lower than min
    if (number < min)
      number = min;

    //Calculate adjustment factor
    var scale = (max_value - min_value)/(max_position - min_position);

    //Return statement
    return Math.round(
      Math.exp(min_value + scale*(number - min_position))
    );
  },

  //getZipfTerm() - Fetches the Zipf term for a given value
  getZipfTerm: function (arg0_number) {
    //Convert from parameters
    var number = arg0_number;

    //Declare local instance variables
    var current_sum = 0;

    //Iterate to 1000 to prevent crashes
    for (var i = 0; i < 1000; i++) {
      current_sum += 1/(i + 2);

      if (current_sum > number) return i + 1;
    }

    return 1000; //It was just exceedingly rare
  },

  heuristicSkewness: function (arg0_mean, arg1_min, arg2_max) {
    //Convert from parameters
    var mean = arg0_mean;
    var min = arg1_min;
    var max = arg2_max;

    //Declare local instance variables
    var midpoint = (min + max)/2;

    //Return statements
    if (mean < midpoint)
      return (mean - min)/(midpoint - min); //Negative skewness
    if (mean > midpoint)
      return (max - mean)/(max - midpoint); //Positive skewness
    return 0; //Symmetric distribution
  },

  /*
    pearsonVIIDistribution() - Returns percentage distribution as an object of key:value pairings. Truncated Pearson Type VII.
    options: {
      key_name: "", - Optional. Is added to distribution_obj if defined
      truncate_amount: true/false - Optional. Whether to define keys outside the min, max range. False by default
      spread: 0, - Optional. Custom defines a spread. Uses statistical_dispersion by default
    }
  */
  pearsonVIIDistribution: function (arg0_amount, arg1_mean, arg2_min, arg3_max, arg4_options) {
    //Convert from parameters
    var amount = arg0_amount;
    var mean = Math.floor(arg1_mean); //Has to be a whole number for key:value pairings
    var min = arg2_min;
    var max = arg3_max;
    var options = (arg4_options) ? arg4_options : {};

    //Initialise options
    if (!options.key_name) options.key_name = "";

    //Declare local instance variables
    var bayesian_sum = 0;
    var distribution_obj = {};
    var skew = 2 + module.exports.heuristicSkewness(mean, min, max);
    var statistical_dispersion = (Math.abs(mean - min) + Math.abs(max - mean))/2;

    var spread = (options.spread) ? options.spread : Math.abs(max - min)/(3*statistical_dispersion); //Roughly 3 standard deviations. Doesn't actually cover this due to non-trapezoidal Riemann. Too lazy to implement that, though!

    //Get skew_tail. By default this is symmetrical
    var domain = Math.abs(max - min);
    var max_distance = Math.abs(max - mean);
    var min_distance = Math.abs(min - mean);
    var skew_tail;

    if (max_distance > min_distance) {
      skew_tail = ["max", min_distance];
    } else if (max_distance < min_distance) {
      skew_tail = ["min", max_distance];
    }

    var lesser_fraction = skew_tail[1]/domain;
    var post_scalar = (1/lesser_fraction);

    //Iterate over amount as number of keys
    for (var i = 0; i < amount; i++) {
      var local_value = 0;
      var scalar = 1;

      if (i >= min && i <= max)
        local_value = pearsonVIIPDF(i, mean, skew, statistical_dispersion, min, max);

      //Multiply local_value by scalar
      if (skew_tail)
        if (i < mean) {
          var triangle_scalar = (i - min + 1)/(mean - min);
          triangle_scalar = triangle_scalar*post_scalar*2;

          if (skew_tail[0] == "min") {
            local_value = local_value*triangle_scalar;
          } else {
            local_value = local_value/triangle_scalar;
          }
        } else if (i > mean) {
          var triangle_scalar = 1 - ((i - mean)/(max_distance + 1));
          triangle_scalar = triangle_scalar*post_scalar*2;

          if (skew_tail[0] == "min") {
            local_value = local_value/triangle_scalar;
          } else {
            local_value = local_value*triangle_scalar;
          }
        }

      if ((i >= min && i <= max) || !(options.truncate_amount && local_value == 0)) {
        distribution_obj[`${(options.key_name) ? options.key_name + "_" : ""}${i}`] = local_value;
        bayesian_sum += returnSafeNumber(local_value);
      }
    }

    //Standardise to 100% over bounds
    var standard_scalar = 1/bayesian_sum;
    for (var i = 0; i < amount; i++) {
      var local_key = `${(options.key_name) ? options.key_name + "_" : ""}${i}`;
      distribution_obj[local_key] = distribution_obj[local_key]*standard_scalar;

      if (i < min || i > max)
        distribution_obj[local_key] = 0;
    }

    //Return statement
    return distribution_obj;
  },

  pearsonVIIPDF: function (arg0_x, arg1_mean, arg2_shape, arg3_scale, arg4_min, arg5_max) {
    //Convert from parameters
    var x = arg0_x;
    var mean = arg1_mean;
    var shape = arg2_shape;
    var scale = arg3_scale;
    var min = arg4_min;
    var max = arg5_max;

    //Declare local instance variables
    var preadj_pvii_numerator = scale/Math.sqrt(Math.PI*shape)*module.exports.gammaFunction(shape);
    var preadj_pvii_denominator = Math.pow(1 + Math.pow((x - mean)/scale, 2), shape);
    var pvii_scalar_a = radiansToDegrees(Math.atan((max - mean)/scale));
    var pvii_scalar_b = radiansToDegrees(Math.atan((min - mean)/scale));

    var pvii_scalar = pvii_scalar_a - pvii_scalar_b;

    //Return statement
    return (preadj_pvii_numerator/preadj_pvii_denominator)*pvii_scalar;
  },

  radiansToDegrees: function (arg0_radians) {
    //Convert from parameters
    var radians = arg0_radians;

    //Return statement
    return (radians*180)/Math.PI;
  },

  trapezoidalRiemann: function (arg0_function, arg1_min, arg2_max, arg3_intervals) {
    //Convert from parameters
    var pdf = arg0_function;
    var min = arg1_min;
    var max = arg2_max;
    var intervals = arg3_intervals;

    //Declare local instance variables
    var sum = 0;
    var width = (max - min)/intervals;

    //Iterate over intervals
    for (var i = 0; i < intervals.length; i++) {
      var x_0 = min + i*width;
      var x_1 = x_0 + width;

      var pdf_value_0 = pdf(x_0);
      var pdf_value_1 = pdf(x_1);

      //Add the area of the trapezoid to sum
      sum += (pdf_value_0 + pdf_value_1)/2*width;
    }

    //Return statement
    return sum;
  }
};
