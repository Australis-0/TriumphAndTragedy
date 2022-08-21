module.exports = {
  getDefaultProvinceStyling: function () {
    //Return statement, generated by Inkscape
    return "stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;opacity:1";
  },

  setAllProvinceColours: function (arg0_user, arg1_province_id, arg2_occupied) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;
    var occupied = arg2_occupied;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];
    var usr = main.users[actual_id];

    var new_colour = usr.colour;

    //Check if occupied or not
    if (occupied)
      new_colour = [
        Math.min(usr.colour[1] + 20, 255),
        Math.min(usr.colour[0] + 20, 255),
        Math.min(usr.colour[2] + 20, 255)
      ];

    //Set province colours
    module.exports.setProvinceColour("colonisation", province_id, new_colour);
    module.exports.setProvinceColour("political", province_id, new_colour);
  },

  setOccupationColour: function (arg0_user, arg1_province_id) {
    //Convert from parameters
    var user_id = arg0_user;
    var province_id = arg1_province_id;

    //Declare local instance variables
    var actual_id = main.global.user_map[user_id];

    //Change province colour
    module.exports.setAllProvinceColours(actual_id, province_id, true);
  },

  setProvinceColour: function (arg0_file, arg1_province_id, arg2_colour) {
    //Convert from parameters
    var file = arg0_file;
    var local_map = global[`${file}_parsed`];
    var province_id = arg1_province_id;
    var colour = arg2_colour; //Provided as [r, g, b] array

    //Declare local instance variables
    var has_colour = false;
    var new_colour = RGBToHex(colour[0], colour[1], colour[2]);

    if (main.provinces[province_id])
      if (main.provinces[province_id][`${file}_colour`] == new_colour)
        has_colour = true;

    if (!has_colour)
      try {
        local_map.querySelector(`#${province_id}`).setAttribute("style", `fill:${new_colour};${getDefaultProvinceStyling()}`);

        if (main.provinces[province_id])
          main.provinces[province_id][`${file}_colour`] = new_colour;
      } catch {}
  }
};
