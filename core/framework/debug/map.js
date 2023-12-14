module.exports = {
  debugRenderAllMaps: function () {
    //Declare local instance variables
    var map_types = config.defines.map.map_types;

    if (map_types) {
      for (var i = 0; i < map_types.length; i++)
        cacheSVG(map_types[i]);

      //Return statement
      return [true, `Rerendered all **${parseNumber(map_types.length)}** map(s).`];
    } else {
      return [false, `Could not find any individual map types in config.defines.map.map_types!`];
    }
  },

  debugRenderMap: function (arg0_map) {
    //Convert from parameters
    var map = arg0_map.trim().toLowerCase();

    //Cache SVG
    cacheSVG(map);

    //Return statement
    return [true, `Rerendered **${map}**.`];
  }
};
