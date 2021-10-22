//Colors framework
module.exports = {
  componentToHex: function (c) {
    var hex = c.toString(16);

    //Return statement

    return hex.length == 1 ? "0" + hex : hex;
  },

  generateRandomColour: function () {
    //Return statement
    return [randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)];
  },

  hexToRGB: function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    //Return statement
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : undefined;
  },

  RGBToHex: function (r, g, b) {
    //Return statement
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
};
